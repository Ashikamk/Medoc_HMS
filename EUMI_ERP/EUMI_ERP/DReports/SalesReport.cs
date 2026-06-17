using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class SalesReport
    {
        public QueryBuilder<ReportModelSales> builder = new QueryBuilder<ReportModelSales>();
        public void Configure(ABDataTableModel<ReportModelSales> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search = string.Format(@"CONVERT(DATETIME, [S].InvDate, 103) >= '{0}' AND CONVERT(DATETIME, [S].InvDate, 103) <= '{1}'
                    AND ISNULL([S].AreaId, 0) = COALESCE(NULLIF({2}, 0), [S].AreaId, 0)
                    AND ISNULL([S].PayType, 0) = COALESCE(NULLIF({3}, 0), [S].PayType, 0)
                    AND ISNULL([S].SalesManId, 0) = COALESCE(NULLIF({4}, 0), [S].SalesManId, 0)
                    AND ISNULL([S].CustId, 0) = COALESCE(NULLIF({5}, 0), [S].CustId, 0)
                    AND ISNULL([S].DeptId, 0) = COALESCE(NULLIF({6}, 0),[S].DeptId, 0)
                    AND ISNULL([S].UserId, 0) = COALESCE(NULLIF({7}, 0),[S].UserId, 0) and S.DelFlag=1",
                    model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),
                    model.addData.Area,
                    model.addData.Paytype,
                    model.addData.SalesamanId,
                    model.addData.CustId,
                    model.addData.DepartmentId,
                    model.addData.UserId,
                    model.addData.User);

                  builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                 
                 .AddCol("S.BillSeriesId", "BillSeriesId", "BillSeriesId", -1)
                .AddCol("cast(B.BillDescription as varchar(50)) + '-' + cast(S.BillSlNo as varchar(50))", "BillSeries", "Bill Series", 20)
                .AddCol("S.BillSlNo", "BillSlNo", "Bill SlNo", -1)
                .AddCol("S.InvDate", "InvDate", "Invo Date", 15)
               .AddCol("CM.CustAccount", "AccCode", "AccCode", 15)

                .AddCol("S.CustoName", "Customer", "Customer", 30)
                .AddCol("SM.FirstName", "Salesman", "Salesman", 30)
                .AddCol("A.Name", "Area", "Area", 30)
                 .AddCol("L.LocationName", "LocationName", "Location", 15)
                .AddCol("T.TermDescription", "TermDescription", "Terms", 20)
                .AddCol("P.Payterms", "Payterms", "Pay Type", 20)
                .AddCol("J.JobCode", "JobCode", "Job Code", 20)
                .AddCol("S.LPONumber", "LPO", "LPO Number", 20)
                .AddCol("(S.TotalTaxable + S.BillDiscount)", "TaxableAmount", "Sales Value", 20)
                .AddCol("S.BillDiscount", "BillDiscount", "Discount", 20)
                .AddCol("S.TotalTaxable", "TaxableValue", "Taxable Amount", 20)
                .AddCol("S.TotalTax", "TaxAmount", "Tax Amount", 20)
                .AddCol("S.RoundGrandTotal", "RoundGrandTotal", "Roundoff", 20)
                .AddCol("case when(S.RoundGrandTotal > 0.500) then((S.GrandTotal - S.RoundGrandTotal) + 1) when (S.RoundGrandTotal)=0.500 then (ROUND((S.GrandTotal), 0, 1)+1)-1 when (S.RoundGrandTotal)=0 then S.GrandTotal when(S.RoundGrandTotal < 0.500 AND (RIGHT(GrandTotal,3)>500)) then ROUND((S.GrandTotal), 0, 1)+1 when(S.RoundGrandTotal < 0.500) then ROUND((S.GrandTotal), 0, 1) end", "Amount", "Sales Amount", 20)
                .AddCol("C.CurrencyName", "CurrencyName", "Currency", 20)
                .AddCol("S.CurrencyRate", "CurrencyRate", "Currency Rate", 20)
                .AddCol("S.FCGrandTotal", "FCAmount", "FCAmount", 20)
                 .AddCol("S.DeptId", "DeptId", "DeptId", -1)
                .AddCol("D.DepartmentName", "DepartmentName", "Department Name", 20)
                .AddCol("SUM(S.TotalTaxable) OVER ()", "_TaxableValue", "Total Taxable", -1)
                 .AddCol("SUM(S.BillDiscount) OVER ()", "_BillDiscount", "Discount", -1)
                 .AddCol("SUM((S.TotalTaxable+S.BillDiscount)) OVER ()", "_TaxableAmount", "Taxable Amount", -1)
                .AddCol("SUM(S.TotalTax) OVER ()", "_taxamount", "Total Tax", -1)
               .AddCol("SUM(S.RoundGrandTotal) OVER ()", "_RoundGrandTotal", "Roundoff", -1)
                .AddCol("SUM(case when(S.RoundGrandTotal > 0.500) then((S.GrandTotal - S.RoundGrandTotal) + 1) when (S.RoundGrandTotal)=0.500 then (ROUND((S.GrandTotal), 0, 1)+1)-1 when (S.RoundGrandTotal)=0 then S.GrandTotal when(S.RoundGrandTotal < 0.500 AND (RIGHT(GrandTotal,3)>500)) then ROUND((S.GrandTotal), 0, 1)+1  when(S.RoundGrandTotal < 0.500) then ROUND((S.GrandTotal), 0, 1) end) OVER ()", "_amount", "Amount", -1)
                .AddCol("SUM(S.FCGrandTotal) OVER ()", "_fcamount", "FCAmount", -1)
                 .AddDefaultSort("convert(datetime,InvDate,103),BillSlNo")
                .AddTableSection(string.Format(@"Inv_SalesMain S 
                            left join Mst_Department D on S.DeptId= D.DepartmentId        
                            left join Mst_Paytype P on S.PayType= P.PayId         
                            left join Mst_Salesman SM on S.SalesManId = SM.Id                      
                            left join Mst_Area A on S.AreaId = A.AreaId                      
                            left join Mst_Billseries B on S.BillSeriesId = B.id                      
                            left join Mst_Location L on S.LocId = L.LocationId                       
                            left join Mst_Currency C on S.CurrencyId = C.id                      
                            left join Mst_Terms T on S.InvTerms = T.TermsId                      
                            left join Mst_ProjectJob J on S.JobNumber=J.ProjectJobId
                            left join Mst_CustomerMain CM  on S.CustId = CM.CustId "))
                .AddWhere(search + "AND S.DeptId in (select DeptId from Mst_UserDeptDivision where UserId =" + model.addData.User + ")")
                .AddDownloadName("SalesReportDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}