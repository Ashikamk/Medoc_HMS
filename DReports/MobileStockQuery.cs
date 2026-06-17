using EUMI_ERP.DataTablesServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace EUMI_ERP.DReports
{
    public class MobileStockQuery
    {
        public QueryBuilder<string> builder = new QueryBuilder<string>();
        public void Configure(Models.ABDataTableModel<string> model)
        {



            builder.AddModel(model).AddSlnoCaption("Serial#", 10)
                .AddCol("Mst_Item.ItemId", "ItemId", "Item Id", -1)
                .AddCol("Mst_Item.ItemCode", "ItemCode", "Item Code", 15)
                .AddCol("Mst_Item.[Description]", "Description", "Item Name", 30)
                .AddCol("Mst_UnitMain.UnitName", "UnitName", "Unit Name", 15)
                .AddCol("(sum(Inv_stock.Stock_OpeningQty) + sum(Inv_stock.Stock_InQty) - sum(Inv_stock.Stock_OutQty))", "Quantity", "Quantity", 15)
                .AddCol("Mst_GroupMain.GrpName", "GrpName", "Group", 20)
                .AddCol("Mst_SubGroupMain.SbgrpName", "SbgrpName", "Sub Group", 20)
                 .AddCol("Mst_Category.CategoryName", "CategoryName", "Category", 20)
                .AddCol("Mst_SubCategory.SubCategoryName", "SubCategoryName", "Subcategory", 20)
                .AddCol("Mst_Department.DepartmentName", "Department", "Department", 15)
                .AddCol("Mst_item.SellingPrice", "SellingPrice", "Selling Price", 15, ABDataColType.Numeric)
                 .AddCol("Mst_item.AvgCost", "AvgCost", "Average Cost", 15, ABDataColType.Numeric)


                .AddCol("Mst_item.OpenQty", "OpenQty", "Opening Qty", -1, ABDataColType.Numeric)
                .AddCol("Mst_Item.Active", "Active", "Active", -1)
                 .AddCol("Mst_Item.ItemId", "View", "View", -1)
                 //.AddCol("Inv_InventoryTransaction.IMEI_Number", "IMEI_Number", "IMEI_Number", -1)
                .AddCol("CASE WHEN Active = 1 THEN 'Active' ELSE 'In Active' END", "Status", "Status", 15)
                .AddDefaultSort("ItemId")
                .AddTableSection(@"Mst_Item 
		                        INNER JOIN Mst_UnitMain on Mst_Item.UnitId = Mst_UnitMain.UnitId
		                        INNER JOIN Mst_Tax on Mst_Item.VatId = Mst_Tax.TaxId
		                        INNER JOIN Mst_GroupMain on Mst_Item.GroupId = Mst_GroupMain.GrpId
                                 LEFT OUTER JOIN Inv_Stock on Inv_Stock.Stock_Item_Id=Mst_Item.ItemId
                               
                                LEFT OUTER JOIN Mst_Department on Inv_Stock.Stock_deptId=Mst_Department.DepartmentId
		                        LEFT OUTER JOIN Mst_SubGroupMain on Mst_Item.SubGroupId = Mst_SubGroupMain.SbgrpId
		                        LEFT OUTER JOIN Mst_Category on Mst_Item.CategoryId = Mst_Category.CategoryId
		                        LEFT OUTER JOIN Mst_SubCategory on Mst_Item.SubCategoryId = Mst_SubCategory.SubCategoryId")
               .AddWhere("Mst_Item.DelFlag = 1  group by Inv_stock.Stock_deptId,Inv_stock.Stock_Item_Id,Mst_Item.ItemId,Mst_Item.ItemCode,Mst_Item.[Description],Mst_UnitMain.UnitName,Mst_GroupMain.GrpName,Mst_SubGroupMain.SbgrpName,Mst_Category.CategoryName, Mst_SubCategory.SubCategoryName, Mst_item.SellingPrice, Mst_item.AvgCost,Mst_item.OpenQty,Mst_Item.Active,Mst_Department.DepartmentName")

                .AddDownloadName("MobileStockQueryDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}