using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class SalaryManagementModel
    {
        public string Year { get; set; }

        public string month { get; set; }

        public int EmpId { get; set; }
        public string EmpCode { get; set; }
        public string Name { get; set; }

        public long DepartmentId { get; set; }
        public long LocationId { get; set; }
        public long DesignationId { get; set; }

        public string DateofJoin { get; set; }
        public string Gender { get; set; }

        public string DOB { get; set; }

        public decimal BasicSalary { get; set; }
        public string BS { get; set; }
        public decimal NightAlowance { get; set; }
        public string DA { get; set; }
        public decimal TA { get; set; }
        public decimal HRA { get; set; }
        public decimal EarningOthers { get; set; }

        public decimal PF { get; set; }
        public decimal Tax { get; set; }

        public decimal ESI { get; set; }

        public decimal Otherdeductions { get; set; }
        public string PayRollType { get; set; }
        public string DesignationDescription { get; set; }
        public decimal Earnings { get; set; }
        public decimal deductions { get; set; }
        public decimal OTRate { get; set; }
        public decimal NetSalary { get; set; }
        public decimal TotalEarnings { get; set; }
        public decimal TotalDeductions { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int UId { get; set; }
        public int DeptId { get; set; }

        public int DelFlag { get; set; }

        public int PayRollCalc { get; set; }

        public decimal Ctc { get; set; }
        public decimal SalaryAdvance { get; set; }

        public decimal OTHrs { get; set; }

        public int PH_Fulldays { get; set; }
        public int PH_Halfdays { get; set; }



        public int HalfDays { get; set; }

                public int FullDays { get; set; }

        public string Startingdate { get; set; }

        public string Enddate { get; set; }

        public int Leaves { get; set; }
        public string DepartmentName { get; set; }
        public string TAF { get; set; }
        public string NA { get; set; }
        public string HRAF { get; set; }
        public string EO { get; set; }
        public string TE { get; set; }
        public string PFf { get; set; }
        public string Taxf { get; set; }
        public string ESIf { get; set; }
        public string Od { get; set; }
        public string TD { get; set; }
        public string NS { get; set; }
        public string OTR { get; set; }
        public string WorkingHours { get; set; }
        public int WorkedSession { get; set; }
        public int PH_WorkedSession { get; set; }
        public int Holidays { get; set; }
        public string Status { get; set; }
        public string Leave { get; set; }
        public string Holiday { get; set; }
        public string WorkedSessions { get; set; }
        public string OTHr { get; set; }
        public int advflag { get; set; }

                DSalaryManagement oDSalaryManagement = new DSalaryManagement();


        public DataSet GetPayRollCalcInfo(SalaryManagementModel SalaryManagement, string dbName)
        {
            return oDSalaryManagement.GetPayRollCalcInfo(SalaryManagement, dbName);
        }

        public DataSet SalaryManagementInsertandUpdate(DataTable dt, string dbName)
        {
            return oDSalaryManagement.SalaryManagementInsertandUpdate(dt, dbName);
        }
        public DataSet GetPayRollChckInfo(SalaryManagementModel SalaryManagement, string dbName)
        {
            return oDSalaryManagement.GetPayRollChckInfo(SalaryManagement, dbName);
        }
        public DataSet GetCopy(SalaryManagementModel SalaryManagement, string dbName)
        {
            return oDSalaryManagement.GetCopy(SalaryManagement, dbName);
        }

        public DataSet GetAttendancereport(SalaryManagementModel SalaryManagement, string dbName)
        {
            return oDSalaryManagement.GetAttendancereport(SalaryManagement, dbName);
        }
        public DataSet SalaryReportGet(SalaryManagementModel SalaryManagement, string dbName)
        {
            return oDSalaryManagement.SalaryReportGet(SalaryManagement, dbName);
        }



    }
}