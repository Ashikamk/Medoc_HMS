using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class ToolsManagementModel
    {
        public int Balance { get; set; }
        public int ToolQty { get; set; }
        public string Desc{ get; set; }
         public string EmpCode { get; set; }
        public string JobCodes { get; set; }
        public string IssueName { get; set; }
        public string CustodianName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Status { get; set; }
        public long ToolsManagementId { get; set; }
        public long VocNo { get; set; }
        public string Date { get; set; }
        public long IssuedById { get; set; }
        public long CustodianId { get; set; }
        public long JobCodeId { get; set; }
        public string ExpDate { get; set; }
        public string MainRemarks { get; set; }
        public string Comments { get; set; }
        public int TotPcs { get; set; }
        public int TotQty { get; set; }
        public string ManagementType { get; set; }
        public long ToolId { get; set; }
        public string ToolCode { get; set; }
        public string ToolDesc { get; set; }
        public int Pcs { get; set; }
        public string SerialNo { get; set; }
        public int Quantity { get; set; }
        public int IssuedQty { get; set; }
        public string SubRemarks { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public int DelFlag { get; set; }

        DProjectandJob oDProjectandJob = new DProjectandJob();
        DInvReports oDInvReports = new DInvReports();
        public DataSet ToolsManagementInsert(DataTable dt, string dbName)
        {
            return oDProjectandJob.ToolsManagementInsert(dt, dbName);
        }
        public DataSet ToolManagementUpdate(DataTable dt, string dbName)
        {
            return oDProjectandJob.ToolManagementUpdate(dt, dbName);
        }
        public DataSet ToolsManagementList(ToolsManagementModel ToolsManagementModel, string dbName)
        {
            return oDProjectandJob.ToolsManagementList(ToolsManagementModel, dbName);
        }

        public DataSet ToolManagementGetandGets(ToolsManagementModel ToolsManagementModel, string dbName)
        {
            return oDProjectandJob.ToolManagementGetandGets(ToolsManagementModel, dbName);
        }
        public DataSet TMNoSearch(ToolsManagementModel ToolsManagementModel, string dbName)
        {
            return oDProjectandJob.TMNoSearch(ToolsManagementModel, dbName);
        }
        public DataSet ToolManagementDelete(ToolsManagementModel ToolsManagementModel, string dbName)
        {
            return oDProjectandJob.ToolManagementDelete(ToolsManagementModel, dbName);
        }
        public DataSet Rpt_ToolsTransactionReport(ToolsManagementModel ToolsManagementModel, string dbName)
        {
            return oDInvReports.Rpt_ToolsTransactionReport(ToolsManagementModel, dbName);
        }
    }
}