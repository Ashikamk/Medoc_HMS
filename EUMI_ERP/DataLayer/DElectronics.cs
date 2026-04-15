using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataLayer
{
    public class DElectronics
    {
        private SqlParameter[] arlParms;
        
             
        public DataSet MainItemDetailsGetandGets(ElectronicsProductionModel ElectronicsProductionModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ProductionItemId", ElectronicsProductionModel.ProductionItemId);
                arlParms[1] = new SqlParameter("@DeptId", ElectronicsProductionModel.DeptId);
                arlParms[2] = new SqlParameter("@Location", ElectronicsProductionModel.Location);
                return SQLHelper.ExecuteDataset("ProductionItemGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ElectronicsProductionProductSearch(ElectronicsProductionModel ElectronicsProductionModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ItemId", ElectronicsProductionModel.ItemId);
                arlParms[1] = new SqlParameter("@DeptId", ElectronicsProductionModel.DeptId);
                arlParms[2] = new SqlParameter("@Location", ElectronicsProductionModel.Location);
                return SQLHelper.ExecuteDataset("ElectronicsProductionProductSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet RemoveItem(ElectronicsProductionModel ElectronicsProductionModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@ItemId", ElectronicsProductionModel.ProductionItemId);
                arlParms[1] = new SqlParameter("@DeptId", ElectronicsProductionModel.DeptId);
                arlParms[2] = new SqlParameter("@Location", ElectronicsProductionModel.Location);
                arlParms[3] = new SqlParameter("@ItemAccId", ElectronicsProductionModel.ItemId);
                arlParms[4] = new SqlParameter("@Quantity", ElectronicsProductionModel.Quantity);
                return SQLHelper.ExecuteDataset("RemoveItem", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ElectronicProductionInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Production", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ElectronicProductionInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        //copy Production Entry-auto complete
        public DataSet ElectronicsProductionnumberSearch(electronicproductionInsertModel electronicproductionInsertModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ProductionNo", electronicproductionInsertModel.ProductionNo);
                arlParms[1] = new SqlParameter("@DeptId", electronicproductionInsertModel.DeptId);
                arlParms[2] = new SqlParameter("@Location", electronicproductionInsertModel.Location);
                return SQLHelper.ExecuteDataset("ElectronicsProductionnumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        //copy production entry into grid
        public DataSet ElectronicsProductionGetandGets(electronicproductionInsertModel electronicproductionInsertModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ProductionNo", electronicproductionInsertModel.ProductionNo);
                arlParms[1] = new SqlParameter("@DeptId", electronicproductionInsertModel.DeptId);
                return SQLHelper.ExecuteDataset("ElectronicsProductionGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}