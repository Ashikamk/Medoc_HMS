using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class WorkItemDivDeptModel
    {
        public List<WorkListItem> DeptList { get; set; }
        public List<WorkListItem> DivList { get; set; }

        public long SelectedDept { get; set; }
        public long SelectedDiv { get; set; }

        public bool LastActionSuccess { get; set; }

        public static WorkItemDivDeptModel GetDepartmentAndDivision(string dbName)
        {
            WorkItemDivDeptModel model = new WorkItemDivDeptModel();

            var sql = "SELECT DepartmentName as Name, DepartmentId as Id FROM Mst_Department d WHERE DelFlag = 1 ORDER BY DepartmentName";
            model.DeptList = SQLHelper.ExcuteAndGetSQL<WorkListItem>(sql, dbName);
            var sql2 = "SELECT DivName as Name, DivId as Id FROM Work_Division ORDER BY DivName";
            model.DivList = SQLHelper.ExcuteAndGetSQL<WorkListItem>(sql2, dbName);
            return model;
        }

        public static bool AddDivision(string newName, string dbName)
        {
            if (string.IsNullOrWhiteSpace(newName)) { return false; }
            var sql = @"INSERT INTO Work_Division (DivName)
    SELECT @divName1 WHERE NOT EXISTS
    (SELECT TOP 1 DivId FROM Work_Division WHERE DivName = @divName2);";
            var sqlParams = new System.Data.SqlClient.SqlParameter[2];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@divName1", System.Data.SqlDbType.VarChar, 255) { Value = newName };
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@divName2", System.Data.SqlDbType.VarChar, 255) { Value = newName };
            return (SQLHelper.ExecuteNonQuerySQL(sql, dbName, sqlParams) > 0);
        }

        public static bool DeleteDivision(long id, string dbName)
        {
            var sql = @"DELETE FROM Work_Division WHERE DivId = @id1 AND NOT EXISTS
            (SELECT TOP 1 DivId FROM Work_UserDivision WHERE DivId = @id2) AND NOT EXISTS
            (SELECT TOP 1 DivId FROM Work_Item WHERE DivId = @id3);";
            var sqlParams = new System.Data.SqlClient.SqlParameter[3];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@id1", System.Data.SqlDbType.BigInt) { Value = id };
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@id2", System.Data.SqlDbType.BigInt) { Value = id };
            sqlParams[2] = new System.Data.SqlClient.SqlParameter("@id3", System.Data.SqlDbType.BigInt) { Value = id };
            return (SQLHelper.ExecuteNonQuerySQL(sql, dbName, sqlParams) > 0);
        }

        public static bool UpdateDivision(long id, string newName, string dbName)
        {
            if (string.IsNullOrWhiteSpace(newName)) { return false; }
            var sql = @"UPDATE Work_Division SET DivName = @divName1 WHERE NOT EXISTS
    (SELECT TOP 1 DivId FROM Work_Division WHERE DivName = @divName2 AND DivId != @id1)
    AND DivId = @id2;";
            var sqlParams = new System.Data.SqlClient.SqlParameter[4];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@divName1", System.Data.SqlDbType.VarChar, 255) { Value = newName };
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@divName2", System.Data.SqlDbType.VarChar, 255) { Value = newName };
            sqlParams[2] = new System.Data.SqlClient.SqlParameter("@id1", System.Data.SqlDbType.BigInt) { Value = id };
            sqlParams[3] = new System.Data.SqlClient.SqlParameter("@id2", System.Data.SqlDbType.BigInt) { Value = id };
            return (SQLHelper.ExecuteNonQuerySQL(sql, dbName, sqlParams) > 0);

        }

        public static bool AddDelUserToDivision(bool delete, long user, long div, long dept, string dbName)
        {
            if (dept <= 0 || div <= 0 || user <= 0) { return false; }
            var sql = string.Empty;
            System.Data.SqlClient.SqlParameter[] sqlParams;
            if (delete)
            {
                sql = @"DELETE FROM Work_UserDivision WHERE DeptId = @dept1 AND DivId = @div1 AND UserId = @user1";
                sqlParams = new System.Data.SqlClient.SqlParameter[3];
                sqlParams[0] = new System.Data.SqlClient.SqlParameter("@dept1", System.Data.SqlDbType.BigInt) { Value = dept };
                sqlParams[1] = new System.Data.SqlClient.SqlParameter("@div1", System.Data.SqlDbType.BigInt) { Value = div };
                sqlParams[2] = new System.Data.SqlClient.SqlParameter("@user1", System.Data.SqlDbType.BigInt) { Value = user };
                SQLHelper.ExecuteNonQuerySQL(sql, dbName, sqlParams);
            }
            else
            {
                sql = @"INSERT INTO Work_UserDivision (DeptId, DivId, UserId)
    SELECT @dept1, @div1, @user1 WHERE EXISTS
    (SELECT TOP 1 UserId FROM Mst_Users WHERE UserId = @user2) AND EXISTS
    (SELECT TOP 1 DivId FROM Work_Division WHERE DivId = @div2) AND EXISTS 
    (SELECT TOP 1 DepartmentId FROM Mst_Department WHERE DepartmentId = @dept2);";
                sqlParams = new System.Data.SqlClient.SqlParameter[6];
                sqlParams[0] = new System.Data.SqlClient.SqlParameter("@dept1", System.Data.SqlDbType.BigInt) { Value = dept };
                sqlParams[1] = new System.Data.SqlClient.SqlParameter("@div1", System.Data.SqlDbType.BigInt) { Value = div };
                sqlParams[2] = new System.Data.SqlClient.SqlParameter("@user1", System.Data.SqlDbType.BigInt) { Value = user };
                sqlParams[3] = new System.Data.SqlClient.SqlParameter("@user2", System.Data.SqlDbType.BigInt) { Value = user };
                sqlParams[4] = new System.Data.SqlClient.SqlParameter("@div2", System.Data.SqlDbType.BigInt) { Value = div };
                sqlParams[5] = new System.Data.SqlClient.SqlParameter("@dept2", System.Data.SqlDbType.BigInt) { Value = dept };
                SQLHelper.ExecuteNonQuerySQL(sql, dbName, sqlParams);
            }

            sql = @"SELECT UserId FROM Work_UserDivision WHERE DeptId = @dept1 AND DivId = @div1 AND UserId = @user1";
            sqlParams = new System.Data.SqlClient.SqlParameter[3];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@dept1", System.Data.SqlDbType.BigInt) { Value = dept };
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@div1", System.Data.SqlDbType.BigInt) { Value = div };
            sqlParams[2] = new System.Data.SqlClient.SqlParameter("@user1", System.Data.SqlDbType.BigInt) { Value = user };
            var abc = SQLHelper.ExecuteDatasetSQL(sql, dbName, sqlParams);
            return abc.Tables[0].Rows.Count > 0;
        }

        public static WorkListTimeTagModel GetTags(long div, string dbName)
        {
            var data = new WorkListTimeTagModel();
            data.div = div;
            var sql = @"SELECT [TaskKey] as TagName, 
    (CASE 
        WHEN [TurnAroundTimeInMin] > 59 THEN (CAST(([TurnAroundTimeInMin] / 60) AS VARCHAR) + ' Hr(s) ') ELSE '' END 
        + CAST(([TurnAroundTimeInMin] % 60) AS VARCHAR) + ' Min(s) ') as Display FROM Work_TaskTime WHERE DivId = @div;";
            var sqlParams = new System.Data.SqlClient.SqlParameter[1];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@div", System.Data.SqlDbType.BigInt) { Value = div };
            data.list = SQLHelper.ExcuteAndGetSQL<WorkListTimeItem>(sql, dbName, sqlParams);
            return data;
        }

        public static bool AddTag(long div, string tagName, long? hrs, long mins, string dbName)
        {
            mins = (hrs ?? 0) * 60 + mins;
            var sql = @"INSERT INTO Work_TaskTime (DivId, TaskKey, [TurnAroundTimeInMin]) 
    SELECT @div1, @tagName1, @mins WHERE NOT EXISTS (SELECT TOP 1 DivId FROM Work_TaskTime WHERE DivId = @div2 and TaskKey = @tagName2);";
            var sqlParams = new System.Data.SqlClient.SqlParameter[5];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@div1", System.Data.SqlDbType.BigInt) { Value = div };
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@tagName1", System.Data.SqlDbType.VarChar, 50) { Value = tagName };
            sqlParams[2] = new System.Data.SqlClient.SqlParameter("@mins", System.Data.SqlDbType.BigInt) { Value = mins };
            sqlParams[3] = new System.Data.SqlClient.SqlParameter("@div2", System.Data.SqlDbType.BigInt) { Value = div };
            sqlParams[4] = new System.Data.SqlClient.SqlParameter("@tagName2", System.Data.SqlDbType.VarChar, 50) { Value = tagName };
            return (SQLHelper.ExecuteNonQuerySQL(sql, dbName, sqlParams) > 0);
        }

        public static bool DeleteTag(long div, string tagName, string dbName)
        {
            var sql = "DELETE FROM Work_TaskTime WHERE DivId = @div1 AND TaskKey = @tagName1;";
            var sqlParams = new System.Data.SqlClient.SqlParameter[2];
            sqlParams[0] = new System.Data.SqlClient.SqlParameter("@div1", System.Data.SqlDbType.BigInt) { Value = div };
            sqlParams[1] = new System.Data.SqlClient.SqlParameter("@tagName1", System.Data.SqlDbType.VarChar, 50) { Value = tagName };
            return (SQLHelper.ExecuteNonQuerySQL(sql, dbName, sqlParams) > 0);
        }
    }

    public class WorkListItem
    {
        public string Name { get; set; }
        public long Id { get; set; }
    }

    public class WorkListTimeItem
    {
        public string TagName { get; set; }
        public string Display { get; set; }
    }

    public class WorkListTimeTagModel
    {
        public List<WorkListTimeItem> list { get; set; }
        public long div { get; set; }
    }
}