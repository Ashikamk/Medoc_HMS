using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Web.Mvc;

namespace EUMI_ERP.Controllers
{
    public class OTController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        OTRegistrationModel objModel = new OTRegistrationModel();

        public ActionResult OTRegistration()
        {
            return View();
        }

        // ── Save / Update ────────────────────────────────────────
        [HttpPost]
        public JsonResult OTRegistrationInsert(OTRegistrationModel model)
        {
            try
            {
                string errorMessage, conflictType, conflictPatientName,
                       conflictRegNo, conflictOpDate, conflictOpTime;

                int result = objModel.SaveOTRegistration(model, dbName,
                    out errorMessage, out conflictType,
                    out conflictPatientName, out conflictRegNo,
                    out conflictOpDate, out conflictOpTime);

                if (result > 0)
                {
                    string msg = model.OTRegistrationId == 0
                        ? "OT Registration saved successfully"
                        : "OT Registration updated successfully";
                    return Json(new { Status = 1, Message = msg });
                }
                else if (conflictType == "OT_THEATRE_CONFLICT")
                {
                    return Json(new
                    {
                        Status = 0,
                        ConflictType = "OT_THEATRE_CONFLICT",
                        PatientName = conflictPatientName,
                        RegNo = conflictRegNo,
                        OpDate = conflictOpDate,
                        OpTime = conflictOpTime,
                        Message = "Operation theatre already booked for this date."
                    });
                }
                else if (conflictType == "PATIENT_CONFLICT")
                {
                    return Json(new
                    {
                        Status = 0,
                        ConflictType = "PATIENT_CONFLICT",
                        Message = "This patient already has an OT registration for this date."
                    });
                }
                else
                {
                    return Json(new { Status = 0, Message = errorMessage });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = 0, Message = ex.Message });
            }
        }

        // ── Doctor List ──────────────────────────────────────────
        [HttpPost]
        public JsonResult HMS_OTDoctorGets(OTRegistrationModel model)
        {
            var oList = new List<object>();
            try
            {
                model.DeptId = Convert.ToInt64(Session["DeptId"] ?? 1);
                DataSet ds = objModel.HMS_OTDoctorGets(model, dbName);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    oList.Add(new
                    {
                        DoctorId = Convert.ToInt32(row["DocId"]),
                        DoctorName = row["Name"].ToString()
                    });
                }
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        // ── Patient Search ───────────────────────────────────────
        [HttpPost]
        public JsonResult HMS_OTPorPatientSearch(OTRegistrationModel model)
        {
            var oList = new List<object>();
            try
            {
                model.DeptId = Convert.ToInt64(Session["DeptId"] ?? 1);
                DataSet ds = objModel.HMS_OTPorPatientSearch(model, dbName);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    oList.Add(new
                    {
                        PatientId = Convert.ToInt32(row["RegId"]),
                        OPNumber = Convert.ToInt64(row["RegNo"]),
                        PatientName = row["PName"].ToString(),
                        DOB = row["PDOB"].ToString(),
                        Contact = row["MobileNo"].ToString(),
                        OPSerName = row["Prefix"].ToString(),
                        Gender = row["PGender"].ToString(),
                        OPSerId = Convert.ToInt32(row["RegSeries"]),
                        AadharNo = row["IPNumber"].ToString(),
                        Add1 = row["Address"].ToString(),
                        Mobile = row["MobileNo"].ToString(),
                        Flag = row["PGender"].ToString()
                    });
                }
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); }

            return Json(oList, JsonRequestBehavior.AllowGet);
        }

        // ── Last Revisit ─────────────────────────────────────────
        [HttpPost]
        public JsonResult HMS_OTLastRevisitGetsop(OTRegistrationModel model)
        {
            var oList = new List<object>();
            try
            {
                model.DeptId = Convert.ToInt64(Session["DeptId"] ?? 1);
                DataSet ds = objModel.HMS_OTLastRevisitGetsop(model, dbName);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    oList.Add(new
                    {
                        RevId = Convert.ToInt32(row["PId"]),
                        RevisitId = Convert.ToInt32(row["Revisit_Id"]),
                        PatientId = Convert.ToInt32(row["RegId"]),
                        OPNumber = Convert.ToInt64(row["RegNo"]),
                        PatientName = row["PName"].ToString(),
                        DoctorId = Convert.ToInt32(row["Doctor_Id"]),
                        Gender = row["PGender"].ToString(),
                        DOB = row["PDOB"].ToString(),
                        Contact = row["MobileNo"].ToString(),
                        Flag = Convert.ToInt32(row["PGenderId"]),
                        OPSerId = Convert.ToInt32(row["RegSeries"]),
                        OPSerName = row["IPNumber"].ToString()
                    });
                }
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        // ── Room / OT List ───────────────────────────────────────
        [HttpPost]
        public JsonResult HMS_OTRoomGetandGets(OTRegistrationModel model)
        {
            var oList = new List<object>();
            try
            {
                model.RoomId = 0;
                model.UserId = Convert.ToInt64(Session["UserId"] ?? 1);
                model.DeptId = 0;

                DataSet ds = objModel.HMS_OTRoomGetandGets(model, dbName);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    oList.Add(new
                    {
                        RoomId = Convert.ToInt64(row["RoomId"]),
                        RoomCode = row["RoomCode"].ToString(),
                        RoomName = row["RoomName"].ToString()
                    });
                }
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); }

            return new JsonResult { Data = new { oList }, MaxJsonLength = 86753090 };
        }

        // ── Registration List ────────────────────────────────────
        [HttpPost]
        public JsonResult HMS_OTRegistrationList(string FromInsDate, string ToInsDate, int? Status)
        {
            var list = new List<object>();
            try
            {
                OTRegistrationModel filter = new OTRegistrationModel
                {
                    FromInsDate = FromInsDate,
                    ToInsDate = ToInsDate,
                    FilterStatus = Status,
                    DeptId = Convert.ToInt64(Session["DeptId"] ?? 1)
                };

                DataSet ds = objModel.HMS_OTRegistrationList(filter, dbName);

                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    list.Add(new
                    {
                        OTRegistrationId = Convert.ToInt32(row["OTRegistrationId"]),
                        OpDate = row["OpDate"].ToString(),
                        OpTime = row["OpTime"].ToString(),
                        PatientName = row["PatientName"].ToString(),
                        RegNo = row["RegNo"].ToString(),
                        DoctorName = row["DoctorName"].ToString(),
                        RoomName = row["OTName"].ToString(),
                        Status = row["Status"].ToString()
                    });
                }
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); }

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        // ── Get By Id ────────────────────────────────────────────
        [HttpPost]
        public JsonResult GetOTRegistrationById(int OTRegistrationId)
        {
            var model = new OTRegistrationModel();
            try
            {
                DataSet ds = objModel.HMS_OTRegistrationGet(OTRegistrationId, dbName);

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    DataRow row = ds.Tables[0].Rows[0];
                    model.OTRegistrationId = Convert.ToInt32(row["OTRegistrationId"]);
                    model.PatientId = Convert.ToInt32(row["PatientId"]);
                    model.RegNo = row["RegNo"].ToString();
                    model.PatientName = row["PatientName"].ToString();
                    model.Age = row["Age"].ToString();
                    model.Gender = row["Gender"].ToString();
                    model.ContactNo = row["ContactNo"].ToString();
                    model.OpDate = row["OpDate"].ToString();
                    model.OpTime = row["OpTime"].ToString();
                    model.DoctorConsultant = Convert.ToInt32(row["DoctorConsultant"]);
                    model.OperationTheatre = Convert.ToInt32(row["OperationTheatre"]);
                    model.Status = row["Status"].ToString();
                    model.Notes = row["Notes"].ToString();
                    model.IpNo = row["IpNo"].ToString();
                    model.OpNo = row["OpNo"].ToString();
                    model.RevisitId = Convert.ToInt64(row["RevisitId"]);
                }
            }
            catch (Exception ex) { Console.WriteLine(ex.Message); }

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        // ── Delete ───────────────────────────────────────────────
        [HttpPost]
        public JsonResult DeleteOTRegistration(int OTRegistrationId)
        {
            try
            {
                int userId = Convert.ToInt32(Session["UserId"] ?? 1);
                int result = objModel.DeleteOTRegistration(OTRegistrationId, userId, dbName);

                return result > 0
                    ? Json(new { Status = 1, Message = "Record deleted successfully" })
                    : Json(new { Status = 0, Message = "Delete failed" });
            }
            catch (Exception ex)
            {
                return Json(new { Status = 0, Message = ex.Message });
            }
        }
    }
}