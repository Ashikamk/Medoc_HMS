using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using EUMI_ERP.Models;

namespace EUMI_ERP
{
    public class DProjectandJob
    {

        private SqlParameter[] arlParms;

        public DataSet ToolsManagementInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ToolsManagementInsertType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ToolsManagementInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ToolManagementUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ToolsManagementInsertType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ToolManagementUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ToolsManagementList(ToolsManagementModel ToolsManagementModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", ToolsManagementModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ToolsManagementModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", ToolsManagementModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", ToolsManagementModel.UserId);
                return SQLHelper.ExecuteDataset("ToolsManagementList", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ToolManagementGetandGets(ToolsManagementModel ToolsManagementModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@VOCNo", ToolsManagementModel.VocNo);
                arlParms[1] = new SqlParameter("@DeptId", ToolsManagementModel.DeptId);

                return SQLHelper.ExecuteDataset("ToolManagementGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet TMNoSearch(ToolsManagementModel ToolsManagementModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@TMNo", ToolsManagementModel.VocNo);
                return SQLHelper.ExecuteDataset("TMNoSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ToolManagementDelete(ToolsManagementModel ToolsManagementModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@TMNo", ToolsManagementModel.VocNo);
                arlParms[1] = new SqlParameter("@DeptId", ToolsManagementModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", ToolsManagementModel.UserId);
                return SQLHelper.ExecuteDataset("ToolManagementDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet BillofQuantityInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MultiProduct", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("BOQInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet BillofQuantityUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MultiProduct", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("BOQUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet BOQSlNoGetandGets(SerialNumberModel SerialNumberModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@deptid", SerialNumberModel.DeptId);
                return SQLHelper.ExecuteDataset("GetShowSlnoNumber", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet BillofQuantityGetandGets(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@BOQNo", BillofQuantityModel.BOQSlNo);
                return SQLHelper.ExecuteDataset("BOQGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet BOQNoSearch(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@BOQNo", BillofQuantityModel.BOQSlNo);
                arlParms[1] = new SqlParameter("@deptid", BillofQuantityModel.DeptId);
                return SQLHelper.ExecuteDataset("BOQNoSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MaterialIssueSearch(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@MINo", BillofQuantityModel.MINo);
                arlParms[1] = new SqlParameter("@DeptId", BillofQuantityModel.DeptId);
                return SQLHelper.ExecuteDataset("MaterialIssueSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet BOQDelete(BillofQuantityModel BillofQuantityModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BOQNo", BillofQuantityModel.BOQSlNo);
                arlParms[1] = new SqlParameter("@DeptId", BillofQuantityModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", BillofQuantityModel.UserId);
                return SQLHelper.ExecuteDataset("BOQDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MaterialIssueAccountGet(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeptId", BillofQuantityModel.DeptId);
                return SQLHelper.ExecuteDataset("MaterialIssueAccountGet", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MaterialIssueInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MaterialIssue", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MaterialIssueInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MaterialIssueUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MaterialIssue", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MaterialIssueUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MaterialIssueGetandGets(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MINo", BillofQuantityModel.MINo);
                return SQLHelper.ExecuteDataset("MaterialIssueGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MaterialIssueDelete(BillofQuantityModel BillofQuantityModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@MINo", BillofQuantityModel.MINo);
                arlParms[1] = new SqlParameter("@DeptId", BillofQuantityModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", BillofQuantityModel.UserId);
                return SQLHelper.ExecuteDataset("MaterialIssueDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MRApprovalAutocomplete(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", BillofQuantityModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", BillofQuantityModel.ToDate);
                arlParms[2] = new SqlParameter("@MRNo", BillofQuantityModel.MRNo);
                arlParms[3] = new SqlParameter("@Approval", BillofQuantityModel.Approved);
                return SQLHelper.ExecuteDataset("MRApprovalAutocomplete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MaterialReturnInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MaterialReturnType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MaterialReturnInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MaterialReturnUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MaterialReturnType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MaterialReturnUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MaterialReturnNoSearch(MaterialReturn MaterialReturn, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ReturnNo", MaterialReturn.ReturnNo);
                arlParms[1] = new SqlParameter("@DeptId", MaterialReturn.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialReturn.UserId);
                arlParms[3] = new SqlParameter("@Status", MaterialReturn.Status);
                return SQLHelper.ExecuteDataset("MaterialReturnNoSearch", dbName, arlParms);

            }

            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MaterialReturnGetandGets(MaterialReturn MaterialReturn, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@ReturnNo", MaterialReturn.ReturnNo);
                arlParms[1] = new SqlParameter("@DeptId", MaterialReturn.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialReturn.UserId);
                arlParms[3] = new SqlParameter("@Status", MaterialReturn.Status);
                arlParms[4] = new SqlParameter("@Date", MaterialReturn.ReturnDate);
                return SQLHelper.ExecuteDataset("MaterialReturnGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MaterialReturnDelete(MaterialReturn MaterialReturn, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@ReturnNo", MaterialReturn.ReturnNo);
                arlParms[1] = new SqlParameter("@DeptId", MaterialReturn.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialReturn.UserId);
                arlParms[3] = new SqlParameter("@Status", MaterialReturn.Status);
                arlParms[4] = new SqlParameter("@ReturnDate", MaterialReturn.ReturnDate);
                return SQLHelper.ExecuteDataset("MaterialReturnDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CostCodeSearch(CostCenterModel CostCenterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@CostCenterName", CostCenterModel.CostCenterName);
                arlParms[1] = new SqlParameter("@Status", CostCenterModel.Status);
                arlParms[2] = new SqlParameter("@DelFlag", CostCenterModel.DelFlag);
                return SQLHelper.ExecuteDataset("CostCodeSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MIList(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", BillofQuantityModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", BillofQuantityModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", BillofQuantityModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", BillofQuantityModel.UserId);
                return SQLHelper.ExecuteDataset("MaterialIssueView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet BOQList(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", BillofQuantityModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", BillofQuantityModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", BillofQuantityModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", BillofQuantityModel.UserId);
                return SQLHelper.ExecuteDataset("BOQView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ProjectAnalysis(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", BillofQuantityModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", BillofQuantityModel.ToDate);
                arlParms[2] = new SqlParameter("@JobId", BillofQuantityModel.JobCodeId);
                arlParms[3] = new SqlParameter("@JobGrp", BillofQuantityModel.JobGroup);
                arlParms[4] = new SqlParameter("@CustId", BillofQuantityModel.CustId);
                arlParms[5] = new SqlParameter("@Flag", BillofQuantityModel.Flag);
                return SQLHelper.ExecuteDataset("Rpt_ProjectAnalysis", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet ProjectJobDashboard(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", BillofQuantityModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", BillofQuantityModel.ToDate);
                arlParms[2] = new SqlParameter("@Type", BillofQuantityModel.Type);
                return SQLHelper.ExecuteDataset("ProjectJobDasboardWidgets", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet ProjectJobDasboardWidgets(BillofQuantityModel BillofQuantityModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", BillofQuantityModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", BillofQuantityModel.ToDate);
               
                return SQLHelper.ExecuteDataset("ProjectJobWidgets", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}