using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;
using EUMI_ERP.DataTablesServer;

namespace EUMI_ERP.DPurchaseReport
{
    public class MonthwiseReport
    {

        public QueryBuilder<PurchaseReportModel> builder = new QueryBuilder<PurchaseReportModel>();
        public void Configure(ABDataTableModel<PurchaseReportModel> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());
            var search = string.Format(@"CONVERT(DATETIME, [P].InvoDate, 103) >= '{0}' AND CONVERT(DATETIME, [P].InvoDate, 103) <= '{1}'",
                 model.addData.dateFrom.ToString("yyyy-MM-dd"),
                 model.addData.dateTo.ToString("yyyy-MM-dd"));
            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
            .AddCol("P.SlNo", "SerialNo", "Purchase SlNo", 20)
            .AddCol("P.InvoNo", "InvoNo", "Invo No", 20)
            .AddCol("P.InvoDate", "InvoDate", "Invo Date", 20)
            .AddCol("C.CustName", "CustName", "Supplier", 20)
            .AddCol("P.TotalTaxable", "TotalTaxable", "Taxable Amount", 30)
            .AddCol("P.TotalTax", "TotalTax", "Tax Amount", 30)
            .AddCol("P.BaseTotal", "BaseTotal", "Amount", 20)
            .AddCol("P.FCTotal", "FCTotal", "FC Amount", 20)            
            .AddCol("SUM(P.TotalTaxable) OVER ()", "_totaltaxable", "Total Taxable", -1)
            .AddCol("SUM(P.TotalTax) OVER ()", "_totaltax", "Total Tax", -1)
            .AddCol("SUM(P.BaseTotal) OVER ()", "_basetotal", "Base Total", -1)
            .AddCol("SUM(P.FCTotal) OVER ()", "_fctotal", "FCTotal", -1)
            .AddDefaultSort("SerialNo")
            .AddTableSection(string.Format(@"Inv_PurchaseMain P LEFT JOIN Mst_CustomerMain C ON P.SupplierId = C.CustId"))
            .AddWhere(search)
            .AddDownloadName("PurchaseReportDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
    }