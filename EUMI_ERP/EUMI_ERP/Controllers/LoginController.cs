using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Configuration;
using System.IO;
using EUMI_ERP.Models;
using System.Security.Claims;
using Microsoft.Owin.Security;

namespace EUMI_ERP.Controllers
{
    [AllowAnonymous]
    public class LoginController : Controller
    {
        // GET: Login


        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Authentication()
        {
            return View();
        }




        [HttpPost]
        public ActionResult UserLoginCheck(UserLogin UserLogin)
        {
            UserLogin obj = new UserLogin();
            List<UserLogin> oList = new List<UserLogin>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = UserLogin.UserLoginCheck(UserLogin, dbName);
                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {                         
                        UserLogin MModels = new UserLogin();
                        MModels.UserId = row["UserId"].ToString();
                        MModels.DeptId = row["DepartmentId"].ToString();
                        MModels.DivId = row["DivId"].ToString();
                        MModels.LocationID = row["LocationId"].ToString();
                        MModels.UserName = row["Name"].ToString();
                        MModels.DepartmentName = row["DepartmentName"].ToString();
                        MModels.UserMenu = row["UserMenu"].ToString();
                        MModels.flag = row["Flag"].ToString();
                        //MModels.DCompanyName = row["DCompanyName"].ToString();
                        //MModels.DAddress = row["DAddress"].ToString();
                        //MModels.DPhoneNo = row["DPhoneNo"].ToString();
                        //MModels.DEmail = row["DEmail"].ToString();
                        //MModels.DFax = row["DFax"].ToString();
                        //MModels.DTRNNo = row["DTRNNo"].ToString();

                        //MModels.D_SalesPrintId = row["D_SalesPrintId"].ToString();
                        //MModels.D_SalesReturnPrintId = row["D_SalesReturnPrintId"].ToString();
                        //MModels.D_VoucherPrintId = row["D_VoucherPrintId"].ToString();
                        //MModels.D_QuotationPrintId = row["D_QuotationPrintId"].ToString();
                        //MModels.D_PrintColor = row["D_PrintColor"].ToString();


                        oList.Add(MModels);
                    }

                }

                return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index", "master");
                
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            ViewBag.Message = "Invalid Username Or Password";
            return RedirectToAction("Index", "Home", new { invalidAttempt = "true" });
        }

        [HttpPost]
        public ActionResult UserLogoutCheck(UserLogin UserLogin)
        {
            UserLogin obj = new UserLogin();
            List<UserLogin> oList = new List<UserLogin>();
            try
            {
                DataSet dsDataSet = new DataSet(); 
                dsDataSet = UserLogin.UserLogoutCheck(UserLogin, dbName);
                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        UserLogin MModels = new UserLogin();
                        MModels.UserId = row["UserId"].ToString();
                       
                        oList.Add(MModels);
                    }

                }

