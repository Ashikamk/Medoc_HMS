using EUMI_ERP.DataTablesServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace EUMI_ERP.DReports
{
    public class StockQuery_UsedCars
    {

        public QueryBuilder<string> builder = new QueryBuilder<string>();
        public void Configure(Models.ABDataTableModel<string> model)
        {

            builder.AddModel(model).AddSlnoCaption("Serial#", 10)

                    .AddCol("Mst_Item.ItemId", "ItemId", "Item Id", -1)
                    .AddCol("Mst_Item.ItemCode", "ItemCode", "Item Code", 15)
                    .AddCol("Mst_Item.[Description]", "Description", "Description", 30)
                    .AddCol("Mst_GroupMain.GrpName", "GrpName", "Group", 20)
                    .AddCol("Mst_SubGroupMain.SbgrpName", "SbgrpName", "Sub Group", 20)

                    .AddCol("Mst_item.BinF", "Model", "Model", 15)
                    .AddCol("Mst_item.Model3", "Color", "Color", 15)
                      .AddCol("Mst_item.BinE", "Year", "Year", 15)
                    .AddCol("(sum(Inv_stock.Stock_OpeningQty) + sum(Inv_stock.Stock_InQty) - sum(Inv_stock.Stock_OutQty))", "Stock", "Stock", 15)
                    .AddCol("Mst_item.SellingPrice", "Price", "Price", 10, ABDataColType.Numeric)
                   
                    .AddCol("Mst_item.Model1", "ContainerNo", "Container Number", 15)
                    .AddCol("Mst_Category.CategoryName", "Auction", "Auction", 15)
                     .AddCol("Mst_SubCategory.SubCategoryName", "City", "City", 20)
                    .AddCol("Mst_item.Model2", "LotNo", "Lot Number",15)
                     .AddCol("Mst_item.AvgCost", "Cost", "Cost", 15, ABDataColType.Numeric)
                    .AddCol("Mst_Item.ItemId", "View", "View", -1)
                     //.AddCol("Mst_Item.ItemId", "VCCPaid", "VCCPaid", -1)
                    .AddCol("Mst_item.GroupId", "GroupId", "GroupId", -1)
                    .AddCol("Mst_item.CategoryId", "CategoryId", "CategoryId", -1)
                    .AddCol("Mst_item.OpenQty", "OpenQty", "Opening Qty", -1, ABDataColType.Numeric)
                    .AddCol("Mst_item.OpeningCost", "OpeningCost", "Opening Cost", -1, ABDataColType.Numeric)
                    .AddCol("Mst_Item.VCCFlag", "VCCFlag", "VCCFlag", -1)
                     .AddCol("CASE WHEN VCCFlag = 1 THEN 'YES' WHEN VCCFlag = 0 then 'NO' ELSE '' END", "Status", "Status", 10)

                .AddDefaultSort("ItemId")
                .AddTableSection(@"Mst_Item 
		                        INNER JOIN Mst_GroupMain on Mst_Item.GroupId = Mst_GroupMain.GrpId
                                LEFT OUTER JOIN Inv_Stock on Inv_Stock.Stock_Item_Id=Mst_Item.ItemId
                                LEFT OUTER JOIN Mst_Department on Inv_Stock.Stock_deptId=Mst_Department.DepartmentId
		                        LEFT OUTER JOIN Mst_SubGroupMain on Mst_Item.SubGroupId = Mst_SubGroupMain.SbgrpId
                                LEFT OUTER JOIN Mst_Category on Mst_Item.CategoryId = Mst_Category.CategoryId
                                LEFT OUTER JOIN Mst_SubCategory on Mst_Item.SubCategoryId = Mst_SubCategory.SubCategoryId")
               .AddWhere("Mst_Item.DelFlag = 1 group by Mst_Item.ItemId,Mst_Item.ItemCode,Mst_Item.[Description],Mst_GroupMain.GrpName,Mst_SubGroupMain.SbgrpName,Mst_item.BinF,Mst_item.Model3,Mst_item.SellingPrice,Mst_item.AvgCost,Mst_item.Model1,Mst_Category.CategoryName,Mst_item.BinE,Mst_SubCategory.SubCategoryName,Mst_item.Model2,Mst_item.OpenQty,Mst_item.OpeningCost,Mst_item.GroupId,Mst_item.CategoryId,Mst_Item.VCCFlag")


               .AddDownloadName("StockQuery_UsedCarsDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }


    }
}