using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;




namespace EUMI_ERP.Models
{
    public class PayRoll_LeaveApplication
    {
        public string PWD { get; set; }
        public string EmpCode { get; set; }
        public int EmpId { get; set; }
        public string Name { get; set; } 
        public string Designation { get; set; }
        public string Department { get; set; }
        public string DateofJoin { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }

        public string EmployeeMail { get; set; }
        public string CompanyMail { get; set; }
        public string LeaveType { get; set; }
        public string LeaveFrom { get; set; }
        public string LeavesUpto { get; set; }
        public int UId { get; set; }
        public int DeptId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public int TotalDays { get; set; }
        public string Date { get; set; }
        public int Flag { get; set; }

      public int leavetaken { get; set; }




        DPayRollLeaveApplication oDPayRollLeaveApplication = new DPayRollLeaveApplication();
       

        public DataSet employeesearch(PayRoll_LeaveApplication oPayRoll_LeaveApplication, string dbName)
        {
            return oDPayRollLeaveApplication.employeesearch(oPayRoll_LeaveApplication, dbName);
        }
        public DataSet LeaveApplicationInsert(PayRoll_LeaveApplication oPayRoll_LeaveApplication, string dbName)
        {
            return oDPayRollLeaveApplication.LeaveApplicationInsert(oPayRoll_LeaveApplication, dbName);
        }


        public DataSet LeaveApplyGetandGets(PayRoll_LeaveApplication oPayRoll_LeaveApplication, string dbName)
        {
            return oDPayRollLeaveApplication.LeaveApplyGetandGets(oPayRoll_LeaveApplication, dbName);
        }
        public DataSet ApprovedList(PayRoll_LeaveApplication oPayRoll_LeaveApplication, string dbName)
        {
            return oDPayRollLeaveApplication.ApprovedList(oPayRoll_LeaveApplication, dbName);
        }

        public DataSet RejectedList(PayRoll_LeaveApplication oPayRoll_LeaveApplication, string dbName)
        {
            return oDPayRollLeaveApplication.RejectedList(oPayRoll_LeaveApplication, dbName);
        }

        public DataSet Approval(PayRoll_LeaveApplication oPayRoll_LeaveApplication, string dbName)
        {
            return oDPayRollLeaveApplication.Approval(oPayRoll_LeaveApplication, dbName);
        }


        






    }
}