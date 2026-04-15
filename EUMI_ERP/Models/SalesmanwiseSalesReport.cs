using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class SalesmanwiseSalesReport
    {
        public string Condition { get; set; }
        public string Condition1 { get; set; }
        public string BillSeriesID { get; set; }
        public string BillSeries { get; set; }

        public string BillSlNo { get; set; }

        public string PayType { get; set; }

        public string InvDate { get; set; }

        public string DueDate { get; set; }

        public long SalesManId { get; set; }
        public string SalesManName { get; set; }

        public string CustName { get; set; }

        public string TaxableAmount { get; set; }

        public string TaxAmount { get; set; }

        public string FCTaxAmount { get; set; }

        public string Amount { get; set; }
        public string Dept { get; set; }
        public string UserId { get; set; }



       
        public string Sales { get; set; }
        public string Disc { get; set; }
        public string GrossSales { get; set; }
        public string SReturn { get; set; }
        public string NetSales { get; set; }
        public string NetCost { get; set; }
        public string Profit { get; set; }
        public string ProfitPer { get; set; }

        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();

        public DataSet SalesmanwiseSalesGet(SalesmanwiseSalesReport oSalesmanwiseSalesReport, string dbName)
        {
            return oDInvPurchaseReport.SalesmanwiseSalesGet(oSalesmanwiseSalesReport, dbName);
        }
    }
}