using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class EmployeeDivisionModel
    {
        public string EmployeeDivisionName { get; set; }
        public string EmployeeDivisionCode { get; set; }
        public string EmployeeDivisionDescription { get; set; }
        public long EmployeeDivisionId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }


        DMasters oDMasters = new DMasters();
        public DataSet EmployeeDivisionGetandGets(EmployeeDivisionModel oEmployeeDivisionModel, string dbName)
        {
            return oDMasters.EmployeeDivisionGetandGets(oEmployeeDivisionModel, dbName);
        }


        public DataSet EmployeeDivisionInsertandUpdate(EmployeeDivisionModel oEmployeeDivisionModel, string dbName)
        {
            return oDMasters.EmployeeDivisionInsertandUpdate(oEmployeeDivisionModel, dbName);
        }
    }
}