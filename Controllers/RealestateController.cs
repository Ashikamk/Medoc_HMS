using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.Mvc;

namespace EUMI_ERP.Controllers
{
    
    public class RealestateController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: Realestate
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult PDCList()
        {
            return View();
        }
        public ActionResult VacantFlatLossAnalysis()
        {
            return View();
        }
        public ActionResult LandLord()
        {
            return View();
        }
        public ActionResult Tenant()
        {
            return View();
        }

        public ActionResult Features() 
        {
            return View();
        }

        public ActionResult Building() 
        {
            return View();
        }
        public ActionResult FlatMaster() 
        {
            return View();
        }
        public ActionResult Agent()
        {
            return View();
        }
        public ActionResult Contract()
        {
            return View();
        }
        public ActionResult AssetRegister()
        {
            return View();
        }
        public ActionResult LandLordReport()
        {
            return View();
        }
        public ActionResult TenantVillaDetailsReport()
        {
            return View();
        }
        public ActionResult FlatDetailsReport()
        {
            return View();
        }
        public ActionResult TenantDetailswithPDC()
        {
            return View();
        }
        public ActionResult PremiseMaster()
        {
            return View();
        }
        public ActionResult LeaseContractDetails()
        {
            return View();
        }
        public ActionResult DeferredIncomeStmnt()
        {
            return View();
        }

