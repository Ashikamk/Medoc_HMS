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
    public class MenuShortCutController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        // GET: MenuShortCut
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Shortcut()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ShortcutMenusInsertandUpdate(MenuShortcutModel dgpp)
        {
            MenuShortcutModel obj = new MenuShortcutModel();

            List<MenuShortcutModel> oList = new List<MenuShortcutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ShortcutMenusInsertandUpdate(dgpp, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                   
                    MenuShortcutModel Reptmodels = new MenuShortcutModel();
                    Reptmodels.status = row["STATUS"].ToString();
                    Reptmodels.uid = Convert.ToInt32(row["ID"].ToString());
                    oList.Add(Reptmodels);
                  
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ShotcutMenuGetandGets(MenuShortcutModel MenuShortcutModel)
        {
            MenuShortcutModel obj = new MenuShortcutModel();


            List<MenuShortcutModel> oList = new List<MenuShortcutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ShotcutMenuGetandGets(MenuShortcutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MenuShortcutModel LModels = new MenuShortcutModel();
                    LModels.MasterId = row["MasterId"].ToString();
                    LModels.MenuName = row["MenuName"].ToString();
                    LModels.MenuCode = row["MenuCode"].ToString();
                    LModels.HFlag = row["Hflag"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult MenuGetandGets(MenuShortcutModel MenuShortcutModel)
        {
            MenuShortcutModel obj = new MenuShortcutModel();


            List<MenuShortcutModel> oList = new List<MenuShortcutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MenuGetandGets(MenuShortcutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MenuShortcutModel LModels = new MenuShortcutModel();
                    LModels.MenuCode = row["menucode"].ToString();
                    LModels.MenuName = row["menuname"].ToString(); 
                    LModels.url = row["url"].ToString();
                    
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