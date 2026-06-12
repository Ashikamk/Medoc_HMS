using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.Controllers
{
    public class WorkItemUserController : Controller
    {
        // GET: WorkItemUser

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult WorkItemUser()
        {
            return View();
        }
        public ActionResult WorkItemUserNew()
        {
            return View();
        }

        public ActionResult WorkDivisionGetandGets(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> oList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WorkDivisionGetandGets(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.DivisionId = Convert.ToInt32(row["EmployeeDivisionId"].ToString());
                    LModels.DivisionName = row["EmployeeDivisionName"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeptUserGetandGets(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> oList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeptUserGetandGets(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    LModels.UserName = row["Name"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(oList, JsonRequestBehavior.AllowGet);
            
        }

        public ActionResult WorkingTaskTimeGetandGets(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> bList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WorkingTaskTimeGetandGets(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.TurnAroundTimes = Convert.ToInt32(row["TurnAroundTimeInMin"].ToString());
                    LModels.TurnAroundTimesName = row["TaskKey"].ToString();
                    bList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { bList, success = true }, JsonRequestBehavior.AllowGet);

        }

    [HttpPost]
        public ActionResult WorkItemInsertandUpdate(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> cList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WorkItemInsertandUpdate(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.Status = row["Status"].ToString();
                    cList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { cList, success = true }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]

        public ActionResult WorkItemGetandGets(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> oList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WorkItemGetandGets(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.WorkItemId = Convert.ToInt32(row["WorkItemId"].ToString());                    
                    LModels.AssignedBy = Convert.ToInt32(row["AssignedBy"].ToString());
                    LModels.AssignedByUser = row["AssignedByUser"].ToString();
                    LModels.AssignedTo = Convert.ToInt32(row["AssignedTo"].ToString());
                    LModels.AssignedToUser = row["AssignedToUser"].ToString();
                    LModels.DepartmentId = Convert.ToInt32(row["DeptId"].ToString()) ;
                    LModels.DivisionId = Convert.ToInt32(row["DivId"].ToString());
                    LModels.Title = row["Title"].ToString();
                    LModels.Description = row["Description"].ToString();
                    LModels.RefId = row["RefId"].ToString();
                    LModels.RefType = row["RefType"].ToString();
                    LModels.WorkStatus = row["Status"].ToString();
                    LModels.TurnAroundTimes = Convert.ToInt32(row["TurnAroundTimeinMin"].ToString());
                    LModels.Remarks = row["Reason"].ToString();
                    LModels.Flag= Convert.ToInt32(row["time"].ToString());
                    LModels.TurnAroundTimesName = row["TaskKey"].ToString();
                    LModels.NewWorkRemarks = row["WorkRemarks"].ToString();
                    LModels.BillSlNo = row["BillSeriesId"].ToString();
                    LModels.BillNo = row["BillNumber"].ToString();
                    LModels.Driver = row["Driver"].ToString();
                    LModels.Reference = row["Reference"].ToString();
                    LModels.DriverName = row["DriverName"].ToString();
                    LModels.IPUserId = row["IPUserId"].ToString();
                    LModels.IPUser = row["IPUser"].ToString();
                    LModels.StoreKeeper = row["StoreKeeper"].ToString();
                    LModels.StoreKeeperId = row["StoreKeeperId"].ToString();
                    LModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    LModels.Followup = Convert.ToInt32(row["FollwUp"].ToString());
                    LModels.DueDate = row["DueDate"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }

        public ActionResult DriverAutoComplete(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> oList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DriverAutoComplete(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser Models = new WorkItemUser();
                    Models.Driver = row["DriverId"].ToString();
                    Models.DriverName = row["DriverName"].ToString();

                    oList.Add(Models);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DivisionInsertandUpdate(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> oList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DivisionInsertandUpdate(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.Status = row["Status"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult WorkItemTransfer(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> oList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WorkItemTransfer(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.Status = row["Status"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult DivisionTimeInsertandUpdate(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> oList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DivisionTimeInsertandUpdate(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.Status = row["Status"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]

        public ActionResult WorkDelayed(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> zzList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WorkDelayed(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.WorkItemId = Convert.ToInt32( row["WorkItemId"].ToString());
                    LModels.Title = row["Title"].ToString();
                    LModels.DepartmentName = row["DepartmentName"].ToString();
                    LModels.DivisionName = row["DivName"].ToString();
                    LModels.AssignedToUser = row["AssignedToUser"].ToString();
                    LModels.AssignedOnDate = row["AssignedOn"].ToString();
                    LModels.StartedOn = row["StartedOn"].ToString();
                    zzList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { zzList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]

        public ActionResult CheckforNewItem(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> oList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CheckforNewItem(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.AssignedByyou = Convert.ToInt32(row["AssignedByyou"].ToString());
                    LModels.AssignedToYou = Convert.ToInt32(row["AssignedToYou"].ToString());
                    LModels.AssignedToDiv = Convert.ToInt32(row["AssignedToDiv"].ToString());
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]

        public ActionResult WorkItemGetList(WorkItemUser WorkItemUser)
        {
            WorkItemUser obj = new WorkItemUser();

            List<WorkItemUser> oList = new List<WorkItemUser>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WorkItemGetList(WorkItemUser, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkItemUser LModels = new WorkItemUser();
                    LModels.WorkItemId = Convert.ToInt32(row["WorkItemId"].ToString());                    
                    LModels.AssignedToUser = row["AssignedToUser"].ToString();
                    LModels.AssignedByUser = row["AssignedByUser"].ToString();
                    LModels.DepartmentName = row["Dept"].ToString();
                    LModels.DivisionName = row["Div"].ToString();
                    LModels.Status = row["Status"].ToString();
                    LModels.Title = row["Title"].ToString();
                    LModels.Remarks = row["Reason"].ToString();
                    LModels.AssignedOnDate = row["AssignedOnDate"].ToString();
                    LModels.ExceededTime = row["EXCEDDEDTIME"].ToString();
                    LModels.MinuteDiff = row["MinuteDiff"].ToString();
                    LModels.TurnAroundTimes = Convert.ToInt32(row["TurnAroundTimeInMin"].ToString());
                    LModels.NewWorkRemarks=row["WorkRemarks"].ToString();
                    LModels.BillSlNo = row["BillSeriesId"].ToString();
                    LModels.BillNo = row["BillNumber"].ToString();
                    LModels.BillDeptId = row["SalesDeptId"].ToString();
                    LModels.Reference = row["Reference"].ToString();
                    LModels.Driver = row["Driver"].ToString();
                    LModels.DriverName = row["DriverName"].ToString();
                    LModels.UpdatedOn= row["UpdatedOn"].ToString();
                    LModels.Description = row["Description"].ToString();
                    LModels.StoreKeeper = row["StoreKeeper"].ToString();
                    LModels.StoreKeeperId = row["StoreKeeperId"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }



        //----------------------------------------------------------------------------



        [HttpPost]
        public ActionResult ListWorkItemsDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<AWWorkItemListModel>>(jsonStr);
            var manager = new WorkItemListUser();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ListWorkItemsJson(ABDataTableModel<AWWorkItemListModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new WorkItemListUser();
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

        [HttpPost]
        public ActionResult ListWorkItemsDownloadUserOnly(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<AWWorkItemListModel>>(jsonStr);
            var manager = new WorkItemListUserMyData();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ListWorkItemsJsonUserOnly(ABDataTableModel<AWWorkItemListModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new WorkItemListUserMyData();
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

        //----------------------------------------------------------------------------------

        [HttpPost]
        public ActionResult ListWorkItemsDownloadTOYou(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<AWWorkItemListModel>>(jsonStr);
            var manager = new WorkItemListUserSortByToYou();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ListWorkItemsJsonToYou(ABDataTableModel<AWWorkItemListModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new WorkItemListUserSortByToYou();
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

        //=======================================================================================

        [HttpPost]
        public ActionResult ListWorkItemsDownloadByYou(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<AWWorkItemListModel>>(jsonStr);
            var manager = new WorkItemListUserSortByByYou();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ListWorkItemsJsonByYou(ABDataTableModel<AWWorkItemListModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new WorkItemListUserSortByByYou();
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

        //==========================================================================================

        [HttpPost]
        public ActionResult ListWorkItemsDownloadToDiv(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<AWWorkItemListModel>>(jsonStr);
            var manager = new WorkItemListUserSortByDiv();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ListWorkItemsJsonToDiv(ABDataTableModel<AWWorkItemListModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new WorkItemListUserSortByDiv();
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




        //=============================================================================================

        [HttpPost]
        public ActionResult ListWorkItemsDownloadDashboard(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<AWWorkItemListModel>>(jsonStr);
            var manager = new WorkItemListUser();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ListWorkItemsJsonDashBoard(ABDataTableModel<AWWorkItemListModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new WorkItemListUserDashBoard();
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
        [HttpPost]
        public ActionResult ListWorkItemsJsonDashBoardNew(ABDataTableModel<AWWorkItemListModel> model)  //For User Dashboard Workitem
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new WorkItemListUserDashBoardNew(); 
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

        [HttpPost]
        public ActionResult ListAdminWorkItemsJsonDashBoard(ABDataTableModel<AWWorkItemListModel> model)         //Admin Dashboard Workitem 
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new WorkItemListAdminDashBoard(); 
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
    }
}