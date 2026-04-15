using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using EUMI_ERP.Models;

namespace EUMI_ERP.DataLayer
{
    public class DOTRegistration
    {
        private SqlParameter[] arlParms;
        string conStr = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        // ── Save / Update ────────────────────────────────────────
        public int SaveOTRegistration(OTRegistrationModel model, string dbName,
            out string errorMessage, out string conflictType,
            out string conflictPatientName, out string conflictRegNo,
            out string conflictOpDate, out string conflictOpTime)
        {
            errorMessage = ""; conflictType = "";
            conflictPatientName = ""; conflictRegNo = "";
            conflictOpDate = ""; conflictOpTime = "";

            try
            {
                arlParms = new SqlParameter[19];
                arlParms[0] = new SqlParameter("@OTRegistrationId", model.OTRegistrationId == 0 ? (object)DBNull.Value : model.OTRegistrationId);
                arlParms[1] = new SqlParameter("@PatientId", model.PatientId);
                arlParms[2] = new SqlParameter("@RegNo", model.RegNo ?? (object)DBNull.Value);
                arlParms[3] = new SqlParameter("@OpNo", model.OpNo ?? (object)DBNull.Value);
                arlParms[4] = new SqlParameter("@IpNo", string.IsNullOrEmpty(model.IpNo) ? (object)DBNull.Value : model.IpNo);
                arlParms[5] = new SqlParameter("@IpYear", DBNull.Value);
                arlParms[6] = new SqlParameter("@RevisitId", model.RevisitId == 0 ? (object)DBNull.Value : (object)model.RevisitId);
                arlParms[7] = new SqlParameter("@PatientName", model.PatientName ?? (object)DBNull.Value);
                arlParms[8] = new SqlParameter("@Age", model.Age ?? (object)DBNull.Value);
                arlParms[9] = new SqlParameter("@Gender", model.Gender ?? (object)DBNull.Value);
                arlParms[10] = new SqlParameter("@ContactNo", model.ContactNo ?? (object)DBNull.Value);
                arlParms[11] = new SqlParameter("@OpDate", model.OpDate);
                arlParms[12] = new SqlParameter("@OpTime", model.OpTime);
                arlParms[13] = new SqlParameter("@DoctorConsultant", model.DoctorConsultant);
                arlParms[14] = new SqlParameter("@OperationTheatre", model.OperationTheatre);
                arlParms[15] = new SqlParameter("@Status", model.Status);
                arlParms[16] = new SqlParameter("@Notes", model.Notes ?? (object)DBNull.Value);
                arlParms[17] = new SqlParameter("@UserId", model.UserId);
                arlParms[18] = new SqlParameter("@DeptId", model.DeptId);

                DataSet ds = SQLHelper.ExecuteDataset("HMS_OTRegistrationInsertUpdate", dbName, arlParms);

                if (ds == null || ds.Tables.Count == 0 || ds.Tables[0].Rows.Count == 0)
                {
                    errorMessage = "No result returned from stored procedure.";
                    return 0;
                }

                DataRow row = ds.Tables[0].Rows[0];
                int status = Convert.ToInt32(row["Status"]);
                errorMessage = row["Message"].ToString();

                if (status == 0 && errorMessage == "OT_THEATRE_CONFLICT")
                {
                    conflictType = "OT_THEATRE_CONFLICT";
                    conflictPatientName = row["PatientName"].ToString();
                    conflictRegNo = row["RegNo"].ToString();
                    conflictOpDate = row["OpDate"].ToString();
                    conflictOpTime = row["OpTime"].ToString();
                }
                else if (status == 0 && errorMessage.Contains("already has an OT registration"))
                {
                    conflictType = "PATIENT_CONFLICT";
                }

                return status;
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
        }

        // ── Doctor List ──────────────────────────────────────────
        public DataSet HMS_OTDoctorGets(OTRegistrationModel obj, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DoctorId", obj.DoctorId);
                arlParms[1] = new SqlParameter("@DeptId", obj.DeptId);
                return SQLHelper.ExecuteDataset("HMS_OTDoctorGets", dbName, arlParms);
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        // ── Patient Search ───────────────────────────────────────
        public DataSet HMS_OTPorPatientSearch(OTRegistrationModel obj, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PName", obj.PatientName);
                arlParms[1] = new SqlParameter("@DeptId", obj.DeptId);
                return SQLHelper.ExecuteDataset("HMS_OTPorPatientSearch", dbName, arlParms);
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        // ── Last Revisit ─────────────────────────────────────────
        public DataSet HMS_OTLastRevisitGetsop(OTRegistrationModel obj, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PatientId", obj.PatientId);
                arlParms[1] = new SqlParameter("@DeptId", obj.DeptId);
                return SQLHelper.ExecuteDataset("HMS_OTLastRevisitGetsop", dbName, arlParms);
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        // ── Room / OT List ───────────────────────────────────────
        public DataSet HMS_OTRoomGetandGets(OTRegistrationModel obj, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@RoomId", obj.RoomId);
                arlParms[1] = new SqlParameter("@UserId", obj.UserId);
                arlParms[2] = new SqlParameter("@DeptId", obj.DeptId);
                return SQLHelper.ExecuteDataset("HMS_OTRoomGetandGets", dbName, arlParms);
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        // ── Registration List ────────────────────────────────────
        public DataSet HMS_OTRegistrationList(OTRegistrationModel obj, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromInsDate", SqlDbType.VarChar, 20);
                arlParms[0].Value = string.IsNullOrEmpty(obj.FromInsDate) ? DBNull.Value : (object)obj.FromInsDate;

                arlParms[1] = new SqlParameter("@ToInsDate", SqlDbType.VarChar, 20);
                arlParms[1].Value = string.IsNullOrEmpty(obj.ToInsDate) ? DBNull.Value : (object)obj.ToInsDate;

                arlParms[2] = new SqlParameter("@Status", SqlDbType.Int);
                arlParms[2].Value = obj.FilterStatus.HasValue ? (object)obj.FilterStatus.Value : DBNull.Value;

                arlParms[3] = new SqlParameter("@DeptId", obj.DeptId);

                return SQLHelper.ExecuteDataset("HMS_OTRegistrationGets", dbName, arlParms);
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        // ── Get By Id ────────────────────────────────────────────
        public DataSet HMS_OTRegistrationGet(int otRegistrationId, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@OTRegistrationId", otRegistrationId);
                return SQLHelper.ExecuteDataset("HMS_OTRegistrationGet", dbName, arlParms);
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        // ── Delete ───────────────────────────────────────────────
        public int DeleteOTRegistration(int otRegistrationId, int userId, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@OTRegistrationId", otRegistrationId);
                arlParms[1] = new SqlParameter("@UserId", userId);

                DataSet ds = SQLHelper.ExecuteDataset("HMS_OTRegistrationDelete", dbName, arlParms);

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    return Convert.ToInt32(ds.Tables[0].Rows[0]["Status"]);

                return 0;
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
        }
    }
}