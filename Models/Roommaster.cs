using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace EUMI_ERP.Models
{
    public class Roommaster
    {
        public long RoomId { get; set; }
        public string RoomCode { get; set; }
        public string RoomName { get; set; }
        public string Remarks { get; set; }
        public string Flag { get; set; }
        public decimal  Rate{ get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }

        public string InsDtTime { get; set; }
        
         public string CurrentPatient_Id { get; set; }
        DMasters oDmasters = new DMasters();

        public DataSet RoomGetandGets(Roommaster oroommaster,string dbName)
        {
            return oDmasters.RoomGetandGets(oroommaster, dbName);
         }
        public DataSet RoomInsertandUpdate(Roommaster oroommaster, string dbName)
        {
            return oDmasters.RoomInsertandUpdate(oroommaster, dbName);
        }
    }
}