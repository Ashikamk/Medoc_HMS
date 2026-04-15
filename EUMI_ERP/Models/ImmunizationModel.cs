using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class ImmunizationModel
    {
        public long OPVisit { get; set; } 
        public string VaccineName { get; set; }
        public string BrandName { get; set; }
        public string GivenDate { get; set; }
        public string NextDate { get; set; }
        public string Gender { get; set; }
        public string PName { get; set; }
        public string PDOB { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; } 
        public string Address1 { get; set; } 
        public string DocName { get; set; } 
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public long DelFlag { get; set; }
        public long Type { get; set; }
        public string Status { get; set; }
        public long PatientId { get; set; }

        DataItemwise oDataItemwise = new DataItemwise();
        public DataSet HMS_ImmunizationReport(ImmunizationModel oImmunizationModel, string dbName)
        {
            return oDataItemwise.HMS_ImmunizationReport(oImmunizationModel, dbName);  
        }
    }
}