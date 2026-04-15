using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class TenantMaster
    {
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public long BuildingManagementId { get; set; }
        public string FlatName { get; set; }
        public string Premise { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long FlatNo { get; set; }
        public string Curdate { get; set; }
        public long TenantId { get; set; }
        public long AccountType { get; set; }
        public string CustType { get; set; }
        public string TenantAccount { get; set; }
        public string TenantName { get; set; }
        public long TenantTermsId { get; set; }
        public string TenantAdr1 { get; set; }
        public string TenantAdr2 { get; set; }
        public string TenantAdr3 { get; set; }
        public string TenantPin1 { get; set; }
        public long TenantArea { get; set; }
        public string Area { get; set; }
        public string Term { get; set; }
        public long TenantCountry { get; set; }
        public string Country { get; set; }
        public string TenantPhone { get; set; }
        public string TenantEmail { get; set; }
        public string TenantContactName1 { get; set; }
        public string TenantContactNo1 { get; set; }
        public string Email { get; set; }
        public string TenantContactName2 { get; set; }
        public string TenantContactNo2 { get; set; }
        public string TenantContactName3 { get; set; }
        public string TenantContactNo3 { get; set; }
        public string TenantNotes { get; set; }

        public string TenantPass { get; set; }
        public string TenantEmr { get; set; }
        public string TenantBank { get; set; }
        public string TenantVisa { get; set; }
        public string TenantExp { get; set; }
        public string TenantComent { get; set; }


       
        public long CustStatusId { get; set; }
        public string CustStatus { get; set; }
      



        public long PremiseId { get; set; }

        public string PremiseCode { get; set; }
        public string PremiseDescription { get; set; }
        public string PremiseRemarks { get; set; }



        public string MapId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
       // public long cstyp { get; set; }
   
        

       // DMasters oDMasters = new DMasters();
        DRealestate oDMasters = new DRealestate();
        DBuilding oDBuilding = new DBuilding();
        public DataSet Rpt_TenantVilla(TenantMaster TenantMaster, string dbName)
        {
            return oDMasters.Rpt_TenantVilla(TenantMaster, dbName);
        }
        public DataSet PremiseGetandGets(TenantMaster TenantMaster, string dbName)
        {
            return oDMasters.PremiseGetandGets(TenantMaster, dbName);
        }

        public DataSet TenantInsertandUpdate(TenantMaster oCustomerMaster, string dbName)
        {
            return oDMasters.TenantInsertandUpdate(oCustomerMaster, dbName);
        }
        public DataSet TenantGetandGets(TenantMaster oCustomerMaster, string dbName)
        {
            return oDMasters.TenantGetandGets(oCustomerMaster, dbName);
        }
        public DataSet TenantSearch(TenantMaster oTenantMaster, string dbName)
        {
            return oDBuilding.TenantSearch(oTenantMaster, dbName);
        }
        public DataSet PremiseInsertandUpdate(TenantMaster TenantMaster, string dbName)
        {
            return oDMasters.PremiseInsertandUpdate(TenantMaster, dbName);
        }
    }
}