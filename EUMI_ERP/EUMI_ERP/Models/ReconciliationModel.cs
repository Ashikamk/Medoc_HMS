using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ReconciliationModel
    {
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
        public long AccCode { get; set; }
        public long AccId { get; set; }
        public string AccDescription { get; set; }

        public long VEId { get; set; }
        public long AccountId { get; set; }
        public long BankAccount { get; set; }

        public string ChequeNo { get; set; }
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
        public int filter { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public string VTId { get; set; }
        public decimal bal { get; set; }
        public decimal obal { get; set; }
        public string AccName { get; set; }
        public string BankDate { get; set; }
        public string Flag { get; set; }





        DAccounts oDAccounts = new DAccounts();

        public DataSet ReconciliationInsert(DataTable dt, string dbName)
        {
            return oDAccounts.ReconciliationInsert(dt, dbName);
        }


        public DataSet AccountbalGetandGets(ReconciliationModel oPDCReceivedModel, string dbName)
        {
            return oDAccounts.AccountbalGetandGets(oPDCReceivedModel, dbName);
        }
        public DataSet ReconciliationGetandGets(ReconciliationModel oPDCReceivedModel, string dbName)
        {
            return oDAccounts.ReconciliationGetandGets(oPDCReceivedModel, dbName);
        }
        public DataSet BankbalGetandGets(ReconciliationModel oPDCReceivedModel, string dbName)
        {
            return oDAccounts.BankbalGetandGets(oPDCReceivedModel, dbName);
        }
        public DataSet ReconciliationlistandGets(ReconciliationModel oPDCReceivedModel, string dbName)
        {
            return oDAccounts.ReconciliationlistandGets(oPDCReceivedModel, dbName);
        }
    }
}