using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class Aspects
    {
 
        public long EmpID { get; set; }
        public string FromDate { get; set; }
        public string Todate { get; set; }
        public string Intime { get; set; }
        public string Break1In { get; set; }
        public string Break1Out { get; set; }
        public string Break2In { get; set; }
        public string Break2out { get; set; }
        public string Lunchbreakin { get; set; }
        public string LunchbreakOut { get; set; }
        public string overtime { get; set; }
        public string outtime { get; set; }
        public string Flag { get; set; }

        public string EmpCode { get; set; }
        public string EmpName { get; set; }

        DMasters oDMasters = new DMasters();
        public DataSet AspectsGetandGets(Aspects Aspects, string dbName)
        {
            return oDMasters.AspectsGetandGets(Aspects, dbName);
        }






    }
}