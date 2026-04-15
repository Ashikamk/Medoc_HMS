using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class VoucherDiffReport
    {
        public string  DepartmentName{get;set;}
        public string TYPE { get; set; }
        public string Description { get; set; }
        public int VOUCHERNO { get; set; }
        public string Date { get; set; }
        public string AMOUNT { get; set; }

        DVoucherDiffReport oDVoucherDiffReport = new DVoucherDiffReport();
        public DataSet VoucherDiffReportGetsandGets(VoucherDiffReport oVoucherDiffReport, string dbName)
        {
            return oDVoucherDiffReport.VoucherDiffReportGetsandGets(oVoucherDiffReport, dbName);
        }
    }
}