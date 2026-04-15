using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class PassportModel
    {
        public long PassportId { get; set; }
        public long EmpId { get; set; }
        public string PassportNo { get; set; }
        public string Country { get; set; }
        public string PassportIssued { get; set; }
        public string PassportExpiry { get; set; }
        public string Remarks { get; set; }
        public string Type { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string CountryName { get; set; }
        public string IDType { get; set; }
        public string EmpCodeId { get; set; }
        public string EmpCode { get; set; }
        public string Name{ get; set; }
        public string IncrementFrom { get; set; }

        public string IncrementType { get; set; }
        public decimal IncrementAmount { get; set; }
        public string InsuranceCompanyId { get; set; }
        public int DeptId { get; set; }
        public long  ExpDate { get; set; }
        DMasters oDMasters = new DMasters();

        public DataSet PassportGetandGets(PassportModel PassportModel, string dbName)
        {
            return oDMasters.PassportGetandGets(PassportModel, dbName);
        }
        public DataSet PassportInsertandUpdate(PassportModel oPassportModel, string dbName)
        {
            return oDMasters.PassportInsertandUpdate(oPassportModel, dbName);
        }

        public DataSet EmployeeDocumentInsert(DataTable dt, string dbName)
        {
            return oDMasters.EmployeeDocumentInsert(dt, dbName);
        }


        public DataSet Expirypopup(PassportModel PassportModel, string dbName)
        {
            return oDMasters.ExpirypopupD(PassportModel, dbName);
        }




    }
}