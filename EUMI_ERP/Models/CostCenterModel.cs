using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class CostCenterModel
    {
        public string CostCenterName { get; set; }
        public string CostCenterCode { get; set; }
        public string CostCenterDescription { get; set; }
        public long CostCenterId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }


        DMasters oDMasters = new DMasters();
        DProjectandJob oDProjectandJob = new DProjectandJob(); 

        public DataSet CostCenterGetandGets(CostCenterModel oCostCenterModel, string dbName)
        {
            return oDMasters.CostCenterGetandGets(oCostCenterModel, dbName);
        }

        public DataSet CostCentermasterGetandGets(CostCenterModel oCostCenterModel, string dbName)
        {
            return oDMasters.CostCentermasterGetandGets(oCostCenterModel, dbName);
        }
        

        public DataSet CostCenterInsertandUpdate(CostCenterModel oCostCenterModel, string dbName)
        {
            return oDMasters.CostCenterInsertandUpdate(oCostCenterModel, dbName);
        }
        public DataSet CostCodeSearch(CostCenterModel oCostCenterModel, string dbName)
        {
            return oDProjectandJob.CostCodeSearch(oCostCenterModel, dbName); 
        }
    }
}