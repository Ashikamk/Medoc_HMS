using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.Models;

namespace EUMI_ERP
{
    public class DEnquiry
    {
        private SqlParameter[] arlParms;

        public DataSet CustomerEnquiryInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CustomerEnquiryType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("CustomerEnquiryInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CustomerEnquiryGetandGetsQtn(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@EnquiryNo", CustomerEnquiryModel.EnquiryNo);
                arlParms[1] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("CustomerEnquiryGetandGetsQtn", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet QuotationEnquiryGets(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", CustomerEnquiryModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", CustomerEnquiryModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", CustomerEnquiryModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("QuotationEnquiryGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet EnquiryNoSearch(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@EnquiryNo", CustomerEnquiryModel.EnquiryNo);
                arlParms[1] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("EnquiryNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet QuotationEntryDelete(QuotationEntryModel QuotationEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@QuotationNo", QuotationEntryModel.QuotationNo);
                arlParms[1] = new SqlParameter("@DeptId", QuotationEntryModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", QuotationEntryModel.UserId); 
                return SQLHelper.ExecuteDataset("QuotationEntryDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet QuotationEntryInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@QuotationEntryType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("QuotationEntryInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet QuotationEntryUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@QuotationEntryType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("QuotationEntryUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet QuotationNoSearch(QuotationEntryModel QuotationEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@QuotationNo", QuotationEntryModel.QuotationNo);
                arlParms[1] = new SqlParameter("@DeptId", QuotationEntryModel.DeptId);
                return SQLHelper.ExecuteDataset("QuotationNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet QuotationEntryGetandGets(QuotationEntryModel QuotationEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@QuotationNo", QuotationEntryModel.QuotationNo);
                arlParms[1] = new SqlParameter("@DeptId", QuotationEntryModel.DeptId);
                return SQLHelper.ExecuteDataset("QuotationEntryGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CustomerEnquiryGetProducts(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@EnquiryNum", CustomerEnquiryModel.EnquiryNum);
                arlParms[1] = new SqlParameter("@ProductId", CustomerEnquiryModel.ProductId);
                arlParms[2] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("CustomerEnquiryGetProducts", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet QuotationEntryRecall(QuotationEntryModel QuotationEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@QuotationNo", QuotationEntryModel.QuotationNo);
                arlParms[1] = new SqlParameter("@CustId", QuotationEntryModel.CustId);
                arlParms[2] = new SqlParameter("@FromDate", QuotationEntryModel.FromDate);
                arlParms[3] = new SqlParameter("@ToDate", QuotationEntryModel.ToDate);
                arlParms[4] = new SqlParameter("@DeptId", QuotationEntryModel.DeptId);

                return SQLHelper.ExecuteDataset("QuotationEntryRecall", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesOrderInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesOrderType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesOrderInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesOrderPressInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesOrderPressType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesOrderPressInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesOrderGetandGets(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@OrderNo", SalesOrderModel.OrderNo);
                arlParms[1] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesOrderGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet QuotationGetRevision(QuotationEntryModel QuotationEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@QuotationNo", QuotationEntryModel.QuotationNo);
                arlParms[1] = new SqlParameter("@DeptId", QuotationEntryModel.DeptId);
                return SQLHelper.ExecuteDataset("QuotationGetRevision", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet OrderNoSearch(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@OrderNo", SalesOrderModel.OrderNo);
                arlParms[1] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("OrderNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet QuotationEntryGetProducts(QuotationEntryModel QuotationEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@QuotationNo", QuotationEntryModel.QtnNo);
                arlParms[1] = new SqlParameter("@ProductId", QuotationEntryModel.ProductId);
                arlParms[2] = new SqlParameter("@DeptId", QuotationEntryModel.DeptId);
                return SQLHelper.ExecuteDataset("QuotationEntryGetProducts", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesOrderRecall(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", SalesOrderModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", SalesOrderModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", SalesOrderModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesOrderRecall", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesOrderGetProducts(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@OrderNo", SalesOrderModel.OrdNo);
                arlParms[1] = new SqlParameter("@ProductId", SalesOrderModel.ProductId);
                arlParms[2] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesOrderGetProducts", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesInvoiceRecall(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", SalesInvoiceModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesInvoiceRecall", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesInvoiceGetProducts(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BlSeriesId);
                arlParms[1] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BlSlNo);
                arlParms[2] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesInvoiceGetProducts", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesEnquiryGets(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", CustomerEnquiryModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", CustomerEnquiryModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", CustomerEnquiryModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesEnquiryGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerEnquiryGetProductsSales(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@EnquiryNum", CustomerEnquiryModel.EnquiryNum);
                arlParms[1] = new SqlParameter("@ProductId", CustomerEnquiryModel.ProductId);
                arlParms[2] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("CustomerEnquiryGetProductsSales", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerEnquiryGetandGetsSales(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@EnquiryNo", CustomerEnquiryModel.EnquiryNo);
                arlParms[1] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("CustomerEnquiryGetandGetsSales", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesOrderRecallSalesInv(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", SalesOrderModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", SalesOrderModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", SalesOrderModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesOrderRecallSalesInv", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesOrderGetandGetsSalesInv(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@OrderNo", SalesOrderModel.OrderNo);
                arlParms[1] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesOrderGetandGetsSalesInv", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesOrderGetProductsSalesInv(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@OrderNo", SalesOrderModel.OrdNo);
                arlParms[1] = new SqlParameter("@ProductId", SalesOrderModel.ProductId);
                arlParms[2] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesOrderGetProductsSalesInv", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet QuotationEntryRecallSalesOrder(QuotationEntryModel QuotationEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@QuotationNo", QuotationEntryModel.QuotationNo);
                arlParms[1] = new SqlParameter("@CustId", QuotationEntryModel.CustId);
                arlParms[2] = new SqlParameter("@FromDate", QuotationEntryModel.FromDate);
                arlParms[3] = new SqlParameter("@ToDate", QuotationEntryModel.ToDate);
                arlParms[4] = new SqlParameter("@DeptId", QuotationEntryModel.DeptId);
                return SQLHelper.ExecuteDataset("QuotationEntryRecallSalesOrder", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet QuotationEntryGetandGetsSalesOrder(QuotationEntryModel QuotationEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@QuotationNo", QuotationEntryModel.QuotationNo);
                arlParms[1] = new SqlParameter("@QuotationEntryMainId", QuotationEntryModel.QuotationEntryMainId);
                arlParms[2] = new SqlParameter("@DeptId", QuotationEntryModel.DeptId);
                return SQLHelper.ExecuteDataset("QuotationEntryGetandGetsSalesOrder", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet QuotationEntryGetProductsSalesOrder(QuotationEntryModel QuotationEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@QuotationNo", QuotationEntryModel.QtnNo);
                arlParms[1] = new SqlParameter("@ProductId", QuotationEntryModel.ProductId);
                arlParms[2] = new SqlParameter("@DeptId", QuotationEntryModel.DeptId);
                return SQLHelper.ExecuteDataset("QuotationEntryGetProductsSalesOrder", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DeliveryOrderInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeliveryOrderType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("DeliveryOrderInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet DeliveryOrderGetandGets(DeliveryOrderModel DeliveryOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeliveryOrderNo", DeliveryOrderModel.DeliveryOrderNo);
                arlParms[1] = new SqlParameter("@DeptId", DeliveryOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("DeliveryOrderGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DeliveryOrderNoSearch(DeliveryOrderModel DeliveryOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeliveryOrderNo", DeliveryOrderModel.DeliveryOrderNo);
                arlParms[1] = new SqlParameter("@DeptId", DeliveryOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("DeliveryOrderNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesOrderRecallDeliveryOrder(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", SalesOrderModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", SalesOrderModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", SalesOrderModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesOrderRecallDeliveryOrder", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesOrderGetandGetsDeliveryOrder(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@OrderNo", SalesOrderModel.OrderNo);
                arlParms[1] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesOrderGetandGetsDeliveryOrder", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesOrderGetProductsDeliveryOrder(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@OrderNo", SalesOrderModel.OrdNo);
                arlParms[1] = new SqlParameter("@ProductId", SalesOrderModel.ProductId);
                arlParms[2] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesOrderGetProductsDeliveryOrder", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesInvoiceRecallDeliveryOrder(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", SalesInvoiceModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesInvoiceRecallDeliveryOrder", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesGetandGetsDeliveryOrder(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesGetandGetsDeliveryOrder", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesInvoiceGetProductsDeliveryOrder(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BlSeriesId);
                arlParms[1] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BlSlNo);
                arlParms[2] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesInvoiceGetProductsDeliveryOrder", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DeliveryOrderRecallSalesInv(DeliveryOrderModel DeliveryOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", DeliveryOrderModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", DeliveryOrderModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", DeliveryOrderModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", DeliveryOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("DeliveryOrderRecallSalesInv", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DeliveryOrderGetandGetsSalesInv(DeliveryOrderModel DeliveryOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeliveryOrderNo", DeliveryOrderModel.DeliveryOrderNo);
                arlParms[1] = new SqlParameter("@DeptId", DeliveryOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("DeliveryOrderGetandGetsSalesInv", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DeliveryOrderGetProductsSalesInv(DeliveryOrderModel DeliveryOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DeliveryOrderNo", DeliveryOrderModel.DeliveryOrdNo);
                arlParms[1] = new SqlParameter("@ProductId", DeliveryOrderModel.ProductId);
                arlParms[2] = new SqlParameter("@DeptId", DeliveryOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("DeliveryOrderGetProductsSalesInv", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerSearchPopuPEnqSales(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", CustomerEnquiryModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", CustomerEnquiryModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", CustomerEnquiryModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("CustomerSearchPopuPEnqSales", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SearchCustomerEnquiryProductsInSales(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@EnquiryNum", CustomerEnquiryModel.EnquiryNum);
                arlParms[1] = new SqlParameter("@ProductId", CustomerEnquiryModel.ProductId);
                arlParms[2] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("SearchCustomerEnquiryProductsInSales", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet GetQuantitybyLocation(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[1] = new SqlParameter("@LocnId", SalesInvoiceModel.LocnId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("GetQuantitybyLocation", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesReturnInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesReturn", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesReturnInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesReturnMobileInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesReturnMobile", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesReturnMobileInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesReturnGetandGets(SalesReturnModel SalesReturnModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ReturnNo", SalesReturnModel.ReturnNo);
                arlParms[1] = new SqlParameter("@BillSeries", SalesReturnModel.BillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SalesReturnModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesReturnGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerEnquiryGetandGets(CustomerEnquiryModel CustomerEnquiryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@EnquiryNo", CustomerEnquiryModel.EnquiryNo);
                arlParms[1] = new SqlParameter("@DeptId", CustomerEnquiryModel.DeptId);
                return SQLHelper.ExecuteDataset("CustomerEnquiryGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ReturnNoSearch(SalesReturnModel SalesReturnModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ReturnNo", SalesReturnModel.ReturnNo);
                arlParms[1] = new SqlParameter("@BillSeries", SalesReturnModel.BillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SalesReturnModel.DeptId);
                arlParms[3] = new SqlParameter("@LocId", SalesReturnModel.LocId);

                return SQLHelper.ExecuteDataset("ReturnNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesInvoiceCancel(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[1] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId); 
                return SQLHelper.ExecuteDataset("SalesInvoiceCancel", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesInvoiceRentCarDelete(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[1] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[2] = new SqlParameter("@AgreementNo", SalesInvoiceModel.AgreementNo);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[4] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesInvoiceRentCarDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet JobSearchSales(ProjectJobModel ProjectJobModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@JobCode", ProjectJobModel.JobCode);
                return SQLHelper.ExecuteDataset("JobSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ItemCodeSearchSales(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];


                arlParms[0] = new SqlParameter("@Condition", ItemMasterModel.Condition);
                arlParms[1] = new SqlParameter("@type", ItemMasterModel.invtype);
                return SQLHelper.ExecuteDataset("ItemCodeSearchSales", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesInvoiceRecallSalesreturn(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", SalesInvoiceModel.CustId);
                arlParms[1] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesInvoiceRecallSalesreturn", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesGetandGetsSalesretun(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesGetandGetsSalesretun", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesInvoiceGetProductsSalesReturn(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BlSeriesId);
                arlParms[1] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BlSlNo);
                arlParms[2] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesInvoiceGetProductsSalesReturn", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet OpticalSalesInvoiceGetProducts(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BlSeriesId);
                arlParms[1] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BlSlNo);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("OpticalSalesInvoiceGetProducts", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesReturnCancel(SalesReturnModel SalesReturnModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSeriesId", SalesReturnModel.BillSeriesId);
                arlParms[1] = new SqlParameter("@BillSlNo", SalesReturnModel.BillSlNo);
                arlParms[2] = new SqlParameter("@DeptId", SalesReturnModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesReturnCancel", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet PH_Dashboard(SalesReturnModel SalesReturnModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@FromDate", SalesReturnModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesReturnModel.ToDate);
                arlParms[2] = new SqlParameter("@BillSerisId", SalesReturnModel.BillSeriesId);
                arlParms[3] = new SqlParameter("@BillNo", SalesReturnModel.BillSlNo);
                arlParms[4] = new SqlParameter("@DeptId", SalesReturnModel.DeptId);
                arlParms[5] = new SqlParameter("@UserId", SalesReturnModel.UserId);
                arlParms[6] = new SqlParameter("@LocationId", SalesReturnModel.LocId);
                return SQLHelper.ExecuteDataset("PH_DashboardGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ItemwiseDashboard(SalesReturnModel SalesReturnModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[9];
                arlParms[0] = new SqlParameter("@FromDate", SalesReturnModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesReturnModel.ToDate);
                arlParms[2] = new SqlParameter("@BillSerisId", SalesReturnModel.BillSeriesId);
                arlParms[3] = new SqlParameter("@BillNo", SalesReturnModel.BillSlNo);
                arlParms[4] = new SqlParameter("@ItemId", SalesReturnModel.ProductId);
                arlParms[5] = new SqlParameter("@DeptId", SalesReturnModel.DeptId);
                arlParms[6] = new SqlParameter("@UserId", SalesReturnModel.UserId);
                arlParms[7] = new SqlParameter("@LocationId", SalesReturnModel.LocId);
                arlParms[8] = new SqlParameter("@GarageName", SalesReturnModel.GarageName);
                return SQLHelper.ExecuteDataset("ItemwiseDashboardGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SummaryDashboard(SalesReturnModel SalesReturnModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@FromDate", SalesReturnModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesReturnModel.ToDate);
                arlParms[2] = new SqlParameter("@BillSerisId", SalesReturnModel.BillSeriesId);
                arlParms[3] = new SqlParameter("@BillNo", SalesReturnModel.BillSlNo);
                arlParms[4] = new SqlParameter("@DeptId", SalesReturnModel.DeptId);
                arlParms[5] = new SqlParameter("@UserId", SalesReturnModel.UserId);
                arlParms[6] = new SqlParameter("@LocationId", SalesReturnModel.LocId);
                arlParms[7] = new SqlParameter("@GarageName", SalesReturnModel.GarageName);
                return SQLHelper.ExecuteDataset("SummaryDashboardGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesReturnUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesReturn", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesReturnUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        

             public DataSet SalesInvoiceGetListStockOut(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesInvoiceGetListStockOut", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet SalesInvoiceGetList(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesInvoiceGetList", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesInvoiceOrderGetList(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesOrderInvoiceGetList", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesOpticalInvoiceGetList(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesOpticalInvoiceGetList", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CustomerEnquiryGetList(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("CustomerEnquiryGetList", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DeliveryOrderListView(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("DeliveryOrderListView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesOrderListView(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesOrderListView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet QuotationEntryListView(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("QuotationEntryListView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesReturnGetList(SalesReturnModel SalesReturnModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesReturnModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesReturnModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesReturnModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesReturnModel.UserId);
                return SQLHelper.ExecuteDataset("SalesReturnGetList", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesOrderGetList(SalesOrderModel SalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesOrderModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesOrderModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesOrderModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesOrderModel.UserId);
                return SQLHelper.ExecuteDataset("SalesOrderGetList", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DailyClosingInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DailyClosingType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("DailyClosingInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DailyCashCollectionGetandGets(DailyClosing DailyClosing, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DateFrom", DailyClosing.DateFrom);
                arlParms[1] = new SqlParameter("@DateTo", DailyClosing.DateTo);
                arlParms[2] = new SqlParameter("@DeptId", DailyClosing.DeptId);
                return SQLHelper.ExecuteDataset("DailyCashCollectionGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DailyCashCheckInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DailyCashCheckType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("DailyCashCheckInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesInvoceFileInsert(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@FileName", SalesInvoiceModel.FileName);
                arlParms[3] = new SqlParameter("@Extension", SalesInvoiceModel.Extension);
                arlParms[4] = new SqlParameter("@Flag", SalesInvoiceModel.DelFlag);
                arlParms[5] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[6] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesInvoceFileInsert", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesInvocieFileGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);

                return SQLHelper.ExecuteDataset("SalesInvocieFileGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesInvoceFileDelete(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PFileId", SalesInvoiceModel.PFileId);
                arlParms[1] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);

                return SQLHelper.ExecuteDataset("SalesInvoceFileDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DeliveryOrderGasTradingInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeliveryOrderType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("DeliveryOrderGasTradingInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DeliveryOrderGasTradingUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeliveryOrderType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("DeliveryOrderGasTradingUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DeliveryOrderCancel(DeliveryOrderModel DeliveryOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@DeliveryOrderNo", DeliveryOrderModel.DeliveryOrderNo);
                arlParms[1] = new SqlParameter("@DeliveryOrderMainId", DeliveryOrderModel.DeliveryOrderMainId);
                arlParms[2] = new SqlParameter("@DeptId", DeliveryOrderModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", DeliveryOrderModel.UserId);
                return SQLHelper.ExecuteDataset("DeliveryOrderCancel", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PackingListInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeliveryOrderType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PackingListInsertandUpdate", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PackingListNoSearch(DeliveryOrderModel DeliveryOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeliveryOrderNo", DeliveryOrderModel.DeliveryOrderNo);
                arlParms[1] = new SqlParameter("@DeptId", DeliveryOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("PackingListNoSearch", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PackingListGetandGets(DeliveryOrderModel DeliveryOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeliveryOrderNo", DeliveryOrderModel.DeliveryOrderNo);
                arlParms[1] = new SqlParameter("@DeptId", DeliveryOrderModel.DeptId);
                return SQLHelper.ExecuteDataset("PackingListGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PackingListView(DeliveryOrderModel DeliveryOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", DeliveryOrderModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", DeliveryOrderModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", DeliveryOrderModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", DeliveryOrderModel.UserId); 
                return SQLHelper.ExecuteDataset("PackingListView", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ExportSalesDocsSave(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ExportSalesDocsType", SqlDbType.Structured); 
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ExportSalesDocsSave", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesInvoiceGetListOPTICALORDER(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesInvoiceGetListOPTICALORDER", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesInvoiceGetListOPTICALSINVOICE(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesInvoiceGetListOPTICALSINVOICE", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesReturnGetListOpticals(SalesReturnModel SalesReturnModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", SalesReturnModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesReturnModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", SalesReturnModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", SalesReturnModel.UserId);
                return SQLHelper.ExecuteDataset("SalesReturnGetListOpticals", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}