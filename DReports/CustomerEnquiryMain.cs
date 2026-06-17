using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class CustomerEnquiryMain
    {
        //public QueryBuilder<ReportModel> builder = new QueryBuilder<ReportModel>();
        //public void Configure(ABDataTableModel<ReportModel> model)
        //{
        //    model.order.Clear();
        //    System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
        //    System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

        //    var search = string.Format(@"CONVERT(DATETIME, [CE].InvDate, 103) >= '{0}' AND CONVERT(DATETIME, [CE].InvDate, 103) <= '{1}'
        //            AND ISNULL([CE].EnquiryNo, 0) = COALESCE(NULLIF({2}, 0), [CE].EnquiryNo, 0)
        //            AND ISNULL([CE].CustoName, 0) = COALESCE(NULLIF({3}, 0), [CE].CustoName, 0)
        //            AND ISNULL([CE].DeptId, 0) = COALESCE(NULLIF({4}, 0),[CE].DeptId, 0) and CE.DelFlag=1",
        //            model.addData.dateFrom.ToString("yyyy-MM-dd"),
        //            model.addData.dateTo.ToString("yyyy-MM-dd"),
        //            model.addData.InvoiceNo,
        //            model.addData.Customer,
        //            model.addData.Department);

        //    builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
        //        .AddCol("CE.EnquiryNo", "EnquiryNo", "Enquiry Number", -1)
        //        .AddCol("CE.InvDate", "InvDate", "Date", 20)
        //        .AddCol("CE.CustoName", "Customer", "Customer", 20)
        //        .AddCol("S.FirstName", "Salesman", "Salesman", 20)
        //        .AddCol("CE.TotalTaxable", "TaxableAmount", "Taxable Amount", 15)
        //        .AddCol("CE.TotalTax", "TaxAmount", "Tax Amount", 15)
        //        .AddCol("CE.GrandTotal", "Amount", "Amount", 20)
        //        .AddCol("D.DepartmentName", "DepartmentName", "Department", 30)
               
        //        .AddCol("SUM(CE.TotalTaxable) OVER ()", "_TotalTaxable", "Taxable Amount", -1)
        //        .AddCol("SUM(CE.TotalTax) OVER ()", "_TotalTax", "Tax Amount", -1)
        //        .AddCol("SUM(CE.GrandTotal) OVER ()", "_Amount", "Amount", -1)
        //         .AddDefaultSort("EnquiryNo")
        //        .AddTableSection(string.Format(@"Inv_CustomerEnquiryMain CE
        //                   inner join Mst_Salesman S on CE.SalesManId=S.Id
        //                   inner join Mst_Department D on CE.DeptId=D.DepartmentId"))
        //        .AddWhere(search)
        //        .AddDownloadName("CustomerEnquiryMainDownload");
        //}
        //public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        //{
        //    return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        //}
    }
}