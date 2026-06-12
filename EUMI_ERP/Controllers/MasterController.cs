using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Configuration;
using System.IO;
using EUMI_ERP.Models;
using EUMI_ERP.Electonics;
//using System.Diagnostics;

namespace EUMI_ERP.Controllers
{
    public class MasterController : Controller
    {

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        // GET: Master
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult PRegistration()
        {
            return View();
        }

        public ActionResult MethodMaster()
        {
            return View();
        }

        public ActionResult ScanRegistration()
        {
            return View();
        }
        public ActionResult HSN()
        {
            return View();
        }
        public ActionResult Proceduremaster()
        {
            return View();
        }
        public ActionResult Appointment()
        {
            return View();
        }
        public ActionResult MedicalDepartment()
        {
            return View();
        }

        public ActionResult EOD()
        {
            return View();
        }
        public ActionResult Dosage()
        {
            return View();
        }
        public ActionResult DoctorsMaster()
        {
            return View();
        }
        public ActionResult ShiftDoctor()
        {
            return View();
        }
        public ActionResult MedicalShift()
        {
            return View();
        }
        public ActionResult Room()
        {
            return View();
        }
        public ActionResult Roomwiseprocedure()
        {
            return View();
        }



        public ActionResult ReasonMaster()
        {
            return View();
        }
        public ActionResult SalesManDashBoard()
        {
            return View();
        }
        public ActionResult SalesCustMapping()
        {
            return View();
        }
        public ActionResult NewItemImport()
        {
            return View();
        }

        public ActionResult ecommerce()
        {
            return View();
        }
        public ActionResult DocumentUploads()
        {
            return View();
        }





        public ActionResult UsedcarsDashBoard()
        {
            return View();
        }

        public ActionResult Area()
        {
            return View();
        }


        public ActionResult AccountHead()
        {
            return View();
        }
        public ActionResult AccountHead_twolevel()
        {
            return View();
        }

        public ActionResult HospitalMaster()
        {
            return View();
        }
        public ActionResult ProjectJob()
        {
            return View();
        }
        public ActionResult Reminder()
        {
            return View();
        }
        public ActionResult Task()
        {
            return View();
        }
        public ActionResult Vehicle()
        {
            return View();
        }
        public ActionResult Tax()
        {
            return View();
        }
        public ActionResult CustomerSupplierLinking()
        {
            return View();
        }
        public ActionResult ProductSelection() 
        {
            return View();
        }
        public ActionResult TokenDisplay()
        {
            return View();
        }
        //public ActionResult Calculator()
        //{
        //    return View();
        //}


