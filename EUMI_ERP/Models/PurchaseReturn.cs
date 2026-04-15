using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PurchaseReturn
    {
        public long PRMainId { get; set; }
        public string PRNo { get; set; }
        public long SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string PayType { get; set; }
        public string PurchaseType { get; set; }
        public string PRDate { get; set; }
        public long Terms { get; set; }
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
        public long SubId { get; set; }
        public long BatchSlno { get; set; }
        public string Batch { get; set; }
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescription { get; set; }
        public long UnitId { get; set; }
        public long Fraction { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }               //Foreign Currency
        public decimal BaseRate { get; set; }           //Base Currency
        public decimal Discount { get; set; }           //Foreign Currency
        public decimal BaseDiscount { get; set; }       //Base Currency
        public long TaxId { get; set; }
        public decimal TaxRate { get; set; }
        public decimal TaxableAmount { get; set; }      //Foreign Currency
        public decimal TaxAmount { get; set; }          //Foreign Currency
        public decimal TotalAmount { get; set; }        //Foreign Currency
        public decimal BaseTaxable { get; set; }        //Base Currency
        public decimal BaseTax { get; set; }           //Base Currency
        public decimal BaseAmount { get; set; }         //Base Currency
        public string Remarks { get; set; }
        public string Status { get; set; }
        public int DeleteFlag { get; set; }
        public int Flag { get; set; }
        public int PIMainId { get; set; }
        public int PISubId { get; set; }
        public string PINo { get; set; }             //Free text in the View
        public string CurrencyName { get; set; }
        public string UnitName { get; set; }
        public string PINumber { get; set; }
        public decimal TaxPer { get; set; }
        public decimal AvgCost { get; set; }
        public int TaxId1 { get; set; }
        public decimal Taxable0 { get; set; }

        public int TaxId2 { get; set; }
        public decimal Taxable5 { get; set; }
        public decimal Tax5 { get; set; }

        public int TaxId3 { get; set; }
        public decimal Taxable12 { get; set; }
        public decimal Tax12 { get; set; }

        public int TaxId4 { get; set; }
        public decimal Taxable18 { get; set; }
        public decimal Tax18 { get; set; }

        public int TaxId5 { get; set; }
        public decimal Taxable28 { get; set; }
        public decimal Tax28 { get; set; }
        public string LocationName { get; set; }

        public string IMEI { get; set; }
        public string UserName { get; set; }

        public string AccCode { get; set; }
        public string CustType { get; set; }
        public string Variable2 { get; set; }
        public string Variable1 { get; set; }

        DPurchase oDMasters = new DPurchase();
        public DataSet PurchaseReturnInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PurchaseReturnInsertandUpdate(dt, dbName);
        }
        public DataSet PurchaseReturnUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PurchaseReturnUpdate(dt, dbName);
        }
        
        public DataSet MobilePurchaseReturnInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.MobilePurchaseReturnInsertandUpdate(dt, dbName);
        }
        public DataSet PurchaseReturnGetandGets(PurchaseReturn PurchaseReturn, string dbName)
        {
            return oDMasters.PurchaseReturnGetandGets(PurchaseReturn, dbName);
        }

        public DataSet PRNoSearch(PurchaseReturn PurchaseReturn, string dbName)
        {
            return oDMasters.PRNoSearch(PurchaseReturn, dbName);
        }
        public DataSet PurchaseReturn_IMEI_Search(PurchaseReturn PurchaseReturn, string dbName)
        {
            return oDMasters.PurchaseReturn_IMEI_Search(PurchaseReturn, dbName);
        }
        public DataSet DeletePurchaseReturn(PurchaseReturn PurchaseReturn, string dbName)
        {
            return oDMasters.DeletePurchaseReturn(PurchaseReturn, dbName);
        }
    }
}