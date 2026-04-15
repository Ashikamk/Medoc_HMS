using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class BillofQuantityModel
    {
        public long BOQNoId { get; set; }
        public long BOQSlNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string BOQDate { get; set; }
        public string ExpDate { get; set; }
        public long JobCodeId { get; set; }
        public string JobCode { get; set; }
        public string JobDescription { get; set; }
        public string LPO { get; set; }
        public decimal EstAmount { get; set; }
        public long CustId { get; set; }
        public string Customer { get; set; }
        public long CurrencyId { get; set; }
        public string FC { get; set; }
        public decimal CurrencyRate { get; set; }
        public string Comments { get; set; }
        public string Engineer { get; set; }
        public long EngineerId { get; set; }
        public string UserName { get; set; }
        public string Department { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public long ProductId { get; set; }
        public string Product { get; set; }
        public string Description { get; set; }
        public long UnitId { get; set; }
        public string Unit { get; set; }
        public long Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal Cost { get; set; }
        public decimal Margin { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal GrandTotal { get; set; }
        public string ResourceId { get; set; }
        public string Resource { get; set; }
        public string Remarks { get; set; }
        public string Location { get; set; }
        public string LocationCode { get; set; }
        public int DelFlag { get; set; }
        public int Flag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }


        public string CreditAccId { get; set; }
        public string CreditAccount { get; set; }
        public string CreditAccountDesc { get; set; }
        public string DebitAccId { get; set; }
        public string DebitAccount { get; set; }
        public string DebitAccountDesc { get; set; }


        public string MINo { get; set; }
        public string MIDate { get; set; }
        public string CostCodeId { get; set; }
        public string CostCode { get; set; }
        public string MIMainId { get; set; }
        public string MISubId { get; set; }
        public string Stock { get; set; }
        public string ProductCode { get; set; }
        public string MRNo { get; set; }
        public string MRDate { get; set; }
        public string JobNo { get; set; }
        public string Requested { get; set; }
        public string Approved { get; set; }
        public string IssueStatus { get; set; }
        public string Type { get; set; }
        public string JobGroup { get; set; }
        public string Salesman { get; set; }
        public string InvNo { get; set; }
        public decimal Income { get; set; }

        public decimal Profit { get; set; }
        public decimal ProfitPercentage { get; set; }

        public string Created { get; set; }
        public string Pending { get; set; }

        DProjectandJob oDProjectandJob = new DProjectandJob();
        public DataSet BillofQuantityInsertandUpdate(DataTable dt, string dbName)
        {
            return oDProjectandJob.BillofQuantityInsertandUpdate(dt, dbName);
        }
        public DataSet BillofQuantityUpdate(DataTable dt, string dbName)
        {
            return oDProjectandJob.BillofQuantityUpdate(dt, dbName);
        }
        public DataSet BillofQuantityGetandGets(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.BillofQuantityGetandGets(oBillofQuantityModel, dbName);
        }

        public DataSet BOQNoSearch(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.BOQNoSearch(oBillofQuantityModel, dbName);
        }

        public DataSet BOQDelete(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.BOQDelete(oBillofQuantityModel, dbName);
        }

        public DataSet MaterialIssueAccountGet(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.MaterialIssueAccountGet(oBillofQuantityModel, dbName);
        }
        public DataSet MaterialIssueInsert(DataTable dt, string dbName)
        {
            return oDProjectandJob.MaterialIssueInsert(dt, dbName);
        }

        public DataSet MaterialIssueUpdate(DataTable dt, string dbName)
        {
            return oDProjectandJob.MaterialIssueUpdate(dt, dbName);
        }
        public DataSet MaterialIssueSearch(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.MaterialIssueSearch(oBillofQuantityModel, dbName);
        }

        public DataSet MaterialIssueGetandGets(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.MaterialIssueGetandGets(oBillofQuantityModel, dbName);
        }
        public DataSet MaterialIssueDelete(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.MaterialIssueDelete(oBillofQuantityModel, dbName);
        }

        public DataSet MRApprovalAutocomplete(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.MRApprovalAutocomplete(oBillofQuantityModel, dbName);
        }
        public DataSet MIList(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.MIList(oBillofQuantityModel, dbName);
        }
        public DataSet BOQList(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.BOQList(oBillofQuantityModel, dbName);
        }
        public DataSet ProjectAnalysis(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.ProjectAnalysis(oBillofQuantityModel, dbName);
        }
        public DataSet ProjectJobDashboard(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.ProjectJobDashboard(oBillofQuantityModel, dbName);
        }
        
             public DataSet ProjectJobDasboardWidgets(BillofQuantityModel oBillofQuantityModel, string dbName)
        {
            return oDProjectandJob.ProjectJobDasboardWidgets(oBillofQuantityModel, dbName);
        }
    }
}