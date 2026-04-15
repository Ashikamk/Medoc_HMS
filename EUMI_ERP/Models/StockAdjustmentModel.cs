using EUMI_ERP.DataLayer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class StockAdjustmentModel
    {
       
        public long StockAdjNo { get; set; }
        public long OpenQtyEntryNo { get; set; }
        public int LocationId { get; set; }
      
        public long ProductId { get; set; }
        public int CurrentStock { get; set; }

        public int Adj_Stock { get; set; }
        public int Open_Stock { get; set; }
        public int Diffrence { get; set; }
        public int Location { get; set; }
        public string Date { get; set; }       
        public string ItemCode  { get; set; }
        public string Description  { get; set; }
        public int UId { get; set; }
        public int DeptId { get; set; }
        public int UnitId { get; set; }
        public decimal Quantity { get; set; }
        public int PVTNo { get; set; }
        public int DebitAccount { get; set; }
        public int CreditAccount { get; set; }
        public decimal AvgCost { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
        public string LocationName { get; set; }
        public string UnitName { get; set; }
        public long CAccount { get; set; }
        public long DAccount { get; set; }
        public string DAccountName { get; set; }
        public string CAccountName { get; set; }


        public string currentdate { get; set; }    //for displaying curdate


        DStockTransfer oDStockTransfer = new DStockTransfer();
        public DataSet StockAdjustmentInsert(DataTable dt, string dbName)
        {
            return oDStockTransfer.StockAdjustmentInsert(dt, dbName);
        }
        public DataSet StockAdjustmentnumberSearch(StockAdjustmentModel oStockAdjustmentModel, string dbName)
        {
            return oDStockTransfer.StockAdjustmentnumberSearch(oStockAdjustmentModel, dbName);
        }
        public DataSet StockAdjustmentGetlist(StockAdjustmentModel oStockAdjustmentModel, string dbName)
        {
            return oDStockTransfer.StockAdjustmentGetlist(oStockAdjustmentModel, dbName);
        }
        public DataSet PhysicalVariationTransferGetProduct(StockAdjustmentModel oStockAdjustmentModel, string dbName)
        {
            return oDStockTransfer.PhysicalVariationTransferGetProduct(oStockAdjustmentModel, dbName);
        }
        public DataSet PhysicalVariationTransferInsert(DataTable dt, string dbName)
        {
            return oDStockTransfer.PhysicalVariationTransferInsert(dt, dbName);
        }
        public DataSet PhysicalVariationTransferNumberSearch(StockAdjustmentModel oStockAdjustmentModel, string dbName)
        {
            return oDStockTransfer.PhysicalVariationTransferNumberSearch(oStockAdjustmentModel, dbName);
        }
        public DataSet PhysicalVariationTransferGetlist(StockAdjustmentModel oStockAdjustmentModel, string dbName)
        {
            return oDStockTransfer.PhysicalVariationTransferGetlist(oStockAdjustmentModel, dbName);
        }
        public DataSet StockAdjustmentProductCheck(StockAdjustmentModel oStockAdjustmentModel, string dbName)
        {
            return oDStockTransfer.StockAdjustmentProductCheck(oStockAdjustmentModel, dbName);
        }
        public DataSet OpeningStockEntryInsert(DataTable dt, string dbName)
        {
            return oDStockTransfer.OpeningStockEntryInsert(dt, dbName);
        }
    }
}