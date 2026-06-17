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
    public class DataSalesReport
    {

        private SqlParameter[] arlParms;
        KeyValues KeyValues = new KeyValues();

        public DataSet salesreportGetandGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("GetSalesReport11", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet salesreportGetandGetsproc(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("GetSalesReportproc", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet ItemwiseReportSalesSummaryGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.ToDate);
                arlParms[2] = new SqlParameter("@CustomerId", MasterModels.CustId);
                arlParms[3] = new SqlParameter("@GroupId ", MasterModels.GroupId);
                arlParms[4] = new SqlParameter("@SubGroupId ", MasterModels.SubGroupId);
                return SQLHelper.ExecuteDataset("Rpt_ItemwiseSalesSummary", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet BelowCostReportGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.ToDate);
                arlParms[2] = new SqlParameter("@ItemId", MasterModels.ItemId);
                return SQLHelper.ExecuteDataset("Rpt_BelowCost", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet DailyPurchaseGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", MasterModels.DeptId);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("DailyPurchaseWidgets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ItemwiseReportSalesDetailsGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.ToDate);
                arlParms[2] = new SqlParameter("@CustomerId", MasterModels.CustId);
                arlParms[3] = new SqlParameter("@GroupId ", MasterModels.GroupId);
                arlParms[4] = new SqlParameter("@SubGroupId ", MasterModels.SubGroupId);
                return SQLHelper.ExecuteDataset("Rpt_ItemwiseSalesDetails", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ProfitAnalysisGroupwiseReportGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.ToDate);
                arlParms[2] = new SqlParameter("@GroupId ", MasterModels.GroupId);
                arlParms[3] = new SqlParameter("@SubGroupId ", MasterModels.SubGroupId);
                return SQLHelper.ExecuteDataset("Rpt_ProftAnalysisGroupwiseNew", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet GasDistributionGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.ToDate);
                arlParms[2] = new SqlParameter("@CustId", MasterModels.CustId);
                arlParms[3] = new SqlParameter("@SalesmanId ", MasterModels.SalesmanId);
                arlParms[4] = new SqlParameter("@AreaId ", MasterModels.AreaId);
                arlParms[5] = new SqlParameter("@PayTypeId ", MasterModels.PayTerms);
                arlParms[6] = new SqlParameter("@DeptId ", MasterModels.DeptId);
                return SQLHelper.ExecuteDataset("Rpt_GasDistribution", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DetailedStockReportGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.ToDate);
                arlParms[2] = new SqlParameter("@ItemId", MasterModels.ItemId);
                return SQLHelper.ExecuteDataset("Rpt_DetailedStock", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet DetailedReportGasGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MasterModels.ToDate);
                arlParms[2] = new SqlParameter("@LocationId", MasterModels.LocId);
                return SQLHelper.ExecuteDataset("Rpt_DetailedReportGas", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        
        public DataSet salesreportGetandGetsmainMointhly(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("GetSalesreportUncheckedmonthly", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet salesreportGetandGetsmain(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("GetSalesreportUnchecked", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet salesreportGetandGetsSummary(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("GetSalesreportSummaryUnchecked", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet stockoutreportmonthly(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("stockoutreportmonthly", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet stockoutGetandGetsmain(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("stockoutGetandGetsmain", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet stockoutGetandGetsSummary(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("stockoutGetandGetsSummary", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet stockoutreportGetandGets(ModelSalesReport MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("stockoutreportGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}