using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.IO;

namespace EUMI_ERP
{
    public class Common
    {


        public static DataTable CreateTable(string[] strCols)
        {
            DataTable dt = new DataTable();
            for (int i = 0; i < strCols.Length; i++)
                dt.Columns.Add(strCols[i], typeof(string));
            return dt;
        }

        public static List<T> CreateList<T>(SqlDataReader reader)
        {
            var results = new List<T>();
            var properties = typeof(T).GetProperties();
            while (reader.Read())
            {
                var item = (T)Activator.CreateInstance(typeof(T));
                foreach (var property in typeof(T).GetProperties())
                {
                    var ignore = false;
                    var propertyName = property.Name;
                    var attr = property.GetCustomAttributes(typeof(EuMiDataAttribute), false);
                    if (attr != null && attr.Length > 0)
                    {
                        propertyName = (attr[0] as EuMiDataAttribute).Name;
                        ignore = (attr[0] as EuMiDataAttribute).Ignore;
                    }
                    if (ignore == false)
                    {
                        try  // ADDED
                        {
                            if (!reader.IsDBNull(reader.GetOrdinal(propertyName)))
                            {
                                Type convertTo = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                                property.SetValue(item, Convert.ChangeType(reader[propertyName], convertTo), null);
                            }
                        }
                        catch (IndexOutOfRangeException)
                        {
                            // Column not found in reader - skip and continue
                            continue;
                        }
                    }
                }
                results.Add(item);
            }
            return results;
        }
        public static string Logwriting(string obj)
        {
            TextWriter tsw = new StreamWriter("Logfile\\logexcepction.txt");
            tsw.WriteLine(obj);          
            tsw.Close();
            return null;
        }
        public static string ToJson(object obj)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(obj);
            return JSONString;
        }
    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public class EuMiDataAttribute : Attribute
    {
        public string Name { get; set; }
        public bool Ignore { get; set; }
    }

}