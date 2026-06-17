using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Electonics
{
    public class DMasterProduct
    {
        private SqlParameter[] arlParms;


        public DataSet ItemElectronicsInsertandUpdate(ProductMstModel oItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[44];
                arlParms[0] = new SqlParameter("@ItemId", oItemMasterModel.ItemId);
                arlParms[1] = new SqlParameter("@ItemCode", oItemMasterModel.ItemCode);
                arlParms[2] = new SqlParameter("@Description", oItemMasterModel.Description);
                arlParms[3] = new SqlParameter("@Unit", oItemMasterModel.Unit);
                arlParms[4] = new SqlParameter("@Group", oItemMasterModel.Group);
                arlParms[5] = new SqlParameter("@SubGroup", oItemMasterModel.SubGroup);
                arlParms[6] = new SqlParameter("@Category", oItemMasterModel.Category);
                arlParms[7] = new SqlParameter("@SubCategory", oItemMasterModel.SubCategory);
                arlParms[8] = new SqlParameter("@OpeningQty", oItemMasterModel.OpeningQty);
                arlParms[9] = new SqlParameter("@OpeningCost", oItemMasterModel.OpeningCost);
                arlParms[10] = new SqlParameter("@VatCode", oItemMasterModel.VatCode);
                arlParms[11] = new SqlParameter("@SellingPrice", oItemMasterModel.SellingPrice);
                arlParms[12] = new SqlParameter("@Model1", oItemMasterModel.Model1);
                arlParms[13] = new SqlParameter("@Model2", oItemMasterModel.Model2);
                arlParms[14] = new SqlParameter("@Model3", oItemMasterModel.Model3);
                arlParms[15] = new SqlParameter("@MaxQty", oItemMasterModel.MaxQty);
                arlParms[16] = new SqlParameter("@MinQty", oItemMasterModel.MinQty);
                arlParms[17] = new SqlParameter("@Bin_A", oItemMasterModel.Bin_A);
                arlParms[18] = new SqlParameter("@Bin_B", oItemMasterModel.Bin_B);
                arlParms[19] = new SqlParameter("@Bin_C", oItemMasterModel.Bin_C);
                arlParms[20] = new SqlParameter("@Bin_D", oItemMasterModel.Bin_D);
                arlParms[21] = new SqlParameter("@Bin_E", oItemMasterModel.Bin_E);
                arlParms[22] = new SqlParameter("@Bin_F", oItemMasterModel.Bin_F);
                arlParms[23] = new SqlParameter("@Bin_G", oItemMasterModel.Bin_G);
                arlParms[24] = new SqlParameter("@Bin_H", oItemMasterModel.Bin_H);
                arlParms[25] = new SqlParameter("@Size", oItemMasterModel.Size);
                arlParms[26] = new SqlParameter("@Weight", oItemMasterModel.Weight);
                arlParms[27] = new SqlParameter("@Length", oItemMasterModel.Length);
                arlParms[28] = new SqlParameter("@Width", oItemMasterModel.Width);
                arlParms[29] = new SqlParameter("@Thickness", oItemMasterModel.Thickness);
                arlParms[30] = new SqlParameter("@Density", oItemMasterModel.Density);
                arlParms[31] = new SqlParameter("@Specification", oItemMasterModel.Specification);
                arlParms[32] = new SqlParameter("@Active", oItemMasterModel.Active);
                arlParms[33] = new SqlParameter("@Deleteflag", oItemMasterModel.DelFlag);
                arlParms[34] = new SqlParameter("@LPCost", oItemMasterModel.LPCost);
                arlParms[35] = new SqlParameter("@AvgCost", oItemMasterModel.AvgCost);
                arlParms[36] = new SqlParameter("@StockIn", oItemMasterModel.StockIn);
                arlParms[37] = new SqlParameter("@StockOut", oItemMasterModel.StockOut);
                arlParms[38] = new SqlParameter("@Hsncode", oItemMasterModel.Hsncode);
                arlParms[39] = new SqlParameter("@Sellprice1", oItemMasterModel.SellingPrice_1);
                arlParms[40] = new SqlParameter("@Sellprice2", oItemMasterModel.SellingPrice_2);
                arlParms[41] = new SqlParameter("@MRP", oItemMasterModel.MRP);
                arlParms[42] = new SqlParameter("@UserId", oItemMasterModel.UserId);
                arlParms[43] = new SqlParameter("@DeptId", oItemMasterModel.DeptId);
                return SQLHelper.ExecuteDataset("ItemElectronicsInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }




        public DataSet Roomservicemaping(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemAccessories", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("RoomservicemapingUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet AccessoriesUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemAccessories", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ItemAccessoriesUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CatgeoryAccessoriesSave(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemAccessories", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("CatgeoryAccessoriesUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ItemSupplierUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemSupplier", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ItemSupplierUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        
            public DataSet RoomserviceGetandGets(ProductMstModel oItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", oItemMasterModel.ItemId);
                return SQLHelper.ExecuteDataset("RoomserviceGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet AccessoriesGetandGets(ProductMstModel oItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", oItemMasterModel.ItemId);               
                return SQLHelper.ExecuteDataset("ItemAccessoriesGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ItemSupplierGetandGets(ProductMstModel oItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", oItemMasterModel.ItemId);
                return SQLHelper.ExecuteDataset("ItemSupplierGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CatgeoryAccessoriesGet(ProductMstModel oItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CategoryId", oItemMasterModel.CategoryId);
                return SQLHelper.ExecuteDataset("CatgeoryAccessoriesGet", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

    }
}