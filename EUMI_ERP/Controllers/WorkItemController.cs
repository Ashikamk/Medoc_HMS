using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.Controllers
{
    [NoCache]
    public class WorkItemController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        public ActionResult DivisionUsers(long? dept, long? div)
        {
            var model = WorkItemDivDeptModel.GetDepartmentAndDivision(dbName);
            if (dept != null) { model.SelectedDept = dept.Value; }
            if (div != null) { model.SelectedDiv = div.Value; }
            return View(model);
        }
        [HttpPost]
        public ActionResult DivisionUsersDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<AWDivUserListModel>>(jsonStr);
            var manager = new DivisionUsers();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult DivisionUsersJson(ABDataTableModel<AWDivUserListModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DivisionUsers();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult Listitems(long? uato, long? uaby, long? div, long? dept, long? divbyu)
        {
            var model = new AWWorkItemListModel();
            model.assignedBy = uaby;
            model.assignedTo = uato;
            model.dept = dept;
            model.div = div;
            model.divByUser = divbyu;
            if (model.assignedBy == -1) { model.assignedBy = this.GetUserId(); }
            if (model.assignedTo == -1) { model.assignedTo = this.GetUserId(); }
            if (model.divByUser == -1) { model.divByUser = this.GetUserId(); }
            return View(model);
        }
        [HttpPost]
        public ActionResult ListItemsDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<AWWorkItemListModel>>(jsonStr);
            var manager = new WorkItemList();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ListItemsJson(ABDataTableModel<AWWorkItemListModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new WorkItemList();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        
        [HttpGet]
        public ActionResult LoadPartial()
        {
            var model = WorkItemDivDeptModel.GetDepartmentAndDivision(dbName);
            return PartialView("_SavePartial", model);
        }

        [HttpPost]
        public ActionResult SavePartial(long id, string newName)
        {
            var success = false;
            if (id <= 0) { success = WorkItemDivDeptModel.AddDivision(newName, dbName); }
            else { success = WorkItemDivDeptModel.UpdateDivision(id, newName, dbName); }
            var model = WorkItemDivDeptModel.GetDepartmentAndDivision(dbName);
            model.LastActionSuccess = success;
            return PartialView("_SavePartial", model);
        }
        [HttpPost]
        public ActionResult DeletePartial(long id, string newName)
        {
            var success = WorkItemDivDeptModel.DeleteDivision(id, dbName);
            var model = WorkItemDivDeptModel.GetDepartmentAndDivision(dbName);
            model.LastActionSuccess = success;
            return PartialView("_SavePartial", model);
        }

        [HttpPost]
        public ActionResult AddUser(bool delete, long dept, long div, long user)
        {
            var success = WorkItemDivDeptModel.AddDelUserToDivision(delete, user, div, dept, dbName);
            return Json(new { IsAdded = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Assign(long? wid, long? user, long? div, long? dept, string reftype, string refno)
        {
            var model = AWWorkAssignModel.LoadAll(wid, user, div, dept, reftype, refno, dbName);
            return View(model);
        }

        [HttpGet]
        public ActionResult ItemData(long wid)
        {
            var model = AWWorkAssignModel.LoadAll(wid, null, null, null, null, null, dbName);
            if (string.Equals(TempData["success"], "1"))
            {
                ViewBag.EumiClass1 = "text-success";
                ViewBag.EumiMessage = "Data Saved successfully";
            }
            var userId = this.GetUserId();
            var meExists = AWWorkAssignModel.IsInDivDept(userId, (long)model.data.AssignedToDivId, (long)model.data.DeptId, dbName);
            if (model.data.AssignedToUserId == null && meExists)
            {
                ViewBag.AssignedToMeEnabled = 1;
            }
            return View("Assign", model);
        }

        [HttpGet]
        public ActionResult ItemView(long wid)
        {
            var model = AWWorkAssignModel.LoadAll(wid, null, null, null, null, null, dbName);
            ViewBag.HideSave = 1;
            ViewBag.ShowDelete = 1;
            return View("Assign", model);
        }
        
        [HttpPost]
        public ActionResult ItemDelete(long wid)
        {
            var success = AWWorkAssignModel.Delete(wid, dbName);
            return Json(new { success = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SaveItem(AWWorkItem data)
        {
            if (data.AssignedByUserId <= 0)
            {
                data.AssignedByUserId = this.GetUserId();
            }
            data.UpdatedBy = this.GetUserId();

            if (!ModelState.IsValid)
            {
                var modelData = AWWorkAssignModel.LoadAll(data.WorkItemId, (long)data.AssignedToUserId, (long)data.AssignedToDivId, (long)data.DeptId, data.ReferenceType, data.ReferenceId, dbName);
                modelData.data = data;
                ViewBag.EumiMessage = "Fill In the fields and click save again";
                return View("Assign", modelData);
            }
            var model = AWWorkAssignModel.Upsert(data, dbName);
            TempData["success"] = "1";
            return RedirectToAction("ItemData", "WorkItem", new { wid = data.WorkItemId });
        }

        [HttpPost]
        public ActionResult LoadTagPartial(long div)
        {
            var data = WorkItemDivDeptModel.GetTags(div, dbName);
            return PartialView("_TagPartial", data);
        }

        [HttpPost]
        public ActionResult DelTagPartial(long div, string tagName)
        {
            var success = WorkItemDivDeptModel.DeleteTag(div, tagName, dbName);
            return Json(new { lastActionSuccess = success }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult AddTagPartial(long div, string tagName, long? hrs, long mins)
        {
            var success = WorkItemDivDeptModel.AddTag(div, tagName, hrs, mins, dbName);
            return Json(new { lastActionSuccess = success }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult List()
        {
            return View();
        }

        public ActionResult PingForNew(long userid)
        {
            var success = AWWorkAssignModel.PingForNew(userid, dbName);
            return Json(new { success = true, hasNew = success }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PingForDetail(long userid)
        {
            var data = AWWorkAssignModel.PingForDetail(userid, dbName);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}