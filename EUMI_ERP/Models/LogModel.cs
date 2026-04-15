using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP.Models
{
    public class LogModel
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string UserId { get; set; }
        public string User { get; set; }
        public string DeptId { get; set; }
        public string Dept { get; set; }
        public string Operation { get; set; }
        public string Decription { get; set; }
        public string EntryDate { get; set; }
        public string OldAmount { get; set; }
        public string NewAmount { get; set; }
        public string EntryTime { get; set; }
        DMasters oDMasters = new DMasters();


        public DataSet LogReport(LogModel oLogModel, string dbName)
        {
            return oDMasters.LogReport(oLogModel, dbName);
        }

    }

    
}