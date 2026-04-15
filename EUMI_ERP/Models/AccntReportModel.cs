using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP
{
    public class AccntReportModel
    {
        public string DateFrom { get; set; }
        public string DateTo { get; set; }

        public string AccCode { get; set; }
        public string JobCode { get; set; }
        public string Department { get; set; }
        public string CostCode { get; set; }

        public string VTypePrefix { get; set; }
        public string VoucherNo { get; set; }
        public string VoucherDate { get; set; }
        public string VType { get; set; }
        public string Acc_Code { get; set; }
        public string AccDesc { get; set; }
        public string VDesc { get; set; }
        public string BaseAmount { get; set; }

        public string ReferenceNo { get; set; }

        public string ChequeNo { get; set; }
        public string Credit { get; set; }
        public string Debit { get; set; }
        public string Balance { get; set; }


        DAccntReport oDAccntReport = new DAccntReport();
        public DataSet AccntReportGet(AccntReportModel oAccntReportModel, string dbName)
        {
            return oDAccntReport.AccntReportGet(oAccntReportModel, dbName);
        }
    }
}