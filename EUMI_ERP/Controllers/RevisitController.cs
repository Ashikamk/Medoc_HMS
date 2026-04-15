using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;


using System.Net.Mail;
using System.Net;
using System.Text;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace EUMI_ERP.Controllers
{
    public class RevisitController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();


        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Revisit()
        {
            return View();
        }
        public ActionResult Test()
        {
            return View();
        }
        public ActionResult LabBill()
        {
            return View();
        }
        public ActionResult LabResult()
        {
            return View();
        }
        public ActionResult IPRegistration()
        {
            return View();
        }
        public ActionResult OPWorkSheet_S()
        {
            return View();
        }

        public ActionResult OPWorkSheet_DDENTAL()
        {
            return View();
        }

        public ActionResult OPWorkSheet_SDENTAL()
        {
            return View();
        }

        public ActionResult OPWorkSheet_Deye()
        {
            return View();
        }

        public ActionResult OPWorkSheet_Seye()
        {
            return View();
        }
        public ActionResult OPWorkSheet_D()
        {
            return View();
        }
        public ActionResult Scancasesheet()
        {
            return View();
        }


        public ActionResult OPWorkSheeteye_D()
        {
            return View();
        }


        public ActionResult OPWorkSheetayu_D()
        {
            return View();
        }

        public ActionResult OPWorkSheetayu_S()
        {
            return View();
        }
        public ActionResult ScanWorkSheet_D()
        {
            return View();
        }


        public ActionResult Ipbillststus()
        {
            return View();
        }

        public ActionResult ScanWorkSheet_S()
        {
            return View();
        }

        public ActionResult Patient_WorkSheet()
        {
            return View();
        }


        public ActionResult IPWorkSheet()
        {
            return View();
        }
        public ActionResult IPBPTempEntry()
        {
            return View();
        }
        public ActionResult ProcedureBill()
        {
            return View();
        }
        public ActionResult IPStatement()
        {
            return View();
        }


        public ActionResult IPStatementautofee()
        {
            return View();
        }


        public ActionResult DashBoard()
        {
            return View();
        }

        public ActionResult RegistrationList()
        {
            return View();
        }
        public ActionResult Nurse()
        {
            return View();
        }
        public ActionResult RptStock()
        {
            return View();
        }
        public ActionResult RptBatchWiseStock()
        {
            return View();
        }
        public ActionResult RptAsOnStock()
        {
            return View();
        }
        public ActionResult RptAsOnBatchWiseStock()
        {
            return View();
        }
        public ActionResult RptItemExpiry()
        {
            return View();
        }
        public ActionResult RptOpeningStock()
        {
            return View();
        }
        public ActionResult CaseSheetdental()
        {
            return View();
        }


        public ActionResult transbill()
        {
            return View();
        }

        public ActionResult HMS_GetPatientSelectedTests(long revisitId)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel.PatientTestModel> oList = new List<ReVisitModel.PatientTestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_GetPatientSelectedTests(revisitId, dbName);

                if (dsDataSet != null && dsDataSet.Tables.Count > 0 && dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        ReVisitModel.PatientTestModel model = new ReVisitModel.PatientTestModel();
                        model.TestId = Convert.ToInt64(row["TestId"]);
                        model.TestName = row["TestName"].ToString();
                        model.Priority = row["Priority"] != DBNull.Value ? row["Priority"].ToString() : "Routine";
                        model.Status = row["Status"] != DBNull.Value ? row["Status"].ToString() : "Pending";
                        model.BillNo = Convert.ToInt64(row["BillNo"]);
                        model.BillYear = Convert.ToInt64(row["BillYear"]);
                        oList.Add(model);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RevisitPatientHealthDetailsInsertandUpdate(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RevisitPatientHealthDetailsInsertandUpdate(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.RevisitId = Convert.ToInt32(row["RegNo"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        //////////////////////Revisit Controller//////////////////////

        ////insert
        public ActionResult RevisitPatientHealthDetailsInsertandUpdateOptometry(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RevisitPatientHealthDetailsInsertandUpdateOptometry(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.RevisitId = Convert.ToInt32(row["RegNo"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        public JsonResult GetVitalsRevisitIds()
        {
            WorkSheet obj = new WorkSheet();
            List<long> ids = new List<long>();
            try
            {
                DataSet dsDataSet = obj.HMS_GetVitalsRevisitIds(dbName);
                if (dsDataSet == null || dsDataSet.Tables.Count == 0 || dsDataSet.Tables[0].Rows.Count == 0)
                    return Json(ids, JsonRequestBehavior.AllowGet);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    if (Convert.ToInt32(row["VitalsStatus"]) == 1)
                    {
                        ids.Add(Convert.ToInt64(row["Revisit_Id"].ToString()));
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            return Json(ids, JsonRequestBehavior.AllowGet);
        }
        ///get

        public ActionResult RevisitPatientHealthDetailsGetandGetsOptometry(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RevisitPatientHealthDetailsGetandGetsOptometry(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();


                    MModels.RevisitId = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["PatientId"].ToString());
                    MModels.OPNumber = row["OpNo"].ToString();
                    MModels.DoctorName = row["DrName"].ToString();
                    MModels.RevisitDate = row["OpDate"].ToString();
                    MModels.UCVARight = row["UCVARight"].ToString();
                    MModels.UCVALeft = row["UCVALeft"].ToString();
                    MModels.PHRight = row["PHRight"].ToString();
                    MModels.PHLeft = row["PHLeft"].ToString();
                    MModels.BCVARight = row["BCVARight"].ToString();
                    MModels.BCVALeft = row["BCVALeft"].ToString();
                    MModels.ARRight = row["ARRight"].ToString();
                    MModels.ARLeft = row["ARLeft"].ToString();
                    MModels.LensPowerRight = row["LensPowerRight"].ToString();
                    MModels.LensPowerLeft = row["LensPowerLeft"].ToString();
                    MModels.DilatedObjRight = row["DilatedObjRight"].ToString();
                    MModels.DilatedObjLeft = row["DilatedObjLeft"].ToString();
                    MModels.UnDilatedObjRight = row["UnDilatedObjRight"].ToString();
                    MModels.UnDilatedObjLeft = row["UnDilatedObjLeft"].ToString();
                    MModels.DilatedSubRight = row["DilatedSubRight"].ToString();
                    MModels.DilatedSubLeft = row["DilatedSubLeft"].ToString();
                    MModels.AcceptingRight = row["AcceptingRight"].ToString();
                    MModels.AcceptingLeft = row["AcceptingLeft"].ToString();
                    MModels.IOPRight = row["IOPRight"].ToString();
                    MModels.IOPLeft = row["IOPLeft"].ToString();
                    MModels.ColourRight = row["ColourRight"].ToString();
                    MModels.ColourLeft = row["ColourLeft"].ToString();
                    MModels.CheifComplaints = row["CheifComplaints"].ToString();
                    MModels.ConfrontationRight = row["ConfrontationRight"].ToString();
                    MModels.ConfrontationLeft = row["ConfrontationLeft"].ToString();
                    MModels.AmslerRight = row["AmslerRight"].ToString();
                    MModels.AmslerLeft = row["AmslerLeft"].ToString();
                    MModels.BP = row["BP"].ToString();
                    MModels.GRBS = row["GRBS"].ToString();
                    MModels.HCIRCUMFERENCE = row["HCIRCUMFERENCE"].ToString();
                    MModels.Weight = row["Weight"].ToString();
                    MModels.Height = row["Height"].ToString();
                    MModels.Temperature = row["Temperature"].ToString();
                    MModels.Allergy = row["Allergy"].ToString();
                    MModels.SPHRight = row["SPHRight"].ToString();
                    MModels.SPHLeft = row["SPHLeft"].ToString();
                    MModels.CYLRight = row["CYLRight"].ToString();
                    MModels.CYLLeft = row["CYLLeft"].ToString();
                    MModels.AXISRight = row["AXISRight"].ToString();
                    MModels.AXISLeft = row["AXISLeft"].ToString();
                    MModels.ADERight = row["ADERight"].ToString();
                    MModels.ADELeft = row["ADELeft"].ToString();



                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }





        public ActionResult HMS_sentresultemail(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {

                SmtpClient mailServer = new SmtpClient("smtp.gmail.com", 587);
                mailServer.EnableSsl = true;

                mailServer.Credentials = new System.Net.NetworkCredential("myemail@gmail.com", "mypassword");

                string from = "myemail@gmail.com";
                string to = "reciever@gmail.com";
                MailMessage msg = new MailMessage(from, to);
                msg.Subject = "Enter the subject here";
                msg.Body = "The message goes here.";
                msg.Attachments.Add(new Attachment("D:\\myfile.txt"));
                mailServer.Send(msg);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult HMS_RegPatientInfo(RegistrationModel RegistrationModel)
        {
            RegistrationModel obj = new RegistrationModel();
            List<RegistrationModel> oList = new List<RegistrationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RegPatientInfo(RegistrationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RegistrationModel EDModels = new RegistrationModel();
                    EDModels.Status = row["Status"].ToString();
                    EDModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    EDModels.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    EDModels.PName = row["PName"].ToString();
                    EDModels.PGender = Convert.ToInt32(row["PGender"].ToString());
                    EDModels.Age = Convert.ToInt32(row["Age"].ToString());
                    EDModels.PDOB = row["PDOB"].ToString();
                    EDModels.Doctor = Convert.ToInt32(row["Doctor"].ToString());
                    EDModels.HealthCardNo = row["HealthCardNo"].ToString();
                    EDModels.MobileNo = row["MobileNo"].ToString();
                    EDModels.PhoneNo = row["PhoneNo"].ToString();
                    EDModels.Address1 = row["Address1"].ToString();
                    EDModels.Address2 = row["Address2"].ToString();
                    EDModels.Address3 = row["Address3"].ToString();
                    EDModels.AdharNo = row["AdharNo"].ToString();
                    EDModels.RegFee = Convert.ToDecimal(row["RegFee"].ToString());
                    EDModels.ConsultFee = Convert.ToDecimal(row["ConsultFee"].ToString());
                    EDModels.OtherFee = Convert.ToDecimal(row["OtherFee"].ToString());
                    EDModels.TokenNo = Convert.ToInt32(row["TokenNo"].ToString());
                    EDModels.RegDate = row["RegDate"].ToString();
                    EDModels.Birthweight = Convert.ToDecimal(row["Birthweight"].ToString());
                    EDModels.Currentweight = Convert.ToDecimal(row["Currentweight"].ToString());
                    EDModels.Bloodgroup = row["Bloodgroup"].ToString();
                    EDModels.Height = Convert.ToDecimal(row["Height"].ToString());
                    EDModels.Fathersname = row["Fathersname"].ToString();
                    EDModels.Mothersname = row["Mothersname"].ToString();
                    EDModels.FatherOccupation = row["FatherOccupation"].ToString();
                    EDModels.MotherOccupation = row["MotherOccupation"].ToString();
                    EDModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    EDModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    EDModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    EDModels.Status = row["Status"].ToString();
                    EDModels.RegId = Convert.ToInt32(row["RegId"].ToString());
                    EDModels.District = row["District"].ToString();
                    EDModels.State = row["State"].ToString();
                    EDModels.Religion = row["Religion"].ToString();
                    EDModels.Occupation = row["Occupation"].ToString();
                    EDModels.EmailId = row["EmailId"].ToString();
                    EDModels.selectedImage = row["selectedImage"].ToString();
                    EDModels.Country = row["Country"].ToString();
                    EDModels.Shift = row["Shift"].ToString();
                    EDModels.OPDescription = row["OPDescription"].ToString();

                    oList.Add(EDModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }


        public ActionResult Refertootherdoctor(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Refertootherdoctor(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.OPNumber = row["OP_Number"].ToString();
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.Shift = row["Shift"].ToString();
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }






        public ActionResult RevisitInsertandUpdate(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RevisitInsertandUpdate(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.OPNumber = row["OP_Number"].ToString();
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.Shift = row["Shift"].ToString();
                    MModels.TokenNumber = row["TokenNumber"].ToString();
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
        public ActionResult HMS_TestAdviceGets(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_TestAdviceGets(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();

                    MModels.OPNumber = row["PRegNo"].ToString();
                    MModels.RevisitId = Convert.ToInt32(row["OPVisit"].ToString());
                    MModels.Shift = row["vaccinename"].ToString();
                    MModels.TokenNumber = row["givendate"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        public ActionResult HMSSerialNoGets(HMSSerialModel HMSSerialModel)
        {
            HMSSerialModel obj = new HMSSerialModel();
            List<HMSSerialModel> oList = new List<HMSSerialModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMSSerialNoGets(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSSerialModel MModels = new HMSSerialModel();
                    MModels.RevisitId = Convert.ToInt32(row["RevisitNo"].ToString());
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.IPNo = Convert.ToInt32(row["IPNo"].ToString());
                    MModels.CYear = Convert.ToInt32(row["CYear"].ToString());
                    MModels.PRBillNo = Convert.ToInt32(row["PRBillNo"].ToString());
                    MModels.IPBillNo = Convert.ToInt32(row["IPBillNo"].ToString());
                    MModels.CaseSheetNo = Convert.ToInt32(row["CaseSheetNo"].ToString());
                    MModels.PurCorrection = Convert.ToInt32(row["PurCorrection"].ToString());
                    MModels.DischargeNo = Convert.ToInt32(row["DischargeNo"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult HMS_ShiftGetandGets(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_ShiftGetandGets(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.Flag = Convert.ToInt32(row["ShiftId"].ToString());
                    MModels.Shift = row["ShiftName"].ToString();
                    MModels.Status = row["Prev"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_TokenNumberGets(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_TokenNumberGets(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.TokenNumber = row["Token"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_PatientSearch(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();

            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PatientSearch(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {


                    ReVisitModel MModels = new ReVisitModel();
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.RegDate = row["RegDate"].ToString();
                    MModels.Add1 = row["Address1"].ToString();
                    MModels.Add2 = row["Address2"].ToString();
                    MModels.Add3 = row["Emailid"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_PatientSearchAppointment(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();

            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PatientSearchAppointment(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {


                    ReVisitModel MModels = new ReVisitModel();
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Age = row["Age"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.RegDate = row["RegDate"].ToString();
                    MModels.Add1 = row["Address1"].ToString();
                    MModels.Add2 = row["Address2"].ToString();
                    MModels.Add3 = row["Emailid"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_RevisitIdSearch(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();

            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RevisitIdSearch(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }


        public ActionResult HMS_PatientSearchGet(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PatientSearchGet(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Age = row["PAge"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.LastVisit = row["LastVisit"].ToString();
                    MModels.RegDate = row["RegDate"].ToString();
                    MModels.Add1 = row["Address1"].ToString();
                    MModels.Add2 = row["Address2"].ToString();
                    MModels.Add3 = row["Address3"].ToString();
                    MModels.AadharNo = row["AdharNo"].ToString();
                    MModels.HealthCard = row["HealthCardNo"].ToString();
                    MModels.Occupation = row["Occupation"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["LastDoctor"].ToString());
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.Status = row["selectedImage"].ToString();
                    MModels.RevisitId = Convert.ToInt32(row["LastVisitId"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_RevisitGetandGets(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RevisitGetandGets(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorName = row["DoctorName"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.VisitFees = Convert.ToDecimal(row["Visiting_Fee"].ToString());
                    MModels.ConsultFees = Convert.ToDecimal(row["Consult_Fee"].ToString());
                    MModels.OtherFees = Convert.ToDecimal(row["Other_Fee"].ToString());
                    MModels.Shift = row["Shift"].ToString();
                    MModels.ShiftName = row["ShiftName"].ToString();
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.AadharNo = row["AdharNo"].ToString();
                    MModels.HealthCard = row["HealthCardNo"].ToString();
                    MModels.Flag = Convert.ToInt32(row["STYPE"].ToString());
                    MModels.RevisitDate = row["VisitingDate"].ToString();
                    MModels.Add1 = row["Address1"].ToString();
                    MModels.Height = row["Height"].ToString();
                    MModels.Weight = row["Weight"].ToString();
                    MModels.BP = row["BP"].ToString();
                    MModels.Temperature = row["Temperature"].ToString();
                    MModels.Sugar = row["Sugar"].ToString();
                    MModels.Type = row["Type"].ToString();



                    MModels.Cash = Convert.ToDecimal(row["Cash"].ToString());
                    MModels.Upi = Convert.ToDecimal(row["Upi"].ToString());
                    MModels.Card = Convert.ToDecimal(row["Card"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        public ActionResult HMSPreVisitDetailGets(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMSPreVisitDetailGets(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["Patient_Id"].ToString());
                    MModels.OPNumber = row["OP_Number"].ToString();
                    MModels.DoctorName = row["DoctorName"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.RevisitDate = row["VisitDate"].ToString();
                    MModels.VisitFees = Convert.ToDecimal(row["Visiting_Fee"].ToString());
                    MModels.ConsultFees = Convert.ToDecimal(row["Consult_Fee"].ToString());
                    MModels.OtherFees = Convert.ToDecimal(row["Other_Fee"].ToString());
                    MModels.Status = row["UserName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }


        public ActionResult ScanStatusUpdate(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ScanStatusUpdate(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();

                    MModels.Status = row["flag"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }




        public ActionResult HMS_DoctorFeegetsfromrevisit(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DoctorFeegetsfromrevisit(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.FromDate = row["Totalvist"].ToString();
                    MModels.ToDate = row["Freevisits"].ToString();
                    MModels.ConsultFees = Convert.ToDecimal(row["Confee"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }






        public ActionResult HMS_DoctorFeegets(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DoctorFeegets(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.FromDate = row["Totalvist"].ToString();
                    MModels.ToDate = row["Freevisits"].ToString();
                    MModels.ConsultFees = Convert.ToDecimal(row["Confee"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }





        public ActionResult HMS_RevistDoctorGets(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RevistDoctorGets(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();

                    MModels.DoctorName = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["DocId"].ToString());
                    MModels.ConsultFees = Convert.ToDecimal(row["Consultancy"].ToString());
                    MModels.Status = row["PhoneNumber"].ToString();
                    MModels.Add1 = row["Training"].ToString();


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
        public JsonResult Hms_TestInsertandUpdate(List<HMSTest> HMSTest)
        {
            HMSTest obj = new HMSTest();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<HMSTest> oList = new List<HMSTest>();

            try
            {
                string[] tmpTable = new string[20];
                tmpTable[0] = "TestId";
                tmpTable[1] = "TestName";
                tmpTable[2] = "Rate";
                tmpTable[3] = "SpRate";
                tmpTable[4] = "VSpRate";
                tmpTable[5] = "OutsideRate";
                tmpTable[6] = "MedDept";
                tmpTable[7] = "SubDivision";
                tmpTable[8] = "SubTestId";
                tmpTable[9] = "SubDiv";
                tmpTable[10] = "StdUnit";
                tmpTable[11] = "NormalValue";
                tmpTable[12] = "MinValue";
                tmpTable[13] = "MaxValue";
                tmpTable[14] = "Notes";
                tmpTable[15] = "DeptId";
                tmpTable[16] = "UserId";
                tmpTable[17] = "DelFlag";
                tmpTable[18] = "EXRate";
                tmpTable[19] = "Status";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in HMSTest)
                {
                    obj.TestId = details.TestId;
                    obj.TestName = details.TestName;
                    obj.Rate = details.Rate;
                    obj.SpRate = details.SpRate;
                    obj.VSpRate = details.VSpRate;
                    obj.OutsideRate = details.OutsideRate;
                    obj.MedDept = details.MedDept;
                    obj.SubDivision = details.SubDivision;
                    obj.SubTestId = details.SubTestId;
                    obj.SubDiv = details.SubDiv;
                    obj.StdUnit = details.StdUnit;
                    obj.NormalValue = details.NormalValue;
                    obj.MinValue = details.MinValue;
                    obj.MaxValue = details.MaxValue;
                    obj.Notes = details.Notes;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EXRate = details.EXRate;
                    obj.Status = details.Status;

                    dt.Rows.Add
                    (obj.TestId, obj.TestName, obj.Rate, obj.SpRate, obj.VSpRate, obj.OutsideRate,
                    obj.MedDept, obj.SubDivision, obj.SubTestId, obj.SubDiv, obj.StdUnit, obj.NormalValue,
                    obj.MinValue, obj.MaxValue, obj.Notes, obj.DeptId, obj.UserId, obj.DelFlag, obj.EXRate, obj.Status);
                }

                dsDataSet = obj.Hms_TestInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSTest MModels = new HMSTest();
                    MModels.Status = row["Status"].ToString();
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_TestGetandGets(HMSTest HMSTest)
        {
            HMSTest obj = new HMSTest();
            List<HMSTest> oList = new List<HMSTest>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_TestGetandGets(HMSTest, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSTest MModels = new HMSTest();

                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.Rate = Convert.ToDecimal(row["TestRate"].ToString());
                    MModels.SpRate = Convert.ToDecimal(row["SpecialRate"].ToString());
                    MModels.VSpRate = Convert.ToDecimal(row["VSpecialRate"].ToString());
                    MModels.OutsideRate = Convert.ToDecimal(row["OutSideRate"].ToString());
                    MModels.MedDept = Convert.ToInt32(row["MedDepartment"].ToString());
                    MModels.MedDeptName = row["Department"].ToString();
                    MModels.SubDivision = row["SubDiv"].ToString();
                    MModels.SubTestId = Convert.ToInt32(row["TestSubId"].ToString());
                    MModels.SubDiv = row["SubTestName"].ToString();
                    MModels.StdUnit = row["SUnit"].ToString();
                    MModels.NormalValue = row["NormalValue"].ToString();
                    MModels.MinValue = Convert.ToDecimal(row["MinValue"].ToString());
                    MModels.MaxValue = Convert.ToDecimal(row["MaxValue"].ToString());
                    MModels.Notes = row["Notes"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }



        public ActionResult HMS_LAstRevisitGetsscan(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LAstRevisitGetsscan(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.OPNumber = row["OP_Number"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.Occupation = row["ProcedureName"].ToString();
                    MModels.RegDate = row["VisitingDate"].ToString();
                    MModels.Age = row["Age"].ToString();



                    // MModels.DoctorName = row["Dname"].ToString();//prescribe by
                    // MModels.Height = row["ProcedureId"].ToString();


                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }


        public ActionResult HMS_LAstRevisitGetsOP(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LAstRevisitGetsOP(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.AadharNo = row["AdharNo"].ToString();
                    MModels.HealthCard = row["HealthCardNo"].ToString();
                    MModels.RevisitDate = row["VisitingDate"].ToString();
                    MModels.Add1 = row["Address1"].ToString();
                    MModels.Flag = Convert.ToInt32(row["PGenderId"].ToString());  //GenderId
                    MModels.OPSerId = Convert.ToInt32(row["RegSeries"].ToString());  //RegSeries
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Weight = row["Weight"].ToString();
                    MModels.FromDate = row["EmailId"].ToString();
                    MModels.Add2 = row["CurrentDtTime"].ToString();
                    MModels.OPSerName = row["IPNumber"].ToString();            //Ip nO
                    MModels.Add3 = row["IPYear"].ToString();                   //IPYear
                    MModels.OPCaseSheet = row["OPCaseSheet"].ToString();
                    MModels.IPCaseSheet = row["IPCaseSheet"].ToString();
                    MModels.SendSMS = row["SendSMS"].ToString();
                    MModels.SpecialFees = row["SpecialFees"].ToString();
                    MModels.LastVisit = row["Birthweight"].ToString();
                    MModels.Fname = row["Fathersname"].ToString();
                    MModels.Foccupation = row["FatherOccupation"].ToString();
                    MModels.Moccupation = row["MotherOccupation"].ToString();
                    MModels.Mname = row["Mothersname"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }



        public ActionResult HMS_LAstRevisitGets(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LAstRevisitGets(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.AadharNo = row["AdharNo"].ToString();
                    MModels.HealthCard = row["HealthCardNo"].ToString();
                    MModels.RevisitDate = row["VisitingDate"].ToString();
                    MModels.Add1 = row["Address1"].ToString();
                    MModels.Flag = Convert.ToInt32(row["PGenderId"].ToString());  //GenderId
                    MModels.OPSerId = Convert.ToInt32(row["RegSeries"].ToString());  //RegSeries
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Weight = row["Weight"].ToString();
                    MModels.FromDate = row["EmailId"].ToString();
                    MModels.Add2 = row["CurrentDtTime"].ToString();
                    MModels.OPSerName = row["IPNumber"].ToString();            //Ip nO
                    MModels.Add3 = row["IPYear"].ToString();                   //IPYear
                    MModels.OPCaseSheet = row["OPCaseSheet"].ToString();
                    MModels.IPCaseSheet = row["IPCaseSheet"].ToString();
                    MModels.SendSMS = row["SendSMS"].ToString();
                    MModels.SpecialFees = row["SpecialFees"].ToString();
                    MModels.LastVisit = row["Birthweight"].ToString();
                    MModels.Fname = row["Fathersname"].ToString();
                    MModels.Foccupation = row["FatherOccupation"].ToString();
                    MModels.Moccupation = row["MotherOccupation"].ToString();
                    MModels.Mname = row["Mothersname"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }



        public ActionResult HMS_LabBillGetsQuee(LabResult LabResult)
        {
            LabResult obj = new LabResult();
            List<LabResult> oList = new List<LabResult>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LabBillGetsQuee(LabResult, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabResult MModels = new LabResult();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.Date = row["BillDate"].ToString();
                    MModels.Doctor = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor"].ToString());
                    MModels.Flag = Convert.ToInt32(row["RESULTED"].ToString());
                    MModels.OPNumber = Convert.ToInt32(row["OpNo"].ToString());
                    MModels.IPNumber = Convert.ToInt32(row["IpNo"].ToString());
                    MModels.PType = row["Type"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }






        public ActionResult HMS_LabBillGets(LabResult LabResult)
        {
            LabResult obj = new LabResult();
            List<LabResult> oList = new List<LabResult>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LabBillGets(LabResult, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabResult MModels = new LabResult();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.Date = row["BillDate"].ToString();
                    MModels.Doctor = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor"].ToString());
                    MModels.Flag = Convert.ToInt32(row["RESULTED"].ToString());
                    MModels.OPNumber = Convert.ToInt32(row["OpNo"].ToString());
                    MModels.IPNumber = Convert.ToInt32(row["IpNo"].ToString());
                    MModels.PType = row["Type"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_TestSearch(HMSTest HMSTest)
        {
            HMSTest obj = new HMSTest();

            List<HMSTest> oList = new List<HMSTest>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_TestSearch(HMSTest, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSTest MModels = new HMSTest();
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.Rate = Convert.ToDecimal(row["TestRate"].ToString());
                    MModels.SpRate = Convert.ToDecimal(row["SpecialRate"].ToString());
                    MModels.VSpRate = Convert.ToDecimal(row["VSpecialRate"].ToString());
                    MModels.OutsideRate = Convert.ToDecimal(row["OutSideRate"].ToString());
                    MModels.MedDept = Convert.ToInt32(row["MedDepartment"].ToString());
                    MModels.MedDeptName = row["Department"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_LabBillTestGets(LabResult LabResult)
        {
            LabResult obj = new LabResult();
            List<LabResult> oList = new List<LabResult>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LabBillTestGets(LabResult, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabResult MModels = new LabResult();
                    MModels.BillNo = Convert.ToInt32(row["BBillNo"].ToString());
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.SubTestId = Convert.ToInt32(row["STestId"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.NormalValue = row["NormalValue"].ToString();
                    MModels.StdUnit = row["StdUnit"].ToString();
                    MModels.Flag = Convert.ToInt32(row["Flag"].ToString());
                    MModels.Status = row["SubDiv"].ToString();
                    MModels.Result = row["Result"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["ResultFlag"].ToString());
                    MModels.ResultId = Convert.ToInt32(row["ResultId"].ToString());
                    MModels.MinValue = Convert.ToDecimal(row["MinVal"].ToString());
                    MModels.MaxValue = Convert.ToDecimal(row["MaxVal"].ToString());
                    MModels.Notes = row["Notes"].ToString();
                    MModels.MedDeptId = row["MedDeptId"].ToString();
                    MModels.MedDeptName = row["MedDeptName"].ToString();
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
        public JsonResult HMS_ResultInsertandUpdate(List<LabResult> LabResult)
        {
            LabResult obj = new LabResult();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<LabResult> oList = new List<LabResult>();

            try
            {
                string[] tmpTable = new string[19];
                tmpTable[0] = "ResultId";
                tmpTable[1] = "OPNumber";
                tmpTable[2] = "PatientId";
                tmpTable[3] = "DoctorId";
                tmpTable[4] = "BillNo";
                tmpTable[5] = "BillYear";
                tmpTable[6] = "SubResultId";
                tmpTable[7] = "TestId";
                tmpTable[8] = "SubTestId";
                tmpTable[9] = "TestName";
                tmpTable[10] = "Result";
                tmpTable[11] = "DeptId";
                tmpTable[12] = "UserId";
                tmpTable[13] = "DelFlag";
                tmpTable[14] = "Flag";
                tmpTable[15] = "Status";
                tmpTable[16] = "NormalValue";
                tmpTable[17] = "Notes";
                tmpTable[18] = "Remarks";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in LabResult)
                {
                    obj.ResultId = details.ResultId;
                    obj.OPNumber = details.OPNumber;
                    obj.PatientId = details.PatientId;
                    obj.DoctorId = details.DoctorId;
                    obj.BillNo = details.BillNo;
                    obj.BillYear = details.BillYear;
                    obj.SubResultId = details.SubResultId;
                    obj.TestId = details.TestId;
                    obj.SubTestId = details.SubTestId;
                    obj.TestName = details.TestName;
                    obj.Result = details.Result;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.Flag = details.Flag;
                    obj.Status = details.Status;
                    obj.NormalValue = details.NormalValue;
                    obj.Notes = details.Notes;
                    obj.Remarks = details.Remarks;

                    dt.Rows.Add
                    (obj.ResultId, obj.OPNumber, obj.PatientId, obj.DoctorId, obj.BillNo, obj.BillYear,
                    obj.SubResultId, obj.TestId, obj.SubTestId, obj.TestName, obj.Result, obj.DeptId,
                    obj.UserId, obj.DelFlag, obj.Flag, obj.Status, obj.NormalValue, obj.Notes, obj.Remarks);
                }

                dsDataSet = obj.HMS_ResultInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabResult MModels = new LabResult();
                    MModels.Status = row["Status"].ToString();
                    MModels.ResultId = Convert.ToInt32(row["ResultId"].ToString());
                    MModels.Date = row["Date"].ToString();
                    MModels.ToDate = row["Time"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult HMS_ResultGetandGets(LabResult LabResult)
        {
            LabResult obj = new LabResult();
            List<LabResult> oList = new List<LabResult>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_ResultGetandGets(LabResult, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabResult MModels = new LabResult();
                    MModels.ResultId = Convert.ToInt32(row["ResultId"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["Patient_Id"].ToString());
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.OPNumber = Convert.ToInt32(row["RevisitId"].ToString());
                    MModels.RegNoS = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.BloodGroup = row["Bloodgroup"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.Doctor = row["Name"].ToString();
                    MModels.SubResultId = Convert.ToInt32(row["SubResultId"].ToString());
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.SubTestId = Convert.ToInt32(row["SubTestId"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.SubTestName = row["SubTestName"].ToString();
                    MModels.Result = row["Result"].ToString();
                    MModels.NormalValue = row["NormalValue"].ToString();
                    MModels.StdUnit = row["SUnit"].ToString();
                    MModels.Status = row["SubDiv"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.PType = row["PType"].ToString();
                    MModels.MinValue = Convert.ToDecimal(row["MinValue"].ToString());
                    MModels.MaxValue = Convert.ToDecimal(row["MaxValue"].ToString());
                    MModels.Notes = row["Notes"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Date = row["ResultDate"].ToString();
                    MModels.MedDeptId = row["MedDepartment"].ToString();
                    MModels.MedDeptName = row["Department"].ToString();
                    MModels.FromDate = row["RegDate"].ToString();
                    MModels.ToDate = row["InsDate"].ToString();
                    MModels.BillDate = row["BillDate"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }

        //anu

        public ActionResult Hms_GetLabResultNotification(LabResult LabResult)
        {
            LabResult obj = new LabResult();
            List<LabResult> oList = new List<LabResult>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Hms_GetLabResultNotification(LabResult, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabResult MModels = new LabResult();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.OPNumber = Convert.ToInt32(row["OP_Number"].ToString());
                    MModels.SubResultId = Convert.ToInt32(row["RevisitId"].ToString());



                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }

        //anu
        [HttpPost]
        public JsonResult HMS_BillInsertforpharma(List<LabBill> LabBill)
        {
            LabBill obj = new LabBill();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<LabBill> oList = new List<LabBill>();

            try
            {
                string[] tmpTable = new string[30];
                tmpTable[0] = "BillMainId";
                tmpTable[1] = "BillNo";
                tmpTable[2] = "BillYear";
                tmpTable[3] = "BillDate";
                tmpTable[4] = "PayType";
                tmpTable[5] = "RegNo";
                tmpTable[6] = "RegSeries";
                tmpTable[7] = "OpNo";
                tmpTable[8] = "IpNo";
                tmpTable[9] = "Name";
                tmpTable[10] = "Age";
                tmpTable[11] = "Gender";
                tmpTable[12] = "Doctor";
                tmpTable[13] = "Hospital";
                tmpTable[14] = "TotalAmt";
                tmpTable[15] = "DiscPercent";
                tmpTable[16] = "DiscAmt";
                tmpTable[17] = "NetAmt";
                tmpTable[18] = "TestId";
                tmpTable[19] = "Department";
                tmpTable[20] = "PQty";
                tmpTable[21] = "PRate";
                tmpTable[22] = "TestAmount";
                tmpTable[23] = "RateType";
                tmpTable[24] = "UserId";
                tmpTable[25] = "DeptId";
                tmpTable[26] = "DelFlag";
                tmpTable[27] = "Type";
                tmpTable[28] = "SurgeryDate";
                tmpTable[29] = "Remarks";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in LabBill)
                {
                    obj.BillMainId = details.BillMainId;
                    obj.BillNo = details.BillNo;
                    obj.BillYear = details.BillYear;
                    obj.BillDate = details.BillDate;
                    obj.PayType = details.PayType;
                    obj.RegNo = details.RegNo;
                    obj.RegSeries = details.RegSeries;
                    obj.OpNo = details.OpNo;
                    obj.IpNo = details.IpNo;
                    obj.Name = details.Name;
                    obj.Age = details.Age;
                    obj.Gender = details.Gender;
                    obj.Doctor = details.Doctor;
                    obj.Hospital = details.Hospital;
                    obj.TotalAmt = details.TotalAmt;
                    obj.DiscPercent = details.DiscPercent;
                    obj.DiscAmt = details.DiscAmt;
                    obj.NetAmt = details.NetAmt;
                    obj.TestId = details.TestId;
                    obj.Department = details.Department;
                    obj.PQty = details.PQty;
                    obj.PRate = details.PRate;
                    obj.TestAmount = details.TestAmount;
                    obj.RateType = details.RateType;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    obj.Type = details.Type;
                    obj.SurgeryDate = details.SurgeryDate;
                    obj.Remarks = details.Remarks;

                    dt.Rows.Add
                    (obj.BillMainId, obj.BillNo, obj.BillYear, obj.BillDate, obj.PayType, obj.RegNo, obj.RegSeries, obj.OpNo, obj.IpNo, obj.Name, obj.Age,
    obj.Gender, obj.Doctor, obj.Hospital, obj.TotalAmt, obj.DiscPercent, obj.DiscAmt, obj.NetAmt, obj.TestId, obj.Department, obj.PQty, obj.PRate,
    obj.TestAmount, obj.RateType, obj.UserId, obj.DeptId, obj.DelFlag, obj.Type, obj.SurgeryDate, obj.Remarks);
                }

                dsDataSet = obj.HMS_BillInsertforpharma(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
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
        public JsonResult HMS_BillInsert(List<LabBill> LabBill)
        {
            LabBill obj = new LabBill();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<LabBill> oList = new List<LabBill>();

            try
            {
                string[] tmpTable = new string[30];
                tmpTable[0] = "BillMainId";
                tmpTable[1] = "BillNo";
                tmpTable[2] = "BillYear";
                tmpTable[3] = "BillDate";
                tmpTable[4] = "PayType";
                tmpTable[5] = "RegNo";
                tmpTable[6] = "RegSeries";
                tmpTable[7] = "OpNo";
                tmpTable[8] = "IpNo";
                tmpTable[9] = "Name";
                tmpTable[10] = "Age";
                tmpTable[11] = "Gender";
                tmpTable[12] = "Doctor";
                tmpTable[13] = "Hospital";
                tmpTable[14] = "TotalAmt";
                tmpTable[15] = "DiscPercent";
                tmpTable[16] = "DiscAmt";
                tmpTable[17] = "NetAmt";
                tmpTable[18] = "TestId";
                tmpTable[19] = "Department";
                tmpTable[20] = "PQty";
                tmpTable[21] = "PRate";
                tmpTable[22] = "TestAmount";
                tmpTable[23] = "RateType";
                tmpTable[24] = "UserId";
                tmpTable[25] = "DeptId";
                tmpTable[26] = "DelFlag";
                tmpTable[27] = "Type";
                tmpTable[28] = "SurgeryDate";
                tmpTable[29] = "Remarks";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in LabBill)
                {
                    obj.BillMainId = details.BillMainId;
                    obj.BillNo = details.BillNo;
                    obj.BillYear = details.BillYear;
                    obj.BillDate = details.BillDate;
                    obj.PayType = details.PayType;
                    obj.RegNo = details.RegNo;
                    obj.RegSeries = details.RegSeries;
                    obj.OpNo = details.OpNo;
                    obj.IpNo = details.IpNo;
                    obj.Name = details.Name;
                    obj.Age = details.Age;
                    obj.Gender = details.Gender;
                    obj.Doctor = details.Doctor;
                    obj.Hospital = details.Hospital;
                    obj.TotalAmt = details.TotalAmt;
                    obj.DiscPercent = details.DiscPercent;
                    obj.DiscAmt = details.DiscAmt;
                    obj.NetAmt = details.NetAmt;
                    obj.TestId = details.TestId;
                    obj.Department = details.Department;
                    obj.PQty = details.PQty;
                    obj.PRate = details.PRate;
                    obj.TestAmount = details.TestAmount;
                    obj.RateType = details.RateType;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    obj.Type = details.Type;
                    obj.SurgeryDate = details.SurgeryDate;
                    obj.Remarks = details.Remarks;

                    dt.Rows.Add
                    (obj.BillMainId, obj.BillNo, obj.BillYear, obj.BillDate, obj.PayType, obj.RegNo, obj.RegSeries, obj.OpNo, obj.IpNo, obj.Name, obj.Age,
                     obj.Gender, obj.Doctor, obj.Hospital, obj.TotalAmt, obj.DiscPercent, obj.DiscAmt, obj.NetAmt, obj.TestId, obj.Department, obj.PQty, obj.PRate,
                     obj.TestAmount, obj.RateType, obj.UserId, obj.DeptId, obj.DelFlag, obj.Type, obj.SurgeryDate, obj.Remarks);
                }

                dsDataSet = obj.HMS_BillInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
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
        public ActionResult HMS_BillNoSearch(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_BillNoSearch(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillDate = row["BillDate"].ToString();
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult HMS_CasualityAdviceGets(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_CasualityAdviceGets(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.TestName = row["ProcedureName"].ToString();
                    MModels.PRate = Convert.ToDecimal(row["PRate"].ToString());
                    MModels.Department = row["MedDepartment"].ToString();
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
        public ActionResult HMS_ProcAdvicegets(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_ProcAdvicegets(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.PRate = Convert.ToDecimal(row["TestRate"].ToString());
                    MModels.Department = row["MedDepartment"].ToString();
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
        public ActionResult HMS_LabAdvicegets(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LabAdvicegets(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.PRate = Convert.ToDecimal(row["TestRate"].ToString());
                    MModels.Department = row["MedDepartment"].ToString();
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
        public ActionResult HMS_BillNumberGetandGetsload(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_BillNumberGetandGetsload(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.BillMainId = Convert.ToInt32(row["BillMainId"].ToString());
                    MModels.BillDate = row["BillDate"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.OpNo = Convert.ToInt32(row["OpNo"].ToString());
                    MModels.IpNo = Convert.ToInt32(row["IpNo"].ToString());
                    MModels.Age = row["Age"].ToString();
                    MModels.Gender = Convert.ToInt32(row["Gender"].ToString());
                    MModels.Doctor = Convert.ToInt32(row["Doctor"].ToString());
                    MModels.Hospital = row["Hospital"].ToString();
                    MModels.TotalAmt = Convert.ToDecimal(row["TotalAmt"].ToString());
                    MModels.DiscPercent = Convert.ToDecimal(row["DiscPercent"].ToString());
                    MModels.DiscAmt = Convert.ToDecimal(row["DiscAmt"].ToString());
                    MModels.NetAmt = Convert.ToDecimal(row["NetAmt"].ToString());
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.Department = row["Department"].ToString();
                    MModels.PQty = Convert.ToDecimal(row["PQty"].ToString());
                    MModels.PRate = Convert.ToDecimal(row["PRate"].ToString());
                    MModels.TestAmount = Convert.ToDecimal(row["TestAmount"].ToString());
                    MModels.RateType = Convert.ToInt32(row["RateType"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.Type = Convert.ToInt32(row["Type"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.Status = row["TestCode"].ToString();
                    MModels.IPYear = row["IPYear"].ToString();
                    MModels.AdmitDate = row["AdmitDate"].ToString();
                    MModels.AdmitTime = row["AdmitTime"].ToString();
                    MModels.DischargeDate = row["DischargeDate"].ToString();
                    MModels.DischargeTime = row["DischargeTime"].ToString();
                    MModels.SurgeryDate = row["SurgeryDate"].ToString();
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
        public ActionResult HMS_BillNumberGetandGets(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_BillNumberGetandGets(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.BillMainId = Convert.ToInt32(row["BillMainId"].ToString());
                    MModels.BillDate = row["BillDate"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.OpNo = Convert.ToInt32(row["OpNo"].ToString());
                    MModels.IpNo = Convert.ToInt32(row["IpNo"].ToString());
                    MModels.Age = row["Age"].ToString();
                    MModels.Gender = Convert.ToInt32(row["Gender"].ToString());
                    MModels.Doctor = Convert.ToInt32(row["Doctor"].ToString());
                    MModels.Hospital = row["Hospital"].ToString();
                    MModels.TotalAmt = Convert.ToDecimal(row["TotalAmt"].ToString());
                    MModels.DiscPercent = Convert.ToDecimal(row["DiscPercent"].ToString());
                    MModels.DiscAmt = Convert.ToDecimal(row["DiscAmt"].ToString());
                    MModels.NetAmt = Convert.ToDecimal(row["NetAmt"].ToString());
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.Department = row["Department"].ToString();
                    MModels.PQty = Convert.ToDecimal(row["PQty"].ToString());
                    MModels.PRate = Convert.ToDecimal(row["PRate"].ToString());
                    MModels.TestAmount = Convert.ToDecimal(row["TestAmount"].ToString());
                    MModels.RateType = Convert.ToInt32(row["RateType"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.Type = Convert.ToInt32(row["Type"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.Status = row["TestCode"].ToString();
                    MModels.IPYear = row["IPYear"].ToString();
                    MModels.AdmitDate = row["AdmitDate"].ToString();
                    MModels.AdmitTime = row["AdmitTime"].ToString();
                    MModels.DischargeDate = row["DischargeDate"].ToString();
                    MModels.DischargeTime = row["DischargeTime"].ToString();
                    MModels.SurgeryDate = row["SurgeryDate"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Others = row["Others"].ToString();

                    MModels.Cashrec = row["Cash"].ToString();
                    MModels.CardRec = row["Card"].ToString();
                    MModels.Upirec = row["Upi"].ToString();


                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_VacantRoomGets(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();

            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_VacantRoomGets(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.RoomId = Convert.ToInt32(row["RoomId"].ToString());
                    MModels.RoomCode = row["RoomCode"].ToString();
                    MModels.RoomName = row["RoomName"].ToString();
                    MModels.RoomRate = Convert.ToDecimal(row["Rate"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_BillNumberListView(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_BillNumberListView(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.BillNo = Convert.ToInt64(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.BillMainId = Convert.ToInt32(row["BillMainId"].ToString());
                    MModels.BillDate = row["BillDate"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.OpNo = Convert.ToInt32(row["OpNo"].ToString());
                    MModels.IpNo = Convert.ToInt32(row["IpNo"].ToString());
                    MModels.Age = row["Age"].ToString();
                    MModels.Gender = Convert.ToInt32(row["Gender"].ToString());
                    MModels.TestName = row["DocName"].ToString();
                    MModels.Hospital = row["Hospital"].ToString();
                    MModels.TotalAmt = Convert.ToDecimal(row["TotalAmt"].ToString());
                    MModels.DiscPercent = Convert.ToDecimal(row["DiscPercent"].ToString());
                    MModels.DiscAmt = Convert.ToDecimal(row["DiscAmt"].ToString());
                    MModels.NetAmt = Convert.ToDecimal(row["NetAmt"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.Type = Convert.ToInt32(row["Type"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_IPRegistrationInsertandUpdate(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPRegistrationInsertandUpdate(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.Status = row["Status"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_RoomAllocation(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RoomAllocation(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.Status = row["Status"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_RoomChange(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RoomChange(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.Status = row["Status"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_RoomIPDetails(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RoomIPDetails(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.RoomId = Convert.ToInt32(row["RoomId"].ToString());
                    MModels.RoomCode = row["RoomCode"].ToString();
                    MModels.RoomName = row["RoomName"].ToString();
                    MModels.RoomRate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Date = row["FromDate"].ToString();
                    MModels.InTime = row["FromTime"].ToString();
                    MModels.DDate = row["ToDate"].ToString();
                    MModels.DTime = row["ToTime"].ToString();


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
        public ActionResult HMS_IPmedicineDetailsgets(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPmedicineDetailsgets(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.medicine = row["Medicine"].ToString();
                    MModels.Fstatus = row["flag"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }





        [HttpPost]
        public ActionResult HMS_IPDetailsgets(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPDetailsgets(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.PC = row["Complaint"].ToString();
                    MModels.Dg = row["Diagnosis"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }








        [HttpPost]
        public ActionResult HMS_IPRegistrationGets(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPRegistrationGets(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.IPMainId = Convert.ToInt32(row["IPId"].ToString());
                    MModels.IPYear = Convert.ToInt32(row["IPYear"].ToString());
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.OPVisitId = Convert.ToInt32(row["OPVisitId"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["PatientId"].ToString());
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.RegSeries = Convert.ToInt32(row["RegSeriesId"].ToString());
                    MModels.RegSeriesName = row["Prefix"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Date = row["AdmitDate"].ToString();
                    MModels.InTime = row["AdmitTime"].ToString();
                    MModels.RoomId = Convert.ToInt32(row["RoomId"].ToString());
                    MModels.RoomCode = row["RoomCode"].ToString();
                    MModels.RoomName = row["RoomName"].ToString();
                    MModels.RoomRate = Convert.ToDecimal(row["RoomRate"].ToString());
                    MModels.Status = row["Status"].ToString();
                    MModels.DDate = row["DischargeDate"].ToString();
                    MModels.DTime = row["DischargeTime"].ToString();
                    MModels.Flag = Convert.ToInt32(row["DFlag"].ToString());
                    MModels.Status = row["Status"].ToString();

                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorName = row["Name"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }

        [HttpPost]
        public JsonResult HMS_BillUpdate(List<LabBill> LabBill)
        {
            LabBill obj = new LabBill();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<LabBill> oList = new List<LabBill>();

            try
            {
                string[] tmpTable = new string[30];
                tmpTable[0] = "BillMainId";
                tmpTable[1] = "BillNo";
                tmpTable[2] = "BillYear";
                tmpTable[3] = "BillDate";
                tmpTable[4] = "PayType";
                tmpTable[5] = "RegNo";
                tmpTable[6] = "RegSeries";
                tmpTable[7] = "OpNo";
                tmpTable[8] = "IpNo";
                tmpTable[9] = "Name";
                tmpTable[10] = "Age";
                tmpTable[11] = "Gender";
                tmpTable[12] = "Doctor";
                tmpTable[13] = "Hospital";
                tmpTable[14] = "TotalAmt";
                tmpTable[15] = "DiscPercent";
                tmpTable[16] = "DiscAmt";
                tmpTable[17] = "NetAmt";
                tmpTable[18] = "TestId";
                tmpTable[19] = "Department";
                tmpTable[20] = "PQty";
                tmpTable[21] = "PRate";
                tmpTable[22] = "TestAmount";
                tmpTable[23] = "RateType";
                tmpTable[24] = "UserId";
                tmpTable[25] = "DeptId";
                tmpTable[26] = "DelFlag";
                tmpTable[27] = "Type";
                tmpTable[28] = "SurgeryDate";
                tmpTable[29] = "Remarks";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in LabBill)
                {
                    obj.BillMainId = details.BillMainId;
                    obj.BillNo = details.BillNo;
                    obj.BillYear = details.BillYear;
                    obj.BillDate = details.BillDate;
                    obj.PayType = details.PayType;
                    obj.RegNo = details.RegNo;
                    obj.RegSeries = details.RegSeries;
                    obj.OpNo = details.OpNo;
                    obj.IpNo = details.IpNo;
                    obj.Name = details.Name;
                    obj.Age = details.Age;
                    obj.Gender = details.Gender;
                    obj.Doctor = details.Doctor;
                    obj.Hospital = details.Hospital;
                    obj.TotalAmt = details.TotalAmt;
                    obj.DiscPercent = details.DiscPercent;
                    obj.DiscAmt = details.DiscAmt;
                    obj.NetAmt = details.NetAmt;
                    obj.TestId = details.TestId;
                    obj.Department = details.Department;
                    obj.PQty = details.PQty;
                    obj.PRate = details.PRate;
                    obj.TestAmount = details.TestAmount;
                    obj.RateType = details.RateType;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    obj.Type = details.Type;
                    obj.SurgeryDate = details.SurgeryDate;
                    obj.Remarks = details.Remarks;

                    dt.Rows.Add
                    (obj.BillMainId, obj.BillNo, obj.BillYear, obj.BillDate, obj.PayType, obj.RegNo, obj.RegSeries, obj.OpNo, obj.IpNo, obj.Name, obj.Age,
    obj.Gender, obj.Doctor, obj.Hospital, obj.TotalAmt, obj.DiscPercent, obj.DiscAmt, obj.NetAmt, obj.TestId, obj.Department, obj.PQty, obj.PRate,
    obj.TestAmount, obj.RateType, obj.UserId, obj.DeptId, obj.DelFlag, obj.Type, obj.SurgeryDate, obj.Remarks);
                }

                dsDataSet = obj.HMS_BillUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
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
        public ActionResult HMS_LabBillDelete(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LabBillDelete(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
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
        public ActionResult HMS_Cashpaymentdelete(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_Cashpaymentdelete(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabBill MModels = new LabBill();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());

                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        public ActionResult HMS_OPWorkSheetScan(WorkSheet WorkSheet)
        {
            WorkSheet obj = new WorkSheet();
            List<WorkSheet> oList = new List<WorkSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_OPWorkSheetScan(WorkSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkSheet MModels = new WorkSheet();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["Patient_Id"].ToString());
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["OP_Series"].ToString());
                    MModels.OPNumber = row["OP_Number"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorName = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.ShiftName = row["ShiftName"].ToString();
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.Flag = Convert.ToInt32(row["STYPE"].ToString());
                    MModels.RevisitDate = row["VisitingDate"].ToString();
                    MModels.Status = row["Status"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DFlag"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }



        public ActionResult HMS_OPWorkSheetStaffLAb(WorkSheet WorkSheet)
        {
            WorkSheet obj = new WorkSheet();
            List<WorkSheet> oList = new List<WorkSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_OPWorkSheetStaffLAb(WorkSheet, dbName);
                
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkSheet MModels = new WorkSheet();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["Patient_Id"].ToString());
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["OP_Series"].ToString());
                    MModels.OPNumber = row["OP_Number"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorName = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.ShiftName = row["ShiftName"].ToString();
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.Flag = Convert.ToInt32(row["STYPE"].ToString());
                    MModels.RevisitDate = row["VisitingDate"].ToString();
                    MModels.Status = row["Status"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DFlag"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        public ActionResult HMS_OPWorkSheetStaff(WorkSheet WorkSheet)
        {
            WorkSheet obj = new WorkSheet();
            List<WorkSheet> oList = new List<WorkSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_OPWorkSheetStaff(WorkSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkSheet MModels = new WorkSheet();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["Patient_Id"].ToString());
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["OP_Series"].ToString());
                    MModels.OPNumber = row["OP_Number"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorName = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.ShiftName = row["ShiftName"].ToString();
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.Flag = Convert.ToInt32(row["STYPE"].ToString());
                    MModels.RevisitDate = row["VisitingDate"].ToString();
                    MModels.Status = row["Status"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DFlag"].ToString());
                    MModels.CSFlag = row["CSFlag"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        public ActionResult HMS_OPWorkSheetDoctor(WorkSheet WorkSheet)
        {
            WorkSheet obj = new WorkSheet();
            List<WorkSheet> oList = new List<WorkSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_OPWorkSheetDoctor(WorkSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkSheet MModels = new WorkSheet();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["Patient_Id"].ToString());
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["OP_Series"].ToString());
                    MModels.OPNumber = row["OP_Number"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorName = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.ShiftName = row["ShiftName"].ToString();
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.Flag = Convert.ToInt32(row["STYPE"].ToString());
                    MModels.RevisitDate = row["VisitingDate"].ToString();
                    MModels.Status = row["Status"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DFlag"].ToString());
                    MModels.CSFlag = row["CSFlag"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        public ActionResult HMS_IPWorkSheetDoctor(WorkSheet WorkSheet)
        {
            WorkSheet obj = new WorkSheet();
            List<WorkSheet> oList = new List<WorkSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPWorkSheetDoctor(WorkSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    WorkSheet MModels = new WorkSheet();

                    MModels.Flag = Convert.ToInt32(row["IPYear"].ToString());
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["OPVisitId"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["PatientId"].ToString());
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["RegSeriesId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorName = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.RevisitDate = row["AdmitDate"].ToString();
                    MModels.Status = row["AdmitTime"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DFlag"].ToString());
                    MModels.FromDate = row["DischargeDate"].ToString();
                    MModels.ToDate = row["DischargeTime"].ToString();
                    MModels.ShiftName = row["RoomCode"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        public ActionResult HMS_IP_BP_TempEntryGets(WorkSheet WorkSheet)
        {
            WorkSheet obj = new WorkSheet();
            List<WorkSheet> oList = new List<WorkSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IP_BP_TempEntryGets(WorkSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    WorkSheet MModels = new WorkSheet();

                    MModels.Flag = Convert.ToInt32(row["IPYear"].ToString());
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["OPVisitId"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["PatientId"].ToString());
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["RegSeriesId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorName = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.RevisitDate = row["AdmitDate"].ToString();
                    MModels.Status = row["AdmitTime"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DFlag"].ToString());
                    MModels.FromDate = row["DischargeDate"].ToString();
                    MModels.ToDate = row["DischargeTime"].ToString();
                    MModels.ShiftName = row["RoomCode"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };

        }
        public ActionResult HMS_IP_BPTempGraph(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IP_BPTempGraph(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    IPRegistration MModels = new IPRegistration();

                    MModels.Date = row["EDate"].ToString();
                    MModels.InTime = row["ETime"].ToString();
                    MModels.Status = row["Temperature"].ToString();
                    MModels.Flag = Convert.ToInt32(row["DFlag"].ToString());
                    MModels.DOB = row["AdmitDate"].ToString();
                    MModels.Contact = row["AdmitTime"].ToString();
                    MModels.DDate = row["DischargeDate"].ToString();
                    MModels.DTime = row["DischargeTime"].ToString();
                    MModels.Gender = row["Flag"].ToString();


                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };

        }

        public ActionResult HMS_WorkSheetDoctorSearch(WorkSheet WorkSheet)
        {
            WorkSheet obj = new WorkSheet();

            List<WorkSheet> oList = new List<WorkSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_WorkSheetDoctorSearch(WorkSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WorkSheet MModels = new WorkSheet();
                    MModels.DoctorId = Convert.ToInt32(row["DocId"].ToString());
                    MModels.DoctorName = row["Name"].ToString();
                    MModels.Status = row["Department"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_TimeSearch(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();

            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_TimeSearch(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.Flag = Convert.ToInt32(row["TID"].ToString());
                    MModels.InTime = row["TIME"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }


        public ActionResult HMS_IPorPatientSearch(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();

            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPorPatientSearch(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.AadharNo = row["IPNumber"].ToString();
                    MModels.Status = row["IPYear"].ToString();
                    MModels.FromDate = row["AdmitDate"].ToString();
                    MModels.ToDate = row["AdmitTime"].ToString();
                    MModels.RegDate = row["DischargeDate"].ToString();
                    MModels.RevisitDate = row["DischargeTime"].ToString();
                    MModels.ShiftName = row["Fathersname"].ToString();
                    MModels.TokenNumber = row["FatherOccupation"].ToString();
                    MModels.SpecialFees = row["Mothersname"].ToString();
                    MModels.SendSMS = row["MotherOccupation"].ToString();
                    MModels.Add1 = row["Address"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_IPPatientSearch(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();

            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPPatientSearch(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.AadharNo = row["IPNumber"].ToString();
                    MModels.Status = row["IPYear"].ToString();
                    MModels.FromDate = row["AdmitDate"].ToString();
                    MModels.ToDate = row["AdmitTime"].ToString();
                    MModels.RegDate = row["DischargeDate"].ToString();
                    MModels.RevisitDate = row["DischargeTime"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_ProcedureSearch(proceduremastercs proceduremastercs)
        {
            proceduremastercs obj = new proceduremastercs();

            List<proceduremastercs> oList = new List<proceduremastercs>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_ProcedureSearch(proceduremastercs, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    proceduremastercs MModels = new proceduremastercs();
                    MModels.ProcedureId = Convert.ToInt32(row["ProcedureId"].ToString());
                    MModels.ProcedureCode = row["ProcedureCode"].ToString();
                    MModels.Procedurecharge = Convert.ToDecimal(row["Procedurecharge"].ToString());
                    MModels.ProcedureName = row["ProcedureName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        //anu

        public ActionResult HMS_CreditBillGets(IPStatement IPStatement)
        {
            IPStatement obj = new IPStatement();
            List<IPStatement> oList = new List<IPStatement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_CreditBillGets(IPStatement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPStatement MModels = new IPStatement();
                    //MModels.IPNumber = Convert.ToInt32(row["IpNo"].ToString());
                    MModels.OPVisit = Convert.ToInt32(row["OpNo"].ToString());
                    MModels.Date = row["BillDate"].ToString();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.Department = row["BillType"].ToString();
                    MModels.Days = Convert.ToInt32(row["AdDays"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["NetAmt"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Flag = Convert.ToInt32(row["FLAG"].ToString());
                    MModels.Status = row["PType"].ToString();
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
        public JsonResult CreditBillInsertandUpdate(List<IPStatement> IPStatement)
        {
            IPStatement obj = new IPStatement();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<IPStatement> oList = new List<IPStatement>();

            try
            {
                string[] tmpTable = new string[11];
                tmpTable[0] = "BillId";
                tmpTable[1] = "BillNo";
                tmpTable[2] = "BillType";
                tmpTable[3] = "PatientId";
                tmpTable[4] = "Cash";
                tmpTable[5] = "UPI";
                tmpTable[6] = "Card";
                tmpTable[7] = "var1";
                tmpTable[8] = "var2";
                tmpTable[9] = "var3";
                tmpTable[10] = "var4";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in IPStatement)
                {
                    obj.BillId = details.BillId;
                    obj.BillNo = details.BillNo;
                    obj.BillType = details.BillType;
                    obj.PatientId = details.PatientId;
                    obj.Cash = details.Cash;
                    obj.UPI = details.UPI;
                    obj.Card = details.Card;
                    obj.var1 = details.var1;
                    obj.var2 = details.var2;
                    obj.var3 = details.var3;
                    obj.var4 = details.var4;

                    dt.Rows.Add
                   (obj.BillId, obj.BillNo, obj.BillType, obj.PatientId, obj.Cash, obj.UPI, obj.Card, obj.var1, obj.var2, obj.var3, obj.var4);
                }

                dsDataSet = obj.CreditBillInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPStatement MModels = new IPStatement();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        //anu



        public ActionResult HMS_IPStatementautoFee(IPStatement IPStatement)
        {
            IPStatement obj = new IPStatement();
            List<IPStatement> oList = new List<IPStatement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPStatementautoFee(IPStatement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPStatement MModels = new IPStatement();
                    MModels.BillId = Convert.ToInt32(row["Rno"].ToString());
                    MModels.BillType = row["BillType"].ToString();
                    MModels.Paytype = row["PayType"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.OPVisit = Convert.ToInt32(row["OpNo"].ToString());
                    MModels.BillSeries = row["BillSeriesId"].ToString();
                    MModels.BillNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.Date = row["InvDate"].ToString();
                    MModels.billAmount = row["Total"].ToString();
                    MModels.RecAmount = row["RecAmount"].ToString();
                    MModels.balance = row["balAmount"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }





        public ActionResult HMS_IPStatement(IPStatement IPStatement)
        {
            IPStatement obj = new IPStatement();
            List<IPStatement> oList = new List<IPStatement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPStatement(IPStatement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPStatement MModels = new IPStatement();
                    MModels.IPNumber = Convert.ToInt32(row["IpNo"].ToString());
                    MModels.OPVisit = Convert.ToInt32(row["OpNo"].ToString());
                    MModels.Date = row["BillDate"].ToString();
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.Department = row["BillType"].ToString();
                    MModels.Days = Convert.ToInt32(row["AdDays"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["NetAmt"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Flag = Convert.ToInt32(row["FLAG"].ToString());
                    MModels.Status = row["PType"].ToString();
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


        public ActionResult HMS_IPAdvanceDetailsGets(IPStatement IPStatement)
        {
            IPStatement obj = new IPStatement();
            List<IPStatement> oList = new List<IPStatement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPAdvanceDetailsGets(IPStatement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPStatement MModels = new IPStatement();

                    MModels.Date = row["AdvanceDt"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["AdAmount"].ToString());
                    MModels.RegSerName = row["UserName"].ToString();
                    MModels.Patient = row["DepartmentDescription"].ToString();
                    MModels.BillType = row["Flag"].ToString();

                    MModels.ProcId = row["ProcId"].ToString();
                    MModels.procName = row["ProcName"].ToString();
                    MModels.ProcDays = row["ProcDays"].ToString();
                    MModels.Prochours = row["ProcHrs"].ToString();
                    MModels.procRate = row["ProcRate"].ToString();
                    MModels.ProcAmount = row["TotalAmount"].ToString();




                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }






        public ActionResult HMS_IPStatementRoom(IPStatement IPStatement)
        {
            IPStatement obj = new IPStatement();
            List<IPStatement> oList = new List<IPStatement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_IPStatementRoom(IPStatement, dbName);

                if (dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        IPStatement MModels = new IPStatement();
                        MModels.Flag = Convert.ToInt32(row["FLAG"].ToString());
                        MModels.Remarks = row["Room"].ToString();
                        MModels.Date = row["FromDate"].ToString();
                        MModels.Status = row["ToDate"].ToString();
                        MModels.Rate = Convert.ToDecimal(row["Rent"].ToString());
                        MModels.Days = Convert.ToInt32(row["AdDays"].ToString());
                        MModels.RegSerId = Convert.ToInt32(row["Hrs"].ToString());
                        MModels.Amount = Convert.ToDecimal(row["NetAmt"].ToString());
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
        public ActionResult HMS_DashBoardWidgets(HMSDashBoard HMSDashBoard)
        {
            HMSDashBoard obj = new HMSDashBoard();
            List<HMSDashBoard> oList = new List<HMSDashBoard>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_DashBoardWidgets(HMSDashBoard, dbName);
                if (dsDataSet != null)
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        HMSDashBoard MModels = new HMSDashBoard();
                        MModels.Appoinment = row["Appoinment"].ToString();
                        MModels.TotalDoctors = row["TotalDoctors"].ToString();
                        MModels.AvailDoctors = row["AvailDoctors"].ToString();
                        MModels.TotalPatients = row["TotalPatients"].ToString();
                        MModels.NewRegistration = row["NewRegistration"].ToString();
                        MModels.TotalRevisit = row["TotalRevisit"].ToString();
                        MModels.TodayRevisit = row["TodayRevisit"].ToString();
                        MModels.Admitted = row["Admitted"].ToString();
                        MModels.NewIP = row["NewIP"].ToString();
                        MModels.Discharge = row["Discharge"].ToString();
                        MModels.Rooms = row["Rooms"].ToString();
                        MModels.LabBill = Convert.ToDecimal(row["LabBill"].ToString());
                        MModels.ProcedureBill = Convert.ToDecimal(row["ProcedureBill"].ToString());

                        oList.Add(MModels);
                    }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult HMS_DB_DoctorDeptGraph(HMSDashBoard HMSDashBoard)
        {
            HMSDashBoard obj = new HMSDashBoard();
            List<HMSDashBoard> oList = new List<HMSDashBoard>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DB_DoctorDeptGraph(HMSDashBoard, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSDashBoard MModels = new HMSDashBoard();
                    MModels.Visit = row["VISIT"].ToString();
                    MModels.Id = row["Doctor_Id"].ToString();
                    MModels.Name = row["Name"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_DB_RegRevisitGraph(HMSDashBoard HMSDashBoard)
        {
            HMSDashBoard obj = new HMSDashBoard();
            List<HMSDashBoard> oList = new List<HMSDashBoard>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DB_RegRevisitGraph(HMSDashBoard, dbName);
                if (dsDataSet != null)
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        HMSDashBoard MModels = new HMSDashBoard();
                        MModels.Visit = row["Reg"].ToString();
                        MModels.ToDay = row["RegDate"].ToString();

                        oList.Add(MModels);
                    }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_DB_BillGraph(HMSDashBoard HMSDashBoard)
        {
            HMSDashBoard obj = new HMSDashBoard();
            List<HMSDashBoard> oList = new List<HMSDashBoard>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DB_BillGraph(HMSDashBoard, dbName);
                if (dsDataSet != null)
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        HMSDashBoard MModels = new HMSDashBoard();
                        MModels.Title = row["BillDt"].ToString();
                        MModels.Amount1 = row["IPAmount"].ToString();
                        MModels.Amount2 = row["LBAmount"].ToString();
                        MModels.Amount3 = row["PBAmount"].ToString();

                        oList.Add(MModels);
                    }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult HMS_DB_SalesBillGraph(HMSDashBoard HMSDashBoard)
        {
            HMSDashBoard obj = new HMSDashBoard();
            List<HMSDashBoard> oList = new List<HMSDashBoard>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DB_SalesBillGraph(HMSDashBoard, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSDashBoard MModels = new HMSDashBoard();
                    MModels.Title = row["InvDate"].ToString();
                    MModels.Amount1 = row["GrandTotal"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult HMS_DB_RoomDetails(IPRegistration IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DB_RoomDetails(IPRegistration, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.RoomId = Convert.ToInt32(row["RoomId"].ToString());
                    MModels.RoomCode = row["RoomCode"].ToString();
                    MModels.RoomName = row["RoomName"].ToString();
                    MModels.RoomRate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Status = row["Remarks"].ToString();
                    MModels.RoomId = Convert.ToInt32(row["RoomId"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["CurrentPatient_Id"].ToString());
                    MModels.DoctorName = row["Flag"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.RegSeriesName = row["Prefix"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_NurseInsertAndUpdate(NurseModal NurseModal)
        {
            NurseModal obj = new NurseModal();
            List<NurseModal> oList = new List<NurseModal>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_NurseInsertAndUpdate(NurseModal, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    NurseModal MModels = new NurseModal();
                    MModels.NurseId = Convert.ToInt32(row["NurseId"].ToString());
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

        public ActionResult HMS_NurseGetandGets(NurseModal NurseModal)
        {
            NurseModal obj = new NurseModal();
            List<NurseModal> oList = new List<NurseModal>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_NurseGetandGets(NurseModal, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    NurseModal EDModels = new NurseModal();
                    EDModels.NurseId = Convert.ToInt32(row["NurseId"].ToString());
                    EDModels.NuName = row["NuName"].ToString();
                    EDModels.NuDept = Convert.ToInt32(row["NuDept"].ToString());
                    EDModels.NuUserId = Convert.ToInt32(row["NuUserId"].ToString());
                    EDModels.NuGender = row["NuGender"].ToString();
                    EDModels.NuMobile = row["NuMobile"].ToString();
                    EDModels.NuPhone = row["NuPhone"].ToString();
                    EDModels.NuEmail = row["NuEmail"].ToString();
                    EDModels.NuLanguage = row["NuLanguage"].ToString();
                    EDModels.NuAddress1 = row["NuAddress1"].ToString();
                    EDModels.NuAddress2 = row["NuAddress2"].ToString();
                    EDModels.NuAddress3 = row["NuAddress3"].ToString();
                    EDModels.NuSpecialization = row["NuSpecialization"].ToString();
                    EDModels.NuExperience = row["NuExperience"].ToString();
                    EDModels.NuDesignation = row["NuDesignation"].ToString();
                    EDModels.NuTraining = row["NuTraining"].ToString();
                    EDModels.NuCertification = row["NuCertification"].ToString();
                    EDModels.NuAcheivement = row["NuAcheivement"].ToString();
                    EDModels.NuQualification1 = row["NuQualification1"].ToString();
                    EDModels.NuQualification2 = row["NuQualification2"].ToString();
                    EDModels.NuQualification2 = row["NuQualification2"].ToString();
                    EDModels.NuQualification3 = row["NuQualification3"].ToString();
                    EDModels.NuQualification4 = row["NuQualification4"].ToString();
                    EDModels.NuQualification5 = row["NuQualification5"].ToString();
                    EDModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    EDModels.NuImgName = row["NuImgName"].ToString();
                    EDModels.Variable1 = row["Department"].ToString();
                    EDModels.Variable2 = row["Name"].ToString();
                    EDModels.Variable3 = row["Gender"].ToString();

                    oList.Add(EDModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }

        [HttpPost]
        public void NurseFolderCreate(NurseModal NurseModal)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/" + NurseModal.ProjectImages + "/" + NurseModal.FolderName + "/" + NurseModal.NurseId + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void NurseFileUpload()
        {
            NurseModal NurseModal = new NurseModal();

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string NurseId = Request.Form["NurseId"];
                string Extension = Request.Form["Extension"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/" + NurseModal.ProjectImages + "/" + NurseModal.FolderName + "/" + NurseId + "/"), NurseId + "." + Extension);
                Request.Files[upload].SaveAs(path1);
            }
        }

        public ActionResult HMS_PatientSearchRegistration(ReVisitModel ReVisitModel)
        {
            ReVisitModel obj = new ReVisitModel();

            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PatientSearchRegistration(ReVisitModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.OPSerName = row["Prefix"].ToString();
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.OPSerId = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.RegDate = row["RegDate"].ToString();
                    MModels.Add1 = row["Address1"].ToString();
                    MModels.Add2 = row["Address2"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_Rpt_StockReport(HMSReportModal HMSReportModal)
        {
            HMSReportModal obj = new HMSReportModal();
            List<HMSReportModal> oList = new List<HMSReportModal>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_Rpt_StockReport(HMSReportModal, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSReportModal EDModels = new HMSReportModal();
                    EDModels.ItemId = row["S_ItemId"].ToString();
                    EDModels.ItemCode = row["S_ItemCode"].ToString();
                    EDModels.ItemDesc = row["S_ItemName"].ToString();
                    EDModels.BatchSlNo = row["S_BatchSlNo"].ToString();
                    EDModels.Quantity = row["S_Stock"].ToString();
                    EDModels.LooseQuantity = row["S_LooseStock"].ToString();
                    EDModels.LocationId = row["S_Location"].ToString();
                    EDModels.CompanyId = row["S_Company"].ToString();
                    EDModels.MedTypeId = row["S_MedType"].ToString();
                    EDModels.MedScheduleId = row["S_MedSchedule"].ToString();
                    EDModels.Flag = row["Flag"].ToString();
                    EDModels.Batch = row["Batch"].ToString();
                    EDModels.Expiry = row["ItemExpiry"].ToString();
                    EDModels.Company = row["GrpCode"].ToString();
                    EDModels.MedType = row["CategoryCode"].ToString();
                    EDModels.MedSchedule = row["SubCategoryName"].ToString();
                    EDModels.SellAmount = row["SalesValue"].ToString();
                    EDModels.Cost = row["CostValue"].ToString();
                    oList.Add(EDModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        public ActionResult HMS_Rpt_AsOnStockReport(HMSReportModal HMSReportModal)
        {
            HMSReportModal obj = new HMSReportModal();
            List<HMSReportModal> oList = new List<HMSReportModal>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_Rpt_AsOnStockReport(HMSReportModal, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSReportModal EDModels = new HMSReportModal();

                    EDModels.ItemId = row["ItemId"].ToString();
                    EDModels.ItemCode = row["ItemCode"].ToString();
                    EDModels.ItemDesc = row["ItemDesc"].ToString();
                    EDModels.BatchSlNo = row["BatchSlNo"].ToString();
                    EDModels.Batch = row["Batch"].ToString();
                    EDModels.Quantity = row["Quantity"].ToString();
                    EDModels.LooseQuantity = row["LooseQty"].ToString();
                    EDModels.LocationId = row["LocationId"].ToString();
                    EDModels.Cost = row["Cost"].ToString();
                    EDModels.Price = row["Price"].ToString();
                    EDModels.PurAmount = row["PurAmount"].ToString();
                    EDModels.SellAmount = row["SellAmount"].ToString();
                    EDModels.TransType = row["TransType"].ToString();
                    EDModels.Flag = row["Flag"].ToString();
                    EDModels.Company = row["GrpCode"].ToString();
                    EDModels.MedType = row["CategoryCode"].ToString();
                    EDModels.MedSchedule = row["SubCategoryName"].ToString();
                    EDModels.Expiry = row["ItemExpiry"].ToString();

                    oList.Add(EDModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        public ActionResult HMS_Rpt_ItemExpiry(HMSReportModal HMSReportModal)
        {
            HMSReportModal obj = new HMSReportModal();
            List<HMSReportModal> oList = new List<HMSReportModal>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_Rpt_ItemExpiry(HMSReportModal, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSReportModal EDModels = new HMSReportModal();

                    EDModels.ItemId = row["S_ItemId"].ToString();
                    EDModels.ItemCode = row["S_ItemCode"].ToString();
                    EDModels.ItemDesc = row["S_ItemName"].ToString();
                    EDModels.BatchSlNo = row["S_BatchSlNo"].ToString();
                    EDModels.Batch = row["S_Batch"].ToString();
                    EDModels.Expiry = row["S_ItemExpiry"].ToString();
                    EDModels.Quantity = row["Stock"].ToString();
                    EDModels.LooseQuantity = row["StockLoose"].ToString();
                    EDModels.CompanyId = row["CompanyId"].ToString();
                    EDModels.MedTypeId = row["MedTypeId"].ToString();
                    EDModels.MedScheduleId = row["MedScheduleId"].ToString();
                    EDModels.Company = row["Company"].ToString();
                    EDModels.MedType = row["MedType"].ToString();
                    EDModels.MedSchedule = row["MedSchedule"].ToString();
                    EDModels.Flag = row["Flag"].ToString();
                    oList.Add(EDModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }

        public ActionResult HMS_Rpt_OpeningStock(HMSReportModal HMSReportModal)
        {
            HMSReportModal obj = new HMSReportModal();
            List<HMSReportModal> oList = new List<HMSReportModal>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_Rpt_OpeningStock(HMSReportModal, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSReportModal EDModels = new HMSReportModal();

                    EDModels.Param1 = row["Tid"].ToString();
                    EDModels.ItemId = row["ItemId"].ToString();
                    EDModels.ItemCode = row["ItemCode"].ToString();
                    EDModels.ItemDesc = row["ItemName"].ToString();
                    EDModels.CompanyId = row["CompanyId"].ToString();
                    EDModels.Company = row["Company"].ToString();
                    EDModels.MedTypeId = row["TypeId"].ToString();
                    EDModels.MedType = row["Type"].ToString();
                    EDModels.MedScheduleId = row["ScheduleId"].ToString();
                    EDModels.MedSchedule = row["Schedule"].ToString();
                    EDModels.BatchSlNo = row["BatchSlno"].ToString();
                    EDModels.Batch = row["Batch"].ToString();
                    EDModels.OPLooseQuantity = row["OP_Loose"].ToString();
                    EDModels.OPQuantity = row["OP_Qty"].ToString();
                    EDModels.LooseQuantity = row["ST_Loose"].ToString();
                    EDModels.Quantity = row["ST_Qty"].ToString();
                    EDModels.LocationId = row["Location"].ToString();
                    EDModels.Flag = row["Flag"].ToString();

                    oList.Add(EDModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }




        public ActionResult RevisitPatientHealthDetailsGetandGets(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RevisitPatientHealthDetailsGetandGets(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();


                    MModels.RevisitId = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["PatientId"].ToString());
                    MModels.OPNumber = row["OpNo"].ToString();
                    MModels.DoctorName = row["DrName"].ToString();
                    MModels.RevisitDate = row["OpDate"].ToString();
                    MModels.Height = row["Height"].ToString();
                    MModels.Weight = row["Weight"].ToString();
                    MModels.BP = row["BP"].ToString();
                    MModels.Temperature = row["Temp"].ToString();
                    MModels.Sugar = row["Sug"].ToString();
                    MModels.BMI = row["BMI"].ToString();
                    MModels.ChestCircumference = row["Chest"].ToString();
                    MModels.HeadCircumference = row["Head"].ToString();
                    MModels.Abdominal = row["Abdom"].ToString();
                    MModels.Allergy = row["Allergy"].ToString();



                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }



        [HttpPost]
        public ActionResult HMS_OPWorkSheetLabAdvice(WorkSheet WorkSheet)
        {
            WorkSheet obj = new WorkSheet();
            List<WorkSheet> oList = new List<WorkSheet>();
            try
            {
                Console.WriteLine("FromDate received: " + WorkSheet.FromDate + " ToDate: " + WorkSheet.ToDate);
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_OPWorkSheetLabAdvice(WorkSheet, dbName);
                Console.WriteLine("Rows returned: " + (dsDataSet?.Tables[0]?.Rows?.Count ?? -1));
                if (dsDataSet != null && dsDataSet.Tables.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        WorkSheet MModels = new WorkSheet();

                        MModels.Status = row["Status"].ToString();
                        MModels.Gender = row["Gender"].ToString();
                        MModels.PatientName = row["PatientName"].ToString();
                        MModels.BloodGroup = row["BloodGroup"].ToString();
                        MModels.Contact = row["Contact"].ToString();
                        MModels.ShiftName = row["ShiftName"].ToString();
                        MModels.DoctorName = row["DoctorName"].ToString();
                        MModels.DOB = row["DOB"].ToString();
                        MModels.IPNumber = Convert.ToInt64(row["IPNumber"].ToString());
                        MModels.PatientId = Convert.ToInt64(row["PatientId"].ToString());
                        MModels.RevisitId = Convert.ToInt64(row["RevisitId"].ToString());
                        MModels.OPSerName = row["OPSerName"].ToString();
                        MModels.OPNumber = row["OPNumber"].ToString();
                        MModels.DoctorId = Convert.ToInt64(row["Doctor_Id"].ToString());
                        MModels.TokenNumber = row["TokenNumber"].ToString();
                        MModels.RevisitDate = row["RevisitDate"].ToString();
                        MModels.Flag = Convert.ToInt64(row["Flag"].ToString());
                        MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                        MModels.LabAdvice = row["LabAdvice"].ToString();
                        MModels.LabAdviceCount = Convert.ToInt32(row["LabAdviceCount"].ToString());

                        oList.Add(MModels);
                        Console.WriteLine("Rows: " + dsDataSet.Tables[0].Rows.Count);
                    }
                }
                else {
                    Console.WriteLine("Stored Procedure returned NULL or EMPTY dataset");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }

        [HttpPost]
        public ActionResult HMS_LabResultVerificationInsert(LabWorksheetSave model)
        {
            LabWorksheetSave obj = new LabWorksheetSave();
            List<LabWorksheetSave> oList = new List<LabWorksheetSave>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LabResultVerificationInsert(model, dbName);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabWorksheetSave MModels = new LabWorksheetSave();
                    MModels.Status = row["Status"].ToString();
                    MModels.RecId = Convert.ToInt64(row["RecId"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult HMS_LabResultVerificationGet(LabWorksheetSave model)
        {
            LabWorksheetSave obj = new LabWorksheetSave();
            List<LabWorksheetSave> oList = new List<LabWorksheetSave>();
            try
            {
                DataSet dsDataSet = obj.HMS_LabResultVerificationGet(model, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabWorksheetSave MModels = new LabWorksheetSave();
                    MModels.VerifiedUser = Convert.ToInt64(row["VerifiedUser"].ToString());
                    MModels.ApprovedUser = Convert.ToInt64(row["ApprovedUser"].ToString());
                    MModels.Status = row["Status"].ToString();
                    MModels.RecId = Convert.ToInt64(row["RecId"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_LAstRevisitGetsayurvetha(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LAstRevisitGetsayurvetha(HMSSerialModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    MModels.OPNumber = row["RegNo"].ToString();
                    MModels.PatientName = row["PName"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["Doctor_Id"].ToString());
                    MModels.TokenNumber = row["TokenNumber"].ToString();
                    MModels.Gender = row["PGender"].ToString();
                    MModels.DOB = row["PDOB"].ToString();
                    MModels.Contact = row["MobileNo"].ToString();
                    MModels.AadharNo = row["AdharNo"].ToString();
                    MModels.HealthCard = row["HealthCardNo"].ToString();
                    MModels.RevisitDate = row["VisitingDate"].ToString();
                    MModels.Add1 = row["Address1"].ToString();
                    MModels.Flag = Convert.ToInt32(row["PGenderId"].ToString());  //GenderId
                    MModels.OPSerId = Convert.ToInt32(row["RegSeries"].ToString());  //RegSeries
                    MModels.BloodGroup = row["BloodGroup"].ToString();
                    MModels.Weight = row["Weight"].ToString();
                    MModels.FromDate = row["EmailId"].ToString();
                    MModels.Add2 = row["CurrentDtTime"].ToString();
                    MModels.OPSerName = row["IPNumber"].ToString();            //Ip nO
                    MModels.Add3 = row["IPYear"].ToString();                   //IPYear
                    MModels.OPCaseSheet = row["OPCaseSheet"].ToString();
                    MModels.IPCaseSheet = row["IPCaseSheet"].ToString();
                    MModels.SendSMS = row["SendSMS"].ToString();
                    MModels.SpecialFees = row["SpecialFees"].ToString();
                    MModels.LastVisit = row["Birthweight"].ToString();
                    MModels.Fname = row["Fathersname"].ToString();
                    MModels.Foccupation = row["FatherOccupation"].ToString();
                    MModels.Moccupation = row["MotherOccupation"].ToString();
                    MModels.Mname = row["Mothersname"].ToString();

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