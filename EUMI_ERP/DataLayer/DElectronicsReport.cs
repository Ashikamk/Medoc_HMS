using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP
{
    public class DElectronicsReport
    {
        private SqlParameter[] arlParms;

        public DataSet ElectronicsItemwiseReport(ElectronicsReport ElectronicsReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Condition", ElectronicsReport.Condition);
                arlParms[1] = new SqlParameter("@Condition1", ElectronicsReport.Condition1);
                arlParms[2] = new SqlParameter("@CountAcc", ElectronicsReport.Count);
                return SQLHelper.ExecuteDataset("Rpt_ElectronicsReport", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ModelNoSearch(ElectronicsReport ElectronicsReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SlNo", ElectronicsReport.SlNo);
                return SQLHelper.ExecuteDataset("ModelNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ElectronicsReportwithAccessories(ElectronicsReport ElectronicsReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition1", ElectronicsReport.Condition);
                return SQLHelper.ExecuteDataset("Rpt_ElectronicswithAccessories", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


    }
}