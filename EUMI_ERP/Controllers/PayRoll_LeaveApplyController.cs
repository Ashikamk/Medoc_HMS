using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Net.Mail;
using System.Net;
using System.Text;
using iTextSharp.text;
using iTextSharp.text.pdf;





namespace EUMI_ERP.Controllers
{
    public class PayRoll_LeaveApplyController : Controller

    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: PayRoll_LeaveApply
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult LeaveApplication()
        {
            return View();
        }
       public ActionResult LeaveApproval()
        {
            return View();
        }

        public ActionResult salaryslip()
        {
            return View();
        }

        public ActionResult datecalculations()
        {
            return View();
        }

        


        public ActionResult salaryreport()
        {
            return View();
        }
        public ActionResult GratuityReport()
        {
            return View();
        }
        public ActionResult MonthlyPayroll()
        {
            return View();
        }

        public ActionResult SalaryManagementNew()
        {
            return View();
        }
        [HttpPost]
        public ActionResult MonthlyPayrollGets(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
           {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthlyPayrollGets(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.EmpId = row["EmpId"].ToString();
                    Reptmodels.EmpCode = row["EmpCode"].ToString();
                    Reptmodels.EmpName = row["Name"].ToString();
                    Reptmodels.EmpUserId = row["Emp_UserId"].ToString();
                    Reptmodels.DesignationId = row["DesignationId"].ToString();
                    Reptmodels.Designation = row["DesignationDescription"].ToString();
                    Reptmodels.PresentDays = row["Presentdays"].ToString();
                    Reptmodels.AllowedLeaves = row["AllowedLeaves"].ToString();
                    Reptmodels.TotalDaysInMonth = row["TotalDaysInMonth"].ToString();
                    Reptmodels.TotalWorkingDays = row["TotalWorkingDays"].ToString();
                    Reptmodels.Leaves = row["Leaves"].ToString();
                    Reptmodels.TotalDayOff = row["TotalDayOff"].ToString();

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
        [HttpPost]
        public JsonResult MonthlyPayrollInsert(List<ReportModel> ReportModel)
        {
            ReportModel obj = new ReportModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ReportModel> oList = new List<ReportModel>();

            try
            {
                string[] tmpTable = new string[45];
                tmpTable[0] = "EmployeeId";
                tmpTable[1] = "EmployeeCode";
                tmpTable[2] = "EmployeeName";
                tmpTable[3] = "EmpUserId";
                tmpTable[4] = "DesignationId";
                tmpTable[5] = "Month";
                tmpTable[6] = "TotalDaysInMonth";
                tmpTable[7] = "TotalWorkingDays";
                tmpTable[8] = "WorkedDays";
                tmpTable[9] = "LeavesTaken";
                tmpTable[10] = "AllowedLeaves";
                tmpTable[11] = "TotalDayOff";
                tmpTable[12] = "DeptId";
                tmpTable[13] = "UserId";

                tmpTable[14] = "Day1";
                tmpTable[15] = "Day2";
                tmpTable[16] = "Day3";
                tmpTable[17] = "Day4";
                tmpTable[18] = "Day5";
                tmpTable[19] = "Day6";
                tmpTable[20] = "Day7";
                tmpTable[21] = "Day8";
                tmpTable[22] = "Day9";
                tmpTable[23] = "Day10";
                tmpTable[24] = "Day11";
                tmpTable[25] = "Day12";
                tmpTable[26] = "Day13";
                tmpTable[27] = "Day14";
                tmpTable[28] = "Day15";
                tmpTable[29] = "Day16";
                tmpTable[30] = "Day17";
                tmpTable[31] = "Day18";
                tmpTable[32] = "Day19";
                tmpTable[33] = "Day20";
                tmpTable[34] = "Day21";
                tmpTable[35] = "Day22";
                tmpTable[36] = "Day23";
                tmpTable[37] = "Day24";
                tmpTable[38] = "Day25";
                tmpTable[39] = "Day26";
                tmpTable[40] = "Day27";
                tmpTable[41] = "Day28";
                tmpTable[42] = "Day29";
                tmpTable[43] = "Day30";
                tmpTable[44] = "Day31";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in ReportModel)
                {
                    obj.EmployeeId = details.EmployeeId;
                    obj.EmployeeCode = details.EmployeeCode;
                    obj.EmployeeName = details.EmployeeName;
                    obj.EmpUserId = details.EmpUserId;
                    obj.DesignationId = details.DesignationId;
                    obj.Month = details.Month;
                    obj.TotalDaysInMonth = details.TotalDaysInMonth;
                    obj.TotalWorkingDays = details.TotalWorkingDays;
                    obj.WorkedDays = details.WorkedDays;
                    obj.LeavesTaken = details.LeavesTaken;
                    obj.AllowedLeaves = details.AllowedLeaves;
                    obj.TotalDayOff = details.TotalDayOff;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;

                    obj.Day1 = details.Day1;
                    obj.Day2 = details.Day2;
                    obj.Day3 = details.Day3;
                    obj.Day4 = details.Day4;
                    obj.Day5 = details.Day5;
                    obj.Day6 = details.Day6;
                    obj.Day7 = details.Day7;
                    obj.Day8 = details.Day8;
                    obj.Day9 = details.Day9;
                    obj.Day10 = details.Day10;
                    obj.Day11 = details.Day11;
                    obj.Day12 = details.Day12;
                    obj.Day13 = details.Day13;
                    obj.Day14 = details.Day14;
                    obj.Day15 = details.Day15;
                    obj.Day16 = details.Day16;
                    obj.Day17 = details.Day17;
                    obj.Day18 = details.Day18;
                    obj.Day19 = details.Day19;
                    obj.Day20 = details.Day20;
                    obj.Day21 = details.Day21;
                    obj.Day22 = details.Day22;
                    obj.Day23 = details.Day23;
                    obj.Day24 = details.Day24;
                    obj.Day25 = details.Day25;
                    obj.Day26 = details.Day26;
                    obj.Day27 = details.Day27;
                    obj.Day28 = details.Day28;
                    obj.Day29 = details.Day29;
                    obj.Day30 = details.Day30;
                    obj.Day31 = details.Day31;
                    dt.Rows.Add
                    (obj.EmployeeId, obj.EmployeeCode, obj.EmployeeName, obj.EmpUserId, obj.DesignationId, obj.Month,
                    obj.TotalDaysInMonth, obj.TotalWorkingDays, obj.WorkedDays, obj.LeavesTaken, obj.AllowedLeaves,
                    obj.TotalDayOff, obj.DeptId, obj.UserId,

                    obj.Day1, obj.Day2, obj.Day3, obj.Day4, obj.Day5, obj.Day6, obj.Day7, obj.Day8, obj.Day9, obj.Day10,
                    obj.Day11, obj.Day12, obj.Day13, obj.Day14, obj.Day15, obj.Day16, obj.Day17, obj.Day18, obj.Day19, obj.Day20,
                    obj.Day21, obj.Day22, obj.Day23, obj.Day24, obj.Day25, obj.Day26, obj.Day27, obj.Day28, obj.Day29, obj.Day30, obj.Day31);
                }

                dsDataSet = obj.MonthlyPayrollInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel MModels = new ReportModel();
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
        public JsonResult MonthlyPayrollSalaryInsert(List<ReportModel> ReportModel)
        {
            ReportModel obj = new ReportModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ReportModel> oList = new List<ReportModel>();

            try
            {
                string[] tmpTable = new string[14];
                tmpTable[0] = "EmployeeId";
                tmpTable[1] = "EmployeeCode";
                tmpTable[2] = "EmployeeName";
                tmpTable[3] = "EmpUserId";
                tmpTable[4] = "Month";
                tmpTable[5] = "BasicSalary";
                tmpTable[6] = "WorkingHours";
                tmpTable[7] = "Allowance";
                tmpTable[8] = "Deductions";
                tmpTable[9] = "OTRate";
                tmpTable[10] = "OTAmount";
                tmpTable[11] = "TotalSalary";
                tmpTable[12] = "DeptId";
                tmpTable[13] = "UserId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in ReportModel)
                {
                    obj.EmployeeId = details.EmployeeId;
                    obj.EmployeeCode = details.EmployeeCode;
                    obj.EmployeeName = details.EmployeeName;
                    obj.EmpUserId = details.EmpUserId;
                    obj.Month = details.Month;
                    obj.BasicSalary = details.BasicSalary;
                    obj.WorkingHours = details.WorkingHours;
                    obj.Allowance = details.Allowance;
                    obj.Deductions = details.Deductions;
                    obj.OTRate = details.OTRate;
                    obj.OTAmount = details.OTAmount;
                    obj.TotalSalary = details.TotalSalary;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;

                    dt.Rows.Add
                    (obj.EmployeeId, obj.EmployeeCode, obj.EmployeeName, obj.EmpUserId, obj.Month,
                    obj.BasicSalary, obj.WorkingHours, obj.Allowance, obj.Deductions, obj.OTRate,
                    obj.OTAmount, obj.TotalSalary, obj.DeptId, obj.UserId);
                }

                dsDataSet = obj.MonthlyPayrollSalaryInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel MModels = new ReportModel();
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
        public ActionResult MonthlyPayrollDetails(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthlyPayrollDetails(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.UserId = row["Userid"].ToString();
                    Reptmodels.Column1 = row["Day_1"].ToString();
                    Reptmodels.Column2 = row["Day_2"].ToString();
                    Reptmodels.Column3 = row["Day_3"].ToString();
                    Reptmodels.Column4 = row["Day_4"].ToString();
                    Reptmodels.Column5 = row["Day_5"].ToString();
                    Reptmodels.Column6 = row["Day_6"].ToString();
                    Reptmodels.Column7 = row["Day_7"].ToString();
                    Reptmodels.Column8 = row["Day_8"].ToString();
                    Reptmodels.Column9 = row["Day_9"].ToString();
                    Reptmodels.Column10 = row["Day_10"].ToString();
                    Reptmodels.Column11 = row["Day_11"].ToString();
                    Reptmodels.Column12 = row["Day_12"].ToString();
                    Reptmodels.Column13 = row["Day_13"].ToString();
                    Reptmodels.Column14 = row["Day_14"].ToString();
                    Reptmodels.Column15 = row["Day_15"].ToString();
                    Reptmodels.Column16 = row["Day_16"].ToString();
                    Reptmodels.Column17 = row["Day_17"].ToString();
                    Reptmodels.Column18 = row["Day_18"].ToString();
                    Reptmodels.Column19 = row["Day_19"].ToString();
                    Reptmodels.Column20 = row["Day_20"].ToString();
                    Reptmodels.Column21 = row["Day_21"].ToString();
                    Reptmodels.Column22 = row["Day_22"].ToString();
                    Reptmodels.Column23 = row["Day_23"].ToString();
                    Reptmodels.Column24 = row["Day_24"].ToString();
                    Reptmodels.Column25 = row["Day_25"].ToString();
                    Reptmodels.Column26 = row["Day_26"].ToString();
                    Reptmodels.Column27 = row["Day_27"].ToString();
                    Reptmodels.Column28 = row["Day_28"].ToString();
                    Reptmodels.Column29 = row["Day_29"].ToString();
                    Reptmodels.Column30 = row["Day_30"].ToString();
                    Reptmodels.Column31 = row["Day_31"].ToString();
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
        [HttpPost]
        public ActionResult MonthlyPayrollNew(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthlyPayrollNew(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.EmpId = row["EmpID"].ToString();
                    Reptmodels.EmpCode = row["EmpCode"].ToString();
                    Reptmodels.EmpName = row["EmployeeName"].ToString();
                    Reptmodels.DesignationId = row["DesignationId"].ToString();
                    Reptmodels.Designation = row["Designation"].ToString();
                    Reptmodels.EmpUserId = row["EmpUserId"].ToString();
                    Reptmodels.AllowedLeaves = row["AllowedLeaves"].ToString();
                    Reptmodels.TotalDaysInMonth = row["TotalDaysInMonth"].ToString();
                    Reptmodels.TotalWorkingDays = row["TotalWorkingDays"].ToString();
                    Reptmodels.PresentDays = row["PresentDays"].ToString();
                    Reptmodels.Leaves = row["Leaves"].ToString();
                    Reptmodels.TotalDayOff = row["TotalDayOff"].ToString();
                    Reptmodels.Column1 = row["Day1"].ToString();
                    Reptmodels.Column2 = row["Day2"].ToString();
                    Reptmodels.Column3 = row["Day3"].ToString();
                    Reptmodels.Column4 = row["Day4"].ToString();
                    Reptmodels.Column5 = row["Day5"].ToString();
                    Reptmodels.Column6 = row["Day6"].ToString();
                    Reptmodels.Column7 = row["Day7"].ToString();
                    Reptmodels.Column8 = row["Day8"].ToString();
                    Reptmodels.Column9 = row["Day9"].ToString();
                    Reptmodels.Column10 = row["Day10"].ToString();
                    Reptmodels.Column11 = row["Day11"].ToString();
                    Reptmodels.Column12 = row["Day12"].ToString();
                    Reptmodels.Column13 = row["Day13"].ToString();
                    Reptmodels.Column14 = row["Day14"].ToString();
                    Reptmodels.Column15 = row["Day15"].ToString();
                    Reptmodels.Column16 = row["Day16"].ToString();
                    Reptmodels.Column17 = row["Day17"].ToString();
                    Reptmodels.Column18 = row["Day18"].ToString();
                    Reptmodels.Column19 = row["Day19"].ToString();
                    Reptmodels.Column20 = row["Day20"].ToString();
                    Reptmodels.Column21 = row["Day21"].ToString();
                    Reptmodels.Column22 = row["Day22"].ToString();
                    Reptmodels.Column23 = row["Day23"].ToString();
                    Reptmodels.Column24 = row["Day24"].ToString();
                    Reptmodels.Column25 = row["Day25"].ToString();
                    Reptmodels.Column26 = row["Day26"].ToString();
                    Reptmodels.Column27 = row["Day27"].ToString();
                    Reptmodels.Column28 = row["Day28"].ToString();
                    Reptmodels.Column29 = row["Day29"].ToString();
                    Reptmodels.Column30 = row["Day30"].ToString();
                    Reptmodels.Column31 = row["Day31"].ToString();
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
        [HttpPost]
        public ActionResult MonthlyPayrollSalaryGets(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthlyPayrollSalaryGets(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.EmpId = row["EmpId"].ToString();
                    Reptmodels.EmpCode = row["EmpCode"].ToString();
                    Reptmodels.EmpName = row["Name"].ToString();
                    Reptmodels.Designation = row["DesignationDescription"].ToString();
                    Reptmodels.EmpUserId = row["Emp_UserId"].ToString();
                    Reptmodels.BasicSalary = row["BasicSalary"].ToString();
                    Reptmodels.Allowance = row["NightAlowance"].ToString();
                    Reptmodels.Deductions = row["Otherdeductions"].ToString();
                    Reptmodels.OTRate = row["OTRate"].ToString();
                    Reptmodels.Workinghrs = row["WorkingHours"].ToString();
                    Reptmodels.Earnings = row["EarningOthers"].ToString();
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


        [HttpPost]
        public ActionResult SalaryManagementGets(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalaryManagementGets(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.EmpId = row["EmpId"].ToString();
                    Reptmodels.EmpCode = row["EmpCode"].ToString();
                    Reptmodels.EmpName = row["Name"].ToString();
                    Reptmodels.Designation = row["DesignationDescription"].ToString();
                    Reptmodels.EmpUserId = row["Emp_UserId"].ToString();
                    Reptmodels.Workinghrs = row["WorkingHours"].ToString();
                    Reptmodels.SalaryAdvance = row["SalaryAdvance"].ToString();
                    Reptmodels.BasicSalary = row["BasicSalary"].ToString();
                    Reptmodels.HRA = row["HRA"].ToString();
                    Reptmodels.DA = row["DA"].ToString();
                    Reptmodels.TA = row["TA"].ToString();
                    Reptmodels.Allowance = row["NightAlowance"].ToString();
                    Reptmodels.Earnings = row["EarningOthers"].ToString();
                    Reptmodels.PF = row["PF"].ToString();
                    Reptmodels.Tax = row["Tax"].ToString();
                    Reptmodels.ESI = row["ESI"].ToString();
                    Reptmodels.Deductions = row["Otherdeductions"].ToString();
                    Reptmodels.LeavesTaken = row["LeavesTaken"].ToString();
                    Reptmodels.OTRate = row["OTRate"].ToString();
                    Reptmodels.TotalDaysInMonth = row["TotalDaysInMonth"].ToString();
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
        [HttpPost]
        public JsonResult SalaryManagementInsertNew(List<ReportModel> ReportModel)
        {
            ReportModel obj = new ReportModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ReportModel> oList = new List<ReportModel>();

            try
            {
                string[] tmpTable = new string[28];
                tmpTable[0] = "EmpId";
                tmpTable[1] = "EmpCode";
                tmpTable[2] = "EmpName";
                tmpTable[3] = "EmpUserId";
                tmpTable[4] = "Designation";
                tmpTable[5] = "Month";
                tmpTable[6] = "WorkingHours";
                tmpTable[7] = "LeavesTaken";
                tmpTable[8] = "SalaryAdvance";
                tmpTable[9] = "BasicSalary";
                tmpTable[10] = "HRA";
                tmpTable[11] = "DA";
                tmpTable[12] = "TA";
                tmpTable[13] = "Allowance";
                tmpTable[14] = "Earnings";
                tmpTable[15] = "TotalEarnings";
                tmpTable[16] = "PF";
                tmpTable[17] = "Tax";
                tmpTable[18] = "ESI";
                tmpTable[19] = "Deductions";
                tmpTable[20] = "LeaveDeductions";
                tmpTable[21] = "TotalDeductions";
                tmpTable[22] = "OTRate";
                tmpTable[23] = "OTAmount";
                tmpTable[24] = "TotalSalary";
                tmpTable[25] = "TotalDaysInMonth";
                tmpTable[26] = "DeptId";
                tmpTable[27] = "UserId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in ReportModel)
                {
                    obj.EmpId = details.EmpId;
                    obj.EmpCode = details.EmpCode;
                    obj.EmpName = details.EmpName;
                    obj.EmpUserId = details.EmpUserId;
                    obj.Designation = details.Designation;
                    obj.Month = details.Month;
                    obj.WorkingHours = details.WorkingHours;
                    obj.LeavesTaken = details.LeavesTaken;
                    obj.SalaryAdvance = details.SalaryAdvance;
                    obj.BasicSalary = details.BasicSalary;
                    obj.HRA = details.HRA;
                    obj.DA = details.DA;
                    obj.TA = details.TA;
                    obj.Allowance = details.Allowance;
                    obj.Earnings = details.Earnings;
                    obj.TotalEarnings = details.TotalEarnings;
                    obj.PF = details.PF;
                    obj.Tax = details.Tax;
                    obj.ESI = details.ESI;
                    obj.Deductions = details.Deductions;
                    obj.LeaveDeductions = details.LeaveDeductions;
                    obj.TotalDeductions = details.TotalDeductions;
                    obj.OTRate = details.OTRate;
                    obj.OTAmount = details.OTAmount;
                    obj.TotalSalary = details.TotalSalary;
                    obj.TotalDaysInMonth = details.TotalDaysInMonth;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;

                    dt.Rows.Add
                    (obj.EmpId, obj.EmpCode, obj.EmpName, obj.EmpUserId, obj.Designation,
                    obj.Month, obj.WorkingHours, obj.LeavesTaken, obj.SalaryAdvance, obj.BasicSalary,
                    obj.HRA, obj.DA, obj.TA, obj.Allowance, obj.Earnings, obj.TotalEarnings, obj.PF,
                    obj.Tax, obj.ESI, obj.Deductions, obj.LeaveDeductions, obj.TotalDeductions, obj.OTRate,
                    obj.OTAmount, obj.TotalSalary, obj.TotalDaysInMonth, obj.DeptId, obj.UserId);
                }

                dsDataSet = obj.SalaryManagementInsertNew(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel MModels = new ReportModel();
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
        public ActionResult GratuityReport(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GratuityReport(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.EmpId = row["EmpId"].ToString();
                    Reptmodels.EmpName = row["Name"].ToString();
                    Reptmodels.Designation = row["DesignationCode"].ToString();
                    Reptmodels.DateofJoin = row["DateofJoin"].ToString();
                    Reptmodels.BasicSalary = row["BasicSalary"].ToString();
                    Reptmodels.Year = row["Year"].ToString();
                    Reptmodels.Days = row["Days"].ToString();
                    Reptmodels.EliglibleDays = row["EligibleDays"].ToString();
                    Reptmodels.Gratuity = row["FinalGratuity"].ToString();
                    Reptmodels.ContractType = row["ContractType"].ToString();
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


        [HttpPost]
        public ActionResult EmployeeSearch(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeSearch(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel MModels = new ReportModel();
                    MModels.EmpId = row["EmpId"].ToString();
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.EmpName = row["Name"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }




        public ActionResult employeesearch(PayRoll_LeaveApplication PayRoll_LeaveApplication)
        {
            PayRoll_LeaveApplication obj = new PayRoll_LeaveApplication();
            List<PayRoll_LeaveApplication> oList = new List<PayRoll_LeaveApplication>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.employeesearch(PayRoll_LeaveApplication, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PayRoll_LeaveApplication MModels = new PayRoll_LeaveApplication();


                    MModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());

                    MModels.Name = row["Name"].ToString();
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.Designation = row["DesignationDescription"].ToString();
                    MModels.Department = row["DepartmentName"].ToString();
                    MModels.Mobile = row["Mobile"].ToString();
                    MModels.Email = row["Email"].ToString();
                    MModels.DateofJoin = row["DateofJoin"].ToString();
                    MModels.leavetaken = Convert.ToInt32(row["count"].ToString());
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
        public ActionResult LeaveApplicationInsert(PayRoll_LeaveApplication PayRoll_LeaveApplication)
        {
            PayRoll_LeaveApplication obj = new PayRoll_LeaveApplication();
            List<PayRoll_LeaveApplication> oList = new List<PayRoll_LeaveApplication>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LeaveApplicationInsert(PayRoll_LeaveApplication, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PayRoll_LeaveApplication MModels = new PayRoll_LeaveApplication();
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

        

          public ActionResult LeaveApplyGetandGets(PayRoll_LeaveApplication PayRoll_LeaveApplication)
        {
            PayRoll_LeaveApplication obj = new PayRoll_LeaveApplication();
            List<PayRoll_LeaveApplication> oList = new List<PayRoll_LeaveApplication>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LeaveApplyGetandGets(PayRoll_LeaveApplication, dbName);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PayRoll_LeaveApplication MModels = new PayRoll_LeaveApplication();

                    MModels.EmpId= Convert.ToInt32(row["EmpId"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.LeaveFrom = row["LeaveFrom"].ToString();
                    MModels.LeavesUpto = row["LeaveUpTo"].ToString();
                    MModels.LeaveType = row["LeaveType"].ToString();
                    MModels.TotalDays = Convert.ToInt32(row["TotalDays"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult ApprovedList(PayRoll_LeaveApplication PayRoll_LeaveApplication)
        {
            PayRoll_LeaveApplication obj = new PayRoll_LeaveApplication();
            List<PayRoll_LeaveApplication> oList = new List<PayRoll_LeaveApplication>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ApprovedList(PayRoll_LeaveApplication, dbName);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PayRoll_LeaveApplication MModels = new PayRoll_LeaveApplication();

                    MModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.LeaveFrom = row["LeaveFrom"].ToString();
                    MModels.LeavesUpto = row["LeaveUpTo"].ToString();
                    MModels.LeaveType = row["LeaveType"].ToString();
                    MModels.Flag = 1;
                    MModels.TotalDays = Convert.ToInt32(row["TotalDays"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        public ActionResult RejectedList(PayRoll_LeaveApplication PayRoll_LeaveApplication)
        {
            PayRoll_LeaveApplication obj = new PayRoll_LeaveApplication();
            List<PayRoll_LeaveApplication> oList = new List<PayRoll_LeaveApplication>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RejectedList(PayRoll_LeaveApplication, dbName);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PayRoll_LeaveApplication MModels = new PayRoll_LeaveApplication();

                    MModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.LeaveFrom = row["LeaveFrom"].ToString();
                    MModels.LeavesUpto = row["LeaveUpTo"].ToString();
                    MModels.LeaveType = row["LeaveType"].ToString();
                    MModels.Flag = 2;
                    MModels.TotalDays = Convert.ToInt32(row["TotalDays"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        //      string MailIdTo = "";
        public ActionResult Approval(PayRoll_LeaveApplication PayRoll_LeaveApplication)
        {
            PayRoll_LeaveApplication obj = new PayRoll_LeaveApplication();
            List<PayRoll_LeaveApplication> oList = new List<PayRoll_LeaveApplication>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Approval(PayRoll_LeaveApplication, dbName);
               
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {                   
                    PayRoll_LeaveApplication MModels = new PayRoll_LeaveApplication();
                    MModels.Status = row["Status"].ToString();

                    MModels.CompanyMail = row["CompanyMail"].ToString();
                   MModels.EmployeeMail = row["EmployeeMail"].ToString();
                    MModels.PWD = row["PWD"].ToString();
                    oList.Add(MModels);
                }
     
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        public bool email(PayRoll_LeaveApplication PayRoll_LeaveApplication)
        {

           

            try
            {
                PayRoll_LeaveApplication obj = new PayRoll_LeaveApplication();
                // string MailIdTo = "anandmpsla2010@gmail.com";

                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                
                string EmployeeMail = PayRoll_LeaveApplication.EmployeeMail;
                string PWD= PayRoll_LeaveApplication.PWD;
                string CompanyMail= PayRoll_LeaveApplication.CompanyMail;

                mail.From = new MailAddress(CompanyMail);


                mail.To.Add(EmployeeMail);
                mail.Subject = "LeaveRequest";
                mail.Body = "Congrats ! Your Leave Request has been Approved";

                //Gmail Port
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential(CompanyMail, PWD);

                //You can specifiy below line of code either in web.config file or as below.
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return true;

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
                return false;
            
        }
        }




        public bool rejectmail(PayRoll_LeaveApplication PayRoll_LeaveApplication)
        {
            try
            {
                PayRoll_LeaveApplication obj = new PayRoll_LeaveApplication();
                //    string MailIdTo = "anandmpsla2010@gmail.com";

                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                string EmployeeMail = PayRoll_LeaveApplication.EmployeeMail;
                string PWD = PayRoll_LeaveApplication.PWD;
                string CompanyMail = PayRoll_LeaveApplication.CompanyMail;

                mail.From = new MailAddress(CompanyMail);
                mail.To.Add(EmployeeMail);
                mail.Subject = "LeaveRequest";
                mail.Body = "Sorry ! Your Leave Request has been Rejected";
              
                //Gmail Port
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential(CompanyMail, PWD);

                //You can specifiy below line of code either in web.config file or as below.
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
                return false;
            }
        }




    }
}










//public ActionResult SendMailToUser()
//{

//    bool Result = false;
//    try
//    {

//        //  Result = SendEmail("anandmpsla2010@gmail.com","Testing....", "<p> Hii Anand ,</br> Tsting Message </br> With Best Regards </p> ");
//        Result = email();
//        var a = Result;

//    }
//    catch (Exception ex)
//    {
//        Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
//    }

//    return Json(new { Result, success = true }, JsonRequestBehavior.AllowGet);
//}

// export to pdf