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
    public class ElectronicsReportController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: PendingReport
        public ActionResult ElectronicsItemwiseReport()
        {
            return View();
        }
       
        

        [HttpPost]
        public ActionResult ElectronicsItemwiseReport(ElectronicsReport ElectronicsReport)
        {
            ElectronicsReport obj = new ElectronicsReport();

            List<ElectronicsReport> oList = new List<ElectronicsReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ElectronicsItemwiseReport(ElectronicsReport, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ElectronicsReport ERModels = new ElectronicsReport();
                    ERModels.ItemCode = row["ItemCode"].ToString();
                    ERModels.ItemName = row["Description"].ToString();
                    ERModels.Unit = row["UnitName"].ToString();
                    ERModels.Quantity = row["Quantity"].ToString();
                    ERModels.Group = row["GrpName"].ToString();
                    ERModels.SubGroup = row["SbgrpName"].ToString();
                    ERModels.Category = row["CategoryName"].ToString();
                    ERModels.SubCategory = row["SubCategoryName"].ToString();
                    ERModels.AvgCost = row["AvgCost"].ToString();
                    ERModels.SellingPrice = row["SellingPrice"].ToString();
                    oList.Add(ERModels);
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
        public ActionResult ModelNoSearch(ElectronicsReport ElectronicsReport)
        {
            ElectronicsReport obj = new ElectronicsReport();

            List<ElectronicsReport> oList = new List<ElectronicsReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ModelNoSearch(ElectronicsReport, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ElectronicsReport ERModels = new ElectronicsReport();
                    ERModels.SlNo = row["Model1"].ToString();
                    oList.Add(ERModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
             return Json(oList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ElectronicsReportwithAccessories(ElectronicsReport ElectronicsReport)
        {
            ElectronicsReport obj = new ElectronicsReport();

            List<ElectronicsReport> oList = new List<ElectronicsReport>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ElectronicsReportwithAccessories(ElectronicsReport, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ElectronicsReport ERModels = new ElectronicsReport();
                    ERModels.ItemCode = row["ItemCode"].ToString();
                    ERModels.ItemName = row["Description"].ToString();
                    ERModels.Unit = row["Unit"].ToString();
                    ERModels.Group = row["GrpName"].ToString();
                    ERModels.SubGroup = row["SubGroup"].ToString();
                    ERModels.Category = row["Category"].ToString();
                    ERModels.SubCategory = row["SubCategory"].ToString();
                    ERModels.Quantity = row["Quantity"].ToString();
                    ERModels.AvgCost = row["AvgCost"].ToString();
                    ERModels.SellingPrice = row["SellingPrice"].ToString();
                    ERModels.AccessoriesId = row["AccessoriesId"].ToString();
                    oList.Add(ERModels);
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