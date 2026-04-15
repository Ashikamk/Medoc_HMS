//29-08-2018

using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class DailySalesReport
    {

        public string BillSeriesID { get; set; }

        public string BillSlNo { get; set; }

        public string PayType { get; set; }

        public long CustID { get; set; }

        public string CustName { get; set; }

        public string CustAddress { get; set; }

        public string InvDate { get; set; }

        public string DueDate { get; set; }

        public string InvTerms { get; set; }

        public string LockID { get; set; }

        public long SalesManId { get; set; }
        public string SalesManName { get; set; }

        public string AreaName { get; set; }

        public long  AreaId { get; set; }

        public string CurrencyID { get; set; }

        public string JobNumber { get; set; }

        public decimal GrandTotal { get; set; }

        public long GroupID { get; set; }

        public string GroupName { get; set; }

        public long SubgroupID { get; set; }

        public string SubgroupName { get; set; }

        public long CategoryID { get; set; }

        public string CategoryName { get; set; }

        public long SubCategoryID { get; set; }

        public string SubCategoryName { get; set; }

        public string Department { get; set; }

        public string LPONumber { get; set; }

        public string ProductCode { get; set; }

        public string ProductDescription { get; set; }

        public string Unit { get; set; }

        public string Quantity { get; set; }

        public string Discount { get; set; }

        public string TaxableAmount { get; set; }

        public string Tax { get; set; }

        public string TaxAmount { get; set; }

        public string FCTaxAmount { get; set; }

        public string Amount { get; set; }

        public string CurrencyRate { get; set; }
        public string UserId { get; set; }


        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();

        public DataSet DailySalesGet(DailySalesReport oDailySalesReport,string dbName)
        {
            return oDInvPurchaseReport.DailySalesGet(oDailySalesReport, dbName);
        }
    }
}