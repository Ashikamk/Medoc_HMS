using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
namespace EUMI_ERP
{

    public class AreaMaster
    {


        public int DriverId { get; set; }
        public string DriverName { get; set; }
        public int ERPDeptId { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string LicenceNumber { get; set; }
       public string Status { get; set; }
        public int DelFlag { get; set; }
        public long NodeId { get; set; }
        public string NodeName { get; set; }
        public long acntcode { get; set; }
        public int NodePrevid { get; set; }






        public string AreaName { get; set; }
        public string GroupName { get; set; }

        public string AreaCode { get; set; }
        public string Description { get; set; }
        public long AreaId { get; set; }
        public long DefaultArea { get; set; }
        public long AreaGrpId { get; set; }
        
      
        public string Message { get; set; }

        public long UserId { get; set; }
        private SqlParameter[] arlParms;


        DMasters oDMasters = new DMasters();

        public DataSet DriverMasterInsertandUpdate(AreaMaster oAreaMaster, string dbName)
        {
            return oDMasters.DriverMasterInsertandUpdate(oAreaMaster, dbName);
        }

        public DataSet DrivereGetsandGets(AreaMaster oAreaMaster, string dbName)
        {
            return oDMasters.DrivereGetsandGets(oAreaMaster, dbName);
        }



        public DataSet AreaGroupInsertandUpdate(AreaMaster oAreaMaster, string dbName)
        {
            return oDMasters.AreaGroupInsertandUpdate(oAreaMaster, dbName);
        }


        public DataSet AreaGetandGets(AreaMaster oAreaMaster, string dbName)
        {
            return oDMasters.AreaGetandGets(oAreaMaster, dbName);
        }


        

        public DataSet TreeViewGets(AreaMaster oAreaMaster, string dbName)
        {
            return oDMasters.TreeViewGets(oAreaMaster, dbName);
        }



        public DataSet AreaGroupGetandGets(AreaMaster oAreaMaster, string dbName)
        {
            return oDMasters.AreaGroupGetandGets(oAreaMaster, dbName);
        }


        public DataSet AreaInsertandUpdate(AreaMaster oAreaMaster, string dbName)
        {
            return oDMasters.AreaInsertandUpdate(oAreaMaster, dbName);
        }
        

        public DataSet CharGroupCreation(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ChatGroup", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("Ex_ChatGroupCreateandDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}