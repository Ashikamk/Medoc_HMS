using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class JobAllotment
    {

        
        public string DesignationDescription { get; set; }
        public long JobId { get; set; }

        public long Copy { get; set; }
        public long SalarySettingId { get; set; }
        public long DesignationId { get; set; }

        public long EmpCode { get; set; }
        public long EmpId{ get; set; }
        public long DeptId { get; set; }

        public long UId { get; set; }
        public long Alloted { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string EmpName { get; set; }

        public decimal Salary { get; set; }

        public string JobCode { get; set; }


        public string JobAssignedByDes { get; set; }

        public string JobAllotedDate { get; set; }

        public long JobAssignedby { get; set; }

        Djoballotment oDJobAllotment = new Djoballotment();



        public DataSet GetNonAssignedEmployees(JobAllotment oJobAllotment, string dbName)
        {
            return oDJobAllotment.GetNonAssignedEmployees(oJobAllotment, dbName);
        }

        public DataSet JobAllotmentInsertandUpdate(DataTable dt, string dbName)
        {
            return oDJobAllotment.JobAllotmentInsertandUpdate(dt, dbName);
        }






    }
}