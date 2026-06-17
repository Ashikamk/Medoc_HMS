using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.IO.Pipes;
using System.Linq;
using System.Net.Http.Headers;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP.DataTablesServer
{
    public class StockLocations
    {
        public QueryBuilder<ABStockLocations> builder = new QueryBuilder<ABStockLocations>();
        public void Configure(Models.ABDataTableModel<ABStockLocations> model)
        {

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("mi.ItemId", "ItemId", "Item Id", -1)
                .AddCol("MAX(mi.ItemCode)", "ItemCode", "Item Code", 10)
                .AddCol("MAX(mi.[Description])", "ItemDesc", "Item Desc", 10);
            foreach (var locOne in model.addData.locations)
            {
                builder.AddCol(string.Format("ISNULL(SUM(CASE WHEN s.loc = {0} THEN s.Quantity ELSE 0 END), 0)", locOne.locationId),
                    string.Format("loc{0}", locOne.locationId),
                    locOne.locName,
                    10,
                    ABDataColType.Numeric);
            }
            builder.AddCol("ISNULL(SUM(s.Quantity), 0)", "locSum", "Total", 10, ABDataColType.Numeric);
            builder.AddDefaultSort("ItemId")
                .AddTableSection(@"Mst_Item mi
		LEFT JOIN 
		    (SELECT Stock_Item_Id, ((Stock_OpLoseQty+Stock_InLooseQty)-Stock_OutLooseQty) as Quantity, Stock_Location as loc
		    FROM Inv_Stock si) s ON mi.ItemId = s.Stock_Item_Id
        WHERE mi.DelFlag = 1
		GROUP BY mi.ItemId")
                .AddWhere(null)
                .AddDownloadName("StockDetailed");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}