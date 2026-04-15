using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class HMS_EOD
    {
        public long EODId { get; set; }
        public string EODDate { get; set; }
        public string Status { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }

        DMasters oDmaster = new DMasters();
        public DataSet HMS_EODUpdate(HMS_EOD HMS_EOD, string dbname)
        {
            return oDmaster.HMS_EODUpdate(HMS_EOD, dbname);
        }
    }
}
