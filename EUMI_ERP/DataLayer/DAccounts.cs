
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using EUMI_ERP.Models;


namespace EUMI_ERP
{
    public class DAccounts
    {
        private SqlParameter[] arlParms;
       
        public DataSet VoucherGetandGets(VoucherModel VoucherModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VoucherEntryId", VoucherModel.VoucherEntryId);
                return SQLHelper.ExecuteDataset("VoucherGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet RVFileGets(VoucherModel VoucherModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@SlNo", VoucherModel.VoucherNo);
                arlParms[1] = new SqlParameter("@DeptId", VoucherModel.DeptId);
                arlParms[2] = new SqlParameter("@VoucherType", VoucherModel.VoucherType);
                return SQLHelper.ExecuteDataset("RVorPVFileGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet RVFileDelete(VoucherModel VoucherModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PFileId", VoucherModel.FileId);
                arlParms[1] = new SqlParameter("@DeptId", VoucherModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", VoucherModel.UserId);

                return SQLHelper.ExecuteDataset("RVorPVFileDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet RVFileInsert(VoucherModel VoucherModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@SlNo", VoucherModel.VoucherNo);
                arlParms[1] = new SqlParameter("@FileName", VoucherModel.FileName);
                arlParms[2] = new SqlParameter("@Extension", VoucherModel.Extension);
                arlParms[3] = new SqlParameter("@Flag", VoucherModel.Flag);
                arlParms[4] = new SqlParameter("@DeptId", VoucherModel.DeptId);
                arlParms[5] = new SqlParameter("@UserId", VoucherModel.UserId);
                arlParms[6] = new SqlParameter("@VoucherType", VoucherModel.VoucherType);
                arlParms[7] = new SqlParameter("@VoucherTypeDesc", VoucherModel.VoucherEntryDescription);
                return SQLHelper.ExecuteDataset("RVorPVFileInsert", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PaymentVoucherGetandGets(PaymentVoucherModel PaymentVoucherModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VoucherEntryId", PaymentVoucherModel.VoucherEntryId);
                return SQLHelper.ExecuteDataset("PaymentVoucherGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
  
        public DataSet VoucherEntryGetandGets(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccountId", VoucherEntryModel.AccountId);
                //return SQLHelper.ExecuteDataset("InvoicesSettlementNew", dbName, arlParms);
                return SQLHelper.ExecuteDataset("InvoicesSettlement", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VoucherEntryGetandGetsUsedCar(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccountId", VoucherEntryModel.AccountId);
                //return SQLHelper.ExecuteDataset("InvoicesSettlementNew", dbName, arlParms);
                return SQLHelper.ExecuteDataset("InvoicesSettlementUsedCar", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalaryGetandGets(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeptId", VoucherEntryModel.DeptId);
                arlParms[1] = new SqlParameter("@Date", VoucherEntryModel.TransferDate);
                //return SQLHelper.ExecuteDataset("InvoicesSettlementNew", dbName, arlParms);
                return SQLHelper.ExecuteDataset("SalaryGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VoucherEntryGetandGetss(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@deptid", VoucherEntryModel.DeptId);
                arlParms[1] = new SqlParameter("@vtype", VoucherEntryModel.VType);
                return SQLHelper.ExecuteDataset("GetShowVoucherTable", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VoucherEntryTempGets(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@UserId", VoucherEntryModel.UserId);
                arlParms[1] = new SqlParameter("@DeptId", VoucherEntryModel.DeptId);
                arlParms[2] = new SqlParameter("@Variable1", VoucherEntryModel.VoucherDate);
                arlParms[3] = new SqlParameter("@Variable2", VoucherEntryModel.VoucherEntryDescription);
                return SQLHelper.ExecuteDataset("VoucherEntryTempGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VoucherTempSaveAvail(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@UserId", VoucherEntryModel.UserId);
                arlParms[1] = new SqlParameter("@DeptId", VoucherEntryModel.DeptId);
                arlParms[2] = new SqlParameter("@Variable1", VoucherEntryModel.VoucherDate);
                arlParms[3] = new SqlParameter("@Variable2", VoucherEntryModel.VoucherEntryDescription);
                return SQLHelper.ExecuteDataset("VoucherTempSaveAvail", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        


        public DataSet PVoucherEntryGetandGets(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccountId", VoucherEntryModel.AccountId);
                return SQLHelper.ExecuteDataset("InvoicesSettlementPV", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PCVoucherTableInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PeCVoucher", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PCVoucherTableInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet VoucherEntryTableInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VoucherEntry", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("VoucherEntryInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet VoucherEntryTempInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VoucherEntry", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("VoucherEntryTempInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        
        public DataSet VoucherEntryTableUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VoucherEntry", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("VoucherEntryUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        
        public DataSet ReceiptVoucherTableInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ReceiptVoucher", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ReceiptVoucherInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet AdvanceSettlement(VoucherModel VoucherModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[10];
                arlParms[0] = new SqlParameter("@VEntryId", VoucherModel.VAdvId);
                arlParms[1] = new SqlParameter("@RecAmountAdv", VoucherModel.RecAmountAdv);
                arlParms[2] = new SqlParameter("@BalAmountAdv", VoucherModel.BalAmountAdv);
                arlParms[3] = new SqlParameter("@InvNoPend", VoucherModel.InvNoPend);
                arlParms[4] = new SqlParameter("@RecAmountPend", VoucherModel.RecAmountPend);
                arlParms[5] = new SqlParameter("@BalAmountPend", VoucherModel.BalAmountPend);
                arlParms[6] = new SqlParameter("@VDescPend", VoucherModel.VDescPend);
                arlParms[7] = new SqlParameter("@BillSerNoPend", VoucherModel.BillSerNoPend);
                arlParms[8] = new SqlParameter("@UserId", VoucherModel.UserId);
                arlParms[9] = new SqlParameter("@DeptId", VoucherModel.DeptId);
                return SQLHelper.ExecuteDataset("AdvanceSettlement", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet VoucherNoGetandGets(SerialNumberModel SerialNumberModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@deptid", SerialNumberModel.DeptId);
                return SQLHelper.ExecuteDataset("GetShowSlnoNumber", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AccountNoGetandGets(AccountNoGetModel AccountNoGetModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@deptid", AccountNoGetModel.DeptId);
                arlParms[1] = new SqlParameter("@flag", AccountNoGetModel.flag);
                return SQLHelper.ExecuteDataset("GetShowAccNumber", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet VoucherNoSearch(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
           {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@VoucherNo", VoucherEntryModel.VoucherNo);
                arlParms[1] = new SqlParameter("@VTypePrefix", VoucherEntryModel.VoucherTypePrefix);
                arlParms[2] = new SqlParameter("@deptid", VoucherEntryModel.DeptId);
                return SQLHelper.ExecuteDataset("VoucherNoSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet VoucherNosearchModified(PDCReceivedModel PDCReceivedModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@VoucherNo", PDCReceivedModel.VoucherNo);
                arlParms[1] = new SqlParameter("@VoucherTypeId", PDCReceivedModel.VoucherTypeId);
                return SQLHelper.ExecuteDataset("VoucherNosearchModified", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet TVoucherNoGetandGets(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VoucherNo", VoucherEntryModel.VoucherNo);
                return SQLHelper.ExecuteDataset("VoucherNoGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AccSearch(PDCReceivedModel PDCReceivedModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccCode", PDCReceivedModel.AccCode);
                return SQLHelper.ExecuteDataset("AccSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet EmpSearch(PDCReceivedModel PDCReceivedModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccCode", PDCReceivedModel.AccCode);
                return SQLHelper.ExecuteDataset("EmpSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PDCGetandGets(PDCReceivedModel PDCReceivedModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@PDCAccountId", PDCReceivedModel.PDCAccountId);
                arlParms[1] = new SqlParameter("@ChequeDtFrom", PDCReceivedModel.ChequeDtFrom);
                arlParms[2] = new SqlParameter("@ChequeDtTo", PDCReceivedModel.ChequeDtTo);
                arlParms[3] = new SqlParameter("@ChqNo", PDCReceivedModel.ChequeDate); 
                arlParms[4] = new SqlParameter("@RadFlag", PDCReceivedModel.RadFlag);
                return SQLHelper.ExecuteDataset("PDCReceivedGet", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PDCReceivedInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PDCReceived", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PDCReceivedInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PDCIsGetandGets(PDCIssuedModel PDCIssuedModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@PDCAccountId", PDCIssuedModel.PDCAccountId);
                arlParms[1] = new SqlParameter("@ChequeDtFrom", PDCIssuedModel.ChequeDtFrom);
                arlParms[2] = new SqlParameter("@ChequeDtTo", PDCIssuedModel.ChequeDtTo);
                arlParms[3] = new SqlParameter("@ChqNo", PDCIssuedModel.ChequeDate);    //ChequeDate
                arlParms[4] = new SqlParameter("@RadFlag", PDCIssuedModel.RadFlag);
                return SQLHelper.ExecuteDataset("PDCIssuedGet", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CashBookInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CashBookType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("CashBookInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CashBookGetandGets(CashBookModel CashBookModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@BookDate", CashBookModel.BookDate);
                arlParms[1] = new SqlParameter("@CashBookId", CashBookModel.CashBookId);
                return SQLHelper.ExecuteDataset("CashBookGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet AccountbalGetandGets(ReconciliationModel PDCIssuedModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PDCAccountId", PDCIssuedModel.BankAccount);
                arlParms[1] = new SqlParameter("@VoucherDate", PDCIssuedModel.VoucherDate);
                arlParms[2] = new SqlParameter("@Flag", PDCIssuedModel.Flag);
                return SQLHelper.ExecuteDataset("AccountbalGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ReconciliationGetandGets(ReconciliationModel PDCIssuedModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@PDCAccountId", PDCIssuedModel.AccountId);
                arlParms[1] = new SqlParameter("@ChequeDtFrom", PDCIssuedModel.ChequeDtFrom);
                arlParms[2] = new SqlParameter("@ChequeDtTo", PDCIssuedModel.ChequeDtTo);
                arlParms[3] = new SqlParameter("@filter", PDCIssuedModel.filter);
                // arlParms[3] = new SqlParameter("@ChqNo", PDCIssuedModel.ChqNo);
                //    arlParms[4] = new SqlParameter("@RadFlag", PDCIssuedModel.RadFlag);
                return SQLHelper.ExecuteDataset("ReconciliationGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet BankbalGetandGets(ReconciliationModel PDCIssuedModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];

                arlParms[0] = new SqlParameter("@PDCAccountId", PDCIssuedModel.BankAccount);
               
                return SQLHelper.ExecuteDataset("BankbalGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ReconciliationlistandGets(ReconciliationModel PDCIssuedModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@PDCAccountId", PDCIssuedModel.AccountId);
                arlParms[1] = new SqlParameter("@ChequeDtFrom", PDCIssuedModel.ChequeDtFrom);
                arlParms[2] = new SqlParameter("@ChequeDtTo", PDCIssuedModel.ChequeDtTo);
                arlParms[3] = new SqlParameter("@filter", PDCIssuedModel.filter);

                // arlParms[3] = new SqlParameter("@ChqNo", PDCIssuedModel.ChqNo);
                // arlParms[4] = new SqlParameter("@RadFlag", PDCIssuedModel.RadFlag);
                return SQLHelper.ExecuteDataset("ReconciliationlistGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ReconciliationInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Reconciliation", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ReconciliationInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PDCIssuedInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PDCIssued", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PDCIssuedInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PettyCashTableInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PettyCash", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PettyCashInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet AccountNumberSearchCust(VoucherModel VoucherModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DebitAccount", VoucherModel.AccountName);
                return SQLHelper.ExecuteDataset("AccountnumberSearchCust", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VoucherwiseAccountGetandGets(VoucherwiseaccountReportModel VoucherwiseaccountReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", VoucherwiseaccountReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", VoucherwiseaccountReportModel.UserId);
                return SQLHelper.ExecuteDataset("VoucherwiseAccountGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet OustandingReportGetandGets(OutstandingStatementModel OutstandingStatementModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@DateFrom", OutstandingStatementModel.DateFrom);
                arlParms[1] = new SqlParameter("@DateTo", OutstandingStatementModel.DateTo);
                arlParms[2] = new SqlParameter("@AccountId", OutstandingStatementModel.AccountId);
                arlParms[3] = new SqlParameter("@DepartmentId", OutstandingStatementModel.DepartmentId);
                arlParms[4] = new SqlParameter("@CostCode", OutstandingStatementModel.CostCode);
                arlParms[5] = new SqlParameter("@AccountGroup", OutstandingStatementModel.AccountGroup);
                return SQLHelper.ExecuteDataset("OustandingReportGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }        
        public DataSet TrailsBalanceGetandGets(TrailBalanceRptModel TrailBalanceRptModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", TrailBalanceRptModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", TrailBalanceRptModel.ToDate);
                arlParms[2] = new SqlParameter("@Account", TrailBalanceRptModel.Account);
                arlParms[3] = new SqlParameter("@CostCode", TrailBalanceRptModel.CostCode);
                arlParms[4] = new SqlParameter("@Department", TrailBalanceRptModel.Department);
                arlParms[5] = new SqlParameter("@Status", TrailBalanceRptModel.Status);
                return SQLHelper.ExecuteDataset("TrailsBalanceGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet TrailsBalanceGroupwiseGetandGets(TrailBalanceRptModel TrailBalanceRptModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", TrailBalanceRptModel.Condition);
                return SQLHelper.ExecuteDataset("TrialBalanceGroup", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }        
        public DataSet ProfitandLoss(TrailBalanceRptModel TrailBalanceRptModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", TrailBalanceRptModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", TrailBalanceRptModel.ToDate);
                arlParms[2] = new SqlParameter("@Account", TrailBalanceRptModel.Account);
                arlParms[3] = new SqlParameter("@CostCode", TrailBalanceRptModel.CostCode);
                arlParms[4] = new SqlParameter("@Department", TrailBalanceRptModel.Department);
                arlParms[5] = new SqlParameter("@Status", TrailBalanceRptModel.Status);
                return SQLHelper.ExecuteDataset("ProfitandLossAsOn", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet BalanceSheetAsOn(TrailBalanceRptModel TrailBalanceRptModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", TrailBalanceRptModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", TrailBalanceRptModel.ToDate);
                arlParms[2] = new SqlParameter("@Account", TrailBalanceRptModel.Account);
                arlParms[3] = new SqlParameter("@CostCode", TrailBalanceRptModel.CostCode);
                arlParms[4] = new SqlParameter("@Department", TrailBalanceRptModel.Department);
                arlParms[5] = new SqlParameter("@Status", TrailBalanceRptModel.Status);
                return SQLHelper.ExecuteDataset("BalanceSheet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet BalanceSheetSummary(TrailBalanceRptModel TrailBalanceRptModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", TrailBalanceRptModel.Condition);
                return SQLHelper.ExecuteDataset("BalanceSheetSummary", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet BalanceSheetGetandGets(BalanceSheetModel BalanceSheetModel, string dbName)
        {
            try
            {
                return SQLHelper.ExecuteDataset("BalanceSheetGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet OutstatndingStatmentPDCGetandGets(OutstatndingStatmentPDCModel OutstatndingStatmentPDCModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@DateFrom", OutstatndingStatmentPDCModel.DateFrom);
                arlParms[1] = new SqlParameter("@DateTo", OutstatndingStatmentPDCModel.DateTo);
                arlParms[2] = new SqlParameter("@PDCAccountId", OutstatndingStatmentPDCModel.PDCAccountId);
                arlParms[3] = new SqlParameter("@DepartmentId", OutstatndingStatmentPDCModel.DepartmentId);
                arlParms[4] = new SqlParameter("@PDCType", OutstatndingStatmentPDCModel.PDCType);
                return SQLHelper.ExecuteDataset("OutstatndingStatmentPDCGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet VoucherPettyCash(VoucherEntryModel VoucherEntryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@VoucherNo", VoucherEntryModel.VoucherNo);
                arlParms[1] = new SqlParameter("@deptid", VoucherEntryModel.DeptId);
                return SQLHelper.ExecuteDataset("VoucherPettyCash", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }




        public DataSet pettycashinsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VoucherEntry", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("pettycashinsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        //public DataSet pettycashinsert(VoucherEntryModel VoucherEntryModel, string dbName)
        //{
        //    try
        //    {
        //        arlParms = new SqlParameter[2];
        //        arlParms[0] = new SqlParameter("@VoucherNo", VoucherEntryModel.VoucherNo);
        //        arlParms[1] = new SqlParameter("@deptid", VoucherEntryModel.DeptId);
        //        return SQLHelper.ExecuteDataset("pettycashinsert", dbName, arlParms);
        //    }
        //    catch (SqlException exMe)
        //    {
        //        Console.WriteLine(exMe.Message);
        //        return null;
        //    }
        //}




        public DataSet ReceiptVoucherGetandGets(VoucherModel VoucherModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@VoucherNo", VoucherModel.VoucherNo);
                arlParms[1] = new SqlParameter("@VoucherType", VoucherModel.VoucherType);
                return SQLHelper.ExecuteDataset("ReceiptVoucherGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PaymentVoucherGetandGets(VoucherModel VoucherModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@VoucherNo", VoucherModel.VoucherNo);
                arlParms[1] = new SqlParameter("@VoucherType", VoucherModel.VoucherType);
                return SQLHelper.ExecuteDataset("PaymentVoucherGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}