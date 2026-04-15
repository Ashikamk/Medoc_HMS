using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class WorkItemUser
    {
        private SqlParameter[] arlParms;

        public int Followup { get; set; }
        public string DueDate { get; set; }
        public long CustId { get; set; }
        public long WorkItemId { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long DivisionId { get; set; }
        public string DivisionName { get; set; }
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string RefType { get; set; }
        public string RefId { get; set; }
        public string TurnAroundTimesName { get; set; }
        public int TurnAroundTimes { get; set; }
        public string WorkStatus { get; set; }
        public string Status { get; set; }
        public string AssignedOnDate { get; set; }
        public string StartedOn { get; set; }
        public string UpdatedOn { get; set; }
        public long AssignedBy { get; set; }
        public string AssignedByUser { get; set; }
        public long AssignedTo { get; set; }
        public string AssignedToUser { get; set; }
        public long UpdatedBy { get; set; }
        public string UpdatedByUser { get; set; }
        public string Remarks { get; set; }
        public int Flag { get; set; }
        public int Type { get; set; }
        public int AssignedByyou { get; set; }
        public int AssignedToYou { get; set; }
        public int AssignedToDiv { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public string ExceededTime { get; set; }
        public string MinuteDiff { get; set; }
        public string NewWorkRemarks { get; set; }
        public string BillSlNo { get; set; }
        public string BillNo { get; set; }
        public string Driver { get; set; }
        public string Reference { get; set; }
        public string DriverName { get; set; }
        public string BillDeptId { get; set; }
        public string IPUserId { get; set; }
        public string IPUser { get; set; }
        public string StoreKeeperId { get; set; }
        public string StoreKeeper { get; set; }
        public DataSet WorkDivisionGetandGets(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[0];
                return SQLHelper.ExecuteDataset("WorkDivisionGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DeptUserGetandGets(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3]; 
                arlParms[0] = new SqlParameter("@DeptId", WorkItemUser.DepartmentId);
                arlParms[1] = new SqlParameter("@DivId", WorkItemUser.DivisionId);
                arlParms[2] = new SqlParameter("@UserName", WorkItemUser.UserName);
                return SQLHelper.ExecuteDataset("DeptUserGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet WorkingTaskTimeGetandGets(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Division", WorkItemUser.DivisionId);
                return SQLHelper.ExecuteDataset("WorkingTaskTimeGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet WorkItemInsertandUpdate(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[25];
                arlParms[0] = new SqlParameter("@DeptId", WorkItemUser.DepartmentId);
                arlParms[1] = new SqlParameter("@DivId", WorkItemUser.DivisionId);
                arlParms[2] = new SqlParameter("@Assignedto", WorkItemUser.AssignedTo);
                arlParms[3] = new SqlParameter("@Title", WorkItemUser.Title);
                arlParms[4] = new SqlParameter("@Description", WorkItemUser.Description);
                arlParms[5] = new SqlParameter("@RefType", WorkItemUser.RefType);
                arlParms[6] = new SqlParameter("@RefId", WorkItemUser.RefId);
                arlParms[7] = new SqlParameter("@TurnAroundTimes", WorkItemUser.TurnAroundTimes);
                arlParms[8] = new SqlParameter("@WorkStatus", WorkItemUser.WorkStatus);
                arlParms[9] = new SqlParameter("@UserId", WorkItemUser.UserId);
                arlParms[10] = new SqlParameter("@WorkItemId", WorkItemUser.WorkItemId);
                arlParms[11] = new SqlParameter("@Flag", WorkItemUser.Flag);
                arlParms[12] = new SqlParameter("@Reason", WorkItemUser.Remarks);
                arlParms[13] = new SqlParameter("@NewWorkRemarks", WorkItemUser.NewWorkRemarks);
                arlParms[14] = new SqlParameter("@BillSeriesNo", WorkItemUser.BillSlNo);
                arlParms[15] = new SqlParameter("@BillNo", WorkItemUser.BillNo);
                arlParms[16] = new SqlParameter("@Driver", WorkItemUser.Driver);
                arlParms[17] = new SqlParameter("@IPUserId", WorkItemUser.IPUserId);
                arlParms[18] = new SqlParameter("@Reference", WorkItemUser.Reference);
                arlParms[19] = new SqlParameter("@StoreKeeperId", WorkItemUser.StoreKeeperId);
                arlParms[20] = new SqlParameter("@CustId", WorkItemUser.CustId);
                arlParms[21] = new SqlParameter("@DueDate", WorkItemUser.DueDate);
                arlParms[22] = new SqlParameter("@Followup", WorkItemUser.Followup);
                arlParms[23] = new SqlParameter("@Variable1", WorkItemUser.Variable1);
                arlParms[24] = new SqlParameter("@Variable2", WorkItemUser.Variable2);
                return SQLHelper.ExecuteDataset("WorkItemInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet DivisionInsertandUpdate(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DivId", WorkItemUser.DivisionId);
                arlParms[1] = new SqlParameter("@DivName", WorkItemUser.DivisionName);
                arlParms[2] = new SqlParameter("@Status", WorkItemUser.Status);
                return SQLHelper.ExecuteDataset("WorkDivisionInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DivisionTimeInsertandUpdate(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DivId", WorkItemUser.DivisionId);
                arlParms[1] = new SqlParameter("@TimeName", WorkItemUser.TurnAroundTimesName);
                arlParms[2] = new SqlParameter("@Time", WorkItemUser.TurnAroundTimes);
                return SQLHelper.ExecuteDataset("DivisionTimeInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        

        public DataSet WorkItemGetandGets(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@WorkItemId", WorkItemUser.WorkItemId);
                return SQLHelper.ExecuteDataset("WorkItemGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
       public DataSet DriverAutoComplete(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DriverName", WorkItemUser.DriverName);
                arlParms[1] = new SqlParameter("@DeptId", WorkItemUser.DepartmentId);
                return SQLHelper.ExecuteDataset("DriverAutoComplete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet WorkItemGetList(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@Type", WorkItemUser.Type);
                arlParms[1] = new SqlParameter("@UserId", WorkItemUser.UserId);
                arlParms[2] = new SqlParameter("@DeptId", WorkItemUser.DepartmentId);
                arlParms[3] = new SqlParameter("@FromDate", WorkItemUser.FromDate);
                arlParms[4] = new SqlParameter("@ToDate", WorkItemUser.ToDate);
                arlParms[5] = new SqlParameter("@Var1", WorkItemUser.Variable1);
                arlParms[6] = new SqlParameter("@Var2", WorkItemUser.Variable2);
                return SQLHelper.ExecuteDataset("WorkItemList", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        
        public DataSet WorkItemTransfer(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@WorkItemId", WorkItemUser.WorkItemId);
                arlParms[1] = new SqlParameter("@Remarks", WorkItemUser.Remarks);
                arlParms[2] = new SqlParameter("@UserId", WorkItemUser.UserId);
                arlParms[3] = new SqlParameter("@AssignedTo", WorkItemUser.AssignedTo);
                return SQLHelper.ExecuteDataset("WorkItemTransfer", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet WorkDelayed(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[0];
                return SQLHelper.ExecuteDataset("WorkItemDelayed", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CheckforNewItem(WorkItemUser WorkItemUser, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@userId", WorkItemUser.UserId);
                arlParms[1] = new SqlParameter("@deptId", WorkItemUser.DepartmentId);
                return SQLHelper.ExecuteDataset("CheckforNewItem", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

    }
}