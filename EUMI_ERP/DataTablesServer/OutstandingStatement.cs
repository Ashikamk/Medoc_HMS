using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;
namespace EUMI_ERP.DataTablesServer
{
    public class OutstandingStatement
    {
        public QueryBuilder<OutstandingStatementModel> builder = new QueryBuilder<OutstandingStatementModel>();

        public void Configure(ABDataTableModel<OutstandingStatementModel> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.DateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.DateTo.ToString());

            var search = string.Format(@"[a].SearchVDate >= '{0}' AND [a].SearchVDate <= '{1}'         
                    AND ISNULL([a].AccId, 0) = COALESCE(NULLIF({2}, 0), [a].AccId, 0) AND [a].VType='D'",
                    model.addData.DateFrom.ToString("yyyy-MM-dd"),
                    model.addData.DateTo.ToString("yyyy-MM-dd"),
                    model.addData.AccountId);

            builder.AddModel(model).AddSlnoCaption("Num", -10)
                .AddCol("ROW_NUMBER() OVER (ORDER BY t.VEntryId)", "rowNum", "SlNo", 10, ABDataColType.Numeric)
                .AddCol("t.VEntryId", "VEntryId", "Id", -1)
                .AddCol("t.VTypePrefix", "VoucherPrefix", "Prefix", 10)
                .AddCol("t.VoucherNo", "InvoNo", "InvoNo", 20)
                .AddCol("t.VDate", "VoucherDate", "Date", 15)
                .AddCol("t.Acc_Code", "AccountCode", "AccountCode", 20)
                .AddCol("t.Acc_Description", "AccountDesc", "Description", 30)
                .AddCol("t.VDescription", "VoucherDesc", "VoucherDesc", 30)
                .AddCol("t.DebitAmt", "DebitAmount", "Debit", 20, ABDataColType.Numeric)
                .AddCol("t.CreditAmt", "CreditAmount", "Credit", 20, ABDataColType.Numeric)
                .AddCol(string.Format(@"(
        SELECT SUM(a.DebitAmt - a.CreditAmt) as SumRunning 
	        FROM vwAccountTrans a 
	        WHERE a.VEntryId <= t.VEntryId AND {0}
                        )", search), "Balance", "Balance", 20)
                .AddCol("SUM(t.CreditAmt) OVER ()", "_credittotal", "CreditTotal", -1)
                .AddCol("SUM(t.DebitAmt) OVER ()", "_debittotal", "Debit Total", -1)
                .AddCol(@"SUM(t.DebitAmt - t.CreditAmt) OVER ()", "_grandbalance", "Grand Balance", -1)
                .AddDefaultSort("VEntryId")
                .AddTableSection(@"vwAccountTrans t")
                .AddWhere(search.Replace("[a]", "[t]"))
                .AddDownloadName("OutstandingStatementDownload");
        }

        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }
    }
}