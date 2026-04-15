using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP.DataTablesServer
{
    public class WorkItemList
    {
        public QueryBuilder<AWWorkItemListModel> builder = new QueryBuilder<AWWorkItemListModel>();
        public void Configure(ABDataTableModel<AWWorkItemListModel> model)
        {
            model.addData = model.addData ?? new AWWorkItemListModel();

            System.Text.StringBuilder where = new System.Text.StringBuilder();
            where.AppendFormat(" COALESCE(w.AssignedTo, 0) = COALESCE(NULLIF({0}, 0), w.AssignedTo, 0) ", model.addData.assignedTo ?? 0);
            where.AppendFormat(" AND COALESCE(w.AssignedBy, 0) = COALESCE(NULLIF({0}, 0), w.AssignedBy, 0) ", model.addData.assignedBy ?? 0);
            where.AppendFormat(" AND COALESCE(w.DivId, 0) = COALESCE(NULLIF({0}, 0), w.DivId, 0) ", model.addData.div ?? 0);
            where.AppendFormat(" AND COALESCE(w.DeptId, 0) = COALESCE(NULLIF({0}, 0), w.DeptId, 0) ", model.addData.dept ?? 0);
            if (model.addData.divByUser.HasValue && model.addData.divByUser.Value > 0)
            {
                where.AppendFormat(" AND w.assignedTo IS NULL AND w.DivId IN (SELECT n.DivId FROM Work_UserDivision n WHERE n.DeptId IN (SELECT x.DepartmentId FROM Mst_Users x WHERE x.UserId = {0} )) ", model.addData.divByUser.Value);
            }

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("w.WorkItemId", "WorkItemId", "Work Item Id", -1)
                .AddCol("u1.UserName", "AssignedToUser", "Assigned To User", 10)
                .AddCol("u2.UserName", "AssignedByUser", "Assigned By User", 10)
                .AddCol("d1.DepartmentName", "Dept", "Dept Name", 10)
                .AddCol("d2.DivName", "Div", "Div Name", 10)
                .AddCol("w.Status", "Status", "Status", 10)
                .AddCol("w.Title", "Title", "Title", 30)
                .AddCol("CONVERT(VARCHAR(50), AssignedOn, 103)", "AssignedOn", "Assigned On", 10)
                .AddCol("AssignedOn", "AssignedOnDate", "Assigned On Date", -1)
                .AddDefaultSort("WorkItemId")
                .AddTableSection(@"Work_item w
        LEFT JOIN Mst_Department d1 ON w.DeptId = d1.DepartmentId
        LEFT JOIN Work_Division d2 ON w.DivId = d2.DivId
        LEFT JOIN Mst_Users u1 ON u1.UserId = w.AssignedTo
        LEFT JOIN Mst_Users u2 ON u2.UserId = w.AssignedBy")
                .AddWhere(where.ToString())
                .AddSortAlternate("AssignedOn", "AssignedOnDate")
                .AddDownloadName("WorkItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }

    }
}