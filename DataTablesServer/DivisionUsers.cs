using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP.DataTablesServer
{
    public class DivisionUsers
    {
        public QueryBuilder<AWDivUserListModel> builder = new QueryBuilder<AWDivUserListModel>();
        public void Configure(ABDataTableModel<AWDivUserListModel> model)
        {
            model.addData = model.addData ?? new AWDivUserListModel();

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("u.UserId", "UserId", "User Id", -1)
                .AddCol("u.UserName", "UserName", "User Name", 10)
                .AddCol("u.Email", "eMail", "E Mail", 10)
                .AddCol("d.DepartmentName", "DeptName", "Dept Name", 10)
                .AddCol("wd.DivName", "DivName", "Div Name", 10)
                .AddCol(string.Format("CASE WHEN wu.DivId = {0} THEN 1 ELSE 0 END", model.addData.divId), "isInCurrentDiv", "Current Div", -1)
                .AddDefaultSort("UserId")
                .AddTableSection(string.Format(@"Mst_Users u
        LEFT JOIN Mst_Department d ON u.DepartmentId = d.DepartmentId
        LEFT JOIN Work_UserDivision wu ON u.UserID = wu.UserId AND u.DepartmentId = wu.DeptId AND wu.DivId = {0}
        LEFT JOIN Work_Division wd ON wu.DivId = wd.DivId", model.addData.divId))
                .AddWhere(string.Format("ISNULL(u.DepartmentId, 0) = COALESCE(NULLIF({0}, 0), u.DepartmentId, 0) AND (wu.DivId = {1} OR wu.DivId IS NULL)", model.addData.deptId, model.addData.divId))
                .AddDownloadName("UsersList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }

    }
}