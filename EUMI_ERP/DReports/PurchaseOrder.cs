using EUMI_ERP.DataTablesServer;
using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace EUMI_ERP.DReports
{
    public class PurchaseOrder
    {
        public QueryBuilder<PurchaseOrderPending> builder = new QueryBuilder<PurchaseOrderPending>();
        public void Configure(ABDataTableModel<PurchaseOrderPending> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search = string.Format(@"CONVERT(DATETIME, [P].OrderDate, 103) >= '{0}' AND CONVERT(DATETIME, [P].OrderDate, 103) <= '{1}'
                    AND ISNULL([P].SupplierId, 0) = COALESCE(NULLIF({2}, 0), [P].SupplierId, 0)
                    AND ISNULL([PS].ItemId, 0) = COALESCE(NULLIF({3}, 0), [PS].ItemId, 0)
                    AND ISNULL([I].CategoryId, 0) = COALESCE(NULLIF({4}, 0), [I].CategoryId, 0)
                    AND ISNULL([I].SubCategoryId, 0) = COALESCE(NULLIF({5}, 0),[I].SubCategoryId, 0)
                    AND ISNULL([PS].JobNo, 0) = COALESCE(NULLIF({7}, 0), [PS].JobNo, 0)",
                     model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),
                    model.addData.SupplierId,
                    model.addData.Material,
                    model.addData.Group,
                    model.addData.SubGroup,
                    model.addData.Category,
                    model.addData.SubCategory,
                    model.addData.DepartmentId,
                    model.addData.JobCode);

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("P.OrderDate", "OrderDate", "Order Date", 20)
                .AddCol("C.CustName", "CustName", "Customer", 20)
                .AddCol("PS.ItemCode", "ItemCode", "Product Code", 20)
                .AddCol("PS.ItemDescription", "ItemDescription", "Product Name", 30)
                .AddCol("PS.Quantity", "POSubQuantity", "Order Quantity", 15)
                .AddCol("PSub.Quantity", "PSubQuantity", "Purchase Quantity", 30)
                 .AddCol(("PS.Quantity- PSub.Quantity"), "BalQty", "Balance Quantity", 30)
                   .AddCol("PS.Amount", "Amount", "Amount", 30)
                .AddCol("SUM(PS.Quantity) OVER ()", "_quantity", "Quantity", -1)
                .AddCol("SUM(PSub.Quantity) OVER ()", "_taxableamount", "Total Taxable", -1)
                .AddCol("SUM(PS.Quantity- PSub.Quantity) OVER ()", "_taxamount", "Total Tax", -1)
                .AddCol("SUM(PS.Amount) OVER ()", "_amount", "Amount", -1)
                 .AddDefaultSort("OrderDate")
                .AddTableSection(string.Format(@"Inv_PurchaseOrderMain P 
                        inner join  Inv_PurchaseOrderSub PS on P.OrderNo=PS.POMainSlno
                        left join  Inv_PurchaseSub PSub on PS.POMainSlno=PSub.PO_No
                        left join  Mst_Item  I on PS.ItemId=I.ItemId
                        left join  Mst_CustomerMain C on P.SupplierId=C.CustId"))
                .AddWhere(search)
                .AddDownloadName("PurchaseOrderPendingReport");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}