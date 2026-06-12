using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    

    public class Profile
    {
        public string Name { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public string Email { get; set; }
        public long UserId { get; set; }
        public string DepartmentId { get; set; }
        public string LocationId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }



        DMasters DProfile = new DMasters(); 


        public DataSet UsersGetandGets(Profile oProfile, string dbName)
        {
            return DProfile.UsersGetandGets(oProfile, dbName);
        }

    }
}