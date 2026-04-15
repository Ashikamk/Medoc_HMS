using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class Doctorsmaster
    {
        public string UserName { get; set; }
        public long DoctorsId { get; set; }
        public long Doctor_UserId { get; set; }
        public string Name { get; set; }
        public string CurrentDate { get; set; }
        public string Gender { get; set; }
        public string Designation { get; set; }
        public string Training { get; set; }
        public string Acheivement { get; set; }
        public string Certification { get; set; }
        public string Qualification { get; set; }
        public string Qualification1 { get; set; }
        public string Qualification2 { get; set; }
        public string Qualification3 { get; set; }
        public string Qualification4{ get; set; }
        public string Language { get; set; }

        public string Department { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string PhoneNumber { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string selectedImage { get; set; }
        public int  Active { get; set; }
        public Decimal Consultancy { get; set; }
        public string Experience { get; set; }
        public string Specialization { get; set; }
        public long DeptId { get; set; }
        public int DelFlag { get; set; }
        public string Statusdoc { get; set; }


        DMasters oDMasters = new DMasters();

        public DataSet DoctorInsertandUpdate(Doctorsmaster Agent, string dbName)
        {
            return oDMasters.DoctorInsertandUpdate(Agent, dbName);
        }
        public DataSet DoctorGetandGets(Doctorsmaster Agent, string dbName)
        {
            return oDMasters.DoctorGetandGets(Agent, dbName);
        }
        public DataSet HMS_DoctorsSearch(Doctorsmaster Agent, string dbName)
        {
            return oDMasters.HMS_DoctorsSearch(Agent, dbName);
        }
        public DataSet HMS_DashboardDoctorGets(Doctorsmaster Agent, string dbName)
        {
            return oDMasters.HMS_DashboardDoctorGets(Agent, dbName);
        }
    }
}