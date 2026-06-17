using System;
using System.ComponentModel.DataAnnotations;

namespace EUMI_ERP.Models
{
    public class DonarRegistrationModel
    {
        public int DonarId { get; set; }

        [Required(ErrorMessage = "Donor Name is required")]
        public string DonarName { get; set; }

        [Required(ErrorMessage = "Gender is required")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "Date of Birth is required")]
        public DateTime? DOB { get; set; }

        [Required(ErrorMessage = "Blood Group is required")]
        public string BloodGroup { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        public string Phone { get; set; }

        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime? LastDonationDate { get; set; }
        public string Disease { get; set; }
    }
}