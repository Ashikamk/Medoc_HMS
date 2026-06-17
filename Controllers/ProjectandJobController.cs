using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Controllers
{
    public class ProjectandJobController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
       // GET: ProjectandJob
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Rpt_GetProjectList(InvReportModel InvReportModel)
        {
            InvReportModel obj = new InvReportModel();

            List<InvReportModel> oList = new List<InvReportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Rpt_GetProjectList(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    InvReportModel Reptmodels = new InvReportModel();
                    Reptmodels.JobCode = row["JobCode"].ToString();
                    Reptmodels.Description = row["Description"].ToString();
                    Reptmodels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    Reptmodels.LPO = row["LPO"].ToString();
                    Reptmodels.StartDate = row["StartDate"].ToString();
                    Reptmodels.EndDate = row["EndDate"].ToString();
                    Reptmodels.Status = row["Status"].ToString();
                    Reptmodels.CustName = row["CustName"].ToString();
                    Reptmodels.FirstName = row["FirstName"].ToString();
                    Reptmodels.BOQSlNo = Convert.ToInt32(row["BOQSlNo"].ToString());
                    Reptmodels.BOQDate = row["BOQDate"].ToString();
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

        public ActionResult ProjectJobReport()
        {
            return View();
        }
        public ActionResult ToolsManagement()
        {
            return View();
        }
        public ActionResult ToolsTransactionReport()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Rpt_ToolsTransactionReport(ToolsManagementModel InvReportModel)
        {
            ToolsManagementModel obj = new ToolsManagementModel();

            List<ToolsManagementModel> oList = new List<ToolsManagementModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Rpt_ToolsTransactionReport(InvReportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ToolsManagementModel Reptmodels = new ToolsManagementModel();
                    Reptmodels.JobCodes = row["RESULTJOBCODE"].ToString();
                    Reptmodels.Desc = row["RESULTJOBDESC"].ToString();
                    Reptmodels.VocNo = Convert.ToInt32(row["TMNO"].ToString());
                    Reptmodels.ToolCode = row["TMCODE"].ToString();
                    Reptmodels.ToolDesc = row["TMDESC"].ToString();
                    Reptmodels.IssuedQty = Convert.ToInt32(row["ISSUEDQTY"].ToString());
                    Reptmodels.Quantity = Convert.ToInt32(row["RETURNQTY"].ToString());
                    Reptmodels.Date = row["TMDATE"].ToString();
                    Reptmodels.Balance = Convert.ToInt32(row["BALANCE"].ToString());
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

        public ActionResult BillofQuantity()
        {
            return View();
        }
        public ActionResult MaterialJobRequest()
        {
            return View();
        }
        public ActionResult MaterialReturn()
        {
            return View();
        }
        public ActionResult BOQResource()
        {
            return View();
        }
        public ActionResult MaterialIssue()
        {
            return View();
        }
        public ActionResult MaterialRequestApproval()
        {
            return View();
        }
        public ActionResult ProjectAnalysis()
        {
            return View();
        }
        [HttpPost]
        public JsonResult ToolsManagementInsert(List<ToolsManagementModel> ToolsManagementModel)
        {
            ToolsManagementModel obj = new ToolsManagementModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ToolsManagementModel> oList = new List<ToolsManagementModel>();
            try
            {
                string[] tmpTable = new string[22];
                tmpTable[0] = "ToolsManagementId";
                tmpTable[1] = "VocNo";
                tmpTable[2] = "Date";
                tmpTable[3] = "IssuedById";
                tmpTable[4] = "CustodianId";
                tmpTable[5] = "JobCodeId";
                tmpTable[6] = "ExpDate";
                tmpTable[7] = "MainRemarks";
                tmpTable[8] = "Comments";
                tmpTable[9] = "TotPcs";
                tmpTable[10] = "TotQty";
                tmpTable[11] = "ManagementType";
                tmpTable[12] = "ToolId";
                tmpTable[13] = "ToolCode";
                tmpTable[14] = "ToolDesc";
                tmpTable[15] = "Pcs";
                tmpTable[16] = "SerialNo";
                tmpTable[17] = "Quantity";
                tmpTable[18] = "SubRemarks";
                tmpTable[19] = "DeptId";
                tmpTable[20] = "UserId";
                tmpTable[21] = "DelFlag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ToolsManagementModel)
                {
                    obj.ToolsManagementId = details.ToolsManagementId;
                    obj.VocNo = details.VocNo;
                    obj.Date = details.Date;
                    obj.IssuedById = details.IssuedById;
                    obj.CustodianId = details.CustodianId;
                    obj.JobCodeId = details.JobCodeId;
                    obj.ExpDate = details.ExpDate;
                    obj.MainRemarks = details.MainRemarks;
                    obj.Comments = details.Comments;
                    obj.TotPcs = details.TotPcs;
                    obj.TotQty = details.TotQty;
                    obj.ManagementType = details.ManagementType;
                    obj.ToolId = details.ToolId;
                    obj.ToolCode = details.ToolCode;
                    obj.ToolDesc = details.ToolDesc;
                    obj.Pcs = details.Pcs;
                    obj.SerialNo = details.SerialNo;
                    obj.Quantity = details.Quantity;
                    obj.SubRemarks = details.SubRemarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add
                    (obj.ToolsManagementId, obj.VocNo, obj.Date, obj.IssuedById, obj.CustodianId, obj.JobCodeId, obj.ExpDate, obj.MainRemarks, obj.Comments,
                    obj.TotPcs, obj.TotQty, obj.ManagementType, obj.ToolId, obj.ToolCode, obj.ToolDesc, obj.Pcs, obj.SerialNo, obj.Quantity, obj.SubRemarks,
                    obj.DeptId, obj.UserId, obj.DelFlag);
                }

                dsDataSet = obj.ToolsManagementInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ToolsManagementModel TMModels = new ToolsManagementModel();

                    TMModels.Status = row["Status"].ToString();
                    TMModels.VocNo = Convert.ToInt32(row["MainVoucherNo"].ToString());
                    oList.Add(TMModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ToolsManagementList(ToolsManagementModel ToolsManagementModel)
        {
            ToolsManagementModel obj = new ToolsManagementModel();

            List<ToolsManagementModel> oList = new List<ToolsManagementModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ToolsManagementList(ToolsManagementModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ToolsManagementModel TMModels = new ToolsManagementModel();
                    TMModels.ToolsManagementId = Convert.ToInt32(row["ToolMainId"].ToString());
                    TMModels.VocNo= Convert.ToInt32(row["MainVoucherNo"].ToString());
                    TMModels.ManagementType = row["ManagementType"].ToString();
                    TMModels.Date = row["ToolDate"].ToString();
                    TMModels.IssueName = row["IssueName"].ToString();
                    TMModels.CustodianName = row["CustodianName"].ToString();
                    TMModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    oList.Add(TMModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ToolManagementGetandGets(ToolsManagementModel ToolsManagementModel)
        {
            ToolsManagementModel obj = new ToolsManagementModel();

            List<ToolsManagementModel> oList = new List<ToolsManagementModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ToolManagementGetandGets(ToolsManagementModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ToolsManagementModel MModels = new ToolsManagementModel();
                    MModels.ToolsManagementId = Convert.ToInt32(row["ToolMainId"].ToString());
                    MModels.VocNo = Convert.ToInt32(row["MainVoucherNo"].ToString());
                    MModels.ManagementType = row["ManagementType"].ToString();
                    MModels.Date = row["ToolDate"].ToString();
                    MModels.IssuedById = Convert.ToInt32(row["IssuedById"].ToString());
                    MModels.IssueName = row["IssueName"].ToString();
                    MModels.CustodianId = Convert.ToInt32(row["CustodianId"].ToString());
                    MModels.CustodianName = row["CustodianName"].ToString();
                    MModels.JobCodeId = Convert.ToInt32(row["JobCodeId"].ToString());
                    MModels.JobCodes = row["JobCode"].ToString();
                    MModels.ExpDate = row["ExpDate"].ToString();
                    MModels.MainRemarks = row["MainRemarks"].ToString();
                    MModels.SubRemarks = row["SubRemarks"].ToString();
                    MModels.Comments = row["Comments"].ToString();
                    MModels.TotQty = Convert.ToInt32(row["TotQty"].ToString());
                    MModels.TotPcs = Convert.ToInt32(row["TotPcs"].ToString());
                    MModels.ToolId = Convert.ToInt32(row["ToolId"].ToString());
                    MModels.ToolCode = row["ToolCode"].ToString();
                    MModels.ToolDesc = row["ToolDescription"].ToString();
                    MModels.Pcs = Convert.ToInt32(row["PCS"].ToString());
                    MModels.SerialNo = row["SerialNo"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.EmpCode = row["EmpCode"].ToString();
                    MModels.Desc = row["Description"].ToString();
                    MModels.ToolQty = Convert.ToInt32(row["ToolQty"].ToString());
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
        public JsonResult ToolManagementUpdate(List<ToolsManagementModel> ToolsManagementModel)
        {
            ToolsManagementModel obj = new ToolsManagementModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ToolsManagementModel> oList = new List<ToolsManagementModel>();
            try
            {
                string[] tmpTable = new string[22];
                tmpTable[0] = "ToolsManagementId";
                tmpTable[1] = "VocNo";
                tmpTable[2] = "Date";
                tmpTable[3] = "IssuedById";
                tmpTable[4] = "CustodianId";
                tmpTable[5] = "JobCodeId";
                tmpTable[6] = "ExpDate";
                tmpTable[7] = "MainRemarks";
                tmpTable[8] = "Comments";
                tmpTable[9] = "TotPcs";
                tmpTable[10] = "TotQty";
                tmpTable[11] = "ManagementType";
                tmpTable[12] = "ToolId";
                tmpTable[13] = "ToolCode";
                tmpTable[14] = "ToolDesc";
                tmpTable[15] = "Pcs";
                tmpTable[16] = "SerialNo";
                tmpTable[17] = "Quantity";
                tmpTable[18] = "SubRemarks";
                tmpTable[19] = "DeptId";
                tmpTable[20] = "UserId";
                tmpTable[21] = "DelFlag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ToolsManagementModel)
                {
                    obj.ToolsManagementId = details.ToolsManagementId;
                    obj.VocNo = details.VocNo;
                    obj.Date = details.Date;
                    obj.IssuedById = details.IssuedById;
                    obj.CustodianId = details.CustodianId;
                    obj.JobCodeId = details.JobCodeId;
                    obj.ExpDate = details.ExpDate;
                    obj.MainRemarks = details.MainRemarks;
                    obj.Comments = details.Comments;
                    obj.TotPcs = details.TotPcs;
                    obj.TotQty = details.TotQty;
                    obj.ManagementType = details.ManagementType;
                    obj.ToolId = details.ToolId;
                    obj.ToolCode = details.ToolCode;
                    obj.ToolDesc = details.ToolDesc;
                    obj.Pcs = details.Pcs;
                    obj.SerialNo = details.SerialNo;
                    obj.Quantity = details.Quantity;
                    obj.SubRemarks = details.SubRemarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add
                    (obj.ToolsManagementId, obj.VocNo, obj.Date, obj.IssuedById, obj.CustodianId, obj.JobCodeId, obj.ExpDate, obj.MainRemarks, obj.Comments,
                    obj.TotPcs, obj.TotQty, obj.ManagementType, obj.ToolId, obj.ToolCode, obj.ToolDesc, obj.Pcs, obj.SerialNo, obj.Quantity, obj.SubRemarks,
                    obj.DeptId, obj.UserId, obj.DelFlag);
                }

                dsDataSet = obj.ToolManagementUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ToolsManagementModel TMModels = new ToolsManagementModel();

                    TMModels.Status = row["Status"].ToString();
                    TMModels.VocNo = Convert.ToInt32(row["MainVoucherNo"].ToString());
                    oList.Add(TMModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ToolManagementDelete(ToolsManagementModel ToolsManagementModel)
        {
            ToolsManagementModel obj = new ToolsManagementModel();
            List<ToolsManagementModel> oList = new List<ToolsManagementModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ToolManagementDelete(ToolsManagementModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ToolsManagementModel MModels = new ToolsManagementModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.VocNo = Convert.ToInt32(row["MainVoucherNo"].ToString());
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
        public ActionResult TMNoSearch(ToolsManagementModel ToolsManagementModel)
        { 
            ToolsManagementModel obj = new ToolsManagementModel();

            List<ToolsManagementModel> oList = new List<ToolsManagementModel>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.TMNoSearch(ToolsManagementModel, dbName);


                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ToolsManagementModel MMModels = new ToolsManagementModel();
                    MMModels.VocNo = Convert.ToInt32(row["MainVoucherNo"].ToString());
                    MMModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MMModels.JobCodeId = Convert.ToInt32(row["JobCodeId"].ToString());
                    MMModels.JobCodes = row["JobCode"].ToString();
                    oList.Add(MMModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult BillofQuantityInsertandUpdate(List<BillofQuantityModel> BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                string[] tmpTable = new string[25];
                tmpTable[0] = "BOQSlNo";
                tmpTable[1] = "BOQDate";
                tmpTable[2] = "ExpDate";
                tmpTable[3] = "JobCodeId";
                tmpTable[4] = "CurrencyId";
                tmpTable[5] = "CurrencyRate";
                tmpTable[6] = "Comments";
                tmpTable[7] = "EngineerId";
                tmpTable[8] = "Location";
                tmpTable[9] = "DeptId";
                tmpTable[10] = "UserId";
                tmpTable[11] = "ProductId";
                tmpTable[12] = "ProductCode";
                tmpTable[13] = "Description";
                tmpTable[14] = "UnitId";
                tmpTable[15] = "Quantity";
                tmpTable[16] = "Rate";
                tmpTable[17] = "Cost";
                tmpTable[18] = "Margin";
                tmpTable[19] = "TotalAmount";
                tmpTable[20] = "GrandTotal";
                tmpTable[21] = "Resource";
                tmpTable[22] = "Remarks";
                tmpTable[23] = "DelFlag";
                tmpTable[24] = "Flag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in BillofQuantityModel)
                {
                    obj.BOQSlNo = details.BOQSlNo;
                    obj.BOQDate = details.BOQDate;
                    obj.ExpDate = details.ExpDate;
                    obj.JobCodeId = details.JobCodeId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.Comments = details.Comments;
                    obj.EngineerId = details.EngineerId;
                    obj.Location = details.Location;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.Description = details.Description;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Rate = details.Rate;
                    obj.Cost = details.Cost;
                    obj.Margin = details.Margin;
                    obj.TotalAmount = details.TotalAmount;
                    obj.GrandTotal = details.GrandTotal;
                    obj.Resource = details.Resource;
                    obj.Remarks = details.Remarks;
                    obj.DelFlag = details.DelFlag;
                    obj.Flag = details.Flag;
                    dt.Rows.Add
                    (obj.BOQSlNo, obj.BOQDate, obj.ExpDate, obj.JobCodeId, obj.CurrencyId, obj.CurrencyRate, obj.Comments, obj.EngineerId, obj.Location, obj.DeptId, obj.UserId, 
                    obj.ProductId, obj.ProductCode, obj.Description, obj.UnitId, obj.Quantity, obj.Rate, obj.Cost, obj.Margin, obj.TotalAmount, obj.GrandTotal, obj.Resource, obj.Remarks,obj.DelFlag,obj.Flag);
                }

                dsDataSet = obj.BillofQuantityInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel BQModels = new BillofQuantityModel();

                    BQModels.Status = row["Status"].ToString();
                    BQModels.BOQSlNo = Convert.ToInt32(row["boqnum"].ToString());
                    oList.Add(BQModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult BillofQuantityUpdate(List<BillofQuantityModel> BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                string[] tmpTable = new string[25];
                tmpTable[0] = "BOQSlNo";
                tmpTable[1] = "BOQDate";
                tmpTable[2] = "ExpDate";
                tmpTable[3] = "JobCodeId";
                tmpTable[4] = "CurrencyId";
                tmpTable[5] = "CurrencyRate";
                tmpTable[6] = "Comments";
                tmpTable[7] = "EngineerId";
                tmpTable[8] = "Location";
                tmpTable[9] = "DeptId";
                tmpTable[10] = "UserId";
                tmpTable[11] = "ProductId";
                tmpTable[12] = "ProductCode";
                tmpTable[13] = "Description";
                tmpTable[14] = "UnitId";
                tmpTable[15] = "Quantity";
                tmpTable[16] = "Rate";
                tmpTable[17] = "Cost";
                tmpTable[18] = "Margin";
                tmpTable[19] = "TotalAmount";
                tmpTable[20] = "GrandTotal";
                tmpTable[21] = "Resource";
                tmpTable[22] = "Remarks";
                tmpTable[23] = "DelFlag";
                tmpTable[24] = "Flag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in BillofQuantityModel)
                {
                    obj.BOQSlNo = details.BOQSlNo;
                    obj.BOQDate = details.BOQDate;
                    obj.ExpDate = details.ExpDate;
                    obj.JobCodeId = details.JobCodeId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.Comments = details.Comments;
                    obj.EngineerId = details.EngineerId;
                    obj.Location = details.Location;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.Description = details.Description;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Rate = details.Rate;
                    obj.Cost = details.Cost;
                    obj.Margin = details.Margin;
                    obj.TotalAmount = details.TotalAmount;
                    obj.GrandTotal = details.GrandTotal;
                    obj.Resource = details.Resource;
                    obj.Remarks = details.Remarks;
                    obj.DelFlag = details.DelFlag;
                    obj.Flag = details.Flag;
                    dt.Rows.Add
                    (obj.BOQSlNo, obj.BOQDate, obj.ExpDate, obj.JobCodeId, obj.CurrencyId, obj.CurrencyRate, obj.Comments, obj.EngineerId, obj.Location, obj.DeptId, obj.UserId,
                    obj.ProductId, obj.ProductCode, obj.Description, obj.UnitId, obj.Quantity, obj.Rate, obj.Cost, obj.Margin, obj.TotalAmount, obj.GrandTotal, obj.Resource, obj.Remarks, obj.DelFlag, obj.Flag);
                }

                dsDataSet = obj.BillofQuantityUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel BQModels = new BillofQuantityModel();

                    BQModels.Status = row["Status"].ToString();
                    BQModels.BOQSlNo = Convert.ToInt32(row["BOQNo"].ToString());
                    oList.Add(BQModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult BOQSlNoGetandGets(SerialNumberModel SerialNumberModel)
        {
            SerialNumberModel obj = new SerialNumberModel();

            List<SerialNumberModel> oList = new List<SerialNumberModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BOQSlNoGetandGets(SerialNumberModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SerialNumberModel BQModels = new SerialNumberModel();
                    BQModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    BQModels.BOQNo = Convert.ToInt32(row["BOQNo"].ToString());
                    
                    oList.Add(BQModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult BillofQuantityGetandGets(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BillofQuantityGetandGets(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel BQModels = new BillofQuantityModel();
                    BQModels.BOQSlNo = Convert.ToInt32(row["BOQSlNo"].ToString());
                    BQModels.BOQDate = row["BOQDate"].ToString();
                    BQModels.ExpDate = row["ExpDate"].ToString();
                    BQModels.JobCodeId = Convert.ToInt32(row["JobCodeId"].ToString());
                    BQModels.JobCode = row["JobCode"].ToString();
                    BQModels.JobDescription = row["Description"].ToString();
                    BQModels.LPO = row["LPO"].ToString();
                    BQModels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    BQModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    BQModels.Customer = row["CustName"].ToString();
                    BQModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    BQModels.FC = row["CurrencyName"].ToString();
                    BQModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    BQModels.Comments = row["Comments"].ToString();
                    BQModels.EngineerId = Convert.ToInt32(row["EngineerId"].ToString());
                    BQModels.Location = row["Location"].ToString();
                    BQModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    BQModels.Product = row["ProductCode"].ToString();
                    BQModels.Description = row["Description"].ToString();
                    BQModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    BQModels.Unit = row["UnitName"].ToString();
                    BQModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    BQModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    BQModels.Cost = Convert.ToDecimal(row["Cost"].ToString());
                    BQModels.Margin = Convert.ToDecimal(row["Margin"].ToString());
                    BQModels.TotalAmount = Convert.ToDecimal(row["TotalAmount"].ToString());
                    BQModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    BQModels.ResourceId = row["Resource"].ToString();
                    BQModels.Resource = row["ResourceCode"].ToString();
                    BQModels.Remarks = row["Remarks"].ToString();
                    oList.Add(BQModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult BOQNoSearch(BillofQuantityModel BillofQuantityModel)

        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.BOQNoSearch(BillofQuantityModel, dbName);


                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel BQModels = new BillofQuantityModel();
                    BQModels.BOQSlNo = Convert.ToInt32(row["BOQSlNo"].ToString());
                    BQModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    BQModels.JobCodeId = Convert.ToInt32(row["JobCodeId"].ToString());
                    BQModels.JobCode = row["JobCode"].ToString();
                    oList.Add(BQModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult MaterialIssueSearch(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.MaterialIssueSearch(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel BQModels = new BillofQuantityModel();
                    BQModels.MINo = row["MINo"].ToString();
                    BQModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    BQModels.JobCodeId = Convert.ToInt32(row["JobCodeId"].ToString());
                    BQModels.JobCode = row["JobCode"].ToString();
                    oList.Add(BQModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(oList, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult BOQDelete(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();
            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BOQDelete(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel LModels = new BillofQuantityModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.BOQSlNo = Convert.ToInt32(row["BOQNo"].ToString());
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
        public ActionResult MaterialIssueAccountGet(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialIssueAccountGet(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel VEModels = new BillofQuantityModel();
                    VEModels.CreditAccId        = row["CreditAccId"].ToString();
                    VEModels.CreditAccount      = row["CreditAccount"].ToString();
                    VEModels.CreditAccountDesc  = row["CreditAccountDesc"].ToString();
                    VEModels.DebitAccId         = row["DebitAccId"].ToString();
                    VEModels.DebitAccount       = row["DebitAccount"].ToString();
                    VEModels.DebitAccountDesc   = row["DebitAccountDesc"].ToString();
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
        public JsonResult MaterialIssueInsert(List<BillofQuantityModel> BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                string[] tmpTable = new string[24];
                tmpTable[0] = "MIMainId";
                tmpTable[1] = "MINo";
                tmpTable[2] = "MIDate";
                tmpTable[3] = "JobCodeId";
                tmpTable[4] = "CreditAccount";
                tmpTable[5] = "DebitAccount";
                tmpTable[6] = "Remarks";
                tmpTable[7] = "Comments";
                tmpTable[8] = "GrandTotal";
                tmpTable[9] = "MRNo";
                tmpTable[10] = "DeptId";
                tmpTable[11] = "UserId";

                tmpTable[12] = "MISubId";
                tmpTable[13] = "ProductId";
                tmpTable[14] = "ProductCode";
                tmpTable[15] = "Description";
                tmpTable[16] = "Location";
                tmpTable[17] = "UnitId";
                tmpTable[18] = "Quantity";
                tmpTable[19] = "Rate";
                tmpTable[20] = "Stock";
                tmpTable[21] = "TotalAmount";
                tmpTable[22] = "CostCodeId";
                tmpTable[23] = "DelFlag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in BillofQuantityModel)
                {
                    obj.MIMainId = details.MIMainId;
                    obj.MINo = details.MINo;
                    obj.MIDate = details.MIDate;
                    obj.JobCodeId = details.JobCodeId;
                    obj.CreditAccount = details.CreditAccount;
                    obj.DebitAccount = details.DebitAccount;
                    obj.Remarks = details.Remarks;
                    obj.Comments = details.Comments;
                    obj.GrandTotal = details.GrandTotal;
                    obj.MRNo = details.MRNo;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;

                    obj.MISubId = details.MISubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.Description = details.Description;
                    obj.Location = details.Location;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Rate = details.Rate;
                    obj.Stock = details.Stock;
                    obj.TotalAmount = details.TotalAmount;
                    obj.CostCodeId = details.CostCodeId;
                    obj.DelFlag = details.DelFlag;

                    dt.Rows.Add
                    (obj.MIMainId, obj.MINo, obj.MIDate, obj.JobCodeId,obj.CreditAccount, obj.DebitAccount,
                     obj.Remarks, obj.Comments, obj.GrandTotal, obj.MRNo, obj.DeptId, obj.UserId,
                     obj.MISubId,obj.ProductId, obj.ProductCode, obj.Description,obj.Location, obj.UnitId, obj.Quantity, obj.Rate, 
                     obj.Stock, obj.TotalAmount ,obj.CostCodeId, obj.DelFlag);
                }

                dsDataSet = obj.MaterialIssueInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel BQModels = new BillofQuantityModel();

                    BQModels.Status = row["Status"].ToString();
                    BQModels.MINo = row["MINo"].ToString();
                    BQModels.ProductCode = row["ProductCode"].ToString();
                    BQModels.Description = row["Description"].ToString();
                    BQModels.Quantity = Convert.ToInt32(row["TotalQty"].ToString());
                    BQModels.Location = row["LocationName"].ToString();
                    oList.Add(BQModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult MaterialIssueUpdate(List<BillofQuantityModel> BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                string[] tmpTable = new string[24];
                tmpTable[0] = "MIMainId";
                tmpTable[1] = "MINo";
                tmpTable[2] = "MIDate";
                tmpTable[3] = "JobCodeId";
                tmpTable[4] = "CreditAccount";
                tmpTable[5] = "DebitAccount";
                tmpTable[6] = "Remarks";
                tmpTable[7] = "Comments";
                tmpTable[8] = "GrandTotal";
                tmpTable[9] = "MRNo";
                tmpTable[10] = "DeptId";
                tmpTable[11] = "UserId";

                tmpTable[12] = "MISubId";
                tmpTable[13] = "ProductId";
                tmpTable[14] = "ProductCode";
                tmpTable[15] = "Description";
                tmpTable[16] = "Location";
                tmpTable[17] = "UnitId";
                tmpTable[18] = "Quantity";
                tmpTable[19] = "Rate";
                tmpTable[20] = "Stock";
                tmpTable[21] = "TotalAmount";
                tmpTable[22] = "CostCodeId";
                tmpTable[23] = "DelFlag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in BillofQuantityModel)
                {
                    obj.MIMainId = details.MIMainId;
                    obj.MINo = details.MINo;
                    obj.MIDate = details.MIDate;
                    obj.JobCodeId = details.JobCodeId;
                    obj.CreditAccount = details.CreditAccount;
                    obj.DebitAccount = details.DebitAccount;
                    obj.Remarks = details.Remarks;
                    obj.Comments = details.Comments;
                    obj.GrandTotal = details.GrandTotal;
                    obj.MRNo = details.MRNo;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;

                    obj.MISubId = details.MISubId;
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.Description = details.Description;
                    obj.Location = details.Location;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Rate = details.Rate;
                    obj.Stock = details.Stock;
                    obj.TotalAmount = details.TotalAmount;
                    obj.CostCodeId = details.CostCodeId;
                    obj.DelFlag = details.DelFlag;

                    dt.Rows.Add
                    (obj.MIMainId, obj.MINo, obj.MIDate, obj.JobCodeId, obj.CreditAccount, obj.DebitAccount,
                     obj.Remarks, obj.Comments, obj.GrandTotal, obj.MRNo, obj.DeptId, obj.UserId,
                     obj.MISubId, obj.ProductId, obj.ProductCode, obj.Description, obj.Location, obj.UnitId, obj.Quantity, obj.Rate, 
                     obj.Stock,obj.TotalAmount, obj.CostCodeId, obj.DelFlag);
                }

                dsDataSet = obj.MaterialIssueUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel BQModels = new BillofQuantityModel();

                    BQModels.Status = row["Status"].ToString();
                    BQModels.MINo = row["MINo"].ToString();
                    BQModels.ProductCode = row["ProductCode"].ToString();
                    BQModels.Description = row["Description"].ToString();
                    BQModels.Quantity = Convert.ToInt32(row["TotalQty"].ToString());
                    BQModels.Location = row["LocationName"].ToString();
                    oList.Add(BQModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult MaterialIssueGetandGets(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialIssueGetandGets(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel BQModels = new BillofQuantityModel();
                    BQModels.MINo = row["MINo"].ToString();
                    BQModels.MIDate = row["MIDate"].ToString();
                    BQModels.JobCodeId = Convert.ToInt32(row["JobCodeId"].ToString());
                    BQModels.JobCode = row["JobCode"].ToString();
                    BQModels.JobDescription = row["Description"].ToString();
                    BQModels.Remarks = row["Remarks"].ToString();
                    BQModels.Comments = row["Comments"].ToString();
                    BQModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    BQModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    BQModels.Product = row["ProductCode"].ToString();
                    BQModels.Description = row["Description"].ToString();
                    BQModels.Location = row["Location"].ToString();
                    BQModels.LocationCode = row["LocationCode"].ToString();
                    BQModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    BQModels.Unit = row["UnitName"].ToString();
                    BQModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    BQModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    BQModels.Stock = row["Stock"].ToString();
                    BQModels.TotalAmount = Convert.ToDecimal(row["TotalAmount"].ToString());
                    BQModels.CostCodeId = row["CostCodeId"].ToString();
                    BQModels.CostCode = row["CostCenterCode"].ToString();
                    BQModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    BQModels.Department = row["DepartmentCode"].ToString();
                    BQModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    oList.Add(BQModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult MaterialIssueDelete(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();
            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialIssueDelete(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel LModels = new BillofQuantityModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.MINo = row["MINo"].ToString();
                    oList.Add(LModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult MRApprovalAutocomplete(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRApprovalAutocomplete(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel MModels = new BillofQuantityModel();
                    MModels.MRNo = row["MRNo"].ToString();
                    MModels.MRDate = row["MRDate"].ToString();
                    MModels.JobNo = row["JobNo"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobDescription = row["Description"].ToString();
                    MModels.Requested = row["Requested"].ToString();
                    MModels.Approved = row["Approved"].ToString();
                    MModels.IssueStatus = row["IssueStatus"].ToString();
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
        public JsonResult MaterialReturnInsert(List<MaterialReturn> MaterialReturn)
        {
            MaterialReturn obj = new MaterialReturn();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<MaterialReturn> oList = new List<MaterialReturn>();

            try
            {
                string[] tmpTable = new string[27];
                tmpTable[0] = "ReturnNo";
                tmpTable[1] = "ReturnDate";
                tmpTable[2] = "JobCodeId";
                tmpTable[3] = "CostCode";
                tmpTable[4] = "CreditAcc";
                tmpTable[5] = "CreditAccDesc";
                tmpTable[6] = "DebitAcc";
                tmpTable[7] = "DebitAccDesc";
                tmpTable[8] = "Comments";
                tmpTable[9] = "ProductId";
                tmpTable[10] = "Product";
                tmpTable[11] = "PDescr";
                tmpTable[12] = "PUnit";
                tmpTable[13] = "PLoc";
                tmpTable[14] = "PQty";
                tmpTable[15] = "PPrice";
                tmpTable[16] = "PDisc";
                tmpTable[17] = "PAmount";
                tmpTable[18] = "PCostCode";
                tmpTable[19] = "TotalAmt";
                tmpTable[20] = "TotalDisc";
                tmpTable[21] = "TotalQty";
                tmpTable[22] = "DeptId";
                tmpTable[23] = "UserId";
                tmpTable[24] = "Status";
                tmpTable[25] = "Flag";
                tmpTable[26] = "DelFlag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in MaterialReturn)
                {
                    obj.ReturnNo = details.ReturnNo;
                    obj.ReturnDate = details.ReturnDate;
                    obj.JobCodeId = details.JobCodeId;
                    obj.CostCode = details.CostCode;
                    obj.CreditAcc = details.CreditAcc;
                    obj.CreditAccDesc = details.CreditAccDesc;
                    obj.DebitAcc = details.DebitAcc;
                    obj.DebitAccDesc = details.DebitAccDesc;
                    obj.Comments = details.Comments;
                    obj.ProductId = details.ProductId;
                    obj.Product = details.Product;
                    obj.PDescr = details.PDescr;
                    obj.PUnit = details.PUnit;
                    obj.PLoc = details.PLoc;
                    obj.PQty = details.PQty;
                    obj.PPrice = details.PPrice;
                    obj.PDisc = details.PDisc;
                    obj.PAmount = details.PAmount;
                    obj.PCostCode = details.PCostCode;
                    obj.TotalAmt = details.TotalAmt;
                    obj.TotalDisc = details.TotalDisc;
                    obj.TotalQty = details.TotalQty;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.Status = details.Status;
                    obj.Flag = details.Flag;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add(obj.ReturnNo, obj.ReturnDate, obj.JobCodeId, obj.CostCode, obj.CreditAcc, obj.CreditAccDesc, obj.DebitAcc,
                                obj.DebitAccDesc, obj.Comments, obj.ProductId, obj.Product, obj.PDescr, obj.PUnit, obj.PLoc, obj.PQty, obj.PPrice,
                                obj.PDisc, obj.PAmount, obj.PCostCode, obj.TotalAmt, obj.TotalDisc, obj.TotalQty, obj.DeptId, obj.UserId,
                                obj.Status, obj.Flag, obj.DelFlag);
                }

                dsDataSet = obj.MaterialReturnInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialReturn MModels = new MaterialReturn();
                    MModels.Status = row["Status"].ToString();
                    MModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
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
        public JsonResult MaterialReturnUpdate(List<MaterialReturn> MaterialReturn)
        {
            MaterialReturn obj = new MaterialReturn();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<MaterialReturn> oList = new List<MaterialReturn>();

            try
            {
                string[] tmpTable = new string[27];
                tmpTable[0] = "ReturnNo";
                tmpTable[1] = "ReturnDate";
                tmpTable[2] = "JobCodeId";
                tmpTable[3] = "CostCode";
                tmpTable[4] = "CreditAcc";
                tmpTable[5] = "CreditAccDesc";
                tmpTable[6] = "DebitAcc";
                tmpTable[7] = "DebitAccDesc";
                tmpTable[8] = "Comments";
                tmpTable[9] = "ProductId";
                tmpTable[10] = "Product";
                tmpTable[11] = "PDescr";
                tmpTable[12] = "PUnit";
                tmpTable[13] = "PLoc";
                tmpTable[14] = "PQty";
                tmpTable[15] = "PPrice";
                tmpTable[16] = "PDisc";
                tmpTable[17] = "PAmount";
                tmpTable[18] = "PCostCode";
                tmpTable[19] = "TotalAmt";
                tmpTable[20] = "TotalDisc";
                tmpTable[21] = "TotalQty";
                tmpTable[22] = "DeptId";
                tmpTable[23] = "UserId";
                tmpTable[24] = "Status";
                tmpTable[25] = "Flag";
                tmpTable[26] = "DelFlag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in MaterialReturn)
                {
                    obj.ReturnNo = details.ReturnNo;
                    obj.ReturnDate = details.ReturnDate;
                    obj.JobCodeId = details.JobCodeId;
                    obj.CostCode = details.CostCode;
                    obj.CreditAcc = details.CreditAcc;
                    obj.CreditAccDesc = details.CreditAccDesc;
                    obj.DebitAcc = details.DebitAcc;
                    obj.DebitAccDesc = details.DebitAccDesc;
                    obj.Comments = details.Comments;
                    obj.ProductId = details.ProductId;
                    obj.Product = details.Product;
                    obj.PDescr = details.PDescr;
                    obj.PUnit = details.PUnit;
                    obj.PLoc = details.PLoc;
                    obj.PQty = details.PQty;
                    obj.PPrice = details.PPrice;
                    obj.PDisc = details.PDisc;
                    obj.PAmount = details.PAmount;
                    obj.PCostCode = details.PCostCode;
                    obj.TotalAmt = details.TotalAmt;
                    obj.TotalDisc = details.TotalDisc;
                    obj.TotalQty = details.TotalQty;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.Status = details.Status;
                    obj.Flag = details.Flag;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add(obj.ReturnNo, obj.ReturnDate, obj.JobCodeId, obj.CostCode, obj.CreditAcc, obj.CreditAccDesc, obj.DebitAcc,
                                obj.DebitAccDesc, obj.Comments, obj.ProductId, obj.Product, obj.PDescr, obj.PUnit, obj.PLoc, obj.PQty, obj.PPrice,
                                obj.PDisc, obj.PAmount, obj.PCostCode, obj.TotalAmt, obj.TotalDisc, obj.TotalQty, obj.DeptId, obj.UserId,
                                obj.Status, obj.Flag, obj.DelFlag);
                }

                dsDataSet = obj.MaterialReturnUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialReturn MModels = new MaterialReturn();
                    MModels.Status = row["Status"].ToString();
                    MModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
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

        public ActionResult MaterialReturnNoSearch(MaterialReturn MaterialReturn)
        {
            MaterialReturn obj = new MaterialReturn();

            List<MaterialReturn> oList = new List<MaterialReturn>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialReturnNoSearch(MaterialReturn, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialReturn MModels = new MaterialReturn();
                    MModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
                    MModels.ReturnDate = row["ReturnDate"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
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
        public ActionResult MaterialReturnGetandGets(MaterialReturn MaterialReturn)
        {
            MaterialReturn obj = new MaterialReturn();

            List<MaterialReturn> oList = new List<MaterialReturn>();

            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialReturnGetandGets(MaterialReturn, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialReturn MModels = new MaterialReturn();
                    MModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
                    MModels.ReturnDate = row["ReturnDate"].ToString();
                    MModels.JobCodeId = Convert.ToInt32(row["JobCodeId"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.CostCode = Convert.ToInt32(row["CostCode"].ToString());
                    MModels.CostCodeName = row["CostCodeName"].ToString();
                    MModels.CreditAcc = row["CreditAcc"].ToString();
                    MModels.CreditAccDesc = row["CreditAccDesc"].ToString();
                    MModels.DebitAcc = row["DebitAcc"].ToString();
                    MModels.DebitAccDesc = row["DebitAccDesc"].ToString();
                    MModels.Comments = row["Comments"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.Product = row["Product"].ToString();
                    MModels.PDescr = row["PDescr"].ToString();
                    MModels.PUnit = Convert.ToInt32(row["PUnit"].ToString());
                    MModels.PLoc = Convert.ToInt32(row["PLoc"].ToString());
                    MModels.PQty = Convert.ToInt32(row["PQty"].ToString());
                    MModels.PPrice = Convert.ToDecimal(row["PPrice"].ToString());
                    MModels.PDisc = Convert.ToDecimal(row["PDisc"].ToString());
                    MModels.PAmount = Convert.ToDecimal(row["PAmount"].ToString());
                    MModels.PCostCode = Convert.ToInt32(row["PCostCode"].ToString());
                    MModels.TotalAmt = Convert.ToDecimal(row["TotalAmt"].ToString());
                    MModels.TotalDisc = Convert.ToDecimal(row["TotalDisc"].ToString());
                    MModels.TotalQty = Convert.ToInt32(row["TotalQty"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PDCostCodeName = row["PDCostCodeName"].ToString();
                    MModels.DepartmentName= row["DepartmentCode"].ToString();
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
        public ActionResult MaterialReturnDelete(MaterialReturn MaterialReturn)
        {
            MaterialReturn obj = new MaterialReturn();

            List<MaterialReturn> oList = new List<MaterialReturn>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialReturnDelete(MaterialReturn, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialReturn MModels = new MaterialReturn();
                    MModels.Status = row["Status"].ToString();
                    MModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
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

        public ActionResult CostCodeSearch(CostCenterModel CostCenterModel)
        {
            CostCenterModel obj = new CostCenterModel();

            List<CostCenterModel> oList = new List<CostCenterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CostCodeSearch(CostCenterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CostCenterModel MModels = new CostCenterModel();
                    MModels.CostCenterCode = row["CostCenterCode"].ToString();
                    MModels.CostCenterDescription = row["CostCenterDescription"].ToString();
                    MModels.CostCenterId = Convert.ToInt32(row["CostCenterId"].ToString());
                    MModels.CostCenterName = row["CostCenterName"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return Json(oList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult MIList(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MIList(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel MModels = new BillofQuantityModel();
                    MModels.MINo = row["MINo"].ToString();
                    MModels.MIDate = row["MIDate"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobDescription = row["Description"].ToString();
                    MModels.CreditAccount = row["CRAccount"].ToString();
                    MModels.DebitAccount = row["DBAccount"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Comments = row["Comments"].ToString();
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


        public ActionResult BOQList(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BOQList(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel MModels = new BillofQuantityModel();
                    MModels.BOQSlNo = Convert.ToInt32(row["BOQSlNo"].ToString());
                    MModels.BOQDate = row["BOQDate"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobDescription = row["Description"].ToString();
                    MModels.Customer = row["CustName"].ToString();
                    MModels.LPO = row["LPO"].ToString();
                    MModels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    MModels.Engineer = row["Name"].ToString();
                    MModels.Comments = row["Comments"].ToString();
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
        public ActionResult ProjectAnalysis(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProjectAnalysis(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel Reptmodels = new BillofQuantityModel();
                    Reptmodels.JobCodeId = Convert.ToInt32(row["ProjectJobId"].ToString());
                    Reptmodels.JobCode = row["JobCode"].ToString();
                    Reptmodels.JobDescription = row["Description"].ToString();
                    Reptmodels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    Reptmodels.LPO = row["LPO"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.Status = row["Status"].ToString();
                    Reptmodels.InvNo = row["BillSlNo"].ToString();
                    Reptmodels.Income = Convert.ToDecimal(row["Income"].ToString());
                    Reptmodels.Cost = Convert.ToDecimal(row["Cost"].ToString());
                    Reptmodels.Profit = Convert.ToDecimal(row["Profit"].ToString());
                    Reptmodels.ProfitPercentage = Convert.ToDecimal(row["ProfitPercentage"].ToString());

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
        public ActionResult ProjectJobDashboard(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProjectJobDashboard(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel Reptmodels = new BillofQuantityModel();
                    Reptmodels.JobCodeId = Convert.ToInt32(row["ProjectJobId"].ToString());
                    Reptmodels.JobCode = row["JobCode"].ToString();
                    Reptmodels.JobDescription = row["Description"].ToString();
                    Reptmodels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    Reptmodels.Customer = row["CustName"].ToString();
                    Reptmodels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    Reptmodels.LPO = row["LPO"].ToString();
                    Reptmodels.Salesman = row["FirstName"].ToString();
                    Reptmodels.Status = row["Status"].ToString();
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
        public ActionResult ProjectJobDasboardWidgets(BillofQuantityModel BillofQuantityModel)
        {
            BillofQuantityModel obj = new BillofQuantityModel();

            List<BillofQuantityModel> oList = new List<BillofQuantityModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProjectJobDasboardWidgets(BillofQuantityModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillofQuantityModel Reptmodels = new BillofQuantityModel();
                    Reptmodels.Created = row["Created"].ToString();
                    Reptmodels.Pending = row["Pending"].ToString();
                    oList.Add(Reptmodels);
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