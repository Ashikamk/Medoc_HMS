using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace EUMI_ERP.Models
{
    public class Reason
    {
        public long ReasonId { get; set; }
        public string Reasons { get; set; }
        public string ReasonDes { get; set; }

        public int DelFlag { get; set; }
        public string Status { get; set; }
        DMasters oDMasters = new DMasters();
        public DataSet ReasonGetandGets(Reason Reason, string dbName)
        {
            return oDMasters.ReasonGetandGets(Reason, dbName);
        }
        public DataSet ReasonInsertandUpdate(Reason Reason, string dbName)
        {
            return oDMasters.ReasonInsertandUpdate(Reason, dbName);


        }
    }
}