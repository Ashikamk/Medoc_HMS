using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class AreaSalesmanwiseSalesReport
    {
        public string BillSeriesID { get; set; }
        public string BillSeries { get; set; }
        public string BillSlNo { get; set; }

        public string CustName { get; set; }
        public string CustAddress { get; set; }
        public string FCTaxAmount { get; set; }

        public string TaxableAmount { get; set; }

        public string TaxAmount { get; set; }

        public string Amount { get; set; }

        public string PayType { get; set; }

        public long SalesmanID { get; set; }

        public long AreaId { get; set; }
        public string InvDate { get; set; }

        public string DueDate { get; set; }

        public long AreaGroupID { get; set; }

        public string HFlag { get; set; }
        public string DeptId { get; set; }

        public string UserId { get; set; }

        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();
        public DataSet AreaSalesmanwiseSalesGet(AreaSalesmanwiseSalesReport oAreaSalesmanwiseSalesReport, string dbName)
        {
            return oDInvPurchaseReport.AreaSalesmanwiseSalesGet(oAreaSalesmanwiseSalesReport, dbName);
        }
    }
}