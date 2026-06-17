using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class StockTransferIn
    {

        public QueryBuilder<StockTransferReport> builder = new QueryBuilder<StockTransferReport>();
        public void Configure(ABDataTableModel<StockTransferReport> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search = string.Format(@"CONVERT(DATETIME, [S].STInDate, 103) >= '{0}' AND CONVERT(DATETIME, [S].STInDate, 103) <= '{1}'
                    AND ISNULL([S].DeptId, 0) = COALESCE(NULLIF({2}, 0),[S].DeptId, 0) and S.DelFlag=1 and SS.DelFlag=1",
                    model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),                   
                    model.addData.DepartmentId,
                    model.addData.UserId);
            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("I.ItemCode", "ItemCode", "Product Code", 20)
                .AddCol("I.Description", "Description", "Product Description", 20)
                .AddCol("S.STInDate", "STInDate", "StockIn Date", 20)
                .AddCol("L.LocationName", "FromLocation", "From Location", 15)
                .AddCol("Loc.LocationName", "ToLocation", "To Location", 15)
                .AddCol("SS.Quantity", "Quantity", "Quantity", 20)
                 .AddCol("SS.Price", "Price", "Rate", 20)
                .AddCol("SS.Total", "Total", "Amount", 20)
                 .AddCol("SUM(SS.Quantity) OVER ()", "_Quantity", "Quantity", -1)
                .AddCol("SUM(SS.Price) OVER ()", "_Price", "Price", -1)
                .AddCol("SUM(SS.Total) OVER ()", "_Total", "Total ", -1)
                 .AddDefaultSort("STInDate")
                .AddTableSection(string.Format(@"Inv_StockTransferInMain S 
                            inner join Inv_StockTransferInSub SS on S.STInNo=SS.STInNo and  S.DeptId=SS.DeptId
                            left join Mst_Item I on SS.ProductId= I.ItemId
                            left join Mst_Location L on S.LoginLocation= L.LocationId
                            left join Mst_Location Loc on S.TransferLocation= Loc.LocationId"))
                .AddWhere(search + "AND S.DeptId in (select DeptId from Mst_UserDeptDivision where UserId =" + model.addData.UserId + ")")
                .AddDownloadName("StockTransferInReportDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}