using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PurchaseInvoiceModel
    {
        public string PurchaseFolder = "Purchase";
        public long PFileId { get; set; }
        public string Extension { get; set; }
        public string FileName { get; set; }
        public string BOQ { get; set; }
        public decimal EstimateAmount { get; set; }
        public string FolderName { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal DealerFee { get; set; }
        public decimal Shipping { get; set; }
        public decimal StorageFee { get; set; }
        public decimal CustomsDuty { get; set; }

        public long SContractNo { get; set; }
        public long SDocType { get; set; }
        public string SFileUpload { get; set; }
        public long SUserId { get; set; }
        public long SDepartmentId { get; set; }
        public long SDeleteFlag { get; set; }
        public long PCAccountId { get; set; }
        public string PCAccount { get; set; }
        public string PCAccountDesc { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public long MRVId { get; set; }
        public long MRVSubId { get; set; }
        public String Performa_NO { get; set; }
        public long Performa_SubTbl_Id { get; set; }
        public long Type { get; set; }
        public long PurchaseInvoiceMainId { get; set; }
        public long SlNo { get; set; }
        public string InvoNo { get; set; }
        public string BillseriesId { get; set; }
        public string Billseries { get; set; }
        public string BillNo { get; set; }
        public string TransType { get; set; }
        public string DeptName { get; set; }
        public string Locnname { get; set; }
        public decimal Cost { get; set; }
        public decimal Price { get; set; }
        public string TransPrice { get; set; }
        public string Salesman { get; set; }
        public string AccountName { get; set; }
        public string AverageCost { get; set; }
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
        public long MainJobNo { get; set; }
        public string MainJobCode { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal InvoiceTotal { get; set; }
        public long DepartmentId { get; set; }
        public long PurchaseDeptId { get; set; }
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
        public string Stock { get; set; }
        public string Available { get; set; }
        public long UnitId { get; set; }
        public long Fraction { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }               //Foreign Currency
        public decimal BaseRate { get; set; }           //Base Currency
        public decimal Discount { get; set; }           //Foreign Currency
        public decimal BaseDiscount { get; set; }       //Base Currency
        public decimal BillDiscount { get; set; }       //Foreign Currency
        public decimal BillDisc { get; set; }           //Base Currency
        public long TaxId { get; set; }
        public decimal TaxRate { get; set; }
        public decimal TaxableAmount { get; set; }      //Foreign Currency
        public decimal TaxAmount { get; set; }          //Foreign Currency
        public decimal TotalAmount { get; set; }        //Foreign Currency
        public decimal BaseTaxable { get; set; }        //Base Currency
        public decimal  BaseTax { get; set; }           //Base Currency
        public decimal BaseAmount { get; set; }
        public decimal Balance { get; set; }
        public decimal OpeningQty { get; set; }
        
       public decimal OtherCosts { get; set; }          //Base Currency
        public decimal OtherCost { get; set; }          //Base Currency
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
        public int OrderId { get; set; }
        public int OrderSubId { get; set; }
        public string LPO { get; set; }             //Free text in the View
        public string PONo { get; set; }            //Lpo no for internal updation
        public string CurrencyName { get; set; }
        public string UnitName { get; set; }
        public string PINumber { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EDITFlag { get; set; }
        public decimal FCRoundOff { get; set; }
        public decimal RoundOff { get; set; }
        public decimal BaseInvoiceamount { get; set; }


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

        public string IMEI { get; set; }

        DPurchase oDMasters = new DPurchase();
        DBuilding oDBuilding = new DBuilding();
        public DataSet PurchaseInvoiceInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PurchaseInvoiceInsertandUpdate(dt, dbName);
        }
        public DataSet MobilePurchaseInvoiceInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.MobilePurchaseInvoiceInsertandUpdate(dt, dbName);
        }
        public DataSet PurchaseInvoiceUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PurchaseInvoiceUpdate(dt, dbName);
        }
        public DataSet MobilePurchaseInvoiceUpdate(DataTable dt, string dbName)
        {
            return oDMasters.MobilePurchaseInvoiceUpdate(dt, dbName);
        }
        public DataSet PurchaseAverageCostRefresh(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseAverageCostRefresh(PurchaseInvoiceModel, dbName);
        }
        
        public DataSet PurchaseInvoiceGetandGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseInvoiceGetandGets(PurchaseInvoiceModel, dbName);
        }

        
            public DataSet PurchaseInvoiceListOpening(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseInvoiceListOpening(PurchaseInvoiceModel, dbName);
        }


        public DataSet PurchaseInvoiceList(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseInvoiceList(PurchaseInvoiceModel, dbName);
        }
        public DataSet PerformaList(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PerformaList(PurchaseInvoiceModel, dbName);
        }
        public DataSet SerialNoSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.SerialNoSearch(PurchaseInvoiceModel, dbName);
        }
        public DataSet OtherCostInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.OtherCostInsertandUpdate(dt, dbName);
        }       
        public DataSet PurchaseTransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseTransactionSearch(PurchaseInvoiceModel, dbName);
        }
        public DataSet IMEIPurchaseTransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.IMEIPurchaseTransactionSearch(PurchaseInvoiceModel, dbName);
        }
        public DataSet IMEIPurchaseTransactionPopup(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.IMEIPurchaseTransactionPopup(PurchaseInvoiceModel, dbName);
        }
        public DataSet SupplierInvoiceNoSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.SupplierInvoiceNoSearch(PurchaseInvoiceModel, dbName);
        }
        public DataSet PurchaseOtherCostGetandGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseOtherCostGetandGets(PurchaseInvoiceModel, dbName);
        }
        public DataSet PurchaseHistoryGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseHistoryGets(PurchaseInvoiceModel, dbName);
        }
        
        public DataSet PurchaseInvoiceRecall(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseInvoiceRecall(PurchaseInvoiceModel, dbName);
        }
        public DataSet PurchaseInvoiceProductRecall(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseInvoiceProductRecall(PurchaseInvoiceModel, dbName);
        }
        public DataSet TransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.TransactionSearch(PurchaseInvoiceModel, dbName);
        }
        public DataSet MobileTransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.MobileTransactionSearch(PurchaseInvoiceModel, dbName);
        }
        public DataSet IMEISearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.IMEISearch(PurchaseInvoiceModel, dbName);
        }
        public DataSet IMEIAvailableSearch(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.IMEIAvailableSearch(PurchaseInvoiceModel, dbName);
        }
        public DataSet PurchaseItemTemporarySave(DataTable dt, string dbName)
        {
            return oDMasters.PurchaseItemTemporarySave(dt, dbName);
        }
        public DataSet PrevoiusUnsavedProductofSupplier(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PrevoiusUnsavedProductofSupplier(PurchaseInvoiceModel, dbName);
        }
        public DataSet PrevItemsExistorNotPurchase(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PrevItemsExistorNotPurchase(PurchaseInvoiceModel, dbName);
        }
        public DataSet DeletePurchase(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.DeletePurchase(PurchaseInvoiceModel, dbName);
        }
        public DataSet DeletePerforma(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.DeletePerforma(PurchaseInvoiceModel, dbName);
        }
        public DataSet CheckDeletedPurchase(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.CheckDeletedPurchase(PurchaseInvoiceModel, dbName);
        }
        public DataSet GetCashPurchaseAccount(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.GetCashPurchaseAccount(PurchaseInvoiceModel, dbName);
        }
        public DataSet OtherTransactionInsertandUpdate(DataTable dt, string dbName)
        {
            return oDBuilding.OtherTransactionInsertandUpdate(dt, dbName);  
        }
        public DataSet OtherTransactionGetandGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.OtherTransactionGetandGets(PurchaseInvoiceModel, dbName); 
        }
        public DataSet ContractMultipleDocInsert(DataTable dt, string dbName)
        {
            return oDBuilding.ContractMultipleDocInsert(dt, dbName);
        }
        public DataSet PurchaseFileInsert(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseFileInsert(PurchaseInvoiceModel, dbName);
        }
        public DataSet PurchaseFileGets(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseFileGets(PurchaseInvoiceModel, dbName);
        }
        public DataSet PurchaseFileDelete(PurchaseInvoiceModel PurchaseInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseFileDelete(PurchaseInvoiceModel, dbName);
        }
        
    }
}