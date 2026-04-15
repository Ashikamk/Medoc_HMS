using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class GroupMaster
    {
        public long GrpId { get; set; }
        public string GrpName { get; set; }
        public string GrpCode { get; set; }
        public string GrpDescription { get; set; } 
        public int DelFlag { get; set; }
        public string Status { get; set; }


        DMasters oDMasters = new DMasters();

        public DataSet GroupInsertandUpdate(GroupMaster oGroupMaster, string dbName)
        {
            return oDMasters.GroupInsertandUpdate(oGroupMaster, dbName);
        }

        public DataSet GroupGetandGets(GroupMaster oGroupMaster, string dbName)                                            //To List GroupGetandGets
        {
            return oDMasters.GroupGetandGets(oGroupMaster, dbName);
        }
        //public DataSet SubGroupGetGets(GroupMaster oGroupMaster, string dbName)                                            //To List GroupGetandGets
        //{
        //    return oDMasters.SubGroupGetGets(oGroupMaster, dbName);
        //}
        
             public DataSet AutomobileGroupGetandGets(GroupMaster oGroupMaster, string dbName)                                            //To List GroupGetandGets
        {
            return oDMasters.AutomobileGroupGetandGets(oGroupMaster, dbName); 
        }
    }
}