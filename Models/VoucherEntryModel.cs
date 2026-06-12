using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class VoucherEntryModel
    {
        public long VoucherEntryId { get; set; }
        public int VoucherTypeId { get; set; }
        public string Description { get; set; }
        public int VoucherNo { get; set; }        
        public int TransferVoucherNo { get; set; }       
        public string AccountTypeName { get; set; }
        public string VoucherDate { get; set; }        
        public string VType { get; set; }
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public long AccCode { get; set; }
        public string VoucherEntryDescription { get; set; }
        public string BillSerId { get; set; }
        public decimal Amount { get; set; }
        public decimal Amount1 { get; set; }
        public decimal Acob { get; set; } 
        public int empId { get; set; }

        public long Payable { get; set; }

        public int PayId { get; set; }
        public string PayName { get; set; }
        public string EmpName { get; set; }
        public int DAccId { get; set; }
        public int DAcccode { get; set; }


        public string TransferDate { get; set; }

        public string TrxType { get; set; }


        public string ReferenceNo { get; set; }
        public int ProjectJobId { get; set; }
        public string JobCode { get; set; }
        public int CostCenterId { get; set; }
        public string CostCenterName { get; set; }
        public int CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public decimal CurrencyRate { get; set; }
        public decimal FCAmount { get; set; } 
        public int BankId { get; set; }
        public string BankName { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }                
        public int PDCAccount { get; set; }
        public string PDCStatus { get; set; }
        public string TaxNo { get; set; }
        public string PDCAccountName { get; set; }
        public string Advance { get; set; }
        public decimal AdvanceAmount { get; set; }
        public int DelFlag { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public string VoucherTypePrefix { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public string VoucherType { get; set; }
        public string  SelectType { get; set; }
         public string Bank { get; set; }
        public int BankAccount { get; set; }
        public string Remarks { get; set; }
        public string Date { get; set; }
        public string BillSerNo { get; set; }
        public string InvoNo { get; set; }
        public string InvoDate { get; set; }
        public decimal InvAmount { get; set; }
        public string BillDescription { get; set; }
        public long BillSlNo { get; set; }
        public string InvDate { get; set; }
        public decimal GrandTotal { get; set; }
        public long VEntryId { get; set; }
        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public string VTypePrefix { get; set; }
        public int AccId { get; set; }
        public int CreditAccount { get; set; }
        public string CurrDtTime { get; set; }
        public long AssetId { get; set; }
        
        DAccounts oDAccounts = new DAccounts();

        public DataSet VoucherEntryGetandGets(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.VoucherEntryGetandGets(oVoucherEntryModel, dbName);
        }
        public DataSet VoucherEntryGetandGetsUsedCar(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.VoucherEntryGetandGetsUsedCar(oVoucherEntryModel, dbName);
        }
        public DataSet VoucherEntryGetandGetss(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.VoucherEntryGetandGetss(oVoucherEntryModel, dbName);
        }
        public DataSet VoucherEntryTempGets(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.VoucherEntryTempGets(oVoucherEntryModel, dbName);
        }
        public DataSet VoucherTempSaveAvail(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.VoucherTempSaveAvail(oVoucherEntryModel, dbName);
        }
        

        public DataSet PVoucherEntryGetandGets(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.PVoucherEntryGetandGets(oVoucherEntryModel, dbName);
        }
        public DataSet PCVoucherTableInsert(DataTable dt, string dbName)
        {
            return oDAccounts.PCVoucherTableInsert(dt, dbName);
        }

        public DataSet VoucherEntryTableInsert(DataTable dt,string dbName)
        {
            return oDAccounts.VoucherEntryTableInsert(dt, dbName);
        }
        public DataSet VoucherEntryTempInsert(DataTable dt, string dbName)
        {
            return oDAccounts.VoucherEntryTempInsert(dt, dbName);
        }
        
        public DataSet VoucherEntryTableUpdate(DataTable dt, string dbName)
        {
            return oDAccounts.VoucherEntryTableUpdate(dt, dbName);
        }
        

        public DataSet VoucherNoSearch(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.VoucherNoSearch(oVoucherEntryModel, dbName);
        }

        public DataSet TVoucherNoGetandGets(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.TVoucherNoGetandGets(oVoucherEntryModel, dbName);
        }
        public DataSet SalaryGetandGets(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.SalaryGetandGets(oVoucherEntryModel, dbName);
        }
        public DataSet VoucherPettyCash(VoucherEntryModel oVoucherEntryModel, string dbName)
        {
            return oDAccounts.VoucherPettyCash(oVoucherEntryModel, dbName);
        }
        public DataSet pettycashinsert(DataTable dt, string dbName)
        {
            return oDAccounts.pettycashinsert(dt, dbName);
        }

        //    public DataSet pettycashinsert(VoucherEntryModel oVoucherEntryModel, string dbName)
        //    {
        //        return oDAccounts.pettycashinsert(oVoucherEntryModel, dbName);
        //    }


        }
    }