using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.IO;

namespace EUMI_ERP.Controllers
{
    public class AlternateItemLinkingController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: AlternateItemLinking
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AlternateItemLinking()
        {
            return View();
        }
        [HttpPost]
        public JsonResult LinkProductInsert(List<ProductLinkModel> ProductLinkModel)
        {
            ProductLinkModel obj = new ProductLinkModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ProductLinkModel> oList = new List<ProductLinkModel>();

            try
            {
                string[] tmpTable = new string[5];
                tmpTable[0] = "MainProdId";
                tmpTable[1] = "LinkedProdId";
          
                tmpTable[2] = "DelFlag";
                tmpTable[3] = "UId";
                tmpTable[4] = "DeptId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ProductLinkModel)
                {
                    obj.MainProdId = details.MainProdId;
                    obj.LinkedProdId = details.LinkedProdId;
                 
                    obj.DelFlag = details.DelFlag;

                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;

                    dt.Rows.Add(obj.MainProdId, obj.LinkedProdId, obj.DelFlag, obj.UId, obj.DeptId);

                }

                dsDataSet = obj.LinkProductInsert(dt, dbName);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductLinkModel MModels = new ProductLinkModel();
                    MModels.status = row["Status"].ToString();
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
        public ActionResult GetCopyOfLinkedProd(ProductLinkModel ProductLinkModel)
        {
            ProductLinkModel obj = new ProductLinkModel();

            List<ProductLinkModel> oList = new List<ProductLinkModel>();
            try

            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetCopyOfLinkedProd(ProductLinkModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductLinkModel DModels = new ProductLinkModel();
                    DModels.MainProdId= Convert.ToInt32(row["MainProdId"].ToString());
                    DModels.LinkedProdId = Convert.ToInt32(row["LinkedProdId"].ToString());
                    DModels.LinkedProdDescr = row["Description"].ToString();
                    DModels.LinkedItemCode = row["ItemCode"].ToString();
                    DModels.UId = Convert.ToInt32(row["Uid"].ToString());
                    DModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    oList.Add(DModels);
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