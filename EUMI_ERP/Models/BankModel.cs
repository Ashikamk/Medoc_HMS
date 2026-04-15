using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class BankModel
    {
        public long BankId { get; set; }
        public string BankName { get; set; }
        public string BankCode { get; set; }
        public string ZipCode { get; set; }
        public string Branch { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }



        DMasters oDMasters = new DMasters();

        public DataSet BankGetandGets(BankModel oBankModel, string dbName)
        {
            return oDMasters.BankGetandGets(oBankModel, dbName);
        }
        public DataSet BankInsertandUpdate(BankModel oBankModel, string dbName)
        {
            return oDMasters.BankInsertandUpdate(oBankModel, dbName);
        }
    }
}