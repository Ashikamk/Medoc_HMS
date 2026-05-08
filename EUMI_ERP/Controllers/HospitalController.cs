using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using System.Text.RegularExpressions;
using System.Net;
using System.IO;


namespace EUMI_ERP.Controllers
{
    public class HospitalController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: Hospital
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult CaseSheet()
        {
            return View();
        }
        public ActionResult LabWorksheet()
        {
            return View();
        }
        public ActionResult CaseSheeteye()
        {
            return View();
        }

        public ActionResult CaseSheetAyu()
        {
            return View();
        }


        public ActionResult CaseSheetgeneral()
        {
            return View();
        }
        public ActionResult IPCaseSheet()
        {
            return View();
        }
        public ActionResult IPBill() 
        {
            return View();
        }

        public ActionResult IPBillayu()
        {
            return View();
        }

        public ActionResult PrescriptionWorksheet()
        {
            return View();
        }

        public ActionResult MedicineWorksheet()
        {
            return View();
        }
        public ActionResult DischargeSummary() 
        {
            return View();
        }


        public ActionResult DischargeSummaryAyu()
        {
            return View();
        }

        public ActionResult SaleInvoiceHospitalngl()
        {
            return View();
        }
        public ActionResult SaleInvoiceHospital() 
        {
            return View();
        }
        public ActionResult SaleOpticalInvoice()
        {
            return View();
        }

        public ActionResult SaleInvoicePharma()
        {
            return View();
        }

        
            public ActionResult SaleReturnPharma()
        {
            return View();
        }
        public ActionResult SaleReturnHospital() 
        {
            return View();
        }
        public ActionResult WasteManagement()
        {
            return View();
        }


        public ActionResult DischargeSummarycopy()
        {
            return View();
        }


        public ActionResult SalesorderOpticals()
        {
            return View();
        }
        public ActionResult SalesInvoiceOpticals()
        {
            return View();
        }
        public ActionResult SalesReturnOpticals()
        {
            return View();
        }



        [HttpPost]
        public ActionResult SendVisitSms(LabBill LabBill)
        {
           
            try
            {
                string SMSUrl = LabBill.URL;
                WebRequest request = HttpWebRequest.Create(SMSUrl);
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream s = (Stream)response.GetResponseStream();
                StreamReader readStream = new StreamReader(s);
                string dataString = readStream.ReadToEnd();
                response.Close();
                s.Close();
                readStream.Close();
            }
            catch
            {
            }

            return null;

        }




