using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models

{
    public class LocationTransferModel
    {

        public string ChasisNumber { get; set; }
        public string ContainerNumber { get; set; }
        public string Description { get; set; }
        public long LocTransId { get; set; }      
        public string ItemKey { get; set; } 
        public string LoadFrom { get; set; }
        public string LoadTo { get; set; }
        public int FromLoad { get; set; }
        public int ToLoad { get; set; } 
        public long ItemId { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public string Date { get; set; }
        public int DelFlag { get; set; }
        public int Flag { get; set; }
        public string Remarks { get; set; } 
        public string Status { get; set; }
        public string Message { get; set; }
        public string UserName { get; set; }
        public string ItemCode { get; set; }
        public string UnitName { get; set; }
        public string TransferDate { get; set; }
        public  int CheckFlag { get; set; }

        public DataSet LocationTransferGetandGets(LocationTransferModel oLocationTransferModel, string dbName)
        {
            return oDLocationTransfer.LocationTransferGetandGets(oLocationTransferModel, dbName);
        }

        DLocationTransfer oDLocationTransfer = new DLocationTransfer();
        public DataSet LocationTransferInsertandUpdate(LocationTransferModel oLocationTransferModel, string dbName)
        {
            return oDLocationTransfer.LocationTransferInsertandUpdate(oLocationTransferModel, dbName);
           
        }
        public DataSet TransferItem(LocationTransferModel oLocationTransferModel, string dbName) 
        {
            return oDLocationTransfer.TransferItem(oLocationTransferModel, dbName);

        }
       
        public DataSet EditItem(LocationTransferModel oLocationTransferModel, string dbName)
        {
            return oDLocationTransfer.EditItem(oLocationTransferModel, dbName);

        }
        
        public DataSet TransferALLItemUC(LocationTransferModel oLocationTransferModel, string dbName)
        {
            return oDLocationTransfer.TransferALLItemUC(oLocationTransferModel, dbName);

        }
        
        public DataSet ContainerLocationTransfer(DataTable dt, string dbName)
        {
            return oDLocationTransfer.ContainerLocationTransfer(dt, dbName);
        }
        public DataSet DeleteLocnTransfer(LocationTransferModel oLocationTransferModel, string dbName)
        {
            return oDLocationTransfer.DeleteLocnTransfer(oLocationTransferModel, dbName);

        }
        public DataSet ChassisNumberSearch(LocationTransferModel oLocationTransferModel, string dbName)
        {
            return oDLocationTransfer.ChassisNumberSearch(oLocationTransferModel, dbName);
        }
        public DataSet TranferContainerSearch(LocationTransferModel LocationTransferModel, string dbName)
        {
            return oDLocationTransfer.TranferContainerSearch(LocationTransferModel, dbName);
        }
        
    }
}