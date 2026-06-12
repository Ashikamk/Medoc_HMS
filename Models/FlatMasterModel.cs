using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class FlatMasterModel
    {
        public long PaymentTerms { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public long ContractStatus { get; set; }
        public string VaccantDate { get; set; }
        public string TenantName { get; set; }
        public decimal securityDeposit { get; set; }
        public string FlatName { get; set; }
        public string Period { get; set; }
        public string CurDate { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long buildingManagementId { get; set; }
        public string NameofBuilding { get; set; }
        public long FlatMasterId { get; set; }
        public string FlatNumber { get; set; }
        public string Building { get; set; }
        public string DEWANO { get; set; }
        public decimal Rent { get; set; }
        public string RentType { get; set; }
        public string LandLoard { get; set; }
        public string AgentName { get; set; }
        public string AgentContact { get; set; }
        public string TypeOfFlat { get; set; }
        public string Features { get; set; }
        public string Remarks { get; set; }
        public string DelFlag { get; set; }
        public string Status { get; set; }
        public long AgentId { get; set; } 
        public string LandLoardName { get; set; } 

        DBuilding oDBuilding = new DBuilding();

        public DataSet Rpt_FlatDetails(FlatMasterModel FlatMasterModel, string dbName)
        {
            return oDBuilding.Rpt_FlatDetails(FlatMasterModel, dbName);
        }
        public DataSet FlatMasterInsertandUpdate(FlatMasterModel oFlatMasterModel, string dbName)
        {
            return oDBuilding.FlatMasterInsertandUpdate(oFlatMasterModel, dbName);  
        }
        public DataSet FlatMasterGetandGets(FlatMasterModel oFlatMasterModel, string dbName)
        {
            return oDBuilding.FlatMasterGetandGets(oFlatMasterModel, dbName); 
        }
        public DataSet FlatNumberSearch(FlatMasterModel oFlatMasterModel, string dbName) 
        {
            return oDBuilding.FlatNumberSearch(oFlatMasterModel, dbName);  
        }
        public DataSet BuildingNumberSearch(FlatMasterModel oFlatMasterModel, string dbName)
        {
            return oDBuilding.BuildingNumberSearch(oFlatMasterModel, dbName);
        }
    }
}