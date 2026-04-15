using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using EUMI_ERP.Models;
namespace EUMI_ERP.DataLayer
{
    public class Djoballotment
    {

        private SqlParameter[] arlParms;
        KeyValues KeyValues = new KeyValues();



        public DataSet GetNonAssignedEmployees(JobAllotment oJobAllotment, string dbName)
        {
            try
            {
                if (oJobAllotment.Copy == 1) {
                    arlParms = new SqlParameter[2];
                    arlParms[0] = new SqlParameter("@AllotedJobCode", oJobAllotment.JobCode);
                    arlParms[1] = new SqlParameter("@JobAllotedDate", oJobAllotment.JobAllotedDate);
                    return SQLHelper.ExecuteDataset("AvailableEmployeeInfoCopy", dbName, arlParms);

               }
                else {
                    arlParms = new SqlParameter[1];
                    arlParms[0] = new SqlParameter("@AllotedJobCode", oJobAllotment.JobCode);
                    return SQLHelper.ExecuteDataset("AvailableEmployeeInfo", dbName, arlParms);
                }
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet JobAllotmentInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@JobAllotment", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("JobAllotmentInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

    }
}