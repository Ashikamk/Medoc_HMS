using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class LandModel
    {
        public long Lan_Id { get; set; }
        public string Nationality { get; set; }
        public string LandName { get; set; }
        public string Pobox { get; set; }
        public string Profession { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public string Faxno { get; set; }
        public string Mobno { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string CreatedDate { get; set; }


        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public string ContractNo { get; set; }
        public string Tenant { get; set; }
        public string Premise { get; set; }
        public string FlatNo { get; set; }
        public string Rent { get; set; }
        public string Period { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public string Amount { get; set; }
        public string Bank { get; set; }
        public string Remarks { get; set; }


        public string Installments { get; set; }
        public string Collected { get; set; }
        public string PDC { get; set; }

        public string BuildingId { get; set; }
        public string FlatId { get; set; }

        public string DEWANo { get; set; }
        public string FlatType { get; set; }
        public string Days { get; set; }

        DMasters oDMasters = new DMasters();
        DBuilding oDBuilding = new DBuilding();
        public DataSet LandlordGetandGetss(LandModel oBankModel, string dbName)
        {
            return oDMasters.LandlordGetandGetss(oBankModel, dbName);
        }
        public DataSet LandlordInsertandUpdates(LandModel oBankModel, string dbName)
        {
            return oDMasters.LandlordInsertandUpdates(oBankModel, dbName);
        }

        public DataSet LandLordsearch(LandModel oLandModel, string dbName) 
        {
            return oDBuilding.LandLordsearch(oLandModel, dbName);   
        }
        public DataSet LandLordReportGets(LandModel oLandModel, string dbName)
        {
            return oDBuilding.LandLordReportGets(oLandModel, dbName);
        }
        public DataSet TenantDetailswithPDCGets(LandModel oLandModel, string dbName)
        {
            return oDBuilding.TenantDetailswithPDCGets(oLandModel, dbName);
        }
        public DataSet LeaseContractDetailsGets(LandModel oLandModel, string dbName)
        {
            return oDBuilding.LeaseContractDetailsGets(oLandModel, dbName);
        }
        public DataSet DeferredIncomeStmntGets(LandModel oLandModel, string dbName)
        {
            return oDBuilding.DeferredIncomeStmntGets(oLandModel, dbName);
        }
    }
}