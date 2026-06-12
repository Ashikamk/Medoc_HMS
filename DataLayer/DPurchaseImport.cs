using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP.DataLayer
{
    public class DPurchaseImport
    {
        private SqlParameter[] arlParms;

        public DataSet PurchaseImportInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseImport", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseImportInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PurchaseImportItemInsert(PurchaseImportModel PurchaseImportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@SlNo", PurchaseImportModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseImportModel.DeptId);
                arlParms[2] = new SqlParameter("@ImportSlNo", PurchaseImportModel.PurchaseSlNo);
                return SQLHelper.ExecuteDataset("PurchaseImportItemInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseImportGetandGets(PurchaseImportModel PurchaseImportModel, string dbName)  
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", PurchaseImportModel.SlNo);               
                arlParms[1] = new SqlParameter("@DeptId", PurchaseImportModel.DeptId); 
                return SQLHelper.ExecuteDataset("PurchaseImportGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ImportNoSearch(PurchaseImportModel PurchaseImportModel, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@InvoNo", PurchaseImportModel.InvoNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseImportModel.DeptId);
                arlParms[2] = new SqlParameter("@LocId", PurchaseImportModel.LocnId); 

                return SQLHelper.ExecuteDataset("ImportNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet UsedCarsOtherCostGets(PurchaseImportModel PurchaseImportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseImportModel.SupplierId);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseImportModel.DeptId);

                return SQLHelper.ExecuteDataset("UsedCarsOtherCostGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DeletePurchaseImport(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PurMainId", PurchaseInvoiceModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("PurchaseImportDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



    }
}