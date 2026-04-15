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
    public class ProductionEntryController : Controller
    {
        // GET: ProductionEntry
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }


        //insert Production Entry
        [HttpPost]
        public JsonResult ProductionEntryInsertandUpdate(List<ProductionEntryInsertModel> ProductionEntryInsertModel)
        {
            ProductionEntryInsertModel obj = new ProductionEntryInsertModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ProductionEntryInsertModel> oList = new List<ProductionEntryInsertModel>();

            try
            {
                string[] tmpTable = new string[26];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "ItemCode";
                tmpTable[2] = "ItemDescription";
                tmpTable[3] = "UnitId";
                tmpTable[4] = "Quantity";
                tmpTable[5] = "Price";
                tmpTable[6] = "Total";
                tmpTable[7] = "Location";
                tmpTable[8] = "Currency";
                tmpTable[9] = "ProEntryNo";
                tmpTable[10] = "ProEntryDate";
                tmpTable[11] = "DebitAccount";
                tmpTable[12] = "CreditAccount";
                tmpTable[13] = "ItemId";
                tmpTable[14] = "Rate";
                tmpTable[15] = "ProductionQuantity";
                tmpTable[16] = "CostPerItem";
                tmpTable[17] = "TotalCostFC";
                tmpTable[18] = "TotalProdCost";
                tmpTable[19] = "MaterialTotal";
                tmpTable[20] = "Remarks";
                tmpTable[21] = "TotalOtherCost";
                tmpTable[22] = "ProjectJobId";
                tmpTable[23] = "UId";
                tmpTable[24] = "DeptId";
                tmpTable[25] = "DelFlag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in ProductionEntryInsertModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemDescription = details.ItemDescription;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Total = details.Total;
                    obj.Location = details.Location;
                    obj.Currency = details.Currency;
                    obj.ProEntryNo = details.ProEntryNo;
                    obj.ProEntryDate = details.ProEntryDate;
                    obj.DebitAccount = details.DebitAccount;
                    obj.CreditAccount = details.CreditAccount;

                    obj.ProductionItemId = details.ProductionItemId;
                    obj.Rate = details.Rate;
                    obj.ProductionQuantity = details.ProductionQuantity;
                    obj.CostPerItem = details.CostPerItem;
                    obj.TotalCostFC = details.TotalCostFC;
                    obj.TotalProdCost = details.TotalProdCost;
                    obj.MaterialTotal = details.MaterialTotal;
                    obj.Remarks = details.Remarks;
                    obj.TotalOtherCost = details.TotalOtherCost;
                    obj.ProjectJobId = details.ProjectJobId;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add
                    (obj.ProductId, obj.ItemCode, obj.ItemDescription, obj.UnitId, obj.Quantity, obj.Price, obj.Total, obj.Location, obj.Currency, obj.ProEntryNo,
                    obj.ProEntryDate, obj.DebitAccount, obj.CreditAccount, obj.ProductionItemId, obj.Rate, obj.ProductionQuantity, obj.CostPerItem, obj.TotalCostFC,
                    obj.TotalProdCost, obj.MaterialTotal, obj.Remarks, obj.TotalOtherCost, obj.ProjectJobId, obj.UserId, obj.DeptId, obj.DelFlag);
                }

                dsDataSet = obj.ProductionEntryInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductionEntryInsertModel MModels = new ProductionEntryInsertModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.ProEntryNo = Convert.ToInt32(row["pronum"].ToString());
                    MModels.ItemCode = row["ProductCode"].ToString();
                    MModels.ItemDescription = row["ProductDescr"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["TotalQty"].ToString());
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
        public JsonResult OtherCostInsertandUpdate(List<ProductionEntryInsertModel> ProductionEntryInsertModel)
        {
            ProductionEntryInsertModel obj = new ProductionEntryInsertModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ProductionEntryInsertModel> oList = new List<ProductionEntryInsertModel>();

            try
            {
                string[] tmpTable = new string[13];
                tmpTable[0] = "OCId";
                tmpTable[1] = "Pronum";
                tmpTable[2] = "ProDate";
                tmpTable[3] = "PayType";
                tmpTable[4] = "AccId";
                tmpTable[5] = "Description";
                tmpTable[6] = "OCAmount";
                tmpTable[7] = "OCFCAmount";
                tmpTable[8] = "CurrencyId";
                tmpTable[9] = "CurrencyRate";
                tmpTable[10] = "UserId";
                tmpTable[11] = "DepartmentId";
                tmpTable[12] = "DeleteFlag";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ProductionEntryInsertModel)
                {
                    obj.OCId = details.OCId;
                    obj.Pronum = details.Pronum;
                    obj.ProDate = details.ProDate;
                    obj.PayType = details.PayType;
                    obj.AccId = details.AccId;
                    obj.Description = details.Description;
                    obj.OCAmount = details.OCAmount;
                    obj.OCFCAmount = details.OCFCAmount;

                    obj.CurrencyId = details.CurrencyId;
                    obj.CurrencyRate = details.CurrencyRate;
                    obj.UserId = details.UserId;
                    obj.DepartmentId = details.DepartmentId;
                    obj.DeleteFlag = details.DeleteFlag;

                    dt.Rows.Add
                    (obj.OCId, obj.Pronum, obj.ProDate, obj.PayType, obj.AccId, obj.Description, obj.OCAmount, obj.OCFCAmount, obj.CurrencyId, obj.CurrencyRate, obj.UserId, obj.DepartmentId, obj.DeleteFlag);
                }

                dsDataSet = obj.OtherCostInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductionEntryInsertModel MModels = new ProductionEntryInsertModel();
                    MModels.flag = row["Flag"].ToString();
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

        public ActionResult CopyProdEntry(ProductionEntryCopyModel ProductionEntryCopyModel)
        {

            ProductionEntryCopyModel obj = new ProductionEntryCopyModel();
            List<ProductionEntryCopyModel> oList = new List<ProductionEntryCopyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CopyProdEntry(ProductionEntryCopyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductionEntryCopyModel MModels = new ProductionEntryCopyModel();
                    MModels.ProEntryNo = Convert.ToInt32(row["ProEntryNo"].ToString());
                    MModels.ProEntryDate = row["ProEntryDate"].ToString();
                    MModels.DAccount = Convert.ToInt32(row["DAccount"].ToString());
                    MModels.ProductionQuantity = Convert.ToInt32(row["ProductionQuantity"].ToString());
                    MModels.CostPerItem = Convert.ToDecimal(row["CostPerItem"].ToString());
                    MModels.MaterialTotal = Convert.ToDecimal(row["MaterialTotal"].ToString());
                    MModels.TotalOtherCost = Convert.ToDecimal(row["TotalOtherCost"].ToString());
                    MModels.TotalCostFC = Convert.ToDecimal(row["TotalCostFC"].ToString());
                    MModels.TotalProdCost = Convert.ToDecimal(row["TotalProdCost"].ToString());
                    MModels.CAccount = Convert.ToInt32(row["CAccount"].ToString());
                    MModels.location = row["location"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.Currency = Convert.ToInt32(row["Currency"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.DAccountName = row["DAccountName"].ToString();
                    MModels.CAccountName = row["CAccountName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        //copy production entry into grid
        [HttpPost]
        public ActionResult ProductionEntryGetandGets(ProductionEntryCopyModel ProductionEntryCopyModel)
        {
            ProductionEntryCopyModel obj = new ProductionEntryCopyModel();

            List<ProductionEntryCopyModel> oList = new List<ProductionEntryCopyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductionEntryGetandGets(ProductionEntryCopyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductionEntryCopyModel MModels = new ProductionEntryCopyModel();

                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());

                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();

                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Price = Convert.ToDecimal(row["Price"].ToString());
                    MModels.Total = Convert.ToDecimal(row["Total"].ToString());


                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        //copy othercost into grid

        [HttpPost]
        public ActionResult OtherCostGetandGets(ProductionEntryCopyModel ProductionEntryCopyModel)
        {
            ProductionEntryCopyModel obj = new ProductionEntryCopyModel();

            List<ProductionEntryCopyModel> oList = new List<ProductionEntryCopyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OtherCostGetandGets(ProductionEntryCopyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProductionEntryCopyModel MModels = new ProductionEntryCopyModel();

                    MModels.VType = row["VType"].ToString();
                    MModels.Acc_Description = row["Acc_Description"].ToString();
                    MModels.VDescription = row["VDescription"].ToString();
                    MModels.AccId = Convert.ToInt32(row["AccId"].ToString());
                    MModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    MModels.BaseAmount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    MModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    MModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());


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