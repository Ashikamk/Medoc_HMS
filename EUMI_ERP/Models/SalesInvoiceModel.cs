using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class SalesInvoiceModel
    {
        public string SalesFolder = "SalesInvoiceDocs";
        public long PFileId { get; set; }
        public string Extension { get; set; }
        public string FileName { get; set; }
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
        public decimal AverageCost { get; set; }
        public string Remarks { get; set; }
        public long DeptId { get; set; }
        public long PHDeptId { get; set; }
        public long UserId { get; set; }
        public string CurrentDate { get; set; }
        public long SalesSubId { get; set; }
        public long ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescr { get; set; }
        public decimal MinQty { get; set; }
        public decimal MaxQty { get; set; }

        public decimal purchasecost { get; set; }
        public string TotCost { get; set; }

        

        public decimal mrp { get; set; }
        public decimal saleQty { get; set; }
        public decimal OrderQty { get; set; }
        public decimal curStock { get; set; }
        public long UnitId { get; set; }
        public string UnitName { get; set; }
        public decimal ProdQty { get; set; }
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

        public decimal Sumtotqty { get; set; }
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
        public string checkflag { get; set; }

        public string Condition { get; set; }
        public decimal TotalCost { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long SOSubId { get; set; }
        public long DOrdSubId { get; set; }
        public decimal stocktotloseqty { get; set; }
        public int PricegroupId { get; set; }
        public decimal SellingPrice { get; set; }
        public decimal FcBillDiscount { get; set; }

        public string LocnName { get; set; }
        public string UserName { get; set; }
        public string DriverName { get; set; }
        public string IssuedQty { get; set; }
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

        public string Bin_A { get; set; }
        public string Bin_B { get; set; }
        public string Bin_C { get; set; }
        public string Bin_D { get; set; }
        public string Bin_E { get; set; }
        public string Bin_F { get; set; }
        public string Bin_G { get; set; }
        public string Bin_H { get; set; }

        public string Otherdescription { get; set; }
        public int IEMICount { get; set; }

        public string ImeiNo { get; set; }
        public string DepartmentCode { get; set; }

        public int type { get; set; }
        public string HSNCode { get; set; }
        public decimal Width { get; set; }
        public decimal Length { get; set; }
        public decimal CashAdvance { get; set; }
        public decimal DesignRate { get; set; }
        public string TrnNumber { get; set; }
        public decimal PdtCashAdvance { get; set; }
        public string PhoneNumber { get; set; }
        public string balanceamt { get; set; }
        public string LOTNo { get; set; }
        public string Amnt { get; set; }
        public string CashAdvnce { get; set; }
        public string VCCDate { get; set; }
        public string acctype { get; set; }
        public decimal VCCBaseAmount { get; set; }
        public decimal ExcessAmt { get; set; }
        public string Model1 { get; set; }
        public string ScannedQty { get; set; }
        public string Model2 { get; set; }
        public string Model3 { get; set; }
        public string Model4 { get; set; }
        public string Model5 { get; set; }
        public string Model6 { get; set; }
        public string Model7 { get; set; }
        public string Model8 { get; set; }
        public long AccountId { get; set; }
        public long Account { get; set; }

        public string DepartmentName { get; set; }
        public string ItemName { get; set; }
        public decimal CreditLimit { get; set; }
        public string EnteredBy { get; set; }

        public string GarageName { get; set; }
        public string GaragePhone { get; set; }

        public string CustPhnNew { get; set; }
        public string ChassisNo { get; set; }

        public string Variable1 { get; set; }
        public string Variable2 { get; set; }


        public long BelowCostFlag { get; set; }
        public string POQty { get; set; }
        public string PPQty { get; set; }
        public decimal FractionQty { get; set; }
        public decimal CalcQty { get; set; }
        public string Expiry { get; set; }
        public string Deldate { get; set; }

        public string CustAccount { get; set; }
        public string Email { get; set; }
        public string AgreementNo { get; set; }
        public string DoLPONumber { get; set; }

        public string DPrice { get; set; }
        public string WPrice { get; set; }
        public string MPrice { get; set; }
        public string APrice { get; set; }
        public string GSTNo { get; set; }
        public string ExportDoc { get; set; }
        public string ExportStatus { get; set; }
        public string Gender { get; set; }
        public string Referance { get; set; }
        public string RegisterNo { get; set; }

        public float RightFarSph { get; set; }
        public float RightFarCyl { get; set; }
        public float RightFarAxs { get; set; }
        public float RightFarVA { get; set; }
        public float RightFarPD { get; set; }
        public float RightFarAdd { get; set; }
        public float LeftFarSph { get; set; }
        public float LeftFarCyl { get; set; }
        public float LeftFarAxs { get; set; }
        public float LeftFarVA { get; set; }
        public float LeftFarPD { get; set; }
        public float LeftFarAdd { get; set; }
        public float RightNearSph { get; set; }
        public float RightNearCyl { get; set; }
        public float RightNearAxs { get; set; }
        public float RightNearVA { get; set; }
        public float RightNearPD { get; set; }
        public float RightNearAdd { get; set; }
        public float LeftNearSph { get; set; }
        public float LeftNearCyl { get; set; }
        public float LeftNearAxs { get; set; }
        public float LeftNearVA { get; set; }
        public float LeftNearPD { get; set; }
        public float LeftNearAdd { get; set; }
        public float Indax { get; set; }
        public string Coating { get; set; }
        public string SplTreat { get; set; }
        public string OtherSpecs { get; set; }
        public string Optometrist { get; set; }
        public string LensConst { get; set; }
        public bool InterState { get; set; }
        public bool ReSendSMS { get; set; }
        public string OptPrescRemarks { get; set; }

        DMasters oDMasters = new DMasters();

        DEnquiry oDEnquiry = new DEnquiry();

        DLocationTransfer oDLocationTransfer = new DLocationTransfer();
        public DataSet GarageNameSearch(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.GarageNameSearch(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.SalesInsertandUpdate(dt, dbName);
        }
        public DataSet PressSalesInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PressSalesInsertandUpdate(dt, dbName);
        }


        public DataSet MobileSalesInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.MobileSalesInsertandUpdate(dt, dbName);
        }
        public DataSet UsedCarSalesInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.UsedCarSalesInsertandUpdate(dt, dbName);
        }


        public DataSet SalesInvoiceUpdate(DataTable dt, string dbName)
        {
            return oDMasters.SalesInvoiceUpdate(dt, dbName);
        }

        public DataSet SalesInvoiceRentCarUpdate(DataTable dt, string dbName)
        {
            return oDMasters.SalesInvoiceRentCarUpdate(dt, dbName);
        }
        public DataSet PressSalesInvoiceUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PressSalesInvoiceUpdate(dt, dbName);
        }
        public DataSet UsedCarSalesInvoiceUpdate(DataTable dt, string dbName)
        {
            return oDMasters.UsedCarSalesInvoiceUpdate(dt, dbName);
        }


        public DataSet SalesGetandGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.SalesGetandGets(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesGetandGetsCashCollection(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.SalesGetandGetsCashCollection(oSalesInvoiceModel, dbName);
        }

        public DataSet PackingHistoryGetandGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.PackingHistoryGetandGets(oSalesInvoiceModel, dbName);
        }
        public DataSet PackingHistoryCopyGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.PackingHistoryCopyGets(oSalesInvoiceModel, dbName);
        }
        public DataSet PackingHistoryLTCopyGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.PackingHistoryLTCopyGets(oSalesInvoiceModel, dbName);
        }


        public DataSet SerialNoSearch(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.SerialNoSearch(oSalesInvoiceModel, dbName);
        }
        public DataSet OpticalSerialNoSearch(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.OpticalSerialNoSearch(oSalesInvoiceModel, dbName);
        }
        public DataSet DeliveryNoSearch(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.DeliveryNoSearch(oSalesInvoiceModel, dbName);
        }
        public DataSet PackingHistoryView(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.PackingHistoryView(oSalesInvoiceModel, dbName);
        }

        public DataSet CustomerProductDetailsSearch(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.CustomerProductDetailsSearch(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesTransGetandGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.SalesTransGetandGets(oSalesInvoiceModel, dbName);
        }

        public DataSet DeliveryOrderTransGetandGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.DeliveryOrderTransGetandGets(oSalesInvoiceModel, dbName);
        }
        public DataSet IMEISalesTransGetandGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.IMEISalesTransGetandGets(oSalesInvoiceModel, dbName);
        }

        public DataSet IMEISalesTransPopup(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.IMEISalesTransPopup(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceRecall(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceRecall(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceGetProducts(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceGetProducts(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceRecallDeliveryOrder(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceRecallDeliveryOrder(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesGetandGetsDeliveryOrder(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesGetandGetsDeliveryOrder(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceGetProductsDeliveryOrder(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceGetProductsDeliveryOrder(oSalesInvoiceModel, dbName);
        }
        public DataSet GetQuantitybyLocation(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.GetQuantitybyLocation(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceCancel(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceCancel(oSalesInvoiceModel, dbName);
        }

        public DataSet SalesInvoiceRentCarDelete(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceRentCarDelete(oSalesInvoiceModel, dbName);
        }
        public DataSet TemporarySalesInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.TemporarySalesInsertandUpdate(dt, dbName);
        }
        public DataSet VCCAmountGet(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.VCCAmountGet(oSalesInvoiceModel, dbName);
        }
        public DataSet VCCGetandGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.VCCGetandGets(oSalesInvoiceModel, dbName);
        }

        public DataSet VCCInsertandUpdate(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.VCCInsertandUpdate(oSalesInvoiceModel, dbName);
        }
        public DataSet OrderBouncingInsert(DataTable dt, string dbName)
        {
            return oDMasters.OrderBouncingInsert(dt, dbName);
        }

        public DataSet OrderBouncingGetandGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDLocationTransfer.OrderBouncingGetandGets(oSalesInvoiceModel, dbName);
        }
        public DataSet PurchaseAnalysisGet(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.PurchaseAnalysisGet(oSalesInvoiceModel, dbName);
        }

        public DataSet ApproveOrderBouncing(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDLocationTransfer.ApproveOrderBouncing(oSalesInvoiceModel, dbName);
        }
        public DataSet AcceptAllOrderBouncing(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDLocationTransfer.AcceptAllOrderBouncing(oSalesInvoiceModel, dbName);
        }
        public DataSet PrevoiusUnsavedProductofCustomer(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.PrevoiusUnsavedProductofCustomer(oSalesInvoiceModel, dbName);
        }
        public DataSet CustomerDueDateChecking(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.CustomerDueDateChecking(oSalesInvoiceModel, dbName);
        }

        public DataSet TemporarySalesDelete(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.TemporarySalesDelete(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceRecallSalesreturn(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceRecallSalesreturn(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesGetandGetsSalesretun(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesGetandGetsSalesretun(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceGetProductsSalesReturn(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceGetProductsSalesReturn(oSalesInvoiceModel, dbName);
        }
        public DataSet OpticalSalesInvoiceGetProducts(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.OpticalSalesInvoiceGetProducts(oSalesInvoiceModel, dbName);
        }


        
public DataSet SalesInvoiceGetListStockOut(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceGetListStockOut(oSalesInvoiceModel, dbName);
        }


        public DataSet SalesInvoiceGetList(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceGetList(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceOrderGetList(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceOrderGetList(oSalesInvoiceModel, dbName);
        }
             public DataSet SalesOpticalInvoiceGetList(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesOpticalInvoiceGetList(oSalesInvoiceModel, dbName);
        }
        public DataSet CustomerEnquiryGetList(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.CustomerEnquiryGetList(oSalesInvoiceModel, dbName);
        }
        public DataSet DeliveryOrderListView(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.DeliveryOrderListView(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesOrderListView(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesOrderListView(oSalesInvoiceModel, dbName);
        }
        public DataSet QuotationEntryListView(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.QuotationEntryListView(oSalesInvoiceModel, dbName);
        }
        public DataSet MobileSalesInvoiceUpdate(DataTable dt, string dbName)
        {
            return oDMasters.MobileSalesInvoiceUpdate(dt, dbName);
        }
        public DataSet SalesInvoceFileInsert(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoceFileInsert(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvocieFileGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvocieFileGets(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoceFileDelete(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoceFileDelete(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesGasTradingInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.SalesGasTradingInsertandUpdate(dt, dbName);
        }

        public DataSet SalesRentCarInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.SalesRentCarInsertandUpdate(dt, dbName);
        }
        public DataSet SalesInvoiceGasTradingUpdate(DataTable dt, string dbName)
        {
            return oDMasters.SalesInvoiceGasTradingUpdate(dt, dbName);
        }
        public DataSet ExportSalesDocStatusGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.ExportSalesDocStatusGets(oSalesInvoiceModel, dbName); 
        }
        public DataSet ExportSalesDocsSave(DataTable dt, string dbName)
        {
            return oDEnquiry.ExportSalesDocsSave(dt, dbName); 
        }
        public DataSet CustomerSalesGetandGets(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.CustomerSalesGetandGets(oSalesInvoiceModel, dbName); 
        }

        public DataSet SerialNoSearchOPTICALSORDER(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.SerialNoSearchOPTICALSORDER(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceGetListOPTICALORDER(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceGetListOPTICALORDER(oSalesInvoiceModel, dbName);
        }
        public DataSet SerialNoSearchOPTICALSINVOICE(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDMasters.SerialNoSearchOPTICALSINVOICE(oSalesInvoiceModel, dbName);
        }
        public DataSet SalesInvoiceGetListOPTICALSINVOICE(SalesInvoiceModel oSalesInvoiceModel, string dbName)
        {
            return oDEnquiry.SalesInvoiceGetListOPTICALSINVOICE(oSalesInvoiceModel, dbName);
        }
    }
}