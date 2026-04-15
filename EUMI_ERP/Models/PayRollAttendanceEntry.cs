using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PayRollAttendanceEntry
    {
        public int EmpId { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public int LocId { get; set; }
        public int DeptId { get; set; }
        public string Dept { get; set; }
        public string AtendanceDate { get; set; }
        public string InTime { get; set; }
        public string OutTime { get; set; }
        public string WorkingHrs { get; set; }
        public string flag { get; set; }
        public string Status { get; set; }
        public int SaveFlag { get; set; }
        
        public int UId { get; set; }
        public string Type { get; set; }
        public int DivisionId { get; set; }
        public string LeaveFrom { get; set; }



DAttendanceEntry_PayRoll oDAttendanceEntry_PayRoll = new DAttendanceEntry_PayRoll();
        public DataSet AttendanceEmployeeSearch(PayRollAttendanceEntry oPayRollAttendanceEntry, string dbName)
        {
            return oDAttendanceEntry_PayRoll.AttendanceEmployeeSearch(oPayRollAttendanceEntry, dbName);
        }
       
        public DataSet AttendanceEntryInsert(DataTable dt, string dbName)
        {
            return oDAttendanceEntry_PayRoll.AttendanceEntryInsert(dt, dbName);
        }
        
    }
}