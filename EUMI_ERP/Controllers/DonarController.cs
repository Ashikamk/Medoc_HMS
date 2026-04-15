using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Mvc;
using EUMI_ERP.Models;

namespace EUMI_ERP.Controllers
{
    public class DonarController : Controller
    {
        string cs = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;

        // GET
        public ActionResult DonarRegistration()
        {
            return View();
        }

        // POST
        [HttpPost]
        public ActionResult DonarRegistration(DonarRegistrationModel model)
        {
            if (ModelState.IsValid)
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    string query = @"INSERT INTO DonarRegistration
                                    (DonarName, Gender, DOB, BloodGroup, Phone, Email, Address, City, State, LastDonationDate, Disease)
                                    VALUES
                                    (@DonarName, @Gender, @DOB, @BloodGroup, @Phone, @Email, @Address, @City, @State, @LastDonationDate, @Disease)";

                    SqlCommand cmd = new SqlCommand(query, con);

                    cmd.Parameters.AddWithValue("@DonarName", model.DonarName);
                    cmd.Parameters.AddWithValue("@Gender", model.Gender);
                    cmd.Parameters.AddWithValue("@DOB", model.DOB);
                    cmd.Parameters.AddWithValue("@BloodGroup", model.BloodGroup);
                    cmd.Parameters.AddWithValue("@Phone", model.Phone);
                    cmd.Parameters.AddWithValue("@Email", model.Email);
                    cmd.Parameters.AddWithValue("@Address", model.Address);
                    cmd.Parameters.AddWithValue("@City", model.City);
                    cmd.Parameters.AddWithValue("@State", model.State);

                    if (model.LastDonationDate == null)
                        cmd.Parameters.AddWithValue("@LastDonationDate", DBNull.Value);
                    else
                        cmd.Parameters.AddWithValue("@LastDonationDate", model.LastDonationDate);

                    cmd.Parameters.AddWithValue("@Disease", model.Disease);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }

                ViewBag.Message = "Success";
                ModelState.Clear();
                return View();
            }

            return View(model);
        }
    }
}
