using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class ProjectJobModel
    {
        public long ItemId { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public long  BOQQty { get; set; }
        public decimal BOQRate { get; set; }
        public string CurrDate { get; set; }
        public long ProjectJobId { get; set; }
        public long Designation { get; set; }

        public long SalarySettingId { get; set; }
        public string JobCode { get; set; }
        public string Description { get; set; }
        public int CustId { get; set; }
        public int EmpId { get; set; }
        public string CustName { get; set; }
        public decimal EstAmount { get; set; }
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string JobNature { get; set; }
        public string LPO { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string JobGroup { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string BOQ { get; set; }
        public string JobStatus { get; set; }
        public string JobDetails { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        public string RetensionAccount { get; set; }

        DMasters oDMasters = new DMasters();
        DEnquiry oDEnquiry = new DEnquiry(); 


        public DataSet ProjectJobGetandGets(ProjectJobModel oProjectJobModel, string dbName)
        {
            return oDMasters.ProjectJobGetandGets(oProjectJobModel, dbName);
        }


        public DataSet ProjectJobInsertandUpdate(ProjectJobModel oProjectJobModel, string dbName)
        {
            return oDMasters.ProjectJobInsertandUpdate(oProjectJobModel, dbName);
        }


        public DataSet JobSearch(ProjectJobModel oProjectJobModel, string dbName)
        {
            return oDMasters.JobSearch(oProjectJobModel, dbName); 
        }
        public DataSet AllotedJobSearch(ProjectJobModel oProjectJobModel, string dbName)
        {
            return oDMasters.AllotedJobSearch(oProjectJobModel, dbName);
        }
        public DataSet Relieving(ProjectJobModel oProjectJobModel, string dbName)
        {
            return oDMasters.Relieving(oProjectJobModel, dbName);
        }
        public DataSet JobCodeSearch(ProjectJobModel oProjectJobModel, string dbName)
        {
            return oDMasters.JobCodeSearch(oProjectJobModel, dbName);
        }
        public DataSet JobSearchSales(ProjectJobModel oProjectJobModel, string dbName)
        {
            return oDEnquiry.JobSearchSales(oProjectJobModel, dbName);  
        }
        public DataSet JobSearchPurchase(ProjectJobModel oProjectJobModel, string dbName)
        {
            return oDMasters.JobSearchPurchase(oProjectJobModel, dbName);
        }
        

    }
}