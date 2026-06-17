using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataLayer
{
    public class DAttendanceEntry_PayRoll
    {
        private SqlParameter[] arlParms;

        public DataSet AttendanceEmployeeSearch(PayRollAttendanceEntry PayRollAttendanceEntry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@LocId", PayRollAttendanceEntry.LocId);
                arlParms[1] = new SqlParameter("@DeptId", PayRollAttendanceEntry.DeptId);
                arlParms[2] = new SqlParameter("@AtendanceDate", PayRollAttendanceEntry.AtendanceDate); 
                return SQLHelper.ExecuteDataset("PayRoll_EmployeeSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
       
        
        public DataSet AttendanceEntryInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AttendanceEntry", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("AttendanceEntryInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}