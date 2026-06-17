using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class RegistrationModel
    {
        public string RegisterFolder = "RegisterImages";
        public long RegSeries { get; set; }
        public long Revisit_Id { get; set; }
        
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public long RegNo { get; set; }
        public string PName { get; set; }
        public int PGender { get; set; }
        public long Age { get; set; }
        public string PDOB { get; set; }
        public long Doctor { get; set; }
        public string HealthCardNo { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string AdharNo { get; set; }
        public decimal RegFee { get; set; }
        public decimal ConsultFee { get; set; }
        public decimal OtherFee { get; set; }
        public long TokenNo { get; set; }
        public string RegDate { get; set; }
        public decimal Birthweight { get; set; }
        public decimal Currentweight { get; set; }
        public string Bloodgroup { get; set; }
        public decimal Height { get; set; }
        public string Fathersname { get; set; }
        public string Mothersname { get; set; }
        public string FatherOccupation { get; set; }
        public string MotherOccupation { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public long RegId { get; set; }

        public string District { get; set; }
        public string State { get; set; }
        public string Religion { get; set; }
        public string Occupation { get; set; }
        public string EmailId { get; set; }
        public string selectedImage { get; set; }
        public string Country { get; set; }
        public string Shift { get; set; } 
        public string OPDescription { get; set; }
        public long MFlag { get; set; }
        public decimal Cash { get; set; }
        public decimal Upi { get; set; }
        public decimal Card { get; set; }

        DMasters oDMasters = new DMasters();

        
             public DataSet HMS_RegistrationInsertandUpdatefromcasesheet(RegistrationModel oRegistrationModel, string dbName)
        {
            return oDMasters.HMS_RegistrationInsertandUpdatefromcasesheet(oRegistrationModel, dbName);
        }

        
             public DataSet HMS_ScanRegistrationInsertandUpdate(RegistrationModel oRegistrationModel, string dbName)
        {
            return oDMasters.HMS_ScanRegistrationInsertandUpdate(oRegistrationModel, dbName);
        }

        public DataSet HMS_RegistrationInsertandUpdate(RegistrationModel oRegistrationModel, string dbName)
        {
            return oDMasters.HMS_RegistrationInsertandUpdate(oRegistrationModel, dbName); 
        }
        public DataSet HMS_RegistrationGetandGets(RegistrationModel oRegistrationModel, string dbName)
        {
            return oDMasters.HMS_RegistrationGetandGets(oRegistrationModel, dbName); 
        }
        public DataSet HMS_RegPatientInfo(RegistrationModel oRegistrationModel, string dbName)
        {
            return oDMasters.HMS_RegPatientInfo(oRegistrationModel, dbName);
        }
        public DataSet RegistrationReport(RegistrationModel oRegistrationModel, string dbName)
        {
            return oDMasters.RegistrationReport(oRegistrationModel, dbName);
        }
        public DataSet RevisitReport(RegistrationModel oRegistrationModel, string dbName)
        {
            return oDMasters.RevisitReport(oRegistrationModel, dbName);
        }
    }
}