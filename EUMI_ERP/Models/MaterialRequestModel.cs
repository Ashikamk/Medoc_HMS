using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class MaterialRequestModel
    {
        public int PEFlag { get; set; }
        public int RequestedById { get; set; }
        public int DelFlag { get; set; }
        public int Flag { get; set; }       
        public long MRMainId { get; set; }
        public long MRSubId { get; set; }
        public long OrderNo { get; set; }
        public long SupplierId { get; set; }
        public long MRNo { get; set; }      
        public long DesignationId { get; set; }
        public long JobNo { get; set; }
        public long ItemId { get; set; }
        public long UnitId { get; set; }
        public string Unit { get; set; }
        public long BOQQty { get; set; }
        public decimal IssuedQty { get; set; }
        public long BalanceQty { get; set; }
        public long Quantity { get; set; }
        public long ResourceId { get; set; }
        public long RequestFlag { get; set; }
        public long BOQNo { get; set; }
        public long BOQSubId { get; set; }
        public long UserId { get; set; }
        
        public long DeptId { get; set; }
        public long ApprovedBy { get; set; }
        public decimal Price { get; set; }
        public decimal Cost { get; set; }
        public decimal LPCost { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal BOQAmt { get; set; }
        public decimal EstAmount { get; set; }
        public string Status { get; set; }
        public string MRDate { get; set; }
        public string RequestedBy { get; set; }
        public string Designation { get; set; }
        public string Attn { get; set; }
        public string Subject { get; set; }
        public string OfficeFileNo { get; set; }
        public string Urgency { get; set; }
        public string JobCode { get; set; }
        public string JobDescription { get; set; }
        public string Purpose { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescription { get; set; }
        public string ResourceCode { get; set; }
        public string UserName { get; set; }
        public string DeptName { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public string ApprovedDate { get; set; }
        public string ApprovedByUser { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string BOQ { get; set; }
        public string MINo { get; set; }
        public string PEQty { get; set; }
        public string OrderDate { get; set; }
        public string Supplier { get; set; }
        public string TaxId { get; set; }
        public string Tax { get; set; }

        DMaterialRequest DMaterialRequest = new DMaterialRequest();
        public DataSet MRProductSearch(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.MRProductSearch(MaterialRequestModel, dbName);
        }
        public DataSet MaterialRequestInsert(DataTable dt, string dbName)
        {
            return DMaterialRequest.MaterialRequestInsert(dt, dbName);
        }
        public DataSet MaterialRequestUpdate(DataTable dt, string dbName)
        {
            return DMaterialRequest.MaterialRequestUpdate(dt, dbName);
        }
        public DataSet MaterialRequestGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.MaterialRequestGets(MaterialRequestModel, dbName);
        }
        public DataSet MaterialRequestGetandGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.MaterialRequestGetandGets(MaterialRequestModel, dbName);
        }
        public DataSet MaterialRequestDelete(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.MaterialRequestDelete(MaterialRequestModel, dbName);
        }
        public DataSet MaterialRequestBOQGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.MaterialRequestBOQGets(MaterialRequestModel, dbName);
        }
        public DataSet MaterialRequetApprovalGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.MaterialRequetApprovalGets(MaterialRequestModel, dbName);
        }
        public DataSet MaterialRequetApproval(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.MaterialRequetApproval(MaterialRequestModel, dbName);
        }
        public DataSet PurchaseOrderApproval(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.PurchaseOrderApproval(MaterialRequestModel, dbName);
        }
        
        public DataSet MRIssueDetails(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.MRIssueDetails(MaterialRequestModel, dbName);
        }
        public DataSet PurchaseOrderApprovalGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            return DMaterialRequest.PurchaseOrderApprovalGets(MaterialRequestModel, dbName);
        }

    }
}