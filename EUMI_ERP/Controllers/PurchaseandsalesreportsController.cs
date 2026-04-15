//01/10/2018

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Configuration;
using System.IO;
using EUMI_ERP.Models;

namespace EUMI_ERP.Controllers
{
    public class PurchaseandsalesreportsController : Controller
    {

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: Purchaseandsalesreports
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult PurchaseILCompare()
        {
            return View();
        }
        public ActionResult SalesReport()
        {
            return View();
        }

        public ActionResult DailySales()
        {
            return View();
        }


        public ActionResult Purchasereport()
        {
            return View();
        }
        public ActionResult BOQReport()
        {
            return View();
        }
        public ActionResult DatewisePurchase()
        {
            return View();
        }
        public ActionResult ItemwisePurchase()
        {
            return View();
        }
        public ActionResult PurchaseReportGraph()
        {
            return View();
        }
        public ActionResult ItemPurchase()
        {
            return View();
        }
        public ActionResult MonthwisePurchase()
        {
            return View();
        }
        public ActionResult AreawisePurchase()
        {
            return View();
        }
        public ActionResult LocationwisePurchase()
        {
            return View();
        }
        public ActionResult SupplierwisePurchase()
        {
            return View();
        }
        public ActionResult MonthwisePurchaseReport()
        {
            return View();
        }
        public ActionResult MonthwiseSalesbyCustomerReport()
        {
            return View();
        }
        public ActionResult MonthwiseSalesbyItemReport()
        {
            return View();
        }
        public ActionResult MonthlySupplierItemPurchaseReport()
        {
            return View();
        }
        public ActionResult MonthlyItemPurchaseReport()
        {
            return View();
        }

        public ActionResult InvoicewiseSalesAnalysis()
        {
            return View();
        }
        public ActionResult TopSupplierAnalysis()
        {
            return View();
        }
        public ActionResult TopCustomerAnalysis()
        {
            return View();
        }

        public ActionResult AreaGroupwiseReport()
        {
            return View();
        }

        public ActionResult MonthwiseSales()
        {
            return View();
        }

        public ActionResult AreawiseSales()
        {
            return View();
        }
        public ActionResult AreaGroupwiseSales()
        {
            return View();
        }
        public ActionResult CustomerwiseSales()
        {
            return View();
        }

        public ActionResult SalesmanwiseSales()
        {
            return View();
        }

        public ActionResult AreaSalesmanwiseSales()
        {
            return View();
        }

        public ActionResult AreaCustomerwiseSales()
        {
            return View();
        }

        public ActionResult SalesmanCustomerWiseSales()
        {
            return View();
        }

        public ActionResult EmployeeDocumentExpiry()
        {
            return View();
        }
        public ActionResult FastMovingItemsReport()
        {
            return View();
        }
        public ActionResult NonMovingItemsReport()
        {
            return View();
        }

        public ActionResult ProfitAnalysisSalesReturn()
        {
            return View();
        }
        public ActionResult GSTSales()
        {
            return View();
        }
        public ActionResult GSTPurchase()
        {
            return View();
        }
        public ActionResult CustomerEnquiryMain()
        {
            return View();
        }
        public ActionResult CustomerEnquirySub()
        {
            return View();
        }
        public ActionResult QuotationEntryMain()
        {
            return View();
        }
        public ActionResult QuotationEntrySub()
        {
            return View();
        }
        public ActionResult SalesOrderMain()
        {
            return View();
        }
        public ActionResult SalesOrderSub()
        {
            return View();
        }
        public ActionResult PurchaseOrderMain()
        {
            return View();
        }
        public ActionResult PurchaseOrderSub()
        {
            return View();
        }

        public ActionResult PurchaseEnquiryMain()
        {
            return View();
        }
        public ActionResult PurchaseEnquirySub()
        {
            return View();
        }

        public ActionResult MRVPurchaseMain()
        {
            return View();
        }
        public ActionResult MRVPurchaseSub()
        {
            return View();
        }
        public ActionResult PurchasePerformaMain()
        {
            return View();
        }
        public ActionResult PurchasePerformaSub()
        {
            return View();
        }
        public ActionResult DetailedProduction()
        {
            return View();
        }
        public ActionResult LocationTransfer()
        {
            return View();
        }
        public ActionResult FastMovingLocationTransfer()
        {
            return View();
        }
        public ActionResult NonMovingLocationTransfer()
        {
            return View();
        }
        public ActionResult LocationTransferMain()
        {
            return View();
        }
        public ActionResult OrderBouncingReport()
        {
            return View();
        }
        public ActionResult PackingHistoryReport()
        {
            return View();
        }

        public ActionResult EmployeeAttendanceReport()
        {
            return View();
        }
        public ActionResult AgeingUsedCars()
        {
            return View();
        }
        public ActionResult UsedCarsItemwisePurchaseReport()
        {
            return View();
        }
        public ActionResult PurchaseReturnMainReport()
        {
            return View();
        }
        public ActionResult PurchaseReturnSubReport()
        {
            return View();
        }
        public ActionResult SalesReturnReport()
        {
            return View();
        }
        public ActionResult SalesReturnSubReport()
        {
            return View();
        }

        public ActionResult MonthwiseExpenseAnalysis()
        {
            return View();
        }
        public ActionResult TransactionDateDiff()
        {
            return View();
        }
        public ActionResult GasDistributionReport()
        {
            return View();
        }

