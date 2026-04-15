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
    public class MRVPurchaseController : Controller
    {
        // GET: MRVPurchase
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult MRV()
        {
            return View();
        }
        public ActionResult MRVNew()
        {
            return View();
        }
        public ActionResult PInvoiceMRV()
        {
            return View();
        }
        public ActionResult PInvoiceMRVNew() 
        {
            return View();
        }

        [HttpPost]
        public JsonResult MRVInsertandUpdate(List<MRVModel> MRVModel)
        {
            MRVModel obj = new MRVModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<MRVModel> oList = new List<MRVModel>();

            try
            {
                string[] tmpTable = new string[54];
                tmpTable[0] = "MRVNo";
                tmpTable[1] = "DONo";
                tmpTable[2] = "SupplierId";
                tmpTable[3] = "PayType";
                tmpTable[4] = "PurchaseType";
                tmpTable[5] = "MRVDate";
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
                tmpTable[25] = "MRVSubId";
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
                tmpTable[52] = "PerformaNo";
                tmpTable[53] = "PerformaSubId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in MRVModel)
                {
                    obj.MRVNo = details.MRVNo;
                    obj.DONo = details.DONo;
                    obj.SupplierId = details.SupplierId;
                    obj.PayType = details.PayType;
                    obj.PurchaseType = details.PurchaseType;
                    obj.MRVDate = details.MRVDate;
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
                    obj.MRVSubId = details.MRVSubId;
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
                    obj.PerformaNo = details.PerformaNo;
                    obj.PerformaSubId = details.PerformaSubId;

                    dt.Rows.Add
                    (obj.MRVNo, obj.DONo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.MRVDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.MRVSubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.OrderId, obj.DeleteFlag, obj.LPO, details.OrderSubId, obj.PONo, obj.PerformaNo, obj.PerformaSubId);
                }

                dsDataSet = obj.MRVInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVModel MModels = new MRVModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.MRVNo = Convert.ToInt32(row["MRVNo"].ToString());
                    MModels.MRVDate = row["MRVDate"].ToString();
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

        public ActionResult SupplierDONoSearch(MRVModel MRVModel)
        {
            MRVModel obj = new MRVModel();

            List<MRVModel> cList = new List<MRVModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SupplierDONoSearch(MRVModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVModel MModels = new MRVModel();
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
        public ActionResult MRVSerialNoSearch(MRVModel MRVModel)
        {
            MRVModel obj = new MRVModel();

            List<MRVModel> oList = new List<MRVModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRVSerialNoSearch(MRVModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVModel MModels = new MRVModel();
                    MModels.MRVNo = Convert.ToInt32(row["MRVNo"].ToString());
                    MModels.DONo = row["DONo"].ToString();
                    MModels.MRVDate = row["MRVDate"].ToString();
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
        public ActionResult MRVGetandGets(MRVModel MRVModel)
        {
            MRVModel obj = new MRVModel();

            List<MRVModel> oList = new List<MRVModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRVGetandGets(MRVModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVModel MModels = new MRVModel();
                    MModels.MainId = Convert.ToInt32(row["MRVMainId"].ToString());
                    MModels.MRVNo = Convert.ToInt32(row["MRVNo"].ToString());
                    MModels.DONo = row["DONo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.MRVDate = row["MRVDate"].ToString();
                    MModels.Terms = row["Terms"].ToString();
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


                    MModels.MRVSubId = Convert.ToInt32(row["SubId"].ToString());
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
                    MModels.PerformaNo= row["Performa_No"].ToString();
                    MModels.PerformaNos = row["Performa_No1"].ToString();
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
        public JsonResult MRVPurchaseInsertandUpdate(List<MRVPurchase> MRVPurchase)
        {
            MRVPurchase obj = new MRVPurchase();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<MRVPurchase> oList = new List<MRVPurchase>();

            try
            {
                string[] tmpTable = new string[60];
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
                tmpTable[52] = "MRVId";
                tmpTable[53] = "DeleteFlag";
                tmpTable[54] = "MRVNo";
                tmpTable[55] = "MRVSubId";
                tmpTable[56] = "MRVNumber";
                tmpTable[57] = "FCRoundOff";
                tmpTable[58] = "RoundOff";
                tmpTable[59] = "BaseInvoiceamount";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in MRVPurchase)
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
                    obj.TotalDiscount = details.TotalDiscount;  
                    obj.FCDiscount = details.FCDiscount;                      
                    obj.TotalTaxable = details.TotalTaxable;   
                    obj.TotalTax = details.TotalTax;          
                    obj.GrandTotal = details.GrandTotal;       
                    obj.InvoiceTotal = details.InvoiceTotal;   
                    obj.FCTaxable = details.FCTaxable;        
                    obj.FCTax = details.FCTax;                 
                    obj.FCGrandTotal = details.FCGrandTotal;  
                    obj.BillDiscount = details.BillDiscount;   
                    obj.BillDisc = details.BillDisc;          
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
                    obj.OtherCost = details.OtherCost;     
                    obj.MRVId = details.MRVId;
                    obj.DeleteFlag = details.DeleteFlag;
                    obj.MRVNo = details.MRVNo;                      //Free text in Purchase Invoice View
                    obj.MRVSubId = details.MRVSubId;
                    obj.MRVNumber = details.MRVNumber;
                    obj.FCRoundOff = details.FCRoundOff;
                    obj.RoundOff = details.RoundOff;
                    obj.BaseInvoiceamount = details.BaseInvoiceamount;

                    dt.Rows.Add
                    (obj.PurchaseInvoiceMainId, obj.SlNo, obj.InvoNo, obj.SupplierId, obj.PayType, obj.PurchaseType, obj.InvoDate, obj.Terms, obj.DueDate, obj.LocnId, obj.PlaceOfSupply, obj.JobNo, obj.ShipDate,
                    obj.CurrencyId, obj.CurrencyRate, obj.TotalDiscount, obj.FCDiscount, obj.TotalTaxable, obj.TotalTax, obj.GrandTotal,
                    obj.InvoiceTotal, obj.FCTaxable, obj.FCTax, obj.FCGrandTotal,
                    obj.BillDiscount, obj.BillDisc, obj.Remarks, obj.DepartmentId, obj.UserId,
                    obj.PurchaseInvoiceSubId, obj.BatchSlno, obj.Batch, obj.ItemId, obj.ItemCode, obj.ItemDescription, obj.LocationId, obj.UnitId, obj.Quantity, obj.Fraction,
                    obj.Rate, obj.BaseRate, obj.Discount, obj.BaseDiscount, obj.TaxId, obj.TaxRate, obj.TaxableAmount, obj.TaxAmount, obj.TotalAmount,
                    obj.BaseTaxable, obj.BaseTax, obj.BaseAmount, obj.OtherCost, obj.MRVId, obj.DeleteFlag, obj.MRVNo, details.MRVSubId, obj.MRVNumber, obj.FCRoundOff, obj.RoundOff, obj.BaseInvoiceamount);
                }

                dsDataSet = obj.MRVPurchaseInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVPurchase MModels = new MRVPurchase();
                    MModels.Status = row["Status"].ToString();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoDate = row["InvoDate"].ToString();
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
        public JsonResult OtherCostInsertandUpdate(List<MRVPurchase> MRVPurchase)
        {
            MRVPurchase obj = new MRVPurchase();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<MRVPurchase> oList = new List<MRVPurchase>();

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

                foreach (var details in MRVPurchase)
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
                    MRVPurchase MModels = new MRVPurchase();
                    MModels.InvoNo = row["InvId"].ToString();

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        public ActionResult MRVPurchaseGetandGets(MRVPurchase MRVPurchase)
        {
            MRVPurchase obj = new MRVPurchase();

            List<MRVPurchase> oList = new List<MRVPurchase>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRVPurchaseGetandGets(MRVPurchase, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVPurchase MModels = new MRVPurchase();
                    MModels.PurchaseInvoiceMainId = Convert.ToInt32(row["MPurMainId"].ToString());
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.SupplierId = Convert.ToInt32(row["SupplierId"].ToString());
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.Terms = row["Terms"].ToString();
                    MModels.DueDate = row["DueDate"].ToString();
                    MModels.LocnId = Convert.ToInt32(row["LocnId"].ToString());
                    MModels.PlaceOfSupply = Convert.ToInt32(row["PlaceOfSupply"].ToString());
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
                    MModels.MRVNo = row["MRV_No"].ToString();


                    MModels.PurchaseInvoiceSubId = Convert.ToInt32(row["SubId"].ToString());
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
                    MModels.OtherCost = Convert.ToDecimal(row["OtherCost"].ToString());



                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult MRVPurchaseOtherCostGetandGets(MRVPurchase MRVPurchase)
        {
            MRVPurchase obj = new MRVPurchase();

            List<MRVPurchase> dList = new List<MRVPurchase>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRVPurchaseOtherCostGetandGets(MRVPurchase, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVPurchase MModels = new MRVPurchase();
                    MModels.PayType = row["VType"].ToString();
                    MModels.AccId = Convert.ToInt32(row["AccId"].ToString());
                    MModels.AccName = row["Acc_Description"].ToString();
                    MModels.Description = row["VDescription"].ToString();
                    MModels.OCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
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

        public ActionResult MRVPurchaseSerialNoSearch(MRVPurchase MRVPurchase)
        {
            MRVPurchase obj = new MRVPurchase();

            List<MRVPurchase> oList = new List<MRVPurchase>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRVPurchaseSerialNoSearch(MRVPurchase, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVPurchase MModels = new MRVPurchase();
                    MModels.SlNo = Convert.ToInt32(row["SlNo"].ToString());
                    MModels.InvoNo = row["InvoNo"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
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
        public ActionResult PendingMRVGets(MRVModel MRVModel)
        {
            MRVModel obj = new MRVModel();

            List<MRVModel> oList = new List<MRVModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingMRVGets(MRVModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVModel MModels = new MRVModel();
                    MModels.MRVNo = Convert.ToInt32(row["MRVNo"].ToString());
                    MModels.DONo = row["DONo"].ToString();
                    MModels.MRVDate=row["MRVDate"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.CurrencyName = row["CurrencyName"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
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
        public ActionResult PendingMRVGetProduct(MRVModel MRVModel)
        {
            MRVModel obj = new MRVModel();

            List<MRVModel> oList = new List<MRVModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingMRVGetProduct(MRVModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVModel MModels = new MRVModel();
                    MModels.MRVSubId = Convert.ToInt32(row["SubId"].ToString());
                    MModels.MRVNo = Convert.ToInt32(row["InvMRVSlNo"].ToString());
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
        public ActionResult DeleteMRV(MRVModel MRVModel)
        {
            MRVModel obj = new MRVModel();
            List<MRVModel> oList = new List<MRVModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeleteMRV(MRVModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVModel LModels = new MRVModel();
                    LModels.Status = row["Status"].ToString();
                    LModels.MRVNo =Convert.ToInt32( row["SlNo"].ToString());
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
        public ActionResult DeleteMRVPurchase(MRVPurchase MRVPurchase)
        {
            MRVPurchase obj = new MRVPurchase();
            List<MRVPurchase> oList = new List<MRVPurchase>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeleteMRVPurchase(MRVPurchase, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVPurchase LModels = new MRVPurchase();
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



        public ActionResult MRVList(MRVPurchase MRVPurchase)
        {
            MRVPurchase obj = new MRVPurchase();

            List<MRVPurchase> oList = new List<MRVPurchase>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MRVList(MRVPurchase, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    MRVPurchase MModels = new MRVPurchase();
                    MModels.MRVNo = row["MRVNo"].ToString();
                    MModels.DONo= row["DONo"].ToString();
                    MModels.SupplierName = row["CustName"].ToString();
                    MModels.InvoDate = row["MRVDate"].ToString();
                    MModels.PurchaseType = row["PurchaseType"].ToString();
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.GrandTotal = Convert.ToDecimal(row["FCTotal"].ToString());
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.LPONo = row["LPO_No"].ToString();
                    MModels.PerformaNo = row["Performa_NO"].ToString();
                    MModels.User = row["Name"].ToString();
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
    }

}