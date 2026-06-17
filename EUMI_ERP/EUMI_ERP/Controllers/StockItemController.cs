using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web.Mvc;
using EUMI_ERP.Models;

namespace EUMI_ERP.Controllers
{
    public class StockItemController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        public ActionResult StockItem()
        {
            return View();
        }

        [HttpPost]
        public ActionResult HMS_UnitGets(long UnitId)
        {
            try
            {
                StockItemModel obj = new StockItemModel();
                obj.UnitId = UnitId;
                DataSet ds = obj.HMS_UnitGets(obj, dbName);
                var list = ds.Tables[0].AsEnumerable().Select(x => new
                {
                    UnitId = x.Field<decimal>("UnitId"),
                    UnitName = x.Field<string>("UnitName")
                }).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = 0, Message = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult ItemGetAll()
        {
            StockItemModel obj = new StockItemModel();
            List<StockItemModel> oList = new List<StockItemModel>();

            try
            {
                DataSet ds = obj.ItemGetAll(dbName);
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    oList.Add(new StockItemModel
                    {
                        ItemId = Convert.ToInt64(row["ItemId"]),
                        ItemCode = row["ItemCode"]?.ToString(),
                        Category = row["Model1"]?.ToString(),
                        SubType = row["Model2"]?.ToString(),
                        MaterialCode = row["Model3"]?.ToString(),
                        UnitVal = row["UnitId"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(row["UnitId"]),
                        TaxVal = row["VatId"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(row["VatId"])
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message: " + ex.Message + " + " + ex.StackTrace);
            }

            return new JsonResult { Data = oList, MaxJsonLength = 86753090 };
        }

        [HttpPost]
        public ActionResult ItemGetById(long ItemId)
        {
            try
            {
                StockItemModel obj = new StockItemModel();
                DataSet ds = obj.ItemGetById(ItemId, dbName);

                if (ds == null || ds.Tables[0].Rows.Count == 0)
                    return Json(null, JsonRequestBehavior.AllowGet);

                var row = ds.Tables[0].Rows[0];
                var item = new
                {
                    itemId = Convert.ToDecimal(row["ItemId"]),
                    itemCode = row["ItemCode"]?.ToString(),
                    category = row["Model1"]?.ToString(),
                    subType = row["Model2"]?.ToString(),
                    materialCode = row["Model3"]?.ToString(),
                    binA = row["BinA"]?.ToString(),
                    binB = row["BinB"]?.ToString(),
                    alertLevel = row["AlertLevel"]?.ToString(),
                    unit = row["UnitId"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(row["UnitId"]),
                    tax = row["VatId"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(row["VatId"])
                };
                return Json(item, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Status = 0, Message = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult StockItemSave(
            long ItemId, string ItemCode, string Model1, string Model2, string Model3,
            string Unit, string VatCode, string Bin_A, string Bin_B, string Bin_C,
            string AlertLevel, int Delflg, long UserId, long DeptId)
        {
            StockItemModel obj = new StockItemModel();
            List<StockItemModel> oList = new List<StockItemModel>();

            try
            {
                DataSet ds = obj.StockItemInsertandUpdate(
                    ItemId, ItemCode, Model1, Model2, Model3,
                    Unit, VatCode, Bin_A, Bin_B, Bin_C,
                    AlertLevel, Delflg, UserId, DeptId, dbName);

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        oList.Add(new StockItemModel
                        {
                            ItemId = Convert.ToInt64(row["ItemId"]),
                            Status = row["Status"].ToString()
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message: " + ex.Message + " + " + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}
