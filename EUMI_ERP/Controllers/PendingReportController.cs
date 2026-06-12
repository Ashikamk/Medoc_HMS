using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EUMI_ERP.Models;
using System.Data;
using System.Configuration;
using System.IO;

namespace EUMI_ERP.Controllers
{
    public class PendingReportController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: PendingReport
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult PendingPurchaseOrder()
        {
            return View();
        }

        public ActionResult PendingPurchaseEnquiry()
        {
            return View();
        }
        public ActionResult PendingMRVPurchase()
        {
            return View();
        }
        public ActionResult PendingPurchasePerforma()
        {
            return View();
        }
        public ActionResult testprevent()
        {
            return View();
        }
        [HttpPost]
        public ActionResult PendingPurchaseOrderGet(PendingReportModel PendingReportModel)                              //price Manager get item in main table
        {
            PendingReportModel obj = new PendingReportModel();

            List<PendingReportModel> oList = new List<PendingReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingPurchaseOrderGet(PendingReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PendingReportModel MModels = new PendingReportModel();

                    MModels.OrderNo = row["OrderNo"].ToString();
                    MModels.OrderDate = row["OrderDate"].ToString();
                    MModels.DocRef = row["DocRef"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Performa_Qty = Convert.ToInt32(row["Performa_Qty"].ToString());
                    MModels.Bal_qty = Convert.ToInt32(row["Bal_Qty"].ToString());
                    MModels.Rate = row["FCRate"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult PendingPurchaseOrderSummaryGet(PendingReportModel PendingReportModel)                              //price Manager get item in main table
        {
            PendingReportModel obj = new PendingReportModel();

            List<PendingReportModel> oList = new List<PendingReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingPurchaseOrderSummaryGet(PendingReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PendingReportModel MModels = new PendingReportModel();

                    MModels.OrderNo = row["OrderNo"].ToString();
                    MModels.OrderDate = row["OrderDate"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.Amount = row["FCTotal"].ToString();
                    MModels.ArrivalDate = row["ShippingDate"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult PendingPurchaseEnquiryGet(PendingReportModel PendingReportModel)                              //price Manager get item in main table
        {
            PendingReportModel obj = new PendingReportModel();

            List<PendingReportModel> oList = new List<PendingReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingPurchaseEnquiryGet(PendingReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PendingReportModel MModels = new PendingReportModel();

                    MModels.EnquiryNo = row["EnquiryNo"].ToString();
                    MModels.EnquiryDate = row["EnquiryDate"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt16(row["Quantity"].ToString());
                    MModels.Purchase_Qty = Convert.ToInt16(row["PO_Quantity"].ToString());
                    MModels.Bal_qty = Convert.ToInt16(row["Bal_qty"].ToString());
                    MModels.Rate = row["Rate"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult PendingMRVPurchaseGet(PendingReportModel PendingReportModel)                              //price Manager get item in main table
        {
            PendingReportModel obj = new PendingReportModel();

            List<PendingReportModel> oList = new List<PendingReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingMRVPurchaseGet(PendingReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PendingReportModel MModels = new PendingReportModel();

                    MModels.MRVNo = row["MRVNo"].ToString();
                    MModels.InvoNo = row["DONo"].ToString();
                    MModels.MRVDate = row["MRVDate"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt16(row["Quantity"].ToString());
                    MModels.Purchase_Qty = Convert.ToInt16(row["Purchase_Qty"].ToString());
                    MModels.Bal_qty = Convert.ToInt16(row["Bal_qty"].ToString());
                    MModels.Rate = row["Rate"].ToString();
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        [HttpPost]
        public ActionResult PendingPurchasePerformaGet(PendingReportModel PendingReportModel)                              //price Manager get item in main table
        {
            PendingReportModel obj = new PendingReportModel();

            List<PendingReportModel> oList = new List<PendingReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingPurchasePerformaGet(PendingReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PendingReportModel MModels = new PendingReportModel();

                    MModels.OrderNo = row["PPNo"].ToString();
                    MModels.OrderDate = row["PPDate"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt16(row["Quantity"].ToString());
                    MModels.Purchase_Qty = Convert.ToInt16(row["Purchase_Qty"].ToString());
                    MModels.MRV_Qty = Convert.ToInt16(row["MRV_Qty"].ToString());
                    MModels.Bal_qty = Convert.ToInt16(row["Bal_Qty"].ToString());
                    MModels.Rate = row["Rate"].ToString();
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





        public ActionResult PendingSalesOrder()
        {
            return View();
        }

        [HttpPost]
        public ActionResult PendingSalesOrderGet(PendingSalesOrderModel PendingSalesOrderModel)
        {
            PendingSalesOrderModel obj = new PendingSalesOrderModel();

            List<PendingSalesOrderModel> oList = new List<PendingSalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingSalesOrderGet(PendingSalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PendingSalesOrderModel MModels = new PendingSalesOrderModel();

                    MModels.OrderNo = row["OrderNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.Customer = row["Customer"].ToString();
                    MModels.LPONo = row["LPONo"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemName = row["ItemName"].ToString();
                    MModels.Salesman = row["SalesMan"].ToString();
                    MModels.OrderQty = Convert.ToInt16(row["OrderQty"].ToString());
                    MModels.InvQty = Convert.ToInt16(row["InvQty"].ToString());
                    MModels.DelQty = Convert.ToInt16(row["DelQty"].ToString());
                    MModels.BalanceInvQty = Convert.ToInt16(row["BalanceInvQty"].ToString());
                    MModels.BalanceDelQty = Convert.ToInt16(row["BalanceDelQty"].ToString());
                    MModels.OrderRate = Convert.ToDecimal(row["OrderRate"].ToString());
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
            //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PendingQuotation()
        {
            return View();
        }

        [HttpPost]
        public ActionResult PendingQuotationGet(PendingSalesOrderModel PendingSalesOrderModel)
        {
            PendingSalesOrderModel obj = new PendingSalesOrderModel();

            List<PendingSalesOrderModel> oList = new List<PendingSalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingQuotationGet(PendingSalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PendingSalesOrderModel MModels = new PendingSalesOrderModel();

                    MModels.QtnNo = row["QtnNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.Customer = row["Customer"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemName = row["ItemName"].ToString();
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.QtnQty = Convert.ToInt16(row["QtnQty"].ToString());
                    MModels.OrderQty = Convert.ToInt16(row["OrderQty"].ToString());
                    MModels.BalanceQty = Convert.ToInt16(row["BalanceQty"].ToString());
                    MModels.OrderRate = Convert.ToDecimal(row["OrderRate"].ToString());
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
            //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PendingCustomerEnquiry()
        {
            return View();
        }

        [HttpPost]
        public ActionResult PendingCustomerEnquiryGet(PendingSalesOrderModel PendingSalesOrderModel)
        {
            PendingSalesOrderModel obj = new PendingSalesOrderModel();

            List<PendingSalesOrderModel> oList = new List<PendingSalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingCustomerEnquiryGet(PendingSalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PendingSalesOrderModel MModels = new PendingSalesOrderModel();

                    MModels.EnquiryNo = row["EnquiryNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.Customer = row["Customer"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemName = row["ItemName"].ToString();
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.EnquiryQty = Convert.ToInt16(row["EnquiryQty"].ToString());
                    MModels.QuotationQty = Convert.ToInt16(row["QuotationQty"].ToString());
                    MModels.BalanceQty = Convert.ToInt16(row["BalanceQty"].ToString());
                    MModels.OrderRate = Convert.ToDecimal(row["OrderRate"].ToString());
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}