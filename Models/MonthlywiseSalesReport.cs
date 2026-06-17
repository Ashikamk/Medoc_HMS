
using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class MonthlywiseSalesReport
    {
        public string InvDate { get; set; }

        public string DueDate { get; set; }

        public string BillSeriesID { get; set; }

        public string BillSlNo { get; set; }

        public long CustID { get; set; }

        public string CustName { get; set; }

        public long SalesManId { get; set; }
        public string SalesManName { get; set; }

        public string TaxableAmount { get; set; }

        public string TaxAmount { get; set; }

        public string FCTaxAmount { get; set; }

        public string Amount { get; set; }
        public string Discount { get; set; }

        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();

        public DataSet MonthlywiseSalesGet(MonthlywiseSalesReport oMonthlywiseSalesReport, string dbName)
        {
            return oDInvPurchaseReport.MonthlywiseSalesGet(oMonthlywiseSalesReport, dbName);
        }
    }
}