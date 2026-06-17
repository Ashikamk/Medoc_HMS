using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
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
                    AND ISNULL([IT].LocationId, 0) = COALESCE(NULLIF({4}, 0), [IT].LocationId, 0)
                    AND ISNULL([P].SupplierId, 0) = COALESCE(NULLIF({5}, 0), [P].SupplierId, 0)
                    AND ISNULL([P].PayType, 0) = COALESCE(NULLIF({6}, 0), [P].PayType, 0)
                    AND ISNULL([IT].JobId, 0) = COALESCE(NULLIF({7}, 0), [IT].JobId, 0) and P.DelFlag=1 and IT.DelFlag=1",
                    model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),
                    model.addData.DepartmentId,
                    model.addData.Area,
                    model.addData.LocnId,
                    model.addData.SupplierId,
                    model.addData.PayType,
                    model.addData.JobNo,
                    model.addData.UserId);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("P.SlNo", "SerialNo", "Invoice Number", 20)
                .AddCol("P.InvoNo", "InvoNo", "Supplier Invoice Number", 20)
                .AddCol("P.InvoDate", "InvoDate", "Date", 20)
                .AddCol("Cus.CustAccount", "AccCode", "AccCode", 20)
                .AddCol("Cus.CustName", "Supplier", "Supplier", 15)
                .AddCol("IT.ItemCode", "ItemCode", "Item Code", 20)
                .AddCol("IT.ItemDescription", "ItemDescription", "Item Name", 30)
                .AddCol("IT.Quantity", "Quantity", "Quantity", 15)
                .AddCol("IT.Cost", "Cost", "Unit Rate", 15)
                .AddCol("I.MrpRate", "MRP", "MRP", 15)
                 .AddCol("I.Model1", "Model1", "Model1", 30)
                .AddCol("J.JobCode", "JobCode", "Job Code", 30)
                .AddCol("T.TermDescription", "TermDescription", "Terms", 30)
                .AddCol("A.Name", "Area", "Area", 20)
                .AddCol("L.LocationName", "LocationName", "Location", 20)
                .AddCol("PT.Payterms", "PayType", "Pay Type", 20)
                .AddCol("P.PurchaseType", "PurchaseType", "Purchase Type", 20)
                .AddCol("IT.OtherCost", "OtherCost", "Other Cost", 20)
                .AddCol("IT.TaxableAmt", "TaxableAmount", "Taxable Amount", 20)
                .AddCol("IT.TaxAmt", "TaxAmount", "Tax Amount", 20)
                .AddCol("IT.LineTotal", "Amount", "Amount", 20)
                .AddCol("C.CurrencyName", "CurrencyName", "Currency", 20)
                .AddCol("IT.CurrencyRate", "CurrencyRate", "Rate", 20)
                .AddCol("IT.FCLineTotal", "FCAmount", "FCAmount", 20)
                .AddCol("P.DueDate", "DueDate", "Due Date", 20)
                .AddCol("P.ShipDate", "ShipDate", "Ship Date", 20)
                 .AddCol("G.GrpName", "GrpName", "Group", 20)
                 .AddCol("SG.SbgrpName", "SbgrpName", "Sub Group", 20)
                 .AddCol("CAT.CategoryName", "CategoryName", "Category", 20)
                 .AddCol("SC.SubCategoryName", "SubCategoryName", "Sub Category", 20)
                .AddCol("D.DepartmentName", "DepartmentName", "Department Name", 20)
                 .AddCol("P.DepartmentId", "DeptId", "DeptId", -1)
                .AddCol("SUM(IT.Quantity) OVER ()", "_quantity", "Quantity", -1)
                 .AddCol("SUM(IT.Cost) OVER ()", "_Cost", "Unit Rate", -1)
                .AddCol("SUM(IT.OtherCost) OVER ()", "_othercost", "Other Cost", -1)
                .AddCol("SUM(IT.TaxableAmt) OVER ()", "_taxableamount", "Total Taxable", -1)
                .AddCol("SUM(IT.TaxAmt) OVER ()", "_taxamount", "Total Tax", -1)
                .AddCol("SUM(IT.LineTotal) OVER ()", "_amount", "Amount", -1)
                .AddCol("SUM(IT.FCLineTotal) OVER ()", "_fcamount", "FCAmount", -1)
                 .AddDefaultSort("convert(datetime,InvoDate,103),SerialNo")
                .AddTableSection(string.Format(@"Inv_PurchaseMain P 
                            INNER join Inv_InventoryTransaction IT on P.SlNo=IT.BillNo AND P.InvoNo=IT.InvoiceNo AND P.DepartmentId=IT.DeptId
                            LEFT join Mst_CustomerMain Cus on P.SupplierId=Cus.CustId 
                            LEFT join Mst_Currency C on P.CurrencyId=C.Id
                            
                            LEFT join Mst_Area A on P.PlaceOfSupply=A.AreaId
                            LEFT join Mst_Terms T on P.Terms=T.TermsId
                            LEFT join Mst_Department D on P.DepartmentId=D.DepartmentId
                            LEFT join Mst_Location L on IT.LocationId=L.LocationId
                            LEFT join Mst_ProjectJob J on IT.JobId=J.ProjectJobId
                            LEFT join Mst_Item I on IT.ItemId = I.ItemId  
                            LEFT join Mst_GroupMain G on I.GroupId=G.GrpId                      
                            LEFT join Mst_SubGroupMain SG on I.SubGroupId=SG.SbgrpId                      
                            LEFT join Mst_Category CAT on I.CategoryId=CAT.CategoryId                      
                            LEFT join Mst_SubCategory SC on I.SubCategoryId=SC.SubCategoryId
                            LEFT join Mst_Paytype PT on P.PayType=PT.PayId"))
                .AddWhere(search + "AND P.DepartmentId in (select DeptId from Mst_UserDeptDivision where UserId =" + model.addData.UserId + ")")

                .AddDownloadName("ItemWisePurchaseDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}