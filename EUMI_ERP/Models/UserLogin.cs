using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;

namespace EUMI_ERP.Models
{
    public class UserLogin
    {
        public string D_SalesPrintId { get; set; }
        public string D_SalesReturnPrintId { get; set; }
        public string D_VoucherPrintId { get; set; }
        public string D_QuotationPrintId { get; set; }
        public string D_PrintColor { get; set; }
        public string UserId { get; set; }
        public long UserLoginId { get; set; }
        public string DeptId { get; set; }
        public long UserDeptId { get; set; }
        public long UserDivId { get; set; }
        public string DivId { get;set; }
        public string LocationID { get; set; }
        public string UserName { get; set; }

        public string Password { get; set; }
        public string DepartmentName { get; set; }
        public string UserMenu { get; set; }
        public string flag { get; set; }
        public bool Persist { get; set; }

        public string EmpCode { get; set; }

        public string EmpName { get; set; }

        public string InTime { get; set; }
        public string OutTime { get; set; } 
        public string AtendanceDate { get; set; }
        public decimal TotalWorkingHrs { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string TotalWorkHrs { get; set; }
        public string DCompanyName { get; set; }
        public string DAddress { get; set; }
        public string DPhoneNo { get; set; }
        public string DEmail { get; set; }
        public string DFax { get; set; }
        public string DTRNNo { get; set; }         

        public static DataSet UserLoginCheck(UserLogin oUserLogin, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"DECLARE @DEPTNAME VARCHAR(500)=''

SELECT @DEPTNAME=DepartmentName FROM Mst_Department WHERE DepartmentId=@dept


DECLARE @UserId INT=0
--SUCCESS
IF EXISTS(
SELECT a.UserId 
FROM  Mst_Users a 
INNER JOIN Mst_UserDeptDivision UD on a.UserId = UD.UserId AND UD.DeptId=@dept 
WHERE a.UserName = @user and convert(varchar(max), DECRYPTBYPASSPHRASE(@KEY, a.Password)) = @pswd 
and a.DelFlag = 1
)
BEGIN
SELECT @UserId = a.UserId FROM Mst_Users a WHERE a.UserName = @user and convert(varchar(max), DECRYPTBYPASSPHRASE(@KEY, a.Password)) = @pswd and a.DelFlag = 1 

SELECT 1 AS Flag, U.UserId,U.UserName,U.Name,U.LocationId,UD.DivId,U.UserMenu ,@DEPTNAME AS DepartmentName,@dept AS DepartmentId
FROM Mst_Users U 
INNER JOIN Mst_UserDeptDivision UD on U.UserId = UD.UserId AND UD.DeptId=@dept 
WHERE U.UserId=@UserId
END
--DEPARTMENT ISSUE
ELSE IF EXISTS(
SELECT a.UserId 
FROM  Mst_Users a 
INNER JOIN Mst_UserDeptDivision UD on a.UserId = UD.UserId AND UD.DeptId<>@dept 
WHERE a.UserName = @user and convert(varchar(max), DECRYPTBYPASSPHRASE(@KEY, a.Password)) = @pswd 
and a.DelFlag = 1
)
BEGIN
SELECT 2 AS Flag, 0 AS UserId,'' AS UserName,'' AS Name,0 AS LocationId,0 AS DivId,'' AS UserMenu ,'' AS DepartmentName,@dept AS DepartmentId
END
--NO DEPARTMENT ACCESS
ELSE IF EXISTS(
SELECT a.UserId 
FROM  Mst_Users a 
WHERE a.UserName = @user and convert(varchar(max), DECRYPTBYPASSPHRASE(@KEY, a.Password)) = @pswd 
and a.DelFlag = 1
)
SELECT 3 AS Flag, 0 AS UserId,'' AS UserName,'' AS Name,0 AS LocationId,0 AS DivId,'' AS UserMenu ,'' AS DepartmentName,@dept AS DepartmentId
--INVALID USER NAME OR PASSWORD
ELSE
SELECT 4 AS Flag, 0 AS UserId,'' AS UserName,'' AS Name,0 AS LocationId,0 AS DivId,'' AS UserMenu ,'' AS DepartmentName,@dept AS DepartmentId
";

                var arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@user", SqlDbType.VarChar) { Value = oUserLogin.UserName };
                arlParms[1] = new SqlParameter("@pswd", SqlDbType.VarChar) { Value = oUserLogin.Password };
                arlParms[2] = new SqlParameter("@dept", SqlDbType.Int) { Value = oUserLogin.DeptId };
                arlParms[3] = new SqlParameter("@KEY", SqlDbType.VarChar) { Value = KeyValues.DecryptKey };
                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }

        public static DataSet PasswordCheck(UserLogin oUserLogin, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {

                string Query = @"IF exists(select * from Mst_Users  where  (convert(varchar(max),DECRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', password))=@Password))  " +
                    " BEGIN" +
                    " select top 1  1 as 'flag',UserId,UserName from Mst_Users where (convert(varchar(max),DECRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', Mst_Users.Password )) =@Password)  " +
                    "END " +
        " ELSE BEGIN select 0 'flag', 0 'UserId',0 'UserName' from Mst_Users " +
        "END";

                var arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Password", SqlDbType.VarChar) { Value = oUserLogin.Password };                
                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }


        public static DataSet UserLogoutCheck(UserLogin oUserLogin, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"BEGIN " +
        " UPDATE User_AttendanceEntry SET [OutTime]= GETDATE() WHERE AtendanceEnrtyId = (SELECT MAX(AtendanceEnrtyId) FROM User_AttendanceEntry WHERE UserId=@UserId) " +
        " SELECT @UserId AS UserId END; ";

                var arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", SqlDbType.Int) { Value = oUserLogin.UserId };

                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }


        public static DataSet GetUserAndSettings(long userId, string dbName)
        {
            var a = System.Threading.Tasks.Task.Run(() => GetUserDetails(userId, dbName));
            var b = System.Threading.Tasks.Task.Run(() => GetCompanySettings(userId, dbName));
            var c = System.Threading.Tasks.Task.WhenAll(a, b);
            c.Wait();
            var ds = a.Result;
            var ds2 = b.Result;
            var table = ds2.Tables[0];
            ds.Tables[0].TableName = "UserData";
            table.TableName = "CompanySettings";
            ds2.Tables.RemoveAt(0);
            ds.Tables.Add(table);
            return ds;
        }
        public static DataSet GetUserDetails(long userId, string dbName)
        {
            try
            {
                string Query = @"SELECT 
        a.UserId,
        a.UserName,
        a.Name,
        a.DepartmentId,
        a.LocationId,
        b.DepartmentName
        FROM  Mst_Users a INNER JOIN Mst_Department b on a.DepartmentId = b.DepartmentId  
        WHERE a.UserId = @userid";

                var arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@userid", SqlDbType.BigInt) { Value = userId };
                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }

        public static DataSet GetCompanySettings(long userId, string dbName)
        {
            try
            {
                string Query = @"SELECT TOP 1 a.*
        FROM  Settings_Company a WHERE a.DelFlag = 1";

                var arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@userid", SqlDbType.BigInt) { Value = userId };
                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }

        public DataSet UserLoginOtherDepartment(UserLogin UsersModel, string dbName)
        {
            try
            {
                var arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@UserId", UsersModel.UserId);
                arlParms[1] = new SqlParameter("@DeptId", UsersModel.DeptId);
                return SQLHelper.ExecuteDataset("UserLoginOtherDepartment", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public static string GetJSONFromDatatable(DataTable dt)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(dt);
            return JSONString;
        }


        public DataSet UserLoginHistoryGet(UserLogin UsersModel, string dbName)
        {
            try
            {
                var arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@UserId", UsersModel.UserId);
                arlParms[1] = new SqlParameter("@FromDate", UsersModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", UsersModel.ToDate);
                return SQLHelper.ExecuteDataset("UserLoginHistoryGet", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet UserLoginDetailsGet(UserLogin UsersModel, string dbName)
        {
            try
            {
                var arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@UserId", UsersModel.UserId);
                arlParms[1] = new SqlParameter("@FromDate", UsersModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", UsersModel.ToDate); 
                return SQLHelper.ExecuteDataset("UserLoginDetailsGet", dbName, arlParms);  

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}