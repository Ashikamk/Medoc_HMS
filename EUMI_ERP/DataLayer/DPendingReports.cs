using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataLayer
{
    public class DPendingReports
    {
        private SqlParameter[] arlParms;

        public DataSet PendingPurchaseOrderGet(PendingReportModel PendingReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", PendingReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", PendingReportModel.UserId);
                return SQLHelper.ExecuteDataset("PendingPurchaseOrderGet", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PendingPurchaseOrderSummaryGet(PendingReportModel PendingReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", PendingReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", PendingReportModel.UserId);
                return SQLHelper.ExecuteDataset("PendingPurchaseOrderSummaryGet", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        
        public DataSet PendingPurchaseEnquiryGet(PendingReportModel PendingReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", PendingReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", PendingReportModel.UserId);
                return SQLHelper.ExecuteDataset("PendingPurchaseEnquiryGet", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PendingMRVPurchaseGet(PendingReportModel PendingReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", PendingReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", PendingReportModel.UserId);
                return SQLHelper.ExecuteDataset("PendingMRVPurchaseGet", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PendingPurchasePerformaGet(PendingReportModel PendingReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", PendingReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", PendingReportModel.UserId);
                return SQLHelper.ExecuteDataset("PendingPurchasePerformaGet", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet PendingSalesOrderGet(PendingSalesOrderModel PendingSalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", PendingSalesOrderModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", PendingSalesOrderModel.UserId);
                return SQLHelper.ExecuteDataset("PendingSalesOrderGet", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PendingQuotationGet(PendingSalesOrderModel PendingSalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", PendingSalesOrderModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", PendingSalesOrderModel.UserId);
                return SQLHelper.ExecuteDataset("PendingQuotationGet", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PendingCustomerEnquiryGet(PendingSalesOrderModel PendingSalesOrderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", PendingSalesOrderModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", PendingSalesOrderModel.UserId);
                return SQLHelper.ExecuteDataset("PendingCustomerEnquiryGet", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}