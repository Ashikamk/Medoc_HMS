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
    public class CarAgreementController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: CarAgreement
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult CarAgreement()
        {
            return View();
        }
        [HttpPost]
        public ActionResult CarSearch(CarAgreement CarAgreement)
        {
            CarAgreement obj = new CarAgreement();

            List<CarAgreement> oList = new List<CarAgreement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CarSearch(CarAgreement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CarAgreement PJModels = new CarAgreement();
                    PJModels.VechicleId = Convert.ToInt32(row["CarId"].ToString());
                    PJModels.VechicleNo = row["CarCode"].ToString();
                    PJModels.VechicleDesc = row["CarDesc"].ToString();
                    PJModels.Model = Convert.ToInt32(row["IYear"].ToString());
                    PJModels.Make = row["CarMake"].ToString();
                    oList.Add(PJModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public ActionResult CarAgreementInsertandUpdate(CarAgreement CarAgreement)
        {
            CarAgreement obj = new CarAgreement();
            List<CarAgreement> oList = new List<CarAgreement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CarAgreementInsertandUpdate(CarAgreement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CarAgreement LModels = new CarAgreement();
                    LModels.Status = Convert.ToInt32(row["Status"].ToString());
                    LModels.AgreementId = Convert.ToInt32(row["AgreementId"].ToString());
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
        public ActionResult CarAgreementGetandGets(CarAgreement CarAgreement)
        {
            CarAgreement obj = new CarAgreement();

            List<CarAgreement> oList = new List<CarAgreement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CarAgreementGetandGets(CarAgreement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CarAgreement LModels = new CarAgreement();
                    LModels.AgreementId = Convert.ToInt32(row["AgreementId"].ToString());
                    LModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    LModels.StartDate = row["StartDate"].ToString();
                    LModels.EndDate = row["EndDate"].ToString();
                    LModels.ReturnDate = row["ReturnDate"].ToString();
                    LModels.CustomerId = Convert.ToInt32(row["CustomerId"].ToString());
                    LModels.CustomerName = row["CustName"].ToString();
                    LModels.AgreementNo = row["AgreementNo"].ToString();
                    LModels.LicenseNo = row["LicenseNo"].ToString();
                    LModels.CheckoutDate = row["CheckOutDate"].ToString();
                    LModels.CheckinDate = row["CheckInDate"].ToString();
                    LModels.TicketDate = row["TicketDate"].ToString();
                    LModels.VechicleNo = row["CarCode"].ToString();
                    LModels.VechicleDesc = row["CarDesc"].ToString();
                    LModels.VechicleId = Convert.ToInt32(row["VechicleId"].ToString());
                    LModels.Make = row["Make"].ToString();
                    LModels.Model = Convert.ToInt32(row["Model"].ToString());
                    LModels.Phone = row["PhoneNo"].ToString();
                    LModels.CardNo = row["CardNo"].ToString();
                    LModels.PONo = Convert.ToInt32(row["PurchaseOrderNo"].ToString());
                    LModels.Checkoutlocation = Convert.ToInt32(row["CheckOutLocation"].ToString());
                    LModels.Checkinlocation = Convert.ToInt32(row["CheckInLocation"].ToString());
                    LModels.CheckoutlocName = row["CheckOutLocationName"].ToString();
                    LModels.CheckinlocName = row["CheckInLocationName"].ToString();
                    LModels.AgreementType = row["AgreementType"].ToString();
                    LModels.CreatedBy = row["Name"].ToString();
                    LModels.CreatedById = Convert.ToInt32(row["CreatedBy"].ToString());
                    LModels.AgreementStatus = row["AgreementStatus"].ToString();
                    LModels.CurrDate = row["CurrDate"].ToString();
                    LModels.DailyPrice = Convert.ToDecimal(row["DailyPrice"].ToString());
                    LModels.WeeklyPrice = Convert.ToDecimal(row["WeeklyPrice"].ToString());
                    LModels.MonthlyPrice = Convert.ToDecimal(row["MonthlyPrice"].ToString());
                    LModels.AnnualPrice = Convert.ToDecimal(row["AnnualPrice"].ToString());
                    LModels.Address = row["CustAddress"].ToString();
                    LModels.PhoneNo = row["PhoneNumber"].ToString();
                    LModels.Email = row["ContactEmailId"].ToString();
                    LModels.SalesFlag = row["SalesFlag"].ToString();
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
        public ActionResult CarAgreementView(CarAgreement CarAgreement)
        {
            CarAgreement obj = new CarAgreement();

            List<CarAgreement> oList = new List<CarAgreement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CarAgreementView(CarAgreement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CarAgreement LModels = new CarAgreement();
                    LModels.AgreementId = Convert.ToInt32(row["AgreementId"].ToString());
                    LModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    LModels.StartDate = row["StartDate"].ToString();
                    LModels.EndDate = row["EndDate"].ToString();
                    LModels.ReturnDate = row["ReturnDate"].ToString();
                    LModels.CustomerId = Convert.ToInt32(row["CustomerId"].ToString());
                    LModels.CustomerName = row["CustName"].ToString();
                    LModels.AgreementNo = row["AgreementNo"].ToString();
                    LModels.LicenseNo = row["LicenseNo"].ToString();
                    LModels.CheckoutDate = row["CheckOutDate"].ToString();
                    LModels.CheckinDate = row["CheckInDate"].ToString();
                    LModels.TicketDate = row["TicketDate"].ToString();
                    LModels.VechicleNo = row["CarCode"].ToString();
                    LModels.VechicleDesc = row["CarDesc"].ToString();
                    LModels.VechicleId = Convert.ToInt32(row["VechicleId"].ToString());
                    LModels.Make = row["Make"].ToString();
                    LModels.Model = Convert.ToInt32(row["Model"].ToString());
                    LModels.Phone = row["PhoneNo"].ToString();
                    LModels.CardNo = row["CardNo"].ToString();
                    LModels.PONo = Convert.ToInt32(row["PurchaseOrderNo"].ToString());
                    LModels.Checkoutlocation = Convert.ToInt32(row["CheckOutLocation"].ToString());
                    LModels.Checkinlocation = Convert.ToInt32(row["CheckInLocation"].ToString());
                    LModels.CheckoutlocName = row["CheckOutLocationName"].ToString();
                    LModels.CheckinlocName = row["CheckInLocationName"].ToString();
                    LModels.AgreementType = row["AgreementType"].ToString();
                    LModels.CreatedBy = row["Name"].ToString();
                    LModels.CreatedById = Convert.ToInt32(row["CreatedBy"].ToString());
                    LModels.AgreementStatus = row["AgreementStatus"].ToString();
                    LModels.CurrDate = row["CurrDate"].ToString();
                    LModels.DailyPrice = Convert.ToDecimal(row["DailyPrice"].ToString());
                    LModels.WeeklyPrice = Convert.ToDecimal(row["WeeklyPrice"].ToString());
                    LModels.MonthlyPrice = Convert.ToDecimal(row["MonthlyPrice"].ToString());
                    LModels.AnnualPrice = Convert.ToDecimal(row["AnnualPrice"].ToString());
                    LModels.Address = row["CustAddress"].ToString();
                    LModels.PhoneNo = row["PhoneNumber"].ToString();
                    LModels.Email = row["ContactEmailId"].ToString();
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