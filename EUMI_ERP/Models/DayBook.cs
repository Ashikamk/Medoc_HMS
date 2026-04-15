using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;


namespace EUMI_ERP.Models
{
    public class DayBook
    {

        public string VoucherNo { get; set; }

        public string VDescription { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public string ChequeNo { get; set; } 
        public long DepartmentId { get; set; }

        public string Debit { get; set; }
        public string Balance { get; set; }

        public string Credit { get; set; }
        DMasters oDMasters = new DMasters();
        public DataSet DayBookGetandGets(DayBook DayBookModel, string dbName)
        {
            return oDMasters.DayBookGetandGets(DayBookModel, dbName);
        }

    }
}