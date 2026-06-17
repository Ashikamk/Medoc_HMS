using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class StockTransferOut
    {
        public QueryBuilder<StockTransferReport> builder = new QueryBuilder<StockTransferReport>();
        public void Configure(ABDataTableModel<StockTransferReport> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search = string.Format(@"CONVERT(DATETIME, [P].STODate, 103) >= '{0}' AND CONVERT(DATETIME, [P].STODate, 103) <= '{1}'
             AND ISNULL([P].DeptId, 0) = COALESCE(NULLIF({2}, 0),[P].DeptId, 0) and P.DelFlag=1 and C.DelFlag=1",
               model.addData.dateFrom.ToString("yyyy-MM-dd"),
             model.addData.dateTo.ToString("yyyy-MM-dd"),
             model.addData.DepartmentId,
             model.addData.UserId);

             builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
            .AddCol("it.ItemCode", "ItemCode", "Code", 20)
            .AddCol("it.Description", "ItemDescription", "Description", 20)
            .AddCol("P.STODate", "StockDate", "StockOut Date", 20)
            .AddCol("l.LocationName", "FromLocation", "From Location", 20)
            .AddCol("loc.LocationName", "ToLocation", "To Location", 30)
            .AddCol("C.Quantity", "Quantity", "Quantity", 30)
            .AddCol("C.Price", "Price", "Rate", 30)
            .AddCol("C.Total", "Total", "Amount", 30)

            .AddCol("SUM(C.Quantity) OVER ()", "_quantity", "Quantity", -1)
            .AddCol("SUM(C.Price) OVER ()", "_price", "Rate", -1)
            .AddCol("SUM(C.Total) OVER ()", "_total", "Amount", -1)
            .AddDefaultSort("StockDate")
            .AddTableSection(string.Format(@"Inv_StockTransferOutMain P 
             INNER JOIN Inv_StockTransferOutSub C ON P.STONo = C.STONo and P.DeptId = C.DeptId
             left JOIN Mst_Item it ON C.ProductId = it.ItemId 
             left JOIN Mst_Location l ON P.FromLocation = l.LocationId 
             left JOIN  Mst_Location loc ON P.ToLocation = loc.LocationId"))
            .AddWhere(search + "AND P.DeptId in (select DeptId from Mst_UserDeptDivision where UserId =" + model.addData.UserId + ")")
            .AddDownloadName("StockTransferOutReportDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
    }
