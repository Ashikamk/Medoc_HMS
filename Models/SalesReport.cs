
using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class SalesReport
    {
        public string InvoiceDescription { get; set; }

        public string InvoiceNo { get; set; }

        public string Department { get; set; }

        public string DateofTrn { get; set; }

        public string Slno { get; set; }

        public string CustomerName { get; set; }

        public string Location { get; set; }

       public string Salesman { get; set; }

       public string Driver { get; set; }

       public string ProductCode { get; set; }

        public string ProductDescription { get; set; }

        public string Unit { get; set; }

        public string Quantity { get; set; }

        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();
        public DataSet SalesGet(SalesReport oSalesReport, string dbName)
        {
            return oDInvPurchaseReport.SalesGet(oSalesReport, dbName);
        }
    }
}