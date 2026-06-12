using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class DesignationModel
    {
       
        public string DesignationCode { get; set; }
        public string DesignationDescription { get; set; }
        public long DesignationId { get; set; }

        public long UId { get; set; }

        public long DeptId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        public decimal Salary { get; set; }

        public string JobCode { get; set; }


        DMasters oDMasters = new DMasters();


        public DataSet DesignationGetandGets(DesignationModel oDesignationModel, string dbName)
        {
            return oDMasters.DesignationGetandGets(oDesignationModel, dbName);
        }
        public DataSet DesignationNameSearch(DesignationModel oDesignationModel, string dbName)
        {
            return oDMasters.DesignationNameSearch(oDesignationModel, dbName);
        }

        public DataSet DesignationInsertandUpdate(DesignationModel oDesignationModel, string dbName)
        {
            return oDMasters.DesignationInsertandUpdate(oDesignationModel, dbName);
        }


        DsalarySettings oDSalarySettings = new DsalarySettings();
        public DataSet SalarySettingInsertandUpdate(DataTable dt, string dbName)
        {
            return oDSalarySettings.SalarySettingInsertandUpdate(dt, dbName);
        }



        public DataSet GetCopy(DesignationModel oDesignationMaodel, string dbName)
        {
            return oDSalarySettings.GetCopy(oDesignationMaodel, dbName);
        }

    }
}