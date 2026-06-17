using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class MRVPurchase
    {
        public long PurchaseInvoiceMainId { get; set; }
        public long SlNo { get; set; }
        public string InvoNo { get; set; }
        public long SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string PayType { get; set; }
        public string PurchaseType { get; set; }
        public string InvoDate { get; set; }
        public string Terms { get; set; }
        public string DueDate { get; set; }
        public long LocnId { get; set; }
        public string ShipDate { get; set; }
        public long LocationId { get; set; }
        public long PlaceOfSupply { get; set; }
        public long JobNo { get; set; }
        public string JobCode { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal InvoiceTotal { get; set; }
        public long DepartmentId { get; set; }
        public long UserId { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal FCDiscount { get; set; }
        public decimal TotalTaxable { get; set; }
        public decimal TotalTax { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal FCTaxable { get; set; }
        public decimal FCTax { get; set; }
        public decimal FCGrandTotal { get; set; }
        public long PurchaseInvoiceSubId { get; set; }
        public long BatchSlno { get; set; }
        public string Batch { get; set; }
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescription { get; set; }
        public long UnitId { get; set; }
        public long Fraction { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }               
        public decimal BaseRate { get; set; }          
        public decimal Discount { get; set; }        
        public decimal BaseDiscount { get; set; }      
        public decimal BillDiscount { get; set; }    
        public decimal BillDisc { get; set; }           
        public long TaxId { get; set; }
        public decimal TaxRate { get; set; }
        public decimal TaxableAmount { get; set; }
        public decimal TaxAmount { get; set; }       
        public decimal TotalAmount { get; set; }        
        public decimal BaseTaxable { get; set; }       
        public decimal BaseTax { get; set; }          
        public decimal BaseAmount { get; set; }        
        public decimal OtherCost { get; set; }    
        public string Remarks { get; set; }
        public string Status { get; set; }
        public int DeleteFlag { get; set; }
        public long OCId { get; set; }
        public long AccId { get; set; }
        public string AccName { get; set; }
        public string Description { get; set; }
        public decimal OCAmount { get; set; }
        public decimal OCFCAmount { get; set; }
        public int Flag { get; set; }
        public int MRVId { get; set; }
        public int MRVSubId { get; set; }
        public string MRVNo { get; set; }             //Free text in the View
        public string CurrencyName { get; set; }
        public string UnitName { get; set; }
        public string MRVNumber { get; set; }
        public decimal FCRoundOff { get; set; }
        public decimal RoundOff { get; set; }
        public decimal BaseInvoiceamount { get; set; }


        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string DONo { get; set; }
        public string LPONo { get; set; }
        public string PerformaNo { get; set; }
        public string User { get; set; }

        DMRVPurchase oDMasters = new DMRVPurchase();

        public DataSet MRVPurchaseInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.MRVPurchaseInsertandUpdate(dt, dbName);
        }
        public DataSet OtherCostInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.OtherCostInsertandUpdate(dt, dbName);
        }
        public DataSet MRVPurchaseGetandGets(MRVPurchase MRVPurchase, string dbName)
        {
            return oDMasters.MRVPurchaseGetandGets(MRVPurchase, dbName);
        }
        public DataSet MRVPurchaseOtherCostGetandGets(MRVPurchase MRVPurchase, string dbName)
        {
            return oDMasters.MRVPurchaseOtherCostGetandGets(MRVPurchase, dbName);
        }
        public DataSet MRVPurchaseSerialNoSearch(MRVPurchase MRVPurchase, string dbName)
        {
            return oDMasters.MRVPurchaseSerialNoSearch(MRVPurchase, dbName);
        }
        public DataSet DeleteMRVPurchase(MRVPurchase MRVPurchase, string dbName)
        {
            return oDMasters.DeleteMRVPurchase(MRVPurchase, dbName);
        }
        public DataSet MRVList(MRVPurchase MRVPurchase, string dbName)
        {
            return oDMasters.MRVList(MRVPurchase, dbName);
        }
    }
}