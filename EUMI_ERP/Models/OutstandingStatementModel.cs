using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class OutstandingStatementModel
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string AccountGroup { get; set; }
        public long AccountId { get; set; }
        public long DepartmentId { get; set; }
        public int Flag { get; set; }

        public string InvoNo { get; set; }
        public string VDate { get; set; }
        public string AccCode { get; set; }
        public string AccName { get; set; }
        public decimal BaseAmount { get; set; }
        public string AccountType { get; set; }
        public string CostCode { get; set; }
        public string DueDays { get; set; }

        DAccounts oDAccounts = new DAccounts();

        public DataSet OustandingReportGetandGets(OutstandingStatementModel oOutstandingStatementModel, string dbName)
        {
            return oDAccounts.OustandingReportGetandGets(oOutstandingStatementModel, dbName);
        }
    }
}