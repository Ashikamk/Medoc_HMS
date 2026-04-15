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
    public class SalesReportController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: SalesReport
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult salesreportsub()
        {
            return View();
        }
        public ActionResult salesreportsubproc()
        {
            return View();
        }
        public ActionResult ItemwiseReportSalesNew()
        {
            return View();
        }
        public ActionResult ProfitAnalysisGroupwise()
        {
            return View();
        }
        public ActionResult BelowCostReport()
        {
            return View();
        }
        public ActionResult StockOutReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult BelowCostReportGets(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BelowCostReportGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.DeptId = row["DeptId"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.BillSeriesId = row["BillSeriesId"].ToString();
                    MModels.Billdescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustoName = row["CustoName"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();

                    MModels.ItemId = row["ProductId"].ToString();
                    MModels.ItemCode = row["ProductCode"].ToString();
                    MModels.ItemDescription = row["ProductDescr"].ToString();
                    MModels.Unit = row["UnitName"].ToString();
                    MModels.Quantity = row["ProdQty"].ToString();
                    MModels.Cost = Convert.ToDecimal(row["AverageCost"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
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
        public ActionResult ItemwiseReportSalesSummaryGets(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemwiseReportSalesSummaryGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.Billdescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.AccCode = row["CustAccount"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustoName = row["CustName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.FirstName = row["Salesman"].ToString();
                    MModels.SalesAmount = Convert.ToDecimal(row["Amount"].ToString());
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
        public ActionResult DailyPurchaseGets(ModelSalesReport ModelSalesReport)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DailyPurchaseGets(ModelSalesReport, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.DeptId = row["DepartmentId"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.SlNo = row["SlNo"].ToString();
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.InvDate = row["InvoDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.CustoName = row["CustName"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.PayTerms = row["Payterms"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["BaseTotal"].ToString());
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
        public ActionResult ItemwiseReportSalesDetailsGets(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemwiseReportSalesDetailsGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.Billdescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.AccCode = row["CustAccount"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustoName = row["CustName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.FirstName = row["Salesman"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDesc"].ToString();
                    MModels.Name = row["Area"].ToString();
                    MModels.TermDescription = row["Terms"].ToString();
                    MModels.PayTerms = row["PayType"].ToString();
                    MModels.Jobcode = row["JobCode"].ToString();
                    MModels.LPONumber = row["TRNNo"].ToString();
                    MModels.TotalTaxable = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.BillDiscount = Convert.ToDecimal(row["Disc"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.CurrencyName = row["Currency"].ToString();
                    MModels.CurrencyRate = row["CurrencyRate"].ToString();
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.Group = row["GroupName"].ToString();
                    MModels.SubGroup = row["SubGroup"].ToString();
                    MModels.Category = row["Category"].ToString();
                    MModels.SubCategory = row["SubCategory"].ToString();
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
        public ActionResult ProfitAnalysisGroupwiseReportGets(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProfitAnalysisGroupwiseReportGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.GroupId = row["GroupId"].ToString();
                    MModels.Group = row["GrpName"].ToString();
                    MModels.SalesQty = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Cost = Convert.ToDecimal(row["Cost"].ToString());
                    MModels.Profit = Convert.ToDecimal(row["Profit"].ToString());
                    MModels.ProfitPer = Convert.ToDecimal(row["ProfitPer"].ToString());
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
        public ActionResult salesreportGetandGetsproc(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.salesreportGetandGetsproc(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.SType = row["SType"].ToString();
                    MModels.BillSeriesId = row["BillSeriesId"].ToString();
                    MModels.Billdescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.CustoName = row["CustoName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.Code = row["Code"].ToString();
                    MModels.Name = row["Name"].ToString();
                    MModels.TermDescription = row["TermDescription"].ToString();
                    MModels.PayTerms = row["PayTerms"].ToString();
                    MModels.Jobcode = row["Jobcode"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.BillDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.SalesValue = Convert.ToDecimal(row["SalesValue"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.RoundGrandTotal = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["SalesAmount"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = row["CurrencyRate"].ToString();
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.DeptId = row["DeptId"].ToString();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.LocId = row["LocId"].ToString();
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.Status = row["Payment"].ToString();
                    MModels.ReceivedAmount = Convert.ToDecimal(row["ReceivedAmount"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
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
        public ActionResult salesreportGetandGets(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.salesreportGetandGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.SType = row["SType"].ToString();
                    MModels.BillSeriesId = row["BillSeriesId"].ToString();
                    MModels.Billdescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.CustoName = row["CustoName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.Code = row["Code"].ToString();
                    MModels.Name = row["Name"].ToString();
                    MModels.TermDescription = row["TermDescription"].ToString();
                    MModels.PayTerms = row["PayTerms"].ToString();
                    MModels.Jobcode = row["Jobcode"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.BillDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.SalesValue = Convert.ToDecimal(row["SalesValue"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.RoundGrandTotal = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["SalesAmount"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = row["CurrencyRate"].ToString();
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.DeptId = row["DeptId"].ToString();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.LocId = row["LocId"].ToString();
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.Status = row["Payment"].ToString();
                    MModels.ReceivedAmount = Convert.ToDecimal(row["ReceivedAmount"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
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
        public ActionResult salesreportGetandGetsmainMointhly(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.salesreportGetandGetsmainMointhly(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.InvDate = row["InvoiceDate"].ToString();                    
                    MModels.TotalTaxable = Convert.ToDecimal(row["Taxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["SalesAmount"].ToString());
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
        public ActionResult salesreportGetandGetsmain(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.salesreportGetandGetsmain(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.SType = row["SType"].ToString();
                    MModels.BillSeriesId = row["BillSeriesId"].ToString();
                    MModels.DeptId = row["DeptId"].ToString();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.Billdescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.CustoName = row["CustoName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.Code = row["Code"].ToString();
                    MModels.SalesAmount = Convert.ToDecimal(row["SalesAmount"].ToString());
                    MModels.SpecialAmount = Convert.ToDecimal(row["SplFee"].ToString());
                    MModels.ProcedAount = Convert.ToDecimal(row["ProceAmount"].ToString());
                    
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
        public ActionResult salesreportGetandGetsSummary(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.salesreportGetandGetsSummary(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.InvDate = row["InvVDate"].ToString();
                    MModels.TotalTaxable = Convert.ToDecimal(row["CREDIT"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["CASH"].ToString());
                    MModels.ReturnAmount = Convert.ToDecimal(row["ReturnAmt"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["Total"].ToString());
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
        public ActionResult GasDistributionGets(ModelSalesReport ModelSalesReport)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GasDistributionGets(ModelSalesReport, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.BillSeriesId = row["BillSeriesId"].ToString();
                    MModels.Billdescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustoName = row["CustoName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.Code = row["Code"].ToString();
                    MModels.PayTerms = row["PayTerms"].ToString();
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = row["CurrencyRate"].ToString();
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.DeptId = row["DeptId"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.LocId = row["LocId"].ToString();
                    MModels.LocationName = row["LocationCode"].ToString();
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


        public ActionResult DetailedStockReportGets(ModelSalesReport ModelSalesReport)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DetailedStockReportGets(ModelSalesReport, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();

                    MModels.ItemId = row["ItemId"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.OpQty = Convert.ToDecimal(row["OpQty"].ToString());
                    MModels.OpCost = Convert.ToDecimal(row["OpCost"].ToString());
                    MModels.OpSV = Convert.ToDecimal(row["OpSV"].ToString());
                    MModels.PurchaseQty = Convert.ToDecimal(row["PurchaseQty"].ToString());
                    MModels.PCost = Convert.ToDecimal(row["PCost"].ToString());
                    MModels.PStockValue = Convert.ToDecimal(row["PStockValue"].ToString());
                    MModels.SalesQty = Convert.ToDecimal(row["SalesQty"].ToString());
                    MModels.SPrice = Convert.ToDecimal(row["SPrice"].ToString());
                    MModels.SStockValue = Convert.ToDecimal(row["SStockValue"].ToString());
                    MModels.PurchaseReturnQty = Convert.ToDecimal(row["PurchaseReturnQty"].ToString());
                    MModels.PRCost = Convert.ToDecimal(row["PRCost"].ToString());
                    MModels.PRStockValue = Convert.ToDecimal(row["PRStockValue"].ToString());
                    MModels.SalesReturnQty = Convert.ToDecimal(row["SalesReturnQty"].ToString());
                    MModels.SRPrice = Convert.ToDecimal(row["SRPrice"].ToString());
                    MModels.SRStockValue = Convert.ToDecimal(row["SRStockValue"].ToString());
                    MModels.ClosingQty = Convert.ToDecimal(row["ClosingQty"].ToString());
                    MModels.ClosingAvgCost = Convert.ToDecimal(row["ClosingAvgCost"].ToString());
                    MModels.ClosingStockValue = Convert.ToDecimal(row["ClosingStockValue"].ToString());
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

        public ActionResult DetailedReportGasGets(ModelSalesReport ModelSalesReport)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DetailedReportGasGets(ModelSalesReport, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.ItemId = row["ItemId"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.OpQty = Convert.ToDecimal(row["OpQty"].ToString());
                    MModels.PurchaseQty = Convert.ToDecimal(row["PurchaseQty"].ToString());
                    MModels.StockInQty = Convert.ToDecimal(row["StockInQty"].ToString());
                    MModels.SalesQty = Convert.ToDecimal(row["SalesQty"].ToString());
                    MModels.StockOutQty = Convert.ToDecimal(row["StockOutQty"].ToString());
                    MModels.ClosingQty = Convert.ToDecimal(row["ClosingQty"].ToString());
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
        public ActionResult stockoutreportmonthly(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.stockoutreportmonthly(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.InvDate = row["InvoiceDate"].ToString();
                    MModels.TotalTaxable = Convert.ToDecimal(row["Taxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["SalesAmount"].ToString());
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

        public ActionResult stockoutGetandGetsmain(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.stockoutGetandGetsmain(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.SType = row["SType"].ToString();
                    MModels.BillSeriesId = row["BillSeriesId"].ToString();
                    MModels.DeptId = row["DeptId"].ToString();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.Billdescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.CustoName = row["CustoName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.Code = row["Code"].ToString();
                    MModels.SalesAmount = Convert.ToDecimal(row["SalesAmount"].ToString());
                    MModels.SpecialAmount = Convert.ToDecimal(row["SplFee"].ToString());
                    MModels.ProcedAount = Convert.ToDecimal(row["ProceAmount"].ToString());

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


        public ActionResult stockoutGetandGetsSummary(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.stockoutGetandGetsSummary(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.InvDate = row["InvVDate"].ToString();
                    MModels.TotalTaxable = Convert.ToDecimal(row["CREDIT"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["CASH"].ToString());
                    MModels.ReturnAmount = Convert.ToDecimal(row["ReturnAmt"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["Total"].ToString());
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
        public ActionResult stockoutreportGetandGets(ModelSalesReport AreaMaster)
        {
            ModelSalesReport obj = new ModelSalesReport();

            List<ModelSalesReport> oList = new List<ModelSalesReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.stockoutreportGetandGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelSalesReport MModels = new ModelSalesReport();
                    MModels.SType = row["SType"].ToString();
                    MModels.BillSeriesId = row["BillSeriesId"].ToString();
                    MModels.Billdescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.CustoName = row["CustoName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.Code = row["Code"].ToString();
                    MModels.Name = row["Name"].ToString();
                    MModels.TermDescription = row["TermDescription"].ToString();
                    MModels.PayTerms = row["PayTerms"].ToString();
                    MModels.Jobcode = row["Jobcode"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.BillDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.SalesValue = Convert.ToDecimal(row["SalesValue"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.RoundGrandTotal = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.SalesAmount = Convert.ToDecimal(row["SalesAmount"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = row["CurrencyRate"].ToString();
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.DeptId = row["DeptId"].ToString();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.LocId = row["LocId"].ToString();
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.Status = row["Payment"].ToString();
                    MModels.ReceivedAmount = Convert.ToDecimal(row["ReceivedAmount"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
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
    }
}