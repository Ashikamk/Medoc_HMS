using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataLayer
{
    public class DPurchase
    {

        //=======================Purchase Invoice================================

        private SqlParameter[] arlParms;
        public DataSet ProductSearch(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);
                arlParms[1] = new SqlParameter("@SupplierId", ItemMasterModel.SlNumber);
                arlParms[2] = new SqlParameter("@JobNo", ItemMasterModel.JobNo);
                arlParms[3] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[4] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                return SQLHelper.ExecuteDataset("ProductSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet F2PurchaseProductSearch(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);
                arlParms[1] = new SqlParameter("@SupplierId", ItemMasterModel.SlNumber);
                arlParms[2] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                arlParms[4] = new SqlParameter("@ExcludeItems", ItemMasterModel.Number);
                return SQLHelper.ExecuteDataset("F2PurchaseProductSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet CompareItems(DataTable dt, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CompareItems", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ComparePurchaseItems", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SupplierDONoSearch(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseOrder.SupplierId);
                arlParms[1] = new SqlParameter("@DONo", PurchaseOrder.DONo);

                return SQLHelper.ExecuteDataset("PerformaSupplierDONoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PerformaGetandGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PPNo", PurchaseOrder.PPNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                return SQLHelper.ExecuteDataset("PerformaNOGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet PurchaseReturn_IMEI_Search(PurchaseReturn PurchaseReturn, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ItemId", PurchaseReturn.ItemId);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseReturn.DepartmentId);
                arlParms[2] = new SqlParameter("@IMEINum", PurchaseReturn.IMEI);
                return SQLHelper.ExecuteDataset("PurchaseReturn_IMEI_Search", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseInvoiceInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseInvoiceInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseInvoiceInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseItemTemporarySave(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseInvoiceInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseItemTemporarySave", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MobilePurchaseInvoiceInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseInvoiceInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MobilePurchaseInvoiceInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PurchaseInvoiceUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseInvoiceInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseInvoiceUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MobilePurchaseInvoiceUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseInvoiceInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MobilePurchaseInvoiceUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseAverageCostRefresh(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ItemCode", PurchaseInvoiceModel.ItemCode);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("PurchaseAverageCostRefresh", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet PurchaseInvoiceGetandGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", PurchaseInvoiceModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseInvoiceGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        
             public DataSet PurchaseInvoiceListOpening(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", PurchaseInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@PurchaseDeptId", PurchaseInvoiceModel.PurchaseDeptId);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[4] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("PurchaseInvoiceViewOpening", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        




        public DataSet PurchaseInvoiceList(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", PurchaseInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@PurchaseDeptId", PurchaseInvoiceModel.PurchaseDeptId);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[4] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("PurchaseInvoiceView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PerformaList(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", PurchaseInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@PurchaseDeptId", PurchaseInvoiceModel.PurchaseDeptId);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[4] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("PerformaList", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseOrderList(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseOrder.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", PurchaseOrder.ToDate);
                arlParms[2] = new SqlParameter("@PurchaseDeptId", PurchaseOrder.PurchaseDeptId);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                arlParms[4] = new SqlParameter("@UserId", PurchaseOrder.UserId);
                return SQLHelper.ExecuteDataset("PurchaseOrderView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseTransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ItemId", PurchaseInvoiceModel.ItemId);
                arlParms[1] = new SqlParameter("@DepId", PurchaseInvoiceModel.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                arlParms[3] = new SqlParameter("@Type", PurchaseInvoiceModel.Type);
                return SQLHelper.ExecuteDataset("PurchaseTransGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet IMEIPurchaseTransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", PurchaseInvoiceModel.ItemId);
                arlParms[1] = new SqlParameter("@DepId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("IMEIPurchaseTransGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet IMEIPurchaseTransactionPopup(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@IMEINum", PurchaseInvoiceModel.IMEI);
                arlParms[1] = new SqlParameter("@DepId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("IMEIAvailablePurchaseTransGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet TransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ItemId", PurchaseInvoiceModel.ItemId);
                arlParms[1] = new SqlParameter("@DepId", PurchaseInvoiceModel.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                arlParms[3] = new SqlParameter("@type", PurchaseInvoiceModel.Type);
                return SQLHelper.ExecuteDataset("TransactionGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MobileTransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", PurchaseInvoiceModel.ItemId);
                arlParms[1] = new SqlParameter("@DepId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("MobileTransactionGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet IMEISearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", PurchaseInvoiceModel.ItemId);
                arlParms[1] = new SqlParameter("@DepId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("IMEIGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet IMEIAvailableSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", PurchaseInvoiceModel.ItemId);
                arlParms[1] = new SqlParameter("@DepId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("IMEIAvailableGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PrevoiusUnsavedProductofSupplier(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseInvoiceModel.SupplierId);
                arlParms[1] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("PrevoiusUnsavedProductofSupplier", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PrevItemsExistorNotPurchase(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseInvoiceModel.SupplierId);
                arlParms[1] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("PrevItemsExistorNotPurchase", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet DeletePurchase(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PurMainId", PurchaseInvoiceModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("PurchaseInvoiceDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DeletePerforma(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PPNO", PurchaseInvoiceModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("PurchasePerformaDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet DeletePurchaseEnquiry(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@EnquiryNo", PurchaseEnquiry.EnquiryNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseEnquiry.UserId);
                return SQLHelper.ExecuteDataset("PurchaseEnquiryDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        
        public DataSet CheckDeletedPurchase(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Type", PurchaseInvoiceModel.BillNo);
                arlParms[1] = new SqlParameter("@SerialNo", PurchaseInvoiceModel.SlNo);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("CheckDeletedPurchase", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        

        

        public DataSet DeletePurchaseReturn(PurchaseReturn PurchaseReturn, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PRNo", PurchaseReturn.PRNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseReturn.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseReturn.UserId);
                return SQLHelper.ExecuteDataset("PurchaseReturnDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        

        public DataSet SerialNoSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@InvoNo", PurchaseInvoiceModel.InvoNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[2] = new SqlParameter("@LocId", PurchaseInvoiceModel.LocnId);

                return SQLHelper.ExecuteDataset("PurchaseSerialNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SupplierInvoiceNoSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseInvoiceModel.SupplierId);
                arlParms[1] = new SqlParameter("@InvoNo", PurchaseInvoiceModel.InvoNo);

                return SQLHelper.ExecuteDataset("SupplierInvoiceNoSearch", dbName, arlParms);

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
                return SQLHelper.ExecuteDataset("OtherCostInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseOtherCostGetandGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", PurchaseInvoiceModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseOtherCostGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseHistoryGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@TYPE", PurchaseInvoiceModel.Status);
                arlParms[1] = new SqlParameter("@SLNO", PurchaseInvoiceModel.SlNo);
                arlParms[2] = new SqlParameter("@DEPTID", PurchaseInvoiceModel.DepartmentId);
                arlParms[3] = new SqlParameter("@USERID", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("PurchaseHistoryGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        //=======================Purchase Entry================================



        public DataSet PurchaseEnquiryInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseEnquiryInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseEnquiryInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PurchaseEnquiryGetandGets(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@EnquiryNo", PurchaseEnquiry.EnquiryNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseEnquiryGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
       public DataSet PurchaseEnquiryList(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseEnquiry.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", PurchaseEnquiry.ToDate);
                arlParms[2] = new SqlParameter("@PurchaseDeptId", PurchaseEnquiry.PurchaseDeptId);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                arlParms[4] = new SqlParameter("@UserId", PurchaseEnquiry.UserId);
                return SQLHelper.ExecuteDataset("PurchaseEnquiryView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet PurchaseReturnList(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseEnquiry.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", PurchaseEnquiry.ToDate);
                arlParms[2] = new SqlParameter("@PurchaseDeptId", PurchaseEnquiry.PurchaseDeptId);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                arlParms[4] = new SqlParameter("@UserId", PurchaseEnquiry.UserId);
                return SQLHelper.ExecuteDataset("PurchaseReturnView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet EnquiryNoSearch(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@EnquiryNo", PurchaseEnquiry.EnquiryNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                arlParms[2] = new SqlParameter("@LocId", PurchaseEnquiry.LocnId);

                return SQLHelper.ExecuteDataset("PurchaseEnquiryNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseEnquiryGetsforPO(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseEnquiry.SupplierId);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseEnquiryGetsforPO", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PurchaseEnquiryProductRecall(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PENumber", PurchaseEnquiry.PENumber);
                arlParms[1] = new SqlParameter("@ItemId", PurchaseEnquiry.ItemId);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseEnquiryProductRecall", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PurchaseEntryGetProductforPO(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PENumber", PurchaseEnquiry.PENumber);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseEnquiryGetProductforPO", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseEnquiryGetProductforPOSort(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PENumber", PurchaseEnquiry.PENumber);
                arlParms[1] = new SqlParameter("@ItemId", PurchaseEnquiry.ItemId);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseEnquiryGetProductforPOSort", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseEnquiryGetsforPOSort(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseEnquiry.SupplierId);
                arlParms[1] = new SqlParameter("@FromDate", PurchaseEnquiry.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", PurchaseEnquiry.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseEnquiryGetsforPOSort", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        //=======================Purchase Order================================


        public DataSet PurchaseOrderInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseOrderInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseOrderInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseOrderUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseOrderInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseOrderUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        
        public DataSet PurchaseOrderGetandGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@OrderNo", PurchaseOrder.OrderNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseOrderGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PerformaItemsGetandGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@OrderNo", PurchaseOrder.PPNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchasePerformaGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet OrderNoSearch(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@OrderNo", PurchaseOrder.OrderNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                arlParms[2] = new SqlParameter("@LocId", PurchaseOrder.LocnId);

                return SQLHelper.ExecuteDataset("PurchaseOrderNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PerformaNoSearch(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PerformaNo", PurchaseOrder.PerformaNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                arlParms[2] = new SqlParameter("@LocId", PurchaseOrder.LocnId);
                return SQLHelper.ExecuteDataset("PurchasePerformaNoSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PendingPurchaseOrderGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseOrder.SupplierId);
                arlParms[1] = new SqlParameter("@FromDate", PurchaseOrder.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", PurchaseOrder.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                return SQLHelper.ExecuteDataset("PendingPurchaseOrderGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PendingPerformaGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseOrder.SupplierId);
                arlParms[1] = new SqlParameter("@FromDate", PurchaseOrder.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", PurchaseOrder.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                return SQLHelper.ExecuteDataset("PendingPerformaGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PurchaseOrderGetProduct(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PONumber", PurchaseOrder.PONumber);
                arlParms[1] = new SqlParameter("@ItemId", PurchaseOrder.ItemId);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);

                return SQLHelper.ExecuteDataset("PurchaseOrderGetProduct", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PerformaorderGetProduct(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PONumber", PurchaseOrder.PONumber);
                arlParms[1] = new SqlParameter("@ItemId", PurchaseOrder.ItemId);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);

                return SQLHelper.ExecuteDataset("PerformaorderGetProduct", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PerformaPurchaseGetProduct(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PPNumber", PurchaseOrder.PPNumber);
                arlParms[1] = new SqlParameter("@ItemId", PurchaseOrder.ItemId);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);

                return SQLHelper.ExecuteDataset("PerformaPurchaseGetProduct", dbName, arlParms);

            }
             catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PurchaseOrderProductRecall(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PONumber", PurchaseOrder.PONumber);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseOrderProductRecall", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PurchaseOrderRecall(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseOrder.SupplierId);
                arlParms[1] = new SqlParameter("@FromDate", PurchaseOrder.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", PurchaseOrder.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseOrderRecall", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseEnquiryRecall(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseEnquiry.SupplierId);
                arlParms[1] = new SqlParameter("@FromDate", PurchaseEnquiry.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", PurchaseEnquiry.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseEnquiry.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseEnquiryRecall", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseInvoiceRecall(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@SupplierId", PurchaseInvoiceModel.SupplierId);
                arlParms[1] = new SqlParameter("@FromDate", PurchaseInvoiceModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", PurchaseInvoiceModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseInvoiceRecall", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseInvoiceProductRecall(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PINumber", PurchaseInvoiceModel.PINumber);
                arlParms[1] = new SqlParameter("@ItemId", PurchaseInvoiceModel.ItemId);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseInvoiceProductRecall", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }






        //=============================================================         Purchase Return         ======================================================================


        public DataSet PurchaseReturnInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseReturnInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseReturnInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseReturnUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseReturnInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PurchaseReturnUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        

        public DataSet MobilePurchaseReturnInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PurchaseReturnInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MobilePurchaseReturnInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PRNoSearch(PurchaseReturn PurchaseReturn, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PRNo", PurchaseReturn.PRNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseReturn.DepartmentId);
                arlParms[2] = new SqlParameter("@LocId", PurchaseReturn.LocnId);

                return SQLHelper.ExecuteDataset("PurchaseReturnNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseReturnGetandGets(PurchaseReturn PurchaseReturn, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PRNo", PurchaseReturn.PRNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseReturn.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseReturnGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PendingOrdernumberSearch(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@OrderNo", PurchaseOrder.OrderNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                return SQLHelper.ExecuteDataset("PendingOrdernumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PerformaInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PPInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PerformaInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PerformaEditandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PPInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PerformaEditandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet GetCashPurchaseAccount(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[1] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("GetCashPurchaseAccount", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet OtherTransactionGetandGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", PurchaseInvoiceModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                return SQLHelper.ExecuteDataset("OtherTransactionGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseFileInsert(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@SlNo", PurchaseInvoiceModel.SlNo);
                arlParms[1] = new SqlParameter("@FileName", PurchaseInvoiceModel.FileName);
                arlParms[2] = new SqlParameter("@Extension", PurchaseInvoiceModel.Extension);
                arlParms[3] = new SqlParameter("@Flag", PurchaseInvoiceModel.Flag);
                arlParms[4] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[5] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("PurchaseFileInsert", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseFileGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", PurchaseInvoiceModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);

                return SQLHelper.ExecuteDataset("PurchaseFileGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseFileDelete(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PFileId", PurchaseInvoiceModel.PFileId);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseInvoiceModel.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseInvoiceModel.UserId);

                return SQLHelper.ExecuteDataset("PurchaseFileDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        

    }
}