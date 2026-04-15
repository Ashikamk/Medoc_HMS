using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataLayer
{
    public class DMRVPurchase
    {
        private SqlParameter[] arlParms;
        public DataSet MRVInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MRVInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MRVInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    public DataSet SupplierDONoSearch(MRVModel MRVModel, string dbName)
    {
        try
        {
            arlParms = new SqlParameter[2];
            arlParms[0] = new SqlParameter("@SupplierId", MRVModel.SupplierId);
            arlParms[1] = new SqlParameter("@DONo", MRVModel.DONo);

            return SQLHelper.ExecuteDataset("SupplierDONoSearch", dbName, arlParms);

        }
        catch (SqlException exMe)
        {
            Console.WriteLine(exMe.Message);
            return null;
        }

    }
        public DataSet MRVSerialNoSearch(MRVModel MRVModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DONo", MRVModel.DONo);
                arlParms[1] = new SqlParameter("@DeptId", MRVModel.DepartmentId);
                arlParms[2] = new SqlParameter("@LocId", MRVModel.LocnId);

                return SQLHelper.ExecuteDataset("MRVSerialNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MRVGetandGets(MRVModel MRVModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@MRVNo", MRVModel.MRVNo);
                arlParms[1] = new SqlParameter("@DeptId", MRVModel.DepartmentId);
                return SQLHelper.ExecuteDataset("MRVGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MRVPurchaseInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MRVPurchaseInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MRVPurchaseInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet OtherCostInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@OtherCostInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MRVOtherCostInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }




        public DataSet MRVPurchaseGetandGets(MRVPurchase MRVPurchase, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", MRVPurchase.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", MRVPurchase.DepartmentId);
                return SQLHelper.ExecuteDataset("MRVPurchaseGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet MRVPurchaseOtherCostGetandGets(MRVPurchase MRVPurchase, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", MRVPurchase.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", MRVPurchase.DepartmentId);
                return SQLHelper.ExecuteDataset("MRVPurchaseOtherCostGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MRVPurchaseSerialNoSearch(MRVPurchase MRVPurchase, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@InvoNo", MRVPurchase.InvoNo);
                arlParms[1] = new SqlParameter("@DeptId", MRVPurchase.DepartmentId);
                arlParms[2] = new SqlParameter("@LocId", MRVPurchase.LocnId);

                return SQLHelper.ExecuteDataset("MRVPurchaseSerialNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PendingMRVGets(MRVModel MRVModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@SupplierId", MRVModel.SupplierId);
                arlParms[1] = new SqlParameter("@FromDate", MRVModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", MRVModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", MRVModel.DepartmentId);
                return SQLHelper.ExecuteDataset("PendingMRVGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PendingMRVGetProduct(MRVModel MRVModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@MRVNumber", MRVModel.MRVNumber);
                arlParms[1] = new SqlParameter("@ItemId", MRVModel.ItemId);
                arlParms[2] = new SqlParameter("@DeptId", MRVModel.DepartmentId);
                return SQLHelper.ExecuteDataset("PendingMRVGetProduct", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        

        public DataSet DeleteMRV(MRVModel MRVModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@MRVNo", MRVModel.MRVNo);
                arlParms[1] = new SqlParameter("@DeptId", MRVModel.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", MRVModel.UserId);
                return SQLHelper.ExecuteDataset("MRVDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DeleteMRVPurchase(MRVPurchase MRVPurchase, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PurMainId", MRVPurchase.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", MRVPurchase.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", MRVPurchase.UserId);
                return SQLHelper.ExecuteDataset("MRVPurchaseInvoiceDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MRVList(MRVPurchase MRVPurchase, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", MRVPurchase.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MRVPurchase.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", MRVPurchase.DepartmentId);
                arlParms[3] = new SqlParameter("@UserId", MRVPurchase.UserId);
                return SQLHelper.ExecuteDataset("MRVView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}