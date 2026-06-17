using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class MRVModel
    {
        public long MainId { get; set; }
        public long MRVNo { get; set; }
        public string DONo { get; set; }
        public long SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string PayType { get; set; }
        public string PurchaseType { get; set; }
        public string MRVDate { get; set; }
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
        public long MRVSubId { get; set; }
        public long PerformaSubId { get; set; }
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
        public int Flag { get; set; }
        public int OrderId { get; set; }
        public int OrderSubId { get; set; }
        public string LPO { get; set; }
        public string PerformaNo { get; set; } //Free text in the View
        public string PerformaNos { get; set; }
        public string PONo { get; set; }            //Lpo no for internal updation
        public string CurrencyName { get; set; }
        public string UnitName { get; set; }
        public string PINumber { get; set; }
        public string MRVNumber { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }



        DMRVPurchase oDMasters = new DMRVPurchase();
        public DataSet MRVInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.MRVInsertandUpdate(dt, dbName);
        }
        public DataSet SupplierDONoSearch(MRVModel MRVModel, string dbName)
        {
            return oDMasters.SupplierDONoSearch(MRVModel, dbName);
        }
        public DataSet MRVSerialNoSearch(MRVModel MRVModel, string dbName)
        {
            return oDMasters.MRVSerialNoSearch(MRVModel, dbName);
        }
        public DataSet MRVGetandGets(MRVModel MRVModel, string dbName)
        {
            return oDMasters.MRVGetandGets(MRVModel, dbName);
        }
        public DataSet PendingMRVGets(MRVModel MRVModel, string dbName)
        {
            return oDMasters.PendingMRVGets(MRVModel, dbName);
        }
        public DataSet PendingMRVGetProduct(MRVModel MRVModel, string dbName)
        {
            return oDMasters.PendingMRVGetProduct(MRVModel, dbName);
        }
        public DataSet DeleteMRV(MRVModel MRVModel, string dbName)
        {
            return oDMasters.DeleteMRV(MRVModel, dbName);
        }
    }
    
}