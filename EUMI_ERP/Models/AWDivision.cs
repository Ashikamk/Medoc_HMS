using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class AWDivision
    {
        public long DivId { get; set; }
        public string DivName { get; set; }
    }
    public class AWUserDivision
    {
        public long DivId { get; set; }
        public decimal UserId { get; set; }
        public decimal DeptId { get; set; }
    }
    /*
     * [WorkItemId]
      ,[AssignedOn]
      ,[AssignedBy]
      ,[AssignedTo]
      ,[DeptId]
      ,[DivId]
      ,[Title]
      ,[Description]
      ,[RefId]
      ,[RefType]
      ,[Status]
      ,[TurnAroundTimeInMin]
      ,[UpdatedBy]
      ,[UpdatedOn]
      */
    public class AWWorkItem
    {
        [EuMiUpsert(Key = true)]
        public long WorkItemId { get; set; }
        [EuMiData(Name = "AssignedBy")]
        public decimal AssignedByUserId { get; set; }
        [EuMiUpsert(Ignore = true)]
        [EuMiData(Name = "AssignedOn")]
        public DateTime AssignedOn { get; set; }
        [EuMiData(Name = "AssignedTo")]
        public decimal? AssignedToUserId { get; set; }
        [EuMiData(Name = "DivId")]
        public decimal AssignedToDivId { get; set; }
        public decimal DeptId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [EuMiData(Name = "RefType")]
        [Required]
        public string ReferenceType { get; set; }
        [EuMiData(Name = "RefId")]
        [Required]
        public string ReferenceId { get; set; }
        public string Status { get; set; }
        [EuMiData(Name = "TurnAroundTimeInMin")]
        public long TurnAroundTimeInMinutes { get; set; }
        public decimal UpdatedBy { get; set; }
    }
    public class AWUserDivDetail
    {
        public string UserName { get; set; }
        public string DivName { get; set; }
        public string DeptName { get; set; }
    }
    public class AWWorkAssignModel
    { 
        public AWWorkItem data { get; set; }
        public List<WorkListItem> timeItems { get; set; }
        public AWUserDivDetail dataText { get; set; }

        public List<AWWorkListStringItem> statusList { get; set; }
        public static string TimeToString(long TimeInMin)
        {
            return (TimeInMin >= 60 ? string.Format("{0} Hr(s) ", (TimeInMin / 60)) : "") + string.Format("{0} Min(s)", TimeInMin % 60);
        }

        public static AWWorkAssignModel LoadAll(long? wid, long? user, long? div, long? dept, string reftype, string refno, string dbName)
        {
            AWWorkAssignModel dataModel = new AWWorkAssignModel();
            dataModel.data = AWWorkAssignModel.LoadWorkItem(wid, user, div, dept, reftype, refno, dbName);
            dataModel.data = dataModel.data ?? new AWWorkItem();
            dataModel.dataText = AWWorkAssignModel.GetDetail((long)(dataModel.data.AssignedToUserId ?? -1), (long)dataModel.data.AssignedToDivId, (long)dataModel.data.DeptId, dbName);
            dataModel.timeItems = AWWorkAssignModel.LoadTimeList((long)dataModel.data.AssignedToDivId, dbName);
            if (dataModel.data != null && dataModel.data.TurnAroundTimeInMinutes > 0 
                && dataModel.timeItems != null 
                && !dataModel.timeItems.Any(x => x.Id == dataModel.data.TurnAroundTimeInMinutes))
            {
                dataModel.timeItems.Insert(0, new WorkListItem() { Id = dataModel.data.TurnAroundTimeInMinutes, Name = "(Present Value)" });
            }
            if (dataModel.data != null && dataModel.data.AssignedToDivId > 0 && (dataModel.timeItems == null || dataModel.timeItems.Count == 0))
            {
                dataModel.timeItems = dataModel.timeItems ?? new List<WorkListItem>();
                dataModel.timeItems.Insert(0, new WorkListItem() { Id = 30, Name = "(Default Value)" });
            }
            dataModel.dataText = dataModel.dataText ?? new AWUserDivDetail();
            dataModel.timeItems = dataModel.timeItems ?? new List<WorkListItem>();
            dataModel.timeItems = dataModel.timeItems.Select(x => new WorkListItem() { Id = x.Id, Name = ((x.Name ?? "") + " - " + EUMI_ERP.Models.AWWorkAssignModel.TimeToString(x.Id)) }).ToList();
            dataModel.statusList = LoadStatusList();
            return dataModel;
        }

        public static List<AWWorkListStringItem> LoadStatusList()
        {
            var list = new List<AWWorkListStringItem>();
            list.Add(new AWWorkListStringItem() { value = "Not started", text = "Not started" });
            list.Add(new AWWorkListStringItem() { value = "Started", text = "Started" });
            list.Add(new AWWorkListStringItem() { value = "In-progress", text = "In Progress" });
            list.Add(new AWWorkListStringItem() { value = "Re-assign", text = "Reassign" });
            list.Add(new AWWorkListStringItem() { value = "Completed", text = "Completed" });
            list.Add(new AWWorkListStringItem() { value = "Canceled", text = "Canceled" });
            return list;
        }
        public static List<WorkListItem> LoadTimeList(long div, string dbName)
        {
            var sql = @"SELECT TurnAroundTimeInMin as Id, TaskKey as Name FROM Work_TaskTime WHERE DivId = @div;";
            var sqlParams = new System.Data.SqlClient.SqlParameter[1];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@div", (object)div);
            var list = SQLHelper.ExcuteAndGetSQL<WorkListItem>(sql, dbName, sqlParams);
            return list;
        }
        public static bool IsInDivDept(long user, long div, long dept, string dbName)
        {
            var sql = "SELECT UserId FROM Work_UserDivision WHERE UserId = @user AND DivId = @div AND DeptId = @dept;";
            var sqlParams = new System.Data.SqlClient.SqlParameter[3];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@user", (object)user);
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@div", (object)div);
            sqlParams[2] = new System.Data.SqlClient.SqlParameter("@dept", (object)dept);
            var ds = SQLHelper.ExecuteDatasetSQL(sql, dbName, sqlParams);
            return (ds.Tables[0].Rows.Count > 0);
        }
        public static AWUserDivDetail GetDetail(long user, long div, long dept, string dbName)
        {
            AWUserDivDetail data = new AWUserDivDetail();

            var sql = @"SELECT UserName FROM Mst_Users WHERE UserId = @user;
    SELECT DivName FROM Work_Division WHERE DivId = @div;
    SELECT DepartmentName FROM Mst_Department WHERE DepartmentId = @dept;";
            var sqlParams = new System.Data.SqlClient.SqlParameter[3];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@user", (object)user);
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@div", (object)div);
            sqlParams[2] = new System.Data.SqlClient.SqlParameter("@dept", (object)dept);
            var ds = SQLHelper.ExecuteDatasetSQL(sql, dbName, sqlParams);
            if (ds.Tables[0].Rows.Count > 0)
            {
                data.UserName = ds.Tables[0].Rows[0][0].ToString();
            }
            if (ds.Tables[1].Rows.Count > 0)
            {
                data.DivName = ds.Tables[1].Rows[0][0].ToString();
            }
            if (ds.Tables[2].Rows.Count > 0)
            {
                data.DeptName = ds.Tables[2].Rows[0][0].ToString();
            }
            return data;
        }

        public static bool Delete(long wid, string dbName)
        {
            var sql = "DELETE FROM Work_Item WHERE WorkItemId = @wid;";
            var sqlParams = new System.Data.SqlClient.SqlParameter[1];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@wid", wid);
            return (SQLHelper.ExecuteNonQuerySQL(sql, dbName, sqlParams) > 0);

        }
        public static long Upsert(AWWorkItem data, string dbName)
        {
            // upsert builder is in common directory
            if (data.WorkItemId > 0)
            {
                UpsertBuilder.BuildParams(data)
                    .AddScalars("UpdatedOn", "GETDATE()")
                    .AddScalars("AssignedOn", "ISNULL(AssignedOn, GETDATE())")
                    .BuildUpdateQuery("Work_Item")
                    .Execute(dbName, false);
            }
            else
            {
                var lastId = UpsertBuilder.BuildParams(data)
                    .AddScalars("UpdatedOn", "GETDATE()")
                    .AddScalars("AssignedOn", "GETDATE()")
                    .BuildInsertQuery("Work_Item")
                    .Execute(dbName, true).ScopeIdentity;
                data.WorkItemId = lastId;
            }
            return data.WorkItemId;
        }
        public static AWWorkItem LoadWorkItem(long? wid, long? user, long? div, long? dept, string reftype, string refno, string dbName)
        {
            AWWorkItem data = null;
            if (wid != null && wid.Value > 0)
            {
                var sql = "SELECT * FROM Work_Item WHERE WorkItemId = @id";
                var sqlParams = new System.Data.SqlClient.SqlParameter[1];
                sqlParams[0] = new System.Data.SqlClient.SqlParameter("@id", wid);
                var dataList = SQLHelper.ExcuteAndGetSQL<AWWorkItem>(sql, dbName, sqlParams);
                data = dataList.FirstOrDefault();
            }
            else
            {
                data = new AWWorkItem();
            }
            if (data != null)
            { 
                if (user.HasValue && user.Value > 0)
                {
                    data.AssignedToUserId = user;
                }
                if (div.HasValue && div.Value > 0)
                {
                    data.AssignedToDivId = div.Value;
                }
                if (dept.HasValue && dept.Value > 0)
                {
                    data.DeptId = dept.Value;
                }
                if (!string.IsNullOrWhiteSpace(refno))
                {
                    data.ReferenceId = refno;
                }
                if (!string.IsNullOrWhiteSpace(reftype))
                {
                    data.ReferenceType = reftype;
                }
            }
            return data;
        }
        public static bool PingForNew(long currentUserId, string dbName)
        {
            var sql = @"SELECT TOP 1 WorkItemId 
FROM Work_Item w
WHERE w.Status NOT IN ('Canceled', 'Completed') 
AND (w.AssignedTo = @user1 OR w.AssignedBy = @user2 OR DivId IN
(SELECT DivId FROM Work_UserDivision WHERE UserId = @user3 AND DeptId IN
    (SELECT DepartmentId FROM Mst_Users WHERE UserId = @user4))); ";
            var sqlParams = new System.Data.SqlClient.SqlParameter[4];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@user1", (object)currentUserId);
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@user2", (object)currentUserId);
            sqlParams[2] = new System.Data.SqlClient.SqlParameter("@user3", (object)currentUserId);
            sqlParams[3] = new System.Data.SqlClient.SqlParameter("@user4", (object)currentUserId);
            var ds = SQLHelper.ExecuteDatasetSQL(sql, dbName, sqlParams);
            return (ds.Tables[0].Rows.Count > 0);
        }
        public static PingForDetailData PingForDetail(long currentUserId, string dbName)
        {
            var data = new PingForDetailData();
            var sql = @"SELECT COUNT(*) FROM Work_Item w WHERE w.Status NOT IN ('Canceled', 'Completed') AND w.AssignedTo = @user1;
    SELECT COUNT(*) FROM Work_Item w WHERE w.Status NOT IN ('Canceled', 'Completed') AND w.AssignedBy = @user2;
    SELECT COUNT(*) FROM Work_Item w WHERE w.Status NOT IN ('Canceled', 'Completed') AND w.AssignedTo IS NULL AND DivId IN
    (SELECT DivId FROM Work_UserDivision WHERE UserId = @user3 AND DeptId IN
    (SELECT DeptId FROM Mst_Users WHERE UserId = @user4)); ";
            var sqlParams = new System.Data.SqlClient.SqlParameter[4];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@user1", (object)currentUserId);
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@user2", (object)currentUserId);
            sqlParams[2] = new System.Data.SqlClient.SqlParameter("@user3", (object)currentUserId);
            sqlParams[3] = new System.Data.SqlClient.SqlParameter("@user4", (object)currentUserId);
            var ds = SQLHelper.ExecuteDatasetSQL(sql, dbName, sqlParams);
            if (ds.Tables[0].Rows.Count > 0)
            {
                data.toyou = Convert.ToInt64(ds.Tables[0].Rows[0][0]);
            }
            if (ds.Tables[1].Rows.Count > 0)
            {
                data.byyou = Convert.ToInt64(ds.Tables[1].Rows[0][0]);
            }
            if (ds.Tables[2].Rows.Count > 0)
            {
                data.todiv = Convert.ToInt64(ds.Tables[2].Rows[0][0]);
            }
            data.success = true;
            return data;
        }
    }

    public class PingForDetailData
    {
        public bool success { get; set; }
        public long byyou { get; set; }
        public long toyou { get; set; }
        public long todiv { get; set; }
    }
    public class AWWorkListStringItem
    {
        public string value { get; set; }
        public string text { get; set; }
    }
    public class AWWorkItemLog
    {
        public long WorkItemLogId { get; set; }
        public decimal AssignedByUserId { get; set; }
        public decimal? AssignedToUserId { get; set; }
        public decimal AssignedToDivId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ReferenceType { get; set; }
        public string ReferenceId { get; set; }
        public string Status { get; set; }
        public long TurnAroundTimeInMinutes { get; set; }
        public decimal UpdatedBy { get; set; }
    }
}