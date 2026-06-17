
using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class CustomerwiseSalesReport
    {

        public long CustID { get; set; }

        public string CustName { get; set; }

        public string InvDate { get; set; }

        public string DueDate { get; set; }

        public string BillSeriesID { get; set; }
        public string BillSeries { get; set; }

        public string BillSlNo { get; set; }

        public string PayType { get; set; }

        public string TaxableAmount { get; set; }

        public string TaxAmount { get; set; }

        public string FCTaxAmount { get; set; }

        public string Amount { get; set; }
        public string DeptId { get; set; }
        public string UserId { get; set; }

        public string SalesManName { get; set; }

        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();

        public DataSet CustomerwiseSalesGet(CustomerwiseSalesReport oCustomerwiseSalesReport, string dbName)
        {
            return oDInvPurchaseReport.CustomerwiseSalesGet(oCustomerwiseSalesReport, dbName);
        }
    }
}