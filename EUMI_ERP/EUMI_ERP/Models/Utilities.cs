using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class Utilities
    {
        public int DepartmentId { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; }
        public long ItemId { get; set; }

        public string Query { get; set; }

        public string AccIdFrom { get; set; }
        public string AccIdTo { get; set; }
        public string Reason { get; set; }
        public string OTP { get; set; }
        public string CustIdFrom { get; set; }
        public string CustIdTo { get; set; }
        public string CustTypeFrom { get; set; }
        public string CustTypeTo { get; set; }

        private SqlParameter[] arlParms;


        

          public DataSet BackupDatabase(Utilities Utilities, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Query", Utilities.Query);
                return SQLHelper.ExecuteDataset("Data_BackupProcess", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet StockRefresh(Utilities Utilities, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[0];
                return SQLHelper.ExecuteDataset("StockRefresh", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AverageCostRefresh(Utilities Utilities, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[0];
                return SQLHelper.ExecuteDataset("AverageCostRefresh", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AverageCostItemRefresh(Utilities Utilities, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", Utilities.ItemId);
                return SQLHelper.ExecuteDataset("AverageCostItemRefresh", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AccountMerge(Utilities Utilities, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[10];
                arlParms[0] = new SqlParameter("@OLDACCID", Utilities.AccIdFrom);
                arlParms[1] = new SqlParameter("@NEWACCID", Utilities.AccIdTo);
                arlParms[2] = new SqlParameter("@REASON", Utilities.Reason);
                arlParms[3] = new SqlParameter("@OTP", Utilities.OTP);
                arlParms[4] = new SqlParameter("@OLDCUSTID", Utilities.CustIdFrom);
                arlParms[5] = new SqlParameter("@NEWCUSTID", Utilities.CustIdTo);
                arlParms[6] = new SqlParameter("@CUSTTYPEFROM", Utilities.CustTypeFrom);
                arlParms[7] = new SqlParameter("@CUSTTYPETO", Utilities.CustTypeTo);
                arlParms[8] = new SqlParameter("@USERID", Utilities.UserId);
                arlParms[9] = new SqlParameter("@DEPTID", Utilities.DepartmentId);

                return SQLHelper.ExecuteDataset("Account_Merge", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
    }
}