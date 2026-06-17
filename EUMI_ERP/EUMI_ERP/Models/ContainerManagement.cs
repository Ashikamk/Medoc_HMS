using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
using EUMI_ERP.DataLayer; 

namespace EUMI_ERP.Models
{
    public class ContainerManagement
    {
        public long ContainerManagementId { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string Photo { get; set; }
        public string ContainerNumber   { get; set; }
        public string BookingNumber { get; set; }
        public string Lines { get; set; }
        public string Size { get; set; }      
        public string PointOfLoading { get; set; }
        public string Port { get; set; }
        public string LoadDate { get; set; }
        public string ExpectArrivalDate { get; set; }
        public string ReleaseDate { get; set; }
        public string ContArrivalDate { get; set; } 
        public string Invoice { get; set; }
        public decimal InvoiceAmount { get; set; }
        public string InvoiceAmnt { get; set; }
        public string PaidAmnt { get; set; }
        public decimal PaidAmount { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public int ContainerSlno { get; set; }
        public string ContainerBillNo { get; set; }
        public string ContainerDate { get; set; }
        public string Reference { get; set; }
        public int DeptId { get; set; }
        public int UId { get; set; }
        public int Count { get; set; }
        public string Location { get; set; }

        public string ProfitPer { get; set; }

        public string ItemId { get; set; }
        public string Price { get; set; }
        public string ChasisNo { get; set; }
        public string Make { get; set; }
        public string Made { get; set; }
        public string Model { get; set; }
        public string Colour { get; set; }
        public string LotNumber { get; set; }

        public string FromDate { get; set; }
        public string Todate { get; set; }
        public string Supplier { get; set; }
        public string ItemSold { get; set; }

        public string InvoDate { get; set; }
        public string AvgCost { get; set; }
        public string BuyerNo { get; set; }
        public string Stock { get; set; }
        public string Quantity { get; set; }

        DLocationTransfer oDLocationTransfer = new DLocationTransfer();
        public DataSet ContainerList(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.ContainerList(oContainerManagement, dbName);   
        }
        public DataSet ContainerNumberSearch(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.ContainerNumberSearch(oContainerManagement, dbName);
        }
        public DataSet ContainerSearch(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.ContainerSearch(oContainerManagement, dbName);
        }        
        public DataSet ContainerImportInsertandUpdate(DataTable dt, string dbName)
        {
            return oDLocationTransfer.ContainerImportInsertandUpdate(dt, dbName);  
        }
        public DataSet AutoLocTransferUtilityForUC(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.AutoLocTransferUtilityForUC(oContainerManagement, dbName);
        }
        
        public DataSet ArrivingContainersGets(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.ArrivingContainersGets(oContainerManagement, dbName); 
        }
        public DataSet TopSelling(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.TopSelling(oContainerManagement, dbName);
        }
        public DataSet OnPortItemGetandGets(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.OnPortItemGetandGets(oContainerManagement, dbName);
        }
        public DataSet ContainersListGets(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.ContainersListGets(oContainerManagement, dbName);
        }
        public DataSet ContainerDeatailsGets(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.ContainerDeatailsGets(oContainerManagement, dbName);
        }
        public DataSet LoadingCarsGet(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.LoadingCarsGet(oContainerManagement, dbName);
        }

        public DataSet ContainerReport(ContainerManagement oContainerManagement, string dbName)
        {
            return oDLocationTransfer.ContainerReport(oContainerManagement, dbName);
        }

    }
}













    
    
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
