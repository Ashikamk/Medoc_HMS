using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ProductionEntryInsertModel
    {
        public long ProEntryNo { get; set; }
        public string ProEntryDate { get; set; }
        public int DebitAccount { get; set; }
        public int CreditAccount { get; set; }
        public int ProductionItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescription { get; set; }
        public int Currency { get; set; }
        public decimal Rate { get; set; }
        public int Location { get; set; }
        public int ProductionQuantity { get; set; }
        public decimal CostPerItem { get; set; }
        public decimal TotalCostFC { get; set; }
        public decimal TotalProdCost { get; set; }
        public decimal TotalOtherCost { get; set; }
        public decimal MaterialTotal { get; set; }
        public long ProductId { get; set; }
        public long UnitId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Total { get; set; }
        public string Remarks { get; set; }
        public int UserId { get; set; }
        public int DeptId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public decimal TotalOterCost { get; set; }
        public int Pronum { get; set; }
        public int OCId { get; set; }
        public int AccId { get; set; }
        public string ProDate { get; set; }
        public string Description { get; set; }
        public int OCAmount { get; set; }
        public int OCFCAmount { get; set; }
        public int CurrencyId { get; set; }
        public string PayType { get; set; }
        public int DeleteFlag { get; set; }
        public int CurrencyRate { get; set; }
        public int DepartmentId { get; set; }
        public string flag { get; set; }
        public string JobCode { get; set; }
        public long ProjectJobId { get; set; }






        DStockTransfer oDStockTransfer = new DStockTransfer();

        public DataSet ProductionEntryInsertandUpdate(DataTable dt, string dbName)
        {
            return oDStockTransfer.ProductionEntryInsertandUpdate(dt, dbName);
        }
        public DataSet OtherCostInsertandUpdate(DataTable dt, string dbName)
        {
            return oDStockTransfer.OtherCostInsertandUpdate(dt, dbName);
        }

    }
}