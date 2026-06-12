using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PriceManagerModel
    {
        public int Location { get; set; }
        public int DeptId { get; set; }
        public string ItemCode { get; set; }
        public long ItemId { get; set; }
        public string UnitName { get; set; }
        public string Description { get; set; }
        public string GroupName { get; set; }
        public string InvoiceDate { get; set; }
        
        public string InvoiceNo { get; set; }
        public string CatogoryName { get; set; }
        public string CustAccount { get; set; }
        public string CustName { get; set; }
        public string Status { get; set; }
        public int Quantity { get; set; }
        public decimal Rate { get; set; }
        
        public int totQty { get; set; }
        public int PurchaseQty { get; set; }
        public string SellingPrice { get; set; }
        public string Price { get; set; }
        public decimal Price1 { get; set; }
        public decimal Price2 { get; set; }
        public decimal Price3 { get; set; }
        public string SellingPrice_1 { get; set; }
        public string SellingPrice_2 { get; set; }
        public long multipriceId3 { get; set; }
        public decimal newsellingprice { get; set; }
        public string DelFlag { get; set; }
        public string MultipriceId { get; set; }
        public string Prev_LPCost { get; set; }
        public string LPCost { get; set; }
        public string BillNo { get; set; }
        public string Oldcostprice { get; set; }
        public string Oldsellprice { get; set; }
        public string oldmultiprice1 { get; set; }
        public string oldmultiprice2 { get; set; }
        public string UserId { get; set; }
        public string Newcostprice { get; set; }
        DStockTransfer oDStockTransfer = new DStockTransfer();

        public DataSet PriceManagerListItem(PriceManagerModel oPriceManagerModel, string dbName)
        {
            return oDStockTransfer.PriceManagerListItem(oPriceManagerModel, dbName);
        }
        public DataSet PriceManagerItemGetandGets(PriceManagerModel oPriceManagerModel, string dbName)
        {
            return oDStockTransfer.PriceManagerItemGetandGets(oPriceManagerModel, dbName);
        }
        public DataSet PriceManagerPriceGetandGets(PriceManagerModel oPriceManagerModel, string dbName)
        {
            return oDStockTransfer.PriceManagerPriceGetandGets(oPriceManagerModel, dbName);
        }
        public DataSet PriceManagementInsertandUpdate(PriceManagerModel oPriceManagerModel, string dbName)
        {
            return oDStockTransfer.PriceManagementInsertandUpdate(oPriceManagerModel, dbName);
        }
    }
   
}