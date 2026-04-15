using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PharmacyModel
    {
        public long InvId { get; set; }
        public decimal CessPer { get; set; }
        public long Flag { get; set; }
        public long PurMainId { get; set; }
        public long SlNo { get; set; }
        public string InvoNo { get; set; }
        public long SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long reasonid { get; set; }
        public string PayType { get; set; }
        public string PurchaseType { get; set; }
        public string InvoDate { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal FBillDiscount { get; set; }
        public decimal FDiscount { get; set; }
        public decimal FTaxable { get; set; }
        public decimal FTax { get; set; }
        public decimal FCTotal { get; set; }
        public decimal InvoiceTotal { get; set; }
        public decimal FCGST_0 { get; set; }
        public decimal FCGST_5 { get; set; }
        public decimal FCGST_12 { get; set; }
        public decimal FCGST_18 { get; set; }
        public decimal FCGST_28 { get; set; }
        public decimal FCess { get; set; }
        public decimal BilDiscount { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal TotalTaxable { get; set; }
        public decimal TotalTax { get; set; }
        public decimal BaseTotal { get; set; }
        public decimal BaseInvoiceTotal { get; set; }
        public decimal BCGST_0 { get; set; }
        public decimal BCGST_5 { get; set; }
        public decimal BCGST_12 { get; set; }
        public decimal BCGST_18 { get; set; }
        public decimal BCGST_28 { get; set; }
        public decimal BCess { get; set; }
        public decimal FCRoundOff { get; set; }
        public decimal RoundOff { get; set; }
        public int BDFlag { get; set; }
        public int CessFlag { get; set; }
        public string Remarks { get; set; }
        public string Terms { get; set; }
        public string DueDate { get; set; }
        public string LPO_No { get; set; }
        public int JobNo { get; set; }
        public int Area { get; set; }
        public string ShipDate { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }
        public int DeptId { get; set; }

        public long SubId { get; set; }
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescription { get; set; }
        public long LocationId { get; set; }
        public long UnitId { get; set; }
        public long BatchSlNo { get; set; }
        public string Batch { get; set; }
        public string Expiry { get; set; }
        public long Pack { get; set; }
        public decimal Quantity { get; set; }
        public decimal Free { get; set; }
        public decimal Loose { get; set; }
        public decimal SellingRate { get; set; }
        public decimal MRP { get; set; }
        public decimal TQty { get; set; }
        public decimal TLQty { get; set; }
        public long TaxId { get; set; }
        public decimal TaxRate { get; set; }
        public decimal FCRate { get; set; }
        public decimal FCDiscount { get; set; }
        public decimal FCTaxable { get; set; }
        public decimal FCTax { get; set; }
        public decimal FCAmount { get; set; }
        public decimal FC_Cess { get; set; }
        public decimal Rate { get; set; }
        public decimal Discount { get; set; }
        public decimal TaxableAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal Amount { get; set; }
        public decimal B_Cess { get; set; }
        public decimal Margin { get; set; }
        public decimal P_OtherCost { get; set; }
        public string IMEINumber { get; set; }
        public string PO_No { get; set; }
        public string PO_SubTbl_Id { get; set; }
        public string MRV_No { get; set; }
        public string MRV_SubTbl_Id { get; set; }
        public string Performa_NO { get; set; }
        public long Performa_SubTbl_Id { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }

        public long TRNo { get; set; }
        public string TRDate { get; set; }
        public long FromLocation { get; set; }
        public long ToLocation { get; set; }
        public long DebitAcc { get; set; }
        public long CreditAcc { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public decimal CuStock { get; set; }

        public string Acc_Code { get; set; }
        public string Acc_Description { get; set; }
        public string DAcc_Code { get; set; }
        public string DAcc_Description { get; set; }
        public string FLocationName { get; set; }
        public string TLocationName { get; set; }
        public string Stock { get; set; }
        public string Company { get; set; }
        public string Unit { get; set; }
       


        DPharmacy oDPurchase = new DPharmacy();
        DMasters oDmaster = new DMasters(); 
        public DataSet PurchaseCorrectionReport(PharmacyModel oDPurchase, string dbName)
        {
            return oDmaster.PurchaseCorrectionReport(oDPurchase, dbName);
        }
        public DataSet HMS_ItemExcelImport(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_ItemExcelImport(dt, dbName);
        }



        public DataSet HMS_PurchasevaccSearch(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDPurchase.HMS_ImmunizationSearch(oItemMasterModel, dbName);
        }



        public DataSet HMS_PurchaseProductSearch(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDPurchase.HMS_PurchaseProductSearch(oItemMasterModel, dbName);
        }

        

        public DataSet HMS_OpeningPurchaseInsert(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_OpeningPurchaseInsert(dt, dbName);
        }



        public DataSet HMS_PurchaseInsert(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_PurchaseInsert(dt, dbName);
        }
        public DataSet HMS_PurchaseInsertTemp(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_PurchaseInsertTemp(dt, dbName);
        }

        

         public DataSet HMS_PurchaseUpdateOpening(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_PurchaseUpdateOpening(dt, dbName);
        }


        public DataSet HMS_PurchaseUpdate(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_PurchaseUpdate(dt, dbName);
        }
        public DataSet HMS_PurchaseReturnInsert(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_PurchaseReturnInsert(dt, dbName);
        }
        public DataSet HMS_PurchaseReturnUpdate(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_PurchaseReturnUpdate(dt, dbName);
        }
        public DataSet HMS_PurchaseDelete(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseDelete(oDPharmacy, dbName);
        }

        
            public DataSet HMS_PurchaseDeleteopening(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseDeleteopening(oDPharmacy, dbName);
        }


        public DataSet HMS_PurchaseReturnDelete(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseReturnDelete(oDPharmacy, dbName);
        }


        



             public DataSet HMS_PurchaseGetandGetsOpening(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseGetandGetsOpening(oDPharmacy, dbName);
        }



        public DataSet HMS_PurchaseGetandGets(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseGetandGets(oDPharmacy, dbName);
        }
        public DataSet HMS_PurchaseReturnGetandGets(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseReturnGetandGets(oDPharmacy, dbName);
        }
        public DataSet HMS_PurchaseTempList(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseTempList(oDPharmacy, dbName);
        }
        public DataSet HMS_PurchaseTempGets(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseTempGets(oDPharmacy, dbName);
        }
        public DataSet HMS_BatchPurchaseCorrection(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_BatchPurchaseCorrection(oDPharmacy, dbName);
        }
        public DataSet HMS_BatchPurchaseReturn(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_BatchPurchaseReturn(oDPharmacy, dbName);
        }
        public DataSet HMS_PurchaseCorrectionInsert(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_PurchaseCorrectionInsert(dt, dbName);
        }
        public DataSet HMS_PurchaseCorrectionSearch(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseCorrectionSearch(oDPharmacy, dbName);
        }
        public DataSet HMS_PurchaseCorrectionGets(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseCorrectionGets(oDPharmacy, dbName);
        }
        public DataSet HMS_LocationTransferInsert(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_LocationTransferInsert(dt, dbName);
        }
        public DataSet HMS_LocationTransferUpdate(DataTable dt, string dbName)
        {
            return oDPurchase.HMS_LocationTransferUpdate(dt, dbName);
        }
        public DataSet HMS_LocationTransferDelete(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_LocationTransferDelete(oDPharmacy, dbName);
        }
        public DataSet HMS_LocationTransferGet(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_LocationTransferGet(oDPharmacy, dbName);
        }
        public DataSet HMS_LocationTransferView(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_LocationTransferView(oDPharmacy, dbName);
        }
        public DataSet HMS_LocationTransferSearch(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_LocationTransferSearch(oDPharmacy, dbName);
        }
        public DataSet HMS_PurchaseCorrectionGetsbyItem(PharmacyModel oDPharmacy, string dbName)
        {
            return oDPurchase.HMS_PurchaseCorrectionGetsbyItem(oDPharmacy, dbName); 
        }
    }
}