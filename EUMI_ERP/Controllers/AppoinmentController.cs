using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.Controllers
{
    public class AppoinmentController : Controller
    {
        // GET: Appoinment
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Appoinmentandschedule()
        {
            return View();
        }


        public class AppointmentsController : Controller
        {
            // Get Connection String from Web.config
            private string _connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            // GET: Appointments
            public ActionResult Index()
            {
                return View();
            }

            /// <summary>
            /// Gets list of booked slots for a specific doctor and date.
            /// Called via AJAX when date/doctor changes.
            /// </summary>
            [HttpGet]
            public JsonResult GetBookedSlots(string doctorId, string date)
            {
                var bookedSlots = new List<object>();

                try
                {
                    using (SqlConnection con = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand("sp_GetBookedSlots", con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@DoctorId", doctorId);
                            cmd.Parameters.AddWithValue("@AppointmentDate", DateTime.Parse(date));

                            con.Open();
                            using (SqlDataReader rdr = cmd.ExecuteReader())
                            {
                                while (rdr.Read())
                                {
                                    bookedSlots.Add(new
                                    {
                                        time = rdr["AppointmentTime"].ToString(),
                                        patientName = rdr["FirstName"].ToString(),
                                        patientPhone = rdr["Contact"].ToString(),
                                        mrNumber = rdr["LastName"].ToString()
                                    });
                                }
                            }
                        }
                    }
                    return Json(bookedSlots, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(new { error = ex.Message }, JsonRequestBehavior.AllowGet);
                }
            }

            /// <summary>
            /// Saves a new appointment.
            /// Called via AJAX on Form Submit.
            /// </summary>
            [HttpPost]
            public JsonResult BookAppointment(Appointment model)
            {
                if (!ModelState.IsValid)
                {
                    return Json(new { success = false, message = "Invalid data provided." });
                }

                try
                {
                    using (SqlConnection con = new SqlConnection(_connectionString))
                    {
                        using (SqlCommand cmd = new SqlCommand("sp_BookAppointment", con))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;

                            cmd.Parameters.AddWithValue("@FirstName", model.FirstName);
                            cmd.Parameters.AddWithValue("@LastName", model.LastName ?? "");
                            cmd.Parameters.AddWithValue("@DOB", model.DOB ?? (object)DBNull.Value);
                            cmd.Parameters.AddWithValue("@Department", model.Department ?? "");
                            cmd.Parameters.AddWithValue("@Gender", model.Gender);
                            cmd.Parameters.AddWithValue("@Nationality", model.Nationality ?? "");
                            cmd.Parameters.AddWithValue("@Contact", model.Contact);
                            cmd.Parameters.AddWithValue("@Email", model.Email ?? "");
                            cmd.Parameters.AddWithValue("@Branch", model.Branch ?? ""); // Token No
                            cmd.Parameters.AddWithValue("@Doctor", model.Doctor);
                            cmd.Parameters.AddWithValue("@AppointmentDate", model.AppointmentDate);
                            cmd.Parameters.AddWithValue("@AppointmentTime", model.AppointmentTime);
                            cmd.Parameters.AddWithValue("@DeptId", model.DeptId);
                            cmd.Parameters.AddWithValue("@UserId", model.UserId);
                            cmd.Parameters.AddWithValue("@Age", model.Age);
                            cmd.Parameters.AddWithValue("@Status1", "Active");
                            cmd.Parameters.AddWithValue("@Status2", "Booked");

                            con.Open();

                            // ExecuteScalar to get the result code from SP
                            using (SqlDataReader rdr = cmd.ExecuteReader())
                            {
                                if (rdr.Read())
                                {
                                    int resultCode = Convert.ToInt32(rdr["ResultCode"]);
                                    string message = rdr["Message"].ToString();

                                    if (resultCode > 0)
                                    {
                                        return Json(new { success = true, message = "Appointment booked successfully!", id = resultCode });
                                    }
                                    else
                                    {
                                        return Json(new { success = false, message = message }); // e.g., Slot already booked
                                    }
                                }
                            }
                        }
                    }
                    return Json(new { success = false, message = "Unknown error occurred." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, message = "Database error: " + ex.Message });
                }
            }
        }




    }
}
