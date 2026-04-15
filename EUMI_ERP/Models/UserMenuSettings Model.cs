using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
using EUMI_ERP.DataLayer;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class UserMenuSettingsModel
    {
        public string MenuName { get; set; }
        public string MenuCode { get; set; }
        public string MasterId { get; set; }
       public string HFlag { get; set; }
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string UserRole { get; set; }
        public string DepartmentId { get; set; }
        public long RoleId { get; set; }
        public string Name{ get; set; }
        public string Status { get; set; }

        DLocationTransfer oDLocationTransfer = new DLocationTransfer();
        DMasters oDMasters = new DMasters();

        public DataSet SubMenuGetandGets(UserMenuSettingsModel oUserMenuSettingsModel, string dbName)
        {
            return oDLocationTransfer.SubMenuGetandGets(oUserMenuSettingsModel, dbName);
            
        }
        public DataSet UserMenuUpdate(UserMenuSettingsModel oUserMenuSettingsModel, string dbName)
        {
            return oDMasters.UserMenuUpdate(oUserMenuSettingsModel, dbName);
        }
        public DataSet UserSearchInUserMenuSettings(UserMenuSettingsModel oUsersModel, string dbName)
        {
            return oDMasters.UserSearchInUserMenuSettings(oUsersModel, dbName);
        }

        public static DataSet UserMenuSearch(UserMenuSettingsModel oUserLogin, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"SELECT  * FROM  Mst_Users  WHERE UserId = @user and DelFlag=1;";

                var arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@user", SqlDbType.VarChar) { Value = oUserLogin.UserId };
                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }



    }
}