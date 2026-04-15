using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class DischargeSummary
    {
        public long DischargeId { get; set; }
        public long DischargeNo { get; set; } 

        public long RegNo  { get; set; }
        public long RegSeries { get; set; }
        public long PatientId  { get; set; }
        public long IP_Number  { get; set; }
        public long IP_Year  { get; set; }
        public string PName  { get; set; }
        public long OPVisitId  { get; set; }
        public string AdmittedDate  { get; set; }
        public string DischargeDate  { get; set; }
        public string Reasons  { get; set; }
        public string Diagnosis  { get; set; }
        public string PresentComplaints  { get; set; }
        public string PastHistory  { get; set; }
        public string FamilyHistory  { get; set; }
        public string DevelopHistory  { get; set; }
        public string Immunization  { get; set; }
        public string Examination  { get; set; }
        public string GenExamination  { get; set; }
        public string Course  { get; set; }
        public string Treatment  { get; set; }
        public string DischargeAdvice  { get; set; }
        public string RS  { get; set; }
        public string GIT  { get; set; }
        public string CNS  { get; set; }
        public string Height  { get; set; }
        public string Weight  { get; set; }
        public string CVS  { get; set; }
        public string AfterDays  { get; set; }

        public string SummaryDate { get; set; } 
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public long DelFlag { get; set; }
        public string Status { get; set; }
        public string SurgeryDate { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public string Variable3 { get; set; }
        public string Variable4 { get; set; }

        DHospital oDHospital = new DHospital();
        public DataSet HMS_DischargeSummaryInsertandUpdate(DischargeSummary oDischargeSummary, string dbName)
        {
            return oDHospital.HMS_DischargeSummaryInsertandUpdate(oDischargeSummary, dbName);  
        }

        
            public DataSet HMS_DischargeSummaryGetandGetscopy(DischargeSummary ODischargeSummary, string dbName)
        {
            return oDHospital.HMS_DischargeSummaryGetandGetscopy(ODischargeSummary, dbName);
        }
        public DataSet HMS_DischargeSummaryGetandGets(DischargeSummary ODischargeSummary, string dbName)
        {
            return oDHospital.HMS_DischargeSummaryGetandGets(ODischargeSummary, dbName); 
        }
    }
}