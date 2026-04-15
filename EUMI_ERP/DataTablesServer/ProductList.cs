using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.IO.Pipes;
using System.Linq;
using System.Net.Http.Headers;
using System.Web;

namespace EUMI_ERP.DataTablesServer
{
    public class ProductList
    {
        public QueryBuilder<string> builder = new QueryBuilder<string>();
        public void Configure(Models.ABDataTableModel<string> model)
        {
            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("Mst_Item.ItemId", "ItemId", "Item Id", -1)
                .AddCol("Mst_Item.ItemCode", "ItemCode", "Item Code", 15)
                .AddCol("Mst_Item.[Description]", "Description", "Description", 30)
                .AddCol("Mst_UnitMain.UnitName", "UnitName", "Unit Name", 15)
                .AddCol("Mst_GroupMain.GrpName", "GrpName", "Group Name", 20)
                .AddCol("Mst_SubGroupMain.SbgrpName", "SbgrpName", "Sub Group Name", 20)
                .AddCol("Mst_Category.CategoryName", "CategoryName", "Category Name", 20)
                .AddCol("Mst_SubCategory.SubCategoryName", "SubCategoryName", "Sub Category Name", 20)
                .AddCol("Mst_item.SellingPrice", "SellingPrice", "Selling Price", 15, ABDataColType.Numeric)
                 .AddCol("Mst_item.AvgCost", "AvgCost", "Average Cost", 15, ABDataColType.Numeric)
                .AddCol("Mst_Item.Active", "Active", "Active", -1)
                 .AddCol("Mst_item.GroupId", "GroupId", "GroupId", -1)
                 .AddCol("Mst_item.CategoryId", "CategoryId", "CategoryId", -1)
                 .AddCol("Mst_item.SubGroupId", "SubGroupId", "SubGroupId", -1)
                 
                .AddCol("CASE WHEN Active = 1 THEN 'Active' ELSE 'In Active' END", "Status", "Status", 15)
                .AddDefaultSort("ItemId")
                .AddTableSection(@"Mst_Item 
		INNER JOIN Mst_UnitMain on Mst_Item.UnitId = Mst_UnitMain.UnitId
		INNER JOIN Mst_Tax on Mst_Item.VatId = Mst_Tax.TaxId
		INNER JOIN Mst_GroupMain on Mst_Item.GroupId = Mst_GroupMain.GrpId
		LEFT OUTER JOIN Mst_SubGroupMain on Mst_Item.SubGroupId = Mst_SubGroupMain.SbgrpId
		LEFT OUTER JOIN Mst_Category on Mst_Item.CategoryId = Mst_Category.CategoryId
		LEFT OUTER JOIN Mst_SubCategory on Mst_Item.SubCategoryId = Mst_SubCategory.SubCategoryId")
                .AddWhere("Mst_Item.DelFlag = 1")
                .AddDownloadName("ProductItemList");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}