        [HttpPost]
        public ActionResult MethodMasterInsertandUpdate(MasterModels oMasterModels)
        {
            MasterModels obj = new MasterModels();
            List<MasterModels> oList = new List<MasterModels>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MethodMasterInsertandUpdate(oMasterModels, dbName);

                if (dsDataSet != null && dsDataSet.Tables.Count > 0 && dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        MasterModels MModels = new MasterModels();

                        MModels.MethodId = Convert.ToInt32(row["MethodId"]);
                        MModels.Status = row["Status"].ToString();

                        oList.Add(MModels);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

      
            [HttpPost]
            public ActionResult MethodMasterGetandGets(MasterModels oMasterModels)
            {
                MasterModels obj = new MasterModels();
                List<MasterModels> oList = new List<MasterModels>();

                try
                {
                    DataSet dsDataSet = new DataSet();
                    dsDataSet = obj.MethodMasterGetandGets(oMasterModels, dbName);

                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        MasterModels MModels = new MasterModels();

                        MModels.MethodId = Convert.ToInt32(row["MethodId"].ToString());
                        MModels.MethodName = row["MethodName"].ToString();
                        MModels.MDescription = row["MDescription"].ToString();
                        MModels.Remarks = row["Remarks"].ToString();

                        oList.Add(MModels);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
                }

                return new JsonResult()
                {
                    Data = oList,
                    MaxJsonLength = 86753090
                };
            }

        [HttpPost]
        public ActionResult BillInfoGdetandGets(CustomerMaster CustomerMaster)
        {
            CustomerMaster obj = new CustomerMaster();
            List<CustomerMaster> oList = new List<CustomerMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BillInfoGdetandGets(CustomerMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerMaster MModels = new CustomerMaster();
                    MModels.ProcedureName = row["ProcedureName"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.PQty = row["PQty"].ToString();
                    MModels.TestAmount = row["TestAmount"].ToString();
                    MModels.ProdRate = row["ProdRate"].ToString();
                    MModels.Name = row["Name"].ToString();
                    MModels.BillNo = row["BillNo"].ToString();
                    MModels.BillDate = row["BillDate"].ToString();
                    MModels.OpNo = row["OpNo"].ToString();
                    MModels.IpNo = row["IpNo"].ToString();
                    MModels.RegNo = row["RegNo"].ToString();
                    MModels.NetAmt = row["NetAmt"].ToString(); 

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
        public ActionResult CustomerSupplierLinking(CustomerMaster CustomerMaster)
        {
            CustomerMaster obj = new CustomerMaster();
            List<CustomerMaster> oList = new List<CustomerMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerSupplierLinking(CustomerMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerMaster MModels = new CustomerMaster();
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
        public ActionResult CustomerSupplierLinkingUpdate(CustomerMaster CustomerMaster)
        {
            CustomerMaster obj = new CustomerMaster();
            List<CustomerMaster> oList = new List<CustomerMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerSupplierLinkingUpdate(CustomerMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerMaster MModels = new CustomerMaster();
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

        public ActionResult CustomerSupplierLinkingGetandGets(CustomerMaster CustomerMaster)
        {
            CustomerMaster obj = new CustomerMaster();

            List<CustomerMaster> oList = new List<CustomerMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerSupplierLinkingGetandGets(CustomerMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerMaster MModels = new CustomerMaster();
                    MModels.SupplierName = row["SUPPLIER"].ToString();
                    MModels.CustName = row["CUSTOMER"].ToString();
                    MModels.Custcode = row["CUSTCODE"].ToString();
                    MModels.SupplierCode = row["SUPCODE"].ToString();
                    MModels.LinkCode = Convert.ToInt32(row["CustSupLink_Id"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CUSTID"].ToString());
                    MModels.supplierid = Convert.ToInt32(row["SUPPID"].ToString());
                    MModels.IDCUST = Convert.ToInt32(row["IDCUST"].ToString());
                    MModels.IDSUPP = Convert.ToInt32(row["IDSUPP"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult VoucherType()
        {
            return View();
        }
        public ActionResult MultiPrice()
        {
            return View();
        }
        public ActionResult ProjectJobDashboard()
        {
            return View();
        }


        public ActionResult AreaGroup()
        {
            return View();
        }

        public ActionResult Department()
        {
            return View();
        }


        public ActionResult Product()
        {
            return View();
        }

        public ActionResult Location()
        {
            return View();
        }

        public ActionResult EmployeeDivision()
        {
            return View();
        }
        public ActionResult InsuranceCompany()
        {
            return View();
        }
        public ActionResult CostCenter()
        {
            return View();
        }
        public ActionResult Category()
        {
            return View();
        }
        public ActionResult SubCategory()
        {
            return View();
        }

        public ActionResult Employee()
        {
            return View();
        }
        public ActionResult Designation()
        {
            return View();
        }
        public ActionResult Employee2()
        {
            return View();
        }
        public ActionResult Passport()
        {
            return View();
        }
        public ActionResult Bank()
        {
            return View();
        }
        public ActionResult SalesMan()
        {
            return View();
        }
        public ActionResult Currency()
        {
            return View();
        }
        public ActionResult Branch()
        {
            return View();
        }
        public ActionResult ToolMaster()
        {
            return View();
        }
        public ActionResult GroupMaster()
        {
            return View();
        }
        public ActionResult SubGroupMaster()
        {
            return View();
        }


        public ActionResult Supplier()
        {
            return View();
        }
        public ActionResult GarageMaster()
        {
            return View();
        }
        public ActionResult CustomerMaster()
        {
            return View();
        }

        public ActionResult Unit()
        {
            return View();
        }
        public ActionResult PayrollDashboard()
        {
            return View();
        }

        public ActionResult ItemMaster(string from)
        {
            return View();
        }

        public ActionResult UsedCarsItemMaster(string from)
        {
            return View();
        }
        public ActionResult ItemMasterScrap(string from)
        {
            return View();
        }

        public ActionResult Users()
        {
            return View();
        }
        public ActionResult Voucher()
        {
            return View();
        }

        public ActionResult Terms()
        {
            return View();
        }
        public ActionResult LogReport()
        {
            return View();
        }
        public ActionResult ItemAccessories()
        {
            return View();
        }
        public ActionResult DriverMaster()
        {
            return View();
        }
        public ActionResult EmployeeDashboard()
        {
            return View();

        }
        public ActionResult UserDashboard()
        {
            return View();
        }
        public ActionResult ItemSupplier()
        {
            return View();
        }

        public ActionResult PersonForm()
        {
            return View();
        }

        [HttpPost]
        
        public ActionResult PersonInsert(proceduremastercs proceduremastercs)
        {
            proceduremastercs obj = new proceduremastercs();
            List<proceduremastercs> oList = new List<proceduremastercs>();
            try
            {
                DataSet dsDataset = new DataSet();
                dsDataset = obj.PersonInsert(proceduremastercs, dbName);
                foreach(DataRow row in dsDataset.Tables[0].Rows)
                {
                    proceduremastercs MModels = new proceduremastercs();
                    MModels.Status = row["ststusnew"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message: " + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPersons()
        {
            proceduremastercs obj = new proceduremastercs();
            List<proceduremastercs> oList = new List<proceduremastercs>();

            DataSet ds = obj.GetPersons(dbName);

            foreach (DataRow row in ds.Tables[0].Rows)
            {
                proceduremastercs model = new proceduremastercs();
                model.PersonId = Convert.ToInt32(row["PersonId"]);
                model.ProcedureName = row["Name"].ToString();
                model.ProcedureAge = row["Age"].ToString();
                model.ProcedureGender = row["Gender"].ToString();
                model.ProcedureAddress = row["Address"].ToString();
                model.ProcedureNumber = row["PhoneNumber"].ToString();

                oList.Add(model);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]

        public ActionResult EditPerson(int id)
        {
            proceduremastercs obj = new proceduremastercs();
            DataSet ds = obj.GetPersonById(id, dbName);

            proceduremastercs model = new proceduremastercs();

            if (ds.Tables[0].Rows.Count > 0)
            {
                DataRow row = ds.Tables[0].Rows[0];

                model.PersonId = Convert.ToInt32(row["PersonId"]);
                model.ProcedureName = row["Name"].ToString();
                model.ProcedureAge = row["Age"].ToString();
                model.ProcedureGender = row["Gender"].ToString();
                model.ProcedureAddress = row["Address"].ToString();
                model.ProcedureNumber = row["PhoneNumber"].ToString();
            }

            return View(model);
        }

        [HttpPost]
        public ActionResult UpdatePerson(proceduremastercs model)
        {
            proceduremastercs obj = new proceduremastercs();
            obj.UpdatePerson(model, dbName);

            TempData["UpdateMessage"] = "Updated Successfully";

            return RedirectToAction("PersonForm", "Master");
        }

        [HttpPost]
        public ActionResult DeletePerson(int id)
        {
            proceduremastercs obj = new proceduremastercs();

            try
            {
                obj.DeletePerson(id, dbName);
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }



        [HttpPost]
        public ActionResult GetourprojectsGets(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetourprojectsGets(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel Reptmodels = new ItemMasterModel();
                    Reptmodels.PendingName = row["Completed"].ToString();
                    Reptmodels.PendingQty = Convert.ToInt32(row["Pending"].ToString());
                    Reptmodels.DocTypeId = Convert.ToInt32(row["upcomming"].ToString());
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
        public ActionResult BIRTHDAYANDVACCINATIONNOTIFICATION(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BIRTHDAYANDVACCINATIONNOTIFICATION(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel Reptmodels = new ItemMasterModel();
                    Reptmodels.ProjectName = row["ProjectName"].ToString();
                    Reptmodels.StartDate = row["StartDate"].ToString();
                    Reptmodels.EndDate = row["EndDate"].ToString();
                    Reptmodels.Status = row["ProjectStatus"].ToString();
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
        public ActionResult GetourprojectsList(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetourprojectsList(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel Reptmodels = new ItemMasterModel();
                    Reptmodels.ProjectName = row["ProjectName"].ToString();
                    Reptmodels.StartDate = row["StartDate"].ToString();
                    Reptmodels.EndDate = row["EndDate"].ToString();
                    Reptmodels.Status = row["ProjectStatus"].ToString();
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
        public ActionResult PDCandToDoReminder(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PDCandToDoReminder(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel Reptmodels = new ItemMasterModel();
                    Reptmodels.PendingName = row["PendingName"].ToString();
                    Reptmodels.PendingQty = Convert.ToInt32(row["TotalPendingNo"].ToString());
                    Reptmodels.DocTypeId = Convert.ToInt32(row["TypeId"].ToString());
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
        public ActionResult PDCTODOReminderDetailed(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PDCTODOReminderDetailed(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel Reptmodels = new ItemMasterModel();
                    Reptmodels.Number = row["Number"].ToString();
                    Reptmodels.Date = row["Date"].ToString();
                    Reptmodels.Bank = row["Bank"].ToString();
                    Reptmodels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    Reptmodels.Name = row["Name"].ToString();
                    Reptmodels.TypeName = row["TypeName"].ToString();
                    Reptmodels.DocumentId = Convert.ToInt32(row["TypeId"].ToString());
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
        public JsonResult CharGroupCreation(List<AreaMaster> AreaMaster)
        {
            AreaMaster obj = new AreaMaster();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<AreaMaster> oList = new List<AreaMaster>();

            try
            {
                string[] tmpTable = new string[3];
                tmpTable[0] = "UserID";
                tmpTable[1] = "GroupName";
                tmpTable[2] = "Flag";
                dt = Common.CreateTable(tmpTable);
                foreach (var details in AreaMaster)
                {
                    dt.Rows.Add(details.UserId, details.GroupName, details.DelFlag);
                }
                dsDataSet = obj.CharGroupCreation(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AreaMaster LModels = new AreaMaster();
                    LModels.Status = row["Status"].ToString();
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
        public ActionResult UsersGetandGetschat(UsersModel UsersModel)
        {
            UsersModel obj = new UsersModel();

            List<UsersModel> oList = new List<UsersModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UsersGetandGetschat(UsersModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UsersModel LModels = new UsersModel();
                    LModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    LModels.Name = row["Name"].ToString();
                    LModels.UserRole = row["status"].ToString();
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

        public ActionResult DriverMasterInsertandUpdate(AreaMaster AreaMaster)
        {
            AreaMaster obj = new AreaMaster();
            List<AreaMaster> oList = new List<AreaMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.DriverMasterInsertandUpdate(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AreaMaster Models = new AreaMaster();
                    Models.Status = row["Status"].ToString();
                    Models.DriverId = Convert.ToInt32(row["DriverId"].ToString());
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
        public ActionResult DrivereGetsandGets(AreaMaster AreaMaster)
        {
            AreaMaster obj = new AreaMaster();

            List<AreaMaster> oList = new List<AreaMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DrivereGetsandGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AreaMaster Models = new AreaMaster();
                    Models.DriverId = Convert.ToInt32(row["DriverId"].ToString());
                    Models.DriverName = row["DriverName"].ToString();
                    Models.Address = row["Address"].ToString();
                    Models.PhoneNumber = row["PhoneNumber"].ToString();
                    Models.LicenceNumber = row["LicenceNumber"].ToString();
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
        public ActionResult UserLoginHistoryGet(UserLogin UserLogin)
        {
            UserLogin obj = new UserLogin();

            List<UserLogin> oList = new List<UserLogin>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UserLoginHistoryGet(UserLogin, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UserLogin Models = new UserLogin();
                    Models.UserId = row["UserId"].ToString();
                    Models.EmpName = row["Name"].ToString();
                    Models.EmpCode = row["EmpCode"].ToString();
                    Models.AtendanceDate = row["AtendanceDate"].ToString();
                    Models.InTime = row["InTime"].ToString();
                    Models.OutTime = row["OutTime"].ToString();
                    Models.TotalWorkHrs = row["TotalWorkingHrs"].ToString();
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
        public ActionResult UserLoginDetailsGet(UserLogin UserLogin)
        {
            UserLogin obj = new UserLogin();

            List<UserLogin> oList = new List<UserLogin>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UserLoginDetailsGet(UserLogin, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UserLogin Models = new UserLogin();
                    Models.UserId = row["UserId"].ToString();
                    Models.EmpName = row["Name"].ToString();
                    Models.EmpCode = row["EmpCode"].ToString();
                    Models.AtendanceDate = row["AtendanceDate"].ToString();
                    Models.InTime = row["InTime"].ToString();
                    Models.OutTime = row["OutTime"].ToString();
                    Models.TotalWorkHrs = row["TotalWorkingHrs"].ToString();
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
        public ActionResult AreaGroupInsertandUpdate(AreaMaster AreaMaster)
        {
            AreaMaster obj = new AreaMaster();
            List<AreaMaster> oList = new List<AreaMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AreaGroupInsertandUpdate(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AreaMaster MModels = new AreaMaster();
                    MModels.Status = row["Status"].ToString();
                    MModels.AreaGrpId = Convert.ToInt32(row["ArgrpId"].ToString());
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
        public ActionResult AreaGroupGetandGets(AreaMaster AreaMaster)
        {
            AreaMaster obj = new AreaMaster();

            List<AreaMaster> oList = new List<AreaMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AreaGroupGetandGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AreaMaster MModels = new AreaMaster();
                    MModels.AreaGrpId = Convert.ToInt32(row["AreaGrpId"].ToString());
                    MModels.AreaName = row["Name"].ToString();
                    MModels.AreaCode = row["Code"].ToString();
                    MModels.Description = row["Description"].ToString();
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
        public ActionResult AreaGetandGets(AreaMaster AreaMaster)
        {
            AreaMaster obj = new AreaMaster();

            List<AreaMaster> oList = new List<AreaMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AreaGetandGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AreaMaster MModels = new AreaMaster();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["Name"].ToString();
                    MModels.AreaCode = row["Code"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.GroupName = row["GroupName"].ToString();
                    MModels.AreaGrpId = Convert.ToInt32(row["AreaGrpId"].ToString());
                    MModels.DefaultArea = Convert.ToInt32(row["DeafultArea"].ToString());
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
        public ActionResult BusinessTypeGetandGets(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();

            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BusinessTypeGetandGets(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel MModels = new CompanyModel();
                    MModels.BusinessTypeId = Convert.ToInt32(row["BusinessTypeId"].ToString());
                    MModels.BusinessType = row["BusinessType"].ToString();
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
        public ActionResult AreaInsertandUpdate(AreaMaster AreaMaster)
        {
            AreaMaster obj = new AreaMaster();
            List<AreaMaster> oList = new List<AreaMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AreaInsertandUpdate(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AreaMaster MModels = new AreaMaster();
                    MModels.Status = row["Status"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["ArId"].ToString());
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
        public ActionResult LocationInsertandUpdate(LocationModel LocationModel)
        {
            LocationModel obj = new LocationModel();
            List<LocationModel> oList = new List<LocationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationInsertandUpdate(LocationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationModel LModels = new LocationModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.LocationId = Convert.ToInt32(row["LoId"].ToString());
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
        public ActionResult LocationGetandGets(LocationModel LocationModel)
        {
            LocationModel obj = new LocationModel();

            List<LocationModel> oList = new List<LocationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationGetandGets(LocationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationModel LModels = new LocationModel();
                    LModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    LModels.LocationName = row["LocationName"].ToString();
                    LModels.LocationCode = row["LocationCode"].ToString();
                    LModels.LocationDescription = row["LocationDescription"].ToString();
                    LModels.NegativeBillingFlag = Convert.ToInt32(row["NBFlag"].ToString());
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
        public ActionResult UserLocationGetandGets(LocationModel LocationModel)
        {
            LocationModel obj = new LocationModel();

            List<LocationModel> oList = new List<LocationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UserLocationGetandGets(LocationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationModel LModels = new LocationModel();
                    LModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    LModels.LocationName = row["LocationName"].ToString();
                    LModels.LocationCode = row["LocationCode"].ToString();
                    LModels.LocationDescription = row["LocationDescription"].ToString();
                    LModels.NegativeBillingFlag = Convert.ToInt32(row["NBFlag"].ToString());
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
        public ActionResult IncrementGetandGets(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();

            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IncrementGetandGets(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel LModels = new EmployeeModel();
                    LModels.IncrementId = Convert.ToInt32(row["IncTypeId"].ToString());
                    LModels.IncrementType = row["IncrementType"].ToString();
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
        public ActionResult EmployeeInsertandUpdate(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();
            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeInsertandUpdate(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel LModels = new EmployeeModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
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
        public ActionResult EmployeeFileInsert(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();

            List<EmployeeModel> dList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeFileInsert(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel MModels = new EmployeeModel();
                    MModels.Flag = Convert.ToInt32(row["Flag"].ToString());
                    MModels.Status = row["Status"].ToString();
                    MModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    MModels.StatusFlag = Convert.ToInt32(row["StatusFlag"].ToString());

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
        public void EmployeeFileUpload()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string FileName1 = Request.Form["FileName"];
                string SlNo = Request.Form["SlNo"];
                string Extension = Request.Form["Extension"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Employee/" + SlNo + "/"), FileName1 + "." + Extension);
                Request.Files[upload].SaveAs(path1);
            }
        }

        [HttpPost]
        public ActionResult EmployeeDocumentDelete(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();
            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeDocumentDelete(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel LModels = new EmployeeModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.EmployeeDocumentId = Convert.ToInt32(row["EmployeeDocumentId"].ToString());
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
        public void CreateEmployeeFolderNew(EmployeeModel EmployeeModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + EmployeeModel.EmployeeFolder + "/" + EmployeeModel.EmpId + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }

        [HttpPost]
        public ActionResult EmployeeGetandGets(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();

            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeGetandGets(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel LModels = new EmployeeModel();

                    LModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    LModels.EmpCode = row["EmpCode"].ToString();
                    LModels.Name = row["Name"].ToString();
                    LModels.CompanyId = row["CompanyId"].ToString();
                    LModels.DepartmentId = row["DepartmentId"].ToString();
                    LModels.DepartmentName = row["DepartmentName"].ToString();
                    LModels.LocationId = row["LocationId"].ToString();
                    LModels.DesignationId = row["DesignationId"].ToString();
                    LModels.DesignationCode = row["DesignationCode"].ToString();
                    LModels.Nationality = row["Nationality"].ToString();
                    LModels.CountryName = row["CountryName"].ToString();
                    LModels.DateofJoin = row["DateofJoin"].ToString();
                    LModels.BloodGroup = row["BloodGroup"].ToString();
                    LModels.Email = row["Email"].ToString();
                    LModels.Manager = row["Manager"].ToString();
                    LModels.MangerName = row["ManagerName"].ToString();
                    LModels.WorkingHoursId = Convert.ToInt32(row["WorkingHoursId"].ToString());
                    LModels.InsuranceCompanyName = row["InsuranceCompanyName"].ToString();
                    LModels.Mobile = row["Mobile"].ToString();
                    LModels.Others = row["BloodGroup"].ToString();
                    LModels.IsActive = Convert.ToBoolean(row["IsActive"].ToString());
                    LModels.Gender = row["Gender"].ToString();
                    LModels.DOB = row["DOB"].ToString();
                    LModels.PCAddress1 = row["PCAddress1"].ToString();
                    LModels.PCAddress2 = row["PCAddress2"].ToString();
                    LModels.PCAddress3 = row["PCAddress3"].ToString();
                    LModels.PCCountry = row["PCCountry"].ToString();
                    LModels.PCEmail = row["PCEmail"].ToString();
                    LModels.PCMobile = row["PCMobile"].ToString();
                    LModels.LCAddress1 = row["LCAddress1"].ToString();
                    LModels.LCAddress2 = row["LCAddress2"].ToString();
                    LModels.LCAddress3 = row["LCAddress3"].ToString();
                    LModels.LCCountry = row["LCCountry"].ToString();
                    LModels.LCEmail = row["LCEmail"].ToString();
                    LModels.LCMobile = row["LCMobile"].ToString();
                    LModels.PassportId = row["PassportId"].ToString();
                    LModels.NationalId = row["NationalId"].ToString();
                    LModels.LabourNo = row["LabourNo"].ToString();
                    LModels.InsuranceCompanyId = row["InsuranceCompanyId"].ToString();
                    LModels.VISANo = row["VISANo"].ToString();
                    LModels.DLNo = row["DLNo"].ToString();
                    LModels.ContractTypeId = row["ContractTypeId"].ToString();
                    LModels.FileNo = row["FileNo"].ToString();
                    LModels.PayRollType = row["PayRollType"].ToString();
                    LModels.SalaryAccount = Convert.ToInt32(row["SalaryAccount"].ToString());
                    LModels.SalaryAccountCode = row["SalaryAccountCode"].ToString();
                    LModels.AdvanceAccount = Convert.ToInt32(row["AdvanceAccount"].ToString());
                    LModels.AdvanceAccountCode = row["AdvanceAccountCode"].ToString();
                    LModels.BankAccount = row["BankAccount"].ToString();
                    LModels.BankAccountName = row["BankAccountName"].ToString();
                    LModels.BasicSalary = Convert.ToDecimal(row["BasicSalary"].ToString());
                    LModels.DA = Convert.ToDecimal(row["DA"].ToString());
                    LModels.TA = Convert.ToDecimal(row["TA"].ToString());
                    LModels.NightAlowance = Convert.ToDecimal(row["NightAlowance"].ToString());
                    LModels.EarningOthers = Convert.ToDecimal(row["EarningOthers"].ToString());
                    LModels.TotalEarnings = Convert.ToDecimal(row["TotalEarnings"].ToString());
                    LModels.PF = Convert.ToDecimal(row["PF"].ToString());
                    LModels.Tax = Convert.ToDecimal(row["Tax"].ToString());
                    LModels.HRA = Convert.ToDecimal(row["HRA"].ToString());
                    LModels.ESI = Convert.ToDecimal(row["ESI"].ToString());
                    LModels.Otherdeductions = Convert.ToDecimal(row["Otherdeductions"].ToString());
                    LModels.TotalDeductions = Convert.ToDecimal(row["TotalDeductions"].ToString());
                    LModels.TotalNetSalary = Convert.ToDecimal(row["TotalNetSalary"].ToString());
                    LModels.VisaExpense = Convert.ToDecimal(row["VisaExpense"].ToString());
                    LModels.SalaryAdvance = Convert.ToDecimal(row["SalaryAdvance"].ToString());
                    LModels.OTRate = Convert.ToDecimal(row["OTRate"].ToString());
                    LModels.OTSRate = Convert.ToDecimal(row["OTSRate"].ToString());
                    LModels.IncrementFrom = row["IncrementFrom"].ToString();
                    LModels.IncrementType = row["IncrementType"].ToString();
                    LModels.IncrementAmount = Convert.ToDecimal(row["IncrementAmount"].ToString());
                    LModels.EmployeeUser = row["Emp_UserId"].ToString();
                    LModels.EmployeeUserName = row["Emp_UserName"].ToString();
                    LModels.ContractType = row["ContractType"].ToString();
                    LModels.WorkingHours = row["WorkingHours"].ToString();
                    LModels.DesignationDescription = row["DesignationDescription"].ToString();
                    LModels.CLCountryName = row["CLCountryName"].ToString();
                    LModels.CPCountryName = row["CPCountryName"].ToString();
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
        public ActionResult EmployeeDocumentsView(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();

            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeDocumentsView(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel LModels = new EmployeeModel();
                    LModels.EmployeeDocumentId = Convert.ToInt32(row["EmployeeDocumentId"].ToString());
                    LModels.EmpId = Convert.ToInt32(row["EmployeeId"].ToString());
                    LModels.DocumentType = Convert.ToInt32(row["DocumentType"].ToString());
                    LModels.DocumentName = row["DocumentName"].ToString();
                    LModels.FolderName = row["FolderName"].ToString();
                    LModels.DocumentTypeName = row["IDType"].ToString();

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
        public ActionResult EmployeeDocumentGetandGets(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();

            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeDocumentGetandGets(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel LModels = new EmployeeModel();
                    LModels.PassportNo = row["PassportNo"].ToString();
                    LModels.InsuranceCompanyId = row["InsuranceCompanyId"].ToString();
                    LModels.Expiry = row["Expiry"].ToString();
                    LModels.IssuedOn = row["IssuedOn"].ToString();
                    LModels.Remarks = row["Remarks"].ToString();
                    LModels.Type = row["Type"].ToString();
                    LModels.Country = row["Country"].ToString();
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
        public void UploadEmployeeImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["imageName"];
                string extension = Path.GetExtension(filename);
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Employee/" + Request.Form["UniqueId"] + "/"), strImageName + extension);
                Request.Files[upload].SaveAs(path1);
            }
        }
        [HttpPost]
        public void RemoveExistingEmployeeDocumentFolder(ItemMasterModel ItemMasterModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Employee/" + ItemMasterModel.DocumentId + "/"));



            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
            //else
            //{
            //    DirectoryInfo attachments_AR = new DirectoryInfo(Server.MapPath(@"~/ProjectImages/Employee/" + ItemMasterModel.DocumentId + "/"));
            //    EmptyFolder(attachments_AR);
            //    Directory.Delete(fileName);
            //    Directory.CreateDirectory(fileName);
            //}
        }

        [HttpPost]
        public void RemoveExistingEmployeeDocument(ItemMasterModel ItemMasterModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Employee/" + ItemMasterModel.DocumentId + "/" + ItemMasterModel.DocumentName));
            System.IO.File.Delete(fileName);
        }


        [HttpPost]
        public void RemoveExistingDocumentImageFolder(PassportModel PassportModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Documents/" + PassportModel.EmpId + "/"));



            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
            else
            {
                DirectoryInfo attachments_AR = new DirectoryInfo(Server.MapPath(@"~/ProjectImages/Documents/" + PassportModel.EmpId + "/"));
                EmptyFolder(attachments_AR);
                Directory.Delete(fileName);
                Directory.CreateDirectory(fileName);
            }
        }

        [HttpPost]
        public void RemoveExistingItemImageFolder(ItemMasterModel ItemMasterModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Products/" + ItemMasterModel.ItemId + "/"));



            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
            else
            {
                DirectoryInfo attachments_AR = new DirectoryInfo(Server.MapPath(@"~/ProjectImages/Products/" + ItemMasterModel.ItemId + "/"));
                EmptyFolder(attachments_AR);
                Directory.Delete(fileName);
                Directory.CreateDirectory(fileName);
            }
        }

        [HttpPost]
        public void RemoveExistingUploadDocumentFolder(ItemMasterModel ItemMasterModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/DocumentUploads/" + ItemMasterModel.DocumentId + "/"));



            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
            else
            {
                DirectoryInfo attachments_AR = new DirectoryInfo(Server.MapPath(@"~/ProjectImages/DocumentUploads/" + ItemMasterModel.DocumentId + "/"));
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
        public void UploadProductMultiImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Products/" + Request.Form["UniqueId"] + "/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
            }
        }






        [HttpPost]
        public void UploaddocumenttImage()
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
        public void UploadDocuments()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["imageName"];
                string extension = Path.GetExtension(filename);
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/DocumentUploads/" + Request.Form["UniqueId"] + "/"), strImageName + extension);
                Request.Files[upload].SaveAs(path1);
            }
        }

        [HttpPost]
        public void UploadCustomerImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["imageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Customer/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
            }
        }

        [HttpPost]
        public void UploadCompanyLogo()
        {
            //../ app - assets / img / text.png
            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["imageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/app-assets/img/"), "CompanyLogo.png");
                Request.Files[upload].SaveAs(path1);
            }
        }





        [HttpPost]
        public ActionResult EmployeeDivisionInsertandUpdate(EmployeeDivisionModel EmployeeDivisionModel)
        {
            EmployeeDivisionModel obj = new EmployeeDivisionModel();
            List<EmployeeDivisionModel> oList = new List<EmployeeDivisionModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeDivisionInsertandUpdate(EmployeeDivisionModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeDivisionModel EDModels = new EmployeeDivisionModel();
                    EDModels.Status = row["Status"].ToString();
                    EDModels.EmployeeDivisionId = Convert.ToInt32(row["EmployeeDivisionId"].ToString());
                    oList.Add(EDModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EmployeeDivisionGetandGets(EmployeeDivisionModel EmployeeDivisionModel)
        {
            EmployeeDivisionModel obj = new EmployeeDivisionModel();

            List<EmployeeDivisionModel> oList = new List<EmployeeDivisionModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeDivisionGetandGets(EmployeeDivisionModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeDivisionModel EDModels = new EmployeeDivisionModel();
                    EDModels.EmployeeDivisionId = Convert.ToInt32(row["EmployeeDivisionId"].ToString());
                    EDModels.EmployeeDivisionName = row["EmployeeDivisionName"].ToString();
                    EDModels.EmployeeDivisionCode = row["EmployeeDivisionCode"].ToString();
                    EDModels.EmployeeDivisionDescription = row["EmployeeDivisionDescription"].ToString();
                    oList.Add(EDModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult CostCenterInsertandUpdate(CostCenterModel CostCenterModel)
        {
            CostCenterModel obj = new CostCenterModel();
            List<CostCenterModel> oList = new List<CostCenterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CostCenterInsertandUpdate(CostCenterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CostCenterModel CCModels = new CostCenterModel();
                    CCModels.Status = row["Status"].ToString();
                    CCModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    oList.Add(CCModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        

             [HttpPost]
        public ActionResult CostCentermasterGetandGets(CostCenterModel CostCenterModel)
        {
            CostCenterModel obj = new CostCenterModel();

            List<CostCenterModel> oList = new List<CostCenterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CostCentermasterGetandGets(CostCenterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CostCenterModel CCModels = new CostCenterModel();
                    CCModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    CCModels.CostCenterName = row["CostCenterName"].ToString();
                    CCModels.CostCenterCode = row["CostCenterCode"].ToString();
                    CCModels.CostCenterDescription = row["CostCenterDescription"].ToString();
                    oList.Add(CCModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult CostCenterGetandGets(CostCenterModel CostCenterModel)
        {
            CostCenterModel obj = new CostCenterModel();

            List<CostCenterModel> oList = new List<CostCenterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CostCenterGetandGets(CostCenterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CostCenterModel CCModels = new CostCenterModel();
                    CCModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    CCModels.CostCenterName = row["CostCenterName"].ToString();
                    CCModels.CostCenterCode = row["CostCenterCode"].ToString();
                    CCModels.CostCenterDescription = row["CostCenterDescription"].ToString();
                    oList.Add(CCModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DocumentUploadInsertandUpdate(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DocumentUploadInsertandUpdate(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel CModels = new ItemMasterModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.DocumentId = Convert.ToInt32(row["DocumentId"].ToString());
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
        public ActionResult DocumentUploadGetandGets(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DocumentUploadGetandGets(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.DocumentId = Convert.ToInt32(row["DocumentId"].ToString());
                    MModels.ReferenceNo = row["Doc_RefNo"].ToString();
                    MModels.DocumentType = row["DocumentType"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Filename = row["FileName"].ToString();
                    MModels.NewFilename = row["NewFileName"].ToString();
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
        public ActionResult UploadTypeGetandGets(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UploadTypeGetandGets(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.DocTypeId = Convert.ToInt32(row["TypeID"].ToString());
                    MModels.DocumentType = row["DocumentType"].ToString();
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
        public ActionResult CategoryInsertandUpdate(CategoryModel CategoryModel)
        {
            CategoryModel obj = new CategoryModel();
            List<CategoryModel> oList = new List<CategoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CategoryInsertandUpdate(CategoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CategoryModel CModels = new CategoryModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
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
        public ActionResult ToolsInsertandUpdate(CategoryModel CategoryModel)
        {
            CategoryModel obj = new CategoryModel();
            List<CategoryModel> oList = new List<CategoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ToolsInsertandUpdate(CategoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CategoryModel CModels = new CategoryModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.ToolId = Convert.ToInt32(row["ToolId"].ToString());
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
        public ActionResult AssetRegisterInsertandUpdate(AssetRegisterModel AssetRegisterModel)
        {
            AssetRegisterModel obj = new AssetRegisterModel();
            List<AssetRegisterModel> oList = new List<AssetRegisterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AssetRegisterInsertandUpdate(AssetRegisterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AssetRegisterModel CModels = new AssetRegisterModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.AssetId = Convert.ToInt32(row["AssetId"].ToString());
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
        public ActionResult GarageInsertandUpdate(GarageMaster GarageMaster)
        {
            GarageMaster obj = new GarageMaster();
            List<GarageMaster> oList = new List<GarageMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GarageInsertandUpdate(GarageMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    GarageMaster CModels = new GarageMaster();
                    CModels.Status = row["Status"].ToString();
                    CModels.GarageId = Convert.ToInt32(row["GarageId"].ToString());
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
        public ActionResult CategoryGetandGets(CategoryModel CategoryModel)
        {
            CategoryModel obj = new CategoryModel();

            List<CategoryModel> oList = new List<CategoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CategoryGetandGets(CategoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CategoryModel CModels = new CategoryModel();
                    CModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    CModels.CategoryName = row["CategoryName"].ToString();
                    CModels.CategoryCode = row["CategoryCode"].ToString();
                    CModels.CategoryDescription = row["CategoryDescription"].ToString();
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
        public ActionResult ToolsGetandGets(CategoryModel CategoryModel)
        {
            CategoryModel obj = new CategoryModel();

            List<CategoryModel> oList = new List<CategoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ToolsGetandGets(CategoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CategoryModel CModels = new CategoryModel();
                    CModels.ToolId = Convert.ToInt32(row["ToolId"].ToString());
                    CModels.Code = row["ToolCode"].ToString();
                    CModels.ToolDesc = row["ToolDescription"].ToString();
                    CModels.category = Convert.ToInt32(row["ToolCategoryId"].ToString());
                    CModels.CategoryName = row["CategoryName"].ToString();
                    CModels.group = Convert.ToInt32(row["ToolGroupId"].ToString());
                    CModels.GroupName = row["GrpName"].ToString();
                    CModels.Pcs = Convert.ToInt32(row["Pcs"].ToString());
                    CModels.ToolQty = Convert.ToInt32(row["ToolQty"].ToString());
                    CModels.OtherDetails = row["OtherDetails"].ToString();
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
        public ActionResult AssetRegisterGetandGets(AssetRegisterModel AssetRegisterModel)
        {
            AssetRegisterModel obj = new AssetRegisterModel();

            List<AssetRegisterModel> oList = new List<AssetRegisterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AssetRegisterGetandGets(AssetRegisterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AssetRegisterModel CModels = new AssetRegisterModel();
                    CModels.AssetId = Convert.ToInt32(row["AssetId"].ToString());
                    CModels.Code = row["Code"].ToString();
                    CModels.Description = row["Description"].ToString();
                    CModels.Serialno = row["SerialNo"].ToString();
                    CModels.Group = Convert.ToInt32(row["GrupId"].ToString());
                    CModels.Category = Convert.ToInt32(row["CategoryId"].ToString());
                    CModels.CategoryName = row["CategoryName"].ToString();
                    CModels.GroupName = row["GrpName"].ToString();
                    CModels.Purvalue = Convert.ToDecimal(row["PurchaseValue"].ToString());
                    CModels.Date = row["PurchaseDate"].ToString();
                    CModels.Manufacturer = row["Manufacturer"].ToString();
                    CModels.Depreciatedvalue = Convert.ToDecimal(row["DepreciatedValue"].ToString());
                    CModels.Depreciatedperc = Convert.ToDecimal(row["DepreciatedPerc"].ToString());
                    CModels.Location = Convert.ToInt32(row["LocationId"].ToString());
                    CModels.AccountDebit = Convert.ToInt32(row["AccountDebitId"].ToString());
                    CModels.AccountCredit = Convert.ToInt32(row["AccountCreditId"].ToString());
                    CModels.AccountDebitId = Convert.ToInt32(row["DebitAccId"].ToString());
                    CModels.AccountCreditId = Convert.ToInt32(row["CreditAccId"].ToString());
                    CModels.DebitDesc = row["DebitAccount"].ToString();
                    CModels.CreditDesc = row["CreditAccount"].ToString();
                    CModels.Year = row["Year"].ToString();
                    CModels.Make = row["Make"].ToString();
                    CModels.Comments = row["Comments"].ToString();
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
        public ActionResult GarageGetandGets(GarageMaster GarageMaster)
        {
            GarageMaster obj = new GarageMaster();

            List<GarageMaster> oList = new List<GarageMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GarageGetandGets(GarageMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    GarageMaster CModels = new GarageMaster();
                    CModels.GarageId = Convert.ToInt32(row["GarageId"].ToString());
                    CModels.GarageName = row["GarageName"].ToString();
                    CModels.txt_address = row["Address"].ToString();
                    CModels.PhoneNumber = row["PhoneNumber"].ToString();
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
        public ActionResult SubCategoryInsertandUpdate(SubCategoryModel SubCategoryModel)
        {
            SubCategoryModel obj = new SubCategoryModel();
            List<SubCategoryModel> oList = new List<SubCategoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubCategoryInsertandUpdate(SubCategoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SubCategoryModel SCModels = new SubCategoryModel();
                    SCModels.Status = row["Status"].ToString();
                    SCModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    oList.Add(SCModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SubCategoryGetandGets(SubCategoryModel SubCategoryModel)
        {
            SubCategoryModel obj = new SubCategoryModel();

            List<SubCategoryModel> oList = new List<SubCategoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubCategoryGetandGets(SubCategoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SubCategoryModel SCModels = new SubCategoryModel();
                    SCModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    SCModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    SCModels.CatName = row["CategoryName"].ToString();
                    SCModels.SubCategoryName = row["SubCategoryName"].ToString();
                    SCModels.SubCategoryDescription = row["SubCategoryDescription"].ToString();
                    oList.Add(SCModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult BankGetandGets(BankModel BankModel)
        {
            BankModel obj = new BankModel();

            List<BankModel> oList = new List<BankModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BankGetandGets(BankModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BankModel MModels = new BankModel();
                    MModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    MModels.BankName = row["BankName"].ToString();
                    MModels.BankCode = row["BankCode"].ToString();
                    MModels.ZipCode = row["ZipCode"].ToString();
                    MModels.Branch = row["Branch"].ToString();
                    MModels.Address1 = row["Address1"].ToString();
                    MModels.Address2 = row["Address2"].ToString();
                    MModels.Address3 = row["Address3"].ToString();
                    MModels.PhoneNo = row["PhoneNo"].ToString();
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
        public ActionResult BankInsertandUpdate(BankModel Bankmodel)
        {
            BankModel obj = new BankModel();
            List<BankModel> oList = new List<BankModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BankInsertandUpdate(Bankmodel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BankModel MModels = new BankModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PassportGetandGets(PassportModel PassportModel)
        {
            PassportModel obj = new PassportModel();

            List<PassportModel> oList = new List<PassportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PassportGetandGets(PassportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PassportModel MModels = new PassportModel();
                    MModels.PassportId = Convert.ToInt32(row["PassportId"].ToString());
                    MModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.Name = row["Name"].ToString();
                    MModels.PassportNo = row["PassportNo"].ToString();
                    MModels.Country = row["Country"].ToString();
                    MModels.CountryName = row["CountryName"].ToString();
                    MModels.PassportIssued = row["IssuedOn"].ToString();
                    MModels.PassportExpiry = row["Expiry"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.IDType = row["IDType"].ToString();
                    MModels.Type = row["Type"].ToString();
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
        public ActionResult PassportInsertandUpdate(PassportModel PassportModel)
        {
            PassportModel obj = new PassportModel();
            List<PassportModel> oList = new List<PassportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PassportInsertandUpdate(PassportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PassportModel MModels = new PassportModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.PassportId = Convert.ToInt32(row["PassportId"].ToString());
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
        public ActionResult DepartmentInsertandUpdate(DepartmentModel DepartmentModel)
        {
            DepartmentModel obj = new DepartmentModel();
            List<DepartmentModel> oList = new List<DepartmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DepartmentInsertandUpdate(DepartmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DepartmentModel LModels = new DepartmentModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
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
        public ActionResult DepartmentGetandGets(DepartmentModel DepartmentModel)
        {
            DepartmentModel obj = new DepartmentModel();

            List<DepartmentModel> oList = new List<DepartmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DepartmentGetandGets(DepartmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DepartmentModel LModels = new DepartmentModel();
                    LModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    LModels.DepartmentName = row["DepartmentName"].ToString();
                    LModels.DepartmentCode = row["DepartmentCode"].ToString();
                    LModels.DepartmentDescription = row["DepartmentDescription"].ToString();
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
        public ActionResult ResourceInsertandUpdate(DepartmentModel DepartmentModel)
        {
            DepartmentModel obj = new DepartmentModel();
            List<DepartmentModel> oList = new List<DepartmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ResourceInsertandUpdate(DepartmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DepartmentModel LModels = new DepartmentModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.ResourceId = row["ResourceId"].ToString();
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
        public ActionResult ResourceGetandGets(DepartmentModel DepartmentModel)
        {
            DepartmentModel obj = new DepartmentModel();

            List<DepartmentModel> oList = new List<DepartmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ResourceGetandGets(DepartmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DepartmentModel LModels = new DepartmentModel();
                    LModels.ResourceId = row["ResourceId"].ToString();
                    LModels.Code = row["ResourceCode"].ToString();
                    LModels.Account = row["Account"].ToString();
                    LModels.Description = row["AccountDescription"].ToString();
                    LModels.Notes = row["Notes"].ToString();
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
        public ActionResult ResourceAutocomplete(DepartmentModel DepartmentModel)
        {
            DepartmentModel obj = new DepartmentModel();

            List<DepartmentModel> oList = new List<DepartmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ResourceAutocomplete(DepartmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DepartmentModel LModels = new DepartmentModel();
                    LModels.ResourceId = row["ResourceId"].ToString();
                    LModels.Code = row["ResourceCode"].ToString();
                    LModels.Account = row["Account"].ToString();
                    LModels.Description = row["AccountDescription"].ToString();
                    LModels.Notes = row["Notes"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult UserDepartmentGetandGets(DepartmentModel DepartmentModel)
        {
            DepartmentModel obj = new DepartmentModel();

            List<DepartmentModel> oList = new List<DepartmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UserDepartmentGetandGets(DepartmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DepartmentModel LModels = new DepartmentModel();
                    LModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    LModels.DepartmentName = row["DepartmentName"].ToString();
                    LModels.User = row["UserName"].ToString();
                    LModels.UserId = row["UserId"].ToString();
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
        public ActionResult CustodianGetandGets(DepartmentModel DepartmentModel)
        {
            DepartmentModel obj = new DepartmentModel();

            List<DepartmentModel> oList = new List<DepartmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustodianGetandGets(DepartmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DepartmentModel LModels = new DepartmentModel();
                    LModels.DepartmentId = Convert.ToInt32(row["EmpId"].ToString());
                    LModels.DepartmentName = row["Name"].ToString();
                    LModels.Code = row["EmpCode"].ToString();
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
        public ActionResult CurrencyInsertandUpdate(CurrencyModels CurrencyModels)
        {
            CurrencyModels obj = new CurrencyModels();
            List<CurrencyModels> oList = new List<CurrencyModels>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CurrencyInsertandUpdate(CurrencyModels, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CurrencyModels MModels = new CurrencyModels();
                    MModels.Status = row["Status"].ToString();
                    MModels.Id = Convert.ToInt32(row["CurrencyId"].ToString());
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
        public ActionResult CurrencyGetandGets(CurrencyModels CurrencyModels)
        {
            CurrencyModels obj = new CurrencyModels();

            List<CurrencyModels> oList = new List<CurrencyModels>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CurrencyGetandGets(CurrencyModels, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CurrencyModels MModels = new CurrencyModels();
                    MModels.Id = Convert.ToInt32(row["Id"].ToString());
                    MModels.CurrencyCode = row["CurrencyCode"].ToString();
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.BaseCurrencyId = Convert.ToInt32(row["BaseCurrency"].ToString());
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
        public ActionResult SalesmanInsertandUpdate(SalesModels SalesModels)
        {
            SalesModels obj = new SalesModels();
            List<SalesModels> oList = new List<SalesModels>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanInsertandUpdate(SalesModels, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesModels MModels = new SalesModels();
                    MModels.Status = row["Status"].ToString();
                    MModels.Id = Convert.ToInt32(row["SmId"].ToString());
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
        public ActionResult SalesmanGetandGets(SalesModels SalesModels)
        {
            SalesModels obj = new SalesModels();

            List<SalesModels> oList = new List<SalesModels>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesmanGetandGets(SalesModels, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesModels MModels = new SalesModels();
                    MModels.Id = Convert.ToInt32(row["Id"].ToString());
                    MModels.Code = row["Code"].ToString();
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.LastName = row["LastName"].ToString();
                    MModels.TargetAmount = Convert.ToDecimal(row["TargetAmount"].ToString());
                    MModels.Image = row["Image"].ToString();
                    MModels.ContactNumber = row["ContactNumber"].ToString();
                    MModels.Address1 = row["Address1"].ToString();
                    MModels.Address2 = row["Address2"].ToString();
                    MModels.Address3 = row["address3"].ToString();
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
        public ActionResult UserSalesmanGetandGets(SalesModels SalesModels)
        {
            SalesModels obj = new SalesModels();

            List<SalesModels> oList = new List<SalesModels>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UserSalesmanGetandGets(SalesModels, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesModels LModels = new SalesModels();
                    LModels.SalesmanId = Convert.ToInt32(row["Id"].ToString());
                    LModels.FirstName = row["FirstName"].ToString();
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
        public ActionResult BranchInsertandUpdate(BranchMaster BranchMaster)
        {
            BranchMaster obj = new BranchMaster();
            List<BranchMaster> oList = new List<BranchMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BranchInsertandUpdate(BranchMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BranchMaster MModels = new BranchMaster();
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
        public ActionResult BranchGetandGets(BranchMaster BranchMaster)
        {
            BranchMaster obj = new BranchMaster();

            List<BranchMaster> oList = new List<BranchMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BranchGetandGets(BranchMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BranchMaster MModels = new BranchMaster();
                    MModels.BrnchId = Convert.ToInt32(row["BrnchId"].ToString());
                    MModels.BrnchName = row["BrnchName"].ToString();
                    MModels.BrnchCode = row["BrnchCode"].ToString();
                    MModels.BrnchDescription = row["BrnchDescription"].ToString();
                    MModels.BrnchAddress1 = row["BrnchAddress1"].ToString();
                    MModels.BrnchAddress2 = row["BrnchAddress2"].ToString();
                    MModels.BrnchAddress3 = row["BrnchAddress3"].ToString();
                    MModels.BrnchContactNo = row["BrnchContactNo"].ToString();
                    MModels.BrnchMobileNo = row["BrnchMobileNo"].ToString();
                    MModels.BrnchEmail = row["BrnchEmail"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GroupInsertandUpdate(GroupMaster GroupMaster)
        {
            GroupMaster obj = new GroupMaster();
            List<GroupMaster> oList = new List<GroupMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GroupInsertandUpdate(GroupMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    GroupMaster MModels = new GroupMaster();
                    MModels.Status = row["Status"].ToString();
                    MModels.GrpId = Convert.ToInt32(row["GrpId"].ToString());
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
        public ActionResult GroupGetandGets(GroupMaster GroupMaster)
        {
            GroupMaster obj = new GroupMaster();

            List<GroupMaster> oList = new List<GroupMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GroupGetandGets(GroupMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    GroupMaster MModels = new GroupMaster();
                    MModels.GrpId = Convert.ToInt32(row["GrpId"].ToString());
                    MModels.GrpName = row["GrpName"].ToString();
                    MModels.GrpCode = row["GrpCode"].ToString();
                    MModels.GrpDescription = row["GrpDescription"].ToString();
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
        public ActionResult AutomobileGroupGetandGets(GroupMaster GroupMaster)
        {
            GroupMaster obj = new GroupMaster();

            List<GroupMaster> oList = new List<GroupMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AutomobileGroupGetandGets(GroupMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    GroupMaster MModels = new GroupMaster();
                    MModels.GrpId = Convert.ToInt32(row["GroupId"].ToString());
                    MModels.GrpName = row["GroupName"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult SubGroupInsertandUpdate(SubGroupMaster SubGroupMaster)
        {
            SubGroupMaster obj = new SubGroupMaster();
            List<SubGroupMaster> oList = new List<SubGroupMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubGroupInsertandUpdate(SubGroupMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SubGroupMaster MModels = new SubGroupMaster();
                    MModels.Status = row["Status"].ToString();
                    MModels.SbgrpId = Convert.ToInt32(row["SbgrpId"].ToString());
                    MModels.GroupId = Convert.ToInt32(row["GroupId"].ToString());
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
        public ActionResult SubGroupGetandGets(SubGroupMaster SubGroupMaster)
        {
            SubGroupMaster obj = new SubGroupMaster();

            List<SubGroupMaster> oList = new List<SubGroupMaster>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubGroupGetandGets(SubGroupMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SubGroupMaster MModels = new SubGroupMaster();
                    MModels.SbgrpId = Convert.ToInt32(row["SbgrpId"].ToString());
                    MModels.GroupId = Convert.ToInt32(row["GroupId"].ToString());
                    MModels.GrpNames = row["GrpName"].ToString();
                    MModels.SbgrpName = row["SbgrpName"].ToString();
                    MModels.SbgrpDescription = row["SbgrpDescription"].ToString();
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
        public ActionResult DesignationInsertandUpdate(DesignationModel DesignationModel)
        {
            DesignationModel obj = new DesignationModel();
            List<DesignationModel> oList = new List<DesignationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DesignationInsertandUpdate(DesignationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DesignationModel LModels = new DesignationModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.DesignationId = Convert.ToInt32(row["DesignationId"].ToString());
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
        public ActionResult DesignationGetandGets(DesignationModel DesignationModel)
        {
            DesignationModel obj = new DesignationModel();

            List<DesignationModel> oList = new List<DesignationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DesignationGetandGets(DesignationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DesignationModel LModels = new DesignationModel();
                    LModels.DesignationId = Convert.ToInt32(row["DesignationId"].ToString());
                    LModels.DesignationCode = row["DesignationCode"].ToString();
                    LModels.DesignationDescription = row["DesignationDescription"].ToString();
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
        public ActionResult UnitInsertandUpdate(UnitMaster UnitMaster)
        {
            UnitMaster obj = new UnitMaster();
            List<UnitMaster> oList = new List<UnitMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UnitInsertandUpdate(UnitMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UnitMaster MModels = new UnitMaster();
                    MModels.Status = row["Status"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
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
        public ActionResult UnitGetandGets(UnitMaster UnitMaster)
        {
            UnitMaster obj = new UnitMaster();

            List<UnitMaster> oList = new List<UnitMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UnitGetandGets(UnitMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UnitMaster MModels = new UnitMaster();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitDescription = row["UnitDescription"].ToString();
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
        public ActionResult CustomerInsertandUpdate(CustomerMaster CustomerMaster)
        {
            CustomerMaster obj = new CustomerMaster();
            List<CustomerMaster> oList = new List<CustomerMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerInsertandUpdate(CustomerMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerMaster MModels = new CustomerMaster();
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
        public ActionResult CustomerGetandGets(CustomerMaster CustomerMaster)
        {
            CustomerMaster obj = new CustomerMaster();

            List<CustomerMaster> oList = new List<CustomerMaster>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerGetandGets(CustomerMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerMaster MModels = new CustomerMaster();
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
        public ActionResult AcntGetandGets(AccountSchedule AccountSchedule)
        {
            AccountSchedule obj = new AccountSchedule();

            List<AccountSchedule> oList = new List<AccountSchedule>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AcntGetandGets(AccountSchedule, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AccountSchedule MModels = new AccountSchedule();
                    MModels.AcntId = Convert.ToInt32(row["AcntId"].ToString());
                    MModels.AcntDescription = row["AcntDescription"].ToString();
                    MModels.AcntCode = Convert.ToInt32(row["AcntCode"].ToString());
                    MModels.AcntSlno = Convert.ToInt32(row["AcntSlNo"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ItemInsertandUpdate(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemInsertandUpdate(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
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
                    MModels.modelm1 = row["modelm1"].ToString();
                    MModels.modelm2 = row["modelm2"].ToString();
                    MModels.modelm3 = row["modelm3"].ToString();
                    MModels.modelm4 = row["modelm4"].ToString();
                    MModels.modelm5 = row["modelm5"].ToString();
                    MModels.MultiPriceId = Convert.ToInt32(row["BelowCostFlag"].ToString());
                    MModels.ImageExt = row["ImageExt"].ToString();
                    MModels.DivId= Convert.ToInt32(row["HSN_Id"].ToString());
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
        //[HttpPost]
        //public ActionResult ItemDetailsGetforExcelImport(ItemMasterModel ItemMasterModel)   //For Sales
        //{
        //    ItemMasterModel obj = new ItemMasterModel();

        //    List<ItemMasterModel> oList = new List<ItemMasterModel>();
        //    try
        //    {
        //        DataSet dsDataSet = new DataSet();
        //        dsDataSet = obj.ItemDetailsGetforExcelImport(ItemMasterModel, dbName);
        //        foreach (DataRow row in dsDataSet.Tables[0].Rows)
        //        {
        //            ItemMasterModel MModels = new ItemMasterModel();
        //            MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
        //            MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
        //            MModels.VatId = Convert.ToInt32(row["VatId"].ToString());                  
        //            MModels.ItemCode = row["ItemCode"].ToString();
        //            MModels.Description = row["Description"].ToString();                 
        //            MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());                   
        //            MModels.Bin_A = row["BinA"].ToString();
        //            MModels.Bin_B = row["BinB"].ToString();
        //            MModels.Bin_C = row["BinC"].ToString();
        //            MModels.Bin_D = row["BinD"].ToString();
        //            MModels.Bin_E = row["BinE"].ToString();
        //            MModels.Bin_F = row["BinF"].ToString();
        //            MModels.Bin_G = row["BinG"].ToString();
        //            MModels.Bin_H = row["BinH"].ToString();                  
        //            MModels.MRP = Convert.ToDecimal(row["MrpRate"].ToString());                  
        //            MModels.Otherdescription = row["Otherdescription"].ToString();
        //            MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
        //            MModels.Status = row["Status"].ToString(); 
        //            oList.Add(MModels);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
        //    }
        //    return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet); 
        //}

        [HttpPost]
        public JsonResult ItemDetailsGetforExcelImport(List<ItemMasterModel> ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();

            try
            {
                string[] tmpTable = new string[5];
                tmpTable[0] = "ItemCode";
                tmpTable[1] = "Description";
                tmpTable[2] = "MinQty";
                tmpTable[3] = "UnitPrice";
                tmpTable[4] = "SlNumber";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ItemMasterModel)
                {
                    obj.ItemCode = details.ItemCode;
                    obj.Description = details.Description;
                    obj.MinQty = details.MinQty;
                    obj.UnitPrice = details.UnitPrice;
                    obj.SlNumber = details.SlNumber;
                    dt.Rows.Add(obj.ItemCode, obj.Description, obj.MinQty, obj.UnitPrice, obj.SlNumber);
                }

                dsDataSet = obj.ItemDetailsGetforExcelImport(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.MRP = Convert.ToDecimal(row["MrpRate"].ToString());
                    MModels.Otherdescription = row["Otherdescription"].ToString();
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.MinQty = Convert.ToDecimal(row["MinQty"].ToString());
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNumber = Convert.ToInt32(row["SlNumber"].ToString());
                    MModels.MultiPriceId = Convert.ToInt32(row["BelowCostFlag"].ToString());
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
        public ActionResult ItemGetAll(int dummy)
        {
            var oList = ABItemList.ItemGetAll(dbName);
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }


        [HttpPost]
        public ActionResult MultiUnitGetandGets(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MultiUnitGetandGets(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.MultiUnitId = Convert.ToInt32(row["MultiUnitId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Fraction = Convert.ToDecimal(row["Fraction"].ToString());
                    MModels.UnitPrice = Convert.ToDecimal(row["UnitPrice"].ToString());
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
        public ActionResult AspectsGetandGets(Aspects AspectsModel)
        {

            Aspects obj = new Aspects();
            List<Aspects> oList = new List<Aspects>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AspectsGetandGets(AspectsModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Aspects MModels = new Aspects();
                    MModels.EmpID = Convert.ToInt64(row["EmpID"].ToString());

                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.EmpName = row["Name"].ToString();

                    MModels.Intime = row["Intime"].ToString();
                    MModels.outtime = row["outtime"].ToString();
                    MModels.FromDate = row["FromDate"].ToString();
                    MModels.Todate = row["Todate"].ToString();
                    MModels.Break1In = row["Break1In"].ToString();
                    MModels.Break1Out = row["Break1Out"].ToString();
                    MModels.Break2In = row["Break2In"].ToString();
                    MModels.Break2out = row["Break2out"].ToString();
                    MModels.Lunchbreakin = row["Lunchbreakin"].ToString();
                    MModels.LunchbreakOut = row["LunchbreakOut"].ToString();
                    MModels.overtime = row["overtime"].ToString();
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
        public JsonResult Aspectsinsertandupdate(List<Aspects> AspectsdataModel)
        {
            Aspects obj = new Aspects();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<Aspects> oList = new List<Aspects>();

            try
            {
                string[] tmpTable = new string[12];
                tmpTable[0] = "EmpID";
                tmpTable[1] = "FromDate";
                tmpTable[2] = "Todate";
                tmpTable[3] = "Intime";
                tmpTable[4] = "outtime";
                tmpTable[5] = "Break1In";
                tmpTable[6] = "Break1Out";
                tmpTable[7] = "Break2In";
                tmpTable[8] = "Break2out";
                tmpTable[9] = "Lunchbreakin";
                tmpTable[10] = "LunchbreakOut";
                tmpTable[11] = "overtime";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in AspectsdataModel)
                {
                    obj.EmpID = details.EmpID;
                    obj.FromDate = details.FromDate;
                    obj.Todate = details.Todate;
                    obj.Intime = details.Intime;
                    obj.outtime = details.outtime;
                    obj.Break1In = details.Break1In;
                    obj.Break1Out = details.Break1Out;
                    obj.Break2In = details.Break2In;
                    obj.Break2out = details.Break2out;
                    obj.Lunchbreakin = details.Lunchbreakin;
                    obj.LunchbreakOut = details.LunchbreakOut;
                    obj.overtime = details.overtime;

                    dt.Rows.Add(obj.EmpID, obj.FromDate, obj.Todate, obj.Intime, obj.outtime, obj.Break1In, obj.Break1Out, obj.Break2In, obj.Break2out, obj.Lunchbreakin, obj.LunchbreakOut, obj.overtime);
                }
                ItemMasterModel iModel = new ItemMasterModel();
                dsDataSet = iModel.Aspectsinsertandupdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    //oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }





























        [HttpPost]
        public JsonResult UserMultiDeptInsert(List<ItemMasterModel> ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();

            try
            {
                string[] tmpTable = new string[4];
                tmpTable[0] = "UserId";
                tmpTable[1] = "DeptId";
                tmpTable[2] = "DivId";
                tmpTable[3] = "LocId";




                dt = Common.CreateTable(tmpTable);

                foreach (var details in ItemMasterModel)
                {
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.DivId = details.DivId;
                    obj.LocId = details.LocId;



                    dt.Rows.Add(obj.UserId, obj.DeptId, obj.DivId, obj.LocId);
                }

                dsDataSet = obj.UserMultiDeptInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    //oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        [HttpPost]
        public JsonResult LocationWiseQuantityUpdate(List<ItemMasterModel> ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();

            try
            {
                string[] tmpTable = new string[4];
                tmpTable[0] = "ItemId";
                tmpTable[1] = "LocId";
                tmpTable[2] = "Qty";
                tmpTable[3] = "Dept";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ItemMasterModel)
                {
                    obj.LocId = details.LocId;
                    obj.ItemId = details.ItemId;
                    obj.OpeningQty = details.OpeningQty;
                    obj.DeptId = details.DeptId;
                    dt.Rows.Add(obj.ItemId, obj.LocId, obj.OpeningQty, obj.DeptId);
                }

                dsDataSet = obj.LocationWiseQuantityUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
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
        public JsonResult MultiUnitInsertandUpdate(List<ItemMasterModel> ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();

            try
            {
                string[] tmpTable = new string[6];
                tmpTable[0] = "MultiUnitId";
                tmpTable[1] = "ItemId";
                tmpTable[2] = "Unit";
                tmpTable[3] = "Fraction";
                tmpTable[4] = "UnitPrice";
                tmpTable[5] = "DelFlag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in ItemMasterModel)
                {
                    obj.MultiUnitId = details.MultiUnitId;
                    obj.ItemId = details.ItemId;
                    obj.Unit = details.Unit;
                    obj.Fraction = details.Fraction;
                    obj.UnitPrice = details.UnitPrice;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add
                    (obj.MultiUnitId, obj.ItemId, obj.Unit, obj.Fraction, obj.UnitPrice, obj.DelFlag);
                }

                dsDataSet = obj.MultiUnitInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
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
        public JsonResult ProductMultiPriceInsertandUpdate(List<ItemMasterModel> ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();

            try
            {
                string[] tmpTable = new string[6];
                tmpTable[0] = "ProductMultiPriceId";
                tmpTable[1] = "ItemId";
                tmpTable[2] = "MultiPriceId";
                tmpTable[3] = "Price";
                tmpTable[4] = "DelFlag";
                tmpTable[5] = "NoQty";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in ItemMasterModel)
                {
                    obj.ProductMultiPriceId = details.ProductMultiPriceId;
                    obj.ItemId = details.ItemId;
                    obj.MultiPriceId = details.MultiPriceId;
                    obj.Price = details.Price;
                    obj.DelFlag = details.DelFlag;
                    obj.NoQty = details.NoQty;
                    dt.Rows.Add(obj.ProductMultiPriceId, obj.ItemId, obj.MultiPriceId, obj.Price, obj.DelFlag, obj.NoQty);
                }

                dsDataSet = obj.ProductMultiPriceInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
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
        public ActionResult ProductMultiPriceGetandGets(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductMultiPriceGetandGets(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ProductMultiPriceId = Convert.ToInt32(row["ProductMultiPriceId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.MultiPriceId = Convert.ToInt32(row["MultiPriceId"].ToString());
                    MModels.Price = Convert.ToDecimal(row["Price"].ToString());
                    MModels.NoQty = Convert.ToInt32(row["NoQty"].ToString());
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
        public ActionResult ProductRateGets(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductRateGets(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.Price = Convert.ToDecimal(row["Rate"].ToString());
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
        public ActionResult IPBillReport(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IPBillReport(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    LabBill Reptmodels = new LabBill();
                    Reptmodels.BillMainId = Convert.ToInt32(row["BillMainId"].ToString());
                    Reptmodels.BillDate = row["BillDate"].ToString();
                    Reptmodels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    Reptmodels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Reptmodels.IpNo = Convert.ToInt32(row["IpNo"].ToString());
                    Reptmodels.Name = row["Name"].ToString();
                    Reptmodels.Hospital = row["Doctor"].ToString();
                    Reptmodels.Department = row["PayType"].ToString();
                    Reptmodels.Doctor = Convert.ToInt32(row["DocId"].ToString());
                    Reptmodels.DiscAmt = Convert.ToDecimal(row["DiscAmt"].ToString());
                    Reptmodels.TotalAmt = Convert.ToDecimal(row["NetAmt"].ToString());
                    Reptmodels.NetAmt = Convert.ToDecimal(row["TotalAmt"].ToString());
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
        public ActionResult LocationWiseProductQty(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationWiseProductQty(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();

                    MModels.LocId = Convert.ToInt32(row["locationid"].ToString());
                    MModels.OpeningQty = Convert.ToDecimal(row["Qty"].ToString());
                    MModels.SbgrpName = row["locationname"].ToString();
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
        public ActionResult SubAreaGetforArea(AreaMaster AreaMaster)
        {
            InvReportModel obj = new InvReportModel();

            List<AreaMaster> oList = new List<AreaMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubAreaGetforArea(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AreaMaster MModels = new AreaMaster();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["Name"].ToString();
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
        public ActionResult SubGroupGetforGroup(SubGroupMaster SubGroupMaster)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<SubGroupMaster> oList = new List<SubGroupMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubGroupGetforGroup(SubGroupMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SubGroupMaster MModels = new SubGroupMaster();
                    MModels.SbgrpId = Convert.ToInt32(row["SbgrpId"].ToString());
                    MModels.SbgrpName = row["SbgrpName"].ToString();
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
        public ActionResult SubCategoryGetforCategory(SubCategoryModel SubCategoryModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<SubCategoryModel> oList = new List<SubCategoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubCategoryGetforCategory(SubCategoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SubCategoryModel MModels = new SubCategoryModel();
                    MModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
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
        public void UploadMultipleProductImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Products/" + Request.Form["UniqueId"] + "/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
            }
        }


        //[HttpPost]
        //public void CalcOpen()

        //{
        //    try
        //    {
        //        System.Diagnostics.Process.Start("calc");
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
        //    }
        //}
        public void PassportUploadMultipleImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Documents/" + Request.Form["UniqueId"] + "/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
            }
        }
        [HttpPost]
        public int CheckFolderLengthProduct(ItemMasterModel ItemMasterModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Products/" + Request.Form["UniqueId"] + "/"));
            int filecount = 0;
            try
            {
                if (Directory.Exists(fileName))
                {
                    filecount = Directory.GetFiles(Server.MapPath(@"~/ProjectImages/Products/" + Request.Form["UniqueId"] + "/")).Length;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return filecount;
        }

        [HttpPost]
        public void UploadMultipleDocumentPDF()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Documents/" + Request.Form["UniqueId"] + "/"), strImageName + ".pdf");
                Request.Files[upload].SaveAs(path1);
            }
        }


        public int CheckFolderLengthPassport(PassportModel PassportModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Documents/" + Request.Form["UniqueId"] + "/"));
            int filecount = 0;
            try
            {
                if (Directory.Exists(fileName))
                {
                    filecount = Directory.GetFiles(Server.MapPath(@"~/ProjectImages/Documents/" + Request.Form["UniqueId"] + "/")).Length;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return filecount;
        }




        [HttpPost]
        public void UploadMultipleProductImage1()
        {
            ItemMasterModel obj = new ItemMasterModel();
            long imgno = obj.UploadMultipleProductImage(dbName);



            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                // string strImageName = Request.Form["ImageName"];
                long strImageName = obj.UploadMultipleProductImage(dbName);
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Products/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
                //  strFileName = ProductId + ".png";
            }
        }




        [HttpPost]
        public void UploadProductImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Products/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
                //  strFileName = ProductId + ".png";
            }
        }


        [HttpPost]
        public void UploadMedicineImage()
        {
            try
            {
                ItemMasterModel obj = new ItemMasterModel();

                foreach (string upload in Request.Files)
                {
                    string filename = Path.GetFileName(Request.Files[upload].FileName);
                    string strImageName = Request.Form["ImageName"];
                    string Ext = Request.Form["Ext"];
                    string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + obj.ImageFolder + "/" + strImageName + "/"), strImageName + "." + Ext);
                    string Folder = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + obj.ImageFolder + "/" + strImageName + "/"));

                    if (!Directory.Exists(Folder))
                    {
                        Directory.CreateDirectory(Folder);
                    }

                    Request.Files[upload].SaveAs(fileName);

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
        }

        public ActionResult HMS_HSNSearch(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_HSNSearch(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.DivId = Convert.ToInt32(row["HSN_Id"].ToString());
                    MModels.Hsncode = row["HSN_Code"].ToString();
                    MModels.Name = row["HSN_Name"].ToString();
                    MModels.VatPer = Convert.ToDecimal(row["HSN_TaxPer"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public void UploadSupplierImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Supplier/"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
                //  strFileName = ProductId + ".png";
            }
        }


        [HttpPost]
        public ActionResult VehicleInsertandUpdate(VehicleModel VehicleModel)
        {
            VehicleModel obj = new VehicleModel();
            List<VehicleModel> oList = new List<VehicleModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VehicleInsertandUpdate(VehicleModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VehicleModel VModels = new VehicleModel();
                    VModels.Status = row["Status"].ToString();
                    VModels.VehicleId = Convert.ToInt32(row["VehicleId"].ToString());
                    oList.Add(VModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult VehicleGetandGets(VehicleModel VehicleModel)
        {
            VehicleModel obj = new VehicleModel();

            List<VehicleModel> oList = new List<VehicleModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VehicleGetandGets(VehicleModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VehicleModel VModels = new VehicleModel();
                    VModels.VehicleId = Convert.ToInt32(row["VehicleId"].ToString());
                    VModels.RegistrationNumber = row["RegistrationNumber"].ToString();
                    VModels.Name = row["Name"].ToString();
                    VModels.VehicleStatus = row["VehicleStatus"].ToString();
                    VModels.FuelType = row["FuelType"].ToString();
                    VModels.Driver = row["Driver"].ToString();
                    VModels.RegistrationDate = row["RegistrationDate"].ToString();
                    VModels.ExpiryDate = row["ExpiryDate"].ToString();
                    VModels.InsuranceType = row["InsuranceType"].ToString();
                    VModels.Validity = row["Validity"].ToString();
                    VModels.VehicleDescription = row["VehicleDescription"].ToString();
                    oList.Add(VModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult TaxInsertandUpdate(TaxModel TaxModel)
        {
            TaxModel obj = new TaxModel();
            List<TaxModel> oList = new List<TaxModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TaxInsertandUpdate(TaxModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxModel TModels = new TaxModel();
                    TModels.Status = row["Status"].ToString();
                    TModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    oList.Add(TModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult TaxGetandGets(TaxModel TaxModel)
        {
            TaxModel obj = new TaxModel();

            List<TaxModel> oList = new List<TaxModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TaxGetandGets(TaxModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TaxModel TModels = new TaxModel();
                    TModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    TModels.TaxName = row["TaxName"].ToString();
                    TModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    TModels.TaxableAccountSales = row["TaxableAccountSales"].ToString();
                    TModels.TaxableAccountpurchase = row["TaxableAccountpurchase"].ToString();
                    TModels.TaxAccountSales = row["TaxAccountSales"].ToString();
                    TModels.TaxAccountpurchase = row["TaxAccountpurchase"].ToString();
                    TModels.TaxableAccountSalesReturn = row["TaxableAcntSalesReturn"].ToString();
                    TModels.TaxableAccountpurchaseReturn = row["TaxableAcntpurReturn"].ToString();
                    TModels.SaleTaxableId = Convert.ToInt32(row["SaleTaxableId"].ToString());
                    TModels.PurchaseTaxableId = Convert.ToInt32(row["PurchaseTaxableId"].ToString());
                    TModels.SaleTaxId = Convert.ToInt32(row["SaleTaxId"].ToString());
                    TModels.PurchaseTaxId = Convert.ToInt32(row["PurchaseTaxId"].ToString());
                    TModels.SaleReturnTaxableId = Convert.ToInt32(row["SaleReturnTaxableId"].ToString());
                    TModels.PurchaseReturnTaxableId = Convert.ToInt32(row["PurchaseReturnTaxableId"].ToString());
                    TModels.Acc_Desc = row["Acc_Description"].ToString();
                    oList.Add(TModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult ReminderInsertandUpdate(ReminderModel ReminderModel)
        {
            ReminderModel obj = new ReminderModel();
            List<ReminderModel> oList = new List<ReminderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ReminderInsertandUpdate(ReminderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReminderModel RModels = new ReminderModel();
                    RModels.Status = row["Status"].ToString();
                    oList.Add(RModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult ReminderGetandGets(ReminderModel ReminderModel)
        {
            ReminderModel obj = new ReminderModel();

            List<ReminderModel> oList = new List<ReminderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ReminderGetandGets(ReminderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReminderModel RModels = new ReminderModel();
                    RModels.ReminderId = Convert.ToInt32(row["ReminderId"].ToString());
                    RModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    RModels.TaskId = row["TaskId"].ToString();
                    RModels.UserName = row["UserName"].ToString();
                    RModels.Date = row["Date"].ToString();
                    RModels.Time = row["Time"].ToString();
                    RModels.Subject = row["Subject"].ToString();
                    RModels.TaskStatus = row["TaskStatus"].ToString();
                    RModels.ReminderMessage = row["ReminderMessage"].ToString();
                    oList.Add(RModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ProjectJobInsertandUpdate(ProjectJobModel ProjectJobModel)
        {
            ProjectJobModel obj = new ProjectJobModel();
            List<ProjectJobModel> oList = new List<ProjectJobModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProjectJobInsertandUpdate(ProjectJobModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProjectJobModel PJModels = new ProjectJobModel();
                    PJModels.Status = row["Status"].ToString();
                    PJModels.ProjectJobId = Convert.ToInt32(row["ProjectJobId"].ToString());
                    oList.Add(PJModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ProjectJobGetandGets(ProjectJobModel ProjectJobModel)
        {
            ProjectJobModel obj = new ProjectJobModel();

            List<ProjectJobModel> oList = new List<ProjectJobModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProjectJobGetandGets(ProjectJobModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProjectJobModel PJModels = new ProjectJobModel();
                    PJModels.ProjectJobId = Convert.ToInt32(row["ProjectJobId"].ToString());
                    PJModels.JobCode = row["JobCode"].ToString();
                    PJModels.Description = row["Description"].ToString();
                    PJModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    PJModels.CustName = row["CustName"].ToString();
                    PJModels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    PJModels.Id = Convert.ToInt32(row["Id"].ToString());
                    PJModels.FirstName = row["FirstName"].ToString();
                    PJModels.JobNature = row["JobNature"].ToString();
                    PJModels.LPO = row["LPO"].ToString();
                    PJModels.StartDate = row["StartDate"].ToString();
                    PJModels.EndDate = row["EndDate"].ToString();
                    PJModels.JobGroup = row["JobGroup"].ToString();
                    PJModels.Address1 = row["Address1"].ToString();
                    PJModels.Address2 = row["Address2"].ToString();
                    PJModels.Address3 = row["Address3"].ToString();
                    PJModels.BOQ = row["BOQ"].ToString();
                    PJModels.JobStatus = row["JobStatus"].ToString();
                    PJModels.JobDetails = row["JobDetails"].ToString();
                    PJModels.RetensionAccount = row["RetensionAccount"].ToString();
                    PJModels.Status = row["Status"].ToString();
                    oList.Add(PJModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult MultiPriceInsertandUpdate(MultiPriceModel MultiPriceModel)
        {
            MultiPriceModel obj = new MultiPriceModel();
            List<MultiPriceModel> oList = new List<MultiPriceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MultiPriceInsertandUpdate(MultiPriceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MultiPriceModel MPModels = new MultiPriceModel();
                    MPModels.Status = row["Status"].ToString();
                    MPModels.MultiPriceId = Convert.ToInt32(row["MultiPriceId"].ToString());
                    oList.Add(MPModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult MultiPriceGetandGets(MultiPriceModel MutiPriceModel)
        {
            MultiPriceModel obj = new MultiPriceModel();

            List<MultiPriceModel> oList = new List<MultiPriceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MultiPriceGetandGets(MutiPriceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MultiPriceModel MPModels = new MultiPriceModel();
                    MPModels.MultiPriceId = Convert.ToInt32(row["MultiPriceId"].ToString());
                    MPModels.PriceType = row["PriceType"].ToString();
                    MPModels.Description = row["Description"].ToString();
                    oList.Add(MPModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        [HttpPost]
        public ActionResult UsersInsertandUpdate(UsersModel UsersModel)
        {
            UsersModel obj = new UsersModel();
            List<UsersModel> oList = new List<UsersModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UsersInsertandUpdate(UsersModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UsersModel LModels = new UsersModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.UserId = Convert.ToInt32(row["UserId"].ToString());
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
        public ActionResult UsersGetandGets(UsersModel UsersModel)
        {
            UsersModel obj = new UsersModel();

            List<UsersModel> oList = new List<UsersModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UsersGetandGets(UsersModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UsersModel LModels = new UsersModel();
                    LModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    LModels.Name = row["Name"].ToString();
                    LModels.UserName = row["UserName"].ToString();
                    LModels.Password = row["Password"].ToString();
                    LModels.DivId = Convert.ToInt32(row["DivId"].ToString());
                    LModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    LModels.DepartmentName = row["DepartmentName"].ToString();
                    LModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    LModels.LocationName = row["LocationName"].ToString();
                    LModels.Email = row["Email"].ToString();
                    LModels.DefaultLoc = Convert.ToInt32(row["DefaultLoc"].ToString());
                    LModels.DefaultDep = Convert.ToInt32(row["DefaultDep"].ToString());
                    LModels.DiscountPercent = Convert.ToDecimal(row["DiscountPercent"].ToString());
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
        public void UploadUserImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/User/Image"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
                //  strFileName = ProductId + ".png";
            }
        }
        [HttpPost]
        public void UploadUserSignature()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/User/Signature"), strImageName + ".png");
                Request.Files[upload].SaveAs(path1);
                //  strFileName = ProductId + ".png";
            }
        }

        [HttpPost]
        public ActionResult VoucherTypeInsertandUpdate(VoucherTypeModel MutiPriceModel)
        {
            VoucherTypeModel obj = new VoucherTypeModel();
            List<VoucherTypeModel> oList = new List<VoucherTypeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherTypeInsertandUpdate(MutiPriceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherTypeModel VTModels = new VoucherTypeModel();
                    VTModels.Status = row["Status"].ToString();
                    VTModels.VoucherTypeId = Convert.ToInt32(row["VoucherTypeId"].ToString());
                    oList.Add(VTModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult VoucherTypeGetandGets(VoucherTypeModel VoucherTypeModel)
        {
            VoucherTypeModel obj = new VoucherTypeModel();

            List<VoucherTypeModel> oList = new List<VoucherTypeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherTypeGetandGets(VoucherTypeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherTypeModel VTModels = new VoucherTypeModel();
                    VTModels.VoucherTypeId = Convert.ToInt32(row["VoucherTypeId"].ToString());
                    VTModels.Prefix = row["Prefix"].ToString();
                    VTModels.Description = row["Description"].ToString();
                    oList.Add(VTModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EmployeeDocumentInsert(List<PassportModel> PassportModel)
        {
            PassportModel obj = new PassportModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PassportModel> oList = new List<PassportModel>();

            try
            {
                string[] tmpTable = new string[14];
                tmpTable[0] = "EmpId";
                tmpTable[1] = "PassportNo";
                tmpTable[2] = "Country";
                tmpTable[3] = "PassportIssued";
                tmpTable[4] = "PassportExpiry";
                tmpTable[5] = "Remarks";
                tmpTable[6] = "Type";
                tmpTable[7] = "DelFlag";
                tmpTable[8] = "Name";
                tmpTable[9] = "EmpCode";
                tmpTable[10] = "InsuranceCompanyId";
                tmpTable[11] = "IncrementFrom";
                tmpTable[12] = "IncrementType";
                tmpTable[13] = "IncrementAmount";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in PassportModel)
                {
                    obj.EmpId = details.EmpId;
                    obj.PassportNo = details.PassportNo;
                    obj.Country = details.Country;
                    obj.PassportIssued = details.PassportIssued;
                    obj.PassportExpiry = details.PassportExpiry;
                    obj.Remarks = details.Remarks;
                    obj.Type = details.Type;
                    obj.DelFlag = details.DelFlag;
                    obj.Name = details.Name;
                    obj.EmpCode = details.EmpCode;
                    obj.InsuranceCompanyId = details.InsuranceCompanyId;
                    obj.IncrementFrom = details.IncrementFrom;
                    obj.IncrementType = details.IncrementType;
                    obj.IncrementAmount = details.IncrementAmount;

                    dt.Rows.Add
                    (obj.EmpId, obj.PassportNo, obj.Country, obj.PassportIssued, obj.PassportExpiry, obj.Remarks, obj.Type, obj.DelFlag, obj.Name, obj.EmpCode, obj.InsuranceCompanyId, obj.IncrementFrom, obj.IncrementType, obj.IncrementAmount);
                }

                dsDataSet = obj.EmployeeDocumentInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PassportModel MModels = new PassportModel();
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
        public ActionResult CustomerOrSupplierSearch(CustomerMaster CustomerMaster)
        {
            CustomerMaster obj = new CustomerMaster();

            List<CustomerMaster> oList = new List<CustomerMaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerOrSupplierSearch(CustomerMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerMaster MModels = new CustomerMaster();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.AccountType = Convert.ToInt32(row["AccountType"].ToString());
                    MModels.CustAccount = row["CustAccount"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.OpenBalance = Convert.ToDecimal(row["OpenBalance"].ToString());
                    MModels.DueDays = Convert.ToInt32(row["DueDays"].ToString());
                    MModels.CreditLimit = Convert.ToDecimal(row["CreditLimit"].ToString());
                    MModels.CustTermsId = Convert.ToInt32(row["CustTermsId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CustTerms = Convert.ToInt32(row["Terms"].ToString());
                    MModels.TRNNumber = row["TRNNumber"].ToString();
                    MModels.SalesmanId = Convert.ToInt32(row["SalesmanId"].ToString());
                    MModels.PriceGroupId = Convert.ToInt32(row["PriceGroupId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyType = row["CurrencyName"].ToString();
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
                    MModels.CustType = row["CustType"].ToString();
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.PriceGroupId = Convert.ToInt32(row["PriceGroupId"].ToString());
                    MModels.EmailId = row["ContactEmailId"].ToString();
                    MModels.licenseNo = row["Cust_LicenseNo"].ToString();
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
        public ActionResult AccountScheduleSearch(AccountSchedule AccountSchedule)
        {
            AccountSchedule obj = new AccountSchedule();

            List<AccountSchedule> oList = new List<AccountSchedule>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountScheduleSearch(AccountSchedule, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AccountSchedule ASModels = new AccountSchedule();
                    ASModels.AcntId = Convert.ToInt32(row["AcntId"].ToString());
                    ASModels.AccountCode = row["AcntCode"].ToString();
                    ASModels.AcntDescription = row["AcntDescription"].ToString();
                    ASModels.SCHType = row["SchType"].ToString();
                    oList.Add(ASModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult TermsInsertandUpdate(TermsModel TermsModel)
        {
            TermsModel obj = new TermsModel();
            List<TermsModel> oList = new List<TermsModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TermsInsertandUpdate(TermsModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TermsModel MModels = new TermsModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.TermsId = Convert.ToInt32(row["TmId"].ToString());
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
        public ActionResult TermsGetandGets(TermsModel TermsModel)
        {
            TermsModel obj = new TermsModel();

            List<TermsModel> oList = new List<TermsModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TermsGetandGets(TermsModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TermsModel MModels = new TermsModel();
                    MModels.TermsId = Convert.ToInt32(row["TermsId"].ToString());
                    MModels.Terms = Convert.ToInt32(row["Terms"].ToString());
                    MModels.TermsDescription = row["TermDescription"].ToString();
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
        public ActionResult JobCodeSearch(ProjectJobModel ProjectJobModel)
        {
            ProjectJobModel obj = new ProjectJobModel();

            List<ProjectJobModel> oList = new List<ProjectJobModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.JobCodeSearch(ProjectJobModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProjectJobModel PJModels = new ProjectJobModel();
                    PJModels.ProjectJobId = Convert.ToInt32(row["ProjectJobId"].ToString());
                    PJModels.JobCode = row["JobCode"].ToString();
                    PJModels.Description = row["Description"].ToString();
                    PJModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    PJModels.CustName = row["CustName"].ToString();
                    PJModels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    PJModels.LPO = row["LPO"].ToString();
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
        public ActionResult AssetRegisterSearch(AssetRegisterModel AssetRegisterModel)
        {
            AssetRegisterModel obj = new AssetRegisterModel();

            List<AssetRegisterModel> oList = new List<AssetRegisterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AssetRegisterSearch(AssetRegisterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AssetRegisterModel PJModels = new AssetRegisterModel();
                    PJModels.AssetId = Convert.ToInt32(row["AssetId"].ToString());
                    PJModels.Code = row["Code"].ToString();
                    PJModels.Description = row["Description"].ToString();
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
        public ActionResult UserSearch(UsersModel UsersModel)
        {
            UsersModel obj = new UsersModel();

            List<UsersModel> oList = new List<UsersModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UserSearch(UsersModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UsersModel PJModels = new UsersModel();
                    PJModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    PJModels.UserName = row["Name"].ToString();
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
        public ActionResult UserSearchInUserMenuSettings(UserMenuSettingsModel UsersModel)
        {
            UserMenuSettingsModel obj = new UserMenuSettingsModel();

            List<UserMenuSettingsModel> oList = new List<UserMenuSettingsModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UserSearchInUserMenuSettings(UsersModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UserMenuSettingsModel PJModels = new UserMenuSettingsModel();
                    PJModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    PJModels.UserName = row["Name"].ToString();
                    PJModels.UserRole = row["UserRole"].ToString();
                    PJModels.MenuCode = row["UserMenu"].ToString();
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
        public ActionResult UserMenuSearch(UserMenuSettingsModel UserMenuSettingsModel)
        {
            UserMenuSettingsModel obj = new UserMenuSettingsModel();

            List<UserMenuSettingsModel> oList = new List<UserMenuSettingsModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = UserMenuSettingsModel.UserMenuSearch(UserMenuSettingsModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UserMenuSettingsModel LModels = new UserMenuSettingsModel();
                    LModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    LModels.UserName = row["Name"].ToString();
                    LModels.UserRole = row["UserRole"].ToString();
                    LModels.MenuCode = row["UserMenu"].ToString();
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
        public ActionResult AccountTypeGetandGets(AccountTypeModel AccountTypeModel)
        {
            AccountTypeModel obj = new AccountTypeModel();

            List<AccountTypeModel> oList = new List<AccountTypeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountTypeGetandGets(AccountTypeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AccountTypeModel LModels = new AccountTypeModel();
                    LModels.AccountTypeId = Convert.ToInt32(row["Acc_Id"].ToString());
                    LModels.AccountTypeCode = row["Acc_Code"].ToString();
                    LModels.AccountTypeName = row["Acc_Description"].ToString();
                    LModels.Id = Convert.ToInt32(row["ID"].ToString());
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
        public ActionResult TreeViewGets(int AreaGrpId)
        {
            try
            {
                var oList = ABAccountSchedule.GetTreeViews(dbName);
                return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
                throw ex;
            }
        }



        [HttpPost]
        public ActionResult AccountHeadGetandGets(AccountSchedule Accschedule)
        {
            AccountSchedule obj = new AccountSchedule();
            List<AccountSchedule> oList = new List<AccountSchedule>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountHeadGetandGets(Accschedule, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AccountSchedule MModels = new AccountSchedule();
                    MModels.AcntId = Convert.ToInt64(row["Acc_Id"].ToString());
                    MModels.AcntCode = Convert.ToInt64(row["Acc_Code"].ToString());
                    MModels.AcntDescription = row["Acc_Description"].ToString();
                    MModels.Narration = row["Acc_Narration"].ToString();
                    MModels.Opening = Convert.ToDecimal(row["Acob"].ToString());
                    MModels.schedul = row["schedule"].ToString();
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
        public ActionResult AccountHeadGetandGetsMaster(AccountSchedule Accschedule)
        {
            AccountSchedule obj = new AccountSchedule();
            List<AccountSchedule> oList = new List<AccountSchedule>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountHeadGetandGetsMaster(Accschedule, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AccountSchedule MModels = new AccountSchedule();
                    MModels.AcntId = Convert.ToInt64(row["Acc_Id"].ToString());
                    MModels.AcntCode = Convert.ToInt64(row["Acc_Code"].ToString());
                    MModels.AcntDescription = row["Acc_Description"].ToString();
                    MModels.Narration = row["Acc_Narration"].ToString();
                    MModels.Opening = Convert.ToDecimal(row["Acob"].ToString());
                    MModels.schedul = row["schedule"].ToString();
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
        public ActionResult AccountHeadGetAccountTransaction(AccountSchedule Accschedule)
        {
            AccountSchedule obj = new AccountSchedule();
            List<AccountSchedule> oList = new List<AccountSchedule>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountHeadGetAccountTransaction(Accschedule, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AccountSchedule MModels = new AccountSchedule();
                    MModels.AcntId = Convert.ToInt64(row["AccId"].ToString());
                    MModels.AcntCode = Convert.ToInt64(row["AccCode"].ToString());
                    MModels.Description = row["VDescription"].ToString();
                    MModels.Type = row["VType"].ToString();
                    MModels.Date = row["VDate"].ToString();
                    MModels.CurrencyId = row["CurrencyId"].ToString();
                    MModels.Currency = row["CurrencyName"].ToString();
                    MModels.Rate = row["CurrencyRate"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.ReferanceNo = row["ReferenceNo"].ToString();
                    MModels.ProductId = Convert.ToInt64(row["ProductId"].ToString());
                    MModels.ProductName = row["ProductName"].ToString();
                    MModels.FlagOP = Convert.ToInt32(row["Flag"].ToString());
                    MModels.BillSerId = Convert.ToInt32(row["BillSerId"].ToString());
                    oList.Add(MModels);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        //[HttpPost]
        //public ActionResult AccountHeadInsertandUpdate(AccountSchedule Accschedule)
        //{
        //    AccountSchedule obj = new AccountSchedule();
        //    List<AccountSchedule> oList = new List<AccountSchedule>();
        //    try
        //    {
        //        DataSet dsDataSet = new DataSet();
        //        dsDataSet = obj.AccountHeadInsertandUpdate(Accschedule, dbName);
        //        foreach (DataRow row in dsDataSet.Tables[0].Rows)
        //        {
        //            AccountSchedule MModels = new AccountSchedule();
        //            MModels.Flag = row["Flag"].ToString();
        //            MModels.AcntCode = Convert.ToInt64(row["Acccode"].ToString());
        //            oList.Add(MModels);

        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
        //    }

        //    return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        //}

        [HttpPost]
        public JsonResult AccountHeadInsertandUpdate(List<AccountSchedule> AccountSchedule)
        {
            AccountSchedule obj = new AccountSchedule();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<AccountSchedule> oList = new List<AccountSchedule>();

            try
            {
                string[] tmpTable = new string[23];
                tmpTable[0] = "AcntDescription";
                tmpTable[1] = "Narration";
                tmpTable[2] = "AcntCode";
                tmpTable[3] = "Opening";
                tmpTable[4] = "ScheduleId";
                tmpTable[5] = "AcntId";
                tmpTable[6] = "DelFlag";
                tmpTable[7] = "UserId";
                tmpTable[8] = "DeptId";
                tmpTable[9] = "SCHType";
                tmpTable[10] = "Type";
                tmpTable[11] = "Description";
                tmpTable[12] = "Currency";
                tmpTable[13] = "Rate";
                tmpTable[14] = "Amount";
                tmpTable[15] = "Date";
                tmpTable[16] = "ReferanceNo";
                tmpTable[17] = "ProductId";
                tmpTable[18] = "ProductName";
                tmpTable[19] = "BillSerId";
                tmpTable[20] = "NewAccCode";
                tmpTable[21] = "Variable1";
                tmpTable[22] = "Variable2";


                dt = Common.CreateTable(tmpTable);

                foreach (var details in AccountSchedule)
                {
                    obj.AcntDescription = details.AcntDescription;
                    obj.Narration = details.Narration;
                    obj.AcntCode = details.AcntCode;
                    obj.Opening = details.Opening;
                    obj.ScheduleId = details.ScheduleId;
                    obj.AcntId = details.AcntId;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.SCHType = details.SCHType;
                    obj.Type = details.Type;
                    obj.Description = details.Description;
                    obj.Currency = details.Currency;
                    obj.Rate = details.Rate;
                    obj.Amount = details.Amount;
                    obj.Date = details.Date;
                    obj.ReferanceNo = details.ReferanceNo;
                    obj.ProductId = details.ProductId;
                    obj.ProductName = details.ProductName;
                    obj.BillSerId = details.BillSerId;
                    obj.NewAccCode = details.NewAccCode;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;


                    dt.Rows.Add(obj.AcntDescription, obj.Narration, obj.AcntCode, obj.Opening, obj.ScheduleId, obj.AcntId,
                    obj.DelFlag, obj.UserId, obj.DeptId, obj.SCHType, obj.Type, obj.Description,
                    obj.Currency, obj.Rate, obj.Amount, obj.Date, obj.ReferanceNo, obj.ProductId,
                    obj.ProductName, obj.BillSerId, obj.NewAccCode, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.AccountHeadInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AccountSchedule MModels = new AccountSchedule();

                    MModels.Flag = row["Flag"].ToString();
                    MModels.AcntCode = Convert.ToInt64(row["Acccode"].ToString());
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
        public ActionResult AccountScheduleInsertandUpdate(AccountSchedule Accschedule)
        {
            AccountSchedule obj = new AccountSchedule();
            List<AccountSchedule> oList = new List<AccountSchedule>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountScheduleInsertandUpdate(Accschedule, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AccountSchedule MModels = new AccountSchedule();
                    MModels.Flag = row["Flag"].ToString();
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

        public ActionResult EmployeeSearch(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();

            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmployeeSearch(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel MModels = new EmployeeModel();
                    MModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.Name = row["Name"].ToString();
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

        public ActionResult EmpAutoComplete(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();

            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmpAutoComplete(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel MModels = new EmployeeModel();
                    MModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.Name = row["Name"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult ToolsAutocomplete(CategoryModel CategoryModel)
        {
            CategoryModel obj = new CategoryModel();

            List<CategoryModel> oList = new List<CategoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ToolsAutocomplete(CategoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CategoryModel MModels = new CategoryModel();
                    MModels.ToolId = Convert.ToInt32(row["ToolId"].ToString());
                    MModels.Code = row["ToolCode"].ToString();
                    MModels.Pcs = Convert.ToInt32(row["Pcs"].ToString());
                    MModels.ToolDesc = row["ToolDescription"].ToString();
                    MModels.ToolQty = Convert.ToInt32(row["ToolQty"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
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
        public ActionResult WorkingHoursGetandGets(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();

            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WorkingHoursGetandGets(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel LModels = new EmployeeModel();
                    LModels.WorkingHoursId = Convert.ToInt32(row["WorkingHoursId"].ToString());
                    LModels.WorkingHours = row["WorkingHours"].ToString();

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
        public ActionResult WorkingHoursInsertandUpdate(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();
            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WorkingHoursInsertandUpdate(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel MModels = new EmployeeModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.WorkingHoursId = Convert.ToInt32(row["WorkingHoursId"].ToString());
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
        public ActionResult IncrementTypeInsertandUpdate(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();
            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IncrementTypeInsertandUpdate(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel MModels = new EmployeeModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.IncrementId = Convert.ToInt32(row["IncTypeId"].ToString());
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
        public ActionResult InsuranceCompanyInsertandUpdate(InsuranceCompanyModel InsuranceCompanyModel)
        {
            InsuranceCompanyModel obj = new InsuranceCompanyModel();
            List<InsuranceCompanyModel> oList = new List<InsuranceCompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.InsuranceCompanyInsertandUpdate(InsuranceCompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InsuranceCompanyModel EDModels = new InsuranceCompanyModel();
                    EDModels.Status = row["Status"].ToString();
                    oList.Add(EDModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        
             [HttpPost]
        public ActionResult InsuranceCompanymasterGetandGets(InsuranceCompanyModel InsuranceCompanyModel)
        {
            InsuranceCompanyModel obj = new InsuranceCompanyModel();

            List<InsuranceCompanyModel> oList = new List<InsuranceCompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.InsuranceCompanymasterGetandGets(InsuranceCompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InsuranceCompanyModel EDModels = new InsuranceCompanyModel();
                    EDModels.InsuranceCompanyId = Convert.ToInt32(row["InsuranceCompanyId"].ToString());
                    EDModels.InsuranceCompanyName = row["InsuranceCompanyName"].ToString();
                    EDModels.InsuranceCompanyCode = row["InsuranceCompanyCode"].ToString();
                    EDModels.InsuranceCompanyDescription = row["InsuranceCompanyDescription"].ToString();
                    EDModels.Benefits = row["Benefits"].ToString();
                    oList.Add(EDModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }





        [HttpPost]
        public ActionResult InsuranceCompanyGetandGets(InsuranceCompanyModel InsuranceCompanyModel)
        {
            InsuranceCompanyModel obj = new InsuranceCompanyModel();

            List<InsuranceCompanyModel> oList = new List<InsuranceCompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.InsuranceCompanyGetandGets(InsuranceCompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InsuranceCompanyModel EDModels = new InsuranceCompanyModel();
                    EDModels.InsuranceCompanyId = Convert.ToInt32(row["InsuranceCompanyId"].ToString());
                    EDModels.InsuranceCompanyName = row["InsuranceCompanyName"].ToString();
                    EDModels.InsuranceCompanyCode = row["InsuranceCompanyCode"].ToString();
                    EDModels.InsuranceCompanyDescription = row["InsuranceCompanyDescription"].ToString();
                    EDModels.Benefits = row["Benefits"].ToString();
                    oList.Add(EDModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult PurchaseCorrectionReport(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseCorrectionReport(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    
                    PharmacyModel Reptmodels = new PharmacyModel();
                    Reptmodels.InvId = Convert.ToInt32(row["PCId"].ToString());
                    Reptmodels.ShipDate = row["PC_Date"].ToString();
                    Reptmodels.PO_No = row["O_Batch"].ToString();
                    Reptmodels.MRV_No = row["N_Batch"].ToString();
                    Reptmodels.Variable2 = row["O_Expiry"].ToString();
                    Reptmodels.Expiry = row["N_Expiry"].ToString();
                    Reptmodels.SellingRate = Convert.ToDecimal(row["O_SellPrice"].ToString());
                    Reptmodels.Margin = Convert.ToDecimal(row["N_SellPrice"].ToString());
                    Reptmodels.MRP = Convert.ToDecimal(row["O_MRP"].ToString());
                    Reptmodels.BaseTotal = Convert.ToDecimal(row["N_MRP"].ToString());
                    Reptmodels.InvoDate = row["StockType"].ToString();
                    Reptmodels.FCGST_5 = Convert.ToDecimal(row["O_Quantity"].ToString());
                    Reptmodels.FCGST_0 = Convert.ToDecimal(row["N_Quantity"].ToString());
                    Reptmodels.Variable1 = row["Reasons"].ToString();
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
        public ActionResult LogReport(LogModel LogModel)
        {
            LogModel obj = new LogModel();

            List<LogModel> oList = new List<LogModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LogReport(LogModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LogModel Reptmodels = new LogModel();
                    Reptmodels.UserId = row["User_Id"].ToString();
                    Reptmodels.User = row["Name"].ToString();
                    Reptmodels.Operation = row["Operation"].ToString();
                    Reptmodels.Decription = row["Description"].ToString();
                    Reptmodels.DeptId = row["DeptId"].ToString();
                    Reptmodels.Dept = row["DepartmentName"].ToString();
                    Reptmodels.EntryDate = row["EntryDate"].ToString();
                    Reptmodels.OldAmount = row["OldAmount"].ToString();
                    Reptmodels.NewAmount = row["NewAmount"].ToString();
                    Reptmodels.EntryTime = row["EntryTime"].ToString();
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
        public ActionResult LabBillReport(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LabBillReport(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    LabBill Reptmodels = new LabBill();
                    Reptmodels.BillMainId = Convert.ToInt32(row["BillMainId"].ToString());
                    Reptmodels.BillDate = row["BillDate"].ToString();
                    Reptmodels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    Reptmodels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Reptmodels.IpNo = Convert.ToInt32(row["IpNo"].ToString());
                    Reptmodels.Name = row["Name"].ToString();
                    Reptmodels.Hospital = row["Doctor"].ToString();
                    Reptmodels.Department = row["PayType"].ToString();
                    Reptmodels.Doctor = Convert.ToInt32(row["DocId"].ToString());
                    Reptmodels.DiscAmt = Convert.ToDecimal(row["DiscAmt"].ToString());
                    Reptmodels.TotalAmt = Convert.ToDecimal(row["NetAmt"].ToString());
                    Reptmodels.NetAmt = Convert.ToDecimal(row["TotalAmt"].ToString());
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
        public ActionResult IPAdvancebillstatus(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IPAdvancebillstatus(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                  
                     LabBill Reptmodels = new LabBill();
                    Reptmodels.BillMainId = Convert.ToInt32(row["BillMainId"].ToString());
                    Reptmodels.BillDate = row["BillDate"].ToString();
                    Reptmodels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    Reptmodels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Reptmodels.IpNo = Convert.ToInt32(row["IpNo"].ToString());
                    Reptmodels.Name = row["Name"].ToString();
                    Reptmodels.Hospital = row["Doctor"].ToString();
                    Reptmodels.Department = row["PayType"].ToString();
                    Reptmodels.Doctor = Convert.ToInt32(row["DocId"].ToString());
                    Reptmodels.DiscAmt = Convert.ToDecimal(row["DiscAmt"].ToString());
                    Reptmodels.TotalAmt = Convert.ToDecimal(row["NetAmt"].ToString()); 
                    Reptmodels.NetAmt = Convert.ToDecimal(row["TotalAmt"].ToString());
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
        public ActionResult ProcedureBillReportItemWise(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProcedureBillReportItemWise(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    LabBill Reptmodels = new LabBill();
                    Reptmodels.BillMainId = Convert.ToInt32(row["BillMainId"].ToString());
                    Reptmodels.BillDate = row["BillDate"].ToString();
                    Reptmodels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    Reptmodels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Reptmodels.IpNo = Convert.ToInt32(row["IpNo"].ToString());
                    Reptmodels.Name = row["Name"].ToString();
                    Reptmodels.Hospital = row["Doctor"].ToString();
                    Reptmodels.Department = row["PayType"].ToString();
                    Reptmodels.Doctor = Convert.ToInt32(row["DocId"].ToString());
                    Reptmodels.DiscAmt = Convert.ToDecimal(row["DiscAmt"].ToString());
                    Reptmodels.TotalAmt = Convert.ToDecimal(row["NetAmt"].ToString());
                    Reptmodels.NetAmt = Convert.ToDecimal(row["TotalAmt"].ToString());
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
        public ActionResult ProcedureBillReport(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProcedureBillReport(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    LabBill Reptmodels = new LabBill();
                    Reptmodels.BillMainId = Convert.ToInt32(row["BillMainId"].ToString());
                    Reptmodels.BillDate = row["BillDate"].ToString();
                    Reptmodels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    Reptmodels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Reptmodels.IpNo = Convert.ToInt32(row["IpNo"].ToString());
                    Reptmodels.Name = row["Name"].ToString();
                    Reptmodels.Hospital = row["Doctor"].ToString();
                    Reptmodels.Department = row["PayType"].ToString();
                    Reptmodels.Doctor = Convert.ToInt32(row["DocId"].ToString());
                    Reptmodels.DiscAmt = Convert.ToDecimal(row["DiscAmt"].ToString());
                    Reptmodels.TotalAmt = Convert.ToDecimal(row["NetAmt"].ToString());
                    Reptmodels.NetAmt = Convert.ToDecimal(row["TotalAmt"].ToString());
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
        public ActionResult UserMenuUpdate(UserMenuSettingsModel oUserMenuSettingsModel)
        {
            UserMenuSettingsModel obj = new UserMenuSettingsModel();
            List<UserMenuSettingsModel> oList = new List<UserMenuSettingsModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UserMenuUpdate(oUserMenuSettingsModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UserMenuSettingsModel MModels = new UserMenuSettingsModel();
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
        public JsonResult ItemImportInsertandUpdate(List<ItemMasterModel> ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();

            try
            {
                string[] tmpTable = new string[40];
                tmpTable[0] = "ItemCode";
                tmpTable[1] = "Description";
                tmpTable[2] = "Unit";
                tmpTable[3] = "SellingPrice";
                tmpTable[4] = "Group";
                tmpTable[5] = "SubGroup";
                tmpTable[6] = "Category";
                tmpTable[7] = "SubCategory";
                tmpTable[8] = "OpeningQty";
                tmpTable[9] = "OpeningCost";

                tmpTable[10] = "LPCost";
                tmpTable[11] = "VatPer";
                tmpTable[12] = "Model1";
                tmpTable[13] = "Model2";
                tmpTable[14] = "Model3";
                tmpTable[15] = "MaxQty";
                tmpTable[16] = "MinQty";
                tmpTable[17] = "Bin_A";
                tmpTable[18] = "Bin_B";
                tmpTable[19] = "Bin_C";

                tmpTable[20] = "Bin_D";
                tmpTable[21] = "Bin_E";
                tmpTable[22] = "Bin_F";
                tmpTable[23] = "Bin_G";
                tmpTable[24] = "Bin_H";
                tmpTable[25] = "Size";
                tmpTable[26] = "Weight";
                tmpTable[27] = "Length";
                tmpTable[28] = "Width";
                tmpTable[29] = "Thickness";

                tmpTable[30] = "Density";
                tmpTable[31] = "Specification";
                tmpTable[32] = "AvgCost";
                tmpTable[33] = "Hsncode";
                tmpTable[34] = "MRP";
                tmpTable[35] = "SellingPrice1";
                tmpTable[36] = "SellingPrice2";
                tmpTable[37] = "Otherdescription";
                tmpTable[38] = "UserId";
                tmpTable[39] = "DeptId";



                dt = Common.CreateTable(tmpTable);

                foreach (var details in ItemMasterModel)
                {
                    obj.ItemCode = details.ItemCode;
                    obj.Description = details.Description;
                    obj.Unit = details.Unit;
                    obj.SellingPrice = details.SellingPrice;
                    obj.Group = details.Group;
                    obj.SubGroup = details.SubGroup;
                    obj.Category = details.Category;
                    obj.SubCategory = details.SubCategory;
                    obj.OpeningQty = details.OpeningQty;
                    obj.OpeningCost = details.OpeningCost;

                    obj.LPCost = details.LPCost;
                    obj.VatPer = details.VatPer;
                    obj.Model1 = details.Model1;
                    obj.Model2 = details.Model2;
                    obj.Model3 = details.Model3;
                    obj.MaxQty = details.MaxQty;
                    obj.MinQty = details.MinQty;
                    obj.Bin_A = details.Bin_A;
                    obj.Bin_B = details.Bin_B;
                    obj.Bin_C = details.Bin_C;

                    obj.Bin_D = details.Bin_D;
                    obj.Bin_E = details.Bin_E;
                    obj.Bin_F = details.Bin_F;
                    obj.Bin_G = details.Bin_G;
                    obj.Bin_H = details.Bin_H;
                    obj.Size = details.Size;
                    obj.Weight = details.Weight;
                    obj.Length = details.Length;
                    obj.Width = details.Width;
                    obj.Thickness = details.Thickness;

                    obj.Density = details.Density;
                    obj.Specification = details.Specification;
                    obj.AvgCost = details.AvgCost;
                    obj.Hsncode = details.Hsncode;
                    obj.MRP = details.MRP;
                    obj.SellingPrice1 = details.SellingPrice1;
                    obj.SellingPrice2 = details.SellingPrice2;
                    obj.Otherdescription = details.Otherdescription;

                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;

                    dt.Rows.Add
                    (obj.ItemCode, obj.Description, obj.Unit, obj.SellingPrice, obj.Group, obj.SubGroup, obj.Category, obj.SubCategory, obj.OpeningQty, obj.OpeningCost, obj.LPCost,
                     obj.VatPer, obj.Model1, obj.Model2, obj.Model3, obj.MaxQty, obj.MinQty, obj.Bin_A, obj.Bin_B, obj.Bin_C, obj.Bin_D, obj.Bin_E, obj.Bin_F, obj.Bin_G, obj.Bin_H, obj.Size,
                     obj.Weight, obj.Length, obj.Width, obj.Thickness, obj.Density, obj.Specification, obj.AvgCost, obj.Hsncode, obj.MRP, obj.SellingPrice1, obj.SellingPrice2, obj.Otherdescription,
                     obj.UserId, obj.DeptId);
                }

                dsDataSet = obj.ItemImportInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Expopup(PassportModel Model)
        {
            PassportModel obj = new PassportModel();

            List<PassportModel> oList = new List<PassportModel>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Expirypopup(Model, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PassportModel LModels = new PassportModel();
                    LModels.PassportIssued = row["IssuedOn"].ToString();
                    LModels.PassportExpiry = row["Expiry"].ToString();
                    LModels.Type = row["Type"].ToString();
                    LModels.IDType = row["IDType"].ToString();
                    LModels.Name = row["Name"].ToString();



                    //LModels.DeptId = Convert.ToInt32(row["DepartmentId"].ToString());
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
        public ActionResult ItemModelCheck(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemModelCheck(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.Model1 = row["Model1"].ToString();
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
        public JsonResult SupplierItemInsert(List<ProductMstModel> ProductMstModel)
        {
            ProductMstModel obj = new ProductMstModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ProductMstModel> oList = new List<ProductMstModel>();

            try
            {
                string[] tmpTable = new string[2];
                tmpTable[0] = "SupplierId";
                tmpTable[1] = "ItemId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ProductMstModel)
                {
                    obj.SupplierId = details.SupplierId;
                    obj.ItemId = details.ItemId;

                    dt.Rows.Add(obj.SupplierId, obj.ItemId);
                }

                dsDataSet = obj.SupplierItemInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductMstModel MModels = new ProductMstModel();
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
        public ActionResult HMS_RegistrationInsertandUpdatefromcasesheet(RegistrationModel RegistrationModel)
        {
            RegistrationModel obj = new RegistrationModel();
            List<RegistrationModel> oList = new List<RegistrationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RegistrationInsertandUpdatefromcasesheet(RegistrationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RegistrationModel EDModels = new RegistrationModel();
                    EDModels.Status = row["Status"].ToString();
                    EDModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        

             [HttpPost]
        public ActionResult HMS_ScanRegistrationInsertandUpdate(RegistrationModel RegistrationModel)
        {
            RegistrationModel obj = new RegistrationModel();
            List<RegistrationModel> oList = new List<RegistrationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_ScanRegistrationInsertandUpdate(RegistrationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RegistrationModel EDModels = new RegistrationModel();
                    EDModels.Status = row["Status"].ToString();
                    EDModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    EDModels.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    EDModels.RegId = Convert.ToInt32(row["RegId"].ToString());
                    oList.Add(EDModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }





        [HttpPost]
        public ActionResult HMS_RegistrationInsertandUpdate(RegistrationModel RegistrationModel)
        {
            RegistrationModel obj = new RegistrationModel();
            List<RegistrationModel> oList = new List<RegistrationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RegistrationInsertandUpdate(RegistrationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    RegistrationModel EDModels = new RegistrationModel();
                    EDModels.Status = row["Status"].ToString();
                    EDModels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    EDModels.RegSeries = Convert.ToInt32(row["RegSeries"].ToString());
                    EDModels.RegId = Convert.ToInt32(row["RegId"].ToString());
                    EDModels.Revisit_Id = Convert.ToInt32(row["Revid"].ToString());                    
                    oList.Add(EDModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult HMS_RegistrationGetandGets(RegistrationModel RegistrationModel)
        {
            RegistrationModel obj = new RegistrationModel();
            List<RegistrationModel> oList = new List<RegistrationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_RegistrationGetandGets(RegistrationModel, dbName);
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
                    EDModels.Revisit_Id = Convert.ToInt32(row["revId"].ToString());


                    EDModels.Cash = Convert.ToDecimal(row["Cash"].ToString());
                    EDModels.Upi = Convert.ToDecimal(row["Upi"].ToString());
                    EDModels.Card = Convert.ToDecimal(row["Card"].ToString());

                    oList.Add(EDModels);
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
        public void UploadDoctorImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string Exten = Request.Form["Exten"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/DoctorImage/"), strImageName + "." + Exten);
                Request.Files[upload].SaveAs(path1);
                //  strFileName = ProductId + ".png";
            }
        }

        [HttpPost]
        public void UploadPatientImage()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string strImageName = Request.Form["ImageName"];
                string Exten = Request.Form["Exten"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/PatientImage/"), strImageName + "." + Exten);
                Request.Files[upload].SaveAs(path1);
                //  strFileName = ProductId + ".png";
            }
        }
        [HttpPost]
        public ActionResult HMS_OPSeriesGetandGets(BillSeriesModel BillSeriesModel) //Get SerialNo For Sales Invoice
        {
            BillSeriesModel obj = new BillSeriesModel();

            List<BillSeriesModel> oList = new List<BillSeriesModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_OPSeriesGetandGets(BillSeriesModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillSeriesModel MModels = new BillSeriesModel();
                    MModels.id = Convert.ToInt32(row["Id"].ToString());
                    MModels.BillDescription = row["OPDescription"].ToString();
                    MModels.BillType = row["OPType"].ToString();
                    MModels.Prefix = row["Prefix"].ToString();
                    MModels.StartingNo = row["StartingNo"].ToString();
                    MModels.CurrentNo = row["CurrentNo"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
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
        public ActionResult HospitalInsertandUpdate(Hospitalmaster Hospitalmaster)
        {
            Hospitalmaster obj = new Hospitalmaster();
            List<Hospitalmaster> oList = new List<Hospitalmaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HospitalInsertandUpdate(Hospitalmaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Hospitalmaster MModels = new Hospitalmaster();
                    MModels.Status = row["Status"].ToString();
                    MModels.HospitalId = Convert.ToInt32(row["HospitalId"].ToString());
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
        public ActionResult HospitalGetandGets(Hospitalmaster Hospitalmaster)
        {
            Hospitalmaster obj = new Hospitalmaster();

            List<Hospitalmaster> oList = new List<Hospitalmaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HospitalGetandGets(Hospitalmaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Hospitalmaster MModels = new Hospitalmaster();
                    MModels.HospitalId = Convert.ToInt32(row["HospitalId"].ToString());
                    MModels.HospitalName = row["HospitalName"].ToString();
                    MModels.ContactNumber = row["ContactNumber"].ToString();
                    MModels.Address = row["Address"].ToString();
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
        public ActionResult ProcedureInsertandUpdate(proceduremastercs proceduremastercs)
        {
            proceduremastercs obj = new proceduremastercs();
            List<proceduremastercs> oList = new List<proceduremastercs>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProcedureInsertandUpdate(proceduremastercs, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    proceduremastercs MModels = new proceduremastercs();
                    MModels.Status = row["Status"].ToString();
                    MModels.ProcedureId = Convert.ToInt32(row["TmId"].ToString());
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
        public ActionResult ProcedureGetandGets(proceduremastercs proceduremastercs)
        {
            proceduremastercs obj = new proceduremastercs();

            List<proceduremastercs> oList = new List<proceduremastercs>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProcedureGetandGets(proceduremastercs, dbName);
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

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DosageInsertandUpdate(Dosagemaster Dosagemaster)
        {
            Dosagemaster obj = new Dosagemaster();
            List<Dosagemaster> oList = new List<Dosagemaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DosageInsertandUpdate(Dosagemaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Dosagemaster MModels = new Dosagemaster();
                    MModels.Status = row["Status"].ToString();
                    MModels.DosageId = Convert.ToInt32(row["DosageId"].ToString());

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
        public ActionResult DosageGetandGets(Dosagemaster Dosagemaster)
        {
            Dosagemaster obj = new Dosagemaster();

            List<Dosagemaster> oList = new List<Dosagemaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DosageGetandGets(Dosagemaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Dosagemaster MModels = new Dosagemaster();
                    MModels.DosageId = Convert.ToInt32(row["DosageId"].ToString());
                    MModels.DosageCode = row["DosageCode"].ToString();
                    MModels.DosageName = row["DosageName"].ToString();
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
            public ActionResult RoomInsertandUpdate(Roommaster Roommaster)
            {
                Roommaster obj = new Roommaster();
                List<Roommaster> oList = new List<Roommaster>();
                try
                {
                    DataSet dsDataSet = new DataSet();
                    dsDataSet = obj.RoomInsertandUpdate(Roommaster, dbName);
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        Roommaster MModels = new Roommaster();
                        MModels.Status = row["Status"].ToString();
                        MModels.RoomId = Convert.ToInt32(row["RoomId"].ToString());

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
            public ActionResult RoomGetandGets(Roommaster Roommaster)
            {
                Roommaster obj = new Roommaster();

                List<Roommaster> oList = new List<Roommaster>();
                try
                {
                    DataSet dsDataSet = new DataSet();
                    dsDataSet = obj.RoomGetandGets(Roommaster, dbName);
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        Roommaster MModels = new Roommaster();
                        MModels.RoomId = Convert.ToInt32(row["RoomId"].ToString());
                        MModels.RoomCode = row["RoomCode"].ToString();
                        MModels.RoomName = row["RoomName"].ToString();
                        MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                        MModels.Remarks = row["Remarks"].ToString();
                        MModels.Flag = row["Flag"].ToString();
                        MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                        MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                        oList.Add(MModels);
                    }

                }
                catch (Exception ex)
                {
                    Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
                }

                //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
                return new JsonResult() {Data = oList,  MaxJsonLength = 86753090, };
            }
        [HttpPost]
        public ActionResult ShiftInsertandUpdate(ShiftDoctor shiftmastercs)
        {
            ShiftDoctor obj = new ShiftDoctor();
            List<ShiftDoctor> oList = new List<ShiftDoctor>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ShiftInsertandUpdate(shiftmastercs, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ShiftDoctor MModels = new ShiftDoctor();
                    MModels.Status = row["Status"].ToString();
                    MModels.ShiftId = Convert.ToInt32(row["TmId"].ToString());
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
        public ActionResult ShiftGetandGets(ShiftDoctor shiftmastercs)
        {
            ShiftDoctor obj = new ShiftDoctor();

            List<ShiftDoctor> oList = new List<ShiftDoctor>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ShiftGetandGets(shiftmastercs, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ShiftDoctor MModels = new ShiftDoctor();
                    MModels.ShiftId = Convert.ToInt32(row["ShiftId"].ToString());
                    MModels.ShiftName = row["ShiftName"].ToString();
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
        public JsonResult MedShiftInsertandUpdate(List<MedicalShift> MedicalShift)
        {
            MedicalShift obj = new MedicalShift();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<MedicalShift> oList = new List<MedicalShift>();
            try
            {
                string[] shifttable = new string[9];
                shifttable[0] = "AvailableId";
                shifttable[1] = "Days";
                shifttable[2] = "StartTime";
                shifttable[3] = "EndTime";
                shifttable[4] = "Shift";
                shifttable[5] = "Doctors";
                shifttable[6] = "DelFlag";
                shifttable[7] = "DepId";
                shifttable[8] = "UserId";

                dt = Common.CreateTable(shifttable);

                foreach (var details in MedicalShift)
                {
                    obj.AvailableId = details.AvailableId;
                    obj.Days = details.Days;
                    obj.StartTime = details.StartTime;
                    obj.EndTime = details.EndTime;
                    obj.Shift = details.Shift;
                    obj.Doctors = details.Doctors;
                    obj.DelFlag = details.DelFlag;
                    obj.DepId = details.DepId;
                    obj.UserId = details.UserId;
                    dt.Rows.Add(obj.AvailableId, obj.Days, obj.StartTime, obj.EndTime, obj.Shift, obj.Doctors, obj.DelFlag, obj.DepId, obj.UserId);
                }
                dsDataSet = obj.MedShiftInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MedicalShift MModels = new MedicalShift();
                    MModels.Statusshift = row["Status"].ToString();
                    MModels.AvailableId = Convert.ToInt32(row["ShiftId"].ToString());
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
        public ActionResult MedShiftGetandGets(MedicalShift MedicalShiftcs)
        {
            MedicalShift obj = new MedicalShift();

            List<MedicalShift> oList = new List<MedicalShift>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MedShiftGetandGets(MedicalShiftcs, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MedicalShift MModels = new MedicalShift();
                    MModels.AvailableId = Convert.ToInt32(row["AvailableId"].ToString());
                    MModels.Doctors = row["Doctors"].ToString();
                    MModels.Days = row["Days"].ToString();
                    MModels.StartTime = row["StartTime"].ToString();
                    MModels.EndTime = row["EndTime"].ToString();
                    MModels.Shift = row["Shift"].ToString();
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
        public ActionResult DaysGetandGets(MedicalShift MedicalShiftcs)
        {
            MedicalShift obj = new MedicalShift();

            List<MedicalShift> oList = new List<MedicalShift>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DaysGetandGets(MedicalShiftcs, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MedicalShift MModels = new MedicalShift();
                    MModels.AvailableId = Convert.ToInt32(row["AvailableId"].ToString());
                    MModels.Doctors = row["Doctors"].ToString();
                    MModels.Days = row["Days"].ToString();
                    MModels.StartTime = row["StartTime"].ToString();
                    MModels.EndTime = row["EndTime"].ToString();
                    MModels.Shift = row["Shift"].ToString();
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
        public ActionResult HMS_DashboardDoctorGets(Doctorsmaster Doctorsmaster)
        {
            Doctorsmaster obj = new Doctorsmaster();

            List<Doctorsmaster> oList = new List<Doctorsmaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DashboardDoctorGets(Doctorsmaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Doctorsmaster MModels = new Doctorsmaster();
                    MModels.DoctorsId = Convert.ToInt32(row["DocId"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.CurrentDate = row["Flag"].ToString();
                    MModels.Department = row["DEPT"].ToString();
                    MModels.selectedImage = row["selectedImage"].ToString();
                
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
        public ActionResult MedDeptGetandGets(MedDept MedDept)
        {
            MedDept obj = new MedDept();

            List<MedDept> oList = new List<MedDept>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MedDeptGetandGets(MedDept, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MedDept MModels = new MedDept();
                    MModels.DepId = Convert.ToInt32(row["DepId"].ToString());
                    MModels.Department = row["Department"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.PhNumber = row["Number"].ToString();
                    MModels.HOD = row["HOD"].ToString();
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
        public ActionResult MedDeptInsertandUpdate(MedDept MedDept)
        {
            MedDept obj = new MedDept();
            List<MedDept> oList = new List<MedDept>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MedDeptInsertandUpdate(MedDept, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MedDept MModels = new MedDept();
                    MModels.Status = row["Status"].ToString();
                    MModels.DepId = Convert.ToInt32(row["DepId"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult HMS_DoctorsSearch(Doctorsmaster Doctorsmaster)
        {
            Doctorsmaster obj = new Doctorsmaster();

            List<Doctorsmaster> oList = new List<Doctorsmaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_DoctorsSearch(Doctorsmaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Doctorsmaster MModels = new Doctorsmaster();
                    MModels.DoctorsId = Convert.ToInt32(row["DocId"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.Department = row["Department"].ToString();
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
        public ActionResult DoctorInsertandUpdate(Doctorsmaster Doctorsmaster)
        {
            Doctorsmaster obj = new Doctorsmaster();
            List<Doctorsmaster> oList = new List<Doctorsmaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DoctorInsertandUpdate(Doctorsmaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Doctorsmaster MModels = new Doctorsmaster();
                    MModels.Statusdoc = row["Status"].ToString();
                    MModels.DoctorsId = Convert.ToInt32(row["DocId"].ToString());
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
        public ActionResult DoctorGetandGets(Doctorsmaster Doctorsmaster)
        {
            Doctorsmaster obj = new Doctorsmaster();

            List<Doctorsmaster> oList = new List<Doctorsmaster>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DoctorGetandGets(Doctorsmaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Doctorsmaster MModels = new Doctorsmaster();
                    MModels.DoctorsId = Convert.ToInt32(row["DocId"].ToString());
                    MModels.Name = row["Name"].ToString();
                    MModels.UserName = row["UserName"].ToString();
                    MModels.Doctor_UserId = Convert.ToInt32(row["Doctor_UserId"].ToString());
                    MModels.Department = row["Department"].ToString();
                    MModels.MobileNumber = row["MobileNumber"].ToString();
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.Email = row["Email"].ToString();
                    MModels.Consultancy = Convert.ToDecimal(row["Consultancy"].ToString());
                    MModels.Experience = row["Experience"].ToString();
                    MModels.Specialization = row["Specialization"].ToString();
                    MModels.Address1 = row["Address1"].ToString();
                    MModels.Address2 = row["Address2"].ToString();
                    MModels.Address3 = row["Address3"].ToString();
                    MModels.Gender = row["Gender"].ToString();
                    MModels.Designation = row["Designation"].ToString();
                    MModels.Training = row["Training"].ToString();
                    MModels.Acheivement = row["Acheivement"].ToString();
                    MModels.Certification = row["Certification"].ToString();
                    MModels.Qualification = row["Qualification"].ToString();
                    MModels.Qualification1 = row["Qualification1"].ToString();
                    MModels.Qualification2 = row["Qualification2"].ToString();
                    MModels.Qualification3 = row["Qualification3"].ToString();
                    MModels.Qualification4 = row["Qualification4"].ToString();
                    MModels.Language = row["Language"].ToString();
                    MModels.Active = Convert.ToInt32(row["Active"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DepId"].ToString());
                    MModels.selectedImage = row["selectedImage"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_AppointmentSearch(Appointment Appointment)
        {
            Appointment obj = new Appointment();

            List<Appointment> oList = new List<Appointment>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_AppointmentSearch(Appointment, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Appointment MModels = new Appointment();
                    MModels.AppointmentId = Convert.ToInt32(row["AppointmentId"].ToString());
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.Contact = row["Contact"].ToString();
                    MModels.LastName = row["LastName"].ToString();
                    MModels.DOB = row["DOB"].ToString();
                    MModels.Gender = row["Gender"].ToString();
                    MModels.Nationality = row["Nationality"].ToString();
                    MModels.Email = row["Email"].ToString();
                    MModels.Branch = row["Branch"].ToString();
                    MModels.Department = row["Department"].ToString();
                    MModels.Doctor = row["Doctor"].ToString();
                    MModels.AppointmentDate = row["AppointmentDate"].ToString();
                    MModels.AppointmentTime = row["AppointmentTime"].ToString();
                    MModels.Status1 = row["Status1"].ToString();
                    MModels.Status2 = row["Status2"].ToString();
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
        public ActionResult AppointmentInsertandUpdate(Appointment Appointment)
        {
            Appointment obj = new Appointment();
            List<Appointment> oList = new List<Appointment>();
            try
            {
                DataSet dsDataSet = obj.AppointmentInsertandUpdate(Appointment, dbName);

                if (dsDataSet == null)
                    return Json(new { oList, success = false, message = "DB returned null" },
                                JsonRequestBehavior.AllowGet);

                if (dsDataSet.Tables.Count > 0 && dsDataSet.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        Appointment MModels = new Appointment();
                        MModels.Status = row["Status"].ToString();
                        MModels.AppointmentId = Convert.ToInt32(row["AppointmentId"].ToString());
                        oList.Add(MModels);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
                return Json(new { oList, success = false, message = ex.Message },
                            JsonRequestBehavior.AllowGet);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }






        [HttpPost]
        public ActionResult GetBookedSession(Appointment Appointment)
        {
            Appointment obj = new Appointment();

            List<Appointment> oList = new List<Appointment>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetBookedSession(Appointment, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Appointment MModels = new Appointment();                  
                    MModels.AppointmentTime = row["AppointmentTime"].ToString();                   
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
        public ActionResult AppointmentGets(Appointment Appointment)
        {
            // ✅ Add this debug line temporarily
            System.Diagnostics.Debug.WriteLine("Status1 received: " + Appointment.Status1);

            Appointment obj = new Appointment();
            List<Appointment> oList = new List<Appointment>();
            try
            {
                DataSet dsDataSet = obj.AppointmentGetandGets(Appointment, dbName);
                if (dsDataSet != null && dsDataSet.Tables.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        Appointment MModels = new Appointment();
                        MModels.AppointmentId = Convert.ToInt64(row["AppointmentId"]);
                        MModels.FirstName = row["FirstName"].ToString();
                        MModels.LastName = row["LastName"].ToString();
                        MModels.DOB = row["DOB"].ToString();
                        MModels.Age = Convert.ToInt32(row["Age"]);
                        MModels.Department = row["Department"].ToString();
                        MModels.Gender = row["Gender"].ToString();
                        MModels.Email = row["Email"].ToString();
                        MModels.Nationality = row["Nationality"].ToString();
                        MModels.Contact = row["Contact"].ToString();
                        MModels.Branch = row["Branch"].ToString();
                        MModels.Doctor = row["Doctor"].ToString();
                        MModels.DoctorId = Convert.ToInt32(row["DoctorId"]);
                        MModels.AppointmentTime = row["AppointmentTime"].ToString();
                        MModels.AppointmentDate = row["AppointmentDate"].ToString();
                        MModels.Status1 = row["Status1"].ToString();
                        MModels.Status2 = row["Status2"].ToString();
                        try { MModels.Name = row["Name"].ToString(); } catch { }
                        oList.Add(MModels);
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { oList, success = false, message = ex.Message },
                            JsonRequestBehavior.AllowGet);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AppointmentGetandGets(Appointment Appointment)
        {
            // ✅ Add this debug line temporarily
            System.Diagnostics.Debug.WriteLine("Status1 received: " + Appointment.Status1);

            Appointment obj = new Appointment();
            List<Appointment> oList = new List<Appointment>();
            try
            {
                DataSet dsDataSet = obj.AppointmentGetandGets(Appointment, dbName);
                if (dsDataSet != null && dsDataSet.Tables.Count > 0)
                {
                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        Appointment MModels = new Appointment();
                        MModels.AppointmentId = Convert.ToInt64(row["AppointmentId"]);
                        MModels.FirstName = row["FirstName"].ToString();
                        MModels.LastName = row["LastName"].ToString();
                        MModels.DOB = row["DOB"].ToString();
                        MModels.Age = Convert.ToInt32(row["Age"]);
                        MModels.Department = row["Department"].ToString();
                        MModels.Gender = row["Gender"].ToString();
                        MModels.Email = row["Email"].ToString();
                        MModels.Nationality = row["Nationality"].ToString();
                        MModels.Contact = row["Contact"].ToString();
                        MModels.Branch = row["Branch"].ToString();
                        MModels.Doctor = row["Doctor"].ToString();
                        MModels.DoctorId = Convert.ToInt32(row["DoctorId"]);
                        MModels.AppointmentTime = row["AppointmentTime"].ToString();
                        MModels.AppointmentDate = row["AppointmentDate"].ToString();
                        MModels.Status1 = row["Status1"].ToString();
                        MModels.Status2 = row["Status2"].ToString();
                        try { MModels.Name = row["Name"].ToString(); } catch { }
                        oList.Add(MModels);
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { oList, success = false, message = ex.Message },
                            JsonRequestBehavior.AllowGet);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        //[HttpPost]
        //public ActionResult AppointmentGetandGets(Appointment Appointment)
        //{
        //    Appointment obj = new Appointment();

        //    List<Appointment> oList = new List<Appointment>();
        //    try
        //    {
        //        DataSet dsDataSet = new DataSet();
        //        dsDataSet = obj.AppointmentGetandGets(Appointment, dbName);
        //        foreach (DataRow row in dsDataSet.Tables[0].Rows)
        //        {
        //            Appointment MModels = new Appointment();
        //            MModels.AppointmentId = Convert.ToInt32(row["AppointmentId"].ToString());
        //            MModels.FirstName = row["FirstName"].ToString();
        //            MModels.LastName = row["LastName"].ToString();
        //            MModels.DOB = row["DOB"].ToString();
        //            MModels.Department = row["Department"].ToString();
        //            MModels.Gender = row["Gender"].ToString();
        //            MModels.Email = row["Email"].ToString();
        //            MModels.Nationality = row["Nationality"].ToString();
        //            MModels.Contact = row["Contact"].ToString();
        //            MModels.Branch = row["Branch"].ToString();
        //            MModels.Doctor = row["Name"].ToString();
        //            MModels.AppointmentTime = row["AppointmentTime"].ToString();
        //            MModels.AppointmentDate = row["AppointmentDate"].ToString();
        //            MModels.Status1 = row["Status1"].ToString();
        //            MModels.Status2 = row["Status2"].ToString();
        //            oList.Add(MModels);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
        //    }

        //    return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        //}

        [HttpPost]
        public ActionResult AppointmentSearchList(Appointment Appointment)
        {
            Appointment obj = new Appointment();

            List<Appointment> oList = new List<Appointment>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AppointmentSearchList(Appointment, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Appointment MModels = new Appointment();
                    MModels.AppointmentId = Convert.ToInt32(row["AppointmentId"].ToString());
                    MModels.FirstName = row["FirstName"].ToString();
                    MModels.LastName = row["LastName"].ToString();
                    MModels.DOB = row["DOB"].ToString();
                    MModels.Age = Convert.ToInt32(row["Age"].ToString());
                    MModels.Department = row["Department"].ToString();
                    MModels.Gender = row["Gender"].ToString();
                    MModels.Email = row["Email"].ToString();
                    MModels.Nationality = row["Nationality"].ToString();
                    MModels.Contact = row["Contact"].ToString();
                    MModels.Branch = row["Branch"].ToString();
                    MModels.Doctor = row["Name"].ToString();
                    MModels.AppointmentTime = row["AppointmentTime"].ToString();
                    MModels.AppointmentDate = row["AppointmentDate"].ToString();
                    
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
        public ActionResult HSNInsertandUpdate(HSN HSN)
        {
            HSN obj = new HSN();
            List<HSN> oList = new List<HSN>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HSNInsertandUpdate(HSN, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HSN MModels = new HSN();
                    MModels.Status = row["Status"].ToString();
                    MModels.HSNId = Convert.ToInt32(row["HSN_Id"].ToString());
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
        public ActionResult HSNGetandGets(HSN HSN)
        {
            HSN obj = new HSN();

            List<HSN> oList = new List<HSN>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HSNGetandGets(HSN, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HSN MModels = new HSN();
                    MModels.HSNId = Convert.ToInt32(row["HSN_Id"].ToString());
                    MModels.Name = row["HSN_Name"].ToString();
                    MModels.Code = row["HSN_Code"].ToString();
                    MModels.TaxRate = row["HSN_TaxPer"].ToString();
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
        public ActionResult HMS_EODUpdate(HMS_EOD HMS_EOD)
        {
            HMS_EOD obj = new HMS_EOD();
            List<HMS_EOD> oList = new List<HMS_EOD>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_EODUpdate(HMS_EOD, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    HMS_EOD MModels = new HMS_EOD();
                    MModels.Status = row["Status"].ToString();
                    MModels.EODDate = row["EODDATE"].ToString();
                    MModels.EODId = Convert.ToInt32(row["EODId"].ToString());
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
        public ActionResult RegistrationReport(RegistrationModel RegistrationModel)
        {
            RegistrationModel obj = new RegistrationModel();

            List<RegistrationModel> oList = new List<RegistrationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RegistrationReport(RegistrationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    RegistrationModel Reptmodels = new RegistrationModel();
                    Reptmodels.RegId = Convert.ToInt32(row["RegId"].ToString());
                    Reptmodels.RegNo = Convert.ToInt32(row["RegNo"].ToString());
                    Reptmodels.RegDate = row["RegDate"].ToString();
                    Reptmodels.Bloodgroup = row["OPSerName"].ToString();
                    Reptmodels.Doctor = Convert.ToInt32(row["DocId"].ToString());
                    Reptmodels.PName = row["PName"].ToString();
                    Reptmodels.Fathersname = row["Doctor"].ToString();
                    Reptmodels.Age = Convert.ToInt32(row["Age"].ToString());
                    Reptmodels.Mothersname = row["Gender"].ToString();
                    Reptmodels.Address1 = row["Address"].ToString();
                    Reptmodels.PhoneNo = row["PhoneNo"].ToString();
                    Reptmodels.RegFee = Convert.ToDecimal(row["RegFee"].ToString());
                    Reptmodels.ConsultFee = Convert.ToDecimal(row["ConsultFee"].ToString());
                    Reptmodels.OtherFee = Convert.ToDecimal(row["OtherFee"].ToString());
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
        public ActionResult RevisitReport(RegistrationModel RegistrationModel)
        {
            RegistrationModel obj = new RegistrationModel();

            List<RegistrationModel> oList = new List<RegistrationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RevisitReport(RegistrationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    RegistrationModel Reptmodels = new RegistrationModel();
                    Reptmodels.RegId = Convert.ToInt32(row["Revisit_Id"].ToString());
                    Reptmodels.RegNo = Convert.ToInt32(row["OP_Number"].ToString());
                    Reptmodels.RegDate = row["VisitingDate"].ToString();
                    Reptmodels.Bloodgroup = row["OPSerName"].ToString();
                    Reptmodels.Doctor = Convert.ToInt32(row["DocId"].ToString());
                    Reptmodels.PName = row["PName"].ToString();
                    Reptmodels.Fathersname = row["Doctor"].ToString();
                    Reptmodels.Age = Convert.ToInt32(row["Age"].ToString());
                    Reptmodels.Mothersname = row["Gender"].ToString();
                    Reptmodels.Address1 = row["Address"].ToString();
                    Reptmodels.PhoneNo = row["PhoneNo"].ToString();
                    Reptmodels.RegFee = Convert.ToDecimal(row["Visiting_Fee"].ToString());
                    Reptmodels.ConsultFee = Convert.ToDecimal(row["Consult_Fee"].ToString());
                    Reptmodels.OtherFee = Convert.ToDecimal(row["Other_Fee"].ToString());
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
        public ActionResult LabTestWiseReport(LabBill LabBill)
        {
            LabBill obj = new LabBill();

            List<LabBill> oList = new List<LabBill>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LabTestWiseReport(LabBill, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    LabBill Reptmodels = new LabBill();
                    Reptmodels.BillNo = Convert.ToInt32(row["BillNo"].ToString());
                    Reptmodels.BillDate = row["BillDate"].ToString(); 
                    Reptmodels.TestName = row["TestName"].ToString();
                    Reptmodels.PRate = Convert.ToDecimal(row["TestAmount"].ToString());
                    Reptmodels.TestAmount = Convert.ToDecimal(row["OutSideRate"].ToString());
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
        public ActionResult ReasonInsertandUpdate(Reason Reason)
        {
            Reason obj = new Reason();
            List<Reason> oList = new List<Reason>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ReasonInsertandUpdate(Reason, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Reason MModels = new Reason();
                    MModels.Status = row["Status"].ToString();
                    MModels.ReasonId = Convert.ToInt32(row["ReasonId"].ToString());

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
        public JsonResult HMS_IP_BPTEMPInsertandUpdate(List<IPRegistration> IPRegistration)
        {
            IPRegistration obj = new IPRegistration();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<IPRegistration> oList = new List<IPRegistration>();
            try
            {
              
                string[] shifttable = new string[16];
                shifttable[0] = "PId";
                shifttable[1] = "PatientId";
                shifttable[2] = "RegSeries";
                shifttable[3] = "RegNo";
                shifttable[4] = "IP_No";
                shifttable[5] = "IP_Year";
                shifttable[6] = "OPVisit_No";
                shifttable[7] = "EDate";
                shifttable[8] = "ETime";
                shifttable[9] = "Temperature";
                shifttable[10] = "BP";
                shifttable[11] = "Status";
                shifttable[12] = "UserId";
                shifttable[13] = "DeptId";
                shifttable[14] = "InsertDtTime";
                shifttable[15] = "DelFlag";
            

                dt = Common.CreateTable(shifttable);

                foreach (var details in IPRegistration)
                {
                    obj.IPMainId = details.IPMainId;
                    obj.PatientId = details.PatientId;
                    obj.RegSeries = details.RegSeries;
                    obj.RegNo = details.RegNo;
                    obj.IPNumber = details.IPNumber;
                    obj.IPYear = details.IPYear;
                    obj.OPVisitId = details.OPVisitId;
                    obj.DDate = details.DDate;
                    obj.DTime = details.DTime;
                    obj.RegSeriesName = details.RegSeriesName;
                    obj.PatientName = details.PatientName;
                    obj.Status = details.Status;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.InTime = details.InTime;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add(obj.IPMainId, obj.PatientId, obj.RegSeries, obj.RegNo, obj.IPNumber, obj.IPYear, obj.OPVisitId, obj.DDate, obj.DTime, obj.RegSeriesName, obj.PatientName, obj.Status, obj.UserId, obj.DeptId, obj.InTime, obj.DelFlag);
                }
                dsDataSet = obj.HMS_IP_BPTEMPInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    IPRegistration MModels = new IPRegistration();
                    MModels.Status = row["Status"].ToString();
                    MModels.IPMainId = Convert.ToInt32(row["IPBPId"].ToString());
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
        public ActionResult ReasonGetandGets(Reason Reason)
        {
            Reason obj = new Reason();

            List<Reason> oList = new List<Reason>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ReasonGetandGets(Reason, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Reason MModels = new Reason();
                    MModels.ReasonId = Convert.ToInt32(row["ReasonId"].ToString());
                    MModels.Reasons = row["Reasons"].ToString();
                    MModels.ReasonDes = row["ReasonDesc"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        //Kajal 
        [HttpPost]
        public ActionResult WasteInsertandUpdate(WasteModel WasteModel)
        {
            WasteModel obj = new WasteModel();
            List<WasteModel> oList = new List<WasteModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WasteInsertandUpdate(WasteModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WasteModel MModels = new WasteModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.wasteId = Convert.ToInt32(row["wasteId"].ToString());

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
        public ActionResult WasteGetandGets(WasteModel WasteModel)
        {
            WasteModel obj = new WasteModel();

            List<WasteModel> oList = new List<WasteModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WasteGetandGets(WasteModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WasteModel MModels = new WasteModel();
                    MModels.wasteId = Convert.ToInt32(row["wasteId"].ToString());
                    MModels.wastetype1 = row["wastetype1"].ToString();
                    MModels.wastetype2 = row["wastetype2"].ToString();
                    MModels.wastetype3 = row["wastetype3"].ToString();
                    MModels.wastetype4 = row["wastetype4"].ToString();
                    MModels.wastetype5 = row["wastetype5"].ToString();

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
        public ActionResult WasteReport(WasteModel WasteModel)
        {
            WasteModel obj = new WasteModel();

            List<WasteModel> oList = new List<WasteModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.WasteReport(WasteModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    WasteModel WasteModels = new WasteModel();

                    WasteModels.wasteId = Convert.ToInt32(row["wasteId"].ToString());
                    WasteModels.CurrentDtTime = row["CurrentDtTime"].ToString();
                    WasteModels.wastetype1 = row["wastetype1"].ToString();
                    WasteModels.wastetype2 = row["wastetype2"].ToString();
                    WasteModels.wastetype3 = row["wastetype3"].ToString();
                    WasteModels.wastetype4 = row["wastetype4"].ToString();
                    WasteModels.wastetype5 = row["wastetype5"].ToString();
                    WasteModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    WasteModels.UserId = Convert.ToInt32(row["UserId"].ToString());

                    oList.Add(WasteModels);
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
        public ActionResult HMS_PaymentUpdate(WasteModel WasteModel)
        {
            WasteModel obj = new WasteModel();
            List<WasteModel> oList = new List<WasteModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PaymentUpdate(WasteModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    WasteModel MModels = new WasteModel();

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
        //Kajal End

        public ActionResult Appointment123GetandGets(proceduremastercs proceduremastercs)
        {
            proceduremastercs obj = new proceduremastercs();

            List<proceduremastercs> oList = new List<proceduremastercs>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Appointment123GetandGets(proceduremastercs, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    proceduremastercs MModels = new proceduremastercs(); 
                    MModels.RegId = Convert.ToInt32(row["AppointmentId"].ToString());
                    MModels.AppFirst = row["FirstName"].ToString();
                    MModels.PGender = row["Gender"].ToString();
                    MModels.PDOB = row["DOB"].ToString();
                    MModels.Deptname = row["Department"].ToString();
                    MModels.Branch = row["Branch"].ToString();
                    MModels.Doctor = row["Name"].ToString();
                    MModels.PDATE = row["AppointmentDate"].ToString();
                    MModels.Time = row["AppointmentTime"].ToString();
                    MModels.AppLast = row["LastName"].ToString();
                    MModels.MobileNo = row["Contact"].ToString();
                    MModels.Country = row["Nationality"].ToString();
                    MModels.EmailId = row["Email"].ToString();

                    oList.Add(MModels);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Token123GetandGets(proceduremastercs proceduremastercs)
        {
            proceduremastercs obj = new proceduremastercs();

            List<proceduremastercs> oList = new List<proceduremastercs>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Token123GetandGets(proceduremastercs, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    proceduremastercs MModels = new proceduremastercs();


                    MModels.Name = row["Name"].ToString();
                    MModels.currenttoken = row["currenttoken"].ToString();
                    MModels.NextToken = row["NextToken"].ToString();


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





