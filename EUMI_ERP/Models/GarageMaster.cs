using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class GarageMaster
    {
        public long GarageId { get; set; }     
        public string GarageName { get; set; }
        public string txt_address { get; set; }
        public string PhoneNumber { get; set; }
        public string Status { get; set; }
        public int DelFlag { get; set; }

        DMasters oDMasters = new DMasters();
        public DataSet GarageInsertandUpdate(GarageMaster GarageMaster, string dbName)
        {
            return oDMasters.GarageInsertandUpdate(GarageMaster, dbName);
        }
        public DataSet GarageGetandGets(GarageMaster GarageMaster, string dbName)
        {
            return oDMasters.GarageGetandGets(GarageMaster, dbName);
        }
    }
   
}