using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class UnitMaster
    {
        public long UnitId { get; set; }
        public string UnitName { get; set; }
        public string UnitDescription { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }


        DMasters oDMasters = new DMasters();
        public DataSet UnitInsertandUpdate(UnitMaster oUnitMaster, string dbName)                                          
        {
            return oDMasters.UnitInsertandUpdate(oUnitMaster, dbName);
        }
        
        public DataSet UnitGetandGets(UnitMaster oUnitMaster, string dbName)                                       
        {
            return oDMasters.UnitGetandGets(oUnitMaster, dbName);
        }
    }
}