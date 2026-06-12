using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Configuration;
using System.IO;


namespace EUMI_ERP.Controllers
{
    public class AccountsReportController : Controller
    {
     
            string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
            // GET: Purchaseandsalesreports
         
            public ActionResult AccountsReport()
            {
                return View();
            }

        public ActionResult JobReport()
        {
            return View();
        }

        public ActionResult OutstandingStmnt()
        {
            return View();
        }
        public ActionResult UsedCarOutstandingStatement()
        {
            return View();
        }
        public ActionResult AccountStatement()
        {
            return View();
        }

        public ActionResult OutstandingStatement()
        {
            return View();
        }

        public ActionResult DailyCashFlow()
        {
            return View();
        }

        public ActionResult DailyTransaction()
        {
            return View();
        }

        public ActionResult CashPaymentorReceiptReport()
        {
            return View();
        }

        public ActionResult VATReport()
        {
            return View();
        }
        public ActionResult AccountQuery()
        {
            return View();
        }
        public ActionResult JobLedger()
        {
            return View();
        }
        public ActionResult AgeingAccountStatement()
        {
            return View();
        }

        [HttpPost]

        public ActionResult AccountQuery(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> olist = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.AccountQuery(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();

                    rptModels.AccId = dr["Acc_Id"].ToString();
                    rptModels.AccountCode = dr["Acc_Code"].ToString();
                    rptModels.AccDesc = dr["Acc_Description"].ToString();
                    rptModels.Balance = dr["Balance"].ToString();
                    rptModels.CreditLimit = dr["CreditLimit"].ToString();
                    rptModels.OpenBal = dr["Acob"].ToString();
                    rptModels.Address = dr["CustAddress"].ToString();
                    rptModels.Area = dr["Name"].ToString();
                    rptModels.Currency = dr["CurrencyName"].ToString();
                    rptModels.DueDays = dr["DueDays"].ToString();
                    rptModels.PhoneNum = dr["PhoneNumber"].ToString();
                    rptModels.Email = dr["EmailId"].ToString();
                    rptModels.ContactName = dr["CustContactName1"].ToString();
                    rptModels.Status = dr["STATUS"].ToString();
                    rptModels.CreatedDate = dr["CurDate"].ToString();
                    rptModels.CustType = dr["CustType"].ToString();
                    rptModels.CustId = dr["CustsuppId"].ToString();
                    rptModels.SalesMan = dr["FirstName"].ToString();
                    olist.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = olist,
                MaxJsonLength = 86753090,
            };
        }


        [HttpPost]

