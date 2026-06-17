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
    public class DataMenuShortCut
    {
        private SqlParameter[] arlParms;

        KeyValues KeyValues = new KeyValues();
        public DataSet ShortcutMenusInsertandUpdate(MenuShortcutModel mgp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@uid", mgp.uid);
                arlParms[1] = new SqlParameter("@username", mgp.username);
                arlParms[2] = new SqlParameter("@userright", mgp.userright);           
                arlParms[3] = new SqlParameter("@delflag", mgp.delflag); 
                return SQLHelper.ExecuteDataset("ShortcutMenuInsertAndUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ShotcutMenuGetandGets(MenuShortcutModel MenuShortcutModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@uid", MenuShortcutModel.uid);

                return SQLHelper.ExecuteDataset("ShortcutMenuGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MenuGetandGets(MenuShortcutModel mgp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@uid", mgp.uid);
               
               
                return SQLHelper.ExecuteDataset("MenuGetAndGetsShortcut", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}