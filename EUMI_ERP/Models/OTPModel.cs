using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class OTPModel
    {
        public long UserId { get; set; }
        public string OTP { get; set; }
        public int OTPCount { get; set; }
        public string Operation { get; set; }
        public string Remarks { get; set; }
        public string Status { get; set; }
        public int Deactivate { get; set; }
        public int DeptId { get; set; }

        DMasters oDMasters = new DMasters();
        public DataSet OTPInsertandUpdate(OTPModel OTPModel, string dbName)
        {
            return oDMasters.OTPInsertandUpdate(OTPModel, dbName);
        }
        public DataSet OTPGetandGets(OTPModel OTPModel, string dbName)
        {
            return oDMasters.OTPGetandGets(OTPModel, dbName);
        }
        public DataSet OTPCheckforUser(OTPModel OTPModel, string dbName)
        {
            return oDMasters.OTPCheckforUser(OTPModel, dbName);
        }
        

    }
}