using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PurchaseImportModel
    {
        public string EntryDate { get; set; }
        public string DateofLoading { get; set; }

        public string BuyerNo { get; set; }

        public string Year { get; set; }

        public string Type { get; set; }
        public string Model { get; set; }

        public string Auction { get; set; }
        public string Username { get; set; }


        

        public string City { get; set; }

        public string LotNo { get; set; }
        public string Status { get; set; }

        public long PINo { get; set; }
        public long UId { get; set; }
        public long DeptId { get; set; }
        public long LocationId { get; set; }
        public string VinNo { get; set; }

        public string PointofLoading { get; set; }

        public decimal Price { get; set; }

        public decimal Delivery { get; set; }
        public decimal Shipping { get; set; }

        public decimal DealerFee { get; set; }

        public decimal StorageFee { get; set; }

        public decimal LoadingFee { get; set; }


        public decimal LateFee { get; set; }

        public decimal Insurance { get; set; }

        public decimal CurrentBalance { get; set; }
        public decimal Payed_Amount { get; set; }

        public decimal Balance { get; set; }
        public string ContainerNo { get; set; }

        public decimal AdditionalService { get; set; }

        public string CustomerNotes { get; set; }
        public long SlNo { get; set; }
        public string InvoNo { get; set; }
        public long SupplierId { get; set; }
        public string PayType { get; set; }
        public string PurchaseType { get; set; }
        public string InvoDate { get; set; }
        public string Terms { get; set; }
        public string DueDate { get; set; }
        public long LocnId { get; set; }
        public string ShipDate { get; set; }
        public long PlaceOfSupply { get; set; }
        public string JobNo { get; set; }
        public string JobCode { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal InvoiceTotal { get; set; }
        public decimal FCDiscount { get; set; }
        public decimal TotalTaxable { get; set; }
        public decimal TotalTax { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal FCTaxable { get; set; }
        public decimal FCTax { get; set; }
        public decimal FCGrandTotal { get; set; }
        public string SupplierName { get; set; }
        public string LPO { get; set; }             //Free text in the View
        public string PONo { get; set; }            //Lpo no for internal updation    
        public decimal FCRoundOff { get; set; }
        public decimal RoundOff { get; set; }
        public decimal BaseInvoiceamount { get; set; }
        public decimal Othercharges { get; set; }
      
        public int JobId { get; set; }
        public int finalflag { get; set; } 
        public long PurchaseSlNo { get; set; }


        public int CopyFlag { get; set; }

        public int ConfirmFlag { get; set; }
        public string Colour { get; set; }
        public decimal CustomesDuty { get; set; }

        public string OtherCostName { get; set; }
        public string ItemDescription { get; set; }
        
        public string OtherCostDesc { get; set; }
        public int AccountId { get; set; }
        DPurchaseImport oDPurchaseImport = new DPurchaseImport(); 
         
        public DataSet PurchaseImportInsertandUpdate(DataTable dt, string dbName)
        {
            return oDPurchaseImport.PurchaseImportInsertandUpdate(dt, dbName);
        }
        public DataSet PurchaseImportItemInsert(PurchaseImportModel oPurchaseImportModel, string dbName)
        {
            return oDPurchaseImport.PurchaseImportItemInsert(oPurchaseImportModel, dbName);
        }

        public DataSet PurchaseImportGetandGets(PurchaseImportModel oPurchaseImportModel, string dbName)
        {
            return oDPurchaseImport.PurchaseImportGetandGets(oPurchaseImportModel, dbName);  
        }
        public DataSet ImportNoSearch(PurchaseImportModel PurchaseImportModel, string dbName)
        {
            return oDPurchaseImport.ImportNoSearch(PurchaseImportModel, dbName);   
        }
        public DataSet UsedCarsOtherCostGets(PurchaseImportModel PurchaseImportModel, string dbName)
        {
            return oDPurchaseImport.UsedCarsOtherCostGets(PurchaseImportModel, dbName);
        }

        public DataSet DeletePurchaseImport(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDPurchaseImport.DeletePurchaseImport(PurchaseInvoiceModel, dbName);
        }
    }
}