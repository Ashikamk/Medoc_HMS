using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataTablesServer
{
    public class WorkItemListUser
    {
        public QueryBuilder<AWWorkItemListModel> builder = new QueryBuilder<AWWorkItemListModel>();
        public void Configure(ABDataTableModel<AWWorkItemListModel> model)
        {
            model.order.Clear();

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("w.WorkItemId", "WorkItemId", "Work Item Id", -1)
                .AddCol("w.DivId", "DivId", "DivId", -1)
                .AddCol("u1.Name", "AssignedToUser", "Assigned To User", 10)
                .AddCol("u2.Name", "AssignedByUser", "Assigned By User", 10)
                .AddCol("d1.DepartmentName", "Dept", "Dept Name", 10)
                .AddCol("d2.EmployeeDivisionName", "Div", "Div Name", 10)
                .AddCol("w.Status", "Status", "Status", 10)
                .AddCol("w.Title", "Title", "Title", 30)
                .AddCol("w.Reason", "Reason", "Reason", 30)
                .AddCol("convert(varchar(50),AssignedOn )", "AssignedOn", "Assigned On", 10)
                .AddCol("AssignedOn", "AssignedOnDate", "Assigned On Date", -1)
                .AddCol("DATEDIFF(MINUTE, AssignedOn , GETDATE())", "MinuteDiff", "MinuteDiff", -1)
                .AddCol("TurnAroundTimeInMin", "TurnAroundTimeInMin", "TurnAroundTimeInMin", -1)
                .AddCol("TurnAroundTimeInMin - DATEDIFF(MINUTE, AssignedOn, GETDATE())", "EXCEDDEDTIME", "EXCEDDEDTIME", -1)
                .AddDefaultSort("WorkItemId desc")
                .AddTableSection(@"Work_item w
        LEFT JOIN Mst_Department d1 ON w.DeptId = d1.DepartmentId
        LEFT JOIN Mst_EmployeeDivision d2 ON w.DivId = d2.EmployeeDivisionId
        LEFT JOIN Mst_Users u1 ON u1.UserId = w.AssignedTo
        LEFT JOIN Mst_Users u2 ON u2.UserId = w.AssignedBy")
                //.AddWhere()
                .AddSortAlternate("AssignedOn", "AssignedOnDate")
                .AddDownloadName("WorkItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }

    public class WorkItemListUserMyData
    {
        public QueryBuilder<AWWorkItemListModel> builder = new QueryBuilder<AWWorkItemListModel>();
        public void Configure(ABDataTableModel<AWWorkItemListModel> model)
        {
            model.order.Clear();
            
            var search = string.Format(@"(
[w].AssignedBy = COALESCE({0}, [w].AssignedBy)
or [w].AssignedTo = COALESCE({0}, [w].AssignedTo))",
    model.addData.AssignedToyou);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("w.WorkItemId", "WorkItemId", "Work Item Id", -1)
                .AddCol("w.DivId", "DivId", "DivId", -1)
                .AddCol("u1.Name", "AssignedToUser", "Assigned To User", 10)
                .AddCol("u2.Name", "AssignedByUser", "Assigned By User", 10)
                .AddCol("d1.DepartmentName", "Dept", "Dept Name", 10)
                .AddCol("d2.EmployeeDivisionName", "Div", "Div Name", 10)
                .AddCol("w.Status", "Status", "Status", 10)
                .AddCol("w.Title", "Title", "Title", 30)
                .AddCol("w.Reason", "Reason", "Reason", 30)
                .AddCol("w.AssignedBy", "AssignedBy", "AssignedBy", 30)
                .AddCol("w.AssignedTo", "AssignedTo", "AssignedTo", 30)
                .AddCol("convert(varchar(50),AssignedOn )", "AssignedOn", "Assigned On", 10)
                .AddCol("AssignedOn", "AssignedOnDate", "Assigned On Date", -1)
                .AddCol("DATEDIFF(MINUTE, AssignedOn , GETDATE())", "MinuteDiff", "MinuteDiff", -1)
                .AddCol("TurnAroundTimeInMin", "TurnAroundTimeInMin", "TurnAroundTimeInMin", -1)
                .AddCol("TurnAroundTimeInMin - DATEDIFF(MINUTE, AssignedOn, GETDATE())", "EXCEDDEDTIME", "EXCEDDEDTIME", -1)
                .AddDefaultSort("WorkItemId desc")
                .AddTableSection(@"Work_item w
        LEFT JOIN Mst_Department d1 ON w.DeptId = d1.DepartmentId
        LEFT JOIN Mst_EmployeeDivision d2 ON w.DivId = d2.EmployeeDivisionId
        LEFT JOIN Mst_Users u1 ON u1.UserId = w.AssignedTo
        LEFT JOIN Mst_Users u2 ON u2.UserId = w.AssignedBy")
                .AddWhere(search)
                .AddSortAlternate("AssignedOn", "AssignedOnDate")
                .AddDownloadName("WorkItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
    public class WorkItemListUserSortByToYou
    {
        public QueryBuilder<AWWorkItemListModel> builder = new QueryBuilder<AWWorkItemListModel>();
        public void Configure(ABDataTableModel<AWWorkItemListModel> model)
        {
            model.order.Clear();


            var search = string.Format(@"ShowFlag=0
                    AND [w].AssignedTo =COALESCE({1},[w].AssignedTo)
                    AND w.Status not in ('Completed','Canceled','Reassign')",
                model.addData.Showflag,
                model.addData.AssignedToyou,
                model.addData.Status);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("w.WorkItemId", "WorkItemId", "Work Item Id", -1)
                .AddCol("w.DivId", "DivId", "DivId", -1)
                .AddCol("u1.Name", "AssignedToUser", "Assigned To User", 10)
                .AddCol("u2.Name", "AssignedByUser", "Assigned By User", 10)
                .AddCol("d1.DepartmentName", "Dept", "Dept Name", 10)
                .AddCol("d2.EmployeeDivisionName", "Div", "Div Name", 10)
                .AddCol("w.Status", "Status", "Status", 10)
                .AddCol("w.Title", "Title", "Title", 30)
                .AddCol("w.Reason", "Reason", "Reason", 30)
                .AddCol("CONVERT(VARCHAR(50), AssignedOn, 103)", "AssignedOn", "Assigned On", 10)
                .AddCol("AssignedOn", "AssignedOnDate", "Assigned On Date", -1)
                .AddDefaultSort("WorkItemId desc")
                .AddTableSection(@"Work_item w
        LEFT JOIN Mst_Department d1 ON w.DeptId = d1.DepartmentId
        LEFT JOIN Mst_EmployeeDivision d2 ON w.DivId = d2.EmployeeDivisionId
        LEFT JOIN Mst_Users u1 ON u1.UserId = w.AssignedTo
        LEFT JOIN Mst_Users u2 ON u2.UserId = w.AssignedBy")
                .AddWhere(search)
                .AddSortAlternate("AssignedOn", "AssignedOnDate")
                .AddDownloadName("WorkItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }

    public class WorkItemListUserSortByByYou
    {
        public QueryBuilder<AWWorkItemListModel> builder = new QueryBuilder<AWWorkItemListModel>();
        public void Configure(ABDataTableModel<AWWorkItemListModel> model)
        {
            model.order.Clear();


            var search = string.Format(@"ShowFlag=0
                    AND [w].AssignedBy =COALESCE({1},[w].AssignedBy)
                    AND w.Status not in ('Completed','Canceled','Reassign')",
                model.addData.Showflag,
                model.addData.AssignedByyou,
                model.addData.Status);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("w.WorkItemId", "WorkItemId", "Work Item Id", -1)
                .AddCol("w.DivId", "DivId", "DivId", -1)
                .AddCol("u1.Name", "AssignedToUser", "Assigned To User", 10)
                .AddCol("u2.Name", "AssignedByUser", "Assigned By User", 10)
                .AddCol("d1.DepartmentName", "Dept", "Dept Name", 10)
                .AddCol("d2.EmployeeDivisionName", "Div", "Div Name", 10)
                .AddCol("w.Status", "Status", "Status", 10)
                .AddCol("w.Title", "Title", "Title", 30)
                .AddCol("w.Reason", "Reason", "Reason", 30)
                .AddCol("CONVERT(VARCHAR(50), AssignedOn, 103)", "AssignedOn", "Assigned On", 10)
                .AddCol("AssignedOn", "AssignedOnDate", "Assigned On Date", -1)
                .AddDefaultSort("WorkItemId desc")
                .AddTableSection(@"Work_item w
        LEFT JOIN Mst_Department d1 ON w.DeptId = d1.DepartmentId
        LEFT JOIN Mst_EmployeeDivision d2 ON w.DivId = d2.EmployeeDivisionId
        LEFT JOIN Mst_Users u1 ON u1.UserId = w.AssignedTo
        LEFT JOIN Mst_Users u2 ON u2.UserId = w.AssignedBy")
                .AddWhere(search)
                .AddSortAlternate("AssignedOn", "AssignedOnDate")
                .AddDownloadName("WorkItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }


    public class WorkItemListUserSortByDiv
    {
        public QueryBuilder<AWWorkItemListModel> builder = new QueryBuilder<AWWorkItemListModel>();
        public void Configure(ABDataTableModel<AWWorkItemListModel> model)
        {
            model.order.Clear();


            var search = string.Format(@"ShowFlag=0
                    AND w.Status not in ('Completed','Canceled','Reassign')
                    AND [w].DivId in(select Mst_UserDeptDivision.DivId from Mst_UserDeptDivision where Mst_UserDeptDivision.UserId=COALESCE({2},Mst_UserDeptDivision.UserId) and Mst_UserDeptDivision.DeptId=COALESCE({3},Mst_UserDeptDivision.DeptId))",
                model.addData.Showflag,
                model.addData.Status,
                model.addData.divByUser,
                model.addData.dept);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("w.WorkItemId", "WorkItemId", "Work Item Id", -1)
                .AddCol("w.DivId", "DivId", "DivId", -1)
                .AddCol("u1.Name", "AssignedToUser", "Assigned To User", 10)
                .AddCol("u2.Name", "AssignedByUser", "Assigned By User", 10)
                .AddCol("d1.DepartmentName", "Dept", "Dept Name", 10)
                .AddCol("d2.EmployeeDivisionName", "Div", "Div Name", 10)
                .AddCol("w.Status", "Status", "Status", 10)
                .AddCol("w.Title", "Title", "Title", 30)
                .AddCol("w.Reason", "Reason", "Reason", 30)
                .AddCol("CONVERT(VARCHAR(50), AssignedOn, 103)", "AssignedOn", "Assigned On", 10)
                .AddCol("AssignedOn", "AssignedOnDate", "Assigned On Date", -1)
                .AddDefaultSort("WorkItemId desc")
                .AddTableSection(@"Work_item w
        LEFT JOIN Mst_Department d1 ON w.DeptId = d1.DepartmentId
        LEFT JOIN Mst_EmployeeDivision d2 ON w.DivId = d2.EmployeeDivisionId
        LEFT JOIN Mst_Users u1 ON u1.UserId = w.AssignedTo
        LEFT JOIN Mst_Users u2 ON u2.UserId = w.AssignedBy")
                .AddWhere(search)
                .AddSortAlternate("AssignedOn", "AssignedOnDate")
                .AddDownloadName("WorkItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }

    public class WorkItemListUserDashBoard
    {
        public QueryBuilder<AWWorkItemListModel> builder = new QueryBuilder<AWWorkItemListModel>();
        public void Configure(ABDataTableModel<AWWorkItemListModel> model)
        {
            model.order.Clear();

            var search = string.Format(@"(CONVERT(VARCHAR(50),AssignedOn,103)=CONVERT(VARCHAR(50),GETDATE(),103)) OR (TurnAroundTimeInMin -DATEDIFF(MINUTE, AssignedOn, GETDATE()) < 0 and ShowFlag = 0 AND Status!='Completed' AND Status!='Cancel' AND Status!='Reassign')");
                    
           builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("w.WorkItemId", "WorkItemId", "Work Item Id", -1)
                .AddCol("w.DivId", "DivId", "DivId", -1)
                .AddCol("u1.Name", "AssignedToUser", "Assigned To User", 10)
                .AddCol("u2.Name", "AssignedByUser", "Assigned By User", 10)
                .AddCol("d1.DepartmentName", "Dept", "Dept Name", 10)
                .AddCol("d2.EmployeeDivisionName", "Div", "Div Name", 10)
                .AddCol("w.Status", "Status", "Status", 10)
                .AddCol("w.Title", "Title", "Title", 30)
                .AddCol("w.Reason", "Reason", "Reason", 30)
                .AddCol("convert(varchar(50),AssignedOn )", "AssignedOn", "Assigned On", 10)
                .AddCol("AssignedOn", "AssignedOnDate", "Assigned On Date", -1)
                .AddCol("DATEDIFF(MINUTE, AssignedOn , GETDATE())", "MinuteDiff", "MinuteDiff", -1)
                .AddCol("TurnAroundTimeInMin", "TurnAroundTimeInMin", "TurnAroundTimeInMin", -1)
                .AddCol("TurnAroundTimeInMin - DATEDIFF(MINUTE, AssignedOn, GETDATE())", "EXCEDDEDTIME", "EXCEDDEDTIME", -1)
                .AddCol("ShowFlag", "ShowFlag", "ShowFlag", -1)
                .AddCol("case when TurnAroundTimeInMin -DATEDIFF(MINUTE, AssignedOn, GETDATE()) < 0 and ShowFlag = 0 AND Status!='Completed' AND Status!='Cancel' AND Status!='Reassign' then 0 else 1 end", "ORDEROFLIST", "ORDEROFLIST", -1)
                .AddDefaultSort("ORDEROFLIST")
                .AddTableSection(@"Work_item w
        LEFT JOIN Mst_Department d1 ON w.DeptId = d1.DepartmentId
        LEFT JOIN Mst_EmployeeDivision d2 ON w.DivId = d2.EmployeeDivisionId
        LEFT JOIN Mst_Users u1 ON u1.UserId = w.AssignedTo
        LEFT JOIN Mst_Users u2 ON u2.UserId = w.AssignedBy")
                .AddWhere(search)
                .AddSortAlternate("ShowFlag asc", "AssignedOnDate")
                .AddDownloadName("WorkItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }


    public class WorkItemListUserDashBoardNew 
    {
        public QueryBuilder<AWWorkItemListModel> builder = new QueryBuilder<AWWorkItemListModel>();
        public void Configure(ABDataTableModel<AWWorkItemListModel> model)
        {
            model.order.Clear();

            var search = string.Format(@"((CONVERT(VARCHAR(50),AssignedOn,103)>=CONVERT(VARCHAR(50),'{2}',103)) AND CONVERT(VARCHAR(50),AssignedOn,103)<=CONVERT(VARCHAR(50),'{3}',103)  AND ([w].AssignedTo =COALESCE({0},[w].AssignedTo) OR [w].AssignedBy =COALESCE({1},[w].AssignedBy)))  OR (TurnAroundTimeInMin -DATEDIFF(MINUTE, AssignedOn, GETDATE()) < 0 and ShowFlag = 0 AND Status!='Completed' AND Status!='Cancel' AND Status!='Reassign')",
                model.addData.AssignedToyou,
                model.addData.AssignedByyou, 
                model.addData.FromDate,
                model.addData.ToDate); 

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                 .AddCol("w.WorkItemId", "WorkItemId", "Work Item Id", -1)
                 .AddCol("w.DivId", "DivId", "DivId", -1)
                 .AddCol("u1.Name", "AssignedToUser", "Assigned To User", 10)
                 .AddCol("u2.Name", "AssignedByUser", "Assigned By User", 10)
                 .AddCol("d1.DepartmentName", "Dept", "Dept Name", 10)
                 .AddCol("d2.EmployeeDivisionName", "Div", "Div Name", 10)
                 .AddCol("w.Status", "Status", "Status", 10)
                 .AddCol("w.Title", "Title", "Title", 30)
                 .AddCol("w.Reason", "Reason", "Reason", 30)
                 .AddCol("convert(varchar(50),AssignedOn )", "AssignedOn", "Assigned On", 10)
                 .AddCol("AssignedOn", "AssignedOnDate", "Assigned On Date", -1)
                 .AddCol("DATEDIFF(MINUTE, AssignedOn , GETDATE())", "MinuteDiff", "MinuteDiff", -1)
                 .AddCol("TurnAroundTimeInMin", "TurnAroundTimeInMin", "TurnAroundTimeInMin", -1)
                 .AddCol("TurnAroundTimeInMin - DATEDIFF(MINUTE, AssignedOn, GETDATE())", "EXCEDDEDTIME", "EXCEDDEDTIME", -1)
                 .AddCol("ShowFlag", "ShowFlag", "ShowFlag", -1)
                 .AddCol("case when TurnAroundTimeInMin -DATEDIFF(MINUTE, AssignedOn, GETDATE()) < 0 and ShowFlag = 0 AND Status!='Completed' AND Status!='Cancel' AND Status!='Reassign' then 0 else 1 end", "ORDEROFLIST", "ORDEROFLIST", -1)
                 .AddDefaultSort("ORDEROFLIST")
                 .AddTableSection(@"Work_item w
        LEFT JOIN Mst_Department d1 ON w.DeptId = d1.DepartmentId
        LEFT JOIN Mst_EmployeeDivision d2 ON w.DivId = d2.EmployeeDivisionId
        LEFT JOIN Mst_Users u1 ON u1.UserId = w.AssignedTo
        LEFT JOIN Mst_Users u2 ON u2.UserId = w.AssignedBy")
                 .AddWhere(search)
                 .AddSortAlternate("ShowFlag asc", "AssignedOnDate")
                 .AddDownloadName("WorkItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }


    public class WorkItemListAdminDashBoard 
    {
        public QueryBuilder<AWWorkItemListModel> builder = new QueryBuilder<AWWorkItemListModel>();
        public void Configure(ABDataTableModel<AWWorkItemListModel> model)
        {
            model.order.Clear();

            var search = string.Format(@"((CONVERT(VARCHAR(50),AssignedOn,103)>=CONVERT(VARCHAR(50),'{0}',103)) AND CONVERT(VARCHAR(50),AssignedOn,103)<=CONVERT(VARCHAR(50),'{1}',103))  OR (TurnAroundTimeInMin -DATEDIFF(MINUTE, AssignedOn, GETDATE()) < 0 and ShowFlag = 0 AND Status!='Completed' AND Status!='Cancel' AND Status!='Reassign')",               
                model.addData.FromDate,
                model.addData.ToDate);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                 .AddCol("w.WorkItemId", "WorkItemId", "Work Item Id", -1)
                 .AddCol("w.DivId", "DivId", "DivId", -1)
                 .AddCol("u1.Name", "AssignedToUser", "Assigned To User", 10)
                 .AddCol("u2.Name", "AssignedByUser", "Assigned By User", 10)
                 .AddCol("d1.DepartmentName", "Dept", "Dept Name", 10)
                 .AddCol("d2.EmployeeDivisionName", "Div", "Div Name", 10)
                 .AddCol("w.Status", "Status", "Status", 10)
                 .AddCol("w.Title", "Title", "Title", 30)
                 .AddCol("w.Reason", "Reason", "Reason", 30)
                 .AddCol("convert(varchar(50),AssignedOn )", "AssignedOn", "Assigned On", 10)
                 .AddCol("AssignedOn", "AssignedOnDate", "Assigned On Date", -1)
                 .AddCol("DATEDIFF(MINUTE, AssignedOn , GETDATE())", "MinuteDiff", "MinuteDiff", -1)
                 .AddCol("TurnAroundTimeInMin", "TurnAroundTimeInMin", "TurnAroundTimeInMin", -1)
                 .AddCol("TurnAroundTimeInMin - DATEDIFF(MINUTE, AssignedOn, GETDATE())", "EXCEDDEDTIME", "EXCEDDEDTIME", -1)
                 .AddCol("ShowFlag", "ShowFlag", "ShowFlag", -1)
                 .AddCol("case when TurnAroundTimeInMin -DATEDIFF(MINUTE, AssignedOn, GETDATE()) < 0 and ShowFlag = 0 AND Status!='Completed' AND Status!='Cancel' AND Status!='Reassign' then 0 else 1 end", "ORDEROFLIST", "ORDEROFLIST", -1)
                 .AddDefaultSort("ORDEROFLIST")
                 .AddTableSection(@"Work_item w
        LEFT JOIN Mst_Department d1 ON w.DeptId = d1.DepartmentId
        LEFT JOIN Mst_EmployeeDivision d2 ON w.DivId = d2.EmployeeDivisionId
        LEFT JOIN Mst_Users u1 ON u1.UserId = w.AssignedTo
        LEFT JOIN Mst_Users u2 ON u2.UserId = w.AssignedBy")
                 .AddWhere(search)
                 .AddSortAlternate("ShowFlag asc", "AssignedOnDate")
                 .AddDownloadName("WorkItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }



}