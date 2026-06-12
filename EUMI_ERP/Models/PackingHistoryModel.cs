using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PackingHistoryModel
    {


        public int ItemId { get; set; }
        public int ItemLocationId { get; set; }
        public int FromLocId { get; set; }
        public int ToLocId { get; set; }
        public int UnitId { get; set; }
        public int Location { get; set; }
        public long InvoiceQty { get; set; }
        public long ScannedQty { get; set; }
        public string Status { get; set; }
        public string ItemCode { get; set; }
        public int DeliveryNo { get; set; }
        public int IssuedQty { get; set; }
        public int Diffrence { get; set; }
        public int BillSeriesId { get; set; }
        public int BillSlNo { get; set; }
        public int UserId { get; set; }
        public int DeptId { get; set; }
        public int LTDeptId { get; set; }
        public string CustName { get; set; }
        public string SalesMan { get; set; }
        public string UserName { get; set; }
        public string DriverName { get; set; }
        public string UnitName { get; set; }
        public string LocationName { get; set; }
        public int DriverId { get; set; }

        public string ItemDescription { get; set; }
        public int TempUser { get; set; }
        public int Flag { get; set; }
        public int TypeFlag { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        DStockTransfer oDStockTransfer = new DStockTransfer();

        public DataSet PackingHistoryInsert(DataTable dt, string dbName)
        {
            return oDStockTransfer.PackingHistoryInsert(dt, dbName);
        }
        public DataSet PackingHistoryTemporarySave(DataTable dt, string dbName)
        {
            return oDStockTransfer.PackingHistoryTemporarySave(dt, dbName);
        }
        public DataSet PackingNumberSearch(PackingHistoryModel oPackingHistoryModel, string dbName)
        {
            return oDStockTransfer.PackingNumberSearch(oPackingHistoryModel, dbName);
        }
        public DataSet DriverGetandGets(PackingHistoryModel oPackingHistoryModel, string dbName)
        {
            return oDStockTransfer.DriverGetandGets(oPackingHistoryModel, dbName);
        }
        public DataSet PackingDetailsGet(PackingHistoryModel oPackingHistoryModel, string dbName)
        {
            return oDStockTransfer.PackingDetailsGet(oPackingHistoryModel, dbName);
        }
        public DataSet PreviousPackingDeatilsshow(PackingHistoryModel oPackingHistoryModel, string dbName)
        {
            return oDStockTransfer.PreviousPackingDeatilsshow(oPackingHistoryModel, dbName);
        }
        
    }
}