using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.PayRoll
{
    public class Payroll_LeaveController : Controller
    {
        // GET: Payroll_Leave
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult LeaveApplication()
        {
            return View();
        }
    }
}