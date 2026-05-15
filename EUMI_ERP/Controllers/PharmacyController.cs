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
    public class PharmacyController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: Pharmacy
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LabPurchaseInvoice()
        {
            return View();
        }

        public ActionResult Medicine()
        {
            return View();
        }
        public ActionResult OpticalMedicine()
        {
            return View();
        }
        public ActionResult PharmaPurchase()
        {
            return View();
        }



        public ActionResult PharmaPurchasehms()
        {
            return View();
        }
        public ActionResult PurchaseCorrection()
        {
            return View();
        }
        public ActionResult PharmaPurchaseReturn()
        {
            return View();
        }
        public ActionResult PharmaLocationTransfer()
        {
            return View();
        }

        
       public ActionResult HMS_PurchasevaccSearch(ItemMasterModel ItemMasterModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchasevaccSearch(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["id"].ToString());
                    MModels.ItemCode = row["name"].ToString();
                    MModels.Description = row["Brand"].ToString();                   
                                    
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
        public JsonResult HMS_ItemExcelImport(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();

            try
            {
                string[] tmpTable = new string[11];
                tmpTable[0] = "SlNo";
                tmpTable[1] = "ItemCode";
                tmpTable[2] = "ItemDescription";
                tmpTable[3] = "Batch";
                tmpTable[4] = "Expiry";
                tmpTable[5] = "Quantity";
                tmpTable[6] = "Unit";
                tmpTable[7] = "Rate";
                tmpTable[8] = "Discount";
                tmpTable[9] = "MRP";
                tmpTable[10] = "TaxPer";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.SlNo = details.SlNo;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.Batch = details.Batch;
                    obj.Expiry = details.Expiry;
                    obj.Quantity = details.Quantity;
                    obj.Unit = details.Unit;
                    obj.Rate = details.Rate;
                    obj.Discount = details.Discount;
                    obj.MRP = details.MRP;
                    obj.TaxRate = details.TaxRate;

                    dt.Rows.Add(obj.SlNo, obj.ItemCode, obj.ItemDescription, obj.Batch, obj.Expiry, obj.Quantity, obj.Unit, obj.Rate, obj.Discount, obj.MRP, obj.TaxRate);
                }

                dsDataSet = obj.HMS_ItemExcelImport(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Terms = row["Terms"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.Unit = row["Unit"].ToString();
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["Discount"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["MRP"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxPer"].ToString());
                    MModels.Variable1 = row["CessPer"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult HMS_PurchaseProductSearch(ItemMasterModel ItemMasterModel)
        {
            PharmacyModel obj = new PharmacyModel();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
   {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseProductSearch(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.VatPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["MrpRate"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.LPCost = Convert.ToDecimal(row["LPCost"].ToString());
                    MModels.GrpId = Convert.ToInt32(row["GroupId"].ToString());
                    MModels.Group = row["GrpCode"].ToString();
                    MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    MModels.Category = row["CategoryCode"].ToString();
                    MModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.Model1 = row["Model1"].ToString();
                    MModels.NoQty= Convert.ToInt32(row["Model3"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_LabPurchaseProductSearch(ItemMasterModel ItemMasterModel)
        {
            PharmacyModel obj = new PharmacyModel();
            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LabPurchaseProductSearch(ItemMasterModel, dbName);

                // ADD THIS NULL CHECK
                if (dsDataSet == null || dsDataSet.Tables.Count == 0)
                    return Json(oList, JsonRequestBehavior.AllowGet);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();

                    MModels.ItemId = row["ItemId"] != DBNull.Value ? Convert.ToInt32(row["ItemId"]) : 0;

                    MModels.ItemCode = row["ItemCode"] != DBNull.Value
                        ? row["ItemCode"].ToString()
                        : "";

                    MModels.Description = row["Description"] != DBNull.Value
                        ? row["Description"].ToString()
                        : "";

                    MModels.VatId = row["VatId"] != DBNull.Value
                        ? Convert.ToInt32(row["VatId"])
                        : 0;

                    MModels.VatPer = row["TaxRate"] != DBNull.Value
                        ? Convert.ToDecimal(row["TaxRate"])
                        : 0;

                    MModels.SellingPrice = row["SellingPrice"] != DBNull.Value
                        ? Convert.ToDecimal(row["SellingPrice"])
                        : 0;

                    MModels.MRP = row["MrpRate"] != DBNull.Value
                        ? Convert.ToDecimal(row["MrpRate"])
                        : 0;

                    MModels.AvgCost = row["AvgCost"] != DBNull.Value
                        ? Convert.ToDecimal(row["AvgCost"])
                        : 0;

                    MModels.LPCost = row["LPCost"] != DBNull.Value
                        ? Convert.ToDecimal(row["LPCost"])
                        : 0;

                    MModels.GrpId = row["GroupId"] != DBNull.Value
                        ? Convert.ToInt32(row["GroupId"])
                        : 0;

                    MModels.Group = row["GrpCode"] != DBNull.Value
                        ? row["GrpCode"].ToString()
                        : "";

                    MModels.CategoryId = row["CategoryId"] != DBNull.Value
                        ? Convert.ToInt32(row["CategoryId"])
                        : 0;

                    MModels.Category = row["CategoryCode"] != DBNull.Value
                        ? row["CategoryCode"].ToString()
                        : "";

                    MModels.SubCategoryId = row["SubCategoryId"] != DBNull.Value
                        ? Convert.ToInt32(row["SubCategoryId"])
                        : 0;

                    MModels.SubCategoryName = row["SubCategoryName"] != DBNull.Value
                        ? row["SubCategoryName"].ToString()
                        : "";

                    MModels.UnitId = row["UnitId"] != DBNull.Value
                        ? Convert.ToInt32(row["UnitId"])
                        : 0;

                    MModels.UnitName = row["UnitName"] != DBNull.Value
                        ? row["UnitName"].ToString()
                        : "";

                    MModels.Model1 = row["Model1"] != DBNull.Value
                        ? row["Model1"].ToString()
                        : "0";

                    MModels.NoQty = row["Model3"] != DBNull.Value
                        ? Convert.ToInt32(row["Model3"])
                        : 0;

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
        public JsonResult HMS_OpeningPurchaseInsert(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                string[] tmpTable = new string[91];

                tmpTable[0] = "PurMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "FBillDiscount";

                tmpTable[10] = "FDiscount";
                tmpTable[11] = "FTaxable";
                tmpTable[12] = "FTax";
                tmpTable[13] = "FCTotal";
                tmpTable[14] = "InvoiceTotal";
                tmpTable[15] = "FCGST_0";
                tmpTable[16] = "FCGST_5";
                tmpTable[17] = "FCGST_12";
                tmpTable[18] = "FCGST_18";
                tmpTable[19] = "FCGST_28";

                tmpTable[20] = "FCess";
                tmpTable[21] = "BilDiscount";
                tmpTable[22] = "TotalDiscount";
                tmpTable[23] = "TotalTaxable";
                tmpTable[24] = "TotalTax";
                tmpTable[25] = "BaseTotal";
                tmpTable[26] = "BaseInvoiceTotal";
                tmpTable[27] = "BCGST_0";
                tmpTable[28] = "BCGST_5";
                tmpTable[29] = "BCGST_12";

                tmpTable[30] = "BCGST_18";
                tmpTable[31] = "BCGST_28";
                tmpTable[32] = "BCess";
                tmpTable[33] = "FCRoundOff";
                tmpTable[34] = "RoundOff";
                tmpTable[35] = "BDFlag";
                tmpTable[36] = "CessFlag";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "SubId";
                tmpTable[39] = "ItemId";

                tmpTable[40] = "ItemCode";
                tmpTable[41] = "ItemDescription";
                tmpTable[42] = "LocationId";
                tmpTable[43] = "UnitId";
                tmpTable[44] = "BatchSlNo";
                tmpTable[45] = "Batch";
                tmpTable[46] = "Expiry";
                tmpTable[47] = "Pack";
                tmpTable[48] = "Quantity";
                tmpTable[49] = "Free";

                tmpTable[50] = "Loose";
                tmpTable[51] = "SellingRate";
                tmpTable[52] = "MRP";
                tmpTable[53] = "TQty";
                tmpTable[54] = "TLQty";
                tmpTable[55] = "TaxId";
                tmpTable[56] = "TaxRate";
                tmpTable[57] = "FCRate";
                tmpTable[58] = "FCDiscount";
                tmpTable[59] = "FCTaxable";

                tmpTable[60] = "FCTax";
                tmpTable[61] = "FCAmount";
                tmpTable[62] = "FC_Cess";
                tmpTable[63] = "Rate";
                tmpTable[64] = "Discount";
                tmpTable[65] = "TaxableAmount";
                tmpTable[66] = "TaxAmount";
                tmpTable[67] = "Amount";
                tmpTable[68] = "B_Cess";
                tmpTable[69] = "Margin";

                tmpTable[70] = "P_OtherCost";
                tmpTable[71] = "DelFlag";
                tmpTable[72] = "UserId";
                tmpTable[73] = "DeptId";
                tmpTable[74] = "IMEINumber";
                tmpTable[75] = "PO_No";
                tmpTable[76] = "PO_SubTbl_Id";
                tmpTable[77] = "MRV_No";
                tmpTable[78] = "MRV_SubTbl_Id";
                tmpTable[79] = "Performa_NO";

                tmpTable[80] = "Performa_SubTbl_Id";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                tmpTable[83] = "Status";
                tmpTable[84] = "Terms";
                tmpTable[85] = "DueDate";
                tmpTable[86] = "LPO_No";
                tmpTable[87] = "JobNo";
                tmpTable[88] = "Area";
                tmpTable[89] = "ShipDate";
                tmpTable[90] = "Flag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.PurMainId = details.PurMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.FBillDiscount = details.FBillDiscount;
                    obj.FDiscount = details.FDiscount;
                    obj.FTaxable = details.FTaxable;
                    obj.FTax = details.FTax;
                    obj.FCTotal = details.FCTotal;
                    obj.InvoiceTotal = details.InvoiceTotal;
                    obj.FCGST_0 = details.FCGST_0;
                    obj.FCGST_5 = details.FCGST_5;
                    obj.FCGST_12 = details.FCGST_12;
                    obj.FCGST_18 = details.FCGST_18;
                    obj.FCGST_28 = details.FCGST_28;
                    obj.FCess = details.FCess;
                    obj.BilDiscount = details.BilDiscount;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.BaseTotal = details.BaseTotal;
                    obj.BaseInvoiceTotal = details.BaseInvoiceTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Expiry = details.Expiry;
                    obj.Pack = details.Pack;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Loose = details.Loose;
                    obj.SellingRate = details.SellingRate;
                    obj.MRP = details.MRP;
                    obj.TQty = details.TQty;
                    obj.TLQty = details.TLQty;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.FCRate = details.FCRate;
                    obj.FCDiscount = details.FCDiscount;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCAmount = details.FCAmount;
                    obj.FC_Cess = details.FC_Cess;
                    obj.Rate = details.Rate;
                    obj.Discount = details.Discount;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.Amount = details.Amount;
                    obj.B_Cess = details.B_Cess;
                    obj.Margin = details.Margin;
                    obj.P_OtherCost = details.P_OtherCost;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.IMEINumber = details.IMEINumber;
                    obj.PO_No = details.PO_No;
                    obj.PO_SubTbl_Id = details.PO_SubTbl_Id;
                    obj.MRV_No = details.MRV_No;
                    obj.MRV_SubTbl_Id = details.MRV_SubTbl_Id;
                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.ShipDate = details.ShipDate;
                    obj.Flag = details.Flag;

                    dt.Rows.Add
                    (
                        obj.PurMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.CurrencyId,
                    obj.CurrencyRate, obj.FBillDiscount, obj.FDiscount, obj.FTaxable, obj.FTax, obj.FCTotal, obj.InvoiceTotal, obj.FCGST_0,
                    obj.FCGST_5, obj.FCGST_12, obj.FCGST_18, obj.FCGST_28, obj.FCess, obj.BilDiscount, obj.TotalDiscount, obj.TotalTaxable,
                    obj.TotalTax, obj.BaseTotal, obj.BaseInvoiceTotal, obj.BCGST_0, obj.BCGST_5, obj.BCGST_12, obj.BCGST_18, obj.BCGST_28,
                    obj.BCess, obj.FCRoundOff, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ItemId, obj.ItemCode,
                    obj.ItemDescription, obj.LocationId, obj.UnitId, obj.BatchSlNo, obj.Batch, obj.Expiry, obj.Pack, obj.Quantity, obj.Free,
                    obj.Loose, obj.SellingRate, obj.MRP, obj.TQty, obj.TLQty, obj.TaxId, obj.TaxRate, obj.FCRate, obj.FCDiscount, obj.FCTaxable,
                    obj.FCTax, obj.FCAmount, obj.FC_Cess, obj.Rate, obj.Discount, obj.TaxableAmount, obj.TaxAmount, obj.Amount, obj.B_Cess,
                    obj.Margin, obj.P_OtherCost, obj.DelFlag, obj.UserId, obj.DeptId, obj.IMEINumber, obj.PO_No, obj.PO_SubTbl_Id, obj.MRV_No,
                    obj.MRV_SubTbl_Id, obj.Performa_NO, obj.Performa_SubTbl_Id, obj.Variable1, obj.Variable2, obj.Status, obj.Terms, obj.DueDate,
                    obj.LPO_No, obj.JobNo, obj.Area, obj.ShipDate, obj.Flag
                    );
                }

                dsDataSet = obj.HMS_OpeningPurchaseInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public JsonResult HMS_PurchaseInsert(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                string[] tmpTable = new string[91];

                tmpTable[0] = "PurMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "FBillDiscount";

                tmpTable[10] = "FDiscount";
                tmpTable[11] = "FTaxable";
                tmpTable[12] = "FTax";
                tmpTable[13] = "FCTotal";
                tmpTable[14] = "InvoiceTotal";
                tmpTable[15] = "FCGST_0";
                tmpTable[16] = "FCGST_5";
                tmpTable[17] = "FCGST_12";
                tmpTable[18] = "FCGST_18";
                tmpTable[19] = "FCGST_28";

                tmpTable[20] = "FCess";
                tmpTable[21] = "BilDiscount";
                tmpTable[22] = "TotalDiscount";
                tmpTable[23] = "TotalTaxable";
                tmpTable[24] = "TotalTax";
                tmpTable[25] = "BaseTotal";
                tmpTable[26] = "BaseInvoiceTotal";
                tmpTable[27] = "BCGST_0";
                tmpTable[28] = "BCGST_5";
                tmpTable[29] = "BCGST_12";

                tmpTable[30] = "BCGST_18";
                tmpTable[31] = "BCGST_28";
                tmpTable[32] = "BCess";
                tmpTable[33] = "FCRoundOff";
                tmpTable[34] = "RoundOff";
                tmpTable[35] = "BDFlag";
                tmpTable[36] = "CessFlag";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "SubId";
                tmpTable[39] = "ItemId";

                tmpTable[40] = "ItemCode";
                tmpTable[41] = "ItemDescription";
                tmpTable[42] = "LocationId";
                tmpTable[43] = "UnitId";
                tmpTable[44] = "BatchSlNo";
                tmpTable[45] = "Batch";
                tmpTable[46] = "Expiry";
                tmpTable[47] = "Pack";
                tmpTable[48] = "Quantity";
                tmpTable[49] = "Free";

                tmpTable[50] = "Loose";
                tmpTable[51] = "SellingRate";
                tmpTable[52] = "MRP";
                tmpTable[53] = "TQty";
                tmpTable[54] = "TLQty";
                tmpTable[55] = "TaxId";
                tmpTable[56] = "TaxRate";
                tmpTable[57] = "FCRate";
                tmpTable[58] = "FCDiscount";
                tmpTable[59] = "FCTaxable";

                tmpTable[60] = "FCTax";
                tmpTable[61] = "FCAmount";
                tmpTable[62] = "FC_Cess";
                tmpTable[63] = "Rate";
                tmpTable[64] = "Discount";
                tmpTable[65] = "TaxableAmount";
                tmpTable[66] = "TaxAmount";
                tmpTable[67] = "Amount";
                tmpTable[68] = "B_Cess";
                tmpTable[69] = "Margin";

                tmpTable[70] = "P_OtherCost";
                tmpTable[71] = "DelFlag";
                tmpTable[72] = "UserId";
                tmpTable[73] = "DeptId";
                tmpTable[74] = "IMEINumber";
                tmpTable[75] = "PO_No";
                tmpTable[76] = "PO_SubTbl_Id";
                tmpTable[77] = "MRV_No";
                tmpTable[78] = "MRV_SubTbl_Id";
                tmpTable[79] = "Performa_NO";

                tmpTable[80] = "Performa_SubTbl_Id";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                tmpTable[83] = "Status";
                tmpTable[84] = "Terms";
                tmpTable[85] = "DueDate";
                tmpTable[86] = "LPO_No";
                tmpTable[87] = "JobNo";
                tmpTable[88] = "Area";
                tmpTable[89] = "ShipDate";
                tmpTable[90] = "Flag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.PurMainId = details.PurMainId;
                    obj.SlNo  = details.SlNo;
                    obj.InvoNo  = details.InvoNo;
                    obj.SupplierId   = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType  = details.PurchaseType;
                    obj.InvoDate  = details.InvoDate;
                    obj.CurrencyId  = details.CurrencyId;
                    obj.CurrencyRate  = details.CurrencyRate;
                    obj.FBillDiscount  = details.FBillDiscount;
                    obj.FDiscount  = details.FDiscount;
                    obj.FTaxable  = details.FTaxable;
                    obj.FTax  = details.FTax;
                    obj.FCTotal  = details.FCTotal;
                    obj.InvoiceTotal  = details.InvoiceTotal;
                    obj.FCGST_0  = details.FCGST_0;
                    obj.FCGST_5  = details.FCGST_5;
                    obj.FCGST_12  = details.FCGST_12;
                    obj.FCGST_18  = details.FCGST_18;
                    obj.FCGST_28  = details.FCGST_28;
                    obj.FCess  = details.FCess;
                    obj.BilDiscount  = details.BilDiscount;
                    obj.TotalDiscount  = details.TotalDiscount;
                    obj.TotalTaxable  = details.TotalTaxable;
                    obj.TotalTax  = details.TotalTax;
                    obj.BaseTotal  = details.BaseTotal;
                    obj.BaseInvoiceTotal  = details.BaseInvoiceTotal;
                    obj.BCGST_0  = details.BCGST_0;
                    obj.BCGST_5  = details.BCGST_5;
                    obj.BCGST_12  = details.BCGST_12;
                    obj.BCGST_18  = details.BCGST_18;
                    obj.BCGST_28  = details.BCGST_28;
                    obj.BCess  = details.BCess;
                    obj.FCRoundOff  = details.FCRoundOff;
                    obj.RoundOff  = details.RoundOff;
                    obj.BDFlag  = details.BDFlag;
                    obj.CessFlag  = details.CessFlag;
                    obj.Remarks  = details.Remarks;
                    obj.SubId  = details.SubId;
                    obj.ItemId  = details.ItemId;
                    obj.ItemCode  = details.ItemCode;
                    obj.ItemDescription  = details.ItemDescription;
                    obj.LocationId  = details.LocationId;
                    obj.UnitId  = details.UnitId;
                    obj.BatchSlNo  = details.BatchSlNo;
                    obj.Batch  = details.Batch;
                    obj.Expiry  = details.Expiry;
                    obj.Pack  = details.Pack;
                    obj.Quantity  = details.Quantity;
                    obj.Free  = details.Free;
                    obj.Loose  = details.Loose;
                    obj.SellingRate  = details.SellingRate;
                    obj.MRP  = details.MRP;
                    obj.TQty  = details.TQty;
                    obj.TLQty  = details.TLQty;
                    obj.TaxId  = details.TaxId;
                    obj.TaxRate  = details.TaxRate;
                    obj.FCRate  = details.FCRate;
                    obj.FCDiscount  = details.FCDiscount;
                    obj.FCTaxable  = details.FCTaxable;
                    obj.FCTax  = details.FCTax;
                    obj.FCAmount  = details.FCAmount;
                    obj.FC_Cess  = details.FC_Cess;
                    obj.Rate  = details.Rate;
                    obj.Discount  = details.Discount;
                    obj.TaxableAmount  = details.TaxableAmount;
                    obj.TaxAmount  = details.TaxAmount;
                    obj.Amount  = details.Amount;
                    obj.B_Cess  = details.B_Cess;
                    obj.Margin  = details.Margin;
                    obj.P_OtherCost  = details.P_OtherCost;
                    obj.DelFlag  = details.DelFlag;
                    obj.UserId  = details.UserId;
                    obj.DeptId  = details.DeptId;
                    obj.IMEINumber  = details.IMEINumber;
                    obj.PO_No  = details.PO_No;
                    obj.PO_SubTbl_Id  = details.PO_SubTbl_Id;
                    obj.MRV_No  = details.MRV_No;
                    obj.MRV_SubTbl_Id  = details.MRV_SubTbl_Id;
                    obj.Performa_NO  = details.Performa_NO;
                    obj.Performa_SubTbl_Id  = details.Performa_SubTbl_Id;
                    obj.Variable1  = details.Variable1;
                    obj.Variable2  = details.Variable2;
                    obj.Status  = details.Status;
                    obj.Terms  = details.Terms;
                    obj.DueDate  = details.DueDate;
                    obj.LPO_No  = details.LPO_No;
                    obj.JobNo  = details.JobNo;
                    obj.Area  = details.Area;
                    obj.ShipDate = details.ShipDate;
                    obj.Flag = details.Flag;

                    dt.Rows.Add
                    (
                        obj.PurMainId,obj.SlNo,obj.InvoNo,obj.SupplierId,obj.PayType,obj.PurchaseType,obj.InvoDate,obj.CurrencyId,
                    obj.CurrencyRate,obj.FBillDiscount,obj.FDiscount,obj.FTaxable,obj.FTax,obj.FCTotal,obj.InvoiceTotal,obj.FCGST_0,
                    obj.FCGST_5,obj.FCGST_12,obj.FCGST_18,obj.FCGST_28,obj.FCess,obj.BilDiscount,obj.TotalDiscount,obj.TotalTaxable,
                    obj.TotalTax,obj.BaseTotal,obj.BaseInvoiceTotal,obj.BCGST_0,obj.BCGST_5,obj.BCGST_12,obj.BCGST_18,obj.BCGST_28,
                    obj.BCess,obj.FCRoundOff,obj.RoundOff,obj.BDFlag,obj.CessFlag,obj.Remarks,obj.SubId,obj.ItemId,obj.ItemCode,
                    obj.ItemDescription,obj.LocationId,obj.UnitId,obj.BatchSlNo,obj.Batch,obj.Expiry,obj.Pack,obj.Quantity,obj.Free,
                    obj.Loose,obj.SellingRate,obj.MRP,obj.TQty,obj.TLQty,obj.TaxId,obj.TaxRate,obj.FCRate,obj.FCDiscount,obj.FCTaxable,
                    obj.FCTax,obj.FCAmount,obj.FC_Cess,obj.Rate,obj.Discount,obj.TaxableAmount,obj.TaxAmount,obj.Amount,obj.B_Cess,
                    obj.Margin,obj.P_OtherCost,obj.DelFlag,obj.UserId,obj.DeptId,obj.IMEINumber,obj.PO_No,obj.PO_SubTbl_Id,obj.MRV_No,
                    obj.MRV_SubTbl_Id,obj.Performa_NO,obj.Performa_SubTbl_Id,obj.Variable1,obj.Variable2,obj.Status,obj.Terms,obj.DueDate,
                    obj.LPO_No,obj.JobNo,obj.Area,obj.ShipDate, obj.Flag
                    );
                }

                dsDataSet = obj.HMS_PurchaseInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public JsonResult HMS_PurchaseInsertTemp(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                string[] tmpTable = new string[91];

                tmpTable[0] = "PurMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "FBillDiscount";

                tmpTable[10] = "FDiscount";
                tmpTable[11] = "FTaxable";
                tmpTable[12] = "FTax";
                tmpTable[13] = "FCTotal";
                tmpTable[14] = "InvoiceTotal";
                tmpTable[15] = "FCGST_0";
                tmpTable[16] = "FCGST_5";
                tmpTable[17] = "FCGST_12";
                tmpTable[18] = "FCGST_18";
                tmpTable[19] = "FCGST_28";

                tmpTable[20] = "FCess";
                tmpTable[21] = "BilDiscount";
                tmpTable[22] = "TotalDiscount";
                tmpTable[23] = "TotalTaxable";
                tmpTable[24] = "TotalTax";
                tmpTable[25] = "BaseTotal";
                tmpTable[26] = "BaseInvoiceTotal";
                tmpTable[27] = "BCGST_0";
                tmpTable[28] = "BCGST_5";
                tmpTable[29] = "BCGST_12";

                tmpTable[30] = "BCGST_18";
                tmpTable[31] = "BCGST_28";
                tmpTable[32] = "BCess";
                tmpTable[33] = "FCRoundOff";
                tmpTable[34] = "RoundOff";
                tmpTable[35] = "BDFlag";
                tmpTable[36] = "CessFlag";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "SubId";
                tmpTable[39] = "ItemId";

                tmpTable[40] = "ItemCode";
                tmpTable[41] = "ItemDescription";
                tmpTable[42] = "LocationId";
                tmpTable[43] = "UnitId";
                tmpTable[44] = "BatchSlNo";
                tmpTable[45] = "Batch";
                tmpTable[46] = "Expiry";
                tmpTable[47] = "Pack";
                tmpTable[48] = "Quantity";
                tmpTable[49] = "Free";

                tmpTable[50] = "Loose";
                tmpTable[51] = "SellingRate";
                tmpTable[52] = "MRP";
                tmpTable[53] = "TQty";
                tmpTable[54] = "TLQty";
                tmpTable[55] = "TaxId";
                tmpTable[56] = "TaxRate";
                tmpTable[57] = "FCRate";
                tmpTable[58] = "FCDiscount";
                tmpTable[59] = "FCTaxable";

                tmpTable[60] = "FCTax";
                tmpTable[61] = "FCAmount";
                tmpTable[62] = "FC_Cess";
                tmpTable[63] = "Rate";
                tmpTable[64] = "Discount";
                tmpTable[65] = "TaxableAmount";
                tmpTable[66] = "TaxAmount";
                tmpTable[67] = "Amount";
                tmpTable[68] = "B_Cess";
                tmpTable[69] = "Margin";

                tmpTable[70] = "P_OtherCost";
                tmpTable[71] = "DelFlag";
                tmpTable[72] = "UserId";
                tmpTable[73] = "DeptId";
                tmpTable[74] = "IMEINumber";
                tmpTable[75] = "PO_No";
                tmpTable[76] = "PO_SubTbl_Id";
                tmpTable[77] = "MRV_No";
                tmpTable[78] = "MRV_SubTbl_Id";
                tmpTable[79] = "Performa_NO";

                tmpTable[80] = "Performa_SubTbl_Id";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                tmpTable[83] = "Status";
                tmpTable[84] = "Terms";
                tmpTable[85] = "DueDate";
                tmpTable[86] = "LPO_No";
                tmpTable[87] = "JobNo";
                tmpTable[88] = "Area";
                tmpTable[89] = "ShipDate";
                tmpTable[90] = "Flag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.PurMainId = details.PurMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.FBillDiscount = details.FBillDiscount;
                    obj.FDiscount = details.FDiscount;
                    obj.FTaxable = details.FTaxable;
                    obj.FTax = details.FTax;
                    obj.FCTotal = details.FCTotal;
                    obj.InvoiceTotal = details.InvoiceTotal;
                    obj.FCGST_0 = details.FCGST_0;
                    obj.FCGST_5 = details.FCGST_5;
                    obj.FCGST_12 = details.FCGST_12;
                    obj.FCGST_18 = details.FCGST_18;
                    obj.FCGST_28 = details.FCGST_28;
                    obj.FCess = details.FCess;
                    obj.BilDiscount = details.BilDiscount;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.BaseTotal = details.BaseTotal;
                    obj.BaseInvoiceTotal = details.BaseInvoiceTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Expiry = details.Expiry;
                    obj.Pack = details.Pack;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Loose = details.Loose;
                    obj.SellingRate = details.SellingRate;
                    obj.MRP = details.MRP;
                    obj.TQty = details.TQty;
                    obj.TLQty = details.TLQty;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.FCRate = details.FCRate;
                    obj.FCDiscount = details.FCDiscount;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCAmount = details.FCAmount;
                    obj.FC_Cess = details.FC_Cess;
                    obj.Rate = details.Rate;
                    obj.Discount = details.Discount;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.Amount = details.Amount;
                    obj.B_Cess = details.B_Cess;
                    obj.Margin = details.Margin;
                    obj.P_OtherCost = details.P_OtherCost;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.IMEINumber = details.IMEINumber;
                    obj.PO_No = details.PO_No;
                    obj.PO_SubTbl_Id = details.PO_SubTbl_Id;
                    obj.MRV_No = details.MRV_No;
                    obj.MRV_SubTbl_Id = details.MRV_SubTbl_Id;
                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.ShipDate = details.ShipDate;
                    obj.Flag = details.Flag;

                    dt.Rows.Add
                    (
                        obj.PurMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.CurrencyId,
                    obj.CurrencyRate, obj.FBillDiscount, obj.FDiscount, obj.FTaxable, obj.FTax, obj.FCTotal, obj.InvoiceTotal, obj.FCGST_0,
                    obj.FCGST_5, obj.FCGST_12, obj.FCGST_18, obj.FCGST_28, obj.FCess, obj.BilDiscount, obj.TotalDiscount, obj.TotalTaxable,
                    obj.TotalTax, obj.BaseTotal, obj.BaseInvoiceTotal, obj.BCGST_0, obj.BCGST_5, obj.BCGST_12, obj.BCGST_18, obj.BCGST_28,
                    obj.BCess, obj.FCRoundOff, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ItemId, obj.ItemCode,
                    obj.ItemDescription, obj.LocationId, obj.UnitId, obj.BatchSlNo, obj.Batch, obj.Expiry, obj.Pack, obj.Quantity, obj.Free,
                    obj.Loose, obj.SellingRate, obj.MRP, obj.TQty, obj.TLQty, obj.TaxId, obj.TaxRate, obj.FCRate, obj.FCDiscount, obj.FCTaxable,
                    obj.FCTax, obj.FCAmount, obj.FC_Cess, obj.Rate, obj.Discount, obj.TaxableAmount, obj.TaxAmount, obj.Amount, obj.B_Cess,
                    obj.Margin, obj.P_OtherCost, obj.DelFlag, obj.UserId, obj.DeptId, obj.IMEINumber, obj.PO_No, obj.PO_SubTbl_Id, obj.MRV_No,
                    obj.MRV_SubTbl_Id, obj.Performa_NO, obj.Performa_SubTbl_Id, obj.Variable1, obj.Variable2, obj.Status, obj.Terms, obj.DueDate,
                    obj.LPO_No, obj.JobNo, obj.Area, obj.ShipDate, obj.Flag
                    );
                }

                dsDataSet = obj.HMS_PurchaseInsertTemp(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public JsonResult HMS_PurchaseUpdateOpening(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                string[] tmpTable = new string[91];

                tmpTable[0] = "PurMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "FBillDiscount";

                tmpTable[10] = "FDiscount";
                tmpTable[11] = "FTaxable";
                tmpTable[12] = "FTax";
                tmpTable[13] = "FCTotal";
                tmpTable[14] = "InvoiceTotal";
                tmpTable[15] = "FCGST_0";
                tmpTable[16] = "FCGST_5";
                tmpTable[17] = "FCGST_12";
                tmpTable[18] = "FCGST_18";
                tmpTable[19] = "FCGST_28";

                tmpTable[20] = "FCess";
                tmpTable[21] = "BilDiscount";
                tmpTable[22] = "TotalDiscount";
                tmpTable[23] = "TotalTaxable";
                tmpTable[24] = "TotalTax";
                tmpTable[25] = "BaseTotal";
                tmpTable[26] = "BaseInvoiceTotal";
                tmpTable[27] = "BCGST_0";
                tmpTable[28] = "BCGST_5";
                tmpTable[29] = "BCGST_12";

                tmpTable[30] = "BCGST_18";
                tmpTable[31] = "BCGST_28";
                tmpTable[32] = "BCess";
                tmpTable[33] = "FCRoundOff";
                tmpTable[34] = "RoundOff";
                tmpTable[35] = "BDFlag";
                tmpTable[36] = "CessFlag";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "SubId";
                tmpTable[39] = "ItemId";

                tmpTable[40] = "ItemCode";
                tmpTable[41] = "ItemDescription";
                tmpTable[42] = "LocationId";
                tmpTable[43] = "UnitId";
                tmpTable[44] = "BatchSlNo";
                tmpTable[45] = "Batch";
                tmpTable[46] = "Expiry";
                tmpTable[47] = "Pack";
                tmpTable[48] = "Quantity";
                tmpTable[49] = "Free";

                tmpTable[50] = "Loose";
                tmpTable[51] = "SellingRate";
                tmpTable[52] = "MRP";
                tmpTable[53] = "TQty";
                tmpTable[54] = "TLQty";
                tmpTable[55] = "TaxId";
                tmpTable[56] = "TaxRate";
                tmpTable[57] = "FCRate";
                tmpTable[58] = "FCDiscount";
                tmpTable[59] = "FCTaxable";

                tmpTable[60] = "FCTax";
                tmpTable[61] = "FCAmount";
                tmpTable[62] = "FC_Cess";
                tmpTable[63] = "Rate";
                tmpTable[64] = "Discount";
                tmpTable[65] = "TaxableAmount";
                tmpTable[66] = "TaxAmount";
                tmpTable[67] = "Amount";
                tmpTable[68] = "B_Cess";
                tmpTable[69] = "Margin";

                tmpTable[70] = "P_OtherCost";
                tmpTable[71] = "DelFlag";
                tmpTable[72] = "UserId";
                tmpTable[73] = "DeptId";
                tmpTable[74] = "IMEINumber";
                tmpTable[75] = "PO_No";
                tmpTable[76] = "PO_SubTbl_Id";
                tmpTable[77] = "MRV_No";
                tmpTable[78] = "MRV_SubTbl_Id";
                tmpTable[79] = "Performa_NO";

                tmpTable[80] = "Performa_SubTbl_Id";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                tmpTable[83] = "Status";
                tmpTable[84] = "Terms";
                tmpTable[85] = "DueDate";
                tmpTable[86] = "LPO_No";
                tmpTable[87] = "JobNo";
                tmpTable[88] = "Area";
                tmpTable[89] = "ShipDate";
                tmpTable[90] = "Flag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.PurMainId = details.PurMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.FBillDiscount = details.FBillDiscount;
                    obj.FDiscount = details.FDiscount;
                    obj.FTaxable = details.FTaxable;
                    obj.FTax = details.FTax;
                    obj.FCTotal = details.FCTotal;
                    obj.InvoiceTotal = details.InvoiceTotal;
                    obj.FCGST_0 = details.FCGST_0;
                    obj.FCGST_5 = details.FCGST_5;
                    obj.FCGST_12 = details.FCGST_12;
                    obj.FCGST_18 = details.FCGST_18;
                    obj.FCGST_28 = details.FCGST_28;
                    obj.FCess = details.FCess;
                    obj.BilDiscount = details.BilDiscount;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.BaseTotal = details.BaseTotal;
                    obj.BaseInvoiceTotal = details.BaseInvoiceTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Expiry = details.Expiry;
                    obj.Pack = details.Pack;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Loose = details.Loose;
                    obj.SellingRate = details.SellingRate;
                    obj.MRP = details.MRP;
                    obj.TQty = details.TQty;
                    obj.TLQty = details.TLQty;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.FCRate = details.FCRate;
                    obj.FCDiscount = details.FCDiscount;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCAmount = details.FCAmount;
                    obj.FC_Cess = details.FC_Cess;
                    obj.Rate = details.Rate;
                    obj.Discount = details.Discount;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.Amount = details.Amount;
                    obj.B_Cess = details.B_Cess;
                    obj.Margin = details.Margin;
                    obj.P_OtherCost = details.P_OtherCost;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.IMEINumber = details.IMEINumber;
                    obj.PO_No = details.PO_No;
                    obj.PO_SubTbl_Id = details.PO_SubTbl_Id;
                    obj.MRV_No = details.MRV_No;
                    obj.MRV_SubTbl_Id = details.MRV_SubTbl_Id;
                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.ShipDate = details.ShipDate;
                    obj.Flag = details.Flag;

                    dt.Rows.Add
                    (
                        obj.PurMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.CurrencyId,
                    obj.CurrencyRate, obj.FBillDiscount, obj.FDiscount, obj.FTaxable, obj.FTax, obj.FCTotal, obj.InvoiceTotal, obj.FCGST_0,
                    obj.FCGST_5, obj.FCGST_12, obj.FCGST_18, obj.FCGST_28, obj.FCess, obj.BilDiscount, obj.TotalDiscount, obj.TotalTaxable,
                    obj.TotalTax, obj.BaseTotal, obj.BaseInvoiceTotal, obj.BCGST_0, obj.BCGST_5, obj.BCGST_12, obj.BCGST_18, obj.BCGST_28,
                    obj.BCess, obj.FCRoundOff, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ItemId, obj.ItemCode,
                    obj.ItemDescription, obj.LocationId, obj.UnitId, obj.BatchSlNo, obj.Batch, obj.Expiry, obj.Pack, obj.Quantity, obj.Free,
                    obj.Loose, obj.SellingRate, obj.MRP, obj.TQty, obj.TLQty, obj.TaxId, obj.TaxRate, obj.FCRate, obj.FCDiscount, obj.FCTaxable,
                    obj.FCTax, obj.FCAmount, obj.FC_Cess, obj.Rate, obj.Discount, obj.TaxableAmount, obj.TaxAmount, obj.Amount, obj.B_Cess,
                    obj.Margin, obj.P_OtherCost, obj.DelFlag, obj.UserId, obj.DeptId, obj.IMEINumber, obj.PO_No, obj.PO_SubTbl_Id, obj.MRV_No,
                    obj.MRV_SubTbl_Id, obj.Performa_NO, obj.Performa_SubTbl_Id, obj.Variable1, obj.Variable2, obj.Status, obj.Terms, obj.DueDate,
                    obj.LPO_No, obj.JobNo, obj.Area, obj.ShipDate, obj.Flag
                    );
                }

                dsDataSet = obj.HMS_PurchaseUpdateOpening(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public JsonResult HMS_PurchaseUpdate(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                string[] tmpTable = new string[91];

                tmpTable[0] = "PurMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "FBillDiscount";

                tmpTable[10] = "FDiscount";
                tmpTable[11] = "FTaxable";
                tmpTable[12] = "FTax";
                tmpTable[13] = "FCTotal";
                tmpTable[14] = "InvoiceTotal";
                tmpTable[15] = "FCGST_0";
                tmpTable[16] = "FCGST_5";
                tmpTable[17] = "FCGST_12";
                tmpTable[18] = "FCGST_18";
                tmpTable[19] = "FCGST_28";

                tmpTable[20] = "FCess";
                tmpTable[21] = "BilDiscount";
                tmpTable[22] = "TotalDiscount";
                tmpTable[23] = "TotalTaxable";
                tmpTable[24] = "TotalTax";
                tmpTable[25] = "BaseTotal";
                tmpTable[26] = "BaseInvoiceTotal";
                tmpTable[27] = "BCGST_0";
                tmpTable[28] = "BCGST_5";
                tmpTable[29] = "BCGST_12";

                tmpTable[30] = "BCGST_18";
                tmpTable[31] = "BCGST_28";
                tmpTable[32] = "BCess";
                tmpTable[33] = "FCRoundOff";
                tmpTable[34] = "RoundOff";
                tmpTable[35] = "BDFlag";
                tmpTable[36] = "CessFlag";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "SubId";
                tmpTable[39] = "ItemId";

                tmpTable[40] = "ItemCode";
                tmpTable[41] = "ItemDescription";
                tmpTable[42] = "LocationId";
                tmpTable[43] = "UnitId";
                tmpTable[44] = "BatchSlNo";
                tmpTable[45] = "Batch";
                tmpTable[46] = "Expiry";
                tmpTable[47] = "Pack";
                tmpTable[48] = "Quantity";
                tmpTable[49] = "Free";

                tmpTable[50] = "Loose";
                tmpTable[51] = "SellingRate";
                tmpTable[52] = "MRP";
                tmpTable[53] = "TQty";
                tmpTable[54] = "TLQty";
                tmpTable[55] = "TaxId";
                tmpTable[56] = "TaxRate";
                tmpTable[57] = "FCRate";
                tmpTable[58] = "FCDiscount";
                tmpTable[59] = "FCTaxable";

                tmpTable[60] = "FCTax";
                tmpTable[61] = "FCAmount";
                tmpTable[62] = "FC_Cess";
                tmpTable[63] = "Rate";
                tmpTable[64] = "Discount";
                tmpTable[65] = "TaxableAmount";
                tmpTable[66] = "TaxAmount";
                tmpTable[67] = "Amount";
                tmpTable[68] = "B_Cess";
                tmpTable[69] = "Margin";

                tmpTable[70] = "P_OtherCost";
                tmpTable[71] = "DelFlag";
                tmpTable[72] = "UserId";
                tmpTable[73] = "DeptId";
                tmpTable[74] = "IMEINumber";
                tmpTable[75] = "PO_No";
                tmpTable[76] = "PO_SubTbl_Id";
                tmpTable[77] = "MRV_No";
                tmpTable[78] = "MRV_SubTbl_Id";
                tmpTable[79] = "Performa_NO";

                tmpTable[80] = "Performa_SubTbl_Id";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                tmpTable[83] = "Status";
                tmpTable[84] = "Terms";
                tmpTable[85] = "DueDate";
                tmpTable[86] = "LPO_No";
                tmpTable[87] = "JobNo";
                tmpTable[88] = "Area";
                tmpTable[89] = "ShipDate";
                tmpTable[90] = "Flag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.PurMainId = details.PurMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.FBillDiscount = details.FBillDiscount;
                    obj.FDiscount = details.FDiscount;
                    obj.FTaxable = details.FTaxable;
                    obj.FTax = details.FTax;
                    obj.FCTotal = details.FCTotal;
                    obj.InvoiceTotal = details.InvoiceTotal;
                    obj.FCGST_0 = details.FCGST_0;
                    obj.FCGST_5 = details.FCGST_5;
                    obj.FCGST_12 = details.FCGST_12;
                    obj.FCGST_18 = details.FCGST_18;
                    obj.FCGST_28 = details.FCGST_28;
                    obj.FCess = details.FCess;
                    obj.BilDiscount = details.BilDiscount;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.BaseTotal = details.BaseTotal;
                    obj.BaseInvoiceTotal = details.BaseInvoiceTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Expiry = details.Expiry;
                    obj.Pack = details.Pack;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Loose = details.Loose;
                    obj.SellingRate = details.SellingRate;
                    obj.MRP = details.MRP;
                    obj.TQty = details.TQty;
                    obj.TLQty = details.TLQty;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.FCRate = details.FCRate;
                    obj.FCDiscount = details.FCDiscount;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCAmount = details.FCAmount;
                    obj.FC_Cess = details.FC_Cess;
                    obj.Rate = details.Rate;
                    obj.Discount = details.Discount;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.Amount = details.Amount;
                    obj.B_Cess = details.B_Cess;
                    obj.Margin = details.Margin;
                    obj.P_OtherCost = details.P_OtherCost;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.IMEINumber = details.IMEINumber;
                    obj.PO_No = details.PO_No;
                    obj.PO_SubTbl_Id = details.PO_SubTbl_Id;
                    obj.MRV_No = details.MRV_No;
                    obj.MRV_SubTbl_Id = details.MRV_SubTbl_Id;
                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.ShipDate = details.ShipDate;
                    obj.Flag = details.Flag;

                    dt.Rows.Add
                    (
                        obj.PurMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.CurrencyId,
                    obj.CurrencyRate, obj.FBillDiscount, obj.FDiscount, obj.FTaxable, obj.FTax, obj.FCTotal, obj.InvoiceTotal, obj.FCGST_0,
                    obj.FCGST_5, obj.FCGST_12, obj.FCGST_18, obj.FCGST_28, obj.FCess, obj.BilDiscount, obj.TotalDiscount, obj.TotalTaxable,
                    obj.TotalTax, obj.BaseTotal, obj.BaseInvoiceTotal, obj.BCGST_0, obj.BCGST_5, obj.BCGST_12, obj.BCGST_18, obj.BCGST_28,
                    obj.BCess, obj.FCRoundOff, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ItemId, obj.ItemCode,
                    obj.ItemDescription, obj.LocationId, obj.UnitId, obj.BatchSlNo, obj.Batch, obj.Expiry, obj.Pack, obj.Quantity, obj.Free,
                    obj.Loose, obj.SellingRate, obj.MRP, obj.TQty, obj.TLQty, obj.TaxId, obj.TaxRate, obj.FCRate, obj.FCDiscount, obj.FCTaxable,
                    obj.FCTax, obj.FCAmount, obj.FC_Cess, obj.Rate, obj.Discount, obj.TaxableAmount, obj.TaxAmount, obj.Amount, obj.B_Cess,
                    obj.Margin, obj.P_OtherCost, obj.DelFlag, obj.UserId, obj.DeptId, obj.IMEINumber, obj.PO_No, obj.PO_SubTbl_Id, obj.MRV_No,
                    obj.MRV_SubTbl_Id, obj.Performa_NO, obj.Performa_SubTbl_Id, obj.Variable1, obj.Variable2, obj.Status, obj.Terms, obj.DueDate,
                    obj.LPO_No, obj.JobNo, obj.Area, obj.ShipDate, obj.Flag
                    );
                }

                dsDataSet = obj.HMS_PurchaseUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public JsonResult HMS_PurchaseReturnInsert(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                string[] tmpTable = new string[91];

                tmpTable[0] = "PurMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "FBillDiscount";

                tmpTable[10] = "FDiscount";
                tmpTable[11] = "FTaxable";
                tmpTable[12] = "FTax";
                tmpTable[13] = "FCTotal";
                tmpTable[14] = "InvoiceTotal";
                tmpTable[15] = "FCGST_0";
                tmpTable[16] = "FCGST_5";
                tmpTable[17] = "FCGST_12";
                tmpTable[18] = "FCGST_18";
                tmpTable[19] = "FCGST_28";

                tmpTable[20] = "FCess";
                tmpTable[21] = "BilDiscount";
                tmpTable[22] = "TotalDiscount";
                tmpTable[23] = "TotalTaxable";
                tmpTable[24] = "TotalTax";
                tmpTable[25] = "BaseTotal";
                tmpTable[26] = "BaseInvoiceTotal";
                tmpTable[27] = "BCGST_0";
                tmpTable[28] = "BCGST_5";
                tmpTable[29] = "BCGST_12";

                tmpTable[30] = "BCGST_18";
                tmpTable[31] = "BCGST_28";
                tmpTable[32] = "BCess";
                tmpTable[33] = "FCRoundOff";
                tmpTable[34] = "RoundOff";
                tmpTable[35] = "BDFlag";
                tmpTable[36] = "CessFlag";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "SubId";
                tmpTable[39] = "ItemId";

                tmpTable[40] = "ItemCode";
                tmpTable[41] = "ItemDescription";
                tmpTable[42] = "LocationId";
                tmpTable[43] = "UnitId";
                tmpTable[44] = "BatchSlNo";
                tmpTable[45] = "Batch";
                tmpTable[46] = "Expiry";
                tmpTable[47] = "Pack";
                tmpTable[48] = "Quantity";
                tmpTable[49] = "Free";

                tmpTable[50] = "Loose";
                tmpTable[51] = "SellingRate";
                tmpTable[52] = "MRP";
                tmpTable[53] = "TQty";
                tmpTable[54] = "TLQty";
                tmpTable[55] = "TaxId";
                tmpTable[56] = "TaxRate";
                tmpTable[57] = "FCRate";
                tmpTable[58] = "FCDiscount";
                tmpTable[59] = "FCTaxable";

                tmpTable[60] = "FCTax";
                tmpTable[61] = "FCAmount";
                tmpTable[62] = "FC_Cess";
                tmpTable[63] = "Rate";
                tmpTable[64] = "Discount";
                tmpTable[65] = "TaxableAmount";
                tmpTable[66] = "TaxAmount";
                tmpTable[67] = "Amount";
                tmpTable[68] = "B_Cess";
                tmpTable[69] = "Margin";

                tmpTable[70] = "P_OtherCost";
                tmpTable[71] = "DelFlag";
                tmpTable[72] = "UserId";
                tmpTable[73] = "DeptId";
                tmpTable[74] = "IMEINumber";
                tmpTable[75] = "PO_No";
                tmpTable[76] = "PO_SubTbl_Id";
                tmpTable[77] = "MRV_No";
                tmpTable[78] = "MRV_SubTbl_Id";
                tmpTable[79] = "Performa_NO";

                tmpTable[80] = "Performa_SubTbl_Id";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                tmpTable[83] = "Status";
                tmpTable[84] = "Terms";
                tmpTable[85] = "DueDate";
                tmpTable[86] = "LPO_No";
                tmpTable[87] = "JobNo";
                tmpTable[88] = "Area";
                tmpTable[89] = "ShipDate";
                tmpTable[90] = "Flag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.PurMainId = details.PurMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.FBillDiscount = details.FBillDiscount;
                    obj.FDiscount = details.FDiscount;
                    obj.FTaxable = details.FTaxable;
                    obj.FTax = details.FTax;
                    obj.FCTotal = details.FCTotal;
                    obj.InvoiceTotal = details.InvoiceTotal;
                    obj.FCGST_0 = details.FCGST_0;
                    obj.FCGST_5 = details.FCGST_5;
                    obj.FCGST_12 = details.FCGST_12;
                    obj.FCGST_18 = details.FCGST_18;
                    obj.FCGST_28 = details.FCGST_28;
                    obj.FCess = details.FCess;
                    obj.BilDiscount = details.BilDiscount;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.BaseTotal = details.BaseTotal;
                    obj.BaseInvoiceTotal = details.BaseInvoiceTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Expiry = details.Expiry;
                    obj.Pack = details.Pack;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Loose = details.Loose;
                    obj.SellingRate = details.SellingRate;
                    obj.MRP = details.MRP;
                    obj.TQty = details.TQty;
                    obj.TLQty = details.TLQty;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.FCRate = details.FCRate;
                    obj.FCDiscount = details.FCDiscount;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCAmount = details.FCAmount;
                    obj.FC_Cess = details.FC_Cess;
                    obj.Rate = details.Rate;
                    obj.Discount = details.Discount;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.Amount = details.Amount;
                    obj.B_Cess = details.B_Cess;
                    obj.Margin = details.Margin;
                    obj.P_OtherCost = details.P_OtherCost;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.IMEINumber = details.IMEINumber;
                    obj.PO_No = details.PO_No;
                    obj.PO_SubTbl_Id = details.PO_SubTbl_Id;
                    obj.MRV_No = details.MRV_No;
                    obj.MRV_SubTbl_Id = details.MRV_SubTbl_Id;
                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.ShipDate = details.ShipDate;
                    obj.Flag = details.Flag;

                    dt.Rows.Add
                    (
                        obj.PurMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.CurrencyId,
                    obj.CurrencyRate, obj.FBillDiscount, obj.FDiscount, obj.FTaxable, obj.FTax, obj.FCTotal, obj.InvoiceTotal, obj.FCGST_0,
                    obj.FCGST_5, obj.FCGST_12, obj.FCGST_18, obj.FCGST_28, obj.FCess, obj.BilDiscount, obj.TotalDiscount, obj.TotalTaxable,
                    obj.TotalTax, obj.BaseTotal, obj.BaseInvoiceTotal, obj.BCGST_0, obj.BCGST_5, obj.BCGST_12, obj.BCGST_18, obj.BCGST_28,
                    obj.BCess, obj.FCRoundOff, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ItemId, obj.ItemCode,
                    obj.ItemDescription, obj.LocationId, obj.UnitId, obj.BatchSlNo, obj.Batch, obj.Expiry, obj.Pack, obj.Quantity, obj.Free,
                    obj.Loose, obj.SellingRate, obj.MRP, obj.TQty, obj.TLQty, obj.TaxId, obj.TaxRate, obj.FCRate, obj.FCDiscount, obj.FCTaxable,
                    obj.FCTax, obj.FCAmount, obj.FC_Cess, obj.Rate, obj.Discount, obj.TaxableAmount, obj.TaxAmount, obj.Amount, obj.B_Cess,
                    obj.Margin, obj.P_OtherCost, obj.DelFlag, obj.UserId, obj.DeptId, obj.IMEINumber, obj.PO_No, obj.PO_SubTbl_Id, obj.MRV_No,
                    obj.MRV_SubTbl_Id, obj.Performa_NO, obj.Performa_SubTbl_Id, obj.Variable1, obj.Variable2, obj.Status, obj.Terms, obj.DueDate,
                    obj.LPO_No, obj.JobNo, obj.Area, obj.ShipDate, obj.Flag
                    );
                }

                dsDataSet = obj.HMS_PurchaseReturnInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public JsonResult HMS_PurchaseReturnUpdate(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                string[] tmpTable = new string[91];

                tmpTable[0] = "PurMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "FBillDiscount";

                tmpTable[10] = "FDiscount";
                tmpTable[11] = "FTaxable";
                tmpTable[12] = "FTax";
                tmpTable[13] = "FCTotal";
                tmpTable[14] = "InvoiceTotal";
                tmpTable[15] = "FCGST_0";
                tmpTable[16] = "FCGST_5";
                tmpTable[17] = "FCGST_12";
                tmpTable[18] = "FCGST_18";
                tmpTable[19] = "FCGST_28";

                tmpTable[20] = "FCess";
                tmpTable[21] = "BilDiscount";
                tmpTable[22] = "TotalDiscount";
                tmpTable[23] = "TotalTaxable";
                tmpTable[24] = "TotalTax";
                tmpTable[25] = "BaseTotal";
                tmpTable[26] = "BaseInvoiceTotal";
                tmpTable[27] = "BCGST_0";
                tmpTable[28] = "BCGST_5";
                tmpTable[29] = "BCGST_12";

                tmpTable[30] = "BCGST_18";
                tmpTable[31] = "BCGST_28";
                tmpTable[32] = "BCess";
                tmpTable[33] = "FCRoundOff";
                tmpTable[34] = "RoundOff";
                tmpTable[35] = "BDFlag";
                tmpTable[36] = "CessFlag";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "SubId";
                tmpTable[39] = "ItemId";

                tmpTable[40] = "ItemCode";
                tmpTable[41] = "ItemDescription";
                tmpTable[42] = "LocationId";
                tmpTable[43] = "UnitId";
                tmpTable[44] = "BatchSlNo";
                tmpTable[45] = "Batch";
                tmpTable[46] = "Expiry";
                tmpTable[47] = "Pack";
                tmpTable[48] = "Quantity";
                tmpTable[49] = "Free";

                tmpTable[50] = "Loose";
                tmpTable[51] = "SellingRate";
                tmpTable[52] = "MRP";
                tmpTable[53] = "TQty";
                tmpTable[54] = "TLQty";
                tmpTable[55] = "TaxId";
                tmpTable[56] = "TaxRate";
                tmpTable[57] = "FCRate";
                tmpTable[58] = "FCDiscount";
                tmpTable[59] = "FCTaxable";

                tmpTable[60] = "FCTax";
                tmpTable[61] = "FCAmount";
                tmpTable[62] = "FC_Cess";
                tmpTable[63] = "Rate";
                tmpTable[64] = "Discount";
                tmpTable[65] = "TaxableAmount";
                tmpTable[66] = "TaxAmount";
                tmpTable[67] = "Amount";
                tmpTable[68] = "B_Cess";
                tmpTable[69] = "Margin";

                tmpTable[70] = "P_OtherCost";
                tmpTable[71] = "DelFlag";
                tmpTable[72] = "UserId";
                tmpTable[73] = "DeptId";
                tmpTable[74] = "IMEINumber";
                tmpTable[75] = "PO_No";
                tmpTable[76] = "PO_SubTbl_Id";
                tmpTable[77] = "MRV_No";
                tmpTable[78] = "MRV_SubTbl_Id";
                tmpTable[79] = "Performa_NO";

                tmpTable[80] = "Performa_SubTbl_Id";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                tmpTable[83] = "Status";
                tmpTable[84] = "Terms";
                tmpTable[85] = "DueDate";
                tmpTable[86] = "LPO_No";
                tmpTable[87] = "JobNo";
                tmpTable[88] = "Area";
                tmpTable[89] = "ShipDate";
                tmpTable[90] = "Flag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.PurMainId = details.PurMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.FBillDiscount = details.FBillDiscount;
                    obj.FDiscount = details.FDiscount;
                    obj.FTaxable = details.FTaxable;
                    obj.FTax = details.FTax;
                    obj.FCTotal = details.FCTotal;
                    obj.InvoiceTotal = details.InvoiceTotal;
                    obj.FCGST_0 = details.FCGST_0;
                    obj.FCGST_5 = details.FCGST_5;
                    obj.FCGST_12 = details.FCGST_12;
                    obj.FCGST_18 = details.FCGST_18;
                    obj.FCGST_28 = details.FCGST_28;
                    obj.FCess = details.FCess;
                    obj.BilDiscount = details.BilDiscount;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.BaseTotal = details.BaseTotal;
                    obj.BaseInvoiceTotal = details.BaseInvoiceTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Expiry = details.Expiry;
                    obj.Pack = details.Pack;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Loose = details.Loose;
                    obj.SellingRate = details.SellingRate;
                    obj.MRP = details.MRP;
                    obj.TQty = details.TQty;
                    obj.TLQty = details.TLQty;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.FCRate = details.FCRate;
                    obj.FCDiscount = details.FCDiscount;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCAmount = details.FCAmount;
                    obj.FC_Cess = details.FC_Cess;
                    obj.Rate = details.Rate;
                    obj.Discount = details.Discount;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.Amount = details.Amount;
                    obj.B_Cess = details.B_Cess;
                    obj.Margin = details.Margin;
                    obj.P_OtherCost = details.P_OtherCost;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.IMEINumber = details.IMEINumber;
                    obj.PO_No = details.PO_No;
                    obj.PO_SubTbl_Id = details.PO_SubTbl_Id;
                    obj.MRV_No = details.MRV_No;
                    obj.MRV_SubTbl_Id = details.MRV_SubTbl_Id;
                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.ShipDate = details.ShipDate;
                    obj.Flag = details.Flag;

                    dt.Rows.Add
                    (
                        obj.PurMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.CurrencyId,
                    obj.CurrencyRate, obj.FBillDiscount, obj.FDiscount, obj.FTaxable, obj.FTax, obj.FCTotal, obj.InvoiceTotal, obj.FCGST_0,
                    obj.FCGST_5, obj.FCGST_12, obj.FCGST_18, obj.FCGST_28, obj.FCess, obj.BilDiscount, obj.TotalDiscount, obj.TotalTaxable,
                    obj.TotalTax, obj.BaseTotal, obj.BaseInvoiceTotal, obj.BCGST_0, obj.BCGST_5, obj.BCGST_12, obj.BCGST_18, obj.BCGST_28,
                    obj.BCess, obj.FCRoundOff, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ItemId, obj.ItemCode,
                    obj.ItemDescription, obj.LocationId, obj.UnitId, obj.BatchSlNo, obj.Batch, obj.Expiry, obj.Pack, obj.Quantity, obj.Free,
                    obj.Loose, obj.SellingRate, obj.MRP, obj.TQty, obj.TLQty, obj.TaxId, obj.TaxRate, obj.FCRate, obj.FCDiscount, obj.FCTaxable,
                    obj.FCTax, obj.FCAmount, obj.FC_Cess, obj.Rate, obj.Discount, obj.TaxableAmount, obj.TaxAmount, obj.Amount, obj.B_Cess,
                    obj.Margin, obj.P_OtherCost, obj.DelFlag, obj.UserId, obj.DeptId, obj.IMEINumber, obj.PO_No, obj.PO_SubTbl_Id, obj.MRV_No,
                    obj.MRV_SubTbl_Id, obj.Performa_NO, obj.Performa_SubTbl_Id, obj.Variable1, obj.Variable2, obj.Status, obj.Terms, obj.DueDate,
                    obj.LPO_No, obj.JobNo, obj.Area, obj.ShipDate, obj.Flag
                    );
                }

                dsDataSet = obj.HMS_PurchaseReturnUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
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
        public ActionResult HMS_PurchaseDeleteopening(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseDeleteopening(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());

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
        public ActionResult HMS_PurchaseDelete(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseDelete(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());

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
        public ActionResult HMS_PurchaseReturnDelete(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseReturnDelete(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);

        }



        

             public ActionResult HMS_PurchaseGetandGetsOpening(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseGetandGetsOpening(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.PurMainId = Convert.ToInt32(row["PurMainId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.FBillDiscount = Convert.ToDecimal(row["FBillDiscount"].ToString());
                    MModels.FDiscount = Convert.ToDecimal(row["FDiscount"].ToString());
                    MModels.FTaxable = Convert.ToDecimal(row["FTaxable"].ToString());
                    MModels.FTax = Convert.ToDecimal(row["FTax"].ToString());
                    MModels.FCTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.InvoiceTotal = Convert.ToDecimal(row["InvoiceTotal"].ToString());
                    MModels.FCGST_0 = Convert.ToDecimal(row["FCGST_0"].ToString());
                    MModels.FCGST_5 = Convert.ToDecimal(row["FCGST_5"].ToString());
                    MModels.FCGST_12 = Convert.ToDecimal(row["FCGST_12"].ToString());
                    MModels.FCGST_18 = Convert.ToDecimal(row["FCGST_18"].ToString());
                    MModels.FCGST_28 = Convert.ToDecimal(row["FCGST_28"].ToString());
                    MModels.FCess = Convert.ToDecimal(row["FCess"].ToString());
                    MModels.BilDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTotal = Convert.ToDecimal(row["BaseTotal"].ToString());
                    MModels.BaseInvoiceTotal = Convert.ToDecimal(row["BaseInvoiceTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["BCGST_0"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["BCGST_5"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["BCGST_12"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["BCGST_18"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["BCGST_28"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["BCess"].ToString());
                    MModels.FCRoundOff = Convert.ToDecimal(row["FCRoundOff"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundOff"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.SubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Pack = Convert.ToInt32(row["Pack"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellingRate = Convert.ToDecimal(row["P_SR"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["P_MRP"].ToString());
                    MModels.TQty = Convert.ToDecimal(row["TQty"].ToString());
                    MModels.TLQty = Convert.ToDecimal(row["TLQty"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.FCRate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FC_Cess = Convert.ToDecimal(row["FC_Cess"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["Discount"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.B_Cess = Convert.ToDecimal(row["B_Cess"].ToString());
                    MModels.Margin = Convert.ToDecimal(row["Margin"].ToString());
                    MModels.P_OtherCost = Convert.ToDecimal(row["P_OtherCost"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.IMEINumber = row["IMEINumber"].ToString();
                    MModels.PO_No = row["PO_No"].ToString();
                    MModels.PO_SubTbl_Id = row["PO_SubTbl_Id"].ToString();
                    MModels.MRV_No = row["MRV_No"].ToString();
                    MModels.MRV_SubTbl_Id = row["MRV_SubTbl_Id"].ToString();
                    MModels.Performa_NO = row["Performa_NO"].ToString();
                    MModels.Performa_SubTbl_Id = Convert.ToInt32(row["Performa_SubTbl_Id"].ToString());
                    MModels.Terms = row["Terms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LPO_No = row["LPO_No"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.Area = Convert.ToInt32(row["PlaceOfSupply"].ToString());
                    MModels.ShipDate = row["ShipDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.Status = row["Name"].ToString();
                    MModels.CessPer = Convert.ToDecimal(row["CessPer"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(oList, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };

        }




        public ActionResult HMS_PurchaseGetandGets(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseGetandGets(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.PurMainId = Convert.ToInt32(row["PurMainId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.FBillDiscount = Convert.ToDecimal(row["FBillDiscount"].ToString());
                    MModels.FDiscount = Convert.ToDecimal(row["FDiscount"].ToString());
                    MModels.FTaxable = Convert.ToDecimal(row["FTaxable"].ToString());
                    MModels.FTax = Convert.ToDecimal(row["FTax"].ToString());
                    MModels.FCTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.InvoiceTotal = Convert.ToDecimal(row["InvoiceTotal"].ToString());
                    MModels.FCGST_0 = Convert.ToDecimal(row["FCGST_0"].ToString());
                    MModels.FCGST_5 = Convert.ToDecimal(row["FCGST_5"].ToString());
                    MModels.FCGST_12 = Convert.ToDecimal(row["FCGST_12"].ToString());
                    MModels.FCGST_18 = Convert.ToDecimal(row["FCGST_18"].ToString());
                    MModels.FCGST_28 = Convert.ToDecimal(row["FCGST_28"].ToString());
                    MModels.FCess = Convert.ToDecimal(row["FCess"].ToString());
                    MModels.BilDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTotal = Convert.ToDecimal(row["BaseTotal"].ToString());
                    MModels.BaseInvoiceTotal = Convert.ToDecimal(row["BaseInvoiceTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["BCGST_0"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["BCGST_5"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["BCGST_12"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["BCGST_18"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["BCGST_28"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["BCess"].ToString());
                    MModels.FCRoundOff = Convert.ToDecimal(row["FCRoundOff"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundOff"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.SubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Pack = Convert.ToInt32(row["Pack"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellingRate = Convert.ToDecimal(row["P_SR"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["P_MRP"].ToString());
                    MModels.TQty = Convert.ToDecimal(row["TQty"].ToString());
                    MModels.TLQty = Convert.ToDecimal(row["TLQty"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.FCRate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FC_Cess = Convert.ToDecimal(row["FC_Cess"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["Discount"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.B_Cess = Convert.ToDecimal(row["B_Cess"].ToString());
                    MModels.Margin = Convert.ToDecimal(row["Margin"].ToString());
                    MModels.P_OtherCost = Convert.ToDecimal(row["P_OtherCost"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.IMEINumber = row["IMEINumber"].ToString();
                    MModels.PO_No = row["PO_No"].ToString();
                    MModels.PO_SubTbl_Id = row["PO_SubTbl_Id"].ToString();
                    MModels.MRV_No = row["MRV_No"].ToString();
                    MModels.MRV_SubTbl_Id = row["MRV_SubTbl_Id"].ToString();
                    MModels.Performa_NO = row["Performa_NO"].ToString();
                    MModels.Performa_SubTbl_Id = Convert.ToInt32(row["Performa_SubTbl_Id"].ToString());
                    MModels.Terms = row["Terms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LPO_No = row["LPO_No"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.Area = Convert.ToInt32(row["PlaceOfSupply"].ToString());
                    MModels.ShipDate = row["ShipDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.Status = row["Name"].ToString();
                    MModels.CessPer = Convert.ToDecimal(row["CessPer"].ToString());

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(oList, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };

        }
        public ActionResult HMS_PurchaseReturnGetandGets(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseReturnGetandGets(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.PurMainId = Convert.ToInt32(row["PRMainId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["PRNo"].ToString());
                    MModels.InvoNo = row["PRInvoNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.InvoDate = row["PRDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.FBillDiscount = Convert.ToDecimal(row["FBillDiscount"].ToString());
                    MModels.FDiscount = Convert.ToDecimal(row["FDiscount"].ToString());
                    MModels.FTaxable = Convert.ToDecimal(row["FTaxable"].ToString());
                    MModels.FTax = Convert.ToDecimal(row["FTax"].ToString());
                    MModels.FCTotal = Convert.ToDecimal(row["FCTotal"].ToString());                  
                    MModels.FCGST_0 = Convert.ToDecimal(row["FCGST_0"].ToString());
                    MModels.FCGST_5 = Convert.ToDecimal(row["FCGST_5"].ToString());
                    MModels.FCGST_12 = Convert.ToDecimal(row["FCGST_12"].ToString());
                    MModels.FCGST_18 = Convert.ToDecimal(row["FCGST_18"].ToString());
                    MModels.FCGST_28 = Convert.ToDecimal(row["FCGST_28"].ToString());
                    MModels.FCess = Convert.ToDecimal(row["FCess"].ToString());
                    MModels.BilDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTotal = Convert.ToDecimal(row["BaseTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["BCGST_0"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["BCGST_5"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["BCGST_12"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["BCGST_18"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["BCGST_28"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["BCess"].ToString());                 
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.PO_No = row["PurSlNo"].ToString();                    
                    MModels.SubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Pack = Convert.ToInt32(row["Pack"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellingRate = Convert.ToDecimal(row["P_SR"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["P_MRP"].ToString());
                    MModels.TQty = Convert.ToDecimal(row["TQty"].ToString());
                    MModels.TLQty = Convert.ToDecimal(row["TLQty"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.FCRate = Convert.ToDecimal(row["FCRate"].ToString());                    
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FC_Cess = Convert.ToDecimal(row["FC_Cess"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["Discount"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.B_Cess = Convert.ToDecimal(row["B_Cess"].ToString());
                    MModels.Margin = Convert.ToDecimal(row["Margin"].ToString());                
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.LPO_No = row["PI_No"].ToString();
                    MModels.ShipDate = row["ShipDate"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.IMEINumber = row["IMEINumber"].ToString();
                    MModels.Terms = row["Terms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.Area = Convert.ToInt32(row["PlaceOfSupply"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.Status = row["Name"].ToString();
                    MModels.CessPer = Convert.ToDecimal(row["CessPer"].ToString());
                    MModels.InvId = Convert.ToInt32(row["InvId"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(oList, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        public ActionResult HMS_PurchaseTempList(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseTempList(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();

                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());                   
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.PayType = row["PayType"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_PurchaseTempGets(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseTempGets(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.FBillDiscount = Convert.ToDecimal(row["FBillDiscount"].ToString());
                    MModels.FDiscount = Convert.ToDecimal(row["FDiscount"].ToString());
                    MModels.FTaxable = Convert.ToDecimal(row["FTaxable"].ToString());
                    MModels.FTax = Convert.ToDecimal(row["FTax"].ToString());
                    MModels.FCTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.InvoiceTotal = Convert.ToDecimal(row["InvoiceTotal"].ToString());
                    MModels.FCGST_0 = Convert.ToDecimal(row["FCGST_0"].ToString());
                    MModels.FCGST_5 = Convert.ToDecimal(row["FCGST_5"].ToString());
                    MModels.FCGST_12 = Convert.ToDecimal(row["FCGST_12"].ToString());
                    MModels.FCGST_18 = Convert.ToDecimal(row["FCGST_18"].ToString());
                    MModels.FCGST_28 = Convert.ToDecimal(row["FCGST_28"].ToString());
                    MModels.FCess = Convert.ToDecimal(row["FCess"].ToString());
                    MModels.BilDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.BaseTotal = Convert.ToDecimal(row["BaseTotal"].ToString());
                    MModels.BaseInvoiceTotal = Convert.ToDecimal(row["BaseInvoiceTotal"].ToString());
                    MModels.BCGST_0 = Convert.ToDecimal(row["BCGST_0"].ToString());
                    MModels.BCGST_5 = Convert.ToDecimal(row["BCGST_5"].ToString());
                    MModels.BCGST_12 = Convert.ToDecimal(row["BCGST_12"].ToString());
                    MModels.BCGST_18 = Convert.ToDecimal(row["BCGST_18"].ToString());
                    MModels.BCGST_28 = Convert.ToDecimal(row["BCGST_28"].ToString());
                    MModels.BCess = Convert.ToDecimal(row["BCess"].ToString());
                    MModels.FCRoundOff = Convert.ToDecimal(row["FCRoundOff"].ToString());
                    MModels.RoundOff = Convert.ToDecimal(row["RoundOff"].ToString());
                    MModels.BDFlag = Convert.ToInt32(row["BDFlag"].ToString());
                    MModels.CessFlag = Convert.ToInt32(row["CessFlag"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Pack = Convert.ToInt32(row["Pack"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Free = Convert.ToDecimal(row["Free"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["Loose"].ToString());
                    MModels.SellingRate = Convert.ToDecimal(row["P_SR"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["P_MRP"].ToString());
                    MModels.TQty = Convert.ToDecimal(row["TQty"].ToString());
                    MModels.TLQty = Convert.ToDecimal(row["TLQty"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.FCRate = Convert.ToDecimal(row["FCRate"].ToString());
                    MModels.FCDiscount = Convert.ToDecimal(row["FCDiscount"].ToString());
                    MModels.FCTaxable = Convert.ToDecimal(row["FCTaxable"].ToString());
                    MModels.FCTax = Convert.ToDecimal(row["FCTax"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FC_Cess = Convert.ToDecimal(row["FC_Cess"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Discount = Convert.ToDecimal(row["Discount"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.B_Cess = Convert.ToDecimal(row["B_Cess"].ToString());
                    MModels.Margin = Convert.ToDecimal(row["Margin"].ToString());
                    MModels.P_OtherCost = Convert.ToDecimal(row["P_OtherCost"].ToString());
                    MModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.IMEINumber = row["IMEINumber"].ToString();
                    MModels.PO_No = row["PO_No"].ToString();
                    MModels.PO_SubTbl_Id = row["PO_SubTbl_Id"].ToString();
                    MModels.MRV_No = row["MRV_No"].ToString();
                    MModels.MRV_SubTbl_Id = row["MRV_SubTbl_Id"].ToString();
                    MModels.Performa_NO = row["Performa_NO"].ToString();
                    MModels.Performa_SubTbl_Id = Convert.ToInt32(row["Performa_SubTbl_Id"].ToString());
                    MModels.Terms = row["Terms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LPO_No = row["LPO_No"].ToString();
                    MModels.JobNo = Convert.ToInt32(row["JobNo"].ToString());
                    MModels.Area = Convert.ToInt32(row["PlaceOfSupply"].ToString());
                    MModels.ShipDate = row["ShipDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.Status = row["Name"].ToString();
                    MModels.CessPer = Convert.ToDecimal(row["CessPer"].ToString());
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

        public ActionResult HMS_BatchPurchaseCorrection(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_BatchPurchaseCorrection(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.InvId= Convert.ToInt32(row["InvId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.InvoDate = row["InvDate"].ToString();
                    MModels.Batch = row["Batch"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["Cost"].ToString());
                    MModels.SellingRate = Convert.ToDecimal(row["Price"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["P_MRP"].ToString());                   
                    MModels.Expiry = row["ItemExpiry"].ToString();
                    MModels.TLQty = Convert.ToDecimal(row["LooseStock"].ToString());
                    MModels.TQty = Convert.ToDecimal(row["Stock"].ToString());
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.Status = row["LocationCode"].ToString();
                    MModels.Remarks = row["TransType"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult HMS_BatchPurchaseReturn(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

          List<PharmacyModel> oList = new List<PharmacyModel>();
            try
          {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_BatchPurchaseReturn(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    PharmacyModel MModels = new PharmacyModel();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Rate = Convert.ToDecimal(row["Cost"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.InvId = Convert.ToInt32(row["InvId"].ToString());                
                    MModels.SellingRate = Convert.ToDecimal(row["I_SellingRate"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["I_MRP"].ToString());
                    MModels.Expiry = row["ItemExpiry"].ToString();
                    MModels.LocationId = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.Status = row["LocationCode"].ToString();
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxRate = Convert.ToDecimal(row["TaxPercentage"].ToString());
                    MModels.InvoNo = row["InvoiceNo"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.Loose = Convert.ToDecimal(row["LooseStock"].ToString()); 



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
        public JsonResult HMS_PurchaseCorrectionInsert(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                string[] tmpTable = new string[91];

                tmpTable[0] = "PurMainId";
                tmpTable[1] = "SlNo";
                tmpTable[2] = "InvoNo";
                tmpTable[3] = "SupplierId";
                tmpTable[4] = "PayType";
                tmpTable[5] = "PurchaseType";
                tmpTable[6] = "InvoDate";
                tmpTable[7] = "CurrencyId";
                tmpTable[8] = "CurrencyRate";
                tmpTable[9] = "FBillDiscount";

                tmpTable[10] = "FDiscount";
                tmpTable[11] = "FTaxable";
                tmpTable[12] = "FTax";
                tmpTable[13] = "FCTotal";
                tmpTable[14] = "InvoiceTotal";
                tmpTable[15] = "FCGST_0";
                tmpTable[16] = "FCGST_5";
                tmpTable[17] = "FCGST_12";
                tmpTable[18] = "FCGST_18";
                tmpTable[19] = "FCGST_28";

                tmpTable[20] = "FCess";
                tmpTable[21] = "BilDiscount";
                tmpTable[22] = "TotalDiscount";
                tmpTable[23] = "TotalTaxable";
                tmpTable[24] = "TotalTax";
                tmpTable[25] = "BaseTotal";
                tmpTable[26] = "BaseInvoiceTotal";
                tmpTable[27] = "BCGST_0";
                tmpTable[28] = "BCGST_5";
                tmpTable[29] = "BCGST_12";

                tmpTable[30] = "BCGST_18";
                tmpTable[31] = "BCGST_28";
                tmpTable[32] = "BCess";
                tmpTable[33] = "FCRoundOff";
                tmpTable[34] = "RoundOff";
                tmpTable[35] = "BDFlag";
                tmpTable[36] = "CessFlag";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "SubId";
                tmpTable[39] = "ItemId";

                tmpTable[40] = "ItemCode";
                tmpTable[41] = "ItemDescription";
                tmpTable[42] = "LocationId";
                tmpTable[43] = "UnitId";
                tmpTable[44] = "BatchSlNo";
                tmpTable[45] = "Batch";
                tmpTable[46] = "Expiry";
                tmpTable[47] = "Pack";
                tmpTable[48] = "Quantity";
                tmpTable[49] = "Free";

                tmpTable[50] = "Loose";
                tmpTable[51] = "SellingRate";
                tmpTable[52] = "MRP";
                tmpTable[53] = "TQty";
                tmpTable[54] = "TLQty";
                tmpTable[55] = "TaxId";
                tmpTable[56] = "TaxRate";
                tmpTable[57] = "FCRate";
                tmpTable[58] = "FCDiscount";
                tmpTable[59] = "FCTaxable";

                tmpTable[60] = "FCTax";
                tmpTable[61] = "FCAmount";
                tmpTable[62] = "FC_Cess";
                tmpTable[63] = "Rate";
                tmpTable[64] = "Discount";
                tmpTable[65] = "TaxableAmount";
                tmpTable[66] = "TaxAmount";
                tmpTable[67] = "Amount";
                tmpTable[68] = "B_Cess";
                tmpTable[69] = "Margin";

                tmpTable[70] = "P_OtherCost";
                tmpTable[71] = "DelFlag";
                tmpTable[72] = "UserId";
                tmpTable[73] = "DeptId";
                tmpTable[74] = "IMEINumber";
                tmpTable[75] = "PO_No";
                tmpTable[76] = "PO_SubTbl_Id";
                tmpTable[77] = "MRV_No";
                tmpTable[78] = "MRV_SubTbl_Id";
                tmpTable[79] = "Performa_NO";

                tmpTable[80] = "Performa_SubTbl_Id";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                tmpTable[83] = "Status";
                tmpTable[84] = "Terms";
                tmpTable[85] = "DueDate";
                tmpTable[86] = "LPO_No";
                tmpTable[87] = "JobNo";
                tmpTable[88] = "Area";
                tmpTable[89] = "ShipDate";
                tmpTable[90] = "Flag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.PurMainId = details.PurMainId;
                    obj.SlNo = details.SlNo;
                    obj.InvoNo = details.InvoNo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.InvoDate = details.InvoDate;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.FBillDiscount = details.FBillDiscount;
                    obj.FDiscount = details.FDiscount;
                    obj.FTaxable = details.FTaxable;
                    obj.FTax = details.FTax;
                    obj.FCTotal = details.FCTotal;
                    obj.InvoiceTotal = details.InvoiceTotal;
                    obj.FCGST_0 = details.FCGST_0;
                    obj.FCGST_5 = details.FCGST_5;
                    obj.FCGST_12 = details.FCGST_12;
                    obj.FCGST_18 = details.FCGST_18;
                    obj.FCGST_28 = details.FCGST_28;
                    obj.FCess = details.FCess;
                    obj.BilDiscount = details.BilDiscount;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.BaseTotal = details.BaseTotal;
                    obj.BaseInvoiceTotal = details.BaseInvoiceTotal;
                    obj.BCGST_0 = details.BCGST_0;
                    obj.BCGST_5 = details.BCGST_5;
                    obj.BCGST_12 = details.BCGST_12;
                    obj.BCGST_18 = details.BCGST_18;
                    obj.BCGST_28 = details.BCGST_28;
                    obj.BCess = details.BCess;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BDFlag = details.BDFlag;
                    obj.CessFlag = details.CessFlag;
                    obj.Remarks = details.Remarks;
                    obj.SubId = details.SubId;
                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.LocationId = details.LocationId;
                    obj.UnitId = details.UnitId;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.Expiry = details.Expiry;
                    obj.Pack = details.Pack;
                    obj.Quantity = details.Quantity;
                    obj.Free = details.Free;
                    obj.Loose = details.Loose;
                    obj.SellingRate = details.SellingRate;
                    obj.MRP = details.MRP;
                    obj.TQty = details.TQty;
                    obj.TLQty = details.TLQty;
                    obj.TaxId = details.TaxId;
                    obj.TaxRate = details.TaxRate;
                    obj.FCRate = details.FCRate;
                    obj.FCDiscount = details.FCDiscount;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.FCAmount = details.FCAmount;
                    obj.FC_Cess = details.FC_Cess;
                    obj.Rate = details.Rate;
                    obj.Discount = details.Discount;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.TaxAmount = details.TaxAmount;
                    obj.Amount = details.Amount;
                    obj.B_Cess = details.B_Cess;
                    obj.Margin = details.Margin;
                    obj.P_OtherCost = details.P_OtherCost;
                    obj.DelFlag = details.DelFlag;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.IMEINumber = details.IMEINumber;
                    obj.PO_No = details.PO_No;
                    obj.PO_SubTbl_Id = details.PO_SubTbl_Id;
                    obj.MRV_No = details.MRV_No;
                    obj.MRV_SubTbl_Id = details.MRV_SubTbl_Id;
                    obj.Performa_NO = details.Performa_NO;
                    obj.Performa_SubTbl_Id = details.Performa_SubTbl_Id;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;
                    obj.Status = details.Status;
                    obj.Terms = details.Terms;
                    obj.DueDate = details.DueDate;
                    obj.LPO_No = details.LPO_No;
                    obj.JobNo = details.JobNo;
                    obj.Area = details.Area;
                    obj.ShipDate = details.ShipDate;
                    obj.Flag = details.Flag;

                    dt.Rows.Add
                    (
                        obj.PurMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.CurrencyId,
                    obj.CurrencyRate, obj.FBillDiscount, obj.FDiscount, obj.FTaxable, obj.FTax, obj.FCTotal, obj.InvoiceTotal, obj.FCGST_0,
                    obj.FCGST_5, obj.FCGST_12, obj.FCGST_18, obj.FCGST_28, obj.FCess, obj.BilDiscount, obj.TotalDiscount, obj.TotalTaxable,
                    obj.TotalTax, obj.BaseTotal, obj.BaseInvoiceTotal, obj.BCGST_0, obj.BCGST_5, obj.BCGST_12, obj.BCGST_18, obj.BCGST_28,
                    obj.BCess, obj.FCRoundOff, obj.RoundOff, obj.BDFlag, obj.CessFlag, obj.Remarks, obj.SubId, obj.ItemId, obj.ItemCode,
                    obj.ItemDescription, obj.LocationId, obj.UnitId, obj.BatchSlNo, obj.Batch, obj.Expiry, obj.Pack, obj.Quantity, obj.Free,
                    obj.Loose, obj.SellingRate, obj.MRP, obj.TQty, obj.TLQty, obj.TaxId, obj.TaxRate, obj.FCRate, obj.FCDiscount, obj.FCTaxable,
                    obj.FCTax, obj.FCAmount, obj.FC_Cess, obj.Rate, obj.Discount, obj.TaxableAmount, obj.TaxAmount, obj.Amount, obj.B_Cess,
                    obj.Margin, obj.P_OtherCost, obj.DelFlag, obj.UserId, obj.DeptId, obj.IMEINumber, obj.PO_No, obj.PO_SubTbl_Id, obj.MRV_No,
                    obj.MRV_SubTbl_Id, obj.Performa_NO, obj.Performa_SubTbl_Id, obj.Variable1, obj.Variable2, obj.Status, obj.Terms, obj.DueDate,
                    obj.LPO_No, obj.JobNo, obj.Area, obj.ShipDate, obj.Flag
                    );
                }

                dsDataSet = obj.HMS_PurchaseCorrectionInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult HMS_PurchaseCorrectionSearch(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseCorrectionSearch(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                    PharmacyModel MModels = new PharmacyModel();
                    MModels.SlNo = Convert.ToInt32(row["P_CorrecNo"].ToString());
                    MModels.InvoDate = row["InsDtTime"].ToString();
                    
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_PurchaseCorrectionGets(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseCorrectionGets(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.PurMainId = Convert.ToInt32(row["PCId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["P_CorrecNo"].ToString());
                    MModels.InvoNo = row["PurSlNo"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Batch = row["O_Batch"].ToString();
                    MModels.ItemDescription = row["N_Batch"].ToString();
                    MModels.Expiry = row["O_Expiry"].ToString();
                    MModels.InvoDate = row["N_Expiry"].ToString();
                    MModels.SellingRate = Convert.ToDecimal(row["O_SellPrice"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["N_SellPrice"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["O_MRP"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["N_MRP"].ToString());
                    MModels.Flag = Convert.ToInt32(row["StockType"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["O_Quantity"].ToString());
                    MModels.Free = Convert.ToDecimal(row["N_Quantity"].ToString());
                    MModels.Status = row["Reason"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Rate = Convert.ToDecimal(row["Cost"].ToString());
                    MModels.ShipDate = row["InvDate"].ToString();
                    MModels.Variable1 = row["T_Type"].ToString();
                    MModels.InvId = Convert.ToInt32(row["InvId"].ToString());
                    MModels.DueDate= row["LocationCode"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            // return Json(oList, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
        [HttpPost]
        public JsonResult HMS_LocationTransferInsert(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {

                string[] tmpTable = new string[21];

                tmpTable[0] = "SlNo";
                tmpTable[1] = "TRNo";
                tmpTable[2] = "TRDate";
                tmpTable[3] = "FromLocation";
                tmpTable[4] = "ToLocation";
                tmpTable[5] = "DebitAcc";
                tmpTable[6] = "CreditAcc";
                tmpTable[7] = "Remarks";
                tmpTable[8] = "ItemId";
                tmpTable[9] = "BatchSlNo";
                tmpTable[10] = "Batch";
                tmpTable[11] = "ItemCode";
                tmpTable[12] = "Quantity";
                tmpTable[13] = "Price";
                tmpTable[14] = "Total";
                tmpTable[15] = "CuStock";
                tmpTable[16] = "Expiry";
                tmpTable[17] = "Status";
                tmpTable[18] = "Variable1";
                tmpTable[19] = "UserId";
                tmpTable[20] = "DeptId";
                
                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.SlNo = details.SlNo;
                    obj.TRNo = details.TRNo;
                    obj.TRDate = details.TRDate;
                    obj.FromLocation = details.FromLocation;
                    obj.ToLocation = details.ToLocation;
                    obj.DebitAcc = details.DebitAcc;
                    obj.CreditAcc = details.CreditAcc;
                    obj.Remarks = details.Remarks;
                    obj.ItemId = details.ItemId;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.ItemCode = details.ItemCode;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Total = details.Total;
                    obj.CuStock = details.CuStock;
                    obj.Expiry = details.Expiry;
                    obj.Status = details.Status;
                    obj.Variable1 = details.Variable1;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;

                    dt.Rows.Add
                    (
                        obj.SlNo, obj.TRNo, obj.TRDate, obj.FromLocation, obj.ToLocation, obj.DebitAcc, obj.CreditAcc, obj.Remarks,
                    obj.ItemId, obj.BatchSlNo,obj.Batch, obj.ItemCode, obj.Quantity, obj.Price, obj.Total, obj.CuStock, obj.Expiry,
                    obj.Status, obj.Variable1, obj.UserId, obj.DeptId
                    );
                }

                dsDataSet = obj.HMS_LocationTransferInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.TRNo = Convert.ToInt32(row["TRNo"].ToString());
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
        public JsonResult HMS_LocationTransferUpdate(List<PharmacyModel> PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {

                string[] tmpTable = new string[21];

                tmpTable[0] = "SlNo";
                tmpTable[1] = "TRNo";
                tmpTable[2] = "TRDate";
                tmpTable[3] = "FromLocation";
                tmpTable[4] = "ToLocation";
                tmpTable[5] = "DebitAcc";
                tmpTable[6] = "CreditAcc";
                tmpTable[7] = "Remarks";
                tmpTable[8] = "ItemId";
                tmpTable[9] = "BatchSlNo";
                tmpTable[10] = "Batch";
                tmpTable[11] = "ItemCode";
                tmpTable[12] = "Quantity";
                tmpTable[13] = "Price";
                tmpTable[14] = "Total";
                tmpTable[15] = "CuStock";
                tmpTable[16] = "Expiry";
                tmpTable[17] = "Status";
                tmpTable[18] = "Variable1";
                tmpTable[19] = "UserId";
                tmpTable[20] = "DeptId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PharmacyModel)
                {
                    obj.SlNo = details.SlNo;
                    obj.TRNo = details.TRNo;
                    obj.TRDate = details.TRDate;
                    obj.FromLocation = details.FromLocation;
                    obj.ToLocation = details.ToLocation;
                    obj.DebitAcc = details.DebitAcc;
                    obj.CreditAcc = details.CreditAcc;
                    obj.Remarks = details.Remarks;
                    obj.ItemId = details.ItemId;
                    obj.BatchSlNo = details.BatchSlNo;
                    obj.Batch = details.Batch;
                    obj.ItemCode = details.ItemCode;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Total = details.Total;
                    obj.CuStock = details.CuStock;
                    obj.Expiry = details.Expiry;
                    obj.Status = details.Status;
                    obj.Variable1 = details.Variable1;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;

                    dt.Rows.Add
                    (
                        obj.SlNo, obj.TRNo, obj.TRDate, obj.FromLocation, obj.ToLocation, obj.DebitAcc, obj.CreditAcc, obj.Remarks,
                    obj.ItemId, obj.BatchSlNo, obj.Batch, obj.ItemCode, obj.Quantity, obj.Price, obj.Total, obj.CuStock, obj.Expiry,
                    obj.Status, obj.Variable1, obj.UserId, obj.DeptId
                    );
                }

                dsDataSet = obj.HMS_LocationTransferUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.TRNo = Convert.ToInt32(row["TRNo"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult HMS_LocationTransferDelete(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LocationTransferDelete(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.TRNo = Convert.ToInt32(row["TRNo"].ToString());

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
        public ActionResult HMS_LocationTransferGet(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LocationTransferGet(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.TRNo = Convert.ToInt32(row["trNo"].ToString());
                    MModels.TRDate = row["TRDate"].ToString();
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.DebitAcc = Convert.ToInt32(row["DebitAccount"].ToString());
                    MModels.CreditAcc = Convert.ToInt32(row["CreditAccount"].ToString());
                    MModels.Remarks = row["Comments"].ToString();
                    MModels.Variable1 = row["CurDate"].ToString();
                    MModels.Variable2 = row["LocTransflg"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchNo"].ToString());
                    MModels.ItemCode = row["Description"].ToString();
                    MModels.Status = row["UnitId"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Price = Convert.ToDecimal(row["Price"].ToString());
                    MModels.Total = Convert.ToDecimal(row["Total"].ToString());
                    MModels.LPO_No = row["HsnCode"].ToString();
                    MModels.PurchaseType = row["SubCategoryName"].ToString();
                    MModels.Acc_Code = row["Acc_Code"].ToString();
                    MModels.Acc_Description = row["Acc_Description"].ToString();
                    MModels.DAcc_Code = row["DAcc_Code"].ToString();
                    MModels.DAcc_Description = row["DAcc_Description"].ToString();
                    MModels.FLocationName = row["FLocationName"].ToString();
                    MModels.TLocationName = row["TLocationName"].ToString();
                    MModels.Stock = row["Stock"].ToString();
                    MModels.Company = row["GrpName"].ToString();
                    MModels.Batch = row["Batch"].ToString();
                    
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

        public ActionResult HMS_LocationTransferView(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LocationTransferView(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.TRNo = Convert.ToInt32(row["trNo"].ToString());
                    MModels.TRDate = row["TRDate"].ToString();
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());   
                    MModels.Remarks = row["Comments"].ToString();
                    MModels.Variable1 = row["CurDate"].ToString();
                    MModels.FLocationName = row["FLocationName"].ToString();
                    MModels.TLocationName = row["TLocationName"].ToString();

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

        public ActionResult HMS_LocationTransferSearch(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_LocationTransferSearch(PharmacyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {               
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.TRNo = Convert.ToInt32(row["trNo"].ToString());
                    MModels.TRDate = row["TRDate"].ToString();
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.Remarks = row["Comments"].ToString();
                    MModels.Variable1 = row["CurDate"].ToString();
                    MModels.FLocationName = row["FLocationName"].ToString();
                    MModels.TLocationName = row["TLocationName"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        public ActionResult HMS_PurchaseCorrectionGetsbyItem(PharmacyModel PharmacyModel)
        {
            PharmacyModel obj = new PharmacyModel();

            List<PharmacyModel> oList = new List<PharmacyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_PurchaseCorrectionGetsbyItem(PharmacyModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PharmacyModel MModels = new PharmacyModel();
                    MModels.PurMainId = Convert.ToInt32(row["PCId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["P_CorrecNo"].ToString());
                    MModels.InvoNo = row["PurSlNo"].ToString();
                    MModels.BatchSlNo = Convert.ToInt32(row["BatchSlNo"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Batch = row["O_Batch"].ToString();
                    MModels.ItemDescription = row["N_Batch"].ToString();
                    MModels.Expiry = row["O_Expiry"].ToString();
                    MModels.InvoDate = row["N_Expiry"].ToString();
                    MModels.SellingRate = Convert.ToDecimal(row["O_SellPrice"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["N_SellPrice"].ToString());
                    MModels.MRP = Convert.ToDecimal(row["O_MRP"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["N_MRP"].ToString());
                    MModels.Flag = Convert.ToInt32(row["StockType"].ToString());
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.Loose = Convert.ToDecimal(row["O_Quantity"].ToString());
                    MModels.Free = Convert.ToDecimal(row["N_Quantity"].ToString());
                    MModels.Status = row["Reason"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.Rate = Convert.ToDecimal(row["Cost"].ToString());
                    MModels.ShipDate = row["InvDate"].ToString();
                    MModels.Variable1 = row["T_Type"].ToString();
                    MModels.InvId = Convert.ToInt32(row["InvId"].ToString());
                    MModels.DueDate = row["LocationCode"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //  return Json(oList, JsonRequestBehavior.AllowGet);
            return new JsonResult() { Data = oList, MaxJsonLength = 86753090, };
        }
    }
}