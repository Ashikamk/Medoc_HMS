using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class CaseSheet
    {
        public long IPYear { get; set; }
        public long CaseSheetId { get; set; } 
        public long CaseSheetNo { get; set; }
        public long RegSeries { get; set; }
        public long PRegNo { get; set; }
        public long RevisitId { get; set; }
        public long PatientOP { get; set; }
        public long PatientIP { get; set; } 
        public long PatientId { get; set; }
        public string Complaint { get; set; }
        public string Diagnosis { get; set; }
        public string Advice { get; set; }
        public string Allergies { get; set; }
        public string Details { get; set; }
        public string Notes { get; set; }

        public string Presentillness { get; set; }
        public string Remarks { get; set; }
        public string Cycle { get; set; }
        public string Complication { get; set; }
        public string Addiction { get; set; }
        public string Examination { get; set; }
        public string Systemic { get; set; }
        public string DTemp { get; set; }
        public string Dpulse { get; set; }
        public string DRegular { get; set; }
        public string DBP { get; set; }
        public string Dheight { get; set; }
        public string Dweight { get; set; }
        public string Dbmi { get; set; }
        public string DBowel { get; set; }
        public string DAppetite { get; set; }
        public string DMict { get; set; }
        public string DSleep { get; set; }
        public string DHabits { get; set; }
        public string Built { get; set; }
        public string Gain { get; set; }
        public string Intake { get; set; }
        public string Gastric { get; set; }
        public string PhysicalAct { get; set; }
        public string vitaminSupp { get; set; }
        public string Nutristatus { get; set; }
        public string Nutriassess { get; set; }
        public string Painassess { get; set; }
        public string ProDiagnosis { get; set; }
        public string Investigations { get; set; }
        public string docDiagnosis { get; set; }
        public string CarePlanStrategy { get; set; }
        public string DietPlan { get; set; }
        public string UndergoingMedicines { get; set; }
        public string OutCome { get; set; }
        public string CarePlanModi { get; set; }
        public string abc1 { get; set; }
        public string abc2 { get; set; }
        public string abc3 { get; set; }
        public string abc4 { get; set; }
        public string abc5 { get; set; }
        public string abc6 { get; set; }
        public string abc7 { get; set; }
        public string abc8 { get; set; }
        public string abc9 { get; set; }
        public string abc10 { get; set; }
        public string abc11 { get; set; }
        public string abc12 { get; set; }
        public string abc13 { get; set; }
        public string abc14 { get; set; }
        public string abc15 { get; set; }
        public string abc16 { get; set; }
        public string abc17 { get; set; }
        public string abc18 { get; set; }
        public string abc19 { get; set; }
        public string abc20 { get; set; }


        public string ICD { get; set; }
        public string ICDDetails { get; set; }
        public string CaseDate { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public long DelFlag { get; set; }
        public string Status { get; set; }
        public string Nextreview { get; set; }

        public string PName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public long Age { get; set; }
        public string Bloodgroup { get; set; }
        public string PGender { get; set; }

        public long MedicineId { get; set; }
        public string Medicine { get; set; }
        public string Daily { get; set; }
        public string Dosage { get; set; }
        public string Days { get; set; }
        public string Type { get; set; }
        public string Mednotes { get; set; }  
        
        public string Reviewdate { get; set; }


        public long ICDId { get; set; }
        public string SendSMS { get; set; }
        public string SpecialFees { get; set; } 

        DHospital oDHospital = new DHospital();
         
        public DataSet HMS_CaseSheetInsertandUpdate(CaseSheet oCaseSheet, string dbName)
        {
            return oDHospital.HMS_CaseSheetInsertandUpdate(oCaseSheet, dbName);  
        }
        public DataSet HMS_AllergyList(CaseSheet oCaseSheet, string dbName)
        {
            return oDHospital.HMS_AllergyList(oCaseSheet, dbName);
        }
        public DataSet HMS_AllergyDeActivate(CaseSheet oCaseSheet, string dbName)
        {
            return oDHospital.HMS_AllergyDeActivate(oCaseSheet, dbName);
        }
        
        public DataSet HMS_TemporaryCaseSheetInsert(CaseSheet oCaseSheet, string dbName)
        {
            return oDHospital.HMS_TemporaryCaseSheetInsert(oCaseSheet, dbName); 
        }

        
         public DataSet HMS_CaseSheetGetandGetsprint(CaseSheet OCaseSheet, string dbName)
        {
            return oDHospital.HMS_CaseSheetGetandGetsprint(OCaseSheet, dbName);
        }


        public DataSet HMS_CaseSheetGetandGets(CaseSheet OCaseSheet, string dbName)
        {
            return oDHospital.HMS_CaseSheetGetandGets(OCaseSheet, dbName);
        }
        public DataSet HMS_CaseSheetSubDetailsInsert(DataTable dt, string dbName) 
        {
            return oDHospital.HMS_CaseSheetSubDetailsInsert(dt, dbName); 
        }
        public DataSet HMS_CaseSheetMedicineUpdate(DataTable dt, string dbName)
        {
            return oDHospital.HMS_CaseSheetMedicineUpdate(dt, dbName);
        }
        
        public DataSet HMS_CaseSheetMedicineGets(CaseSheet OCaseSheet, string dbName)
        {
            return oDHospital.HMS_CaseSheetMedicineGets(OCaseSheet, dbName); 
        }
        public DataSet HMS_CaseSheetInvestigationGets(CaseSheet OCaseSheet, string dbName)
        {
            return oDHospital.HMS_CaseSheetInvestigationGets(OCaseSheet, dbName);
        }
        public DataSet HMS_ICDGetandGets(CaseSheet oCaseSheet, string dbName)
        {
            return oDHospital.HMS_ICDGetandGets(oCaseSheet, dbName);  
        }

        public DataSet HMS_TemporaryCaseSheetInsertAyurveda(CaseSheet oCaseSheet, string dbName)
        {
            return oDHospital.HMS_TemporaryCaseSheetInsertAyurveda(oCaseSheet, dbName);
        }


        public DataSet HMS_CaseSheetInsertandUpdateAyurveda(CaseSheet oCaseSheet, string dbName)
        {
            return oDHospital.HMS_CaseSheetInsertandUpdateAyurveda(oCaseSheet, dbName);
        }



        public DataSet HMS_CaseSheetGetandGetsAyurveda(CaseSheet OCaseSheet, string dbName)
        {
            return oDHospital.HMS_CaseSheetGetandGetsAyurveda(OCaseSheet, dbName);
        }

    }
}