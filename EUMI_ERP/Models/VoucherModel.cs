using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class VoucherModel
    {
        public string RVFolder = "ReceiptVoucher";
        public string PVFolder = "PaymentVoucher";
        public string JVFolder = "JournelVoucher";
        public string PCFolder = "PettyCashVoucher";
        public string CVFolder = "ContraVoucher";
        public string AVFolder = "AdjustmentVoucher";
        public string TVFolder = "TransferVoucher";
        public string CNFolder = "CreditNoteVoucher";
        public string DNFolder = "DebitNoteVoucher";
        public string BPVFolder = "BPVoucher";
        public string BRVFolder = "BRVoucher";
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
        public string TxnType { get; set; }
        public string Advance { get; set; }
        public decimal AdvanceAmount { get; set; }
        public string ChequeNo { get; set; }
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
        public string Date { get; set; }
        public int Flag { get; set; }
        public string Bank { get; set; }
       
        public int VAdvId { get; set; }
        public decimal RecAmountAdv { get; set; }
        public decimal BalAmountAdv { get; set; }
        public string InvNoPend { get; set; }
        public decimal RecAmountPend { get; set; }
        public decimal BalAmountPend { get; set; }
        public string VDescPend { get; set; }
        public string BillSerNoPend { get; set; }
        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public long  FileId { get; set; }
        public string Customer { get; set; }
        public string VoucherType { get; set; }
       
        public string costcenter { get; set; }
        public string ProjectJob { get; set; }
        public decimal BaseAmt { get; set; }
        public decimal FCBaseAmt { get; set; }

        public decimal RecAmnt { get; set; }
        public decimal BalAmnt { get; set; }
        public decimal FCRecAmnt { get; set; }
        public decimal FCBalAmnt { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }

        DAccounts oDAccounts = new DAccounts();

        public DataSet RVFileInsert(VoucherModel VoucherModel, string dbName)
        {
            return oDAccounts.RVFileInsert(VoucherModel, dbName);
        }
        public DataSet RVFileGets(VoucherModel VoucherModel, string dbName)
        {
            return oDAccounts.RVFileGets(VoucherModel, dbName);
        }
        public DataSet RVFileDelete(VoucherModel VoucherModel, string dbName)
        {
            return oDAccounts.RVFileDelete(VoucherModel, dbName);
        }
        public DataSet VoucherGetandGets(VoucherModel oVoucherModel, string dbName)
        {
            return oDAccounts.VoucherGetandGets(oVoucherModel, dbName);
        }
        public DataSet ReceiptVoucherTableInsert(DataTable dt, string dbName)
        {
            return oDAccounts.ReceiptVoucherTableInsert(dt, dbName);
        }
             
        public DataSet AdvanceSettlement(VoucherModel oVoucherModel, string dbName)
        {
            return oDAccounts.AdvanceSettlement(oVoucherModel, dbName);
        }
        public DataSet AccountNumberSearchCust(VoucherModel oVoucherModel, string dbName)
        {
            return oDAccounts.AccountNumberSearchCust(oVoucherModel, dbName);
        }

        public DataSet ReceiptVoucherGetandGets(VoucherModel oVoucherModel, string dbName)
        {
            return oDAccounts.ReceiptVoucherGetandGets(oVoucherModel, dbName);
        }

        public DataSet PaymentVoucherGetandGets(VoucherModel oVoucherModel, string dbName)
        {
            return oDAccounts.PaymentVoucherGetandGets(oVoucherModel, dbName);
        }
    }
}