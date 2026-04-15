using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO.Compression;


namespace EUMI_ERP.Controllers
{
    public class UtilitiesController : Controller
    {
        // GET: Utilities

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Utilities()
        {
            return View();
        }


        [HttpPost]
        public ActionResult BackupDatabase(Utilities Utilities)
        {
            Utilities obj = new Utilities();
            List<Utilities> oList = new List<Utilities>();
            try
            {
                DataSet dsDataSet = new DataSet();

                string BakupPath = ConfigurationManager.AppSettings["Backuppath"].ToString();
                string BakupName = ConfigurationManager.AppSettings["Backupname"].ToString();
                string sTimeMark = DateTime.Now.ToString("yyyy-MM-dd") + "_" + DateTime.Now.Hour.ToString()+"-"+ DateTime.Now.Minute.ToString(); 
                if (!Directory.Exists(BakupPath))
                            Directory.CreateDirectory(BakupPath);
                string backupdate = BakupPath+"/" + BakupName+"-"+ sTimeMark + ".bak";
                Utilities.Query = "BACKUP DATABASE " + dbName + " TO DISK ='" + backupdate + "'";

                dsDataSet = obj.BackupDatabase(Utilities, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Utilities MModels = new Utilities();
                    MModels.Status = backupdate;
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
        public ActionResult StockRefresh(Utilities Utilities)
        {
            Utilities obj = new Utilities();
            List<Utilities> oList = new List<Utilities>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockRefresh(Utilities, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Utilities MModels = new Utilities();
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
        public ActionResult AverageCostRefresh(Utilities Utilities)
        {
            Utilities obj = new Utilities();
            List<Utilities> oList = new List<Utilities>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AverageCostRefresh(Utilities, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Utilities MModels = new Utilities();
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
        public ActionResult AverageCostItemRefresh(Utilities Utilities)
        {
            Utilities obj = new Utilities();
            List<Utilities> oList = new List<Utilities>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AverageCostItemRefresh(Utilities, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Utilities MModels = new Utilities();
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
        public ActionResult AccountMerge(Utilities Utilities)
        {
            Utilities obj = new Utilities();
            List<Utilities> oList = new List<Utilities>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountMerge(Utilities, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Utilities MModels = new Utilities();
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
    }
}