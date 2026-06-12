using System;
using System.Data;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class OTRegistrationModel
    {
        // ── Patient Info ─────────────────────────────────────────
        public int OTRegistrationId { get; set; }
        public long PatientId { get; set; }
        public string RegNo { get; set; }
        public string RegSeries { get; set; }
        public string PatientName { get; set; }
        public string Age { get; set; }
        public string Gender { get; set; }
        public string ContactNo { get; set; }
        public string IpNo { get; set; }
        public string OpNo { get; set; }
        public long RevisitId { get; set; }
        public string DOB { get; set; }
        public string Contact { get; set; }
        public string BloodGroup { get; set; }
        public int Flag { get; set; }
        public string FlagText { get; set; }
        public string Weight { get; set; }
        public string AadharNo { get; set; }
        public string HealthCard { get; set; }
        public string Add1 { get; set; }
        public string Add2 { get; set; }
        public string Add3 { get; set; }

        // ── OP / Revisit ─────────────────────────────────────────
        public long OPNumber { get; set; }
        public string OPSerName { get; set; }
        public long OPSerId { get; set; }
        public long RevId { get; set; }
        public string RevisitDate { get; set; }
        public string TokenNumber { get; set; }
        public string OPCaseSheet { get; set; }
        public string IPCaseSheet { get; set; }
        public string LastVisit { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string RegDate { get; set; }
        public string ShiftName { get; set; }
        public string SpecialFees { get; set; }
        public string SendSMS { get; set; }
        public string Fname { get; set; }
        public string Mname { get; set; }
        public string Foccupation { get; set; }
        public string Moccupation { get; set; }

        // ── Doctor ───────────────────────────────────────────────
        public long DoctorId { get; set; }
        public string DoctorName { get; set; }
        public decimal ConsultFees { get; set; }
        public int DoctorConsultant { get; set; }

        // ── Room / OT ────────────────────────────────────────────
        public long RoomId { get; set; }
        public string RoomCode { get; set; }
        public string RoomName { get; set; }
        public string Remarks { get; set; }
        public decimal Rate { get; set; }
        public int OperationTheatre { get; set; }

        // ── Operation Details ────────────────────────────────────
        public string OpDate { get; set; }
        public string OpTime { get; set; }
        public string Status { get; set; }
        public int? FilterStatus { get; set; }
        public string Notes { get; set; }

        // ── Filters ──────────────────────────────────────────────
        public string FromInsDate { get; set; }
        public string ToInsDate { get; set; }

        // ── Session ──────────────────────────────────────────────
        public long UserId { get; set; }
        public long DeptId { get; set; }

        // ── DAL Delegation ───────────────────────────────────────
        private DOTRegistration _dotRegistration = new DOTRegistration();

        public DataSet HMS_OTDoctorGets(OTRegistrationModel obj, string dbName)
        {
            return _dotRegistration.HMS_OTDoctorGets(obj, dbName);
        }

        public DataSet HMS_OTPorPatientSearch(OTRegistrationModel obj, string dbName)
        {
            return _dotRegistration.HMS_OTPorPatientSearch(obj, dbName);
        }

        public DataSet HMS_OTLastRevisitGetsop(OTRegistrationModel obj, string dbName)
        {
            return _dotRegistration.HMS_OTLastRevisitGetsop(obj, dbName);
        }

        public DataSet HMS_OTRoomGetandGets(OTRegistrationModel obj, string dbName)
        {
            return _dotRegistration.HMS_OTRoomGetandGets(obj, dbName);
        }

        public DataSet HMS_OTRegistrationList(OTRegistrationModel obj, string dbName)
        {
            return _dotRegistration.HMS_OTRegistrationList(obj, dbName);
        }

        public DataSet HMS_OTRegistrationGet(int otRegistrationId, string dbName)
        {
            return _dotRegistration.HMS_OTRegistrationGet(otRegistrationId, dbName);
        }

        public int SaveOTRegistration(OTRegistrationModel obj, string dbName,
            out string errorMessage, out string conflictType,
            out string conflictPatientName, out string conflictRegNo,
            out string conflictOpDate, out string conflictOpTime)
        {
            return _dotRegistration.SaveOTRegistration(obj, dbName,
                out errorMessage, out conflictType,
                out conflictPatientName, out conflictRegNo,
                out conflictOpDate, out conflictOpTime);
        }

        public int DeleteOTRegistration(int otRegistrationId, int userId, string dbName)
        {
            return _dotRegistration.DeleteOTRegistration(otRegistrationId, userId, dbName);
        }
    }
}