using EUMI_ERP.DataTablesServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class SPStockQuery
    {
        public QueryBuilder<string> builder = new QueryBuilder<string>();
        public void Configure(Models.ABDataTableModel<string> model)
        {

            builder.AddModel(model).AddSlnoCaption("Serial#", 10)
                
                .AddCol("Mst_Item.ItemId", "ItemId", "Item Id", -1)
                .AddCol("Mst_Item.ItemCode", "ItemCode", "Item Code", 15)
                .AddCol("Mst_Item.[Description]", "Description", "Item Name", 30)
                .AddCol("(sum(Inv_stock.Stock_OpeningQty) + sum(Inv_stock.Stock_InQty) - sum(Inv_stock.Stock_OutQty))", "Stock", "Stock", 15)
                //.AddCol("Inv_InventoryTransaction.Quantity", "Quantity", "Quantity", 15)
                .AddCol("Mst_item.AvgCost", "Cost", "Cost", 15, ABDataColType.Numeric)
                .AddCol("Mst_item.SellingPrice", "Price", "Price", 15, ABDataColType.Numeric)
                 //.AddCol("Mst_CustomerMain.CustName", "Supplier", "Supplier", 20)
                .AddCol("Mst_GroupMain.GrpName", "GrpName", "Group", 20)
                 .AddCol("Mst_SubGroupMain.SbgrpName", "SbgrpName", "Sub Group", 20)
                 .AddCol("Mst_Category.CategoryName", "CategoryName", "Category", 20)
                  .AddCol("Mst_SubCategory.SubCategoryName", "SubCategoryName", "Sub Category", 20)

                .AddCol("Mst_item.OpenQty", "OpenQty", "Opening Qty", -1, ABDataColType.Numeric)
                .AddCol("Mst_item.OpeningCost", "OpeningCost", "Opening Cost", -1, ABDataColType.Numeric)
                .AddCol("Mst_Item.Active", "Active", "Active", -1)
                .AddCol("Mst_item.GroupId", "GroupId", "GroupId", -1)
                 .AddCol("Mst_item.CategoryId", "CategoryId", "CategoryId", -1)
                 .AddCol("Mst_Item.ItemId", "View", "View", -1)
                .AddCol("CASE WHEN Active = 1 THEN 'Active' ELSE 'In Active' END", "Status", "Status", 15)
                .AddDefaultSort("ItemId")
                .AddTableSection(@"Mst_Item 
			                    LEFT OUTER JOIN Inv_Stock on Inv_Stock.Stock_Item_Id=Mst_Item.ItemId
			                    LEFT OUTER JOIN Mst_GroupMain on Mst_Item.GroupId = Mst_GroupMain.GrpId
			                    LEFT OUTER JOIN Mst_Category on Mst_Item.CategoryId = Mst_Category.CategoryId
                                LEFT OUTER JOIN Mst_SubGroupMain on Mst_Item.SubGroupId = Mst_SubGroupMain.SbgrpId
		                        LEFT OUTER JOIN Mst_SubCategory on Mst_Item.SubCategoryId = Mst_SubCategory.SubCategoryId")

               //.AddWhere("(InvId IN (SELECT max(InvId)FROM Inv_InventoryTransaction GROUP BY ItemId)or(Mst_Item.ItemCode not in (select itemcode from Inv_InventoryTransaction))) and  Mst_Item.DelFlag = 1 group by Mst_Item.ItemId,Mst_Item.ItemCode,Description,Cost,Price,GrpName,SbgrpName,CategoryName,SubCategoryName,Mst_item.OpenQty,Mst_Item.Active,Mst_item.GroupId,Mst_item.CategoryId")
               .AddWhere("Mst_Item.DelFlag = 1 group by Mst_Item.ItemId,Mst_Item.ItemCode,Mst_Item.[Description],Mst_item.AvgCost,Mst_item.SellingPrice,GrpName,SbgrpName,CategoryName,SubCategoryName,Mst_item.OpenQty,Mst_item.OpeningCost,Mst_Item.Active,Mst_item.GroupId,Mst_item.CategoryId")

               .AddDownloadName("StockQueryDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}

