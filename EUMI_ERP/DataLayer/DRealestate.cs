using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP
{
    public class DRealestate
    {
        private SqlParameter[] arlParms;
        public DataSet TenantInsertandUpdate(TenantMaster CustomerMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[34];
                arlParms[0] = new SqlParameter("@TenantId", CustomerMaster.TenantId);
                arlParms[1] = new SqlParameter("@AccountType", CustomerMaster.AccountType);
                arlParms[2] = new SqlParameter("@CustType", CustomerMaster.CustType);
                arlParms[3] = new SqlParameter("@TenantAccount", CustomerMaster.TenantAccount);
                arlParms[4] = new SqlParameter("@TenantName", CustomerMaster.TenantName);
                arlParms[5] = new SqlParameter("@TenantTermsId", CustomerMaster.TenantTermsId);
                arlParms[6] = new SqlParameter("@TenantAdr1", CustomerMaster.TenantAdr1);
                arlParms[7] = new SqlParameter("@TenantAdr2", CustomerMaster.TenantAdr2);
                arlParms[8] = new SqlParameter("@TenantAdr3", CustomerMaster.TenantAdr3);
                arlParms[9] = new SqlParameter("@TenantPin1", CustomerMaster.TenantPin1);
                arlParms[10] = new SqlParameter("@TenantArea", CustomerMaster.TenantArea);
                arlParms[11] = new SqlParameter("@TenantCountry", CustomerMaster.TenantCountry);
                arlParms[12] = new SqlParameter("@TenantPhone", CustomerMaster.TenantPhone);
                arlParms[13] = new SqlParameter("@TenantEmail", CustomerMaster.TenantEmail);
                arlParms[14] = new SqlParameter("@TenantContactName1", CustomerMaster.TenantContactName1);
                arlParms[15] = new SqlParameter("@TenantContactNo1", CustomerMaster.TenantContactNo1);
               
                arlParms[16] = new SqlParameter("@Email", CustomerMaster.Email);
                arlParms[17] = new SqlParameter("@TenantContactName2", CustomerMaster.TenantContactName2);
                arlParms[18] = new SqlParameter("@TenantContactNo2", CustomerMaster.TenantContactNo2);
                arlParms[19] = new SqlParameter("@TenantContactName3", CustomerMaster.TenantContactName3);
                arlParms[20] = new SqlParameter("@TenantContactNo3", CustomerMaster.TenantContactNo3);
                arlParms[21] = new SqlParameter("@TenantNotes", CustomerMaster.TenantNotes);

                arlParms[22] = new SqlParameter("@TenantPass", CustomerMaster.TenantPass);
                arlParms[23] = new SqlParameter("@TenantEmr", CustomerMaster.TenantEmr);
                arlParms[24] = new SqlParameter("@TenantBank", CustomerMaster.TenantBank);
                arlParms[25] = new SqlParameter("@TenantVisa", CustomerMaster.TenantVisa);
                arlParms[26] = new SqlParameter("@TenantExp", CustomerMaster.TenantExp);
                arlParms[27] = new SqlParameter("@TenantComent", CustomerMaster.TenantComent);


               
                arlParms[28] = new SqlParameter("@CustStatusId", CustomerMaster.CustStatusId);
             
              
               
               
                
              
                
                arlParms[29] = new SqlParameter("@DelFlag", CustomerMaster.DelFlag);
              
             
                
                arlParms[30] = new SqlParameter("@MapId", CustomerMaster.MapId);
                arlParms[31] = new SqlParameter("@Curdate", CustomerMaster.Curdate);

                arlParms[32] = new SqlParameter("@UserId", CustomerMaster.UserId);
                arlParms[33] = new SqlParameter("@DeptId", CustomerMaster.DeptId);
                
                return SQLHelper.ExecuteDataset("TenantInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet Rpt_TenantVilla(TenantMaster TenantMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", TenantMaster.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", TenantMaster.ToDate);
                arlParms[2] = new SqlParameter("@FlatNo", TenantMaster.FlatNo);
                arlParms[3] = new SqlParameter("@BuildingNo", TenantMaster.BuildingManagementId);
                return SQLHelper.ExecuteDataset("Rpt_TenantVilla", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PremiseGetandGets(TenantMaster TenantMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PremiseId", TenantMaster.PremiseId);
                return SQLHelper.ExecuteDataset("PremiseGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet TenantGetandGets(TenantMaster TenantMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@TenantId", TenantMaster.TenantId);
               // arlParms[1] = new SqlParameter("@cstyp", TenantMaster.cstyp);
                return SQLHelper.ExecuteDataset("TenantGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet Rpt_RealEstatePDCList(RealEstatePDC oRealEstatePDC, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@FromDate", oRealEstatePDC.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", oRealEstatePDC.ToDate);
                arlParms[2] = new SqlParameter("@UserId", oRealEstatePDC.UserId);
                arlParms[3] = new SqlParameter("@DeptId", oRealEstatePDC.DeptId);
                arlParms[4] = new SqlParameter("@Variable1", oRealEstatePDC.Variable1);
                arlParms[5] = new SqlParameter("@Varibale2", oRealEstatePDC.Varibale2);
                arlParms[6] = new SqlParameter("@Condition", oRealEstatePDC.Condition);
                return SQLHelper.ExecuteDataset("Rpt_RealEstatePDCList", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet Rpt_RealEstateVacantFlatLoss(RealEstatePDC oRealEstatePDC, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@Ason", oRealEstatePDC.FromDate);
                arlParms[1] = new SqlParameter("@FlatId", oRealEstatePDC.FlatId);
                arlParms[2] = new SqlParameter("@BuildingId", oRealEstatePDC.BuildingId);
                arlParms[3] = new SqlParameter("@UserId", oRealEstatePDC.UserId);
                arlParms[4] = new SqlParameter("@DeptId", oRealEstatePDC.DeptId);
                arlParms[5] = new SqlParameter("@Variable1", oRealEstatePDC.Variable1);
                arlParms[6] = new SqlParameter("@Varibale2", oRealEstatePDC.Varibale2);
                arlParms[7] = new SqlParameter("@Condition", oRealEstatePDC.Condition);
                return SQLHelper.ExecuteDataset("Rpt_RealEstateVacantFlatLoss", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        

        public DataSet PremiseInsertandUpdate(TenantMaster TenantMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@PremiseId", TenantMaster.PremiseId);
                arlParms[1] = new SqlParameter("@PremiseCode", TenantMaster.PremiseCode);
                arlParms[2] = new SqlParameter("@PremiseDescription", TenantMaster.PremiseDescription);
                arlParms[3] = new SqlParameter("@PremiseRemarks", TenantMaster.PremiseRemarks);
                arlParms[4] = new SqlParameter("@DelFlag", TenantMaster.DelFlag);
                return SQLHelper.ExecuteDataset("PremiseInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

    }
}