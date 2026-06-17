using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class StockTransferOutModel
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long TransferDeptId { get; set; }
        public long DAccountId { get; set; }
        public long STOId { get; set; }
        public long ProductId { get; set; }
        public string Description { get; set; }
        public int UnitId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public long STONo { get; set; }
        public long trNo { get; set; }
        public int FromLocation { get; set; }
        public int ToLocation { get; set; }
        public string STODate { get; set; }
        public string TRDate { get; set; }
        public int DebitAccount { get; set; }
        public int CreditAccount { get; set; }
        public string Comments { get; set; }
        public string Status { get; set; }
        public int UId { get; set; }
        public int DeptId { get; set; }
        public int DelFlag { get; set; }
        public int outstatus { get; set; }
        public string ItemCode { get; set; }
        public string UnitName { get; set; }
        public string FromLocationName { get; set; }
        public string Stonumber { get; set; }
        public int LoginLocation { get; set; }
        public int TransferLocation { get; set; }
        public string STInDate { get; set; }
        public string AccountDescription { get; set; }
        public string DAccountDescription { get; set; }
        public int STInNo { get; set; }
        public long AccountId { get; set; }
        public long CAccountId { get; set; }
        public string LocA { get; set; }
        public string LocB { get; set; }
        public string LocFrom { get; set; }
        public string LocTo { get; set; }
        public int STOSubId { get; set; }
        public int STInMainId { get; set; }
        public int InQuantity { get; set; }
        public int DAccount { get; set; }
        public int CAccount { get; set; }
        public string AccCode { get; set; }
        public string AccGrp { get; set; }
        public string CAccCode { get; set; }
        public int flag { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescr { get; set; }
        public string Flocation { get; set; }
        public string Tlocalion { get; set; }
        public string DAccountName { get; set; }
        public string CAccountName { get; set; }
        public string LocId { get; set; }
        public string Qty { get; set; }
        public string User { get; set; }
        public long IssuedQty { get; set; }
        public long ScannedQty { get; set; }
        public string EnteredBy { get; set; }
        public string DepartmentCode { get; set; }
        public string Model1 { get; set; }
        public string Model2 { get; set; }
        public string Model3 { get; set; }
        public string Model4 { get; set; }
        public string Model5 { get; set; }
        public string Model6 { get; set; }
        public string Model7 { get; set; }
        public string Model8 { get; set; }

        public string BinA { get; set; }
        public string BinB { get; set; }
        public string BinC { get; set; }
        public string BinD { get; set; }
        public string BinE { get; set; }
        public string BinF { get; set; }
        public string BinG { get; set; }
        public string BinH { get; set; }

        public string TransactionNo { get; set; }
        DStockTransfer oDStockTransfer = new DStockTransfer();

        public DataSet StocktransferOutInsertandUpdate(DataTable dt, string dbName)
        {
            return oDStockTransfer.StocktransferOutInsertandUpdate(dt, dbName);
        }

        public DataSet StockTransferOutGetandGets(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.StockTransferOutGetandGets(oStockTransferOutModel, dbName);
        }

        public DataSet StockDetailsGetsbyLocation(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.StockDetailsGetsbyLocation(oStockTransferOutModel, dbName);
        }

        public DataSet StockTransferOutGetProduct(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.StockTransferOutGetProduct(oStockTransferOutModel, dbName);
        }
        public DataSet StocktransferInInsert(DataTable dt, string dbName)
        {
            return oDStockTransfer.StocktransferInInsert(dt, dbName);
        }
        public DataSet StockInnumberSearch(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.StockInnumberSearch(oStockTransferOutModel, dbName);
        }
        public DataSet StockInnumberSearchgrid(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.StockInnumberSearchgrid(oStockTransferOutModel, dbName);
        }
        public DataSet StockOutnumberSearch(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.StockOutnumberSearch(oStockTransferOutModel, dbName);
        }
        public DataSet AccountNumberSearch(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.AccountNumberSearch(oStockTransferOutModel, dbName);
        }

        public DataSet ExpenseAccountCodeSearch(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.ExpenseAccountCodeSearch(oStockTransferOutModel, dbName);
        }

        public DataSet ExpenseAccountGroupSearch(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.ExpenseAccountGroupSearch(oStockTransferOutModel, dbName);
        }
        public DataSet AccountNoGetandGets(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.AccountNoGetandGets(oStockTransferOutModel, dbName);
        }
        public DataSet LocationTransferInsert(DataTable dt, string dbName)
        {
            return oDStockTransfer.LocationTransferInsert(dt, dbName);
        }
        public DataSet LocationTransferUpdate(DataTable dt, string dbName)
        {
            return oDStockTransfer.LocationTransferUpdate(dt, dbName);
        }


        public DataSet LocationTransfernumbersearch(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.LocationTransfernumbersearch(oStockTransferOutModel, dbName);
        }
        public DataSet LocTransferListForScanner(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.LocTransferListForScanner(oStockTransferOutModel, dbName);
        }
        public DataSet LocationTransferScanGet(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.LocationTransferScanGet(oStockTransferOutModel, dbName);
        }


        public DataSet LocationTransferList(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.LocationTransferList(oStockTransferOutModel, dbName);
        }

        public DataSet LocationTransferGetansGets(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.LocationTransferGetansGets(oStockTransferOutModel, dbName);
        }

        public DataSet LocationTransferCancel(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.LocationTransferCancel(oStockTransferOutModel, dbName);
        }
        public DataSet LocationTransferSparepartsInsert(DataTable dt, string dbName)
        {
            return oDStockTransfer.LocationTransferSparepartsInsert(dt, dbName);
        }
        public DataSet LocationTransferOutList(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.LocationTransferOutList(oStockTransferOutModel, dbName);
        }
        public DataSet PendingLocationTransferSearch(StockTransferOutModel oStockTransferOutModel, string dbName)
        {
            return oDStockTransfer.PendingLocationTransferSearch(oStockTransferOutModel, dbName);
        }
    }
}