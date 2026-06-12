using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using EUMI_ERP.Models;


namespace EUMI_ERP
{
    public class DFeatures

    {
        private SqlParameter[] arlParms;
        public DataSet FeaturesInsertandUpdate(FeaturesModel FeaturesModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FeaturesModelId", FeaturesModel.FeaturesModelId);
                arlParms[1] = new SqlParameter("@Code", FeaturesModel.Code);
                arlParms[2] = new SqlParameter("@Facilities", FeaturesModel.Facilities);
                arlParms[3] = new SqlParameter("@Details", FeaturesModel.Details);
                arlParms[4] = new SqlParameter("@DelFlag", FeaturesModel.DelFlag);
                return SQLHelper.ExecuteDataset("FeaturesInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
       
        public DataSet FeaturesGetandGets(FeaturesModel FeaturesModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@FeaturesModelId", FeaturesModel.FeaturesModelId);
                return SQLHelper.ExecuteDataset("FeaturesGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}
    