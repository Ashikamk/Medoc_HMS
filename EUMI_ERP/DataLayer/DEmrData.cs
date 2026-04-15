    using System;
    using System.Data;
    using System.Data.SqlClient;
    using EUMI_ERP.Models;

    namespace EUMI_ERP
    {
        public class DEmrData
        {
            private SqlParameter[] arlParms;

            public DataSet EmrDataInsertandUpdate(EmrDataModel oEmrDataModel, string dbName)
            {
                try
                {
                    arlParms = new SqlParameter[5];
                    arlParms[0] = new SqlParameter("@EmrId",   oEmrDataModel.EmrId);
                    arlParms[1] = new SqlParameter("@Emrcode", oEmrDataModel.Emrcode);
                    arlParms[2] = new SqlParameter("@Type",    oEmrDataModel.Type);
                    arlParms[3] = new SqlParameter("@EmrDesc", oEmrDataModel.EmrDesc);
                    arlParms[4] = new SqlParameter("@Delflg",  oEmrDataModel.Delflg);
                    return SQLHelper.ExecuteDataset("EmrDataInsertandUpdate", dbName, arlParms);
                }
                catch (SqlException exMe)
                {
                    Console.WriteLine(exMe.Message);
                    return null;
                }
            }

            public DataSet EmrDataGetandGets(EmrDataModel oEmrDataModel, string dbName)
            {
                try
                {
                    arlParms = new SqlParameter[1];
                    arlParms[0] = new SqlParameter("@EmrId", oEmrDataModel.EmrId);
                    return SQLHelper.ExecuteDataset("EmrDataGetandGets", dbName, arlParms);
                }
                catch (SqlException exMe)
                {
                    Console.WriteLine(exMe.Message);
                    return null;
                }
            }
        }
    }