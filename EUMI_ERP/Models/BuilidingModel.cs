using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
using EUMI_ERP.DataLayer;


namespace EUMI_ERP.Models
{
    public class BuilidingModel
    {
        public string NameofBuilding { get; set; }
        public string PlotNo { get; set; }
        public string City { get; set; }
        public string LandLord { get; set; }
        public string TypeofBuilding { get; set; }
        public string Remarks { get; set; }
        public string Features { get; set; }
        public string Facilities { get; set; }
     
        public string FlatName { get; set; }
        public string AreaName { get; set; }
        public string Code { get; set; }
        public string FlatType { get; set; }
        public string Details { get; set; }
        public string Lan_Name { get; set; }
        public string Lan_Nationality { get; set; }
        public string Lan_Profession { get; set; }
        public string Lan_Pobox { get; set; }
        public string Lan_Tel { get; set; }
        public string Lan_Email { get; set; }
        public string Lan_Fno { get; set; }
        public string Lan_Mob { get; set; }
        public string Lan_Ad1 { get; set; }
        public string Lan_Ad2 { get; set; }
        public string Lan_Ad3 { get; set; }
        public string BuildingFeature { get; set; }
        public string BuildingId { get; set; } 
        public long BuildingManagementId { get; set; }
        public long FlatTypeId { get; set; }
        public long Lan_Id { get; set; }
        public long Id { get; set; }

        public long AreaGrpId { get; set; }
        public long AreaId { get; set; }
        //public long Fe_Id { get; set; }
        //public long FlatId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        DBuilding oDBuilding = new DBuilding();


        //public DataSet BuildingFeaturesGetandGets(BuilidingModel oBuilidingModel, string dbName)
        //{
        //    return oDBuilding.BuildingFeaturesGetandGets(oBuilidingModel, dbName);
        //}
        public DataSet FlatTypesGetandGets(BuilidingModel oBuilidingModel, string dbName)
        {
            return oDBuilding.FlatTypesGetandGets(oBuilidingModel, dbName);
        }
     
        public DataSet BuildingManagementInsertandUpdate(BuilidingModel oBuilidingModel, string dbName)
        {
            return oDBuilding.BuildingManagementInsertandUpdate(oBuilidingModel, dbName);
        }
        public DataSet BuildingManagementGetandGets(BuilidingModel oBuilidingModel, string dbName)
        {
            return oDBuilding.BuildingManagementGetandGets(oBuilidingModel, dbName);
        }
        public DataSet AreaGetandGets(BuilidingModel oBuilidingModel, string dbName)
        {
            return oDBuilding.AreaGetandGets(oBuilidingModel, dbName);
        }
        public DataSet LandlordGetandGetss(BuilidingModel oBuilidingModel, string dbName)
        {
            return oDBuilding.LandlordGetandGetss(oBuilidingModel, dbName);
        }
        public DataSet Landlordsearch(BuilidingModel oBuilidingModel, string dbName)
        {
            return oDBuilding.Landlordsearch(oBuilidingModel, dbName);
        }
        public DataSet BuildGetandGets(BuilidingModel oBuilidingModel, string dbName)
        {
            return oDBuilding.BuildGetandGets(oBuilidingModel, dbName);
        }
    }

    
}