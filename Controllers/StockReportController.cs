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
    public class StockReportController: Controller
    {

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: Purchaseandsalesreports

        public ActionResult StockReport()
        {
            return View();
        }
        public ActionResult StockQueryUC()
        {
            return View();
        }
        public ActionResult StockReportDetailed()
        {
            return View();
        }
        public ActionResult StockTransferOutReport()
        {
            return View();
        }
        public ActionResult StockTransferInReport()
        {
            return View();
        }
        public ActionResult StockLedger()
        {
            return View();
        }
        [HttpPost]
        public ActionResult StockReportGet(StockReportModel StockReportModel)
        {
            StockReportModel obj = new StockReportModel();

            List<StockReportModel> oList = new List<StockReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockReportGet(StockReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockReportModel Reptmodels = new StockReportModel();
                    Reptmodels.ItemId = row["ItemId"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemDesc = row["Description"].ToString();
                    Reptmodels.Group = row["GrpName"].ToString();
                    Reptmodels.SubGroup = row["SbgrpName"].ToString();
                    Reptmodels.Category = row["CategoryName"].ToString();
                    Reptmodels.SubCategory = row["SubCategoryName"].ToString();
                    Reptmodels.Model1 = row["Model1"].ToString();
                    Reptmodels.Model2 = row["Model2"].ToString();
                    Reptmodels.Model3 = row["Model3"].ToString();
                    Reptmodels.Model4 = row["modelm1"].ToString();
                    Reptmodels.Model5 = row["modelm2"].ToString();
                    Reptmodels.StockQty = row["StockQty"].ToString();
                    Reptmodels.Price = row["SellingPrice"].ToString();
                    Reptmodels.AvgCost = row["AvgCost"].ToString();
                    Reptmodels.OpenCost = row["OpeningCost"].ToString();
                    Reptmodels.MRP = row["MrpRate"].ToString();
                    Reptmodels.LPCost = row["LPCost"].ToString();
                    Reptmodels.W_MRP = row["W_MRP"].ToString();
                    Reptmodels.L_MRP = row["L_MRP"].ToString();
                    Reptmodels.Status = row["Status"].ToString();
                    Reptmodels.GroupId = row["GroupId"].ToString();
                    Reptmodels.CategoryId = row["CategoryId"].ToString();
                    Reptmodels.OpenQty = row["OpenQty"].ToString();
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
        public ActionResult StockQueryGet(StockReportModel StockReportModel)
        {
            StockReportModel obj = new StockReportModel();

            List<StockReportModel> oList = new List<StockReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockQueryGet(StockReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockReportModel Reptmodels = new StockReportModel();
                    Reptmodels.ItemId = row["ItemId"].ToString();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemDesc = row["Description"].ToString();
                    Reptmodels.Group = row["GrpName"].ToString();
                    Reptmodels.SubGroup = row["SbgrpName"].ToString();
                    Reptmodels.Category = row["CategoryName"].ToString();
                    Reptmodels.SubCategory = row["SubCategoryName"].ToString();
                    Reptmodels.Model1 = row["Model1"].ToString();
                    Reptmodels.Model2 = row["Model2"].ToString();
                    Reptmodels.Model3 = row["Model3"].ToString();
                    Reptmodels.Model4 = row["modelm1"].ToString();
                    Reptmodels.Model5 = row["modelm2"].ToString();
                    Reptmodels.StockQty = row["StockQty"].ToString();
                    Reptmodels.Price = row["SellingPrice"].ToString();
                    Reptmodels.AvgCost = row["AvgCost"].ToString();
                    Reptmodels.OpenCost = row["OpeningCost"].ToString();
                    Reptmodels.Year = row["BinE"].ToString();
                    Reptmodels.GroupId = row["GroupId"].ToString();
                    Reptmodels.CategoryId = row["CategoryId"].ToString();
                    Reptmodels.OpenQty = row["OpenQty"].ToString();
                    Reptmodels.VCCStatus = row["VCCStatus"].ToString();
                    Reptmodels.BuyerNo = row["BuyerNo"].ToString();
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
        public ActionResult PendingPurchaseOrderSQ(StockReportModel StockReportModel)
        {
            StockReportModel obj = new StockReportModel();

            List<StockReportModel> oList = new List<StockReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingPurchaseOrderSQ(StockReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockReportModel Reptmodels = new StockReportModel();
                    Reptmodels.OrderNo = row["OrderNo"].ToString();
                    Reptmodels.OrderDate = row["OrderDate"].ToString();
                    Reptmodels.Supplier = row["CustName"].ToString();
                    Reptmodels.OrderQty = row["Quantity"].ToString();
                    Reptmodels.PerformaDate = row["ShipDate"].ToString();
                    Reptmodels.PerformaQty = row["Performa_Qty"].ToString();
                    Reptmodels.Rate = row["Rate"].ToString();
                    Reptmodels.FCCost = row["FCRate"].ToString();
                    Reptmodels.Currency = row["CurrencyName"].ToString();
                    Reptmodels.CurrencyRate = row["CurrencyRate"].ToString();
                    Reptmodels.RecQty = row["ReceivedQty"].ToString();
                    Reptmodels.PendingQty = row["PendingQty"].ToString();
                    Reptmodels.Location = row["LocationName"].ToString();
                    Reptmodels.Department = row["DepartmentCode"].ToString();
                    Reptmodels.User = row["Name"].ToString();
                    Reptmodels.Column1 = row["InvPPSlno"].ToString();
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
        public ActionResult StockTransferOutReportGet(StockReportModel StockReportModel)
        {
            StockReportModel obj = new StockReportModel();

            List<StockReportModel> oList = new List<StockReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockTransferOutReportGet(StockReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockReportModel Reptmodels = new StockReportModel();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemDesc = row["Description"].ToString();
                    Reptmodels.StockDate = row["STODate"].ToString();
                    Reptmodels.FromLocation = row["FromLocation"].ToString();
                    Reptmodels.ToLocation = row["ToLocation"].ToString();
                    Reptmodels.StockQty = row["Quantity"].ToString();
                    Reptmodels.Price = row["Price"].ToString();
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
        }
        [HttpPost]
        public ActionResult StockTransferInReportGet(StockReportModel StockReportModel)
        {
            StockReportModel obj = new StockReportModel();

            List<StockReportModel> oList = new List<StockReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockTransferInReportGet(StockReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockReportModel Reptmodels = new StockReportModel();
                    Reptmodels.ItemCode = row["ItemCode"].ToString();
                    Reptmodels.ItemDesc = row["Description"].ToString();
                    Reptmodels.StockDate = row["STInDate"].ToString();
                    Reptmodels.FromLocation = row["LoginLocation"].ToString();
                    Reptmodels.ToLocation = row["TransferLocation"].ToString();
                    Reptmodels.StockQty = row["Quantity"].ToString();
                    Reptmodels.Price = row["Price"].ToString();
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
        }

        [HttpPost]
        public ActionResult StockLedger(StockLedger StockLedger)
        {
            StockLedger obj = new StockLedger();

            List<StockLedger> oList = new List<StockLedger>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockLedgerModel(StockLedger, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockLedger Reptmodels = new StockLedger();

                    Reptmodels.InvDate = row["InvDate"].ToString();
                    Reptmodels.TransType = row["TransType"].ToString();
                    Reptmodels.Quantity =Convert.ToInt32( row["Qty"].ToString());
                    Reptmodels.Cost = Convert.ToDecimal(row["Rate"].ToString());
                    Reptmodels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    Reptmodels.BalanceQty = Convert.ToInt32(row["BalQty"].ToString());
                    Reptmodels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    Reptmodels.AccCode = row["ACCCODE"].ToString();
                    Reptmodels.Account = row["ACCOUNT"].ToString();
                    Reptmodels.TrType = row["TransTypeStock"].ToString();
                    Reptmodels.SellingRate = Convert.ToDecimal(row["SellingRate"].ToString());
                    Reptmodels.SellingAmount = Convert.ToDecimal(row["SellingAmount"].ToString());
                    Reptmodels.BillNumber = row["BillNumber"].ToString();
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