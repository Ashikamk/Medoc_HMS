using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.Controllers
{
    public class DashboardController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        // GET: Dashboard
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult MyDashBoard()
        {
            return View();
        }
        public ActionResult DashBoard()
        {
            return View();
        }

        public ActionResult RCDashBoard()
        {
            return View();
        }

        public ActionResult DashBoardElectro()
        {
            return View();
        }


        public ActionResult DeliveryDashBoard()
        {
            return View();
        }
        public ActionResult DashBoardScrap()
        {
            return View();
        }

        public ActionResult ItemwiseDashBoard()
        {
            return View();
        }

        [HttpPost]
        public ActionResult MyDashBoardWigets(MyDashBoard MyDashBoard)
        {
            MyDashBoard obj = new MyDashBoard();

            List<MyDashBoard> oList = new List<MyDashBoard>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MyDashBoardWigets(MyDashBoard, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MyDashBoard Reptmodels = new MyDashBoard();
                    Reptmodels.CashBalance = row["CashBalance"].ToString();
                    Reptmodels.BankBalance = row["BankBalance"].ToString();
                    Reptmodels.TotalSales = row["TotalSales"].ToString();
                    Reptmodels.TotalPurchase = row["TotalPurchase"].ToString();
                    Reptmodels.DailySales = row["DailySales"].ToString();

                    Reptmodels.DailyPurchase = row["DailyPurchase"].ToString();
                    Reptmodels.PDCReceived = row["PDCReceived"].ToString();
                    Reptmodels.PDCIssued = row["PDCIssued"].ToString();
                    Reptmodels.AmountReceivable = row["AmountReceivable"].ToString();
                    Reptmodels.AmountPayable = row["AmountPayable"].ToString();

                    Reptmodels.DailyReceipt = row["DailyReceipt"].ToString();
                    Reptmodels.DailyPayment = row["DailyPayment"].ToString();
                    Reptmodels.PendingSO = row["PendingSO"].ToString();
                    Reptmodels.PendingPO = row["PendingPO"].ToString();
                    Reptmodels.Profit = row["Profit"].ToString();

                    Reptmodels.Loss = row["Loss"].ToString();
                    Reptmodels.Stock = row["Stock"].ToString(); 
                    Reptmodels.StockValue = row["StockValue"].ToString();
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
        public ActionResult MyDashBoardListing(MyDashBoard MyDashBoard)
        {
            MyDashBoard obj = new MyDashBoard();

            List<MyDashBoard> oList = new List<MyDashBoard>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MyDashBoardListing(MyDashBoard, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MyDashBoard Reptmodels = new MyDashBoard();
                    Reptmodels.Name = row["NAME"].ToString();
                    Reptmodels.TotalSales = row["QUANTITY"].ToString();
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
        public ActionResult CustCreditLimitExceeded(MyDashBoard MyDashBoard)
        {
            MyDashBoard obj = new MyDashBoard();

            List<MyDashBoard> oList = new List<MyDashBoard>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustCreditLimitExceeded(MyDashBoard, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MyDashBoard Reptmodels = new MyDashBoard();
                    Reptmodels.Name = row["CustName"].ToString();
                    Reptmodels.TotalSales = row["CreditLimit"].ToString();
                    Reptmodels.TotalPurchase = row["Excess"].ToString();
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
        public ActionResult StockAgeing(MyDashBoard MyDashBoard)
        {
            MyDashBoard obj = new MyDashBoard();

            List<MyDashBoard> oList = new List<MyDashBoard>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockAgeing(MyDashBoard, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MyDashBoard Reptmodels = new MyDashBoard();
                    Reptmodels.Name = row["Name"].ToString();
                    Reptmodels.TotalSales = row["Amount"].ToString();                   
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