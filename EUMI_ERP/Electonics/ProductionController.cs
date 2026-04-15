using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.Electonics
{
    public class ProductionController : Controller
    {
        // GET: Production
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Production()
        {
            return View();
        }
        public ActionResult ElectronicsProductMaster()
        {
            return View();
        }
               
        [HttpPost]
        public ActionResult MainItemDetailsGetandGets(ElectronicsProductionModel ElectronicsProductionModel)

        {
            ElectronicsProductionModel obj = new ElectronicsProductionModel();

            List<ElectronicsProductionModel> oList = new List<ElectronicsProductionModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.MainItemDetailsGetandGets(ElectronicsProductionModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ElectronicsProductionModel VEModels = new ElectronicsProductionModel();
                    VEModels.Description = row["Description"].ToString();
                    VEModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    VEModels.SellingPrice = row["AvgCost"].ToString();                  
                    VEModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());                
                    VEModels.productslno = row["Model1"].ToString();
                    VEModels.ItemCode = row["ItemCode"].ToString();
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
        public ActionResult ElectronicsProductionProductSearch(ElectronicsProductionModel ElectronicsProductionModel)

        {
            ElectronicsProductionModel obj = new ElectronicsProductionModel();

            List<ElectronicsProductionModel> oList = new List<ElectronicsProductionModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ElectronicsProductionProductSearch(ElectronicsProductionModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ElectronicsProductionModel VEModels = new ElectronicsProductionModel();               
                    VEModels.AccessoriesName = row["name"].ToString();
                    VEModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    VEModels.ItemCode = row["code"].ToString();
                    VEModels.Amount = row["amount"].ToString();
                    VEModels.materialId = Convert.ToInt32(row["materialId"].ToString());
                    VEModels.materialslno = row["materialslno"].ToString();
                    VEModels.totamount = row["totamount"].ToString();
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
        public ActionResult RemoveItem(ElectronicsProductionModel ElectronicsProductionModel)

        {
            ElectronicsProductionModel obj = new ElectronicsProductionModel();

            List<ElectronicsProductionModel> oList = new List<ElectronicsProductionModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.RemoveItem(ElectronicsProductionModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ElectronicsProductionModel VEModels = new ElectronicsProductionModel();
                    VEModels.Code = row["Code"].ToString();
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

        [HttpPost]
        public JsonResult ElectronicProductionInsertandUpdate(List<electronicproductionInsertModel> electronicproductionInsertModel)
        {
            electronicproductionInsertModel obj = new electronicproductionInsertModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<electronicproductionInsertModel> oList = new List<electronicproductionInsertModel>();

            try
            {
                string[] tmpTable = new string[27];


                tmpTable[0] = "MaterialCode";
                tmpTable[1] = "MaterialName";
                tmpTable[2] = "Quantity";
                tmpTable[3] = "UsedQty";
                tmpTable[4] = "Total";
                tmpTable[5] = "MaterialSerialNo";
                tmpTable[6] = "ItemId";
                tmpTable[7] = "ItemCode";
                tmpTable[8] = "ItemName";
                tmpTable[9] = "DebitAccount";
                tmpTable[10] = "CreditAccount";
                tmpTable[11] = "SerialNo";
                tmpTable[12] = "Unit";
                tmpTable[13] = "SellPrice";
                tmpTable[14] = "ProductionQuantity";
                tmpTable[15] = "Profit";
                tmpTable[16] = "CostPrice";
                tmpTable[17] = "SellingPrice";
                tmpTable[18] = "Date";
                tmpTable[19] = "UId";
                tmpTable[20] = "DeptId";
                tmpTable[21] = "Location";
                tmpTable[22] = "MaterialId";
                tmpTable[23] = "ProductionNo";
                tmpTable[24] = "MaterialCostPrice"; 
                 tmpTable[25] = "flag";
                tmpTable[26] = "BalanceQty"; 
                 dt = Common.CreateTable(tmpTable);

                foreach (var details in electronicproductionInsertModel)
                {
                    obj.MaterialCode = details.MaterialCode;
                    obj.MaterialName = details.MaterialName;
                    obj.Quantity = details.Quantity;
                    obj.UsedQty = details.UsedQty;
                    obj.Total = details.Total;
                    obj.MaterialSerialNo = details.MaterialSerialNo;

                    obj.ItemId = details.ItemId;
                    obj.ItemCode = details.ItemCode;
                    obj.ItemName = details.ItemName;
                    obj.DebitAccount = details.DebitAccount;
                    obj.CreditAccount = details.CreditAccount;
                    obj.SerialNo = details.SerialNo;
                    obj.Unit = details.Unit;
                    obj.SellPrice = details.SellPrice;
                    obj.ProductionQuantity = details.ProductionQuantity;
                    obj.Profit = details.Profit;

                    obj.CostPrice = details.CostPrice;
                    obj.SellingPrice = details.SellingPrice;
                    obj.Date = details.Date;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.Location = details.Location;
                    obj.MaterialId = details.MaterialId;
                    obj.ProductionNo = details.ProductionNo;
                    obj.MaterialCostPrice = details.MaterialCostPrice;
                    obj.flag = details.flag;
                    obj.BalanceQty = details.BalanceQty;
                    dt.Rows.Add
                    (obj.MaterialCode, obj.MaterialName, obj.Quantity, obj.UsedQty, obj.Total, obj.MaterialSerialNo, obj.ItemId, obj.ItemCode,
                    obj.ItemName,
                    obj.DebitAccount, obj.CreditAccount, obj.SerialNo,
                    obj.Unit, obj.SellPrice, obj.ProductionQuantity,
                    obj.Profit, obj.CostPrice, obj.SellingPrice, obj.Date,
                    obj.UId, obj.DeptId, obj.Location, obj.MaterialId, obj.ProductionNo, obj.MaterialCostPrice, obj.flag, obj.BalanceQty);
                }

                dsDataSet = obj.ElectronicProductionInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    electronicproductionInsertModel MModels = new electronicproductionInsertModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.ProductionNo = Convert.ToInt32(row["pronum"].ToString());
                    MModels.ItemCode = row["ProductCode"].ToString();
                    MModels.ItemName = row["ProductDescr"].ToString();
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

        public ActionResult ElectronicsProductionnumberSearch(electronicproductionInsertModel electronicproductionInsertModel)
        {

            electronicproductionInsertModel obj = new electronicproductionInsertModel();
            List<electronicproductionInsertModel> oList = new List<electronicproductionInsertModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ElectronicsProductionnumberSearch(electronicproductionInsertModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    electronicproductionInsertModel MModels = new electronicproductionInsertModel();
                    MModels.ProductionNo = Convert.ToInt32(row["ProductionNo"].ToString());
                    MModels.Date = row["Date"].ToString();
                    MModels.DAccount = row["DAccount"].ToString();
                    MModels.ProductionQuantity = Convert.ToInt32(row["ProductionQuantity"].ToString());
                    MModels.Unit = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ItemName = row["ItemName"].ToString();
                    MModels.Profit = Convert.ToDecimal(row["profit"].ToString());
                    MModels.CostPrice = Convert.ToDecimal(row["costPrice"].ToString());
                    MModels.SellPrice = Convert.ToDecimal(row["SellPrice"].ToString());
                    MModels.SellingPrice = row["SellingPrice"].ToString();
                    MModels.CAccount = row["CAccount"].ToString();
                    MModels.DAccountName = row["DAccountName"].ToString();
                    MModels.CAccountName = row["CAccountName"].ToString();
                    MModels.SerialNo = row["SerialNo"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();                   
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
        public ActionResult ElectronicsProductionGetandGets(electronicproductionInsertModel electronicproductionInsertModel)
        {
            electronicproductionInsertModel obj = new electronicproductionInsertModel();

            List<electronicproductionInsertModel> oList = new List<electronicproductionInsertModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ElectronicsProductionGetandGets(electronicproductionInsertModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    electronicproductionInsertModel MModels = new electronicproductionInsertModel();

                    MModels.MaterialCode = row["MaterialCode"].ToString();
                    MModels.MaterialSerialNo = row["MaterialSerialNo"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.MaterialName = row["MaterialName"].ToString();
                    MModels.MaterialCostPrice = Convert.ToDecimal(row["MaterialCostPrice"].ToString());
                    MModels.Total = Convert.ToDecimal(row["Total"].ToString());
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.UsedQty = Convert.ToInt32(row["UsedQty"].ToString());
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