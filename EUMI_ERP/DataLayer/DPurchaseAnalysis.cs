using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using EUMI_ERP.Models; 

namespace EUMI_ERP.DataLayer
{
    public class DPurchaseAnalysis
    {
        private SqlParameter[] arlParms;
        public DataSet PurchaseAnalysisInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseAnalysis", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseAnalysisInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseanalysisPurchaseGet(PurchaseAnalysisModel PurchaseAnalysisModel, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", PurchaseAnalysisModel.ItemId);
                arlParms[1] = new SqlParameter("@LocId", PurchaseAnalysisModel.Location);
                return SQLHelper.ExecuteDataset("PurchaseanalysisPurchaseGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseanalysisPurchaseOrderGet(PurchaseAnalysisModel PurchaseAnalysisModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", PurchaseAnalysisModel.ItemId);
                return SQLHelper.ExecuteDataset("PurchaseanalysisPurchaseOrderGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseAnalysisListGet(PurchaseAnalysisModel PurchaseAnalysisModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];


                arlParms[0] = new SqlParameter("@SupplierId", PurchaseAnalysisModel.SupplierId);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseAnalysisModel.DeptId);
                arlParms[2] = new SqlParameter("@Flag", PurchaseAnalysisModel.Flag);
                return SQLHelper.ExecuteDataset("PurchaseAnalysisListGet", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
    }
}