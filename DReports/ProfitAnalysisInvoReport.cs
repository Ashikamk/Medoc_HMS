using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class ProfitAnalysisInvoReport
    {
        public QueryBuilder<ProfitAnalysisReport> builder = new QueryBuilder<ProfitAnalysisReport>();
        public void Configure(ABDataTableModel<ProfitAnalysisReport> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search = string.Format(@"CONVERT(DATETIME, [S].InvDate, 103) >= '{0}' AND CONVERT(DATETIME, [S].InvDate, 103) <= '{1}'
                    AND ISNULL([S].AreaId, 0) = COALESCE(NULLIF({2}, 0), [S].AreaId, 0)
                    AND ISNULL([S].SalesManId, 0) = COALESCE(NULLIF({3}, 0), [S].SalesManId, 0)
                    AND ISNULL([S].CustId, 0) = COALESCE(NULLIF({4}, 0), [S].CustId, 0)
                    AND ISNULL([C].AccountType, 0) = COALESCE(NULLIF({5}, 0),[C].AccountType, 0) and S.DelFlag=1",
                    model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),
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
                .AddCol("S.TotalTaxable", "SalesValue", "Sales Value", 15)
                .AddCol("S.TotalTax", "VATAmount", "VAT Amount", 15)
                .AddCol("S.GrandTotal", "Amount", "Net Sales Value", 15)
                .AddCol("S.TotalCost", "Cost", "Cost", 15)
                .AddCol("(S.TotalTaxable-S.TotalCost)", "Profit", "Profit", 15)
                .AddCol("case when (S.TotalCost>S.GrandTotal) then 0 when S.TotalTaxable=0 then 0 else (((S.TotalTaxable-S.TotalCost)/S.TotalTaxable) * 100) end", "Profitpercentage", "Profit%", 15)
                  .AddCol("S.DeptId", "DeptId", "DeptId", -1)
                .AddCol("SUM(S.GrandTotal) OVER ()", "_TaxableAmount", "Sales Value", -1)
                .AddCol("SUM(S.TotalTax) OVER ()", "_TaxAmount", "VAT Amount", -1)
                .AddCol("SUM(S.TotalTaxable) OVER ()", "_Amount", "Net Sales Value", -1)
                .AddCol("SUM(S.TotalCost) OVER ()", "_ProdRate", "Cost", -1)
                 .AddCol("SUM((S.TotalTaxable-S.TotalCost)) OVER ()", "_Profit", "Profit", -1)
                 .AddDefaultSort("BillSlNo")
                .AddTableSection(string.Format(@"Inv_SalesMain S 
                             left join Mst_Billseries B on S.BillSeriesId = B.id 
                             left join Mst_CustomerMain C on S.CustId = C.CustId      
                            left join Mst_Salesman SM on S.SalesManId = SM.Id"))
                .AddWhere(search + "AND S.DeptId in (select DeptId from Mst_UserDeptDivision where UserId =" + model.addData.UserId + ")")
                .AddDownloadName("ProfitAnalysisInvoicewiseDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}