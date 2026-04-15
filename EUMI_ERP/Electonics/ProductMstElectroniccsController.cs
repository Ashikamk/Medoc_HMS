using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.Electonics
{
    public class ProductMstElectroniccsController : Controller
    {
        // GET: ProductMaster
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ItemElectronicsInsertandUpdate(ProductMstModel ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            List<ProductMstModel> oList = new List<ProductMstModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemElectronicsInsertandUpdate(ProductMstModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
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
        public JsonResult Roomservicemaping(List<ProductMstModel> ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ProductMstModel> oList = new List<ProductMstModel>();

            try
            {
                string[] tmpTable = new string[3];
                tmpTable[0] = "AccessoriesId";
                tmpTable[1] = "AccessQty";
                tmpTable[2] = "ItemId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ProductMstModel)
                {
                    obj.AccessoriesId = details.AccessoriesId;
                    obj.AccessQty = details.AccessQty;
                    obj.ItemId = details.ItemId;

                    dt.Rows.Add(obj.AccessoriesId, obj.AccessQty, obj.ItemId);
                }

                dsDataSet = obj.Roomservicemaping(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
                    MModels.Status = row["Status"].ToString();
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
        public JsonResult AccessoriesUpdate(List<ProductMstModel> ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ProductMstModel> oList = new List<ProductMstModel>();

            try
            {
                string[] tmpTable = new string[3];
                tmpTable[0] = "AccessoriesId";
                tmpTable[1] = "AccessQty";
                tmpTable[2] = "ItemId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ProductMstModel)
                {
                    obj.AccessoriesId = details.AccessoriesId;
                    obj.AccessQty = details.AccessQty;
                    obj.ItemId = details.ItemId;

                    dt.Rows.Add(obj.AccessoriesId, obj.AccessQty, obj.ItemId);
                }

                dsDataSet = obj.AccessoriesUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
                    MModels.Status = row["Status"].ToString();
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
        public JsonResult SalesCustUpdate(List<SalesCust> SalesCust)
        {
            SalesCust obj = new SalesCust();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesCust> oList = new List<SalesCust>();

            try
            {
                string[] tmpTable = new string[3];
                tmpTable[0] = "SalesManId";
                tmpTable[1] = "ItemId";
                tmpTable[2] = "CustomerId";
                dt = Common.CreateTable(tmpTable);
                foreach (var details in SalesCust)
                {
                    obj.SalesmanId = details.SalesmanId;
                    obj.SalesCustId = details.SalesCustId;
                    obj.CustomerId = details.CustomerId;                   
                    dt.Rows.Add(obj.SalesmanId, details.SalesCustId, obj.CustomerId);
                }
                dsDataSet = obj.SalesCustUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesCust MModels = new SalesCust();
                    MModels.Status = row["Status"].ToString(); 
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult SalesmanCustGets(SalesCust SalesCust)
        {
            SalesCust obj = new SalesCust();

            List<SalesCust> oList = new List<SalesCust>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanCustGets(SalesCust, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesCust MModels = new SalesCust();
                    MModels.SalesmanId = Convert.ToInt32(row["SalesmanId"].ToString());
                    MModels.CustomerId = Convert.ToInt32(row["CustomerId"].ToString());
                    MModels.CustName = row["CustName"].ToString();
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
        public JsonResult ItemSupplierUpdate(List<ProductMstModel> ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ProductMstModel> oList = new List<ProductMstModel>();

            try
            {
                string[] tmpTable = new string[2];
                tmpTable[0] = "SupplierId";
                tmpTable[1] = "ItemId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ProductMstModel)
                {
                    obj.SupplierId = details.SupplierId;
                    obj.ItemId = details.ItemId;

                    dt.Rows.Add(obj.SupplierId, obj.ItemId);
                }

                dsDataSet = obj.ItemSupplierUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult RoomserviceGetandGets(ProductMstModel ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            List<ProductMstModel> oList = new List<ProductMstModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RoomserviceGetandGets(ProductMstModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
                    MModels.AccessoriesId = Convert.ToInt32(row["AccessoriesId"].ToString());
                    MModels.AccessoriesName = row["Description"].ToString();
                    MModels.AccessQty = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.AccessoryCode = row["ItemCode"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        public ActionResult AccessoriesGetandGets(ProductMstModel ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            List<ProductMstModel> oList = new List<ProductMstModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccessoriesGetandGets(ProductMstModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
                    MModels.AccessoriesId = Convert.ToInt32(row["AccessoriesId"].ToString());
                    MModels.AccessoriesName = row["Description"].ToString();
                    MModels.AccessQty = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.AccessoryCode = row["ItemCode"].ToString(); 
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ItemSupplierGetandGets(ProductMstModel ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            List<ProductMstModel> oList = new List<ProductMstModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemSupplierGetandGets(ProductMstModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
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
        public JsonResult CatgeoryAccessoriesSave(List<ProductMstModel> ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ProductMstModel> oList = new List<ProductMstModel>();

            try
            {
                string[] tmpTable = new string[2];
                tmpTable[0] = "CategoryId";
                tmpTable[1] = "AccessoriesId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ProductMstModel)
                {
                    obj.CategoryId = details.CategoryId;
                    obj.AccessoriesId = details.AccessoriesId;

                    dt.Rows.Add(obj.CategoryId, obj.AccessoriesId);
                }

                dsDataSet = obj.CatgeoryAccessoriesSave(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
                    MModels.Status = row["Status"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CatgeoryAccessoriesGet(ProductMstModel ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            List<ProductMstModel> oList = new List<ProductMstModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CatgeoryAccessoriesGet(ProductMstModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
                    MModels.AccessoriesId = Convert.ToInt32(row["AccessoriesId"].ToString());
                    MModels.AccessoriesName = row["Description"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CategoryAccessoriesMappingList(ProductMstModel ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            List<ProductMstModel> oList = new List<ProductMstModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CategoryAccessoriesMappingList(ProductMstModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel LModels = new ProductMstModel();
                    LModels.CategoryName = row["CategoryName"].ToString();
                    LModels.ItemCode = row["ItemCode"].ToString();
                    LModels.Description = row["Description"].ToString();
                    LModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    oList.Add(LModels);
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