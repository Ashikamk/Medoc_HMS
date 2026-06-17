using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;


namespace EUMI_ERP
{
    public class MasterModels
    {
        public long MethodId { get; set; }

        public string MethodName { get; set; }

        public string MDescription { get; set; }

        public string Remarks { get; set; }

        public int DelFlag { get; set; }
        public string Status { get; set; }

        DMasters oDMasters = new DMasters();

        public DataSet MethodMasterGetandGets(MasterModels oMasterModels, string dbName)
        {
            return oDMasters.MethodMasterGetandGets(oMasterModels, dbName);
        }

        public DataSet MethodMasterInsertandUpdate(MasterModels oMasterModels, string dbName)
        {
            return oDMasters.MethodMasterInsertandUpdate(oMasterModels, dbName);
        }





    }
}