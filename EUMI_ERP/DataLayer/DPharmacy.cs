using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataLayer
{
    public class DPharmacy
    {
        private SqlParameter[] arlParms;

        public DataSet HMS_ItemExcelImport(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemDetailsType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_ItemExcelImport", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_ImmunizationSearch(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);               
                return SQLHelper.ExecuteDataset("HMS_ImmunizationSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }





        public DataSet HMS_PurchaseProductSearch(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);
                arlParms[1] = new SqlParameter("@SupplierId", ItemMasterModel.SlNumber);
                arlParms[2] = new SqlParameter("@JobNo", ItemMasterModel.JobNo);
                arlParms[3] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[4] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                return SQLHelper.ExecuteDataset("HMS_PurchaseProductSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_LabPurchaseProductSearch(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);
                arlParms[1] = new SqlParameter("@SupplierId", ItemMasterModel.SlNumber);
                arlParms[2] = new SqlParameter("@JobNo", ItemMasterModel.JobNo);
                arlParms[3] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[4] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                return SQLHelper.ExecuteDataset("HMS_LabPurchaseProductSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }





        public DataSet HMS_OpeningPurchaseInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_PurchaseInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_PurchaseInsertOpening", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }




        public DataSet HMS_PurchaseInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_PurchaseInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_PurchaseInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_PurchaseInsertTemp(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_PurchaseInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_PurchaseInsertTemp", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        

            public DataSet HMS_PurchaseUpdateOpening(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_PurchaseInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_PurchaseUpdateOpening", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }




        public DataSet HMS_PurchaseUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_PurchaseInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_PurchaseUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_PurchaseReturnInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_PurchaseInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_PurchaseReturnInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_PurchaseReturnUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_PurchaseInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_PurchaseReturnUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        

            public DataSet HMS_PurchaseDeleteopening(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@SlNo", PharmacyModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId);

                return SQLHelper.ExecuteDataset("HMS_PurchaseDeleteOpening", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_PurchaseDelete(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@SlNo", PharmacyModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId);

                return SQLHelper.ExecuteDataset("HMS_PurchaseDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet HMS_PurchaseReturnDelete(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@SlNo", PharmacyModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId);

                return SQLHelper.ExecuteDataset("HMS_PurchaseReturnDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        

             public DataSet HMS_PurchaseGetandGetsOpening(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", PharmacyModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_PurchaseGetandGetsOpening", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }






        public DataSet HMS_PurchaseGetandGets(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", PharmacyModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_PurchaseGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_PurchaseReturnGetandGets(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SlNo", PharmacyModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_PurchaseReturnGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_PurchaseTempList(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[1] = new SqlParameter("@UserId", PharmacyModel.UserId);

                return SQLHelper.ExecuteDataset("HMS_PurchaseTempList", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_PurchaseTempGets(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@SlNo", PharmacyModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId);
                arlParms[3] = new SqlParameter("@Flag", PharmacyModel.Flag);

                return SQLHelper.ExecuteDataset("HMS_PurchaseTempGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_BatchPurchaseCorrection(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@ProductId", PharmacyModel.ItemId);
                arlParms[1] = new SqlParameter("@Batch", PharmacyModel.Batch);
                arlParms[2] = new SqlParameter("@LocationId", PharmacyModel.LocationId);
                arlParms[3] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[4] = new SqlParameter("@UserId", PharmacyModel.UserId);
                arlParms[5] = new SqlParameter("@Flag", PharmacyModel.Flag);                
                return SQLHelper.ExecuteDataset("HMS_BatchPurchaseCorrection", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_BatchPurchaseReturn(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@ProductId", PharmacyModel.ItemId);
                arlParms[1] = new SqlParameter("@Batch", PharmacyModel.Batch);
                arlParms[2] = new SqlParameter("@LocationId", PharmacyModel.LocationId);
                arlParms[3] = new SqlParameter("@SupplierId", PharmacyModel.SupplierId);
                arlParms[4] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[5] = new SqlParameter("@UserId", PharmacyModel.UserId);
                arlParms[6] = new SqlParameter("@Flag", PharmacyModel.Flag);
                return SQLHelper.ExecuteDataset("HMS_BatchPurchaseReturn", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_PurchaseCorrectionInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_PurchaseInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_PurchaseCorrectionInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_PurchaseCorrectionSearch(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PCNO", PharmacyModel.Batch);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId); 
                return SQLHelper.ExecuteDataset("HMS_PurchaseCorrectionSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_PurchaseCorrectionGets(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PCNO", PharmacyModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId);
                return SQLHelper.ExecuteDataset("HMS_PurchaseCorrectionGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_LocationTransferInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Type", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_LocationTransferInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_LocationTransferUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Type", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_LocationTransferUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_LocationTransferDelete(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@TRNo", PharmacyModel.TRNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId);
                return SQLHelper.ExecuteDataset("HMS_LocationTransferDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_LocationTransferGet(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@TRNo", PharmacyModel.TRNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId);
                return SQLHelper.ExecuteDataset("HMS_LocationTransferGet", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_LocationTransferView(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@LocationId", PharmacyModel.LocationId);
                arlParms[1] = new SqlParameter("@From", PharmacyModel.FromDate);
                arlParms[2] = new SqlParameter("@To", PharmacyModel.ToDate);
                arlParms[4] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[5] = new SqlParameter("@UserId", PharmacyModel.UserId);
                return SQLHelper.ExecuteDataset("HMS_LocationTransferView", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_LocationTransferSearch(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@TRNo", PharmacyModel.Status);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId);
                return SQLHelper.ExecuteDataset("HMS_LocationTransferSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_PurchaseCorrectionGetsbyItem(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@PCNO", PharmacyModel.SlNo);
                arlParms[1] = new SqlParameter("@DeptId", PharmacyModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", PharmacyModel.UserId);
                arlParms[3] = new SqlParameter("@ItemId", PharmacyModel.ItemId);
                arlParms[4] = new SqlParameter("@Status", PharmacyModel.Status);
                return SQLHelper.ExecuteDataset("HMS_PurchaseCorrectionGetsbyItem", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}