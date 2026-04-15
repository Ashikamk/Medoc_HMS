using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class AccountTypeModel
    {
        public long AccountTypeId { get; set; }
        public string AccountTypeCode { get; set; }
        public string AccountTypeName{ get; set; }
        public int DeptId { get; set; }
        public int flag { get; set; }
        public int Id { get; set; }


        DMasters oDMasters = new DMasters();

        public DataSet AccountTypeGetandGets(AccountTypeModel oAccountTypeModel, string dbName)
        {
            return oDMasters.AccountTypeGetandGets(oAccountTypeModel, dbName);
        }

    }
}