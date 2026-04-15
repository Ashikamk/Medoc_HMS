
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Configuration;
using System.IO;

namespace EUMI_ERP.Controllers
{
    public class SalesController : Controller
    {

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: Sales
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult MaterialOutManagement()
        {
            return View();
        }


        [HttpPost]

        public ActionResult SalesGet(SalesReport SalesReport)
        {
            SalesReport obj = new SalesReport();
            List<SalesReport> olist = new List<SalesReport>();
            try
            {
                DataSet ds = new DataSet();
                ds = obj.SalesGet(SalesReport, dbName);
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    SalesReport rptModels = new SalesReport();
                    rptModels.InvoiceDescription = dr["BillDescription"].ToString();
                    rptModels.InvoiceNo = dr["BillSlNo"].ToString();
                    rptModels.CustomerName = dr["CustoName"].ToString();
                    rptModels.DateofTrn = dr["DueDate"].ToString();
                    rptModels.Salesman = dr["FirstName"].ToString();
                    rptModels.Location = dr["LocationName"].ToString();
                   // rptModels.Driver = dr["Driver"].ToString();
                    rptModels.ProductCode = dr["ProductCode"].ToString();
                    rptModels.ProductDescription = dr["ProductDescr"].ToString();
                    rptModels.Unit = dr["UnitName"].ToString();
                    rptModels.Quantity = dr["ProdQty"].ToString();
                    rptModels.Department = dr["DepartmentName"].ToString();
                    olist.Add(rptModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = olist,
                MaxJsonLength = 86753090,
            };
        }


    }
}