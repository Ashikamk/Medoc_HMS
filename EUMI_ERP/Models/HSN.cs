using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class HSN
    {


        public long HSNId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string TaxRate { get; set; }
        public long DeptId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }

        DMasters oDMasters = new DMasters();
        public DataSet HSNGetandGets(HSN HSN, string dbName)
        {
            return oDMasters.HSNGetandGets(HSN, dbName);
        }
        public DataSet HSNInsertandUpdate(HSN HSN, string dbName)
        {
            return oDMasters.HSNInsertandUpdate(HSN, dbName);


        }
    }
}