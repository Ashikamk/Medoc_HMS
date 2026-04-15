using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class BalanceSheetModel
    {
        public string AccDesc { get; set; }
        public decimal AssAmount { get; set; }
        public decimal LiaAmount { get; set; }

        DAccounts oDAccounts = new DAccounts();

        public DataSet BalanceSheetGetandGets(BalanceSheetModel oBalanceSheetModel, string dbName)
        {
            return oDAccounts.BalanceSheetGetandGets(oBalanceSheetModel, dbName);
        }
    }
}