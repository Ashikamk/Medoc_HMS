using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;
using EUMI_ERP.DataTablesServer;

namespace EUMI_ERP.DReports
{
    public class MonthwiseSales
    {

        public QueryBuilder<SalesReportModel> builder = new QueryBuilder<SalesReportModel>();
        public void Configure(ABDataTableModel<SalesReportModel> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());
            var search = string.Format(@"CONVERT(DATETIME, [S].InvDate, 103) >= '{0}' AND CONVERT(DATETIME, [S].InvDate, 103) <= '{1}' and S.DelFlag=1",
                 model.addData.dateFrom.ToString("yyyy-MM-dd"),
                 model.addData.dateTo.ToString("yyyy-MM-dd"),
                 model.addData.UserId);
            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
         .AddCol("S.BillSeriesId", "BillSeriesId", "BillSeriesId", -1)
            .AddCol("cast(B.BillDescription as varchar(50)) + '-' + cast(S.BillSlNo as varchar(50))", "BillSeries", "Bill Series", 20)
              .AddCol("S.BillSlNo", "BillSlNo", "Bill SlNo", 20)
              .AddCol("S.InvDate", "InvDate", "Invo Date", 20)
               .AddCol("C.CustAccount", "AccCode", "AccCode", 15)
              .AddCol("S.CustoName", "Customer", "Customer", 15)
              .AddCol("S.CustAddress", "CustAddress", "Customer Details", 15)
            .AddCol("S.TotalTaxable", "TotalTaxable", "Taxable Amount", 30)
            .AddCol("S.TotalTax", "TotalTax", "Tax Amount", 30)
            .AddCol("S.GrandTotal", "GrandTotal", "Amount", 20)
            .AddCol("CUR.CurrencyName", "Currency", "Currency", 20)
            .AddCol("CUR.CurrencyRate", "Rate", "Rate", 20)
            .AddCol("S.FCGrandTotal", "FCTotal", "FC Amount", 20)
              .AddCol("S.DeptId", "DeptId", "DeptId", -1)
            .AddCol("SUM(S.TotalTaxable) OVER ()", "_totaltaxable", "Total Taxable", -1)
            .AddCol("SUM(S.TotalTax) OVER ()", "_totaltax", "Total Tax", -1)
            .AddCol("SUM(S.GrandTotal) OVER ()", "_basetotal", "Base Total", -1)
            .AddCol("SUM(S.FCGrandTotal) OVER ()", "_fctotal", "FCTotal", -1)
            .AddDefaultSort("convert(datetime,InvDate,103),BillSlNo")
            .AddTableSection(string.Format(@"Inv_SalesMain S 
            left join Mst_Billseries B on S.BillSeriesId = B.id
             left join Mst_CustomerMain C on S.CustId = C.CustId
             LEFT JOIN Mst_Currency CUR on S.CurrencyId=CUR.Id"))
            .AddWhere(search + "AND S.DeptId in (select DeptId from Mst_UserDeptDivision where UserId =" + model.addData.UserId + ")")
            .AddDownloadName("SalesReportDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}