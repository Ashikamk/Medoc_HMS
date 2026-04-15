using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace EUMI_ERP.Models
{
    public class Dosagemaster
    {
        public long DosageId { get; set; }
        public string DosageCode { get; set; }
        public string DosageName { get; set; }
     
        public int DelFlag { get; set; }
        public string Status { get; set; }
        DMasters oDMasters = new DMasters();
        public DataSet DosageGetandGets(Dosagemaster Dosagemaster, string dbName)
        {
            return oDMasters.DosageGetandGets(Dosagemaster, dbName);
        }
        public DataSet DosageInsertandUpdate(Dosagemaster Dosagemaster, string dbName)
        {
            return oDMasters.DosageInsertandUpdate(Dosagemaster, dbName);


        }
    }
}