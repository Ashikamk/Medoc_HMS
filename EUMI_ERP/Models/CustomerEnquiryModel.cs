using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class CustomerEnquiryModel
    {
        public long EnquiryNo { get; set; }
        public long CustEnquiryMainId { get; set; }
        public long CustEnquirySubId { get; set; } 
        public long CustId { get; set; }
        public string CustAddress { get; set; }
        public string CustName { get; set; }
        public string InvDate { get; set; }
        public long SalesManId { get; set; }
        public string Salesman { get; set; }
        public long AreaId { get; set; }
        public string AreaName { get; set; } 
        public long CurrencyId { get; set; }
        public string CurrencyName { get; set; } 
        public decimal CurrencyRate { get; set; }
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
        public int Sumtotqty { get; set; }
        public decimal LPCost { get; set; }
        public decimal AvgCost { get; set; }
        public decimal LastSellingPrice { get; set; }
        public string Locationstock { get; set; }
        public string custstats { get; set; }
        public decimal RoundGrandTotal { get; set; }
        public decimal RoundFCGrandTotal { get; set; }
        public decimal CustLastSellingPrice { get; set; }
        public string PhoneNumber { get; set; }
        public string DocNumber { get; set; }
        public string Subject { get; set; } 
        public string EnquiryNum { get; set; }
        public string PrdtId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public int Location { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string LOTNo { get; set; }
        public string Bin_A { get; set; }
        public string Bin_B { get; set; }
        public string Bin_C { get; set; }
        public string Bin_D { get; set; }
        public string Bin_E { get; set; }
        public string Bin_F { get; set; }
        public string Bin_G { get; set; }
        public string Bin_H { get; set; }
        public string TRNNumber { get; set; }
        public long BelowCostFlag { get; set; } 

        DEnquiry oDEnquiry = new DEnquiry();
        public DataSet CustomerEnquiryInsertandUpdate(DataTable dt, string dbName) 
        {
            return oDEnquiry.CustomerEnquiryInsertandUpdate(dt, dbName);
        }

        public DataSet CustomerEnquiryGetandGets(CustomerEnquiryModel oCustomerEnquiryModel, string dbName)
        {
            return oDEnquiry.CustomerEnquiryGetandGets(oCustomerEnquiryModel, dbName);
        }
        public DataSet EnquiryNoSearch(CustomerEnquiryModel oCustomerEnquiryModel, string dbName)
        {
            return oDEnquiry.EnquiryNoSearch(oCustomerEnquiryModel, dbName); 
        }      
        public DataSet QuotationEnquiryGets(CustomerEnquiryModel oCustomerEnquiryModel, string dbName) 
        {
            return oDEnquiry.QuotationEnquiryGets(oCustomerEnquiryModel, dbName);  
        }
        public DataSet CustomerEnquiryGetProducts(CustomerEnquiryModel oCustomerEnquiryModel, string dbName)
        {
            return oDEnquiry.CustomerEnquiryGetProducts(oCustomerEnquiryModel, dbName); 
        }
        public DataSet CustomerEnquiryGetandGetsQtn(CustomerEnquiryModel oCustomerEnquiryModel, string dbName)
        {
            return oDEnquiry.CustomerEnquiryGetandGetsQtn(oCustomerEnquiryModel, dbName);
        }
        public DataSet SalesEnquiryGets(CustomerEnquiryModel oCustomerEnquiryModel, string dbName)
        {
            return oDEnquiry.SalesEnquiryGets(oCustomerEnquiryModel, dbName); 
        }
        public DataSet CustomerEnquiryGetProductsSales(CustomerEnquiryModel oCustomerEnquiryModel, string dbName)
        {
            return oDEnquiry.CustomerEnquiryGetProductsSales(oCustomerEnquiryModel, dbName); 
        }
        public DataSet CustomerEnquiryGetandGetsSales(CustomerEnquiryModel oCustomerEnquiryModel, string dbName)
        {
            return oDEnquiry.CustomerEnquiryGetandGetsSales(oCustomerEnquiryModel, dbName); 
        }
        public DataSet CustomerSearchPopuPEnqSales(CustomerEnquiryModel oCustomerEnquiryModel, string dbName)
        {
            return oDEnquiry.CustomerSearchPopuPEnqSales(oCustomerEnquiryModel, dbName); 
        }
        public DataSet SearchCustomerEnquiryProductsInSales(CustomerEnquiryModel oCustomerEnquiryModel, string dbName)
        {
            return oDEnquiry.SearchCustomerEnquiryProductsInSales(oCustomerEnquiryModel, dbName);
        }
        
    }
}
