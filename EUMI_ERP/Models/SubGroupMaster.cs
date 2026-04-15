using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class SubGroupMaster
    {
        public long SbgrpId { get; set; }
        public long GroupId { get; set; }
        public string SbgrpName { get; set; }
        public string SbgrpDescription { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string GrpNames{ get; set; } 

        DMasters oDMasters = new DMasters();

        public DataSet SubGroupInsertandUpdate(SubGroupMaster oSubGroupMaster, string dbName)                    
        {
            return oDMasters.SubGroupInsertandUpdate(oSubGroupMaster, dbName); 
        }

        public DataSet SubGroupGetandGets(SubGroupMaster oSubGroupMaster, string dbName)
        {
            return oDMasters.SubGroupGetandGets(oSubGroupMaster, dbName);
        }        
    }
}