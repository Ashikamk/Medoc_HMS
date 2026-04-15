using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class HomeModel
    {
        private SqlParameter[] arlParms;

        public string MainMenu { get; set; }
        public string UserId { get; set; }
        public string MasterId { get; set; }
        public string MenuCode { get; set; }
        public string MenuName { get; set; }
        public string URL { get; set; }

        public int MasterFlag { get; set; }
        public int InvFlag { get; set; }
        public int ReportFlag { get; set; }
        public string HFlag { get; set; }

        public string Status { get; set; }

        DMasters oDMasters = new DMasters();


        public DataSet MasterUserMenus(HomeModel oHomeModel, string dbName)
        {
            return oDMasters.MasterUserMenus(oHomeModel, dbName);
        }
        public DataSet ReportUserMenus(HomeModel oHomeModel, string dbName)
        {
            return oDMasters.ReportUserMenus(oHomeModel, dbName);
        }
        public DataSet InventoryUserMenus(HomeModel oHomeModel, string dbName)
        {
            return oDMasters.InventoryUserMenus(oHomeModel, dbName);
        }
        public static DataSet GetMenuMaster(HomeModel oHomeModel, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"SELECT * FROM Mst_Menu_Master";

                var arlParms = new SqlParameter[0];
                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }
        public static DataSet GetLatetstMenuCode(HomeModel oHomeModel, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"SELECT  MAX(CONVERT(int ,STUFF ( MenuCode, 1, 1, '')))+1 AS 'Menucode' from Mst_Menu_Sub";

                var arlParms = new SqlParameter[0];
                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }
        
            public DataSet SaveMainMenu(HomeModel HomeModel, string dbName)
            {

            try
            {
                arlParms = new SqlParameter[1];
                string Query = "IF NOT EXISTS(SELECT * FROM Mst_Menu_Master WHERE MenuName = '" + HomeModel.MenuName + "') " +
                                        "BEGIN " +
                                        "INSERT INTO Mst_Menu_Master(MenuName) " +
                                        "VALUES('" + HomeModel.MenuName + "'); " +
                                        "SELECT 1 Status " +
                                        "END " +
                                   "ELSE " +
                                        "BEGIN " +
                                        "SELECT 0 Status " +
                                        "END";

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("CommonQueryRun", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SaveMenuSub(HomeModel HomeModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[1];
                string Query = "IF((SELECT  MAX(CONVERT(INT ,STUFF ( MenuCode, 1, 1, '')))+1 FROM Mst_Menu_Sub)=CONVERT(INT ,STUFF ( '"+ HomeModel.MenuCode+"', 1, 1, ''))) " +
                                   "BEGIN "+
                                   "IF NOT EXISTS(SELECT * FROM Mst_Menu_Sub WHERE MenuCode = '" + HomeModel.MenuCode + "' OR URL = '" + HomeModel.URL + "') " +
		                                "BEGIN "+
                                        "INSERT INTO Mst_Menu_Sub(MasterId,MenuCode,MenuName,URL,MasterFlag,InvFlag,ReportFlag,DeleteFlag) " +
                                        "VALUES(" + HomeModel.MasterId + ",'" + HomeModel.MenuCode + "','" + HomeModel.MenuName + "','" + HomeModel.URL + "'," + HomeModel.MasterFlag + "," + HomeModel.InvFlag + "," + HomeModel.ReportFlag + ",1); " +
                                        "update Mst_Users set UserMenu= ( select distinct stuff((select ',' + u.menucode from Mst_Menu_Sub u where u.menucode = menucode order by u.menucode for xml path('')),1,1,'') as TotalMenus from Mst_Menu_Sub group by menucode)where UserId = 1 "+
                                        "SELECT 1 Status " +
                                        "END "+
                                   "ELSE "+
                                        "BEGIN "+
                                        "SELECT 0 Status " +
                                        "END " +
                                    "END "+
                              "ELSE "+
                                    "BEGIN "+
                                        "SELECT 0 Status " +
                                    "END";

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("CommonQueryRun", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet UpdateEumiUserRights(HomeModel HomeModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[1];
                string Query = "update Mst_Users set UserMenu= ( select distinct stuff((select ',' + u.menucode from Mst_Menu_Sub u where u.menucode = menucode order by u.PID for xml path(''))+',',1,1,'') as TotalMenus from Mst_Menu_Sub group by menucode)where UserId = 1;" +
                    " INSERT INTO Mst_UserDeptDivision"+
                    " SELECT 1,1,DepartmentId,1 FROM Mst_Department WHERE DepartmentId NOT IN (SELECT DeptId FROM Mst_UserDeptDivision WHERE UserId = 1); SELECT 4 Status;";

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("CommonQueryRun", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        
        public DataSet GetMenuList(HomeModel HomeModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[1];
                string Query = "SELECT ID,MM.MenuName AS MainMenu,SM.MenuName,MenuCode,URL FROM Mst_Menu_Master AS MM "+
                               "INNER JOIN Mst_Menu_Sub AS SM ON MM.ID = SM.MasterId AND SM.DeleteFlag = 1 ORDER BY MasterId";                   

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("CommonQueryRun", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet GetSubMenu(HomeModel HomeModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[1];
                string Query = "SELECT * FROM Mst_Menu_Sub WHERE MenuCode='"+HomeModel.MenuCode+"'";

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("CommonQueryRun", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet UpdateMenuSub(HomeModel HomeModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[1];
                string Query = "IF((SELECT count(MenuCode) FROM Mst_Menu_Sub WHERE MenuCode='" + HomeModel.MenuCode + "')=1) " +
                                   "BEGIN " +
                                   "IF NOT EXISTS(SELECT * FROM Mst_Menu_Sub WHERE MenuCode!='" + HomeModel.MenuCode + "' and URL='" + HomeModel.URL + "') " +
                                        "BEGIN " +
                                        "UPDATE Mst_Menu_Sub SET MasterId=" + HomeModel.MasterId + ",MenuCode='" + HomeModel.MenuCode + "',MenuName='" + HomeModel.MenuName + "',URL='" + HomeModel.URL + "',MasterFlag=" + HomeModel.MasterFlag + ",InvFlag=" + HomeModel.InvFlag + ",ReportFlag=" + HomeModel.ReportFlag + ",DeleteFlag=1 WHERE MenuCode='" + HomeModel.MenuCode + "' " +                                                                         
                                        "SELECT 2 Status " +
                                        "END " +
                                   "ELSE " +
                                        "BEGIN " +
                                        "SELECT 0 Status " +
                                        "END " +
                                    "END " +
                              "ELSE " +
                                    "BEGIN " +
                                        "SELECT 0 Status " +
                                    "END";

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("CommonQueryRun", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

    }
}