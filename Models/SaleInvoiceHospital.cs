using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class SaleInvoiceHospital
    {
        public long RegSer { get; set; }
        public string HPatientName { get; set; } 
        public long ProductId { get; set; }
        public long HLocation { get; set; }
        public long HDoctor { get; set; }
        public string HLocationName { get; set; }
        public string Batch { get; set; }
        public long Type { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public long Flag { get; set; }
        public string Status { get; set; }
        public string ProductDesc { get; set; } 
        public string Company { get; set; }
        public string Companycode { get; set; }
        public string ItemExpiry { get; set; }
        public decimal Stock { get; set; } 
        public decimal Purrate { get; set; }
        public decimal Sellingrate { get; set; }
        public decimal Mrp { get; set; }
        public decimal Taxpers { get; set; }
        public long BatchSlNo { get; set; }
        public string Drugschedule { get; set; }
        public decimal Cess { get; set; }
        public decimal Pack { get; set; }
        public long SalesMainId { get; set; }
        public long HBillSeries { get; set; }
        public long HBillNo { get; set; }
        public long HPatient { get; set; }
        public long PayType { get; set; }
        public decimal PRType { get; set; }
        public string HSalesDate { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal Discount { get; set; }
        public decimal Discountpercent { get; set; }
        public decimal TotalTaxable { get; set; }
        public decimal TotlaTax { get; set; }
        public decimal BaseTextTotal { get; set; }
        public decimal BCGST_0 { get; set; }
        public decimal BCGST_5 { get; set; }
        public decimal BCGST_12 { get; set; }
        public decimal BCGST_18 { get; set; }
        public decimal BCGST_28 { get; set; }
        public decimal BCess { get; set; }
        public decimal RoundOff { get; set; }
        public int BDFlag { get; set; }
        public int CessFlag { get; set; }
        public string Remarks { get; set; }
        public long SubId { get; set; }     
        public string Expiry { get; set; }
        public decimal Quantity { get; set; }
        public decimal Free { get; set; }     
        public decimal Loose { get; set; }
        public decimal SellPrice { get; set; }
        public decimal PurPrice { get; set; }
        public decimal Tax { get; set; }
        public decimal TaxPercent { get; set; }
        public decimal TaxableAmt { get; set; }
        public decimal TaxAmt { get; set; }      
        public decimal CessAmount { get; set; }
        public decimal Amount { get; set; }
        public long DrugSche { get; set; } 
        public int DelFlag { get; set; }
        public long Terms { get; set; }
        public string LPO_No { get; set; }
        public long JobNo { get; set; }
        public long RegNo { get; set; }
        public long Area { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public string Variable3 { get; set; }
        public string Variable4 { get; set; }
        public string Variable5 { get; set; }
        public decimal ProdDisc { get; set; }
        public decimal SpecialFeeAmt { get; set; }
        public string Gender { get; set; }
        public string Referance { get; set; }
        public string RegisterNo { get; set; }
        public string CustAddress { get; set; }
        public string GSTNo { get; set; }
        public string GaragePhone { get; set; }
        public string ExportDoc { get; set; }
        public string Email { get; set; }
        public string ExportStatus { get; set; }
        public long SalesManId { get; set; }
        public string AgreementNo { get; set; }
        public string DueDate { get; set; }
        public long SONo { get; set; }
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
        DHospital oDHospital = new DHospital();

        public DataSet HMS_BatchwiseItemDetailsGets(SaleInvoiceHospital oSaleInvoiceHospital, string dbName) 
        {
            return oDHospital.HMS_BatchwiseItemDetailsGets(oSaleInvoiceHospital, dbName); 
        }

        
            public DataSet HMS_SalesInvoiceInsert_StockOut(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceInsert_StockOut(dt, dbName);
        }

        public DataSet HMS_SalesInvoiceInsert(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceInsert(dt, dbName);
        }
        public DataSet HMS_SalesOrderInvoiceInsert(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesOrderInvoiceInsert(dt, dbName);
        }
        public DataSet HMS_OpticalSalesInvoiceInsert(DataTable dt, string dbName)
        {
            return oDHospital.HMS_OpticalSalesInvoiceInsert(dt, dbName);
        }

        

public DataSet HMS_SalesGetandGetsStockOut(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesGetandGetsStockOut(oSaleInvoiceHospital, dbName);
        }


        public DataSet HMS_SalesGetandGets(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesGetandGets(oSaleInvoiceHospital, dbName); 
        }

        public DataSet HMS_SalesOrderGets(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesOrderGets(oSaleInvoiceHospital, dbName);
        }
        public DataSet HMS_OpticalSalesInvoiceGetProductDetails(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_OpticalSalesInvoiceGetProductDetails(oSaleInvoiceHospital, dbName);
        }
        public DataSet HMS_SalesPrescriptionGets(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesPrescriptionGets(oSaleInvoiceHospital, dbName);
        }
        public DataSet HMS_SalesRevisitGets(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesRevisitGets(oSaleInvoiceHospital, dbName);
        }


        
            public DataSet HMS_SalesInvoiceUpdteStockOut(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceUpdteStockOut(dt, dbName);
        }


        public DataSet HMS_SalesInvoiceUpdte(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceUpdte(dt, dbName); 
        }
        public DataSet HMS_SalesOrderInvoiceUpdate(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesOrderInvoiceUpdate(dt, dbName);
        }
        public DataSet HMS_OpticalSalesInvoiceUpdate(DataTable dt, string dbName)
        {
            return oDHospital.HMS_OpticalSalesInvoiceUpdate(dt, dbName);
        }


        
public DataSet HMS_SalesInvoiceDeletestockout(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceDeletestockout(oSaleInvoiceHospital, dbName);
        }

        public DataSet HMS_SalesInvoiceDelete(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceDelete(oSaleInvoiceHospital, dbName); 
        }
        public DataSet HMS_SalesOrderInvoiceDelete(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesOrderInvoiceDelete(oSaleInvoiceHospital, dbName);
        }
        public DataSet HMS_OpticalSalesInvoiceDelete(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_OpticalSalesInvoiceDelete(oSaleInvoiceHospital, dbName);
        }

        public DataSet HMS_SalesReturnInsert(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesReturnInsert(dt, dbName); 
        }
        public DataSet HMS_SalesReturnGetandGets(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesReturnGetandGets(oSaleInvoiceHospital, dbName);
        }
        public DataSet HMS_SalesReturnUpdate(DataTable dt, string dbName)
        { 
            return oDHospital.HMS_SalesReturnUpdate(dt, dbName); 
        }
        public DataSet HMS_SalesReturnDelete(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesReturnDelete(oSaleInvoiceHospital, dbName); 
        }
        public DataSet HMS_BatchwiseItemDetailsGetsSalesReturn(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_BatchwiseItemDetailsGetsSalesReturn(oSaleInvoiceHospital, dbName); 
        }
        public DataSet HMS_SalesInvoiceInsertOPTICALSORDER(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceInsertOPTICALSORDER(dt, dbName);
        }
        public DataSet HMS_SalesInvoiceUpdteOPTICALSORDER(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceUpdteOPTICALSORDER(dt, dbName);
        }
        public DataSet HMS_SalesGetandGetsOPTICALORDER(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesGetandGetsOPTICALORDER(oSaleInvoiceHospital, dbName);
        }
        public DataSet HMS_SalesInvoiceDeleteOPTICALORDER(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceDeleteOPTICALORDER(oSaleInvoiceHospital, dbName);
        }
        public DataSet HMS_SalesInvoiceInsertOPTICALSINVOICE(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceInsertOPTICALSINVOICE(dt, dbName);
        }
        public DataSet HMS_SalesInvoiceUpdteOPTICALSINVOICE(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceUpdteOPTICALSINVOICE(dt, dbName);
        }
        public DataSet HMS_SalesGetandGetsOPTICALSINVOICE(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesGetandGetsOPTICALSINVOICE(oSaleInvoiceHospital, dbName);
        }
        public DataSet HMS_SalesInvoiceDeleteOPTICALSINVOICE(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesInvoiceDeleteOPTICALSINVOICE(oSaleInvoiceHospital, dbName);
        }
        public DataSet HMS_SalesReturnInsertOpticals(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesReturnInsertOpticals(dt, dbName);
        }
        public DataSet HMS_SalesReturnUpdateOpticals(DataTable dt, string dbName)
        {
            return oDHospital.HMS_SalesReturnUpdateOpticals(dt, dbName);
        }
        public DataSet HMS_SalesReturnGetandGetsOpticals(SaleInvoiceHospital oSaleInvoiceHospital, string dbName)
        {
            return oDHospital.HMS_SalesReturnGetandGetsOpticals(oSaleInvoiceHospital, dbName);
        }
    }
}