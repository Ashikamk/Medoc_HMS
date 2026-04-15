using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataLayer
{
    public class DMaterialRequest
    {
        private SqlParameter[] arlParms;
        public DataSet MRProductSearch(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ItemCode", MaterialRequestModel.ItemCode);
                arlParms[1] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialRequestModel.UserId);
                arlParms[3] = new SqlParameter("@JobNo", MaterialRequestModel.JobNo);
                return SQLHelper.ExecuteDataset("MRProductSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MaterialRequestInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MaterialRequestInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MaterialRequestInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MaterialRequestUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MaterialRequestUpdate", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MaterialRequestUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MaterialRequestGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@MRNo", MaterialRequestModel.Variable1);
                arlParms[1] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialRequestModel.UserId);

                return SQLHelper.ExecuteDataset("MaterialRequestGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MaterialRequestGetandGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@MRNo", MaterialRequestModel.MRNo);
                arlParms[1] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialRequestModel.UserId);
                return SQLHelper.ExecuteDataset("MaterialRequestGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MaterialRequestDelete(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@MRNo", MaterialRequestModel.MRNo);
                arlParms[1] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialRequestModel.UserId);
                return SQLHelper.ExecuteDataset("MaterialRequestDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MaterialRequestBOQGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@JobNo", MaterialRequestModel.JobNo);
                arlParms[1] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialRequestModel.UserId);
                return SQLHelper.ExecuteDataset("MaterialRequestBOQGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MaterialRequetApprovalGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@Status", MaterialRequestModel.Status);
                arlParms[1] = new SqlParameter("@FromDate", MaterialRequestModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", MaterialRequestModel.ToDate);
                arlParms[3] = new SqlParameter("@DFlag", MaterialRequestModel.Flag);
                arlParms[4] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                arlParms[5] = new SqlParameter("@UserId", MaterialRequestModel.UserId);
                return SQLHelper.ExecuteDataset("MaterialRequetApprovalGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MaterialRequetApproval(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@MRNo", MaterialRequestModel.MRNo);
                arlParms[1] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialRequestModel.UserId);
                arlParms[3] = new SqlParameter("@Type", MaterialRequestModel.Status);
                return SQLHelper.ExecuteDataset("MaterialRequetApproval", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseOrderApproval(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@OrderNo", MaterialRequestModel.OrderNo);
                arlParms[1] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", MaterialRequestModel.UserId);
                arlParms[3] = new SqlParameter("@Type", MaterialRequestModel.Status);
                return SQLHelper.ExecuteDataset("PurchaseOrderApproval", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet MRIssueDetails(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@JobNo", MaterialRequestModel.JobNo);
                arlParms[1] = new SqlParameter("@ProductId", MaterialRequestModel.ItemId);
                arlParms[2] = new SqlParameter("@UserId", MaterialRequestModel.UserId);
                arlParms[3] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                return SQLHelper.ExecuteDataset("MRIssueDetails", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseOrderApprovalGets(MaterialRequestModel MaterialRequestModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                
                arlParms[0] = new SqlParameter("@FromDate", MaterialRequestModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MaterialRequestModel.ToDate);
                arlParms[2] = new SqlParameter("@DFlag", MaterialRequestModel.Flag);
                arlParms[3] = new SqlParameter("@Status", MaterialRequestModel.Status);
                arlParms[4] = new SqlParameter("@DeptId", MaterialRequestModel.DeptId);
                arlParms[5] = new SqlParameter("@UserId", MaterialRequestModel.UserId);
                return SQLHelper.ExecuteDataset("PurchaseOrderApprovalGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        


    }
}