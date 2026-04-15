using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class LocationModel
    {
        public string LocationName { get; set; }
        public string LocationCode { get; set; }
        public string LocationDescription { get; set; }
        public long LocationId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public int UserId { get; set; } 
        public int NegativeBillingFlag { get; set; }
      
        public string Customer { get; set; }
        DMasters oDMasters = new DMasters();


        public DataSet LocationGetandGets(LocationModel oLocationmodel, string dbName)
        {
            return oDMasters.LocationGetandGets(oLocationmodel, dbName);
        }

        public DataSet UserLocationGetandGets(LocationModel oLocationmodel, string dbName) 
        {
            return oDMasters.UserLocationGetandGets(oLocationmodel, dbName); 
        }
     
        
        public DataSet LocationInsertandUpdate(LocationModel oLocationmodel, string dbName)
        {
            return oDMasters.LocationInsertandUpdate(oLocationmodel, dbName);
        }

    }
}