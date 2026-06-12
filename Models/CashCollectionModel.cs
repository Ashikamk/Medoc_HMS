using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class CashCollectionModel
    {
        public int SlNo { get; set; }
        public int BillSeriesId { get; set; }
        public int BillSlNo { get; set; }
        public int CustId { get; set; }
        public int DeptId { get; set; }
        public string Customer { get; set; }
        public string Remarks { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalReceived { get; set; }
        public decimal BalanceAmount { get; set; }
        public int UId { get; set; }
        public string Status { get; set; }
        public int Location { get; set; }

        public int DelFlag { get; set; }
        public int Currency { get; set; }
        public decimal Rate { get; set; }

        public decimal ReceivedAmount { get; set; }
        public decimal Total { get; set; }

        public string PaymentType { get; set; }
        DStockTransfer oDStockTransfer = new DStockTransfer();


        public DataSet CashCollectionInsert(DataTable dt, string dbName)
        {
            return oDStockTransfer.CashCollectionInsert(dt, dbName);
        }
    }
}


