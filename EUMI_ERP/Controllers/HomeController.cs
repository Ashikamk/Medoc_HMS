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
    [AllowAnonymous]
    public class HomeController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index(string invalidAttempt)
        {
            ABLoginModel result = new Models.ABLoginModel();
            DepartmentModel model = new Models.DepartmentModel() { DepartmentId = 0 };
            result.dept = model.DepartmentGetandGets(model, dbName);
            if (!string.IsNullOrWhiteSpace(invalidAttempt))
            {
                ViewBag.Message = "Invaild login";
            }
            return View(result);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        public ActionResult Details()
        {
           

            return View();
        }

        [HttpGet]
        public ActionResult Logout()
        {
            HttpContext.GetOwinContext().Authentication.SignOut(Microsoft.Owin.Security.Cookies.CookieAuthenticationDefaults.AuthenticationType);
            return RedirectToAction("Index", "Home");
        }


        public ActionResult Demo()
        {
            return View();
        }



        public ActionResult OTPGeneration()
        {
            return View();

        }


        public ActionResult Help()
        {
            return View();
        }

         public ActionResult Chat()
        {
            return View();
        }

        public ActionResult ReportsMenu()
        {
            return View();
        }


        

        public ActionResult UserMenuSettings()
        {
            return View();
        }


        public ActionResult Mastershortcut()
        {
            return View();
        }

        public ActionResult InventoryMenus()
        {
            return View();
        }







        public ActionResult MenuAdd()
        {
            return View();
        }



        public ActionResult MasteMenus()
        {
            return View();
        }

        public ActionResult ShortCutKeys()
        {
            return View();
        }


        public ActionResult Myprofile()
        {
            return View();
        }
        

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        
        [HttpPost]
        public ActionResult getOnlineUsers(ReminderModel ReminderModel)
        {
            ReminderModel obj = new ReminderModel();
            List<ReminderModel> oList = new List<ReminderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.getOnlineUsers(ReminderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReminderModel MModels = new ReminderModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
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
        public ActionResult Ex_ChatInsert(ReminderModel ReminderModel)
        {
            ReminderModel obj = new ReminderModel();

            List<ReminderModel> oList = new List<ReminderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Ex_ChatInsert(ReminderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReminderModel MModels = new ReminderModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.Ex_ChatId = Convert.ToInt32(row["Ex_ChatId"].ToString());
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
        public ActionResult Ex_ChatGet(ReminderModel ReminderModel)
        {
            ReminderModel obj = new ReminderModel();

            List<ReminderModel> oList = new List<ReminderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Ex_ChatGet(ReminderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReminderModel RModels = new ReminderModel();
                    RModels.Ex_ChatId = Convert.ToInt32(row["Ex_ChatId"].ToString());
                    RModels.ReceiverId = Convert.ToInt32(row["ReceiverId"].ToString());
                    RModels.SenderId = Convert.ToInt32(row["SenderId"].ToString());
                    RModels.ChatMessage = row["Message"].ToString();
                    RModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    oList.Add(RModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UsersGetandGets(Profile Profile)
        {
            Profile obj = new Profile();

            List<Profile> oList = new List<Profile>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UsersGetandGets(Profile, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Profile MModels = new Profile();
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DepartmentId = row["DepartmentName"].ToString();
                    MModels.LocationId = row["LocationName"].ToString();
                    MModels.Name = row["Name"].ToString();
                    MModels.UserName = row["UserName"].ToString();
                    MModels.PassWord = row["PassWord"].ToString();
                    MModels.Email = row["Email"].ToString();
                   
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
        public ActionResult OTPInsertandUpdate(OTPModel OTPModel)
        {
            OTPModel obj = new OTPModel();

            List<OTPModel> oList = new List<OTPModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OTPInsertandUpdate(OTPModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    OTPModel MModels = new OTPModel();
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
        public ActionResult UserDepartmentGets(UsersModel UsersModel)
        {
            UsersModel obj = new UsersModel();

            List<UsersModel> oList = new List<UsersModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UserDepartmentGets(UsersModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UsersModel MModels = new UsersModel();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.DepartmentName = row["DepartmentName"].ToString();
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
        public ActionResult UserLoginOtherDepartment(UserLogin UserLogin)
        {
            UserLogin obj = new UserLogin();
            List<UserLogin> oList = new List<UserLogin>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = UserLogin.UserLoginOtherDepartment(UserLogin, dbName);
                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        UserLogin MModels = new UserLogin();
                        MModels.UserId = row["UserId"].ToString();
                        MModels.DeptId = row["DeptId"].ToString();
                        MModels.LocationID = row["LocationId"].ToString();
                        MModels.UserName = row["Name"].ToString();
                        MModels.DepartmentName = row["DepartmentName"].ToString();
                        MModels.UserMenu = row["UserMenu"].ToString();

                        MModels.DCompanyName = row["DCompanyName"].ToString();
                        MModels.DAddress = row["DAddress"].ToString();
                        MModels.DPhoneNo = row["DPhoneNo"].ToString();
                        MModels.DEmail = row["DEmail"].ToString();
                        MModels.DFax = row["DFax"].ToString();
                        MModels.DTRNNo = row["DTRNNo"].ToString();

                        MModels.D_SalesPrintId = row["D_SalesPrintId"].ToString();
                        MModels.D_SalesReturnPrintId = row["D_SalesReturnPrintId"].ToString();
                        MModels.D_VoucherPrintId = row["D_VoucherPrintId"].ToString();
                        MModels.D_QuotationPrintId = row["D_QuotationPrintId"].ToString();
                        MModels.D_PrintColor = row["D_PrintColor"].ToString();
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
        public ActionResult OTPGetandGets(OTPModel OTPModel)
        {
            OTPModel obj = new OTPModel();

            List<OTPModel> oList = new List<OTPModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OTPGetandGets(OTPModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    OTPModel MModels = new OTPModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.OTP = row["OTP"].ToString();
                    MModels.OTPCount =Convert.ToInt32(row["Count"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
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
        public ActionResult OTPCheckforUser(OTPModel OTPModel)
        {
            OTPModel obj = new OTPModel();

            List<OTPModel> oList = new List<OTPModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OTPCheckforUser(OTPModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    OTPModel MModels = new OTPModel();
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
        public ActionResult MasterUserMenus(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MasterUserMenus(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.MasterId = row["masterid"].ToString();
                    HModels.MenuCode = row["menucode"].ToString();
                    HModels.MenuName = row["menuname"].ToString();
                    HModels.URL = row["url"].ToString();
                    HModels.HFlag = row["HFlag"].ToString();
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ReportUserMenus(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ReportUserMenus(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.MasterId = row["masterid"].ToString();
                    HModels.MenuCode = row["menucode"].ToString();
                    HModels.MenuName = row["menuname"].ToString();
                    HModels.URL = row["url"].ToString();
                    HModels.HFlag = row["HFlag"].ToString();
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult InventoryUserMenus(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.InventoryUserMenus(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.MasterId = row["masterid"].ToString();
                    HModels.MenuCode = row["menucode"].ToString();
                    HModels.MenuName = row["menuname"].ToString();
                    HModels.URL = row["url"].ToString();
                    HModels.HFlag = row["HFlag"].ToString();
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetMenuMaster(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = HomeModel.GetMenuMaster(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.MasterId = row["ID"].ToString();
                    HModels.MenuName = row["MenuName"].ToString();
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetLatetstMenuCode(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = HomeModel.GetLatetstMenuCode(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.MenuCode = row["MenuCode"].ToString();
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveMenuSub(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = HomeModel.SaveMenuSub(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.Status = row["Status"].ToString();
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateEumiUserRights(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = HomeModel.UpdateEumiUserRights(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.Status = row["Status"].ToString();
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SaveMainMenu(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = HomeModel.SaveMainMenu(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.Status = row["Status"].ToString();
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        
        public ActionResult GetMenuList(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = HomeModel.GetMenuList(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.MainMenu = row["MainMenu"].ToString();
                    HModels.MenuName = row["MenuName"].ToString();
                    HModels.MenuCode = row["MenuCode"].ToString();
                    HModels.URL = row["URL"].ToString();
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetSubMenu(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = HomeModel.GetSubMenu(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.MasterId = row["MasterId"].ToString();
                    HModels.MenuName = row["MenuName"].ToString();
                    HModels.MenuCode = row["MenuCode"].ToString();
                    HModels.URL = row["URL"].ToString();
                    HModels.MasterFlag =Convert.ToInt32( row["MasterFlag"].ToString());
                    HModels.InvFlag = Convert.ToInt32(row["InvFlag"].ToString());
                    HModels.ReportFlag = Convert.ToInt32(row["ReportFlag"].ToString());
                    oList.Add(HModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateMenuSub(HomeModel HomeModel)
        {
            HomeModel obj = new HomeModel();

            List<HomeModel> oList = new List<HomeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = HomeModel.UpdateMenuSub(HomeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HomeModel HModels = new HomeModel();
                    HModels.Status = row["Status"].ToString();
                    oList.Add(HModels);
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