        public ActionResult AcctJobGet(JobReportModel JobReportModel)
        {
            JobReportModel obj = new JobReportModel();
            List<JobReportModel> olist = new List<JobReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.AcctJobGet(JobReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    JobReportModel rptModels = new JobReportModel();

                    rptModels.VTypePrefix = dr["VTypePrefix"].ToString();
                    rptModels.VoucherNo = dr["VoucherNo"].ToString();
                    rptModels.VoucherDate = dr["VDate"].ToString();
                    rptModels.VType = dr["VType"].ToString();
                    rptModels.Acc_Code = dr["Acc_Code"].ToString();
                    rptModels.AccDesc = dr["Acc_Description"].ToString();
                    rptModels.VDesc = dr["VDescription"].ToString();
                    rptModels.BaseAmount = dr["BaseAmount"].ToString();
                    rptModels.ReferenceNo = dr["ReferenceNo"].ToString();
                    rptModels.ChequeNo = dr["ChequeNo"].ToString();
                    rptModels.Credit = dr["CreditAmt"].ToString();
                    rptModels.Debit = dr["DebitAmt"].ToString();
                    rptModels.Balance = dr["Balance"].ToString();

                    olist.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = olist,
                MaxJsonLength = 86753090,
            };
        }
        [HttpPost]
        public ActionResult AccountStatement(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.AccountStatement(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();

                    rptModels.VDate = dr["VDate"].ToString();
                    rptModels.VNo = dr["VoucherNo"].ToString();
                    rptModels.AccountCode = dr["ACCOUNT"].ToString();
                    rptModels.AccDesc = dr["Acc_Description"].ToString();
                    rptModels.VDesc = dr["VDescription"].ToString();
                    rptModels.ReferenceNo = dr["ReferenceNo"].ToString();
                    rptModels.Credit = dr["Cred"].ToString();
                    rptModels.Debit = dr["Deb"].ToString();
                    rptModels.Balance = dr["Bal"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();
                    rptModels.BillSeriesId = dr["BillSeriesId"].ToString();
                    rptModels.VTypeId = dr["VTypeId"].ToString();
                    rptModels.VType = dr["VType"].ToString();
                    rptModels.VNum = dr["VNum"].ToString();
                    rptModels.Currency = dr["Currency"].ToString();
                    rptModels.CurrencyRate = dr["CurrencyRate"].ToString();
                    rptModels.FCAmount = dr["FCAmount"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }


        [HttpPost]
        public ActionResult TrialsBalanceSummeryGets(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.TrialsBalanceSummeryGets(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();
                    rptModels.VDate = dr["VDate"].ToString();
                    rptModels.VNo = dr["VoucherNo"].ToString();
                    rptModels.AccountCode = dr["ACCOUNT"].ToString();
                    rptModels.AccDesc = dr["Acc_Description"].ToString();
                    rptModels.VDesc = dr["VDescription"].ToString();
                    rptModels.ReferenceNo = dr["ReferenceNo"].ToString();
                    rptModels.Credit = dr["Cred"].ToString();
                    rptModels.Debit = dr["Deb"].ToString();
                    rptModels.Balance = dr["Bal"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();
                    rptModels.BillSeriesId = dr["BillSeriesId"].ToString();
                    rptModels.VTypeId = dr["VTypeId"].ToString();
                    rptModels.VType = dr["VType"].ToString();
                    rptModels.VNum = dr["VNum"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }


        



        [HttpPost]
        public ActionResult OutstandingStatement(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.OutstandingStatement(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();
                    rptModels.VDate = dr["VDate"].ToString();
                    rptModels.VNum = dr["ReferenceNo"].ToString();
                    rptModels.VType = dr["VTypePrefix"].ToString();
                    rptModels.AccountCode = dr["ACCOUNT"].ToString();
                    rptModels.AccDesc = dr["Acc_Description"].ToString();
                    rptModels.ReferenceNo = dr["VoucherNo"].ToString();
                    rptModels.VDesc = dr["VDescription"].ToString();
                    rptModels.BaseAmount = dr["BaseAmount"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.RecAmount = dr["ReceivedAmt"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();
                    rptModels.BillSeriesId = dr["BillSeriesId"].ToString();
                    rptModels.Credit = dr["Credit"].ToString();
                    rptModels.Debit = dr["Debit"].ToString();
                    rptModels.Currency = dr["Currency"].ToString();
                    rptModels.CurrencyRate = dr["CurrencyRate"].ToString();
                    rptModels.FCAmount = dr["FCAmount"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }


        [HttpPost]
        public ActionResult OutstandingStatementUsedCars(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.OutstandingStatementUsedCars(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();

                    rptModels.VDate = dr["VDate"].ToString();
                    rptModels.VNum = dr["ReferenceNo"].ToString();
                    rptModels.ReferenceNo = dr["VoucherNo"].ToString();
                    rptModels.VType = dr["VTypePrefix"].ToString();
                    rptModels.AccountCode = dr["ACCOUNT"].ToString();
                    rptModels.AccDesc = dr["Acc_Description"].ToString();
                    rptModels.VDesc = dr["VDescription"].ToString();
                    rptModels.BaseAmount = dr["BASEAMNT"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.RecAmount = dr["RECAMNT"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();
                    rptModels.BillSeriesId = dr["BillSeriesId"].ToString();
                    rptModels.Credit = dr["Credit"].ToString();
                    rptModels.Debit = dr["Debit"].ToString();
                    rptModels.Currency = dr["Currency"].ToString();
                    rptModels.CurrencyRate = dr["CurrencyRate"].ToString();
                    rptModels.FCAmount = dr["FCAmount"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }


        [HttpPost]
        public ActionResult AgeingAccountStatement(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.AgeingAccountStatement(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();

                    rptModels.VDate = dr["VDate"].ToString();
                    rptModels.VNum = dr["ReferenceNo"].ToString();
                    rptModels.ReferenceNo = dr["VoucherNo"].ToString();
                    rptModels.VType = dr["VTypePrefix"].ToString();
                    rptModels.AccountCode = dr["ACCOUNT"].ToString();
                    rptModels.AccDesc = dr["Acc_Description"].ToString();
                    rptModels.VDesc = dr["VDescription"].ToString();
                    rptModels.BaseAmount = dr["BASEAMNT"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.RecAmount = dr["RECAMNT"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();
                    rptModels.BillSeriesId = dr["BillSeriesId"].ToString();
                    rptModels.Credit = dr["Credit"].ToString(); 
                    rptModels.Debit = dr["Debit"].ToString();
                    rptModels.Currency = dr["Currency"].ToString();
                    rptModels.CurrencyRate = dr["CurrencyRate"].ToString();
                    rptModels.FCAmount = dr["FCAmount"].ToString();
                    rptModels.Days = dr["Days"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }

        [HttpPost]
        public ActionResult DailyCashFlow(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.DailyCashFlow(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();
                    rptModels.AccountCode = dr["GROUPdes"].ToString();
                    rptModels.AccDesc = dr["GROUP"].ToString();
                    rptModels.Debit = dr["Debit"].ToString();
                    rptModels.Credit = dr["Credit"].ToString();
                    //rptModels.Amount = dr["Amount"].ToString();
                    rptModels.Balance = dr["balance"].ToString();

                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }

        [HttpPost]
        public ActionResult DailyTransaction(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.DailyTransaction(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();
                    rptModels.VNum = dr["VoucherNo"].ToString();
                    rptModels.VDate = dr["vdate"].ToString();
                    rptModels.VTypePrefix = dr["VTypePrefix"].ToString();
                    rptModels.AccountCode = dr["Acc_Code"].ToString();
                    rptModels.AccDesc = dr["Acc_Description"].ToString();
                    rptModels.VDesc = dr["VDescription"].ToString();
                    rptModels.Debit = dr["Debit"].ToString();
                    rptModels.Credit = dr["Credit"].ToString();
                    rptModels.Balance = dr["Balance"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }


        [HttpPost]
        public ActionResult AgeingOutstandingStatement(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.AgeingOutstandingStatement(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();

                    rptModels.AccountCode = dr["AccCode"].ToString();
                    rptModels.ThirtyDays = dr["1_30_DAYS"].ToString();
                    rptModels.SixtyDays = dr["31_60_DAYS"].ToString();
                    rptModels.NinetyDays = dr["61_90_DAYS"].ToString();
                    rptModels.OneTwentyDays = dr["91_120_DAYS"].ToString();
                    rptModels.AboveOneTwentyDays = dr["ABOVE120_DAYS"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }

        [HttpPost]
        public ActionResult DailyTransactionPrint(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.DailyTransactionPrint(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();

                    rptModels.VTypePrefix = dr["VTypePrefix"].ToString();
                    rptModels.VType = dr["vtype"].ToString();
                    rptModels.Amount = dr["BaseAmount"].ToString();
                    rptModels.Prefix = dr["PREFIX"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }


        [HttpPost]
        public ActionResult CashPaymentorReceiptReport(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.CashPaymentorReceiptReport(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();
                    rptModels.VTypePrefix = dr["VTypePrefix"].ToString();
                    rptModels.VDate = dr["VDate"].ToString();
                    rptModels.VNum = dr["VoucherNo"].ToString();
                   
                    rptModels.AccountCode = dr["AccCode"].ToString();
                    rptModels.VDesc = dr["VDescription"].ToString();
                    rptModels.ReferenceNo = dr["ReferenceNo"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.FCAmount = dr["FCAmount"].ToString();
                    rptModels.VType = dr["VName"].ToString();
                    rptModels.HFlag = dr["Hflag"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }

        [HttpPost]
        public ActionResult VATReport(AccountsReportModel AccountsReportModel)
        {
            AccountsReportModel obj = new AccountsReportModel();
            List<AccountsReportModel> oList = new List<AccountsReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.VATReport(AccountsReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AccountsReportModel rptModels = new AccountsReportModel();
                    rptModels.Area = dr["AREA"].ToString();
                    rptModels.BaseAmount = dr["GrandTotal"].ToString();
                    rptModels.TaxAmount = dr["TotalTax"].ToString();
                    oList.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }
        public ActionResult JobLedgerGets(JobReportModel JobReportModel)
        {
            JobReportModel obj = new JobReportModel();
            List<JobReportModel> olist = new List<JobReportModel>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.JobLedgerGets(JobReportModel, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    JobReportModel rptModels = new JobReportModel();

                    rptModels.VTypePrefix = dr["VTypePrefix"].ToString();
                    rptModels.VoucherNo = dr["VoucherNo"].ToString();
                    rptModels.VoucherDate = dr["VDate"].ToString();
                    rptModels.VType = dr["VType"].ToString();
                    rptModels.Acc_Code = dr["AccCode"].ToString();
                    rptModels.AccDesc = dr["Acc_Description"].ToString();
                    rptModels.VDesc = dr["VDescription"].ToString();
                    rptModels.ReferenceNo = dr["ReferenceNo"].ToString();
                    rptModels.JobCode = dr["JobCode"].ToString();
                    rptModels.Credit = dr["CREDIT"].ToString();
                    rptModels.Debit = dr["DEBIT"].ToString();

                    olist.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = olist,
                MaxJsonLength = 86753090,
            };
        }
    }
}