using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Sql;
namespace EUMI_ERP.Models
{
    public class Appointment

    {

        public long AppointmentId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DOB { get; set; }

        public int Age { get; set; }

        public string Gender { get; set; }

        public string Nationality { get; set; }

        public string Contact { get; set; }

        public int DoctorId { get; set; }

        public string Email { get; set; }

        public string Branch { get; set; }

        public string Department { get; set; }

        public string Doctor { get; set; }

        public string Status1 { get; set; }

        public string Status2 { get; set; }

        public string AppointmentDate { get; set; }

        public string AppointmentTime { get; set; }

        public string FromDate { get; set; }

        public string ToDate { get; set; }
    
        public string Date { get; set; }

        public int UserId { get; set; }

        public int DeptId { get; set; }

        public int DelFlag { get; set; }

        public string Status { get; set; }
        public string Name { get; set; }

        DMasters oDMasters = new DMasters();

        public DataSet AppointmentGetandGets(Appointment Appointment, string dbName)

        {

            return oDMasters.AppointmentGetandGets(Appointment, dbName);

        }


        public DataSet GetBookedSession(Appointment Appointment, string dbName)
        {
            return oDMasters.GetBookedSession(Appointment, dbName);
        }


        public DataSet AppointmentSearchList(Appointment Appointment, string dbName)
        {
            return oDMasters.AppointmentSearchList(Appointment, dbName);
        }
        public DataSet HMS_AppointmentSearch(Appointment Appointment, string dbName)
        {
            return oDMasters.HMS_AppointmentSearch(Appointment, dbName);
        }
        public DataSet AppointmentInsertandUpdate(Appointment Appointment, string dbName)
        {
            return oDMasters.AppointmentInsertandUpdate(Appointment, dbName);


        }
    }
}