using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ProductionEntryCopyModel
    {
        public long ProEntryNo { get; set; }
        public string ProEntryDate { get; set; }
        public int DAccount { get; set; }
        public int CAccount { get; set; }
        public int ProductionQuantity { get; set; }
        public decimal CostPerItem { get; set; }
        public decimal TotalCostFC { get; set; }
        public decimal TotalProdCost { get; set; }
        public decimal TotalOtherCost { get; set; }
        public decimal MaterialTotal { get; set; }
        public string location { get; set; }
        public string ItemCode { get; set; }
        public decimal Rate { get; set; }
        public int DeptId { get; set; }
        public int Currency { get; set; }
        public int UnitId { get; set; }
        public int ProductId { get; set; }
        public string ItemDescription { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public string VType { get; set; }
        public string AccCode { get; set; }
        public int AccId { get; set; }
        public int CurrencyId { get; set; }
        public string VDescription { get; set; }
        public string CurrencyName { get; set; }
        public decimal BaseAmount { get; set; }
        public decimal CurrencyRate { get; set; }
        public string Acc_Description { get; set; }
        public decimal FCAmount { get; set; }
        public string JobCode { get; set; }
        public string DAccountName { get; set; }
        public string CAccountName { get; set; }

        DStockTransfer oDStockTransfer = new DStockTransfer();
        public DataSet CopyProdEntry(ProductionEntryCopyModel oProductionEntryCopyModel, string dbName)
        {
            return oDStockTransfer.CopyProdEntry(oProductionEntryCopyModel, dbName);
        }
        public DataSet ProductionEntryGetandGets(ProductionEntryCopyModel oProductionEntryCopyModel, string dbName)
        {
            return oDStockTransfer.ProductionEntryGetandGets(oProductionEntryCopyModel, dbName);
        }
        public DataSet OtherCostGetandGets(ProductionEntryCopyModel oProductionEntryCopyModel, string dbName)
        {
            return oDStockTransfer.OtherCostGetandGets(oProductionEntryCopyModel, dbName);
        }



    }
}