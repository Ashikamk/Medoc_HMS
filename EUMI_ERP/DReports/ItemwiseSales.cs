using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class ItemwiseSales
    {
        public QueryBuilder<SalesReportModel> builder = new QueryBuilder<SalesReportModel>();
        public void Configure(ABDataTableModel<SalesReportModel> model)
        {
            SalesReportModel obj1 = new SalesReportModel();
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search = string.Format(@"CONVERT(DATETIME, [S].InvDate, 103) >= '{0}' AND CONVERT(DATETIME, [S].InvDate, 103) <= '{1}'
                    AND ISNULL([S].AreaId, 0) = COALESCE(NULLIF({2}, 0), [S].AreaId, 0)
                    AND ISNULL([S].PayType, 0) = COALESCE(NULLIF({3}, 0), [S].PayType, 0)
                    AND ISNULL([S].SalesManId, 0) = COALESCE(NULLIF({4}, 0), [S].SalesManId, 0)
                    AND ISNULL([S].CustId, 0) = COALESCE(NULLIF({5}, 0), [S].CustId, 0)
                     AND ISNULL([I].GroupId, 0) = COALESCE(NULLIF({6}, 0), [I].GroupId, 0)
                    AND ISNULL([I].SubGroupId, 0) = COALESCE(NULLIF({7}, 0), [I].SubGroupId, 0)
                    AND ISNULL([I].CategoryId, 0) = COALESCE(NULLIF({8}, 0), [I].CategoryId, 0)
                    AND ISNULL([I].SubCategoryId, 0) = COALESCE(NULLIF({9}, 0), [I].SubCategoryId, 0)
                    AND ISNULL([S].DeptId, 0) = COALESCE(NULLIF({10}, 0),[S].DeptId, 0)
                    and  S.DelFlag=1 and SS.DelFlag=1",
                    model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),
                    model.addData.Area,
                    model.addData.Paytype,
                    model.addData.SalesamanId,
                    model.addData.CustId,
                    model.addData.GroupId,
                    model.addData.SubGroupId,
                    model.addData.CategoryId,
                    model.addData.SubCategoryId,
                    model.addData.DepartmentId,
                    model.addData.UserId);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("S.BillSeriesId", "BillSeriesId", "BillSeriesId", -1)
                .AddCol("cast(B.BillDescription as varchar(50)) + '-' + cast(S.BillSlNo as varchar(50))", "BillSeries", "Bill Series", 20)
                .AddCol("S.BillSlNo", "BillSlNo", "Bill SlNo", -1)
                .AddCol("S.InvDate", "InvDate", "Invo Date", 20)
                 .AddCol("CM.CustAccount", "AccCode", "AccCode", 15)

                .AddCol("S.CustoName", "Customer", "Customer", 15)
                .AddCol("SM.FirstName", "Salesman", "Salesman", 15)
                .AddCol("SS.ProductCode", "ProductCode", "Product Code", 20)
                .AddCol("SS.ProductDescr", "ProductDescription", "Product Name", 30)
                .AddCol("U.UnitName", "UnitName", "Unit", 30)
                .AddCol("SS.ProdQty", "Quantity", "Quantity", 15)
                .AddCol("SS.ProdRate", "ProdRate", "Unit Price", 15)
                .AddCol("A.Name", "Area", "Area", 20)
                .AddCol("L.LocationName", "LocationName", "Location", 15)
                .AddCol("T.TermDescription", "TermDescription", "Terms", 30)
                .AddCol("P.Payterms", "Payterms", "Pay Type", 20)
                .AddCol("J.JobCode", "JobCode", "Job Code", 30)
                .AddCol("J.LPO", "LPO", "LPO Number", 30)
                .AddCol("SS.ProdDisc", "ProdDisc", "ProdDisc", 20)
                .AddCol("SS.TaxableAmount", "TaxableAmount", "Taxable Amount", 20)
                .AddCol("SS.TaxAmount", "TaxAmount", "Tax Amount", 20)
                .AddCol("SS.Amount", "Amount", "Amount", 20)
                .AddCol("C.CurrencyName", "CurrencyName", "Currency", 20)
                .AddCol("SS.CurncyRate", "CurrencyRate", "Currency Rate", 20)
                .AddCol("SS.FCAmount", "FCAmount", "FCAmount", 20)
                .AddCol("G.GrpName", "GrpName", "Group", 20)
                .AddCol("SG.SbgrpName", "SbgrpName", "Sub Group", 20)
                .AddCol("CAT.CategoryName", "CategoryName", "Category", 20)
                .AddCol("SC.SubCategoryName", "SubCategoryName", "Sub Category", 20)
                .AddCol("S.DeptId", "DeptId", "DeptId", -1)
                .AddCol("D.DepartmentName", "DepartmentName", "Department Name", 20)
                .AddCol("SUM(SS.ProdQty) OVER ()", "_quantity", "Quantity", -1)
                .AddCol("SUM(SS.ProdRate) OVER ()", "_ProdRate", "Unit Price", -1)
                .AddCol("SUM(SS.TaxableAmount) OVER ()", "_taxableamount", "Total Taxable", -1)
                .AddCol("SUM(SS.TaxAmount) OVER ()", "_taxamount", "Total Tax", -1)
                 .AddCol("SUM(SS.ProdDisc) OVER ()", "_discount", "ProdDisc", -1)
                .AddCol("SUM(SS.Amount) OVER ()", "_amount", "Amount", -1)
                .AddCol("SUM(SS.FCAmount) OVER ()", "_fcamount", "FCAmount", -1)
                 .AddDefaultSort("convert(datetime,InvDate,103),BillSlNo")
                .AddTableSection(string.Format(@"Inv_SalesMain S 
                            inner join Inv_SalesSub SS on S.BillSlNo=SS.BillSlNo AND S.BillSeriesId=SS.BillSeriesId and  S.DeptId =SS.DeptId
                            left join Mst_Department D on S.DeptId= D.DepartmentId        
                            left join Mst_Paytype P on S.PayType= P.PayId         
                            left join Mst_Salesman SM on S.SalesManId = SM.Id                      
                            left join Mst_Area A on S.AreaId = A.AreaId                      
                            left join Mst_Billseries B on S.BillSeriesId = B.id                      
                            left join Mst_Location L on S.LocId = L.LocationId             
                            left join Mst_Currency C on S.CurrencyId = C.id                      
                            left join Mst_Terms T on S.InvTerms = T.TermsId                      
                            left join Mst_Item I on SS.ProductId = I.ItemId                      
                            left join Mst_GroupMain G on I.GroupId=G.GrpId                      
                            left join Mst_SubGroupMain SG on I.SubGroupId=SG.SbgrpId                      
                            left join Mst_Category CAT on I.CategoryId=CAT.CategoryId                      
                            left join Mst_SubCategory SC on I.SubCategoryId=SC.SubCategoryId 
                            left join Mst_ProjectJob J on S.JobNumber=J.ProjectJobId
                            left join Mst_UnitMain U on SS.UnitId=U.UnitId
                              left join Mst_CustomerMain CM  on S.CustId = CM.CustId"))
                .AddWhere(search + "AND S.DeptId in (select DeptId from Mst_UserDeptDivision where UserId ="+ model.addData.UserId + ")")
                .AddDownloadName("ItemwiseSalesDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}