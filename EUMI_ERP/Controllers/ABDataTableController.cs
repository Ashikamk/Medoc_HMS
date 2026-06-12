using EUMI_ERP.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EUMI_ERP.DataTablesServer;

namespace EUMI_ERP.Controllers
{
    public class ABDataTableController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        public ActionResult ProductList()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ProductlistDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<string>>(jsonStr);
            var manager = new ProductList();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult ProductListJson(ABDataTableModel<string> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DataTablesServer.ProductList();
                manager.Configure(model);
                oList = manager.Execute(dbName, out total, out filtered);
            }
            catch(Exception ex)
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

        public ActionResult StockReportDetailed()
        {
            var data = ABStockLocations.GetData(dbName);
            return View(data);
        }
        [HttpPost]
        public ActionResult StockReportDetailDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<ABStockLocations>>(jsonStr);
            var manager = new StockLocations();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult StockReportDetailedJson(ABDataTableModel<ABStockLocations> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new StockLocations();
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


        public ActionResult AccountReports()
        {
            return View();
        }
        public ActionResult AccountTransactions()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AccountTransactDownload(string type, string jsonStr, List<string> cols)
        {
            cols = cols ?? new List<string>();
            var model = JsonConvert.DeserializeObject<ABDataTableModel<ABAccountTranRptModel>>(jsonStr);
            var manager = new AccountTranReport();
            manager.Configure(model);
            return this.Download(type, cols, dbName, manager.builder);
        }
        [HttpPost]
        public ActionResult AccountTransJson(ABDataTableModel<ABAccountTranRptModel> model)
        {
            List<Dictionary<string, object>> oList = null;
            int total = 0, filtered = 0;
            string error = null;
            try
            {
                var manager = new DataTablesServer.AccountTranReport();
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

        public ActionResult OutstandingStatement()
        {
            return View();
        }
        public ActionResult TrailBalance()
        {
            return View();
        }
        public ActionResult BalanceSheet()
        {
            return View();
        }
        public ActionResult OutstatndingStatmentPDC()
        {
            return View();
        }
        public ActionResult TrilaBalanceGroupwise()
        {
            return View();
        }
        public ActionResult ProfitandLoss()
        {
            return View();
        }
        public ActionResult BalanceSheetAsOn()
        {
            return View();
        }
        public ActionResult BalanceSheetSummary()
        {
            return View();
        }

    }
}