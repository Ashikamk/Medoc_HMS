using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using EUMI_ERP.Models;
namespace EUMI_ERP.DataLayer
{
    public class DVoucherDiffReport
    {
       
        KeyValues KeyValues = new KeyValues();
        public DataSet VoucherDiffReportGetsandGets(VoucherDiffReport VoucherDiffReport, string dbName)
        {
            try
            {
              
                return SQLHelper.ExecuteDataset("VoucherDiffReportGetsandGets", dbName);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}