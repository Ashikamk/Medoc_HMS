using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class DepartmentModel
    {

        public string DepartmentName { get; set; }
        public string DepartmentCode { get; set; }
        public string DepartmentDescription { get; set; }
        public long DepartmentId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public string UserId { get; set; }
        public string ResourceId { get; set; }
        public string Code { get; set; }
        public string Account { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public string User { get; set; }
        DMasters oDMasters = new DMasters();


        public DataSet DepartmentGetandGets(DepartmentModel oDepartmentModel, string dbName)
        {
            return oDMasters.DepartmentGetandGets(oDepartmentModel, dbName);
        }

        public DataSet UserDepartmentGetandGets(DepartmentModel oDepartmentModel, string dbName)
        {
            return oDMasters.UserDepartmentGetandGets(oDepartmentModel, dbName);
        }
        public DataSet CustodianGetandGets(DepartmentModel oDepartmentModel, string dbName)
        {
            return oDMasters.CustodianGetandGets(oDepartmentModel, dbName);
        }
        public DataSet DepartmentInsertandUpdate(DepartmentModel oDepartmentModel, string dbName)
        {
            return oDMasters.DepartmentInsertandUpdate(oDepartmentModel, dbName);
        }
        public DataSet ResourceInsertandUpdate(DepartmentModel oDepartmentModel, string dbName)
        {
            return oDMasters.ResourceInsertandUpdate(oDepartmentModel, dbName);
        }
        public DataSet ResourceGetandGets(DepartmentModel oDepartmentModel, string dbName)
        {
            return oDMasters.ResourceGetandGets(oDepartmentModel, dbName);
        }
        public DataSet ResourceAutocomplete(DepartmentModel oDepartmentModel, string dbName)
        {
            return oDMasters.ResourceAutocomplete(oDepartmentModel, dbName);
        }
        
    }
}