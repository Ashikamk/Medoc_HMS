using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PendingReportModel
    {
        public string ItemCode { get;set;}
        public string CustName { get; set; }
        public string OrderNo { get; set; }
        public string OrderDate { get; set; }
        public string Condition { get; set; }
        public string ItemDescription { get; set; }
        public string Rate { get; set; }
        public string EnquiryDate { get; set; }
        public string EnquiryNo { get; set; }
        public long Quantity { get; set; }
        public long Purchase_Qty { get; set; }
        public long MRV_Qty { get; set; }
        public long Performa_Qty { get; set; }
        public long PendingPO { get; set; }
        public long PendingPP { get; set; }
        public long PendingMRV { get; set; }
        public long PendingPI { get; set; }

        public long NUmVariable1 { get; set; }
        public long NUmVariable2 { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public long Bal_qty { get; set; }
        public long SubCategoryID { get; set; }
        public long PONO { get; set; }
        public string MRVNo { get; set; }
        public string InvoNo { get; set; }
        public string MRVDate { get; set; }
        public long JobNo { get; set; }
        public string UserId { get; set; }
        public string ArrivalDate { get; set; }
        public string Amount { get; set; }
        public string DocRef { get; set; }
        DPendingReports oDPendingReports = new DPendingReports();

        public DataSet PendingPurchaseOrderGet(PendingReportModel oPendingReportModel, string dbName)
        {
            return oDPendingReports.PendingPurchaseOrderGet(oPendingReportModel, dbName);
        }
        public DataSet PendingPurchaseOrderSummaryGet(PendingReportModel oPendingReportModel, string dbName)
        {
            return oDPendingReports.PendingPurchaseOrderSummaryGet(oPendingReportModel, dbName);
        }
        
        public DataSet PendingPurchaseEnquiryGet(PendingReportModel oPendingReportModel, string dbName)
        {
            return oDPendingReports.PendingPurchaseEnquiryGet(oPendingReportModel, dbName);
        }
        public DataSet PendingMRVPurchaseGet(PendingReportModel oPendingReportModel, string dbName)
        {
            return oDPendingReports.PendingMRVPurchaseGet(oPendingReportModel, dbName);
        }
        public DataSet PendingPurchasePerformaGet(PendingReportModel oPendingReportModel, string dbName)
        {
            return oDPendingReports.PendingPurchasePerformaGet(oPendingReportModel, dbName);
        }
        
    }
}