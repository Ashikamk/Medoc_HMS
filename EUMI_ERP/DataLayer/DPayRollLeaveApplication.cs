using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;





namespace EUMI_ERP.DataLayer
{
    public class DPayRollLeaveApplication
    {
        private SqlParameter[] arlParms;
        public DataSet employeesearch(PayRoll_LeaveApplication PayRoll_LeaveApplication, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@EmpCode", PayRoll_LeaveApplication.EmpCode);
                arlParms[1] = new SqlParameter("@EmpName", PayRoll_LeaveApplication.EmpCode);
                return SQLHelper.ExecuteDataset("LeaveApply_EmployeeSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LeaveApplicationInsert(PayRoll_LeaveApplication PayRoll_LeaveApplication, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[9];
                arlParms[0] = new SqlParameter("@EmpId", PayRoll_LeaveApplication.EmpId);
                arlParms[1] = new SqlParameter("@Date", PayRoll_LeaveApplication.Date);
                arlParms[2] = new SqlParameter("@LeaveType", PayRoll_LeaveApplication.LeaveType);
                arlParms[3] = new SqlParameter("@LeaveFrom", PayRoll_LeaveApplication.LeaveFrom);
                arlParms[4] = new SqlParameter("@LeavesUpto", PayRoll_LeaveApplication.LeavesUpto);
                arlParms[5] = new SqlParameter("@TotalDays", PayRoll_LeaveApplication.TotalDays);
                arlParms[6] = new SqlParameter("@UId", PayRoll_LeaveApplication.UId);
                arlParms[7] = new SqlParameter("@DeptId", PayRoll_LeaveApplication.DeptId);
                arlParms[8] = new SqlParameter("@DelFlag", PayRoll_LeaveApplication.DelFlag);                
                return SQLHelper.ExecuteDataset("PayRoll_LeaveApplicationInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }




        public DataSet LeaveApplyGetandGets(PayRoll_LeaveApplication PayRoll_LeaveApplication, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Date", PayRoll_LeaveApplication.Date);
                arlParms[1] = new SqlParameter("@Flag", PayRoll_LeaveApplication.Flag);

                return SQLHelper.ExecuteDataset("PayRoll_LeaveApplyGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ApprovedList(PayRoll_LeaveApplication PayRoll_LeaveApplication, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeptId", PayRoll_LeaveApplication.DeptId);
                arlParms[1] = new SqlParameter("@Flag", PayRoll_LeaveApplication.Flag);

                return SQLHelper.ExecuteDataset("ApprovedListGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet RejectedList(PayRoll_LeaveApplication PayRoll_LeaveApplication, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeptId", PayRoll_LeaveApplication.Date);
                arlParms[1] = new SqlParameter("@Flag", PayRoll_LeaveApplication.Flag);

                return SQLHelper.ExecuteDataset("RejectedListGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet Approval(PayRoll_LeaveApplication PayRoll_LeaveApplication, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@EmpId", PayRoll_LeaveApplication.EmpId);
                arlParms[1] = new SqlParameter("@DeptId", PayRoll_LeaveApplication.DeptId);
                arlParms[2] = new SqlParameter("@Flag", PayRoll_LeaveApplication.Flag);
                return SQLHelper.ExecuteDataset("PayRoll_Approval", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }






        }
}