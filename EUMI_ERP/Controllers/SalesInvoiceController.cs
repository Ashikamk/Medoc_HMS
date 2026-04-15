using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Configuration;
using System.IO;
using EUMI_ERP.Models;

namespace EUMI_ERP.Controllers
{
    public class SalesInvoiceController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: SalesInvoice
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CustomerEnquiry()
        {
            return View();
        }
        public ActionResult QuotationEntry()
        {
            return View();
        }
        public ActionResult SalesOrder()
        {
            return View();
        }
        public ActionResult DeliveryOrder()
        {
            return View();
        }
        public ActionResult SalesReturn()
        {
            return View();
        }
        public ActionResult SalesInvoiceMobile() 
        {
            return View();
        }
        public ActionResult SalesReturnMobile() 
        {
            return View();
        }
        public ActionResult SalesInvoicePress() 
        {
            return View();
        }
        public ActionResult SalesOrderPress()
        {
            return View();
        }
        public ActionResult SalesInvoiceUsedCar() 
        {
            return View();
        }
        public ActionResult SalesScrap()
        {
            return View();
        }
        public ActionResult QuotationEntryNew() 
        {
            return View();
        }

        public ActionResult CustomerEnquiryNew() 
        {
            return View();
        }
        public ActionResult SalesOrderNew() 
        {
            return View();
        }
        public ActionResult DeliveryOrderNew() 
        {
            return View();
        }
        public ActionResult SalesReturnNew() 
        {
            return View();
        }
        public ActionResult DailyCashUpdation() 
        {
            return View();
        }
        public ActionResult DailyCollectionCheckList() 
        {
            return View();
        }
        public ActionResult SalesInvoiceGasTrading() 
        {
            return View();
        }
        public ActionResult DeliveryOrderGasTrading() 
        {
            return View();
        }
        public ActionResult SalesInvoiceRentCar()
        {
            return View();
        }
        public ActionResult PackingList() 
        {
            return View();
        }
        public ActionResult ExportSalesDocStatus() 
        {
            return View();
        }
        [HttpPost]

