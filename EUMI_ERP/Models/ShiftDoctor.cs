using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class ShiftDoctor
    {
        public long ShiftId { get; set; }
        public string ShiftName { get; set; }
        public long DeptId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        DMasters oDMasters = new DMasters();
        public DataSet ShiftGetandGets(ShiftDoctor ShiftDoctor,string dbName)
        {
            return oDMasters.ShiftGetandGets(ShiftDoctor,dbName);
        }
        public DataSet ShiftInsertandUpdate(ShiftDoctor ShiftDoctor, string dbName)
        {
            return oDMasters.ShiftInsertandUpdate(ShiftDoctor, dbName);
        }

    }
}