using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class ProfitAnalysisItemReport
    {
        public QueryBuilder<ProfitAnalysisReport> builder = new QueryBuilder<ProfitAnalysisReport>();
        public void Configure(ABDataTableModel<ProfitAnalysisReport> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search = string.Format(@"CONVERT(DATETIME, [S].InvDate, 103) >= '{0}' AND CONVERT(DATETIME, [S].InvDate, 103) <= '{1}'
                     AND ISNULL([SS].ProductId, 0) = COALESCE(NULLIF({2}, 0), [SS].ProductId, 0)
                    AND ISNULL([S].AreaId, 0) = COALESCE(NULLIF({3}, 0), [S].AreaId, 0)
                    AND ISNULL([S].SalesManId, 0) = COALESCE(NULLIF({4}, 0), [S].SalesManId, 0)
                    AND ISNULL([S].CustId, 0) = COALESCE(NULLIF({5}, 0), [S].CustId, 0)
                    AND ISNULL([C].AccountType, 0) = COALESCE(NULLIF({6}, 0),[C].AccountType, 0) and S.DelFlag=1 and SS.DelFlag=1",
                    model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),
                     model.addData.Product,
                     model.addData.Area,
                    model.addData.Salesman,
                    model.addData.Customer,
                    model.addData.Account,
                    model.addData.UserId);


            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                 .AddCol("S.BillSeriesId", "BillSeriesId", "BillSeriesId", -1)
                .AddCol("B.BillDescription", "BillSeries", "Bill Series", 20)
                .AddCol("S.BillSlNo", "BillSlNo", "Bill SlNo", 20)
                .AddCol("S.InvDate", "InvDate", "Invo Date", 20)
                .AddCol("S.CustoName", "Customer", "Customer", 15)
                .AddCol("SM.FirstName", "Salesman", "Salesman", 15)
                .AddCol("SS.ProductCode", "ProductCode", "Product Code", 15)
                 .AddCol("SS.ProductDescr", "ProductDescr", "Product Name", 15)
                 .AddCol("SS.ProdQty", "ProdQty", "Quantity", 15)
                .AddCol("SS.TaxableAmount", "SalesValue", "Sales Value", 15)
                .AddCol("SS.TaxAmount", "VATAmount", "VAT Amount", 15)
                .AddCol("SS.Amount", "Amount", "Net Sales Value", 15)
                .AddCol("(SS.AverageCost * SS.ProdQty)", "Cost", "Cost", 15)
                .AddCol("(SS.TaxableAmount-(SS.AverageCost * SS.ProdQty))", "Profit", "Profit", 15)
                .AddCol("case when ((SS.AverageCost * SS.ProdQty)>SS.Amount) then 0 when SS.TaxableAmount=0 then 0 else (((SS.TaxableAmount-(SS.AverageCost * SS.ProdQty ))/SS.TaxableAmount) * 100) end", "Profitpercentage", "Profit%", 15)
                .AddCol("S.DeptId", "DeptId", "DeptId", -1)
                .AddCol("SUM(SS.ProdQty) OVER ()", "_ProdQty", "Quantity", -1)
                .AddCol("SUM(SS.Amount) OVER ()", "_Amount", "Sales Value", -1)
                .AddCol("SUM(SS.TaxAmount) OVER ()", "_TaxAmount", "VAT Amount", -1)
                .AddCol("SUM(SS.TaxableAmount) OVER ()", "_TaxableAmount", "Net Sales Value", -1)
                .AddCol("SUM(SS.AverageCost * SS.ProdQty) OVER ()", "_ProdRate", "Cost", -1)
                 .AddCol("SUM(SS.TaxableAmount-(SS.AverageCost * SS.ProdQty)) OVER ()", "_Profit", "Profit", -1)
                 .AddDefaultSort("BillSlNo")
                .AddTableSection(string.Format(@"Inv_SalesMain S 
                             inner join Inv_SalesSub SS on S.BillSeriesId = SS.BillSeriesId AND S.BillSlNo = SS.BillSlNo AND S.DeptId = SS.DeptId
                             left join Mst_Billseries B on S.BillSeriesId = B.id 
                             left join Mst_CustomerMain C on S.CustId = C.CustId 
                            left join Mst_Salesman SM on S.SalesManId = SM.Id"))
                .AddWhere(search + "AND S.DeptId in (select DeptId from Mst_UserDeptDivision where UserId =" + model.addData.UserId + ")")
                .AddDownloadName("ProfitAnalysisItemwiseDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}