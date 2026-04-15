using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP
{
    public class UpsertBuilder
    {
        public List<System.Data.SqlClient.SqlParameter> sqlParams { get; set; }
        public List<System.Data.SqlClient.SqlParameter> keyParams { get; set; }

        public int LastCount { get; set; }

        public long ScopeIdentity { get; set; }
        public Dictionary<string, string> scalars { get; set; }

        public string sql { get; set; }
        public static UpsertBuilder BuildParams<T>(T obj)
        {
            UpsertBuilder builder = new UpsertBuilder();
            builder.keyParams = new List<System.Data.SqlClient.SqlParameter>();
            builder.sqlParams = new List<System.Data.SqlClient.SqlParameter>();

            foreach (var property in typeof(T).GetProperties())
            {
                var ignore = false;
                var key = false;
                var propertyName = property.Name;
                var attr = property.GetCustomAttributes(typeof(EuMiDataAttribute), false);
                if (attr != null && attr.Length > 0)
                {
                    propertyName = (attr[0] as EuMiDataAttribute).Name;
                    ignore = (attr[0] as EuMiDataAttribute).Ignore;
                }
                attr = property.GetCustomAttributes(typeof(EuMiUpsertAttribute), false);
                if (attr != null && attr.Length > 0)
                {
                    ignore = (attr[0] as EuMiUpsertAttribute).Ignore;
                    key = (attr[0] as EuMiUpsertAttribute).Key;
                }
                var value = property.GetValue(obj);
                if (ignore == false)
                {
                    if (key)
                    {
                        builder.keyParams.Add(new System.Data.SqlClient.SqlParameter("@" + propertyName, value));
                    }
                    else
                    {
                        builder.sqlParams.Add(new System.Data.SqlClient.SqlParameter("@" + propertyName, value));
                    }
                }

            }
            return builder;
        }
        public UpsertBuilder BuildInsertQuery(string tableName)
        {
            keyParams = keyParams ?? new List<System.Data.SqlClient.SqlParameter>();
            sqlParams = sqlParams ?? new List<System.Data.SqlClient.SqlParameter>();
            scalars = scalars ?? new Dictionary<string, string>();

            System.Text.StringBuilder str = new System.Text.StringBuilder();
            str.Append("INSERT INTO ").Append(tableName).Append(" ( ");
            var delimiter = string.Empty;
            foreach(var oneitem in sqlParams)
            {
                str.Append(delimiter).Append(oneitem.ParameterName.Trim('@'));
                delimiter = ", ";
            }
            foreach (var onekey in scalars.Keys)
            {
                str.Append(delimiter).Append(onekey);
                delimiter = ", ";
            }
            str.Append(" ) VALUES ( ");
            delimiter = string.Empty;
            foreach (var oneitem in sqlParams)
            {
                str.Append(delimiter).Append(oneitem.ParameterName);
                delimiter = ", ";
            }
            scalars = scalars ?? new Dictionary<string, string>();
            foreach (var onekey in scalars.Keys)
            {
                str.Append(delimiter).Append(scalars[onekey]);
                delimiter = ", ";
            }
            str.Append("); SELECT SCOPE_IDENTITY();");
            this.sql = str.ToString();
            return this;
        }
        public UpsertBuilder BuildUpdateQuery(string tableName)
        {
            keyParams = keyParams ?? new List<System.Data.SqlClient.SqlParameter>();
            sqlParams = sqlParams ?? new List<System.Data.SqlClient.SqlParameter>();
            scalars = scalars ?? new Dictionary<string, string>();

            System.Text.StringBuilder str = new System.Text.StringBuilder();
            str.Append("UPDATE TOP (").Append(keyParams.Count > 0 ? 1 : 0).Append(")").Append(tableName).Append(" SET ");
            var delimiter = string.Empty;
            foreach (var oneitem in sqlParams)
            {
                str.Append(delimiter).Append(oneitem.ParameterName.Trim('@'))
                    .Append(" = ").Append(oneitem.ParameterName);
                delimiter = ", ";
            }
            foreach (var onekey in scalars.Keys)
            {
                str.Append(delimiter).Append(onekey)
                    .Append(" = ").Append(scalars[onekey]);
                delimiter = ", ";
            }
            str.Append(" WHERE ");
            delimiter = string.Empty;
            foreach (var oneitem in keyParams)
            {
                str.Append(delimiter).Append(oneitem.ParameterName.Trim('@')).Append(" = ").Append(oneitem.ParameterName);
                delimiter = " AND ";
            }
            str.Append(";");
            this.sql = str.ToString();
            return this;
        }

        public UpsertBuilder Execute(string dbName, bool scope)
        {
            var allParams = new List<System.Data.SqlClient.SqlParameter>();
            allParams.AddRange(sqlParams);
            if (keyParams.Count > 0)
            {
                allParams.AddRange(keyParams);
            }
            if (scope == true)
            {
                var ds = SQLHelper.ExecuteDatasetSQL(this.sql, dbName, allParams.ToArray());
                ScopeIdentity = Convert.ToInt64(ds.Tables[0].Rows[0][0]);
            }
            else
            {
                LastCount = SQLHelper.ExecuteNonQuerySQL(this.sql, dbName, allParams.ToArray());
            }
            return this;
        }
        public UpsertBuilder AddScalars(string key, string quotedValue)
        {
            scalars = scalars ?? new Dictionary<string, string>();
            scalars[key] = quotedValue;
            return this;
        }
    }

    public class EuMiUpsertAttribute : Attribute
    {
        public bool Key { get; set; }
        public bool Ignore { get; set; }
    }

}