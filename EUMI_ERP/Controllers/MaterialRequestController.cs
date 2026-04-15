using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.Controllers
{
    public class MaterialRequestController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: MaterialRequest
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult MRProductSearch(MaterialRequestModel oModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();

            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRProductSearch(oModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["Description"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Cost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.Price = Convert.ToDecimal(row["SellingPrice"].ToString());                   
                    MModels.LPCost = Convert.ToDecimal(row["LPCost"].ToString());
                    MModels.ResourceId = Convert.ToInt32(row["Resource"].ToString());
                    MModels.ResourceCode = row["ResourceCode"].ToString();
                    MModels.BOQNo = Convert.ToInt32(row["BOQSlNo"].ToString());
                    MModels.BOQSubId = Convert.ToInt32(row["BOQSubId"].ToString());
                    MModels.BOQQty = Convert.ToInt32(row["BOQQty"].ToString());
                    MModels.IssuedQty = Convert.ToDecimal(row["IssuedQty"].ToString());
                    MModels.BalanceQty = Convert.ToInt32(row["BalanceQty"].ToString());
                    MModels.BOQAmt = Convert.ToDecimal(row["BOQAmt"].ToString());
                    MModels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    MModels.BOQ = row["BOQ"].ToString();
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
        public JsonResult MaterialRequestInsert(List<MaterialRequestModel> MaterialRequestModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();

            try
            {
                string[] tmpTable = new string[35];
                tmpTable[0] = "MRNo";
                tmpTable[1] = "MRDate";
                tmpTable[2] = "RequestedById";
                tmpTable[3] = "DesignationId";
                tmpTable[4] = "Attn";
                tmpTable[5] = "Subject";
                tmpTable[6] = "OfficeFileNo";
                tmpTable[7] = "Urgency";
                tmpTable[8] = "JobNo";
                tmpTable[9] = "Purpose";
                tmpTable[10] = "TotalAmount";

                tmpTable[11] = "ItemId";
                tmpTable[12] = "ItemCode";
                tmpTable[13] = "ItemDescription";
                tmpTable[14] = "UnitId";
                tmpTable[15] = "BOQQty";
                tmpTable[16] = "IssuedQty";
                tmpTable[17] = "BalanceQty";
                tmpTable[18] = "Quantity";
                tmpTable[19] = "Price";
                tmpTable[20] = "Amount";
                tmpTable[21] = "BOQNo";
                tmpTable[22] = "BOQSubId";
                tmpTable[23] = "ResourceId";
                tmpTable[24] = "RequestFlag";

                tmpTable[25] = "DeptId";
                tmpTable[26] = "UserId";

                tmpTable[27] = "DelFlag";
                tmpTable[28] = "ApprovedBy";
                tmpTable[29] = "ApprovedDate";
                tmpTable[30] = "PEFlag";
                tmpTable[31] = "MRMainId";
                tmpTable[32] = "MRSubId";
                tmpTable[33] = "Variable1";
                tmpTable[34] = "Variable2";



                dt = Common.CreateTable(tmpTable);

                foreach (var details in MaterialRequestModel)
                {
                    obj.MRNo = details.MRNo;
                    obj.MRDate = details.MRDate;
                    obj.RequestedById = details.RequestedById;
                    obj.DesignationId = details.DesignationId;
                    obj.Attn = details.Attn;
                    obj.Subject = details.Subject;
                    obj.OfficeFileNo = details.OfficeFileNo;
                    obj.Urgency = details.Urgency;
                    obj.JobNo = details.JobNo;
                    obj.Purpose = details.Purpose;
                    obj.TotalAmount = details.TotalAmount;

                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.UnitId = details.UnitId;
                    obj.BOQQty = details.BOQQty;
                    obj.IssuedQty = details.IssuedQty;
                    obj.BalanceQty = details.BalanceQty;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Amount = details.Amount;
                    obj.BOQNo = details.BOQNo;
                    obj.BOQSubId = details.BOQSubId;
                    obj.ResourceId = details.ResourceId;
                    obj.RequestFlag = details.RequestFlag;

                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;

                    obj.DelFlag = details.DelFlag;
                    obj.ApprovedBy = details.ApprovedBy;
                    obj.ApprovedDate = details.ApprovedDate;
                    obj.PEFlag = details.PEFlag;
                    obj.MRMainId = details.MRMainId;
                    obj.MRSubId = details.MRSubId;                  
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    

                    dt.Rows.Add
                    (obj.MRNo, obj.MRDate, obj.RequestedById, obj.DesignationId, obj.Attn, obj.Subject, obj.OfficeFileNo, obj.Urgency, obj.JobNo, obj.Purpose,
                    obj.TotalAmount, obj.ItemId, obj.ItemCode,obj.ItemDescription, obj.UnitId, obj.BOQQty, obj.IssuedQty, obj.BalanceQty, obj.Quantity, obj.Price,
                    obj.Amount, obj.BOQNo, obj.BOQSubId, obj.ResourceId, obj.RequestFlag, obj.DeptId, obj.UserId,
                    obj.DelFlag, obj.ApprovedBy, obj.ApprovedDate, obj.PEFlag, obj.MRMainId, obj.MRSubId, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.MaterialRequestInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.MRNo = Convert.ToInt32(row["MRNo"].ToString());
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
        public JsonResult MaterialRequestUpdate(List<MaterialRequestModel> MaterialRequestModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();

            try
            {
                string[] tmpTable = new string[35];
                tmpTable[0] = "MRNo";
                tmpTable[1] = "MRDate";
                tmpTable[2] = "RequestedById";
                tmpTable[3] = "DesignationId";
                tmpTable[4] = "Attn";
                tmpTable[5] = "Subject";
                tmpTable[6] = "OfficeFileNo";
                tmpTable[7] = "Urgency";
                tmpTable[8] = "JobNo";
                tmpTable[9] = "Purpose";
                tmpTable[10] = "TotalAmount";

                tmpTable[11] = "ItemId";
                tmpTable[12] = "ItemCode";
                tmpTable[13] = "ItemDescription";
                tmpTable[14] = "UnitId";
                tmpTable[15] = "BOQQty";
                tmpTable[16] = "IssuedQty";
                tmpTable[17] = "BalanceQty";
                tmpTable[18] = "Quantity";
                tmpTable[19] = "Price";
                tmpTable[20] = "Amount";
                tmpTable[21] = "BOQNo";
                tmpTable[22] = "BOQSubId";
                tmpTable[23] = "ResourceId";
                tmpTable[24] = "RequestFlag";

                tmpTable[25] = "DeptId";
                tmpTable[26] = "UserId";

                tmpTable[27] = "DelFlag";
                tmpTable[28] = "ApprovedBy";
                tmpTable[29] = "ApprovedDate";
                tmpTable[30] = "PEFlag";
                tmpTable[31] = "MRMainId";
                tmpTable[32] = "MRSubId";
                tmpTable[33] = "Variable1";
                tmpTable[34] = "Variable2";



                dt = Common.CreateTable(tmpTable);

                foreach (var details in MaterialRequestModel)
                {
                    obj.MRNo = details.MRNo;
                    obj.MRDate = details.MRDate;
                    obj.RequestedById = details.RequestedById;
                    obj.DesignationId = details.DesignationId;
                    obj.Attn = details.Attn;
                    obj.Subject = details.Subject;
                    obj.OfficeFileNo = details.OfficeFileNo;
                    obj.Urgency = details.Urgency;
                    obj.JobNo = details.JobNo;
                    obj.Purpose = details.Purpose;
                    obj.TotalAmount = details.TotalAmount;

                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.UnitId = details.UnitId;
                    obj.BOQQty = details.BOQQty;
                    obj.IssuedQty = details.IssuedQty;
                    obj.BalanceQty = details.BalanceQty;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Amount = details.Amount;
                    obj.BOQNo = details.BOQNo;
                    obj.BOQSubId = details.BOQSubId;
                    obj.ResourceId = details.ResourceId;
                    obj.RequestFlag = details.RequestFlag;

                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;

                    obj.DelFlag = details.DelFlag;
                    obj.ApprovedBy = details.ApprovedBy;
                    obj.ApprovedDate = details.ApprovedDate;
                    obj.PEFlag = details.PEFlag;
                    obj.MRMainId = details.MRMainId;
                    obj.MRSubId = details.MRSubId;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;


                    dt.Rows.Add
                    (obj.MRNo, obj.MRDate, obj.RequestedById, obj.DesignationId, obj.Attn, obj.Subject, obj.OfficeFileNo, obj.Urgency, obj.JobNo, obj.Purpose,
                    obj.TotalAmount, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.UnitId, obj.BOQQty, obj.IssuedQty, obj.BalanceQty, obj.Quantity, obj.Price,
                    obj.Amount, obj.BOQNo,obj.BOQSubId, obj.ResourceId, obj.RequestFlag, obj.DeptId, obj.UserId,
                    obj.DelFlag, obj.ApprovedBy, obj.ApprovedDate, obj.PEFlag, obj.MRMainId, obj.MRSubId, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.MaterialRequestUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.MRNo = Convert.ToInt32(row["MRNo"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult MaterialRequestGets(MaterialRequestModel MaterialRequestModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();

            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialRequestGets(MaterialRequestModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.MRNo = Convert.ToInt32(row["MRNo"].ToString());
                    MModels.MRDate = row["MRDate"].ToString();
                    MModels.JobCode =row["JobCode"].ToString();
                    MModels.JobDescription = row["JobDescription"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult MaterialRequestGetandGets(MaterialRequestModel PurchaseInvoiceModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();

            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialRequestGetandGets(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.MRNo = Convert.ToInt32(row["MRNo"].ToString());
                    MModels.MRDate = row["MRDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobDescription = row["JobDescription"].ToString();
                    MModels.RequestedById = Convert.ToInt32(row["RequestedBy"].ToString());
                    MModels.UserName = row["Name"].ToString();
                    MModels.DesignationId = Convert.ToInt32(row["Designation"].ToString());
                    MModels.Designation = row["DesignationDescription"].ToString();
                    MModels.Attn = row["Attn"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.OfficeFileNo = row["OfficeFileNo"].ToString();
                    MModels.Urgency = row["Urgency"].ToString();
                    MModels.Purpose = row["Purpose"].ToString();
                    MModels.TotalAmount = Convert.ToDecimal(row["TotalAmount"].ToString());
                    MModels.RequestFlag = Convert.ToInt32(row["RequestFlag"].ToString());

                    MModels.ItemId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ItemCode = row["ProductCode"].ToString();
                    MModels.ItemDescription = row["ProductDesc"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["Unit"].ToString());
                    MModels.Unit = row["UnitName"].ToString();
                    MModels.BOQQty = Convert.ToInt32(row["BOQQty"].ToString());
                    MModels.IssuedQty = Convert.ToInt32(row["IssuedQty"].ToString());
                    MModels.BalanceQty = Convert.ToInt32(row["BalanceQty"].ToString());
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Price = Convert.ToDecimal(row["Price"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.ResourceId = Convert.ToInt32(row["BOQResource"].ToString());
                    MModels.ResourceCode = row["ResourceCode"].ToString();
                    MModels.BOQNo = Convert.ToInt32(row["BOQNo"].ToString());
                    MModels.BOQSubId = Convert.ToInt32(row["BOQSubId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.ApprovedBy = Convert.ToInt32(row["ApprovedBy"].ToString());
                    MModels.ApprovedDate =row["ApprovedDate"].ToString();
                    MModels.PEFlag = Convert.ToInt32(row["PEFlag"].ToString());
                    MModels.ApprovedByUser = row["ApprovedByUser"].ToString();

                    MModels.BOQAmt = Convert.ToDecimal(row["BOQAmt"].ToString());
                    MModels.EstAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    MModels.BOQ = row["BOQ"].ToString();
                    MModels.MRSubId = Convert.ToInt32(row["MRSubId"].ToString());
                    MModels.PEQty = row["PE_Qty"].ToString();
                    MModels.TaxId = row["VatId"].ToString();
                    MModels.Tax = row["TaxName"].ToString();
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
        public ActionResult MaterialRequestDelete(MaterialRequestModel MaterialRequestModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();
            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialRequestDelete(MaterialRequestModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel LModels = new MaterialRequestModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.MRNo = Convert.ToInt32(row["MRNo"].ToString());
                    oList.Add(LModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult MaterialRequestBOQGets(MaterialRequestModel PurchaseInvoiceModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();

            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialRequestBOQGets(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.BOQNo = Convert.ToInt32(row["BOQSlNo"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["Description"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
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
        public ActionResult MaterialRequetApprovalGets(MaterialRequestModel PurchaseInvoiceModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();

            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialRequetApprovalGets(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.MRNo = Convert.ToInt32(row["MRNo"].ToString());
                    MModels.MRDate = row["MRDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobDescription = row["Description"].ToString();
                    MModels.RequestedById = Convert.ToInt32(row["RequestedBy"].ToString());
                    MModels.RequestedBy = row["RequestedByUser"].ToString();
                    MModels.ApprovedBy = Convert.ToInt32(row["ApprovedBy"].ToString());
                    MModels.ApprovedByUser = row["ApprovedByUser"].ToString();
                    MModels.ApprovedDate = row["ApprovedDate"].ToString();
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
        public ActionResult MaterialRequetApproval(MaterialRequestModel PurchaseInvoiceModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();

            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MaterialRequetApproval(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.MRNo = Convert.ToInt32(row["MRNo"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult MRIssueDetails(MaterialRequestModel PurchaseInvoiceModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();

            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRIssueDetails(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.MRNo = Convert.ToInt32(row["MRNo"].ToString());
                    MModels.MRDate = row["MRDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.Status = row["Status"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ItemCode = row["ProductCode"].ToString();
                    MModels.ItemDescription = row["ProductDesc"].ToString();                                       
                    MModels.IssuedQty = Convert.ToInt32(row["IssuedQty"].ToString());
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.MINo = row["MINo"].ToString();
                    MModels.RequestedBy = row["Name"].ToString();
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