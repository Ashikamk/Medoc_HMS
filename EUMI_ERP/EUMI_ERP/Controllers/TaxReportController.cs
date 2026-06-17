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
    public class TaxReportController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        public ActionResult SalesTaxReport()
        {
            return View();
        }
        public ActionResult PurchaseTaxReport()
        {
            return View();
        }
        public ActionResult SalesReturnTaxReport()
        {
            return View();
        }
        public ActionResult PurchaseReturnTaxReport()
        {
            return View();
        }
        public ActionResult ExpenseTaxReport()
        {
            return View();
        }

        [HttpPost]
        public ActionResult SalesTaxReportGet(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesTaxReportGet(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.BillSeriesId = row["BillSeriesId"].ToString();
                    Reptmodels.SlNo = row["BillDescription"].ToString();
                    Reptmodels.InvoNo = row["BillSlNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.CustomerVATNo = row["TRNNumber"].ToString();
                    Reptmodels.Discount = row["ProdDisc"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxPercent = row["TaxPercent"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.TotalAmount = row["GrandTotal"].ToString();
                    Reptmodels.Dept = row["DeptId"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult B2cs(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.B2cs(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.TaxPercent = row["TaxRate"].ToString();

                    Reptmodels.AccountDesc = row["var1"].ToString();
                    Reptmodels.VDescription = row["var2"].ToString();
                    Reptmodels.TotalAmount = row["var3"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult SalesAreaGrpTaxReportGet(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesAreaGrpTaxReportGet(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.BillSeriesId = row["BillSeriesId"].ToString();
                    Reptmodels.SlNo = row["BillDescription"].ToString();
                    Reptmodels.InvoNo = row["BillSlNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.CustomerVATNo = row["TRNNumber"].ToString();
                    Reptmodels.Discount = row["ProdDisc"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxPercent = row["TaxPercent"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.TotalAmount = row["Amount"].ToString();
                    Reptmodels.Dept = row["DeptId"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult PurchaseTaxReportGet(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseTaxReportGet(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.SlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.CustomerVATNo = row["TRNNumber"].ToString();
                    Reptmodels.Discount = row["Discount"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxPercent = row["TaxRate"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.TotalAmount = row["BaseTotal"].ToString();
                    Reptmodels.Dept = row["DeptId"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult PurchaseAreaGrpTaxReportGet(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseAreaGrpTaxReportGet(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.SlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.CustomerVATNo = row["TRNNumber"].ToString();
                    Reptmodels.Discount = row["Discount"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxPercent = row["TaxRate"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.TotalAmount = row["Amount"].ToString();
                    Reptmodels.Dept = row["DepartmentId"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult ExpenseTaxReportGet(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ExpenseTaxReportGet(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.Prefix = row["VTypePrefix"].ToString();
                    Reptmodels.InvoNo = row["VoucherNo"].ToString();
                    Reptmodels.AccountCode = row["Acc_Code"].ToString();
                    Reptmodels.AccountDesc = row["Acc_Description"].ToString();
                    Reptmodels.VDescription = row["VDescription"].ToString();
                    Reptmodels.TotalAmount = row["BaseAmount"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult PurchaseReturnTaxReportGet(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReturnTaxReportGet(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.InvoNo = row["PRNo"].ToString();
                    Reptmodels.InvoDate = row["PRDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.CustomerVATNo = row["TRNNumber"].ToString();
                    Reptmodels.Discount = row["Discount"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxPercent = row["TaxRate"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.TotalAmount = row["BaseTotal"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult PurchaseReturnAreaGrpTaxReportGet(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReturnAreaGrpTaxReportGet(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.InvoNo = row["PRNo"].ToString();
                    Reptmodels.InvoDate = row["PRDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.CustomerVATNo = row["TRNNumber"].ToString();
                    Reptmodels.Discount = row["TotalDiscount"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxPercent = row["TaxRate"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.TotalAmount = row["BaseTotal"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult SalesReturnTaxReportGet(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesReturnTaxReportGet(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.SlNo = row["BillDescription"].ToString();
                    Reptmodels.InvoNo = row["ReturnNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.CustomerVATNo = row["TRNNumber"].ToString();
                    Reptmodels.Discount = row["ProdDisc"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxPercent = row["TaxPercent"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.TotalAmount = row["Amount"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult SalesReturnAreaGrpTaxReportGet(TaxReportModel TaxReportModel)
        {
            TaxReportModel obj = new TaxReportModel();

            List<TaxReportModel> oList = new List<TaxReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesReturnAreaGrpTaxReportGet(TaxReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxReportModel Reptmodels = new TaxReportModel();
                    Reptmodels.SlNo = row["BillDescription"].ToString();
                    Reptmodels.InvoNo = row["ReturnNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.CustomerVATNo = row["TRNNumber"].ToString();
                    Reptmodels.Discount = row["BillDiscount"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxPercent = row["TaxPercent"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.TotalAmount = row["GrandTotal"].ToString();
                    oList.Add(Reptmodels);
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

    }
}