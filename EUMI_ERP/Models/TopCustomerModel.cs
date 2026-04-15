using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP
{
    public class TopCustomerModel
    {
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string CustId { get; set; }
        public string Customer { get; set; }
        public string number { get; set; }
        public string Qty { get; set; }
        public string Amount { get; set; }
        public string UserId { get; set; }

        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();
        public DataSet TopCustomerReportGet(TopCustomerModel oTopCustomerModel, string dbName)
        {
            return oDInvPurchaseReport.TopCustomerReportGet(oTopCustomerModel, dbName);
        }
        public DataSet TopCustomerAnalysisGraph(TopCustomerModel oTopCustomerModel, string dbName)
        {
            return oDInvPurchaseReport.TopCustomerAnalysisGraph(oTopCustomerModel, dbName);
        }
    }
}