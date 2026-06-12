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
    public class datacash
    {
        private SqlParameter[] arlParms;
        KeyValues KeyValues = new KeyValues();

        public DataSet CashGetandGets(modelcash MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.mfromdate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.mtodate);
                return SQLHelper.ExecuteDataset("CASHREPORT", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet currencyGetandGets(modelcash MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.mfromdate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.mtodate);
                   return SQLHelper.ExecuteDataset("CurrencywiseReport", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}