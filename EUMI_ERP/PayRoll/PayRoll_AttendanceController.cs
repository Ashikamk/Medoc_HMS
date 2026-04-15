using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.PayRoll
{
    public class PayRoll_AttendanceController : Controller
    {
        // GET: PayRoll_Attendance
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AttendanceEntry()
        {
            return View();
        }
        
        [HttpPost]

        public ActionResult AttendanceEmployeeSearch(PayRollAttendanceEntry PayRollAttendanceEntry)
        {
            PayRollAttendanceEntry obj = new PayRollAttendanceEntry();

            List<PayRollAttendanceEntry> oList = new List<PayRollAttendanceEntry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AttendanceEmployeeSearch(PayRollAttendanceEntry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PayRollAttendanceEntry MModels = new PayRollAttendanceEntry();
                    MModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());                             
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.EmpName = row["Name"].ToString();
                    MModels.InTime = row["InTime"].ToString();
                    MModels.OutTime = row["OutTime"].ToString();
                    MModels.WorkingHrs = row["WorkingHours"].ToString();
                    MModels.flag = row["flag"].ToString();                    
                    MModels.Type = row["Type"].ToString();
                    MModels.SaveFlag = Convert.ToInt32(row["SaveFlag"].ToString());
                    MModels.LeaveFrom = row["LeaveFrom"].ToString();                    
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
       
        
        [HttpPost]
        public JsonResult AttendanceEntryInsert(List<PayRollAttendanceEntry> PayRollAttendanceEntry)
        {
            PayRollAttendanceEntry obj = new PayRollAttendanceEntry();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PayRollAttendanceEntry> oList = new List<PayRollAttendanceEntry>();

            try
            {
                string[] tmpTable = new string[15];
                tmpTable[0] = "LocId";
                tmpTable[1] = "Dept";
                tmpTable[2] = "AtendanceDate";
                tmpTable[3] = "EmpId";
                tmpTable[4] = "EmpCode";
                tmpTable[5] = "EmpName";
                tmpTable[6] = "InTime";
                tmpTable[7] = "OutTime";
                tmpTable[8] = "WorkingHrs";
                tmpTable[9] = "flag";
                tmpTable[10] = "UId";
                tmpTable[11] = "DeptId";
                tmpTable[12] = "SaveFlag";
                tmpTable[13] = "Type";
                tmpTable[14] = "DivisionId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in PayRollAttendanceEntry)
                {
                    obj.LocId = details.LocId;
                    obj.Dept = details.Dept;
                    obj.AtendanceDate = details.AtendanceDate;
                    obj.EmpId = details.EmpId;
                    obj.EmpCode = details.EmpCode;
                    obj.EmpName = details.EmpName;
                    obj.InTime = details.InTime;
                    obj.OutTime = details.OutTime;
                    obj.WorkingHrs = details.WorkingHrs;
                    obj.flag = details.flag;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.SaveFlag = details.SaveFlag;
                    obj.Type = details.Type;
                    obj.DivisionId = details.DivisionId;
                    dt.Rows.Add
                    (obj.LocId, obj.Dept, obj.AtendanceDate, obj.EmpId,obj.EmpCode, obj.EmpName, obj.InTime, obj.OutTime, obj.WorkingHrs, obj.flag, obj.UId, obj.DeptId, obj.SaveFlag, obj.Type, obj.DivisionId);
                }

                dsDataSet = obj.AttendanceEntryInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PayRollAttendanceEntry MModels = new PayRollAttendanceEntry();
                    MModels.Status = row["Status"].ToString();
                    //MModels.StockAdjNo = Convert.ToInt32(row["stoadjnum"].ToString());
                    oList.Add(MModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}