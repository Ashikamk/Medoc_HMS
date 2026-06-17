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
    public class DItemMapping
    {
        private SqlParameter[] arlParms;
        KeyValues KeyValues = new KeyValues();
        public DataSet ItemGroupGetandGets(ItemMappingModel ItemMappingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@GroupId", ItemMappingModel.GroupId);
                return SQLHelper.ExecuteDataset("ItemGroupGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
       
        public DataSet MainItemSearch(ItemMappingModel ItemMappingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMappingModel.ItemCode);
                arlParms[1] = new SqlParameter("@GroupId", ItemMappingModel.GroupId);
                return SQLHelper.ExecuteDataset("ItemSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ItemSearch(ItemMappingModel ItemMappingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", ItemMappingModel.ItemId);
                arlParms[1] = new SqlParameter("@GroupId", ItemMappingModel.GroupId);
                return SQLHelper.ExecuteDataset("SubItemsGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SubItemsGetandGets(ItemMappingModel ItemMappingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMappingModel.ItemCode);
                return SQLHelper.ExecuteDataset("SubItemsSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ItemGroupMappingInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemGroupMapping", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ItemGroupMapping", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        
    }
}
