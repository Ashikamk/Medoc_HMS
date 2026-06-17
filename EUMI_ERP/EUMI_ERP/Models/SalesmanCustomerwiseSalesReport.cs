
using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class SalesmanCustomerwiseSalesReport
    {

        public string BillSeriesID { get; set; }
        public string BillSeries { get; set; }

        public string BillSlNo { get; set; }

        public string PayType { get; set; }

        public long CustID { get; set; }

        public string CustName { get; set; }

        public string HFlag { get; set; }

        public string InvDate { get; set; }

        public string DueDate { get; set; }

        public long SalesManId { get; set; }

        public string TaxableAmount { get; set; }

        public string TaxAmount { get; set; }

        public string Amount { get; set; }

        public string FCAmount { get; set; }
        public string DeptId { get; set; }
        public string UserId { get; set; }
        public string CustAddress { get; set; }

        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();

        public DataSet SalesmanCustomerwiseSalesGet(SalesmanCustomerwiseSalesReport oSalesmanCustomerwiseSalesReport, string dbName)
        {
            return oDInvPurchaseReport.SalesmanCustomerwiseSalesGet(oSalesmanCustomerwiseSalesReport, dbName);
        }
    }
}