using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using EUMI_ERP.Models;
namespace EUMI_ERP
{
    public class DSalaryManagement
    {
        private SqlParameter[] arlParms;
        public DataSet GetPayRollCalcInfo(SalaryManagementModel SalaryManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@StartingDate", SalaryManagement.Startingdate);
                arlParms[1] = new SqlParameter("@enddate", SalaryManagement.Enddate);
                return SQLHelper.ExecuteDataset("GetPayRollCalcInfo", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalaryManagementInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalaryManagementTypes", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalaryManagementInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet GetPayRollChckInfo(SalaryManagementModel SalaryManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@StartingDate", SalaryManagement.Startingdate);
                arlParms[1] = new SqlParameter("@enddate", SalaryManagement.Enddate);
                return SQLHelper.ExecuteDataset("GetPayRollChckInfo", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet GetCopy(SalaryManagementModel SalaryManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@StartingDate", SalaryManagement.Startingdate);
                arlParms[1] = new SqlParameter("@enddate", SalaryManagement.Enddate);
                return SQLHelper.ExecuteDataset("GetPayRollCopy", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet SalaryReportGet(SalaryManagementModel SalaryManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@StartingDate", SalaryManagement.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", SalaryManagement.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalaryManagement.DeptId);
                arlParms[3] = new SqlParameter("@EmpId", SalaryManagement.EmpId);
                return SQLHelper.ExecuteDataset("Rpt_Salary", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet GetAttendancereport(SalaryManagementModel SalaryManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalaryManagement.FromDate);
                arlParms[1] = new SqlParameter("@Todate", SalaryManagement.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalaryManagement.DeptId);
                arlParms[3] = new SqlParameter("@EmpId", SalaryManagement.EmpId);
                return SQLHelper.ExecuteDataset("Rpt_AttendanceReportNew", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


    }
}