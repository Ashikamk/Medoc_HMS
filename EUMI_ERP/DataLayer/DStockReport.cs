using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP
{
    public class DStockReport
    {
      
            private SqlParameter[] arlParms;

            public DataSet StockReportGet(StockReportModel StockReportModel, string dbName)
            {
                try
                {
                  arlParms = new SqlParameter[2]; 
                  arlParms[0] = new SqlParameter("@Type", StockReportModel.Type);
                  arlParms[1] = new SqlParameter("@Condition", StockReportModel.Condition); 
                
                return SQLHelper.ExecuteDataset("Rpt_GetStockPurchase", dbName, arlParms);

                }
                catch (Exception exMe)
                {
                    Console.WriteLine(exMe.Message);
                    return null;
                }

            }

        public DataSet StockQueryGet(StockReportModel StockReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Type", StockReportModel.Type);
                arlParms[1] = new SqlParameter("@Condition", StockReportModel.Condition);

                return SQLHelper.ExecuteDataset("Rpt_GetStockQueryUC", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PendingPurchaseOrderSQ(StockReportModel StockReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ItemId", StockReportModel.ItemId);
                arlParms[1] = new SqlParameter("@DeptId", StockReportModel.Department);
                arlParms[2] = new SqlParameter("@UserId", StockReportModel.UserId);
                arlParms[3] = new SqlParameter("@Type", StockReportModel.Type);
                return SQLHelper.ExecuteDataset("PendingPurchaseOrderOfProduct", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet StockTransferOutReportGet(StockReportModel StockReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", StockReportModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", StockReportModel.ToDate);
                arlParms[2] = new SqlParameter("@Dept", StockReportModel.Department);
                return SQLHelper.ExecuteDataset("Rpt_StockTransferOut", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet StockTransferInReportGet(StockReportModel StockReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", StockReportModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", StockReportModel.ToDate);
                arlParms[2] = new SqlParameter("@Dept", StockReportModel.Department);
                return SQLHelper.ExecuteDataset("Rpt_StockTransferIn", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DetailedStock(StockReportModel StockReportModel, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", StockReportModel.Condition);
                arlParms[1] = new SqlParameter("@Condition1", StockReportModel.Condition1);
                arlParms[2] = new SqlParameter("@Date", StockReportModel.ToDate);
                arlParms[3] = new SqlParameter("@type", StockReportModel.Type);
                return SQLHelper.ExecuteDataset("DetailedStock", dbName, arlParms); 

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VCCPaidUpdate(StockReportModel StockReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", StockReportModel.ItemId);
                arlParms[1] = new SqlParameter("@VCCFalg", StockReportModel.VCCFlag);
                return SQLHelper.ExecuteDataset("VCCPaidUpdate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet StockLedger(StockLedger StockLedger, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@PRODUCTID", StockLedger.ProductId);
                arlParms[1] = new SqlParameter("@FROMDATE", StockLedger.FromDate);
                arlParms[2] = new SqlParameter("@TODATE", StockLedger.ToDate);
                arlParms[3] = new SqlParameter("@USERID", StockLedger.UserId);
                arlParms[4] = new SqlParameter("@DEPTID", StockLedger.DeptId);

                return SQLHelper.ExecuteDataset("Rpt_StockLedger", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


    }
}