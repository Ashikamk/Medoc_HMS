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
    public class caritemcodeController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: caritemcode
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult caritemcode()
        {
            return View();
        }

        public ActionResult VCCPayment()
        {
            return View();
        }
        public ActionResult VCCIssuedReport()
        {
            return View();
        }
        public ActionResult ItemGetandGets(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemGetandGets(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.GrpId = Convert.ToInt32(row["GroupId"].ToString());
                    MModels.GrpName = row["GrpName"].ToString();
                    MModels.SbgrpId = Convert.ToInt32(row["SubGroupId"].ToString());
                    MModels.SbgrpName = row["SbgrpName"].ToString();
                    MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    MModels.CategoryName = row["CategoryName"].ToString();
                    MModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.VatCode = row["TaxName"].ToString();
                    MModels.VatPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.Active = Convert.ToInt32(row["Active"].ToString());
                    MModels.OpeningQty = Convert.ToDecimal(row["OpenQty"].ToString());
                    MModels.OpeningCost = Convert.ToDecimal(row["OpeningCost"].ToString());
                    MModels.LPCost = Convert.ToDecimal(row["LPCost"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.StockIn = Convert.ToDecimal(row["stock"].ToString());
                    MModels.Model1 = row["Model1"].ToString();
                    MModels.Model2 = row["Model2"].ToString();
                    MModels.Model3 = row["Model3"].ToString();
                    MModels.MaxQty = Convert.ToDecimal(row["MaxQty"].ToString());
                    MModels.MinQty = Convert.ToDecimal(row["MinQty"].ToString());
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.Size = Convert.ToDecimal(row["Size"].ToString());
                    MModels.Weight = Convert.ToDecimal(row["Weight"].ToString());
                    MModels.Length = Convert.ToDecimal(row["Length"].ToString());
                    MModels.Width = Convert.ToDecimal(row["Width"].ToString());
                    MModels.Thickness = Convert.ToDecimal(row["Thickness"].ToString());
                    MModels.Density = Convert.ToDecimal(row["Density"].ToString());
                    MModels.Specification = row["Specification"].ToString();
                    MModels.Hsncode = row["HsnCode"].ToString();
                    MModels.MRP = Convert.ToDecimal(row["MrpRate"].ToString());
                    MModels.SellingPrice1 = Convert.ToDecimal(row["SellingPrice_1"].ToString());
                    MModels.SellingPrice2 = Convert.ToDecimal(row["SellingPrice_2"].ToString());
                    MModels.Otherdescription = row["Otherdescription"].ToString();
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
            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult VCCAmountGet(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VCCAmountGet(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProductCode = row["Description"].ToString();
                    MModels.Amnt = row["Amount"].ToString();
                    MModels.CashAdvnce = row["PdtCashAdvance"].ToString();
                    MModels.balanceamt = row["balanceamt"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["CheckFlag"].ToString());
                    MModels.PayType = row["tempamnt"].ToString(); 
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult VCCReceivedAmountGet(VCCModel VCCModel)
        {
            VCCModel obj = new VCCModel();

            List<VCCModel> oList = new List<VCCModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VCCReceivedAmountGet(VCCModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VCCModel MModels = new VCCModel();
                    MModels.Status = row["STATUS"].ToString();
                    MModels.VCCNo = Convert.ToInt32(row["VCCNo"].ToString());
                    MModels.VCCDate = row["VCCDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustomerId"].ToString());
                    MModels.CustomerName = row["CustName"].ToString();
                    MModels.CustomerAddress = row["CustAddress"].ToString();
                    MModels.ProductName = row["Description"].ToString();
                    MModels.Product = row["ItemDescription"].ToString();
                    MModels.Amount =Convert.ToDecimal( row["Amount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.AccountType = row["AccountType"].ToString();                    
                    MModels.CurrencyName = row["CurrencyCode"].ToString();
                    MModels.CurrencyId= Convert.ToInt32(row["Currency"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.VCCPAmt = Convert.ToDecimal(row["VCCPAmt"].ToString());
                    MModels.Account= Convert.ToInt64(row["AccCode"].ToString());
                    MModels.AccountId = Convert.ToInt64(row["AccId"].ToString());
                    MModels.ExitDate = row["ExitPaper"].ToString(); 
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Rpt_VCCPendingPayment(VCCModel VCCModel)
        {
            VCCModel obj = new VCCModel();

            List<VCCModel> oList = new List<VCCModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Rpt_VCCPendingPayment(VCCModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VCCModel MModels = new VCCModel();
                   
                    MModels.VCCDate = row["VCCDate"].ToString();
                    MModels.VCCNo = Convert.ToInt32(row["VCCNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustomerId"].ToString());
                    MModels.CustomerName = row["CustName"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ChasisNumber"].ToString();
                    MModels.ProductName = row["Description"].ToString();                  
                    MModels.CurrencyId = Convert.ToInt32(row["Currency"].ToString());
                    MModels.AccountType = row["Rate"].ToString();
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.VCCBAmount = Convert.ToDecimal(row["Balance"].ToString());
                    MModels.VCCRDate = row["InvNo"].ToString();
                    MModels.UserId = Convert.ToInt32(row["UId"].ToString());
                    MModels.UserName = row["Name"].ToString();
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
            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult VCCPaymentGetandGets(VCCModel VCCModel)
        {
            VCCModel obj = new VCCModel();

            List<VCCModel> oList = new List<VCCModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VCCPaymentGetandGets(VCCModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VCCModel MModels = new VCCModel();
                    MModels.PaymentVCCNo = Convert.ToInt32(row["VCCPNo"].ToString());
                    MModels.VCCDate = row["VCCPDate"].ToString();
                    MModels.VCCNo = Convert.ToInt32(row["VCCNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustomerId"].ToString());
                    MModels.CustomerName = row["CustomerName"].ToString();
                    MModels.CustomerAddress = row["CustomerAddress"].ToString();
                    MModels.AccountType = row["AccountType"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductName = row["ProductName"].ToString();
                    MModels.Product = row["Description"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["VPFCAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    MModels.VCCRDate = row["VCCDate"].ToString();
                    MModels.ProductCode = row["ChasisNumber"].ToString();
                    MModels.VCCPAmt = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.VCCBAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.Account = Convert.ToInt64(row["AccCode"].ToString());
                    MModels.AccountId = Convert.ToInt64(row["AccId"].ToString());
                    MModels.ExitDate = row["ExitPaper"].ToString();
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
            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult VCCGetandGets(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VCCGetandGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSlNo = Convert.ToInt32(row["VCCNo"].ToString());
                    MModels.VCCDate = row["VCCDate"].ToString();
                    MModels.ProductCode = row["ChasisNumber"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();                   
                    MModels.BlSlNo = row["InvNo"].ToString();
                    MModels.ProductDescr = row["Description"].ToString();
                    MModels.ItemName = row["ItemDescription"].ToString();
                    MModels.Amnt = row["BaseAmount"].ToString();
                    MModels.CashAdvnce = row["RecAmount"].ToString();
                    MModels.balanceamt = row["BalAmount"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["Currency"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.Account=Convert.ToInt64(row["AccCode"].ToString());
                    MModels.AccountId = Convert.ToInt64(row["AccId"].ToString());
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
            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult MultiUnitGetandGetsdemo(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MultiUnitGetandGetsdemo(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                 
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.CustName = row["CustName"].ToString();



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
        public ActionResult VCCInsertandUpdate(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VCCInsertandUpdate(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel LModels = new SalesInvoiceModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.BlSlNo = row["vccno"].ToString();
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
        public ActionResult VCCPaymentInsertandUpdate(VCCModel VCCModel)
        {
            VCCModel obj = new VCCModel();
            List<VCCModel> oList = new List<VCCModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VCCPaymentInsertandUpdate(VCCModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VCCModel LModels = new VCCModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.PaymentVCCNo = Convert.ToInt32( row["VCCNo"].ToString());
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