using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ModelSalesReport
    {
        public decimal CessAmount { get; set; }
        public string BillSeriesId { get; set; }
        public string Billdescription { get; set; }
        public string BillSlNo { get; set; }
        public string SlNo { get; set; }
        public string InvoNo { get; set; }
        public string InvDate { get; set; }
        public string AccCode { get; set; }
        public long AreaId { get; set; }
        public long CustId { get; set; }
        public long SalesmanId { get; set; }
        public string CustoName { get; set; }
        public string FirstName { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string LocationName { get; set; }
        public string TermDescription { get; set; }
        public string PayTerms { get; set; }
        public string Jobcode { get; set; }
        public string Unit { get; set; }
        public string LPONumber { get; set; }
        public string LocId { get; set; }
        public string Quantity { get; set; }
        public decimal BillDiscount { get; set; }
        public string Status { get; set; }
        public decimal ReceivedAmount { get; set; }
        public decimal SalesValue { get; set; }

        public decimal TotalTaxable { get; set; }

        public decimal TotalTax { get; set; }

        public decimal RoundGrandTotal { get; set; }
        public decimal SalesAmount { get; set; }

        public decimal SpecialAmount { get; set; }
        public decimal ProcedAount { get; set; }


        



        public decimal ReturnAmount { get; set; }

        public string CurrencyName { get; set; }
        public string CustAddress { get; set; }
        public string CurrencyRate { get; set; }
        public string PurchaseType { get; set; }
        public decimal FCGrandTotal { get; set; }
        public string DeptId { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentCode { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Condition { get; set; }
        public string Condition1 { get; set; }
        public string SType { get; set; }
        public string UserId { get; set; }

        public string ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescription { get; set; }
        public decimal OpQty { get; set; }
        public decimal OpCost { get; set; }
        public decimal OpSV { get; set; }
        public decimal PurchaseQty { get; set; }
        public decimal PCost { get; set; }
        public decimal PStockValue { get; set; }
        public decimal StockInQty { get; set; }
        public decimal StockOutQty { get; set; }
        public decimal SalesQty { get; set; }
        public decimal SPrice { get; set; }
        public decimal SStockValue { get; set; }
        public decimal PurchaseReturnQty { get; set; }
        public decimal PRCost { get; set; }
        public decimal PRStockValue { get; set; }
        public decimal SalesReturnQty { get; set; }
        public decimal SRPrice { get; set; }
        public decimal SRStockValue { get; set; }
        public decimal ClosingQty { get; set; }
        public decimal ClosingAvgCost { get; set; }
        public decimal ClosingStockValue { get; set; }
        public decimal Amount { get; set; }
        public int DelFlag { get; set; }
        public string GroupId { get; set; }
        public string Group { get; set; }
        public string SubGroupId { get; set; }
        public string SubGroup { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public decimal Rate { get; set; }

        public decimal Cost { get; set; }
        public decimal Profit { get; set; }
        public decimal ProfitPer { get; set; }

        DataSalesReport obj = new DataSalesReport();



        public DataSet salesreportGetandGetsproc(ModelSalesReport dt, string dbName)
        {
            return obj.salesreportGetandGetsproc(dt, dbName);
        }

        public DataSet salesreportGetandGets(ModelSalesReport dt, string dbName)
        {
            return obj.salesreportGetandGets(dt, dbName);
        }

        public DataSet ItemwiseReportSalesSummaryGets(ModelSalesReport dt, string dbName)
        {
            return obj.ItemwiseReportSalesSummaryGets(dt, dbName);
        }

        public DataSet BelowCostReportGets(ModelSalesReport dt, string dbName)
        {
            return obj.BelowCostReportGets(dt, dbName);
        }
        public DataSet DailyPurchaseGets(ModelSalesReport dt, string dbName)
        {
            return obj.DailyPurchaseGets(dt, dbName);
        }
        public DataSet ItemwiseReportSalesDetailsGets(ModelSalesReport dt, string dbName)
        {
            return obj.ItemwiseReportSalesDetailsGets(dt, dbName);
        }


        public DataSet ProfitAnalysisGroupwiseReportGets(ModelSalesReport dt, string dbName)
        {
            return obj.ProfitAnalysisGroupwiseReportGets(dt, dbName);
        }

        
             public DataSet salesreportGetandGetsmainMointhly(ModelSalesReport dt, string dbName)
        {
            return obj.salesreportGetandGetsmainMointhly(dt, dbName);
        }
        public DataSet salesreportGetandGetsmain(ModelSalesReport dt, string dbName)
        {
            return obj.salesreportGetandGetsmain(dt, dbName);
        }
        public DataSet salesreportGetandGetsSummary(ModelSalesReport dt, string dbName)
        {
            return obj.salesreportGetandGetsSummary(dt, dbName);
        }

        public DataSet GasDistributionGets(ModelSalesReport dt, string dbName)
        {
            return obj.GasDistributionGets(dt, dbName);
        }

        public DataSet DetailedStockReportGets(ModelSalesReport dt, string dbName)
        {
            return obj.DetailedStockReportGets(dt, dbName);
        }

        public DataSet DetailedReportGasGets(ModelSalesReport dt, string dbName)
        {
            return obj.DetailedReportGasGets(dt, dbName);
        }

        public DataSet stockoutreportmonthly(ModelSalesReport dt, string dbName)
        {
            return obj.stockoutreportmonthly(dt, dbName);
        }
        public DataSet stockoutGetandGetsmain(ModelSalesReport dt, string dbName)
        {
            return obj.stockoutGetandGetsmain(dt, dbName);
        }
        public DataSet stockoutGetandGetsSummary(ModelSalesReport dt, string dbName)
        {
            return obj.stockoutGetandGetsSummary(dt, dbName);
        }
        public DataSet stockoutreportGetandGets(ModelSalesReport dt, string dbName)
        {
            return obj.stockoutreportGetandGets(dt, dbName);
        }
    }
}