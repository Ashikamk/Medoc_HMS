using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class SalesCust
    {
      
        public long SalesCustId { get; set; }
        public long SalesmanId { get; set; }
        public long CustomerId { get; set; }
        public string CustName { get; set; }
        public string Status { get; set; }

        public long DelFlag { get; set; }

        DMasters oDMasters = new DMasters(); 
        public DataSet SalesCustUpdate(DataTable dt, string dbName)
        {
            return oDMasters.SalesCustUpdate(dt, dbName); 
        }
        public DataSet SalesmanCustGets(SalesCust SalesCust, string dbName)
        {
            return oDMasters.SalesmanCustGets(SalesCust, dbName);
        }
        

    }
}