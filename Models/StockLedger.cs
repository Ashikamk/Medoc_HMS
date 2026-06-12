using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class StockLedger
    {
        public long ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public long Quantity { get; set; }
        public long BalanceQty { get; set; }
        public decimal AvgCost { get; set; }
        public decimal Cost { get; set; }
        public decimal SellingRate { get; set; }
        public string AccCode { get; set; }
        public string Account { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string InvDate { get; set; }
        public decimal Amount { get; set; }
        public string TransType { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public string TrType { get; set; }
        public decimal SellingAmount { get; set; }
        public string BillNumber { get; set; }

        DStockReport oDStockReport = new DStockReport();
        public DataSet StockLedgerModel(StockLedger StockLedger, string dbName)
        {
            return oDStockReport.StockLedger(StockLedger, dbName);
        }
    }
}