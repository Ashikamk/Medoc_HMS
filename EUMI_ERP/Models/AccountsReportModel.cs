using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class AccountsReportModel
    {
        public string SalesMan { get; set; }
        public string AccId { get; set; }
        public string CreditLimit { get; set; }
        public string PhoneNum { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Area { get; set; }
        public string CostCode { get; set; }
        public string Currency { get; set; }
        public string DueDays { get; set; }
        public string ContactName { get; set; }
        public string Status { get; set; }
        public string CreatedDate { get; set; }
        public string OpenBal { get; set; }
        public string Condition { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string VDate { get; set; }
        public string VTypePrefix { get; set; }
        public string VTypeId { get; set; }
        public string VType { get; set; }
        public string VNum { get; set; }
        public string VNo { get; set; }
        public string Credit { get; set; }
        public string Debit { get; set; }
        public string Balance { get; set; }
        public string AccountGroup { get; set; }
        public string AccountCode { get; set; }
        public string AccDesc { get; set; }
        public string VDesc { get; set; }
        public string DeptId { get; set; }
        public string BillSeriesId { get; set; }
        public string Amount { get; set; }
        public string FCAmount { get; set; }
        public string Opening { get; set; }
        public string Voucher { get; set; }
        public string ReferenceNo { get; set; }
        public string HFlag { get; set; }
        public string BaseAmount { get; set; }
        public string RecAmount { get; set; }
        public string UserId { get; set; }
        public string Date { get; set; }
        public string Prefix { get; set; }
        public string ThirtyDays { get; set; }
        public string SixtyDays { get; set; }
        public string NinetyDays { get; set; }
        public string OneTwentyDays { get; set; }
        public string AboveOneTwentyDays { get; set; }
        public string TaxAmount { get; set; }
        public int Summery { get; set; }
        public string CustType { get; set; }
        public string CustId { get; set; }
        public string CurrencyRate { get; set; }
        public string Days { get; set; }

        public string Var1 { get; set; }
        public string Var2 { get; set; }
        DAccntReport oDAccntReport = new DAccntReport();


        public DataSet AccountQuery(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.AccountQuery(oAccountsReportModel, dbName);
        }


        public DataSet TrialsBalanceSummeryGets(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.TrialsBalanceSummeryGets(oAccountsReportModel, dbName);
        }


        public DataSet AccountStatement(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.AccountStatement(oAccountsReportModel, dbName);
        }
        public DataSet OutstandingStatement(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.OutstandingStatement(oAccountsReportModel, dbName);
        }
        public DataSet OutstandingStatementUsedCars(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.OutstandingStatementUsedCars(oAccountsReportModel, dbName);
        }

        public DataSet AgeingAccountStatement(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.AgeingAccountStatement(oAccountsReportModel, dbName);
        }
        public DataSet DailyCashFlow(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.DailyCashFlow(oAccountsReportModel, dbName);
        }
        public DataSet DailyTransaction(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.DailyTransaction(oAccountsReportModel, dbName);
        }
        public DataSet AgeingOutstandingStatement(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.AgeingOutstandingStatement(oAccountsReportModel, dbName);
        }
        public DataSet DailyTransactionPrint(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.DailyTransactionPrint(oAccountsReportModel, dbName);
        }
        public DataSet CashPaymentorReceiptReport(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.CashPaymentorReceiptReport(oAccountsReportModel, dbName);
        }
        public DataSet VATReport(AccountsReportModel oAccountsReportModel, string dbName)
        {
            return oDAccntReport.VATReport(oAccountsReportModel, dbName);
        }
    }
}