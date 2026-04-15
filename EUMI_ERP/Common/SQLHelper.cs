using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace EUMI_ERP
{
    public sealed class SQLHelper
    {
        #region Utility Methods & Constructors

        public SQLHelper()
        {

        }

        public static string GetConnection()
        {
            string strCon = Convert.ToString(ConfigurationManager.ConnectionStrings["ConnectionString"]);
            return strCon;
        }

        public static string GetConnection(string dbname)
        {
            string strUserName = ConfigurationManager.AppSettings["UserName"].ToString();
            string strPwd = ConfigurationManager.AppSettings["Password"].ToString();
            string strDataSource = ConfigurationManager.AppSettings["DataSource"].ToString();
            string strCon = "Data Source=" + strDataSource + ";Initial Catalog=" + dbname + ";User ID=" + strUserName + ";Password=" + strPwd + ";Pooling=false;Connection Timeout=200";

            return strCon;
        }

        ~SQLHelper()
        {
        }

        private static void AttachParameters(SqlCommand command, SqlParameter[] cmdParams)
        {
            if (command == null)
                throw new ArgumentNullException("command");
            if (cmdParams != null)
            {
                foreach (SqlParameter p in cmdParams)
                {
                    if (p != null)
                    {
                        // Check for derived output value with no value assigned
                        if ((p.Direction == ParameterDirection.InputOutput || p.Direction == ParameterDirection.Input) && (p.Value == null))
                            p.Value = DBNull.Value;
                        command.Parameters.Add(p);
                    }
                }
            }
        }

        public static void PrepareCommand(SqlConnection sqlCon, SqlCommand command, SqlTransaction sqlTrans, string commandText, SqlParameter[] cmdParams)
        {
            if (command == null) throw new ArgumentNullException("command");
            if (commandText == null || commandText.Length == 0) throw new ArgumentNullException("commandText");

            command.Connection = sqlCon;
            command.CommandText = commandText;

            if (sqlTrans != null)
            {
                if (sqlTrans.Connection == null) throw new ArgumentException("The transaction was rollbacked or commited, please provide an open transaction.", "transaction");
                command.Transaction = sqlTrans;
            }

            command.CommandType = CommandType.StoredProcedure;
            if (cmdParams != null)
                AttachParameters(command, cmdParams);
            return;
        }

        #endregion

        #region ExecuteNonQuery

        public static int ExecuteNonQuery(string commandText)
        {
            return ExecuteNonQuery(commandText, (SqlParameter[])null);
        }

        public static int ExecuteNonQuery(string commandText, params SqlParameter[] cmdParams)
        {
            SqlCommand cmd = new SqlCommand();
            SqlConnection sqlCon = new SqlConnection(GetConnection());
            sqlCon.Open();
            PrepareCommand(sqlCon, cmd, (SqlTransaction)null, commandText, cmdParams);
            int retval = cmd.ExecuteNonQuery();
            sqlCon.Close();
            sqlCon.Dispose();
            cmd.Parameters.Clear();
            return retval;
        }

        #region   #region Passing dbname 21-5-2012

        public static int ExecuteNonQuery(string commandText, string dbName)
        {
            return ExecuteNonQuery(commandText, dbName, (SqlParameter[])null);
        }

        public static int ExecuteNonQuery(string commandText, string dbName, params SqlParameter[] cmdParams)
        {
            SqlCommand cmd = new SqlCommand();
            SqlConnection sqlCon = new SqlConnection(GetConnection(dbName));
            sqlCon.Open();
            PrepareCommand(sqlCon, cmd, (SqlTransaction)null, commandText, cmdParams);
            int retval = cmd.ExecuteNonQuery();
            sqlCon.Close();
            sqlCon.Dispose();
            cmd.Parameters.Clear();
            return retval;
        }

        public static int ExecuteNonQuerySQL(string commandText, string dbname, params SqlParameter[] cmdParams)
        {
            using (SqlConnection sqlCon = new SqlConnection(GetConnection(dbname)))
            {
                SqlCommand cmd = new SqlCommand();
                PrepareCommand(sqlCon, cmd, (SqlTransaction)null, commandText, cmdParams);
                cmd.CommandType = CommandType.Text;
                sqlCon.Open();
                return cmd.ExecuteNonQuery();
            }
        }

        #endregion

        #endregion

        #region BooleanReader

        private enum SqlConnectionOwnership
        {
            /// <summary>Connection is owned and managed by SqlHelper</summary>
            Internal,
            /// <summary>Connection is owned and managed by the caller</summary>
            External
        }

        // public static bool BoooleanReader(string commandText)
        //{
        //     return BoooleanReader(commandText, (SqlParameter[])null);
        // }

        // public static bool BoooleanReader(string commandText, params SqlParameter[] cmdParams)
        // {
        //     return BoooleanReader(null, commandText, cmdParams, SqlConnectionOwnership.Internal);
        // }

        //private static bool BoooleanReader(SqlTransaction sqlTrans, string commandText, SqlParameter[] cmdParams, SqlConnectionOwnership connectionOwnership)
        //{
        //   bool bFound = false;
        //  SqlCommand cmd = new SqlCommand();
        //  SqlConnection sqlCon = new SqlConnection(GetConnection());
        //  sqlCon.Open();
        // PrepareCommand(sqlCon, cmd, sqlTrans, commandText, cmdParams);
        // SqlDataReader dbReader;

        // if (connectionOwnership == SqlConnectionOwnership.External)
        // dbReader = cmd.ExecuteReader();
        // else
        // dbReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

        //   if (dbReader.Read())
        // bFound = true;

        //dbReader.Dispose();
        // sqlCon.Close();
        //sqlCon.Dispose();

        #region To Clear Command Parameters from Sqlconnection

        // bool canClear = true;
        // foreach (SqlParameter commandParameter in cmd.Parameters)
        // {
        // if (commandParameter.Direction != ParameterDirection.Input)
        //    canClear = false;
        //}
        //  if (canClear)
        //   cmd.Parameters.Clear();
        #endregion
        // return bFound;
        //}

        #region   Passing dbname 21-5-2012
        public static bool BoooleanReader(string commandText, string dbName)
        {
            return BoooleanReader(commandText, dbName, (SqlParameter[])null);
        }

        public static bool BoooleanReader(string commandText, string dbName, params SqlParameter[] cmdParams)
        {
            return BoooleanReader(null, commandText, cmdParams, SqlConnectionOwnership.Internal, dbName);
        }

        private static bool BoooleanReader(SqlTransaction sqlTrans, string commandText, SqlParameter[] cmdParams, SqlConnectionOwnership connectionOwnership, string dbName)
        {
            bool bFound = false;
            SqlCommand cmd = new SqlCommand();
            SqlConnection sqlCon = new SqlConnection(GetConnection(dbName));
            sqlCon.Open();
            PrepareCommand(sqlCon, cmd, sqlTrans, commandText, cmdParams);
            SqlDataReader dbReader;

            if (connectionOwnership == SqlConnectionOwnership.External)
                dbReader = cmd.ExecuteReader();
            else
                dbReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            if (dbReader.Read())
                bFound = true;

            dbReader.Dispose();
            sqlCon.Close();
            sqlCon.Dispose();

            #region To Clear Command Parameters from Sqlconnection
            bool canClear = true;
            foreach (SqlParameter commandParameter in cmd.Parameters)
            {
                if (commandParameter.Direction != ParameterDirection.Input)
                    canClear = false;
            }
            if (canClear)
                cmd.Parameters.Clear();
            #endregion
            return bFound;
        }

        #endregion

        #endregion

        #region StringReader

        //  public static string StringReader(string commandText, string strField)
        // {
        //     return StringReader(commandText, strField, (SqlParameter[])null);
        //  }

        // public static string StringReader(string commandText, string strField, params SqlParameter[] cmdParams)
        // {
        //  return StringReader(null, commandText, strField, cmdParams, SqlConnectionOwnership.Internal);
        //   }

        // private static string StringReader(SqlTransaction sqlTrans, string commandText, string strField, SqlParameter[] cmdParams, SqlConnectionOwnership connectionOwnership)
        //{            
        //   string strResult = "";
        // SqlCommand cmd = new SqlCommand();
        // SqlConnection sqlCon = new SqlConnection(GetConnection());
        //sqlCon.Open();
        // PrepareCommand(sqlCon, cmd, sqlTrans, commandText, cmdParams);
        // SqlDataReader dbReader;

        //  if (connectionOwnership == SqlConnectionOwnership.External)
        //    dbReader = cmd.ExecuteReader();
        //  else
        //    dbReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

        // while (dbReader.Read())
        //   strResult = dbReader[strField].ToString();

        //dbReader.Dispose();
        // sqlCon.Close();
        // sqlCon.Dispose();

        #region To Clear Command Parameters from Sqlconnection
        //  bool canClear = true;
        //  foreach (SqlParameter commandParameter in cmd.Parameters)
        //  {
        //   if (commandParameter.Direction != ParameterDirection.Input)
        //     canClear = false;
        // }

        //if (canClear)
        //  cmd.Parameters.Clear();
        #endregion

        //  return strResult;
        // }


        #region Passing dbname 21-5-2012

        public static string StringReader(string commandText, string strField, string dbName)
        {
            return StringReader(commandText, strField, dbName, (SqlParameter[])null);
        }

        public static string StringReader(string commandText, string strField, string dbName, params SqlParameter[] cmdParams)
        {
            return StringReader(null, commandText, strField, cmdParams, SqlConnectionOwnership.Internal, dbName);
        }

        private static string StringReader(SqlTransaction sqlTrans, string commandText, string strField, SqlParameter[] cmdParams, SqlConnectionOwnership connectionOwnership, string dbName)
        {
            string strResult = "";
            SqlCommand cmd = new SqlCommand();
            SqlConnection sqlCon = new SqlConnection(GetConnection(dbName));
            sqlCon.Open();
            PrepareCommand(sqlCon, cmd, sqlTrans, commandText, cmdParams);
            SqlDataReader dbReader;

            if (connectionOwnership == SqlConnectionOwnership.External)
                dbReader = cmd.ExecuteReader();
            else
                dbReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dbReader.Read())
                strResult = dbReader[strField].ToString();

            dbReader.Dispose();
            sqlCon.Close();
            sqlCon.Dispose();

            #region To Clear Command Parameters from Sqlconnection
            bool canClear = true;
            foreach (SqlParameter commandParameter in cmd.Parameters)
            {
                if (commandParameter.Direction != ParameterDirection.Input)
                    canClear = false;
            }

            if (canClear)
                cmd.Parameters.Clear();
            #endregion

            return strResult;
        }


        #endregion


        #endregion

        #region FillDataset

        //  public static void FillDataset(string spName, DataSet dataSet)
        //  {
        //    FillDataset(spName, dataSet,(SqlParameter[]) null);
        // }

        //  public static void FillDataset(string spName, DataSet dataSet, params SqlParameter[] cmdParams)
        // {
        //  if (cmdParams == null)
        //    FillDataset(null, spName, dataSet,(SqlParameter[]) null);
        //else
        //   FillDataset(null, spName, dataSet, cmdParams);
        // }

        // private static void FillDataset(SqlTransaction sqlTrans, string spName, DataSet dataSet, params SqlParameter[] cmdParams)
        //  {
        //     if (dataSet == null)
        // throw new ArgumentNullException("dataSet");
        //  SqlCommand command = new SqlCommand();
        // SqlConnection sqlCon = new SqlConnection(GetConnection());
        // PrepareCommand(sqlCon, command, sqlTrans, spName, cmdParams);
        // using (SqlDataAdapter dbAdapter = new SqlDataAdapter(command))
        // {
        //   dbAdapter.TableMappings.Add("Table", "Table");
        //   dbAdapter.Fill(dataSet);
        // command.Parameters.Clear();
        //}
        // sqlCon.Dispose();
        //  }

        #region Passing dbname 21-5-2012


        public static void FillDataset(string spName, DataSet dataSet, string dbName)
        {
            FillDataset(spName, dataSet, dbName, null);
        }

        public static void FillDataset(string spName, DataSet dataSet, string dbName, params SqlParameter[] cmdParams)
        {
            if (cmdParams == null)
                FillDataset(null, spName, dataSet, dbName, null);
            else
                FillDataset(null, spName, dataSet, dbName, cmdParams);
        }

        private static void FillDataset(SqlTransaction sqlTrans, string spName, DataSet dataSet, string dbName, params SqlParameter[] cmdParams)
        {
            if (dataSet == null)
                throw new ArgumentNullException("dataSet");
            SqlCommand command = new SqlCommand();
            SqlConnection sqlCon = new SqlConnection(GetConnection(dbName));
            PrepareCommand(sqlCon, command, sqlTrans, spName, cmdParams);
            using (SqlDataAdapter dbAdapter = new SqlDataAdapter(command))
            {
                dbAdapter.TableMappings.Add("Table", "Table");
                dbAdapter.Fill(dataSet);
                command.Parameters.Clear();
            }
            sqlCon.Dispose();
        }

        #endregion

        #endregion

        #region ExecuteDataset

        //public static DataSet ExecuteDataset(string commandText)
        //  {
        //       return ExecuteDataset(commandText, (SqlParameter[])null);
        //  }

        // public static DataSet ExecuteDataset(string commandText, params SqlParameter[] cmdParams)
        // {
        // SqlCommand cmd = new SqlCommand();            
        // SqlConnection sqlCon = new SqlConnection(GetConnection());            
        // PrepareCommand(sqlCon, cmd, (SqlTransaction)null, commandText, cmdParams);            
        // DataSet ds;
        // using (SqlDataAdapter da = new SqlDataAdapter(cmd))
        // {
        //    ds = new DataSet();
        //   da.Fill(ds);
        //   cmd.Parameters.Clear();
        // }
        //  sqlCon.Dispose();
        // return ds;
        //}


        #region Passing dbname 21-5-2012

        public static DataSet ExecuteDataset(string commandText, string dbname)
        {
            return ExecuteDataset(commandText, dbname, (SqlParameter[])null);
        }

        public static DataSet ExecuteDataset(string commandText, string dbname, params SqlParameter[] cmdParams)
        {
            SqlCommand cmd = new SqlCommand();
            SqlConnection sqlCon = new SqlConnection(GetConnection(dbname));
            PrepareCommand(sqlCon, cmd, (SqlTransaction)null, commandText, cmdParams);
            DataSet ds;
            using (SqlDataAdapter da = new SqlDataAdapter(cmd))
            {
                ds = new DataSet();
                da.Fill(ds);
                cmd.Parameters.Clear();
            }
            sqlCon.Dispose();
            return ds;
        }

        #endregion
        public static List<T> ExcuteAndGet<T>(string commandText, string dbname, params SqlParameter[] cmdParams)
        {
            List<T> result = null;
            using (SqlConnection sqlCon = new SqlConnection(GetConnection(dbname)))
            {
                SqlCommand cmd = new SqlCommand();
                PrepareCommand(sqlCon, cmd, (SqlTransaction)null, commandText, cmdParams);
                sqlCon.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    result = Common.CreateList<T>(reader);
                }
            }
            return (result ?? new List<T>());
        }

        public static List<T> ExcuteAndGetSQL<T>(string commandText, string dbname, params SqlParameter[] cmdParams)
        {
            List<T> result = null;
            using (SqlConnection sqlCon = new SqlConnection(GetConnection(dbname)))
            {
                SqlCommand cmd = new SqlCommand();
                PrepareCommand(sqlCon, cmd, (SqlTransaction)null, commandText, cmdParams);
                cmd.CommandType = CommandType.Text;
                sqlCon.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    result = Common.CreateList<T>(reader);
                }
            }
            return (result ?? new List<T>());
        }

        public static List<Dictionary<string, object>> ExcuteObjectDictionary(string commandText, string dbname, params SqlParameter[] cmdParams)
        {
            List<Dictionary<string, object>> result = new List<Dictionary<string, object>>();
            using (SqlConnection sqlCon = new SqlConnection(GetConnection(dbname)))
            {
                SqlCommand cmd = new SqlCommand();
                PrepareCommand(sqlCon, cmd, (SqlTransaction)null, commandText, cmdParams);
                cmd.CommandType = CommandType.Text;
                sqlCon.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        result.Add(Enumerable.Range(0, reader.FieldCount).ToDictionary(reader.GetName, reader.GetValue));
                    }
                }
            }
            return result;
        }

        public static DataSet ExecuteDatasetSQL(string commandText, string dbname, params SqlParameter[] cmdParams)
        {
            DataSet ds;
            using (SqlConnection sqlCon = new SqlConnection(GetConnection(dbname)))
            {
                SqlCommand cmd = new SqlCommand();
                PrepareCommand(sqlCon, cmd, (SqlTransaction)null, commandText, cmdParams);
                cmd.CommandType = CommandType.Text;
                sqlCon.Open();
                using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                {
                    ds = new DataSet();
                    da.Fill(ds);
                    cmd.Parameters.Clear();
                }
            }
            return ds;
        }
        #endregion
    }
}