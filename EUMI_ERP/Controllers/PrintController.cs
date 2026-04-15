using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.Controllers
{
    public class PrintController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        // GET: Print
        public ActionResult AccountSchedule()
        {
            var oList = ABAccountSchedule.GetTreeViews(dbName);
            return View(oList);
        }


        public ActionResult AccountSchedulewithgrouping()
        {
            var oList = ABAccountSchedule.AccountSchedulewithgrouping(dbName);
            return View(oList);
        }

    }
}