using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EUMI_ERP.Models;
using System.Data;
using System.Configuration;
using System.IO;

namespace EUMI_ERP.Controllers
{
    public class AccountsErpController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: AccountsErp
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ReceiptVoucher()
        {
            return View();
        }
        public ActionResult ReceiptVoucherUsedCar()
        {
            return View();
        }
        public ActionResult PaymentVoucher()
        {
            return View();
        }
        public ActionResult VoucherEntry()
        {
            return View();
        }
        public ActionResult VoucherEntryModify()
        {
            return View();
        }
        public ActionResult PDCReceived()
        {
            return View();
        }
        public ActionResult PDCIssued()
        {
            return View();
        }
        public ActionResult PettyCashVoucher()
        {
            return View();
        }
        public ActionResult RecurringEntry()
        {
            return View();
        }
        public ActionResult RecurringEntrynew()
        {
            return View();
        }
        public ActionResult BankReconciliation()
        {
            return View();
        }
        public ActionResult petticash()
        {
            return View();
        }

        public ActionResult PettyVoucher()
        {
            return View();
        }
        public ActionResult PendingPDCReport()
        {
            return View();
        }

        public ActionResult CashBook()
        {
            return View();
        }


        [HttpPost]
        public JsonResult CashBookInsert(List<CashBookModel> CashBookModel)
        {
            CashBookModel obj = new CashBookModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<CashBookModel> oList = new List<CashBookModel>();

            try
            {
                string[] tmpTable = new string[16];
                tmpTable[0] = "CashBookId";
                tmpTable[1] = "BookName";
                tmpTable[2] = "BookDate";
                tmpTable[3] = "AccountHead";
                tmpTable[4] = "Narration";
                tmpTable[5] = "DebitAmt";
                tmpTable[6] = "CreditAmt";
                tmpTable[7] = "TransType";
                tmpTable[8] = "ClosingBalance";
                tmpTable[9] = "Variable1";
                tmpTable[10] = "Variable2";
                tmpTable[11] = "Variable3";
                tmpTable[12] = "Variable4";
                tmpTable[13] = "Variable5";
                tmpTable[14] = "DeptId";
                tmpTable[15] = "UserId";

                dt = Common.CreateTable(tmpTable);
                foreach (var details in CashBookModel)
                {
                    obj.CashBookId = details.CashBookId;
                    obj.BookName = details.BookName;
                    obj.BookDate = details.BookDate;
                    obj.AccountHead = details.AccountHead;
                    obj.Narration = details.Narration;
                    obj.DebitAmt = details.DebitAmt;
                    obj.CreditAmt = details.CreditAmt;
                    obj.TransType = details.TransType;
                    obj.ClosingBalance = details.ClosingBalance;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Variable3 = details.Variable3;
                    obj.Variable4 = details.Variable4;
                    obj.Variable5 = details.Variable5;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    dt.Rows.Add
                    (obj.CashBookId, obj.BookName, obj.BookDate, obj.AccountHead, obj.Narration, obj.DebitAmt, obj.CreditAmt,
                    obj.TransType, obj.ClosingBalance, obj.Variable1, obj.Variable2, obj.Variable3, obj.Variable4, obj.Variable5, obj.DeptId, obj.UserId);
                }

                dsDataSet = obj.CashBookInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CashBookModel LModels = new CashBookModel();
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
        public ActionResult CashBookGetandGets(CashBookModel CashBookModel)
        {
            CashBookModel obj = new CashBookModel();
            List<CashBookModel> oList = new List<CashBookModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CashBookGetandGets(CashBookModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CashBookModel MModels = new CashBookModel();
                    MModels.CashBookId = Convert.ToInt32(row["CashBookId"].ToString());
                    MModels.BOOKACC = row["BOOKACC"].ToString();
                    MModels.BookName = row["BookName"].ToString();
                    MModels.BookDate = row["BookDate"].ToString();
                    MModels.ACDESC = row["ACDESC"].ToString();
                    MModels.AccountHead = row["AccountHead"].ToString();
                    MModels.Narration = row["Narration"].ToString();
                    MModels.DebitAmt = Convert.ToDecimal(row["DebitAmt"].ToString());
                    MModels.CreditAmt = Convert.ToDecimal(row["CreditAmt"].ToString());
                    MModels.TransType = row["TransType"].ToString();
                    MModels.ClosingBalance = Convert.ToDecimal(row["ClosingBalance"].ToString());
                    MModels.Variable1 = row["Variable1"].ToString();
                    MModels.Variable2 = row["Variable2"].ToString();
                    MModels.Variable3 = row["Variable3"].ToString();
                    MModels.Variable4 = row["Variable4"].ToString();
                    MModels.Variable5 = row["Variable5"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
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



         public ActionResult AccountbalGetandGets(ReconciliationModel PDCIssuedModel)
        {
            ReconciliationModel obj = new ReconciliationModel();

            List<ReconciliationModel> oList = new List<ReconciliationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountbalGetandGets(PDCIssuedModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReconciliationModel VEModels = new ReconciliationModel();

                    VEModels.bal = Convert.ToDecimal(row["bal"].ToString());
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult PettyVoucherTypeGetandGets(VoucherTypeModel VoucherTypeModel)
        {
            VoucherTypeModel obj = new VoucherTypeModel();

            List<VoucherTypeModel> oList = new List<VoucherTypeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PettyVoucherTypeGetandGets(VoucherTypeModel, dbName);
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
        public ActionResult Rpt_GetPendingPDC(VoucherTypeModel VoucherTypeModel)
        {
            VoucherTypeModel obj = new VoucherTypeModel();

            List<VoucherTypeModel> oList = new List<VoucherTypeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();


                dsDataSet = obj.Rpt_GetPendingPDC(VoucherTypeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherTypeModel Reptmodels = new VoucherTypeModel();
                    Reptmodels.VoucherNo = row["VoucherNo"].ToString();
                    Reptmodels.VoucherType = row["VTypePrefix"].ToString();
                    Reptmodels.Voucherdate = row["VDate"].ToString();
                    Reptmodels.Description = row["VDescription"].ToString();
                    Reptmodels.cheqNo = row["ChequeNo"].ToString();
                    Reptmodels.CheqDate = row["ChequeDate"].ToString();
                    Reptmodels.Bank = row["BankName"].ToString();
                    Reptmodels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
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
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult VoucherDelete(VoucherTypeModel VoucherTypeModel)
        {
            VoucherTypeModel obj = new VoucherTypeModel();

            List<VoucherTypeModel> oList = new List<VoucherTypeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherDelete(VoucherTypeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherTypeModel MModels = new VoucherTypeModel();
                    MModels.flag = Convert.ToInt32(row["flag"].ToString());

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
        public ActionResult PCAccSearch(VoucherTypeModel VoucherTypeModel)
        {
            VoucherTypeModel obj = new VoucherTypeModel();

            List<VoucherTypeModel> oList = new List<VoucherTypeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PCAccSearch(VoucherTypeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherTypeModel MModels = new VoucherTypeModel();
                    MModels.AccCode = row["Acc_Code"].ToString();
                    MModels.AccDescription = row["Acc_Description"].ToString();
                    MModels.AccId = Convert.ToInt32(row["Acc_Id"].ToString());
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
        public ActionResult PCAccNoGetandGets(VoucherTypeModel VoucherTypeModel)
        {
            VoucherTypeModel obj = new VoucherTypeModel();

            List<VoucherTypeModel> oList = new List<VoucherTypeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PCAccNoGetandGets(VoucherTypeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherTypeModel VEModels = new VoucherTypeModel();
                    VEModels.TaxAcc = row["Acc_Code"].ToString();
                    VEModels.TaxAccId = Convert.ToInt32(row["Acc_Id"].ToString());
                    VEModels.TaxAccName = row["Acc_Description"].ToString();

                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult PCVoucherTableInsert(List<VoucherEntryModel> VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();

            try
            {
                string[] tmpTable = new string[22];
                tmpTable[0] = "VoucherType";
                tmpTable[1] = "VTypePrefix";
                tmpTable[2] = "VoucherNo";
                tmpTable[3] = "VoucherDate";
                tmpTable[4] = "VType";
                tmpTable[5] = "AccId";
                tmpTable[6] = "AccCode";
                tmpTable[7] = "ReferenceNo";
                tmpTable[8] = "VoucherEntryDescription";
                tmpTable[9] = "Amount";
                tmpTable[10] = "CurrencyId";
                tmpTable[11] = "CurrencyRate";
                tmpTable[12] = "FCAmount";
                tmpTable[13] = "Bank";
                tmpTable[14] = "ChequeNo";
                tmpTable[15] = "Date";
                tmpTable[16] = "UserId";
                tmpTable[17] = "DeptId";
                tmpTable[18] = "CurrDtTime";               
                tmpTable[19] = "TrxType";        
                tmpTable[20] = "TaxNo";
                tmpTable[21] = "CreditAccount";
                dt = Common.CreateTable(tmpTable);
                foreach (var details in VoucherEntryModel)
                {
                    obj.VoucherType = details.VoucherType;
                    obj.VTypePrefix = details.VTypePrefix;
                    obj.VoucherNo = details.VoucherNo;
                    obj.VoucherDate = details.VoucherDate;
                    obj.VType = details.VType;
                    obj.AccId = details.AccId;
                    obj.AccCode = details.AccCode;
                    obj.ReferenceNo = details.ReferenceNo;
                    obj.VoucherEntryDescription = details.VoucherEntryDescription;
                    obj.Amount = details.Amount;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.FCAmount = details.FCAmount;
                    obj.Bank = details.Bank;
                    obj.ChequeNo = details.ChequeNo;
                    obj.Date = details.Date;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.CurrDtTime = details.CurrDtTime;
                    obj.TrxType = details.TrxType;
                    obj.TaxNo = details.TaxNo;
                    obj.CreditAccount = details.CreditAccount;
                    dt.Rows.Add
                    (obj.VoucherType, obj.VTypePrefix, obj.VoucherNo, obj.VoucherDate, obj.VType, obj.AccId, obj.AccCode, obj.ReferenceNo, obj.VoucherEntryDescription, obj.Amount, obj.CurrencyId, obj.CurrencyRate, obj.FCAmount, obj.Bank, obj.ChequeNo, obj.Date, obj.UserId, obj.DeptId, obj.CurrDtTime, obj.TrxType, obj.TaxNo, obj.CreditAccount);
                }

                dsDataSet = obj.PCVoucherTableInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel LModels = new VoucherEntryModel();
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
        public JsonResult VoucherEntryTableInsert(List<VoucherEntryModel> VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();

            try
            {
                string[] tmpTable = new string[32];
                tmpTable[0] = "VoucherEntryId";
                tmpTable[1] = "VoucherTypeId";
                tmpTable[2] = "VoucherNo";
                tmpTable[3] = "TransferVoucherNo";
                tmpTable[4] = "VoucherDate";
                tmpTable[5] = "BillSerId";
                tmpTable[6] = "VType";
                tmpTable[7] = "AccountId";
                tmpTable[8] = "AccCode";
                tmpTable[9] = "VoucherEntryDescription";
                tmpTable[10] = "Amount";
                tmpTable[11] = "ReferenceNo";
                tmpTable[12] = "ProjectJobId";
                tmpTable[13] = "CostCenterId";
                tmpTable[14] = "CurrencyId";
                tmpTable[15] = "CurrencyRate";
                tmpTable[16] = "BankId";
                tmpTable[17] = "ChequeNo";
                tmpTable[18] = "ChequeDate";
                tmpTable[19] = "PDCAccountId";
                tmpTable[20] = "FCAmount";
                tmpTable[21] = "DelFlag";
                tmpTable[22] = "UserId";
                tmpTable[23] = "DeptId";
                tmpTable[24] = "VoucherTypePrefix";
                tmpTable[25] = "Advance";
                tmpTable[26] = "AdvanceAmount";
                tmpTable[27] = "PDCStatus";
                tmpTable[28] = "TaxNo";
                tmpTable[29] = "TrxType";
                tmpTable[30] = "empId";
                tmpTable[31] = "AssetId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in VoucherEntryModel)
                {                    
                    obj.VoucherTypeId = details.VoucherTypeId;
                    obj.VoucherNo = details.VoucherNo;
                    obj.TransferVoucherNo = details.TransferVoucherNo;
                    obj.VoucherDate = details.VoucherDate;
                    obj.BillSerId = details.BillSerId;
                    obj.VType = details.VType;
                    obj.AccountId = details.AccountId;
                    obj.AccCode = details.AccCode;
                    obj.VoucherEntryDescription = details.VoucherEntryDescription;
                    obj.Amount = details.Amount;
                    obj.ReferenceNo = details.ReferenceNo;
                    obj.ProjectJobId = details.ProjectJobId;
                    obj.CostCenterId = details.CostCenterId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;                    
                    obj.BankId = details.BankId;
                    obj.ChequeNo = details.ChequeNo;
                    obj.ChequeDate = details.ChequeDate;
                    obj.PDCAccount = details.PDCAccount;
                    obj.FCAmount = details.FCAmount;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.VoucherTypePrefix = details.VoucherTypePrefix;
                    obj.Advance = details.Advance;
                    obj.AdvanceAmount = details.AdvanceAmount;
                    obj.PDCStatus = details.PDCStatus;
                    obj.TaxNo = details.TaxNo;
                    obj.TrxType = details.TrxType;
                    obj.empId = details.empId;
                    obj.AssetId = details.AssetId;
                    dt.Rows.Add
                    (0, obj.VoucherTypeId,obj.VoucherNo,obj.TransferVoucherNo, obj.VoucherDate, obj.BillSerId, obj.VType, obj.AccountId, obj.AccCode, obj.VoucherEntryDescription, obj.Amount,
                    obj.ReferenceNo, obj.ProjectJobId, obj.CostCenterId, obj.CurrencyId, obj.CurrencyRate, obj.BankId, obj.ChequeNo, obj.ChequeDate, obj.PDCAccount, 
                    obj.FCAmount, obj.DelFlag, obj.UserId, obj.DeptId, obj.VoucherTypePrefix, obj.Advance, obj.AdvanceAmount,obj.PDCStatus,obj.TaxNo,obj.TrxType,obj.empId, obj.AssetId);
                }

                dsDataSet = obj.VoucherEntryTableInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel LModels = new VoucherEntryModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.VoucherNo = Convert.ToInt32( row["VoucherNo"].ToString());
                    LModels.VoucherType = row["VoucherType"].ToString();
                    LModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
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
        public JsonResult VoucherEntryTempInsert(List<VoucherEntryModel> VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();

            try
            {
                string[] tmpTable = new string[32];
                tmpTable[0] = "VoucherEntryId";
                tmpTable[1] = "VoucherTypeId";
                tmpTable[2] = "VoucherNo";
                tmpTable[3] = "TransferVoucherNo";
                tmpTable[4] = "VoucherDate";
                tmpTable[5] = "BillSerId";
                tmpTable[6] = "VType";
                tmpTable[7] = "AccountId";
                tmpTable[8] = "AccCode";
                tmpTable[9] = "VoucherEntryDescription";
                tmpTable[10] = "Amount";
                tmpTable[11] = "ReferenceNo";
                tmpTable[12] = "ProjectJobId";
                tmpTable[13] = "CostCenterId";
                tmpTable[14] = "CurrencyId";
                tmpTable[15] = "CurrencyRate";
                tmpTable[16] = "BankId";
                tmpTable[17] = "ChequeNo";
                tmpTable[18] = "ChequeDate";
                tmpTable[19] = "PDCAccountId";
                tmpTable[20] = "FCAmount";
                tmpTable[21] = "DelFlag";
                tmpTable[22] = "UserId";
                tmpTable[23] = "DeptId";
                tmpTable[24] = "VoucherTypePrefix";
                tmpTable[25] = "Advance";
                tmpTable[26] = "AdvanceAmount";
                tmpTable[27] = "PDCStatus";
                tmpTable[28] = "TaxNo";
                tmpTable[29] = "TrxType";
                tmpTable[30] = "empId";
                tmpTable[31] = "AssetId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in VoucherEntryModel)
                {
                    obj.VoucherTypeId = details.VoucherTypeId;
                    obj.VoucherNo = details.VoucherNo;
                    obj.TransferVoucherNo = details.TransferVoucherNo;
                    obj.VoucherDate = details.VoucherDate;
                    obj.BillSerId = details.BillSerId;
                    obj.VType = details.VType;
                    obj.AccountId = details.AccountId;
                    obj.AccCode = details.AccCode;
                    obj.VoucherEntryDescription = details.VoucherEntryDescription;
                    obj.Amount = details.Amount;
                    obj.ReferenceNo = details.ReferenceNo;
                    obj.ProjectJobId = details.ProjectJobId;
                    obj.CostCenterId = details.CostCenterId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.BankId = details.BankId;
                    obj.ChequeNo = details.ChequeNo;
                    obj.ChequeDate = details.ChequeDate;
                    obj.PDCAccount = details.PDCAccount;
                    obj.FCAmount = details.FCAmount;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.VoucherTypePrefix = details.VoucherTypePrefix;
                    obj.Advance = details.Advance;
                    obj.AdvanceAmount = details.AdvanceAmount;
                    obj.PDCStatus = details.PDCStatus;
                    obj.TaxNo = details.TaxNo;
                    obj.TrxType = details.TrxType;
                    obj.empId = details.empId;
                    obj.AssetId = details.AssetId;
                    dt.Rows.Add
                    (0, obj.VoucherTypeId, obj.VoucherNo, obj.TransferVoucherNo, obj.VoucherDate, obj.BillSerId, obj.VType, obj.AccountId, obj.AccCode, obj.VoucherEntryDescription, obj.Amount,
                    obj.ReferenceNo, obj.ProjectJobId, obj.CostCenterId, obj.CurrencyId, obj.CurrencyRate, obj.BankId, obj.ChequeNo, obj.ChequeDate, obj.PDCAccount,
                    obj.FCAmount, obj.DelFlag, obj.UserId, obj.DeptId, obj.VoucherTypePrefix, obj.Advance, obj.AdvanceAmount, obj.PDCStatus, obj.TaxNo, obj.TrxType, obj.empId, obj.AssetId);
                }

                dsDataSet = obj.VoucherEntryTempInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel LModels = new VoucherEntryModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
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
        public JsonResult VoucherEntryTableUpdate(List<VoucherEntryModel> VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();

            try
            {
                string[] tmpTable = new string[32];
                tmpTable[0] = "VoucherEntryId";
                tmpTable[1] = "VoucherTypeId";
                tmpTable[2] = "VoucherNo";
                tmpTable[3] = "TransferVoucherNo";
                tmpTable[4] = "VoucherDate";
                tmpTable[5] = "BillSerId";
                tmpTable[6] = "VType";
                tmpTable[7] = "AccountId";
                tmpTable[8] = "AccCode";
                tmpTable[9] = "VoucherEntryDescription";
                tmpTable[10] = "Amount";
                tmpTable[11] = "ReferenceNo";
                tmpTable[12] = "ProjectJobId";
                tmpTable[13] = "CostCenterId";
                tmpTable[14] = "CurrencyId";
                tmpTable[15] = "CurrencyRate";
                tmpTable[16] = "BankId";
                tmpTable[17] = "ChequeNo";
                tmpTable[18] = "ChequeDate";
                tmpTable[19] = "PDCAccountId";
                tmpTable[20] = "FCAmount";
                tmpTable[21] = "DelFlag";
                tmpTable[22] = "UserId";
                tmpTable[23] = "DeptId";
                tmpTable[24] = "VoucherTypePrefix";
                tmpTable[25] = "Advance";
                tmpTable[26] = "AdvanceAmount";
                tmpTable[27] = "PDCStatus";
                tmpTable[28] = "TaxNo";
                tmpTable[29] = "TrxType";
                tmpTable[30] = "empId";
                tmpTable[31] = "AssetId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in VoucherEntryModel)
                {
                    obj.VoucherTypeId = details.VoucherTypeId;
                    obj.VoucherNo = details.VoucherNo;
                    obj.TransferVoucherNo = details.TransferVoucherNo;
                    obj.VoucherDate = details.VoucherDate;
                    obj.BillSerId = details.BillSerId;
                    obj.VType = details.VType;
                    obj.AccountId = details.AccountId;
                    obj.AccCode = details.AccCode;
                    obj.VoucherEntryDescription = details.VoucherEntryDescription;
                    obj.Amount = details.Amount;
                    obj.ReferenceNo = details.ReferenceNo;
                    obj.ProjectJobId = details.ProjectJobId;
                    obj.CostCenterId = details.CostCenterId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.BankId = details.BankId;
                    obj.ChequeNo = details.ChequeNo;
                    obj.ChequeDate = details.ChequeDate;
                    obj.PDCAccount = details.PDCAccount;
                    obj.FCAmount = details.FCAmount;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.VoucherTypePrefix = details.VoucherTypePrefix;
                    obj.Advance = details.Advance;
                    obj.AdvanceAmount = details.AdvanceAmount;
                    obj.PDCStatus = details.PDCStatus;
                    obj.TaxNo = details.TaxNo;
                    obj.TrxType = details.TrxType;
                    obj.empId = details.empId;
                    obj.AssetId = details.AssetId;
                    dt.Rows.Add
                    (0, obj.VoucherTypeId, obj.VoucherNo, obj.TransferVoucherNo, obj.VoucherDate, obj.BillSerId, obj.VType, obj.AccountId, obj.AccCode, obj.VoucherEntryDescription, obj.Amount,
                    obj.ReferenceNo, obj.ProjectJobId, obj.CostCenterId, obj.CurrencyId, obj.CurrencyRate, obj.BankId, obj.ChequeNo, obj.ChequeDate, obj.PDCAccount,
                    obj.FCAmount, obj.DelFlag, obj.UserId, obj.DeptId, obj.VoucherTypePrefix, obj.Advance, obj.AdvanceAmount, obj.PDCStatus, obj.TaxNo, obj.TrxType, obj.empId, obj.AssetId);
                }

                dsDataSet = obj.VoucherEntryTableUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel LModels = new VoucherEntryModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    LModels.VoucherTypePrefix = row["VoucherTypePrefix"].ToString();
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
        public JsonResult ReceiptVoucherTableInsert(List<VoucherModel> VoucherModel)
        {
            VoucherModel obj = new VoucherModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<VoucherModel> oList = new List<VoucherModel>();

            try
            {
                string[] tmpTable = new string[31];
                tmpTable[0] = "VoucherEntryId";                
                tmpTable[1] = "VoucherTypeId";
                tmpTable[2] = "VoucherNo";            
                tmpTable[3] = "VType";
                tmpTable[4] = "VoucherDate";
                tmpTable[5] = "BillSerId";
                tmpTable[6] = "AccountId";
                tmpTable[7] = "AccCode";
                tmpTable[8] = "VoucherEntryDescription";
                tmpTable[9] = "Amount";
                tmpTable[10] = "ReferenceNo";
                tmpTable[11] = "ProjectJobId";
                tmpTable[12] = "CostCenterId";
                tmpTable[13] = "CurrencyId";
                tmpTable[14] = "CurrencyRate";
                tmpTable[15] = "BankId";
                tmpTable[16] = "ChequeNo";
                tmpTable[17] = "ChequeDate";                
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "DelFlag";
                tmpTable[20] = "UserId";
                tmpTable[21] = "DeptId";
                tmpTable[22] = "VoucherTypePrefix";
                tmpTable[23] = "Advance";
                tmpTable[24] = "AdvanceAmount";
                tmpTable[25] = "TransVoucherNo";
                tmpTable[26] = "PDCAccountId";
                tmpTable[27] = "PDCStatus";
                tmpTable[28] = "TxnType";
                tmpTable[29] = "ProductId";
                tmpTable[30] = "ProductName";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in VoucherModel)
                {
                    obj.VoucherTypeId = details.VoucherTypeId;
                    obj.VoucherNo = details.VoucherNo;                    
                    obj.VType = details.VType;
                    obj.VoucherDate = details.VoucherDate;
                    obj.BillSerId = details.BillSerId;
                    obj.AccountId = details.AccountId;
                    obj.AccCode = details.AccCode;
                    obj.VoucherEntryDescription = details.VoucherEntryDescription;
                    obj.Amount = details.Amount;
                    obj.ReferenceNo = details.ReferenceNo;
                    obj.ProjectJobId = details.ProjectJobId;
                    obj.CostCenterId = details.CostCenterId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.BankId = details.BankId;
                    obj.ChequeNo = details.ChequeNo;
                    obj.ChequeDate = details.ChequeDate;                    
                    obj.FCAmount = details.FCAmount;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.VoucherTypePrefix = details.VoucherTypePrefix;
                    obj.Advance = details.Advance;
                    obj.AdvanceAmount = details.AdvanceAmount;
                    obj.TransVoucherNo = details.TransVoucherNo;
                    obj.PDCAccountId = details.PDCAccountId;
                    obj.PDCStatus = details.PDCStatus;
                    obj.TxnType = details.TxnType;
                    obj.ProductId = details.ProductId;
                    obj.ProductName = details.ProductName;
                    dt.Rows.Add
                    (0, obj.VoucherTypeId, obj.VoucherNo, obj.VType, obj.VoucherDate, obj.BillSerId, obj.AccountId, obj.AccCode, obj.VoucherEntryDescription, obj.Amount,
                    obj.ReferenceNo, obj.ProjectJobId, obj.CostCenterId, obj.CurrencyId, obj.CurrencyRate, obj.BankId, obj.ChequeNo, obj.ChequeDate, obj.FCAmount, obj.DelFlag, obj.UserId, obj.DeptId, 
                    obj.VoucherTypePrefix, obj.Advance, obj.AdvanceAmount,obj.TransVoucherNo,obj.PDCAccountId,obj.PDCStatus,obj.TxnType, obj.ProductId, obj.ProductName);
                }

                dsDataSet = obj.ReceiptVoucherTableInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherModel RModels = new VoucherModel();
                    RModels.Status = row["Status"].ToString();
                    RModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    RModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    RModels.BalAmnt = Convert.ToDecimal(row["OutStanding"].ToString());
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
        public void RVFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.RVFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void PVFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.PVFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void JVFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.JVFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void PCFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.PCFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }

        [HttpPost]
        public void CVFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.CVFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void AVFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.AVFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void TVFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.TVFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void CNFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.CNFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void DNFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.DNFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void BPVFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.BPVFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }
        [HttpPost]
        public void BRVFolderCreate(VoucherModel VoucherModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherModel.BRVFolder + "/" + VoucherModel.DeptId + "/" + VoucherModel.VoucherNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }


        [HttpPost]
        public ActionResult RVFileInsert(VoucherModel VoucherModel)

        {
            VoucherModel obj = new VoucherModel();

            List<VoucherModel> dList = new List<VoucherModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RVFileInsert(VoucherModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherModel MModels = new VoucherModel();
                    MModels.Flag = Convert.ToInt32(row["Flag"].ToString());
                    MModels.Status = row["Status"].ToString();
                    MModels.VoucherNo = Convert.ToInt32(row["RVSlNo"].ToString());
                    MModels.VoucherType = row["VoucherType"].ToString();
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
        public ActionResult RVFileGets(VoucherModel VoucherModel)
        {
            VoucherModel obj = new VoucherModel();

            List<VoucherModel> oList = new List<VoucherModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RVFileGets(VoucherModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherModel MModels = new VoucherModel();
                    MModels.FileId = Convert.ToInt32(row["RVFileId"].ToString());
                    MModels.FileName = row["FileName"].ToString();
                    MModels.VoucherNo = Convert.ToInt32(row["RVSlNo"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["RVDeptId"].ToString());
                    MModels.Extension = row["Extension"].ToString();
                    MModels.Flag = Convert.ToInt32(row["FolderFileName"].ToString());
                    MModels.VoucherEntryDescription =row["VoucherFolderName"].ToString();
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
        public void RVFileUpload()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string FileName1 = Request.Form["FileName"];
                string DeptId = Request.Form["DeptId"];
                string SlNo = Request.Form["SlNo"];
                string Extension = Request.Form["Extension"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/ReceiptVoucher/" + DeptId + "/" + SlNo + "/"), FileName1 + "." + Extension);
                Request.Files[upload].SaveAs(path1);
            }
        }
        [HttpPost]
        public void VEFileUpload()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string FileName1 = Request.Form["FileName"];
                string DeptId = Request.Form["DeptId"];
                string SlNo = Request.Form["SlNo"];
                string Extension = Request.Form["Extension"];
                string VoucherTypes= Request.Form["VoucherType"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + VoucherTypes + "/" + DeptId + "/" + SlNo + "/"), FileName1 + "." + Extension);
                Request.Files[upload].SaveAs(path1);
            }
        }

        [HttpPost]
        public void PVFileUpload()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string FileName1 = Request.Form["FileName"];
                string DeptId = Request.Form["DeptId"];
                string SlNo = Request.Form["SlNo"];
                string Extension = Request.Form["Extension"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/PaymentVoucher/" + DeptId + "/" + SlNo + "/"), FileName1 + "." + Extension);
                Request.Files[upload].SaveAs(path1);
            }
        }

        [HttpPost]
        public ActionResult AdvanceSettlement(VoucherModel VoucherModel)
        {
            VoucherModel obj = new VoucherModel();
            List<VoucherModel> oList = new List<VoucherModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AdvanceSettlement(VoucherModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherModel MModels = new VoucherModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BalAmnt = Convert.ToDecimal(row["OutStanding"].ToString());
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
        public ActionResult RVFileDelete(VoucherModel VoucherModel)
        {
            VoucherModel obj = new VoucherModel();

            List<VoucherModel> oList = new List<VoucherModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RVFileDelete(VoucherModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherModel MModels = new VoucherModel();
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
        public ActionResult VoucherNoGetandGets(SerialNumberModel SerialNumberModel)
        {
            SerialNumberModel obj = new SerialNumberModel();

            List<SerialNumberModel> oList = new List<SerialNumberModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherNoGetandGets(SerialNumberModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SerialNumberModel VEModels = new SerialNumberModel();
                    //VEModels.Id = Convert.ToInt32(row["Id"].ToString());
                    VEModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    VEModels.VoNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    VEModels.RVNo = Convert.ToInt32(row["ReceiptVNo"].ToString());
                    VEModels.PVNo = Convert.ToInt32(row["PaymentVNo"].ToString());
                    VEModels.PDCNoRe = Convert.ToInt32(row["PDCR"].ToString());
                    VEModels.PDCNoIs = Convert.ToInt32(row["PDCI"].ToString());
                    VEModels.PettyCash = Convert.ToInt32(row["PC"].ToString());
                    VEModels.Contra = Convert.ToInt32(row["ContraNo"].ToString());
                    VEModels.AVNo = Convert.ToInt32(row["AVNo"].ToString());
                    VEModels.OPNo = Convert.ToInt32(row["OPNo"].ToString());
                    VEModels.IONo = Convert.ToInt32(row["IONo"].ToString());
                    VEModels.SNNo = Convert.ToInt32(row["SNNo"].ToString());
                    VEModels.IINo = Convert.ToInt32(row["IINo"].ToString());
                    VEModels.TVNo = Convert.ToInt32(row["TVNo"].ToString());
                    VEModels.CNNo = Convert.ToInt32(row["CNNo"].ToString());
                    VEModels.DNNo = Convert.ToInt32(row["DNNo"].ToString());
                    VEModels.CBNo = Convert.ToInt32(row["CBNo"].ToString());
                    VEModels.PNNo = Convert.ToInt32(row["PNNo"].ToString());
                    //VEModels.PettyCashPrint = Convert.ToInt32(row["PettyCashPrint"].ToString());
                    oList.Add(VEModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult VoucherNoGetandGetss(VoucherTypeModel VoucherTypeModel)
        {
            VoucherTypeModel obj = new VoucherTypeModel();

            List<VoucherTypeModel> oList = new List<VoucherTypeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherNoGetandGetss(VoucherTypeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherTypeModel VEModels = new VoucherTypeModel();
                    //VEModels.Id = Convert.ToInt32(row["Id"].ToString());
                   // VEModels.DeptId = Convert.ToInt32(row["VTypeId"].ToString());


                    VEModels.PettyCash = Convert.ToInt32(row["VoucherNo"].ToString());
                 
                    oList.Add(VEModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult AccountNoGetandGets(AccountNoGetModel AccountNoGetModel)
        {
            AccountNoGetModel obj = new AccountNoGetModel();

            List<AccountNoGetModel> oList = new List<AccountNoGetModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountNoGetandGets(AccountNoGetModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    AccountNoGetModel VEModels = new AccountNoGetModel();                    
                    VEModels.TaxAcc = row["Acc_Code"].ToString();                    
                    VEModels.TaxAccId = Convert.ToInt32(row["Acc_Id"].ToString());
                    VEModels.TaxAccName = row["Acc_Description"].ToString();

                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult VoucherEntryGetandGets(VoucherEntryModel VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();

            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherEntryGetandGets(VoucherEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel VEModels = new VoucherEntryModel();
                    VEModels.BillSerNo = row["series"].ToString();
                    VEModels.InvoNo = row["InvoNo"].ToString();
                    VEModels.AccountName = row["Acc_Description"].ToString();
                    VEModels.InvoDate = row["VDate"].ToString();
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    VEModels.Amount = Convert.ToDecimal(row["BaseTotal"].ToString());
                    VEModels.Amount1 = Convert.ToDecimal(row["FCTotal"].ToString());
                    VEModels.VEntryId = Convert.ToInt32(row["VEntryId"].ToString());
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult VoucherEntryGetandGetsUsedCar(VoucherEntryModel VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();

            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherEntryGetandGetsUsedCar(VoucherEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel VEModels = new VoucherEntryModel();
                    VEModels.BillSerNo = row["series"].ToString();
                    VEModels.InvoNo = row["InvoNo"].ToString();
                    VEModels.AccountName = row["Acc_Description"].ToString();
                    VEModels.InvoDate = row["VDate"].ToString();
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    VEModels.Amount = Convert.ToDecimal(row["BaseTotal"].ToString());
                    VEModels.Amount1 = Convert.ToDecimal(row["FCTotal"].ToString());
                    VEModels.VEntryId = Convert.ToInt32(row["VEntryId"].ToString());
                    VEModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    VEModels.DAccId = Convert.ToInt32(row["DAccId"].ToString());
                    VEModels.DAcccode = Convert.ToInt32(row["DAcccode"].ToString());
                    VEModels.ProductName = row["ProductName"].ToString();
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult VoucherEntryGetandGetss(VoucherEntryModel VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();

            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherEntryGetandGetss(VoucherEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel VEModels = new VoucherEntryModel();

                    // VEModels.InvoNo = row["InvoNo"].ToString();
                    //VEModels.VType = row["VType"].ToString();
                    //VEModels.TaxNo = row["TaxNo"].ToString();
                    //VEModels.AccountId = Convert.ToInt32(row["AccId"].ToString());
                    //VEModels.AccCode = Convert.ToInt32(row["AccCode"].ToString());

                    //VEModels.ReferenceNo = row["ReferenceNo"].ToString();
                    //VEModels.AccountName = row["Acc_Description"].ToString();
                    //VEModels.Description = row["VDescription"].ToString();
                    //VEModels.InvoDate = row["VDate"].ToString();
                    //VEModels.Amount = Convert.ToDecimal(row["BaseAmount"].ToString());

                    VEModels.VEntryId = Convert.ToInt32(row["VEntryId"].ToString());
                    VEModels.TaxNo = row["TaxNo"].ToString();
                    VEModels.TrxType = row["TxnType"].ToString();
                    VEModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    VEModels.VoucherTypeId = Convert.ToInt32(row["VTypeId"].ToString());
                    VEModels.VoucherDate = row["VDate"].ToString();
                    // VEModels.BOQDate = row["BOQDate"].ToString();
                    VEModels.VType = row["VType"].ToString();
                    VEModels.AccountName = row["AccountName"].ToString();
                    VEModels.AccountId = Convert.ToInt32(row["AccId"].ToString());
                    VEModels.AccCode = Convert.ToInt32(row["AccCode"].ToString());
                    VEModels.VoucherEntryDescription = row["VDescription"].ToString();
                    VEModels.BillSerId = row["BillSerId"].ToString();
                    VEModels.InvoDate = row["VDate"].ToString();
                    VEModels.Amount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    VEModels.ReferenceNo = row["ReferenceNo"].ToString();
                    VEModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    VEModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    VEModels.ProjectJobId = Convert.ToInt32(row["ProjttJobId"].ToString());
                    VEModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    VEModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    VEModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    VEModels.ChequeNo =row["ChequeNo"].ToString();
                    VEModels.ChequeDate = row["ChequeDate"].ToString();
                    VEModels.PDCAccount = Convert.ToInt32(row["PDCAccountId"].ToString());
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult VoucherEntryTempGets(VoucherEntryModel VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();

            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherEntryTempGets(VoucherEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel VEModels = new VoucherEntryModel();


                    VEModels.VoucherTypeId= Convert.ToInt32(row["VTypeId"].ToString());
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    VEModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    VEModels.VoucherDate = row["VDate"].ToString();
                    VEModels.VType = row["VType"].ToString();
                    VEModels.AccountId = Convert.ToInt32(row["AccId"].ToString());
                    VEModels.AccCode = Convert.ToInt32(row["AccCode"].ToString());
                    VEModels.BillSerId = row["BillSerId"].ToString();
                    VEModels.ReferenceNo = row["ReferenceNo"].ToString();
                    VEModels.Description = row["VDescription"].ToString();
                    VEModels.Amount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    VEModels.Advance = row["Advance"].ToString();
                    VEModels.AdvanceAmount = Convert.ToDecimal(row["AdvanceAmount"].ToString());
                    VEModels.ProjectJobId = Convert.ToInt32(row["ProjttJobId"].ToString());
                    VEModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    VEModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    VEModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    VEModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    VEModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    VEModels.ChequeNo = row["ChequeNo"].ToString();
                    VEModels.ChequeDate = row["ChequeDate"].ToString();
                    VEModels.PDCAccount = Convert.ToInt32(row["PDCAccountId"].ToString());
                    VEModels.PDCStatus = row["PDCStatus"].ToString();
                    VEModels.TransferVoucherNo = Convert.ToInt32(row["TransVoucherNo"].ToString());
                    VEModels.UserId= Convert.ToInt32(row["UserId"].ToString());
                    VEModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    VEModels.TrxType = row["TxnType"].ToString();
                    VEModels.TaxNo = row["TaxNo"].ToString();
                    VEModels.empId= Convert.ToInt32(row["empId"].ToString());
                    VEModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    VEModels.ProductName = row["ProductName"].ToString();
                    VEModels.AccountName = row["Acc_Description"].ToString();
                    VEModels.PDCAccountName = row["PDCAccount"].ToString();
                    VEModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());


                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult VoucherTempSaveAvail(VoucherEntryModel VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();

            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherTempSaveAvail(VoucherEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel VEModels = new VoucherEntryModel();
                    VEModels.Status = row["Status"].ToString();                 
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        

        public ActionResult SalaryGetandGets(VoucherEntryModel VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();

            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalaryGetandGets(VoucherEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel VEModels = new VoucherEntryModel();

                    VEModels.empId = Convert.ToInt32(row["EmpId1"].ToString());
                    VEModels.AccCode = Convert.ToInt32(row["Acc_Code1"].ToString());
                    VEModels.Amount = Convert.ToDecimal(row["netsalary"].ToString());
                    VEModels.VoucherDate = row["ToDate"].ToString();
                    VEModels.AccountId = Convert.ToInt32(row["salaryAccount"].ToString());
                    VEModels.Payable = Convert.ToInt32(row["Payable"].ToString());
                    VEModels.AccountName = row["Acc_Description1"].ToString();
                    VEModels.VType = row["VType1"].ToString();
                    VEModels.PayId = Convert.ToInt32(row["Acc_Id2"].ToString());
                    VEModels.PayName = row["Acc_Description2"].ToString();
                    VEModels.EmpName = row["Name"].ToString();



                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult PVoucherEntryGetandGets(VoucherEntryModel VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();

            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PVoucherEntryGetandGets(VoucherEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel VEModels = new VoucherEntryModel();
                    VEModels.BillSerNo = row["series"].ToString();
                    VEModels.InvoNo = row["InvoNo"].ToString();
                    VEModels.AccountName = row["Acc_Description"].ToString();
                    VEModels.InvoDate = row["VDate"].ToString();
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    VEModels.Amount = Convert.ToDecimal(row["BaseTotal"].ToString());
                    VEModels.Amount1 = Convert.ToDecimal(row["FCTotal"].ToString());
                    VEModels.Acob = Convert.ToDecimal(row["Acob"].ToString());

                    VEModels.CurrencyName = row["CurrencyName"].ToString();

                    VEModels.VEntryId = Convert.ToInt32(row["VEntryId"].ToString());
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult VoucherNoSearch(VoucherEntryModel VoucherEntryModel)

        {

            VoucherEntryModel obj = new VoucherEntryModel();

            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.VoucherNoSearch(VoucherEntryModel, dbName);


                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel VEModels = new VoucherEntryModel();
                    VEModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    VEModels.VoucherTypeId = Convert.ToInt32(row["VTypeId"].ToString());
                    
                    VEModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    oList.Add(VEModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult VoucherNosearchModified(PDCReceivedModel PDCReceivedModel)




        {
            PDCReceivedModel obj = new PDCReceivedModel();

            List<PDCReceivedModel> oList = new List<PDCReceivedModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherNosearchModified(PDCReceivedModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PDCReceivedModel MModels = new PDCReceivedModel();
                    //r MModels.AccCode = row["Acc_Code"].ToString();
                     MModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    MModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
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
        public ActionResult TVoucherNoGetandGets(VoucherEntryModel VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();

            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TVoucherNoGetandGets(VoucherEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel VEModels = new VoucherEntryModel();
                    VEModels.TaxNo = row["TaxNo"].ToString();
                    VEModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    VEModels.VoucherTypeId = Convert.ToInt32(row["VTypeId"].ToString());
                    VEModels.VoucherDate = row["VDate"].ToString();
                    // VEModels.BOQDate = row["BOQDate"].ToString();
                    VEModels.VType = row["VType"].ToString();
                    VEModels.AccountName = row["AccountName"].ToString();
                    VEModels.AccountId = Convert.ToInt32(row["AccId"].ToString());
                    VEModels.AccCode = Convert.ToInt32(row["AccCode"].ToString());
                    VEModels.VoucherEntryDescription = row["VDescription"].ToString();
                    VEModels.BillSerId = row["BillSerId"].ToString();
                    VEModels.InvoDate = row["VDate"].ToString();
                    VEModels.Amount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    VEModels.ReferenceNo = row["ReferenceNo"].ToString();
                    VEModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    VEModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    VEModels.ProjectJobId = Convert.ToInt32(row["ProjttJobId"].ToString());
                    VEModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    VEModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    VEModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    VEModels.ChequeNo = row["ChequeNo"].ToString();
                    VEModels.ChequeDate = row["ChequeDate"].ToString();
                    //VEModels.PDCAccount = Convert.ToInt32(row["PDCAccount"].ToString());
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    oList.Add(VEModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult AccSearch(PDCReceivedModel PDCReceivedModel)
        {
            PDCReceivedModel obj = new PDCReceivedModel();

            List<PDCReceivedModel> oList = new List<PDCReceivedModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccSearch(PDCReceivedModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PDCReceivedModel MModels = new PDCReceivedModel();
                    MModels.AccCode = row["Acc_Code"].ToString();
                    MModels.AccDescription = row["Acc_Description"].ToString();
                    MModels.AccId = Convert.ToInt32(row["Acc_Id"].ToString());
                    MModels.CustSuppId = row["CustsuppId"].ToString();
                    MModels.CustType = row["CustType"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(oList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult EmpSearch(PDCReceivedModel PDCReceivedModel)
        {
            PDCReceivedModel obj = new PDCReceivedModel();

            List<PDCReceivedModel> oList = new List<PDCReceivedModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EmpSearch(PDCReceivedModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PDCReceivedModel MModels = new PDCReceivedModel();
                    MModels.AccCode = row["EmpCode"].ToString();
                    MModels.TranCode = row["TranCode"].ToString();
                    MModels.TranName = row["TranName"].ToString();
                    MModels.AccDescription = row["Name"].ToString();
                    MModels.AccId = Convert.ToInt32(row["EmpId"].ToString());
                    MModels.TranId = Convert.ToInt32(row["AdvanceAccount"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(oList, JsonRequestBehavior.AllowGet);
        }


        //[HttpPost]
        //public ActionResult CustSuppSearch(VoucherModel VoucherModel)
        //{
        //    VoucherModel obj = new VoucherModel();

        //    List<VoucherModel> oList = new List<VoucherModel>();
        //    try
        //    {
        //        DataSet dsDataSet = new DataSet();
        //        dsDataSet = obj.CustSuppSearch(VoucherModel, dbName);
        //        foreach (DataRow row in dsDataSet.Tables[0].Rows)
        //        {
        //            VoucherModel MModels = new VoucherModel();
        //            MModels.AccCode = Convert.ToInt32(row["Acc_Code"].ToString());
        //            MModels.AccountName = row["Acc_Description"].ToString();
        //            MModels.AccountId = Convert.ToInt32(row["Acc_Id"].ToString());
        //            MModels.CustType = row["CustType"].ToString();
        //            oList.Add(MModels);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
        //    }
        //    return Json(oList, JsonRequestBehavior.AllowGet);
        //}



        [HttpPost]
        public ActionResult PDCGetandGets(PDCReceivedModel PDCReceivedModel)
        {
            PDCReceivedModel obj = new PDCReceivedModel();

            List<PDCReceivedModel> oList = new List<PDCReceivedModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PDCGetandGets(PDCReceivedModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PDCReceivedModel VEModels = new PDCReceivedModel();
                    VEModels.ChequeDtTo = row["ChequeNo"].ToString();      //Cheque NO
                    VEModels.ChequeDate = row["ChequeDate"].ToString();
                    VEModels.BankName = row["BankName"].ToString();
                    VEModels.BaseAmount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    VEModels.AccCode = row["Acc_Code"].ToString();
                    VEModels.AccId = Convert.ToInt32(row["Acc_Id"].ToString());
                    VEModels.AccDescription = row["Acc_Description"].ToString();
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    VEModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    VEModels.VoucherDate = row["VDate"].ToString();
                    VEModels.Description = row["VDescription"].ToString();
                    VEModels.RefNo = row["ReferenceNo"].ToString();

                    VEModels.ProjectJobId = Convert.ToInt32(row["ProjttJobId"].ToString());
                    VEModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    VEModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    VEModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    VEModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    VEModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    VEModels.VEId = Convert.ToInt32(row["VEntryId"].ToString());
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult PDCReceivedInsert(List<PDCReceivedModel> PDCReceivedModel)
        {
            PDCReceivedModel obj = new PDCReceivedModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PDCReceivedModel> oList = new List<PDCReceivedModel>();

            try
            {
                string[] tmpTable = new string[29];
                tmpTable[0] = "VoucherEntryId";
                tmpTable[1] = "VoucherTypeId";
                tmpTable[2] = "VoucherNo";
                tmpTable[3] = "VType";
                tmpTable[4] = "VoucherDate";
                tmpTable[5] = "BillSerId";
                tmpTable[6] = "AccountId";
                tmpTable[7] = "AccCode";
                tmpTable[8] = "VoucherEntryDescription";
                tmpTable[9] = "Amount";
                tmpTable[10] = "ReferenceNo";
                tmpTable[11] = "ProjectJobId";
                tmpTable[12] = "CostCenterId";
                tmpTable[13] = "CurrencyId";
                tmpTable[14] = "CurrencyRate";
                tmpTable[15] = "BankId";
                tmpTable[16] = "ChequeNo";
                tmpTable[17] = "ChequeDate";
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "DelFlag";
                tmpTable[20] = "UserId";
                tmpTable[21] = "DeptId";
                tmpTable[22] = "VoucherTypePrefix";
                tmpTable[23] = "Advance";
                tmpTable[24] = "AdvanceAmount";
                tmpTable[25] = "TransVoucherNo";
                tmpTable[26] = "PDCAccountId";
                tmpTable[27] = "PDCStatus";
                tmpTable[28] = "VoEId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in PDCReceivedModel)
                {
                    obj.VoucherTypeId = details.VoucherTypeId;
                    obj.VoucherNo = details.VoucherNo;
                    obj.VType = details.VType;
                    obj.VoucherDate = details.VoucherDate;
                    obj.BillSerId = details.BillSerId;
                    obj.AccId = details.AccId;
                    obj.AccCode = details.AccCode;
                    obj.Description = details.Description;
                    obj.BaseAmount = details.BaseAmount;
                    obj.RefNo = details.RefNo;
                    obj.ProjectJobId = details.ProjectJobId;
                    obj.CostCenterId = details.CostCenterId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.BankId = details.BankId;
                    obj.ChequeDtTo = details.ChequeDtTo;            //ChequeNo
                    obj.ChequeDate = details.ChequeDate;
                    obj.FCAmount = details.FCAmount;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.VoucherTypePrefix = details.VoucherTypePrefix;
                    obj.Advance = details.Advance;
                    obj.AdvanceAmount = details.AdvanceAmount;
                    obj.TransVoucherNo = details.TransVoucherNo;
                    obj.PDCAccountId = details.PDCAccountId;
                    obj.PDCStatus = details.PDCStatus; 
                    obj.VEId = details.VEId;
                    dt.Rows.Add
                    (0, obj.VoucherTypeId, obj.VoucherNo, obj.VType, obj.VoucherDate, obj.BillSerId, obj.AccId, obj.AccCode, obj.Description, obj.BaseAmount,
                    obj.RefNo, obj.ProjectJobId, obj.CostCenterId, obj.CurrencyId, obj.CurrencyRate, obj.BankId, obj.ChequeDtTo, obj.ChequeDate, obj.FCAmount, obj.DelFlag, obj.UserId, obj.DeptId,
                    obj.VoucherTypePrefix, obj.Advance, obj.AdvanceAmount, obj.TransVoucherNo, obj.PDCAccountId, obj.PDCStatus, obj.VEId);
                }

                dsDataSet = obj.PDCReceivedInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PDCReceivedModel RModels = new PDCReceivedModel();
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
        public ActionResult PDCIsGetandGets(PDCIssuedModel PDCIssuedModel)
        {
            PDCIssuedModel obj = new PDCIssuedModel();

            List<PDCIssuedModel> oList = new List<PDCIssuedModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PDCIsGetandGets(PDCIssuedModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PDCIssuedModel VEModels = new PDCIssuedModel();
                    VEModels.ChequeDtTo = row["ChequeNo"].ToString();       //Cheque No
                    VEModels.ChequeDate = row["ChequeDate"].ToString();
                    VEModels.BankName = row["BankName"].ToString();
                    VEModels.BaseAmount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    VEModels.AccCode = Convert.ToInt32(row["Acc_Code"].ToString());
                    VEModels.AccId = Convert.ToInt32(row["Acc_Id"].ToString());
                    VEModels.AccDescription = row["Acc_Description"].ToString();
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    VEModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    VEModels.VoucherDate = row["VDate"].ToString();
                    VEModels.Description = row["VDescription"].ToString();
                    VEModels.RefNo = row["ReferenceNo"].ToString();

                    VEModels.ProjectJobId = Convert.ToInt32(row["ProjttJobId"].ToString());
                    VEModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    VEModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    VEModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    VEModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    VEModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    VEModels.VEId = Convert.ToInt32(row["VEntryId"].ToString());
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ReconciliationGetandGets(ReconciliationModel PDCIssuedModel)
        {
            ReconciliationModel obj = new ReconciliationModel();

            List<ReconciliationModel> oList = new List<ReconciliationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ReconciliationGetandGets(PDCIssuedModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReconciliationModel VEModels = new ReconciliationModel();
                    VEModels.ChequeNo = row["ChequeNo"].ToString();
                    VEModels.ChequeDate = row["VDate"].ToString();
                    VEModels.BankName = row["BankName"].ToString();
                    VEModels.BaseAmount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    VEModels.AccCode = Convert.ToInt32(row["Acc_Code"].ToString());
                    VEModels.AccId = Convert.ToInt32(row["Acc_Id"].ToString());
                    VEModels.AccDescription = row["Acc_Description"].ToString();
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    VEModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    VEModels.VoucherDate = row["VDate"].ToString();
                    VEModels.Description = row["VDescription"].ToString();
                    VEModels.RefNo = row["ReferenceNo"].ToString();

                    VEModels.ProjectJobId = Convert.ToInt32(row["ProjttJobId"].ToString());
                    VEModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    VEModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    VEModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    VEModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    VEModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    VEModels.VEId = Convert.ToInt32(row["VEntryId"].ToString());
                    VEModels.bal = Convert.ToDecimal(row["bal"].ToString());
                    VEModels.obal = Convert.ToDecimal(row["obal"].ToString());
                    VEModels.VTId = row["VType"].ToString();
                    VEModels.AccName = row["Acc_name"].ToString();
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult BankbalGetandGets(ReconciliationModel PDCIssuedModel)
        {
            ReconciliationModel obj = new ReconciliationModel();

            List<ReconciliationModel> oList = new List<ReconciliationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BankbalGetandGets(PDCIssuedModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReconciliationModel VEModels = new ReconciliationModel();
                   
                    VEModels.bal = Convert.ToDecimal(row["bal"].ToString());
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ReconciliationlistandGets(ReconciliationModel PDCIssuedModel)
        {
            ReconciliationModel obj = new ReconciliationModel();

            List<ReconciliationModel> oList = new List<ReconciliationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ReconciliationlistandGets(PDCIssuedModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReconciliationModel VEModels = new ReconciliationModel();
                    VEModels.ChequeNo = row["ChequeNo"].ToString();
                    VEModels.ChequeDate = row["VDate"].ToString();
                    VEModels.BankName = row["BankName"].ToString();
                    VEModels.BaseAmount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    VEModels.AccCode = Convert.ToInt32(row["Acc_Code"].ToString());
                    VEModels.AccId = Convert.ToInt32(row["Acc_Id"].ToString());
                    VEModels.AccDescription = row["Acc_Description"].ToString();
                    VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
                    VEModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    VEModels.VoucherDate = row["VDate"].ToString();
                    VEModels.Description = row["VDescription"].ToString();
                    VEModels.RefNo = row["ReferenceNo"].ToString();

                    VEModels.ProjectJobId = Convert.ToInt32(row["ProjttJobId"].ToString());
                    VEModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    VEModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    VEModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    VEModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    VEModels.BankId = Convert.ToInt32(row["BankId"].ToString());
                    VEModels.VEId = Convert.ToInt32(row["VEntryId"].ToString());
                   // VEModels.bal = Convert.ToInt32(row["bal"].ToString());
                    VEModels.VTId = row["VType"].ToString();
                    VEModels.AccName = row["Acc_name"].ToString();
                    VEModels.Flag = row["Flag"].ToString();
                    oList.Add(VEModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ReconciliationInsert(List<ReconciliationModel> ReconciliationModel)
        {
            ReconciliationModel obj = new ReconciliationModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ReconciliationModel> oList = new List<ReconciliationModel>();

            try
            {
                string[] tmpTable = new string[4];

                tmpTable[0] = "DelFlag";
                tmpTable[1] = "BankDate";
             
                tmpTable[2] = "TransferDate";
                tmpTable[3] = "VoEId";


                dt = Common.CreateTable(tmpTable);

                foreach (var details in ReconciliationModel)
                {
                    obj.DelFlag = details.DelFlag;
                    obj.BankDate = details.BankDate;
                   
                    obj.TransferDate = details.TransferDate;
                    obj.VEId = details.VEId;

                    dt.Rows.Add
                    (obj.DelFlag, obj.BankDate,obj.TransferDate,obj.VEId);
                   
                }

                dsDataSet = obj.ReconciliationInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ReconciliationModel RModels = new ReconciliationModel();
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
        public JsonResult PDCIssuedInsert(List<PDCIssuedModel> PDCIssuedModel)
        {
            PDCIssuedModel obj = new PDCIssuedModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PDCIssuedModel> oList = new List<PDCIssuedModel>();

            try
            {
                string[] tmpTable = new string[29];
                tmpTable[0] = "VoucherEntryId";
                tmpTable[1] = "VoucherTypeId";
                tmpTable[2] = "VoucherNo";
                tmpTable[3] = "VType";
                tmpTable[4] = "VoucherDate";
                tmpTable[5] = "BillSerId";
                tmpTable[6] = "AccountId";
                tmpTable[7] = "AccCode";
                tmpTable[8] = "VoucherEntryDescription";
                tmpTable[9] = "Amount";
                tmpTable[10] = "ReferenceNo";
                tmpTable[11] = "ProjectJobId";
                tmpTable[12] = "CostCenterId";
                tmpTable[13] = "CurrencyId";
                tmpTable[14] = "CurrencyRate";
                tmpTable[15] = "BankId";
                tmpTable[16] = "ChequeNo";
                tmpTable[17] = "ChequeDate";
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "DelFlag";
                tmpTable[20] = "UserId";
                tmpTable[21] = "DeptId";
                tmpTable[22] = "VoucherTypePrefix";
                tmpTable[23] = "Advance";
                tmpTable[24] = "AdvanceAmount";
                tmpTable[25] = "TransVoucherNo";
                tmpTable[26] = "PDCAccountId";
                tmpTable[27] = "PDCStatus";
                tmpTable[28] = "VoEId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in PDCIssuedModel)
                {
                    obj.VoucherTypeId = details.VoucherTypeId;
                    obj.VoucherNo = details.VoucherNo;
                    obj.VType = details.VType;
                    obj.VoucherDate = details.VoucherDate;
                    obj.BillSerId = details.BillSerId;
                    obj.AccId = details.AccId;
                    obj.AccCode = details.AccCode;
                    obj.Description = details.Description;
                    obj.BaseAmount = details.BaseAmount;
                    obj.RefNo = details.RefNo;
                    obj.ProjectJobId = details.ProjectJobId;
                    obj.CostCenterId = details.CostCenterId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.BankId = details.BankId;
                    obj.ChequeDtTo = details.ChequeDtTo;     //Cheque No 
                    obj.ChequeDate = details.ChequeDate;
                    obj.FCAmount = details.FCAmount;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.VoucherTypePrefix = details.VoucherTypePrefix;
                    obj.Advance = details.Advance;
                    obj.AdvanceAmount = details.AdvanceAmount;
                    obj.TransVoucherNo = details.TransVoucherNo;
                    obj.PDCAccountId = details.PDCAccountId;
                    obj.PDCStatus = details.PDCStatus;
                    obj.VEId = details.VEId;
                    dt.Rows.Add
                    (0, obj.VoucherTypeId, obj.VoucherNo, obj.VType, obj.VoucherDate, obj.BillSerId, obj.AccId, obj.AccCode, obj.Description, obj.BaseAmount,
                    obj.RefNo, obj.ProjectJobId, obj.CostCenterId, obj.CurrencyId, obj.CurrencyRate, obj.BankId, obj.ChequeDtTo, obj.ChequeDate, obj.FCAmount, obj.DelFlag, obj.UserId, obj.DeptId,
                    obj.VoucherTypePrefix, obj.Advance, obj.AdvanceAmount, obj.TransVoucherNo, obj.PDCAccountId, obj.PDCStatus, obj.VEId);
                }

                dsDataSet = obj.PDCIssuedInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PDCIssuedModel RModels = new PDCIssuedModel();
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
        public JsonResult PettyCashTableInsert(List<PettyCashModel> PettyCashModel)
        {
            PettyCashModel obj = new PettyCashModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PettyCashModel> oList = new List<PettyCashModel>();

            try
            {
                string[] tmpTable = new string[28];
                tmpTable[0] = "VoucherEntryId";
                tmpTable[1] = "VoucherTypeId";
                tmpTable[2] = "VoucherNo";
                tmpTable[3] = "VType";
                tmpTable[4] = "VoucherDate";
                tmpTable[5] = "BillSerId";
                tmpTable[6] = "AccountId";
                tmpTable[7] = "AccCode";
                tmpTable[8] = "VoucherEntryDescription";
                tmpTable[9] = "Amount";
                tmpTable[10] = "ReferenceNo";
                tmpTable[11] = "ProjectJobId";
                tmpTable[12] = "CostCenterId";
                tmpTable[13] = "CurrencyId";
                tmpTable[14] = "CurrencyRate";
                tmpTable[15] = "BankId";
                tmpTable[16] = "ChequeNo";
                tmpTable[17] = "ChequeDate";
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "DelFlag";
                tmpTable[20] = "UserId";
                tmpTable[21] = "DeptId";
                tmpTable[22] = "VoucherTypePrefix";
                tmpTable[23] = "Advance";
                tmpTable[24] = "AdvanceAmount";
                tmpTable[25] = "TransVoucherNo";
                tmpTable[26] = "PDCAccountId";
                tmpTable[27] = "PDCStatus";               
                dt = Common.CreateTable(tmpTable);

                foreach (var details in PettyCashModel)
                {
                    obj.VoucherTypeId = details.VoucherTypeId;
                    obj.VoucherNo = details.VoucherNo;
                    obj.VType = details.VType;
                    obj.VoucherDate = details.VoucherDate;
                    obj.BillSerId = details.BillSerId;
                    obj.AccountId = details.AccountId;
                    obj.AccCode = details.AccCode;
                    obj.VoucherEntryDescription = details.VoucherEntryDescription;
                    obj.Amount = details.Amount;
                    obj.ReferenceNo = details.ReferenceNo;
                    obj.ProjectJobId = details.ProjectJobId;
                    obj.CostCenterId = details.CostCenterId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.BankId = details.BankId;
                    obj.ChequeNo = details.ChequeNo;
                    obj.ChequeDate = details.ChequeDate;
                    obj.FCAmount = details.FCAmount;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.VoucherTypePrefix = details.VoucherTypePrefix;
                    obj.Advance = details.Advance;
                    obj.AdvanceAmount = details.AdvanceAmount;
                    obj.TransVoucherNo = details.TransVoucherNo;
                    obj.PDCAccountId = details.PDCAccountId;
                    obj.PDCStatus = details.PDCStatus;
                    dt.Rows.Add
                     (0, obj.VoucherTypeId, obj.VoucherNo, obj.VType, obj.VoucherDate, obj.BillSerId, obj.AccountId, obj.AccCode, obj.VoucherEntryDescription, obj.Amount,
                    obj.ReferenceNo, obj.ProjectJobId, obj.CostCenterId, obj.CurrencyId, obj.CurrencyRate, obj.BankId, obj.ChequeNo, obj.ChequeDate, obj.FCAmount, obj.DelFlag, obj.UserId, obj.DeptId,
                    obj.VoucherTypePrefix, obj.Advance, obj.AdvanceAmount, obj.TransVoucherNo, obj.PDCAccountId, obj.PDCStatus);
                }

                dsDataSet = obj.PettyCashTableInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PettyCashModel RModels = new PettyCashModel();
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
        public ActionResult AccountNumberSearchCust(VoucherModel VoucherModel)
        {
            VoucherModel obj = new VoucherModel();
            List<VoucherModel> oList = new List<VoucherModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountNumberSearchCust(VoucherModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherModel MModels = new VoucherModel();
                    MModels.AccCode = Convert.ToInt64(row["Acc_Code"].ToString());
                    MModels.AccountName = row["Acc_Description"].ToString();
                    MModels.AccountId = Convert.ToInt32(row["Acc_Id"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["Id"].ToString());
                    MModels.Flag = Convert.ToInt32(row["Flag"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(oList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult VoucherwiseAccountsReport()
        {
            return View();
        }

        [HttpPost]
        public ActionResult VoucherwiseAccountGetandGets(VoucherwiseaccountReportModel VoucherwiseaccountReportModel)                              //price Manager get item in main table
        {
            VoucherwiseaccountReportModel obj = new VoucherwiseaccountReportModel();

            List<VoucherwiseaccountReportModel> oList = new List<VoucherwiseaccountReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.VoucherwiseAccountGetandGets(VoucherwiseaccountReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherwiseaccountReportModel MModels = new VoucherwiseaccountReportModel();

                    MModels.VDate = row["VDate"].ToString();
                    MModels.VTypePrefix = row["VTypePrefix"].ToString();
                    MModels.VType = row["VType"].ToString();
                    MModels.ReferenceNo = row["ReferenceNo"].ToString();
                    MModels.VoucherNo = row["VoucherNo"].ToString();
                    MModels.VDescription = row["VDescription"].ToString();                 
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.Debit = row["DEBIT"].ToString();
                    MModels.Credit = row["CREDIT"].ToString();
                    MModels.Acc_Description = row["Acc_Description"].ToString();
                    MModels.ChequeDate = row["ChequeDate"].ToString();
                    MModels.ChequeNo = row["ChequeNo"].ToString();
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.TaxNo = row["TaxNo"].ToString();
                    MModels.TxnType = row["TxnType"].ToString();
                    MModels.VTypeId = row["VTypeId"].ToString();
                    MModels.BillSerId = row["BillSerId"].ToString(); 
                    MModels.DeptId = row["DeptId"].ToString();
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
        }

        [HttpPost]
        public ActionResult OustandingReportGetandGets(OutstandingStatementModel OutstandingStatementModel)
        {
            OutstandingStatementModel obj = new OutstandingStatementModel();

            List<OutstandingStatementModel> oList = new List<OutstandingStatementModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OustandingReportGetandGets(OutstandingStatementModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    OutstandingStatementModel MModels = new OutstandingStatementModel();
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.VDate = row["VDate"].ToString();
                    MModels.AccCode = row["Acc_Code"].ToString();
                    MModels.AccName = row["Acc_Description"].ToString();
                    MModels.BaseAmount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    //MModels.DueDays = row["DueDays"].ToString();
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
        public ActionResult TrailsBalanceGetandGets(TrailBalanceRptModel TrailBalanceRptModel)
        {
            TrailBalanceRptModel obj = new TrailBalanceRptModel();

            List<TrailBalanceRptModel> oList = new List<TrailBalanceRptModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TrailsBalanceGetandGets(TrailBalanceRptModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TrailBalanceRptModel MModels = new TrailBalanceRptModel();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.AccDesc = row["Acc_Description"].ToString();
                    MModels.OPCredit = Convert.ToDecimal(row["OPCredit"].ToString());
                    MModels.OPDebit = Convert.ToDecimal(row["OPDebit"].ToString());
                    MModels.Credit = Convert.ToDecimal(row["Credit"].ToString());
                    MModels.Debit = Convert.ToDecimal(row["Debit"].ToString());
                    MModels.Balance = Convert.ToDecimal(row["Balance"].ToString());
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
        public ActionResult BalanceSheetGetandGets(BalanceSheetModel BalanceSheetModel)
        {
            BalanceSheetModel obj = new BalanceSheetModel();

            List<BalanceSheetModel> oList = new List<BalanceSheetModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BalanceSheetGetandGets(BalanceSheetModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BalanceSheetModel MModels = new BalanceSheetModel();
                    MModels.AccDesc = row["AccDesc"].ToString();
                    MModels.AssAmount = Convert.ToDecimal(row["Amount"].ToString());
                    //MModels.LiaAmount = Convert.ToDecimal(row["Balance"].ToString());
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
        public ActionResult OutstatndingStatmentPDCGetandGets(OutstatndingStatmentPDCModel OutstatndingStatmentPDCModel)
        {
            OutstatndingStatmentPDCModel obj = new OutstatndingStatmentPDCModel();

            List<OutstatndingStatmentPDCModel> oList = new List<OutstatndingStatmentPDCModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OutstatndingStatmentPDCGetandGets(OutstatndingStatmentPDCModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    OutstatndingStatmentPDCModel MModels = new OutstatndingStatmentPDCModel();
                    MModels.VoucherNo = row["VoucherNo"].ToString();
                    MModels.VTypePrefix = row["VTypePrefix"].ToString();
                    MModels.VDate = row["VDate"].ToString();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.AccName = row["Acc_Description"].ToString();
                    MModels.PDCAccCode = row["PDCAccountId"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    MModels.RefNo = row["ReferenceNo"].ToString();
                    MModels.Bank = row["BankName"].ToString();
                    MModels.ChequeNo = row["ChequeNo"].ToString();
                    MModels.ChequeDate = row["ChequeDate"].ToString();
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
        public ActionResult TrailsBalanceGroupwiseGetandGets(TrailBalanceRptModel TrailBalanceRptModel)
        {
            TrailBalanceRptModel obj = new TrailBalanceRptModel();

            List<TrailBalanceRptModel> oList = new List<TrailBalanceRptModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TrailsBalanceGroupwiseGetandGets(TrailBalanceRptModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TrailBalanceRptModel MModels = new TrailBalanceRptModel();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.AccDesc = row["Acc_Description"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
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
        public ActionResult ProfitandLoss(TrailBalanceRptModel TrailBalanceRptModel)
        {
            TrailBalanceRptModel obj = new TrailBalanceRptModel();

            List<TrailBalanceRptModel> oList = new List<TrailBalanceRptModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProfitandLoss(TrailBalanceRptModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TrailBalanceRptModel MModels = new TrailBalanceRptModel();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.AccDesc = row["Acc_Description"].ToString();
                    MModels.OPCredit = Convert.ToDecimal(row["OPCredit"].ToString());
                    MModels.OPDebit = Convert.ToDecimal(row["OPDebit"].ToString());
                    MModels.Credit = Convert.ToDecimal(row["Credit"].ToString());
                    MModels.Debit = Convert.ToDecimal(row["Debit"].ToString());
                    MModels.Balance = Convert.ToDecimal(row["Balance"].ToString());
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
        public ActionResult BalanceSheetAsOn(TrailBalanceRptModel TrailBalanceRptModel)
        {
            TrailBalanceRptModel obj = new TrailBalanceRptModel();

            List<TrailBalanceRptModel> oList = new List<TrailBalanceRptModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BalanceSheetAsOn(TrailBalanceRptModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TrailBalanceRptModel MModels = new TrailBalanceRptModel();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.AccDesc = row["Acc_Description"].ToString();
                    MModels.OPCredit = Convert.ToDecimal(row["OPCredit"].ToString());
                    MModels.OPDebit = Convert.ToDecimal(row["OPDebit"].ToString());
                    MModels.Credit = Convert.ToDecimal(row["Credit"].ToString());
                    MModels.Debit = Convert.ToDecimal(row["Debit"].ToString());
                    MModels.Balance = Convert.ToDecimal(row["Balance"].ToString());
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
        public ActionResult BalanceSheetSummary(TrailBalanceRptModel TrailBalanceRptModel)
        {
            TrailBalanceRptModel obj = new TrailBalanceRptModel();
            List<TrailBalanceRptModel> oList = new List<TrailBalanceRptModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BalanceSheetSummary(TrailBalanceRptModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    TrailBalanceRptModel MModels = new TrailBalanceRptModel();
                    MModels.AccCode = row["AccCode"].ToString();
                    MModels.AccDesc = row["AccName"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());                    
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


    






        public JsonResult pettycashinsert(List<VoucherEntryModel> VoucherEntryModel)
        {
            VoucherEntryModel obj = new VoucherEntryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<VoucherEntryModel> oList = new List<VoucherEntryModel>();

            try
            {
                string[] tmpTable = new string[32];
                tmpTable[0] = "VoucherEntryId";
                tmpTable[1] = "VoucherTypeId";
                tmpTable[2] = "VoucherNo";
                tmpTable[3] = "TransferVoucherNo";
                tmpTable[4] = "VoucherDate";
                tmpTable[5] = "BillSerId";
                tmpTable[6] = "VType";
                tmpTable[7] = "AccountId";
                tmpTable[8] = "AccCode";
                tmpTable[9] = "VoucherEntryDescription";
                tmpTable[10] = "Amount";
                tmpTable[11] = "ReferenceNo";
                tmpTable[12] = "ProjectJobId";
                tmpTable[13] = "CostCenterId";
                tmpTable[14] = "CurrencyId";
                tmpTable[15] = "CurrencyRate";
                tmpTable[16] = "BankId";
                tmpTable[17] = "ChequeNo";
                tmpTable[18] = "ChequeDate";
                tmpTable[19] = "PDCAccountId";
                tmpTable[20] = "FCAmount";
                tmpTable[21] = "DelFlag";
                tmpTable[22] = "UserId";
                tmpTable[23] = "DeptId";
                tmpTable[24] = "VoucherTypePrefix";
                tmpTable[25] = "Advance";
                tmpTable[26] = "AdvanceAmount";
                tmpTable[27] = "PDCStatus";
                tmpTable[28] = "TaxNo";
                tmpTable[29] = "TrxType";
                tmpTable[30] = "empId";
                tmpTable[31] = "AssetId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in VoucherEntryModel)
                {
                    obj.VoucherTypeId = details.VoucherTypeId;
                    obj.VoucherNo = details.VoucherNo;
                    obj.TransferVoucherNo = details.TransferVoucherNo;
                    obj.VoucherDate = details.VoucherDate;
                    obj.BillSerId = details.BillSerId;
                    obj.VType = details.VType;
                    obj.AccountId = details.AccountId;
                    obj.AccCode = details.AccCode;
                    obj.VoucherEntryDescription = details.VoucherEntryDescription;
                    obj.Amount = details.Amount;
                    obj.ReferenceNo = details.ReferenceNo;
                    obj.ProjectJobId = details.ProjectJobId;
                    obj.CostCenterId = details.CostCenterId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.BankId = details.BankId;
                    obj.ChequeNo = details.ChequeNo;
                    obj.ChequeDate = details.ChequeDate;
                    obj.PDCAccount = details.PDCAccount;
                    obj.FCAmount = details.FCAmount;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.VoucherTypePrefix = details.VoucherTypePrefix;
                    obj.Advance = details.Advance;
                    obj.AdvanceAmount = details.AdvanceAmount;
                    obj.PDCStatus = details.PDCStatus;
                    obj.TaxNo = details.TaxNo;
                    obj.TrxType = details.TrxType;
                    obj.empId = details.empId;
                    obj.AssetId = details.AssetId;
                    dt.Rows.Add
                    (0, obj.VoucherTypeId, obj.VoucherNo, obj.TransferVoucherNo, obj.VoucherDate, obj.BillSerId, obj.VType, obj.AccountId, obj.AccCode, obj.VoucherEntryDescription, obj.Amount,
                    obj.ReferenceNo, obj.ProjectJobId, obj.CostCenterId, obj.CurrencyId, obj.CurrencyRate, obj.BankId, obj.ChequeNo, obj.ChequeDate, obj.PDCAccount,
                    obj.FCAmount, obj.DelFlag, obj.UserId, obj.DeptId, obj.VoucherTypePrefix, obj.Advance, obj.AdvanceAmount, obj.PDCStatus, obj.TaxNo, obj.TrxType, obj.empId, obj.AssetId);
                }


                dsDataSet = obj.pettycashinsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherEntryModel LModels = new VoucherEntryModel();
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





        //public ActionResult pettycashinsert(VoucherEntryModel VoucherEntryModel)

        //{

        //    VoucherEntryModel obj = new VoucherEntryModel();

        //    List<VoucherEntryModel> oList = new List<VoucherEntryModel>();
        //    try
        //    {
        //        DataSet dsDataSet = new DataSet();

        //        dsDataSet = obj.pettycashinsert(VoucherEntryModel, dbName);


        //        foreach (DataRow row in dsDataSet.Tables[0].Rows)
        //        {
        //            VoucherEntryModel VEModels = new VoucherEntryModel();
        //            VEModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
        //            VEModels.VoucherTypePrefix = row["VTypePrefix"].ToString();
        //            VEModels.VoucherTypeId = Convert.ToInt32(row["VTypeId"].ToString());

        //            VEModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
        //            oList.Add(VEModels);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
        //    }

        //    return Json(oList, JsonRequestBehavior.AllowGet);

        //}




        [HttpPost]
        public ActionResult ReceiptVoucherGetandGets(VoucherModel VoucherModel)
        {
            VoucherModel obj = new VoucherModel();

            List<VoucherModel> oList = new List<VoucherModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ReceiptVoucherGetandGets(VoucherModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherModel MModels = new VoucherModel();
                    MModels.VoucherEntryId = Convert.ToInt32(row["VEntryId"].ToString());
                    MModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    MModels.TxnType = row["TxnType"].ToString();
                    MModels.ChequeNo = row["ChequeNo"].ToString();
                    MModels.ChequeDate = row["ChequeDate"].ToString();
                    MModels.BankName = row["BankId"].ToString();
                    MModels.AccountId = Convert.ToInt32(row["AccId"].ToString());
                    MModels.Customer = row["Acc_Description"].ToString();
                    MModels.VoucherDate = row["VDate"].ToString();
                    MModels.costcenter = row["CostCenterId"].ToString();
                    MModels.ProjectJob = row["ProjttJobId"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.FCRecAmnt = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.VoucherEntryDescription = row["VDescription"].ToString();
                    MModels.RecAmnt = Convert.ToDecimal(row["BaseAmount"].ToString());

                    MModels.VoucherType = row["VType"].ToString();



                    //MModels.BaseAmt = Convert.ToDecimal(row["BASESUM"].ToString());
                    //MModels.BalAmnt = Convert.ToDecimal(row["BALAMOUNT"].ToString());
                    //MModels.FCBaseAmt = Convert.ToDecimal(row["FCSUM"].ToString());
                    //MModels.FCBalAmnt = Convert.ToDecimal(row["BALFC"].ToString());
                    MModels.ReferenceNo = row["ReferenceNo"].ToString();
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
          //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        [HttpPost]
        public ActionResult PaymentVoucherGetandGets(VoucherModel VoucherModel)
        {
            VoucherModel obj = new VoucherModel();

            List<VoucherModel> oList = new List<VoucherModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PaymentVoucherGetandGets(VoucherModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    VoucherModel MModels = new VoucherModel();
                    MModels.VoucherEntryId = Convert.ToInt32(row["VEntryId"].ToString());
                    MModels.VoucherNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    MModels.TxnType = row["TxnType"].ToString();
                    MModels.ChequeNo = row["ChequeNo"].ToString();
                    MModels.ChequeDate = row["ChequeDate"].ToString();
                    MModels.BankName = row["BankId"].ToString();
                    MModels.AccountId = Convert.ToInt32(row["AccId"].ToString());
                    MModels.Customer = row["Acc_Description"].ToString();
                    MModels.VoucherDate = row["VDate"].ToString();
                    MModels.costcenter = row["CostCenterId"].ToString();
                    MModels.ProjectJob = row["ProjttJobId"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.FCRecAmnt = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.VoucherEntryDescription = row["VDescription"].ToString();
                    MModels.RecAmnt = Convert.ToDecimal(row["BaseAmount"].ToString());
                    MModels.VoucherType = row["VType"].ToString();


                    //MModels.BaseAmt = Convert.ToDecimal(row["BASESUM"].ToString());
                    //MModels.BalAmnt = Convert.ToDecimal(row["BALAMOUNT"].ToString());
                    //MModels.FCBaseAmt = Convert.ToDecimal(row["FCSUM"].ToString());
                    //MModels.FCBalAmnt = Convert.ToDecimal(row["BALFC"].ToString());
                    MModels.ReferenceNo = row["ReferenceNo"].ToString();
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
          //  return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

    }
}