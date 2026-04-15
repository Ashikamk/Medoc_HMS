using EUMI_ERP.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EUMI_ERP.DReports;
using EUMI_ERP.DataTablesServer;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Controllers
{
    public class ReportController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult VoucherDifferenceReport()
        {
            return View();
        }
        public ActionResult WasteReport()
        {
            return View();
        }
        public ActionResult ImmunizationReport() 
        {
            return View();
        }
        public ActionResult StockInItemWisePurchase()
        {
            return View();
        }

        [HttpPost]
        public ActionResult VoucherDiffReportGetsandGets(VoucherDiffReport VoucherDiffReport)
        {
            VoucherDiffReport obj = new VoucherDiffReport();

            List<VoucherDiffReport> oList = new List<VoucherDiffReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherDiffReportGetsandGets(VoucherDiffReport, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherDiffReport Models = new VoucherDiffReport();
                    Models.DepartmentName = row["DepartmentName"].ToString();
                    Models.TYPE = row["TYPE"].ToString();
                    Models.Description = row["Description"].ToString();
                    Models.VOUCHERNO = Convert.ToInt32(row["VOUCHERNO"].ToString());
                    Models.Date = row["Date"].ToString();
                    Models.AMOUNT = row["AMOUNT"].ToString();
                    oList.Add(Models);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult MonthwiseReportDemo()
        {
            return View();
        }
        [HttpPost]
        public ActionResult MonthwiseReportDemoDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<PurchaseReportModel>>(jsonStr);
            var manager = new DReports.MonthwiseReport();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult MonthwiseReportDemoJson(ABDataTableModel<PurchaseReportModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.MonthwiseReport();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult ItemwiseReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ItemwiseReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<PurchaseReportModel>>(jsonStr);
            var manager = new DReports.ItemWiseReport();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ItemwiseReportJson(ABDataTableModel<PurchaseReportModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.ItemWiseReport();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        public ActionResult MonthwiseSalesReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult MonthwiseSalesReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<SalesReportModel>>(jsonStr);
            var manager = new DReports.MonthwiseSales();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }


        [HttpPost]
        public ActionResult MonthwiseSalesReportJson(ABDataTableModel<SalesReportModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.MonthwiseSales();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult ItemwiseSalesReport()
        {
            return View();
        }
        public ActionResult ItemwiseElectronicsReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ItemwiseSalesReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<SalesReportModel>>(jsonStr);
            var manager = new DReports.ItemwiseSales();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ItemwiseSalesReportJson(ABDataTableModel<SalesReportModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.ItemwiseSales();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        public ActionResult ItemwiseelectronicsReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<EleReportModel>>(jsonStr);
            var manager = new DReports.ItemWiseEleSales();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ItemwiseelctronicsReportJson(ABDataTableModel<EleReportModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.ItemWiseEleSales();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult LocationwiseStockReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult LocationwiseStockDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<StockReportModel>>(jsonStr);
            var manager = new DReports.LocationwiseStock();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult LocationwiseStockJson(ABDataTableModel<StockReportModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.LocationwiseStock();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },

                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        public ActionResult StockTransferOutReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult StockTransferOutReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<StockTransferReport>>(jsonStr);
            var manager = new DReports.StockTransferOut();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult StockTransferOutReportJson(ABDataTableModel<StockTransferReport> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.StockTransferOut();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        public ActionResult StockTransferInReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult StockTransferInReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<StockTransferReport>>(jsonStr);
            var manager = new DReports.StockTransferIn();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult StockTransferInReportJson(ABDataTableModel<StockTransferReport> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.StockTransferIn();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult ProductionEntryReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ProductionEntryReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<ProductionEntryReport>>(jsonStr);
            var manager = new DReports.ProductionEntry();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ProductionEntryReportJson(ABDataTableModel<ProductionEntryReport> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.ProductionEntry();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        public ActionResult ProfitAnalysisInvoReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ProfitAnalysisInvoReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<ProfitAnalysisReport>>(jsonStr);
            var manager = new DReports.ProfitAnalysisInvoReport();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ProfitAnalysisInvoReportJson(ABDataTableModel<ProfitAnalysisReport> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.ProfitAnalysisInvoReport();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        public ActionResult ProfitAnalysisItemReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ProfitAnalysisItemReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<ProfitAnalysisReport>>(jsonStr);
            var manager = new DReports.ProfitAnalysisItemReport();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ProfitAnalysisItemReportJson(ABDataTableModel<ProfitAnalysisReport> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.ProfitAnalysisItemReport();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        public ActionResult SalesReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SalesReportDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<ReportModelSales>>(jsonStr);
            var manager = new DReports.SalesReport();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult SalesReportJson(ABDataTableModel<ReportModelSales> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.SalesReport();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        public ActionResult StockQuery()
        {
            return View();
        }
        [HttpPost]
        public ActionResult StockQueryDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<string>>(jsonStr);
            var manager = new DReports.StockQuery();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult StockQueryJson(ABDataTableModel<string> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.StockQuery();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult SPStockQuery()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SPStockQueryDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<string>>(jsonStr);
            var manager = new DReports.SPStockQuery();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult SPStockQueryJson(ABDataTableModel<string> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.SPStockQuery();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public ActionResult MobileStockQuery()
        {
            return View();
        }
        [HttpPost]
        public ActionResult MobileStockQueryDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<string>>(jsonStr);
            var manager = new DReports.MobileStockQuery();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult MobileStockQueryJson(ABDataTableModel<string> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.MobileStockQuery();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        public ActionResult StockQuery_UsedCars()
        {
            return View();
        }
        [HttpPost]
        public ActionResult StockQuery_UsedCarsDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<string>>(jsonStr);
            var manager = new DReports.StockQuery_UsedCars();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult StockQuery_UsedCarsJson(ABDataTableModel<string> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.StockQuery_UsedCars();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }



        public ActionResult AccountsQuery()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AccountsQueryDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<string>>(jsonStr);
            var manager = new DReports.AccountsQuery();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult AccountsQueryJson(ABDataTableModel<string> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DReports.AccountsQuery();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch (Exception ex)
            {
                error = ex.Message;
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = new ABDataTableResult<Dictionary<string, object>>()
                {
                    draw = model.draw,
                    recordsTotal = total,
                    recordsFiltered = filtered,
                    data = oList,
                    error = error
                },
                MaxJsonLength = 86753090,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        [HttpPost]
        public ActionResult DetailedStock(StockReportModel StockReportModel)
        {
            StockReportModel obj = new StockReportModel();

            List<StockReportModel> oList = new List<StockReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DetailedStock(StockReportModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockReportModel LModels = new StockReportModel();
                    LModels.ItemCode = row["ItemCode"].ToString();
                    LModels.ItemDesc = row["Description"].ToString();
                    LModels.Unit = row["UnitName"].ToString();
                    LModels.Group = row["GrpName"].ToString();
                    LModels.SubGroup = row["SbgrpName"].ToString();
                    LModels.Category = row["CategoryName"].ToString();
                    LModels.SubCategory = row["SubCategoryName"].ToString();
                    LModels.StockQty = row["StockQty"].ToString();
                    LModels.AvgCost = row["AvgCost"].ToString();
                    LModels.StockValue = row["StockValue"].ToString();
                    oList.Add(LModels);
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
        public ActionResult VCCPaidUpdate(StockReportModel StockReportModel)
        {
            StockReportModel obj = new StockReportModel();

            List<StockReportModel> oList = new List<StockReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VCCPaidUpdate(StockReportModel, dbName);
               

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

        public ActionResult LabBillReport()
        {
            return View();
        }
        public ActionResult ProcedureBillReport()
        {
            return View();
        }
        public ActionResult IPBillReport()
        {
            return View();
        }
        public ActionResult RegistrationReport()
        {
            return View();
        }
        public ActionResult RevisitReport()
        {
            return View();
        }
        public ActionResult LabTestWise()
        {
            return View();
        }
        public ActionResult PurchaseCorrectionReport()
        {
            return View();
        }
        public ActionResult ItemWisePurchase()
        {
            return View();
        }

        [HttpPost]
        public ActionResult HMS_Rpt_ItemWisePurchase(HMSPurchaseReportModal Modal)
        {
            HMSPurchaseReportModal obj = new HMSPurchaseReportModal();

            List<HMSPurchaseReportModal> oList = new List<HMSPurchaseReportModal>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_Rpt_ItemWisePurchase(Modal, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSPurchaseReportModal LModels = new HMSPurchaseReportModal();
                    LModels.TID = row["TID"].ToString();
                    LModels.SlNo = row["SlNo"].ToString();
                    LModels.InvoNo = row["InvoNo"].ToString();
                    LModels.InvoDate = row["InvoDate"].ToString();
                    LModels.PurchaseType = row["PurchaseType"].ToString();

                    LModels.ItemId = row["ItemId"].ToString();
                    LModels.ItemCode = row["ItemCode"].ToString();
                    LModels.ItemDescription = row["ItemDescription"].ToString();
                    LModels.Batch = row["Batch"].ToString();
                    LModels.Expiry = row["Expiry"].ToString();

                    LModels.Pack = row["Pack"].ToString();
                    LModels.Quantity = row["Quantity"].ToString();
                    LModels.Free = row["Free"].ToString();
                    LModels.Loose = row["Loose"].ToString();
                    LModels.TQty = row["TQty"].ToString();

                    LModels.TLQty = row["TLQty"].ToString();
                    LModels.Rate = row["Rate"].ToString();
                    LModels.P_SR = row["P_SR"].ToString();
                    LModels.P_MRP = row["P_MRP"].ToString();
                    LModels.TaxRate = row["TaxRate"].ToString();

                    LModels.Discount = row["Discount"].ToString();
                    LModels.TaxableAmount = row["TaxableAmount"].ToString();
                    LModels.TaxAmount = row["TaxAmount"].ToString();
                    LModels.B_Cess = row["B_Cess"].ToString();
                    LModels.Amount = row["Amount"].ToString();

                    LModels.Margin = row["Margin"].ToString();
                    LModels.P_OtherCost = row["P_OtherCost"].ToString();
                    LModels.CustAccount = row["CustAccount"].ToString();
                    LModels.CustName = row["CustName"].ToString();
                    LModels.GrpName = row["GrpName"].ToString();

                    LModels.CategoryName = row["CategoryName"].ToString();
                    LModels.SubCategoryName = row["SubCategoryName"].ToString();
                    LModels.DepartmentName = row["DepartmentName"].ToString();
                    LModels.TaxName = row["TaxName"].ToString();
                    LModels.DepartmentId = row["DepartmentId"].ToString();

                    LModels.PType = row["PType"].ToString();
                    LModels.LocationName = row["LocationName"].ToString();
                    LModels.Flag = row["Flag"].ToString();



                    oList.Add(LModels);
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
        public ActionResult HMS_ImmunizationReport(ImmunizationModel ImmunizationModel)
        {
            ImmunizationModel obj = new ImmunizationModel();

            List<ImmunizationModel> oList = new List<ImmunizationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_ImmunizationReport(ImmunizationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    ImmunizationModel Reptmodels = new ImmunizationModel(); 
                    Reptmodels.OPVisit = Convert.ToInt32(row["OPVisit"].ToString());
                    Reptmodels.VaccineName = row["VaccineName"].ToString();
                    Reptmodels.BrandName = row["BrandName"].ToString();
                    Reptmodels.GivenDate = row["GivenDate"].ToString();
                    Reptmodels.NextDate = row["NextDate"].ToString();
                    Reptmodels.Status = row["Status"].ToString();
                    Reptmodels.Gender = row["Gender"].ToString(); 
                    Reptmodels.PName = row["PName"].ToString();
                    Reptmodels.PDOB = row["PDOB"].ToString();
                    Reptmodels.MobileNo = row["MobileNo"].ToString();
                    Reptmodels.PhoneNo = row["PhoneNo"].ToString();
                    Reptmodels.Address1 = row["Address1"].ToString();
                    Reptmodels.DocName = row["DocName"].ToString();
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
        public ActionResult Rpt_StockInItemWisePurchase(HMSPurchaseReportModal Modal)
        {
            HMSPurchaseReportModal obj = new HMSPurchaseReportModal();

            List<HMSPurchaseReportModal> oList = new List<HMSPurchaseReportModal>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Rpt_StockInItemWisePurchase(Modal, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSPurchaseReportModal LModels = new HMSPurchaseReportModal();
                    LModels.TID = row["TID"].ToString();
                    LModels.SlNo = row["SlNo"].ToString();
                    LModels.InvoNo = row["InvoNo"].ToString();
                    LModels.InvoDate = row["InvoDate"].ToString();
                    LModels.PurchaseType = row["PurchaseType"].ToString();

                    LModels.ItemId = row["ItemId"].ToString();
                    LModels.ItemCode = row["ItemCode"].ToString();
                    LModels.ItemDescription = row["ItemDescription"].ToString();
                    LModels.Batch = row["Batch"].ToString();
                    LModels.Expiry = row["Expiry"].ToString();

                    LModels.Pack = row["Pack"].ToString();
                    LModels.Quantity = row["Quantity"].ToString();
                    LModels.Free = row["Free"].ToString();
                    LModels.Loose = row["Loose"].ToString();
                    LModels.TQty = row["TQty"].ToString();

                    LModels.TLQty = row["TLQty"].ToString();
                    LModels.Rate = row["Rate"].ToString();
                    LModels.P_SR = row["P_SR"].ToString();
                    LModels.P_MRP = row["P_MRP"].ToString();
                    LModels.TaxRate = row["TaxRate"].ToString();

                    LModels.Discount = row["Discount"].ToString();
                    LModels.TaxableAmount = row["TaxableAmount"].ToString();
                    LModels.TaxAmount = row["TaxAmount"].ToString();
                    LModels.B_Cess = row["B_Cess"].ToString();
                    LModels.Amount = row["Amount"].ToString();

                    LModels.Margin = row["Margin"].ToString();
                    LModels.P_OtherCost = row["P_OtherCost"].ToString();
                    LModels.CustAccount = row["CustAccount"].ToString();
                    LModels.CustName = row["CustName"].ToString();
                    LModels.GrpName = row["GrpName"].ToString();

                    LModels.CategoryName = row["CategoryName"].ToString();
                    LModels.SubCategoryName = row["SubCategoryName"].ToString();
                    LModels.DepartmentName = row["DepartmentName"].ToString();
                    LModels.TaxName = row["TaxName"].ToString();
                    LModels.DepartmentId = row["DepartmentId"].ToString();

                    LModels.PType = row["PType"].ToString();
                    LModels.LocationName = row["LocationName"].ToString();
                    LModels.Flag = row["Flag"].ToString();



                    oList.Add(LModels);
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
       