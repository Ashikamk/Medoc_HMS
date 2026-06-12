using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class Hospitalmaster
    {


            public long HospitalId { get; set; }
            public string HospitalName { get; set; }
            public string Address { get; set; }
            public string ContactNumber { get; set; }
            public long DeptId { get; set; }
            public int DelFlag { get; set; }
            public string Status { get; set; }
         
            DMasters oDMasters = new DMasters();
            public DataSet HospitalGetandGets(Hospitalmaster Hospitalmaster, string dbName)
            {
                return oDMasters.HospitalGetandGets(Hospitalmaster, dbName);
            }
            public DataSet HospitalInsertandUpdate(Hospitalmaster Hospitalmaster, string dbName)
            {
                return oDMasters.HospitalInsertandUpdate(Hospitalmaster, dbName);
        
        
    }
  }
}