using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ReVisitModel
    {

        public int VitalsStatus { get; set; }
        public string VitalsText { get; set; }
        public string OPCaseSheet { get; set; }
        public string IPCaseSheet { get; set; }
        public long RevId { get; set; }
        public long RevisitId { get; set; }
        public long OPSerId { get; set; }
        public string OPSerName { get; set; }
        public string OPNumber { get; set; }
        public long PatientId { get; set; }
        public long DoctorId { get; set; }
        public decimal VisitFees { get; set; }
        public decimal ConsultFees { get; set; }
        public decimal OtherFees { get; set; }
        public string Shift { get; set; }
        public string Type { get; set; }
        public string Weight { get; set; }
        public string Height { get; set; }
        public int DelFlag { get; set; }
        public string RevisitDate { get; set; }
        public int UserId { get; set; }
        public int DeptId { get; set; }
        public string Status { get; set; }
        public long Flag { get; set; }
        public string PatientName { get; set; }
        public string Gender { get; set; }
        public string DOB { get; set; }
        public string Age { get; set; }
        public string BloodGroup { get; set; }
        public string Contact { get; set; }
        public string LastVisit { get; set; }


        public string Fname { get; set; }
        public string Mname { get; set; }
        public string Foccupation { get; set; }
        public string Moccupation { get; set; }





        public string UCVARight { get; set; }
        public string UCVALeft { get; set; }
        public string PHRight { get; set; }
        public string PHLeft { get; set; }
        public string BCVARight { get; set; }
        public string BCVALeft { get; set; }
        public string ARRight { get; set; }
        public string ARLeft { get; set; }
        public string LensPowerRight { get; set; }
        public string LensPowerLeft { get; set; }
        public string DilatedObjRight { get; set; }
        public string DilatedObjLeft { get; set; }
        public string UnDilatedObjRight { get; set; }
        public string UnDilatedObjLeft { get; set; }
        public string DilatedSubRight { get; set; }
        public string DilatedSubLeft { get; set; }
        public string AcceptingRight { get; set; }
        public string AcceptingLeft { get; set; }
        public string IOPRight { get; set; }
        public string IOPLeft { get; set; }
        public string ColourRight { get; set; }
        public string ColourLeft { get; set; }
        public string CheifComplaints { get; set; }
        public string ConfrontationRight { get; set; }
        public string ConfrontationLeft { get; set; }
        public string AmslerRight { get; set; }
        public string AmslerLeft { get; set; }





        public string GRBS { get; set; }
        public string HCIRCUMFERENCE { get; set; }





        public string SPHRight { get; set; }
        public string SPHLeft { get; set; }
        public string CYLRight { get; set; }
        public string CYLLeft { get; set; }
        public string AXISRight { get; set; }
        public string AXISLeft { get; set; }

        public string ADERight { get; set; }
        public string ADELeft { get; set; }







        public string RegDate { get; set; }
        public string Add1 { get; set; }
        public string Add2 { get; set; }
        public string Add3 { get; set; }
        public string AadharNo { get; set; }
        public string HealthCard { get; set; }
        public string Occupation { get; set; }
        public string DoctorName { get; set; }
        public string TokenNumber { get; set; }
        public string ShiftName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long IPNumber { get; set; }
        public long IPYear { get; set; }
        public string SendSMS { get; set; }
        public string SpecialFees { get; set; }

        public string BP { get; set; }
        public string Temperature { get; set; }
        public string Sugar { get; set; }


        public string BMI { get; set; }
        public string ChestCircumference { get; set; }
        public string HeadCircumference { get; set; }
        public string Abdominal { get; set; }
        public string Allergy { get; set; }
        public decimal Cash { get; set; }
        public decimal Upi { get; set; }
        public decimal Card { get; set; }

        DReVisit oDReVisit = new DReVisit();
        DHospital oDHospital = new DHospital();

        public DataSet HMS_TestAdviceGets(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_TestAdviceGets(ReVisitModel, dbName);
        }



        // Add this class INSIDE your ReVisitModel class (after your existing properties)
        public class PatientTestModel
        {
            public long TestId { get; set; }
            public string TestName { get; set; }
            public string Priority { get; set; }
            public string Status { get; set; }
            public long BillNo { get; set; }
            public long BillYear { get; set; }
        }

        // Add this method INSIDE your ReVisitModel class (with your other methods)
        public DataSet HMS_GetPatientSelectedTests(long revisitId, string dbName)
        {
            return oDReVisit.HMS_GetPatientSelectedTests(revisitId, dbName);
        }

        public DataSet RevisitPatientHealthDetailsInsertandUpdateOptometry(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.RevisitPatientHealthDetailsInsertandUpdateOptometry(ReVisitModel, dbName);
        }
        public DataSet RevisitPatientHealthDetailsGetandGetsOptometry(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.RevisitPatientHealthDetailsGetandGetsOptometry(ReVisitModel, dbName);
        }

        //patienthealthdetails

        public DataSet RevisitPatientHealthDetailsInsertandUpdate(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.RevisitPatientHealthDetailsInsertandUpdate(ReVisitModel, dbName);
        }
        public DataSet RevisitPatientHealthDetailsGetandGets(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.RevisitPatientHealthDetailsGetandGets(ReVisitModel, dbName);
        }
        //patienthealthdetails

        public DataSet Refertootherdoctor(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.Refertootherdoctor(ReVisitModel, dbName);
        }


        public DataSet RevisitInsertandUpdate(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.RevisitInsertandUpdate(ReVisitModel, dbName);
        }
        public DataSet HMS_ShiftGetandGets(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_ShiftGetandGets(ReVisitModel, dbName);
        }
        public DataSet HMS_TokenNumberGets(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_TokenNumberGets(ReVisitModel, dbName);
        }
        public DataSet HMS_PatientSearch(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_PatientSearch(ReVisitModel, dbName);
        }
        public DataSet HMS_PatientSearchAppointment(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_PatientSearchAppointment(ReVisitModel, dbName);
        }
        public DataSet HMS_RevisitIdSearch(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_RevisitIdSearch(ReVisitModel, dbName);
        }
        public DataSet HMS_PatientSearchGet(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_PatientSearchGet(ReVisitModel, dbName);
        }
        public DataSet HMS_RevisitGetandGets(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_RevisitGetandGets(ReVisitModel, dbName);
        }
        public DataSet HMSPreVisitDetailGets(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMSPreVisitDetailGets(ReVisitModel, dbName);
        }


        public DataSet ScanStatusUpdate(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.ScanStatusUpdate(ReVisitModel, dbName);
        }

        public DataSet HMS_DoctorFeegetsfromrevisit(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_DoctorFeegetsfromrevisit(ReVisitModel, dbName);
        }


        public DataSet HMS_DoctorFeegets(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_DoctorFeegets(ReVisitModel, dbName);
        }
        public DataSet HMS_RevistDoctorGets(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_RevistDoctorGets(ReVisitModel, dbName);
        }

        public DataSet HMS_LAstRevisitGetsscan(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_LAstRevisitGetsscan(ReVisitModel, dbName);
        }



        public DataSet HMS_LAstRevisitGetsOP(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_LAstRevisitGetsOP(ReVisitModel, dbName);
        }

        public DataSet HMS_LAstRevisitGetsayurvetha(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_LAstRevisitGetsayurvetha(ReVisitModel, dbName);
        }

        public DataSet HMS_LAstRevisitGets(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_LAstRevisitGets(ReVisitModel, dbName);
        }
        public DataSet HMS_IPorPatientSearch(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_IPorPatientSearch(ReVisitModel, dbName);
        }
        public DataSet HMS_IPPatientSearch(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_IPPatientSearch(ReVisitModel, dbName);
        }
        public DataSet HMS_PatientVisitDetailsGet(ReVisitModel ReVisitModel, string dbName)
        {
            return oDHospital.HMS_PatientVisitDetailsGet(ReVisitModel, dbName);
        }
        public DataSet HMS_PatientSearchRegistration(ReVisitModel ReVisitModel, string dbName)
        {
            return oDReVisit.HMS_PatientSearchRegistration(ReVisitModel, dbName);
        }
    }


    public class HMSSerialModel
    {
        public long PurCorrection { get; set; }
        public long DeptId { get; set; }
        public long RevisitId { get; set; }
        public long BillNo { get; set; }
        public long IPNo { get; set; }
        public long CYear { get; set; }
        public long PRBillNo { get; set; }
        public long IPBillNo { get; set; }
        public long CaseSheetNo { get; set; }
        public long DischargeNo { get; set; }

        DReVisit oDReVisit = new DReVisit();
        public DataSet HMSSerialNoGets(HMSSerialModel HMSSerialModel, string dbName)
        {
            return oDReVisit.HMSSerialNoGets(HMSSerialModel, dbName);
        }

    }
    public class HMSTest
    {
        public long SubTestId { get; set; }
        public long TestId { get; set; }
        public string TestName { get; set; }
        public decimal Rate { get; set; }
        public decimal SpRate { get; set; }
        public decimal VSpRate { get; set; }
        public decimal OutsideRate { get; set; }
        public long MedDept { get; set; }
        public string SubDivision { get; set; }
        public string MedDeptName { get; set; }
        public string SubDiv { get; set; }
        public string StdUnit { get; set; }
        public string NormalValue { get; set; }
        public string dcnormal { get; set; }
        public string dcresult { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public long DelFlag { get; set; }
        public string Status { get; set; }
        public decimal EXRate { get; set; }
        public decimal MinValue { get; set; }
        public decimal MaxValue { get; set; }
        public string Notes { get; set; }

        DReVisit oDReVisit = new DReVisit();
        DHospital oDHospital = new DHospital();

        public DataSet Hms_TestInsertandUpdate(DataTable dt, string dbName)
        {
            return oDReVisit.Hms_TestInsertandUpdate(dt, dbName);
        }
        public DataSet HMS_TestGetandGets(HMSTest HMSTest, string dbName)
        {
            return oDReVisit.HMS_TestGetandGets(HMSTest, dbName);
        }
        public DataSet HMS_TestSearch(HMSTest HMSTest, string dbName)
        {
            return oDReVisit.HMS_TestSearch(HMSTest, dbName);
        }
        public DataSet Hms_DischargeSummaryTestsInsertandUpdate(DataTable dt, string dbName)
        {
            return oDHospital.Hms_DischargeSummaryTestsInsertandUpdate(dt, dbName);
        }
        public DataSet HMS_DischargeSummaryTestsGetandGets(HMSTest HMSTest, string dbName)
        {
            return oDHospital.HMS_DischargeSummaryTestsGetandGets(HMSTest, dbName);
        }
    }
    public class LabResult
    {
        public string BillDate { get; set; }
        public string MedDeptId { get; set; }
        public string MedDeptName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long IPNumber { get; set; }
        public string PType { get; set; }
        public string RegNoS { get; set; }
        public string SubTestName { get; set; }
        public long SubResultId { get; set; }
        public long ResultId { get; set; }
        public long OPNumber { get; set; }
        public long PatientId { get; set; }
        public long RegNo { get; set; }
        public long RegSerId { get; set; }
        public string RegSerName { get; set; }
        public string PatientName { get; set; }
        public string DOB { get; set; }
        public string BloodGroup { get; set; }
        public string Gender { get; set; }
        public long DoctorId { get; set; }
        public string Doctor { get; set; }
        public long BillNo { get; set; }
        public long TestId { get; set; }
        public string TestName { get; set; }
        public string Result { get; set; }
        public int DelFlag { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public string Status { get; set; }
        public int Flag { get; set; }
        public string Date { get; set; }
        public long SubTestId { get; set; }
        public string NormalValue { get; set; }
        public string StdUnit { get; set; }
        public long BillYear { get; set; }
        public decimal MinValue { get; set; }
        public decimal MaxValue { get; set; }
        public string Notes { get; set; }
        public string Remarks { get; set; }

        DReVisit oDReVisit = new DReVisit();
        DHospital oDHospital = new DHospital();




        public DataSet HMS_LabBillGetsQuee(LabResult LabResult, string dbName)
        {
            return oDReVisit.HMS_LabBillGetsQuee(LabResult, dbName);
        }

        public DataSet HMS_LabBillGets(LabResult LabResult, string dbName)
        {
            return oDReVisit.HMS_LabBillGets(LabResult, dbName);
        }
        public DataSet HMS_LabBillTestGets(LabResult LabResult, string dbName)
        {
            return oDReVisit.HMS_LabBillTestGets(LabResult, dbName);
        }
        public DataSet HMS_ResultInsertandUpdate(DataTable dt, string dbName)
        {
            return oDReVisit.HMS_ResultInsertandUpdate(dt, dbName);
        }
        public DataSet HMS_ResultGetandGets(LabResult LabResult, string dbName)
        {
            return oDReVisit.HMS_ResultGetandGets(LabResult, dbName);
        }
        //anu
        public DataSet Hms_GetLabResultNotification(LabResult LabResult, string dbName)
        {
            return oDReVisit.Hms_GetLabResultNotification(LabResult, dbName);
        }
        //anu
        public DataSet HMS_PatientSubTestResultGets(LabResult LabResult, string dbName)
        {
            return oDHospital.HMS_PatientSubTestResultGets(LabResult, dbName);
        }

    }
    public class IPRegistration
    {

        public string Fstatus { get; set; }
        public string medicine { get; set; }
        public string PC { get; set; }
        public string Dg { get; set; }

        public long IPMainId { get; set; }
        public long IPYear { get; set; }
        public long IPNumber { get; set; }
        public long OPVisitId { get; set; }
        public long RegSeries { get; set; }
        public string RegSeriesName { get; set; }
        public long RegNo { get; set; }
        public long PatientId { get; set; }
        public string PatientName { get; set; }
        public long DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string Date { get; set; }
        public string InTime { get; set; }
        public string DDate { get; set; }
        public string DTime { get; set; }
        public long RoomId { get; set; }
        public string RoomCode { get; set; }
        public string RoomName { get; set; }
        public decimal RoomRate { get; set; }
        public int DelFlag { get; set; }
        public long Flag { get; set; }
        public string Status { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public string DOB { get; set; }
        public string Contact { get; set; }
        public string Gender { get; set; }

        DReVisit oDReVisit = new DReVisit();
        DMasters oDmasters = new DMasters();
        public DataSet HMS_VacantRoomGets(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_VacantRoomGets(IPRegistration, dbName);
        }
        public DataSet HMS_IP_BPTEMPInsertandUpdate(DataTable dt, string dbName)
        {
            return oDmasters.HMS_IP_BPTEMPInsertandUpdate(dt, dbName);
        }
        public DataSet HMS_IPRegistrationInsertandUpdate(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_IPRegistrationInsertandUpdate(IPRegistration, dbName);
        }


        public DataSet HMS_IPmedicineDetailsgets(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_IPmedicineDetailsgets(IPRegistration, dbName);
        }

        public DataSet HMS_IPDetailsgets(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_IPDetailsgets(IPRegistration, dbName);
        }


        public DataSet HMS_IPRegistrationGets(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_IPRegistrationGets(IPRegistration, dbName);
        }
        public DataSet HMS_RoomAllocation(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_RoomAllocation(IPRegistration, dbName);
        }
        public DataSet HMS_RoomChange(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_RoomChange(IPRegistration, dbName);
        }
        public DataSet HMS_RoomIPDetails(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_RoomIPDetails(IPRegistration, dbName);
        }
        public DataSet HMS_TimeSearch(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_TimeSearch(IPRegistration, dbName);
        }
        public DataSet HMS_DB_RoomDetails(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_DB_RoomDetails(IPRegistration, dbName);
        }
        public DataSet HMS_IP_BPTempGraph(IPRegistration IPRegistration, string dbName)
        {
            return oDReVisit.HMS_IP_BPTempGraph(IPRegistration, dbName);
        }
    }
    public class WorkSheet
    {
        public string LabAdvice { get; set; }
        public int LabAdviceCount { get; set; }
        public string CSFlag { get; set; }
        public long IPYear { get; set; }
        public long IPNumber { get; set; }
        public long RevId { get; set; }
        public long RevisitId { get; set; }
        public long OPSerId { get; set; }
        public string OPSerName { get; set; }
        public string OPNumber { get; set; }
        public long PatientId { get; set; }
        public long DoctorId { get; set; }
        public string TokenNumber { get; set; }
        public int DelFlag { get; set; }
        public string RevisitDate { get; set; }
        public int UserId { get; set; }
        public int DeptId { get; set; }
        public string Status { get; set; }
        public string Visit { get; set; }
        public long Flag { get; set; }
        public string PatientName { get; set; }
        public string Gender { get; set; }
        public string DOB { get; set; }
        public string Contact { get; set; }
        public string DoctorName { get; set; }
        public string ShiftName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string BloodGroup { get; set; }

        public string BillType { get; set; }
        public string Sample { get; set; }
        public string Advice { get; set; }

        public string MedicineAdvice { get; set; }
        public int MedicineAdviceCount { get; set; }


        DReVisit oDReVisit = new DReVisit();


        //public DataSet HMS_OPWorkSheetLabNew(WorkSheet WorkSheet, string dbName)
        //{
        //    return oDReVisit.HMS_OPWorkSheetLabNew(WorkSheet, dbName);
        //}

        public DataSet HMS_OPWorkSheetLabAdvice(WorkSheet WorkSheet, string dbName)
        {
            return oDReVisit.HMS_OPWorkSheetLabAdvice(WorkSheet, dbName);
        }

        public DataSet HMS_OPWorkSheetMedicineAdvice(WorkSheet WorkSheet, string dbName)
        {
            return oDReVisit.HMS_OPWorkSheetMedicineAdvice(WorkSheet, dbName);
        }
        public DataSet HMS_OPWorkSheetScan(WorkSheet WorkSheet, string dbName)
        {
            return oDReVisit.HMS_OPWorkSheetScan(WorkSheet, dbName);
        }


        // NEW - in ReVisitModel.cs
        public DataSet HMS_GetVitalsRevisitIds(string dbName)
        {
            return oDReVisit.HMS_GetVitalsRevisitIds(dbName);
        }


        public DataSet HMS_OPWorkSheetStaffLAb(WorkSheet WorkSheet, string dbName)
        {
            return oDReVisit.HMS_OPWorkSheetStaffLAb(WorkSheet, dbName);
        }

        public DataSet HMS_OPWorkSheetStaff(WorkSheet WorkSheet, string dbName)
        {
            return oDReVisit.HMS_OPWorkSheetStaff(WorkSheet, dbName);
        }
        public DataSet HMS_OPWorkSheetDoctor(WorkSheet WorkSheet, string dbName)
        {
            return oDReVisit.HMS_OPWorkSheetDoctor(WorkSheet, dbName);
        }
        public DataSet HMS_IPWorkSheetDoctor(WorkSheet WorkSheet, string dbName)
        {
            return oDReVisit.HMS_IPWorkSheetDoctor(WorkSheet, dbName);
        }
        public DataSet HMS_IP_BP_TempEntryGets(WorkSheet WorkSheet, string dbName)
        {
            return oDReVisit.HMS_IP_BP_TempEntryGets(WorkSheet, dbName);
        }

        public DataSet HMS_WorkSheetDoctorSearch(WorkSheet WorkSheet, string dbName)
        {
            return oDReVisit.HMS_WorkSheetDoctorSearch(WorkSheet, dbName);
        }
    }
    public class IPStatement
    {
        public long RegSerId { get; set; }
        public string RegSerName { get; set; }
        public long RegNo { get; set; }
        public long PatientId { get; set; }
        public long IPNumber { get; set; }
        public long IPYear { get; set; }
        public long OPVisit { get; set; }
        public string Patient { get; set; }
        public string Date { get; set; }
        public string Department { get; set; }
        public long BillNo { get; set; }
        public long BillYear { get; set; }
        public decimal Amount { get; set; }
        public string Remarks { get; set; }
        public string BillSeries { get; set; }
        public string billAmount { get; set; }
        public string RecAmount { get; set; }
        public string balance { get; set; }




        public int Days { get; set; }
        public decimal Rate { get; set; }
        public int Flag { get; set; }
        public string Status { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        //anu
        //

        public string ProcId { get; set; }
        public string procName { get; set; }
        public string ProcDays { get; set; }
        public string Prochours { get; set; }
        public string procRate { get; set; }
        public string ProcAmount { get; set; }





        public long BillId { get; set; }



        public string Paytype { get; set; }

        public string BillType { get; set; }
        public decimal Cash { get; set; }
        public decimal UPI { get; set; }
        public decimal Card { get; set; }

        public string var1 { get; set; }
        public string var2 { get; set; }
        public string var3 { get; set; }
        public string var4 { get; set; }

        DReVisit oDReVisit = new DReVisit();

        //anu        

        public DataSet HMS_CreditBillGets(IPStatement IPStatement, string dbName)
        {
            return oDReVisit.HMS_CreditBillGets(IPStatement, dbName);
        }


        public DataSet CreditBillInsertandUpdate(DataTable dt, string dbName)
        {
            return oDReVisit.CreditBillInsertandUpdate(dt, dbName);
        }
        //anu
        public DataSet HMS_IPStatement(IPStatement IPStatement, string dbName)
        {
            return oDReVisit.HMS_IPStatement(IPStatement, dbName);
        }


        public DataSet HMS_IPStatementautoFee(IPStatement IPStatement, string dbName)
        {
            return oDReVisit.HMS_IPStatementautoFee(IPStatement, dbName);
        }


        public DataSet HMS_IPAdvanceDetailsGets(IPStatement IPStatement, string dbName)
        {
            return oDReVisit.HMS_IPAdvanceDetailsGets(IPStatement, dbName);
        }


        public DataSet HMS_IPStatementRoom(IPStatement IPStatement, string dbName)
        {
            return oDReVisit.HMS_IPStatementRoom(IPStatement, dbName);
        }

    }
    public class HMSDashBoard
    {
        public string Status { get; set; }
        public string Amount1 { get; set; }
        public string Amount2 { get; set; }
        public string Amount3 { get; set; }
        public string Amount4 { get; set; }
        public string Amount5 { get; set; }
        public string Title { get; set; }
        public long Flag { get; set; }
        public string Visit { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Appoinment { get; set; }
        public string TotalDoctors { get; set; }
        public string AvailDoctors { get; set; }
        public string TotalPatients { get; set; }
        public string NewRegistration { get; set; }
        public string TotalRevisit { get; set; }
        public string TodayRevisit { get; set; }
        public string Admitted { get; set; }
        public string NewIP { get; set; }
        public string Discharge { get; set; }
        public string Rooms { get; set; }
        public decimal LabBill { get; set; }
        public decimal ProcedureBill { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string ToDay { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }


        DReVisit oDReVisit = new DReVisit();
        public DataSet HMS_DashBoardWidgets(HMSDashBoard HMSDashBoard, string dbName)
        {
            return oDReVisit.HMS_DashBoardWidgets(HMSDashBoard, dbName);
        }
        public DataSet HMS_DB_DoctorDeptGraph(HMSDashBoard HMSDashBoard, string dbName)
        {
            return oDReVisit.HMS_DB_DoctorDeptGraph(HMSDashBoard, dbName);
        }
        public DataSet HMS_DB_RegRevisitGraph(HMSDashBoard HMSDashBoard, string dbName)
        {
            return oDReVisit.HMS_DB_RegRevisitGraph(HMSDashBoard, dbName);
        }
        public DataSet HMS_DB_BillGraph(HMSDashBoard HMSDashBoard, string dbName)
        {
            return oDReVisit.HMS_DB_BillGraph(HMSDashBoard, dbName);
        }
        public DataSet HMS_DB_SalesBillGraph(HMSDashBoard HMSDashBoard, string dbName)
        {
            return oDReVisit.HMS_DB_SalesBillGraph(HMSDashBoard, dbName);
        }

    }

    public class LabWorksheetSave
    {
        public long SampleId { get; set; }
        public long Pid { get; set; }
        public long RegNo { get; set; }
        public long VerifiedUser { get; set; }
        public long ApprovedUser { get; set; }
        public long userid { get; set; }
        public int Flag { get; set; }
        public string Status { get; set; }
        public long RecId { get; set; }
        public string SampleDate { get; set; }
        DReVisit oDReVisit = new DReVisit();
        public DataSet HMS_LabResultVerificationInsert(
            LabWorksheetSave model, string dbName)
        {
            return oDReVisit.HMS_LabResultVerificationInsert(model, dbName);
        }
        public DataSet HMS_LabResultVerificationGet(
            LabWorksheetSave model, string dbName)
        {
            return oDReVisit.HMS_LabResultVerificationGet(model, dbName);
        }
    }

    public class NurseModal
    {
        public string ProjectImages = "ProjectImages";
        public string FolderName = "Nurse";
        public long NurseId { get; set; }
        public long NuDept { get; set; }
        public long NuUserId { get; set; }
        public long Flag { get; set; }
        public long DelFlag { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public string NuName { get; set; }
        public string NuGender { get; set; }
        public string NuMobile { get; set; }
        public string NuPhone { get; set; }
        public string NuEmail { get; set; }
        public string NuLanguage { get; set; }
        public string NuAddress1 { get; set; }
        public string NuAddress2 { get; set; }
        public string NuAddress3 { get; set; }
        public string NuSpecialization { get; set; }
        public string NuExperience { get; set; }
        public string NuDesignation { get; set; }
        public string NuTraining { get; set; }
        public string NuCertification { get; set; }

        public string NuAcheivement { get; set; }
        public string NuUser { get; set; }
        public string NuQualification1 { get; set; }
        public string NuQualification2 { get; set; }
        public string NuQualification3 { get; set; }
        public string NuQualification4 { get; set; }
        public string NuQualification5 { get; set; }
        public string Status { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public string Variable3 { get; set; }
        public string NuImgName { get; set; }

        DReVisit oDReVisit = new DReVisit();

        public DataSet HMS_NurseInsertAndUpdate(NurseModal NurseModal, string dbName)
        {
            return oDReVisit.HMS_NurseInsertAndUpdate(NurseModal, dbName);
        }
        public DataSet HMS_NurseGetandGets(NurseModal NurseModal, string dbName)
        {
            return oDReVisit.HMS_NurseGetandGets(NurseModal, dbName);
        }

    }
    public class HMSReportModal
    {
        public string ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDesc { get; set; }
        public string BatchSlNo { get; set; }
        public string Batch { get; set; }
        public string Quantity { get; set; }
        public string LooseQuantity { get; set; }
        public string OPQuantity { get; set; }
        public string OPLooseQuantity { get; set; }
        public string LocationId { get; set; }
        public string Cost { get; set; }
        public string Price { get; set; }
        public string PurAmount { get; set; }
        public string SellAmount { get; set; }
        public string TransType { get; set; }
        public string Flag { get; set; }
        public string Company { get; set; }
        public string MedType { get; set; }
        public string MedSchedule { get; set; }
        public string CompanyId { get; set; }
        public string MedTypeId { get; set; }
        public string MedScheduleId { get; set; }
        public string Expiry { get; set; }

        public string Param1 { get; set; }
        public string Param10 { get; set; }
        public long Param2 { get; set; }
        public long Param3 { get; set; }
        public long Param4 { get; set; }
        public long Param5 { get; set; }
        public long Param6 { get; set; }
        public long Param7 { get; set; }
        public long Param8 { get; set; }
        public long Param9 { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }

        DReVisit oDReVisit = new DReVisit();
        public DataSet HMS_Rpt_StockReport(HMSReportModal HMSReportModal, string dbName)
        {
            return oDReVisit.HMS_Rpt_StockReport(HMSReportModal, dbName);
        }
        public DataSet HMS_Rpt_AsOnStockReport(HMSReportModal HMSReportModal, string dbName)
        {
            return oDReVisit.HMS_Rpt_AsOnStockReport(HMSReportModal, dbName);
        }
        public DataSet HMS_Rpt_ItemExpiry(HMSReportModal HMSReportModal, string dbName)
        {
            return oDReVisit.HMS_Rpt_ItemExpiry(HMSReportModal, dbName);
        }
        public DataSet HMS_Rpt_OpeningStock(HMSReportModal HMSReportModal, string dbName)
        {
            return oDReVisit.HMS_Rpt_OpeningStock(HMSReportModal, dbName);
        }



    }



}




public class VaccineModal
{
    public long VacId { get; set; }
    public long OPVisit { get; set; }
    public long IPNumber { get; set; }
    public long IPYear { get; set; }
    public long PRegSer { get; set; }
    public long PRegNo { get; set; }
    public long VaccineId { get; set; }
    public long BrandId { get; set; }
    public long UserId { get; set; }
    public long DeptId { get; set; }
    public long DelFlag { get; set; }
    public long Flag { get; set; }
    public string IType { get; set; }
    public string VaccineName { get; set; }
    public string GivenDate { get; set; }
    public string NextDate { get; set; }
    public string VaccineStatus { get; set; }
    public string VaccineDosage { get; set; }
    public string Status { get; set; }
    public string Daily { get; set; }
    public string Days { get; set; }
    
    DHospital oDHospital = new DHospital();

    public DataSet HMS_ImmunizationUpdate(DataTable dt, string dbName)
    {
        return oDHospital.HMS_ImmunizationUpdate(dt, dbName);
    }
    public DataSet HMS_ImmunizationGets(VaccineModal VaccineModal, string dbName)
    {
        return oDHospital.HMS_ImmunizationGets(VaccineModal, dbName);
    }







}
