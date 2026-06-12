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
    public class InventoryController : Controller
    {
        // GET: inventory
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult PurchaseInvoice()
        {
            return View();
        }
        public ActionResult PurchaseEnquiry()
        {
            return View();
        }
        public ActionResult PurchaseOrder()
        {
            return View();
        }

        public ActionResult SalesInvoice()
        {
            return View();
        }

        public ActionResult StockTransferOut()
        {
            return View();
        }
        public ActionResult StockTransferIn()
        {
            return View();
        }
        public ActionResult ProductionEntry()
        {
            return View();
        }

        public ActionResult StockAdjustment()
        {
            return View();
        }
        public ActionResult PhysicalVariationTransfer()
        {
            return View();
        }
        public ActionResult PriceManager()
        {
            return View();
        }
        public ActionResult OpeningStockEntry()
        {
            return View();
        }
        public ActionResult LocationTransfer()
        {
            return View();
        }

        public ActionResult PackingHistory()
        {
            return View();
        }
        public ActionResult CashCollection()
        {
            return View();
        }
        public ActionResult test()
        {
            return View();
        }
        public ActionResult SalesInvoiceNew() 
        {
            return View();
        }

        public ActionResult LocationTransferSpareparts()
        {
            return View();
        }
        public ActionResult Scanner()
        {
            return View();
        }
        [HttpPost]
        public JsonResult StocktransferInInsert(List<StockTransferOutModel> StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();

            try
            {
                string[] tmpTable = new string[18];
                tmpTable[0] = "STONo";
                tmpTable[1] = "STInNo";
                tmpTable[2] = "ProductId";
                tmpTable[3] = "UnitId";
                tmpTable[4] = "Quantity";
                tmpTable[5] = "Price";
                tmpTable[6] = "Total";
                
                tmpTable[7] = "LoginLocation";
                tmpTable[8] = "TransferLocation";
                tmpTable[9] = "STInDate";
                tmpTable[10] = "DebitAccount";
                tmpTable[11] = "CreditAccount";
                tmpTable[12] = "Comments";
                tmpTable[13] = "STOId";
                tmpTable[14] = "UId";
                tmpTable[15] = "DeptId";
                tmpTable[16] = "DelFlag";
                tmpTable[17] = "outstatus";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in StockTransferOutModel)
                {
                    obj.STONo = details.STONo;
                    obj.STInNo = details.STInNo;
                    obj.ProductId = details.ProductId;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Total = details.Total;
                  
                    obj.LoginLocation = details.LoginLocation;
                    obj.TransferLocation = details.TransferLocation;
                    obj.STInDate = details.STInDate;
                    obj.DebitAccount = details.DebitAccount;
                    obj.CreditAccount = details.CreditAccount;

                    obj.Comments = details.Comments;
                    obj.STOId = details.STOId;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    obj.outstatus = details.outstatus;
                    dt.Rows.Add
                    (obj.STONo, obj.STInNo, obj.ProductId, obj.UnitId, obj.Quantity, obj.Price, obj.Total,obj.LoginLocation, obj.TransferLocation, obj.STInDate,
                    obj.DebitAccount, obj.CreditAccount, obj.Comments, obj.STOId,obj.UId, obj.DeptId, obj.DelFlag, obj.outstatus);
                }

                dsDataSet = obj.StocktransferInInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.STInNo = Convert.ToInt32(row["stinnum"].ToString());
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
        public JsonResult StocktransferOutInsertandUpdate(List<StockTransferOutModel> StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();

            try
            {
                string[] tmpTable = new string[16];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "Description";
                tmpTable[2] = "UnitId";
                tmpTable[3] = "Quantity";
                tmpTable[4] = "Price";
                tmpTable[5] = "Total";
                tmpTable[6] = "STONo";
                tmpTable[7] = "FromLocation";
                tmpTable[8] = "ToLocation";
                tmpTable[9] = "STODate";
                tmpTable[10] = "DebitAccount";
                tmpTable[11] = "CreditAccount";
                tmpTable[12] = "Comments";
                tmpTable[13] = "UId";
                tmpTable[14] = "DeptId";
                tmpTable[15] = "DelFlag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in StockTransferOutModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.Description = details.Description;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Total = details.Total;
                    obj.STONo = details.STONo;

                    obj.FromLocation = details.FromLocation;
                    obj.ToLocation = details.ToLocation;
                    obj.STODate = details.STODate;
                    obj.DebitAccount = details.DebitAccount;
                    obj.CreditAccount = details.CreditAccount;

                    obj.Comments = details.Comments;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add
                    (obj.ProductId, obj.Description, obj.UnitId, obj.Quantity, obj.Price, obj.Total, obj.STONo, obj.FromLocation, obj.ToLocation, obj.STODate,
                    obj.DebitAccount, obj.CreditAccount, obj.Comments, obj.UId, obj.DeptId, obj.DelFlag);
                }

                dsDataSet = obj.StocktransferOutInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.STONo = Convert.ToInt32(row["stonum"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
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
        //copy
        [HttpPost]
        public ActionResult StockTransferOutGetandGets(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockTransferOutGetandGets(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                  
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();

                    MModels.Description = row["Description"].ToString();
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

        
        //fill STIn in first table based on loc
        [HttpPost]
        public ActionResult StockDetailsGetsbyLocation(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockDetailsGetsbyLocation(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.STONo = Convert.ToInt32(row["STONo"].ToString());                    
                    MModels.STODate = row["STODate"].ToString();
                    MModels.DebitAccount = Convert.ToInt32(row["DebitAccount"].ToString());
                    MModels.CreditAccount = Convert.ToInt32(row["CreditAccount"].ToString());                   
                    MModels.FromLocationName = row["LocationName"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
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

//STIn 2nd table Based On Item
        [HttpPost]
        public ActionResult StockTransferOutGetProduct(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockTransferOutGetProduct(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.STOSubId = Convert.ToInt32(row["STOSubId"].ToString());
                    MModels.STONo = Convert.ToInt32(row["STONo"].ToString());                  
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString(); 
                    MModels.Description = row["Description"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["qty"].ToString());
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
        [HttpPost]

        public ActionResult StockOutnumberSearch(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockOutnumberSearch(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.STONo = Convert.ToInt32(row["STONo"].ToString());
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.LocFrom = row["Flocation"].ToString();
                    MModels.LocTo = row["Tlocation"].ToString();
                    MModels.STODate = row["STODate"].ToString();
                    MModels.DAccount = Convert.ToInt32(row["DAccount"].ToString());
                    MModels.CAccount = Convert.ToInt32(row["CAccount"].ToString());
                    MModels.Comments = row["Comments"].ToString();
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
        [HttpPost]

        public ActionResult StockInnumberSearch(StockTransferOutModel StockTransferOutModel)



        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockInnumberSearch(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.STInMainId = Convert.ToInt32(row["STInMainId"].ToString());
                    MModels.STInNo = Convert.ToInt32(row["STInNo"].ToString());
                    MModels.LoginLocation = Convert.ToInt32(row["LoginLocation"].ToString());
                    MModels.TransferLocation = Convert.ToInt32(row["TransferLocation"].ToString());                   
                    MModels.STInDate = row["STInDate"].ToString();
                    MModels.DebitAccount = Convert.ToInt32(row["DebitAccount"].ToString());
                    MModels.CreditAccount = Convert.ToInt32(row["CreditAccount"].ToString());
                    MModels.Comments = row["Comments"].ToString();
                    MModels.FromLocationName = row["FromLocationName"].ToString();
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
        public ActionResult StockInnumberSearchgrid(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockInnumberSearchgrid(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();                    
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());                                      
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
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

        [HttpPost]

        public ActionResult AccountNumberSearch(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountNumberSearch(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();

                    MModels.DebitAccount = Convert.ToInt32(row["Acc_Code"].ToString());
                    MModels.AccountDescription = row["Acc_Description"].ToString();                  
                    MModels.AccountId = Convert.ToInt32(row["Acc_Id"].ToString());                
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
        public ActionResult ExpenseAccountCodeSearch(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ExpenseAccountCodeSearch(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();

                    MModels.DebitAccount = Convert.ToInt32(row["Acc_Code"].ToString());
                    MModels.AccountDescription = row["Acc_Description"].ToString();
                    MModels.AccountId = Convert.ToInt32(row["Acc_Id"].ToString());
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
        public ActionResult ExpenseAccountGroupSearch(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ExpenseAccountGroupSearch(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();

                    MModels.DebitAccount = Convert.ToInt32(row["AcntCode"].ToString());
                    MModels.AccountDescription = row["AcntDescription"].ToString();
                    MModels.AccountId = Convert.ToInt32(row["AcntId"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);
        }


        //search Product in stock adjustment
        [HttpPost]

        public ActionResult ProductSearchStockAdjustment(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductSearchStockAdjustment(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    //MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    //MModels.UnitName = row["UnitName"].ToString();
                    //MModels.VatId = Convert.ToInt32(row["VatId"].ToString());                  
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.stocktotloseqty = Convert.ToInt32(row["Stock_TotLoseQty"].ToString());
                    //MModels.OpeningQty = Convert.ToInt32(row["Stock_OpeningQty"].ToString());
                    //MModels.GrpName = row["GrpName"].ToString();
                    //MModels.SbgrpId = Convert.ToInt32(row["SubGroupId"].ToString());
                    //MModels.SbgrpName = row["SbgrpName"].ToString();
                    //MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    //MModels.CategoryName = row["CategoryName"].ToString();
                    //MModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    //MModels.SubCategoryName = row["SubCategoryName"].ToString();


                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        //Search Catogory in Stock Adjustment
        [HttpPost]

        public ActionResult CatogorySearchStockAdjustment(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CatogorySearchStockAdjustment(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();                    
                    MModels.CategoryId = Convert.ToInt32(row["CategoryId"].ToString());
                    MModels.CategoryName = row["CategoryName"].ToString();
                     oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        //search Sub Catogory in stock adjustment

        [HttpPost]

        public ActionResult SubCatogorySearchStockAdjustment(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubCatogorySearchStockAdjustment(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.SubCategoryId = Convert.ToInt32(row["SubCategoryId"].ToString());
                    MModels.SubCategoryName = row["SubCategoryName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        //Search Group in Stock Adjustment
        [HttpPost]

        public ActionResult GroupSearchStockAdjustment(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GroupSearchStockAdjustment(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.GrpId = Convert.ToInt32(row["GrpId"].ToString());
                    MModels.GrpName = row["GrpName"].ToString();

                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        //Search SubGroup in Stock Adjustment
        [HttpPost]

        public ActionResult SubGroupSearchStockAdjustment(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubGroupSearchStockAdjustment(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.SbgrpId = Convert.ToInt32(row["SbgrpId"].ToString());
                    MModels.SbgrpName = row["SbgrpName"].ToString();

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

        public ActionResult ItemcodeSearchStockAdjustment(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemcodeSearchStockAdjustment(ItemMasterModel, dbName);
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



        //search product based on filter
        [HttpPost]

        public ActionResult ProductSearchStockAdjustmentwithfilter(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ProductSearchStockAdjustmentwithfilter(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel MModels = new ItemMasterModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());          
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.SellingPrice = Convert.ToDecimal(row["SellingPrice"].ToString());
                    MModels.stocktotloseqty = Convert.ToInt32(row["Stock_TotLoseQty"].ToString());                 
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
        public JsonResult StockAdjustmentInsert(List<StockAdjustmentModel> StockAdjustmentModel)
        {
            StockAdjustmentModel obj = new StockAdjustmentModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<StockAdjustmentModel> oList = new List<StockAdjustmentModel>();

            try
            {
                string[] tmpTable = new string[8];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "StockAdjNo";
                tmpTable[2] = "Location";
                tmpTable[3] = "Date";
                tmpTable[4] = "CurrentStock";
                tmpTable[5] = "Adj_Stock";
                tmpTable[6] = "UId";
                tmpTable[7] = "DeptId";                
                dt = Common.CreateTable(tmpTable);

                foreach (var details in StockAdjustmentModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.StockAdjNo = details.StockAdjNo;
                    obj.Location = details.Location;
                    obj.Date = details.Date;
                    obj.CurrentStock = details.CurrentStock;
                    obj.Adj_Stock = details.Adj_Stock;                   
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;                 
                    dt.Rows.Add
                    (obj.ProductId, obj.StockAdjNo, obj.Location, obj.Date, obj.CurrentStock, obj.Adj_Stock, obj.UId, obj.DeptId);
                }

                dsDataSet = obj.StockAdjustmentInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockAdjustmentModel MModels = new StockAdjustmentModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.StockAdjNo = Convert.ToInt32(row["stoadjnum"].ToString());
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

        public ActionResult StockAdjustmentnumberSearch(StockAdjustmentModel StockAdjustmentModel)
        {
            StockAdjustmentModel obj = new StockAdjustmentModel();
            List<StockAdjustmentModel> oList = new List<StockAdjustmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockAdjustmentnumberSearch(StockAdjustmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockAdjustmentModel MModels = new StockAdjustmentModel();
                    MModels.StockAdjNo = Convert.ToInt32(row["StockAdjNo"].ToString());
                    MModels.currentdate = row["date"].ToString();                   
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        //get list in grid
        [HttpPost]

        public ActionResult StockAdjustmentGetlist(StockAdjustmentModel StockAdjustmentModel)
        {
            StockAdjustmentModel obj = new StockAdjustmentModel();
            List<StockAdjustmentModel> oList = new List<StockAdjustmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockAdjustmentGetlist(StockAdjustmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockAdjustmentModel MModels = new StockAdjustmentModel();
                    MModels.StockAdjNo = Convert.ToInt32(row["StockAdjNo"].ToString());
                    MModels.Location = Convert.ToInt32(row ["Location"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.Date = row["Date"].ToString();
                    MModels.CurrentStock = Convert.ToInt32(row["CurrentStock"].ToString());
                    MModels.Adj_Stock = Convert.ToInt32(row["Adj_Stock"].ToString());
                    MModels.Diffrence = Convert.ToInt32(row["Diffrence"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        // get list of product in Physical variation transfer based on location and date

        [HttpPost]

        public ActionResult PhysicalVariationTransferGetProduct(StockAdjustmentModel StockAdjustmentModel)

        {
            StockAdjustmentModel obj = new StockAdjustmentModel();
            List<StockAdjustmentModel> oList = new List<StockAdjustmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PhysicalVariationTransferGetProduct(StockAdjustmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockAdjustmentModel MModels = new StockAdjustmentModel();
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    //MModels.StockAdjNo = Convert.ToInt32(row["StockAdjNo"].ToString());
                    MModels.Diffrence = Convert.ToInt32(row["diffrence"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.AvgCost = Convert.ToDecimal(row["AvgCost"].ToString());
                    MModels.Total = Convert.ToDecimal(row["total"].ToString());
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
        public JsonResult PhysicalVariationTransferInsert(List<StockAdjustmentModel> StockAdjustmentModel)
        {
            StockAdjustmentModel obj = new StockAdjustmentModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<StockAdjustmentModel> oList = new List<StockAdjustmentModel>();

            try
            {
                string[] tmpTable = new string[15];
                tmpTable[0] = "PVTNo";
                tmpTable[1] = "ProductId";
                tmpTable[2] = "DebitAccount";
                tmpTable[3] = "CreditAccount";
                tmpTable[4] = "ItemCode";
                tmpTable[5] = "Description";
                tmpTable[6] = "Location";
                tmpTable[7] = "Unit";
                tmpTable[8] = "Quantity";
                tmpTable[9] = "AvgCost";
                tmpTable[10] = "Total";
                tmpTable[11] = "Date";
                tmpTable[12] = "UId";
                tmpTable[13] = "DeptId";
                tmpTable[14] = "StockAdjNo";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in StockAdjustmentModel)
                {
                    obj.PVTNo = details.PVTNo;
                    obj.ProductId = details.ProductId;
                    obj.DebitAccount = details.DebitAccount;
                    obj.CreditAccount = details.CreditAccount;
                    obj.ItemCode = details.ItemCode;
                    obj.Description = details.Description;
                    obj.Location = details.Location;

                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.AvgCost = details.AvgCost;
                    obj.Total = details.Total;
                    obj.Date = details.Date;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.StockAdjNo = details.StockAdjNo;
                    dt.Rows.Add
                    (obj.PVTNo, obj.ProductId, obj.DebitAccount, obj.CreditAccount, obj.ItemCode, obj.Description, obj.Location, 
                    obj.UnitId, obj.Quantity, obj.AvgCost, obj.Total, obj.Date,
                    obj.UId, obj.DeptId, obj.StockAdjNo);
                }

                dsDataSet = obj.PhysicalVariationTransferInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockAdjustmentModel MModels = new StockAdjustmentModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.PVTNo = Convert.ToInt32(row["pvtnum"].ToString());
                    oList.Add(MModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        //PVT NUmber auto complete
        [HttpPost]

        public ActionResult PhysicalVariationTransferNumberSearch(StockAdjustmentModel StockAdjustmentModel)
        {
            StockAdjustmentModel obj = new StockAdjustmentModel();
            List<StockAdjustmentModel> oList = new List<StockAdjustmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PhysicalVariationTransferNumberSearch(StockAdjustmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockAdjustmentModel MModels = new StockAdjustmentModel();
                    MModels.PVTNo = Convert.ToInt32(row["PVTNo"].ToString());
                    MModels.Date = row["Date"].ToString();
                    MModels.Location = Convert.ToInt32(row["Location"].ToString());
                    MModels.CAccount = Convert.ToInt64(row["CAccount"].ToString());
                    MModels.DAccount = Convert.ToInt64(row["DAccount"].ToString());
                    MModels.LocationName = row["LocationName"].ToString();
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
        //get list in grid(PVT)
        [HttpPost]

        public ActionResult PhysicalVariationTransferGetlist(StockAdjustmentModel StockAdjustmentModel)
        {
            StockAdjustmentModel obj = new StockAdjustmentModel();
            List<StockAdjustmentModel> oList = new List<StockAdjustmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PhysicalVariationTransferGetlist(StockAdjustmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockAdjustmentModel MModels = new StockAdjustmentModel();                   
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["ItemDescription"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.Quantity = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.UnitId = Convert.ToInt32(row["Unit"].ToString());
                    MModels.AvgCost = Convert.ToDecimal(row["Cost"].ToString());
                    MModels.Total = Convert.ToDecimal(row["LineTotal"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        //for checking already product added in Stock Adjustment
        [HttpPost]

        public ActionResult StockAdjustmentProductCheck(StockAdjustmentModel StockAdjustmentModel)
        {
            StockAdjustmentModel obj = new StockAdjustmentModel();

            List<StockAdjustmentModel> oList = new List<StockAdjustmentModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.StockAdjustmentProductCheck(StockAdjustmentModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockAdjustmentModel MModels = new StockAdjustmentModel();
                    MModels.Adj_Stock = Convert.ToInt32(row["Adj_Stock"].ToString());                           
                    MModels.Date = row["Date"].ToString();
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
        public ActionResult AccountNoGetandGets(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AccountNoGetandGets(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel VEModels = new StockTransferOutModel();
                    VEModels.AccCode = row["debtAccnt"].ToString();
                    VEModels.CAccCode = row["creditAccnt"].ToString(); 
                    VEModels.CAccountId = Convert.ToInt32(row["CAccount"].ToString());
                    VEModels.AccountId = Convert.ToInt32(row["DAccount"].ToString());
                    VEModels.AccountDescription = row["Cdesc"].ToString();
                    VEModels.DAccountDescription = row["Ddesc"].ToString();
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
        public ActionResult DriverGetandGets(PackingHistoryModel PackingHistoryModel)
        {
            PackingHistoryModel obj = new PackingHistoryModel();

            List<PackingHistoryModel> oList = new List<PackingHistoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DriverGetandGets(PackingHistoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PackingHistoryModel VEModels = new PackingHistoryModel();
                    VEModels.DriverName = row["DriverName"].ToString();
                    VEModels.DriverId = Convert.ToInt32(row["DriverId"].ToString());                   
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
        public ActionResult PriceManagerListItem(PriceManagerModel PriceManagerModel)                              //price Manager get item in main table
        {
            PriceManagerModel obj = new PriceManagerModel();

            List<PriceManagerModel> oList = new List<PriceManagerModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PriceManagerListItem(PriceManagerModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PriceManagerModel MModels = new PriceManagerModel();

                    MModels.UnitName = row["UnitName"].ToString();

                   // MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.CatogoryName = row["CategoryName"].ToString();
                    MModels.Description = row["ItemDescription"].ToString();
                   MModels.GroupName = row["GrpName"].ToString();
                    MModels.totQty = Convert.ToInt32(row["Stock_TotLoseQty"].ToString());
                    MModels.PurchaseQty = Convert.ToInt32(row["lastpurchaseqty"].ToString());
                    


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
        public ActionResult PriceManagerItemGetandGets(PriceManagerModel PriceManagerModel)                              //price Manager get item in main table
        {
            PriceManagerModel obj = new PriceManagerModel();

            List<PriceManagerModel> oList = new List<PriceManagerModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PriceManagerItemGetandGets(PriceManagerModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PriceManagerModel MModels = new PriceManagerModel();

                    MModels.InvoiceDate = row["InvoDate"].ToString();                  
                    MModels.InvoiceNo = row["InvoNo"].ToString();
                    MModels.CustAccount = row["CustAccount"].ToString();
                    MModels.CustName = row["CustName"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Rate = Convert.ToDecimal(row["Rate"].ToString());
                    MModels.BillNo =row["BillNo"].ToString();
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
        public ActionResult PriceManagerPriceGetandGets(PriceManagerModel PriceManagerModel)                              //price Manager get item in main table
        {
            PriceManagerModel obj = new PriceManagerModel();

            List<PriceManagerModel> oList = new List<PriceManagerModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PriceManagerPriceGetandGets(PriceManagerModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PriceManagerModel MModels = new PriceManagerModel();

                   // MModels.Price = row["Price"].ToString();
                    MModels.SellingPrice = row["SellingPrice"].ToString();
                    MModels.SellingPrice_1 = row["SellingPrice_1"].ToString();
                    MModels.SellingPrice_2 = row["SellingPrice_2"].ToString();
                    MModels.Prev_LPCost = row["Prev_LPCost"].ToString();
                    MModels.LPCost = row["LPCost"].ToString();
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
        public JsonResult OpeningStockEntryInsert(List<StockAdjustmentModel> StockAdjustmentModel)
        {
            StockAdjustmentModel obj = new StockAdjustmentModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<StockAdjustmentModel> oList = new List<StockAdjustmentModel>();

            try
            {
                string[] tmpTable = new string[8];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "OpenQtyEntryNo";
                tmpTable[2] = "Location";
                tmpTable[3] = "Date";
                tmpTable[4] = "CurrentStock";
                tmpTable[5] = "Open_Stock";
                tmpTable[6] = "UId";
                tmpTable[7] = "DeptId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in StockAdjustmentModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.OpenQtyEntryNo = details.OpenQtyEntryNo;
                    obj.Location = details.Location;
                    obj.Date = details.Date;
                    obj.CurrentStock = details.CurrentStock;
                    obj.Open_Stock = details.Open_Stock;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    dt.Rows.Add
                    (obj.ProductId, obj.OpenQtyEntryNo, obj.Location, obj.Date, obj.CurrentStock, obj.Open_Stock, obj.UId, obj.DeptId);
                }

                dsDataSet = obj.OpeningStockEntryInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockAdjustmentModel MModels = new StockAdjustmentModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.OpenQtyEntryNo = Convert.ToInt32(row["openqtyentrynum"].ToString());
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
        public JsonResult LocationTransferInsert(List<StockTransferOutModel> StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();

            try
            {
                string[] tmpTable = new string[16];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "Description";
                tmpTable[2] = "UnitId";
                tmpTable[3] = "Quantity";
                tmpTable[4] = "Price";
                tmpTable[5] = "Total";
                tmpTable[6] = "trNo";
                tmpTable[7] = "FromLocation";
                tmpTable[8] = "ToLocation";
                tmpTable[9] = "TRDate";
                tmpTable[10] = "DebitAccount";
                tmpTable[11] = "CreditAccount";
                tmpTable[12] = "Comments";
                tmpTable[13] = "UId";
                tmpTable[14] = "DeptId";
                tmpTable[15] = "DelFlag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in StockTransferOutModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.Description = details.Description;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Total = details.Total;
                    obj.trNo = details.trNo;

                    obj.FromLocation = details.FromLocation;
                    obj.ToLocation = details.ToLocation;
                    obj.TRDate = details.TRDate;
                    obj.DebitAccount = details.DebitAccount;
                    obj.CreditAccount = details.CreditAccount;

                    obj.Comments = details.Comments;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add
                    (obj.ProductId, obj.Description, obj.UnitId, obj.Quantity, obj.Price, obj.Total, obj.trNo, obj.FromLocation, obj.ToLocation, obj.TRDate,
                    obj.DebitAccount, obj.CreditAccount, obj.Comments, obj.UId, obj.DeptId, obj.DelFlag);
                }

                dsDataSet = obj.LocationTransferInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.trNo = Convert.ToInt32(row["ltrnum"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
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
        public JsonResult LocationTransferUpdate(List<StockTransferOutModel> StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();

            try
            {
                string[] tmpTable = new string[16];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "Description";
                tmpTable[2] = "UnitId";
                tmpTable[3] = "Quantity";
                tmpTable[4] = "Price";
                tmpTable[5] = "Total";
                tmpTable[6] = "trNo";
                tmpTable[7] = "FromLocation";
                tmpTable[8] = "ToLocation";
                tmpTable[9] = "TRDate";
                tmpTable[10] = "DebitAccount";
                tmpTable[11] = "CreditAccount";
                tmpTable[12] = "Comments";
                tmpTable[13] = "UId";
                tmpTable[14] = "DeptId";
                tmpTable[15] = "DelFlag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in StockTransferOutModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.Description = details.Description;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Total = details.Total;
                    obj.trNo = details.trNo;

                    obj.FromLocation = details.FromLocation;
                    obj.ToLocation = details.ToLocation;
                    obj.TRDate = details.TRDate;
                    obj.DebitAccount = details.DebitAccount;
                    obj.CreditAccount = details.CreditAccount;

                    obj.Comments = details.Comments;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add
                    (obj.ProductId, obj.Description, obj.UnitId, obj.Quantity, obj.Price, obj.Total, obj.trNo, obj.FromLocation, obj.ToLocation, obj.TRDate,
                    obj.DebitAccount, obj.CreditAccount, obj.Comments, obj.UId, obj.DeptId, obj.DelFlag);
                }

                dsDataSet = obj.LocationTransferUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.trNo = Convert.ToInt32(row["ltrnum"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
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

        public ActionResult LocationTransfernumbersearch(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransfernumbersearch(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.trNo = Convert.ToInt32(row["trNo"].ToString());
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.LocFrom = row["Flocalion"].ToString();
                    MModels.LocTo = row["Tlocation"].ToString();
                    MModels.TRDate = row["TRDate"].ToString();
                    MModels.DAccount = Convert.ToInt32(row["DAccount"].ToString());
                    MModels.CAccount = Convert.ToInt32(row["CAccount"].ToString());
                    MModels.CAccountId = Convert.ToInt32(row["CreditAccount"].ToString());
                    MModels.DAccountId = Convert.ToInt32(row["DebitAccount"].ToString());
                    MModels.Comments = row["Comments"].ToString();
                    MModels.DAccountName = row["DAccountName"].ToString();
                    MModels.CAccountName = row["CAccountName"].ToString();
                    MModels.Description= row["DepartmentCode"].ToString();   //DeptCode 
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
         
        public ActionResult PendingLocationTransferSearch(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PendingLocationTransferSearch(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.trNo = Convert.ToInt32(row["trNo"].ToString());
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.LocFrom = row["Flocalion"].ToString();
                    MModels.LocTo = row["Tlocation"].ToString();
                    MModels.TRDate = row["TRDate"].ToString();
                    MModels.DAccount = Convert.ToInt32(row["DAccount"].ToString());
                    MModels.CAccount = Convert.ToInt32(row["CAccount"].ToString());
                    MModels.CAccountId = Convert.ToInt32(row["CreditAccount"].ToString());
                    MModels.DAccountId = Convert.ToInt32(row["DebitAccount"].ToString());
                    MModels.Comments = row["Comments"].ToString();
                    MModels.DAccountName = row["DAccountName"].ToString();
                    MModels.CAccountName = row["CAccountName"].ToString();
                    MModels.Description = row["DepartmentCode"].ToString();   //DeptCode 
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

        public ActionResult LocationTransferList(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransferList(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.trNo = Convert.ToInt32(row["trNo"].ToString());
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.LocFrom = row["Flocalion"].ToString();
                    MModels.LocTo = row["Tlocation"].ToString();
                    MModels.TRDate = row["TRDate"].ToString();
                    MModels.DAccount = Convert.ToInt32(row["DAccount"].ToString());
                    MModels.CAccount = Convert.ToInt32(row["CAccount"].ToString());
                    MModels.CAccountId = Convert.ToInt32(row["CreditAccount"].ToString());
                    MModels.DAccountId = Convert.ToInt32(row["DebitAccount"].ToString());
                    MModels.Comments = row["Comments"].ToString();
                    MModels.DAccountName = row["DAccountName"].ToString();
                    MModels.CAccountName = row["CAccountName"].ToString();
                    MModels.Description = row["DepartmentCode"].ToString();   //DeptCode 
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.User = row["UserName"].ToString();
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

        public ActionResult LocationTransferOutList(StockTransferOutModel StockTransferOutModel) 
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransferOutList(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.trNo = Convert.ToInt32(row["trNo"].ToString());
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.LocFrom = row["Flocalion"].ToString();
                    MModels.LocTo = row["Tlocation"].ToString();
                    MModels.TRDate = row["TRDate"].ToString();
                    MModels.DAccount = Convert.ToInt32(row["DAccount"].ToString());
                    MModels.CAccount = Convert.ToInt32(row["CAccount"].ToString());
                    MModels.CAccountId = Convert.ToInt32(row["CreditAccount"].ToString());
                    MModels.DAccountId = Convert.ToInt32(row["DebitAccount"].ToString());
                    MModels.Comments = row["Comments"].ToString();
                    MModels.DAccountName = row["DAccountName"].ToString();
                    MModels.CAccountName = row["CAccountName"].ToString();
                    MModels.Description = row["DepartmentCode"].ToString();   //DeptCode 
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.User = row["UserName"].ToString();
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

        public ActionResult PackingNumberSearch(PackingHistoryModel PackingHistoryModel)
        {
            PackingHistoryModel obj = new PackingHistoryModel();
            List<PackingHistoryModel> oList = new List<PackingHistoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingNumberSearch(PackingHistoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PackingHistoryModel MModels = new PackingHistoryModel();
                    MModels.DeliveryNo = Convert.ToInt32(row["DeliveryNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();                  
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.InvoiceQty = Convert.ToInt32(row["InvoiceQty"].ToString());
                    MModels.ScannedQty = Convert.ToInt32(row["ScannedQty"].ToString());
                    MModels.IssuedQty = Convert.ToInt32(row["IssuedQty"].ToString());
                    MModels.Diffrence = Convert.ToInt32(row["Diffrence"].ToString());
                    MModels.CustName = row["CustName"].ToString();
                    MModels.UserName = row["EnteredBy"].ToString();
                    MModels.SalesMan = row["SalesMan"].ToString();
                    MModels.DriverName = row["Driver"].ToString();
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
        public ActionResult PackingDetailsGet(PackingHistoryModel PackingHistoryModel)
        {
            PackingHistoryModel obj = new PackingHistoryModel();

            List<PackingHistoryModel> oList = new List<PackingHistoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PackingDetailsGet(PackingHistoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PackingHistoryModel MModels = new PackingHistoryModel();

                    MModels.DeliveryNo = Convert.ToInt32(row["DeliveryNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.InvoiceQty = Convert.ToInt32(row["InvoiceQty"].ToString());
                    MModels.ScannedQty = Convert.ToInt32(row["ScannedQty"].ToString());
                    MModels.IssuedQty = Convert.ToInt32(row["IssuedQty"].ToString());
                    MModels.Diffrence = Convert.ToInt32(row["Diffrence"].ToString());
                    MModels.CustName = row["CustName"].ToString();
                    MModels.UserName = row["EnteredBy"].ToString();
                    MModels.SalesMan = row["SalesMan"].ToString();
                    MModels.DriverName = row["Driver"].ToString();
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
        public ActionResult PreviousPackingDeatilsshow(PackingHistoryModel PackingHistoryModel)
        {
            PackingHistoryModel obj = new PackingHistoryModel();

            List<PackingHistoryModel> oList = new List<PackingHistoryModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PreviousPackingDeatilsshow(PackingHistoryModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PackingHistoryModel MModels = new PackingHistoryModel();

                    MModels.DeliveryNo = Convert.ToInt32(row["DeliveryNo"].ToString());
                    MModels.BillSeriesId = Convert.ToInt32(row["BillSeriesId"].ToString());
                    MModels.BillSlNo = Convert.ToInt32(row["BillSlNo"].ToString());
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemDescription = row["ItemDescription"].ToString();
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.LocationName = row["LocationName"].ToString();
                    MModels.InvoiceQty = Convert.ToInt32(row["InvoiceQty"].ToString());
                    MModels.ScannedQty = Convert.ToInt32(row["ScannedQty"].ToString());
                    MModels.IssuedQty = Convert.ToInt32(row["IssuedQty"].ToString());
                    MModels.Diffrence = Convert.ToInt32(row["Diffrence"].ToString());
                    MModels.CustName = row["CustName"].ToString();
                    MModels.UserName = row["EnteredBy"].ToString();
                    MModels.SalesMan = row["SalesMan"].ToString();
                    MModels.DriverName = row["Driver"].ToString();
                    MModels.Flag = Convert.ToInt32(row["Flag"].ToString());

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
        public ActionResult LocationTransferGetansGets(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransferGetansGets(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();

                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.ProductId = Convert.ToInt32(row["ProductId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.Price = Convert.ToDecimal(row["Price"].ToString());
                    MModels.Total = Convert.ToDecimal(row["Total"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());  
                    MModels.Comments = row["DepartmentCode"].ToString();    //DeptCode
                    MModels.Qty = row["qty"].ToString();
                    MModels.User = row["UserName"].ToString();
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.BinA = row["BinA"].ToString();
                    MModels.BinB = row["BinB"].ToString();
                    MModels.BinC = row["BinC"].ToString();
                    MModels.BinD = row["BinD"].ToString();
                    MModels.BinE = row["BinE"].ToString();
                    MModels.BinF = row["BinF"].ToString();
                    MModels.BinG = row["BinG"].ToString();
                    MModels.BinH = row["BinH"].ToString();
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
        public ActionResult PriceManagementInsertandUpdate(PriceManagerModel PriceManagerModel)
        {
            PriceManagerModel obj = new PriceManagerModel();
            List<PriceManagerModel> oList = new List<PriceManagerModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PriceManagementInsertandUpdate(PriceManagerModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PriceManagerModel MModels = new PriceManagerModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.Description = row["product"].ToString();
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
        public JsonResult PackingHistoryInsert(List<PackingHistoryModel> PackingHistoryModel)
        {
            PackingHistoryModel obj = new PackingHistoryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PackingHistoryModel> oList = new List<PackingHistoryModel>();

            try
            {
                string[] tmpTable = new string[27];
                tmpTable[0] = "ItemId";
                tmpTable[1] = "ItemLocationId";
                tmpTable[2] = "ItemDescription";
                tmpTable[3] = "UnitId";
                tmpTable[4] = "ItemCode";
                tmpTable[5] = "Location";
                tmpTable[6] = "InvoiceQty";
                tmpTable[7] = "ScannedQty";
                tmpTable[8] = "IssuedQty";
                tmpTable[9] = "Diffrence";
                tmpTable[10] = "DeliveryNo";
                tmpTable[11] = "BillSeriesId";
                tmpTable[12] = "BillSlNo";                
                tmpTable[13] = "UId";
                tmpTable[14] = "DeptId";


                tmpTable[15] = "CustName";
                tmpTable[16] = "SalesMan";
                tmpTable[17] = "UserName";
                tmpTable[18] = "DriverName";
                tmpTable[19] = "TempUser";
                tmpTable[20] = "Flag";

                tmpTable[21] = "FromLocId";
                tmpTable[22] = "ToLocId";
                tmpTable[23] = "LTDeptId";
                tmpTable[24] = "TypeFlag";
                tmpTable[25] = "Variable1";
                tmpTable[26] = "Variable2";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PackingHistoryModel)
                {
                    obj.ItemId = details.ItemId;
                    obj.ItemLocationId = details.ItemLocationId;
                    obj.ItemDescription = details.ItemDescription;
                    obj.UnitId = details.UnitId;
                    obj.ItemCode = details.ItemCode;
                    obj.Location = details.Location;
                    obj.InvoiceQty = details.InvoiceQty;
                    obj.ScannedQty = details.ScannedQty;
                    obj.IssuedQty = details.IssuedQty;
                    obj.Diffrence = details.Diffrence;
                    obj.DeliveryNo = details.DeliveryNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;

                    obj.CustName = details.CustName;
                    obj.SalesMan = details.SalesMan;
                    obj.UserName = details.UserName;
                    obj.DriverName = details.DriverName;
                    obj.TempUser = details.TempUser;     
                    obj.Flag= details.Flag;

                    obj.FromLocId = details.FromLocId;
                    obj.ToLocId = details.ToLocId;
                    obj.LTDeptId = details.LTDeptId;
                    obj.TypeFlag = details.TypeFlag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.ItemId, obj.ItemLocationId, obj.ItemDescription, obj.UnitId, obj.ItemCode, obj.Location,
                    obj.InvoiceQty, obj.ScannedQty, obj.IssuedQty, obj.Diffrence, obj.DeliveryNo, obj.BillSeriesId, obj.BillSlNo, 
                    obj.UserId, obj.DeptId, obj.CustName, obj.SalesMan, obj.UserName, obj.DriverName, obj.TempUser, obj.Flag,
                    obj.FromLocId, obj.ToLocId, obj.LTDeptId, obj.TypeFlag, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.PackingHistoryInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PackingHistoryModel MModels = new PackingHistoryModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.DeliveryNo = Convert.ToInt32(row["Delnum"].ToString());
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
        public JsonResult PackingHistoryTemporarySave(List<PackingHistoryModel> PackingHistoryModel)
        {
            PackingHistoryModel obj = new PackingHistoryModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<PackingHistoryModel> oList = new List<PackingHistoryModel>();

            try
            {
                string[] tmpTable = new string[27];
                tmpTable[0] = "ItemId";
                tmpTable[1] = "ItemLocationId";
                tmpTable[2] = "ItemDescription";
                tmpTable[3] = "UnitId";
                tmpTable[4] = "ItemCode";
                tmpTable[5] = "Location";
                tmpTable[6] = "InvoiceQty";
                tmpTable[7] = "ScannedQty";
                tmpTable[8] = "IssuedQty";
                tmpTable[9] = "Diffrence";
                tmpTable[10] = "DeliveryNo";
                tmpTable[11] = "BillSeriesId";
                tmpTable[12] = "BillSlNo";
                tmpTable[13] = "UId";
                tmpTable[14] = "DeptId";
                tmpTable[15] = "CustName";
                tmpTable[16] = "SalesMan";
                tmpTable[17] = "UserName";
                tmpTable[18] = "DriverName";
                tmpTable[19] = "TempUser";
                tmpTable[20] = "Flag";
                tmpTable[21] = "FromLocId";
                tmpTable[22] = "ToLocId";
                tmpTable[23] = "LTDeptId";
                tmpTable[24] = "TypeFlag";
                tmpTable[25] = "Variable1";
                tmpTable[26] = "Variable2";

                dt = Common.CreateTable(tmpTable);

                foreach (var details in PackingHistoryModel)
                {
                    obj.ItemId = details.ItemId;
                    obj.ItemLocationId = details.ItemLocationId;
                    obj.ItemDescription = details.ItemDescription;
                    obj.UnitId = details.UnitId;
                    obj.ItemCode = details.ItemCode;
                    obj.Location = details.Location;
                    obj.InvoiceQty = details.InvoiceQty;
                    obj.ScannedQty = details.ScannedQty;
                    obj.IssuedQty = details.IssuedQty;
                    obj.Diffrence = details.Diffrence;
                    obj.DeliveryNo = details.DeliveryNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;

                    obj.CustName = details.CustName;
                    obj.SalesMan = details.SalesMan;
                    obj.UserName = details.UserName;
                    obj.DriverName = details.DriverName;
                    obj.TempUser = details.TempUser;
                    obj.Flag = details.Flag;

                    obj.FromLocId = details.FromLocId;
                    obj.ToLocId = details.ToLocId;
                    obj.LTDeptId = details.LTDeptId;
                    obj.TypeFlag = details.TypeFlag;
                    obj.Variable1 = details.Variable1;
                    obj.Variable2 = details.Variable2;

                    dt.Rows.Add
                    (obj.ItemId, obj.ItemLocationId, obj.ItemDescription, obj.UnitId, obj.ItemCode, obj.Location,
                    obj.InvoiceQty, obj.ScannedQty, obj.IssuedQty, obj.Diffrence, obj.DeliveryNo, obj.BillSeriesId, obj.BillSlNo,
                    obj.UserId, obj.DeptId, obj.CustName, obj.SalesMan, obj.UserName, obj.DriverName, obj.TempUser, obj.Flag,
                    obj.FromLocId, obj.ToLocId, obj.LTDeptId, obj.TypeFlag, obj.Variable1, obj.Variable2);
                }

                dsDataSet = obj.PackingHistoryTemporarySave(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    PackingHistoryModel MModels = new PackingHistoryModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.DeliveryNo = Convert.ToInt32(row["Delnum"].ToString());
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
        public JsonResult CashCollectionInsert(List<CashCollectionModel> CashCollectionModel)
        {
            CashCollectionModel obj = new CashCollectionModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<CashCollectionModel> oList = new List<CashCollectionModel>();

            try
            {
                string[] tmpTable = new string[18];
                tmpTable[0] = "SlNo";
                tmpTable[1] = "BillSeriesId";
                tmpTable[2] = "BillSlNo";
                tmpTable[3] = "CustId";
                tmpTable[4] = "Customer";
                tmpTable[5] = "Remarks";
                tmpTable[6] = "TotalAmount";
                tmpTable[7] = "TotalReceived";
                tmpTable[8] = "BalanceAmount";
                tmpTable[9] = "Rate";
                tmpTable[10] = "Currency";
                tmpTable[11] = "Total";
                tmpTable[12] = "ReceivedAmount";
                tmpTable[13] = "UId";
                tmpTable[14] = "DeptId";
                tmpTable[15] = "Location";
                tmpTable[16] = "DelFlag";
                tmpTable[17] = "PaymentType";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in CashCollectionModel)
                {
                    obj.SlNo = details.SlNo;
                    obj.BillSeriesId = details.BillSeriesId;
                    obj.BillSlNo = details.BillSlNo;
                    obj.CustId = details.CustId;
                    obj.Customer = details.Customer;
                    obj.Remarks = details.Remarks;
                    obj.TotalAmount = details.TotalAmount;
                    obj.TotalReceived = details.TotalReceived;
                    obj.BalanceAmount = details.BalanceAmount;
                    obj.Rate = details.Rate;
                    obj.Currency = details.Currency;
                    obj.Total = details.Total;
                    obj.ReceivedAmount = details.ReceivedAmount;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.Location = details.Location;
                    obj.DelFlag = details.DelFlag;
                    obj.PaymentType = details.PaymentType;
                    dt.Rows.Add
                    (obj.SlNo, obj.BillSeriesId, obj.BillSlNo, obj.CustId, obj.Customer, obj.Remarks,
                    obj.TotalAmount, obj.TotalReceived, obj.BalanceAmount, obj.Rate, obj.Currency, obj.Total, obj.ReceivedAmount,
                    obj.UId, obj.DeptId, obj.Location, obj.DelFlag,obj.PaymentType);
                }

                dsDataSet = obj.CashCollectionInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CashCollectionModel MModels = new CashCollectionModel();
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
        public ActionResult LocationTransferCancel(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransferCancel(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel SModels = new StockTransferOutModel();
                    SModels.TransactionNo = row["TransactionNo"].ToString();
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

        public ActionResult LocTransferListForScanner(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocTransferListForScanner(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.trNo = Convert.ToInt32(row["trNo"].ToString());
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.LocFrom = row["Flocalion"].ToString();
                    MModels.LocTo = row["Tlocation"].ToString();
                    MModels.TRDate = row["TRDate"].ToString();
                    MModels.Description = row["DepartmentCode"].ToString();   //DeptCode 
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
        public ActionResult LocationTransferScanGet(StockTransferOutModel StockTransferOutModel)
        {
            StockTransferOutModel obj = new StockTransferOutModel();

            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransferScanGet(StockTransferOutModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();


                    MModels.trNo = Convert.ToInt32(row["TrNo"].ToString());
                    MModels.FromLocation = Convert.ToInt32(row["FromLocation"].ToString());
                    MModels.ToLocation = Convert.ToInt32(row["ToLocation"].ToString());
                    MModels.LocFrom = row["FromLoc"].ToString();
                    MModels.LocTo = row["ToLoc"].ToString();
                    MModels.ProductId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ProductCode = row["ItemCode"].ToString();
                    MModels.ProductDescr = row["ItemDesc"].ToString();
                    MModels.UnitId = Convert.ToInt32(row["UnitId"].ToString());
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.Quantity = Convert.ToInt32(row["Quantity"].ToString());
                    MModels.User = row["UserName"].ToString();
                    MModels.IssuedQty = Convert.ToInt32(row["IssuedQty"].ToString());
                    MModels.ScannedQty = Convert.ToInt32(row["ScannedQty"].ToString());
                    MModels.EnteredBy = row["EnteredBy"].ToString();
                    MModels.DepartmentCode = row["DeptCode"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.Model1 = row["Model1"].ToString();
                    MModels.Model2 = row["Model2"].ToString();
                    MModels.Model3 = row["Model3"].ToString();
                    MModels.Model4 = row["Model4"].ToString();
                    MModels.Model5 = row["Model5"].ToString();
                    MModels.Model6 = row["Model6"].ToString();
                    MModels.Model7 = row["Model7"].ToString();
                    MModels.Model8 = row["Model8"].ToString();
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
        public JsonResult LocationTransferSparepartsInsert(List<StockTransferOutModel> StockTransferOutModel) 
        {
            StockTransferOutModel obj = new StockTransferOutModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<StockTransferOutModel> oList = new List<StockTransferOutModel>();

            try
            {
                string[] tmpTable = new string[16];
                tmpTable[0] = "ProductId";
                tmpTable[1] = "Description";
                tmpTable[2] = "UnitId";
                tmpTable[3] = "Quantity";
                tmpTable[4] = "Price";
                tmpTable[5] = "Total";
                tmpTable[6] = "trNo";
                tmpTable[7] = "FromLocation";
                tmpTable[8] = "ToLocation";
                tmpTable[9] = "TRDate";
                tmpTable[10] = "DebitAccount";
                tmpTable[11] = "CreditAccount";
                tmpTable[12] = "Comments";
                tmpTable[13] = "UId";
                tmpTable[14] = "DeptId";
                tmpTable[15] = "DelFlag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in StockTransferOutModel)
                {
                    obj.ProductId = details.ProductId;
                    obj.Description = details.Description;
                    obj.UnitId = details.UnitId;
                    obj.Quantity = details.Quantity;
                    obj.Price = details.Price;
                    obj.Total = details.Total;
                    obj.trNo = details.trNo;

                    obj.FromLocation = details.FromLocation;
                    obj.ToLocation = details.ToLocation;
                    obj.TRDate = details.TRDate;
                    obj.DebitAccount = details.DebitAccount;
                    obj.CreditAccount = details.CreditAccount;

                    obj.Comments = details.Comments;
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add
                    (obj.ProductId, obj.Description, obj.UnitId, obj.Quantity, obj.Price, obj.Total, obj.trNo, obj.FromLocation, obj.ToLocation, obj.TRDate,
                    obj.DebitAccount, obj.CreditAccount, obj.Comments, obj.UId, obj.DeptId, obj.DelFlag);
                }

                dsDataSet = obj.LocationTransferSparepartsInsert(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    StockTransferOutModel MModels = new StockTransferOutModel();
                    MModels.Status = row["Status"].ToString();
                    MModels.trNo = Convert.ToInt32(row["ltrnum"].ToString());
                    MModels.ProductCode = row["ProductCode"].ToString();
                    MModels.ProductDescr = row["ProductDescr"].ToString();
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

    }
}