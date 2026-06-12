using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PettyCashModel
    {
        public long VoucherEntryId { get; set; }
        public long VoucherNo { get; set; }
        public int VoucherTypeId { get; set; }
        public string VoucherDate { get; set; }
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public int AccountTypeId { get; set; }
        public string CustType { get; set; }
        public long AccTypeCode { get; set; }
        public string AccountTypeName { get; set; }
        public long AccCode { get; set; }
        public string ReferenceNo { get; set; }
        public string VoucherEntryDescription { get; set; }
        public decimal Amount { get; set; }
        public string BillSerId { get; set; }
        public int CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal FCAmount { get; set; }
        public int ProjectJobId { get; set; }
        public string JobCode { get; set; }
        public int CostCenterId { get; set; }
        public string CostCenterCode { get; set; }
        public int BankId { get; set; }
        public string BankName { get; set; }
        public string Advance { get; set; }
        public decimal AdvanceAmount { get; set; }
        public int ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public int UserId { get; set; }
        public int DeptId { get; set; }
        public int DelFlag { get; set; }
        public string VoucherTypePrefix { get; set; }
        public string VType { get; set; }
        public int TransVoucherNo { get; set; }
        public int PDCAccountId { get; set; }
        public string PDCStatus { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        DAccounts oDAccounts = new DAccounts();

        public DataSet PettyCashTableInsert(DataTable dt, string dbName)
        {
            return oDAccounts.PettyCashTableInsert(dt, dbName);
        }
    }
}