using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP
{
    public class ADataImport
    {
        private SqlParameter[] arlParms;

         public long RegSeries { get; set; }
         public DataSet PHARMAProductFileUpload(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[1] = new SqlParameter("@BulkPharmaBill", SqlDbType.Structured);
                arlParms[1].Value = dt;
                return SQLHelper.ExecuteDataset("BulkPharmabillDataImport", dbName, arlParms);
            }

            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        

        public DataSet PHARMASRProductFileUpload(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[1] = new SqlParameter("@BulkPharmaBill", SqlDbType.Structured);
                arlParms[1].Value = dt;
                return SQLHelper.ExecuteDataset("BulkPharmabillSRDataImport", dbName, arlParms);
            }

            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet ProductFileUpload(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[1] = new SqlParameter("@BulkBill", SqlDbType.Structured);
                arlParms[1].Value = dt;
                return SQLHelper.ExecuteDataset("BulkbillDataImport", dbName, arlParms);
            }

            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }

}