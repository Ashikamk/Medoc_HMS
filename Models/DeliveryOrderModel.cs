using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class DeliveryOrderModel
    {
        public long DeliveryOrderNo { get; set; }
        public string DeliveryOrdNo { get; set; }
        public long DeliveryOrderMainId { get; set; }
        public long DeliveryOrderSubId { get; set; } 
        public long SalesOrderMainId { get; set; }
        public long BillSlNo { get; set; }
        public long BillSeriesId { get; set; }
        public long OrderNo { get; set; }
        public string BillDescription { get; set; }
        public string PayType { get; set; }
        public string LPONumber { get; set; }
        public long CustId { get; set; }
        public string CustAddress { get; set; }
        public string CustName { get; set; }
        public string InvDate { get; set; }
        public int VehicleId { get; set; } 
        public string ExpectedDate { get; set; }
        public long LocId { get; set; }
        public long SalesManId { get; set; }
        public long AreaId { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public int DriverId { get; set; }
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
        public long SalesOrderSubId { get; set; }
        public long ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescr { get; set; }
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

        public int Sumtotqty { get; set; }
        public decimal LPCost { get; set; }
        public decimal AvgCost { get; set; }
        public decimal LastSellingPrice { get; set; }
        public string Locationstock { get; set; }
        public string custstats { get; set; }
        public decimal RoundGrandTotal { get; set; }
        public decimal RoundFCGrandTotal { get; set; }
        public decimal CustLastSellingPrice { get; set; }

        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Attention { get; set; }
        public string Subject { get; set; }
        public string Comments { get; set; }
        public string Delivery { get; set; }
        public long QtnNo { get; set; }
        public long EnqNo { get; set; }
        public long SalesNo { get; set; } 
        public string SalesMan { get; set; }
        public string Area { get; set; }
        public string Currency { get; set; }
        public string Location { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string SaleSubId { get; set; }
        public string SordSubId { get; set; }
        public string LOTNo { get; set; }
        public string PhoneNumber { get; set; }

        public string Bin_A { get; set; }
        public string Bin_B { get; set; }
        public string Bin_C { get; set; }
        public string Bin_D { get; set; }
        public string Bin_E { get; set; }
        public string Bin_F { get; set; }
        public string Bin_G { get; set; }
        public string Bin_H { get; set; }
        public long BelowCostFlag { get; set; }

        DEnquiry oDEnquiry = new DEnquiry();

        public DataSet DeliveryOrderInsertandUpdate(DataTable dt, string dbName)
        {
            return oDEnquiry.DeliveryOrderInsertandUpdate(dt, dbName);
        }

        public DataSet DeliveryOrderGetandGets(DeliveryOrderModel oDeliveryOrderModel, string dbName)
        {
            return oDEnquiry.DeliveryOrderGetandGets(oDeliveryOrderModel, dbName);
        }
        public DataSet DeliveryOrderNoSearch(DeliveryOrderModel oDeliveryOrderModel, string dbName) 
        {
            return oDEnquiry.DeliveryOrderNoSearch(oDeliveryOrderModel, dbName); 
        }
        public DataSet DeliveryOrderRecallSalesInv(DeliveryOrderModel oDeliveryOrderModel, string dbName)
        {
            return oDEnquiry.DeliveryOrderRecallSalesInv(oDeliveryOrderModel, dbName);
        }
        public DataSet DeliveryOrderGetandGetsSalesInv(DeliveryOrderModel oDeliveryOrderModel, string dbName)
        {
            return oDEnquiry.DeliveryOrderGetandGetsSalesInv(oDeliveryOrderModel, dbName);
        }
        public DataSet DeliveryOrderGetProductsSalesInv(DeliveryOrderModel oDeliveryOrderModel, string dbName)
        {
            return oDEnquiry.DeliveryOrderGetProductsSalesInv(oDeliveryOrderModel, dbName); 
        }
        public DataSet DeliveryOrderGasTradingInsertandUpdate(DataTable dt, string dbName)
        {
            return oDEnquiry.DeliveryOrderGasTradingInsertandUpdate(dt, dbName); 
        }
        public DataSet DeliveryOrderGasTradingUpdate(DataTable dt, string dbName)
        {
            return oDEnquiry.DeliveryOrderGasTradingUpdate(dt, dbName);
        }
        public DataSet DeliveryOrderCancel(DeliveryOrderModel oDeliveryOrderModel, string dbName)
        {
            return oDEnquiry.DeliveryOrderCancel(oDeliveryOrderModel, dbName);
        }
        public DataSet PackingListInsertandUpdate(DataTable dt, string dbName)
        {
            return oDEnquiry.PackingListInsertandUpdate(dt, dbName); 
        }
        public DataSet PackingListNoSearch(DeliveryOrderModel oDeliveryOrderModel, string dbName)
        {
            return oDEnquiry.PackingListNoSearch(oDeliveryOrderModel, dbName); 
        }
        public DataSet PackingListGetandGets(DeliveryOrderModel oDeliveryOrderModel, string dbName)
        {
            return oDEnquiry.PackingListGetandGets(oDeliveryOrderModel, dbName); 
        }
        public DataSet PackingListView(DeliveryOrderModel oDeliveryOrderModel, string dbName)
        {
            return oDEnquiry.PackingListView(oDeliveryOrderModel, dbName); 
        }
    }
}