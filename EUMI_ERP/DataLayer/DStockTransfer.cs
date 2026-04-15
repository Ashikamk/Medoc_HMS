using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP.DataLayer
{
    public class DStockTransfer
    {
        private SqlParameter[] arlParms;

        public DataSet StocktransferOutInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@StockTransferOut", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("StocktransferOutInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        //copy 
        public DataSet StockTransferOutGetandGets(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@STONo", StockTransferOutModel.STONo);
                arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                return SQLHelper.ExecuteDataset("StockTransferOutGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        //Form-STIN
        //get item in table by location
        public DataSet StockDetailsGetsbyLocation(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@LocId", StockTransferOutModel.ToLocation);
                arlParms[1] = new SqlParameter("@fromLocId", StockTransferOutModel.FromLocation);
                arlParms[2] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                return SQLHelper.ExecuteDataset("StockTransferOutGetProductByLocation", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        //Form-STIN
        //get item in table by STONo      

        public DataSet StockTransferOutGetProduct(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Stonumber", StockTransferOutModel.Stonumber);
                return SQLHelper.ExecuteDataset("StockTransferOutGetProducts", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet StocktransferInInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@StockTransferIn", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("StockTransferInInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        //copy
        public DataSet StockInnumberSearch(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@STInNo", StockTransferOutModel.STInNo);
                arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                return SQLHelper.ExecuteDataset("StockInnumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //copy into grid
        public DataSet StockInnumberSearchgrid(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@STInNo", StockTransferOutModel.STInNo);
                return SQLHelper.ExecuteDataset("StockInnumberSearchgrid", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet StockOutnumberSearch(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@STONo", StockTransferOutModel.STONo);
                arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                return SQLHelper.ExecuteDataset("StockOutnumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //account autocomplete
        public DataSet AccountNumberSearch(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DebitAccount", StockTransferOutModel.AccountDescription);
                //arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                return SQLHelper.ExecuteDataset("AccountnumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ExpenseAccountCodeSearch(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccountCode", StockTransferOutModel.AccCode);
                return SQLHelper.ExecuteDataset("ExpenseAccountCodeSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ExpenseAccountGroupSearch(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccountGrp", StockTransferOutModel.AccGrp);
                return SQLHelper.ExecuteDataset("ExpenseAccountGroupSerach", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ProductionEntryInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ProductionEntry", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ProductionEntryInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet OtherCostInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@OtherCostInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ProductionEntryOtherCostInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        //copy Production Entry-auto complete
        public DataSet CopyProdEntry(ProductionEntryCopyModel ProductionEntryCopyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ProEntryNo", ProductionEntryCopyModel.ProEntryNo);
                arlParms[1] = new SqlParameter("@DeptId", ProductionEntryCopyModel.DeptId);
                return SQLHelper.ExecuteDataset("ProductionEntrynumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //copy production entry into grid
        public DataSet ProductionEntryGetandGets(ProductionEntryCopyModel ProductionEntryCopyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ProEntryNo", ProductionEntryCopyModel.ProEntryNo);
                arlParms[1] = new SqlParameter("@DeptId", ProductionEntryCopyModel.DeptId);
                return SQLHelper.ExecuteDataset("ProductionEntryGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //copy othercost details in production entry
        public DataSet OtherCostGetandGets(ProductionEntryCopyModel ProductionEntryCopyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ProEntryNo", ProductionEntryCopyModel.ProEntryNo);
                arlParms[1] = new SqlParameter("@DeptId", ProductionEntryCopyModel.DeptId);
                return SQLHelper.ExecuteDataset("ProductionEntryOtherCostGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ProductSearchStockAdjustment(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@LocId", ItemMasterModel.LocId);
                arlParms[1] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                return SQLHelper.ExecuteDataset("StockAdjustmentProductSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet CatogorySearchStockAdjustment(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];


                arlParms[0] = new SqlParameter("@CategoryName", ItemMasterModel.CategoryName);

                return SQLHelper.ExecuteDataset("CatogorySearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SubCatogorySearchStockAdjustment(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];


                arlParms[0] = new SqlParameter("@CategoryId", ItemMasterModel.CategoryId);
                arlParms[1] = new SqlParameter("@SubCategoryName", ItemMasterModel.SubCategoryName);

                return SQLHelper.ExecuteDataset("SubCatogorySearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet GroupSearchStockAdjustment(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];


                arlParms[0] = new SqlParameter("@GrpName", ItemMasterModel.GrpName);

                return SQLHelper.ExecuteDataset("GroupSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SubGroupSearchStockAdjustment(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];


                arlParms[0] = new SqlParameter("@SbgrpName", ItemMasterModel.SbgrpName);
                arlParms[1] = new SqlParameter("@GrpId", ItemMasterModel.GrpId);

                return SQLHelper.ExecuteDataset("SubGroupSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ItemcodeSearchStockAdjustment(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];


                arlParms[0] = new SqlParameter("@Condition", ItemMasterModel.Condition);
                return SQLHelper.ExecuteDataset("ItemCodeSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ProductSearchStockAdjustmentwithfilter(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@LocId", ItemMasterModel.LocId);
                arlParms[1] = new SqlParameter("@Condition", ItemMasterModel.Condition);
                arlParms[2] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                return SQLHelper.ExecuteDataset("StockAdjustmentProductbyfilter", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet StockAdjustmentInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Stockadjustment", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("StockAdjustmentInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet StockAdjustmentnumberSearch(StockAdjustmentModel StockAdjustmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@StockAdjNo", StockAdjustmentModel.StockAdjNo);
                arlParms[1] = new SqlParameter("@DeptId", StockAdjustmentModel.DeptId);
                return SQLHelper.ExecuteDataset("StockAdjustmentNumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet StockAdjustmentGetlist(StockAdjustmentModel StockAdjustmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@StockAdjNo", StockAdjustmentModel.StockAdjNo);
                arlParms[1] = new SqlParameter("@DeptId", StockAdjustmentModel.DeptId);
                return SQLHelper.ExecuteDataset("StockAdjustmentGetList", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PhysicalVariationTransferGetProduct(StockAdjustmentModel StockAdjustmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Location", StockAdjustmentModel.Location);
                arlParms[1] = new SqlParameter("@Date", StockAdjustmentModel.Date);
                arlParms[2] = new SqlParameter("@DeptId", StockAdjustmentModel.DeptId);
                return SQLHelper.ExecuteDataset("PhsicalVariationTransferGetProductbyLocation", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PhysicalVariationTransferInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PhysicalVariationTransfer", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PhysicalVariationTransferInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PhysicalVariationTransferNumberSearch(StockAdjustmentModel StockAdjustmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PVTNo", StockAdjustmentModel.PVTNo);
                arlParms[1] = new SqlParameter("@DeptId", StockAdjustmentModel.DeptId);
                return SQLHelper.ExecuteDataset("PhysicalVariationTransferNumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PhysicalVariationTransferGetlist(StockAdjustmentModel StockAdjustmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PVTNo", StockAdjustmentModel.PVTNo);
                arlParms[1] = new SqlParameter("@DeptId", StockAdjustmentModel.DeptId);
                return SQLHelper.ExecuteDataset("PhysicalVariationTransferGetlist", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet StockAdjustmentProductCheck(StockAdjustmentModel StockAdjustmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@LocationId", StockAdjustmentModel.LocationId);
                arlParms[1] = new SqlParameter("@DeptId", StockAdjustmentModel.DeptId);
                arlParms[2] = new SqlParameter("@ProductId", StockAdjustmentModel.ProductId);
                return SQLHelper.ExecuteDataset("StockAdjustmentProductCheck", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AccountNoGetandGets(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@deptid", StockTransferOutModel.DeptId);
                arlParms[1] = new SqlParameter("@flag", StockTransferOutModel.flag);
                return SQLHelper.ExecuteDataset("GetShowStockAccNumber", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PriceManagerListItem(PriceManagerModel PriceManagerModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Location", PriceManagerModel.Location);
                arlParms[1] = new SqlParameter("@DeptId", PriceManagerModel.DeptId);
                return SQLHelper.ExecuteDataset("PriceManagerGetItem", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PriceManagerItemGetandGets(PriceManagerModel PriceManagerModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Location", PriceManagerModel.Location);
                arlParms[1] = new SqlParameter("@DeptId", PriceManagerModel.DeptId);
                arlParms[2] = new SqlParameter("@ItemId", PriceManagerModel.ItemId);
                return SQLHelper.ExecuteDataset("PriceManagerItemgetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PriceManagerPriceGetandGets(PriceManagerModel PriceManagerModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Location", PriceManagerModel.Location);
                arlParms[1] = new SqlParameter("@DeptId", PriceManagerModel.DeptId);
                arlParms[2] = new SqlParameter("@ItemId", PriceManagerModel.ItemId);
                return SQLHelper.ExecuteDataset("PriceManagerPricegetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet OpeningStockEntryInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@OpenQuantityEntry", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("OpenQuantityEntryInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet LocationTransferInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@LocationTransfer", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("LocationTransferInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet LocationTransferUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@LocationTransfer", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("LocationTransferUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet LocationTransfernumbersearch(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@trNo", StockTransferOutModel.trNo);
                arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", StockTransferOutModel.UnitId);   //UserId 
                arlParms[3] = new SqlParameter("@flag", StockTransferOutModel.flag);   //UserId  

                return SQLHelper.ExecuteDataset("LocationTransferNumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LocTransferListForScanner(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@TrNo", StockTransferOutModel.trNo);
                arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", StockTransferOutModel.UId);   //UserId 
                arlParms[3] = new SqlParameter("@Variable1", StockTransferOutModel.ProductCode);
                arlParms[4] = new SqlParameter("@Variable2", StockTransferOutModel.ProductDescr);
                return SQLHelper.ExecuteDataset("LocTransferListForScanner", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LocationTransferScanGet(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@TrNo", StockTransferOutModel.trNo);
                arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.TransferDeptId);
                arlParms[2] = new SqlParameter("@LoginDeptId", StockTransferOutModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", StockTransferOutModel.UId);   //UserId 
                arlParms[4] = new SqlParameter("@Variable1", StockTransferOutModel.ProductCode);
                arlParms[5] = new SqlParameter("@Variable2", StockTransferOutModel.ProductDescr);
                return SQLHelper.ExecuteDataset("LocTransGetScan", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet LocationTransferList(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", StockTransferOutModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", StockTransferOutModel.ToDate);
                arlParms[2] = new SqlParameter("@TransferDeptId", StockTransferOutModel.TransferDeptId);
                arlParms[3] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                arlParms[4] = new SqlParameter("@UserId", StockTransferOutModel.UId);   //UserId 
                return SQLHelper.ExecuteDataset("LocationTransferView", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }


        }
        public DataSet PackingNumberSearch(PackingHistoryModel PackingHistoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeliveryNo", PackingHistoryModel.DeliveryNo);
                arlParms[1] = new SqlParameter("@DeptId", PackingHistoryModel.DeptId);
                return SQLHelper.ExecuteDataset("PackingHistorySearchSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DriverGetandGets(PackingHistoryModel PackingHistoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DriverId", PackingHistoryModel.DriverId);
                return SQLHelper.ExecuteDataset("DriverGerandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PackingDetailsGet(PackingHistoryModel PackingHistoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeliveryNo", PackingHistoryModel.DeliveryNo);
                arlParms[1] = new SqlParameter("@DeptId", PackingHistoryModel.DeptId);
                return SQLHelper.ExecuteDataset("PackingHistoryGetansGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PreviousPackingDeatilsshow(PackingHistoryModel PackingHistoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSeriesId", PackingHistoryModel.BillSeriesId);
                arlParms[1] = new SqlParameter("@BillSlNo", PackingHistoryModel.BillSlNo);
                arlParms[2] = new SqlParameter("@LocId", PackingHistoryModel.ItemLocationId);
                arlParms[3] = new SqlParameter("@UserId", PackingHistoryModel.UserId);
                return SQLHelper.ExecuteDataset("PreviousPackingDeatilsshow", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LocationTransferGetansGets(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@trNo", StockTransferOutModel.trNo);
                arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                arlParms[2] = new SqlParameter("@LocId", StockTransferOutModel.LocId);
                return SQLHelper.ExecuteDataset("LocationTransferGetansGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PriceManagementInsertandUpdate(PriceManagerModel PriceManagerModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[13];
                arlParms[0] = new SqlParameter("@ItemId", PriceManagerModel.ItemId);
                arlParms[1] = new SqlParameter("@Price1", PriceManagerModel.Price1);
                arlParms[2] = new SqlParameter("@Price2", PriceManagerModel.Price2);
                arlParms[3] = new SqlParameter("@Price3", PriceManagerModel.Price3);
                arlParms[4] = new SqlParameter("@DelFlag", PriceManagerModel.DelFlag);
                arlParms[5] = new SqlParameter("@Oldcostprice", PriceManagerModel.Oldcostprice);
                arlParms[6] = new SqlParameter("@Oldsellprice", PriceManagerModel.Oldsellprice);
                arlParms[7] = new SqlParameter("@oldmultiprice1", PriceManagerModel.oldmultiprice1);
                arlParms[8] = new SqlParameter("@oldmultiprice2", PriceManagerModel.oldmultiprice2);
                arlParms[9] = new SqlParameter("@Location", PriceManagerModel.Location);
                arlParms[10] = new SqlParameter("@DeptId", PriceManagerModel.DeptId);
                arlParms[11] = new SqlParameter("@UserId", PriceManagerModel.UserId);
                arlParms[12] = new SqlParameter("@Newcostprice", PriceManagerModel.Newcostprice);

                return SQLHelper.ExecuteDataset("PriceManagementInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PackingHistoryInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PackingHistory", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PackingHistoryInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet PackingHistoryTemporarySave(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PackingHistory", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PackingHistoryTemporaryInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CashCollectionInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CashCollection", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("CashCollectionInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet LocationTransferCancel(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@TransactionNo", StockTransferOutModel.TransactionNo);
                arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", StockTransferOutModel.UId);
                return SQLHelper.ExecuteDataset("LocationTransferCancel", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet LocationTransferSparepartsInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@LocationTransfer", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("LocationTransferSparepartsInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet LocationTransferOutList(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", StockTransferOutModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", StockTransferOutModel.ToDate);
                arlParms[2] = new SqlParameter("@TransferDeptId", StockTransferOutModel.TransferDeptId);
                arlParms[3] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                arlParms[4] = new SqlParameter("@UserId", StockTransferOutModel.UId);   //UserId 
                return SQLHelper.ExecuteDataset("LocationTransferOutList", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PendingLocationTransferSearch(StockTransferOutModel StockTransferOutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@trNo", StockTransferOutModel.trNo);
                arlParms[1] = new SqlParameter("@DeptId", StockTransferOutModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", StockTransferOutModel.UnitId);   //UserId 
                return SQLHelper.ExecuteDataset("PendingLocationTransferSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}