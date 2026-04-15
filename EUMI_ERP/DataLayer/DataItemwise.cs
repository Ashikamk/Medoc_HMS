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
    public class DataItemwise
    {
        private SqlParameter[] arlParms;
        KeyValues KeyValues = new KeyValues();

        public DataSet ItemwiseGetandGets(ModelItemwise MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("ItemWiseReportWithCheckbox", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_Rpt_ItemWisePurchase(HMSPurchaseReportModal Modal, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Condition", Modal.Condition);
                arlParms[1] = new SqlParameter("@DeptId", Modal.DeptId);
                arlParms[2] = new SqlParameter("@UserId ", Modal.UserId);
                return SQLHelper.ExecuteDataset("HMS_Rpt_ItemWisePurchase", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet UsedcarsItemWiseReport(ModelItemwise MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);                
                arlParms[1] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("UsedcarsItemWiseReport", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        
             public DataSet MetricTonReportGet(ModelItemwise MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", MasterModels.FromDate);
                arlParms[1] = new SqlParameter("@ToDate ", MasterModels.ToDate);
                arlParms[2] = new SqlParameter("@Supplier ", MasterModels.Supplier);
                return SQLHelper.ExecuteDataset("Rpt_MetricTon", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_ImmunizationReport(ImmunizationModel ImmunizationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@StartingDate", ImmunizationModel.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", ImmunizationModel.ToDate);
                arlParms[2] = new SqlParameter("@PatientId", ImmunizationModel.PatientId);
                arlParms[3] = new SqlParameter("@DelFlag", ImmunizationModel.DelFlag);
                arlParms[4] = new SqlParameter("@Status", ImmunizationModel.Status); 
                return SQLHelper.ExecuteDataset("HMS_ImmunizationReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet Rpt_StockInItemWisePurchase(HMSPurchaseReportModal Modal, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Condition", Modal.Condition);
                arlParms[1] = new SqlParameter("@DeptId", Modal.DeptId);
                arlParms[2] = new SqlParameter("@UserId ", Modal.UserId);
                return SQLHelper.ExecuteDataset("Rpt_StockInItemWisePurchase", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet StockoutItemwiseGetandGets(ModelItemwise MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", MasterModels.Condition);
                arlParms[1] = new SqlParameter("@Condition1", MasterModels.Condition1);
                arlParms[2] = new SqlParameter("@type", MasterModels.SType);
                arlParms[3] = new SqlParameter("@UserId ", MasterModels.UserId);
                return SQLHelper.ExecuteDataset("StockoutItemwiseGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}