        [HttpPost]
        public void RemoveExistingContractDocumentFolder(ItemMasterModel ItemMasterModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Contract/" + ItemMasterModel.DocumentId + "/"));



            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
            //else
            //{
            //    DirectoryInfo attachments_AR = new DirectoryInfo(Server.MapPath(@"~/ProjectImages/Contract/" + ItemMasterModel.DocumentId + "/"));
            //    EmptyFolder(attachments_AR);
            //    Directory.Delete(fileName);
            //    Directory.CreateDirectory(fileName);
            //}
        }
        [HttpPost]
        public void ContractUploadDocuments()
        {
            try
            {
                foreach (string upload in Request.Files)
                {
                    string filename = Path.GetFileName(Request.Files[upload].FileName);
                    string strImageName = Request.Form["imageName"];
                    string extension = Path.GetExtension(filename);
                    string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Contract/" + Request.Form["UniqueId"] + "/"), strImageName + extension);
                    Request.Files[upload].SaveAs(path1);

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
        }

        [HttpPost]
        public ActionResult PremiseInsertandUpdate(TenantMaster TenantMaster)
        {
            TenantMaster obj = new TenantMaster();
            List<TenantMaster> oList = new List<TenantMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PremiseInsertandUpdate(TenantMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TenantMaster CModels = new TenantMaster();
                    CModels.Status = row["Status"].ToString();
                    CModels.PremiseId = Convert.ToInt32(row["PremiseId"].ToString());
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult PremiseGetandGets(TenantMaster CategoryModel)
        {
            TenantMaster obj = new TenantMaster();

            List<TenantMaster> oList = new List<TenantMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PremiseGetandGets(CategoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TenantMaster CModels = new TenantMaster();
                    CModels.PremiseId = Convert.ToInt32(row["PremiseId"].ToString());
                    CModels.PremiseRemarks = row["PremiseRemarks"].ToString();
                    CModels.PremiseCode = row["PremiseCode"].ToString();
                    CModels.PremiseDescription = row["PremiseDescription"].ToString();
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LandLordReportGets(LandModel LandModel)
        {
            LandModel obj = new LandModel();

            List<LandModel> oList = new List<LandModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LandLordReportGets(LandModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LandModel MModels = new LandModel();
                    MModels.Lan_Id = Convert.ToInt32(row["Lan_Id"].ToString());
                    MModels.Nationality = row["CountryName"].ToString();
                    MModels.LandName = row["Lan_Name"].ToString();
                    MModels.Pobox = row["Lan_Pobox"].ToString();
                    MModels.Profession = row["Lan_Profession"].ToString();
                    MModels.Address1 = row["Lan_Ad1"].ToString();
                    MModels.Address2 = row["Lan_Ad2"].ToString();
                    MModels.Address3 = row["Lan_Ad3"].ToString();
                    MModels.PhoneNo = row["Lan_Tel"].ToString();
                    MModels.Email = row["Lan_Email"].ToString();
                    MModels.Faxno = row["Lan_Fno"].ToString();
                    MModels.Mobno = row["Lan_Mob"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult TenantDetailswithPDCGets(LandModel LandModel)
        {
            LandModel obj = new LandModel();

            List<LandModel> oList = new List<LandModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TenantDetailswithPDCGets(LandModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LandModel MModels = new LandModel();
                    MModels.ContractNo = row["ContractNo"].ToString();
                    MModels.Tenant = row["Tenant"].ToString();
                    MModels.Premise = row["Premise"].ToString();
                    MModels.FlatNo = row["FlatNo"].ToString();
                    MModels.Rent = row["Rent"].ToString();
                    MModels.FromDate = row["FromDate"].ToString();
                    MModels.ToDate = row["ToDate"].ToString();
                    MModels.Period = row["Period"].ToString();
                    MModels.ChequeNo = row["ChequeNo"].ToString();
                    MModels.ChequeDate = row["ChequeDate"].ToString();
                    MModels.Amount = row["Amount"].ToString();
                    MModels.Bank = row["Bank"].ToString();
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
        public ActionResult LeaseContractDetailsGets(LandModel LandModel)
        {
            LandModel obj = new LandModel();

            List<LandModel> oList = new List<LandModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LeaseContractDetailsGets(LandModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LandModel MModels = new LandModel();
                    MModels.Tenant = row["Tenant"].ToString();
                    MModels.Premise = row["Premise"].ToString();
                    MModels.FlatNo = row["FlatNo"].ToString();
                    MModels.Rent = row["Rent"].ToString();
                    MModels.FromDate = row["FromDate"].ToString();
                    MModels.ToDate = row["ToDate"].ToString();
                    MModels.Period = row["Period"].ToString();
                    MModels.Installments = row["Installments"].ToString();
                    MModels.Collected = row["Collected"].ToString();
                    MModels.PDC = row["PDC"].ToString();
                    MModels.Amount = row["Amount"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        public ActionResult DeferredIncomeStmntGets(LandModel LandModel)
        {
            LandModel obj = new LandModel();

            List<LandModel> oList = new List<LandModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeferredIncomeStmntGets(LandModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LandModel MModels = new LandModel();
                    MModels.FlatNo = row["FlatNumber"].ToString();
                    MModels.DEWANo = row["DEWANO"].ToString();
                    MModels.FlatType = row["FlatType"].ToString();
                    MModels.Rent = row["Rent"].ToString();
                    MModels.Days = row["Days"].ToString();
                    MModels.ToDate = row["ToPeriod"].ToString();
                    MModels.Amount = row["Amount"].ToString();
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
        public ActionResult AgentInsertandUpdates(Agent Agent)
        {
            Agent obj = new Agent();
            List<Agent> oList = new List<Agent>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AgentInsertandUpdates(Agent, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Agent MModels = new Agent();
                    MModels.Status = row["Status"].ToString();
                    MModels.AgentId = Convert.ToInt32(row["AgentId"].ToString());
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
        public ActionResult Rpt_TenantVilla(TenantMaster ReportModel)
        {
            TenantMaster obj = new TenantMaster();

            List<TenantMaster> oList = new List<TenantMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.Rpt_TenantVilla(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TenantMaster Reptmodels = new TenantMaster();
                    Reptmodels.TenantName = row["TenantName"].ToString();
                    Reptmodels.Premise = row["Premise"].ToString();
                    Reptmodels.FlatName = row["FlatNo"].ToString();
                    Reptmodels.Country = row["CountryName"].ToString();
                    Reptmodels.TenantPin1 = row["TenantPin1"].ToString();
                    Reptmodels.TenantAdr1 = row["TenantAdr1"].ToString();
                    Reptmodels.TenantPhone = row["TenantPhone"].ToString();
                    Reptmodels.TenantContactNo1 = row["TenantContactNo1"].ToString();
                    Reptmodels.Email = row["Email"].ToString();
                    oList.Add(Reptmodels);
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
        public ActionResult Rpt_FlatDetails(FlatMasterModel ReportModel)
        {
            FlatMasterModel obj = new FlatMasterModel();

            List<FlatMasterModel> oList = new List<FlatMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Rpt_FlatDetails(ReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FlatMasterModel Reptmodels = new FlatMasterModel();
                    Reptmodels.FlatNumber = row["FlatNumber"].ToString();
                    Reptmodels.NameofBuilding = row["NameofBuilding"].ToString();
                    Reptmodels.DEWANO = row["DEWANO"].ToString();
                    Reptmodels.FlatName = row["FlatTypeName"].ToString();
                    Reptmodels.Status = row["Status"].ToString();
                    Reptmodels.Period = row["Period"].ToString();
                    Reptmodels.FromDate = row["StartDate"].ToString();
                    Reptmodels.ToDate = row["EndDate"].ToString();
                    Reptmodels.Rent = Convert.ToDecimal(row["Rent"].ToString());
                    Reptmodels.TenantName = row["TenantName"].ToString();
                    Reptmodels.PaymentTerms = Convert.ToInt32(row["PaymentTerms"].ToString());
                    Reptmodels.securityDeposit = Convert.ToDecimal(row["SecurityDeposit"].ToString());
                    oList.Add(Reptmodels);
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

        public ActionResult AgentGetandGets(Agent Agent)
        {
            Agent obj = new Agent();

            List<Agent> oList = new List<Agent>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AgentGetandGets(Agent, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Agent MModels = new Agent();
                    MModels.AgentId = Convert.ToInt32(row["AgentId"].ToString());
                    MModels.AgentName = row["AgentName"].ToString();
                    MModels.Address1 = row["Address1"].ToString();
                    MModels.Address2 = row["Address2"].ToString();
                    MModels.Address3 = row["Address3"].ToString();
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();                 
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
        public void UploadAgentImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Agent/" + Request.Form["UniqueId"] + "/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
            }
        }

        [HttpPost]
        public void RemoveExistingAgentImageFolder(Agent Agent)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Agent/" + Agent.AgentId + "/"));



            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
            else
            {
                DirectoryInfo attachments_AR = new DirectoryInfo(Server.MapPath(@"~/ProjectImages/Agent/" + Agent.AgentId + "/"));
                EmptyFolder(attachments_AR);
                Directory.Delete(fileName);
                Directory.CreateDirectory(fileName);
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

        public ActionResult AgentNameSearch(Agent Agent) 
        {
            Agent obj = new Agent();

            List<Agent> oList = new List<Agent>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AgentNameSearch(Agent, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Agent MModels = new Agent();
                    MModels.AgentId = Convert.ToInt32(row["AgentId"].ToString());
                    MModels.AgentName = row["AgentName"].ToString();
                    MModels.Address1 = row["Address1"].ToString();
                    MModels.Address2 = row["Address2"].ToString();
                    MModels.Address3 = row["Address3"].ToString();
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult LandlordGetandGetss(LandModel LandModel)
        {
            LandModel obj = new LandModel();

            List<LandModel> oList = new List<LandModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LandlordGetandGetss(LandModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LandModel MModels = new LandModel();
                    MModels.Lan_Id = Convert.ToInt32(row["Lan_Id"].ToString());
                    MModels.Nationality = row["Lan_Nationality"].ToString();
                    MModels.LandName = row["Lan_Name"].ToString();
                    MModels.Pobox = row["Lan_Pobox"].ToString();
                    MModels.Profession = row["Lan_Profession"].ToString();
                    MModels.Address1 = row["Lan_Ad1"].ToString();
                    MModels.Address2 = row["Lan_Ad2"].ToString();
                    MModels.Address3 = row["Lan_Ad3"].ToString();
                    MModels.PhoneNo = row["Lan_Tel"].ToString();
                    MModels.Email = row["Lan_Email"].ToString();
                    MModels.Faxno = row["Lan_Fno"].ToString();
                    MModels.Mobno = row["Lan_Mob"].ToString();
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
        public ActionResult LandlordInsertandUpdates(LandModel Bankmodel)
        {
            LandModel obj = new LandModel();
            List<LandModel> oList = new List<LandModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LandlordInsertandUpdates(Bankmodel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LandModel MModels = new LandModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.Lan_Id = Convert.ToInt32(row["Lan_Id"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult TenantInsertandUpdate(TenantMaster TenantMaster)
        {
            TenantMaster obj = new TenantMaster();
            List<TenantMaster> oList = new List<TenantMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TenantInsertandUpdate(TenantMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TenantMaster MModels = new TenantMaster();
                    MModels.Status = row["Status"].ToString();
                    MModels.TenantId = Convert.ToInt32(row["TenantId"].ToString());
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
        public ActionResult TenantGetandGets(TenantMaster TenantMaster)
        {
            TenantMaster obj = new TenantMaster();

            List<TenantMaster> oList = new List<TenantMaster>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TenantGetandGets(TenantMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TenantMaster MModels = new TenantMaster();
                    MModels.TenantId = Convert.ToInt32(row["TenantId"].ToString());
                    MModels.AccountType = Convert.ToInt32(row["AccountType"].ToString());
                    MModels.TenantAccount = row["TenantAccount"].ToString();
                    MModels.TenantName = row["TenantName"].ToString();
                  
                    MModels.TenantTermsId = Convert.ToInt32(row["TenantTermsId"].ToString());
                   
                    MModels.CustStatusId = Convert.ToInt32(row["CustStatusId"].ToString());
                    MModels.TenantAdr1 = row["TenantAdr1"].ToString();
                    MModels.TenantAdr2 = row["TenantAdr2"].ToString();
                    MModels.TenantAdr3 = row["TenantAdr3"].ToString();
                    MModels.TenantPin1 = row["TenantPin1"].ToString();
                    MModels.TenantArea = Convert.ToInt32(row["TenantArea"].ToString());
                    MModels.TenantCountry = Convert.ToInt32(row["TenantCountry"].ToString());
                    MModels.TenantPhone = row["TenantPhone"].ToString();
                    MModels.TenantEmail = row["TenantEmail"].ToString();
                    MModels.TenantContactName1 = row["TenantContactName1"].ToString();
                    MModels.TenantContactNo1 = row["TenantContactNo1"].ToString();
                    MModels.Email = row["Email"].ToString();
                    MModels.TenantContactName2 = row["TenantContactName2"].ToString();
                    MModels.TenantContactNo2 = row["TenantContactNo2"].ToString();
                    MModels.TenantContactName3 = row["TenantContactName3"].ToString();
                    MModels.TenantContactNo3 = row["TenantContactNo3"].ToString();
                    MModels.TenantNotes = row["TenantNotes"].ToString();

                    MModels.TenantPass = row["TenantPass"].ToString();
                    MModels.TenantEmr = row["TenantEmr"].ToString();
                    MModels.TenantBank = row["TenantBank"].ToString();
                    MModels.TenantVisa = row["TenantVisa"].ToString();
                    MModels.TenantExp = row["TenantExp"].ToString();
                    MModels.TenantComent = row["TenantComent"].ToString();
                    MModels.Country = row["CountryName"].ToString();
                    MModels.Area = row["Name"].ToString();
                    MModels.Term = row["TermDescription"].ToString();






                    MModels.MapId = row["MapId"].ToString();
                  
                    oList.Add(MModels);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public void UploadTenantImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["imageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Tenant/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
            }
        }
        public void UploadDocImage()
        {
            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["imageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Documents/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
            }

        }
       

        [HttpPost]
        public void RemoveExistingTenantDocumentFolder(TenantMaster TenantMaster) 
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Documents/" + TenantMaster.TenantId + "/"));
            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
            else
            {
                DirectoryInfo attachments_AR = new DirectoryInfo(Server.MapPath(@"~/ProjectImages/Documents/" + TenantMaster.TenantId + "/"));
                EmptyFolder(attachments_AR);
                Directory.Delete(fileName);
                Directory.CreateDirectory(fileName);
            }
        }

        [HttpPost]
        public void RemoveExistingTenantDocument(TenantMaster TenantMaster) 
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Tenant/" + TenantMaster.TenantId + ".png")); 
            System.IO.File.Delete(fileName);
        }

        [HttpPost]
        public ActionResult FeaturesInsertandUpdate(FeaturesModel FeaturesModel)
        {
            FeaturesModel obj = new FeaturesModel();
            List<FeaturesModel> oList = new List<FeaturesModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.FeaturesInsertandUpdate(FeaturesModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FeaturesModel MModels = new FeaturesModel(); 
                    MModels.Status = row["Status"].ToString();
                    MModels.FeaturesModelId = Convert.ToInt32(row["FeaturesModelId"].ToString()); 
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
        public ActionResult FeaturesGetandGets(FeaturesModel FeaturesModel)  
        {
            FeaturesModel obj = new FeaturesModel();

            List<FeaturesModel> oList = new List<FeaturesModel>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.FeaturesGetandGets(FeaturesModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FeaturesModel MModels = new FeaturesModel();
                    MModels.FeaturesModelId = Convert.ToInt32(row["FeaturesModelId"].ToString());
                    MModels.Code = row["Code"].ToString();
                    MModels.Facilities = row["Facilities"].ToString();
                    MModels.Details = row["Details"].ToString();                             
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
        public ActionResult BuildingManagementInsertandUpdate(BuilidingModel BuilidingModel)
        {
            BuilidingModel obj = new BuilidingModel();
            List<BuilidingModel> oList = new List<BuilidingModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BuildingManagementInsertandUpdate(BuilidingModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BuilidingModel MModels = new BuilidingModel(); 
                    MModels.Status = row["Status"].ToString();
                    MModels.BuildingManagementId = Convert.ToInt32(row["BuildingManagementId"].ToString()); 
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
        public ActionResult BuildingManagementGetandGets(BuilidingModel BuilidingModel)
        {
            BuilidingModel obj = new BuilidingModel();

            List<BuilidingModel> oList = new List<BuilidingModel>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BuildingManagementGetandGets(BuilidingModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BuilidingModel MModels = new BuilidingModel();
                    MModels.BuildingManagementId = Convert.ToInt32(row["BuildingManagementId"].ToString());
                    MModels.BuildingId           = row["BuildingId"].ToString();
                    MModels.NameofBuilding       =  row["NameofBuilding"].ToString();
                    MModels.PlotNo               =  row["PlotNo"].ToString();
                    MModels.City                 =  row["City"].ToString();
                    MModels.LandLord             =  row["LandLord"].ToString();
                    MModels.TypeofBuilding       =  row["TypeofBuilding"].ToString();
                    MModels.Remarks              =  row["Remarks"].ToString();
                    MModels.Features             =  row["Features"].ToString(); 
                    MModels.FlatName             = row["Lan_Name"].ToString(); 
                    
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
        public ActionResult FlatMasterInsertandUpdate(FlatMasterModel FlatMasterModel) 
        {
            FlatMasterModel obj = new FlatMasterModel();
            List<FlatMasterModel> oList = new List<FlatMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.FlatMasterInsertandUpdate(FlatMasterModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FlatMasterModel MModels = new FlatMasterModel(); 
                    MModels.Status = row["Status"].ToString();
                    MModels.FlatMasterId = Convert.ToInt32(row["FlatMasterId"].ToString()); 
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
        public ActionResult FlatMasterGetandGets(FlatMasterModel FlatMasterModel)
        {
            FlatMasterModel obj = new FlatMasterModel();

            List<FlatMasterModel> oList = new List<FlatMasterModel>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.FlatMasterGetandGets(FlatMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FlatMasterModel MModels = new FlatMasterModel();
                    MModels.FlatMasterId     = Convert.ToInt32(row["FlatMasterId"].ToString());
                    MModels.FlatNumber       =  row["FlatNumber"].ToString();
                    MModels.Building         =  row["Building"].ToString();
                    MModels.NameofBuilding   = row["NameofBuilding"].ToString();
                    MModels.DEWANO           =  row["DEWANO"].ToString();
                    MModels.Rent             = Convert.ToDecimal(row["Rent"].ToString());
                    MModels.RentType         =  row["RentType"].ToString();
                    MModels.LandLoard        =  row["LandLoard"].ToString();
                    MModels.LandLoardName    = row["Lan_Name"].ToString();
                    MModels.AgentName        =  row["AgentName"].ToString(); 
                    MModels.AgentContact     =  row["AgentContact"].ToString();
                    MModels.TypeOfFlat       =  row["TypeOfFlat"].ToString();
                    MModels.Features         =  row["Features"].ToString();
                    MModels.Remarks          =  row["Remarks"].ToString();
                    MModels.DelFlag          =  row["DelFlag"].ToString();
                    MModels.VaccantDate = row["VaccantStartDate"].ToString();
                    MModels.AgentId          = Convert.ToInt32(row["AgentId"].ToString()); 
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LandLordsearch(LandModel LandModel) 
        {
            LandModel obj = new LandModel();

            List<LandModel> oList = new List<LandModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LandLordsearch(LandModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LandModel MModels = new LandModel();
                    MModels.Lan_Id = Convert.ToInt32(row["Lan_Id"].ToString());
                    MModels.LandName = row["Lan_Name"].ToString();
                    MModels.Mobno = row["Lan_Mob"].ToString();
                    MModels.Email = row["Lan_Email"].ToString();
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

        public ActionResult FlatNumberSearch(FlatMasterModel FlatMasterModel)
        {
            FlatMasterModel obj = new FlatMasterModel();

            List<FlatMasterModel> oList = new List<FlatMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.FlatNumberSearch(FlatMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FlatMasterModel MModels = new FlatMasterModel();
                    MModels.FlatMasterId = Convert.ToInt32(row["FlatMasterId"].ToString());
                    MModels.FlatNumber = row["FlatNumber"].ToString();
                    MModels.Building = row["Building"].ToString();
                    MModels.NameofBuilding = row["NameofBuilding"].ToString();
                    MModels.DEWANO = row["DEWANO"].ToString();
                    MModels.Rent = Convert.ToDecimal(row["Rent"].ToString());
                    MModels.RentType = row["RentType"].ToString();
                    MModels.LandLoard = row["LandLoard"].ToString();
                    MModels.LandLoardName = row["Lan_Name"].ToString();
                    MModels.AgentName = row["AgentName"].ToString();
                    MModels.AgentContact = row["AgentContact"].ToString();
                    MModels.TypeOfFlat = row["TypeOfFlat"].ToString();
                    MModels.Features = row["Features"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DelFlag = row["DelFlag"].ToString();
                    MModels.AgentId = Convert.ToInt32(row["AgentId"].ToString());
                    MModels.ContractStatus = Convert.ToInt32(row["ContractStatus"].ToString()); 
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

        public ActionResult BuildingNumberSearch(FlatMasterModel FlatMasterModel)
        {
            FlatMasterModel obj = new FlatMasterModel();

            List<FlatMasterModel> oList = new List<FlatMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BuildingNumberSearch(FlatMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    FlatMasterModel MModels = new FlatMasterModel();         
                    MModels.Building = row["BuildingId"].ToString();
                    MModels.NameofBuilding = row["NameofBuilding"].ToString();
                    MModels.buildingManagementId = Convert.ToInt32(row["BuildingManagementId"].ToString());
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
        public JsonResult ContractMultipleDocInsert(List<PurchaseInvoiceModel> PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();

            try
            {

                string[] tmpTable = new string[8];
                tmpTable[0] = "SContractNo";
                tmpTable[1] = "SDocType";
                tmpTable[2] = "SFileUpload";
                tmpTable[3] = "SUserId";
                tmpTable[4] = "SDepartmentId";
                tmpTable[5] = "SDeleteFlag";
                tmpTable[6] = "Flag";
                tmpTable[7] = "FolderName";


                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseInvoiceModel)
                {
                    obj.SContractNo = details.SContractNo;
                    obj.SDocType = details.SDocType;
                    obj.SFileUpload = details.SFileUpload;
                    obj.SUserId = details.SUserId;
                    obj.SDepartmentId = details.SDepartmentId;
                    obj.SDeleteFlag = details.SDeleteFlag;
                    obj.Flag = details.Flag;
                    obj.FolderName= details.FolderName;
                    dt.Rows.Add
                    (obj.SContractNo, obj.SDocType, obj.SFileUpload,obj.SUserId, obj.SDepartmentId, obj.SDeleteFlag, obj.Flag, obj.FolderName);
                }

                dsDataSet = obj.ContractMultipleDocInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.FolderName = row["FolderName"].ToString();
                    MModels.SContractNo = Convert.ToInt32(row["SContractNo"].ToString());
                    MModels.SDocType = Convert.ToInt32(row["SDocType"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        
        public ActionResult TenantSearch(TenantMaster TenantMaster)
        {
            TenantMaster obj = new TenantMaster();

            List<TenantMaster> oList = new List<TenantMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TenantSearch(TenantMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TenantMaster MModels = new TenantMaster();
                    MModels.TenantId = Convert.ToInt32(row["TenantId"].ToString());
                    MModels.AccountType = Convert.ToInt32(row["AccountType"].ToString());
                    MModels.TenantAccount = row["TenantAccount"].ToString();
                    MModels.TenantName = row["TenantName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult Rpt_RealEstatePDCList(RealEstatePDC RealEstatePDC)
        {
            RealEstatePDC obj = new RealEstatePDC();

            List<RealEstatePDC> oList = new List<RealEstatePDC>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Rpt_RealEstatePDCList(RealEstatePDC, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RealEstatePDC MModels = new RealEstatePDC();
                    MModels.ChequeNo = row["ChequeNo"].ToString();
                    MModels.ChequeDate = row["ChequeDate"].ToString();
                    MModels.VDate = row["VDate"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    MModels.BankName = row["BankName"].ToString();
                    MModels.ContraNo = row["VoucherNo"].ToString();
                    MModels.TenantId = Convert.ToInt32(row["TenantId"].ToString());
                    MModels.Tenant = row["Tenant"].ToString();
                    MModels.BuildingId = Convert.ToInt32(row["BuildingManagementId"].ToString());
                    MModels.Building = row["NameofBuilding"].ToString();
                    MModels.FlatId = Convert.ToInt32(row["FlatId"].ToString());
                    MModels.FlatNo = row["FlatNo"].ToString();
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
        public void RemoveExistingContractDocument(ItemMasterModel ItemMasterModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Contract/" + ItemMasterModel.DocumentId + "/" + ItemMasterModel.DocumentName));
            System.IO.File.Delete(fileName);
        }

        [HttpPost]
        public ActionResult ContractDocumentGetandGets(Contract Contract)
        {
            Contract obj = new Contract();

            List<Contract> oList = new List<Contract>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContractDocumentGetandGets(Contract, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Contract MModels = new Contract();
                    MModels.ConDocID = Convert.ToInt32(row["ContractDocId"].ToString());
                    MModels.ContractNo = Convert.ToInt32(row["DocContractNo"].ToString());
                    MModels.DocTypeId = Convert.ToInt32(row["DocTypeId"].ToString());
                    MModels.ContDocument = row["DocName"].ToString();
                    MModels.IdType = row["IDType"].ToString();
                    MModels.FolderName = row["FolderName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Rpt_RealEstateVacantFlatLoss(RealEstatePDC RealEstatePDC)
        {
            RealEstatePDC obj = new RealEstatePDC();

            List<RealEstatePDC> oList = new List<RealEstatePDC>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Rpt_RealEstateVacantFlatLoss(RealEstatePDC, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RealEstatePDC MModels = new RealEstatePDC();
                    MModels.FlatId = Convert.ToInt32(row["FlatId"].ToString());
                    MModels.FlatNo = row["FlatNo"].ToString();
                    MModels.DEWANo = row["DEWANo"].ToString();
                    MModels.FlatType = row["FlatType"].ToString();
                    MModels.Rent = Convert.ToDecimal(row["Rent"].ToString());
                    MModels.VacantDays = row["VacantDays"].ToString();
                    MModels.VacantOn = row["VacantOn"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());                                                                       
                    MModels.BuildingId = Convert.ToInt32(row["BuildingManagementId"].ToString());
                    MModels.Building = row["NameofBuilding"].ToString();
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
        public JsonResult ContractEntryInsert(List<Contract> Contract)
        {
            Contract obj = new Contract();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<Contract> oList = new List<Contract>();

            try
            {
                string[] tmpTable = new string[32];
                tmpTable[0] = "ContractNo";
                tmpTable[1] = "ContDate";
                tmpTable[2] = "FlatNo";
                tmpTable[3] = "DEWANo";
                tmpTable[4] = "Premise";
                tmpTable[5] = "Subject";
                tmpTable[6] = "Rent";
                tmpTable[7] = "Deposit";
                tmpTable[8] = "Tenant";
                tmpTable[9] = "ContPeriod";
                tmpTable[10] = "FromPeriod";
                tmpTable[11] = "ToPeriod";
                tmpTable[12] = "PaymentTerms";
                tmpTable[13] = "Observations";
                tmpTable[14] = "ContDocument";
                tmpTable[15] = "TotalChequeAmt";
                tmpTable[16] = "TotalOtherCost";
                tmpTable[17] = "ContMode";
                tmpTable[18] = "ChequeNo";
                tmpTable[19] = "ChequeDate";
                tmpTable[20] = "ContBank";
                tmpTable[21] = "ContBranch";
                tmpTable[22] = "Amount";
                tmpTable[23] = "Remarks";
                tmpTable[24] = "RentType";
                tmpTable[25] = "Account";
                tmpTable[26] = "DeptId";
                tmpTable[27] = "UserId";
                tmpTable[28] = "CurrentDate";
                tmpTable[29] = "Status";
                tmpTable[30] = "Flag";
                tmpTable[31] = "DelFlag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in Contract)
                {
                    obj.ContractNo = details.ContractNo;
                    obj.ContDate = details.ContDate;
                    obj.FlatNo = details.FlatNo;
                    obj.DEWANo = details.DEWANo;
                    obj.Premise = details.Premise;
                    obj.Subject = details.Subject;
                    obj.Rent = details.Rent;
                    obj.Deposit = details.Deposit;
                    obj.Tenant = details.Tenant;
                    obj.ContPeriod = details.ContPeriod;
                    obj.FromPeriod = details.FromPeriod;
                    obj.ToPeriod = details.ToPeriod;
                    obj.PaymentTerms = details.PaymentTerms;
                    obj.Observations = details.Observations;
                    obj.ContDocument = details.ContDocument;
                    obj.TotalChequeAmt = details.TotalChequeAmt;
                    obj.TotalOtherCost = details.TotalOtherCost;
                    obj.ContMode = details.ContMode;
                    obj.ChequeNo = details.ChequeNo;
                    obj.ChequeDate = details.ChequeDate;
                    obj.ContBank = details.ContBank;
                    obj.ContBranch = details.ContBranch;
                    obj.Amount = details.Amount;
                    obj.Remarks = details.Remarks;
                    obj.RentType = details.RentType;
                    obj.Account = details.Account;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.CurrentDate = details.CurrentDate;
                    obj.Status = details.Status;
                    obj.Flag = details.Flag;
                    obj.DelFlag = details.DelFlag;

                    dt.Rows.Add(obj.ContractNo, obj.ContDate, obj.FlatNo, obj.DEWANo, obj.Premise, obj.Subject, obj.Rent, obj.Deposit,
                                    obj.Tenant, obj.ContPeriod, obj.FromPeriod, obj.ToPeriod, obj.PaymentTerms, obj.Observations, obj.ContDocument,
                                    obj.TotalChequeAmt, obj.TotalOtherCost, obj.ContMode, obj.ChequeNo, obj.ChequeDate, obj.ContBank, obj.ContBranch,
                                    obj.Amount, obj.Remarks, obj.RentType, obj.Account, obj.DeptId, obj.UserId, obj.CurrentDate,
                                    obj.Status, obj.Flag, obj.DelFlag);
                }

                dsDataSet = obj.ContractEntryInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Contract MModels = new Contract();
                    MModels.Status = row["Status"].ToString();
                    MModels.ContractNo = Convert.ToInt32(row["ContractNo"].ToString());
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
        public JsonResult OtherTransactionInsertandUpdate(List<PurchaseInvoiceModel> PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();

            try
            {
                string[] tmpTable = new string[14];
                tmpTable[0] = "OCId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoDate";
                tmpTable[3] = "PayType";
                tmpTable[4] = "AccId";
                tmpTable[5] = "Description";
                tmpTable[6] = "OCAmount";
                tmpTable[7] = "OCFCAmount";
                tmpTable[8] = "JobNo";
                tmpTable[9] = "CurrencyId";
                tmpTable[10] = "CurrencyRate";
                tmpTable[11] = "UserId";
                tmpTable[12] = "DepartmentId";
                tmpTable[13] = "DeleteFlag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseInvoiceModel)
                {
                    obj.OCId = details.OCId;
                    obj.SlNo = details.SlNo;
                    obj.InvoDate = details.InvoDate;
                    obj.PayType = details.PayType;
                    obj.AccId = details.AccId;
                    obj.Description = details.Description;
                    obj.OCAmount = details.OCAmount;
                    obj.OCFCAmount = details.OCFCAmount;
                    obj.JobNo = details.JobNo;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.UserId = details.UserId;
                    obj.DepartmentId = details.DepartmentId;
                    obj.DeleteFlag = details.DeleteFlag;

                    dt.Rows.Add
                    (obj.OCId, obj.SlNo, obj.InvoDate, obj.PayType, obj.AccId, obj.Description, obj.OCAmount, obj.OCFCAmount, obj.JobNo, obj.CurrencyId, obj.CurrencyRate, obj.UserId, obj.DepartmentId, obj.DeleteFlag);
                }

                dsDataSet = obj.OtherTransactionInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.InvoNo = row["InvId"].ToString();
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
        public ActionResult ContractEntryGetandGets(Contract Contract)
        {
            Contract obj = new Contract();

            List<Contract> oList = new List<Contract>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContractEntryGetandGets(Contract, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                  Contract MModels = new Contract();
                  MModels.ContractNo             =  Convert.ToInt32(row["ContractNo"].ToString());        
                  MModels.ContDate               =  row["ContDate"].ToString();        
                  MModels.FlatNo                 =  row["FlatNo"].ToString();        
                  MModels.DEWANo                 =  row["DEWANo"].ToString();        
                  MModels.Premise                =  Convert.ToInt32(row["Premise"].ToString());        
                  MModels.Subject                =  row["Subject"].ToString();        
                  MModels.Rent                   =  Convert.ToDecimal(row["Rent"].ToString());        
                  MModels.Deposit                =  Convert.ToDecimal(row["Deposit"].ToString());        
                  MModels.Tenant                 =  Convert.ToInt32(row["Tenant"].ToString());        
                  MModels.ContPeriod             =  Convert.ToInt32(row["ContPeriod"].ToString());        
                  MModels.FromPeriod             =  row["FromPeriod"].ToString();        
                  MModels.ToPeriod               =  row["ToPeriod"].ToString();        
                  MModels.PaymentTerms           =  Convert.ToInt32(row["PaymentTerms"].ToString());        
                  MModels.Observations           =  row["Observations"].ToString();        
                  MModels.ContDocument           =  row["ContDocument"].ToString();        
                  MModels.TotalChequeAmt         =  Convert.ToDecimal(row["TotalChequeAmt"].ToString());        
                  MModels.TotalOtherCost         =  Convert.ToDecimal(row["TotalOtherCost"].ToString());        
                  MModels.ContMode               =  Convert.ToInt32(row["ContMode"].ToString());        
                  MModels.ChequeNo               =  row["ChequeNo"].ToString();        
                  MModels.ChequeDate             =  row["ChequeDate"].ToString();        
                  MModels.ContBank               =  Convert.ToInt32(row["ContBank"].ToString());        
                  MModels.ContBranch             =  row["ContBranch"].ToString();        
                  MModels.Amount                 =  Convert.ToDecimal(row["Amount"].ToString());        
                  MModels.Remarks                =  row["Remarks"].ToString();        
                  MModels.RentType               =  Convert.ToInt32(row["RentType"].ToString());        
                  MModels.Account                =  row["Account"].ToString();        
                  MModels.DeptId                 =  Convert.ToInt32(row["DeptId"].ToString());        
                  MModels.UserId                 =  Convert.ToInt32(row["UserId"].ToString());                              
                  MModels.Status                 =  row["Status"].ToString();        
                  MModels.Flag                   =  Convert.ToInt32(row["Flag"].ToString());                       
                  MModels.NameofBuilding         =  row["NameofBuilding"].ToString();
                  MModels.FlatNumber             =  row["FlatNumber"].ToString();
                  MModels.TenantName             =  row["TenantName"].ToString();
                  MModels.TenantAddress1         =  row["TenantAdr1"].ToString();
                  MModels.TenantAddress2         =  row["TenantAdr2"].ToString();
                  MModels.TenantAddress3         =  row["TenantAdr3"].ToString();
                  MModels.TenantPOBOXNo          =  row["TenantPin1"].ToString();
                  MModels.TenantEmail            =  row["TenantEmail"].ToString();
                  MModels.TenantPhone            =  row["TenantPhone"].ToString();
                  MModels.TenantEMRID            =  row["TenantEmr"].ToString();
                  MModels.PDCStatus              =  row["PDCStatus"].ToString();
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
        public ActionResult ContractMultipleDocDelete(Contract Contract)
        {
            Contract obj = new Contract();

            List<Contract> oList = new List<Contract>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContractMultipleDocDelete(Contract, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Contract MModels = new Contract();
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

        public ActionResult ContractNoSearch(Contract Contract)    
        {
            Contract obj = new Contract();

            List<Contract> oList = new List<Contract>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContractNoSearch(Contract, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Contract MModels = new Contract(); 
                    MModels.ContractNo = Convert.ToInt32(row["ContractNo"].ToString());
                    MModels.ContDate = row["ContDate"].ToString();                   
                    MModels.TenantName = row["TenantName"].ToString();
                    MModels.DepartmentName = row["DepartmentCode"].ToString();
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
        public JsonResult ContractEntryUpdate(List<Contract> Contract)
        {
            Contract obj = new Contract();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<Contract> oList = new List<Contract>();

            try
            {
                string[] tmpTable = new string[32];
                tmpTable[0] = "ContractNo";
                tmpTable[1] = "ContDate";
                tmpTable[2] = "FlatNo";
                tmpTable[3] = "DEWANo";
                tmpTable[4] = "Premise";
                tmpTable[5] = "Subject";
                tmpTable[6] = "Rent";
                tmpTable[7] = "Deposit";
                tmpTable[8] = "Tenant";
                tmpTable[9] = "ContPeriod";
                tmpTable[10] = "FromPeriod";
                tmpTable[11] = "ToPeriod";
                tmpTable[12] = "PaymentTerms";
                tmpTable[13] = "Observations";
                tmpTable[14] = "ContDocument";
                tmpTable[15] = "TotalChequeAmt";
                tmpTable[16] = "TotalOtherCost";
                tmpTable[17] = "ContMode";
                tmpTable[18] = "ChequeNo";
                tmpTable[19] = "ChequeDate";
                tmpTable[20] = "ContBank";
                tmpTable[21] = "ContBranch";
                tmpTable[22] = "Amount";
                tmpTable[23] = "Remarks";
                tmpTable[24] = "RentType";
                tmpTable[25] = "Account";
                tmpTable[26] = "DeptId";
                tmpTable[27] = "UserId";
                tmpTable[28] = "CurrentDate";
                tmpTable[29] = "Status";
                tmpTable[30] = "Flag";
                tmpTable[31] = "DelFlag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in Contract)
                {
                    obj.ContractNo = details.ContractNo;
                    obj.ContDate = details.ContDate;
                    obj.FlatNo = details.FlatNo;
                    obj.DEWANo = details.DEWANo;
                    obj.Premise = details.Premise;
                    obj.Subject = details.Subject;
                    obj.Rent = details.Rent;
                    obj.Deposit = details.Deposit;
                    obj.Tenant = details.Tenant;
                    obj.ContPeriod = details.ContPeriod;
                    obj.FromPeriod = details.FromPeriod;
                    obj.ToPeriod = details.ToPeriod;
                    obj.PaymentTerms = details.PaymentTerms;
                    obj.Observations = details.Observations;
                    obj.ContDocument = details.ContDocument;
                    obj.TotalChequeAmt = details.TotalChequeAmt;
                    obj.TotalOtherCost = details.TotalOtherCost;
                    obj.ContMode = details.ContMode;
                    obj.ChequeNo = details.ChequeNo;
                    obj.ChequeDate = details.ChequeDate;
                    obj.ContBank = details.ContBank;
                    obj.ContBranch = details.ContBranch;
                    obj.Amount = details.Amount;
                    obj.Remarks = details.Remarks;
                    obj.RentType = details.RentType;
                    obj.Account = details.Account;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.CurrentDate = details.CurrentDate;
                    obj.Status = details.Status;
                    obj.Flag = details.Flag;
                    obj.DelFlag = details.DelFlag;

                    dt.Rows.Add(obj.ContractNo, obj.ContDate, obj.FlatNo, obj.DEWANo, obj.Premise, obj.Subject, obj.Rent, obj.Deposit,
                                    obj.Tenant, obj.ContPeriod, obj.FromPeriod, obj.ToPeriod, obj.PaymentTerms, obj.Observations, obj.ContDocument,
                                    obj.TotalChequeAmt, obj.TotalOtherCost, obj.ContMode, obj.ChequeNo, obj.ChequeDate, obj.ContBank, obj.ContBranch,
                                    obj.Amount, obj.Remarks, obj.RentType, obj.Account, obj.DeptId, obj.UserId, obj.CurrentDate,
                                    obj.Status, obj.Flag, obj.DelFlag);
                }

                dsDataSet = obj.ContractEntryUpdate(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Contract MModels = new Contract();
                    MModels.Status = row["Status"].ToString();
                    MModels.ContractNo = Convert.ToInt32(row["ContractNo"].ToString());
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
        public ActionResult ContractEntryDelete(Contract Contract) 
        {
            Contract obj = new Contract();

            List<Contract> oList = new List<Contract>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContractEntryDelete(Contract, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Contract MModels = new Contract(); 
                    MModels.Status = row["Status"].ToString();
                    MModels.ContractNo = Convert.ToInt32(row["ContractNo"].ToString());
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