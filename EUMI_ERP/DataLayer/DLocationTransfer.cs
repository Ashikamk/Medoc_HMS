using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using EUMI_ERP.Models;

namespace EUMI_ERP.DataLayer
{
    public class DLocationTransfer
    {
        private SqlParameter[] arlParms;


        
        public DataSet SubMenuGetandGets(UserMenuSettingsModel UserMenuSettingsModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", UserMenuSettingsModel.UserId);
                return SQLHelper.ExecuteDataset("SubMenuGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ContainerTransferReportGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@FromDate", ItemMasterModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ItemMasterModel.ToDate);
                arlParms[2] = new SqlParameter("@Container", ItemMasterModel.Container);
                arlParms[3] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                arlParms[4] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[5] = new SqlParameter("@Var1", ItemMasterModel.Var1);
                arlParms[6] = new SqlParameter("@Var2", ItemMasterModel.Var2);
                return SQLHelper.ExecuteDataset("Rpt_ContainerTransfer", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet ItemLocationGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", ItemMasterModel.ItemId);
                arlParms[1] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                return SQLHelper.ExecuteDataset("ItemLocationGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet LocationTransferInsertandUpdate(LocationTransferModel LocationTransferModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[12];
                arlParms[0] = new SqlParameter("@ItemId", LocationTransferModel.ItemId);
                arlParms[1] = new SqlParameter("@LocTransId", LocationTransferModel.LocTransId);
                arlParms[2] = new SqlParameter("@LoadFrom", LocationTransferModel.LoadFrom);
                arlParms[3] = new SqlParameter("@LoadTo", LocationTransferModel.LoadTo);
                arlParms[4] = new SqlParameter("@ItemKey", LocationTransferModel.ItemKey);
                arlParms[5] = new SqlParameter("@Flag", LocationTransferModel.Flag);
                arlParms[6] = new SqlParameter("@DelFlag", LocationTransferModel.DelFlag);
                arlParms[7] = new SqlParameter("@UserId", LocationTransferModel.UserId);
                arlParms[8] = new SqlParameter("@DeptId", LocationTransferModel.DeptId);
                arlParms[9] = new SqlParameter("@Remarks", LocationTransferModel.Remarks);
                arlParms[10] = new SqlParameter("@CheckFlag", LocationTransferModel.CheckFlag);
                arlParms[11] = new SqlParameter("@TransferDate", LocationTransferModel.TransferDate);
                return SQLHelper.ExecuteDataset("LocationTransferInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet TransferItem(LocationTransferModel LocationTransferModel, string dbName)
        {
            try
            { 
                arlParms = new SqlParameter[6]; 
                arlParms[0] = new SqlParameter("@ItemId", LocationTransferModel.ItemId);
                arlParms[1] = new SqlParameter("@FromLoad", LocationTransferModel.FromLoad);
                arlParms[2] = new SqlParameter("@ToLoad", LocationTransferModel.ToLoad);
                arlParms[3] = new SqlParameter("@DeptId", LocationTransferModel.DeptId);
                arlParms[4] = new SqlParameter("@LocTransId", LocationTransferModel.LocTransId);
                arlParms[5] = new SqlParameter("@UserId", LocationTransferModel.UserId);

                return SQLHelper.ExecuteDataset("TransferItem", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
       
        public DataSet EditItem(LocationTransferModel LocationTransferModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@ItemId", LocationTransferModel.ItemId);
                arlParms[1] = new SqlParameter("@FromLoad", LocationTransferModel.FromLoad);
                arlParms[2] = new SqlParameter("@ToLoad", LocationTransferModel.ToLoad);
                arlParms[3] = new SqlParameter("@DeptId", LocationTransferModel.DeptId);
                arlParms[4] = new SqlParameter("@LocTransId", LocationTransferModel.LocTransId);
                arlParms[5] = new SqlParameter("@ItemKey", LocationTransferModel.ItemKey);
                arlParms[6] = new SqlParameter("@UserId", LocationTransferModel.UserId);
                return SQLHelper.ExecuteDataset("EditItem", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet TransferALLItemUC(LocationTransferModel LocationTransferModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeptId", LocationTransferModel.DeptId);
                arlParms[1] = new SqlParameter("@UserId", LocationTransferModel.UserId);

                return SQLHelper.ExecuteDataset("TransferALLItemUC", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet DeleteLocnTransfer(LocationTransferModel LocationTransferModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[1];
                string Query = "UPDATE Inv_LocationTransferTransport SET  DelFlag=0  where LocTransId='"+ LocationTransferModel.LocTransId + "'; SELECT 3 Status";

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("CommonQueryRun", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
      
        public DataSet LocationTransferGetandGets(LocationTransferModel LocationTransferModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@LocTransId", LocationTransferModel.LocTransId);
                arlParms[1] = new SqlParameter("@UserId", LocationTransferModel.UserId);
                
                return SQLHelper.ExecuteDataset("LocationTransferGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet ContainerImportInsertandUpdate(DataTable dt, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ContainerImportType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ContainerImportInsertandUpdate", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ContainerLocationTransfer(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ContainerLocationTransfer", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ContainerLocationTransfer", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        
        public DataSet ContainerList(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", ContainerManagement.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ContainerManagement.Todate);
                arlParms[2] = new SqlParameter("@Status", ContainerManagement.Status);
                return SQLHelper.ExecuteDataset("ContainerList", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ContainerNumberSearch(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ContainerSlno", ContainerManagement.ContainerSlno);
                arlParms[1] = new SqlParameter("@DeptId", ContainerManagement.DeptId);
                return SQLHelper.ExecuteDataset("ContainerNumberSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ContainerSearch(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ContainerSlno", ContainerManagement.ContainerSlno);
                arlParms[1] = new SqlParameter("@DeptId", ContainerManagement.DeptId);
                return SQLHelper.ExecuteDataset("ContainerSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ArrivingContainersGets(ContainerManagement ContainerManagement, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[1];
                 arlParms[0] = new SqlParameter("@Type", ContainerManagement.Type); 
                return SQLHelper.ExecuteDataset("ArrivingContainersGets", dbName, arlParms);  
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AutoLocTransferUtilityForUC(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeptId", ContainerManagement.DeptId);
                return SQLHelper.ExecuteDataset("AutoLocTransferUtilityForUC", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet TopSelling(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[0];
                return SQLHelper.ExecuteDataset("TopSelling", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet OnPortItemGetandGets(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Type", ContainerManagement.Type);
                arlParms[1] = new SqlParameter("@DeptId", ContainerManagement.DeptId);
                return SQLHelper.ExecuteDataset("OnPortItemCountGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ContainersListGets(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Type", ContainerManagement.Type);
                arlParms[1] = new SqlParameter("@DeptId", ContainerManagement.DeptId);
                return SQLHelper.ExecuteDataset("ContainersListGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ContainerDeatailsGets(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ContainerNumber", ContainerManagement.ContainerNumber);
                arlParms[1] = new SqlParameter("@DeptId", ContainerManagement.DeptId);
                return SQLHelper.ExecuteDataset("ContainerDetailListGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LoadingCarsGet(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Type", ContainerManagement.Type);
                arlParms[1] = new SqlParameter("@DeptId", ContainerManagement.DeptId);
                arlParms[2] = new SqlParameter("@LocationId", ContainerManagement.Location);
                return SQLHelper.ExecuteDataset("LoadingCarsGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ChassisNumberSearch(LocationTransferModel LocationTransferModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ChasisNumber", LocationTransferModel.ChasisNumber);
                return SQLHelper.ExecuteDataset("ChassisNumberSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet TranferContainerSearch(LocationTransferModel LocationTransferModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ContainerNumber", LocationTransferModel.ContainerNumber);
                return SQLHelper.ExecuteDataset("LocationTransferContainerSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet OrderBouncingGetandGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@LocId", SalesInvoiceModel.LocId);
                return SQLHelper.ExecuteDataset("OrderBouncingGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ApproveOrderBouncing(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DelFlag", SalesInvoiceModel.DelFlag);
                return SQLHelper.ExecuteDataset("ApproveOrderBouncing", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AcceptAllOrderBouncing(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);               
                return SQLHelper.ExecuteDataset("AcceptAllOrderBouncing", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ContainerReport(ContainerManagement ContainerManagement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", ContainerManagement.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ContainerManagement.Todate);
                arlParms[2] = new SqlParameter("@Status", ContainerManagement.Status);
                return SQLHelper.ExecuteDataset("Rpt_ContainerManagement", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




    }
}
