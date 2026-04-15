using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.IO;
namespace EUMI_ERP.PayRoll
{
    public class SalaryManagementController : Controller
    {


        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: SalaryManagement
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SalaryManagement()
        {
            return View();
        }
        public ActionResult Test()
        {
            return View();
        }
        public ActionResult SalaryReport()
        {
            return View();
        }
        public ActionResult AttendanceReport()
        {
            return View();
        }


        [HttpPost]
        public ActionResult GetPayRollCalcInfo(SalaryManagementModel SalaryManagement)
        {
            SalaryManagementModel obj = new SalaryManagementModel();

            List<SalaryManagementModel> oList = new List<SalaryManagementModel>();

            try

            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.GetPayRollCalcInfo(SalaryManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    SalaryManagementModel oSalaryManagement = new SalaryManagementModel();

                    oSalaryManagement.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    oSalaryManagement.EmpCode= row["EmpCode"].ToString();
                    oSalaryManagement.Name = row["Name"].ToString();
                    oSalaryManagement.DepartmentName = row["DepartmentName"].ToString();
                    oSalaryManagement.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    oSalaryManagement.DesignationDescription = row["DesignationDescription"].ToString();
                    oSalaryManagement.DateofJoin= row["DateofJoin"].ToString();
                    oSalaryManagement.Gender = row["Gender"].ToString();
                    oSalaryManagement.DOB= row["DOB"].ToString();
                    oSalaryManagement.BasicSalary= Convert.ToDecimal(row["BasicSalary"].ToString());
                    oSalaryManagement.TA= Convert.ToDecimal(row["TA"].ToString());
                    oSalaryManagement.NightAlowance= Convert.ToDecimal(row["NightAlowance"].ToString());
                    oSalaryManagement.HRA= Convert.ToDecimal(row["HRA"].ToString());
                    oSalaryManagement.EarningOthers= Convert.ToDecimal(row["EarningOthers"].ToString());
                    oSalaryManagement.PF = Convert.ToDecimal(row["PF"].ToString());
                    oSalaryManagement.Tax= Convert.ToDecimal(row["Tax"].ToString());
                    oSalaryManagement.ESI= Convert.ToDecimal(row["ESI"].ToString());
                    oSalaryManagement.Otherdeductions= Convert.ToDecimal(row["Otherdeductions"].ToString());
                    oSalaryManagement.PayRollType = row["PayRollType"].ToString();
                    oSalaryManagement.OTRate = Convert.ToDecimal(row["OTRate"].ToString());
                    oSalaryManagement.SalaryAdvance = Convert.ToDecimal(row["SalaryAdvance"].ToString());
                    oSalaryManagement.Leaves= Convert.ToInt32(row["Leaves"].ToString());
                    oSalaryManagement.Holidays= Convert.ToInt32(row["Holidays"].ToString());
                    oSalaryManagement.WorkedSession= Convert.ToInt32(row["WorkedSession"].ToString());
                    
                   // oSalaryManagement.PH_WorkedSession = Convert.ToInt32(row["PH_WorkedSession"].ToString());
                    oSalaryManagement.OTHrs= Convert.ToDecimal(row["OTHrs"].ToString());
                    oList.Add(oSalaryManagement);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult SalaryManagementInsertandUpdate(List<SalaryManagementModel> SalaryManagementModel)
        {
            SalaryManagementModel obj = new SalaryManagementModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalaryManagementModel> oList = new List<SalaryManagementModel>();

            try
            {
                string[] tmpTable = new string[29];
                tmpTable[0] = "EmpId";
                tmpTable[1] = "EmpCode";
                tmpTable[2] = "Gender";
                tmpTable[3] = "BasicSalary";
                tmpTable[4] = "TA";
                tmpTable[5] = "NightAlowance";
                tmpTable[6] = "HRA";
                tmpTable[7] = "EarningOthers";
                tmpTable[8] = "PF";
                tmpTable[9] = "Tax";
                tmpTable[10] = "ESI";
                tmpTable[11] = "Otherdeductions";
                tmpTable[12] = "OTRate";
                tmpTable[13] = "OTHrs";
                tmpTable[14] = "Leaves";
                tmpTable[15] = "Holidays";
                tmpTable[16] = "WorkedSession";
                tmpTable[17] = "PayRollType";
                tmpTable[18] = "DesignationDescription";
                tmpTable[19] = "Name";
                tmpTable[20] = "TotalEarnings";
                tmpTable[21] = "TotalDeductions";
                tmpTable[22] = "NetSalary";
                tmpTable[23] = "FromDate";
                tmpTable[24] = "ToDate";
                tmpTable[25] = "PayRollCalc";
                tmpTable[26] = "DelFlag";
                tmpTable[27] = "UId";
                tmpTable[28] = "DeptId";


                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalaryManagementModel)
                {
                    obj.EmpId = details.EmpId;
                    obj.EmpCode = details.EmpCode;
                    obj.Gender = details.Gender;
                    obj.BasicSalary = details.BasicSalary;
                    obj.TA = details.TA;
                    obj.NightAlowance = details.NightAlowance;
                    obj.HRA = details.HRA;
                    obj.EarningOthers = details.EarningOthers;
                    obj.PF = details.PF;
                    obj.Tax = details.Tax;
                    obj.ESI = details.ESI;
                    obj.Otherdeductions = details.Otherdeductions;
                    obj.OTRate = details.OTRate;
                    obj.OTHrs = details.OTHrs;
                    obj.Leaves = details.Leaves;
                    obj.Holidays = details.Holidays;
                    obj.WorkedSession = details.WorkedSession;
                    obj.PayRollType = details.PayRollType;
                    obj.DesignationDescription = details.DesignationDescription;
                    obj.Name = details.Name;
                    obj.TotalEarnings = details.TotalEarnings;
                    obj.TotalDeductions = details.TotalDeductions;
                    obj.NetSalary = details.NetSalary;
                    obj.FromDate = details.FromDate;
                    obj.ToDate = details.ToDate;
                    obj.PayRollCalc = details.PayRollCalc;
                    obj.DelFlag = details.DelFlag;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;

                    dt.Rows.Add(obj.EmpId,obj.EmpCode, obj.Gender, obj.BasicSalary, obj.TA,  obj.NightAlowance, obj.HRA, obj.EarningOthers, obj.PF, obj.Tax,
                         obj.ESI, obj.Otherdeductions, obj.OTRate, obj.OTHrs, obj.Leaves, obj.Holidays, obj.WorkedSession, obj.PayRollType, obj.DesignationDescription, obj.Name,
                         obj.TotalEarnings, obj.TotalDeductions,obj.NetSalary, obj.FromDate, obj.ToDate,obj.PayRollCalc, obj.DelFlag,obj.UId, obj.DeptId);

                }

                dsDataSet = obj.SalaryManagementInsertandUpdate(dt, dbName);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalaryManagementModel MModels = new SalaryManagementModel();
                    MModels.Status = row["Status"].ToString();
                    oList.Add(MModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult PayRollCheckInfo(SalaryManagementModel SalaryManagement)
        {
            SalaryManagementModel obj = new SalaryManagementModel();

            List<SalaryManagementModel> oList = new List<SalaryManagementModel>();

            try

            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.GetPayRollChckInfo(SalaryManagement, dbName);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalaryManagementModel MModels = new SalaryManagementModel();
                    MModels.Status = row["Status"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult GetCopy(SalaryManagementModel SalaryManagementModel)
        {
            SalaryManagementModel obj = new SalaryManagementModel();

            List<SalaryManagementModel> oList = new List<SalaryManagementModel>();
            try

            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetCopy(SalaryManagementModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalaryManagementModel oModels = new SalaryManagementModel();

                    oModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    oModels.EmpCode = row["EmpCode"].ToString();
                    oModels.Name = row["Name"].ToString();
                    oModels.Gender = row["Gender"].ToString();

                    oModels.BasicSalary = Convert.ToDecimal(row["BasicSalary"].ToString());
                    oModels.TA = Convert.ToDecimal(row["TA"].ToString());
                    oModels.NightAlowance = Convert.ToDecimal(row["NightAlowance"].ToString());
                    oModels.HRA = Convert.ToDecimal(row["HRA"].ToString());
                    oModels.EarningOthers = Convert.ToDecimal(row["EarningOthers"].ToString());

                    oModels.PF = Convert.ToDecimal(row["PF"].ToString());
                    oModels.Tax = Convert.ToDecimal(row["Tax"].ToString());
                    oModels.ESI = Convert.ToDecimal(row["ESI"].ToString());
                    oModels.Otherdeductions = Convert.ToDecimal(row["Otherdeductions"].ToString());

                    oModels.PayRollType = row["PayRollType"].ToString();
                    oModels.OTRate = Convert.ToDecimal(row["OTRate"].ToString());
                    oModels.OTHrs = Convert.ToDecimal(row["OTHrs"].ToString());
                    oModels.DesignationDescription = row["DesignationDescription"].ToString();

                    oModels.Leaves = Convert.ToInt32(row["Leaves"].ToString());
                    oModels.Holidays = Convert.ToInt32(row["Holidays"].ToString());
                    oModels.WorkedSession = Convert.ToInt32(row["WorkedSession"].ToString());

                    oModels.NetSalary = Convert.ToDecimal(row["NetSalary"].ToString());
                    oModels.TotalEarnings = Convert.ToDecimal(row["TotalEarnings"].ToString());
                    oModels.TotalDeductions = Convert.ToDecimal(row["TotalDeductions"].ToString());

                    oModels.FromDate = row["FromDate"].ToString();
                    oModels.ToDate = row["ToDate"].ToString();


                    oList.Add(oModels);

            
                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult SalaryReportGet(SalaryManagementModel SalaryManagementModel)
        {
            SalaryManagementModel obj = new SalaryManagementModel();

            List<SalaryManagementModel> oList = new List<SalaryManagementModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalaryReportGet(SalaryManagementModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalaryManagementModel oSalaryManagement = new SalaryManagementModel();
                    oSalaryManagement.EmpId =Convert.ToInt32(row["EmpId"].ToString());
                    oSalaryManagement.EmpCode = row["EmpCode"].ToString();
                    oSalaryManagement.Name = row["Name"].ToString();
                    oSalaryManagement.DepartmentName = row["DepartmentCode"].ToString();
                    oSalaryManagement.DesignationDescription = row["DesignationDescription"].ToString();
                    oSalaryManagement.DateofJoin = row["DateofJoin"].ToString();                 
                    oSalaryManagement.BS = row["BasicSalary"].ToString();
                    oSalaryManagement.DA = row["DA"].ToString();
                    oSalaryManagement.TAF = row["TA"].ToString();
                    oSalaryManagement.HRAF = row["HRA"].ToString();
                    oSalaryManagement.NA = row["NightAlowance"].ToString();
                    oSalaryManagement.EO = row["EarningOthers"].ToString();
                    oSalaryManagement.TE = row["TotalEarnings"].ToString();
                    oSalaryManagement.PFf = row["PF"].ToString();
                    oSalaryManagement.Taxf = row["Tax"].ToString();
                    oSalaryManagement.ESIf = row["ESI"].ToString();
                    oSalaryManagement.Od =row["Otherdeductions"].ToString();
                    oSalaryManagement.TD= row["TotalDeductions"].ToString();
                    oSalaryManagement.NS = row["TotalNetSalary"].ToString();
                    oSalaryManagement.PayRollType = row["PayRollType"].ToString();
                    oSalaryManagement.OTR = row["OTRate"].ToString();
                    oSalaryManagement.WorkingHours = row["WorkingHours"].ToString();
                    oList.Add(oSalaryManagement);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }

        [HttpPost]
        public ActionResult GetAttendancereport(SalaryManagementModel SalaryManagementModel)
        {
            SalaryManagementModel obj = new SalaryManagementModel();

            List<SalaryManagementModel> oList = new List<SalaryManagementModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetAttendancereport(SalaryManagementModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalaryManagementModel Reptmodels = new SalaryManagementModel();

                    Reptmodels.EmpCode = row["EmpCode"].ToString();
                    Reptmodels.Name = row["EmpName"].ToString();
                    Reptmodels.PayRollType = row["PayRollType"].ToString();
                    Reptmodels.DesignationDescription = row["DesignationDescription"].ToString();
                    Reptmodels.HalfDays = Convert.ToInt32(row["HalfDays"].ToString());
                    Reptmodels.FullDays = Convert.ToInt32(row["FullDays"].ToString());
                    Reptmodels.Leaves = Convert.ToInt32(row["Leaves"].ToString());
                    Reptmodels.Holidays = Convert.ToInt32(row["Holidays"].ToString());
                    Reptmodels.OTHrs = Convert.ToDecimal(row["OTHrs"].ToString());
                    Reptmodels.PH_Fulldays = Convert.ToInt32(row["PH_Fulldays"].ToString());
                    Reptmodels.PH_Halfdays = Convert.ToInt32(row["PH_Halfdays"].ToString());

                    oList.Add(Reptmodels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }



    }
}