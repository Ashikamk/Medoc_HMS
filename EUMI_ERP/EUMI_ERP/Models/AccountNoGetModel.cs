using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class AccountNoGetModel
    {
        public int Id { get; set; }
        public long TaxAccId { get; set; }
        public string TaxAcc { get; set; }
        public string TaxAccName { get; set; }
        public int flag { get; set; }
        public int DeptId { get; set; }

        DAccounts oDAccounts = new DAccounts();
        public DataSet AccountNoGetandGets(AccountNoGetModel oAccountNoGetModel, string dbName)
        {
            return oDAccounts.AccountNoGetandGets(oAccountNoGetModel, dbName);
        }
    }
}