        public ActionResult ProductSearchSales(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductSearchSales(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.VatPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.stocktotloseqty = Convert.ToDecimal(row["Stock_TotLoseQty"].ToString());
                    MModels.GrpId = Convert.ToInt32(row["GroupId"].ToString());
                    MModels.GrpName = row["GrpName"].ToString();
                    MModels.SbgrpId = Convert.ToInt32(row["SubGroupId"].ToString());
                    MModels.SbgrpName = row["SbgrpName"].ToString();
                    MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    MModels.CategoryName = row["CategoryName"].ToString();
                    MModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.OpeningQty = Convert.ToDecimal(row["Stock_OpeningQty"].ToString());
                    MModels.SerialNo = row["SerialNo"].ToString();
                    MModels.Otherdescription = row["Otherdescription"].ToString();
                    MModels.MRP = Convert.ToDecimal(row["MrpRate"].ToString());
                    MModels.LOTNo =  row["LOTNo"].ToString();
                    MModels.TotQty = Convert.ToDecimal(row["Stock_Qty"].ToString());
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.MultiPriceId = Convert.ToInt32(row["BelowCostFlag"].ToString()); 
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

        public ActionResult ProductSearchRentCarSales(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductSearchRentCarSales(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.VatPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.SellingPrice1 = Convert.ToDecimal(row["SellingPrice_1"].ToString());
                    MModels.SellingPrice2 = Convert.ToDecimal(row["SellingPrice_2"].ToString());
                    MModels.stocktotloseqty = Convert.ToDecimal(row["Stock_TotLoseQty"].ToString());
                    MModels.GrpId = Convert.ToInt32(row["GroupId"].ToString());
                    MModels.GrpName = row["GrpName"].ToString();
                    MModels.SbgrpId = Convert.ToInt32(row["SubGroupId"].ToString());
                    MModels.SbgrpName = row["SbgrpName"].ToString();
                    MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    MModels.CategoryName = row["CategoryName"].ToString();
                    MModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.OpeningQty = Convert.ToDecimal(row["Stock_OpeningQty"].ToString());
                    MModels.SerialNo = row["SerialNo"].ToString();
                    MModels.Otherdescription = row["Otherdescription"].ToString();
                    MModels.MRP = Convert.ToDecimal(row["MrpRate"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.TotQty = Convert.ToDecimal(row["Stock_Qty"].ToString());
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.MultiPriceId = Convert.ToInt32(row["BelowCostFlag"].ToString());
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

        public ActionResult AutomobileProductSearchSales(ItemMasterModel ItemMasterModel) 
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AutomobileProductSearchSales(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());                  
                    MModels.ItemCode = row["AutomobileItems"].ToString();                    
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
         
        public ActionResult ProductSearchSalesMobile(ItemMasterModel ItemMasterModel) 
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductSearchSalesMobile(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());                   
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();                  
                    MModels.IMEI_Number = row["IMEI_Number"].ToString();                  
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
        public JsonResult SalesInsertandUpdate(List<SalesInvoiceModel> SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[83];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "GarageName";
                tmpTable[78] = "GaragePhone";
                tmpTable[79] = "CustPhnNew";
                tmpTable[80] = "ChassisNo";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.GarageName = details.GarageName; 
                    obj.GaragePhone = details.GaragePhone;

                    obj.CustPhnNew = details.CustPhnNew;
                    obj.ChassisNo = details.ChassisNo;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;


                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                    obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                    obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                    obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                    obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                    obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                    obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                    obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                    obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3,
                    obj.TaxId4, obj.TaxId5,obj.CashAdvance, obj.GarageName, obj.GaragePhone,
                     obj.CustPhnNew,obj.ChassisNo,obj.Variable1,obj.Variable2);
                }

                dsDataSet = obj.SalesInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.CurrentDate = row["CurrentTime"].ToString();
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
        public JsonResult PressSalesInsertandUpdate(List<SalesInvoiceModel> SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[78];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "DesignRate";
                
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.DesignRate = details.DesignRate;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                    obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                    obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                    obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                    obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                    obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                    obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                    obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                    obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, obj.TaxId4, obj.TaxId5, obj.CashAdvance, obj.DesignRate);
                }

                dsDataSet = obj.PressSalesInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
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
        public JsonResult MobileSalesInsertandUpdate(List<SalesInvoiceModel> SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[77]; 
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber"; 
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "ImeiNo";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.ImeiNo = details.ImeiNo;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                    obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                    obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                    obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                    obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                    obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                    obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                    obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                    obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, obj.TaxId4, obj.TaxId5, obj.ImeiNo);
                }

                dsDataSet = obj.MobileSalesInsertandUpdate(dt, dbName);  
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
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
        public JsonResult UsedCarSalesInsertandUpdate(List<SalesInvoiceModel> SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[83];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "GarageName";
                tmpTable[78] = "GaragePhone";
                tmpTable[79] = "CustPhnNew";
                tmpTable[80] = "ChassisNo";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.GarageName = details.GarageName;
                    obj.GaragePhone = details.GaragePhone;

                    obj.CustPhnNew = details.CustPhnNew;
                    obj.ChassisNo = details.ChassisNo;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;


                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                    obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                    obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                    obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                    obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                    obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                    obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                    obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                    obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, 
                    obj.TaxId4, obj.TaxId5, obj.CashAdvance, obj.GarageName, obj.GaragePhone, obj.CustPhnNew, obj.ChassisNo, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.UsedCarSalesInsertandUpdate(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
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
        public ActionResult BillSeriesSalesReturnGetandGets(BillSeriesModel BillSeriesModel) //Get SerialNo For Sales Invoice
        {
            BillSeriesModel obj = new BillSeriesModel();

            List<BillSeriesModel> oList = new List<BillSeriesModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BillSeriesSalesReturnGetandGets(BillSeriesModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillSeriesModel MModels = new BillSeriesModel();
                    MModels.id = Convert.ToInt32(row["id"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillType = row["BillType"].ToString();
                    MModels.Prefix = row["Prefix"].ToString();
                    MModels.Terms = row["Terms"].ToString();
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
        public ActionResult BillOrderSeriesGetandGets(BillSeriesModel BillSeriesModel) //Get SerialNo For Sales Invoice
        {
            BillSeriesModel obj = new BillSeriesModel();

            List<BillSeriesModel> oList = new List<BillSeriesModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BillOrderSeriesGetandGets(BillSeriesModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillSeriesModel MModels = new BillSeriesModel();
                    MModels.id = Convert.ToInt32(row["id"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillType = row["BillType"].ToString();
                    MModels.Prefix = row["Prefix"].ToString();
                    MModels.Terms = row["Terms"].ToString();
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
        public ActionResult BillSeriesGetandGets(BillSeriesModel BillSeriesModel) //Get SerialNo For Sales Invoice
        {
            BillSeriesModel obj = new BillSeriesModel();

            List<BillSeriesModel> oList = new List<BillSeriesModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BillSeriesGetandGets(BillSeriesModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillSeriesModel MModels = new BillSeriesModel();
                    MModels.id = Convert.ToInt32(row["id"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillType = row["BillType"].ToString();
                    MModels.Prefix = row["Prefix"].ToString();
                    MModels.Terms = row["Terms"].ToString();
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
        public ActionResult SalesGetandGets(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesGetandGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.SalesMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.DepartmentName =   row["DepartmentName"].ToString(); 
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.SalesSubId = Convert.ToInt32(row["SalesSubId"].ToString());

                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
                    MModels.BillDiscount = Convert.ToDecimal(row["FcBillDiscount"].ToString());
                    MModels.FcBillDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.TotalCost = Convert.ToDecimal(row["TotalCost"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.SalesMan = row["SalesMan"].ToString();
                    MModels.UserName = row["UserName"].ToString();

                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.SOSubId = Convert.ToInt32(row["SoSubId"].ToString());
                    MModels.DOrdSubId = Convert.ToInt32(row["DoSubId"].ToString());
                    MModels.RoundGrandTotal = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.RoundFCGrandTotal = Convert.ToDecimal(row["RoundFCGrandTotal"].ToString());
                    MModels.Otherdescription = row["Otherdescription"].ToString();                
                    MModels.ImeiNo=  row["ImeiNo"].ToString();
                    MModels.HSNCode = row["hsncode"].ToString();
                    MModels.Width = Convert.ToDecimal(row["width"].ToString()); 
                    MModels.Length = Convert.ToDecimal(row["length"].ToString());
                    MModels.CashAdvance = Convert.ToDecimal(row["CashAdvance"].ToString());
                    MModels.DesignRate = Convert.ToDecimal(row["DesignRate"].ToString()); 
                    MModels.TrnNumber = row["TRNNumber"].ToString();   
                    MModels.PdtCashAdvance= Convert.ToDecimal(row["PdtCashAdvance"].ToString());  
                    MModels.LOTNo= row["LOTNo"].ToString();
                    MModels.PhoneNumber= row["PhoneNumber"].ToString();
                    MModels.ExcessAmt = Convert.ToDecimal(row["ExcessAmt"].ToString());
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString(); 
                    MModels.CreditLimit = Convert.ToDecimal(row["CreditLimit"].ToString()); 
                    MModels.CurrentDate = row["CurrentTime"].ToString();
                    MModels.Batch = row["Batch"].ToString(); 
                    MModels.GaragePhone=  row["GaragePhone"].ToString(); 
                    MModels.GarageName = row["GarageName"].ToString();
                    MModels.BelowCostFlag = Convert.ToInt32(row["BelowCostFlag"].ToString());
                    MModels.FractionQty = Convert.ToDecimal(row["FractionQty"].ToString());
                    MModels.CalcQty = Convert.ToDecimal(row["CalcQty"].ToString());
                    MModels.Deldate = row["Deldate"].ToString();
                    MModels.CustAccount= row["CustAccount"].ToString();
                    MModels.Email = row["Email"].ToString();
                    MModels.AgreementNo = row["AgreementNo"].ToString();
                    MModels.DoLPONumber = row["DoLPONumber"].ToString();
                    MModels.DPrice = row["DailyPrice"].ToString();
                    MModels.WPrice = row["WeeklyPrice"].ToString();
                    MModels.MPrice = row["MonthlyPrice"].ToString();
                    MModels.APrice = row["AnnualPrice"].ToString();
                    MModels.Sumtotqty = Convert.ToDecimal(row["IWeight"].ToString());
                    MModels.CustPhnNew = row["CustPhnNoNew"].ToString();
                    MModels.ChassisNo = row["ChassisNumber"].ToString();
                    MModels.Variable1 = row["ExportStatus"].ToString();              
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
        public ActionResult PackingHistoryGetandGets(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingHistoryGetandGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();

                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.DriverName = row["Driver"].ToString();                  
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.SalesMan = row["SalesMan"].ToString();
                    MModels.UserName = row["UserName"].ToString();
                    MModels.IssuedQty = row["IssuedQty"].ToString();
                    MModels.ScannedQty = row["ScannedQty"].ToString();
                    MModels.DriverName = row["driver"].ToString();
                    MModels.EnteredBy = row["EnteredBy"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.Model1 = row["Model1"].ToString();
                    MModels.Model2 = row["Model2"].ToString();
                    MModels.Model3 = row["Model3"].ToString();
                    MModels.Model4 = row["modelm1"].ToString();
                    MModels.Model5 = row["modelm2"].ToString();
                    MModels.Model6 = row["modelm3"].ToString();
                    MModels.Model7 = row["modelm4"].ToString();
                    MModels.Model8 = row["modelm5"].ToString();
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
        

         public ActionResult PackingHistoryCopyGets(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingHistoryCopyGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();

                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.DriverName = row["Driver"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.SalesMan = row["SalesMan"].ToString();
                    MModels.UserName = row["UserName"].ToString();
                    MModels.IssuedQty = row["IssuedQty"].ToString();
                    MModels.ScannedQty = row["ScannedQty"].ToString();
                    MModels.DriverName = row["driver"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PackingHistoryLTCopyGets(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingHistoryLTCopyGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();

                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.DriverName = row["Driver"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.Location = row["FLoc"].ToString();
                    MModels.LocnId = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.LocnName = row["TLoc"].ToString();
                    MModels.LocId= Convert.ToInt32(row["ToLocation"].ToString());                    
                    MModels.SalesMan = row["SalesMan"].ToString();
                    MModels.UserName = row["UserName"].ToString();
                    MModels.IssuedQty = row["IssuedQty"].ToString();
                    MModels.ScannedQty = row["ScannedQty"].ToString();
                    MModels.DriverName = row["driver"].ToString();
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult JobSearch(ProjectJobModel ProjectJobModel) 
        {
            ProjectJobModel obj = new ProjectJobModel();

            List<ProjectJobModel> oList = new List<ProjectJobModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.JobSearchSales(ProjectJobModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProjectJobModel MModels = new ProjectJobModel();
                    MModels.ProjectJobId = Convert.ToInt32(row["ProjectJobId"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.BOQ = row["BOQ"].ToString();
                    MModels.EstAmount = Convert.ToDecimal( row["EstAmount"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        public ActionResult GarageNameSearch(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GarageNameSearch(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.GarageName = row["GarageName"].ToString();
                    MModels.CustAddress = row["Address"].ToString();
                    MModels.GaragePhone = row["PhoneNumber"].ToString();
                    MModels.TrnNumber = row["TRNNumber"].ToString();
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

        public ActionResult SerialNoSearch(SalesInvoiceModel SalesInvoiceModel)    //Auto Complete SerialNo in Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SerialNoSearch(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.DepartmentName = row["DepartmentCode"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
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

        public ActionResult OpticalSerialNoSearch(SalesInvoiceModel SalesInvoiceModel)    //Auto Complete SerialNo in Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OpticalSerialNoSearch(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.DepartmentName = row["DepartmentCode"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
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

        public ActionResult DeliveryNoSearch(SalesInvoiceModel SalesInvoiceModel)    //Auto Complete SerialNo in Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeliveryNoSearch(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryNo"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BlSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["CurDate"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.PHDeptId = Convert.ToInt32(row["PHDeptId"].ToString());
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.DepartmentName = row["PHDepCode"].ToString();
                    MModels.Status = row["FlagType"].ToString();
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

        public ActionResult PackingHistoryView(SalesInvoiceModel SalesInvoiceModel)    //Auto Complete SerialNo in Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingHistoryView(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryNo"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BlSlNo = row["BillSlNo"].ToString();
                    MModels.InvDate = row["CurDate"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.PHDeptId = Convert.ToInt32(row["PHDeptId"].ToString());
                    MModels.DepartmentCode = row["DepartmentCode"].ToString();
                    MModels.DepartmentName = row["PHDepCode"].ToString();
                    MModels.Status = row["FlagType"].ToString();
                    MModels.EnteredBy = row["EnteredBy"].ToString();
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
        public ActionResult SalesGetandGetsCashCollection(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesGetandGetsCashCollection(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
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
        public ActionResult CustomerProductDetailsSearch(SalesInvoiceModel SalesInvoiceModel)   //Customer-Product Details Popup
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerProductDetailsSearch(SalesInvoiceModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Locationstock = row["Locationstock"].ToString();
                    MModels.Sumtotqty = Convert.ToDecimal(row["totqty"].ToString());
                    MModels.LPCost = Convert.ToDecimal(row["LPCost"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.LastSellingPrice = Convert.ToDecimal(row["LastSellingPrice"].ToString());
                    MModels.custstats = row["custstats"].ToString();
                    MModels.CustLastSellingPrice = Convert.ToDecimal(row["CustLastSellingPrice"].ToString());
                    MModels.IEMICount = Convert.ToInt32(row["iemistatus"].ToString());

                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.ProductCode = row["ItemCode"].ToString();
                    MModels.Condition = row["TransType"].ToString();   
                    

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
        public ActionResult CustomerDueDateChecking(SalesInvoiceModel SalesInvoiceModel)  
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerDueDateChecking(SalesInvoiceModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                   
                    MModels.BillSlNo = Convert.ToInt32(row["invono"].ToString());
                    MModels.InvDate = row["vdate"].ToString();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSerId"].ToString()); 
                    MModels.DueDate =   row["duedate"].ToString();
                    MModels.GrandTotal = Convert.ToDecimal(row["FCtotal"].ToString()); 
                    MModels.BillDescription=  row["BillDescription"].ToString(); 
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
        public ActionResult SalesTransGetandGets(SalesInvoiceModel SalesInvoiceModel)   //SalesTransactions Popup
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesTransGetandGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.GarageName = row["GarageName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.Location = row["LocationName"].ToString();
                    MModels.SalesMan = row["FirstName"].ToString();                    
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString()); 
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.DepartmentName = row["DepartmentName"].ToString(); 
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
        public ActionResult DeliveryOrderTransGetandGets(SalesInvoiceModel SalesInvoiceModel)   //SalesTransactions Popup
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeliveryOrderTransGetandGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.GarageName = row["GarageName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.Location = row["LocationName"].ToString();
                    MModels.SalesMan = row["FirstName"].ToString();
                    MModels.Amount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DepartmentId"].ToString());
                    MModels.DepartmentName = row["DepartmentName"].ToString();
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
        public ActionResult IMEISalesTransGetandGets(SalesInvoiceModel SalesInvoiceModel)   //SalesTransactions Popup
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IMEISalesTransGetandGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSlNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.ProdRate = Convert.ToDecimal(row["Price"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ImeiNo = row["IMEI_Number"].ToString();
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
        public ActionResult IMEISalesTransPopup(SalesInvoiceModel SalesInvoiceModel)   //SalesTransactions Popup
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.IMEISalesTransPopup(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.ProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.ImeiNo = row["ImeiNo"].ToString();
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
        public JsonResult CustomerEnquiryInsertandUpdate(List<CustomerEnquiryModel> CustomerEnquiryModel)
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();

            try
            {
                string[] tmpTable = new string[45];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "EnquiryNo";
                tmpTable[4] = "UnitId";
                tmpTable[5] = "UnitName";
                tmpTable[6] = "ProdQty";
                tmpTable[7] = "ProdRate";
                tmpTable[8] = "FcProdRate";
                tmpTable[9] = "ProdDisc";
                tmpTable[10] = "FcProdDisc";
                tmpTable[11] = "TaxableAmount";
                tmpTable[12] = "FCTaxableAmount";
                tmpTable[13] = "TaxId";
                tmpTable[14] = "TaxPercent";
                tmpTable[15] = "TaxAmount";
                tmpTable[16] = "FCTaxAmount";
                tmpTable[17] = "Amount";
                tmpTable[18] = "FCAmount";
                tmpTable[10] = "CustId";
                tmpTable[20] = "CustName";
                tmpTable[21] = "CustAddress";
                tmpTable[22] = "InvDate";
                tmpTable[23] = "SalesManId";
                tmpTable[24] = "AreaId";
                tmpTable[25] = "CurrencyId";
                tmpTable[26] = "CurrencyRate";
                tmpTable[27] = "GrandTotal";
                tmpTable[28] = "RoundGrandTotal";
                tmpTable[29] = "FCGrandTotal";
                tmpTable[30] = "RoundFCGrandTotal";
                tmpTable[31] = "TotalDiscount";
                tmpTable[32] = "FCTotalDiscount";
                tmpTable[33] = "TotalTaxable";
                tmpTable[34] = "FCTotTaxable";
                tmpTable[35] = "TotalTax";
                tmpTable[36] = "FCTotTax";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "DeptId";
                tmpTable[39] = "UserId";
                tmpTable[40] = "PhoneNumber";
                tmpTable[41] = "DocNumber";
                tmpTable[42] = "Subject";
                tmpTable[43] = "DelFlag";
                tmpTable[44] = "Location";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in CustomerEnquiryModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;

                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;

                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;

                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.PhoneNumber = details.PhoneNumber;
                    obj.DocNumber = details.DocNumber;
                    obj.Subject = details.Subject;
                    obj.DelFlag = details.DelFlag;
                    obj.Location = details.Location;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.EnquiryNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.CustId, obj.CustName, obj.CustAddress, obj.InvDate, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.PhoneNumber, obj.DocNumber, obj.Subject, obj.DelFlag, obj.Location);
                }

                dsDataSet = obj.CustomerEnquiryInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
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

        [HttpPost]
        public ActionResult CustomerEnquiryGetandGets(CustomerEnquiryModel CustomerEnquiryModel)   //Copy Customer Enquiry
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerEnquiryGetandGets(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());

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
        public ActionResult EnquiryNoSearch(CustomerEnquiryModel CustomerEnquiryModel)  //Get Serial No For Customer Enquiry
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EnquiryNoSearch(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString(); 
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
        public ActionResult QuotationEnquiryGets(CustomerEnquiryModel CustomerEnquiryModel)      //Get All The CustEnquiry List in Qtn Entry Form     
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEnquiryGets(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());

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
        public ActionResult QuotationEntryDelete(QuotationEntryModel QuotationEntryModel)
        {
            QuotationEntryModel obj = new QuotationEntryModel();

            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntryDelete(QuotationEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel SModels = new QuotationEntryModel();
                    SModels.QuotationNo= Convert.ToInt32(row["Status"].ToString());
                    SModels.Status = row["Status"].ToString();
                    oList.Add(SModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult QuotationEntryInsertandUpdate(List<QuotationEntryModel> QuotationEntryModel)
        {
            QuotationEntryModel obj = new QuotationEntryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();

            try
            {
                string[] tmpTable = new string[51];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "EnquiryNo";
                tmpTable[4] = "UnitId";
                tmpTable[5] = "UnitName";
                tmpTable[6] = "ProdQty";
                tmpTable[7] = "ProdRate";
                tmpTable[8] = "FcProdRate";
                tmpTable[9] = "ProdDisc";
                tmpTable[10] = "FcProdDisc";
                tmpTable[11] = "TaxableAmount";
                tmpTable[12] = "FCTaxableAmount";
                tmpTable[13] = "TaxId";
                tmpTable[14] = "TaxPercent";
                tmpTable[15] = "TaxAmount";
                tmpTable[16] = "FCTaxAmount";
                tmpTable[17] = "Amount";
                tmpTable[18] = "FCAmount";
                tmpTable[10] = "CustId";
                tmpTable[20] = "CustName";
                tmpTable[21] = "CustAddress";
                tmpTable[22] = "InvDate";
                tmpTable[23] = "SalesManId";
                tmpTable[24] = "AreaId";
                tmpTable[25] = "CurrencyId";
                tmpTable[26] = "CurrencyRate";
                tmpTable[27] = "GrandTotal";
                tmpTable[28] = "RoundGrandTotal";
                tmpTable[29] = "FCGrandTotal";
                tmpTable[30] = "RoundFCGrandTotal";
                tmpTable[31] = "TotalDiscount";
                tmpTable[32] = "FCTotalDiscount";
                tmpTable[33] = "TotalTaxable";
                tmpTable[34] = "FCTotTaxable";
                tmpTable[35] = "TotalTax";
                tmpTable[36] = "FCTotTax";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "DeptId";
                tmpTable[39] = "UserId";
                tmpTable[40] = "PhoneNumber";
                tmpTable[41] = "DocNumber";
                tmpTable[42] = "Subjects";
                tmpTable[43] = "QuotationCount";
                tmpTable[44] = "Attention";
                tmpTable[45] = "Location";
                tmpTable[46] = "QDays";
                tmpTable[47] = "QuotationNo";
                tmpTable[48] = "DelFlag";
                tmpTable[49] = "EnqSubId";
                tmpTable[50] = "EntryDate";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in QuotationEntryModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.PhoneNumber = details.PhoneNumber;
                    obj.DocNumber = details.DocNumber;
                    obj.Subjects = details.Subjects;
                    obj.QuotationCount = details.QuotationCount;
                    obj.Attention = details.Attention;
                    obj.Location = details.Location;
                    obj.QDays = details.QDays;
                    obj.QuotationNo = details.QuotationNo;
                    obj.DelFlag = details.DelFlag;
                    obj.EnqSubId = details.EnqSubId;
                    obj.EntryDate = details.EntryDate;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.EnquiryNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.CustId, obj.CustName, obj.CustAddress, obj.InvDate, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.PhoneNumber, obj.DocNumber, obj.Subjects,
                        obj.QuotationCount, obj.Attention, obj.Location, obj.QDays, obj.QuotationNo, obj.DelFlag, obj.EnqSubId, obj.EntryDate);
                }

                dsDataSet = obj.QuotationEntryInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
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
        public JsonResult QuotationEntryUpdate(List<QuotationEntryModel> QuotationEntryModel)
        {
            QuotationEntryModel obj = new QuotationEntryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();

            try
            {
                string[] tmpTable = new string[51];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "EnquiryNo";
                tmpTable[4] = "UnitId";
                tmpTable[5] = "UnitName";
                tmpTable[6] = "ProdQty";
                tmpTable[7] = "ProdRate";
                tmpTable[8] = "FcProdRate";
                tmpTable[9] = "ProdDisc";
                tmpTable[10] = "FcProdDisc";
                tmpTable[11] = "TaxableAmount";
                tmpTable[12] = "FCTaxableAmount";
                tmpTable[13] = "TaxId";
                tmpTable[14] = "TaxPercent";
                tmpTable[15] = "TaxAmount";
                tmpTable[16] = "FCTaxAmount";
                tmpTable[17] = "Amount";
                tmpTable[18] = "FCAmount";
                tmpTable[10] = "CustId";
                tmpTable[20] = "CustName";
                tmpTable[21] = "CustAddress";
                tmpTable[22] = "InvDate";
                tmpTable[23] = "SalesManId";
                tmpTable[24] = "AreaId";
                tmpTable[25] = "CurrencyId";
                tmpTable[26] = "CurrencyRate";
                tmpTable[27] = "GrandTotal";
                tmpTable[28] = "RoundGrandTotal";
                tmpTable[29] = "FCGrandTotal";
                tmpTable[30] = "RoundFCGrandTotal";
                tmpTable[31] = "TotalDiscount";
                tmpTable[32] = "FCTotalDiscount";
                tmpTable[33] = "TotalTaxable";
                tmpTable[34] = "FCTotTaxable";
                tmpTable[35] = "TotalTax";
                tmpTable[36] = "FCTotTax";
                tmpTable[37] = "Remarks";
                tmpTable[38] = "DeptId";
                tmpTable[39] = "UserId";
                tmpTable[40] = "PhoneNumber";
                tmpTable[41] = "DocNumber";
                tmpTable[42] = "Subjects";
                tmpTable[43] = "QuotationCount";
                tmpTable[44] = "Attention";
                tmpTable[45] = "Location";
                tmpTable[46] = "QDays";
                tmpTable[47] = "QuotationNo";
                tmpTable[48] = "DelFlag";
                tmpTable[49] = "EnqSubId";
                tmpTable[50] = "EntryDate";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in QuotationEntryModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.PhoneNumber = details.PhoneNumber;
                    obj.DocNumber = details.DocNumber;
                    obj.Subjects = details.Subjects;
                    obj.QuotationCount = details.QuotationCount;
                    obj.Attention = details.Attention;
                    obj.Location = details.Location;
                    obj.QDays = details.QDays;
                    obj.QuotationNo = details.QuotationNo;
                    obj.DelFlag = details.DelFlag;
                    obj.EnqSubId = details.EnqSubId;
                    obj.EntryDate = details.EntryDate;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.EnquiryNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.CustId, obj.CustName, obj.CustAddress, obj.InvDate, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.PhoneNumber, obj.DocNumber, obj.Subjects,
                        obj.QuotationCount, obj.Attention, obj.Location, obj.QDays, obj.QuotationNo, obj.DelFlag, obj.EnqSubId, obj.EntryDate);
                }

                dsDataSet = obj.QuotationEntryUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
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
        public ActionResult QuotationEntryGetandGets(QuotationEntryModel QuotationEntryModel)
        {
            QuotationEntryModel obj = new QuotationEntryModel();

            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntryGetandGets(QuotationEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.EnquiryNo = row["EnquiryNo"].ToString();
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subjects = row["Subjects"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Attention = row["Attention"].ToString();
                    MModels.QDays = row["QDays"].ToString();
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.QuotationCount = Convert.ToInt32(row["QuotationCount"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.Header=  row["QtnDate"].ToString();
                    MModels.BelowCostFlag = Convert.ToInt32(row["BelowCostFlag"].ToString());
                    MModels.EnqSubId = Convert.ToInt32(row["EnquirySubIds"].ToString());
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
        public ActionResult QuotationNoSearch(QuotationEntryModel QuotationEntryModel)          //Get Serial No For Quotation Entry
        {
            QuotationEntryModel obj = new QuotationEntryModel();

            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationNoSearch(QuotationEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.QuotationEntryMainId = Convert.ToInt32(row["QuotationEntryMainId"].ToString());
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString(); 
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
        public ActionResult CustomerEnquiryGetProducts(CustomerEnquiryModel CustomerEnquiryModel)          //In Qtn Entry,Get Product List against a Particular Customer
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerEnquiryGetProducts(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.CustEnquirySubId = Convert.ToInt32(row["CustEnquirySubId"].ToString());
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
        public ActionResult QuotationEntryRecall(QuotationEntryModel QuotationEntryModel)             //In Qtn Entry,Get Quotation Details in pop up
        {
            QuotationEntryModel obj = new QuotationEntryModel();

            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntryRecall(QuotationEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subjects = row["Subjects"].ToString();
                    MModels.Attention = row["Attention"].ToString();
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.QDays = row["QDays"].ToString();
                    MModels.QuotationCount = Convert.ToInt32(row["QuotationCount"].ToString());
                    MModels.QuotationEntryMainId = Convert.ToInt32(row["QuotationEntryMainId"].ToString());
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
        public ActionResult CustomerEnquiryGetandGetsQtn(CustomerEnquiryModel CustomerEnquiryModel)    //Get All CustEnq Details of an enqno in Qtn for setting enqflag
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerEnquiryGetandGetsQtn(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.CustEnquiryMainId = Convert.ToInt32(row["CustEnquiryMainId"].ToString());
                    MModels.CustEnquirySubId = Convert.ToInt32(row["CustEnquirySubId"].ToString());
                    MModels.TRNNumber = row["TRNNumber"].ToString();
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
        public JsonResult SalesOrderInsertandUpdate(List<SalesOrderModel> SalesOrderModel)
        {
            SalesOrderModel obj = new SalesOrderModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesOrderModel> oList = new List<SalesOrderModel>();

            try
            {
                string[] tmpTable = new string[59];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "OrderNo";
                tmpTable[4] = "UnitId";
                tmpTable[5] = "UnitName";
                tmpTable[6] = "ProdQty";
                tmpTable[7] = "ProdRate";
                tmpTable[8] = "FcProdRate";
                tmpTable[9] = "ProdDisc";
                tmpTable[10] = "FcProdDisc";
                tmpTable[11] = "TaxableAmount";
                tmpTable[12] = "FCTaxableAmount";
                tmpTable[13] = "TaxId";
                tmpTable[14] = "TaxPercent";
                tmpTable[15] = "TaxAmount";
                tmpTable[16] = "FCTaxAmount";
                tmpTable[17] = "Amount";
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "LocnId";
                tmpTable[20] = "BatchSNo";
                tmpTable[21] = "Batch";
                tmpTable[22] = "PayType";
                tmpTable[23] = "LPONumber";
                tmpTable[24] = "CustId";
                tmpTable[25] = "CustName";
                tmpTable[26] = "CustAddress";
                tmpTable[27] = "InvDate";
                tmpTable[28] = "InvTerms";
                tmpTable[29] = "ExpectedDate";
                tmpTable[30] = "LocId";
                tmpTable[31] = "SalesManId";
                tmpTable[32] = "AreaId";
                tmpTable[33] = "CurrencyId";
                tmpTable[34] = "CurrencyRate";
                tmpTable[35] = "JobNumber";
                tmpTable[36] = "GrandTotal";
                tmpTable[37] = "RoundGrandTotal";
                tmpTable[38] = "FCGrandTotal";
                tmpTable[39] = "RoundFCGrandTotal";
                tmpTable[40] = "TotalDiscount";
                tmpTable[41] = "FCTotalDiscount";
                tmpTable[42] = "TotalTaxable";
                tmpTable[43] = "FCTotTaxable";
                tmpTable[44] = "TotalTax";
                tmpTable[45] = "FCTotTax";
                tmpTable[46] = "Remarks";
                tmpTable[47] = "DeptId";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DelFlag";
                tmpTable[50] = "Attention";
                tmpTable[51] = "Subject";
                tmpTable[52] = "Comments";
                tmpTable[53] = "Delivery";
                tmpTable[54] = "QtnNo";
                tmpTable[55] = "EnqNo";
                tmpTable[56] = "SalesNo";
                tmpTable[57] = "BillSeriesId";
                tmpTable[58] = "QtnSubId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesOrderModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.OrderNo = details.OrderNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.ExpectedDate = details.ExpectedDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.Attention = details.Attention;
                    obj.Subject = details.Subject;
                    obj.Comments = details.Comments;
                    obj.Delivery = details.Delivery;
                    obj.QtnNo = details.QtnNo;
                    obj.EnqNo = details.EnqNo;
                    obj.SalesNo = details.SalesNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.QtnSubId = details.QtnSubId;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.OrderNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.ExpectedDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId,
                        obj.DelFlag, obj.Attention, obj.Subject, obj.Comments, obj.Delivery, obj.QtnNo, obj.EnqNo, obj.SalesNo, obj.BillSeriesId, obj.QtnSubId);
                }

                dsDataSet = obj.SalesOrderInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
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
        public ActionResult SalesOrderGetandGets(SalesOrderModel SalesOrderModel)
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderGetandGets(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.SalesOrderMainId = Convert.ToInt32(row["SalesOrderMainId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.SalesOrderSubId = Convert.ToInt32(row["SalesOrderSubId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.Attention = row["Attention"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.Comments = row["Comments"].ToString();
                    MModels.Delivery = row["Delivery"].ToString();
                    MModels.StartTime = row["StartTime"].ToString();
                    MModels.EndTime = row["EndTime"].ToString();
                    MModels.DesignRate = Convert.ToDecimal(row["DesignRate"].ToString());  
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
        public JsonResult SalesOrderPressInsertandUpdate(List<SalesOrderModel> SalesOrderModel)
        {
            SalesOrderModel obj = new SalesOrderModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesOrderModel> oList = new List<SalesOrderModel>();

            try
            {
                string[] tmpTable = new string[62];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "OrderNo";
                tmpTable[4] = "UnitId";
                tmpTable[5] = "UnitName";
                tmpTable[6] = "ProdQty";
                tmpTable[7] = "ProdRate";
                tmpTable[8] = "FcProdRate";
                tmpTable[9] = "ProdDisc";
                tmpTable[10] = "FcProdDisc";
                tmpTable[11] = "TaxableAmount";
                tmpTable[12] = "FCTaxableAmount";
                tmpTable[13] = "TaxId";
                tmpTable[14] = "TaxPercent";
                tmpTable[15] = "TaxAmount";
                tmpTable[16] = "FCTaxAmount";
                tmpTable[17] = "Amount";
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "LocnId";
                tmpTable[20] = "BatchSNo";
                tmpTable[21] = "Batch";
                tmpTable[22] = "PayType";
                tmpTable[23] = "LPONumber";
                tmpTable[24] = "CustId";
                tmpTable[25] = "CustName";
                tmpTable[26] = "CustAddress";
                tmpTable[27] = "InvDate";
                tmpTable[28] = "InvTerms";
                tmpTable[29] = "ExpectedDate";
                tmpTable[30] = "LocId";
                tmpTable[31] = "SalesManId";
                tmpTable[32] = "AreaId";
                tmpTable[33] = "CurrencyId";
                tmpTable[34] = "CurrencyRate";
                tmpTable[35] = "JobNumber";
                tmpTable[36] = "GrandTotal";
                tmpTable[37] = "RoundGrandTotal";
                tmpTable[38] = "FCGrandTotal";
                tmpTable[39] = "RoundFCGrandTotal";
                tmpTable[40] = "TotalDiscount";
                tmpTable[41] = "FCTotalDiscount";
                tmpTable[42] = "TotalTaxable";
                tmpTable[43] = "FCTotTaxable";
                tmpTable[44] = "TotalTax";
                tmpTable[45] = "FCTotTax";
                tmpTable[46] = "Remarks";
                tmpTable[47] = "DeptId";
                tmpTable[48] = "UserId";
                tmpTable[49] = "DelFlag";
                tmpTable[50] = "Attention";
                tmpTable[51] = "Subject";
                tmpTable[52] = "Comments";
                tmpTable[53] = "Delivery";
                tmpTable[54] = "QtnNo";
                tmpTable[55] = "EnqNo";
                tmpTable[56] = "SalesNo";
                tmpTable[57] = "BillSeriesId";
                tmpTable[58] = "QtnSubId";
                tmpTable[59] = "StartTime";
                tmpTable[60] = "EndTime";
                tmpTable[61] = "DesignRate";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesOrderModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.OrderNo = details.OrderNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.ExpectedDate = details.ExpectedDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.Attention = details.Attention;
                    obj.Subject = details.Subject;
                    obj.Comments = details.Comments;
                    obj.Delivery = details.Delivery;
                    obj.QtnNo = details.QtnNo;
                    obj.EnqNo = details.EnqNo;
                    obj.SalesNo = details.SalesNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.QtnSubId = details.QtnSubId;
                    obj.StartTime = details.StartTime;
                    obj.EndTime = details.EndTime;
                    obj.DesignRate = details.DesignRate;


                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.OrderNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.ExpectedDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId,
                        obj.DelFlag, obj.Attention, obj.Subject, obj.Comments, obj.Delivery, obj.QtnNo, obj.EnqNo, obj.SalesNo, obj.BillSeriesId, obj.QtnSubId,
                         obj.StartTime, obj.EndTime, obj.DesignRate);
                }

                dsDataSet = obj.SalesOrderPressInsertandUpdate(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
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
        public ActionResult QuotationGetRevision(QuotationEntryModel QuotationEntryModel)          //List Revision Details 
        {
            QuotationEntryModel obj = new QuotationEntryModel();

            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationGetRevision(QuotationEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subjects = row["Subjects"].ToString();
                    MModels.Attention = row["Attention"].ToString();
                    MModels.QDays = row["QDays"].ToString();
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.QuotationCount = Convert.ToInt32(row["QuotationCount"].ToString());
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
        public ActionResult OrderNoSearch(SalesOrderModel SalesOrderModel)          //Get Serial No For Sales Order
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OrderNoSearch(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
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
        public ActionResult QuotationEntryGetProducts(QuotationEntryModel QuotationEntryModel)          //In Qtn Entry,Get Product List against a Particular Customer
        {
            QuotationEntryModel obj = new QuotationEntryModel();

            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntryGetProducts(QuotationEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["BelowCostFlag"].ToString());                  
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
        public ActionResult SalesOrderRecall(SalesOrderModel SalesOrderModel)             //Sales Order Recall
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderRecall(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.SalesOrderMainId = Convert.ToInt32(row["SalesOrderMainId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.Location = row["LocationName"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.SalesMan = row["FirstName"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.Area = row["Name"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.Currency = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.Attention = row["Attention"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.Comments = row["Comments"].ToString();
                    MModels.Delivery = row["Delivery"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
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
        public ActionResult SalesOrderGetProducts(SalesOrderModel SalesOrderModel)          //In Qtn Entry,Get Product List against a Particular Customer
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderGetProducts(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
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
        public ActionResult SalesInvoiceRecall(SalesInvoiceModel SalesInvoiceModel)             //Sales Invoice Recall
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceRecall(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.Location = row["LocationName"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.SalesMan = row["FirstName"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["Name"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
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
        public ActionResult SalesInvoiceGetProducts(SalesInvoiceModel SalesInvoiceModel)          //Get Product List against a Particular Customer Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceGetProducts(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString()); 
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.TotalDiscount = Convert.ToDecimal(row["PdtCashAdvance"].ToString());
                    MModels.BillDiscount = Convert.ToDecimal(row["bildisc"].ToString());
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["BelowCostFlag"].ToString());
                    MModels.Sumtotqty = Convert.ToDecimal(row["IWeight"].ToString());
                    MModels.SalesSubId= Convert.ToInt32(row["SalesSubId"].ToString());
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
        public ActionResult SalesEnquiryGets(CustomerEnquiryModel CustomerEnquiryModel)      //Get All The CustEnquiry List in Sales Oder&Invoice      
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesEnquiryGets(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());

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
        public ActionResult CustomerEnquiryGetProductsSales(CustomerEnquiryModel CustomerEnquiryModel)          //In Sales Invoice&Order,Get Product List against a Particular Customer
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerEnquiryGetProductsSales(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();

                 
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["BelowCostFlag"].ToString()); 
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
        public ActionResult CustomerEnquiryGetandGetsSales(CustomerEnquiryModel CustomerEnquiryModel)    //Get All CustEnq Details of an enqno in Qtn for setting enqflag for Sales Invoice
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerEnquiryGetandGetsSales(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();

                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString(); 
                    MModels.BelowCostFlag = Convert.ToInt32(row["BelowCostFlag"].ToString());

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
        public ActionResult SalesOrderRecallSalesInv(SalesOrderModel SalesOrderModel)             //Sales Order Recall for Sales Invoice
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderRecallSalesInv(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.SalesOrderMainId = Convert.ToInt32(row["SalesOrderMainId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.Location = row["LocationName"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.SalesMan = row["FirstName"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.Area = row["Name"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.Currency = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.Attention = row["Attention"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.Comments = row["Comments"].ToString();
                    MModels.Delivery = row["Delivery"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
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
        public ActionResult SalesOrderGetandGetsSalesInv(SalesOrderModel SalesOrderModel)       //Get All Sales Order Details in Sales Invoice
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderGetandGetsSalesInv(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.SalesOrderMainId = Convert.ToInt32(row["SalesOrderMainId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.SalesOrderSubId = Convert.ToInt32(row["SalesOrderSubId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.Attention = row["Attention"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.Comments = row["Comments"].ToString();
                    MModels.Delivery = row["Delivery"].ToString();
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.DesignRate = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();

                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.BelowCostFlag = Convert.ToInt32(row["BelowCostFlag"].ToString());
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
        public ActionResult SalesOrderGetProductsSalesInv(SalesOrderModel SalesOrderModel)          //In Sales Order,Get Product List against a Particular Customer
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderGetProductsSalesInv(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.SalesOrderSubId = Convert.ToInt32(row["SalesOrderSubId"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["BelowCostFlag"].ToString());
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
        public ActionResult QuotationEntryRecallSalesOrder(QuotationEntryModel QuotationEntryModel)             //In Sales Order,Get Quotation Details in pop up (Check qty)
        {
            QuotationEntryModel obj = new QuotationEntryModel();

            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntryRecallSalesOrder(QuotationEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subjects = row["Subjects"].ToString();
                    MModels.Attention = row["Attention"].ToString();
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.QDays = row["QDays"].ToString();
                    MModels.QuotationCount = Convert.ToInt32(row["QuotationCount"].ToString());
                    MModels.QuotationEntryMainId = Convert.ToInt32(row["QuotationEntryMainId"].ToString());
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
        public ActionResult QuotationEntryGetandGetsSalesOrder(QuotationEntryModel QuotationEntryModel)
        {
            QuotationEntryModel obj = new QuotationEntryModel();

            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntryGetandGetsSalesOrder(QuotationEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.EnquiryNo = row["EnquiryNo"].ToString();
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subjects = row["Subjects"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.Attention = row["Attention"].ToString();
                    MModels.QDays = row["QDays"].ToString();
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.QuotationCount = Convert.ToInt32(row["QuotationCount"].ToString());
                    MModels.QuotationEntrySubId = Convert.ToInt32(row["QuotationEntrySubId"].ToString());
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
        public ActionResult QuotationEntryGetProductsSalesOrder(QuotationEntryModel QuotationEntryModel)          //In Qtn Entry,Get Product List against a Particular Customer
        {
            QuotationEntryModel obj = new QuotationEntryModel();

            List<QuotationEntryModel> oList = new List<QuotationEntryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntryGetProductsSalesOrder(QuotationEntryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    QuotationEntryModel MModels = new QuotationEntryModel();
                    MModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.QuotationEntrySubId = Convert.ToInt32(row["QuotationEntrySubId"].ToString());
                  
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                   
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
        public JsonResult DeliveryOrderInsertandUpdate(List<DeliveryOrderModel> DeliveryOrderModel)
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();

            try
            {
                string[] tmpTable = new string[54];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "DeliveryOrderNo";
                tmpTable[4] = "UnitId";
                tmpTable[5] = "UnitName";
                tmpTable[6] = "ProdQty";
                tmpTable[7] = "ProdRate";
                tmpTable[8] = "FcProdRate";
                tmpTable[9] = "ProdDisc";
                tmpTable[10] = "FcProdDisc";
                tmpTable[11] = "TaxableAmount";
                tmpTable[12] = "FCTaxableAmount";
                tmpTable[13] = "TaxId";
                tmpTable[14] = "TaxPercent";
                tmpTable[15] = "TaxAmount";
                tmpTable[16] = "FCTaxAmount";
                tmpTable[17] = "Amount";
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "LocnId";
                tmpTable[20] = "PayType";
                tmpTable[21] = "LPONumber";
                tmpTable[22] = "CustId";
                tmpTable[23] = "CustName";
                tmpTable[24] = "CustAddress";
                tmpTable[25] = "InvDate";
                tmpTable[26] = "VehicleId";
                tmpTable[27] = "ExpectedDate";
                tmpTable[28] = "LocId";
                tmpTable[29] = "SalesManId";
                tmpTable[30] = "AreaId";
                tmpTable[31] = "CurrencyId";
                tmpTable[32] = "CurrencyRate";
                tmpTable[33] = "DriverId";
                tmpTable[34] = "GrandTotal";
                tmpTable[35] = "RoundGrandTotal";
                tmpTable[36] = "FCGrandTotal";
                tmpTable[37] = "RoundFCGrandTotal";
                tmpTable[38] = "TotalDiscount";
                tmpTable[39] = "FCTotalDiscount";
                tmpTable[40] = "TotalTaxable";
                tmpTable[41] = "FCTotTaxable";
                tmpTable[42] = "TotalTax";
                tmpTable[43] = "FCTotTax";
                tmpTable[44] = "Remarks";
                tmpTable[45] = "DeptId";
                tmpTable[46] = "UserId";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "QtnNo";
                tmpTable[49] = "OrderNo";
                tmpTable[50] = "SalesNo";
                tmpTable[51] = "BillSeriesId";
                tmpTable[52] = "SaleSubId";
                tmpTable[53] = "SordSubId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in DeliveryOrderModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.VehicleId = details.VehicleId;
                    obj.ExpectedDate = details.ExpectedDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.DriverId = details.DriverId;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.QtnNo = details.QtnNo;
                    obj.OrderNo = details.OrderNo;
                    obj.SalesNo = details.SalesNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.SaleSubId = details.SaleSubId;
                    obj.SordSubId = details.SordSubId;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.DeliveryOrderNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.VehicleId, obj.ExpectedDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.DriverId, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId,
                        obj.DelFlag, obj.QtnNo, obj.OrderNo, obj.SalesNo, obj.BillSeriesId, obj.SaleSubId, obj.SordSubId);
                }

                dsDataSet = obj.DeliveryOrderInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());

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
        public ActionResult DeliveryOrderGetandGets(DeliveryOrderModel DeliveryOrderModel)
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();

            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeliveryOrderGetandGets(DeliveryOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.DeliveryOrderMainId = Convert.ToInt32(row["DeliveryOrderMainId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.VehicleId = Convert.ToInt32(row["VehicleId"].ToString());
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.DriverId = Convert.ToInt32(row["DriverId"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.SalesOrderSubId = Convert.ToInt32(row["sordsubid"].ToString());
                    MModels.SaleSubId = row["SaleSubId"].ToString();
                    MModels.BillSeriesId = Convert.ToInt32(row["SalesSereiesNo"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["SalesNo"].ToString());  
                    MModels.BelowCostFlag = Convert.ToInt32(row["Deliveryqtysinv"].ToString()); 
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
        public ActionResult DeliveryOrderNoSearch(DeliveryOrderModel DeliveryOrderModel)          //Get Serial No For Sales Order
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();

            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeliveryOrderNoSearch(DeliveryOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString(); 
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
        public ActionResult SalesOrderRecallDeliveryOrder(SalesOrderModel SalesOrderModel)             //Sales Order load for Delivery Order Transfer 
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderRecallDeliveryOrder(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.SalesOrderMainId = Convert.ToInt32(row["SalesOrderMainId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.Location = row["LocationName"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.SalesMan = row["FirstName"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.Area = row["Name"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.Currency = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.Attention = row["Attention"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.Comments = row["Comments"].ToString();
                    MModels.Delivery = row["Delivery"].ToString();
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
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
        public ActionResult SalesOrderGetandGetsDeliveryOrder(SalesOrderModel SalesOrderModel)       //SalesOrderLoad when custid=0 in delivery order
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderGetandGetsDeliveryOrder(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.SalesOrderMainId = Convert.ToInt32(row["SalesOrderMainId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.SalesOrderSubId = Convert.ToInt32(row["SalesOrderSubId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.Attention = row["Attention"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.Comments = row["Comments"].ToString();
                    MModels.Delivery = row["Delivery"].ToString();
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
        public ActionResult SalesOrderGetProductsDeliveryOrder(SalesOrderModel SalesOrderModel)          //In Delivery Order,Get Product List against a Particular Customer
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderGetProductsDeliveryOrder(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel MModels = new SalesOrderModel();
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.SalesOrderSubId = Convert.ToInt32(row["SalesOrderSubId"].ToString());
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
        public ActionResult SalesInvoiceRecallDeliveryOrder(SalesInvoiceModel SalesInvoiceModel)             //Sales Invoice Load in deliveryorder
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceRecallDeliveryOrder(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.Location = row["LocationName"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.SalesMan = row["FirstName"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["Name"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
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
        public ActionResult SalesGetandGetsDeliveryOrder(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesGetandGetsDeliveryOrder(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.SalesMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.SalesSubId = Convert.ToInt32(row["SalesSubId"].ToString());

                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());

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
        public ActionResult SalesInvoiceGetProductsDeliveryOrder(SalesInvoiceModel SalesInvoiceModel)          //Get Product List against a Particular Customer Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceGetProductsDeliveryOrder(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.SalesSubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.LOTNo = row["Model2"].ToString(); 


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
        public ActionResult DeliveryOrderRecallSalesInv(DeliveryOrderModel DeliveryOrderModel)
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();

            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeliveryOrderRecallSalesInv(DeliveryOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.DeliveryOrderMainId = Convert.ToInt32(row["DeliveryOrderMainId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.SalesMan = row["FirstName"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.Area = row["Name"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.Currency = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.JobCode = row["Deldate"].ToString();
                    MModels.Attention = row["DoLPONumber"].ToString();
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
        public ActionResult DeliveryOrderGetandGetsSalesInv(DeliveryOrderModel DeliveryOrderModel)  //  deliveryorderLoad when custid=0 in sales Invoice
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();

            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeliveryOrderGetandGetsSalesInv(DeliveryOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.DeliveryOrderMainId = Convert.ToInt32(row["DeliveryOrderMainId"].ToString());
                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.DeliveryOrderSubId = Convert.ToInt32(row["DeliveryOrderSubId"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();

                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.BelowCostFlag = Convert.ToInt32(row["BelowCostFlag"].ToString()); 
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
        public ActionResult DeliveryOrderGetProductsSalesInv(DeliveryOrderModel DeliveryOrderModel)          //In Sales Order,Get Product List against a Particular Customer
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();

            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeliveryOrderGetProductsSalesInv(DeliveryOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.DeliveryOrderSubId = Convert.ToInt32(row["DeliveryOrderSubId"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["BelowCostFlag"].ToString());
                    MModels.InvDate = row["Deldate"].ToString();
                    MModels.LPONumber = row["DoLPONumber"].ToString();
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
        public ActionResult CustomerSearchPopuPEnqSales(CustomerEnquiryModel CustomerEnquiryModel)      //Get All The CustEnquiry List in Sales Oder&Invoice - Search   
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerSearchPopuPEnqSales(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.Salesman = row["Salesman"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["AreaName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.DocNumber = row["DocNumber"].ToString();
                    MModels.Subject = row["Subject"].ToString();
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());

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
        public ActionResult SearchCustomerEnquiryProductsInSales(CustomerEnquiryModel CustomerEnquiryModel)           //In Sales Invoice&Order,Get Product List against a Particular Customer By Search
        {
            CustomerEnquiryModel obj = new CustomerEnquiryModel();

            List<CustomerEnquiryModel> oList = new List<CustomerEnquiryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SearchCustomerEnquiryProductsInSales(CustomerEnquiryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CustomerEnquiryModel MModels = new CustomerEnquiryModel();
                    MModels.EnquiryNo = Convert.ToInt32(row["EnquiryNo"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
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
        public ActionResult GetQuantitybyLocation(SalesInvoiceModel SalesInvoiceModel)           //In Sales Invoice,Get Product Stock Qty By location
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetQuantitybyLocation(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.stocktotloseqty = Convert.ToDecimal(row["Stock_TotLoseQty"].ToString());
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
        public JsonResult SalesReturnInsertandUpdate(List<SalesReturnModel> SalesReturnModel)
        {
            SalesReturnModel obj = new SalesReturnModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesReturnModel> oList = new List<SalesReturnModel>();

            try
            {
                string[] tmpTable = new string[72];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeries";
                tmpTable[4] = "ReturnNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "BillDiscount";
                tmpTable[52] = "AverageCost";
                tmpTable[53] = "TotalCost";
                tmpTable[54] = "BillSlNo";
                tmpTable[55] = "BillSeriesId";
                tmpTable[56] = "Taxable0";
                tmpTable[57] = "Tax0";
                tmpTable[58] = "Taxable5";
                tmpTable[59] = "Tax5";
                tmpTable[60] = "Taxable12";
                tmpTable[61] = "Tax12";
                tmpTable[62] = "Taxable18";
                tmpTable[63] = "Tax18";
                tmpTable[64] = "Taxable28";
                tmpTable[65] = "Tax28";
                tmpTable[66] = "TaxId1";
                tmpTable[67] = "TaxId2";
                tmpTable[68] = "TaxId3";
                tmpTable[69] = "TaxId4";
                tmpTable[70] = "TaxId5";
                tmpTable[71] = "Salesubid";
                
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesReturnModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeries = details.BillSeries;
                    obj.ReturnNo = details.ReturnNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.BillSlNo = details.BillSlNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.Salesubid = details.Salesubid;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeries, obj.ReturnNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag,
                        obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.BillSlNo, obj.BillSeriesId, obj.Taxable0,
                        obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, obj.TaxId4, obj.TaxId5, obj.Salesubid);
                }

                dsDataSet = obj.SalesReturnInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel MModels = new SalesReturnModel();
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
        public JsonResult SalesReturnMobileInsertandUpdate(List<SalesReturnModel> SalesReturnModel) 
        {
            SalesReturnModel obj = new SalesReturnModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesReturnModel> oList = new List<SalesReturnModel>();

            try
            {
                string[] tmpTable = new string[72];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeries";
                tmpTable[4] = "ReturnNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "BillDiscount";
                tmpTable[52] = "AverageCost";
                tmpTable[53] = "TotalCost";
                tmpTable[54] = "BillSlNo";
                tmpTable[55] = "BillSeriesId";
                tmpTable[56] = "Taxable0";
                tmpTable[57] = "Tax0";
                tmpTable[58] = "Taxable5";
                tmpTable[59] = "Tax5";
                tmpTable[60] = "Taxable12";
                tmpTable[61] = "Tax12";
                tmpTable[62] = "Taxable18";
                tmpTable[63] = "Tax18";
                tmpTable[64] = "Taxable28";
                tmpTable[65] = "Tax28";
                tmpTable[66] = "TaxId1";
                tmpTable[67] = "TaxId2";
                tmpTable[68] = "TaxId3";
                tmpTable[69] = "TaxId4";
                tmpTable[70] = "TaxId5";
                tmpTable[71] = "IMEINO"; 
                
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesReturnModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeries = details.BillSeries;
                    obj.ReturnNo = details.ReturnNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.BillSlNo = details.BillSlNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.IMEINO = details.IMEINO;  
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeries, obj.ReturnNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag,
                        obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.BillSlNo, obj.BillSeriesId, obj.Taxable0,
                        obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, obj.TaxId4, obj.TaxId5, obj.IMEINO);
                }

                dsDataSet = obj.SalesReturnMobileInsertandUpdate(dt, dbName);  
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel MModels = new SalesReturnModel();
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
       
        public ActionResult SalesReturnGetandGets(SalesReturnModel SalesReturnModel)
        {
            SalesReturnModel obj = new SalesReturnModel();

            List<SalesReturnModel> oList = new List<SalesReturnModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesReturnGetandGets(SalesReturnModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel MModels = new SalesReturnModel();
                    //MModels.SalesreturnMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.BillSeries = Convert.ToInt32(row["BillSeries"].ToString());
                    MModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.User = row["UserName"].ToString();  

                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
                    MModels.BillDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.TotalCost = Convert.ToDecimal(row["TotalCost"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.IMEINO = row["IMEINO"].ToString();
                    MModels.Otherdescription = row["Otherdescription"].ToString();
                    MModels.TRNNumber = row["TRNNumber"].ToString();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillNo"].ToString());
                    MModels.SalesSubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.DepartmentName = row["DepartmentCode"].ToString();
                    MModels.RoundGrandTotal = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.RoundFCGrandTotal = Convert.ToDecimal(row["RoundFCGrandTotal"].ToString());

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
        public ActionResult ReturnNoSearch(SalesReturnModel SalesReturnModel)    //Auto Complete SerialNo in Sales Invoice
        {
            SalesReturnModel obj = new SalesReturnModel();

            List<SalesReturnModel> oList = new List<SalesReturnModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ReturnNoSearch(SalesReturnModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel MModels = new SalesReturnModel();
                    MModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
                    MModels.BillSeries = Convert.ToInt32(row["BillSeries"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString(); 
                    MModels.DepartmentName = row["DepartmentCode"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString()); 
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
        public ActionResult ProductDetailsSearchSalesInvoice(ItemMasterModel ItemMasterModel)    //Search In MultipleProductList
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductDetailsSearchSalesInvoice(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.VatPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.stocktotloseqty = Convert.ToDecimal(row["Stock_TotLoseQty"].ToString());
                    MModels.TotQty = Convert.ToDecimal(row["Stock_Qty"].ToString()); 
                    //MModels.GrpName = row["GrpName"].ToString();
                    //MModels.SbgrpId = Convert.ToInt32(row["SubGroupId"].ToString());
                    //MModels.SbgrpName = row["SbgrpName"].ToString();
                    //MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    //MModels.CategoryName = row["CategoryName"].ToString();
                    //MModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    //MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.OpeningQty = Convert.ToDecimal(row["Stock_OpeningQty"].ToString());
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.MultiPriceId = Convert.ToInt32(row["BelowCostFlag"].ToString());
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
        public ActionResult DriverGetandGets(EmployeeModel EmployeeModel)
        {
            EmployeeModel obj = new EmployeeModel();

            List<EmployeeModel> oList = new List<EmployeeModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DriverGetandGets(EmployeeModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    EmployeeModel LModels = new EmployeeModel();
                    LModels.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    LModels.EmpCode = row["EmpCode"].ToString();
                    LModels.Name = row["Name"].ToString();
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
        public ActionResult SalesInvoiceCancel(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceCancel(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.Status = row["Status"].ToString();
                    oList.Add(SModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SalesInvoiceRentCarDelete(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceRentCarDelete(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.Status = row["Status"].ToString();
                    oList.Add(SModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SalesInvoiceUpdate(List<SalesInvoiceModel> SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[83];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "GarageName";
                tmpTable[78] = "GaragePhone";
                tmpTable[79] = "CustPhnNew";
                tmpTable[80] = "ChassisNo";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.GarageName = details.GarageName;
                    obj.GaragePhone = details.GaragePhone;

                    obj.CustPhnNew = details.CustPhnNew;
                    obj.ChassisNo = details.ChassisNo;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;


                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                        obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                        obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, 
                        obj.TaxId4, obj.TaxId5,obj.CashAdvance, obj.GarageName, obj.GaragePhone, obj.CustPhnNew, obj.ChassisNo, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.SalesInvoiceUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.CurrentDate = row["CurrentTime"].ToString();
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
        public JsonResult SalesInvoiceRentCarUpdate(List<SalesInvoiceModel> SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[83];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "GarageName";
                tmpTable[78] = "GaragePhone";
                tmpTable[79] = "Email";
                tmpTable[80] = "AgreementNo";
                tmpTable[81] = "FractionQty";
                tmpTable[82] = "CalcQty";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.GarageName = details.GarageName;
                    obj.GaragePhone = details.GaragePhone;
                    obj.Email = details.Email;
                    obj.AgreementNo = details.AgreementNo;
                    obj.FractionQty = details.FractionQty;
                    obj.CalcQty = details.CalcQty;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                        obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                        obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3,
                        obj.TaxId4, obj.TaxId5, obj.CashAdvance, obj.GarageName, obj.GaragePhone, obj.Email, obj.AgreementNo, obj.FractionQty, obj.CalcQty);
                }

                dsDataSet = obj.SalesInvoiceRentCarUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.CurrentDate = row["CurrentTime"].ToString();
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
        public JsonResult PressSalesInvoiceUpdate(List<SalesInvoiceModel> SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[78];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "DesignRate";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.DesignRate = details.DesignRate;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                        obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                        obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, obj.TaxId4, obj.TaxId5, obj.CashAdvance, obj.DesignRate);
                }

                dsDataSet = obj.PressSalesInvoiceUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
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
        public JsonResult TemporarySalesInsertandUpdate(List<SalesInvoiceModel> SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[83];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "GarageName";
                tmpTable[78] = "GaragePhone";
                tmpTable[79] = "CustPhnNew";
                tmpTable[80] = "ChassisNo";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.GarageName = details.GarageName;
                    obj.GaragePhone = details.GaragePhone;

                    obj.CustPhnNew = details.CustPhnNew;
                    obj.ChassisNo = details.ChassisNo;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                    obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                    obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                    obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                    obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                    obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                    obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                    obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                    obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, 
                    obj.TaxId4, obj.TaxId5, obj.CashAdvance, obj.GarageName, obj.GaragePhone, obj.CustPhnNew, obj.ChassisNo, obj.Variable1, obj.Variable2); 
                }

                dsDataSet = obj.TemporarySalesInsertandUpdate(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
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
        public JsonResult UsedCarSalesInvoiceUpdate(List<SalesInvoiceModel> SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[83];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "GarageName";
                tmpTable[78] = "GaragePhone";
                tmpTable[79] = "CustPhnNew";
                tmpTable[80] = "ChassisNo";
                tmpTable[81] = "Variable1";
                tmpTable[82] = "Variable2";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.GarageName = details.GarageName;
                    obj.GaragePhone = details.GaragePhone;

                    obj.CustPhnNew = details.CustPhnNew;
                    obj.ChassisNo = details.ChassisNo;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                        obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                        obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, 
                        obj.TaxId4, obj.TaxId5, obj.CashAdvance, obj.GarageName, obj.GaragePhone, obj.CustPhnNew, obj.ChassisNo, obj.Variable1, obj.Variable2); 
                }

                dsDataSet = obj.UsedCarSalesInvoiceUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
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
        public JsonResult OrderBouncingInsert(List<SalesInvoiceModel> SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[10];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";                
                tmpTable[3] = "Remarks";
                tmpTable[4] = "ProdQty";
                tmpTable[5] = "UserId";
                tmpTable[6] = "DeptId";
                tmpTable[7] = "Location";
                tmpTable[8] = "CustId";
                tmpTable[9] = "CustName"; 
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.Remarks = details.Remarks;
                    obj.ProdQty = details.ProdQty; 
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.Location = details.Location;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                   
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, 
                        obj.Remarks, obj.ProdQty, obj.UserId, obj.DeptId, obj.Location, obj.CustId, obj.CustName);
                }

                dsDataSet = obj.OrderBouncingInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
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
        public ActionResult PrevoiusUnsavedProductofCustomer(SalesInvoiceModel SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PrevoiusUnsavedProductofCustomer(SalesInvoiceModel, dbName);  
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                  
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustName"].ToString();                    
                    MModels.CurrencyId = Convert.ToInt32(row["CurncyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurncyRate"].ToString());                                                                                         
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());                
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                  //   MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
                  //  MModels.BillDiscount = Convert.ToDecimal(row["FcBillDiscount"].ToString());
                  //  MModels.FcBillDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                  //  MModels.TotalCost = Convert.ToDecimal(row["TotalCost"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    //MModels.LocnName = row["LocationName"].ToString();
                    //MModels.SalesMan = row["SalesMan"].ToString();
                    //MModels.UserName = row["UserName"].ToString();

                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.SOSubId = Convert.ToInt32(row["SoSubId"].ToString());
                    MModels.DOrdSubId = Convert.ToInt32(row["DoSubId"].ToString());
                    //MModels.RoundGrandTotal = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    //MModels.RoundFCGrandTotal = Convert.ToDecimal(row["RoundFCGrandTotal"].ToString());
                    MModels.Otherdescription = row["Otherdescription"].ToString();

                   
                    MModels.LOTNo = row["LOTNo"].ToString();
                    //MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.stocktotloseqty = Convert.ToDecimal(row["Stock_Qty"].ToString());
                    MModels.PdtCashAdvance = Convert.ToDecimal(row["PdtCashAdvance"].ToString());

                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["BelowCostFlag"].ToString()); 

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
        public ActionResult TemporarySalesDelete(SalesInvoiceModel SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TemporarySalesDelete(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();

                    MModels.Status =row["Status"].ToString();
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

        public ActionResult ItemCodeSearchSales(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemCodeSearchSales(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
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
        public ActionResult AutoMobileProductDetailsSearch(ItemMasterModel ItemMasterModel)    //Search In MultipleProductList
        {
            ItemMasterModel obj = new ItemMasterModel(); 

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AutoMobileProductDetailsSearch(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.VatPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.stocktotloseqty = Convert.ToDecimal(row["Stock_TotLoseQty"].ToString());
                    MModels.TotQty = Convert.ToDecimal(row["Stock_Qty"].ToString());                   
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString()); 
                    MModels.OpeningQty = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.MultiPriceId = Convert.ToInt32(row["BelowCostFlag"].ToString());
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
        public ActionResult SalesInvoiceRecallSalesreturn(SalesInvoiceModel SalesInvoiceModel)             //Sales Invoice get for Sales Return
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceRecallSalesreturn(SalesInvoiceModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.Location = row["LocationName"].ToString();
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.SalesMan = row["FirstName"].ToString();
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.AreaName = row["Name"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
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
        public ActionResult SalesGetandGetsSalesretun(SalesInvoiceModel SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesGetandGetsSalesretun(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.SalesMainId = Convert.ToInt32(row["SalesMainId"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.InvTerms = row["InvTerms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    MModels.TotalDiscount = Convert.ToDecimal(row["FCTotalDiscount"].ToString());
                    MModels.FCTotalDiscount = Convert.ToDecimal(row["TotalDiscount"].ToString());
                    MModels.TotalTaxable = Convert.ToDecimal(row["FCTotTaxable"].ToString());
                    MModels.FCTotTaxable = Convert.ToDecimal(row["TotalTaxable"].ToString());
                    MModels.TotalTax = Convert.ToDecimal(row["FCTotTax"].ToString());
                    MModels.FCTotTax = Convert.ToDecimal(row["TotalTax"].ToString());
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.DepartmentName = row["DepartmentName"].ToString();
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.SalesSubId = Convert.ToInt32(row["SalesSubId"].ToString());

                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.JobNumber = Convert.ToInt32(row["JobNumber"].ToString());
                    MModels.BillDiscount = Convert.ToDecimal(row["FcBillDiscount"].ToString());
                    MModels.FcBillDiscount = Convert.ToDecimal(row["BillDiscount"].ToString());
                    MModels.TotalCost = Convert.ToDecimal(row["TotalCost"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.SalesMan = row["SalesMan"].ToString();
                    MModels.UserName = row["UserName"].ToString();

                    MModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString());
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.SOSubId = Convert.ToInt32(row["SoSubId"].ToString());
                    MModels.DOrdSubId = Convert.ToInt32(row["DoSubId"].ToString());
                    MModels.RoundGrandTotal = Convert.ToDecimal(row["RoundGrandTotal"].ToString());
                    MModels.RoundFCGrandTotal = Convert.ToDecimal(row["RoundFCGrandTotal"].ToString());
                    MModels.Otherdescription = row["Otherdescription"].ToString();

                    MModels.ImeiNo = row["ImeiNo"].ToString();
                    MModels.HSNCode = row["hsncode"].ToString();
                    MModels.Width = Convert.ToDecimal(row["width"].ToString());
                    MModels.Length = Convert.ToDecimal(row["length"].ToString());
                    MModels.CashAdvance = Convert.ToDecimal(row["CashAdvance"].ToString());
                    MModels.DesignRate = Convert.ToDecimal(row["DesignRate"].ToString());
                    MModels.TrnNumber = row["TRNNumber"].ToString();
                    MModels.PdtCashAdvance = Convert.ToDecimal(row["PdtCashAdvance"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.PhoneNumber = row["PhoneNumber"].ToString();
                    MModels.ExcessAmt = Convert.ToDecimal(row["ExcessAmt"].ToString());

                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.CreditLimit = Convert.ToDecimal(row["CreditLimit"].ToString()); 
                    MModels.Status = row["Status"].ToString();   
                    oList.Add(MModels);

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
        public ActionResult SalesInvoiceGetProductsSalesReturn(SalesInvoiceModel SalesInvoiceModel)          //Get Product List against a Particular Customer Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceGetProductsSalesReturn(SalesInvoiceModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString(); 
                    MModels.TotalDiscount = Convert.ToDecimal(row["PdtCashAdvance"].ToString());
                    MModels.BillDiscount = Convert.ToDecimal(row["bildisc"].ToString()); 
                    MModels.SalesSubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.BatchSNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    MModels.mrp = Convert.ToDecimal(row["MrpRate"].ToString());

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
        public ActionResult OpticalSalesInvoiceGetProducts(SalesInvoiceModel SalesInvoiceModel)          //Get Product List against a Particular Customer Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OpticalSalesInvoiceGetProducts(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    // MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["FcProdRate"].ToString());
                    MModels.FcProdRate = Convert.ToDecimal(row["ProdRate"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.FcProdDisc = Convert.ToDecimal(row["ProdDisc"].ToString());
                    MModels.TaxId = Convert.ToInt32(row["TaxId"].ToString());
                    MModels.TaxPercent = Convert.ToDecimal(row["TaxPercent"].ToString());
                    MModels.TaxableAmount = Convert.ToDecimal(row["FCTaxableAmount"].ToString());
                    MModels.FCTaxableAmount = Convert.ToDecimal(row["TaxableAmount"].ToString());
                    MModels.ProdDisc = Convert.ToDecimal(row["FcProdDisc"].ToString());
                    MModels.TaxAmount = Convert.ToDecimal(row["FCTaxAmount"].ToString());
                    MModels.FCTaxAmount = Convert.ToDecimal(row["TaxAmount"].ToString());
                    MModels.Amount = Convert.ToDecimal(row["FCAmount"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["Amount"].ToString());
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    //MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    // MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.TotalDiscount = Convert.ToDecimal(row["PdtCashAdvance"].ToString());
                    // MModels.BillDiscount = Convert.ToDecimal(row["bildisc"].ToString());
                    MModels.SalesSubId = Convert.ToInt32(row["SalesSubId"].ToString());
                    MModels.BatchSNo = Convert.ToInt32(row["BatchSNo"].ToString());
                    MModels.Batch = row["Batch"].ToString();
                    MModels.Expiry = row["Expiry"].ToString();
                    // MModels.mrp = Convert.ToDecimal(row["MrpRate"].ToString());

                    //Patient Details
                    MModels.CustName = row["CustoName"].ToString();
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

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SalesReturnCancel(SalesReturnModel SalesReturnModel) 
        {
            SalesReturnModel obj = new SalesReturnModel();

            List<SalesReturnModel> oList = new List<SalesReturnModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesReturnCancel(SalesReturnModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel SModels = new SalesReturnModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.Status = row["Status"].ToString();
                    oList.Add(SModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult PH_Dashboard(SalesReturnModel SalesReturnModel)
        {
            SalesReturnModel obj = new SalesReturnModel();

            List<SalesReturnModel> oList = new List<SalesReturnModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PH_Dashboard(SalesReturnModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel SModels = new SalesReturnModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.Department = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.Print = row["Print"].ToString();
                    oList.Add(SModels);
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
        public ActionResult ItemwiseDashboard(SalesReturnModel SalesReturnModel)
        {
            SalesReturnModel obj = new SalesReturnModel();

            List<SalesReturnModel> oList = new List<SalesReturnModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemwiseDashboard(SalesReturnModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel SModels = new SalesReturnModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.SalesMan = row["SalesMan"].ToString();
                    SModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    SModels.ProductCode = row["ProductCode"].ToString();
                    SModels.ProductDescr = row["ProductDescr"].ToString();
                    SModels.ProdQty = Convert.ToInt32(row["ProdQty"].ToString());
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.Department = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.Print = row["PrintFlag"].ToString();
                    SModels.User = row["UserName"].ToString();
                    SModels.Bin_A= row["BinA"].ToString();
                    SModels.Bin_B = row["BinB"].ToString();
                    SModels.Bin_C = row["BinC"].ToString();
                    SModels.Bin_D = row["BinD"].ToString();
                    SModels.Bin_E = row["BinE"].ToString();
                    SModels.Bin_F = row["BinF"].ToString();
                    SModels.Bin_G = row["BinG"].ToString();
                    SModels.Bin_H = row["BinH"].ToString();
                    SModels.GarageName = row["GarageName"].ToString();
                    oList.Add(SModels);
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
        public ActionResult SummaryDashboard(SalesReturnModel SalesReturnModel)
        {
            SalesReturnModel obj = new SalesReturnModel();

            List<SalesReturnModel> oList = new List<SalesReturnModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SummaryDashboard(SalesReturnModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel SModels = new SalesReturnModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.SalesMan = row["SalesMan"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.Department = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.Print = row["SummaryPrintFlag"].ToString();
                    SModels.User = row["UserName"].ToString();
                    SModels.GarageName = row["GarageName"].ToString();
                    oList.Add(SModels);
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
        public JsonResult SalesReturnUpdate(List<SalesReturnModel> SalesReturnModel)
        {
            SalesReturnModel obj = new SalesReturnModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesReturnModel> oList = new List<SalesReturnModel>();

            try
            {
                string[] tmpTable = new string[72];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeries";
                tmpTable[4] = "ReturnNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "BillDiscount";
                tmpTable[52] = "AverageCost";
                tmpTable[53] = "TotalCost";
                tmpTable[54] = "BillSlNo";
                tmpTable[55] = "BillSeriesId";
                tmpTable[56] = "Taxable0";
                tmpTable[57] = "Tax0";
                tmpTable[58] = "Taxable5";
                tmpTable[59] = "Tax5";
                tmpTable[60] = "Taxable12";
                tmpTable[61] = "Tax12";
                tmpTable[62] = "Taxable18";
                tmpTable[63] = "Tax18";
                tmpTable[64] = "Taxable28";
                tmpTable[65] = "Tax28";
                tmpTable[66] = "TaxId1";
                tmpTable[67] = "TaxId2";
                tmpTable[68] = "TaxId3";
                tmpTable[69] = "TaxId4";
                tmpTable[70] = "TaxId5";
                tmpTable[71] = "Salesubid";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesReturnModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeries = details.BillSeries;
                    obj.ReturnNo = details.ReturnNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.BillSlNo = details.BillSlNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.Salesubid = details.Salesubid;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeries, obj.ReturnNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag,
                        obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.BillSlNo, obj.BillSeriesId, obj.Taxable0,
                        obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, obj.TaxId4, obj.TaxId5, obj.Salesubid);
                }

                dsDataSet = obj.SalesReturnUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel MModels = new SalesReturnModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToInt32(row["Maxqty"].ToString());
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
        public ActionResult SalesInvoiceGetListStockOut(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceGetListStockOut(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.LPONumber = row["LPONumber"].ToString();
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    SModels.ChassisNo = row["ChassisNumber"].ToString();
                    SModels.checkflag = row["Payterms"].ToString();
                    oList.Add(SModels);
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
        public ActionResult SalesInvoiceGetList(SalesInvoiceModel SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceGetList(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel(); 
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.LPONumber = row["LPONumber"].ToString();
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());  
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    SModels.ChassisNo = row["ChassisNumber"].ToString();
                    SModels.checkflag = row["Payterms"].ToString(); 
                    oList.Add(SModels);
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
        public ActionResult SalesInvoiceOrderGetList(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceOrderGetList(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.LPONumber = row["LPONumber"].ToString();
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    SModels.ChassisNo = row["ChassisNumber"].ToString();
                    SModels.checkflag = row["Payterms"].ToString();
                    oList.Add(SModels);
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
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpPost]
        public ActionResult SalesOpticalInvoiceGetList(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOpticalInvoiceGetList(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.LPONumber = row["LPONumber"].ToString();
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    SModels.ChassisNo = row["ChassisNumber"].ToString();
                    SModels.checkflag = row["Payterms"].ToString();
                    oList.Add(SModels);
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
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        public ActionResult CustomerEnquiryGetList(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerEnquiryGetList(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["Location"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    oList.Add(SModels);
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
        public ActionResult DeliveryOrderListView(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeliveryOrderListView(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    oList.Add(SModels);
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
        public ActionResult SalesOrderListView(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderListView(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    oList.Add(SModels);
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
        public ActionResult QuotationEntryListView(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.QuotationEntryListView(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["Location"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    oList.Add(SModels);
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
        public ActionResult SalesReturnGetList(SalesReturnModel SalesReturnModel)
        {
            SalesReturnModel obj = new SalesReturnModel();

            List<SalesReturnModel> oList = new List<SalesReturnModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesReturnGetList(SalesReturnModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel SModels = new SalesReturnModel(); 
                    SModels.BlSlNo = row["BillSlNo"].ToString(); 
                    SModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
                    SModels.BillSeries = Convert.ToInt32(row["BillSeries"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.LPONumber = row["LPONumber"].ToString();
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    oList.Add(SModels);
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
        public ActionResult SalesOrderGetList(SalesOrderModel SalesOrderModel)
        {
            SalesOrderModel obj = new SalesOrderModel();

            List<SalesOrderModel> oList = new List<SalesOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesOrderGetList(SalesOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesOrderModel SModels = new SalesOrderModel();
                    
                    SModels.OrderNo = Convert.ToInt32(row["OrderNo"].ToString()); 
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString(); 
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.LPONumber = row["LPONumber"].ToString();
                    oList.Add(SModels);
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
        public JsonResult DailyClosingInsertandUpdate(List<DailyClosing> DailyClosing) 
        {
            DailyClosing obj = new DailyClosing();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<DailyClosing> oList = new List<DailyClosing>();

            try
            {
                string[] tmpTable = new string[11];
                tmpTable[0] = "TRNO";
                tmpTable[1] = "Date";
                tmpTable[2] = "UserId";
                tmpTable[3] = "CollectedBy";
                tmpTable[4] = "Pdc";
                tmpTable[5] = "DeptId";
                tmpTable[6] = "CurId";
                tmpTable[7] = "Denom";
                tmpTable[8] = "Qty";
                tmpTable[9] = "Total";
                tmpTable[10] = "TotalAed";
               

                dt = Common.CreateTable(tmpTable);

                foreach (var details in DailyClosing)
                {
                    obj.TRNO = details.TRNO;
                    obj.Date = details.Date;
                    obj.UserId = details.UserId;
                    obj.CollectedBy = details.CollectedBy;
                    obj.Pdc = details.Pdc;
                    obj.DeptId = details.DeptId;
                    obj.CurId = details.CurId;
                    obj.Denom = details.Denom;
                    obj.Qty = details.Qty;
                    obj.Total = details.Total;
                    obj.TotalAed = details.TotalAed;
                   
                    dt.Rows.Add(obj.TRNO, obj.Date, obj.UserId, obj.CollectedBy, obj.Pdc,
                        obj.DeptId, obj.CurId, obj.Denom, obj.Qty, obj.Total, obj.TotalAed );
                }

                dsDataSet = obj.DailyClosingInsertandUpdate(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DailyClosing MModels = new DailyClosing();
                    MModels.Status = row["Status"].ToString();
                    MModels.TRNO = Convert.ToInt32(row["TRNO"].ToString()); 

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
        public ActionResult DailyCashCollectionGetandGets(DailyClosing DailyClosing) //Get SerialNo For Sales Invoice 
        {
            DailyClosing obj = new DailyClosing();

            List<DailyClosing> oList = new List<DailyClosing>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DailyCashCollectionGetandGets(DailyClosing, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DailyClosing MModels = new DailyClosing();
                    MModels.TRNO   = Convert.ToInt32(row["TRNO"].ToString());
                    //MModels.Date   = row["TRNO"].ToString();
                    //MModels.UserId = Convert.ToInt32(row["TRNO"].ToString());
                    //MModels.CollectedBy = row["TRNO"].ToString();
                    //MModels.Pdc = Convert.ToInt32(row["TRNO"].ToString());
                    //MModels.DeptId = Convert.ToInt32(row["TRNO"].ToString());
                    MModels.CurId = Convert.ToInt32(row["CurId"].ToString());
                    MModels.Denom = Convert.ToDecimal(row["Denom"].ToString());
                    MModels.Qty = Convert.ToInt32(row["Qty"].ToString());
                    MModels.Total = Convert.ToDecimal(row["Total"].ToString());
                    MModels.TotalAed = Convert.ToDecimal(row["TotalAedCONV"].ToString());
                    MModels.AEDTOTAL = Convert.ToDecimal(row["AEDTOTAL"].ToString());
                    MModels.OMRTOTAL = Convert.ToDecimal(row["OMRTOTAL"].ToString());
                    MModels.USDTOTAL = Convert.ToDecimal(row["USDTOTAL"].ToString());
                    MModels.SAUDITOTAL = Convert.ToDecimal(row["SAUDITOTAL"].ToString());  
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
        public JsonResult DailyCashCheckInsertandUpdate(List<DailyClosing> DailyClosing)  
        {
            DailyClosing obj = new DailyClosing();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<DailyClosing> oList = new List<DailyClosing>();

            try
            {
                string[] tmpTable = new string[12];
                tmpTable[0] = "DateFrom";
                tmpTable[1] = "DateTo";
                tmpTable[2] = "UserId";
                tmpTable[3] = "Remarks";
                tmpTable[4] = "Status";
                tmpTable[5] = "DeptId";
                tmpTable[6] = "CurId";
                tmpTable[7] = "Denom";
                tmpTable[8] = "Qty";
                tmpTable[9] = "Total";
                tmpTable[10] = "TotalAed";
                tmpTable[11] = "Pdc";


                dt = Common.CreateTable(tmpTable);

                foreach (var details in DailyClosing)
                {
                    obj.DateFrom = details.DateFrom;
                    obj.DateTo = details.DateTo;
                    obj.UserId = details.UserId;
                    obj.Remarks = details.Remarks; 
                    obj.Status = details.Status; 
                    obj.DeptId = details.DeptId;
                    obj.CurId = details.CurId;
                    obj.Denom = details.Denom;
                    obj.Qty = details.Qty;
                    obj.Total = details.Total;
                    obj.TotalAed = details.TotalAed;
                    obj.Pdc = details.Pdc;

                    dt.Rows.Add(obj.DateFrom, obj.DateTo, obj.UserId, obj.Remarks, obj.Status,
                        obj.DeptId, obj.CurId, obj.Denom, obj.Qty, obj.Total, obj.TotalAed, obj.Pdc);
                }

                dsDataSet = obj.DailyCashCheckInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DailyClosing MModels = new DailyClosing();
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
        public JsonResult MobileSalesInvoiceUpdate(List<SalesInvoiceModel> SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[77];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "ImeiNo";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.ImeiNo = details.ImeiNo;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                    obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                    obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                    obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                    obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                    obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                    obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                    obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                    obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3, obj.TaxId4, obj.TaxId5, obj.ImeiNo);
                }

                dsDataSet = obj.MobileSalesInvoiceUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult MIProductSearch(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MIProductSearch(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.VatId = Convert.ToInt32(row["VatId"].ToString());
                    MModels.VatPer = Convert.ToDecimal(row["TaxRate"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.stocktotloseqty = Convert.ToDecimal(row["Stock_TotLoseQty"].ToString());
                    MModels.GrpId = Convert.ToInt32(row["GroupId"].ToString());
                    MModels.GrpName = row["GrpName"].ToString();
                    MModels.SbgrpId = Convert.ToInt32(row["SubGroupId"].ToString());
                    MModels.SbgrpName = row["SbgrpName"].ToString();
                    MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    MModels.CategoryName = row["CategoryName"].ToString();
                    MModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.OpeningQty = Convert.ToDecimal(row["Stock_OpeningQty"].ToString());
                    MModels.SerialNo = row["SerialNo"].ToString();
                    MModels.Otherdescription = row["Otherdescription"].ToString();
                    MModels.MRP = Convert.ToDecimal(row["MrpRate"].ToString());
                    MModels.LOTNo = row["LOTNo"].ToString();
                    MModels.TotQty = Convert.ToDecimal(row["Stock_Qty"].ToString());
                    MModels.Bin_A = row["BinA"].ToString();
                    MModels.Bin_B = row["BinB"].ToString();
                    MModels.Bin_C = row["BinC"].ToString();
                    MModels.Bin_D = row["BinD"].ToString();
                    MModels.Bin_E = row["BinE"].ToString();
                    MModels.Bin_F = row["BinF"].ToString();
                    MModels.Bin_G = row["BinG"].ToString();
                    MModels.Bin_H = row["BinH"].ToString();
                    MModels.MultiPriceId = Convert.ToInt32(row["BelowCostFlag"].ToString());
                    MModels.BOQNo = row["BOQSlNo"].ToString();
                    MModels.BOQSubId = row["BOQSubId"].ToString();
                    MModels.BOQQty = Convert.ToInt32(row["BOQQty"].ToString());
                    MModels.BOQRate = Convert.ToDecimal(row["BOQAmt"].ToString());
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
        public void SalesInvoiceFolderCreate(SalesInvoiceModel SalesInvoiceModel) 
        {
            string fileName = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/" + SalesInvoiceModel.SalesFolder + "/" + SalesInvoiceModel.BillSeriesId + "/" + SalesInvoiceModel.BillSlNo + "/"));

            if (!Directory.Exists(fileName))
            {
                Directory.CreateDirectory(fileName);
            }
        }

        [HttpPost]
        public void SalesFileUpload()
        { 

            foreach (string upload in Request.Files)
            {
                string filename = Path.GetFileName(Request.Files[upload].FileName);
                string FileName1 = Request.Form["FileName"];
                string BillSeriesId = Request.Form["BillSeriesId"]; 
                string BillSlNo = Request.Form["BillSlNo"]; 
                string Extension = Request.Form["Extension"];
                string path1 = System.IO.Path.Combine(Server.MapPath(@"~/ProjectImages/SalesInvoiceDocs/" + BillSeriesId + "/" + BillSlNo + "/"), FileName1 + "." + Extension);
                Request.Files[upload].SaveAs(path1); 
            }
        }

        [HttpPost]
        public ActionResult SalesInvoceFileInsert(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> dList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoceFileInsert(SalesInvoiceModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel(); 
                    MModels.DelFlag = Convert.ToInt32(row["Flag"].ToString()); 
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
        public ActionResult SalesInvocieFileGets(SalesInvoiceModel SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvocieFileGets(SalesInvoiceModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.PFileId = Convert.ToInt32(row["SFileId"].ToString());
                    MModels.FileName = row["FileName"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["SBillNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["SBillSeries"].ToString()); 
                    MModels.DeptId = Convert.ToInt32(row["SDeptId"].ToString());
                    MModels.Extension = row["Extension"].ToString();
                    MModels.DelFlag = Convert.ToInt32(row["FolderFileName"].ToString());

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
        public ActionResult SalesInvoceFileDelete(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoceFileDelete(SalesInvoiceModel, dbName);  
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
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
        public JsonResult SalesGasTradingInsertandUpdate(List<SalesInvoiceModel> SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[81];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "GarageName";
                tmpTable[78] = "GaragePhone";
                tmpTable[79] = "FractionQty";
                tmpTable[80] = "CalcQty";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.GarageName = details.GarageName;
                    obj.GaragePhone = details.GaragePhone;
                    obj.FractionQty = details.FractionQty;
                    obj.CalcQty = details.CalcQty;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                    obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                    obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                    obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                    obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                    obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                    obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                    obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                    obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3,
                    obj.TaxId4, obj.TaxId5, obj.CashAdvance, obj.GarageName, obj.GaragePhone, obj.FractionQty, obj.CalcQty);
                }

                dsDataSet = obj.SalesGasTradingInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.CurrentDate = row["CurrentTime"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SalesInvoiceGasTradingUpdate(List<SalesInvoiceModel> SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[81];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "GarageName";
                tmpTable[78] = "GaragePhone";
                tmpTable[79] = "FractionQty";
                tmpTable[80] = "CalcQty";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.GarageName = details.GarageName;
                    obj.GaragePhone = details.GaragePhone;
                    obj.FractionQty = details.FractionQty;
                    obj.CalcQty = details.CalcQty;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                    obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                    obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                    obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                    obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                    obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                    obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                    obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                    obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3,
                    obj.TaxId4, obj.TaxId5, obj.CashAdvance, obj.GarageName, obj.GaragePhone, obj.FractionQty, obj.CalcQty);
                }

                dsDataSet = obj.SalesInvoiceGasTradingUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.CurrentDate = row["CurrentTime"].ToString();
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
        public JsonResult SalesRentCarInsertandUpdate(List<SalesInvoiceModel> SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[83];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "BillSeriesId";
                tmpTable[4] = "BillSlNo";
                tmpTable[5] = "UnitId";
                tmpTable[6] = "UnitName";
                tmpTable[7] = "ProdQty";
                tmpTable[8] = "ProdRate";
                tmpTable[9] = "FcProdRate";
                tmpTable[10] = "ProdDisc";
                tmpTable[11] = "FcProdDisc";
                tmpTable[12] = "TaxableAmount";
                tmpTable[13] = "FCTaxableAmount";
                tmpTable[14] = "TaxId";
                tmpTable[15] = "TaxPercent";
                tmpTable[16] = "TaxAmount";
                tmpTable[17] = "FCTaxAmount";
                tmpTable[18] = "Amount";
                tmpTable[19] = "FCAmount";
                tmpTable[20] = "LocnId";
                tmpTable[21] = "BatchSNo";
                tmpTable[22] = "Batch";
                tmpTable[23] = "PayType";
                tmpTable[24] = "LPONumber";
                tmpTable[25] = "CustId";
                tmpTable[26] = "CustName";
                tmpTable[27] = "CustAddress";
                tmpTable[28] = "InvDate";
                tmpTable[29] = "InvTerms";
                tmpTable[30] = "DueDate";
                tmpTable[31] = "LocId";
                tmpTable[32] = "SalesManId";
                tmpTable[33] = "AreaId";
                tmpTable[34] = "CurrencyId";
                tmpTable[35] = "CurrencyRate";
                tmpTable[36] = "JobNumber";
                tmpTable[37] = "GrandTotal";
                tmpTable[38] = "RoundGrandTotal";
                tmpTable[39] = "FCGrandTotal";
                tmpTable[40] = "RoundFCGrandTotal";
                tmpTable[41] = "TotalDiscount";
                tmpTable[42] = "FCTotalDiscount";
                tmpTable[43] = "TotalTaxable";
                tmpTable[44] = "FCTotTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "FCTotTax";
                tmpTable[47] = "Remarks";
                tmpTable[48] = "DeptId";
                tmpTable[49] = "UserId";
                tmpTable[50] = "DelFlag";
                tmpTable[51] = "EnquiryNo";
                tmpTable[52] = "QuotationNo";
                tmpTable[53] = "OrderNo";
                tmpTable[54] = "DeliveryOrderNo";
                tmpTable[55] = "BillDiscount";
                tmpTable[56] = "AverageCost";
                tmpTable[57] = "TotalCost";
                tmpTable[58] = "SOSubId";
                tmpTable[59] = "DOrdSubId";
                tmpTable[60] = "FcBillDiscount";
                tmpTable[61] = "Taxable0";
                tmpTable[62] = "Tax0";
                tmpTable[63] = "Taxable5";
                tmpTable[64] = "Tax5";
                tmpTable[65] = "Taxable12";
                tmpTable[66] = "Tax12";
                tmpTable[67] = "Taxable18";
                tmpTable[68] = "Tax18";
                tmpTable[69] = "Taxable28";
                tmpTable[70] = "Tax28";
                tmpTable[71] = "TaxId1";
                tmpTable[72] = "TaxId2";
                tmpTable[73] = "TaxId3";
                tmpTable[74] = "TaxId4";
                tmpTable[75] = "TaxId5";
                tmpTable[76] = "CashAdvance";
                tmpTable[77] = "GarageName";
                tmpTable[78] = "GaragePhone";
                tmpTable[79] = "Email";
                tmpTable[80] = "AgreementNo";
                tmpTable[81] = "FractionQty";
                tmpTable[82] = "CalcQty";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.BatchSNo = details.BatchSNo;
                    obj.Batch = details.Batch;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.InvTerms = details.InvTerms;
                    obj.DueDate = details.DueDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.JobNumber = details.JobNumber;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.EnquiryNo = details.EnquiryNo;
                    obj.QuotationNo = details.QuotationNo;
                    obj.OrderNo = details.OrderNo;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.BillDiscount = details.BillDiscount;
                    obj.AvgCost = details.AvgCost;
                    obj.TotalCost = details.TotalCost;
                    obj.SOSubId = details.SOSubId;
                    obj.DOrdSubId = details.DOrdSubId;
                    obj.FcBillDiscount = details.FcBillDiscount;
                    obj.Taxable0 = details.Taxable0;
                    obj.Tax0 = details.Tax0;
                    obj.Taxable5 = details.Taxable5;
                    obj.Tax5 = details.Tax5;
                    obj.Taxable12 = details.Taxable12;
                    obj.Tax12 = details.Tax12;
                    obj.Taxable18 = details.Taxable18;
                    obj.Tax18 = details.Tax18;
                    obj.Taxable28 = details.Taxable28;
                    obj.Tax28 = details.Tax28;
                    obj.TaxId1 = details.TaxId1;
                    obj.TaxId2 = details.TaxId2;
                    obj.TaxId3 = details.TaxId3;
                    obj.TaxId4 = details.TaxId4;
                    obj.TaxId5 = details.TaxId5;
                    obj.CashAdvance = details.CashAdvance;
                    obj.GarageName = details.GarageName;
                    obj.GaragePhone = details.GaragePhone;
                    obj.Email = details.Email;
                    obj.AgreementNo = details.AgreementNo;
                    obj.FractionQty = details.FractionQty;
                    obj.CalcQty = details.CalcQty;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.BillSeriesId, obj.BillSlNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.BatchSNo, obj.Batch, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.InvTerms, obj.DueDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.JobNumber, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId, obj.DelFlag, obj.EnquiryNo, obj.QuotationNo,
                        obj.OrderNo, obj.DeliveryOrderNo, obj.BillDiscount, obj.AvgCost, obj.TotalCost, obj.SOSubId, obj.DOrdSubId, obj.FcBillDiscount, obj.Taxable0,
                        obj.Tax0, obj.Taxable5, obj.Tax5, obj.Taxable12, obj.Tax12, obj.Taxable18, obj.Tax18, obj.Taxable28, obj.Tax28, obj.TaxId1, obj.TaxId2, obj.TaxId3,
                        obj.TaxId4, obj.TaxId5, obj.CashAdvance, obj.GarageName, obj.GaragePhone, obj.Email, obj.AgreementNo, obj.FractionQty, obj.CalcQty);
                }

                dsDataSet = obj.SalesRentCarInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSrlNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.LocnName = row["LocationName"].ToString();
                    MModels.CurrentDate = row["CurrentTime"].ToString();
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
        public JsonResult DeliveryOrderGasTradingInsertandUpdate(List<DeliveryOrderModel> DeliveryOrderModel) 
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();

            try
            {
                string[] tmpTable = new string[54];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "DeliveryOrderNo";
                tmpTable[4] = "UnitId";
                tmpTable[5] = "UnitName";
                tmpTable[6] = "ProdQty";
                tmpTable[7] = "ProdRate";
                tmpTable[8] = "FcProdRate";
                tmpTable[9] = "ProdDisc";
                tmpTable[10] = "FcProdDisc";
                tmpTable[11] = "TaxableAmount";
                tmpTable[12] = "FCTaxableAmount";
                tmpTable[13] = "TaxId";
                tmpTable[14] = "TaxPercent";
                tmpTable[15] = "TaxAmount";
                tmpTable[16] = "FCTaxAmount";
                tmpTable[17] = "Amount";
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "LocnId";
                tmpTable[20] = "PayType";
                tmpTable[21] = "LPONumber";
                tmpTable[22] = "CustId";
                tmpTable[23] = "CustName";
                tmpTable[24] = "CustAddress";
                tmpTable[25] = "InvDate";
                tmpTable[26] = "VehicleId";
                tmpTable[27] = "ExpectedDate";
                tmpTable[28] = "LocId";
                tmpTable[29] = "SalesManId";
                tmpTable[30] = "AreaId";
                tmpTable[31] = "CurrencyId";
                tmpTable[32] = "CurrencyRate";
                tmpTable[33] = "DriverId";
                tmpTable[34] = "GrandTotal";
                tmpTable[35] = "RoundGrandTotal";
                tmpTable[36] = "FCGrandTotal";
                tmpTable[37] = "RoundFCGrandTotal";
                tmpTable[38] = "TotalDiscount";
                tmpTable[39] = "FCTotalDiscount";
                tmpTable[40] = "TotalTaxable";
                tmpTable[41] = "FCTotTaxable";
                tmpTable[42] = "TotalTax";
                tmpTable[43] = "FCTotTax";
                tmpTable[44] = "Remarks";
                tmpTable[45] = "DeptId";
                tmpTable[46] = "UserId";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "QtnNo";
                tmpTable[49] = "OrderNo";
                tmpTable[50] = "SalesNo";
                tmpTable[51] = "BillSeriesId";
                tmpTable[52] = "SaleSubId";
                tmpTable[53] = "SordSubId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in DeliveryOrderModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.VehicleId = details.VehicleId;
                    obj.ExpectedDate = details.ExpectedDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.DriverId = details.DriverId;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.QtnNo = details.QtnNo;
                    obj.OrderNo = details.OrderNo;
                    obj.SalesNo = details.SalesNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.SaleSubId = details.SaleSubId;
                    obj.SordSubId = details.SordSubId;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.DeliveryOrderNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.VehicleId, obj.ExpectedDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.DriverId, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId,
                        obj.DelFlag, obj.QtnNo, obj.OrderNo, obj.SalesNo, obj.BillSeriesId, obj.SaleSubId, obj.SordSubId);
                }

                dsDataSet = obj.DeliveryOrderGasTradingInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows) 
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.Location = row["LocationName"].ToString();
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
        public JsonResult DeliveryOrderGasTradingUpdate(List<DeliveryOrderModel> DeliveryOrderModel)
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();

            try
            {
                string[] tmpTable = new string[54]; 
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "DeliveryOrderNo";
                tmpTable[4] = "UnitId";
                tmpTable[5] = "UnitName";
                tmpTable[6] = "ProdQty";
                tmpTable[7] = "ProdRate";
                tmpTable[8] = "FcProdRate";
                tmpTable[9] = "ProdDisc";
                tmpTable[10] = "FcProdDisc";
                tmpTable[11] = "TaxableAmount";
                tmpTable[12] = "FCTaxableAmount";
                tmpTable[13] = "TaxId";
                tmpTable[14] = "TaxPercent";
                tmpTable[15] = "TaxAmount";
                tmpTable[16] = "FCTaxAmount";
                tmpTable[17] = "Amount";
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "LocnId";
                tmpTable[20] = "PayType";
                tmpTable[21] = "LPONumber";
                tmpTable[22] = "CustId";
                tmpTable[23] = "CustName";
                tmpTable[24] = "CustAddress";
                tmpTable[25] = "InvDate";
                tmpTable[26] = "VehicleId";
                tmpTable[27] = "ExpectedDate";
                tmpTable[28] = "LocId";
                tmpTable[29] = "SalesManId";
                tmpTable[30] = "AreaId";
                tmpTable[31] = "CurrencyId";
                tmpTable[32] = "CurrencyRate";
                tmpTable[33] = "DriverId";
                tmpTable[34] = "GrandTotal";
                tmpTable[35] = "RoundGrandTotal";
                tmpTable[36] = "FCGrandTotal";
                tmpTable[37] = "RoundFCGrandTotal";
                tmpTable[38] = "TotalDiscount";
                tmpTable[39] = "FCTotalDiscount";
                tmpTable[40] = "TotalTaxable";
                tmpTable[41] = "FCTotTaxable";
                tmpTable[42] = "TotalTax";
                tmpTable[43] = "FCTotTax";
                tmpTable[44] = "Remarks";
                tmpTable[45] = "DeptId";
                tmpTable[46] = "UserId";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "QtnNo";
                tmpTable[49] = "OrderNo";
                tmpTable[50] = "SalesNo";
                tmpTable[51] = "BillSeriesId";
                tmpTable[52] = "SaleSubId";
                tmpTable[53] = "SordSubId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in DeliveryOrderModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.VehicleId = details.VehicleId;
                    obj.ExpectedDate = details.ExpectedDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.DriverId = details.DriverId;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.QtnNo = details.QtnNo;
                    obj.OrderNo = details.OrderNo;
                    obj.SalesNo = details.SalesNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.SaleSubId = details.SaleSubId;
                    obj.SordSubId = details.SordSubId;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.DeliveryOrderNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.VehicleId, obj.ExpectedDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.DriverId, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId,
                        obj.DelFlag, obj.QtnNo, obj.OrderNo, obj.SalesNo, obj.BillSeriesId, obj.SaleSubId, obj.SordSubId);
                }

                dsDataSet = obj.DeliveryOrderGasTradingUpdate(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["TotalQty"].ToString());
                    MModels.Location = row["LocationName"].ToString();
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
        public ActionResult DeliveryOrderCancel(DeliveryOrderModel DeliveryOrderModel)
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();

            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeliveryOrderCancel(DeliveryOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel SModels = new DeliveryOrderModel();
                    SModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());                   
                    SModels.Status = row["Status"].ToString();
                    oList.Add(SModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult PackingListInsertandUpdate(List<DeliveryOrderModel> DeliveryOrderModel) 
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();

            try
            {
                string[] tmpTable = new string[54];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ProductCode";
                tmpTable[2] = "ProductDescr";
                tmpTable[3] = "DeliveryOrderNo";
                tmpTable[4] = "UnitId";
                tmpTable[5] = "UnitName";
                tmpTable[6] = "ProdQty";
                tmpTable[7] = "ProdRate";
                tmpTable[8] = "FcProdRate";
                tmpTable[9] = "ProdDisc";
                tmpTable[10] = "FcProdDisc";
                tmpTable[11] = "TaxableAmount";
                tmpTable[12] = "FCTaxableAmount";
                tmpTable[13] = "TaxId";
                tmpTable[14] = "TaxPercent";
                tmpTable[15] = "TaxAmount";
                tmpTable[16] = "FCTaxAmount";
                tmpTable[17] = "Amount";
                tmpTable[18] = "FCAmount";
                tmpTable[19] = "LocnId";
                tmpTable[20] = "PayType";
                tmpTable[21] = "LPONumber";
                tmpTable[22] = "CustId";
                tmpTable[23] = "CustName";
                tmpTable[24] = "CustAddress";
                tmpTable[25] = "InvDate";
                tmpTable[26] = "VehicleId";
                tmpTable[27] = "ExpectedDate";
                tmpTable[28] = "LocId";
                tmpTable[29] = "SalesManId";
                tmpTable[30] = "AreaId";
                tmpTable[31] = "CurrencyId";
                tmpTable[32] = "CurrencyRate";
                tmpTable[33] = "DriverId";
                tmpTable[34] = "GrandTotal";
                tmpTable[35] = "RoundGrandTotal";
                tmpTable[36] = "FCGrandTotal";
                tmpTable[37] = "RoundFCGrandTotal";
                tmpTable[38] = "TotalDiscount";
                tmpTable[39] = "FCTotalDiscount";
                tmpTable[40] = "TotalTaxable";
                tmpTable[41] = "FCTotTaxable";
                tmpTable[42] = "TotalTax";
                tmpTable[43] = "FCTotTax";
                tmpTable[44] = "Remarks";
                tmpTable[45] = "DeptId";
                tmpTable[46] = "UserId";
                tmpTable[47] = "DelFlag";
                tmpTable[48] = "QtnNo";
                tmpTable[49] = "OrderNo";
                tmpTable[50] = "SalesNo";
                tmpTable[51] = "BillSeriesId";
                tmpTable[52] = "SaleSubId";
                tmpTable[53] = "SordSubId";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in DeliveryOrderModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ProductCode = details.ProductCode;
                    obj.ProductDescr = details.ProductDescr;
                    obj.DeliveryOrderNo = details.DeliveryOrderNo;
                    obj.UnitId = details.UnitId;
                    obj.UnitName = details.UnitName;
                    obj.ProdQty = details.ProdQty;
                    obj.ProdRate = details.ProdRate;
                    obj.FcProdRate = details.FcProdRate;
                    obj.ProdDisc = details.ProdDisc;
                    obj.FcProdDisc = details.FcProdDisc;
                    obj.TaxableAmount = details.TaxableAmount;
                    obj.FCTaxableAmount = details.FCTaxableAmount;
                    obj.TaxId = details.TaxId;
                    obj.TaxPercent = details.TaxPercent;
                    obj.TaxAmount = details.TaxAmount;
                    obj.FCTaxAmount = details.FCTaxAmount;
                    obj.Amount = details.Amount;
                    obj.FCAmount = details.FCAmount;
                    obj.LocnId = details.LocnId;
                    obj.PayType = details.PayType;
                    obj.LPONumber = details.LPONumber;
                    obj.CustId = details.CustId;
                    obj.CustName = details.CustName;
                    obj.CustAddress = details.CustAddress;
                    obj.InvDate = details.InvDate;
                    obj.VehicleId = details.VehicleId;
                    obj.ExpectedDate = details.ExpectedDate;
                    obj.LocId = details.LocId;
                    obj.SalesManId = details.SalesManId;
                    obj.AreaId = details.AreaId;
                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.DriverId = details.DriverId;
                    obj.GrandTotal = details.GrandTotal;
                    obj.RoundGrandTotal = details.RoundGrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.RoundFCGrandTotal = details.RoundFCGrandTotal;
                    obj.TotalDiscount = details.TotalDiscount;
                    obj.FCTotalDiscount = details.FCTotalDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.FCTotTaxable = details.FCTotTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.FCTotTax = details.FCTotTax;
                    obj.Remarks = details.Remarks;
                    obj.DeptId = details.DeptId;
                    obj.UserId = details.UserId;
                    obj.DelFlag = details.DelFlag;
                    obj.QtnNo = details.QtnNo;
                    obj.OrderNo = details.OrderNo;
                    obj.SalesNo = details.SalesNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.SaleSubId = details.SaleSubId;
                    obj.SordSubId = details.SordSubId;
                    dt.Rows.Add(obj.ProductId, obj.ProductCode, obj.ProductDescr, obj.DeliveryOrderNo, obj.UnitId,
                        obj.UnitName, obj.ProdQty, obj.ProdRate, obj.FcProdRate, obj.ProdDisc, obj.FcProdDisc, obj.TaxableAmount,
                        obj.FCTaxableAmount, obj.TaxId, obj.TaxPercent, obj.TaxAmount, obj.FCTaxAmount, obj.Amount, obj.FCAmount,
                        obj.LocnId, obj.PayType, obj.LPONumber, obj.CustId, obj.CustName, obj.CustAddress,
                        obj.InvDate, obj.VehicleId, obj.ExpectedDate, obj.LocId, obj.SalesManId, obj.AreaId, obj.CurrencyId,
                        obj.CurrencyRate, obj.DriverId, obj.GrandTotal, obj.RoundGrandTotal, obj.FCGrandTotal, obj.RoundFCGrandTotal, obj.TotalDiscount, obj.FCTotalDiscount,
                        obj.TotalTaxable, obj.FCTotTaxable, obj.TotalTax, obj.FCTotTax, obj.Remarks, obj.DeptId, obj.UserId,
                        obj.DelFlag, obj.QtnNo, obj.OrderNo, obj.SalesNo, obj.BillSeriesId, obj.SaleSubId, obj.SordSubId);
                }

                dsDataSet = obj.PackingListInsertandUpdate(dt, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["DeliveryOrderNo"].ToString());

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
        public ActionResult PackingListNoSearch(DeliveryOrderModel DeliveryOrderModel)          
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();

            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingListNoSearch(DeliveryOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["PackingListNo"].ToString()); 
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
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
        public ActionResult PackingListGetandGets(DeliveryOrderModel DeliveryOrderModel)
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();

            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingListGetandGets(DeliveryOrderModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel MModels = new DeliveryOrderModel();
                    MModels.DeliveryOrderNo = Convert.ToInt32(row["PackingListNo"].ToString());
                    MModels.DeliveryOrderMainId = Convert.ToInt32(row["PackingListMainId"].ToString());
                    MModels.PayType = row["PayType"].ToString();
                    MModels.LPONumber = row["LPONumber"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.VehicleId = Convert.ToInt32(row["VehicleId"].ToString());
                    MModels.ExpectedDate = row["ExpectedDate"].ToString();
                    MModels.LocId = Convert.ToInt32(row["LocId"].ToString());
                    MModels.SalesManId = Convert.ToInt32(row["SalesManId"].ToString());
                    MModels.AreaId = Convert.ToInt32(row["AreaId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.DriverId = Convert.ToInt32(row["DriverId"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    MModels.FCGrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());                    
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProdQty = Convert.ToDecimal(row["ProdQty"].ToString());
                    MModels.ProdRate = Convert.ToDecimal(row["NetWt"].ToString());                  
                    MModels.ProdDisc = Convert.ToDecimal(row["GrossWt"].ToString());                
                    MModels.TaxableAmount = Convert.ToDecimal(row["MeasureQty"].ToString());                  
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());                 
                    MModels.SaleSubId = row["SaleSubId"].ToString();
                    MModels.BillSeriesId = Convert.ToInt32(row["SalesSereiesNo"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["SalesNo"].ToString());
                    MModels.BelowCostFlag = Convert.ToInt32(row["Deliveryqtysinv"].ToString());
                    MModels.UnitName = row["CartNo"].ToString();
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
        public ActionResult PackingListView(DeliveryOrderModel DeliveryOrderModel) 
        {
            DeliveryOrderModel obj = new DeliveryOrderModel();

            List<DeliveryOrderModel> oList = new List<DeliveryOrderModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingListView(DeliveryOrderModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DeliveryOrderModel SModels = new DeliveryOrderModel();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.Remarks = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["GrandTotal"].ToString());
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UnitName = row["UserName"].ToString();
                    oList.Add(SModels);
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

        public ActionResult ExportSalesDocStatusGets(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ExportSalesDocStatusGets(SalesInvoiceModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillDescription= row["BillDescription"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());                   
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();                  
                    MModels.CustName = row["CustName"].ToString();
                    MModels.CustAddress = row["CustAddress"].ToString();
                    MModels.GrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString()); 
                    MModels.Variable1 = row["ExportStatus"].ToString(); 
                    MModels.ChassisNo = row["ChassisNumber"].ToString();
                    MModels.CustPhnNew = row["CustPhnNoNew"].ToString();
                    MModels.PayType = row["PayType"].ToString();
                    MModels.Status= row["ExportDoc"].ToString();


                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(oList, JsonRequestBehavior.AllowGet);
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };

        }
        [HttpPost]
        public JsonResult ExportSalesDocsSave(List<SalesInvoiceModel> SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();

            try
            {
                string[] tmpTable = new string[3];
                tmpTable[0] = "BillSeriesId";
                tmpTable[1] = "BillSlNo";
                tmpTable[2] = "Status";               

                dt = Common.CreateTable(tmpTable);

                foreach (var details in SalesInvoiceModel)
                {
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.Status = details.Status;                   

                    dt.Rows.Add(obj.BillSeriesId, obj.BillSlNo, obj.Status); 
                }

                dsDataSet = obj.ExportSalesDocsSave(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel(); 
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
        public ActionResult CustomerSalesGetandGets(SalesInvoiceModel SalesInvoiceModel) 
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CustomerSalesGetandGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
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
        public ActionResult SerialNoSearchOPTICALSORDER(SalesInvoiceModel SalesInvoiceModel)    //Auto Complete SerialNo in Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SerialNoSearchOPTICALSORDER(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.DepartmentName = row["DepartmentCode"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
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
        public ActionResult SalesInvoiceGetListOPTICALORDER(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceGetListOPTICALORDER(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.LPONumber = row["LPONumber"].ToString();
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    SModels.ChassisNo = row["ChassisNumber"].ToString();
                    SModels.checkflag = row["Payterms"].ToString();
                    oList.Add(SModels);
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

        public ActionResult SerialNoSearchOPTICALSINVOICE(SalesInvoiceModel SalesInvoiceModel)    //Auto Complete SerialNo in Sales Invoice
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SerialNoSearchOPTICALSINVOICE(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.InvDate = row["InvDate"].ToString();
                    MModels.CustId = Convert.ToInt32(row["CustId"].ToString());
                    MModels.CustName = row["CustoName"].ToString();
                    MModels.DepartmentName = row["DepartmentCode"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
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
        public ActionResult SalesInvoiceGetListOPTICALSINVOICE(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesInvoiceGetListOPTICALSINVOICE(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel SModels = new SalesInvoiceModel();
                    SModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.LPONumber = row["LPONumber"].ToString();
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    SModels.ChassisNo = row["ChassisNumber"].ToString();
                    SModels.checkflag = row["Payterms"].ToString();
                    oList.Add(SModels);
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
        public ActionResult SalesReturnGetListOpticals(SalesReturnModel SalesReturnModel)
        {
            SalesReturnModel obj = new SalesReturnModel();

            List<SalesReturnModel> oList = new List<SalesReturnModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SalesReturnGetListOpticals(SalesReturnModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesReturnModel SModels = new SalesReturnModel();
                    SModels.BlSlNo = row["BillSlNo"].ToString();
                    SModels.ReturnNo = Convert.ToInt32(row["ReturnNo"].ToString());
                    SModels.BillSeries = Convert.ToInt32(row["BillSeries"].ToString());
                    SModels.BillDescription = row["BillDescription"].ToString();
                    SModels.InvDate = row["InvDate"].ToString();
                    SModels.CustName = row["CustoName"].ToString();
                    SModels.CustAddress = row["CustAddress"].ToString();
                    SModels.LocnId = Convert.ToInt32(row["LocId"].ToString());
                    SModels.Location = row["LocationName"].ToString();
                    SModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    SModels.DepartmentName = row["DepartmentName"].ToString();
                    SModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    SModels.FCGrandTotal = Convert.ToDecimal(row["FCGrandTotal"].ToString());
                    SModels.LPONumber = row["LPONumber"].ToString();
                    SModels.SalesManId = Convert.ToInt32(row["SalesmanId"].ToString());
                    SModels.SalesMan = row["FirstName"].ToString();
                    SModels.UserName = row["UserName"].ToString();
                    oList.Add(SModels);
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
    }
}