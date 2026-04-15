
using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class InvoicewiseSalesAnalysis
    {
        public string BillSeriesId { get; set; }
        public string BillSeries { get; set; }
        public string BillSlNo { get; set; }

        public long CustID { get; set; }

        public string CustName { get; set; }
        public string CustAddress { get; set; }
        public string InvDate { get; set; }

        public string DueDate { get; set; }

        public long SalesManId { get; set; }

        public string SalesManName { get; set; }

        public string JobNumber { get; set; }

        public string GrandTotal { get; set; }

        public string TaxableAmount { get; set; }
        public string TaxAmount { get; set; }

        public string SalesValue { get; set; }

        public string SalesReturn { get; set; }

        public string NetSalesReturn { get; set; }

        public string Collection { get; set; }
        public string AmountDue { get; set; }
        public string AreaName { get; set; }
        public string DeptId { get; set; }
        public string UserId { get; set; }

        public long AreaId { get; set; }

        public string Condition { get; set; }

        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();

        public DataSet InvoicewiseSalesAnalysisGet(InvoicewiseSalesAnalysis oInvoicewiseSalesAnalysis, string dbName)
        {
            return oDInvPurchaseReport.InvoicewiseSalesAnalysis(oInvoicewiseSalesAnalysis, dbName);
        }

    }
}