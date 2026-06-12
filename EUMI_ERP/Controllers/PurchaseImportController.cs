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
    public class PurchaseImportController : Controller
    {
        // GET: PurchaseImport
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PurchaseImport()
        {
            return View();
        }
        public ActionResult ContainerImport()
        {
            return View();
        }
        [HttpPost]
        public JsonResult PurchaseImportInsertandUpdate(List<PurchaseImportModel> PurchaseImportModel)
        {
            PurchaseImportModel obj = new PurchaseImportModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PurchaseImportModel> oList = new List<PurchaseImportModel>();

            try
            {
                string[] tmpTable = new string[64];
                tmpTable[0] = "EntryDate";
                tmpTable[1] = "DateofLoading";
                tmpTable[2] = "BuyerNo";
                tmpTable[3] = "Year";
                tmpTable[4] = "Type";
                tmpTable[5] = "Model";
                tmpTable[6] = "Auction";
                tmpTable[7] = "City";
                tmpTable[8] = "LotNo";
                tmpTable[9] = "VinNo";
                tmpTable[10] = "PointofLoading";
                tmpTable[11] = "Price";
                tmpTable[12] = "Delivery";
                tmpTable[13] = "Shipping";
                tmpTable[14] = "DealerFee";
                tmpTable[15] = "StorageFee";
                tmpTable[16] = "LoadingFee";
                tmpTable[17] = "LateFee";
                tmpTable[18] = "Insurance";
                tmpTable[19] = "CurrentBalance";
                tmpTable[20] = "Payed_Amount";
                tmpTable[21] = "Balance";
                tmpTable[22] = "ContainerNo";
                tmpTable[23] = "AdditionalService";
                tmpTable[24] = "CustomerNotes";
                tmpTable[25] = "UId";
                tmpTable[26] = "DeptId";
                tmpTable[27] = "LocationId";
                tmpTable[28] = "SlNo";
                tmpTable[29] = "InvoNo";
                tmpTable[30] = "SupplierId";
                tmpTable[31] = "PayType";
                tmpTable[32] = "PurchaseType";
                tmpTable[33] = "InvoDate";
                tmpTable[34] = "Terms";
                tmpTable[35] = "DueDate";
                tmpTable[36] = "LocnId";
                tmpTable[37] = "PlaceOfSupply";
                tmpTable[38] = "JobNo";
                tmpTable[39] = "ShipDate";
                tmpTable[40] = "CurrencyId";
                tmpTable[41] = "CurrencyRate";
                tmpTable[42] = "InvoiceTotal";
                tmpTable[43] = "FCDiscount";
                tmpTable[44] = "TotalTaxable";
                tmpTable[45] = "TotalTax";
                tmpTable[46] = "GrandTotal";
                tmpTable[47] = "FCGrandTotal";
                tmpTable[48] = "FCTaxable";
                tmpTable[49] = "FCTax";
                tmpTable[50] = "LPO";
                tmpTable[51] = "PONo";
                tmpTable[52] = "FCRoundOff";
                tmpTable[53] = "RoundOff";
                tmpTable[54] = "BaseInvoiceamount";
                tmpTable[55] = "JobId";
                tmpTable[56] = "Othercharges";
                tmpTable[57] = "PurchaseSlNo";
                tmpTable[58] = "CopyFlag";
                tmpTable[59] = "ConfirmFlag";
                tmpTable[60] = "Colour";
                tmpTable[61] = "CustomesDuty";
                tmpTable[62] = "ItemDescription";
                tmpTable[63] = "Username";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PurchaseImportModel)
                {
                    obj.EntryDate = details.EntryDate;
                    obj.DateofLoading = details.DateofLoading;
                    obj.BuyerNo = details.BuyerNo;
                    obj.Year = details.Year;
                    obj.Type = details.Type;
                    obj.Model = details.Model;
                    obj.Auction = details.Auction;
                    obj.City = details.City;
                    obj.LotNo = details.LotNo;
                    obj.VinNo = details.VinNo;
                    obj.PointofLoading = details.PointofLoading;
                    obj.Price = details.Price;
                    obj.Delivery = details.Delivery;
                    obj.Shipping = details.Shipping;
                    obj.DealerFee = details.DealerFee;
                    obj.StorageFee = details.StorageFee;
                    obj.LoadingFee = details.LoadingFee;
                    obj.LateFee = details.LateFee;
                    obj.Insurance = details.Insurance;

                    obj.CurrentBalance = details.CurrentBalance;
                    obj.Payed_Amount = details.Payed_Amount;
                    obj.Balance = details.Balance;
                    obj.ContainerNo = details.ContainerNo;
                    obj.AdditionalService = details.AdditionalService;
                    obj.CustomerNotes = details.CustomerNotes;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.LocationId = details.LocationId;


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
                    obj.InvoiceTotal = details.InvoiceTotal;
                    obj.FCDiscount = details.FCDiscount;
                    obj.TotalTaxable = details.TotalTaxable;
                    obj.TotalTax = details.TotalTax;
                    obj.GrandTotal = details.GrandTotal;
                    obj.FCGrandTotal = details.FCGrandTotal;
                    obj.FCTaxable = details.FCTaxable;
                    obj.FCTax = details.FCTax;
                    obj.LPO = details.LPO;
                    obj.PONo = details.PONo;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BaseInvoiceamount = details.BaseInvoiceamount;
                    obj.JobId = details.JobId;
                    obj.Othercharges = details.Othercharges;
                    obj.PurchaseSlNo = details.PurchaseSlNo;
                    obj.CopyFlag=details.CopyFlag;
                    obj.ConfirmFlag = details.ConfirmFlag;
                    obj.Colour = details.Colour;
                    obj.CustomesDuty = details.CustomesDuty;
                    obj.ItemDescription = details.ItemDescription;
                    obj.Username = details.Username;



                    dt.Rows.Add
                    (obj.EntryDate, obj.DateofLoading, obj.BuyerNo, obj.Year, obj.Type, obj.Model, obj.Auction, obj.City, obj.LotNo, obj.VinNo,
                    obj.PointofLoading, obj.Price, obj.Delivery, obj.Shipping, obj.DealerFee, obj.StorageFee,
                    obj.LoadingFee, obj.LateFee, obj.Insurance, obj.CurrentBalance, obj.Payed_Amount, obj.Balance, obj.ContainerNo, obj.AdditionalService, obj.CustomerNotes,
                     obj.UId, obj.DeptId, obj.LocationId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.Terms,
                     obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate, obj.CurrencyId, obj.CurrencyRate, obj.InvoiceTotal, obj.FCDiscount,
                     obj.TotalTaxable, obj.TotalTax, obj.GrandTotal, obj.FCGrandTotal, obj.FCTaxable, obj.FCTax, obj.LPO, obj.PONo, obj.FCRoundOff, obj.RoundOff, obj.BaseInvoiceamount, obj.JobId, obj.Othercharges, obj.PurchaseSlNo,
                     obj.CopyFlag, obj.ConfirmFlag,obj.Colour, obj.CustomesDuty,obj.ItemDescription, obj.Username);
                }

                dsDataSet = obj.PurchaseImportInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseImportModel MModels = new PurchaseImportModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.InvoNo = row["invonum"].ToString();
                    oList.Add(MModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult PurchaseImportItemInsert(PurchaseImportModel PurchaseImportModel)
        {
            PurchaseImportModel obj = new PurchaseImportModel();

            List<PurchaseImportModel> oList = new List<PurchaseImportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseImportItemInsert(PurchaseImportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseImportModel MModels = new PurchaseImportModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.InvoNo = row["invonum"].ToString();
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
        public ActionResult PurchaseImportGetandGets(PurchaseImportModel PurchaseImportModel)
        {
            PurchaseImportModel obj = new PurchaseImportModel();

            List<PurchaseImportModel> oList = new List<PurchaseImportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PurchaseImportGetandGets(PurchaseImportModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseImportModel MModels = new PurchaseImportModel();
                    MModels.EntryDate               = row["EntryDate"].ToString(); 
                    MModels.DateofLoading           = row["DateofLoading"].ToString();
                    MModels.BuyerNo                 = row["BuyerNo"].ToString();
                    MModels.Year                    = row["ImportYear"].ToString(); 
                    MModels.Type                    = row["Type"].ToString();
                    MModels.Model                   = row["Model"].ToString();
                    MModels.Auction                 = row["Auction"].ToString();
                    MModels.City                    = row["City"].ToString();
                    MModels.LotNo                   = row["LotNo"].ToString();
                    MModels.VinNo                   = row["VinNo"].ToString();
                    MModels.PointofLoading          = row["PointofLoading"].ToString();
                    MModels.Price                   = Convert.ToDecimal(row["Price"].ToString());
                    MModels.Delivery                = Convert.ToDecimal(row["Delivery"].ToString());
                    MModels.Shipping                = Convert.ToDecimal(row["Shipping"].ToString());
                    MModels.DealerFee               = Convert.ToDecimal(row["DealerFee"].ToString());
                    MModels.StorageFee              = Convert.ToDecimal(row["StorageFee"].ToString());
                    MModels.LoadingFee              = Convert.ToDecimal(row["LoadingFee"].ToString());
                    MModels.LateFee                 = Convert.ToDecimal(row["LateFee"].ToString());
                    MModels.Insurance               = Convert.ToDecimal(row["Insurance"].ToString());
                    MModels.CurrentBalance          = Convert.ToDecimal(row["CurrentBalance"].ToString());
                    MModels.Payed_Amount            = Convert.ToDecimal(row["Payed_Amount"].ToString());
                    MModels.Balance                 = Convert.ToDecimal(row["Balance"].ToString());
                    MModels.ContainerNo             = row["ContainerNo"].ToString();
                    MModels.AdditionalService       = Convert.ToDecimal(row["AdditionalService"].ToString());
                    MModels.CustomerNotes           = row["CustomerNotes"].ToString();
                    MModels.UId                     = Convert.ToInt32(row["UserId"].ToString()); 
                    MModels.DeptId                  = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.LocationId              = Convert.ToInt32(row["LocationId"].ToString());
                    MModels.SlNo                    = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo                  = row["InvoNo"].ToString();
                    MModels.SupplierId              = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName            = row["CustName"].ToString();
                    MModels.PayType                 = row["PayType"].ToString();
                    MModels.PurchaseType            = row["PurchaseType"].ToString();
                    MModels.InvoDate                = row["InvoDate"].ToString();
                    MModels.Terms                   = row["Terms"].ToString(); 
                    MModels.DueDate                 = row["DueDate"].ToString(); 
                    MModels.LocnId                  = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.PlaceOfSupply           = Convert.ToInt32(row["PlaceOfSupply"].ToString());
                    MModels.JobNo                   = row["JobNo"].ToString(); 
                    MModels.ShipDate                = row["ShipDate"].ToString(); 
                    MModels.CurrencyId              = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate            = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.InvoiceTotal            = Convert.ToDecimal(row["InvoiceTotal"].ToString());                
                    MModels.LPO                     = row["LPO_No"].ToString();                                    
                    MModels.BaseInvoiceamount       = Convert.ToDecimal(row["BaseInvoiceTotal"].ToString());
                    MModels.JobId                   = Convert.ToInt32(row["JobId"].ToString());
                    MModels.Othercharges            = Convert.ToDecimal(row["Othercharges"].ToString());
                    MModels.finalflag               = Convert.ToInt32(row["finalflag"].ToString()); 
                    MModels.PurchaseSlNo            = Convert.ToInt32(row["PurchaseSlNo"].ToString());
                    MModels.Colour                  = row["Color"].ToString();
                    MModels.CustomesDuty            = Convert.ToDecimal(row["CustomsDuty"].ToString());
                    MModels.Username                = row["Name"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ImportNoSearch(PurchaseImportModel PurchaseImportModel) 
        {
            PurchaseImportModel obj = new PurchaseImportModel();

            List<PurchaseImportModel> oList = new List<PurchaseImportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ImportNoSearch(PurchaseImportModel, dbName); 
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseImportModel MModels = new PurchaseImportModel(); 
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.SupplierName = row["CustName"].ToString();
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
        public ActionResult UsedCarsOtherCostGets(PurchaseImportModel PurchaseImportModel)
        {
            PurchaseImportModel obj = new PurchaseImportModel();

            List<PurchaseImportModel> oList = new List<PurchaseImportModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.UsedCarsOtherCostGets(PurchaseImportModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PurchaseImportModel MModels = new PurchaseImportModel();
                    MModels.OtherCostName = row["OtherCostName"].ToString();
                    MModels.OtherCostDesc = row["OtherCostDesc"].ToString();
                    MModels.AccountId = Convert.ToInt32( row["AccountId"].ToString());
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
        public ActionResult DeletePurchaseImport(PurchaseInvoiceModel PurchaseInvoiceModel)
        {
            PurchaseImportModel obj = new PurchaseImportModel();
            List<PurchaseInvoiceModel> oList = new List<PurchaseInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeletePurchaseImport(PurchaseInvoiceModel, dbName);
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
    }
}