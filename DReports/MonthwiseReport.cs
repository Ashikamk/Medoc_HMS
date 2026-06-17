using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;
using EUMI_ERP.DataTablesServer;

namespace EUMI_ERP.DReports
{
    public class MonthwiseReport
    {

        public QueryBuilder<PurchaseReportModel> builder = new QueryBuilder<PurchaseReportModel>();
        public void Configure(ABDataTableModel<PurchaseReportModel> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());
            var search = string.Format(@"CONVERT(DATETIME, [P].InvoDate, 103) >= '{0}' AND CONVERT(DATETIME, [P].InvoDate, 103) <= '{1}' and P.DelFlag=1",
                 model.addData.dateFrom.ToString("yyyy-MM-dd"),
                 model.addData.dateTo.ToString("yyyy-MM-dd"),
                 model.addData.UserId);
            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
            .AddCol("P.SlNo", "SerialNo", "Purchase SlNo", 20)
            .AddCol("P.InvoNo", "InvoNo", "Invo No", 20)
            .AddCol("P.InvoDate", "InvoDate", "Invo Date", 20)
            .AddCol("C.CustAccount", "AccCode", "AccCode", 20)
            .AddCol("C.CustName", "CustName", "Supplier", 20)
            //.AddCol("SUM(IT.OtherCost)", "OtherCost", "Other Cost", 30)
            .AddCol("P.PurchaseType", "PurchaseType", "Purchase Type", 30)
            .AddCol("P.TotalTaxable", "TotalTaxable", "Taxable Amount", 30)
            .AddCol("P.TotalTax", "TotalTax", "Tax Amount", 30)
            .AddCol("P.BaseTotal", "BaseTotal", "Amount", 20)
            .AddCol("CUR.CurrencyName", "Currency", "Currency", 20)
            .AddCol("CUR.CurrencyRate", "Rate", "Rate", 20)
            .AddCol("P.FCTotal", "FCTotal", "FCTotal", 20)
            .AddCol("P.DepartmentId", "DeptId", "DeptId", -1)
             //.AddCol("SUM(SUM(IT.OtherCost)) OVER ()", "_othercost", "Other Cost", 20)
            .AddCol("SUM(P.TotalTaxable) OVER ()", "_totaltaxable", "Total Taxable", -1)
            .AddCol("SUM(P.TotalTax) OVER ()", "_totaltax", "Total Tax", -1)
            .AddCol("SUM(P.BaseTotal) OVER ()", "_basetotal", "Base Total", -1)
            .AddCol("SUM(P.FCTotal) OVER ()", "_fctotal", "FCTotal", -1)
            .AddDefaultSort("convert(datetime,InvoDate,103),SerialNo")
            .AddTableSection(string.Format(@"Inv_PurchaseMain P
                INNER join Inv_InventoryTransaction IT on P.SlNo=IT.BillNo AND P.InvoNo=IT.InvoiceNo AND P.DepartmentId=IT.DeptId
                LEFT JOIN Mst_CustomerMain C ON P.SupplierId = C.CustId
                LEFT JOIN Mst_Currency CUR on P.CurrencyId=CUR.Id "))
            .AddWhere(search + "AND P.DepartmentId in (select DeptId from Mst_UserDeptDivision where UserId =" + model.addData.UserId + ")  GROUP BY P.SlNo,P.InvoNo,P.InvoDate,C.CustAccount,C.CustName,P.TotalTaxable,P.TotalTax,P.BaseTotal,P.FCTotal,P.DepartmentId,CUR.CurrencyName,CUR.CurrencyRate,P.PurchaseType")
            .AddDownloadName("PurchaseReportDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
    }