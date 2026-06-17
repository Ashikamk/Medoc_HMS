using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP
{
    public class StockTransferInModel
    {
            public int LoginLocation { get; set; }
              public string STInDate { get; set; }
            public string DebitAccount { get; set; }
            public string CreditAccount { get; set; }
            public string Comments { get; set; }
            public int STONo { get; set; }
            public int STInNo { get; set; }
            public int ProductId { get; set; }
            public int UnitId { get; set; }
            public int Quantity { get; set; }
            public decimal Price { get; set; }
            public int status { get; set; }
            public int UId { get; set; }
            public int DeptId { get; set; }
            public int DelFlag { get; set; }
            public decimal Total { get; set; }
            public string Status { get; set; }

             public int FromDate { get; set; }

             public int ToDate { get; set; }
        public object DateFrom { get; internal set; }
        public object DateTo { get; internal set; }

        DStockTransfer oDStockTransfer = new DStockTransfer();

           
        }
    }

