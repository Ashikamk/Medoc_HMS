using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.IO;

namespace EUMI_ERP.Controllers
{
    public class PurchaseController : Controller
    {
        // GET: Purchase

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult PurchaseReturn()
        {
            return View();
        }

        public ActionResult MobilePurchaseInvoice()
        {
            return View();
        }
        public ActionResult PurchaseInvoiceNew()
        {
            return View();
        }
        public ActionResult PurchaseOrderNew()
        {
            return View();
        }
        public ActionResult PurchaseEnquiryNew()
        {
            return View();
        }
        public ActionResult PurchaseReturnNew()
        {
            return View();
        }

        public ActionResult MobilePurchaseReturn()
        {
            return View();
        }
        public ActionResult PurchaseScrap()
        {
            return View();
        }
        public ActionResult PurchasePerforma()
        {
            return View();
        }
        public ActionResult PurchaseOrderApproval()
        {
            return View();
        }
        public ActionResult PurchaseOrderApprovalGets(MaterialRequestModel MaterialRequestModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();

            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderApprovalGets(MaterialRequestModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.OrderDate = row["OrderDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobDescription = row["Description"].ToString();
                    MModels.RequestedById = Convert.ToInt32(row["UserId"].ToString());
                    MModels.RequestedBy = row["UserName"].ToString();
                    MModels.ApprovedBy = Convert.ToInt32(row["ApprovedUser"].ToString());
                    MModels.ApprovedByUser = row["ApprovedBy"].ToString();
                    MModels.ApprovedDate = row["ApprovedDate"].ToString();
                    MModels.Status = row["Status"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.Supplier = row["CustName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult OrderApproval(MaterialRequestModel PurchaseInvoiceModel)
        {
            MaterialRequestModel obj = new MaterialRequestModel();

            List<MaterialRequestModel> oList = new List<MaterialRequestModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderApproval(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MaterialRequestModel MModels = new MaterialRequestModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ProductSearch(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductSearch(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.VatPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.SellingPrice = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.Model1 = row["Model1"].ToString();
                    MModels.GrpId = Convert.ToInt32(row["GroupId"].ToString());
                    MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    MModels.LPCost = Convert.ToDecimal(row["LPCost"].ToString());
                    MModels.BOQRate = Convert.ToDecimal(row["BOQAmt"].ToString());
                    MModels.BOQQty = Convert.ToInt32(row["BOQQty"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult F2PurchaseProductSearch(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.F2PurchaseProductSearch(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.VatPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.Model1 = row["Model1"].ToString();
                    MModels.GrpId = Convert.ToInt32(row["GroupId"].ToString());
                    MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    MModels.LPCost = Convert.ToDecimal(row["LPCost"].ToString());
                    MModels.StockIn = Convert.ToDecimal(row["STOCK"].ToString());
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
        
        public ActionResult JobSearchPurchase(ProjectJobModel ProjectJobModel)
        {
            ProjectJobModel obj = new ProjectJobModel();

            List<ProjectJobModel> oList = new List<ProjectJobModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.JobSearchPurchase(ProjectJobModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProjectJobModel MModels = new ProjectJobModel();
                    MModels.ProjectJobId = Convert.ToInt32(row["ProjectJobId"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.BOQRate = Convert.ToDecimal(row["BOQAmt"].ToString());
                    MModels.BOQQty = Convert.ToInt32(row["BOQQty"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult PurchaseReturn_IMEI_Search(PurchaseReturn PurchaseReturn)
        {
            PurchaseReturn obj = new PurchaseReturn();

            List<PurchaseReturn> oList = new List<PurchaseReturn>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReturn_IMEI_Search(PurchaseReturn, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseReturn MModels = new PurchaseReturn();
                    MModels.PRMainId = Convert.ToInt32(row["id"].ToString());
                    MModels.IMEI = row["IMEI_Number"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["Description"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.TaxId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.TaxPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
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
        public JsonResult PurchaseInvoiceInsertandUpdate(List<PurchaseInvoiceModel> PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();

            try
            {
                string[] tmpTable = new string[81];
                tmpTable[0] = "PurchaseInvoiceMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "Terms";
                tmpTable[8] = "DueDate";
                tmpTable[9] = "LocnId";
                tmpTable[10] = "PlaceOfSupply";
                tmpTable[11] = "JobNo";
                tmpTable[12] = "ShipDate";
                tmpTable[13] = "CurrencyId";
                tmpTable[14] = "CurrencyRate";
                tmpTable[15] = "FCDiscount";
                tmpTable[16] = "TotalDiscount";
                tmpTable[17] = "TotalTaxable";
                tmpTable[18] = "TotalTax";
                tmpTable[19] = "GrandTotal";
                tmpTable[20] = "InvoiceTotal";
                tmpTable[21] = "FCTaxable";
                tmpTable[22] = "FCTax";
                tmpTable[23] = "FCGrandTotal";
                tmpTable[24] = "BillDiscount";
                tmpTable[25] = "BillDisc";
                tmpTable[26] = "Remarks";
                tmpTable[27] = "DepartmentId";
                tmpTable[28] = "UserId";
                tmpTable[29] = "PurchaseInvoiceSubId";
                tmpTable[30] = "BatchSlno";
                tmpTable[31] = "Batch";
                tmpTable[32] = "ItemId";
                tmpTable[33] = "ItemCode";
                tmpTable[34] = "ItemDescription";
                tmpTable[35] = "LocationId";
                tmpTable[36] = "UnitId";
                tmpTable[37] = "Quantity";
                tmpTable[38] = "Fraction";
                tmpTable[39] = "Rate";
                tmpTable[40] = "BaseRate";
                tmpTable[41] = "Discount";
                tmpTable[42] = "BaseDiscount";
                tmpTable[43] = "TaxId";
                tmpTable[44] = "TaxRate";
                tmpTable[45] = "TaxableAmount";
                tmpTable[46] = "TaxAmount";
                tmpTable[47] = "TotalAmount";
                tmpTable[48] = "BaseTaxable";
                tmpTable[49] = "BaseTax";
                tmpTable[50] = "BaseAmount";
                tmpTable[51] = "OtherCost";
                tmpTable[52] = "OrderId";
                tmpTable[53] = "DeleteFlag";
                tmpTable[54] = "LPO";
                tmpTable[55] = "OrderSubId";
                tmpTable[56] = "PONo";
                tmpTable[57] = "FCRoundOff";
                tmpTable[58] = "RoundOff";
                tmpTable[59] = "BaseInvoiceamount";

                tmpTable[60] = "TaxId1";
                tmpTable[61] = "Taxable0";

                tmpTable[62] = "TaxId2";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";

                tmpTable[65] = "TaxId3";
                tmpTable[66] = "Taxable12";
                tmpTable[67] = "Tax12";

                tmpTable[68] = "TaxId4";
                tmpTable[69] = "Taxable18";
                tmpTable[70] = "Tax18";

                tmpTable[71] = "TaxId5";
                tmpTable[72] = "Taxable28";
                tmpTable[73] = "Tax28";

                tmpTable[74] = "MRVId";
                tmpTable[75] = "MRVSubId";

                tmpTable[76] = "Performa_NO";
                tmpTable[77] = "Performa_SubTbl_Id";

                tmpTable[78] = "PCAccountId";

                tmpTable[79] = "Variable1";
                tmpTable[80] = "Variable2";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseInvoiceModel)
                {
                    obj.PurchaseInvoiceMainId = details.PurchaseInvoiceMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.InvoiceTotal = details.InvoiceTotal;    //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.BillDiscount = details.BillDiscount;    //Foreign Currency
                    obj.BillDisc = details.BillDisc;            //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.PurchaseInvoiceSubId = details.PurchaseInvoiceSubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.OtherCost = details.OtherCost;          //Base Currency
                    obj.OrderId = details.OrderId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.LPO = details.LPO;                      //Free text in Purchase Invoice View
                    obj.OrderSubId = details.OrderSubId;
                    obj.PONo = details.PONo;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BaseInvoiceamount = details.BaseInvoiceamount;

                    obj.TaxId1 = details.TaxId1;
                    obj.Taxable0 = details.Taxable0;

                    obj.TaxId2 = details.TaxId2;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;

                    obj.TaxId3 = details.TaxId3;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;

                    obj.TaxId4 = details.TaxId4;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;

                    obj.TaxId5 = details.TaxId5;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;

                    obj.MRVId = details.MRVId;
                    obj.MRVSubId = details.MRVSubId;

                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;

                    obj.PCAccountId = details.PCAccountId;

                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.PurchaseInvoiceMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal,
                    obj.InvoiceTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.BillDiscount, obj.BillDisc, obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.PurchaseInvoiceSubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.OtherCost, obj.OrderId, obj.DeleteFlag, obj.LPO, details.OrderSubId, obj.PONo, obj.FCRoundOff, obj.RoundOff, obj.BaseInvoiceamount,
                    obj.TaxId1, obj.Taxable0, obj.TaxId2, obj.Taxable5, obj.Tax5, obj.TaxId3, obj.Taxable12, obj.Tax12, obj.TaxId4, obj.Taxable18, obj.Tax18, obj.TaxId5, obj.Taxable28, obj.Tax28
                    , obj.MRVId, obj.MRVSubId, obj.Performa_NO, obj.Performa_SubTbl_Id, obj.PCAccountId, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.PurchaseInvoiceInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
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
        public JsonResult MobilePurchaseInvoiceInsertandUpdate(List<PurchaseInvoiceModel> PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();

            try
            {
                string[] tmpTable = new string[75];
                tmpTable[0] = "PurchaseInvoiceMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "Terms";
                tmpTable[8] = "DueDate";
                tmpTable[9] = "LocnId";
                tmpTable[10] = "PlaceOfSupply";
                tmpTable[11] = "JobNo";
                tmpTable[12] = "ShipDate";
                tmpTable[13] = "CurrencyId";
                tmpTable[14] = "CurrencyRate";
                tmpTable[15] = "FCDiscount";
                tmpTable[16] = "TotalDiscount";
                tmpTable[17] = "TotalTaxable";
                tmpTable[18] = "TotalTax";
                tmpTable[19] = "GrandTotal";
                tmpTable[20] = "InvoiceTotal";
                tmpTable[21] = "FCTaxable";
                tmpTable[22] = "FCTax";
                tmpTable[23] = "FCGrandTotal";
                tmpTable[24] = "BillDiscount";
                tmpTable[25] = "BillDisc";
                tmpTable[26] = "Remarks";
                tmpTable[27] = "DepartmentId";
                tmpTable[28] = "UserId";
                tmpTable[29] = "PurchaseInvoiceSubId";
                tmpTable[30] = "BatchSlno";
                tmpTable[31] = "Batch";
                tmpTable[32] = "ItemId";
                tmpTable[33] = "ItemCode";
                tmpTable[34] = "ItemDescription";
                tmpTable[35] = "LocationId";
                tmpTable[36] = "UnitId";
                tmpTable[37] = "Quantity";
                tmpTable[38] = "Fraction";
                tmpTable[39] = "Rate";
                tmpTable[40] = "BaseRate";
                tmpTable[41] = "Discount";
                tmpTable[42] = "BaseDiscount";
                tmpTable[43] = "TaxId";
                tmpTable[44] = "TaxRate";
                tmpTable[45] = "TaxableAmount";
                tmpTable[46] = "TaxAmount";
                tmpTable[47] = "TotalAmount";
                tmpTable[48] = "BaseTaxable";
                tmpTable[49] = "BaseTax";
                tmpTable[50] = "BaseAmount";
                tmpTable[51] = "OtherCost";
                tmpTable[52] = "OrderId";
                tmpTable[53] = "DeleteFlag";
                tmpTable[54] = "LPO";
                tmpTable[55] = "OrderSubId";
                tmpTable[56] = "PONo";
                tmpTable[57] = "FCRoundOff";
                tmpTable[58] = "RoundOff";
                tmpTable[59] = "BaseInvoiceamount";

                tmpTable[60] = "TaxId1";
                tmpTable[61] = "Taxable0";

                tmpTable[62] = "TaxId2";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";

                tmpTable[65] = "TaxId3";
                tmpTable[66] = "Taxable12";
                tmpTable[67] = "Tax12";

                tmpTable[68] = "TaxId4";
                tmpTable[69] = "Taxable18";
                tmpTable[70] = "Tax18";

                tmpTable[71] = "TaxId5";
                tmpTable[72] = "Taxable28";
                tmpTable[73] = "Tax28";
                tmpTable[74] = "IMEI";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseInvoiceModel)
                {
                    obj.PurchaseInvoiceMainId = details.PurchaseInvoiceMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.InvoiceTotal = details.InvoiceTotal;    //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.BillDiscount = details.BillDiscount;    //Foreign Currency
                    obj.BillDisc = details.BillDisc;            //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.PurchaseInvoiceSubId = details.PurchaseInvoiceSubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.OtherCost = details.OtherCost;          //Base Currency
                    obj.OrderId = details.OrderId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.LPO = details.LPO;                      //Free text in Purchase Invoice View
                    obj.OrderSubId = details.OrderSubId;
                    obj.PONo = details.PONo;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BaseInvoiceamount = details.BaseInvoiceamount;

                    obj.TaxId1 = details.TaxId1;
                    obj.Taxable0 = details.Taxable0;

                    obj.TaxId2 = details.TaxId2;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;

                    obj.TaxId3 = details.TaxId3;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;

                    obj.TaxId4 = details.TaxId4;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;

                    obj.TaxId5 = details.TaxId5;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;

                    obj.IMEI = details.IMEI;

                    dt.Rows.Add
                    (obj.PurchaseInvoiceMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal,
                    obj.InvoiceTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.BillDiscount, obj.BillDisc, obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.PurchaseInvoiceSubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.OtherCost, obj.OrderId, obj.DeleteFlag, obj.LPO, details.OrderSubId, obj.PONo, obj.FCRoundOff, obj.RoundOff, obj.BaseInvoiceamount,
                    obj.TaxId1, obj.Taxable0, obj.TaxId2, obj.Taxable5, obj.Tax5, obj.TaxId3, obj.Taxable12, obj.Tax12, obj.TaxId4, obj.Taxable18, obj.Tax18, obj.TaxId5, obj.Taxable28, obj.Tax28
                    , obj.IMEI);
                }

                dsDataSet = obj.MobilePurchaseInvoiceInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
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
        public JsonResult PurchaseInvoiceUpdate(List<PurchaseInvoiceModel> PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();

            try
            {
                string[] tmpTable = new string[81];
                tmpTable[0] = "PurchaseInvoiceMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "Terms";
                tmpTable[8] = "DueDate";
                tmpTable[9] = "LocnId";
                tmpTable[10] = "PlaceOfSupply";
                tmpTable[11] = "JobNo";
                tmpTable[12] = "ShipDate";
                tmpTable[13] = "CurrencyId";
                tmpTable[14] = "CurrencyRate";
                tmpTable[15] = "FCDiscount";
                tmpTable[16] = "TotalDiscount";
                tmpTable[17] = "TotalTaxable";
                tmpTable[18] = "TotalTax";
                tmpTable[19] = "GrandTotal";
                tmpTable[20] = "InvoiceTotal";
                tmpTable[21] = "FCTaxable";
                tmpTable[22] = "FCTax";
                tmpTable[23] = "FCGrandTotal";
                tmpTable[24] = "BillDiscount";
                tmpTable[25] = "BillDisc";
                tmpTable[26] = "Remarks";
                tmpTable[27] = "DepartmentId";
                tmpTable[28] = "UserId";
                tmpTable[29] = "PurchaseInvoiceSubId";
                tmpTable[30] = "BatchSlno";
                tmpTable[31] = "Batch";
                tmpTable[32] = "ItemId";
                tmpTable[33] = "ItemCode";
                tmpTable[34] = "ItemDescription";
                tmpTable[35] = "LocationId";
                tmpTable[36] = "UnitId";
                tmpTable[37] = "Quantity";
                tmpTable[38] = "Fraction";
                tmpTable[39] = "Rate";
                tmpTable[40] = "BaseRate";
                tmpTable[41] = "Discount";
                tmpTable[42] = "BaseDiscount";
                tmpTable[43] = "TaxId";
                tmpTable[44] = "TaxRate";
                tmpTable[45] = "TaxableAmount";
                tmpTable[46] = "TaxAmount";
                tmpTable[47] = "TotalAmount";
                tmpTable[48] = "BaseTaxable";
                tmpTable[49] = "BaseTax";
                tmpTable[50] = "BaseAmount";
                tmpTable[51] = "OtherCost";
                tmpTable[52] = "OrderId";
                tmpTable[53] = "DeleteFlag";
                tmpTable[54] = "LPO";
                tmpTable[55] = "OrderSubId";
                tmpTable[56] = "PONo";
                tmpTable[57] = "FCRoundOff";
                tmpTable[58] = "RoundOff";
                tmpTable[59] = "BaseInvoiceamount";

                tmpTable[60] = "TaxId1";
                tmpTable[61] = "Taxable0";

                tmpTable[62] = "TaxId2";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";

                tmpTable[65] = "TaxId3";
                tmpTable[66] = "Taxable12";
                tmpTable[67] = "Tax12";

                tmpTable[68] = "TaxId4";
                tmpTable[69] = "Taxable18";
                tmpTable[70] = "Tax18";

                tmpTable[71] = "TaxId5";
                tmpTable[72] = "Taxable28";
                tmpTable[73] = "Tax28";

                tmpTable[74] = "MRVId";
                tmpTable[75] = "MRVSubId";

                tmpTable[76] = "Performa_NO";
                tmpTable[77] = "Performa_SubTbl_Id";

                tmpTable[78] = "PCAccountId";

                tmpTable[79] = "Variable1";
                tmpTable[80] = "Variable2";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseInvoiceModel)
                {
                    obj.PurchaseInvoiceMainId = details.PurchaseInvoiceMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.InvoiceTotal = details.InvoiceTotal;    //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.BillDiscount = details.BillDiscount;    //Foreign Currency
                    obj.BillDisc = details.BillDisc;            //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.PurchaseInvoiceSubId = details.PurchaseInvoiceSubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.OtherCost = details.OtherCost;          //Base Currency
                    obj.OrderId = details.OrderId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.LPO = details.LPO;                      //Free text in Purchase Invoice View
                    obj.OrderSubId = details.OrderSubId;
                    obj.PONo = details.PONo;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BaseInvoiceamount = details.BaseInvoiceamount;

                    obj.TaxId1 = details.TaxId1;
                    obj.Taxable0 = details.Taxable0;

                    obj.TaxId2 = details.TaxId2;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;

                    obj.TaxId3 = details.TaxId3;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;

                    obj.TaxId4 = details.TaxId4;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;

                    obj.TaxId5 = details.TaxId5;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;

                    obj.MRVId = details.MRVId;
                    obj.MRVSubId = details.MRVSubId;
                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;

                    obj.PCAccountId = details.PCAccountId;

                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.PurchaseInvoiceMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal,
                    obj.InvoiceTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.BillDiscount, obj.BillDisc, obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.PurchaseInvoiceSubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.OtherCost, obj.OrderId, obj.DeleteFlag, obj.LPO, details.OrderSubId, obj.PONo, obj.FCRoundOff, obj.RoundOff, obj.BaseInvoiceamount,
                    obj.TaxId1, obj.Taxable0, obj.TaxId2, obj.Taxable5, obj.Tax5, obj.TaxId3, obj.Taxable12, obj.Tax12, obj.TaxId4, obj.Taxable18, obj.Tax18, obj.TaxId5, obj.Taxable28, obj.Tax28
                    , obj.MRVId, obj.MRVSubId, obj.Performa_NO, obj.Performa_SubTbl_Id, obj.PCAccountId, obj.Variable1,obj.Variable2);
                }
                dsDataSet = obj.PurchaseInvoiceUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
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
        public JsonResult MobilePurchaseInvoiceUpdate(List<PurchaseInvoiceModel> PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();

            try
            {
                string[] tmpTable = new string[75];
                tmpTable[0] = "PurchaseInvoiceMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "Terms";
                tmpTable[8] = "DueDate";
                tmpTable[9] = "LocnId";
                tmpTable[10] = "PlaceOfSupply";
                tmpTable[11] = "JobNo";
                tmpTable[12] = "ShipDate";
                tmpTable[13] = "CurrencyId";
                tmpTable[14] = "CurrencyRate";
                tmpTable[15] = "FCDiscount";
                tmpTable[16] = "TotalDiscount";
                tmpTable[17] = "TotalTaxable";
                tmpTable[18] = "TotalTax";
                tmpTable[19] = "GrandTotal";
                tmpTable[20] = "InvoiceTotal";
                tmpTable[21] = "FCTaxable";
                tmpTable[22] = "FCTax";
                tmpTable[23] = "FCGrandTotal";
                tmpTable[24] = "BillDiscount";
                tmpTable[25] = "BillDisc";
                tmpTable[26] = "Remarks";
                tmpTable[27] = "DepartmentId";
                tmpTable[28] = "UserId";
                tmpTable[29] = "PurchaseInvoiceSubId";
                tmpTable[30] = "BatchSlno";
                tmpTable[31] = "Batch";
                tmpTable[32] = "ItemId";
                tmpTable[33] = "ItemCode";
                tmpTable[34] = "ItemDescription";
                tmpTable[35] = "LocationId";
                tmpTable[36] = "UnitId";
                tmpTable[37] = "Quantity";
                tmpTable[38] = "Fraction";
                tmpTable[39] = "Rate";
                tmpTable[40] = "BaseRate";
                tmpTable[41] = "Discount";
                tmpTable[42] = "BaseDiscount";
                tmpTable[43] = "TaxId";
                tmpTable[44] = "TaxRate";
                tmpTable[45] = "TaxableAmount";
                tmpTable[46] = "TaxAmount";
                tmpTable[47] = "TotalAmount";
                tmpTable[48] = "BaseTaxable";
                tmpTable[49] = "BaseTax";
                tmpTable[50] = "BaseAmount";
                tmpTable[51] = "OtherCost";
                tmpTable[52] = "OrderId";
                tmpTable[53] = "DeleteFlag";
                tmpTable[54] = "LPO";
                tmpTable[55] = "OrderSubId";
                tmpTable[56] = "PONo";
                tmpTable[57] = "FCRoundOff";
                tmpTable[58] = "RoundOff";
                tmpTable[59] = "BaseInvoiceamount";

                tmpTable[60] = "TaxId1";
                tmpTable[61] = "Taxable0";

                tmpTable[62] = "TaxId2";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";

                tmpTable[65] = "TaxId3";
                tmpTable[66] = "Taxable12";
                tmpTable[67] = "Tax12";

                tmpTable[68] = "TaxId4";
                tmpTable[69] = "Taxable18";
                tmpTable[70] = "Tax18";

                tmpTable[71] = "TaxId5";
                tmpTable[72] = "Taxable28";
                tmpTable[73] = "Tax28";
                tmpTable[74] = "IMEI";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseInvoiceModel)
                {
                    obj.PurchaseInvoiceMainId = details.PurchaseInvoiceMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.InvoiceTotal = details.InvoiceTotal;    //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.BillDiscount = details.BillDiscount;    //Foreign Currency
                    obj.BillDisc = details.BillDisc;            //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.PurchaseInvoiceSubId = details.PurchaseInvoiceSubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.OtherCost = details.OtherCost;          //Base Currency
                    obj.OrderId = details.OrderId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.LPO = details.LPO;                      //Free text in Purchase Invoice View
                    obj.OrderSubId = details.OrderSubId;
                    obj.PONo = details.PONo;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BaseInvoiceamount = details.BaseInvoiceamount;

                    obj.TaxId1 = details.TaxId1;
                    obj.Taxable0 = details.Taxable0;

                    obj.TaxId2 = details.TaxId2;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;

                    obj.TaxId3 = details.TaxId3;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;

                    obj.TaxId4 = details.TaxId4;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;

                    obj.TaxId5 = details.TaxId5;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;

                    obj.IMEI = details.IMEI;

                    dt.Rows.Add
                    (obj.PurchaseInvoiceMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal,
                    obj.InvoiceTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.BillDiscount, obj.BillDisc, obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.PurchaseInvoiceSubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.OtherCost, obj.OrderId, obj.DeleteFlag, obj.LPO, details.OrderSubId, obj.PONo, obj.FCRoundOff, obj.RoundOff, obj.BaseInvoiceamount,
                    obj.TaxId1, obj.Taxable0, obj.TaxId2, obj.Taxable5, obj.Tax5, obj.TaxId3, obj.Taxable12, obj.Tax12, obj.TaxId4, obj.Taxable18, obj.Tax18, obj.TaxId5, obj.Taxable28, obj.Tax28
                    , obj.IMEI);
                }
                dsDataSet = obj.MobilePurchaseInvoiceUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PurchaseAverageCostRefresh(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseAverageCostRefresh(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                 
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
        public ActionResult PurchaseInvoiceGetandGets(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseInvoiceGetandGets(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PurchaseInvoiceMainId = Convert.ToInt32(row["PurMainId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.Terms = row["Terms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.PlaceOfSupply = Convert.ToInt32(row["PlaceOfSupply"].ToString());
                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.ShipDate = row["ShipDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.InvoiceTotal = Convert.ToDecimal(row["InvoiceTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FTax"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["BaseTotal"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.BillDiscount = Convert.ToDecimal(row["FBillDiscount"].ToString());
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.LPO = row["LPO_No"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();

                    MModels.PurchaseInvoiceSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.OtherCost = Convert.ToDecimal(row["OtherCost"].ToString());
                    MModels.IMEI = row["IMEINumber"].ToString();
                    MModels.Performa_NO = row["Performa_NO"].ToString();
                    MModels.Performa_SubTbl_Id = Convert.ToInt32(row["Performa_SubTbl_Id"].ToString());
                    MModels.EDITFlag = row["EDIT"].ToString();

                    MModels.PCAccountId = Convert.ToInt32(row["AccId"].ToString());
                    MModels.PCAccount = row["AccCode"].ToString();
                    MModels.PCAccountDesc = row["Acc_Description"].ToString();
                    MModels.AccName = row["UserName"].ToString();

                    MModels.Variable1 = row["Performa_No"].ToString();
                    MModels.Variable2 = row["MRV_No"].ToString();
                    MModels.PONo = row["PO_No"].ToString();

                    MModels.BOQ = row["BOQ"].ToString();
                    MModels.EstimateAmount = Convert.ToDecimal(row["EstAmount"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        

 public ActionResult PurchaseInvoiceListOpening(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseInvoiceListOpening(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PurchaseInvoiceMainId = Convert.ToInt32(row["PurMainId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.AccName = row["Name"].ToString();
                    MModels.LPO = row["LPO_No"].ToString();
                    MModels.PONo = row["PO_No"].ToString();
                    MModels.Variable1 = row["Performa_NO"].ToString();
                    MModels.Variable2 = row["MRV_No"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        public ActionResult PurchaseInvoiceList(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseInvoiceList(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PurchaseInvoiceMainId = Convert.ToInt32(row["PurMainId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.AccName = row["Name"].ToString();
                    MModels.LPO = row["LPO_No"].ToString();
                    MModels.PONo = row["PO_No"].ToString();
                    MModels.Variable1 = row["Performa_NO"].ToString();
                    MModels.Variable2 = row["MRV_No"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult PerformaList(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PerformaList(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PurchaseInvoiceMainId = Convert.ToInt32(row["PPMainId"].ToString());
                    MModels.InvoNo = row["PPNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.InvoDate = row["PPDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.AccName = row["Name"].ToString();
                    MModels.LPO = row["LPO_No"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PurchaseOrderList(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderList(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.OrderDate = row["OrderDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.DocRef = row["DocRef"].ToString();
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.Approval = row["Approval"].ToString();
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
        public JsonResult OtherCostInsertandUpdate(List<PurchaseInvoiceModel> PurchaseInvoiceModel)
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

                dsDataSet = obj.OtherCostInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.InvoNo = row["InvId"].ToString();
                    //oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SerialNoSearch(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SerialNoSearch(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }


        public ActionResult PurchaseTransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> bList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseTransactionSearch(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["Description"].ToString();
                    MModels.OtherCost = Convert.ToDecimal(row["OtherCost"].ToString());
                    MModels.AccName = row["CustAccount"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Locnname = row["LocationName"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.DeptName = row["DepartmentName"].ToString();
                    MModels.LPO = row["PO_No"].ToString();
                    MModels.Cost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    bList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = bList,
                MaxJsonLength = 86753090,
            };
           // return Json(bList, JsonRequestBehavior.AllowGet); 

        }



        public ActionResult IMEIPurchaseTransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> bList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IMEIPurchaseTransactionSearch(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();

                    bList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(bList, JsonRequestBehavior.AllowGet);

        }


        public ActionResult IMEIPurchaseTransactionPopup(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> bList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IMEIPurchaseTransactionPopup(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.IMEI = row["IMEINumber"].ToString();
                    bList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(bList, JsonRequestBehavior.AllowGet);

        }


        public ActionResult TransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> bList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TransactionSearch(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.BillseriesId = row["BillSeries"].ToString();
                    MModels.Billseries = row["BillDescription"].ToString();
                    MModels.BillNo = row["BillNo"].ToString();
                    MModels.InvoDate = row["InvDate"].ToString();
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AccountName = row["Account Name"].ToString();
                    MModels.TransType = row["TransType"].ToString();
                    MModels.Status = row["Status"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.OpeningQty = Convert.ToDecimal(row["OpenQty"].ToString());
                    MModels.AverageCost = row["AvgCost"].ToString();
                    MModels.Balance = Convert.ToDecimal(row["Balance"].ToString());
                    MModels.Cost = Convert.ToDecimal(row["Cost"].ToString());
                    MModels.TransPrice = row["Price"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.DeptName = row["DepartmentName"].ToString();
                    MModels.Locnname = row["LocationName"].ToString();
                    MModels.DeliveryFee = Convert.ToDecimal(row["Delivery"].ToString());
                    MModels.DealerFee = Convert.ToDecimal(row["DealerFee"].ToString());
                    MModels.Shipping = Convert.ToDecimal(row["Shipping"].ToString());
                    MModels.StorageFee = Convert.ToDecimal(row["StorageFee"].ToString());
                    MModels.CustomsDuty = Convert.ToDecimal(row["CustomsDuty"].ToString());
                    MModels.OtherCosts = Convert.ToDecimal(row["OtherCosts"].ToString());
                    bList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = bList,
                MaxJsonLength = 86753090,
            };
            //return Json(bList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult MobileTransactionSearch(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> bList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MobileTransactionSearch(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.BillNo = row["BillNo"].ToString();
                    MModels.InvoDate = row["InvDate"].ToString();
                    MModels.IMEI = row["IMEI_Number"].ToString();
                    MModels.AccountName = row["Account Name"].ToString();
                    MModels.TransType = row["TransType"].ToString();
                    MModels.Status = row["Status"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.OpeningQty = Convert.ToDecimal(row["OpenQty"].ToString());
                    MModels.AverageCost = row["AvgCost"].ToString();
                    MModels.Balance = Convert.ToDecimal(row["Balance"].ToString());
                    MModels.Cost = Convert.ToDecimal(row["Cost"].ToString());
                    MModels.TransPrice = row["Price"].ToString();
                    MModels.DeptName = row["DepartmentName"].ToString();
                    MModels.Locnname = row["LocationName"].ToString();
                    bList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(bList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult IMEISearch(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> bList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IMEISearch(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.IMEI = row["IMEI_Number"].ToString();
                    MModels.Available = row["Available"].ToString();
                    bList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(bList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult IMEIAvailableSearch(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> bList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IMEIAvailableSearch(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.IMEI = row["IMEI_Number"].ToString();
                    MModels.Available = row["Available"].ToString();
                    bList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(bList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult SupplierInvoiceNoSearch(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> cList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SupplierInvoiceNoSearch(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.Flag = Convert.ToInt32(row["Flag"].ToString());

                    cList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(cList, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult PurchaseOtherCostGetandGets(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> dList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOtherCostGetandGets(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PayType = row["VType"].ToString();
                    MModels.AccId = Convert.ToInt32(row["AccId"].ToString());
                    MModels.AccName = row["Acc_Description"].ToString();
                    MModels.Description = row["VDescription"].ToString();
                    MModels.OCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.OCFCAmount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());

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
        public ActionResult PurchaseHistoryGets(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> dList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseHistoryGets(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PINumber = row["PINO"].ToString();
                    MModels.Variable1 = row["MRVNO"].ToString();
                    MModels.Variable2 = row["PPNO"].ToString();
                    MModels.PONo =row["PONO"].ToString();
                    MModels.LPO = row["PENO"].ToString();
                    MModels.Description =row["DESCR"].ToString();


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
        public ActionResult PendingPurchaseOrderGets(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingPurchaseOrderGets(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.OrderDate = row["OrderDate"].ToString();
                    MModels.SupplierCode = row["CustAccount"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.DocRef = row["DocRef"].ToString();
                    MModels.BaseAmount = Convert.ToDecimal(row["BaseTotal"].ToString());
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
        public ActionResult PurchaseOrderGetProduct(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderGetProduct(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.PurchaseOrderSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["POMainSlNo"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["qty"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();


                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult PerformaPurchaseGetProduct(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PerformaPurchaseGetProduct(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.PurchaseOrderSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["PPNo"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["qty"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.LPO = row["LPO_No"].ToString();
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
        public ActionResult PerformaorderGetProduct(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PerformaorderGetProduct(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.PurchaseOrderSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["POMainSlNo"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["qty"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
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
        public ActionResult PurchaseOrderProductRecall(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderProductRecall(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.PurchaseOrderSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["POMainSlNo"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["Id"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();


                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult PurchaseOrderProductRecallSort(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderProductRecallSort(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.PurchaseOrderSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["POMainSlNo"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["Id"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();


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
        public JsonResult PurchaseEnquiryInsertandUpdate(List<PurchaseEnquiry> PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();

            try
            {
                string[] tmpTable = new string[45];
                tmpTable[0] = "EnquiryNo";
                tmpTable[1] = "EnquiryDate";
                tmpTable[2] = "SupplierId";
                tmpTable[3] = "LocnId";
                tmpTable[4] = "CurrencyId";
                tmpTable[5] = "CurrencyRate";
                tmpTable[6] = "Remarks";
                tmpTable[7] = "TotalDiscount";
                tmpTable[8] = "FCDiscount";
                tmpTable[9] = "TotalTaxable";
                tmpTable[10] = "TotalTax";
                tmpTable[11] = "GrandTotal";
                tmpTable[12] = "FCTaxable";
                tmpTable[13] = "FCTax";
                tmpTable[14] = "FCGrandTotal";
                tmpTable[15] = "DepartmentId";
                tmpTable[16] = "UserId";
                tmpTable[17] = "DeleteFlag";
                tmpTable[18] = "MReqNo";
                tmpTable[19] = "MReqSubId";

                tmpTable[20] = "PurchaseEnquirySubId";
                tmpTable[21] = "ItemId";
                tmpTable[22] = "ItemCode";
                tmpTable[23] = "ItemDescription";
                tmpTable[24] = "LocationId";
                tmpTable[25] = "UnitId";
                tmpTable[26] = "Quantity";
                tmpTable[27] = "Rate";
                tmpTable[28] = "BaseRate";
                tmpTable[29] = "Discount";
                tmpTable[30] = "BaseDiscount";
                tmpTable[31] = "TaxId";
                tmpTable[32] = "TaxRate";
                tmpTable[33] = "TaxableAmount";
                tmpTable[34] = "TaxAmount";
                tmpTable[35] = "TotalAmount";
                tmpTable[36] = "BaseTaxable";
                tmpTable[37] = "BaseTax";
                tmpTable[38] = "BaseAmount";
                tmpTable[39] = "PurchaseAnalysisId";
                tmpTable[40] = "Models";

                tmpTable[41] = "JobNo";
                tmpTable[42] = "MainJobNo";
                tmpTable[43] = "Variable1";
                tmpTable[44] = "Variable2";


                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseEnquiry)
                {
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.EnquiryDate = details.EnquiryDate;
                    obj.SupplierId = details.SupplierId;
                    obj.LocnId = details.LocnId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.Remarks = details.Remarks;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCDiscount = details.FCDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.GrandTotal = details.GrandTotal;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.MReqNo = details.MReqNo;
                    obj.MReqSubId = details.MReqSubId;

                    obj.PurchaseEnquirySubId = details.PurchaseEnquirySubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Rate = details.Rate;
                    obj.BaseRate = details.BaseRate;
                    obj.Discount = details.Discount;
                    obj.BaseDiscount = details.BaseDiscount;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.TotalAmount = details.TotalAmount;
                    obj.BaseTaxable = details.BaseTaxable;
                    obj.BaseTax = details.BaseTax;
                    obj.BaseAmount = details.BaseAmount;
                    obj.PurchaseAnalysisId = details.PurchaseAnalysisId;
                    obj.Models = details.Models;

                    obj.JobNo = details.JobNo;
                    obj.MainJobNo = details.MainJobNo;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.EnquiryNo, obj.EnquiryDate, obj.SupplierId, obj.LocnId, obj.CurrencyId, obj.CurrencyRate, obj.Remarks, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax,
                    obj.GrandTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal, obj.DepartmentId, obj.UserId, obj.DeleteFlag, obj.MReqNo, obj.MReqSubId,

                    obj.PurchaseEnquirySubId, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount,
                    obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount, obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.PurchaseAnalysisId, obj.Models,
                    obj.JobNo, obj.MainJobNo, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.PurchaseEnquiryInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.Status = row["Status"].ToString();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult PurchaseEnquiryGetandGets(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEnquiryGetandGets(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.EnquiryDate = row["EnquiryDate"].ToString();
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FTax"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["BaseTotal"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());



                    MModels.PurchaseEnquirySubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Qty = Convert.ToInt32(row["Qty"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.Models = row["Models"].ToString();

                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();

                    MModels.BOQ = row["BOQ"].ToString();
                    MModels.EstimateAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    MModels.BOQQty = Convert.ToInt32(row["BOQQty"].ToString());
                    MModels.BOQAmt = Convert.ToDecimal(row["BOQAmt"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PurchaseEnquiryList(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEnquiryList(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.EnquiryDate = row["EnquiryDate"].ToString();
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PurchaseReturnList(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReturnList(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.EnquiryNo = Convert.ToInt32(row["PRNo"].ToString());
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.EnquiryDate = row["PRDate"].ToString();
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.Status = row["PurchaseType"].ToString();
                    MModels.CurrencyName = row["Name"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult EnquiryNoSearch(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EnquiryNoSearch(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.EnquiryDate = row["EnquiryDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
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
        public JsonResult PurchaseOrderInsertandUpdate(List<PurchaseOrder> PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseOrder> oList = new List<PurchaseOrder>();

            try
            {
                string[] tmpTable = new string[54];
                tmpTable[0] = "OrderNo";
                tmpTable[1] = "OrderDate";
                tmpTable[2] = "ExpectedDate";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "LocnId";
                tmpTable[5] = "CurrencyId";
                tmpTable[6] = "CurrencyRate";
                tmpTable[7] = "Terms";
                tmpTable[8] = "JobNo";
                tmpTable[9] = "DocRef";
                tmpTable[10] = "ShipTo";
                tmpTable[11] = "Remarks";
                tmpTable[12] = "ShipVia";
                tmpTable[13] = "ModeofTransfer";
                tmpTable[14] = "PortofEntry";
                tmpTable[15] = "FinalDestination";
                tmpTable[16] = "TotalDiscount";
                tmpTable[17] = "FCDiscount";
                tmpTable[18] = "TotalTaxable";
                tmpTable[19] = "TotalTax";
                tmpTable[20] = "GrandTotal";
                tmpTable[21] = "FCTaxable";
                tmpTable[22] = "FCTax";
                tmpTable[23] = "FCGrandTotal";
                tmpTable[24] = "DepartmentId";
                tmpTable[25] = "UserId";
                tmpTable[26] = "DeleteFlag";

                tmpTable[27] = "PurchaseOrderSubId";
                tmpTable[28] = "ItemId";
                tmpTable[29] = "ItemCode";
                tmpTable[30] = "ItemDescription";
                tmpTable[31] = "LocationId";
                tmpTable[32] = "UnitId";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Rate";
                tmpTable[35] = "BaseRate";
                tmpTable[36] = "Discount";
                tmpTable[37] = "BaseDiscount";
                tmpTable[38] = "TaxId";
                tmpTable[39] = "TaxRate";
                tmpTable[40] = "TaxableAmount";
                tmpTable[41] = "TaxAmount";
                tmpTable[42] = "TotalAmount";
                tmpTable[43] = "BaseTaxable";
                tmpTable[44] = "BaseTax";
                tmpTable[45] = "BaseAmount";
                tmpTable[46] = "PENumber";
                tmpTable[47] = "EnquiryNo";
                tmpTable[48] = "EnquirySubId";

                tmpTable[49] = "BillDiscount";
                tmpTable[50] = "BillDisc";

                tmpTable[51] = "MainJobNo";
                tmpTable[52] = "Variable1";
                tmpTable[53] = "Variable2";


                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseOrder)
                {
                    obj.OrderNo = details.OrderNo;
                    obj.OrderDate = details.OrderDate;
                    obj.ExpectedDate = details.ExpectedDate;
                    obj.SupplierId = details.SupplierId;
                    obj.LocnId = details.LocnId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.Terms = details.Terms;
                    obj.JobNo = details.JobNo;
                    obj.DocRef = details.DocRef;
                    obj.ShipTo = details.ShipTo;
                    obj.Remarks = details.Remarks;
                    obj.ShipVia = details.ShipVia;
                    obj.ModeofTransfer = details.ModeofTransfer;
                    obj.PortofEntry = details.PortofEntry;
                    obj.FinalDestination = details.FinalDestination;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCDiscount = details.FCDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.GrandTotal = details.GrandTotal;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.DeleteFlag = details.DeleteFlag;


                    obj.PurchaseOrderSubId = details.PurchaseOrderSubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Rate = details.Rate;
                    obj.BaseRate = details.BaseRate;
                    obj.Discount = details.Discount;
                    obj.BaseDiscount = details.BaseDiscount;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.TotalAmount = details.TotalAmount;
                    obj.BaseTaxable = details.BaseTaxable;
                    obj.BaseTax = details.BaseTax;
                    obj.BaseAmount = details.BaseAmount;
                    obj.PENumber = details.PENumber;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.EnquirySubId = details.EnquirySubId;
                    obj.BillDiscount = details.BillDiscount;
                    obj.BillDisc = details.BillDisc;

                    obj.MainJobNo = details.MainJobNo;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.OrderNo, obj.OrderDate, obj.ExpectedDate, obj.SupplierId, obj.LocnId, obj.CurrencyId, obj.CurrencyRate, obj.Terms, obj.JobNo, obj.DocRef, obj.ShipTo, obj.Remarks,
                    obj.ShipVia, obj.ModeofTransfer, obj.PortofEntry, obj.FinalDestination, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal, obj.FCTaxable,
                    obj.FCTax, obj.FCGrandTotal, obj.DepartmentId, obj.UserId, obj.DeleteFlag,

                    obj.PurchaseOrderSubId, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount,
                    obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount, obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.PENumber, obj.EnquiryNo, obj.EnquirySubId, obj.BillDiscount, obj.BillDisc,
                    obj.MainJobNo, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.PurchaseOrderInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.Status = row["Status"].ToString();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
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
        public JsonResult PurchaseOrderUpdate(List<PurchaseOrder> PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseOrder> oList = new List<PurchaseOrder>();

            try
            {
                string[] tmpTable = new string[54];
                tmpTable[0] = "OrderNo";
                tmpTable[1] = "OrderDate";
                tmpTable[2] = "ExpectedDate";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "LocnId";
                tmpTable[5] = "CurrencyId";
                tmpTable[6] = "CurrencyRate";
                tmpTable[7] = "Terms";
                tmpTable[8] = "JobNo";
                tmpTable[9] = "DocRef";
                tmpTable[10] = "ShipTo";
                tmpTable[11] = "Remarks";
                tmpTable[12] = "ShipVia";
                tmpTable[13] = "ModeofTransfer";
                tmpTable[14] = "PortofEntry";
                tmpTable[15] = "FinalDestination";
                tmpTable[16] = "TotalDiscount";
                tmpTable[17] = "FCDiscount";
                tmpTable[18] = "TotalTaxable";
                tmpTable[19] = "TotalTax";
                tmpTable[20] = "GrandTotal";
                tmpTable[21] = "FCTaxable";
                tmpTable[22] = "FCTax";
                tmpTable[23] = "FCGrandTotal";
                tmpTable[24] = "DepartmentId";
                tmpTable[25] = "UserId";
                tmpTable[26] = "DeleteFlag";

                tmpTable[27] = "PurchaseOrderSubId";
                tmpTable[28] = "ItemId";
                tmpTable[29] = "ItemCode";
                tmpTable[30] = "ItemDescription";
                tmpTable[31] = "LocationId";
                tmpTable[32] = "UnitId";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Rate";
                tmpTable[35] = "BaseRate";
                tmpTable[36] = "Discount";
                tmpTable[37] = "BaseDiscount";
                tmpTable[38] = "TaxId";
                tmpTable[39] = "TaxRate";
                tmpTable[40] = "TaxableAmount";
                tmpTable[41] = "TaxAmount";
                tmpTable[42] = "TotalAmount";
                tmpTable[43] = "BaseTaxable";
                tmpTable[44] = "BaseTax";
                tmpTable[45] = "BaseAmount";
                tmpTable[46] = "PENumber";
                tmpTable[47] = "EnquiryNo";
                tmpTable[48] = "EnquirySubId";

                tmpTable[49] = "BillDiscount";
                tmpTable[50] = "BillDisc";

                tmpTable[51] = "MainJobNo";
                tmpTable[52] = "Variable1";
                tmpTable[53] = "Variable2";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseOrder)
                {
                    obj.OrderNo = details.OrderNo;
                    obj.OrderDate = details.OrderDate;
                    obj.ExpectedDate = details.ExpectedDate;
                    obj.SupplierId = details.SupplierId;
                    obj.LocnId = details.LocnId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.Terms = details.Terms;
                    obj.JobNo = details.JobNo;
                    obj.DocRef = details.DocRef;
                    obj.ShipTo = details.ShipTo;
                    obj.Remarks = details.Remarks;
                    obj.ShipVia = details.ShipVia;
                    obj.ModeofTransfer = details.ModeofTransfer;
                    obj.PortofEntry = details.PortofEntry;
                    obj.FinalDestination = details.FinalDestination;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCDiscount = details.FCDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.GrandTotal = details.GrandTotal;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.DeleteFlag = details.DeleteFlag;


                    obj.PurchaseOrderSubId = details.PurchaseOrderSubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Rate = details.Rate;
                    obj.BaseRate = details.BaseRate;
                    obj.Discount = details.Discount;
                    obj.BaseDiscount = details.BaseDiscount;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.TotalAmount = details.TotalAmount;
                    obj.BaseTaxable = details.BaseTaxable;
                    obj.BaseTax = details.BaseTax;
                    obj.BaseAmount = details.BaseAmount;
                    obj.PENumber = details.PENumber;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.EnquirySubId = details.EnquirySubId;

                    obj.BillDiscount = details.BillDiscount;
                    obj.BillDisc = details.BillDisc;

                    obj.MainJobNo = details.MainJobNo;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.OrderNo, obj.OrderDate, obj.ExpectedDate, obj.SupplierId, obj.LocnId, obj.CurrencyId, obj.CurrencyRate, obj.Terms, obj.JobNo, obj.DocRef, obj.ShipTo, obj.Remarks,
                    obj.ShipVia, obj.ModeofTransfer, obj.PortofEntry, obj.FinalDestination, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal, obj.FCTaxable,
                    obj.FCTax, obj.FCGrandTotal, obj.DepartmentId, obj.UserId, obj.DeleteFlag,

                    obj.PurchaseOrderSubId, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount,
                    obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount, obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.PENumber, obj.EnquiryNo, obj.EnquirySubId,
                    
                    obj.BillDiscount, obj.BillDisc, obj.MainJobNo, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.PurchaseOrderUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.Status = row["Status"].ToString();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult PurchaseOrderGetandGets(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderGetandGets(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.OrderDate = row["OrderDate"].ToString();
                    MModels.ExpectedDate = row["ShippingDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.Terms = Convert.ToInt32(row["Terms"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();
                    MModels.DocRef = row["DocRef"].ToString();
                    MModels.ShipTo = row["ShippingAddress"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.ShipVia = row["ShipVia"].ToString();
                    MModels.ModeofTransfer = row["ModeofTransfer"].ToString();
                    MModels.PortofEntry = row["PortofEntry"].ToString();
                    MModels.FinalDestination = row["FinalDestination"].ToString();
                    MModels.TotalDiscount = Convert.ToDecimal(row["FDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FTax"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["BaseTotal"].ToString());
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());



                    MModels.PurchaseOrderSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Qty = Convert.ToInt32(row["Qty"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());

                    MModels.BillDiscount = Convert.ToDecimal(row["FBillDiscount"].ToString());
                    MModels.BillDisc = Convert.ToDecimal(row["BillDiscount"].ToString());

                    MModels.BOQ = row["BOQ"].ToString();
                    MModels.EstimateAmount = Convert.ToDecimal(row["EstAmount"].ToString());
                    MModels.BOQQty = Convert.ToInt32(row["BOQQty"].ToString());
                    MModels.BOQAmt = Convert.ToDecimal(row["BOQAmt"].ToString());
                    MModels.Approval= row["Approval"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult OrderNoSearch(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OrderNoSearch(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.OrderDate = row["OrderDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult PerformaNoSearch(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PerformaNoSearch(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.PerformaNo = row["PPNo"].ToString();
                    MModels.PerformaDate = row["PPDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
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
        public ActionResult PurchaseEnquiryGetsforPO(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEnquiryGetsforPO(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.EnquiryDate = row["EnquiryDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.FCTotal = Convert.ToDecimal(row["FCTotal"].ToString());

                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult PurchaseEnquiryGetsforPOSort(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEnquiryGetsforPOSort(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.EnquiryDate = row["EnquiryDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.FCTotal = Convert.ToDecimal(row["FCTotal"].ToString());
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
        public ActionResult PurchaseEntryGetProductforPO(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEntryGetProductforPO(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.PurchaseEnquirySubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.EnquiryNo = Convert.ToInt32(row["PEMainSlNo"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());

                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();


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
        public ActionResult PurchaseEnquiryGetProductforPOSort(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEnquiryGetProductforPOSort(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.PurchaseEnquirySubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.EnquiryNo = Convert.ToInt32(row["PEMainSlNo"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());

                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();


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
        public ActionResult PurchaseOrderRecall(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseOrderRecall(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.OrderDate = row["OrderDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.DocRef = row["DocRef"].ToString();
                    MModels.ShipTo = row["ShippingAddress"].ToString();
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
        public ActionResult PurchaseEnquiryRecall(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEnquiryRecall(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.EnquiryDate = row["EnquiryDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
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
        public ActionResult PurchaseInvoiceRecall(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseInvoiceRecall(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
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
        public ActionResult PurchaseInvoiceProductRecall(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseInvoiceProductRecall(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PurchaseInvoiceSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["InvMainSlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["Id"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());

                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();

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
        public ActionResult PurchaseEnquiryProductRecall(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();

            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseEnquiryProductRecall(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry MModels = new PurchaseEnquiry();
                    MModels.PurchaseEnquirySubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.EnquiryNo = Convert.ToInt32(row["PEMainSlNo"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());

                    MModels.MainJobNo = Convert.ToInt32(row["MainProjectJob"].ToString());
                    MModels.MainJobCode = row["MainJobCode"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }






        //===================================================================       Purchase Return        ===================================================================================


        [HttpPost]
        public JsonResult PurchaseReturnInsertandUpdate(List<PurchaseReturn> PurchaseReturn)
        {
            PurchaseReturn obj = new PurchaseReturn();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseReturn> oList = new List<PurchaseReturn>();

            try
            {
                string[] tmpTable = new string[69];
                tmpTable[0] = "PRMainId";
                tmpTable[1] = "PRNo";
                tmpTable[2] = "SupplierId";
                tmpTable[3] = "PayType";
                tmpTable[4] = "PurchaseType";
                tmpTable[5] = "PRDate";
                tmpTable[6] = "Terms";
                tmpTable[7] = "DueDate";
                tmpTable[8] = "LocnId";
                tmpTable[9] = "PlaceOfSupply";
                tmpTable[10] = "JobNo";
                tmpTable[11] = "ShipDate";
                tmpTable[12] = "CurrencyId";
                tmpTable[13] = "CurrencyRate";
                tmpTable[14] = "FCDiscount";
                tmpTable[15] = "TotalDiscount";
                tmpTable[16] = "TotalTaxable";
                tmpTable[17] = "TotalTax";
                tmpTable[18] = "GrandTotal";
                tmpTable[19] = "FCTaxable";
                tmpTable[20] = "FCTax";
                tmpTable[21] = "FCGrandTotal";
                tmpTable[22] = "Remarks";
                tmpTable[23] = "DepartmentId";
                tmpTable[24] = "UserId";
                tmpTable[25] = "SubId";
                tmpTable[26] = "BatchSlno";
                tmpTable[27] = "Batch";
                tmpTable[28] = "ItemId";
                tmpTable[29] = "ItemCode";
                tmpTable[30] = "ItemDescription";
                tmpTable[31] = "LocationId";
                tmpTable[32] = "UnitId";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Fraction";
                tmpTable[35] = "Rate";
                tmpTable[36] = "BaseRate";
                tmpTable[37] = "Discount";
                tmpTable[38] = "BaseDiscount";
                tmpTable[39] = "TaxId";
                tmpTable[40] = "TaxRate";
                tmpTable[41] = "TaxableAmount";
                tmpTable[42] = "TaxAmount";
                tmpTable[43] = "TotalAmount";
                tmpTable[44] = "BaseTaxable";
                tmpTable[45] = "BaseTax";
                tmpTable[46] = "BaseAmount";
                tmpTable[47] = "PIMainId";
                tmpTable[48] = "DeleteFlag";
                tmpTable[49] = "PINo";
                tmpTable[50] = "PISubId";

                tmpTable[51] = "TaxId1";
                tmpTable[52] = "Taxable0";

                tmpTable[53] = "TaxId2";
                tmpTable[54] = "Taxable5";
                tmpTable[55] = "Tax5";

                tmpTable[56] = "TaxId3";
                tmpTable[57] = "Taxable12";
                tmpTable[58] = "Tax12";

                tmpTable[59] = "TaxId4";
                tmpTable[60] = "Taxable18";
                tmpTable[61] = "Tax18";

                tmpTable[62] = "TaxId5";
                tmpTable[63] = "Taxable28";
                tmpTable[64] = "Tax28";
                tmpTable[65] = "AccCode";
                tmpTable[66] = "CustType";
                tmpTable[67] = "Variable1";
                tmpTable[68] = "Variable2";


                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseReturn)
                {
                    obj.PRMainId = details.PRMainId;
                    obj.PRNo = details.PRNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.PRDate = details.PRDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.SubId = details.SubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.PIMainId = details.PIMainId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.PINo = details.PINo;                      //Free text in Purchase Invoice View
                    obj.PISubId = details.PISubId;

                    obj.TaxId1 = details.TaxId1;
                    obj.Taxable0 = details.Taxable0;

                    obj.TaxId2 = details.TaxId2;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;

                    obj.TaxId3 = details.TaxId3;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;

                    obj.TaxId4 = details.TaxId4;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;

                    obj.TaxId5 = details.TaxId5;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;

                    obj.AccCode = details.AccCode;
                    obj.CustType = details.CustType;

                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.PRMainId, obj.PRNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.PRDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal,
                    obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.SubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.PIMainId, obj.DeleteFlag, obj.PINo, details.PISubId,
                    obj.TaxId1, obj.Taxable0, obj.TaxId2, obj.Taxable5, obj.Tax5, obj.TaxId3, obj.Taxable12, obj.Tax12, obj.TaxId4, obj.Taxable18, obj.Tax18, obj.TaxId5, obj.Taxable28, obj.Tax28
                    , obj.AccCode, obj.CustType, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.PurchaseReturnInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseReturn MModels = new PurchaseReturn();
                    MModels.Status = row["Status"].ToString();
                    MModels.PRNo = row["PRNo"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
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
        public JsonResult PurchaseReturnUpdate(List<PurchaseReturn> PurchaseReturn)
        {
            PurchaseReturn obj = new PurchaseReturn();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseReturn> oList = new List<PurchaseReturn>();

            try
            {
                string[] tmpTable = new string[69];
                tmpTable[0] = "PRMainId";
                tmpTable[1] = "PRNo";
                tmpTable[2] = "SupplierId";
                tmpTable[3] = "PayType";
                tmpTable[4] = "PurchaseType";
                tmpTable[5] = "PRDate";
                tmpTable[6] = "Terms";
                tmpTable[7] = "DueDate";
                tmpTable[8] = "LocnId";
                tmpTable[9] = "PlaceOfSupply";
                tmpTable[10] = "JobNo";
                tmpTable[11] = "ShipDate";
                tmpTable[12] = "CurrencyId";
                tmpTable[13] = "CurrencyRate";
                tmpTable[14] = "FCDiscount";
                tmpTable[15] = "TotalDiscount";
                tmpTable[16] = "TotalTaxable";
                tmpTable[17] = "TotalTax";
                tmpTable[18] = "GrandTotal";
                tmpTable[19] = "FCTaxable";
                tmpTable[20] = "FCTax";
                tmpTable[21] = "FCGrandTotal";
                tmpTable[22] = "Remarks";
                tmpTable[23] = "DepartmentId";
                tmpTable[24] = "UserId";
                tmpTable[25] = "SubId";
                tmpTable[26] = "BatchSlno";
                tmpTable[27] = "Batch";
                tmpTable[28] = "ItemId";
                tmpTable[29] = "ItemCode";
                tmpTable[30] = "ItemDescription";
                tmpTable[31] = "LocationId";
                tmpTable[32] = "UnitId";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Fraction";
                tmpTable[35] = "Rate";
                tmpTable[36] = "BaseRate";
                tmpTable[37] = "Discount";
                tmpTable[38] = "BaseDiscount";
                tmpTable[39] = "TaxId";
                tmpTable[40] = "TaxRate";
                tmpTable[41] = "TaxableAmount";
                tmpTable[42] = "TaxAmount";
                tmpTable[43] = "TotalAmount";
                tmpTable[44] = "BaseTaxable";
                tmpTable[45] = "BaseTax";
                tmpTable[46] = "BaseAmount";
                tmpTable[47] = "PIMainId";
                tmpTable[48] = "DeleteFlag";
                tmpTable[49] = "PINo";
                tmpTable[50] = "PISubId";

                tmpTable[51] = "TaxId1";
                tmpTable[52] = "Taxable0";

                tmpTable[53] = "TaxId2";
                tmpTable[54] = "Taxable5";
                tmpTable[55] = "Tax5";

                tmpTable[56] = "TaxId3";
                tmpTable[57] = "Taxable12";
                tmpTable[58] = "Tax12";

                tmpTable[59] = "TaxId4";
                tmpTable[60] = "Taxable18";
                tmpTable[61] = "Tax18";

                tmpTable[62] = "TaxId5";
                tmpTable[63] = "Taxable28";
                tmpTable[64] = "Tax28";

                tmpTable[65] = "AccCode";
                tmpTable[66] = "CustType";
                tmpTable[67] = "Variable1";
                tmpTable[68] = "Variable2";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseReturn)
                {
                    obj.PRMainId = details.PRMainId;
                    obj.PRNo = details.PRNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.PRDate = details.PRDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.SubId = details.SubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.PIMainId = details.PIMainId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.PINo = details.PINo;                      //Free text in Purchase Invoice View
                    obj.PISubId = details.PISubId;

                    obj.TaxId1 = details.TaxId1;
                    obj.Taxable0 = details.Taxable0;

                    obj.TaxId2 = details.TaxId2;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;

                    obj.TaxId3 = details.TaxId3;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;

                    obj.TaxId4 = details.TaxId4;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;

                    obj.TaxId5 = details.TaxId5;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;

                    obj.AccCode = details.AccCode;
                    obj.CustType = details.CustType;

                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.PRMainId, obj.PRNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.PRDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal,
                    obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.SubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.PIMainId, obj.DeleteFlag, obj.PINo, details.PISubId,
                    obj.TaxId1, obj.Taxable0, obj.TaxId2, obj.Taxable5, obj.Tax5, obj.TaxId3, obj.Taxable12, obj.Tax12, obj.TaxId4, obj.Taxable18, obj.Tax18, obj.TaxId5, obj.Taxable28, obj.Tax28
                    , obj.AccCode, obj.CustType, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.PurchaseReturnUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseReturn MModels = new PurchaseReturn();
                    MModels.Status = row["Status"].ToString();
                    MModels.PRNo = row["PRNo"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
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
        public JsonResult MobilePurchaseReturnInsertandUpdate(List<PurchaseReturn> PurchaseReturn)
        {
            PurchaseReturn obj = new PurchaseReturn();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseReturn> oList = new List<PurchaseReturn>();

            try
            {
                string[] tmpTable = new string[66];
                tmpTable[0] = "PRMainId";
                tmpTable[1] = "PRNo";
                tmpTable[2] = "SupplierId";
                tmpTable[3] = "PayType";
                tmpTable[4] = "PurchaseType";
                tmpTable[5] = "PRDate";
                tmpTable[6] = "Terms";
                tmpTable[7] = "DueDate";
                tmpTable[8] = "LocnId";
                tmpTable[9] = "PlaceOfSupply";
                tmpTable[10] = "JobNo";
                tmpTable[11] = "ShipDate";
                tmpTable[12] = "CurrencyId";
                tmpTable[13] = "CurrencyRate";
                tmpTable[14] = "FCDiscount";
                tmpTable[15] = "TotalDiscount";
                tmpTable[16] = "TotalTaxable";
                tmpTable[17] = "TotalTax";
                tmpTable[18] = "GrandTotal";
                tmpTable[19] = "FCTaxable";
                tmpTable[20] = "FCTax";
                tmpTable[21] = "FCGrandTotal";
                tmpTable[22] = "Remarks";
                tmpTable[23] = "DepartmentId";
                tmpTable[24] = "UserId";
                tmpTable[25] = "SubId";
                tmpTable[26] = "BatchSlno";
                tmpTable[27] = "Batch";
                tmpTable[28] = "ItemId";
                tmpTable[29] = "ItemCode";
                tmpTable[30] = "ItemDescription";
                tmpTable[31] = "LocationId";
                tmpTable[32] = "UnitId";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Fraction";
                tmpTable[35] = "Rate";
                tmpTable[36] = "BaseRate";
                tmpTable[37] = "Discount";
                tmpTable[38] = "BaseDiscount";
                tmpTable[39] = "TaxId";
                tmpTable[40] = "TaxRate";
                tmpTable[41] = "TaxableAmount";
                tmpTable[42] = "TaxAmount";
                tmpTable[43] = "TotalAmount";
                tmpTable[44] = "BaseTaxable";
                tmpTable[45] = "BaseTax";
                tmpTable[46] = "BaseAmount";
                tmpTable[47] = "PIMainId";
                tmpTable[48] = "DeleteFlag";
                tmpTable[49] = "PINo";
                tmpTable[50] = "PISubId";

                tmpTable[51] = "TaxId1";
                tmpTable[52] = "Taxable0";

                tmpTable[53] = "TaxId2";
                tmpTable[54] = "Taxable5";
                tmpTable[55] = "Tax5";

                tmpTable[56] = "TaxId3";
                tmpTable[57] = "Taxable12";
                tmpTable[58] = "Tax12";

                tmpTable[59] = "TaxId4";
                tmpTable[60] = "Taxable18";
                tmpTable[61] = "Tax18";

                tmpTable[62] = "TaxId5";
                tmpTable[63] = "Taxable28";
                tmpTable[64] = "Tax28";
                tmpTable[65] = "IMEI";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseReturn)
                {
                    obj.PRMainId = details.PRMainId;
                    obj.PRNo = details.PRNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.PRDate = details.PRDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.SubId = details.SubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.PIMainId = details.PIMainId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.PINo = details.PINo;                      //Free text in Purchase Invoice View
                    obj.PISubId = details.PISubId;

                    obj.TaxId1 = details.TaxId1;
                    obj.Taxable0 = details.Taxable0;

                    obj.TaxId2 = details.TaxId2;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;

                    obj.TaxId3 = details.TaxId3;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;

                    obj.TaxId4 = details.TaxId4;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;

                    obj.TaxId5 = details.TaxId5;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.IMEI = details.IMEI;
                    dt.Rows.Add
                    (obj.PRMainId, obj.PRNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.PRDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal,
                    obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.SubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.PIMainId, obj.DeleteFlag, obj.PINo, details.PISubId,
                    obj.TaxId1, obj.Taxable0, obj.TaxId2, obj.Taxable5, obj.Tax5, obj.TaxId3, obj.Taxable12, obj.Tax12, obj.TaxId4, obj.Taxable18, obj.Tax18, obj.TaxId5, obj.Taxable28, obj.Tax28
                    , obj.IMEI);
                }

                dsDataSet = obj.MobilePurchaseReturnInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseReturn MModels = new PurchaseReturn();
                    MModels.Status = row["Status"].ToString();
                    MModels.PRNo = row["PRNo"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PRNoSearch(PurchaseReturn PurchaseReturn)
        {
            PurchaseReturn obj = new PurchaseReturn();

            List<PurchaseReturn> oList = new List<PurchaseReturn>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PRNoSearch(PurchaseReturn, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseReturn MModels = new PurchaseReturn();
                    MModels.PRNo = row["PRNo"].ToString();
                    MModels.PRDate = row["PRDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult PurchaseReturnGetandGets(PurchaseReturn PurchaseReturn)
        {
            PurchaseReturn obj = new PurchaseReturn();

            List<PurchaseReturn> oList = new List<PurchaseReturn>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseReturnGetandGets(PurchaseReturn, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseReturn MModels = new PurchaseReturn();
                    MModels.PRMainId = Convert.ToInt32(row["PRMainId"].ToString());
                    MModels.PRNo = row["PRNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.PRDate = row["PRDate"].ToString();
                    MModels.Terms = Convert.ToInt32(row["Terms"].ToString());
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.PlaceOfSupply = Convert.ToInt32(row["PlaceOfSupply"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.ShipDate = row["ShipDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FTax"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["BaseTotal"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PINo = row["PINo"].ToString();


                    MModels.SubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.IMEI = row["IMEINumber"].ToString();
                    MModels.UserName=  row["UserName"].ToString();
                    MModels.CustType = row["CustType"].ToString();
                    MModels.AccCode = row["CustAccount"].ToString();

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
        public JsonResult PurchaseItemTemporarySave(List<PurchaseInvoiceModel> PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();

            try
            {
                string[] tmpTable = new string[81];
                tmpTable[0] = "PurchaseInvoiceMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "Terms";
                tmpTable[8] = "DueDate";
                tmpTable[9] = "LocnId";
                tmpTable[10] = "PlaceOfSupply";
                tmpTable[11] = "JobNo";
                tmpTable[12] = "ShipDate";
                tmpTable[13] = "CurrencyId";
                tmpTable[14] = "CurrencyRate";
                tmpTable[15] = "FCDiscount";
                tmpTable[16] = "TotalDiscount";
                tmpTable[17] = "TotalTaxable";
                tmpTable[18] = "TotalTax";
                tmpTable[19] = "GrandTotal";
                tmpTable[20] = "InvoiceTotal";
                tmpTable[21] = "FCTaxable";
                tmpTable[22] = "FCTax";
                tmpTable[23] = "FCGrandTotal";
                tmpTable[24] = "BillDiscount";
                tmpTable[25] = "BillDisc";
                tmpTable[26] = "Remarks";
                tmpTable[27] = "DepartmentId";
                tmpTable[28] = "UserId";
                tmpTable[29] = "PurchaseInvoiceSubId";
                tmpTable[30] = "BatchSlno";
                tmpTable[31] = "Batch";
                tmpTable[32] = "ItemId";
                tmpTable[33] = "ItemCode";
                tmpTable[34] = "ItemDescription";
                tmpTable[35] = "LocationId";
                tmpTable[36] = "UnitId";
                tmpTable[37] = "Quantity";
                tmpTable[38] = "Fraction";
                tmpTable[39] = "Rate";
                tmpTable[40] = "BaseRate";
                tmpTable[41] = "Discount";
                tmpTable[42] = "BaseDiscount";
                tmpTable[43] = "TaxId";
                tmpTable[44] = "TaxRate";
                tmpTable[45] = "TaxableAmount";
                tmpTable[46] = "TaxAmount";
                tmpTable[47] = "TotalAmount";
                tmpTable[48] = "BaseTaxable";
                tmpTable[49] = "BaseTax";
                tmpTable[50] = "BaseAmount";
                tmpTable[51] = "OtherCost";
                tmpTable[52] = "OrderId";
                tmpTable[53] = "DeleteFlag";
                tmpTable[54] = "LPO";
                tmpTable[55] = "OrderSubId";
                tmpTable[56] = "PONo";
                tmpTable[57] = "FCRoundOff";
                tmpTable[58] = "RoundOff";
                tmpTable[59] = "BaseInvoiceamount";

                tmpTable[60] = "TaxId1";
                tmpTable[61] = "Taxable0";

                tmpTable[62] = "TaxId2";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";

                tmpTable[65] = "TaxId3";
                tmpTable[66] = "Taxable12";
                tmpTable[67] = "Tax12";

                tmpTable[68] = "TaxId4";
                tmpTable[69] = "Taxable18";
                tmpTable[70] = "Tax18";

                tmpTable[71] = "TaxId5";
                tmpTable[72] = "Taxable28";
                tmpTable[73] = "Tax28";

                tmpTable[74] = "MRVId";
                tmpTable[75] = "MRVSubId";

                tmpTable[76] = "Performa_NO";
                tmpTable[77] = "Performa_SubTbl_Id";

                tmpTable[78] = "PCAccountId";

                tmpTable[79] = "Variable1";
                tmpTable[80] = "Variable2";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseInvoiceModel)
                {
                    obj.PurchaseInvoiceMainId = details.PurchaseInvoiceMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.InvoiceTotal = details.InvoiceTotal;    //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.BillDiscount = details.BillDiscount;    //Foreign Currency
                    obj.BillDisc = details.BillDisc;            //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.PurchaseInvoiceSubId = details.PurchaseInvoiceSubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.OtherCost = details.OtherCost;          //Base Currency
                    obj.OrderId = details.OrderId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.LPO = details.LPO;                      //Free text in Purchase Invoice View
                    obj.OrderSubId = details.OrderSubId;
                    obj.PONo = details.PONo;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BaseInvoiceamount = details.BaseInvoiceamount;

                    obj.TaxId1 = details.TaxId1;
                    obj.Taxable0 = details.Taxable0;

                    obj.TaxId2 = details.TaxId2;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;

                    obj.TaxId3 = details.TaxId3;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;

                    obj.TaxId4 = details.TaxId4;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;

                    obj.TaxId5 = details.TaxId5;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;

                    obj.MRVId = details.MRVId;
                    obj.MRVSubId = details.MRVSubId;

                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;

                    obj.PCAccountId = details.PCAccountId;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.PurchaseInvoiceMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal,
                    obj.InvoiceTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.BillDiscount, obj.BillDisc, obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.PurchaseInvoiceSubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.OtherCost, obj.OrderId, obj.DeleteFlag, obj.LPO, details.OrderSubId, obj.PONo, obj.FCRoundOff, obj.RoundOff, obj.BaseInvoiceamount,
                    obj.TaxId1, obj.Taxable0, obj.TaxId2, obj.Taxable5, obj.Tax5, obj.TaxId3, obj.Taxable12, obj.Tax12, obj.TaxId4, obj.Taxable18, obj.Tax18, obj.TaxId5, obj.Taxable28, obj.Tax28
                    , obj.MRVId, obj.MRVSubId, obj.Performa_NO, obj.Performa_SubTbl_Id,obj.PCAccountId, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.PurchaseItemTemporarySave(dt, dbName);
                //foreach (DataRow row in dsDataSet.Tables[0].Rows)
                //{
                //    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                //    MModels.Status = row["Status"].ToString();
                //    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                //    MModels.InvoDate = row["InvoDate"].ToString();
                //    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                //    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                //    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                //    oList.Add(MModels);
                //}
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PrevoiusUnsavedProductofSupplier(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PrevoiusUnsavedProductofSupplier(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.InvoNo = row["InvoiceNo"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.IMEI = row["IMEINumber"].ToString();
                    MModels.OrderId = Convert.ToInt32(row["PO_No"].ToString());
                    MModels.OrderSubId = Convert.ToInt32(row["PO_SubTbl_Id"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.MRVId = Convert.ToInt32(row["MRV_No"].ToString());
                    MModels.MRVSubId = Convert.ToInt32(row["MRV_SubTbl_Id"].ToString());
                    MModels.Performa_NO = row["Performa_NO"].ToString();
                    MModels.Performa_SubTbl_Id = Convert.ToInt32(row["Performa_SubTbl_Id"].ToString());
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
        public ActionResult PrevItemsExistorNotPurchase(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PrevItemsExistorNotPurchase(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel LModels = new PurchaseInvoiceModel();
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
        public ActionResult DeletePurchase(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeletePurchase(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel LModels = new PurchaseInvoiceModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public ActionResult DeletePerforma(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeletePerforma(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel LModels = new PurchaseInvoiceModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public ActionResult DeletePurchaseEnquiry(PurchaseEnquiry PurchaseEnquiry)
        {
            PurchaseEnquiry obj = new PurchaseEnquiry();
            List<PurchaseEnquiry> oList = new List<PurchaseEnquiry>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeletePurchaseEnquiry(PurchaseEnquiry, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseEnquiry LModels = new PurchaseEnquiry();
                    LModels.Status = row["Status"].ToString();
                    LModels.EnquiryNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public ActionResult DeletePurchaseOrder(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();
            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeletePurchaseOrder(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder LModels = new PurchaseOrder();
                    LModels.Status = row["Status"].ToString();
                    LModels.OrderNo = Convert.ToInt32(row["SlNo"].ToString());
                    oList.Add(LModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CompareItems(List<ItemMasterModel> ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                string[] tmpTable = new string[12];
                tmpTable[0] = "ItemCode";
                tmpTable[1] = "Description";
                tmpTable[2] = "NoQty";
                tmpTable[3] = "ItemRate";
                tmpTable[4] = "ExcelItemCode";                
                tmpTable[5] = "modelm1";
                tmpTable[6] = "TotQty";
                tmpTable[7] = "Price";
                tmpTable[8] = "selectedvalue";
                tmpTable[9] = "Quantityselected";
                tmpTable[10] = "Priceselected";
                tmpTable[11] = "Bselected";
                dt = Common.CreateTable(tmpTable);
                foreach (var details in ItemMasterModel)
                {
                    obj.ItemCode = details.ItemCode;
                    obj.Description = details.Description;
                    obj.NoQty = details.NoQty;
                    obj.ItemRate = details.ItemRate;
                    obj.ExcelItemCode = details.ExcelItemCode;
                    obj.modelm1 = details.modelm1;
                    obj.TotQty = details.TotQty;
                    obj.Price = details.Price; 
                    obj.selectedvalue = details.selectedvalue;
                    obj.Quantityselected = details.Quantityselected;
                    obj.Priceselected = details.Priceselected;
                    obj.Bselected = details.Bselected;
                    dt.Rows.Add
                 (obj.ItemCode, obj.Description, obj.NoQty, obj.ItemRate, obj.ExcelItemCode, obj.modelm1, obj.TotQty, obj.Price, obj.selectedvalue, obj.Quantityselected, obj.Priceselected, obj.Bselected);
                }
                dsDataSet = obj.CompareItems(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.DifferenceItemcode = row["DifferenceItemcode"].ToString();
                    MModels.DifferenceItemdesc = row["DifferenceItemdesc"].ToString();
                    MModels.Differencemodel = row["Differencemodel"].ToString();
                    MModels.Orderquantity = Convert.ToInt32(row["Orderquantity"].ToString());
                    MModels.Receivedquantity = Convert.ToInt32(row["Receivedquantity"].ToString());
                    MModels.Differencequantity = Convert.ToInt32(row["Differencequantity"].ToString());
                    MModels.Unit = row["Unit"].ToString();
                    MModels.ExcelRate = Convert.ToDecimal(row["Excelrate"].ToString());
                    MModels.Gridrate = Convert.ToDecimal(row["Gridrate"].ToString());
                    MModels.DifferenceRate = Convert.ToDecimal(row["DifferenceRate"].ToString());
                    MModels.Group = row["taxgroup"].ToString();
                    MModels.Status = row["Status"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult PendingOrdernumberSearch(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingOrdernumberSearch(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.OrderDate = row["OrderDate"].ToString();
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
        public ActionResult DeletePurchaseReturn(PurchaseReturn PurchaseReturn)
        {
            PurchaseReturn obj = new PurchaseReturn();
            List<PurchaseReturn> oList = new List<PurchaseReturn>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeletePurchaseReturn(PurchaseReturn, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseReturn LModels = new PurchaseReturn();
                    LModels.Status = row["Status"].ToString();
                    LModels.PRNo = row["SlNo"].ToString();
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
        public ActionResult CheckDeletedPurchase(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CheckDeletedPurchase(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel LModels = new PurchaseInvoiceModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public JsonResult PerformaInsertandUpdate(List<PurchaseOrder> PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseOrder> oList = new List<PurchaseOrder>();

            try
            {


                string[] tmpTable = new string[52];
                tmpTable[0] = "PPNo";
                tmpTable[1] = "DONo";
                tmpTable[2] = "SupplierId";
                tmpTable[3] = "PayType";
                tmpTable[4] = "PurchaseType";
                tmpTable[5] = "PPDate";
                tmpTable[6] = "Terms";
                tmpTable[7] = "DueDate";
                tmpTable[8] = "LocnId";
                tmpTable[9] = "PlaceOfSupply";
                tmpTable[10] = "JobNo";
                tmpTable[11] = "ShipDate";
                tmpTable[12] = "CurrencyId";
                tmpTable[13] = "CurrencyRate";
                tmpTable[14] = "FCDiscount";
                tmpTable[15] = "TotalDiscount";
                tmpTable[16] = "TotalTaxable";
                tmpTable[17] = "TotalTax";
                tmpTable[18] = "GrandTotal";
                tmpTable[19] = "FCTaxable";
                tmpTable[20] = "FCTax";
                tmpTable[21] = "FCGrandTotal";
                tmpTable[22] = "Remarks";
                tmpTable[23] = "DepartmentId";
                tmpTable[24] = "UserId";
                tmpTable[25] = "PPSubId";
                tmpTable[26] = "BatchSlno";
                tmpTable[27] = "Batch";
                tmpTable[28] = "ItemId";
                tmpTable[29] = "ItemCode";
                tmpTable[30] = "ItemDescription";
                tmpTable[31] = "LocationId";
                tmpTable[32] = "UnitId";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Fraction";
                tmpTable[35] = "Rate";
                tmpTable[36] = "BaseRate";
                tmpTable[37] = "Discount";
                tmpTable[38] = "BaseDiscount";
                tmpTable[39] = "TaxId";
                tmpTable[40] = "TaxRate";
                tmpTable[41] = "TaxableAmount";
                tmpTable[42] = "TaxAmount";
                tmpTable[43] = "TotalAmount";
                tmpTable[44] = "BaseTaxable";
                tmpTable[45] = "BaseTax";
                tmpTable[46] = "BaseAmount";
                tmpTable[47] = "OrderId";
                tmpTable[48] = "DeleteFlag";
                tmpTable[49] = "LPO";
                tmpTable[50] = "OrderSubId";
                tmpTable[51] = "PONo";
                dt = Common.CreateTable(tmpTable);
                foreach (var details in PurchaseOrder)
                {
                    obj.PPNo = details.PPNo;
                    obj.DONo = details.DONo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.PPDate = details.PPDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.PPSubId = details.PPSubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.OrderId = details.OrderId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.LPO = details.LPO;                      //Free text in Purchase Invoice View
                    obj.OrderSubId = details.OrderSubId;
                    obj.PONo = details.PONo;

                    dt.Rows.Add
                    (obj.PPNo, obj.DONo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.PPDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.PPSubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.OrderId, obj.DeleteFlag, obj.LPO, details.OrderSubId, obj.PONo);
                }

                dsDataSet = obj.PerformaInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.Status = row["Status"].ToString();
                    MModels.PPNo = Convert.ToInt32(row["PPNo"].ToString());
                    MModels.PPDate = row["PPDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
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
        public JsonResult PerformaEditandUpdate(List<PurchaseOrder> PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseOrder> oList = new List<PurchaseOrder>();

            try
            {


                string[] tmpTable = new string[52];
                tmpTable[0] = "PPNo";
                tmpTable[1] = "DONo";
                tmpTable[2] = "SupplierId";
                tmpTable[3] = "PayType";
                tmpTable[4] = "PurchaseType";
                tmpTable[5] = "PPDate";
                tmpTable[6] = "Terms";
                tmpTable[7] = "DueDate";
                tmpTable[8] = "LocnId";
                tmpTable[9] = "PlaceOfSupply";
                tmpTable[10] = "JobNo";
                tmpTable[11] = "ShipDate";
                tmpTable[12] = "CurrencyId";
                tmpTable[13] = "CurrencyRate";
                tmpTable[14] = "FCDiscount";
                tmpTable[15] = "TotalDiscount";
                tmpTable[16] = "TotalTaxable";
                tmpTable[17] = "TotalTax";
                tmpTable[18] = "GrandTotal";
                tmpTable[19] = "FCTaxable";
                tmpTable[20] = "FCTax";
                tmpTable[21] = "FCGrandTotal";
                tmpTable[22] = "Remarks";
                tmpTable[23] = "DepartmentId";
                tmpTable[24] = "UserId";
                tmpTable[25] = "PPSubId";
                tmpTable[26] = "BatchSlno";
                tmpTable[27] = "Batch";
                tmpTable[28] = "ItemId";
                tmpTable[29] = "ItemCode";
                tmpTable[30] = "ItemDescription";
                tmpTable[31] = "LocationId";
                tmpTable[32] = "UnitId";
                tmpTable[33] = "Quantity";
                tmpTable[34] = "Fraction";
                tmpTable[35] = "Rate";
                tmpTable[36] = "BaseRate";
                tmpTable[37] = "Discount";
                tmpTable[38] = "BaseDiscount";
                tmpTable[39] = "TaxId";
                tmpTable[40] = "TaxRate";
                tmpTable[41] = "TaxableAmount";
                tmpTable[42] = "TaxAmount";
                tmpTable[43] = "TotalAmount";
                tmpTable[44] = "BaseTaxable";
                tmpTable[45] = "BaseTax";
                tmpTable[46] = "BaseAmount";
                tmpTable[47] = "OrderId";
                tmpTable[48] = "DeleteFlag";
                tmpTable[49] = "LPO";
                tmpTable[50] = "OrderSubId";
                tmpTable[51] = "PONo";
                dt = Common.CreateTable(tmpTable);
                foreach (var details in PurchaseOrder)
                {
                    obj.PPNo = details.PPNo;
                    obj.DONo = details.DONo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.PPDate = details.PPDate;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LocnId = details.LocnId;
                    obj.PlaceOfSupply = details.PlaceOfSupply;
                    obj.JobNo = details.JobNo;
                    obj.ShipDate = details.ShipDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.TotalDiscount = details.TotalDiscount;  //Foreign Currency
                    obj.FCDiscount = details.FCDiscount;        //Base Currency                 
                    obj.TotalTaxable = details.TotalTaxable;    //Foreign Currency
                    obj.TotalTax = details.TotalTax;            //Foreign Currency
                    obj.GrandTotal = details.GrandTotal;        //Foreign Currency
                    obj.FCTaxable = details.FCTaxable;          //Base Currency
                    obj.FCTax = details.FCTax;                  //Base Currency
                    obj.FCGrandTotal = details.FCGrandTotal;    //Base Currency
                    obj.Remarks = details.Remarks;
                    obj.DepartmentId = details.DepartmentId;
                    obj.UserId = details.UserId;
                    obj.PPSubId = details.PPSubId;
                    obj.BatchSlno = details.BatchSlno;
                    obj.Batch = details.Batch;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Fraction = details.Fraction;
                    obj.Rate = details.Rate;                    //Foreign Currency
                    obj.BaseRate = details.BaseRate;            //Base Currency
                    obj.Discount = details.Discount;            //Foreign Currency
                    obj.BaseDiscount = details.BaseDiscount;    //Base Currency
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.TaxableAmount = details.TaxableAmount;  //Foreign Currency
                    obj.TaxAmount = details.TaxAmount;          //Foreign Currency
                    obj.TotalAmount = details.TotalAmount;      //Foreign Currency
                    obj.BaseTaxable = details.BaseTaxable;      //Base Currency
                    obj.BaseTax = details.BaseTax;              //Base Currency
                    obj.BaseAmount = details.BaseAmount;        //Base Currency
                    obj.OrderId = details.OrderId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.LPO = details.LPO;                      //Free text in Purchase Invoice View
                    obj.OrderSubId = details.OrderSubId;
                    obj.PONo = details.PONo;

                    dt.Rows.Add
                    (obj.PPNo, obj.DONo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.PPDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.PPSubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.OrderId, obj.DeleteFlag, obj.LPO, details.OrderSubId, obj.PONo);
                }

                dsDataSet = obj.PerformaEditandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.Status = row["Status"].ToString();
                    MModels.PPNo = Convert.ToInt32(row["PPNo"].ToString());
                    MModels.PPDate = row["PPDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SupplierDONoSearch(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> cList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SupplierDONoSearch(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.Flag = Convert.ToInt32(row["Flag"].ToString());

                    cList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(cList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult PerformaGetandGets(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PerformaGetandGets(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.MainId = Convert.ToInt32(row["PPMainId"].ToString());
                    MModels.PPNo = Convert.ToInt32(row["PPNo"].ToString());
                    MModels.DONo = row["DONo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.PPDate = row["PPDate"].ToString();
                    MModels.Term = row["Terms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.PlaceOfSupply = Convert.ToInt32(row["PlaceOfSupply"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.ShipDate = row["ShipDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FTax"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["BaseTotal"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.LPO = row["LPO_No"].ToString();
                    MModels.PPSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.BinA = row["BinA"].ToString();
                    MModels.BinB = row["BinB"].ToString();
                    MModels.BinC = row["BinC"].ToString();
                    MModels.BinD = row["BinD"].ToString();
                    MModels.BinE = row["BinE"].ToString();
                    MModels.BinF = row["BinF"].ToString();
                    MModels.BinG = row["BinG"].ToString();
                    MModels.BinH = row["BinH"].ToString();
                    MModels.PoOrderid = Convert.ToInt32(row["PO_SubId"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.TaxableAmounts = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmounts = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amounts = Convert.ToDecimal(row["Amount"].ToString());
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
        public ActionResult PendingPerformaGets(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingPerformaGets(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.PPNo = Convert.ToInt32(row["PPNo"].ToString());
                    MModels.DONo = row["DONo"].ToString();
                    MModels.PPDate = row["PPDate"].ToString();
                    MModels.SupplierCode = row["CustAccount"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.BaseAmount = Convert.ToDecimal(row["BaseTotal"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PerformaItemsGetandGets(PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder obj = new PurchaseOrder();

            List<PurchaseOrder> oList = new List<PurchaseOrder>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PerformaItemsGetandGets(PurchaseOrder, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseOrder MModels = new PurchaseOrder();
                    MModels.PPNo = Convert.ToInt32(row["PPNo"].ToString());
                    MModels.PPDate = row["PPDate"].ToString();
                    MModels.ExpectedDate = row["ShipDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.Terms = Convert.ToInt32(row["Terms"].ToString());
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.LPO = row["LPO_No"].ToString();
                    //MModels.ShipTo = row["ShippingAddress"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    //MModels.ShipVia = row["ShipVia"].ToString();
                    // MModels.ModeofTransfer = row["ModeofTransfer"].ToString();
                    // MModels.PortofEntry = row["PortofEntry"].ToString();
                    //MModels.FinalDestination = row["FinalDestination"].ToString();
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.DepartmentId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());



                    MModels.PurchaseOrderSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Qty = Convert.ToInt32(row["qtys"].ToString());
                    
                    // MModels.Qty = Convert.ToInt32(row["Qty"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.TotalAmount = Convert.ToDecimal(row["FCAmount"].ToString());

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
        public ActionResult GetCashPurchaseAccount(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetCashPurchaseAccount(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PCAccountId = Convert.ToInt32(row["Acc_Id"].ToString());
                    MModels.PCAccount =row["PControlAC"].ToString();
                    MModels.PCAccountDesc = row["Acc_Description"].ToString();
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
        public ActionResult OtherTransactionGetandGets(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> dList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet(); 
                dsDataSet = obj.OtherTransactionGetandGets(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PayType = row["VType"].ToString();
                    MModels.AccId = Convert.ToInt32(row["AccId"].ToString());
                    MModels.AccName = row["Acc_Description"].ToString();
                    MModels.Description = row["VDescription"].ToString();
                    MModels.OCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.OCFCAmount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.AccountName=  row["AccCode"].ToString(); 
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
        public void PurchaseFolderCreate(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/"+ PurchaseInvoiceModel.PurchaseFolder + "/" + PurchaseInvoiceModel.DepartmentId + "/" + PurchaseInvoiceModel.SlNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }

        [HttpPost]
        public void PurchaseFileUpload()
        {

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string FileName1 = Request.Form["FileName"];
                string DeptId = Request.Form["DeptId"];
                string SlNo = Request.Form["SlNo"];
                string Extension = Request.Form["Extension"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/Purchase/" + DeptId + "/" + SlNo + "/"), FileName1 + "."+ Extension);
                Request.Files[upload].SaveAs(path1);
            }
        }

        [HttpPost]
        public ActionResult PurchaseFileInsert(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> dList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseFileInsert(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
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
        public ActionResult PurchaseFileGets(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseFileGets(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
                    MModels.PFileId = Convert.ToInt32(row["PFileId"].ToString());
                    MModels.FileName = row["FileName"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["PSlNo"].ToString());
                    MModels.DepartmentId = Convert.ToInt32(row["PDeptId"].ToString());
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
        public ActionResult PurchaseFileDelete(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseInvoiceModel obj = new PurchaseInvoiceModel();

            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseFileDelete(PurchaseInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseInvoiceModel MModels = new PurchaseInvoiceModel();
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
        
    }
}