        public ActionResult DetailedStockReport()
        {
            return View();
        }
        public ActionResult DetailedReportGas()
        {
            return View();
        }
        public ActionResult MetricTonReport()
        {
            return View();
        }
        public ActionResult PurchaseStockInReport()
        {
            return View();
        }
        public ActionResult MetricTonReportGet(ModelItemwise Itemwise)
        {
            ModelItemwise obj = new ModelItemwise();

            List<ModelItemwise> oList = new List<ModelItemwise>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MetricTonReportGet(Itemwise, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelItemwise MModels = new ModelItemwise();
                    MModels.ItemId = row["ItemId"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = row["Quantity"].ToString();
                    oList.Add(MModels);
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

        public ActionResult UsedcarsItemWiseReport(ModelItemwise Itemwise)
        {
            ModelItemwise obj = new ModelItemwise();

            List<ModelItemwise> oList = new List<ModelItemwise>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UsedcarsItemWiseReport(Itemwise, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelItemwise MModels = new ModelItemwise();
                    MModels.SlNo = row["SlNo"].ToString();
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.CustAccount = row["CustAccount"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.ItemId = row["ItemId"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = row["Quantity"].ToString();
                    MModels.Cost = row["Cost"].ToString();
                    MModels.TermDescription = row["TermDescription"].ToString();
                    MModels.Name = row["Name"].ToString();
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.Payterms = row["Payterms"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.OtherCost = Convert.ToDecimal(row["OtherCost"].ToString());
                    MModels.TaxableAmt = Convert.ToDecimal(row["TaxableAmt"].ToString());
                    MModels.TaxAmt = Convert.ToDecimal(row["TaxAmt"].ToString());
                    MModels.LineTotal = Convert.ToDecimal(row["LineTotal"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = row["CurrencyRate"].ToString();
                    MModels.FCLineTotal = Convert.ToDecimal(row["FCLineTotal"].ToString());
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.ShipDate = row["ShipDate"].ToString();
                    MModels.GrpName = row["GrpName"].ToString();
                    MModels.SbgrpName = row["SbgrpName"].ToString();
                    MModels.CategoryName = row["CategoryName"].ToString();
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.Username = row["Username"].ToString();
                    MModels.BuyerNo = row["BuyerNo"].ToString();
                    oList.Add(MModels);
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
        public ActionResult DashboardGetandGetsElectronics(PurchaseandSalestemp PurchaseandSalestemp)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSalestemp> oList = new List<PurchaseandSalestemp>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DashboardGetandGetsElectronics(PurchaseandSalestemp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSalestemp Reptmodels = new PurchaseandSalestemp();
                    Reptmodels.TotalAmount = row["TotalSales"].ToString();
                    Reptmodels.totalTax = row["Outstanding"].ToString();
                    Reptmodels.Earning = row["Expenses"].ToString();
                    Reptmodels.CreditSales = row["CreditSales"].ToString();
                    Reptmodels.CashSales = row["CashSales"].ToString();
                    Reptmodels.Amount = row["SupOutstanding"].ToString();
                    Reptmodels.DailyPurchase = row["DailyPurchase"].ToString(); 
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
        public ActionResult TotalStock(PurchaseandSalestemp PurchaseandSalestemp)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSalestemp> oList = new List<PurchaseandSalestemp>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TotalStock(PurchaseandSalestemp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSalestemp Reptmodels = new PurchaseandSalestemp();
                    Reptmodels.Cost = row["StockValue"].ToString();
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
        public ActionResult CustOutstandingDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustOutstandingDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.AccId = row["AccId"].ToString();
                    Reptmodels.AccCode = row["AccCode"].ToString();
                    Reptmodels.AccDesc = row["Acc_Description"].ToString();
                    Reptmodels.Debit = row["DEBIT"].ToString();
                    Reptmodels.Credit = row["CREDIT"].ToString();
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
        public ActionResult SupOutstandingDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SupOutstandingDashboard(PurchaseandSales, dbName);
                if(dsDataSet != null)
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.AccId = row["AccId"].ToString();
                    Reptmodels.AccCode = row["AccCode"].ToString();
                    Reptmodels.AccDesc = row["Acc_Description"].ToString();
                    Reptmodels.Debit = row["DEBIT"].ToString();
                    Reptmodels.Credit = row["CREDIT"].ToString();
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
        public ActionResult Rpt_PurchaseImportLocalCompare(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Rpt_PurchaseImportLocalCompare(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.ItemId = row["ItemId"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.Description = row["Description"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    Reptmodels.LPCost = Convert.ToDecimal(row["LPCost"].ToString());
                    Reptmodels.Stock = Convert.ToInt64(row["Stock"].ToString());

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
        public ActionResult DashboardData(PurchaseandSalestemp PurchaseandSalestemp)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSalestemp> oList = new List<PurchaseandSalestemp>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DashboardData(PurchaseandSalestemp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSalestemp Reptmodels = new PurchaseandSalestemp();
                    Reptmodels.TotalAmount = row["totalamount"].ToString();
                    Reptmodels.totalTax = row["TotalTax"].ToString();
                    Reptmodels.Earning = row["Earning"].ToString();
                    Reptmodels.Value1 = row["Value1"].ToString();
                    Reptmodels.Value2 = row["Value2"].ToString();
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
        public ActionResult DashboardGetandGets(PurchaseandSalestemp PurchaseandSalestemp)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSalestemp> oList = new List<PurchaseandSalestemp>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DashboardGetandGets(PurchaseandSalestemp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSalestemp Reptmodels = new PurchaseandSalestemp();
                    Reptmodels.TotalAmount = row["TotalSales"].ToString();
                    Reptmodels.totalTax = row["TotalTax"].ToString();
                    Reptmodels.Cost = row["TotalCost"].ToString();
                    Reptmodels.Earning = row["Earnings"].ToString();
                    Reptmodels.CashSales = row["UserSales"].ToString();
                    Reptmodels.CreditSales = row["WeeklySR"].ToString();
                    Reptmodels.Value1 = row["MonthlySR"].ToString();
                    Reptmodels.Value2 = row["MyCusOutstanding"].ToString();
                    Reptmodels.CRSales = row["CreditSales"].ToString();
                    Reptmodels.CSSales = row["CashSales"].ToString();
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
        public ActionResult MyCustomerOutstanding(PurchaseandSalestemp PurchaseandSalestemp)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSalestemp> oList = new List<PurchaseandSalestemp>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MyCustomerOutstanding(PurchaseandSalestemp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSalestemp Reptmodels = new PurchaseandSalestemp();
                    Reptmodels.AccId = row["AccId"].ToString();
                    Reptmodels.AccCode = row["AccCode"].ToString();
                    Reptmodels.AccDesc = row["Acc_Description"].ToString();
                    Reptmodels.Debit = row["DEBIT"].ToString();
                    Reptmodels.Credit = row["CREDIT"].ToString();
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
        public ActionResult PreviousMonthSales(PurchaseandSalestemp PurchaseandSalestemp)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSalestemp> oList = new List<PurchaseandSalestemp>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PreviousMonthSales(PurchaseandSalestemp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSalestemp Reptmodels = new PurchaseandSalestemp();
                    Reptmodels.DeptId = row["DeptId"].ToString();
                    Reptmodels.Department = row["DepartmentCode"].ToString();
                    Reptmodels.BillSeriesId = row["BillSeriesId"].ToString();
                    Reptmodels.BillDescription = row["BillDescription"].ToString();
                    Reptmodels.BillSlNo = row["BillSlNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.AccCode = row["CustAccount"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Paytype = row["Payterms"].ToString();
                    Reptmodels.Amount = row["GrandTotal"].ToString();
                    Reptmodels.SType = row["SType"].ToString();
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
        public ActionResult CurrentMonthSales(PurchaseandSalestemp PurchaseandSalestemp)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSalestemp> oList = new List<PurchaseandSalestemp>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CurrentMonthSales(PurchaseandSalestemp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSalestemp Reptmodels = new PurchaseandSalestemp();
                    Reptmodels.DeptId = row["DeptId"].ToString();
                    Reptmodels.Department = row["DepartmentCode"].ToString();
                    Reptmodels.BillSeriesId = row["BillSeriesId"].ToString();
                    Reptmodels.BillDescription = row["BillDescription"].ToString();
                    Reptmodels.BillSlNo = row["BillSlNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.AccCode = row["CustAccount"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Paytype = row["Payterms"].ToString();
                    Reptmodels.Amount = row["GrandTotal"].ToString();
                    Reptmodels.SType = row["SType"].ToString();
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
        public ActionResult WeeklySalesReturn(PurchaseandSalestemp PurchaseandSalestemp)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSalestemp> oList = new List<PurchaseandSalestemp>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WeeklySalesReturn(PurchaseandSalestemp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSalestemp Reptmodels = new PurchaseandSalestemp();
                    Reptmodels.DeptId = row["DeptId"].ToString();
                    Reptmodels.Department = row["DepartmentCode"].ToString();
                    Reptmodels.BillSeriesId = row["BillSeries"].ToString();
                    Reptmodels.BillDescription = row["BillDescription"].ToString();
                    Reptmodels.BillSlNo = row["ReturnNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.AccCode = row["CustAccount"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Paytype = row["Payterms"].ToString();
                    Reptmodels.Amount = row["GrandTotal"].ToString();
                    Reptmodels.SType = row["SType"].ToString();
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
        public ActionResult MonthlySalesReturn(PurchaseandSalestemp PurchaseandSalestemp)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSalestemp> oList = new List<PurchaseandSalestemp>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthlySalesReturn(PurchaseandSalestemp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSalestemp Reptmodels = new PurchaseandSalestemp();
                    Reptmodels.DeptId = row["DeptId"].ToString();
                    Reptmodels.Department = row["DepartmentCode"].ToString();
                    Reptmodels.BillSeriesId = row["BillSeries"].ToString();
                    Reptmodels.BillDescription = row["BillDescription"].ToString();
                    Reptmodels.BillSlNo = row["ReturnNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.AccCode = row["CustAccount"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Paytype = row["Payterms"].ToString();
                    Reptmodels.Amount = row["GrandTotal"].ToString();
                    Reptmodels.SType = row["SType"].ToString();
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
        public ActionResult DepartmentWiseSalesDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DepartmentWiseSalesDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["total"].ToString();

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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SalesManWorkItemStatus(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesManWorkItemStatus(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.Department = row["Status"].ToString();
                    Reptmodels.Amount = row["Count"].ToString();
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
        public ActionResult DasboardWorkItemStatus(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DasboardWorkItemStatus(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.Department = row["Status"].ToString();
                    Reptmodels.Amount = row["Count"].ToString();
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
        public ActionResult AdminDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AdminDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Fromdate = row["InvDate"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult SalesmanwiseSalesDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanwiseSalesDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Fromdate = row["InvDate"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ProfitAnalysisGraphReport(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProfitAnalysisGraphReport(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.GroupName = row["GrpName"].ToString();
                    Reptmodels.Profit = row["Profit"].ToString();
                    Reptmodels.ProfitPer = row["ProfitPer"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ProfitAnalysisGraphDailyReport(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProfitAnalysisGraphDailyReport(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.GroupName = row["GrpName"].ToString();
                    Reptmodels.Profit = row["Profit"].ToString();
                    Reptmodels.ProfitPer = row["ProfitPer"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.Cost = row["Cost"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult ProfitAnalysisGraphWeeklyReport(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProfitAnalysisGraphWeeklyReport(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.GroupName = row["GrpName"].ToString();
                    Reptmodels.Profit = row["Profit"].ToString();
                    Reptmodels.ProfitPer = row["ProfitPer"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.InvDate = row["WEEKOFMONTH"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult ProfitAnalysisGraphMonthlyReport(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProfitAnalysisGraphMonthlyReport(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.GroupName = row["GrpName"].ToString();
                    Reptmodels.Profit = row["Profit"].ToString();
                    Reptmodels.ProfitPer = row["ProfitPer"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult ProfitAnalysisGraphYearlyReport(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProfitAnalysisGraphYearlyReport(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.GroupName = row["GrpName"].ToString();
                    Reptmodels.Profit = row["Profit"].ToString();
                    Reptmodels.ProfitPer = row["ProfitPer"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SalesmanMonthWiseDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanMonthWiseDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Fromdate = row["InvDate"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult SalesmanMonthlyDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanMonthlyDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Fromdate = row["InvDate"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["Sales"].ToString();
                    Reptmodels.SReturn = row["SR"].ToString();
                    Reptmodels.Total = row["Total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult SalesmanYearlyDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanYearlyDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Fromdate = row["YEAR"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["Sales"].ToString();
                    Reptmodels.SReturn = row["SR"].ToString();
                    Reptmodels.Total = row["Total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult SalesmanWeekWiseDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanWeekWiseDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Fromdate = row["WeekofMonth"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["TOTAL"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SalesmanWeeklyDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanWeeklyDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Fromdate = row["WeekofMonth"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["Sales"].ToString();
                    Reptmodels.SReturn = row["SR"].ToString();
                    Reptmodels.Total = row["TOTAL"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult SalesmanwiseGraphReport(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanwiseGraphReport(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesmanId = row["SalesManId"].ToString();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["Sales"].ToString();
                    Reptmodels.SReturn = row["SReturn"].ToString();
                    Reptmodels.Total = row["Total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SalesPerformanceDashBoard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesPerformanceDashBoard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["Mon"].ToString();
                    Reptmodels.Amount = row["Sales"].ToString();
                    Reptmodels.SReturn = row["SalesReturn"].ToString();
                    Reptmodels.Total = row["Total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult SalesmanwisePeriodReport(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanwisePeriodReport(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Amount = row["Sales"].ToString();
                    Reptmodels.SReturn = row["SR"].ToString();
                    Reptmodels.Total = row["Total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SalesmanDashboard(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanDashboard(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.SalesMan = row["FirstName"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["Sales"].ToString();
                    Reptmodels.SReturn = row["SR"].ToString();
                    Reptmodels.Total = row["Total"].ToString();
                    Reptmodels.Fromdate = row["InvDate"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult AreaGroupwiseGraphReport(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AreaGroupwiseGraphReport(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.AreaGroupId = row["AreaGrpId"].ToString();
                    Reptmodels.AreaGroup = row["AreaGroup"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult BOQReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BOQReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.BOQSlNo = Convert.ToInt32(row["BOQSlNo"].ToString());
                    Reptmodels.BOQDate = row["BOQDate"].ToString();
                    Reptmodels.JobCodeId = Convert.ToInt32(row["JobCodeId"].ToString());
                    Reptmodels.JobCode = row["JobCode"].ToString();
                    Reptmodels.JobDescription = row["ProDesc"].ToString();
                    Reptmodels.LPO = row["LPO"].ToString();
                    Reptmodels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    Reptmodels.CustId = row["CustId"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.CurrencyId = row["CurrencyId"].ToString();
                    Reptmodels.FC = row["CurrencyName"].ToString();
                    Reptmodels.Comments = row["Comments"].ToString();
                    Reptmodels.EngineerId = Convert.ToInt32(row["EngineerId"].ToString());
                    Reptmodels.UserName = row["UserName"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        //Monthwise Report
        [HttpPost]
        public ActionResult PurchaseReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.AccCode = row["CustAccount"].ToString();
                    Reptmodels.SupplierId = row["SupplierId"].ToString();
                    Reptmodels.Supplier = row["CustName"].ToString();
                    Reptmodels.Terms = row["TermDescription"].ToString();
                    Reptmodels.PlaceOfSupply = row["PlaceOfSupply"].ToString();
                    Reptmodels.SupplyTo = row["Name"].ToString();
                    Reptmodels.LocnId = row["LocnId"].ToString();
                    Reptmodels.Location = row["LocationName"].ToString();
                    Reptmodels.CurrencyId = row["CurrencyId"].ToString();
                    Reptmodels.FC = row["CurrencyName"].ToString();
                    Reptmodels.CurrencyRate = row["CurrencyRate"].ToString();
                    Reptmodels.PayType = row["Payterms"].ToString();
                    Reptmodels.PurchaseType = row["PurchaseType"].ToString();
                    Reptmodels.TaxableValue = row["Taxable"].ToString();
                    Reptmodels.Roundoff = row["RoundOff"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Discount = row["BillDiscount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.FCAmount = row["FCTotal"].ToString();
                    Reptmodels.OtherCost = row["OtherCost"].ToString();
                    Reptmodels.DueDate = row["DueDate"].ToString();
                    Reptmodels.ShipDate = row["ShipDate"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();
                    Reptmodels.DeptCode = row["DepartmentCode"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
                    Reptmodels.CessAmount = row["CessAmount"].ToString();
                    Reptmodels.InvoiceTotal = row["InvoiceTotal"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult PurchaseReturnMainReport(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReturnMainReport(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["PRNo"].ToString();
                    Reptmodels.InvoDate = row["PRDate"].ToString();
                    Reptmodels.Supplier = row["CustName"].ToString();
                    Reptmodels.Terms = row["TermDescription"].ToString();
                    Reptmodels.SupplyTo = row["Name"].ToString();
                    Reptmodels.Location = row["LocationName"].ToString();
                    Reptmodels.FC = row["CurrencyName"].ToString();
                    Reptmodels.CurrencyRate = row["CurrencyRate"].ToString();
                    Reptmodels.PayType = row["Payterms"].ToString();
                    Reptmodels.PurchaseType = row["PurchaseType"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();
                    Reptmodels.InvoNo = row["PRInvoNo"].ToString();
                    Reptmodels.CustAccount = row["CustAccount"].ToString();
                    Reptmodels.Discount = row["TotalDiscount"].ToString();
                    Reptmodels.BillDiscount = row["BillDiscount"].ToString();
                    Reptmodels.CessAmount = row["BCess"].ToString();
                    Reptmodels.HFlag = row["Flag"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult PurchaseReturnSubReport(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReturnSubReport(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();

                    Reptmodels.InvoNo = row["PRNo"].ToString();
                    Reptmodels.InvoDate = row["PRDate"].ToString();
                    Reptmodels.Supplier = row["CustName"].ToString();
                    Reptmodels.Product = row["ItemCode"].ToString();
                    Reptmodels.ProductDesc = row["ItemDescription"].ToString();
                    Reptmodels.Terms = row["TermDescription"].ToString();
                    Reptmodels.SupplyTo = row["Name"].ToString();
                    Reptmodels.Location = row["LocationName"].ToString();
                    Reptmodels.FC = row["CurrencyName"].ToString();
                    Reptmodels.CurrencyRate = row["CurrencyRate"].ToString();
                    Reptmodels.PayType = row["Payterms"].ToString();
                    Reptmodels.PurchaseType = row["PurchaseType"].ToString();
                    Reptmodels.Qty = row["Quantity"].ToString();
                    Reptmodels.TotalTaxable = row["TaxableAmount"].ToString();
                    Reptmodels.TotalTax = row["TaxAmount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();

                    Reptmodels.PRInvoNo = row["PRInvoNo"].ToString();
                    Reptmodels.CustAccount = row["CustAccount"].ToString();
                    Reptmodels.ItemId = row["ItemId"].ToString();
                    Reptmodels.Batch = row["Batch"].ToString();
                    Reptmodels.Pack = row["Pack"].ToString();
                    Reptmodels.Free = row["Free"].ToString();
                    Reptmodels.Loose = row["Loose"].ToString();
                    Reptmodels.TQty = row["TQty"].ToString();
                    Reptmodels.TLQty = row["TLQty"].ToString();
                    Reptmodels.Rate = row["Rate"].ToString();
                    Reptmodels.CessAmount = row["B_Cess"].ToString();
                    Reptmodels.Discount = row["Discount"].ToString();
                    Reptmodels.HFlag = row["Flag"].ToString();
                    Reptmodels.PI_No = row["PI_No"].ToString();
                    Reptmodels.Column1 = row["GrpName"].ToString();
                    Reptmodels.Column2 = row["CategoryName"].ToString();
                    Reptmodels.Column3 = row["SubCategoryName"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SalesReturnReport(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesReturnReport(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.BillSeries = row["BillDescription"].ToString();
                    Reptmodels.InvoNo = row["ReturnNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.Supplier = row["CustoName"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.PayType = row["PayType"].ToString();
                    Reptmodels.Discount = row["BillDiscount"].ToString();
                    Reptmodels.Roundoff = row["RoundGrandTotal"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["GrandTotal"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SalesReturnSubReport(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesReturnSubReport(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.BillSeries = row["BillDescription"].ToString();
                    Reptmodels.InvoNo = row["ReturnNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.Supplier = row["CustoName"].ToString();
                    Reptmodels.Product = row["ProductCode"].ToString();
                    Reptmodels.ProductDesc = row["ProductDescr"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.PayType = row["Payterms"].ToString();
                    Reptmodels.Qty = row["Quantity"].ToString();
                    Reptmodels.TotalTaxable = row["TaxableAmount"].ToString();
                    Reptmodels.TotalTax = row["TaxAmount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ItemwisePurchaseReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemwisePurchaseReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.SupplierId = row["SupplierId"].ToString();
                    Reptmodels.Supplier = row["CustName"].ToString();
                    Reptmodels.JobNo = row["JobCode"].ToString();
                    Reptmodels.Terms = row["TermDescription"].ToString();
                    Reptmodels.Product = row["ItemCode"].ToString();
                    Reptmodels.ProductDesc = row["ItemDescription"].ToString();
                    Reptmodels.PlaceOfSupply = row["PlaceOfSupply"].ToString();
                    Reptmodels.SupplyTo = row["Name"].ToString();
                    Reptmodels.LocnId = row["LocnId"].ToString();
                    Reptmodels.Location = row["LocationName"].ToString();
                    Reptmodels.CurrencyId = row["CurrencyId"].ToString();
                    Reptmodels.FC = row["CurrencyName"].ToString();
                    Reptmodels.CurrencyRate = row["CurrencyRate"].ToString();
                    Reptmodels.PurchaseType = row["PurchaseType"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.FCAmount = row["FCAmount"].ToString();
                    Reptmodels.TotalTaxable = row["TaxableAmount"].ToString();
                    Reptmodels.TotalTax = row["TaxAmount"].ToString();
                    Reptmodels.DueDate = row["DueDate"].ToString();
                    Reptmodels.ShipDate = row["ShipDate"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult PurchaseReportGraph(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReportGraph(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.Terms = row["TermDescription"].ToString();
                    Reptmodels.Product = row["ItemCode"].ToString();
                    Reptmodels.ProductDesc = row["ItemDescription"].ToString();
                    Reptmodels.SupplyTo = row["Name"].ToString();
                    Reptmodels.Location = row["LocationName"].ToString();
                    Reptmodels.PurchaseType = row["PurchaseType"].ToString();
                    Reptmodels.Group = row["GrpName"].ToString();
                    Reptmodels.SubGroup = row["SbgrpName"].ToString();
                    Reptmodels.Category = row["CategoryName"].ToString();
                    Reptmodels.SubCategory = row["SubCategoryName"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.FCAmount = row["FCAmount"].ToString();
                    Reptmodels.TotalTaxable = row["TaxableAmount"].ToString();
                    Reptmodels.TotalTax = row["TaxAmount"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult PurchaseReportGroupwise(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReportGroupwise(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.Supplier = row["SupplierName"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.FCAmount = row["FCTotal"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
                    Reptmodels.HFlag = row["Hflag"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult PurchaseReportCategorywise(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReportCategorywise(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.Supplier = row["SupplierName"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.FCAmount = row["FCTotal"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
                    Reptmodels.HFlag = row["Hflag"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult PurchaseReportGraphwise(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReportGraphwise(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.Product = row["ItemCode"].ToString();
                    Reptmodels.ProductDesc = row["ItemDescription"].ToString();
                    Reptmodels.Group = row["GrpName"].ToString();
                    Reptmodels.SubGroup = row["SbgrpName"].ToString();
                    Reptmodels.Category = row["CategoryName"].ToString();
                    Reptmodels.SubCategory = row["SubCategoryName"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult MonthwiseReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthwiseReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();

                    Reptmodels.SupplierId = row["Supplier Code"].ToString();
                    Reptmodels.Supplier = row["Supplier Name"].ToString();
                    Reptmodels.Column1 = row["January"].ToString();
                    Reptmodels.Column2 = row["February"].ToString();
                    Reptmodels.Column3 = row["March"].ToString();
                    Reptmodels.Column4 = row["April"].ToString();
                    Reptmodels.Column5 = row["May"].ToString();
                    Reptmodels.Column6 = row["June"].ToString();
                    Reptmodels.Column7 = row["July"].ToString();
                    Reptmodels.Column8 = row["August"].ToString();
                    Reptmodels.Column9 = row["September"].ToString();
                    Reptmodels.Column10 = row["October"].ToString();
                    Reptmodels.Column11 = row["November"].ToString();
                    Reptmodels.Column12 = row["December"].ToString();
                    Reptmodels.Column13 = row["Total"].ToString();
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
        public ActionResult MonthwiseSalesReportbyCustomerGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthwiseSalesReportbyCustomerGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();

                    Reptmodels.CustId = row["Customer Code"].ToString();
                    Reptmodels.Customer = row["custname"].ToString();
                    Reptmodels.Column1 = row["January"].ToString();
                    Reptmodels.Column2 = row["February"].ToString();
                    Reptmodels.Column3 = row["March"].ToString();
                    Reptmodels.Column4 = row["April"].ToString();
                    Reptmodels.Column5 = row["May"].ToString();
                    Reptmodels.Column6 = row["June"].ToString();
                    Reptmodels.Column7 = row["July"].ToString();
                    Reptmodels.Column8 = row["August"].ToString();
                    Reptmodels.Column9 = row["September"].ToString();
                    Reptmodels.Column10 = row["October"].ToString();
                    Reptmodels.Column11 = row["November"].ToString();
                    Reptmodels.Column12 = row["December"].ToString();
                    Reptmodels.Column13 = row["Total"].ToString();
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
        public ActionResult MonthwiseItemReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthwiseItemReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();

                    Reptmodels.SupplierId = row["Supplier Code"].ToString();
                    Reptmodels.Supplier = row["Supplier Name"].ToString();
                    Reptmodels.Product = row["ItemCode"].ToString();
                    Reptmodels.ProductDesc = row["ItemDescription"].ToString();
                    Reptmodels.Column1 = row["January"].ToString();
                    Reptmodels.Column2 = row["February"].ToString();
                    Reptmodels.Column3 = row["March"].ToString();
                    Reptmodels.Column4 = row["April"].ToString();
                    Reptmodels.Column5 = row["May"].ToString();
                    Reptmodels.Column6 = row["June"].ToString();
                    Reptmodels.Column7 = row["July"].ToString();
                    Reptmodels.Column8 = row["August"].ToString();
                    Reptmodels.Column9 = row["September"].ToString();
                    Reptmodels.Column10 = row["October"].ToString();
                    Reptmodels.Column11 = row["November"].ToString();
                    Reptmodels.Column12 = row["December"].ToString();
                    Reptmodels.Column13 = row["Total"].ToString();
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
        public ActionResult MonthwiseSalesReportbyItemGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthwiseSalesReportbyItemGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.Product = row["ProductCode"].ToString();
                    Reptmodels.ProductDesc = row["ProductDescr"].ToString();
                    Reptmodels.Column1 = row["January"].ToString();
                    Reptmodels.Column2 = row["February"].ToString();
                    Reptmodels.Column3 = row["March"].ToString();
                    Reptmodels.Column4 = row["April"].ToString();
                    Reptmodels.Column5 = row["May"].ToString();
                    Reptmodels.Column6 = row["June"].ToString();
                    Reptmodels.Column7 = row["July"].ToString();
                    Reptmodels.Column8 = row["August"].ToString();
                    Reptmodels.Column9 = row["September"].ToString();
                    Reptmodels.Column10 = row["October"].ToString();
                    Reptmodels.Column11 = row["November"].ToString();
                    Reptmodels.Column12 = row["December"].ToString();
                    Reptmodels.Column13 = row["Total"].ToString();
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
        public ActionResult ItemReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.Code = row["Code"].ToString();
                    Reptmodels.AccCode = row["SuppCode"].ToString();
                    Reptmodels.ItemDesc = row["Item_Desc"].ToString();
                    Reptmodels.Location = row["Location"].ToString();
                    Reptmodels.Unit = row["Unit"].ToString();
                    Reptmodels.Rate = row["Rate"].ToString();
                    Reptmodels.Qty = row["Qty"].ToString();
                    Reptmodels.TotalTaxable = row["TaxableAmount"].ToString();
                    Reptmodels.TotalTax = row["TaxAmount"].ToString();
                    Reptmodels.NetValue = row["NetValue"].ToString();
                    Reptmodels.FCAmount = row["FCAmount"].ToString();
                    Reptmodels.CurrencyName = row["CurrencyName"].ToString();
                    Reptmodels.CurrencyRate = row["CurrencyRate"].ToString();

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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult SupplierReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SupplierReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.PurchaseType = row["PurchaseType"].ToString();
                    Reptmodels.OtherCost = row["OtherCost"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.FCAmount = row["FCTotal"].ToString();
                    Reptmodels.CurrencyName = row["CurrencyName"].ToString();
                    Reptmodels.CurrencyRate = row["CurrencyRate"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AreaReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AreaReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.Supplier = row["SupplierName"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.FCAmount = row["FCTotal"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
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
        public ActionResult AreaGroupReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AreaGroupReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.Supplier = row["SupplierName"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.FCAmount = row["FCTotal"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
                    Reptmodels.HFlag = row["Hflag"].ToString();
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
        public ActionResult AreaGroupSalesReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AreaGroupSalesReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.BillSeriesId = row["BillSeriesId"].ToString();
                    Reptmodels.BillSeries = row["BillDescription"].ToString();
                    Reptmodels.InvoNo = row["BillSlNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.CustAddress = row["CustAddress"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["GrandTotal"].ToString();
                    Reptmodels.FCAmount = row["FCGrandTotal"].ToString();
                    Reptmodels.HFlag = row["Hflag"].ToString();
                    Reptmodels.DeptId = row["DeptId"].ToString();
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
        public ActionResult LocationReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.Supplier = row["SupplierName"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.FCAmount = row["FCTotal"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
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
        public ActionResult TopSupplierReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TopSupplierReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.SupplierId = row["CustAccount"].ToString();
                    Reptmodels.Supplier = row["CustName"].ToString();
                    Reptmodels.Qty = row["Quantity"].ToString();
                    Reptmodels.Amount = row["Total"].ToString();
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
        public ActionResult TopSupplierGraphReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TopSupplierGraphReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.SupplierId = row["CustAccount"].ToString();
                    Reptmodels.Supplier = row["CustName"].ToString();
                    Reptmodels.Qty = row["Quantity"].ToString();
                    Reptmodels.Amount = row["Total"].ToString();
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
        public ActionResult TopCustomerReportGet(TopCustomerModel TopCustomerModel)
        {
            TopCustomerModel obj = new TopCustomerModel();

            List<TopCustomerModel> oList = new List<TopCustomerModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TopCustomerReportGet(TopCustomerModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TopCustomerModel Reptmodels = new TopCustomerModel();
                    Reptmodels.CustId = row["CustAccount"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Qty = row["Quantity"].ToString();
                    Reptmodels.Amount = row["Total"].ToString();
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
        public ActionResult TopCustomerAnalysisGraph(TopCustomerModel TopCustomerModel)
        {
            TopCustomerModel obj = new TopCustomerModel();

            List<TopCustomerModel> oList = new List<TopCustomerModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TopCustomerAnalysisGraph(TopCustomerModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TopCustomerModel Reptmodels = new TopCustomerModel();
                    Reptmodels.CustId = row["CustAccount"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Qty = row["Quantity"].ToString();
                    Reptmodels.Amount = row["Total"].ToString();
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

        public ActionResult DailySalesGet(DailySalesReport DailySalesReport)
        {
            DailySalesReport obj = new DailySalesReport();
            List<DailySalesReport> olist = new List<DailySalesReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.DailySalesGet(DailySalesReport, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    DailySalesReport rptModels = new DailySalesReport();
                    rptModels.BillSeriesID = dr["BillDescription"].ToString();
                    rptModels.BillSlNo = dr["BillSlNo"].ToString();
                    rptModels.PayType = dr["Payterms"].ToString();
                    rptModels.CustName = dr["CustoName"].ToString();
                    rptModels.CustAddress = dr["CustAddress"].ToString();
                    rptModels.InvDate = dr["InvDate"].ToString();
                    rptModels.InvTerms = dr["TermDescription"].ToString();
                    rptModels.DueDate = dr["InvDate"].ToString();
                    rptModels.LockID = dr["LocationName"].ToString();
                    rptModels.SalesManName = dr["FirstName"].ToString();
                    rptModels.AreaName = dr["Name"].ToString();
                    rptModels.JobNumber = dr["JobNumber"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.GroupName = dr["GrpName"].ToString();
                    rptModels.SubgroupName = dr["SbgrpName"].ToString();
                    rptModels.CategoryName = dr["CategoryName"].ToString();
                    rptModels.SubCategoryName = dr["SubCategoryName"].ToString();
                    rptModels.Department = dr["DepartmentName"].ToString();
                    rptModels.LPONumber = dr["LPONumber"].ToString();
                    rptModels.ProductCode = dr["ProductCode"].ToString();
                    rptModels.ProductDescription = dr["ProductDescr"].ToString();
                    rptModels.Unit = dr["UnitName"].ToString();
                    rptModels.Quantity = dr["ProdQty"].ToString();
                    rptModels.Discount = dr["ProdDisc"].ToString();
                    rptModels.TaxableAmount = dr["TaxableAmount"].ToString();
                    rptModels.Tax = dr["TaxPercent"].ToString();
                    rptModels.TaxAmount = dr["TaxAmount"].ToString();
                    rptModels.FCTaxAmount = dr["FCAmount"].ToString();
                    rptModels.CurrencyRate = dr["CurrencyRate"].ToString();
                    rptModels.CurrencyID = dr["CurrencyName"].ToString();
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

        public ActionResult MonthlywiseSalesGet(MonthlywiseSalesReport MonthlywiseSalesReport)
        {
            MonthlywiseSalesReport obj = new MonthlywiseSalesReport();
            List<MonthlywiseSalesReport> olist = new List<MonthlywiseSalesReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.MonthlywiseSalesGet(MonthlywiseSalesReport, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    MonthlywiseSalesReport rptModels = new MonthlywiseSalesReport();
                    rptModels.BillSeriesID = dr["BillDescription"].ToString();
                    rptModels.BillSlNo = dr["BillSlNo"].ToString();
                    rptModels.CustName = dr["CustoName"].ToString();
                    rptModels.InvDate = dr["InvDate"].ToString();
                    rptModels.SalesManName = dr["FirstName"].ToString();
                    rptModels.Amount = dr["GrandTotal"].ToString();
                    rptModels.Discount = dr["TotalDiscount"].ToString();
                    rptModels.TaxableAmount = dr["TotalTaxable"].ToString();
                    rptModels.TaxAmount = dr["TotalTax"].ToString();
                    rptModels.FCTaxAmount = dr["FCGrandTotal"].ToString();

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

        public ActionResult AreawiseSalesGet(AreawiseSalesReport AreawiseSalesReport)
        {
            AreawiseSalesReport obj = new AreawiseSalesReport();
            List<AreawiseSalesReport> olist = new List<AreawiseSalesReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.AreawiseSalesGet(AreawiseSalesReport, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AreawiseSalesReport rptModels = new AreawiseSalesReport();
                    rptModels.BillSeriesID = dr["BillSeriesID"].ToString();
                    rptModels.BillSeries = dr["BillDescription"].ToString();
                    rptModels.BillSlNo = dr["BillSlNo"].ToString();
                    rptModels.CustName = dr["CustName"].ToString();
                    rptModels.CustAddress = dr["CustAddress"].ToString();
                    rptModels.InvDate = dr["InvDate"].ToString();
                    rptModels.AreaName = dr["AreaName"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.TaxableAmount = dr["TaxableAmount"].ToString();
                    rptModels.TaxAmount = dr["TaxAmount"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();

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

        public ActionResult InvoicewiseSalesAnalysisGet(InvoicewiseSalesAnalysis InvoicewiseSalesAnalysis)
        {
            InvoicewiseSalesAnalysis obj = new InvoicewiseSalesAnalysis();
            List<InvoicewiseSalesAnalysis> olist = new List<InvoicewiseSalesAnalysis>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.InvoicewiseSalesAnalysisGet(InvoicewiseSalesAnalysis, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    InvoicewiseSalesAnalysis rptModels = new InvoicewiseSalesAnalysis();
                    rptModels.BillSeriesId = dr["BillSeriesId"].ToString();
                    rptModels.BillSeries = dr["BillDescription"].ToString();
                    rptModels.BillSlNo = dr["BillSlNo"].ToString();
                    rptModels.InvDate = dr["InvDate"].ToString();
                    rptModels.CustName = dr["CustoName"].ToString();
                    rptModels.CustAddress = dr["CustAddress"].ToString();
                    rptModels.JobNumber = dr["JobCode"].ToString();
                    rptModels.SalesManName = dr["FirstName"].ToString();
                    rptModels.GrandTotal = dr["NetSalevalue"].ToString();
                    rptModels.TaxAmount = dr["TotalTax"].ToString();
                    rptModels.TaxableAmount = dr["TotalTaxable"].ToString();
                    rptModels.Collection = dr["Rec_amount"].ToString();
                    rptModels.SalesReturn = dr["Sreturn"].ToString();
                    rptModels.AmountDue = dr["AmountDue"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();
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

        public ActionResult CustomerwiseSalesGet(CustomerwiseSalesReport CustomerwiseSalesReport)
        {
            CustomerwiseSalesReport obj = new CustomerwiseSalesReport();
            List<CustomerwiseSalesReport> olist = new List<CustomerwiseSalesReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.CustomerwiseSalesGet(CustomerwiseSalesReport, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    CustomerwiseSalesReport rptModels = new CustomerwiseSalesReport();
                    rptModels.BillSeriesID = dr["BillSeriesID"].ToString();
                    rptModels.BillSeries = dr["BillSeries"].ToString();
                    rptModels.BillSlNo = dr["BillSlNo"].ToString();
                    rptModels.PayType = dr["PayType"].ToString();
                    rptModels.InvDate = dr["InvDate"].ToString();
                    rptModels.TaxableAmount = dr["TaxableAmount"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.TaxAmount = dr["TaxAmount"].ToString();
                    rptModels.FCTaxAmount = dr["FCAmount"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();
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

        public ActionResult SalesmanwiseSalesGet(SalesmanwiseSalesReport SalesmanwiseSalesReport)
        {
            SalesmanwiseSalesReport obj = new SalesmanwiseSalesReport();
            List<SalesmanwiseSalesReport> olist = new List<SalesmanwiseSalesReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.SalesmanwiseSalesGet(SalesmanwiseSalesReport, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    SalesmanwiseSalesReport rptModels = new SalesmanwiseSalesReport();
                    //rptModels.BillSeriesID = dr["BillSeriesID"].ToString();
                    //rptModels.BillSeries = dr["BillDescription"].ToString();
                    //rptModels.BillSlNo = dr["BillSlNo"].ToString();
                    //rptModels.PayType = dr["PayType"].ToString();
                    //rptModels.CustName = dr["CustoName"].ToString();
                    //rptModels.InvDate = dr["InvDate"].ToString();
                    //rptModels.TaxableAmount = dr["TotalTaxable"].ToString();
                    //rptModels.TaxAmount = dr["TotalTax"].ToString();
                    //rptModels.Amount = dr["GrandTotal"].ToString();
                    //rptModels.FCTaxAmount = dr["FCGrandTotal"].ToString();
                    //rptModels.Dept = dr["DeptId"].ToString();


                    rptModels.SalesManName = dr["FirstName"].ToString();
                    rptModels.Sales = dr["Sales"].ToString();
                    rptModels.Disc = dr["Disc"].ToString();
                    rptModels.GrossSales = dr["GrossSales"].ToString();
                    rptModels.SReturn = dr["SReturn"].ToString();
                    rptModels.NetSales = dr["NetSales"].ToString();
                    rptModels.NetCost = dr["NetCost"].ToString();
                    rptModels.Profit = dr["Profit"].ToString();
                    rptModels.ProfitPer = dr["Profit%"].ToString();

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

        public ActionResult AreaSalesmanwiseSalesGet(AreaSalesmanwiseSalesReport AreaSalesmanwiseSalesReport)
        {
            AreaSalesmanwiseSalesReport obj = new AreaSalesmanwiseSalesReport();
            List<AreaSalesmanwiseSalesReport> olist = new List<AreaSalesmanwiseSalesReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.AreaSalesmanwiseSalesGet(AreaSalesmanwiseSalesReport, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AreaSalesmanwiseSalesReport rptModels = new AreaSalesmanwiseSalesReport();

                    rptModels.BillSeriesID = dr["BillSeriesID"].ToString();
                    rptModels.BillSeries = dr["BillSeries"].ToString();
                    rptModels.BillSlNo = dr["BillSlNo"].ToString();
                    rptModels.PayType = dr["PayType"].ToString();
                    rptModels.CustName = dr["CustName"].ToString();
                    rptModels.CustAddress = dr["CustAddress"].ToString();
                    rptModels.InvDate = dr["InvDate"].ToString();
                    // rptModels.SalesManName = dr["FirstName"].ToString();
                    rptModels.TaxableAmount = dr["TaxableAmount"].ToString();
                    rptModels.TaxAmount = dr["TaxAmount"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.FCTaxAmount = dr["FCAmount"].ToString();
                    rptModels.HFlag = dr["Hflag"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();
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

        public ActionResult AreaCustomerwiseSalesGet(AreaCustomerwiseSalesReport AreaCustomerwiseSalesReport)
        {
            AreaCustomerwiseSalesReport obj = new AreaCustomerwiseSalesReport();
            List<AreaCustomerwiseSalesReport> olist = new List<AreaCustomerwiseSalesReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.AreaCustomerwiseSalesGet(AreaCustomerwiseSalesReport, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    AreaCustomerwiseSalesReport rptModels = new AreaCustomerwiseSalesReport();
                    rptModels.BillSeriesID = dr["BillSeriesID"].ToString();
                    rptModels.BillSeries = dr["BillSeries"].ToString();
                    rptModels.BillSlNo = dr["BillSlNo"].ToString();
                    rptModels.PayType = dr["PayType"].ToString();
                    rptModels.SalesmanName = dr["Salesman"].ToString();
                    rptModels.InvDate = dr["InvDate"].ToString();
                    rptModels.TaxableAmount = dr["TaxableAmount"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.TaxAmount = dr["TaxAmount"].ToString();
                    rptModels.FCTaxAmount = dr["FCAmount"].ToString();
                    rptModels.HFlag = dr["Hflag"].ToString();
                    rptModels.DeptId = dr["DeptId"].ToString();
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
        public ActionResult SalesmanCustomerwiseSalesGet(SalesmanCustomerwiseSalesReport SalesmanCustomerwiseSalesReport)
        {
            SalesmanCustomerwiseSalesReport obj = new SalesmanCustomerwiseSalesReport();
            List<SalesmanCustomerwiseSalesReport> olist = new List<SalesmanCustomerwiseSalesReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.SalesmanCustomerwiseSalesGet(SalesmanCustomerwiseSalesReport, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    SalesmanCustomerwiseSalesReport rptModels = new SalesmanCustomerwiseSalesReport();
                    rptModels.BillSeriesID = dr["BillSeriesID"].ToString();
                    rptModels.BillSeries = dr["BillSeries"].ToString();
                    rptModels.BillSlNo = dr["BillSlNo"].ToString();
                    rptModels.PayType = dr["PayType"].ToString();
                    rptModels.CustName = dr["CustomerName"].ToString();
                    rptModels.CustAddress = dr["CustAddress"].ToString();
                    rptModels.InvDate = dr["InvDate"].ToString();
                    rptModels.TaxableAmount = dr["TaxableAmount"].ToString();
                    rptModels.Amount = dr["Amount"].ToString();
                    rptModels.TaxAmount = dr["TaxAmount"].ToString();
                    rptModels.FCAmount = dr["FCAmount"].ToString();
                    rptModels.HFlag = dr["Hflag"].ToString();
                    rptModels.DeptId = dr["DeptID"].ToString();
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
        public ActionResult EmployeeDocumentExpiryGet(EmployeeDocumentExpiryReport EmployeeDocumentExpiryReport)
        {
            EmployeeDocumentExpiryReport obj = new EmployeeDocumentExpiryReport();
            List<EmployeeDocumentExpiryReport> olist = new List<EmployeeDocumentExpiryReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.EmployeeDocumentExpiryGet(EmployeeDocumentExpiryReport, dbName);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    EmployeeDocumentExpiryReport rptModels = new EmployeeDocumentExpiryReport();
                    rptModels.EmpCode = dr["EmpCode"].ToString();
                    rptModels.EmpName = dr["Name"].ToString();
                    rptModels.DOB = dr["DOB"].ToString();
                    rptModels.Mobile = dr["Mobile"].ToString();
                    rptModels.Email = dr["Email"].ToString();
                    rptModels.Gender = dr["Gender"].ToString();
                    rptModels.DateofJoin = dr["DateofJoin"].ToString();
                    rptModels.PassportNo = dr["PassportNo"].ToString();
                    rptModels.FromDate = dr["IssuedOn"].ToString();
                    rptModels.ToDate = dr["Expiry"].ToString();
                    rptModels.IDType = dr["IDType"].ToString();

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
        public ActionResult PurchaseOrderReminder(FastandNonMovingModel FastandNonMovingModel)
        {
            FastandNonMovingModel obj = new FastandNonMovingModel();

            List<FastandNonMovingModel> oList = new List<FastandNonMovingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderReminder(FastandNonMovingModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FastandNonMovingModel Reptmodels = new FastandNonMovingModel();
                    Reptmodels.ItemCode = row["ProductCode"].ToString();
                    Reptmodels.ItemDesc = row["ProductDescr"].ToString();
                    Reptmodels.GroupName = row["GrpCode"].ToString();
                    Reptmodels.SubGroupName = row["SbgrpName"].ToString();
                    Reptmodels.CategoryName = row["CategoryCode"].ToString();
                    Reptmodels.SubCategoryName = row["SubCategoryName"].ToString();
                    Reptmodels.Qty = row["Quantity"].ToString();
                    Reptmodels.AvgCost = row["avgcost"].ToString();
                    Reptmodels.Amount = row["Total"].ToString();
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
        public ActionResult SalesmanDashBoardPurchaseList(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = ItemMasterModel.SalesmanDashBoardPurchaseList(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["ItemDescription"].ToString();
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.InHandQty = Convert.ToDecimal(row["Quantity"].ToString());

                    oList.Add(MModels);
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
        public ActionResult ProfitAnalysisSalesReturn(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProfitAnalysisSalesReturn(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.SType = row["SType"].ToString();
                    Reptmodels.BillSeriesId = row["BillSeriesId"].ToString();
                    Reptmodels.BillSeries = row["BillDescription"].ToString();
                    Reptmodels.InvoNo = row["BillSlNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.SalesValue = row["SalesValue"].ToString();
                    Reptmodels.VATValue = row["VATValue"].ToString();
                    Reptmodels.NetSalesValue = row["NetSalesValue"].ToString();
                    Reptmodels.Cost = row["Cost"].ToString();
                    Reptmodels.Profit = row["Profit"].ToString();
                    Reptmodels.ProfitPercentage = row["ProfitPer"].ToString();
                    Reptmodels.DeptId = row["DeptID"].ToString();
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
        public ActionResult ProfitAnalysis(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProfitAnalysis(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.BillSeriesId = row["BillSeriesId"].ToString();
                    Reptmodels.BillSeries = row["BillDescription"].ToString();
                    Reptmodels.InvoNo = row["BillSlNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.SalesValue = row["SalesValue"].ToString();
                    Reptmodels.VATValue = row["VATValue"].ToString();
                    Reptmodels.NetSalesValue = row["NetSalesValue"].ToString();
                    Reptmodels.Cost = row["Cost"].ToString();
                    Reptmodels.Profit = row["Profit"].ToString();
                    Reptmodels.ProfitPercentage = row["ProfitPer"].ToString();
                    Reptmodels.DeptId = row["DeptId"].ToString();
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
        public ActionResult FastMovingItemsGet(FastandNonMovingModel FastandNonMovingModel)
        {
            FastandNonMovingModel obj = new FastandNonMovingModel();

            List<FastandNonMovingModel> oList = new List<FastandNonMovingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.FastMovingItemsGet(FastandNonMovingModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FastandNonMovingModel Reptmodels = new FastandNonMovingModel();
                    Reptmodels.ItemCode = row["ProductCode"].ToString();
                    Reptmodels.ItemDesc = row["ProductDescr"].ToString();
                    Reptmodels.GroupName = row["GrpCode"].ToString();
                    Reptmodels.SubGroupName = row["SbgrpName"].ToString();
                    Reptmodels.CategoryName = row["CategoryCode"].ToString();
                    Reptmodels.SubCategoryName = row["SubCategoryName"].ToString();
                    Reptmodels.Qty = row["Quantity"].ToString();
                    Reptmodels.AvgCost = row["avgcost"].ToString();
                    Reptmodels.Amount = row["Total"].ToString();
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
        public ActionResult FastMovingItemsDashboard(FastandNonMovingModel FastandNonMovingModel)
        {
            FastandNonMovingModel obj = new FastandNonMovingModel();

            List<FastandNonMovingModel> oList = new List<FastandNonMovingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.FastMovingItemsDashboard(FastandNonMovingModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FastandNonMovingModel Reptmodels = new FastandNonMovingModel();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemDesc = row["Description"].ToString();
                    Reptmodels.Qty = row["Quantity"].ToString();
                    Reptmodels.AvgCost = row["AvgCost"].ToString();
                    Reptmodels.Amount = row["StockValue"].ToString();
                    Reptmodels.Stock = row["StockQty"].ToString();
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
        public ActionResult NonMovingItemsDashboard(FastandNonMovingModel FastandNonMovingModel)
        {
            FastandNonMovingModel obj = new FastandNonMovingModel();

            List<FastandNonMovingModel> oList = new List<FastandNonMovingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.NonMovingItemsDashboard(FastandNonMovingModel, dbName);
                if(dsDataSet != null)
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FastandNonMovingModel Reptmodels = new FastandNonMovingModel();
                    Reptmodels.ItemCode = row["CODE"].ToString();
                    Reptmodels.ItemDesc = row["DESC"].ToString();
                    Reptmodels.Qty = row["QTY_SOLD"].ToString();
                    Reptmodels.AvgCost = row["COST"].ToString();
                    Reptmodels.Stock = row["STOCK"].ToString();
                    Reptmodels.GroupName = row["GROUPName"].ToString();
                    Reptmodels.SubGroupName = row["SGROUPName"].ToString();
                    Reptmodels.CategoryName = row["CATEGName"].ToString();
                    Reptmodels.SubCategoryName = row["SCATEGName"].ToString();
                    Reptmodels.ImportDate = row["ImportPurchaseDate"].ToString();
                    Reptmodels.LocalDate = row["LocalPurchaseDate"].ToString();
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
        public ActionResult NonMovingItemsGet(FastandNonMovingModel FastandNonMovingModel)
        {
            FastandNonMovingModel obj = new FastandNonMovingModel();

            List<FastandNonMovingModel> oList = new List<FastandNonMovingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.NonMovingItemsGet(FastandNonMovingModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FastandNonMovingModel Reptmodels = new FastandNonMovingModel();
                    Reptmodels.ItemCode = row["CODE"].ToString();
                    Reptmodels.ItemDesc = row["DESC"].ToString();
                    Reptmodels.GroupName = row["GRPNAME"].ToString();
                    Reptmodels.SubGroupName = row["SUBGRPNAME"].ToString();
                    Reptmodels.CategoryName = row["CATNAME"].ToString();
                    Reptmodels.SubCategoryName = row["SUBCATNAME"].ToString();
                    Reptmodels.Qty = row["QTY_SOLD"].ToString();
                    Reptmodels.AvgCost = row["COST"].ToString();
                    Reptmodels.Amount = row["SALE PRICE"].ToString();
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
        public ActionResult GSTSales(GSTModel GSTModel)
        {
            GSTModel obj = new GSTModel();

            List<GSTModel> oList = new List<GSTModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GSTSales(GSTModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    GSTModel Reptmodels = new GSTModel();
                    Reptmodels.BillNo = row["Sbill_Slno"].ToString();
                    Reptmodels.BillSeriesId = row["billSerid"].ToString();
                    Reptmodels.BillSeries = row["BillSeries"].ToString();
                    Reptmodels.BillDate = row["BillDate"].ToString();
                    Reptmodels.Customer = row["customer"].ToString();
                    Reptmodels.Amount0 = row["Amount0"].ToString();
                    Reptmodels.Amount5 = row["Amount5"].ToString();
                    Reptmodels.GST5 = row["GSt5"].ToString();
                    Reptmodels.Amount12 = row["Amount12"].ToString();
                    Reptmodels.GST12 = row["GSt12"].ToString();
                    Reptmodels.Amount18 = row["Amount18"].ToString();
                    Reptmodels.GST18 = row["GSt18"].ToString();
                    Reptmodels.Amount28 = row["Amount28"].ToString();
                    Reptmodels.GST28 = row["GSt28"].ToString();
                    Reptmodels.DeptId = row["DeptId"].ToString();

                    Reptmodels.Taxable = row["Taxable"].ToString();
                    Reptmodels.Tax = row["Tax"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();

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
        public ActionResult GSTPurchase(GSTModel GSTModel)
        {
            GSTModel obj = new GSTModel();

            List<GSTModel> oList = new List<GSTModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GSTPurchase(GSTModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    GSTModel Reptmodels = new GSTModel();
                    Reptmodels.BillNo = row["Sbill_Slno"].ToString();
                    Reptmodels.BillSeries = row["BillSeries"].ToString();
                    Reptmodels.BillDate = row["BillDate"].ToString();
                    Reptmodels.Customer = row["customer"].ToString();
                    Reptmodels.Amount0 = row["Amount0"].ToString();
                    Reptmodels.Amount5 = row["Amount5"].ToString();
                    Reptmodels.GST5 = row["GSt5"].ToString();
                    Reptmodels.Amount12 = row["Amount12"].ToString();
                    Reptmodels.GST12 = row["GSt12"].ToString();
                    Reptmodels.Amount18 = row["Amount18"].ToString();
                    Reptmodels.GST18 = row["GSt18"].ToString();
                    Reptmodels.Amount28 = row["Amount28"].ToString();
                    Reptmodels.GST28 = row["GSt28"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
                    Reptmodels.roundof = row["Rof"].ToString();

                    Reptmodels.Taxable = row["Taxable"].ToString();
                    Reptmodels.Tax = row["Tax"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();


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
        public ActionResult CustomerEnquiryMain(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerEnquiryMain(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["EnquiryNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["GrandTotal"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.PhoneNumber = row["PhoneNumber"].ToString();
                    Reptmodels.CustAddress = row["CustAddress"].ToString();
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
        public ActionResult CustomerEnquirySub(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerEnquirySub(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["EnquiryNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.ItemCode = row["ProductCode"].ToString();
                    Reptmodels.ItemName = row["ProductDescr"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult QuotationEntryMain(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntryMain(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["QuotationNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.CustAddress = row["CustAddress"].ToString();
                    Reptmodels.PhoneNumber = row["PhoneNumber"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["GrandTotal"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult QuotationEntrySub(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntrySub(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["QuotationNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.ItemCode = row["ProductCode"].ToString();
                    Reptmodels.ItemName = row["ProductDescr"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult SalesOrderMain(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderMain(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["OrderNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.CustAddress = row["CustAddress"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["GrandTotal"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult SalesOrderSub(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderSub(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["OrderNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.ItemCode = row["ProductCode"].ToString();
                    Reptmodels.ItemName = row["ProductDescr"].ToString();
                    Reptmodels.Customer = row["CustoName"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult PurchaseOrderMain(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderMain(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["OrderNo"].ToString();
                    Reptmodels.InvDate = row["OrderDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult PurchasePerformaMain(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchasePerformaMain(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["PPNo"].ToString();
                    Reptmodels.DeliveryNo = row["DONo"].ToString();
                    Reptmodels.InvDate = row["PPDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Paytype = row["Payterms"].ToString();
                    Reptmodels.PurchaseType = row["PurchaseType"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult PurchaseOrderSub(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderSub(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["OrderNo"].ToString();
                    Reptmodels.InvDate = row["OrderDate"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["ItemDescription"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult PurchasePerformaSub(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchasePerformaSub(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["PPNo"].ToString();
                    Reptmodels.DeliveryNo = row["DONo"].ToString();
                    Reptmodels.InvDate = row["PPDate"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["ItemDescription"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.PurchaseType = row["PurchaseType"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult PurchaseEnquiryMain(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEnquiryMain(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["EnquiryNo"].ToString();
                    Reptmodels.InvDate = row["EnquiryDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult PurchaseEnquirySub(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEnquirySub(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["EnquiryNo"].ToString();
                    Reptmodels.InvDate = row["EnquiryDate"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["ItemDescription"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult MRVPurchaseMain(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRVPurchaseMain(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["MRVNo"].ToString();
                    Reptmodels.InvDate = row["MRVDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.TaxableAmount = row["TotalTaxable"].ToString();
                    Reptmodels.TaxAmount = row["TotalTax"].ToString();
                    Reptmodels.Amount = row["BaseTotal"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult MRVPurchaseSub(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRVPurchaseSub(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["MRVNo"].ToString();
                    Reptmodels.InvDate = row["MRVDate"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["ItemDescription"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.TaxableAmount = row["TaxableAmount"].ToString();
                    Reptmodels.TaxAmount = row["TaxAmount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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
        public ActionResult DetailedProduction(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DetailedProduction(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.InvoiceNo = row["ProEntryNo"].ToString();
                    Reptmodels.InvDate = row["ProEntryDate"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["ItemDescription"].ToString();
                    Reptmodels.Location = row["Location"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.Price = row["Price"].ToString();
                    Reptmodels.Amount = row["Total"].ToString();
                    Reptmodels.OtherCost = row["TotalOtherCost"].ToString();
                    Reptmodels.JobCode = row["JobCode"].ToString();
                    Reptmodels.Department = row["Department"].ToString();
                    Reptmodels.ProEntryNo = row["ProEntryNooo"].ToString();
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
        public ActionResult MonthwiseSalesStockQuery(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthwiseSalesStockQuery(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.ItemId = row["ProductId"].ToString();
                    // Reptmodels.ItemCode = row["ProductCode"].ToString();
                    // Reptmodels.ItemName = row["ProductDescr"].ToString();
                    Reptmodels.Year = row["YEAR"].ToString();
                    Reptmodels.Column1 = row["January"].ToString();
                    Reptmodels.Column2 = row["February"].ToString();
                    Reptmodels.Column3 = row["March"].ToString();
                    Reptmodels.Column4 = row["April"].ToString();
                    Reptmodels.Column5 = row["May"].ToString();
                    Reptmodels.Column6 = row["June"].ToString();
                    Reptmodels.Column7 = row["July"].ToString();
                    Reptmodels.Column8 = row["August"].ToString();
                    Reptmodels.Column9 = row["September"].ToString();
                    Reptmodels.Column10 = row["October"].ToString();
                    Reptmodels.Column11 = row["November"].ToString();
                    Reptmodels.Column12 = row["December"].ToString();
                    Reptmodels.Column13 = row["Total"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult MonthwisePurchaseStockQuery(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthwisePurchaseStockQuery(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.ItemId = row["Itemid"].ToString();
                    //Reptmodels.ItemCode = row["ItemCode"].ToString();
                    //Reptmodels.ItemName = row["ItemDescription"].ToString();
                    Reptmodels.Year = row["YEAR"].ToString();
                    Reptmodels.Column1 = row["January"].ToString();
                    Reptmodels.Column2 = row["February"].ToString();
                    Reptmodels.Column3 = row["March"].ToString();
                    Reptmodels.Column4 = row["April"].ToString();
                    Reptmodels.Column5 = row["May"].ToString();
                    Reptmodels.Column6 = row["June"].ToString();
                    Reptmodels.Column7 = row["July"].ToString();
                    Reptmodels.Column8 = row["August"].ToString();
                    Reptmodels.Column9 = row["September"].ToString();
                    Reptmodels.Column10 = row["October"].ToString();
                    Reptmodels.Column11 = row["November"].ToString();
                    Reptmodels.Column12 = row["December"].ToString();
                    Reptmodels.Column13 = row["Total"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult LocationTransfer(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransfer(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.LocTransferId = row["LocTransId"].ToString();
                    Reptmodels.InvDate = row["TransferDate"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["Description"].ToString();
                    Reptmodels.ItemKey = row["ItemKey"].ToString();
                    Reptmodels.FromLocation = row["FromLocation"].ToString();
                    Reptmodels.ToLocation = row["ToLocation"].ToString();
                    Reptmodels.Container = row["Model1"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult FastMovingLocationTransfer(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.FastMovingLocationTransfer(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.LocTransferId = row["LocTransId"].ToString();
                    Reptmodels.InvDate = row["TransferDate"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["Description"].ToString();
                    Reptmodels.ItemKey = row["ItemKey"].ToString();
                    Reptmodels.FromLocation = row["FromLocation"].ToString();
                    Reptmodels.ToLocation = row["ToLocation"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult NonMovingLocationTransfer(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.NonMovingLocationTransfer(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.LocTransferId = row["LocTransId"].ToString();
                    Reptmodels.InvDate = row["TransferDate"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["Description"].ToString();
                    Reptmodels.ItemKey = row["ItemKey"].ToString();
                    Reptmodels.FromLocation = row["FromLocation"].ToString();
                    Reptmodels.ToLocation = row["ToLocation"].ToString();
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

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult LocationTransferMain(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransferMain(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.LocTransferId = row["trNo"].ToString();
                    Reptmodels.InvDate = row["TRDate"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["Description"].ToString();
                    Reptmodels.FromLocation = row["FromLocationName"].ToString();
                    Reptmodels.ToLocation = row["ToLocationName"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult OrderBouncingReport(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OrderBouncingReport(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.OrderBouncingId = row["OrderBouncingId"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["Description"].ToString();
                    Reptmodels.Remarks = row["Remarks"].ToString();
                    Reptmodels.Quantity = row["Quantity"].ToString();
                    Reptmodels.User = row["UserName"].ToString();
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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult PackingHistoryReport(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingHistoryReport(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.DeptId = row["DeptId"].ToString();
                    Reptmodels.SalesDeptId = row["SalesDept"].ToString();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.DeliveryNo = row["DeliveryNo"].ToString();
                    Reptmodels.BillSeriesId = row["BillSeriesId"].ToString();
                    Reptmodels.BillSeries = row["BillDescription"].ToString();
                    Reptmodels.InvoiceNo = row["BillSlNo"].ToString();
                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.InvQty = row["InvoiceQuantity"].ToString();
                    Reptmodels.IssuedQty = row["IssuedQuantity"].ToString();
                    Reptmodels.Salesman = row["SalesMan"].ToString();
                    Reptmodels.Balance = row["Diffrence"].ToString();
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
        public ActionResult PackingHistoryDetailedReport(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingHistoryDetailedReport(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.DeptId = row["DeptId"].ToString();
                    Reptmodels.SalesDeptId = row["SalesDept"].ToString();
                    Reptmodels.BillSeriesId = row["BillSeriesId"].ToString();
                    Reptmodels.InvoiceNo = row["BillSlNo"].ToString();
                    Reptmodels.DeliveryNo = row["DeliveryNo"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["ItemDescription"].ToString();
                    Reptmodels.Location = row["LocationName"].ToString();
                    Reptmodels.InvQty = row["InvoiceQty"].ToString();
                    Reptmodels.IssuedQty = row["IssuedQty"].ToString();
                    Reptmodels.Balance = row["Diffrence"].ToString();
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
        public ActionResult LocationTransferUsedCars(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransferUsedCars(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.ChasisNo = row["ChasisNo"].ToString();
                    Reptmodels.Description = row["Description"].ToString();
                    Reptmodels.Make = row["Make"].ToString();
                    Reptmodels.Made = row["Made"].ToString();
                    Reptmodels.Model = row["Model"].ToString();
                    Reptmodels.Color = row["Colour"].ToString();
                    Reptmodels.FromLocation = row["FromLocation"].ToString();
                    Reptmodels.ToLocation = row["ToLocation"].ToString();
                    Reptmodels.Year = row["Year"].ToString();
                    Reptmodels.LotNumber = row["LotNumber"].ToString();
                    Reptmodels.Key = row["Key"].ToString();
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




        public ActionResult DepartmentWiseSalesDashboard1(PurchaseandSales PurchaseandSales)
        {
            PurchaseandSales obj = new PurchaseandSales();

            List<PurchaseandSales> oList = new List<PurchaseandSales>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DepartmentWiseSalesDashboard1(PurchaseandSales, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseandSales Reptmodels = new PurchaseandSales();
                    Reptmodels.Department = row["DepartmentName"].ToString();
                    Reptmodels.Amount = row["total"].ToString();

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

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult EmployeeAttendanceReport(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeAttendanceReport(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.EmpCode = row["EMPCODE"].ToString();
                    Reptmodels.EmpName = row["Name"].ToString();
                    Reptmodels.AttendanceDate = row["AtendanceDate"].ToString();
                    Reptmodels.InTime = row["InTime"].ToString();
                    Reptmodels.OutTime = row["OutTime"].ToString();
                    Reptmodels.Workinghrs = row["TotalWorkingHrs"].ToString();
                    Reptmodels.User = row["UserName"].ToString();
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
        public ActionResult AgeingUsedCars(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AgeingUsedCars(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemName = row["ItemDescription"].ToString();
                    Reptmodels.InvDate = row["ContArrivalDate"].ToString();
                    Reptmodels.Cost = row["Cost"].ToString();
                    Reptmodels.ThirtyDays = row["1_30_DAYS"].ToString();
                    Reptmodels.SixtyDays = row["31_60_DAYS"].ToString();
                    Reptmodels.NinetyDays = row["61_90_DAYS"].ToString();
                    Reptmodels.ObseleteItem = row["Obselete Item"].ToString();
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
        public ActionResult EmployeeAttendanceSummaryReport(ReportModel ReportModel)
        {
            ReportModel obj = new ReportModel();

            List<ReportModel> oList = new List<ReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeAttendanceSummaryReport(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReportModel Reptmodels = new ReportModel();
                    Reptmodels.EmpCode = row["EMPCODE"].ToString();
                    Reptmodels.EmpName = row["Name"].ToString();
                    Reptmodels.AttendanceDate = row["AtendanceDate"].ToString();
                    Reptmodels.InTime = row["InTime"].ToString();
                    Reptmodels.OutTime = row["OutTime"].ToString();
                    Reptmodels.Workinghrs = row["TotalWorkingHrs"].ToString();
                    Reptmodels.User = row["UserName"].ToString();
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
        public ActionResult MonthwiseExpenseAnalysis(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MonthwiseExpenseAnalysis(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();

                    Reptmodels.AccCode = row["AccCode"].ToString();
                    Reptmodels.ItemDesc = row["ACCOUNT_NAME"].ToString();
                    Reptmodels.Column1 = row["January"].ToString();
                    Reptmodels.Column2 = row["February"].ToString();
                    Reptmodels.Column3 = row["March"].ToString();
                    Reptmodels.Column4 = row["April"].ToString();
                    Reptmodels.Column5 = row["May"].ToString();
                    Reptmodels.Column6 = row["June"].ToString();
                    Reptmodels.Column7 = row["July"].ToString();
                    Reptmodels.Column8 = row["August"].ToString();
                    Reptmodels.Column9 = row["September"].ToString();
                    Reptmodels.Column10 = row["October"].ToString();
                    Reptmodels.Column11 = row["November"].ToString();
                    Reptmodels.Column12 = row["December"].ToString();
                    Reptmodels.Column13 = row["Total"].ToString();
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
        public ActionResult TransactionDateDiffGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TransactionDateDiffGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();

                    Reptmodels.InvoNo = row["BillNo"].ToString();
                    Reptmodels.InvoDate = row["InvDate"].ToString();
                    Reptmodels.SType = row["TransType"].ToString();
                    Reptmodels.CustName = row["CustName"].ToString();
                    Reptmodels.UserName = row["Name"].ToString();
                    Reptmodels.EndDate = row["EDate"].ToString();
                    Reptmodels.Dept = row["DepartmentCode"].ToString();
                    Reptmodels.Amount = row["Total"].ToString();
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
        public ActionResult PurchaseStockInReportGet(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseStockInReportGet(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.PurchaseSlNo = row["SlNo"].ToString();
                    Reptmodels.InvoNo = row["InvoNo"].ToString();
                    Reptmodels.InvoDate = row["InvoDate"].ToString();
                    Reptmodels.AccCode = row["CustAccount"].ToString();
                    Reptmodels.SupplierId = row["SupplierId"].ToString();
                    Reptmodels.Supplier = row["CustName"].ToString();
                    Reptmodels.Terms = row["TermDescription"].ToString();
                    Reptmodels.PlaceOfSupply = row["PlaceOfSupply"].ToString();
                    Reptmodels.SupplyTo = row["Name"].ToString();
                    Reptmodels.LocnId = row["LocnId"].ToString();
                    Reptmodels.Location = row["LocationName"].ToString();
                    Reptmodels.CurrencyId = row["CurrencyId"].ToString();
                    Reptmodels.FC = row["CurrencyName"].ToString();
                    Reptmodels.CurrencyRate = row["CurrencyRate"].ToString();
                    Reptmodels.PayType = row["Payterms"].ToString();
                    Reptmodels.PurchaseType = row["PurchaseType"].ToString();
                    Reptmodels.TaxableValue = row["Taxable"].ToString();
                    Reptmodels.Roundoff = row["RoundOff"].ToString();
                    Reptmodels.TotalTaxable = row["TotalTaxable"].ToString();
                    Reptmodels.TotalTax = row["TotalTax"].ToString();
                    Reptmodels.Discount = row["BillDiscount"].ToString();
                    Reptmodels.Amount = row["Amount"].ToString();
                    Reptmodels.FCAmount = row["FCTotal"].ToString();
                    Reptmodels.OtherCost = row["OtherCost"].ToString();
                    Reptmodels.DueDate = row["DueDate"].ToString();
                    Reptmodels.ShipDate = row["ShipDate"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();
                    Reptmodels.DeptCode = row["DepartmentCode"].ToString();
                    Reptmodels.DeptId = row["DepartmentId"].ToString();
                    Reptmodels.CessAmount = row["CessAmount"].ToString();
                    Reptmodels.InvoiceTotal = row["InvoiceTotal"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}