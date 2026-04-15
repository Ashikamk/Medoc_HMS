using EUMI_ERP.DataTablesServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DReports
{
    public class AccountsQuery
    {

        public QueryBuilder<string> builder = new QueryBuilder<string>();
        public void Configure(Models.ABDataTableModel<string> model)
        {

            builder.AddModel(model).AddSlnoCaption("Sl No.", 10)
                .AddCol("MIN(T.vdate)", "VDate", "Date", 10)
                .AddCol("M.acc_code", "AccCode", "Account Code", 15)
                 .AddCol("M.Acc_Description", "Acc_Description", "Account Description", 30)
                 .AddCol("s.acntdescription", "AccGroup", "Account Group", 15)
                 .AddCol("m.acc_id", "Acc_Id", "Acc_Id", -1)
                .AddCol("SUM( CASE VType WHEN 'C' THEN (baseamount) ELSE 0 END)-SUM(CASE VType WHEN 'D' THEN (baseamount) ELSE 0 END)", "Amount", "Amount", 15, ABDataColType.Numeric)
                .AddDefaultSort("Convert(datetime,vdate,103)")
                .AddTableSection(@"Acc_AccountTransaction T 
	                            LEFT JOIN acc_account_head  M ON T.accid=M.acc_id
		                        INNER join Mst_AccountSchedule s on  m.sch1=s.acntid")
               .AddWhere("T.DelFlag=1 AND M.DelFlag=1 AND S.DelFlag=1 group by M.acc_code,M.Acc_Description,s.acntdescription,m.acc_id  HAVING SUM( CASE VType WHEN 'D' THEN baseamount ELSE 0 END)<>SUM( CASE VType WHEN 'C' THEN baseamount ELSE 0 END)")


               .AddDownloadName("AccountsQueryDownload");
        }
        public List<Dictionary<string, object>> Execute(string dbName, out int total, out int filtered)
        {
            return builder.ExecuteObjectDictionary(dbName, out total, out filtered);
        }

    }
}