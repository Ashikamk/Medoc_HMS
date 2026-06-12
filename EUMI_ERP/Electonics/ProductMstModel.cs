using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Electonics
{
    public class ProductMstModel
    {
        private SqlParameter[] arlParms;
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public string Description { get; set; }
        public string Unit { get; set; }
        public string Group { get; set; }
        public string SubGroup { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string VatCode { get; set; }
        public string VatPercentage { get; set; }
        public decimal OpeningQty { get; set; }
        public decimal OpeningCost { get; set; }
        public decimal LPCost { get; set; }
        public decimal AvgCost { get; set; }
        public decimal SellingPrice { get; set; }
        public decimal MRP { get; set; }
        public decimal SellingPrice_1 { get; set; }
        public decimal SellingPrice_2 { get; set; }
        public decimal StockIn { get; set; }
        public decimal StockOut { get; set; }
        public decimal InHandQty { get; set; }
        public string Model1 { get; set; }
        public string Hsncode { get; set; }

        public string Model2 { get; set; }
        public string Model3 { get; set; }
        public decimal MaxQty { get; set; }
        public decimal MinQty { get; set; }
        public decimal Size { get; set; }
        public decimal Weight { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Thickness { get; set; }
        public decimal Density { get; set; }
        public string Specification { get; set; }
        public string LocationName { get; set; }
        public string Bin_A { get; set; }
        public string Bin_B { get; set; }
        public string Bin_C { get; set; }
        public string Bin_D { get; set; }
        public string Bin_E { get; set; }
        public string Bin_F { get; set; }
        public string Bin_G { get; set; }
        public string Bin_H { get; set; }
        public string Status { get; set; }
        public int Active { get; set; }
        public int DelFlag { get; set; }
        public int NoQty { get; set; }
        public string UnitName { get; set; }
        public int UnitId { get; set; }
        public string GrpName { get; set; }
        public int GrpId { get; set; }
        public string SbgrpName { get; set; }
        public int SbgrpId { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public string VAT { get; set; }
        public int VatId { get; set; }
        public decimal VatPer { get; set; }
        public long MultiUnitId { get; set; }
        public decimal Fraction { get; set; }
        public decimal UnitPrice { get; set; }
        public long ProductMultiPriceId { get; set; }
        public long MultiPriceId { get; set; }
        public decimal Price { get; set; }
        public int LocId { get; set; }
        public int DeptId { get; set; }
        public long stocktotloseqty { get; set; }
        public long TotQty { get; set; }
        public int Sumtotqty { get; set; }
        public int Custlastsellingprice { get; set; }
        public int UserId { get; set; }
        public int CustId { get; set; }
        public string Condition { get; set; }

        public string AccessoriesName { get; set; }
        public string AccessoryCode { get; set; } 
        public int AccessoriesId { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public int AccessQty { get; set; }
        



        DMasterProduct oDMasters = new DMasterProduct();

        DMasters oldDmasters = new DMasters();

        public DataSet ItemElectronicsInsertandUpdate(ProductMstModel ProductMstModel, string dbName)
        {
            return oDMasters.ItemElectronicsInsertandUpdate(ProductMstModel, dbName);
        }


        
            public DataSet Roomservicemaping(DataTable dt, string dbName)
        {
            return oDMasters.Roomservicemaping(dt, dbName);
        }


        public DataSet AccessoriesUpdate(DataTable dt, string dbName)
        {
            return oDMasters.AccessoriesUpdate(dt, dbName);
        }
        public DataSet ItemSupplierUpdate(DataTable dt, string dbName)
        {
            return oDMasters.ItemSupplierUpdate(dt, dbName);
        }


        
            public DataSet RoomserviceGetandGets(ProductMstModel ProductMstModel, string dbName)
        {
            return oDMasters.RoomserviceGetandGets(ProductMstModel, dbName);
        }

        public DataSet AccessoriesGetandGets(ProductMstModel ProductMstModel, string dbName)
        {
            return oDMasters.AccessoriesGetandGets(ProductMstModel, dbName);
        }
        public DataSet ItemSupplierGetandGets(ProductMstModel ProductMstModel, string dbName)
        {
            return oDMasters.ItemSupplierGetandGets(ProductMstModel, dbName);
        }

        public DataSet CatgeoryAccessoriesGet(ProductMstModel ProductMstModel, string dbName)
        {
            return oDMasters.CatgeoryAccessoriesGet(ProductMstModel, dbName);
        }


        public DataSet CatgeoryAccessoriesSave(DataTable dt, string dbName)
        {
            return oDMasters.CatgeoryAccessoriesSave(dt, dbName);
        }
        
        public DataSet CategoryAccessoriesMappingList(ProductMstModel ProductMstModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[1];
                string Query = "select CAM.CategoryId,CategoryName,AccessoriesId,ItemCode,Description from Mst_CategoryAccessoryMapping as CAM "+
                                "inner join Mst_Category on CAM.CategoryId = Mst_Category.CategoryId "+
                                "inner join Mst_Item on CAM.AccessoriesId = Mst_Item.ItemId "+
                                "where CAM.DelFlag = 1";

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("CommonQueryRun", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SupplierItemInsert(DataTable dt, string dbName)
        {  
            return oldDmasters.SupplierItemInsert(dt, dbName);
        }
    }
}