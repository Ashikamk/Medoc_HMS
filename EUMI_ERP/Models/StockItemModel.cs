using System;
using System.Data;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class StockItemModel
    {
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public string Category { get; set; }
        public string SubType { get; set; }
        public string MaterialCode { get; set; }
        public decimal? UnitVal { get; set; }
        public decimal? TaxVal { get; set; }
        public string Status { get; set; }

        // for HMS_UnitGets
        public long UnitId { get; set; }
        public string UnitName { get; set; }

        private DStockItem _dStockItem = new DStockItem();

        public DataSet HMS_UnitGets(StockItemModel obj, string dbName)
        {
            return _dStockItem.HMS_UnitGets(obj.UnitId, dbName);
        }

        public DataSet ItemGetAll(string dbName)
        {
            return _dStockItem.ItemGetAll(dbName);
        }

        public DataSet ItemGetById(long itemId, string dbName)
        {
            return _dStockItem.ItemGetById(itemId, dbName);
        }

        public DataSet StockItemInsertandUpdate(
            long itemId, string itemCode, string model1, string model2, string model3,
            string unit, string vatCode, string binA, string binB, string binC,
            string alertLevel, int delflg, long userId, long deptId, string dbName)
        {
            return _dStockItem.StockItemInsertandUpdate(
                itemId, itemCode, model1, model2, model3,
                unit, vatCode, binA, binB, binC,
                alertLevel, delflg, userId, deptId, dbName);
        }
    }
}
