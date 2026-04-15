using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace EUMI_ERP.DReports
{
    public class ProductionEntry
    {
        public QueryBuilder<ProductionEntryReport> builder = new QueryBuilder<ProductionEntryReport>();
        public void Configure(ABDataTableModel<ProductionEntryReport> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());


            var search = string.Format(@"CONVERT(DATETIME, [P].ProEntryDate, 103) >= '{0}' AND CONVERT(DATETIME, [P].ProEntryDate, 103) <= '{1}'
                     AND ISNULL([P].ProductionItemId, 0) = COALESCE(NULLIF({2}, 0), [P].ProductionItemId, 0)
                     AND ISNULL([P].ProjectJobId, 0) = COALESCE(NULLIF({3}, 0), [P].ProjectJobId, 0)
                     AND ISNULL([P].DeptId, 0) = COALESCE(NULLIF({4}, 0), [P].DeptId, 0) and P.DelFlag=1",
                    model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),
                    model.addData.Product,
                    model.addData.Jobcode,
                    model.addData.Department,
                    model.addData.UserId);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("P.ProEntryNo", "ProEntryNo", "Production No", 20)
                .AddCol("P.ProEntryDate", "ProEntryDate", "Date", 20)
                 .AddCol("I.ItemCode", "ItemCode", "Item Code", 20)
                .AddCol("I.Description", "ItemName", "Item Name", 20)
                .AddCol("L.LocationName", "LocationName", "Location", 15)
                .AddCol("P.ProductionQuantity", "ProductionQuantity", "Production Quantity", 15)
                .AddCol("P.CostPerItem", "CostPerItem", "Cost Per Item", 20)
                .AddCol("P.TotalProdCost", "TotalProdCost", "Total Production Cost", 30)
                .AddCol("P.TotalOtherCost", "TotalOtherCost", "Total Other Cost", 30)
                .AddCol("PJ.JobCode", "JobCode", "Job Code", 30)
                .AddCol("D.DepartmentName", "DepartmentName", "Department", 15)
                .AddCol("SUM(P.ProductionQuantity) OVER ()", "_ProductionQuantity", "Production Quantity", -1)
                .AddCol("SUM(P.CostPerItem) OVER ()", "_CostPerItem", "Cost Per Item", -1)
                .AddCol("SUM(P.TotalProdCost) OVER ()", "_TotalProdCost", "Total Production Cost", -1)
                .AddCol("SUM(P.TotalOtherCost) OVER ()", "_TotalOtherCost", "Total Other Cost", -1)
                 .AddDefaultSort("ProEntryNo")
                .AddTableSection(string.Format(@"Inv_ProductionEntryMain P
                            left join Mst_Item I on P.ProductionItemId= I.ItemId 
                            left join Mst_Location L on P.Location= L.LocationId 
                            left join Mst_ProjectJob PJ on P.ProjectJobId= PJ.ProjectJobId 
                            left join Mst_Department D on P.DeptId= D.DepartmentId"))
                .AddWhere(search + "AND P.DeptId in (select DeptId from Mst_UserDeptDivision where UserId =" + model.addData.UserId + ")")
                .AddDownloadName("ProductionEntryReportDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}