using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PendingSalesOrderModel
    {
        public string OrderNo { get; set; }
        public string InvDate { get; set; }
        public string Customer { get; set; }
        public string LPONo { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string Salesman { get; set; }
        public long OrderQty { get; set; }
        public long InvQty { get; set; }
        public long DelQty { get; set; }
        public long BalanceQty { get; set; }
        public long BalanceInvQty { get; set; }
        public long BalanceDelQty { get; set; }
        public decimal OrderRate { get; set; }
        
        public string QtnNo { get; set; }
        public long QtnQty { get; set; }

        public string EnquiryNo { get; set; }
        public long EnquiryQty { get; set; }
        public long QuotationQty { get; set; }

        public string Condition { get; set; }
        public string UserId { get; set; }

        DPendingReports oDPendingReports = new DPendingReports();
        public DataSet PendingSalesOrderGet(PendingSalesOrderModel oPendingSalesOrderModel, string dbName)
        {
            return oDPendingReports.PendingSalesOrderGet(oPendingSalesOrderModel, dbName);
        }
        public DataSet PendingQuotationGet(PendingSalesOrderModel oPendingSalesOrderModel, string dbName)
        {
            return oDPendingReports.PendingQuotationGet(oPendingSalesOrderModel, dbName);
        }
        public DataSet PendingCustomerEnquiryGet(PendingSalesOrderModel oPendingSalesOrderModel, string dbName)
        {
            return oDPendingReports.PendingCustomerEnquiryGet(oPendingSalesOrderModel, dbName);
        }
    }
}