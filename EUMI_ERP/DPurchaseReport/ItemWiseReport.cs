using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DPurchaseReport
{
    public class ItemWiseReport
    {
        public QueryBuilder<PurchaseReportModel> builder = new QueryBuilder<PurchaseReportModel>();
        public void Configure(ABDataTableModel<PurchaseReportModel> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search  = string.Format(@"CONVERT(DATETIME, [P].InvoDate, 103) >= '{0}' AND CONVERT(DATETIME, [P].InvoDate, 103) <= '{1}'
                    AND ISNULL([P].DepartmentId, 0) = COALESCE(NULLIF({2}, 0), [P].DepartmentId, 0)
                    AND ISNULL([P].PlaceofSupply, 0) = COALESCE(NULLIF({3}, 0), [P].PlaceofSupply, 0)
                    AND ISNULL([PS].LocationId, 0) = COALESCE(NULLIF({4}, 0), [PS].LocationId, 0)
                    AND ISNULL([P].SupplierId, 0) = COALESCE(NULLIF({5}, 0), [P].SupplierId, 0)
                    AND ISNULL([PS].JobNo, 0) = COALESCE(NULLIF({7}, 0), [PS].JobNo, 0)",
                    model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),
                    model.addData.DepartmentId,
                    model.addData.Area,
                    model.addData.LocnId,
                    model.addData.SupplierId,
                    model.addData.PurchaseType,
                    model.addData.JobNo);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("P.SlNo", "SerialNo", "Purchase No", 20)
                .AddCol("P.InvoNo", "InvoNo", "InvoNo", 20)
                .AddCol("P.InvoDate", "InvoDate", "Invo Date", 20)
                .AddCol("Cus.CustName", "Supplier", "Supplier Name", 15)
                .AddCol("PS.ItemCode", "ItemCode", "Product Code", 20)
                .AddCol("PS.ItemDescription", "ItemDescription", "Product Name", 30)
                .AddCol("PS.Quantity", "Quantity", "Quantity", 15)
                .AddCol("J.JobCode", "JobCode", "Job Code", 30)
                .AddCol("T.TermDescription", "TermDescription", "Terms", 30)
                .AddCol("A.Name", "Area", "Area", 20)
                .AddCol("L.LocationName", "LocationName", "Location", 20)
                .AddCol("P.PurchaseType", "PurchaseType", "Purchase Type", 20)
                .AddCol("PS.TaxableAmount", "TaxableAmount", "Taxable Amount", 20)
                .AddCol("PS.TaxAmount", "TaxAmount", "Tax Amount", 20)
                .AddCol("PS.Amount", "Amount", "Amount", 20)
                .AddCol("C.CurrencyName", "CurrencyName", "Currency Name", 20)
                .AddCol("PS.CurrencyRate", "CurrencyRate", "Currency Rate", 20)
                .AddCol("PS.FCAmount", "FCAmount", "FCAmount", 20)
                .AddCol("P.DueDate", "DueDate", "Due Date", 20)
                .AddCol("P.ShipDate", "ShipDate", "Ship Date", 20)
                 .AddCol("G.GrpName", "GrpName", "Group", 20)
                 .AddCol("SG.SbgrpName", "SbgrpName", "Sub Group", 20)
                 .AddCol("CAT.CategoryName", "CategoryName", "Category", 20)
                 .AddCol("SC.SubCategoryName", "SubCategoryName", "Sub Category", 20)
                .AddCol("D.DepartmentName", "DepartmentName", "Department Name", 20)
                .AddCol("SUM(PS.Quantity) OVER ()", "_quantity", "Quantity", -1)
                .AddCol("SUM(PS.TaxableAmount) OVER ()", "_taxableamount", "Total Taxable", -1)
                .AddCol("SUM(PS.TaxAmount) OVER ()", "_taxamount", "Total Tax", -1)
                .AddCol("SUM(PS.Amount) OVER ()", "_amount", "Amount", -1)
                .AddCol("SUM(PS.FCAmount) OVER ()", "_fcamount", "FCAmount", -1)
                 .AddDefaultSort("SerialNo")
                .AddTableSection(string.Format(@"Inv_PurchaseMain P 
                            left join Mst_CustomerMain Cus on P.SupplierId=Cus.CustId
                            left join Mst_Currency C on P.CurrencyId=C.Id
                            left join Mst_Location L on P.LocnId=L.LocationId
                            left join Mst_Area A on P.PlaceOfSupply=A.AreaId
                            left join Mst_Terms T on P.Terms=T.TermsId
                            left join Mst_Department D on P.DepartmentId=D.DepartmentId
                            inner join Inv_PurchaseSub PS on P.SlNo=PS.InvMainSlno
                            left join Mst_ProjectJob J on PS.JobNo=J.ProjectJobId
                            left join Mst_Item I on PS.ItemId = I.ItemId  
                            left join Mst_GroupMain G on I.GroupId=G.GrpId                      
                            left join Mst_SubGroupMain SG on I.SubGroupId=SG.SbgrpId                      
                            left join Mst_Category CAT on I.CategoryId=CAT.CategoryId                      
                            left join Mst_SubCategory SC on I.SubCategoryId=SC.SubCategoryId "))
                .AddWhere(search)
                .AddDownloadName("ItemWisePurchaseDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}