using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;
using EUMI_ERP.DataTablesServer;

namespace EUMI_ERP.DReports
{
    public class LocationwiseStock
    {

        public QueryBuilder<StockReportModel> builder = new QueryBuilder<StockReportModel>();
        public void Configure(ABDataTableModel<StockReportModel> model)
        {
            model.order.Clear();

            var search = string.Format(@"ISNULL([S].Stock_Location, 0) = COALESCE(NULLIF({0}, 0), [S].Stock_Location, 0)",
                 model.addData.Location);
            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
            .AddCol("I.ItemCode", "ItemCode", "Product Code", 20)
            .AddCol("I.Description", "Description", "Product Description", 30)
            .AddCol("((S.Stock_OpeningQty + S.Stock_InQty) - S.Stock_OutQty)", "StockQty", "Stock Quantity", 30)
            .AddCol("I.AvgCost", "AvgCost", "Average Cost", 20)
            .AddCol("(((S.Stock_OpeningQty + S.Stock_InQty) - S.Stock_OutQty) * I.AvgCost)", "StockValue", "Stock Value", 20)
            .AddCol("SUM((S.Stock_OpeningQty + Stock_InQty) - Stock_OutQty) OVER ()", "_stockqty", "Stock Quantity", -1)
            .AddCol("SUM(((S.Stock_OpeningQty + Stock_InQty) - Stock_OutQty) * I.AvgCost) OVER ()", "_stockvalue", "Stock Value", -1)
            .AddDefaultSort("ItemCode")
            .AddTableSection(string.Format(@"Inv_Stock S
                inner join Mst_Item I on S.Stock_Item_Id=I.ItemId
                inner join Mst_Location L on S.Stock_Location=L.LocationId"))
            .AddWhere(search)
            .AddDownloadName("StockReportDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}