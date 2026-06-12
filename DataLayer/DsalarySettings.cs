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
    public class DsalarySettings
    {
        private SqlParameter[] arlParms;
        KeyValues KeyValues = new KeyValues();



        public DataSet GetCopy(DesignationModel DesignationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@JobId", DesignationModel.JobCode);
                return SQLHelper.ExecuteDataset("GetCopyOfSalarySettings", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalarySettingInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalarySettingsType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalarySettingsInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}