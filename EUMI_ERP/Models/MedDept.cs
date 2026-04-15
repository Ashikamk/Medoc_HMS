using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class MedDept
    {
        public long DepId { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public string HOD { get; set; }
        public string PhNumber { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        DMasters oDMasters = new DMasters();
        public DataSet MedDeptInsertandUpdate(MedDept oMedDeptModels, string dbName)
        {
            return oDMasters.MedDeptInsertandUpdate(oMedDeptModels, dbName);
        }

        public DataSet MedDeptGetandGets(MedDept oMedDeptModels, string dbName)
        {
            return oDMasters.MedDeptGetandGets(oMedDeptModels, dbName);
        }
    }
}