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
    public class MonthlyPurchaseAnalysisController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: MonthlyPurchaseAnalysis
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PurchaseAnalysis()
        {
            return View();
        }
        [HttpPost]

        public ActionResult PurchaseAnalysisGet(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseAnalysisGet(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.ProductId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ProductCode = row["ItemCode"].ToString();
                    MModels.ProductDescr = row["Description"].ToString();
                    MModels.curStock = Convert.ToDecimal(row["CurrentStock"].ToString());
                    MModels.MinQty = Convert.ToDecimal(row["MinQty"].ToString());
                    MModels.MaxQty = Convert.ToDecimal(row["MaxQty"].ToString());
                    MModels.saleQty = Convert.ToDecimal(row["SalesQty"].ToString());
                    MModels.OrderQty = Convert.ToDecimal(row["OrderQty"].ToString());//curent order
                    MModels.POQty = row["POQty"].ToString();//preious purchaseorder
                    MModels.purchasecost = Convert.ToDecimal(row["Cost"].ToString());
                    MModels.mrp = Convert.ToDecimal(row["Mrp"].ToString());
                    MModels.DelFlag = Convert.ToInt16(row["Flag"].ToString());
                    MModels.PPQty = row["PPQty"].ToString();
                    MModels.TotCost = row["TotCost"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();






                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(oList, JsonRequestBehavior.AllowGet);
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };

        }

        [HttpPost]
        public JsonResult PurchaseAnalysisInsert(List<PurchaseAnalysisModel> PurchaseAnalysisModel)
        {
            PurchaseAnalysisModel obj = new PurchaseAnalysisModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseAnalysisModel> oList = new List<PurchaseAnalysisModel>();

            try
            {
                string[] tmpTable = new string[18];
                tmpTable[0] = "SupplierId";
                tmpTable[1] = "Supplier";
                tmpTable[2] = "ItemId";
                tmpTable[3] = "ItemCode";
                tmpTable[4] = "Description";
                tmpTable[5] = "SaledQty";
                tmpTable[6] = "POQty";
                tmpTable[7] = "PPQty";
                tmpTable[8] = "PurchaseCost";
                tmpTable[9] = "FCCost";
                tmpTable[10] = "CurrenctStock";
                tmpTable[11] = "Model1";
                tmpTable[12] = "Model2";
                tmpTable[13] = "Model3";
                tmpTable[14] = "OrderQty";
                tmpTable[15] = "UId";
                tmpTable[16] = "DeptId";
                tmpTable[17] = "Location";              
                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseAnalysisModel)
                {
                    obj.SupplierId = details.SupplierId;
                    obj.Supplier = details.Supplier;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.Description = details.Description;
                    obj.SaledQty = details.SaledQty;
                    obj.POQty = details.POQty;
                    obj.PPQty = details.PPQty;
                    obj.PurchaseCost = details.PurchaseCost;

                    obj.FCCost = details.FCCost;
                    obj.CurrenctStock = details.CurrenctStock;
                    obj.Model1 = details.Model1;
                    obj.Model2 = details.Model2;
                    obj.Model3 = details.Model3;

                    obj.OrderQty = details.OrderQty;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.Location = details.Location;                
                    dt.Rows.Add
                    (obj.SupplierId, obj.Supplier, obj.ItemId, obj.ItemCode, obj.Description, obj.SaledQty,
                     obj.POQty, obj.PPQty, obj.PurchaseCost, obj.FCCost, obj.CurrenctStock,
                    obj.Model1,obj.Model2, obj.Model3, obj.OrderQty, obj.UId,obj.DeptId, obj.Location);
                }

                dsDataSet = obj.PurchaseAnalysisInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseAnalysisModel MModels = new PurchaseAnalysisModel();
                    MModels.Status = row["Status"].ToString();
                    //MModels.STInNo = Convert.ToInt32(row["stinnum"].ToString());
                    oList.Add(MModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]

        public ActionResult PurchaseanalysisPurchaseGet(PurchaseAnalysisModel PurchaseAnalysisModel)
        {
            PurchaseAnalysisModel obj = new PurchaseAnalysisModel();

            List<PurchaseAnalysisModel> oList = new List<PurchaseAnalysisModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseanalysisPurchaseGet(PurchaseAnalysisModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseAnalysisModel MModels = new PurchaseAnalysisModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["ItemDescription"].ToString();
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.Date = row["InvoDate"].ToString();                   
                    MModels.CustName = row["CustName"].ToString();
                    MModels.MinCost = row["mincost"].ToString();
                    MModels.Currency = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = row["CurrencyRate"].ToString();
                    MModels.FCCost = Convert.ToDecimal(row["FCCost"].ToString());
                    MModels.PurchaseQty = row["PurchaseQty"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]

        public ActionResult PurchaseanalysisPurchaseOrderGet(PurchaseAnalysisModel PurchaseAnalysisModel)
        {
            PurchaseAnalysisModel obj = new PurchaseAnalysisModel();

            List<PurchaseAnalysisModel> oList = new List<PurchaseAnalysisModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseanalysisPurchaseOrderGet(PurchaseAnalysisModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseAnalysisModel MModels = new PurchaseAnalysisModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["ItemDescription"].ToString();
                    MModels.InvoNo = row["OrderNo"].ToString();
                    MModels.Date = row["OrderDate"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.MinCost = row["mincost"].ToString();
                    MModels.Currency = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = row["CurrencyRate"].ToString();
                    MModels.FCCost = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.PurchaseQty = row["OrderQty"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }



        [HttpPost]

        public ActionResult PurchaseAnalysisListGet(PurchaseAnalysisModel PurchaseAnalysisModel)
        {
            PurchaseAnalysisModel obj = new PurchaseAnalysisModel();

            List<PurchaseAnalysisModel> oList = new List<PurchaseAnalysisModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseAnalysisListGet(PurchaseAnalysisModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseAnalysisModel MModels = new PurchaseAnalysisModel();
                    MModels.PurchaseAnalysisId = Convert.ToInt32(row["PurchaseAnalysisId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.OrderQty = Convert.ToInt32(row["OrderQty"].ToString());
                    MModels.PurchaseCost = Convert.ToDecimal(row["PurchaseCost"].ToString());
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.TaxRate = row["TaxRate"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.Model1 = row["Model1"].ToString();
                    MModels.Model2 = row["Model2"].ToString();
                    MModels.Model3 = row["Model3"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }
        
    }
}