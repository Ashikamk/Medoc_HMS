using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Sql;

namespace EUMI_ERP.Models
{
    public class Contract
    {
        public string PDCStatus { get; set; }
        public long ConDocID { get; set; }
        public string FolderName { get; set; }
        public long ContractNo      { get; set; }
         public string ContDate        { get; set; }
         public string FlatNo 		    { get; set; }
        public string IdType { get; set; }
        public long DocTypeId { get; set; }
        public string FlatNumber { get; set; } 
         public string DEWANo 		    { get; set; }
         public long Premise 		{ get; set; }
         public string NameofBuilding { get; set; }
         public string Subject 		{ get; set; }
         public decimal Rent 			{ get; set; }
         public decimal Deposit 		{ get; set; }
         public long Tenant 		    { get; set; }
         public string TenantName { get; set; }
         public long ContPeriod      { get; set; }
         public string FromPeriod      { get; set; }
         public string ToPeriod        { get; set; }
         public long PaymentTerms    { get; set; }
         public string Observations    { get; set; }
         public string ContDocument    { get; set; }
         public decimal TotalChequeAmt  { get; set; }
         public decimal TotalOtherCost  { get; set; }
         public long ContMode        { get; set; }
         public string ChequeNo        { get; set; }
         public string ChequeDate      { get; set; }
         public long ContBank        { get; set; }
         public string ContBranch      { get; set; }
         public decimal Amount          { get; set; }
         public string Remarks         { get; set; }
         public long RentType        { get; set; }
         public string Account         { get; set; }
         public long DeptId 	        { get; set; }
         public long UserId 	        { get; set; }
         public string CurrentDate     { get; set; }
         public string Status 	        { get; set; } 
         public long Flag 		    { get; set; }
         public int DelFlag         { get; set; }
         public string DepartmentName { get; set; }
        public string TenantAddress1 { get; set; }
        public string TenantAddress2 { get; set; }
        public string TenantAddress3 { get; set; }
        public string TenantPOBOXNo { get; set; }
        public string TenantEmail { get; set; }
        public string TenantPhone { get; set; }
        public string TenantEMRID { get; set; }

        DBuilding oDBuilding = new DBuilding();
        public DataSet ContractEntryInsert(DataTable dt, string dbName)
        {
            return oDBuilding.ContractEntryInsert(dt, dbName); 
        }
        public DataSet ContractEntryGetandGets(Contract oContract, string dbName)
        {
            return oDBuilding.ContractEntryGetandGets(oContract, dbName);
        }
        public DataSet ContractMultipleDocDelete(Contract oContract, string dbName)
        {
            return oDBuilding.ContractMultipleDocDelete(oContract, dbName);
        }
        public DataSet ContractDocumentGetandGets(Contract oContract, string dbName)
        {
            return oDBuilding.ContractDocumentGetandGets(oContract, dbName);  
        }
        public DataSet ContractNoSearch(Contract oContract, string dbName)
        {
            return oDBuilding.ContractNoSearch(oContract, dbName);  
        }
        public DataSet ContractEntryUpdate(DataTable dt, string dbName)
        {
            return oDBuilding.ContractEntryUpdate(dt, dbName); 
        }
        public DataSet ContractEntryDelete(Contract oContract, string dbName)
        {
            return oDBuilding.ContractEntryDelete(oContract, dbName);
        } 
    }
}