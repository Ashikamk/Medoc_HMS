using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using EUME_ERP.Models;

namespace EUMI_ERP.Models
{
    public class PDCReceivedModel
    {
        public string CustSuppId { get; set; }
        public string CustType { get; set; }
        public long VoucherEntryId { get; set; }
        public int VoucherTypeId { get; set; }
        public string BillSerId { get; set; }
        public int CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal FCAmount { get; set; }
        public int ProjectJobId { get; set; }
        public string JobCode { get; set; }
        public int CostCenterId { get; set; }
        public string CostCenterCode { get; set; }
        public string Advance { get; set; }
        public decimal AdvanceAmount { get; set; }
        public int UserId { get; set; }
        public int DeptId { get; set; }
        public int DelFlag { get; set; }
        public string VType { get; set; }
        public int TransVoucherNo { get; set; }
        public string PDCStatus { get; set; }      
        public string AccCode { get; set; }
        public long AccId { get; set; }
        public long TranId { get; set; }
        
        public string AccDescription { get; set; }
        public string TranName { get; set; }
        public string TranCode { get; set; }


        public long VEId { get; set; }
        public long PDCAccountId { get; set; }
        public int ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public int BankId { get; set; }
        public string BankName { get; set; }
        public decimal BaseAmount { get; set; }
        public string VoucherTypePrefix { get; set; }
        public long VoucherNo { get; set; }
        public string VoucherDate { get; set; }
        public string Description { get; set; }
        public string RefNo { get; set; }
        public string TransferDate { get; set; }
        public string ChequeDtFrom { get; set; }
        public string ChequeDtTo { get; set; }
        public int RadFlag { get; set; }
        public int ChqNo { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }


        DAccounts oDAccounts = new DAccounts();
        public DataSet AccSearch(PDCReceivedModel oPDCReceivedModel, string dbName)
        {
            return oDAccounts.AccSearch(oPDCReceivedModel, dbName);
        }
        public DataSet EmpSearch(PDCReceivedModel oPDCReceivedModel, string dbName)
        {
            return oDAccounts.EmpSearch(oPDCReceivedModel, dbName);
        }

        public DataSet PDCGetandGets(PDCReceivedModel oPDCReceivedModel, string dbName)
        {
            return oDAccounts.PDCGetandGets(oPDCReceivedModel, dbName);
        }

        public DataSet PDCReceivedInsert(DataTable dt, string dbName)
        {
            return oDAccounts.PDCReceivedInsert(dt, dbName);
        }
        public DataSet VoucherNosearchModified(PDCReceivedModel oPDCReceivedModel, string dbName)
        {

            return oDAccounts.VoucherNosearchModified(oPDCReceivedModel, dbName);
        }
    }    
}