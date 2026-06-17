using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class SalesReturnModel
    {

        public long BillSeries { get; set; }
        public long ReturnNo { get; set; }
        public long SalesMainId { get; set; }
        public long BillSeriesId { get; set; }
        public long BillSlNo { get; set; }
        public string BlSlNo { get; set; }
        public string BlSeriesId { get; set; }
        public string BillDescription { get; set; }
        public string PayType { get; set; }
        public string LPONumber { get; set; }
        public long CustId { get; set; }
        public string CustAddress { get; set; }
        public string CustName { get; set; }
        public string InvDate { get; set; }
        public string InvTerms { get; set; }
        public string DueDate { get; set; }
        public long LocId { get; set; }
        public long SalesManId { get; set; }
        public long AreaId { get; set; }
        public string AreaName { get; set; }
        public string UserName { get; set; } 
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public long JobNumber { get; set; }
        public string JobCode { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal FCGrandTotal { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal FCTotalDiscount { get; set; }
        public decimal TotalTaxable { get; set; }
        public decimal FCTotTaxable { get; set; }
        public decimal TotalTax { get; set; }
        public decimal FCTotTax { get; set; }
        public string Remarks { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public string CurrentDate { get; set; }
        public long SalesSubId { get; set; }
        public long ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescr { get; set; }
        public long UnitId { get; set; }
        public string UnitName { get; set; }
        public long ProdQty { get; set; }
        public decimal ProdRate { get; set; }
        public decimal FcProdRate { get; set; }
        public decimal ProdDisc { get; set; }
        public decimal FcProdDisc { get; set; }
        public decimal TaxableAmount { get; set; }
        public decimal FCTaxableAmount { get; set; }
        public decimal TaxPercent { get; set; }
        public long TaxId { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal FCTaxAmount { get; set; }
        public decimal Amount { get; set; }
        public decimal FCAmount { get; set; }
        public long LocnId { get; set; }
        public long BatchSNo { get; set; }
        public string Batch { get; set; }

        public int Sumtotqty { get; set; }
        public decimal LPCost { get; set; }
        public decimal AvgCost { get; set; }
        public decimal LastSellingPrice { get; set; }
        public string Locationstock { get; set; }
        public string custstats { get; set; }
        public decimal RoundGrandTotal { get; set; }
        public decimal RoundFCGrandTotal { get; set; }
        public decimal CustLastSellingPrice { get; set; }
        public string SalesMan { get; set; }
        public string CurrencyName { get; set; }
        public string Location { get; set; }
        public long EnquiryNo { get; set; }
        public long QuotationNo { get; set; }
        public long OrderNo { get; set; }
        public long DeliveryOrderNo { get; set; }
        public int DelFlag { get; set; }
        public decimal BillDiscount { get; set; }
        public string Status { get; set; }
        public string Condition { get; set; }
        public decimal TotalCost { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string User { get; set; }

        public int stocktotloseqty { get; set; }

        public decimal Taxable0 { get; set; }
        public decimal Tax0 { get; set; }
        public decimal Taxable5 { get; set; }
        public decimal Tax5 { get; set; }
        public decimal Taxable12 { get; set; }
        public decimal Tax12 { get; set; }
        public decimal Taxable18 { get; set; }
        public decimal Tax18 { get; set; }
        public decimal Taxable28 { get; set; }
        public decimal Tax28 { get; set; }
        public int TaxId1 { get; set; }
        public int TaxId2 { get; set; }
        public int TaxId3 { get; set; }
        public int TaxId4 { get; set; }
        public int TaxId5 { get; set; }
        public string IMEINO { get; set; }
        public string Otherdescription { get; set; }
        public string TRNNumber { get; set; }
        public long Salesubid { get; set; }
        public string Department { get; set; }
        public string Print { get; set; }
        public string DepartmentName { get; set; }

        public string Bin_A { get; set; }
        public string Bin_B { get; set; }
        public string Bin_C { get; set; }
        public string Bin_D { get; set; }
        public string Bin_E { get; set; }
        public string Bin_F { get; set; }
        public string Bin_G { get; set; }
        public string Bin_H { get; set; }
        public string GarageName { get; set; }
        DEnquiry oDEnquiry = new DEnquiry();
        public DataSet SalesReturnInsertandUpdate(DataTable dt, string dbName)
        {
            return oDEnquiry.SalesReturnInsertandUpdate(dt, dbName);
        }
        public DataSet SalesReturnMobileInsertandUpdate(DataTable dt, string dbName) 
        {
            return oDEnquiry.SalesReturnMobileInsertandUpdate(dt, dbName);
        }
        
        public DataSet SalesReturnGetandGets(SalesReturnModel oSalesReturnModel, string dbName)
        {
            return oDEnquiry.SalesReturnGetandGets(oSalesReturnModel, dbName);
        }
        public DataSet ReturnNoSearch(SalesReturnModel oSalesReturnModel, string dbName)
        {
            return oDEnquiry.ReturnNoSearch(oSalesReturnModel, dbName);
        }
        public DataSet SalesReturnCancel(SalesReturnModel oSalesReturnModel, string dbName)
        {
            return oDEnquiry.SalesReturnCancel(oSalesReturnModel, dbName); 
        }
        public DataSet PH_Dashboard(SalesReturnModel oSalesReturnModel, string dbName)
        {
            return oDEnquiry.PH_Dashboard(oSalesReturnModel, dbName);
        }
        public DataSet ItemwiseDashboard(SalesReturnModel oSalesReturnModel, string dbName)
        {
            return oDEnquiry.ItemwiseDashboard(oSalesReturnModel, dbName);
        }
        public DataSet SummaryDashboard(SalesReturnModel oSalesReturnModel, string dbName)
        {
            return oDEnquiry.SummaryDashboard(oSalesReturnModel, dbName);
        }
        
        public DataSet SalesReturnUpdate(DataTable dt, string dbName)
        {
            return oDEnquiry.SalesReturnUpdate(dt, dbName);
        }
        public DataSet SalesReturnGetList(SalesReturnModel oSalesReturnModel, string dbName)
        {
            return oDEnquiry.SalesReturnGetList(oSalesReturnModel, dbName);  
        }
        public DataSet SalesReturnGetListOpticals(SalesReturnModel oSalesReturnModel, string dbName)
        {
            return oDEnquiry.SalesReturnGetListOpticals(oSalesReturnModel, dbName);
        }
    }
}