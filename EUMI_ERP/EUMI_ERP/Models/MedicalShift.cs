using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
    {
        public class MedicalShift
        {
            public long AvailableId { get; set; }
        public long UserId { get; set; }
        public string CurrentDate { get; set; }
        public long DepId { get; set; }
        public string Doctors { get; set; }
            public string checkstatus { get; set; }
            public string Days { get; set; }
            public string Shift { get; set; }
            public string StartTime { get; set; }
            public string EndTime { get; set; }
            public int DelFlag { get; set; }
            public string Statusshift { get; set; }


            DMasters oDMasters = new DMasters();
        
            public DataSet MedShiftInsertandUpdate(DataTable dt, string dbName)
            {
                return oDMasters.MedShiftInsertandUpdate(dt, dbName);
            }
      
        public DataSet MedShiftGetandGets(MedicalShift Agent, string dbName)
            {
                return oDMasters.MedShiftGetandGets(Agent, dbName);
            }
        public DataSet DaysGetandGets(MedicalShift Agent, string dbName)
        {
            return oDMasters.DaysGetandGets(Agent, dbName);
        }
    }
    }
