// 15/09/2018
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP
{
    public class InvReportModel
    {
        public string PRInvoNo { get; set; }
        public string ItemId { get; set; }
        public string Batch { get; set; }
        public string Pack { get; set; }
        public string Free { get; set; }
        public string Loose { get; set; }
        public string TQty { get; set; }
        public string TLQty { get; set; }
        public string PI_No { get; set; }
        
        public string InvoiceTotal { get; set; }
        public string CessAmount { get; set; }
        public string Status { get; set; }
        public string CustName { get; set; }
        public string FirstName { get; set; }
        public string EndDate { get; set; }
        public string StartDate { get; set; }
        public string Description { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string Condition { get; set; }
        public long BOQSlNo { get; set; }
        public string BOQDate { get; set; }
        public long JobCodeId { get; set; }
        public string JobCode { get; set; }
        public string JobDescription { get; set; }
        public string LPO { get; set; }
        public decimal EstAmount { get; set; }
        public string CustId { get; set; }
        public string Customer { get; set; }
        public string CurrencyId { get; set; }
        public string FC { get; set; }
        public string CurrencyRate { get; set; }
        public string Comments { get; set; }
        public long EngineerId { get; set; }
        public string UserName { get; set; }
        public string AreaGroup { get; set; }

        public string PurchaseSlNo { get; set; }
        public string BillSeriesId { get; set; }
        public string BillSeries { get; set; }
        public string InvoNo { get; set; }
        public string InvoDate { get; set; }
        public string SupplierId { get; set; }
        public string Supplier { get; set; }
        public string ProductId { get; set; }
        public string Product { get; set; }
        public string ProductDesc { get; set; }
        public string Salesman { get; set; }

        public string Terms { get; set; }
        public string PlaceOfSupply { get; set; }
        public string SupplyTo { get; set; }
        public string LocnId { get; set; }
        public string Location { get; set; }
        public string Unit { get; set; }
        public string PayType { get; set; }
        public string PurchaseType { get; set; }
        public string JobNo { get; set; }
        public string CustAccount { get; set; }

        public string Group { get; set; }
        public string SubGroup { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string UserId { get; set; }

        public string CustAddress { get; set; }
        public string SType { get; set; }
        public string SalesValue { get; set; }
        public string VATValue { get; set; }
        public string NetSalesValue { get; set; }
        public string Cost { get; set; }
        public string Profit { get; set; }
        public string ProfitPercentage { get; set; }


        public string OtherCost { get; set; }
        public string Amount { get; set; }
        public string FCAmount { get; set; }
        public string TaxableValue { get; set; }
        public string Discount { get; set; }
        public string BillDiscount { get; set; }
        public string Roundoff { get; set; }
        public string TotalTaxable { get; set; }
        public string TotalTax { get; set; }
        public string DueDate { get; set; }
        public string ShipDate { get; set; }

        public string DeptId { get; set; }
        public string Dept { get; set; }
        public string Code { get; set; }

        public string ItemDesc { get; set; }
        public string Qty { get; set; }
        public string Rate { get; set; }
        public string NetValue { get; set; }

        public string number { get; set; }
        public string Column1 { get; set; }
        public string Column2 { get; set; }
        public string Column3 { get; set; }
        public string Column4 { get; set; }
        public string Column5 { get; set; }
        public string Column6 { get; set; }
        public string Column7 { get; set; }
        public string Column8 { get; set; }
        public string Column9 { get; set; }
        public string Column10 { get; set; }
        public string Column11 { get; set; }
        public string Column12 { get; set; }
        public string Column13 { get; set; }
        public string HFlag { get; set; }
        public string AccCode { get; set; }
        public string DeptCode { get; set; }

        public string CurrencyName { get; set; }

        DMasters oDMasters = new DMasters();

        DInvReports oDInvReports = new DInvReports();
        public DataSet BOQReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.BOQReportGet(oInvReportModel, dbName);
        }
        public DataSet PurchaseReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.PurchaseReportGet(oInvReportModel, dbName);
        }
        public DataSet Rpt_GetProjectList(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.Rpt_GetProjectList(oInvReportModel, dbName);
        }
        public DataSet PurchaseReturnMainReport(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.PurchaseReturnMainReport(oInvReportModel, dbName);
        }
        public DataSet PurchaseReturnSubReport(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.PurchaseReturnSubReport(oInvReportModel, dbName);
        }
        public DataSet SalesReturnReport(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.SalesReturnReport(oInvReportModel, dbName);
        }
        public DataSet SalesReturnSubReport(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.SalesReturnSubReport(oInvReportModel, dbName);
        }


        public DataSet MonthwiseReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.MonthwiseReportGet(oInvReportModel, dbName);
        }
        public DataSet MonthwiseItemReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.MonthwiseItemReportGet(oInvReportModel, dbName);
        }
        public DataSet ItemReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.ItemReportGet(oInvReportModel, dbName);
        }
        public DataSet SupplierReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.SupplierReportGet(oInvReportModel, dbName);
        }
        public DataSet AreaReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.AreaReportGet(oInvReportModel, dbName);
        }
        public DataSet LocationReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.LocationReportGet(oInvReportModel, dbName);
        }
        public DataSet TopSupplierReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.TopSupplierReportGet(oInvReportModel, dbName);
        }
        public DataSet TopSupplierGraphReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.TopSupplierGraphReportGet(oInvReportModel, dbName);
        }
        public DataSet AreaGroupReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.AreaGroupReportGet(oInvReportModel, dbName);
        }
        public DataSet SubAreaGetforArea(AreaMaster oAreaMaster, string dbName)
        {
            return oDMasters.SubAreaGetforArea(oAreaMaster, dbName);
        }
        public DataSet AreaGroupSalesReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.AreaGroupSalesReportGet(oInvReportModel, dbName);
        }
        public DataSet MonthwiseSalesReportbyCustomerGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.MonthwiseSalesReportbyCustomerGet(oInvReportModel, dbName);
        }
        public DataSet MonthwiseSalesReportbyItemGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.MonthwiseSalesReportbyItemGet(oInvReportModel, dbName);
        }
        public DataSet ItemwisePurchaseReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.ItemwisePurchaseReportGet(oInvReportModel, dbName);
        }
        public DataSet PurchaseReportGraph(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.PurchaseReportGraph(oInvReportModel, dbName);
        }
        public DataSet PurchaseReportGraphwise(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.PurchaseReportGraphwise(oInvReportModel, dbName);
        }
        public DataSet PurchaseReportGroupwise(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.PurchaseReportGroupwise(oInvReportModel, dbName);
        }
        public DataSet PurchaseReportCategorywise(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.PurchaseReportCategorywise(oInvReportModel, dbName);
        }
        public DataSet ProfitAnalysisSalesReturn(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.ProfitAnalysisSalesReturn(oInvReportModel, dbName);
        }
        public DataSet ProfitAnalysis(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.ProfitAnalysis(oInvReportModel, dbName);
        }
        public DataSet MonthwiseExpenseAnalysis(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.MonthwiseExpenseAnalysis(oInvReportModel, dbName);
        }

        public DataSet TransactionDateDiffGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.TransactionDateDiffGet(oInvReportModel, dbName);
        }

        public DataSet PurchaseStockInReportGet(InvReportModel oInvReportModel, string dbName)
        {
            return oDInvReports.PurchaseStockInReportGet(oInvReportModel, dbName);
        }

    }
}