        [HttpPost]
        public ActionResult HMS_PatientTestDetailsGet(LabBill LabBill) 
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PatientTestDetailsGet(LabBill, dbName); 
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
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_PatientVisitDetailsGet(ReVisitModel HMSSerialModel)
        {
            ReVisitModel obj = new ReVisitModel();
            List<ReVisitModel> oList = new List<ReVisitModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PatientVisitDetailsGet(HMSSerialModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReVisitModel MModels = new ReVisitModel();
                    MModels.RevId = Convert.ToInt32(row["PId"].ToString());
                    MModels.RevisitId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["Patient_Id"].ToString());
                    MModels.OPNumber = row["OP_Number"].ToString();
                    MModels.RevisitDate = row["VisitingDate"].ToString();
                    MModels.ConsultFees = Convert.ToDecimal(row["Consult_Fee"].ToString());
                    MModels.HealthCard = row["Weight"].ToString();
                    MModels.DoctorName = row["Name"].ToString();
                    MModels.DoctorId = Convert.ToInt32(row["CaseSheetNo"].ToString());     //CaseSheetId
                    MModels.VisitFees = Convert.ToDecimal(row["Consult_Fee"].ToString());
                    MModels.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());     //CaseSheetId
                    MModels.IPYear = Convert.ToInt32(row["IPYear"].ToString());
                    MModels.Type = row["CaseType"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_PatientSubTestResultGets(LabResult LabResult) 
        {
            LabResult obj = new LabResult();
            List<LabResult> oList = new List<LabResult>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PatientSubTestResultGets(LabResult, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LabResult MModels = new LabResult();
                    MModels.ResultId = Convert.ToInt32(row["ResultId"].ToString());
                    MModels.PatientId = Convert.ToInt32(row["Patient_Id"].ToString());
                    MModels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillYear = Convert.ToInt32(row["BillYear"].ToString());
                    MModels.OPNumber = Convert.ToInt32(row["SubTestId"].ToString());
                    MModels.RegNoS = row["RegNo"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.SubTestId = Convert.ToInt32(row["SubTestId"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.SubTestName = row["SubTestName"].ToString();
                    MModels.Result = row["Result"].ToString();
                    MModels.NormalValue = row["NormalValue"].ToString();
                    MModels.IPNumber = Convert.ToInt32(row["IpNo"].ToString());
                    MModels.Date = row["BillDate"].ToString();
                    MModels.FromDate = row["SUnit"].ToString();  
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

        public ActionResult HMS_CaseSheetInsertandUpdate(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_CaseSheetInsertandUpdate(CaseSheet, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();
                    Models.Status = row["Status"].ToString();
                    Models.CaseSheetNo = Convert.ToInt32(row["CaseSheetNo"].ToString());

                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]

        public ActionResult HMS_AllergyList(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_AllergyList(CaseSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();                    
                    Models.CaseSheetNo = Convert.ToInt32(row["CaseSheetNo"].ToString());
                    Models.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    Models.PRegNo = Convert.ToInt32(row["RegNo"].ToString()); 
                    Models.RevisitId = Convert.ToInt32(row["RevisitId"].ToString());
                    Models.PatientIP = Convert.ToInt32(row["IPNumber"].ToString());
                    Models.IPYear = Convert.ToInt32(row["IPYear"].ToString());
                    Models.Address1 = row["CaseType"].ToString();
                    Models.Allergies = row["Allergies"].ToString();
                    Models.Status = row["AllergyFlag"].ToString();
                    Models.Complaint = row["Name"].ToString();
                    Models.Address2 = row["Department"].ToString();
                    Models.Details = row["Details"].ToString();
                    Models.Notes = row["Notes"].ToString();

                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]

        public ActionResult HMS_AllergyDeActivate(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_AllergyDeActivate(CaseSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();
                    Models.Status = row["Status"].ToString();

                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]

        public ActionResult HMS_TemporaryCaseSheetInsert(CaseSheet CaseSheet) 
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_TemporaryCaseSheetInsert(CaseSheet, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();
                    Models.Status = row["Status"].ToString();
                    Models.CaseSheetNo = Convert.ToInt32(row["CaseSheetNo"].ToString());
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        

        [HttpPost]
        public ActionResult HMS_CaseSheetGetandGetsprint(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_CaseSheetGetandGetsprint(CaseSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();
                    Models.CaseSheetId = Convert.ToInt32(row["CId"].ToString());
                    Models.CaseSheetNo = Convert.ToInt32(row["CaseSheetNo"].ToString());
                    Models.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    Models.PRegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Models.RevisitId = Convert.ToInt32(row["RevisitId"].ToString());
                    Models.PatientIP = Convert.ToInt32(row["IPNumber"].ToString());
                    Models.IPYear = Convert.ToInt32(row["IPYear"].ToString());
                    Models.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    Models.Complaint = row["Complaint"].ToString();
                    Models.Diagnosis = row["Diagnosis"].ToString();
                    Models.Advice = row["Advice"].ToString();
                    Models.Allergies = row["Allergies"].ToString();
                    Models.Details = row["Details"].ToString();
                    Models.Notes = row["Notes"].ToString();
                    Models.ICD = row["ICD"].ToString();
                    Models.ICDDetails = row["ICDDetails"].ToString();
                    Models.CaseDate = row["CaseDate"].ToString();
                    Models.UserId = Convert.ToInt32(row["UserId"].ToString());
                    Models.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    Models.Status = row["Status"].ToString();

                    Models.PName = row["PName"].ToString();

                    Models.Address1 = row["Address1"].ToString();
                    Models.Address2 = row["Address2"].ToString();
                    Models.Address3 = row["Address3"].ToString();
                    Models.Age = Convert.ToInt32(row["Age"].ToString());
                    Models.Bloodgroup = row["Bloodgroup"].ToString();
                    Models.PGender = row["PGender"].ToString();
                    Models.ICDId = Convert.ToInt32(row["ICDId"].ToString());

                    Models.Medicine = row["Medicine"].ToString();
                    Models.DelFlag = Convert.ToInt32(row["EditFlag"].ToString());

                    Models.SendSMS = row["SendSMS"].ToString();
                    Models.SpecialFees = row["SpecialFees"].ToString();
                    Models.Reviewdate = row["Reviewdate"].ToString();
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }








        [HttpPost]
        public ActionResult HMS_CaseSheetGetandGets(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_CaseSheetGetandGets(CaseSheet, dbName);  
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();
                    Models.CaseSheetId = Convert.ToInt32(row["CId"].ToString());
                    Models.CaseSheetNo = Convert.ToInt32(row["CaseSheetNo"].ToString());
                    Models.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    Models.PRegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Models.RevisitId = Convert.ToInt32(row["RevisitId"].ToString());
                    Models.PatientIP = Convert.ToInt32(row["IPNumber"].ToString());
                    Models.IPYear = Convert.ToInt32(row["IPYear"].ToString());
                    Models.PatientId = Convert.ToInt32(row["RegId"].ToString());
                    Models.Complaint = row["Complaint"].ToString();
                    Models.Diagnosis = row["Diagnosis"].ToString();
                    Models.Advice = row["Advice"].ToString();
                    Models.Allergies = row["Allergies"].ToString();
                    Models.Details = row["Details"].ToString();
                    Models.Notes = row["Notes"].ToString();
                    Models.ICD = row["ICD"].ToString();
                    Models.ICDDetails = row["ICDDetails"].ToString();
                    Models.CaseDate = row["CaseDate"].ToString();
                    Models.UserId = Convert.ToInt32(row["UserId"].ToString());
                    Models.DeptId = Convert.ToInt32(row["DeptId"].ToString());                   
                    Models.Status = row["Status"].ToString();

                    Models.PName = row["PName"].ToString();

                    Models.Address1 = row["Address1"].ToString();
                    Models.Address2 = row["Address2"].ToString();
                    Models.Address3 = row["Address3"].ToString();
                    Models.Age = Convert.ToInt32(row["Age"].ToString());
                    Models.Bloodgroup = row["Bloodgroup"].ToString();
                    Models.PGender = row["PGender"].ToString();
                    Models.ICDId = Convert.ToInt32(row["ICDId"].ToString());
                    
                    Models.Medicine = row["Medicine"].ToString();
                    Models.DelFlag = Convert.ToInt32(row["EditFlag"].ToString());

                    Models.SendSMS = row["SendSMS"].ToString();
                    Models.SpecialFees = row["SpecialFees"].ToString();
                    Models .Reviewdate = row["Reviewdate"].ToString(); 
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }

        [HttpPost]
        public JsonResult HMS_CaseSheetSubDetailsInsert(List<CaseSheet> CaseSheet) 
        {
            CaseSheet obj = new CaseSheet();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<CaseSheet> oList = new List<CaseSheet>();

            try
            {
                string[] tmpTable = new string[15];
                tmpTable[0] = "RegSeries";
                tmpTable[1] = "PRegNo";
                tmpTable[2] = "RevisitId";
                tmpTable[3] = "PatientIP";
                tmpTable[4] = "IPYear";
                tmpTable[5] = "MedicineId";
                tmpTable[6] = "Medicine";
                tmpTable[7] = "Daily";
                tmpTable[8] = "Dosage";
                tmpTable[9] = "Days";
                tmpTable[10] = "UserId";
                tmpTable[11] = "DeptId";
                tmpTable[12] = "DelFlag";
                tmpTable[13] = "Type";
                tmpTable[14] = "Mednotes";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in CaseSheet)
                {
                    obj.RegSeries   = details.RegSeries     ;
                    obj.PRegNo      = details.PRegNo        ;
                    obj.RevisitId   = details.RevisitId     ;
                    obj.PatientIP   = details.PatientIP     ;
                    obj.IPYear      = details.IPYear        ;                 
                    obj.MedicineId  = details.MedicineId    ;
                    obj.Medicine    = details.Medicine      ;
                    obj.Daily       = details.Daily         ;
                    obj.Dosage      = details.Dosage        ;
                    obj.Days        = details.Days          ;
                    obj.UserId      = details.UserId        ;
                    obj.DeptId      = details.DeptId        ;
                    obj.DelFlag     = details.DelFlag       ;
                    obj.Type        = details.Type          ;
                    obj.Mednotes    = details.Mednotes;


                    dt.Rows.Add(obj.RegSeries, obj.PRegNo, obj.RevisitId, obj.PatientIP, obj.IPYear, obj.MedicineId
                        , obj.Medicine, obj.Daily,obj.Dosage, obj.Days, obj.UserId, obj.DeptId, obj.DelFlag, obj.Type,obj.Mednotes);
                }

                dsDataSet = obj.HMS_CaseSheetSubDetailsInsert(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet MModels = new CaseSheet();
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
        public JsonResult HMS_CaseSheetMedicineUpdate(List<CaseSheet> CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<CaseSheet> oList = new List<CaseSheet>();

            try
            {
                string[] tmpTable = new string[14];
                tmpTable[0] = "RegSeries";
                tmpTable[1] = "PRegNo";
                tmpTable[2] = "RevisitId";
                tmpTable[3] = "PatientIP";
                tmpTable[4] = "IPYear";
                tmpTable[5] = "MedicineId";
                tmpTable[6] = "Medicine";
                tmpTable[7] = "Daily";
                tmpTable[8] = "Dosage";
                tmpTable[9] = "Days";
                tmpTable[10] = "UserId";
                tmpTable[11] = "DeptId";
                tmpTable[12] = "DelFlag";
                tmpTable[13] = "Type";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in CaseSheet)
                {
                    obj.RegSeries = details.RegSeries;
                    obj.PRegNo = details.PRegNo;
                    obj.RevisitId = details.RevisitId;
                    obj.PatientIP = details.PatientIP;
                    obj.IPYear = details.IPYear;
                    obj.MedicineId = details.MedicineId;
                    obj.Medicine = details.Medicine;
                    obj.Daily = details.Daily;
                    obj.Dosage = details.Dosage;
                    obj.Days = details.Days;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    obj.Type = details.Type;

                    dt.Rows.Add(obj.RegSeries, obj.PRegNo, obj.RevisitId, obj.PatientIP, obj.IPYear, obj.MedicineId
                        , obj.Medicine, obj.Daily, obj.Dosage, obj.Days, obj.UserId, obj.DeptId, obj.DelFlag, obj.Type);
                }

                dsDataSet = obj.HMS_CaseSheetMedicineUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet MModels = new CaseSheet();
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
        public JsonResult HMS_ImmunizationUpdate(List<VaccineModal> VaccineModal)
        {
            VaccineModal obj = new VaccineModal();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<VaccineModal> oList = new List<VaccineModal>();

            try
            {
                string[] tmpTable = new string[20];
                tmpTable[0] = "VacId";
                tmpTable[1] = "OPVisit";
                tmpTable[2] = "IPNumber";
                tmpTable[3] = "IPYear";
                tmpTable[4] = "PRegSer";
                tmpTable[5] = "PRegNo";
                tmpTable[6] = "VaccineId";
                tmpTable[7] = "VaccineName";
                tmpTable[8] = "BrandId";
                tmpTable[9] = "GivenDate";
                tmpTable[10] = "NextDate";
                tmpTable[11] = "VaccineStatus";
                tmpTable[12] = "VaccineDosage";
                tmpTable[13] = "DelFlag";
                tmpTable[14] = "UserId";
                tmpTable[15] = "DeptId";
                tmpTable[16] = "Daily";
                tmpTable[17] = "Days";
                tmpTable[18] = "Flag";
                tmpTable[19] = "IType";


                dt = Common.CreateTable(tmpTable);

                foreach (var details in VaccineModal)
                {
                    obj.VacId = details.VacId;
                    obj.OPVisit = details.OPVisit;
                    obj.IPNumber = details.IPNumber;
                    obj.IPYear = details.IPYear;
                    obj.PRegSer = details.PRegSer;
                    obj.PRegNo = details.PRegNo;
                    obj.VaccineId = details.VaccineId;
                    obj.VaccineName = details.VaccineName;
                    obj.BrandId = details.BrandId;
                    obj.GivenDate = details.GivenDate;
                    obj.NextDate = details.NextDate;
                    obj.VaccineStatus = details.VaccineStatus;
                    obj.VaccineDosage = details.VaccineDosage;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Daily = details.Daily;
                    obj.Days = details.Days;
                    obj.Flag = details.Flag;
                    obj.IType = details.IType;

                    dt.Rows.Add(obj.VacId,obj.OPVisit,obj.IPNumber,obj.IPYear,obj.PRegSer,obj.PRegNo
                        ,obj.VaccineId,obj.VaccineName,obj.BrandId,obj.GivenDate,obj.NextDate,obj.VaccineStatus
                        ,obj.VaccineDosage,obj.DelFlag,obj.UserId,obj.DeptId,obj.Daily,obj.Days,obj.Flag,obj.IType);
                }

                dsDataSet = obj.HMS_ImmunizationUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VaccineModal MModels = new VaccineModal();
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
        public ActionResult HMS_ImmunizationGets(VaccineModal VaccineModal)
        {
            VaccineModal obj = new VaccineModal();
            List<VaccineModal> oList = new List<VaccineModal>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_ImmunizationGets(VaccineModal, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VaccineModal Models = new VaccineModal();
                    Models.VacId = Convert.ToInt32(row["VacId"].ToString());
                    Models.PRegSer = Convert.ToInt32(row["PRegSer"].ToString());
                    Models.PRegNo = Convert.ToInt32(row["PRegNo"].ToString());
                    Models.VaccineId = Convert.ToInt32(row["VaccineId"].ToString());
                    Models.VaccineName = row["VaccineName"].ToString();
                    Models.BrandId = Convert.ToInt32(row["BrandId"].ToString());
                    Models.GivenDate = row["GivenDate"].ToString();
                    Models.NextDate = row["NextDate"].ToString();
                    Models.VaccineStatus = row["VaccineStatus"].ToString();
                    Models.VaccineDosage = row["VaccineDosage"].ToString();
                    Models.IPNumber = Convert.ToInt32(row["IPNumber"].ToString());
                    Models.IPYear = Convert.ToInt32(row["IPYear"].ToString());
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]

        public ActionResult HMS_CaseSheetMedicineGets(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_CaseSheetMedicineGets(CaseSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {                      
                    CaseSheet Models = new CaseSheet();
                    Models.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    Models.PRegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Models.RevisitId = Convert.ToInt32(row["RevisitId"].ToString());
                    Models.PatientIP = Convert.ToInt32(row["IPNumber"].ToString());
                    Models.IPYear = Convert.ToInt32(row["IPYear"].ToString());
                    Models.MedicineId = Convert.ToInt32(row["MedicineId"].ToString());
                    Models.Medicine = row["Medicine"].ToString();
                    Models.Daily = row["Daily"].ToString();
                    Models.Dosage = row["Dosage"].ToString();
                    Models.Days = row["Days"].ToString();
                    Models.UserId = Convert.ToInt32(row["UserId"].ToString());
                    Models.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    Models.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    Models.Type = row["Type"].ToString();
                    Models.Mednotes = row["Remarks"].ToString();

                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]

        public ActionResult HMS_CaseSheetInvestigationGets(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_CaseSheetInvestigationGets(CaseSheet, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();
                    Models.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    Models.PRegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Models.RevisitId = Convert.ToInt32(row["RevisitId"].ToString());
                    Models.PatientIP = Convert.ToInt32(row["IPNumber"].ToString());
                    Models.IPYear = Convert.ToInt32(row["IPYear"].ToString());
                    Models.MedicineId = Convert.ToInt32(row["TestId"].ToString());
                    Models.Medicine = row["TestName"].ToString();
                    Models.Daily = row["TestResult"].ToString();
                    Models.Dosage = row["TestNormal"].ToString();
                    Models.Days = row["selectedDocs"].ToString();
                    Models.UserId = Convert.ToInt32(row["UserId"].ToString());
                    Models.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    Models.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    Models.Type = row["Type"].ToString();
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_ICDGetandGets(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();

            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_ICDGetandGets(CaseSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet MModels = new CaseSheet();
                    MModels.PatientId = Convert.ToInt32(row["ICDId"].ToString());
                    MModels.Advice = row["ICDCode"].ToString();
                    MModels.Diagnosis = row["ICDDesc"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["Flag"].ToString());
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
        public ActionResult HMS_BatchwiseItemDetailsGets(SaleInvoiceHospital SaleInvoiceHospital) 
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_BatchwiseItemDetailsGets(SaleInvoiceHospital, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.ProductDesc = row["ProductDesc"].ToString();
                    MModels.Company = row["Company"].ToString();
                    MModels.Companycode = row["Companycode"].ToString();
                    MModels.ItemExpiry = row["ItemExpiry"].ToString();
                    MModels.Stock = Convert.ToDecimal(row["Stock"].ToString());
                    MModels.Purrate = Convert.ToDecimal(row["Purrate"].ToString());
                    MModels.Sellingrate = Convert.ToDecimal(row["Sellingrate"].ToString());
                    MModels.Mrp = Convert.ToDecimal(row["Mrp"].ToString());
                    MModels.Taxpers = Convert.ToDecimal(row["Taxpers"].ToString());
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Drugschedule = row["Drugschedule"].ToString();
                    MModels.Cess = Convert.ToDecimal(row["Model1"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Variable3 = row["HsnCode"].ToString();
                    MModels.Variable1 = row["Schedule"].ToString();
                    MModels.Variable2 = row["TypeId"].ToString();
                    MModels.Variable4 = row["Type"].ToString();
                       
                    oList.Add(MModels); 
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(oList, JsonRequestBehavior.AllowGet);
            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        


            [HttpPost]
        public JsonResult HMS_SalesInvoiceInsert_StockOut(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesInvoiceInsert_StockOut(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public JsonResult HMS_SalesInvoiceInsert(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] =  "HBillSeries";
                tmpTable[2] =  "HBillNo";
                tmpTable[3] =  "HPatient";
                tmpTable[4] =  "PayType";
                tmpTable[5] =  "PRType";
                tmpTable[6] =  "HSalesDate";
                tmpTable[7] =  "CurrencyId";
                tmpTable[8] =  "CurrencyRate";
                tmpTable[9] =  "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt"; 
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule; 
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt); 
                }

                dsDataSet = obj.HMS_SalesInvoiceInsert(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public JsonResult HMS_SalesOrderInvoiceInsert(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[108];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                tmpTable[62] = "CustAddress";
                tmpTable[63] = "GSTNo";
                tmpTable[64] = "GaragePhone";
                tmpTable[65] = "ExportDoc";
                tmpTable[66] = "Email";
                tmpTable[67] = "ExportStatus";
                tmpTable[68] = "SalesManId";
                tmpTable[69] = "AgreementNo";
                tmpTable[70] = "DueDate";
                tmpTable[71] = "Gender";
                tmpTable[72] = "Referance";
                tmpTable[73] = "RegisterNo";
                tmpTable[74] = "RightFarSph";
                tmpTable[75] = "RightFarCyl";
                tmpTable[76] = "RightFarAxs";
                tmpTable[77] = "RightFarVA";
                tmpTable[78] = "RightFarPD";
                tmpTable[79] = "RightFarAdd";
                tmpTable[80] = "LeftFarSph";
                tmpTable[81] = "LeftFarCyl";
                tmpTable[82] = "LeftFarAxs";
                tmpTable[83] = "LeftFarVA";
                tmpTable[84] = "LeftFarPD";
                tmpTable[85] = "LeftFarAdd";
                tmpTable[86] = "RightNearSph";
                tmpTable[87] = "RightNearCyl";
                tmpTable[88] = "RightNearAxs";
                tmpTable[89] = "RightNearVA";
                tmpTable[90] = "RightNearPD";
                tmpTable[91] = "RightNearAdd";
                tmpTable[92] = "LeftNearSph";
                tmpTable[93] = "LeftNearCyl";
                tmpTable[94] = "LeftNearAxs";
                tmpTable[95] = "LeftNearVA";
                tmpTable[96] = "LeftNearPD";
                tmpTable[97] = "LeftNearAdd";
                tmpTable[98] = "Indax";
                tmpTable[99] = "Coating";
                tmpTable[100] = "SplTreat";
                tmpTable[101] = "OtherSpecs";
                tmpTable[102] = "Optometrist";
                tmpTable[103] = "LensConst";
                tmpTable[104] = "OptPrescRemarks";
                tmpTable[105] = "InterState";
                tmpTable[106] = "ReSendSMS";
                tmpTable[107] = "SONo";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    obj.CustAddress = details.CustAddress;
                    obj.GSTNo = details.GSTNo;
                    obj.GaragePhone = details.GaragePhone;
                    obj.ExportDoc = details.ExportDoc;
                    obj.Email = details.Email;
                    obj.ExportStatus = details.ExportStatus;
                    obj.SalesManId = details.SalesManId;
                    obj.AgreementNo = details.AgreementNo;
                    obj.DueDate = details.DueDate;
                    obj.Gender = details.Gender;
                    obj.Referance = details.Referance;
                    obj.RegisterNo = details.RegisterNo;
                    obj.RightFarSph = details.RightFarSph;
                    obj.RightFarCyl = details.RightFarCyl;
                    obj.RightFarAxs = details.RightFarAxs;
                    obj.RightFarVA = details.RightFarVA;
                    obj.RightFarPD = details.RightFarPD;
                    obj.RightFarAdd = details.RightFarAdd;
                    obj.LeftFarSph = details.LeftFarSph;
                    obj.LeftFarCyl = details.LeftFarCyl;
                    obj.LeftFarAxs = details.LeftFarAxs;
                    obj.LeftFarVA = details.LeftFarVA;
                    obj.LeftFarPD = details.LeftFarPD;
                    obj.LeftFarAdd = details.LeftFarAdd;
                    obj.RightNearSph = details.RightNearSph;
                    obj.RightNearCyl = details.RightNearCyl;
                    obj.RightNearAxs = details.RightNearAxs;
                    obj.RightNearVA = details.RightNearVA;
                    obj.RightNearPD = details.RightNearPD;
                    obj.RightNearAdd = details.RightNearAdd;
                    obj.LeftNearSph = details.LeftNearSph;
                    obj.LeftNearCyl = details.LeftNearCyl;
                    obj.LeftNearAxs = details.LeftNearAxs;
                    obj.LeftNearVA = details.LeftNearVA;
                    obj.LeftNearPD = details.LeftNearPD;
                    obj.LeftNearAdd = details.LeftNearAdd;
                    obj.Indax = details.Indax;
                    obj.Coating = details.Coating;
                    obj.SplTreat = details.SplTreat;
                    obj.OtherSpecs = details.OtherSpecs;
                    obj.Optometrist = details.Optometrist;
                    obj.LensConst = details.LensConst;
                    obj.OptPrescRemarks = details.OptPrescRemarks;
                    obj.InterState = details.InterState;
                    obj.ReSendSMS = details.ReSendSMS;
                    obj.SONo = details.SONo;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt, obj.CustAddress, obj.GSTNo,
obj.GaragePhone, obj.ExportDoc, obj.Email, obj.ExportStatus, obj.SalesManId, obj.AgreementNo, obj.DueDate, obj.Gender, obj.Referance, obj.RegisterNo, obj.RightFarSph,
obj.RightFarCyl, obj.RightFarAxs, obj.RightFarVA, obj.RightFarPD, obj.RightFarAdd, obj.LeftFarSph, obj.LeftFarCyl, obj.LeftFarAxs, obj.LeftFarVA, obj.LeftFarPD, obj.LeftFarAdd,
 obj.RightNearSph, obj.RightNearCyl, obj.RightNearAxs, obj.RightNearVA, obj.RightNearPD, obj.RightNearAdd, obj.LeftNearSph, obj.LeftNearCyl, obj.LeftNearAxs,
  obj.LeftNearVA, obj.LeftNearPD, obj.LeftNearAdd, obj.Indax, obj.Coating, obj.SplTreat, obj.OtherSpecs, obj.Optometrist, obj.LensConst, obj.OptPrescRemarks,
  obj.InterState, obj.ReSendSMS, obj.SONo);
                }

                dsDataSet = obj.HMS_SalesOrderInvoiceInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public JsonResult HMS_OpticalSalesInvoiceInsert(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[108];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                tmpTable[62] = "CustAddress";
                tmpTable[63] = "GSTNo";
                tmpTable[64] = "GaragePhone";
                tmpTable[65] = "ExportDoc";
                tmpTable[66] = "Email";
                tmpTable[67] = "ExportStatus";
                tmpTable[68] = "SalesManId";
                tmpTable[69] = "AgreementNo";
                tmpTable[70] = "DueDate";
                tmpTable[71] = "Gender";
                tmpTable[72] = "Referance";
                tmpTable[73] = "RegisterNo";
                tmpTable[74] = "RightFarSph";
                tmpTable[75] = "RightFarCyl";
                tmpTable[76] = "RightFarAxs";
                tmpTable[77] = "RightFarVA";
                tmpTable[78] = "RightFarPD";
                tmpTable[79] = "RightFarAdd";
                tmpTable[80] = "LeftFarSph";
                tmpTable[81] = "LeftFarCyl";
                tmpTable[82] = "LeftFarAxs";
                tmpTable[83] = "LeftFarVA";
                tmpTable[84] = "LeftFarPD";
                tmpTable[85] = "LeftFarAdd";
                tmpTable[86] = "RightNearSph";
                tmpTable[87] = "RightNearCyl";
                tmpTable[88] = "RightNearAxs";
                tmpTable[89] = "RightNearVA";
                tmpTable[90] = "RightNearPD";
                tmpTable[91] = "RightNearAdd";
                tmpTable[92] = "LeftNearSph";
                tmpTable[93] = "LeftNearCyl";
                tmpTable[94] = "LeftNearAxs";
                tmpTable[95] = "LeftNearVA";
                tmpTable[96] = "LeftNearPD";
                tmpTable[97] = "LeftNearAdd";
                tmpTable[98] = "Indax";
                tmpTable[99] = "Coating";
                tmpTable[100] = "SplTreat";
                tmpTable[101] = "OtherSpecs";
                tmpTable[102] = "Optometrist";
                tmpTable[103] = "LensConst";
                tmpTable[104] = "OptPrescRemarks";
                tmpTable[105] = "InterState";
                tmpTable[106] = "ReSendSMS";
                tmpTable[107] = "SONo";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    obj.CustAddress = details.CustAddress;
                    obj.GSTNo = details.GSTNo;
                    obj.GaragePhone = details.GaragePhone;
                    obj.ExportDoc = details.ExportDoc;
                    obj.Email = details.Email;
                    obj.ExportStatus = details.ExportStatus;
                    obj.SalesManId = details.SalesManId;
                    obj.AgreementNo = details.AgreementNo;
                    obj.DueDate = details.DueDate;
                    obj.Gender = details.Gender;
                    obj.Referance = details.Referance;
                    obj.RegisterNo = details.RegisterNo;
                    obj.RightFarSph = details.RightFarSph;
                    obj.RightFarCyl = details.RightFarCyl;
                    obj.RightFarAxs = details.RightFarAxs;
                    obj.RightFarVA = details.RightFarVA;
                    obj.RightFarPD = details.RightFarPD;
                    obj.RightFarAdd = details.RightFarAdd;
                    obj.LeftFarSph = details.LeftFarSph;
                    obj.LeftFarCyl = details.LeftFarCyl;
                    obj.LeftFarAxs = details.LeftFarAxs;
                    obj.LeftFarVA = details.LeftFarVA;
                    obj.LeftFarPD = details.LeftFarPD;
                    obj.LeftFarAdd = details.LeftFarAdd;
                    obj.RightNearSph = details.RightNearSph;
                    obj.RightNearCyl = details.RightNearCyl;
                    obj.RightNearAxs = details.RightNearAxs;
                    obj.RightNearVA = details.RightNearVA;
                    obj.RightNearPD = details.RightNearPD;
                    obj.RightNearAdd = details.RightNearAdd;
                    obj.LeftNearSph = details.LeftNearSph;
                    obj.LeftNearCyl = details.LeftNearCyl;
                    obj.LeftNearAxs = details.LeftNearAxs;
                    obj.LeftNearVA = details.LeftNearVA;
                    obj.LeftNearPD = details.LeftNearPD;
                    obj.LeftNearAdd = details.LeftNearAdd;
                    obj.Indax = details.Indax;
                    obj.Coating = details.Coating;
                    obj.SplTreat = details.SplTreat;
                    obj.OtherSpecs = details.OtherSpecs;
                    obj.Optometrist = details.Optometrist;
                    obj.LensConst = details.LensConst;
                    obj.OptPrescRemarks = details.OptPrescRemarks;
                    obj.InterState = details.InterState;
                    obj.ReSendSMS = details.ReSendSMS;
                    obj.SONo = details.SONo;

                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt, obj.CustAddress, obj.GSTNo,
obj.GaragePhone, obj.ExportDoc, obj.Email, obj.ExportStatus, obj.SalesManId, obj.AgreementNo, obj.DueDate, obj.Gender, obj.Referance, obj.RegisterNo, obj.RightFarSph,
obj.RightFarCyl, obj.RightFarAxs, obj.RightFarVA, obj.RightFarPD, obj.RightFarAdd, obj.LeftFarSph, obj.LeftFarCyl, obj.LeftFarAxs, obj.LeftFarVA, obj.LeftFarPD, obj.LeftFarAdd,
 obj.RightNearSph, obj.RightNearCyl, obj.RightNearAxs, obj.RightNearVA, obj.RightNearPD, obj.RightNearAdd, obj.LeftNearSph, obj.LeftNearCyl, obj.LeftNearAxs,
  obj.LeftNearVA, obj.LeftNearPD, obj.LeftNearAdd, obj.Indax, obj.Coating, obj.SplTreat, obj.OtherSpecs, obj.Optometrist, obj.LensConst, obj.OptPrescRemarks,
  obj.InterState, obj.ReSendSMS, obj.SONo);
                }

                dsDataSet = obj.HMS_OpticalSalesInvoiceInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public ActionResult HMS_SalesGetandGetsStockOut(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesGetandGetsStockOut(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();

                    MModels.SalesMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.HPatient = Convert.ToInt32(row["CustId"].ToString());
                    MModels.HPatientName = row["CustoName"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.PRType = Convert.ToDecimal(row["PRType"].ToString());
                    MModels.HSalesDate = row["InvDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.HLocation = Convert.ToInt32(row["LocId"].ToString());
                    MModels.HDoctor = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.Discountpercent = Convert.ToDecimal(row["Discountpercent"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotlaTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTextTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["Taxable1"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["Taxable2"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["Taxable3"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["Taxable4"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["Taxable5"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.SubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Company = row["ProductDescr"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellPrice = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.PurPrice = Convert.ToDecimal(row["AverageCost"].ToString());
                    MModels.Tax = Convert.ToDecimal(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmt = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmt = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Cess = Convert.ToDecimal(row["CessPerc"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Drugschedule = row["ImeiNo"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.LPO_No = row["LPONumber"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.Variable1 = row["IPNumber"].ToString();
                    MModels.Variable2 = row["ReceivedAmount"].ToString();
                    MModels.Variable3 = row["HsnCode"].ToString();
                    MModels.ProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.Terms = Convert.ToInt32(row["Invterms"].ToString());

                    MModels.SpecialFeeAmt = Convert.ToDecimal(row["SpecialFeeAmt"].ToString());
                    MModels.Area = Convert.ToInt32(row["areaid"].ToString());
                    //anu
                    MModels.JobNo = Convert.ToInt32(row["JobNumber"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }






        [HttpPost]
        public ActionResult HMS_SalesGetandGets(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesGetandGets(SaleInvoiceHospital, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();

                    MModels.SalesMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.HPatient = Convert.ToInt32(row["CustId"].ToString());
                    MModels.HPatientName = row["CustoName"].ToString(); 
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.PRType = Convert.ToDecimal(row["PRType"].ToString());
                    MModels.HSalesDate = row["InvDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.HLocation = Convert.ToInt32(row["LocId"].ToString());
                    MModels.HDoctor = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.Discountpercent = Convert.ToDecimal(row["Discountpercent"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotlaTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTextTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["Taxable1"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["Taxable2"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["Taxable3"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["Taxable4"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["Taxable5"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.SubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Company = row["ProductDescr"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellPrice = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.PurPrice = Convert.ToDecimal(row["AverageCost"].ToString());
                    MModels.Tax = Convert.ToDecimal(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmt = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmt = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Cess = Convert.ToDecimal(row["CessPerc"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Drugschedule =row["ImeiNo"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());                 
                    MModels.LPO_No =row["LPONumber"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.Variable1 = row["IPNumber"].ToString();
                    MModels.Variable2 = row["ReceivedAmount"].ToString();
                    MModels.Variable3= row["HsnCode"].ToString();
                    MModels.ProdDisc= Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.Terms= Convert.ToInt32(row["Invterms"].ToString());

                    MModels.SpecialFeeAmt = Convert.ToDecimal(row["SpecialFeeAmt"].ToString());
                    MModels.Area = Convert.ToInt32(row["areaid"].ToString());
                    //anu
                    MModels.JobNo = Convert.ToInt32(row["JobNumber"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }

        [HttpPost]
        public ActionResult HMS_SalesOrderGets(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesOrderGets(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();

                    MModels.SalesMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.HPatient = Convert.ToInt32(row["CustId"].ToString());
                    MModels.HPatientName = row["CustoName"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.PRType = Convert.ToDecimal(row["PRType"].ToString());
                    MModels.HSalesDate = row["InvDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.HLocation = Convert.ToInt32(row["LocId"].ToString());
                    MModels.HDoctor = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.Discountpercent = Convert.ToDecimal(row["Discountpercent"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotlaTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTextTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["Taxable1"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["Taxable2"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["Taxable3"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["Taxable4"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["Taxable5"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.SubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Company = row["ProductDescr"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellPrice = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.PurPrice = Convert.ToDecimal(row["AverageCost"].ToString());
                    MModels.Tax = Convert.ToDecimal(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmt = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmt = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Cess = Convert.ToDecimal(row["CessPerc"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Drugschedule = row["ImeiNo"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.LPO_No = row["LPONumber"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.Variable1 = row["IPNumber"].ToString();
                    MModels.Variable2 = row["ReceivedAmount"].ToString();
                    MModels.Variable3 = row["HsnCode"].ToString();
                    MModels.ProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.Terms = Convert.ToInt32(row["Invterms"].ToString());

                    MModels.SpecialFeeAmt = Convert.ToDecimal(row["SpecialFeeAmt"].ToString());
                    MModels.Area = Convert.ToInt32(row["areaid"].ToString());
                    //anu
                    MModels.JobNo = Convert.ToInt32(row["JobNumber"].ToString());

                    //Patient Details
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.GSTNo = row["GSTNo"].ToString();
                    MModels.GaragePhone = row["GaragePhone"].ToString();
                    MModels.ExportDoc = row["ExportDoc"].ToString();
                    MModels.Email = row["Email"].ToString();
                    MModels.ExportStatus = row["ExportStatus"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AgreementNo = row["AgreementNo"].ToString();
                    MModels.ExportStatus = row["ExportStatus"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.Gender = row["Gender"].ToString();
                    MModels.Referance = row["Referance"].ToString();
                    MModels.RegisterNo = row["RegisterNo"].ToString();

                    //Optical Details
                    MModels.RightFarSph = float.Parse(row["RightFarSph"].ToString());
                    MModels.RightFarCyl = float.Parse(row["RightFarCyl"].ToString());
                    MModels.RightFarAxs = float.Parse(row["RightFarAxs"].ToString());
                    MModels.RightFarVA = float.Parse(row["RightFarVA"].ToString());
                    MModels.RightFarPD = float.Parse(row["RightFarPD"].ToString());
                    MModels.RightFarAdd = float.Parse(row["RightFarAdd"].ToString());
                    MModels.LeftFarSph = float.Parse(row["LeftFarSph"].ToString());
                    MModels.LeftFarCyl = float.Parse(row["LeftFarCyl"].ToString());
                    MModels.LeftFarAxs = float.Parse(row["LeftFarAxs"].ToString());
                    MModels.LeftFarVA = float.Parse(row["LeftFarVA"].ToString());
                    MModels.LeftFarPD = float.Parse(row["LeftFarPD"].ToString());
                    MModels.LeftFarAdd = float.Parse(row["LeftFarAdd"].ToString());
                    MModels.RightNearSph = float.Parse(row["RightNearSph"].ToString());
                    MModels.RightNearCyl = float.Parse(row["RightNearCyl"].ToString());
                    MModels.RightNearAxs = float.Parse(row["RightNearAxs"].ToString());
                    MModels.RightNearVA = float.Parse(row["RightNearVA"].ToString());
                    MModels.RightNearPD = float.Parse(row["RightNearPD"].ToString());
                    MModels.RightNearAdd = float.Parse(row["RightNearAdd"].ToString());
                    MModels.LeftNearSph = float.Parse(row["LeftNearSph"].ToString());
                    MModels.LeftNearCyl = float.Parse(row["LeftNearCyl"].ToString());
                    MModels.LeftNearAxs = float.Parse(row["LeftNearAxs"].ToString());
                    MModels.LeftNearVA = float.Parse(row["LeftNearVA"].ToString());
                    MModels.LeftNearPD = float.Parse(row["LeftNearPD"].ToString());
                    MModels.LeftNearAdd = float.Parse(row["LeftNearAdd"].ToString());
                    MModels.Indax = float.Parse(row["Indax"].ToString());
                    MModels.Coating = row["Coating"].ToString();
                    MModels.SplTreat = row["SplTreat"].ToString();
                    MModels.OtherSpecs = row["OtherSpecs"].ToString();
                    MModels.Optometrist = row["Optometrist"].ToString();
                    MModels.LensConst = row["LensConst"].ToString();
                    MModels.OptPrescRemarks = row["OptPrescRemarks"].ToString();
                    MModels.InterState = Convert.ToBoolean(row["InterState"].ToString());
                    MModels.ReSendSMS = Convert.ToBoolean(row["ReSendSMS"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }

        [HttpPost]
        public ActionResult HMS_OpticalSalesInvoiceGetProductDetails(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_OpticalSalesInvoiceGetProductDetails(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();

                    MModels.SalesMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.HPatient = Convert.ToInt32(row["CustId"].ToString());
                    MModels.HPatientName = row["CustoName"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.PRType = Convert.ToDecimal(row["PRType"].ToString());
                    MModels.HSalesDate = row["InvDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.HLocation = Convert.ToInt32(row["LocId"].ToString());
                    MModels.HDoctor = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.Discountpercent = Convert.ToDecimal(row["Discountpercent"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotlaTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTextTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["Taxable1"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["Taxable2"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["Taxable3"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["Taxable4"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["Taxable5"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.SubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Company = row["ProductDescr"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellPrice = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.PurPrice = Convert.ToDecimal(row["AverageCost"].ToString());
                    MModels.Tax = Convert.ToDecimal(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmt = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmt = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Cess = Convert.ToDecimal(row["CessPerc"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Drugschedule = row["ImeiNo"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.LPO_No = row["LPONumber"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.Variable1 = row["IPNumber"].ToString();
                    MModels.Variable2 = row["ReceivedAmount"].ToString();
                    MModels.Variable3 = row["HsnCode"].ToString();
                    MModels.ProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.Terms = Convert.ToInt32(row["Invterms"].ToString());

                    MModels.SpecialFeeAmt = Convert.ToDecimal(row["SpecialFeeAmt"].ToString());
                    MModels.Area = Convert.ToInt32(row["areaid"].ToString());
                    //anu
                    MModels.JobNo = Convert.ToInt32(row["JobNumber"].ToString());

                    //Patient Details
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.GSTNo = row["GSTNo"].ToString();
                    MModels.GaragePhone = row["GaragePhone"].ToString();
                    MModels.ExportDoc = row["ExportDoc"].ToString();
                    MModels.Email = row["Email"].ToString();
                    MModels.ExportStatus = row["ExportStatus"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AgreementNo = row["AgreementNo"].ToString();
                    MModels.ExportStatus = row["ExportStatus"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.Gender = row["Gender"].ToString();
                    MModels.Referance = row["Referance"].ToString();
                    MModels.RegisterNo = row["RegisterNo"].ToString();
                    MModels.SONo = Convert.ToInt32(row["OrderNo1"].ToString());
                    //Optical Details
                    MModels.RightFarSph = float.Parse(row["RightFarSph"].ToString());
                    MModels.RightFarCyl = float.Parse(row["RightFarCyl"].ToString());
                    MModels.RightFarAxs = float.Parse(row["RightFarAxs"].ToString());
                    MModels.RightFarVA = float.Parse(row["RightFarVA"].ToString());
                    MModels.RightFarPD = float.Parse(row["RightFarPD"].ToString());
                    MModels.RightFarAdd = float.Parse(row["RightFarAdd"].ToString());
                    MModels.LeftFarSph = float.Parse(row["LeftFarSph"].ToString());
                    MModels.LeftFarCyl = float.Parse(row["LeftFarCyl"].ToString());
                    MModels.LeftFarAxs = float.Parse(row["LeftFarAxs"].ToString());
                    MModels.LeftFarVA = float.Parse(row["LeftFarVA"].ToString());
                    MModels.LeftFarPD = float.Parse(row["LeftFarPD"].ToString());
                    MModels.LeftFarAdd = float.Parse(row["LeftFarAdd"].ToString());
                    MModels.RightNearSph = float.Parse(row["RightNearSph"].ToString());
                    MModels.RightNearCyl = float.Parse(row["RightNearCyl"].ToString());
                    MModels.RightNearAxs = float.Parse(row["RightNearAxs"].ToString());
                    MModels.RightNearVA = float.Parse(row["RightNearVA"].ToString());
                    MModels.RightNearPD = float.Parse(row["RightNearPD"].ToString());
                    MModels.RightNearAdd = float.Parse(row["RightNearAdd"].ToString());
                    MModels.LeftNearSph = float.Parse(row["LeftNearSph"].ToString());
                    MModels.LeftNearCyl = float.Parse(row["LeftNearCyl"].ToString());
                    MModels.LeftNearAxs = float.Parse(row["LeftNearAxs"].ToString());
                    MModels.LeftNearVA = float.Parse(row["LeftNearVA"].ToString());
                    MModels.LeftNearPD = float.Parse(row["LeftNearPD"].ToString());
                    MModels.LeftNearAdd = float.Parse(row["LeftNearAdd"].ToString());
                    MModels.Indax = float.Parse(row["Indax"].ToString());
                    MModels.Coating = row["Coating"].ToString();
                    MModels.SplTreat = row["SplTreat"].ToString();
                    MModels.OtherSpecs = row["OtherSpecs"].ToString();
                    MModels.Optometrist = row["Optometrist"].ToString();
                    MModels.LensConst = row["LensConst"].ToString();
                    MModels.OptPrescRemarks = row["OptPrescRemarks"].ToString();
                    MModels.InterState = Convert.ToBoolean(row["InterState"].ToString());
                    MModels.ReSendSMS = Convert.ToBoolean(row["ReSendSMS"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }


        [HttpPost]
        public ActionResult HMS_SalesPrescriptionGets(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesPrescriptionGets(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                   
                    MModels.HLocation = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["MedicineId"].ToString());
                    MModels.ProductDesc = row["Description"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlno"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Company = row["GrpCode"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Qty"].ToString());                
                    MModels.SellPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.PurPrice = Convert.ToDecimal(row["MRP"].ToString());
                    MModels.Tax = Convert.ToDecimal(row["VatId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxRate"].ToString());            
                    MModels.Cess = Convert.ToDecimal(row["CessPer"].ToString());            
                    MModels.Drugschedule = row["SubCategoryId"].ToString();
                    MModels.Variable3 = row["HsnCode"].ToString();
                    MModels.Flag = Convert.ToInt32(row["Flag"].ToString());
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
        public ActionResult HMS_SalesRevisitGets(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesRevisitGets(SaleInvoiceHospital, dbName);

                if (dsDataSet == null || dsDataSet.Tables.Count == 0)
                    return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();

                    MModels.RegSer = Convert.ToInt32(row["RegSeries"].ToString());
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.Flag = Convert.ToInt32(row["RevisitId"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["IPNumber"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["IPYear"].ToString());
                    MModels.Status = row["CaseType"].ToString();
                    MModels.HSalesDate = row["CaseDate"].ToString();
                    MModels.Batch = row["Complaint"].ToString();
                    MModels.Company = row["Complaint"].ToString();
                    MModels.Expiry = row["VisitingDate"].ToString();
                    MModels.HDoctor = Convert.ToInt32(row["DocId"].ToString());
                    MModels.Variable1 =row["Name"].ToString();
                    
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
        public JsonResult HMS_SalesInvoiceUpdteStockOut(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesInvoiceUpdteStockOut(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public JsonResult HMS_SalesInvoiceUpdte(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesInvoiceUpdte(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public JsonResult HMS_SalesOrderInvoiceUpdate(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[108];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                tmpTable[62] = "CustAddress";
                tmpTable[63] = "GSTNo";
                tmpTable[64] = "GaragePhone";
                tmpTable[65] = "ExportDoc";
                tmpTable[66] = "Email";
                tmpTable[67] = "ExportStatus";
                tmpTable[68] = "SalesManId";
                tmpTable[69] = "AgreementNo";
                tmpTable[70] = "DueDate";
                tmpTable[71] = "Gender";
                tmpTable[72] = "Referance";
                tmpTable[73] = "RegisterNo";
                tmpTable[74] = "RightFarSph";
                tmpTable[75] = "RightFarCyl";
                tmpTable[76] = "RightFarAxs";
                tmpTable[77] = "RightFarVA";
                tmpTable[78] = "RightFarPD";
                tmpTable[79] = "RightFarAdd";
                tmpTable[80] = "LeftFarSph";
                tmpTable[81] = "LeftFarCyl";
                tmpTable[82] = "LeftFarAxs";
                tmpTable[83] = "LeftFarVA";
                tmpTable[84] = "LeftFarPD";
                tmpTable[85] = "LeftFarAdd";
                tmpTable[86] = "RightNearSph";
                tmpTable[87] = "RightNearCyl";
                tmpTable[88] = "RightNearAxs";
                tmpTable[89] = "RightNearVA";
                tmpTable[90] = "RightNearPD";
                tmpTable[91] = "RightNearAdd";
                tmpTable[92] = "LeftNearSph";
                tmpTable[93] = "LeftNearCyl";
                tmpTable[94] = "LeftNearAxs";
                tmpTable[95] = "LeftNearVA";
                tmpTable[96] = "LeftNearPD";
                tmpTable[97] = "LeftNearAdd";
                tmpTable[98] = "Indax";
                tmpTable[99] = "Coating";
                tmpTable[100] = "SplTreat";
                tmpTable[101] = "OtherSpecs";
                tmpTable[102] = "Optometrist";
                tmpTable[103] = "LensConst";
                tmpTable[104] = "OptPrescRemarks";
                tmpTable[105] = "InterState";
                tmpTable[106] = "ReSendSMS";
                tmpTable[106] = "SONo";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    obj.CustAddress = details.CustAddress;
                    obj.GSTNo = details.GSTNo;
                    obj.GaragePhone = details.GaragePhone;
                    obj.ExportDoc = details.ExportDoc;
                    obj.Email = details.Email;
                    obj.ExportStatus = details.ExportStatus;
                    obj.SalesManId = details.SalesManId;
                    obj.AgreementNo = details.AgreementNo;
                    obj.DueDate = details.DueDate;
                    obj.Gender = details.Gender;
                    obj.Referance = details.Referance;
                    obj.RegisterNo = details.RegisterNo;
                    obj.RightFarSph = details.RightFarSph;
                    obj.RightFarCyl = details.RightFarCyl;
                    obj.RightFarAxs = details.RightFarAxs;
                    obj.RightFarVA = details.RightFarVA;
                    obj.RightFarPD = details.RightFarPD;
                    obj.RightFarAdd = details.RightFarAdd;
                    obj.LeftFarSph = details.LeftFarSph;
                    obj.LeftFarCyl = details.LeftFarCyl;
                    obj.LeftFarAxs = details.LeftFarAxs;
                    obj.LeftFarVA = details.LeftFarVA;
                    obj.LeftFarPD = details.LeftFarPD;
                    obj.LeftFarAdd = details.LeftFarAdd;
                    obj.RightNearSph = details.RightNearSph;
                    obj.RightNearCyl = details.RightNearCyl;
                    obj.RightNearAxs = details.RightNearAxs;
                    obj.RightNearVA = details.RightNearVA;
                    obj.RightNearPD = details.RightNearPD;
                    obj.RightNearAdd = details.RightNearAdd;
                    obj.LeftNearSph = details.LeftNearSph;
                    obj.LeftNearCyl = details.LeftNearCyl;
                    obj.LeftNearAxs = details.LeftNearAxs;
                    obj.LeftNearVA = details.LeftNearVA;
                    obj.LeftNearPD = details.LeftNearPD;
                    obj.LeftNearAdd = details.LeftNearAdd;
                    obj.Indax = details.Indax;
                    obj.Coating = details.Coating;
                    obj.SplTreat = details.SplTreat;
                    obj.OtherSpecs = details.OtherSpecs;
                    obj.Optometrist = details.Optometrist;
                    obj.LensConst = details.LensConst;
                    obj.OptPrescRemarks = details.OptPrescRemarks;
                    obj.InterState = details.InterState;
                    obj.ReSendSMS = details.ReSendSMS;
                    obj.SONo = details.SONo;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt, obj.CustAddress, obj.GSTNo,
obj.GaragePhone, obj.ExportDoc, obj.Email, obj.ExportStatus, obj.SalesManId, obj.AgreementNo, obj.DueDate, obj.Gender, obj.Referance, obj.RegisterNo, obj.RightFarSph,
obj.RightFarCyl, obj.RightFarAxs, obj.RightFarVA, obj.RightFarPD, obj.RightFarAdd, obj.LeftFarSph, obj.LeftFarCyl, obj.LeftFarAxs, obj.LeftFarVA, obj.LeftFarPD, obj.LeftFarAdd,
 obj.RightNearSph, obj.RightNearCyl, obj.RightNearAxs, obj.RightNearVA, obj.RightNearPD, obj.RightNearAdd, obj.LeftNearSph, obj.LeftNearCyl, obj.LeftNearAxs,
  obj.LeftNearVA, obj.LeftNearPD, obj.LeftNearAdd, obj.Indax, obj.Coating, obj.SplTreat, obj.OtherSpecs, obj.Optometrist, obj.LensConst, obj.OptPrescRemarks,
  obj.InterState, obj.ReSendSMS, obj.SONo);
                }

                dsDataSet = obj.HMS_SalesOrderInvoiceUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public JsonResult HMS_OpticalSalesInvoiceUpdate(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[108];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                tmpTable[62] = "CustAddress";
                tmpTable[63] = "GSTNo";
                tmpTable[64] = "GaragePhone";
                tmpTable[65] = "ExportDoc";
                tmpTable[66] = "Email";
                tmpTable[67] = "ExportStatus";
                tmpTable[68] = "SalesManId";
                tmpTable[69] = "AgreementNo";
                tmpTable[70] = "DueDate";
                tmpTable[71] = "Gender";
                tmpTable[72] = "Referance";
                tmpTable[73] = "RegisterNo";
                tmpTable[74] = "RightFarSph";
                tmpTable[75] = "RightFarCyl";
                tmpTable[76] = "RightFarAxs";
                tmpTable[77] = "RightFarVA";
                tmpTable[78] = "RightFarPD";
                tmpTable[79] = "RightFarAdd";
                tmpTable[80] = "LeftFarSph";
                tmpTable[81] = "LeftFarCyl";
                tmpTable[82] = "LeftFarAxs";
                tmpTable[83] = "LeftFarVA";
                tmpTable[84] = "LeftFarPD";
                tmpTable[85] = "LeftFarAdd";
                tmpTable[86] = "RightNearSph";
                tmpTable[87] = "RightNearCyl";
                tmpTable[88] = "RightNearAxs";
                tmpTable[89] = "RightNearVA";
                tmpTable[90] = "RightNearPD";
                tmpTable[91] = "RightNearAdd";
                tmpTable[92] = "LeftNearSph";
                tmpTable[93] = "LeftNearCyl";
                tmpTable[94] = "LeftNearAxs";
                tmpTable[95] = "LeftNearVA";
                tmpTable[96] = "LeftNearPD";
                tmpTable[97] = "LeftNearAdd";
                tmpTable[98] = "Indax";
                tmpTable[99] = "Coating";
                tmpTable[100] = "SplTreat";
                tmpTable[101] = "OtherSpecs";
                tmpTable[102] = "Optometrist";
                tmpTable[103] = "LensConst";
                tmpTable[104] = "OptPrescRemarks";
                tmpTable[105] = "InterState";
                tmpTable[106] = "ReSendSMS";
                tmpTable[107] = "SONo";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    obj.CustAddress = details.CustAddress;
                    obj.GSTNo = details.GSTNo;
                    obj.GaragePhone = details.GaragePhone;
                    obj.ExportDoc = details.ExportDoc;
                    obj.Email = details.Email;
                    obj.ExportStatus = details.ExportStatus;
                    obj.SalesManId = details.SalesManId;
                    obj.AgreementNo = details.AgreementNo;
                    obj.DueDate = details.DueDate;
                    obj.Gender = details.Gender;
                    obj.Referance = details.Referance;
                    obj.RegisterNo = details.RegisterNo;
                    obj.RightFarSph = details.RightFarSph;
                    obj.RightFarCyl = details.RightFarCyl;
                    obj.RightFarAxs = details.RightFarAxs;
                    obj.RightFarVA = details.RightFarVA;
                    obj.RightFarPD = details.RightFarPD;
                    obj.RightFarAdd = details.RightFarAdd;
                    obj.LeftFarSph = details.LeftFarSph;
                    obj.LeftFarCyl = details.LeftFarCyl;
                    obj.LeftFarAxs = details.LeftFarAxs;
                    obj.LeftFarVA = details.LeftFarVA;
                    obj.LeftFarPD = details.LeftFarPD;
                    obj.LeftFarAdd = details.LeftFarAdd;
                    obj.RightNearSph = details.RightNearSph;
                    obj.RightNearCyl = details.RightNearCyl;
                    obj.RightNearAxs = details.RightNearAxs;
                    obj.RightNearVA = details.RightNearVA;
                    obj.RightNearPD = details.RightNearPD;
                    obj.RightNearAdd = details.RightNearAdd;
                    obj.LeftNearSph = details.LeftNearSph;
                    obj.LeftNearCyl = details.LeftNearCyl;
                    obj.LeftNearAxs = details.LeftNearAxs;
                    obj.LeftNearVA = details.LeftNearVA;
                    obj.LeftNearPD = details.LeftNearPD;
                    obj.LeftNearAdd = details.LeftNearAdd;
                    obj.Indax = details.Indax;
                    obj.Coating = details.Coating;
                    obj.SplTreat = details.SplTreat;
                    obj.OtherSpecs = details.OtherSpecs;
                    obj.Optometrist = details.Optometrist;
                    obj.LensConst = details.LensConst;
                    obj.OptPrescRemarks = details.OptPrescRemarks;
                    obj.InterState = details.InterState;
                    obj.ReSendSMS = details.ReSendSMS;
                    obj.SONo = details.SONo;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt, obj.CustAddress, obj.GSTNo,
obj.GaragePhone, obj.ExportDoc, obj.Email, obj.ExportStatus, obj.SalesManId, obj.AgreementNo, obj.DueDate, obj.Gender, obj.Referance, obj.RegisterNo, obj.RightFarSph,
obj.RightFarCyl, obj.RightFarAxs, obj.RightFarVA, obj.RightFarPD, obj.RightFarAdd, obj.LeftFarSph, obj.LeftFarCyl, obj.LeftFarAxs, obj.LeftFarVA, obj.LeftFarPD, obj.LeftFarAdd,
 obj.RightNearSph, obj.RightNearCyl, obj.RightNearAxs, obj.RightNearVA, obj.RightNearPD, obj.RightNearAdd, obj.LeftNearSph, obj.LeftNearCyl, obj.LeftNearAxs,
  obj.LeftNearVA, obj.LeftNearPD, obj.LeftNearAdd, obj.Indax, obj.Coating, obj.SplTreat, obj.OtherSpecs, obj.Optometrist, obj.LensConst, obj.OptPrescRemarks,
  obj.InterState, obj.ReSendSMS, obj.SONo);
                }

                dsDataSet = obj.HMS_OpticalSalesInvoiceUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public ActionResult HMS_SalesInvoiceDeletestockout(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesInvoiceDeletestockout(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
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
        public ActionResult HMS_SalesInvoiceDelete(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesInvoiceDelete(SaleInvoiceHospital, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status =row["Status"].ToString();
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString()); 
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());                 
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
        public ActionResult HMS_SalesOrderInvoiceDelete(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesOrderInvoiceDelete(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
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
        public ActionResult HMS_OpticalSalesInvoiceDelete(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_OpticalSalesInvoiceDelete(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
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
        public JsonResult HMS_SalesReturnInsert(List<SaleInvoiceHospital> SaleInvoiceHospital) 
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesReturnInsert(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
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
        public ActionResult HMS_SalesReturnGetandGets(SaleInvoiceHospital SaleInvoiceHospital) 
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesReturnGetandGets(SaleInvoiceHospital, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();

                    MModels.SalesMainId = Convert.ToInt32(row["SalesReturnMainId"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["BillSeries"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["ReturnNo"].ToString());
                    MModels.HPatient = Convert.ToInt32(row["CustId"].ToString());
                    MModels.HPatientName = row["CustoName"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.PRType = Convert.ToDecimal(row["PRType"].ToString());
                    MModels.HSalesDate = row["InvDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.HLocation = Convert.ToInt32(row["LocId"].ToString());
                    MModels.HDoctor = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.Discountpercent = Convert.ToDecimal(row["Discountpercent"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotlaTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTextTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["Taxable1"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["Taxable2"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["Taxable3"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["Taxable4"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["Taxable5"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();                  
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Company = row["ProductDescr"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellPrice = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.PurPrice = Convert.ToDecimal(row["AverageCost"].ToString());
                    MModels.Tax = Convert.ToDecimal(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmt = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmt = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Cess = Convert.ToDecimal(row["CessPerc"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Drugschedule = row["ImeiNo"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.LPO_No = row["LPONumber"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.Variable1 = row["IPNumber"].ToString();
                    MModels.Variable2 = row["ReceivedAmount"].ToString();
                    MModels.Variable3 = row["HsnCode"].ToString();
                    MModels.ProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
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

        [HttpPost]
        public JsonResult HMS_SalesReturnUpdate(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesReturnUpdate(dt, dbName);  
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
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
        public ActionResult HMS_SalesReturnDelete(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesReturnDelete(SaleInvoiceHospital, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
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
        public ActionResult HMS_BatchwiseItemDetailsGetsSalesReturn(SaleInvoiceHospital SaleInvoiceHospital) 
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_BatchwiseItemDetailsGetsSalesReturn(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.ProductDesc = row["ProductDesc"].ToString();
                    MModels.Company = row["Company"].ToString();
                    MModels.Companycode = row["Companycode"].ToString();
                    MModels.ItemExpiry = row["ItemExpiry"].ToString();
                    MModels.Stock = Convert.ToDecimal(row["Stock"].ToString());
                    MModels.Purrate = Convert.ToDecimal(row["Purrate"].ToString());
                    MModels.Sellingrate = Convert.ToDecimal(row["Sellingrate"].ToString());
                    MModels.Mrp = Convert.ToDecimal(row["Mrp"].ToString());
                    MModels.Taxpers = Convert.ToDecimal(row["Taxpers"].ToString());
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Drugschedule = row["Drugschedule"].ToString();
                    MModels.Cess = Convert.ToDecimal(row["Model1"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["BalQty"].ToString());
                    MModels.Variable3 = row["HsnCode"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(oList, JsonRequestBehavior.AllowGet);
            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]

        public ActionResult HMS_DischargeSummaryInsertandUpdate(DischargeSummary DischargeSummary)
        {
            DischargeSummary obj = new DischargeSummary();
            List<DischargeSummary> oList = new List<DischargeSummary>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_DischargeSummaryInsertandUpdate(DischargeSummary, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DischargeSummary Models = new DischargeSummary(); 
                    Models.Status = row["Status"].ToString();
                    Models.DischargeId = Convert.ToInt32(row["DischargeId"].ToString());
                    Models.DischargeNo = Convert.ToInt32(row["DischargeNo"].ToString()); 
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        

        [HttpPost]
        public ActionResult HMS_DischargeSummaryGetandGetscopy(DischargeSummary DischargeSummary)
        {
            DischargeSummary obj = new DischargeSummary();
            List<DischargeSummary> oList = new List<DischargeSummary>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_DischargeSummaryGetandGetscopy(DischargeSummary, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DischargeSummary Models = new DischargeSummary();
                    Models.DischargeId = Convert.ToInt32(row["DischargeId"].ToString());
                    Models.DischargeNo = Convert.ToInt32(row["DischargeNo"].ToString());
                    Models.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Models.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    Models.PatientId = Convert.ToInt32(row["PatientId"].ToString());
                    Models.IP_Number = Convert.ToInt32(row["IP_Number"].ToString());
                    Models.IP_Year = Convert.ToInt32(row["IP_Year"].ToString());
                    Models.PName = row["PName"].ToString();
                    Models.OPVisitId = Convert.ToInt32(row["OPVisitId"].ToString());
                    Models.AdmittedDate = row["AdmittedDate"].ToString();
                    Models.DischargeDate = row["DischargeDate"].ToString();
                    Models.Reasons = row["Reasons"].ToString();
                    Models.Diagnosis = row["Diagnosis"].ToString();
                    Models.PresentComplaints = row["PresentComplaints"].ToString();
                    Models.PastHistory = row["PastHistory"].ToString();
                    Models.FamilyHistory = row["FamilyHistory"].ToString();
                    Models.DevelopHistory = row["DevelopHistory"].ToString();
                    Models.Immunization = row["Immunization"].ToString();
                    Models.Examination = row["Examination"].ToString();
                    Models.GenExamination = row["GenExamination"].ToString();
                    Models.Course = row["Course"].ToString();
                    Models.Treatment = row["Treatment"].ToString();
                    Models.DischargeAdvice = row["DischargeAdvice"].ToString();
                    Models.RS = row["RS"].ToString();
                    Models.GIT = row["GIT"].ToString();
                    Models.CNS = row["CNS"].ToString();
                    Models.Height = row["Height"].ToString();
                    Models.Weight = row["Weight"].ToString();
                    Models.CVS = row["CVS"].ToString();
                    Models.AfterDays = row["AfterDays"].ToString();
                    Models.SummaryDate = row["SummaryDate"].ToString();
                    Models.UserId = Convert.ToInt32(row["UserId"].ToString());
                    Models.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    Models.SurgeryDate = row["SurgeryDate"].ToString();
                    Models.Variable1 = row["Variable1"].ToString();
                    Models.Variable2 = row["Variable2"].ToString();
                    Models.Variable3 = row["Variable3"].ToString();
                    Models.Variable4 = row["Variable4"].ToString();
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }





















        [HttpPost]
        public ActionResult HMS_DischargeSummaryGetandGets(DischargeSummary DischargeSummary)
        {
            DischargeSummary obj = new DischargeSummary();
            List<DischargeSummary> oList = new List<DischargeSummary>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_DischargeSummaryGetandGets(DischargeSummary, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DischargeSummary Models = new DischargeSummary();
                    Models.DischargeId = Convert.ToInt32(row["DischargeId"].ToString());
                    Models.DischargeNo = Convert.ToInt32(row["DischargeNo"].ToString());
                    Models.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Models.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    Models.PatientId = Convert.ToInt32(row["PatientId"].ToString());
                    Models.IP_Number = Convert.ToInt32(row["IP_Number"].ToString());
                    Models.IP_Year = Convert.ToInt32(row["IP_Year"].ToString());
                    Models.PName = row["PName"].ToString();
                    Models.OPVisitId = Convert.ToInt32(row["OPVisitId"].ToString());
                    Models.AdmittedDate = row["AdmittedDate"].ToString();
                    Models.DischargeDate = row["DischargeDate"].ToString();
                    Models.Reasons = row["Reasons"].ToString();
                    Models.Diagnosis = row["Diagnosis"].ToString();
                    Models.PresentComplaints = row["PresentComplaints"].ToString();
                    Models.PastHistory = row["PastHistory"].ToString();
                    Models.FamilyHistory = row["FamilyHistory"].ToString();
                    Models.DevelopHistory = row["DevelopHistory"].ToString();
                    Models.Immunization = row["Immunization"].ToString();
                    Models.Examination = row["Examination"].ToString();
                    Models.GenExamination = row["GenExamination"].ToString();
                    Models.Course = row["Course"].ToString();
                    Models.Treatment = row["Treatment"].ToString();
                    Models.DischargeAdvice = row["DischargeAdvice"].ToString();
                    Models.RS = row["RS"].ToString();
                    Models.GIT = row["GIT"].ToString();
                    Models.CNS = row["CNS"].ToString();
                    Models.Height = row["Height"].ToString();
                    Models.Weight = row["Weight"].ToString();
                    Models.CVS = row["CVS"].ToString();
                    Models.AfterDays = row["AfterDays"].ToString();
                    Models.SummaryDate = row["SummaryDate"].ToString();
                    Models.UserId = Convert.ToInt32(row["UserId"].ToString());
                    Models.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    Models.SurgeryDate = row["SurgeryDate"].ToString();
                    Models.Variable1 = row["Variable1"].ToString();
                    Models.Variable2 = row["Variable2"].ToString();
                    Models.Variable3 = row["Variable3"].ToString();
                    Models.Variable4 = row["Variable4"].ToString();
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }

        [HttpPost]
        public JsonResult Hms_DischargeSummaryTestsInsertandUpdate(List<HMSTest> HMSTest)
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

                dsDataSet = obj.Hms_DischargeSummaryTestsInsertandUpdate(dt, dbName); 
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

        [HttpPost]
        public ActionResult HMS_DischargeSummaryTestsGetandGets(HMSTest HMSTest) 
        {
            HMSTest obj = new HMSTest();
            List<HMSTest> oList = new List<HMSTest>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DischargeSummaryTestsGetandGets(HMSTest, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMSTest MModels = new HMSTest();

                    MModels.TestId = Convert.ToInt32(row["TestId"].ToString());
                    MModels.TestName = row["TestName"].ToString();
                    MModels.Rate = Convert.ToDecimal(row["PatientId"].ToString());
                    MModels.SpRate = Convert.ToDecimal(row["OPNumber"].ToString());
                    MModels.VSpRate = Convert.ToDecimal(row["IPNumber"].ToString());
                    MModels.MedDept = Convert.ToInt32(row["DischargeSumId"].ToString());
                    MModels.SubTestId = Convert.ToInt32(row["SubTestId"].ToString());
                    MModels.SubDiv = row["BillNo"].ToString();
                    MModels.StdUnit = row["SUnit"].ToString();
                    MModels.NormalValue = row["Date"].ToString();
                    MModels.dcnormal = row["NormalValue"].ToString();
                    MModels.dcresult = row["ResultValue"].ToString();
                    MModels.Notes = row["SubTestName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_TemporaryCaseSheetInsertAyurveda(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_TemporaryCaseSheetInsertAyurveda(CaseSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();
                    Models.Status = row["Status"].ToString();
                    Models.CaseSheetNo = Convert.ToInt32(row["CaseSheetNo"].ToString());
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_CaseSheetInsertandUpdateAyurveda(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_CaseSheetInsertandUpdateAyurveda(CaseSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();
                    Models.Status = row["Status"].ToString();
                    Models.CaseSheetNo = Convert.ToInt32(row["CaseSheetNo"].ToString());

                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }





        [HttpPost]
        public ActionResult HMS_CaseSheetGetandGetsAyurveda(CaseSheet CaseSheet)
        {
            CaseSheet obj = new CaseSheet();
            List<CaseSheet> oList = new List<CaseSheet>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.HMS_CaseSheetGetandGetsAyurveda(CaseSheet, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CaseSheet Models = new CaseSheet();
                    Models.CaseSheetId = Convert.ToInt32(row["CId"].ToString());
                    Models.CaseSheetNo = Convert.ToInt32(row["CaseSheetNo"].ToString());
                    Models.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    Models.PRegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Models.RevisitId = Convert.ToInt32(row["RevisitId"].ToString());
                    Models.PatientIP = Convert.ToInt32(row["IPNumber"].ToString());
                    Models.IPYear = Convert.ToInt32(row["IPYear"].ToString());
                    Models.PatientId = Convert.ToInt32(row["RegId"].ToString());


                    Models.Complaint = row["Complaint"].ToString();
                    Models.Diagnosis = row["Diagnosis"].ToString();
                    Models.Presentillness = row["Presentillness"].ToString();
                    Models.Allergies = row["Allergies"].ToString();
                    Models.Notes = row["Notes"].ToString();
                    Models.Remarks = row["Remarks"].ToString();
                    Models.Cycle = row["Cycle"].ToString();
                    Models.Complication = row["Complication"].ToString();
                    Models.Addiction = row["Addiction"].ToString();
                    Models.Examination = row["Examination"].ToString();
                    Models.Details = row["Details"].ToString();
                    Models.Systemic = row["Systemic"].ToString();
                    Models.DTemp = row["DTemp"].ToString();
                    Models.Dpulse = row["Dpulse"].ToString();
                    Models.DRegular = row["DRegular"].ToString();
                    Models.DBP = row["DBP"].ToString();
                    Models.Dheight = row["Dheight"].ToString();
                    Models.Dweight = row["Dweight"].ToString();
                    Models.Dbmi = row["Dbmi"].ToString();
                    Models.DBowel = row["DBowel"].ToString();
                    Models.DAppetite = row["DAppetite"].ToString();
                    Models.DMict = row["DMict"].ToString();
                    Models.DSleep = row["DSleep"].ToString();
                    Models.DHabits = row["DHabits"].ToString();
                    Models.Built = row["Built"].ToString();
                    Models.Gain = row["Gain"].ToString();
                    Models.Intake = row["Intake"].ToString();
                    Models.Gastric = row["Gastric"].ToString();
                    Models.PhysicalAct = row["PhysicalAct"].ToString();
                    Models.vitaminSupp = row["vitaminSupp"].ToString();
                    Models.Nutristatus = row["Nutristatus"].ToString();
                    Models.Nutriassess = row["Nutriassess"].ToString();
                    Models.Painassess = row["Painassess"].ToString();
                    Models.ProDiagnosis = row["ProDiagnosis"].ToString();
                    Models.Investigations = row["Investigations"].ToString();
                    Models.docDiagnosis = row["docDiagnosis"].ToString();
                    Models.CarePlanStrategy = row["CarePlanStrategy"].ToString();
                    Models.Advice = row["Advice"].ToString();
                    Models.DietPlan = row["DietPlan"].ToString();
                    Models.UndergoingMedicines = row["UndergoingMedicines"].ToString();
                    Models.OutCome = row["OutCome"].ToString();
                    Models.CarePlanModi = row["CarePlanModi"].ToString();
                    Models.abc1 = row["abc1"].ToString();
                    Models.abc2 = row["abc2"].ToString();
                    Models.abc3 = row["abc3"].ToString();
                    Models.abc4 = row["abc4"].ToString();
                    Models.abc5 = row["abc5"].ToString();
                    Models.abc6 = row["abc6"].ToString();
                    Models.abc7 = row["abc7"].ToString();
                    Models.abc8 = row["abc8"].ToString();
                    Models.abc9 = row["abc9"].ToString();
                    Models.abc10 = row["abc10"].ToString();
                    Models.abc11 = row["abc11"].ToString();
                    Models.abc12 = row["abc12"].ToString();
                    Models.abc13 = row["abc13"].ToString();
                    Models.abc14 = row["abc14"].ToString();
                    Models.abc15 = row["abc15"].ToString();
                    Models.abc16 = row["abc16"].ToString();
                    Models.abc17 = row["abc17"].ToString();
                    Models.abc18 = row["abc18"].ToString();
                    Models.abc19 = row["abc19"].ToString();
                    Models.abc20 = row["abc20"].ToString();


                    Models.ICD = row["ICD"].ToString();
                    Models.ICDDetails = row["ICDDetails"].ToString();
                    Models.CaseDate = row["CaseDate"].ToString();
                    Models.UserId = Convert.ToInt32(row["UserId"].ToString());
                    Models.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    Models.Status = row["Status"].ToString();

                    Models.PName = row["PName"].ToString();

                    Models.Address1 = row["Address1"].ToString();
                    Models.Address2 = row["Address2"].ToString();
                    Models.Address3 = row["Address3"].ToString();
                    Models.Age = Convert.ToInt32(row["Age"].ToString());
                    Models.Bloodgroup = row["Bloodgroup"].ToString();
                    Models.PGender = row["PGender"].ToString();
                    Models.ICDId = Convert.ToInt32(row["ICDId"].ToString());

                    Models.Medicine = row["Medicine"].ToString();
                    Models.DelFlag = Convert.ToInt32(row["EditFlag"].ToString());

                    Models.SendSMS = row["SendSMS"].ToString();
                    Models.SpecialFees = row["SpecialFees"].ToString();
                    Models.Reviewdate = row["Reviewdate"].ToString();
                    oList.Add(Models);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }



        [HttpPost]
        public JsonResult HMS_SalesInvoiceInsertOPTICALSORDER(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesInvoiceInsertOPTICALSORDER(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public JsonResult HMS_SalesInvoiceUpdteOPTICALSORDER(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesInvoiceUpdteOPTICALSORDER(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public ActionResult HMS_SalesGetandGetsOPTICALORDER(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesGetandGetsOPTICALORDER(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();

                    MModels.SalesMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.HPatient = Convert.ToInt32(row["CustId"].ToString());
                    MModels.HPatientName = row["CustoName"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.PRType = Convert.ToDecimal(row["PRType"].ToString());
                    MModels.HSalesDate = row["InvDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.HLocation = Convert.ToInt32(row["LocId"].ToString());
                    MModels.HDoctor = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.Discountpercent = Convert.ToDecimal(row["Discountpercent"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotlaTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTextTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["Taxable1"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["Taxable2"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["Taxable3"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["Taxable4"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["Taxable5"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.SubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Company = row["ProductDescr"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellPrice = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.PurPrice = Convert.ToDecimal(row["AverageCost"].ToString());
                    MModels.Tax = Convert.ToDecimal(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmt = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmt = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Cess = Convert.ToDecimal(row["CessPerc"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Drugschedule = row["ImeiNo"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.LPO_No = row["LPONumber"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.Variable1 = row["IPNumber"].ToString();
                    MModels.Variable2 = row["ReceivedAmount"].ToString();
                    MModels.Variable3 = row["HsnCode"].ToString();
                    MModels.ProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.Terms = Convert.ToInt32(row["Invterms"].ToString());

                    MModels.SpecialFeeAmt = Convert.ToDecimal(row["SpecialFeeAmt"].ToString());
                    MModels.Area = Convert.ToInt32(row["areaid"].ToString());
                    //anu
                    MModels.JobNo = Convert.ToInt32(row["JobNumber"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        [HttpPost]
        public ActionResult HMS_SalesInvoiceDeleteOPTICALORDER(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesInvoiceDeleteOPTICALORDER(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
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
        public JsonResult HMS_SalesInvoiceInsertOPTICALSINVOICE(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesInvoiceInsertOPTICALSINVOICE(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public JsonResult HMS_SalesInvoiceUpdteOPTICALSINVOICE(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesInvoiceUpdteOPTICALSINVOICE(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
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
        public ActionResult HMS_SalesGetandGetsOPTICALSINVOICE(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesGetandGetsOPTICALSINVOICE(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();

                    MModels.SalesMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.HPatient = Convert.ToInt32(row["CustId"].ToString());
                    MModels.HPatientName = row["CustoName"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.PRType = Convert.ToDecimal(row["PRType"].ToString());
                    MModels.HSalesDate = row["InvDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.HLocation = Convert.ToInt32(row["LocId"].ToString());
                    MModels.HDoctor = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.Discountpercent = Convert.ToDecimal(row["Discountpercent"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotlaTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTextTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["Taxable1"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["Taxable2"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["Taxable3"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["Taxable4"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["Taxable5"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.SubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Company = row["ProductDescr"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellPrice = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.PurPrice = Convert.ToDecimal(row["AverageCost"].ToString());
                    MModels.Tax = Convert.ToDecimal(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmt = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmt = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Cess = Convert.ToDecimal(row["CessPerc"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Drugschedule = row["ImeiNo"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.LPO_No = row["LPONumber"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.Variable1 = row["IPNumber"].ToString();
                    MModels.Variable2 = row["ReceivedAmount"].ToString();
                    MModels.Variable3 = row["HsnCode"].ToString();
                    MModels.ProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.Terms = Convert.ToInt32(row["Invterms"].ToString());

                    MModels.SpecialFeeAmt = Convert.ToDecimal(row["SpecialFeeAmt"].ToString());
                    MModels.Area = Convert.ToInt32(row["areaid"].ToString());
                    //anu
                    MModels.JobNo = Convert.ToInt32(row["JobNumber"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }


        [HttpPost]
        public ActionResult HMS_SalesInvoiceDeleteOPTICALSINVOICE(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesInvoiceDeleteOPTICALSINVOICE(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
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
        public JsonResult HMS_SalesReturnInsertOpticals(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesReturnInsertOpticals(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
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
        public JsonResult HMS_SalesReturnUpdateOpticals(List<SaleInvoiceHospital> SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "SalesMainId";
                tmpTable[1] = "HBillSeries";
                tmpTable[2] = "HBillNo";
                tmpTable[3] = "HPatient";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PRType";
                tmpTable[6] = "HSalesDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "HLocation";
                tmpTable[10] = "HDoctor";
                tmpTable[11] = "Discount";
                tmpTable[12] = "Discountpercent";
                tmpTable[13] = "TotalTaxable";
                tmpTable[14] = "TotlaTax";
                tmpTable[15] = "BaseTextTotal";
                tmpTable[16] = "BCGST_0";
                tmpTable[17] = "BCGST_5";
                tmpTable[18] = "BCGST_12";
                tmpTable[10] = "BCGST_18";
                tmpTable[20] = "BCGST_28";
                tmpTable[21] = "BCess";
                tmpTable[22] = "RoundOff";
                tmpTable[23] = "BDFlag";
                tmpTable[24] = "CessFlag";
                tmpTable[25] = "Remarks";
                tmpTable[26] = "SubId";
                tmpTable[27] = "ProductId";
                tmpTable[28] = "ProductDesc";
                tmpTable[29] = "BatchSlNo";
                tmpTable[30] = "Batch";
                tmpTable[31] = "Company";
                tmpTable[32] = "Expiry";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Free";
                tmpTable[35] = "Pack";
                tmpTable[36] = "Loose";
                tmpTable[37] = "SellPrice";
                tmpTable[38] = "PurPrice";
                tmpTable[39] = "Tax";
                tmpTable[40] = "TaxPercent";
                tmpTable[41] = "TaxableAmt";
                tmpTable[42] = "TaxAmt";
                tmpTable[43] = "Cess";
                tmpTable[44] = "CessAmount";
                tmpTable[45] = "Amount";
                tmpTable[46] = "DrugSchedule";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DeptId";
                tmpTable[50] = "Status";
                tmpTable[51] = "Terms";
                tmpTable[52] = "LPO_No";
                tmpTable[53] = "JobNo";
                tmpTable[54] = "Area";
                tmpTable[55] = "Flag";
                tmpTable[56] = "Variable1";
                tmpTable[57] = "Variable2";
                tmpTable[58] = "Variable3";
                tmpTable[59] = "Variable4";
                tmpTable[60] = "Variable5";
                tmpTable[61] = "SpecialFeeAmt";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SaleInvoiceHospital)
                {

                    obj.SalesMainId = details.SalesMainId;
                    obj.HBillSeries = details.HBillSeries;
                    obj.HBillNo = details.HBillNo;
                    obj.HPatient = details.HPatient;
                    obj.PayType = details.PayType;
                    obj.PRType = details.PRType;
                    obj.HSalesDate = details.HSalesDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.HLocation = details.HLocation;
                    obj.HDoctor = details.HDoctor;
                    obj.Discount = details.Discount;
                    obj.Discountpercent = details.Discountpercent;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotlaTax = details.TotlaTax;
                    obj.BaseTextTotal = details.BaseTextTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductDesc = details.ProductDesc;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Company = details.Company;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Pack = details.Pack;
                    obj.Loose = details.Loose;
                    obj.SellPrice = details.SellPrice;
                    obj.PurPrice = details.PurPrice;
                    obj.Tax = details.Tax;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxableAmt = details.TaxableAmt;
                    obj.TaxAmt = details.TaxAmt;
                    obj.Cess = details.Cess;
                    obj.CessAmount = details.CessAmount;
                    obj.Amount = details.Amount;
                    obj.Drugschedule = details.Drugschedule;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.Flag = details.Flag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.SpecialFeeAmt = details.SpecialFeeAmt;
                    dt.Rows.Add(obj.SalesMainId, obj.HBillSeries, obj.HBillNo, obj.HPatient, obj.PayType, obj.PRType, obj.HSalesDate, obj.CurrencyId, obj.CurrencyRate,
obj.HLocation, obj.HDoctor, obj.Discount, obj.Discountpercent, obj.TotalTaxable, obj.TotlaTax, obj.BaseTextTotal, obj.BCGST_0, obj.BCGST_5,
obj.BCGST_12, obj.BCGST_18, obj.BCGST_28, obj.BCess, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ProductId, obj.ProductDesc,
obj.BatchSlNo, obj.Batch, obj.Company, obj.Expiry, obj.Quantity, obj.Free, obj.Pack, obj.Loose, obj.SellPrice, obj.PurPrice, obj.Tax, obj.TaxPercent,
obj.TaxableAmt, obj.TaxAmt, obj.Cess, obj.CessAmount, obj.Amount, obj.Drugschedule, obj.DelFlag, obj.UserId, obj.DeptId, obj.Status, obj.Terms,
obj.LPO_No, obj.JobNo, obj.Area, obj.Flag, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.SpecialFeeAmt);
                }

                dsDataSet = obj.HMS_SalesReturnUpdateOpticals(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();
                    MModels.Status = row["Status"].ToString();
                    MModels.HBillNo = Convert.ToInt32(row["HBillNo"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["HBillSeries"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.Batch = row["ProductDescr"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.HLocationName = row["HLocationName"].ToString();
                    MModels.HSalesDate = row["HSalesDate"].ToString();
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
        public ActionResult HMS_SalesReturnGetandGetsOpticals(SaleInvoiceHospital SaleInvoiceHospital)
        {
            SaleInvoiceHospital obj = new SaleInvoiceHospital();

            List<SaleInvoiceHospital> oList = new List<SaleInvoiceHospital>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_SalesReturnGetandGetsOpticals(SaleInvoiceHospital, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SaleInvoiceHospital MModels = new SaleInvoiceHospital();

                    MModels.SalesMainId = Convert.ToInt32(row["SalesReturnMainId"].ToString());
                    MModels.HBillSeries = Convert.ToInt32(row["BillSeries"].ToString());
                    MModels.HBillNo = Convert.ToInt32(row["ReturnNo"].ToString());
                    MModels.HPatient = Convert.ToInt32(row["CustId"].ToString());
                    MModels.HPatientName = row["CustoName"].ToString();
                    MModels.PayType = Convert.ToInt32(row["PayType"].ToString());
                    MModels.PRType = Convert.ToDecimal(row["PRType"].ToString());
                    MModels.HSalesDate = row["InvDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.HLocation = Convert.ToInt32(row["LocId"].ToString());
                    MModels.HDoctor = Convert.ToInt32(row["DoctorId"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.Discountpercent = Convert.ToDecimal(row["Discountpercent"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotlaTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTextTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["Taxable1"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["Taxable2"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["Taxable3"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["Taxable4"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["Taxable5"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductDesc = row["ProductCode"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Company = row["ProductDescr"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Pack = Convert.ToDecimal(row["Pack"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellPrice = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.PurPrice = Convert.ToDecimal(row["AverageCost"].ToString());
                    MModels.Tax = Convert.ToDecimal(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmt = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmt = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Cess = Convert.ToDecimal(row["CessPerc"].ToString());
                    MModels.CessAmount = Convert.ToDecimal(row["CessAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Drugschedule = row["ImeiNo"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.LPO_No = row["LPONumber"].ToString();
                    MModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    MModels.Variable1 = row["IPNumber"].ToString();
                    MModels.Variable2 = row["ReceivedAmount"].ToString();
                    MModels.Variable3 = row["HsnCode"].ToString();
                    MModels.ProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
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
    }
}