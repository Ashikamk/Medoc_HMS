using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class EmployeeModel
    {
     
        public string EmployeeFolder = "Employee";
        public int StatusFlag { get; set; }
        public string Extension { get; set; }
        public long EmployeeDocumentId { get; set; }
        public string DocumentTypeName { get; set; }
        public string EmpCode { get; set; }
        public int EmpId { get; set; }
        public string FolderName { get; set; }
        public string Name { get; set; }
        public string CompanyId { get; set; }
        public string DepartmentId { get; set; }
        public string LocationId { get; set; }
        public string DesignationId { get; set; }
        public string DepartmentName { get; set; }
        public string DesignationCode { get; set; }
        public string DateofJoin { get; set; }
        public string BloodGroup { get; set; }
        public string Email { get; set; }
        public string Manager { get; set; }
        public string Mobile { get; set; }
        public int WorkingHoursId { get; set; }
        public string Others { get; set; }
        public bool IsActive { get; set; }
        public string Gender { get; set; }
        public string DOB { get; set; }
        public string PCAddress1 { get; set; }
        public string PCAddress2 { get; set; }
        public string PCAddress3 { get; set; }
        public string PCCountry { get; set; }
        public string PCEmail { get; set; }
        public string PCMobile { get; set; }
        public string LCAddress1 { get; set; }
        public string LCAddress2 { get; set; }
        public string LCAddress3 { get; set; }
        public string LCCountry { get; set; }
        public string LCEmail { get; set; }
        public string LCMobile { get; set; }
        public string PassportId { get; set; }
        public string NationalId { get; set; }
        public string LabourNo { get; set; }    
        public string InsuranceCompanyId { get; set; }
        public string VISANo { get; set; }
        public string DLNo { get; set; }
        public string ContractTypeId { get; set; }
        public string ContractType { get; set; }
        public string FileNo { get; set; }
        public string Nationality { get; set;}
        public int DelFlag { get; set; }      
        public string Status { get; set; }
        public string PassportNo { get; set; }
        public string Expiry { get; set; }
        public string IssuedOn { get; set; }
        public string Remarks { get; set; }
        public string Type { get; set; }
        public string Country { get; set; }
        public string WorkingHours { get; set; }
        public string Description { get; set; }
        public int Empflg { get; set; }  
        public string PayRollType { get; set; }
        public int SalaryAccount { get; set; }
        public int AdvanceAccount { get; set; }
        public string BankAccount { get; set; }
        public string BankAccountName { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal DA { get; set; }
        public decimal TA { get; set; }
        public decimal NightAlowance { get; set; }
        public decimal EarningOthers { get; set; }
        public decimal TotalEarnings { get; set; }
        public decimal PF { get; set; }
        public decimal Tax { get; set; }
        public decimal HRA { get; set; }
        public decimal ESI { get; set; }
        public decimal Otherdeductions { get; set; }
        public decimal TotalDeductions { get; set; }
        public decimal TotalNetSalary { get; set; }
        public decimal VisaExpense { get; set; }
        public decimal SalaryAdvance { get; set; }
        public decimal OTRate { get; set; }
        public decimal OTSRate { get; set; }
       public string SalaryAccountCode { get; set; }
        public string IncrementFrom { get; set; }
        public string IncrementType { get; set; }
        public decimal IncrementAmount { get; set; }
        public string AdvanceAccountCode { get; set; }
        public int IncrementId { get; set; }
        public int Flag { get; set; }
        public int DeptId { get; set; }
        public int UId { get; set; }
        public string EmployeeUser { get; set; }
        public string EmployeeUserName { get; set; }
        public string DocumentName { get; set; }
        public long DocumentType { get; set; }
        public string CountryName { get; set; }
        public string MangerName { get; set; }
        public string InsuranceCompanyName { get; set; }
        public string CPCountryName { get; set; }
        public string CLCountryName { get; set; }
        public string DesignationDescription { get; set; }
        DMasters oDMasters = new DMasters();


        public DataSet EmployeeGetandGets(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.EmployeeGetandGets(oEmployeeModel, dbName);
        }
        public DataSet EmployeeDocumentsView(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.EmployeeDocumentsView(oEmployeeModel, dbName);
        }
        public DataSet DriverGetandGets(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.DriverGetandGets(oEmployeeModel, dbName); 
        }
        
        public DataSet EmployeeDocumentGetandGets(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.EmployeeDocumentGetandGets(oEmployeeModel, dbName);
        }
        public DataSet EmployeeInsertandUpdate(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.EmployeeInsertandUpdate(oEmployeeModel, dbName);
        }
        public DataSet EmployeeDocumentDelete(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.EmployeeDocumentDelete(oEmployeeModel, dbName);
        }
        public DataSet EmployeeFileInsert(EmployeeModel EmployeeModel, string dbName)
        {
            return oDMasters.EmployeeFileInsert(EmployeeModel, dbName);
        }
        public DataSet EmployeeSearch(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.EmployeeSearch(oEmployeeModel, dbName);
        }
        public DataSet EmpAutoComplete(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.EmpAutoComplete(oEmployeeModel, dbName);
        }

        public DataSet WorkingHoursGetandGets(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.WorkingHoursGetandGets(oEmployeeModel, dbName);
        }
        public DataSet IncrementGetandGets(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.IncrementGetandGets(oEmployeeModel, dbName);
        }
        
        public DataSet WorkingHoursInsertandUpdate(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.WorkingHoursInsertandUpdate(oEmployeeModel, dbName);
        }
        public DataSet IncrementTypeInsertandUpdate(EmployeeModel oEmployeeModel, string dbName)
        {
            return oDMasters.IncrementTypeInsertandUpdate(oEmployeeModel, dbName);
        }
        
    }
}