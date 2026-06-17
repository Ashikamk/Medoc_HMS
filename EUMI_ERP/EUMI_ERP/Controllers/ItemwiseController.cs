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
    public class ItemwiseController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: Itemwise
        public ActionResult Index()
        {
            return View();
        }
     
        public ActionResult Itemwise()
        {
            return View();
        }

        public ActionResult billItemwise()
        {
            return View();
        }

        public ActionResult UsedCarsItemwise()
        {
            return View();
        }
        public ActionResult StockOutItemwiseReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ItemwiseGetandGets(ModelItemwise Itemwise)
        {
            ModelItemwise obj = new ModelItemwise();

            List<ModelItemwise> oList = new List<ModelItemwise>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemwiseGetandGets(Itemwise, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelItemwise MModels = new ModelItemwise();
                    MModels.SType = row["SType"].ToString();
                    MModels.BillSeriesId = row["BillSeriesId"].ToString();
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.CustoName = row["CustoName"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.ItemId = row["ProductId"].ToString();
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ProdQty = row["ProdQty"].ToString();
                    MModels.ProdRate = row["ProdRate"].ToString();
                    MModels.Name = row["Name"].ToString();
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.TermDescription = row["TermDescription"].ToString();
                    MModels.Payterms = row["Payterms"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.LPO = row["LPO"].ToString();
                    MModels.TaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurncyRate = row["CurncyRate"].ToString();
                    MModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());

                    MModels.ExitPaperDate = row["ExitPaper"].ToString();
                    MModels.GrpName = row["GrpName"].ToString();
                    MModels.SbgrpName = row["SbgrpName"].ToString();
                    MModels.CategoryName = row["CategoryName"].ToString();
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    MModels.DeptId = row["DeptId"].ToString();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    oList.Add(MModels);
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
        }

        [HttpPost]
        public ActionResult StockoutItemwiseGetandGets(ModelItemwise Itemwise)
        {
            ModelItemwise obj = new ModelItemwise();

            List<ModelItemwise> oList = new List<ModelItemwise>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockoutItemwiseGetandGets(Itemwise, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ModelItemwise MModels = new ModelItemwise();
                    MModels.SType = row["SType"].ToString();
                    MModels.BillSeriesId = row["BillSeriesId"].ToString();
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.CustoName = row["CustoName"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.ItemId = row["ProductId"].ToString();
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ProdQty = row["ProdQty"].ToString();
                    MModels.ProdRate = row["ProdRate"].ToString();
                    MModels.Name = row["Name"].ToString();
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.TermDescription = row["TermDescription"].ToString();
                    MModels.Payterms = row["Payterms"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.LPO = row["LPO"].ToString();
                    MModels.TaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurncyRate = row["CurncyRate"].ToString();
                    MModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());

                    MModels.ExitPaperDate = row["ExitPaper"].ToString();
                    MModels.GrpName = row["GrpName"].ToString();
                    MModels.SbgrpName = row["SbgrpName"].ToString();
                    MModels.CategoryName = row["CategoryName"].ToString();
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    MModels.DeptId = row["DeptId"].ToString();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    oList.Add(MModels);
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
        }
    }
}