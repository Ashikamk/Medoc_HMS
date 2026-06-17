using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class ItemWiseEleSales
    {
        public QueryBuilder<EleReportModel> builder = new QueryBuilder<EleReportModel>();
        public void Configure(ABDataTableModel<EleReportModel> model)
        {
            model.order.Clear();
            //System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
           // System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search = string.Format(@"
                   
                     ISNULL([S].GroupId, 0) = COALESCE(NULLIF({0}, 0), [S].GroupId, 0)
                    AND ISNULL([S].SubGroupId, 0) = COALESCE(NULLIF({1}, 0), [S].SubGroupId, 0)
                    AND ISNULL([S].CategoryId, 0) = COALESCE(NULLIF({2}, 0), [S].CategoryId, 0)
                    AND ISNULL([S].SubCategoryId, 0) = COALESCE(NULLIF({3}, 0), [S].SubCategoryId, 0)and S.DelFlag=1",
                    // AND ISNULL([S].DeptId, 0) = COALESCE(NULLIF({10}, 0),[S].DeptId, 0) and S.DelFlag=1 and SS.DelFlag=1",
                    // model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    // model.addData.dateTo.ToString("yyyy-MM-dd"),
                    // model.addData.Area,
                    // model.addData.Paytype,
                    //  model.addData.SalesamanId,
                    //  model.addData.CustId,
                    model.addData.GroupId,
                    model.addData.SubGroupId,
                    model.addData.CategoryId,
                    model.addData.SubCategoryId);
                   // model.addData.DepartmentId);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                //.AddCol("S.BillSeriesId", "BillSeriesId", "BillSeriesId", -1)
               // .AddCol("B.BillDescription", "BillSeries", "Bill Series", 20)
               // .AddCol("S.BillSlNo", "BillSlNo", "Bill SlNo", 20)
               // .AddCol("S.InvDate", "InvDate", "Invo Date", 20)
               // .AddCol("S.CustoName", "Customer", "Customer", 15)
               // .AddCol("SM.FirstName", "Salesman", "Salesman", 15)
                .AddCol("S.ItemCode", "ProductCode", "Product Code", 20)
                .AddCol("S.Description", "ProductDescription", "Product Name", 30)
                .AddCol("U.UnitName", "UnitName", "Unit", 30)
               // .AddCol("SS.ProdQty", "Quantity", "Quantity", 15)
              //  .AddCol("A.Name", "Area", "Area", 20)
               // .AddCol("L.LocationName", "LocationName", "Location", 20)
               // .AddCol("T.TermDescription", "TermDescription", "Terms", 30)
               // .AddCol("P.Payterms", "Payterms", "Pay Type", 20)
                //.AddCol("J.JobCode", "JobCode", "Job Code", 30)
                 //.AddCol("J.LPO", "LPO", "LPO Number", 30)
               // .AddCol("SS.TaxableAmount", "TaxableAmount", "Taxable Amount", 20)
               // .AddCol("SS.TaxAmount", "TaxAmount", "Tax Amount", 20)
                //.AddCol("SS.Amount", "Amount", "Amount", 20)
               // .AddCol("C.CurrencyName", "CurrencyName", "Currency", 20)
               // .AddCol("SS.CurncyRate", "CurrencyRate", "Currency Rate", 20)
               // .AddCol("SS.FCAmount", "FCAmount", "FCAmount", 20)
                 .AddCol("G.GrpName", "GrpName", "Group", 20)
                 .AddCol("SG.SbgrpName", "SbgrpName", "Sub Group", 20)
                 .AddCol("CAT.CategoryName", "CategoryName", "Category", 20)
                 .AddCol("SC.SubCategoryName", "SubCategoryName", "Sub Category", 20)
                // .AddCol("S.DeptId", "DeptId", "DeptId", -1)
              //  .AddCol("D.DepartmentName", "DepartmentName", "Department Name", 20)
              //  .AddCol("SUM(SS.ProdQty) OVER ()", "_quantity", "Quantity", -1)
               // .AddCol("SUM(SS.TaxableAmount) OVER ()", "_taxableamount", "Total Taxable", -1)
              //  .AddCol("SUM(SS.TaxAmount) OVER ()", "_taxamount", "Total Tax", -1)
               // .AddCol("SUM(SS.Amount) OVER ()", "_amount", "Amount", -1)
              //  .AddCol("SUM(SS.FCAmount) OVER ()", "_fcamount", "FCAmount", -1)
                 .AddDefaultSort("ProductCode")
                .AddTableSection(string.Format(@"Mst_Item S 
                                             
                            left join Mst_GroupMain G on S.GroupId=G.GrpId                      
                            left join Mst_SubGroupMain SG on S.SubGroupId=SG.SbgrpId                      
                            left join Mst_Category CAT on S.CategoryId=CAT.CategoryId                      
                            left join Mst_SubCategory SC on S.SubCategoryId=SC.SubCategoryId 
                            
                            left join Mst_UnitMain U on S.UnitId=U.UnitId"))
                .AddWhere(search)
                .AddDownloadName("ItemwiseSalesDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}