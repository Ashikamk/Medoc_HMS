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
    public class ItemMappingController : Controller
    {
       
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ItemMapping()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ItemGroupGetandGets(ItemMappingModel ItemMappingModel)
        {
            ItemMappingModel obj = new ItemMappingModel();

            List<ItemMappingModel> oList = new List<ItemMappingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemGroupGetandGets(ItemMappingModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMappingModel LModels = new ItemMappingModel();
                    LModels.GroupId = Convert.ToInt32(row["GroupId"].ToString());
                    LModels.GroupName = row["GroupName"].ToString();               
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
       
        public ActionResult MainItemSearch(ItemMappingModel ItemMappingModel)
        {
            ItemMappingModel obj = new ItemMappingModel();

            List<ItemMappingModel> oList = new List<ItemMappingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MainItemSearch(ItemMappingModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMappingModel MModels = new ItemMappingModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["AutomobileItems"].ToString();                 
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult SubItemsGetandGets(ItemMappingModel ItemMappingModel)
        {
            ItemMappingModel obj = new ItemMappingModel();
            List<ItemMappingModel> oList = new List<ItemMappingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubItemsGetandGets(ItemMappingModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMappingModel MModels = new ItemMappingModel();
                    MModels.SubItemId = Convert.ToInt32(row["SubItemId"].ToString());
                    MModels.SubItemName = row["SubItemName"].ToString();
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
        public JsonResult ItemGroupMappingInsert(List<ItemMappingModel> ItemMappingModel)
        {
            ItemMappingModel obj = new ItemMappingModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ItemMappingModel> oList = new List<ItemMappingModel>();
          
            try
            {
                string[] tmpTable = new string[5];
                tmpTable[0] = "ItemId";
                tmpTable[1] = "GroupId";
                tmpTable[2] = "SItemsId";
                tmpTable[3] = "Quantity";
                tmpTable[4] = "AutomobileItems";

              
                dt = Common.CreateTable(tmpTable);

                foreach (var details in ItemMappingModel)
                {
                    obj.ItemId = details.ItemId;
                    obj.GroupId = details.GroupId;
                    obj.SItemsId = details.SItemsId;
                    obj.Quantity = details.Quantity;
                    obj.AutomobileItems = details.AutomobileItems;
                    dt.Rows.Add(obj.ItemId, obj.GroupId, obj.SItemsId, obj.Quantity, obj.AutomobileItems);
                }

                dsDataSet = obj.ItemGroupMappingInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMappingModel MModels = new ItemMappingModel();
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



        public ActionResult ItemSearch(ItemMappingModel ItemMappingModel)
        {
            ItemMappingModel obj = new ItemMappingModel();

            List<ItemMappingModel> oList = new List<ItemMappingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemSearch(ItemMappingModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMappingModel MModels = new ItemMappingModel();
                    MModels.SubItemId = Convert.ToInt32(row["SubItemId"].ToString());
                    MModels.SubItemName = row["SubItemName"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
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