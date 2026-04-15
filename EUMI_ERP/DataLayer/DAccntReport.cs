using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP
{
    public class DAccntReport
    {

        private SqlParameter[] arlParms;

        public DataSet AccntReportGet(AccntReportModel AccntReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@DateFrom", AccntReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@DateTo", AccntReportModel.DateTo);
                arlParms[2] = new SqlParameter("@AccCode", AccntReportModel.AccCode);
                arlParms[3] = new SqlParameter("@JobCode", AccntReportModel.JobCode);
                arlParms[4] = new SqlParameter("@Department", AccntReportModel.Department);
                arlParms[5] = new SqlParameter("@CostCode", AccntReportModel.CostCode);
                return SQLHelper.ExecuteDataset("Rpt_GetAccntDatewise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AcctJobGet(JobReportModel JobReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DateFrom", JobReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@DateTo", JobReportModel.DateTo);
                arlParms[2] = new SqlParameter("@JobCode", JobReportModel.JobCode);
                return SQLHelper.ExecuteDataset("Rpt_JobStmt_Report", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AccountQuery(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[0];
                return SQLHelper.ExecuteDataset("AccountsQuery", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }





        public DataSet TrialsBalanceSummeryGets(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", AccountsReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", AccountsReportModel.DateTo);
                arlParms[2] = new SqlParameter("@Account", AccountsReportModel.AccountCode);
                arlParms[3] = new SqlParameter("@userid", AccountsReportModel.UserId);

                return SQLHelper.ExecuteDataset("Rpt_trialbalnceoutstandingGets", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


















        public DataSet AccountStatement(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[12];
                arlParms[0] = new SqlParameter("@FromDate", AccountsReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", AccountsReportModel.DateTo);
                arlParms[2] = new SqlParameter("@Account", AccountsReportModel.AccountCode);
                arlParms[3] = new SqlParameter("@ACGroup", AccountsReportModel.AccountGroup);
                arlParms[4] = new SqlParameter("@CostCode", AccountsReportModel.CostCode);
                arlParms[5] = new SqlParameter("@Dept", AccountsReportModel.DeptId);
                arlParms[6] = new SqlParameter("@Opening", AccountsReportModel.Opening);
                arlParms[7] = new SqlParameter("@userid", AccountsReportModel.UserId);
                arlParms[8] = new SqlParameter("@Summery", AccountsReportModel.Summery);
                arlParms[9] = new SqlParameter("@Currency", AccountsReportModel.Currency);
                arlParms[10] = new SqlParameter("@Var1", AccountsReportModel.Var1);
                arlParms[11] = new SqlParameter("@Var2", AccountsReportModel.Var2);
                if (AccountsReportModel.Summery == 1)
                {
                    return SQLHelper.ExecuteDataset("Rpt_AccountStatementNewsummery", dbName, arlParms);
                }
                else
                {
                    return SQLHelper.ExecuteDataset("Rpt_AccountStatementNew", dbName, arlParms);
                }


            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet OutstandingStatement(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[12];
                arlParms[0] = new SqlParameter("@FromDate", AccountsReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", AccountsReportModel.DateTo);
                arlParms[2] = new SqlParameter("@Account", AccountsReportModel.AccountCode);
                arlParms[3] = new SqlParameter("@ACGroup", AccountsReportModel.AccountGroup);
                arlParms[4] = new SqlParameter("@CostCode", AccountsReportModel.CostCode);
                arlParms[5] = new SqlParameter("@Opening", AccountsReportModel.Opening);
                arlParms[6] = new SqlParameter("@Dept", AccountsReportModel.DeptId);
                arlParms[7] = new SqlParameter("@UserId", AccountsReportModel.UserId);
                arlParms[8] = new SqlParameter("@Summery", AccountsReportModel.Condition);
                arlParms[9] = new SqlParameter("@Currency", AccountsReportModel.Currency);
                arlParms[10] = new SqlParameter("@Var1", AccountsReportModel.Var1);
                arlParms[11] = new SqlParameter("@Var2", AccountsReportModel.Var2);
                return SQLHelper.ExecuteDataset("Rpt_OutstandingStatementNew", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet OutstandingStatementUsedCars(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@FromDate", AccountsReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", AccountsReportModel.DateTo);
                arlParms[2] = new SqlParameter("@Account", AccountsReportModel.AccountCode);
                arlParms[3] = new SqlParameter("@ACGroup", AccountsReportModel.AccountGroup);
                arlParms[4] = new SqlParameter("@Opening", AccountsReportModel.Opening);
                arlParms[5] = new SqlParameter("@Dept", AccountsReportModel.DeptId);
                arlParms[6] = new SqlParameter("@UserId", AccountsReportModel.UserId);
                arlParms[7] = new SqlParameter("@Summery", AccountsReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_OutstandingStatementUsedCars", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet AgeingAccountStatement(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[10];
                arlParms[0] = new SqlParameter("@FromDate", AccountsReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", AccountsReportModel.DateTo);
                arlParms[2] = new SqlParameter("@Account", AccountsReportModel.AccountCode);
                arlParms[3] = new SqlParameter("@ACGroup", AccountsReportModel.AccountGroup);
                arlParms[4] = new SqlParameter("@Opening", AccountsReportModel.Opening);
                arlParms[5] = new SqlParameter("@Dept", AccountsReportModel.DeptId);
                arlParms[6] = new SqlParameter("@UserId", AccountsReportModel.UserId);
                arlParms[7] = new SqlParameter("@Summery", AccountsReportModel.Condition);
                arlParms[8] = new SqlParameter("@Var1", AccountsReportModel.Var1);
                arlParms[9] = new SqlParameter("@Var2", AccountsReportModel.Var2);
                return SQLHelper.ExecuteDataset("Rpt_AgeingAccountStatement", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DailyCashFlow(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Date", AccountsReportModel.Date);
                return SQLHelper.ExecuteDataset("Rpt_DailyCashFlow", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet DailyTransaction(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", AccountsReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_DailyTransaction", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet AgeingOutstandingStatement(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@FromDate", AccountsReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", AccountsReportModel.DateTo);
                arlParms[2] = new SqlParameter("@Account", AccountsReportModel.AccountCode);
                arlParms[3] = new SqlParameter("@ACGroup", AccountsReportModel.AccountGroup);
                arlParms[4] = new SqlParameter("@Opening", AccountsReportModel.Opening);
                arlParms[5] = new SqlParameter("@Dept", AccountsReportModel.DeptId);
                arlParms[6] = new SqlParameter("@UserId", AccountsReportModel.UserId);
                return SQLHelper.ExecuteDataset("AgeingOutstanding", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet DailyTransactionPrint(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", AccountsReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_DailyTransactionPrint", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet CashPaymentorReceiptReport(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@DateFrom", AccountsReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@DateTo", AccountsReportModel.DateTo);
                arlParms[2] = new SqlParameter("@Dept", AccountsReportModel.DeptId);
                arlParms[3] = new SqlParameter("@Account", AccountsReportModel.AccountCode);
                arlParms[4] = new SqlParameter("@Currency", AccountsReportModel.Currency);
                arlParms[5] = new SqlParameter("@UserId", AccountsReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_CashPayment", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet VATReport(AccountsReportModel AccountsReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", AccountsReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", AccountsReportModel.DateTo);
                return SQLHelper.ExecuteDataset("VATREPORT", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet JobLedgerGets(JobReportModel JobReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", JobReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", JobReportModel.DateTo);
                arlParms[2] = new SqlParameter("@JobId", JobReportModel.JobCode);
                arlParms[3] = new SqlParameter("@SupplierId", JobReportModel.SupplierId);
                return SQLHelper.ExecuteDataset("Rpt_JobLedger", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}