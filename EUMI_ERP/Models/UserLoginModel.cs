using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class UserLoginModel
    {
        public long UserLoginId { get; set; }
      
        DMasters oDMasters = new DMasters();
        public DataSet UserLoginInsertandUpdate(UserLoginModel oUserLoginModel, string dbName)
        {
            return null;
        }
    }
}