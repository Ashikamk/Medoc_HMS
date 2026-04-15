using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class TrailBalanceRptModel
    {

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Account { get; set; }
        public string CostCode { get; set; }
        public string Department { get; set; }

        public string AccCode { get; set; }
        public string AccDesc { get; set; }
        public decimal Credit { get; set; }
        public decimal Debit { get; set; }
        public decimal Balance { get; set; }
        public decimal OPCredit { get; set; }
        public decimal OPDebit { get; set; }
        public decimal Amount { get; set; }
        public string Cost { get; set; }
        public string Income { get; set; }

        public string DR { get; set; }
        public string CR { get; set; }
        public string Assets { get; set; }
        public string Liabilities { get; set; }
        public string Condition { get; set; }
        public string Status { get; set; }

        DAccounts oDAccounts = new DAccounts();        
        public DataSet TrailsBalanceGetandGets(TrailBalanceRptModel oTrailBalanceRptModel, string dbName)
        {
            return oDAccounts.TrailsBalanceGetandGets(oTrailBalanceRptModel, dbName);
        }
        public DataSet TrailsBalanceGroupwiseGetandGets(TrailBalanceRptModel oTrailBalanceRptModel, string dbName)
        {
            return oDAccounts.TrailsBalanceGroupwiseGetandGets(oTrailBalanceRptModel, dbName);
        }
        
        public DataSet ProfitandLoss(TrailBalanceRptModel oTrailBalanceRptModel, string dbName)
        {
            return oDAccounts.ProfitandLoss(oTrailBalanceRptModel, dbName);
        }
        public DataSet BalanceSheetAsOn(TrailBalanceRptModel oTrailBalanceRptModel, string dbName)
        {
            return oDAccounts.BalanceSheetAsOn(oTrailBalanceRptModel, dbName);
        }
        public DataSet BalanceSheetSummary(TrailBalanceRptModel oTrailBalanceRptModel, string dbName)
        {
            return oDAccounts.BalanceSheetSummary(oTrailBalanceRptModel, dbName);
        }

      

    }
}