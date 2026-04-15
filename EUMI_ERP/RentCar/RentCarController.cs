using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EUMI_ERP.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.IO;

namespace EUMI_ERP.RentCar
{
    public class RentCarController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: RentCar
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult RentCustomer()
        {
            return View();
        }
        
        public ActionResult CarMaster()
        {  
            return View();
        }
        public ActionResult DailyPlannerRent()
        {
            return View();
        }
        public ActionResult GetDashboardWidgets(CarDashboard CarDashboard)
        {
            CarDashboard obj = new CarDashboard();
            List<CarDashboard> oList = new List<CarDashboard>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetDashboardWidgets(CarDashboard, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CarDashboard MModels = new CarDashboard();
                    MModels.TotalCars = Convert.ToInt32(row["TotalCars"].ToString());
                    MModels.RentedCars = Convert.ToInt32(row["RentedCars"].ToString());
                    MModels.TodayReservation = Convert.ToInt32(row["Reservation"].ToString());
                    MModels.TodayArrivals = Convert.ToInt32(row["Arrival"].ToString());
                    MModels.OPAgreement = Convert.ToInt32(row["OPAgreement"].ToString());
                    MModels.PendingPayement = Convert.ToInt32(row["PendingPayment"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RentCarDashBoardList(CarAgreement CarDashboard)
        {
            CarDashboard obj = new CarDashboard();
            List<CarAgreement> oList = new List<CarAgreement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RentCarDashBoardList(CarDashboard, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CarAgreement MModels = new CarAgreement();
                    MModels.AgreementNo = row["AgreementNo"].ToString();
                    MModels.VechicleNo = row["CarCode"].ToString();
                    MModels.VechicleDesc = row["CarDesc"].ToString();
                    MModels.CustomerName = row["CustName"].ToString();
                    MModels.Phone = row["PhoneNo"].ToString();
                    MModels.StartDate = row["StartDate"].ToString();
                    MModels.EndDate = row["EndDate"].ToString();
                    MModels.ReturnDate = row["ReturnDate"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CarInsertandUpdate(RentCarModel RentCarModel) 
        {
            RentCarModel obj = new RentCarModel();
            List<RentCarModel> oList = new List<RentCarModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CarInsertandUpdate(RentCarModel, dbName);  
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCarModel MModels = new RentCarModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.CarId = Convert.ToInt32(row["CarId"].ToString()); 
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
        public ActionResult CarGetandGets(RentCarModel RentCarModel)   
        {
            RentCarModel obj = new RentCarModel();

            List<RentCarModel> oList = new List<RentCarModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CarGetandGets(RentCarModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                 RentCarModel MModels = new RentCarModel();                
                 MModels.CarId               =  Convert.ToInt32(row["CarId"].ToString());
                 MModels.CarCode             =  row["CarCode"].ToString();
                 MModels.CarDesc             =  row["CarDesc"].ToString();
                 MModels.CurrentKM           =  Convert.ToDecimal(row["CurrentKM"].ToString());
                 MModels.NextService         =  Convert.ToDecimal(row["NextService"].ToString());
                 MModels.InsuranceDate       =  row["InsuranceDate"].ToString();
                 MModels.RegistrationDate    =  row["RegistrationDate"].ToString();
                 MModels.IYear               =  Convert.ToInt32(row["IYear"].ToString());
                 MModels.PlateName           =  row["PlateName"].ToString();
                 MModels.PlateCode           =  row["PlateCode"].ToString();
                 MModels.EngineNo            =  row["EngineNo"].ToString();
                 MModels.CarFuel             =  Convert.ToDecimal(row["CarFuel"].ToString());
                 MModels.ChassisNo           =  row["ChassisNo"].ToString();
                 MModels.PetrolCharge        =  Convert.ToDecimal(row["PetrolCharge"].ToString());
                 MModels.DailyPrice          =  Convert.ToDecimal(row["DailyPrice"].ToString());
                 MModels.WeeklyPrice         =  Convert.ToDecimal(row["WeeklyPrice"].ToString());
                 MModels.MonthlyPrice        =  Convert.ToDecimal(row["MonthlyPrice"].ToString());
                 MModels.AnnualPrice         =  Convert.ToDecimal(row["AnnualPrice"].ToString());
                 MModels.Comments            =  row["Comments"].ToString();
                 MModels.TCNO                =  row["TCNO"].ToString();
                 MModels.CarColor            =  row["CarColor"].ToString();
                 MModels.SubColor            =  row["SubColor"].ToString();
                 MModels.Category            =  row["Category"].ToString();
                 MModels.CarClass            =  row["CarClass"].ToString();
                 MModels.Origin              =  row["Origin"].ToString();
                 MModels.PlateSource         =  row["PlateSource"].ToString();
                 MModels.PlateCategory       =  row["PlateCategory"].ToString();
                 MModels.Shape               =  row["Shape"].ToString();
                 MModels.EmptyWt             =  Convert.ToDecimal(row["EmptyWt"].ToString());
                 MModels.GVWt                =  Convert.ToDecimal(row["GVWt"].ToString());
                 MModels.Doors               =  Convert.ToInt32(row["Doors"].ToString());
                 MModels.Seats               =  Convert.ToInt32(row["Seats"].ToString());
                 MModels.Cylinders           =  Convert.ToInt32(row["Cylinders"].ToString());
                 MModels.CarMake             =  row["CarMake"].ToString();
                 MModels.PayLoad             =  row["PayLoad"].ToString();
                 MModels.MortageBy           =  row["MortageBy"].ToString();
                 MModels.MortageNumber       =  row["MortageNumber"].ToString();
                 MModels.Insurancecompany    =  row["Insurancecompany"].ToString();
                 MModels.InsuranceType       =  row["InsuranceType"].ToString();
                 MModels.InsuranceNo         =  row["InsuranceNo"].ToString();
                 MModels.InsStartDate        =  row["InsStartDate"].ToString();
                 MModels.Radio               =  Convert.ToInt32(row["Radio"].ToString());
                 MModels.HeaterAC            =  Convert.ToInt32(row["HeaterAC"].ToString());
                 MModels.Petrol              =  Convert.ToInt32(row["Petrol"].ToString());
                 MModels.ToolsJack           =  Convert.ToInt32(row["ToolsJack"].ToString());
                 MModels.Lights              =  Convert.ToInt32(row["Lights"].ToString());
                 MModels.Sparewheel          =  Convert.ToInt32(row["Sparewheel"].ToString());
                 MModels.OutOfService        =  Convert.ToInt32(row["OutOfService"].ToString());
                 MModels.Flag                =  row["Flag"].ToString();
                 MModels.CurrentDate         =  row["ScratchRemarks"].ToString();
                 MModels.ItemUserId          =  Convert.ToInt32(row["ItemUserId"].ToString());
                 MModels.BelowCostFlag       =  Convert.ToInt32(row["BelowCostFlag"].ToString());
                 MModels.DelFlag             =  Convert.ToInt32(row["DelFlag"].ToString());

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
        public ActionResult CarGetandGetsDailyPlanner(RentCarModel RentCarModel) 
        {
            RentCarModel obj = new RentCarModel();

            List<RentCarModel> oList = new List<RentCarModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CarGetandGetsDailyPlanner(RentCarModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCarModel MModels = new RentCarModel();
                    MModels.CarId = Convert.ToInt32(row["CarId"].ToString());
                    MModels.CarCode = row["CarCode"].ToString();
                    MModels.CarDesc = row["CarDesc"].ToString();
                    MModels.CurrentKM = Convert.ToDecimal(row["CurrentKM"].ToString());
                    MModels.NextService = Convert.ToDecimal(row["NextService"].ToString());
                    MModels.InsuranceDate = row["InsuranceDate"].ToString();
                    MModels.RegistrationDate = row["RegistrationDate"].ToString();
                    MModels.IYear = Convert.ToInt32(row["IYear"].ToString());
                    MModels.PlateName = row["PlateName"].ToString();
                    MModels.PlateCode = row["PlateCode"].ToString();
                    MModels.EngineNo = row["EngineNo"].ToString();
                    MModels.CarFuel = Convert.ToDecimal(row["CarFuel"].ToString());
                    MModels.ChassisNo = row["ChassisNo"].ToString();
                    MModels.PetrolCharge = Convert.ToDecimal(row["PetrolCharge"].ToString());
                    MModels.DailyPrice = Convert.ToDecimal(row["DailyPrice"].ToString());
                    MModels.WeeklyPrice = Convert.ToDecimal(row["WeeklyPrice"].ToString());
                    MModels.MonthlyPrice = Convert.ToDecimal(row["MonthlyPrice"].ToString());
                    MModels.AnnualPrice = Convert.ToDecimal(row["AnnualPrice"].ToString());
                    MModels.Comments = row["Comments"].ToString();
                    MModels.TCNO = row["TCNO"].ToString();
                    MModels.CarColor = row["CarColor"].ToString();
                    MModels.SubColor = row["SubColor"].ToString();
                    MModels.Category = row["Category"].ToString();
                    MModels.CarClass = row["CarClass"].ToString();
                    MModels.Origin = row["Origin"].ToString();
                    MModels.PlateSource = row["PlateSource"].ToString();
                    MModels.PlateCategory = row["PlateCategory"].ToString();
                    MModels.Shape = row["Shape"].ToString();
                    MModels.EmptyWt = Convert.ToDecimal(row["EmptyWt"].ToString());
                    MModels.GVWt = Convert.ToDecimal(row["GVWt"].ToString());
                    MModels.Doors = Convert.ToInt32(row["Doors"].ToString());
                    MModels.Seats = Convert.ToInt32(row["Seats"].ToString());
                    MModels.Cylinders = Convert.ToInt32(row["Cylinders"].ToString());
                    MModels.CarMake = row["CarMake"].ToString();
                    MModels.PayLoad = row["PayLoad"].ToString();
                    MModels.MortageBy = row["MortageBy"].ToString();
                    MModels.MortageNumber = row["MortageNumber"].ToString();
                    MModels.Insurancecompany = row["Insurancecompany"].ToString();
                    MModels.InsuranceType = row["InsuranceType"].ToString();
                    MModels.InsuranceNo = row["InsuranceNo"].ToString();
                    MModels.InsStartDate = row["InsStartDate"].ToString();
                    MModels.Radio = Convert.ToInt32(row["Radio"].ToString());
                    MModels.HeaterAC = Convert.ToInt32(row["HeaterAC"].ToString());
                    MModels.Petrol = Convert.ToInt32(row["Petrol"].ToString());
                    MModels.ToolsJack = Convert.ToInt32(row["ToolsJack"].ToString());
                    MModels.Lights = Convert.ToInt32(row["Lights"].ToString());
                    MModels.Sparewheel = Convert.ToInt32(row["Sparewheel"].ToString());
                    MModels.OutOfService = Convert.ToInt32(row["OutOfService"].ToString());
                    MModels.Flag = row["Flag"].ToString();
                    MModels.CurrentDate = row["CurrentDate"].ToString();
                    MModels.ItemUserId = Convert.ToInt32(row["ItemUserId"].ToString());
                    MModels.BelowCostFlag = Convert.ToInt32(row["BelowCostFlag"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());

                    MModels.LicenseNo        = row["LicenseNo"].ToString();
                    MModels.AgreementId      = Convert.ToInt32(row["AgreementId"].ToString());
                    MModels.AgreementNo      = row["AgreementNo"].ToString();
                    MModels.StartDate        = row["StartDate"].ToString();
                    MModels.EndDate          = row["EndDate"].ToString();
                    MModels.ReturnDate       = row["ReturnDate"].ToString();
                    MModels.CustomerId         = Convert.ToInt32(row["CustomerId"].ToString());
                    MModels.AgreementStatus  = row["AgreementStatus"].ToString();
                    MModels.CustAccount      = row["CustAccount"].ToString();
                    MModels.CustName         = row["CustName"].ToString();
                    MModels.CheckInLocation    = Convert.ToInt32(row["CheckInLocation"].ToString());
                    MModels.CheckOutLocation = Convert.ToInt32(row["CheckOutLocation"].ToString());
                    MModels.CheckInDate = row["CheckInDate"].ToString(); 
                    MModels.PhoneNo = row["PhoneNo"].ToString();

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
        public ActionResult RentCustomerInsertandUpdate(RentCustomer CustomerMaster)
        {
            RentCustomer obj = new RentCustomer();
            List<RentCustomer> oList = new List<RentCustomer>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RentCustomerInsertandUpdate(CustomerMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCustomer MModels = new RentCustomer();
                    MModels.Status = row["Status"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
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
        public ActionResult RentCustomerGetandGets(RentCustomer CustomerMaster)
        {
            RentCustomer obj = new RentCustomer();

            List<RentCustomer> oList = new List<RentCustomer>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RentCustomerGetandGets(CustomerMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCustomer MModels = new RentCustomer();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.AccountType = Convert.ToInt32(row["AccountType"].ToString());
                    MModels.CustAccount = row["CustAccount"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.OpenBalance = Convert.ToDecimal(row["OpenBalance"].ToString());
                    MModels.DueDays = Convert.ToInt32(row["DueDays"].ToString());
                    MModels.CreditLimit = Convert.ToDecimal(row["CreditLimit"].ToString());
                    MModels.CustTermsId = Convert.ToInt32(row["CustTermsId"].ToString());
                    MModels.TRNNumber = row["TRNNumber"].ToString();
                    MModels.SalesmanId = Convert.ToInt32(row["SalesmanId"].ToString());
                    MModels.PriceGroupId = Convert.ToInt32(row["PriceGroupId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CustStatusId = Convert.ToInt32(row["CustStatusId"].ToString());
                    MModels.CustStreet1 = row["CustStreet1"].ToString();
                    MModels.CustStreet2 = row["CustStreet2"].ToString();
                    MModels.CustCity1 = row["CustCity1"].ToString();
                    MModels.CustCity2 = row["CustCity2"].ToString();
                    MModels.CustState1 = row["CustState1"].ToString();
                    MModels.CustState2 = row["CustState2"].ToString();
                    MModels.CustPin1 = row["CustPin1"].ToString();
                    MModels.CustPin2 = row["CustPin2"].ToString();
                    MModels.CustCountry1 = row["CustCountry1"].ToString();
                    MModels.CustCountry2 = row["CustCountry2"].ToString();
                    MModels.CustNotes = row["CustNotes"].ToString();
                    MModels.CustContactName1 = row["CustContactName1"].ToString();
                    MModels.CustContactNo1 = row["CustContactNo1"].ToString();
                    MModels.CustContactName2 = row["CustContactName2"].ToString();
                    MModels.CustContactNo2 = row["CustContactNo2"].ToString();
                    MModels.CustContactName3 = row["CustContactName3"].ToString();
                    MModels.CustContactNo3 = row["CustContactNo3"].ToString();
                    MModels.SalesMan = row["FirstName"].ToString();
                    MModels.CurrencyType = row["CurrencyName"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CustEmailId = row["ContactEmailId"].ToString();
                    MModels.EmailId = row["EmailId"].ToString();
                    MModels.MapId = row["MapId"].ToString();
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();

                    MModels.DOB = row["Cust_DOB"].ToString();
                    MModels.LicenseNo = row["Cust_LicenseNo"].ToString();
                    MModels.LicenseCategory = row["Cust_License_Category"].ToString();
                    MModels.LicenseIssuedOn = row["Cust_License_IssuedOn"].ToString();
                    MModels.LicenseExpireOn = row["Cust_License_ExpireOn"].ToString();
                    MModels.LicenseIssuedState = row["Cust_License_IssueState"].ToString();
                    MModels.DrivingExp = row["Cust_DrivingExp"].ToString();
                    MModels.Company = row["Cust_Company"].ToString();
                    MModels.WorkPhn = row["Cust_WorkPhn"].ToString();
                    MModels.IDNo = row["Cust_IDNo"].ToString();
                    MModels.Nationality = row["Cust_Nationality"].ToString();
                    MModels.IDIssuedOn = row["Cust_ID_IssuedOn"].ToString();
                    MModels.IDExpireOn = row["Cust_ID_ExpireOn"].ToString();

                    oList.Add(MModels);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        public void ImageCreateFolder(RentCustomer RentCustomer)
        {
            string fileNameImage = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + RentCustomer.MainFolder + "/" + RentCustomer.CustId + "/" + RentCustomer.ImageFolder + "/"));


            if (!Directory.Exists(fileNameImage))
            {
                Directory.CreateDirectory(fileNameImage);
            }
            else
            {
                DirectoryInfo attachments_AR = new DirectoryInfo(Server.MapPath(@"~/ProjectImages/" + RentCustomer.MainFolder + "/" + RentCustomer.CustId + "/" + RentCustomer.ImageFolder + "/"));
                EmptyFolder(attachments_AR);
                Directory.Delete(fileNameImage);
                Directory.CreateDirectory(fileNameImage);
            }

        }
        [HttpPost]
        public void CustomerImageUpload()
        {
            RentCustomer RentCustomer = new RentCustomer();

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["imageName"];
                string imageid = Request.Form["imageid"];
                string path = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + RentCustomer.MainFolder + "/" + strImageName + "/" + RentCustomer.ImageFolder + "/"), imageid + ".png");
                Request.Files[upload].SaveAs(path);
            }
        }
        public void DocumentCreateFolder(RentCustomer RentCustomer)
        {

            string fileNameDocument = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + RentCustomer.MainFolder + "/" + RentCustomer.CustId + "/" + RentCustomer.DocumentFolder + "/"));

            if (!Directory.Exists(fileNameDocument))
            {
                Directory.CreateDirectory(fileNameDocument);
            }
        }
        private void EmptyFolder(DirectoryInfo directory)
        {

            foreach (FileInfo file in directory.GetFiles())
            {
                file.Delete();
            }

            foreach (DirectoryInfo subdirectory in directory.GetDirectories())
            {
                EmptyFolder(subdirectory);
                subdirectory.Delete();
            }

        }
        [HttpPost]
        public int CheckFolderLengthImage(RentCustomer RentCustomer)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + RentCustomer.MainFolder + "/" + Request.Form["UniqueId"] + "/" + RentCustomer.ImageFolder + "/"));
            int filecount = 0;
            try
            {
                if (Directory.Exists(fileName))
                {
                    filecount = Directory.GetFiles(Server.MapPath(@"~/ProjectImages/" + RentCustomer.MainFolder + "/" + Request.Form["UniqueId"] + "/" + RentCustomer.ImageFolder + "/")).Length;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return filecount;
        }


        public ActionResult CustomerFileInsert(RentCustomer RentCustomer)
        {
            RentCustomer obj = new RentCustomer();

            List<RentCustomer> dList = new List<RentCustomer>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerFileInsert(RentCustomer, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCustomer MModels = new RentCustomer();
                    MModels.Flag = Convert.ToInt32(row["Flag"].ToString());
                    MModels.Status = row["Status"].ToString();
                    dList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { dList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CustomerFileGets(RentCustomer RentCustomer)
        {
            RentCustomer obj = new RentCustomer();

            List<RentCustomer> oList = new List<RentCustomer>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerFileGets(RentCustomer, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCustomer MModels = new RentCustomer();
                    MModels.FileId = Convert.ToInt32(row["CFileId"].ToString());
                    MModels.FileName = row["FileName"].ToString();
                    MModels.CustId = Convert.ToInt32(row["C_CustId"].ToString());
                    MModels.Extension = row["Extension"].ToString();
                    MModels.Flag = Convert.ToInt32(row["FolderFileName"].ToString());

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
        public ActionResult CustomerFileDelete(RentCustomer RentCustomer)
        {
            RentCustomer obj = new RentCustomer();

            List<RentCustomer> oList = new List<RentCustomer>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerFileDelete(RentCustomer, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCustomer MModels = new RentCustomer();
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
        public void CustomerFileUpload()
        {
            RentCustomer RentCustomer = new RentCustomer();

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string FileName1 = Request.Form["FileName"];
                string CustId = Request.Form["CustId"];
                string Extension = Request.Form["Extension"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + RentCustomer.MainFolder + "/" + CustId + "/" + RentCustomer.DocumentFolder + "/"), FileName1 + "." + Extension);
                Request.Files[upload].SaveAs(path1);
            }
        }

        [HttpPost]
        public void CarFolderCreate(RentCarModel RentCarModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + RentCarModel.CarFolder + "/" + RentCarModel.CarId + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        public void CarScratchFolderCreate(RentCarModel RentCarModel) 
        {          
            string scratchfileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + RentCarModel.CarScratch + "/" + RentCarModel.CarId + "/"));          
            if (!Directory.Exists(scratchfileName))
            {
                Directory.CreateDirectory(scratchfileName);
            }
            else
            {
                DirectoryInfo attachments_AR = new DirectoryInfo(Server.MapPath(@"~/ProjectImages/" + RentCarModel.CarScratch + "/" + RentCarModel.CarId + "/"));
                EmptyFolder(attachments_AR);
                Directory.Delete(scratchfileName);
                Directory.CreateDirectory(scratchfileName); 
            }
        }
        [HttpPost]
        public void CarScratchFileDelete(RentCarModel RentCarModel)  
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/CarScratchImages/" + RentCarModel.CarId + "/" + RentCarModel.FileName)); 
            System.IO.File.Delete(fileName);
        }

        [HttpPost]
        public JsonResult CarMultipleImageInsert(List<RentCarModel> RentCarModel)
        {
            RentCarModel obj = new RentCarModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<RentCarModel> oList = new List<RentCarModel>();
            try
            {
                string[] tmpTable = new string[8];
                tmpTable[0] = "SlNo";
                tmpTable[1] = "DeptId";
                tmpTable[2] = "FileName";
                tmpTable[3] = "Extension";
                tmpTable[4] = "FolderFileName";
                tmpTable[5] = "UserId";
                tmpTable[6] = "DelFlag";
                tmpTable[7] = "ImgType";
                dt = Common.CreateTable(tmpTable);
                foreach (var details in RentCarModel)
                {
                    obj.SlNo = details.SlNo;
                    obj.DeptId = details.DeptId;
                    obj.FileName = details.FileName;
                    obj.Extension = details.Extension;
                    obj.FolderFileName = details.FolderFileName;
                    obj.ItemUserId = details.ItemUserId;
                    obj.DelFlag = details.DelFlag;
                    obj.ImgType = details.ImgType;
                    dt.Rows.Add
                    (obj.SlNo, obj.DeptId, obj.FileName, obj.Extension, obj.FolderFileName, obj.ItemUserId, obj.DelFlag, obj.ImgType);
                }
                dsDataSet = obj.CarMultipleImageInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCarModel MModels = new RentCarModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["Flag"].ToString());   //FolderName                           
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
        public void CarsFileUpload()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string FileName1 = Request.Form["FileName"];
                string CarId = Request.Form["CarId"];
                string SlNo = Request.Form["SlNo"];
                string Extension = Request.Form["Extension"];
                string path1 = Path.Combine(Server.MapPath(@"~/ProjectImages/CarMultiImages/" + CarId + "/"), SlNo + "." + Extension);
                Request.Files[upload].SaveAs(path1);
            }
        }
        [HttpPost]
        public void CarsScratchFileUpload() 
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string FileName1 = Request.Form["FileName"];
                string CarId = Request.Form["CarId"];               
                string Extension = Request.Form["Extension"];
                string path1 = Path.Combine(Server.MapPath(@"~/ProjectImages/CarScratchImages/" + CarId + "/"), FileName1); 
                Request.Files[upload].SaveAs(path1);
            }
        }

        [HttpPost]
        public ActionResult CarsFileGets(RentCarModel RentCarModel)
        {
            RentCarModel obj = new RentCarModel();

            List<RentCarModel> oList = new List<RentCarModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CarsFileGets(RentCarModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCarModel MModels = new RentCarModel();
                    MModels.SlNo = Convert.ToInt32(row["FolderFileName"].ToString());   //FolderName
                    MModels.FileName = row["FileName"].ToString();
                    MModels.ImgType = Convert.ToInt32(row["ImgType"].ToString());
                    MModels.Extension = row["Extension"].ToString();
                    MModels.CarId = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.IYear = Convert.ToInt32(row["FileId"].ToString()); //FileId pk
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
        public ActionResult CarFileDelete(RentCarModel RentCarModel)
        {
            RentCarModel obj = new RentCarModel();

            List<RentCarModel> oList = new List<RentCarModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CarFileDelete(RentCarModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RentCarModel MModels = new RentCarModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.CarId = Convert.ToInt32(row["CarId"].ToString());
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