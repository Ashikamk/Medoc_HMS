using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP
{
    public class StockReportModel
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Supplier { get; set; }
        public string Location { get; set; }
        public string StockDate { get; set; }
        public string Department { get; set; }
        public string Unit { get; set; }
        public string Group { get; set; }
        public string SubGroup { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }

        public string VCCFlag { get; set; }
        public string VCCDate { get; set; }
        public string UserId { get; set; }
        public string ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDesc { get; set; }
        public string StockQty { get; set; }
        public string StockValue { get; set; }
        public string AvgCost { get; set; }
        public string OpenCost { get; set; }
        public string Price { get; set; }
        public string Total { get; set; }
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public string Currency { get; set; }
        public string CurrencyRate { get; set; }

        public string Column1 { get; set; }
        public string Column2 { get; set; }
        public string Column3 { get; set; }
        public string Column4 { get; set; }
        public string Column5 { get; set; }
        public int Type { get; set; } 
        public int LocationId { get; set; }
        public string Condition { get; set; }
        public string Condition1 { get; set; }
        public string Condition2 { get; set; }

        public string MRP { get; set; }
        public string LPCost { get; set; }
        public string W_MRP { get; set; }
        public string L_MRP { get; set; }
        public string Status { get; set; }
        public string OpenQty { get; set; }
        public string GroupId { get; set; }
        public string CategoryId { get; set; }

        public string Model1 { get; set; }
        public string Model2 { get; set; }
        public string Model3 { get; set; }
        public string Model4 { get; set; }
        public string Model5 { get; set; }

        public string FCCost { get; set; }
        public string OrderNo { get; set; }
        public string OrderDate { get; set; }
        public string Rate { get; set; }
        public string OrderQty{ get; set; }
        public string RecQty { get; set; }
        public string PendingQty { get; set; }
        public string PerformaQty { get; set; }
        public string PerformaDate { get; set; }
        public string User { get; set; }
        public string BuyerNo { get; set; }

        public string Year { get; set; }
        public string VCCStatus { get; set; }
        DStockReport oDStockReport = new DStockReport();
        public DataSet StockReportGet(StockReportModel oStockReportModel, string dbName)
        {
            return oDStockReport.StockReportGet(oStockReportModel, dbName);
        }
        public DataSet StockQueryGet(StockReportModel oStockReportModel, string dbName)
        {
            return oDStockReport.StockQueryGet(oStockReportModel, dbName);
        }
        public DataSet PendingPurchaseOrderSQ(StockReportModel oStockReportModel, string dbName)
        {
            return oDStockReport.PendingPurchaseOrderSQ(oStockReportModel, dbName);
        }
       
        public DataSet StockTransferOutReportGet(StockReportModel oStockReportModel, string dbName)
        {
            return oDStockReport.StockTransferOutReportGet(oStockReportModel, dbName);
        }

        public DataSet StockTransferInReportGet(StockReportModel oStockReportModel, string dbName)
        {
            return oDStockReport.StockTransferInReportGet(oStockReportModel, dbName);
        }

        public DataSet DetailedStock(StockReportModel oStockReportModel, string dbName)
        {
            return oDStockReport.DetailedStock(oStockReportModel, dbName); 
        }
        public DataSet VCCPaidUpdate(StockReportModel oStockReportModel, string dbName)
        {
            return oDStockReport.VCCPaidUpdate(oStockReportModel, dbName);
        }
    }
}