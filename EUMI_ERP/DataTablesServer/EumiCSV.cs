using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataTablesServer
{
    public class EumiCSV
    {
        public static void RendertoOutput(Func<int, DataTable> getOneSet, Stream outputStream)
        {
            using (StreamWriter sw = new StreamWriter(outputStream))
            {
                int setIndex = 0;
                var dt = getOneSet(setIndex);
                var delimiter = "";
                foreach (DataColumn dc in dt.Columns)
                {
                    var data = dc.Caption.ToString();
                    sw.Write(delimiter);
                    WriteField(sw, data);
                    delimiter = ",";
                }
                sw.WriteLine();
                do
                {
                    foreach(DataRow dr in dt.Rows)
                    {
                        delimiter = "";
                        foreach(DataColumn dc in dt.Columns)
                        {
                            var data = dr[dc].ToString();
                            sw.Write(delimiter);
                            WriteField(sw, data);
                            delimiter = ",";
                        }
                        sw.WriteLine();
                        sw.Flush();
                    }
                    sw.Flush();
                    try
                    {
                        setIndex++;
                        dt = getOneSet(setIndex);
                        if (dt.Rows.Count == 0)
                        {
                            break;
                        }
                    }
                    catch (Exception ex)
                    {
                        Trace.Write(ex.Message);
                        Trace.WriteLine(ex.StackTrace);
                        break;
                    }
                } while (setIndex <= 1000);
                sw.Flush();
                sw.Close();
            }
        }
        public static void WriteField(StreamWriter sw, string data)
        {
            var format = "{0}";
            if (data.Contains('"'))
            {
                data = data.Replace("\"", "\"\"");
                format = "\"{0}\"";
            }
            if (data.Contains('\n')) { format = "\"{0}\""; }
            if (data.Contains(',')) { format = "\"{0}\""; }
            if (data.StartsWith(" ") || data.EndsWith(" ")) { format = "\"{0}\""; }
            sw.Write(string.Format(format, data));
        }
    }
}