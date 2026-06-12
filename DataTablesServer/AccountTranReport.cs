using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP.DataTablesServer
{
    public class AccountTranReport
    {
        public QueryBuilder<ABAccountTranRptModel> builder = new QueryBuilder<ABAccountTranRptModel>();
        public void Configure(ABDataTableModel<ABAccountTranRptModel> model)
        {
            model.order.Clear();
            System.Diagnostics.Trace.WriteLine(model.addData.dateFrom.ToString());
            System.Diagnostics.Trace.WriteLine(model.addData.dateTo.ToString());

            var search = string.Format(@"[a].SearchVDate >= '{0}' AND [a].SearchVDate <= '{1}' 
        AND ISNULL([a].DeptId, 0) = COALESCE(NULLIF({2}, 0), [a].DeptId, 0)
        AND ISNULL([a].ProjttJobId, 0) = COALESCE(NULLIF({3}, 0), [a].ProjttJobId, 0)
        AND ISNULL([a].AccId, 0) = COALESCE(NULLIF({4}, 0), [a].AccId, 0)
        AND ISNULL([a].CostCenterId, 0) = COALESCE(NULLIF({5}, 0), [a].CostCenterId, 0)
        AND ISNULL([a].AcntId, 0) = COALESCE(NULLIF({6}, 0), [a].AcntId, 0)",
                    model.addData.dateFrom.ToString("yyyy-MM-dd"),
                    model.addData.dateTo.ToString("yyyy-MM-dd"),
                    model.addData.departmentId,
                    model.addData.jobId,
                    model.addData.accountId,
                    model.addData.costCenterId,
                     model.addData.AccountGroup);

            builder.AddModel(model).AddSlnoCaption("Num", -10)
                .AddCol("ROW_NUMBER() OVER (ORDER BY t.VEntryId)", "rowNum", "Sl No.", 10, ABDataColType.Numeric)
                .AddCol("t.VEntryId", "VEntryId", "Id", -1)
                .AddCol("t.VTypePrefix", "VoucherPrefix", "Prefix", 10)
                .AddCol("t.VoucherNo", "VoucherNo", "Voucher No.", 20)
                .AddCol("t.VDate", "VoucherDate", "Date", 15)
                .AddCol("t.Acc_Code", "AccountCode", "AccountCode", 20)
                .AddCol("t.Acc_Description", "AccountDesc", "Description", 30)
                .AddCol("t.VDescription", "VoucherDesc", "Voucher Description", 30)
                .AddCol("t.ReferenceNo", "ReferenceNo", "ReferenceNo", 20)
                .AddCol("t.ChequeNo", "ChequeNo", "ChequeNo", 20)
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
                .AddDefaultSort("Convert(datetime,VoucherDate,103)")
                .AddTableSection(@"vwAccountTrans t")
                .AddWhere(search.Replace("[a]", "[t]"))
                .AddDownloadName("AccountTransDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }

    }
}