                return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index", "master");

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            ViewBag.Message = "Invalid Username Or Password";
            return RedirectToAction("Index", "Home", new { invalidAttempt = "true" });
        }



        [HttpPost]
        public ActionResult PasswordCheck(UserLogin UserLogin)
        {
            UserLogin obj = new UserLogin();
            List<UserLogin> oList = new List<UserLogin>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = UserLogin.PasswordCheck(UserLogin, dbName);
                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        UserLogin MModels = new UserLogin();
                        MModels.flag = row["flag"].ToString();
                        MModels.UserLoginId = Convert.ToInt32(row["UserId"].ToString());
                        MModels.UserName = row["UserName"].ToString();
                        oList.Add(MModels);
                    }

                }

               
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CheckEODDate(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = CompanyModel.CheckEODDate(CompanyModel, dbName);
                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        CompanyModel MModels = new CompanyModel();
                        MModels.Status = row["Status"].ToString();
                        MModels.CurDate =row["CurDate"].ToString();
                        
                        oList.Add(MModels);
                    }

                }


            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        


        [HttpPost]

        public ActionResult CompanyDetailGet(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> QList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = CompanyModel.CompanyDetailGet(CompanyModel, dbName);
                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        CompanyModel MModels = new CompanyModel();
                        MModels.CompanyId =Convert.ToInt32( row["CmpnyId"].ToString());
                        MModels.CompanyCode =row["CompanyCode"].ToString();
                        MModels.CompanyName =row["CompanyName"].ToString();
                        MModels.Address = row["Address"].ToString();
                        MModels.PhoneNo = row["PhoneNo"].ToString();
                        MModels.Email = row["Email"].ToString();
                        MModels.Fax = row["Fax"].ToString();
                        MModels.PeriodFrom = row["PeriodFrom"].ToString();
                        MModels.PeriodTo = row["PeriodTo"].ToString();
                        MModels.ProtectionDate = row["ProtectionDate"].ToString();
                        MModels.CurrencyId = row["CurrencyId"].ToString();
                        MModels.Decimals =Convert.ToInt32( row["Decimal"].ToString());
                        MModels.TRNNo = row["TRNNo"].ToString();
                        MModels.DelFlag =Convert.ToInt32( row["DelFlag"].ToString());
                        MModels.Area = row["Area"].ToString();
                        MModels.BusinessType= row["BusinessType"].ToString();
                        MModels.CurDate = row["CurDate"].ToString();
                        MModels.PostingAllow= Convert.ToInt32(row["PostingAllow"].ToString());
                        MModels.SalesPrint = row["SalesPrint"].ToString();
                        MModels.SalesReturnPrint = row["SalesReturnPrint"].ToString();
                        MModels.VoucherPrint = row["VoucherPrint"].ToString();
                        MModels.QuotationPrint= row["QuotationPrint"].ToString();
                        MModels.PrintColor = row["PrintColor"].ToString();
                        MModels.EODType = row["EODType"].ToString();
                        MModels.CessType = row["CessType"].ToString();
                        MModels.LabBillPrint= row["LabBillPrint"].ToString();
                        MModels.IPBillPrint = row["IPBillPrint"].ToString();
                        MModels.TaxType = row["TaxType"].ToString();
                        MModels.IPTaxZero = row["IPTaxZero"].ToString();
                        MModels.DischargePrint = row["DischargePrint"].ToString();
                        MModels.Validtill = row["Validtill"].ToString();
                        MModels.ExpireNotification = row["ExpireNotification"].ToString();
                        MModels.RemainingDays = row["RemainingDays"].ToString();
                        QList.Add(MModels);
                    }
                    
                }

                return Json(new { QList, success = true }, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index", "master");

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            ViewBag.Message = "Invalid Username Or Password";
            return RedirectToAction("Index", "Home", new { invalidAttempt = "true" });
        }
        
        [HttpPost]

        public ActionResult ComapnyExpiryUpdate(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> QList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = CompanyModel.ComapnyExpiryUpdate(CompanyModel, dbName);
                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        CompanyModel MModels = new CompanyModel();
                        MModels.Status = row["Status"].ToString();
                        QList.Add(MModels);
                    }

                }

                return Json(new { QList, success = true }, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index", "master");

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
                ViewBag.Message = "Invalid Username Or Password";
                return RedirectToAction("Index", "Home", new { invalidAttempt = "true" });
            }
            
        }

        [HttpPost]

        public ActionResult ExtendExpiry(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> QList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = CompanyModel.ExtendExpiry(CompanyModel, dbName);
                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        CompanyModel MModels = new CompanyModel();
                        MModels.Status = row["Status"].ToString();
                        MModels.Extended = row["ValidTill"].ToString();
                        QList.Add(MModels);
                    }

                }

                return Json(new { QList, success = true }, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index", "master");

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
                ViewBag.Message = "Invalid Username Or Password";
                return RedirectToAction("Index", "Home", new { invalidAttempt = "true" });
            }

        }

        [HttpPost]

        public ActionResult GetCompanyCode(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> QList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = CompanyModel.GetCompanyCode(CompanyModel, dbName);
                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        CompanyModel MModels = new CompanyModel();
                        MModels.CompanyCode = row["CompanyCode"].ToString();
                        MModels.ValidationKey = row["Valkey"].ToString();
                        MModels.Days = row["Days"].ToString();
                        MModels.Extended = row["Extended"].ToString();
                        QList.Add(MModels);
                    }

                }

                return Json(new { QList, success = true }, JsonRequestBehavior.AllowGet);
                //return RedirectToAction("Index", "master");

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
                return RedirectToAction("Index", "Home", new { invalidAttempt = "true" });
            }

        }
    }
}