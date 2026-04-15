using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.DataTablesServer
{
    public class QueryBuilder<T1>
    {
        public Dictionary<string, ABDataColType> formatters = null;
        public Dictionary<string, string> captions = null;
        public Dictionary<string, string> sortAlternate = null;
        public Dictionary<string, decimal> widths = null;
        public List<OneQueryColumn> columns { get; set; }
        public string fromTableView { get; set; }
        public string where { get; set; }
        public string defaultSort { get; set; }

        public Models.ABDataTableModel<T1> model = null;
        public string downloadName { get; set; }

        public System.Text.StringBuilder SQL = null;


        #region chainable functions
        public static QueryBuilder<T1> Start()
        {
            QueryBuilder<T1> builder = new QueryBuilder<T1>();
            return builder;
        }
        public QueryBuilder<T1> AddTableSection(string tableOrView)
        {
            this.fromTableView = tableOrView;
            return this;
        }
        public QueryBuilder<T1> AddWhere(string where)
        {
            this.where = where;
            return this;
        }
        public QueryBuilder<T1> AddDefaultSort(string defaultSort)
        {
            this.defaultSort = defaultSort;
            return this;
        }
        public QueryBuilder<T1> AddSlnoCaption(string caption, decimal width)
        {
            if (captions == null) { captions = new Dictionary<string, string>(); }
            captions["slno"] = caption;
            if (widths == null) { widths = new Dictionary<string, decimal>(); }
            widths["slno"] = width;
            return this;
        }
        public QueryBuilder<T1> AddSortAlternate(string col, string sort)
        {
            if (sortAlternate == null) { sortAlternate = new Dictionary<string, string>(); }
            sortAlternate[col] = sort;
            return this;
        }
        public QueryBuilder<T1> AddCol(string colText, string colName, string caption, decimal width, ABDataColType formattingType = ABDataColType.String)
        {
            if (columns == null) { columns = new List<OneQueryColumn>(); }
            columns.Add(new OneQueryColumn() { ColText = colText, ColName = colName });
            if (formatters == null) { formatters = new Dictionary<string, ABDataColType>(); }
            formatters[colName] = formattingType;
            if (captions == null) { captions = new Dictionary<string, string>(); }
            captions[colName] = caption;
            if (widths == null) { widths = new Dictionary<string, decimal>(); }
            widths[colName] = width;
            return this;
        }
        public QueryBuilder<T1> AddDownloadName(string filename)
        {
            this.downloadName = filename;
            return this;
        }
        public QueryBuilder<T1> AddModel(Models.ABDataTableModel<T1> model)
        {
            this.model = model;
            return this;
        }
        #endregion
        public void Normalize(ref string sort, ref string filter)
        {
            if (model.order.Count > 0 && model.columns[model.order[0].column].data != "slno")
            {
                var sortCol = model.columns[model.order[0].column].data;
                if (sortAlternate != null && sortAlternate.ContainsKey(sortCol)) { sortCol = sortAlternate[sortCol]; }
                sort = sortCol + " " + model.order[0].dir;
            }

            var searchables = model.columns.Where(x => x.searchable && x.data != "slno");
            var filterStr = new System.Text.StringBuilder(" 1 = 1 ");
            if (!string.IsNullOrWhiteSpace(model.search.value))
            {
                filterStr.Append(" AND ( ");
                var delimiter = "";
                foreach (var col in searchables)
                {
                    string valueStr = (model.search.value.Contains("*") ? model.search.value.Replace("*", "%") : "%" + model.search.value + "%");
                    filterStr.Append(delimiter)
                        .AppendFormat("CAST({0} AS VARCHAR(MAX)) LIKE '{1}'", col.data, valueStr).AppendLine();
                    delimiter = " OR ";
                }
                filterStr.Append(" ) ");
            }
            foreach (var col in searchables)
            {
                if (!string.IsNullOrWhiteSpace(col.search.value))
                {
                    string comparision = "LIKE";
                    string dataStr = string.Format("CAST({0} AS VARCHAR(MAX))", col.data);
                    if (col.search.value.StartsWith("<=")) { comparision = "<="; }
                    else if (col.search.value.StartsWith(">=")) { comparision = ">="; }
                    else if (col.search.value.StartsWith("<>")) { comparision = "<>"; }
                    else if (col.search.value.StartsWith("!=")) { comparision = "<>"; }
                    else if (col.search.value.StartsWith("<")) { comparision = "<"; }
                    else if (col.search.value.StartsWith(">")) { comparision = ">"; }
                    else if (col.search.value.StartsWith("=")) { comparision = "="; }

                    string valueStr = col.search.value.Trim('>', '<', '=', ' ', '!');

                    if (!string.IsNullOrWhiteSpace(valueStr))
                    {

                        if (comparision != "LIKE")
                        {
                            dataStr = col.data;
                        }
                        else
                        {
                            valueStr = (valueStr.Contains("*") ? valueStr.Replace("*", "%") : "%" + valueStr + "%");
                        }

                        if (comparision != "LIKE" && formatters.ContainsKey(col.data))
                        {
                            var formatter = formatters[col.data];
                            if (formatter == ABDataColType.Numeric)
                            {
                                decimal numData = 0;
                                if (decimal.TryParse(valueStr, out numData)) { valueStr = numData.ToString(); }
                                else { dataStr = string.Format("CAST({0} AS VARCHAR(MAX))", col.data); }
                            }
                        }

                        filterStr.Append(" AND ")
                            .AppendFormat(" {0} {2} '{1}' ", dataStr, valueStr, comparision).AppendLine();
                    }
                }
            }
            var filterText = filterStr.ToString();
            if (!string.IsNullOrWhiteSpace(filterText))
            {
                filter = filterText;
            }
        }

        public System.Text.StringBuilder Build()
        {
            var sort = (string.IsNullOrWhiteSpace(defaultSort) ? "1" : defaultSort);
            var filter = "1 = 1";
            Normalize(ref sort, ref filter);
            var stringBuilder = new System.Text.StringBuilder();

            stringBuilder.AppendLine(" SELECT * FROM ( ");

            stringBuilder.AppendLine(" SELECT ")
                .AppendLine(" COUNT(*) OVER () as _totalFiltered, ")
                .AppendFormat(" ROW_NUMBER() OVER(ORDER BY {0}) as slno, ", sort).AppendLine()
                .AppendLine(" axnbdfrwer.* ")
                .AppendLine(" FROM ( ");

            stringBuilder.AppendLine(" SELECT ").AppendLine("COUNT(*) OVER() as _totalRecords");
            foreach (var col in columns)
            {
                stringBuilder.Append(", ").Append(col.ColText).Append(" AS [").Append(col.ColName).Append("]").AppendLine();
            }
            stringBuilder.AppendLine(" FROM ").AppendLine(fromTableView ?? "");
            if (!string.IsNullOrWhiteSpace(where))
            {
                stringBuilder.Append(" WHERE ").AppendLine(where ?? "");
            }

            stringBuilder.AppendLine(") axnbdfrwer ")
                .Append(" WHERE ").AppendLine(filter);
            stringBuilder
                .AppendLine(") axnomsfdtg WHERE slno > @start AND slno <= @end")
                .AppendLine(" ORDER BY slno; ");

            return stringBuilder;
        }
        public List<decimal> GetColWidth(List<string> cols)
        {
            if (cols.Count == 0) { cols = columns.Select(x => x.ColName).ToList(); }
            return cols.Where(x => widths.ContainsKey(x) && widths[x] > 0).Select(x => widths[x]).ToList();
        }
        public System.Data.DataTable PrepareOneSetFromQuery(int i, string dbName, List<string> cols)
        {
            model.start = i * 10000;
            model.length = 10000;
            int total = 0;
            int filtered = 0;
            var ds = ExecuteDataset(dbName, out total, out filtered);
            var dt = ds.Tables[0];
            dt.Columns.Remove(dt.Columns["_totalRecords"]);
            dt.Columns.Remove(dt.Columns["_totalFiltered"]);
            if (i == 0)
            {
                foreach (System.Data.DataColumn dc in dt.Columns)
                {
                    dc.Caption = captions[dc.ColumnName];
                    System.Diagnostics.Trace.WriteLine(dc.ColumnName);
                }
            }
            var dict = cols.ToDictionary(x => x, y => true);
            for (int c = dt.Columns.Count - 1; c >= 0; c--)
            {
                if (dict.Count > 0 && !dict.ContainsKey(dt.Columns[c].ColumnName))
                {
                    dt.Columns.RemoveAt(c);
                }
                else if (widths[dt.Columns[c].ColumnName] <= 0)
                {
                    dt.Columns.RemoveAt(c);
                }
            }
            return dt;
        }
        public System.Web.Mvc.ActionResult ExportToHtml(string dbName, List<string> cols)
        {
            var model = new EumiPrintData();
            model.getOneSet = (x => this.PrepareOneSetFromQuery(x, dbName, cols));
            return new System.Web.Mvc.ViewResult() { ViewName = "~/Views/ABDataTable/EumiPrint.cshtml", ViewData = new ViewDataDictionary(model) };
        }
        public System.Web.Mvc.ActionResult ExportToExcel(string dbName, List<string> cols)
        {
            var filename = System.IO.Path.GetTempFileName();
            System.Diagnostics.Trace.WriteLine("Excel export file: " + filename);
            EumiExcel.CreateExcelDocument((x => this.PrepareOneSetFromQuery(x, dbName, cols)), GetColWidth(cols), "Exported Records", filename);
            return new System.Web.Mvc.FilePathResult(filename, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { FileDownloadName = ((downloadName ?? "Download") + ".xlsx") };
        }
        public System.Web.Mvc.ActionResult ExportToPDF(string dbName, List<string> cols, HttpResponseBase Response)
        {
            Response.Clear();
            Response.ContentType = "application/pdf";
            Response.AppendHeader("content-disposition", "attachment; filename=" + ((downloadName ?? "Download") + ".pdf"));
            EumiPDF.CreatePdf((x => this.PrepareOneSetFromQuery(x, dbName, cols)), Response.OutputStream, GetColWidth(cols));
            Response.Flush();
            Response.End();
            return new System.Web.Mvc.EmptyResult();
        }
        public System.Web.Mvc.ActionResult ExportToCSV(string dbName, List<string> cols, HttpResponseBase Response)
        {
            Response.Clear();
            Response.ContentType = "text/csv";
            Response.AppendHeader("content-disposition", "attachment; filename=" + ((downloadName ?? "Download") + ".csv"));
            EumiCSV.RendertoOutput((x => this.PrepareOneSetFromQuery(x, dbName, cols)), Response.OutputStream);
            Response.Flush();
            Response.End();
            return new System.Web.Mvc.EmptyResult();
        }

        public System.Data.DataSet ExecuteDataset(string dbName, out int total, out int filtered, bool suppressInital = true)
        {
            total = 0;
            filtered = 0;
            string sql = (this.SQL = (this.SQL ?? this.Build())).ToString();

            if (!suppressInital)
            {
                var param2 = new System.Data.SqlClient.SqlParameter[2];
                param2[0] = new System.Data.SqlClient.SqlParameter("@start", 0) { SqlDbType = System.Data.SqlDbType.Int };
                param2[1] = new System.Data.SqlClient.SqlParameter("@end", 2) { SqlDbType = System.Data.SqlDbType.Int };
                var record = SQLHelper.ExecuteDatasetSQL(sql, dbName, param2);

                if (record.Tables.Count > 0 && record.Tables[0].Rows.Count > 0)
                {
                    filtered = (int)record.Tables[0].Rows[0]["_totalFiltered"];
                    total = (int)record.Tables[0].Rows[0]["_totalRecords"];
                }
            }

            var param1 = new System.Data.SqlClient.SqlParameter[2];
            param1[0] = new System.Data.SqlClient.SqlParameter("@start", model.start) { SqlDbType = System.Data.SqlDbType.Int };
            param1[1] = new System.Data.SqlClient.SqlParameter("@end", model.start + model.length) { SqlDbType = System.Data.SqlDbType.Int };
            var list = SQLHelper.ExecuteDatasetSQL(sql, dbName, param1);

            return list;
        }
        public List<Dictionary<string, object>> ExecuteObjectDictionary(string dbName, out int total, out int filtered)
        {
            total = 0;
            filtered = 0;
            string sql = this.Build().ToString();

            var param2 = new System.Data.SqlClient.SqlParameter[2];
            param2[0] = new System.Data.SqlClient.SqlParameter("@start", System.Data.SqlDbType.Int) { Value = 0 };
            param2[1] = new System.Data.SqlClient.SqlParameter("@end", System.Data.SqlDbType.Int) { Value = 2 };
            var record = SQLHelper.ExcuteObjectDictionary(sql, dbName, param2);

            var param1 = new System.Data.SqlClient.SqlParameter[2];
            param1[0] = new System.Data.SqlClient.SqlParameter("@start", System.Data.SqlDbType.Int) { Value = model.start };
            param1[1] = new System.Data.SqlClient.SqlParameter("@end", System.Data.SqlDbType.Int) { Value = model.start + model.length };
            var list = SQLHelper.ExcuteObjectDictionary(sql, dbName, param1);

            if (record.Count > 0)
            {
                filtered = (int)record[0]["_totalFiltered"];
                total = (int)record[0]["_totalRecords"];
            }
            return list;
        }
    }
    public enum ABDataColType
    {
        None,
        String,
        Numeric
    }
    public class OneQueryColumn
    {
        public string ColText { get; set; }
        public string ColName { get; set; }
    }
    public static class QueryBuiderExtensions
    {
        public static long GetUserId(this System.Web.Mvc.Controller controller)
        {
            return controller.HttpContext.GetOwinContext().Authentication.User.Claims.Where(x => x.Type == ClaimTypes.Name)
                .Select(x => Convert.ToInt64(x.Value)).First();
        }
        public static System.Data.DataSet UserData(this System.Web.Mvc.Controller controller)
        {
            return controller.ViewBag.UserSet as System.Data.DataSet;
        }
        public static ActionResult Download<T1>(this System.Web.Mvc.Controller controller, string type, List<string> cols, string dbName, QueryBuilder<T1> builder)
        {
            if (type == "excel")
            {
                return builder.ExportToExcel(dbName, cols);
            }
            else if (type == "pdf")
            {
                return builder.ExportToPDF(dbName, cols, controller.Response);
            }
            else if(type == "csv")
            {
                return builder.ExportToCSV(dbName, cols, controller.Response);
            }
            else
            {
                return builder.ExportToHtml(dbName, cols);
            }
        }
    }
}
