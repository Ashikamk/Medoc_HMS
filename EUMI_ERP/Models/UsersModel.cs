using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class UsersModel
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }


        public string UserRole { get; set; }
        public string Password { get; set; }
       
        public string ConfirmPassword { get; set; }
        public string Email { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public string AccountGroup { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public long DivId { get; set; }
        public long DefaultDep { get; set; }
        public long DefaultLoc { get; set; }
        public decimal DiscountPercent { get; set; }

        DMasters oDMasters = new DMasters();


        public DataSet UsersGetandGets(UsersModel oUsersModel, string dbName)
        {
            return oDMasters.UsersGetandGets(oUsersModel, dbName);
        }
        public DataSet UserDepartmentGets(UsersModel oUsersModel, string dbName)
        {
            return oDMasters.UserDepartmentGets(oUsersModel, dbName);
        }

        
        public DataSet UsersInsertandUpdate(UsersModel oUsersModel, string dbName)
        {
            return oDMasters.UsersInsertandUpdate(oUsersModel, dbName);
        }
        public DataSet UserSearch(UsersModel oUsersModel, string dbName)
        {
            return oDMasters.UserSearch(oUsersModel, dbName);
        }
        public DataSet UserMenuUpdate(UsersModel oUsersModel, string dbName)
        {
            //return oDMasters.UserMenuUpdate(oUsersModel, dbName);
            return null;
        }
        public DataSet UsersGetandGetschat(UsersModel oUsersModel, string dbName)
        {
            return oDMasters.UsersGetandGetschat(oUsersModel, dbName);
        }
    }


}