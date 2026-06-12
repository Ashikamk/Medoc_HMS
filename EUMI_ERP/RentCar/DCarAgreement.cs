using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.Models;

namespace EUMI_ERP.RentCar
{
    public class DCarAgreement
    {
        private SqlParameter[] arlParms;
        KeyValues KeyValues = new KeyValues();
        public DataSet CarSearch(CarAgreement CarAgreement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VechicleNo", CarAgreement.VechicleNo);
                return SQLHelper.ExecuteDataset("CarSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CarAgreementInsertandUpdate(CarAgreement CarAgreement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[25];
                arlParms[0] = new SqlParameter("@AgreementId", CarAgreement.AgreementId);
                arlParms[1] = new SqlParameter("@StartDate", CarAgreement.StartDate);
                arlParms[2] = new SqlParameter("@EndDate", CarAgreement.EndDate);
                arlParms[3] = new SqlParameter("@ReturnDate", CarAgreement.ReturnDate);
                arlParms[4] = new SqlParameter("@CustomerId", CarAgreement.CustomerId);
                arlParms[5] = new SqlParameter("@AgreementNo", CarAgreement.AgreementNo);
                arlParms[6] = new SqlParameter("@LicenseNo", CarAgreement.LicenseNo);
                arlParms[7] = new SqlParameter("@CheckoutDate", CarAgreement.CheckoutDate);
                arlParms[8] = new SqlParameter("@CheckinDate", CarAgreement.CheckinDate);
                arlParms[9] = new SqlParameter("@TicketDate", CarAgreement.TicketDate);
                arlParms[10] =new SqlParameter("@VechicleId", CarAgreement.VechicleId);
                arlParms[11] =new SqlParameter("@Make", CarAgreement.Make);
                arlParms[12] =new SqlParameter("@Model", CarAgreement.Model);
                arlParms[13] =new SqlParameter("@Phone", CarAgreement.Phone);
                arlParms[14] =new SqlParameter("@CardNo", CarAgreement.CardNo);
                arlParms[15] =new SqlParameter("@PONo", CarAgreement.PONo);
                arlParms[16] =new SqlParameter("@Checkoutlocation", CarAgreement.Checkoutlocation);
                arlParms[17] =new SqlParameter("@Checkinlocation", CarAgreement.Checkinlocation);
                arlParms[18] =new SqlParameter("@AgreementType", CarAgreement.AgreementType);
                arlParms[19] =new SqlParameter("@CreatedById", CarAgreement.CreatedById);
                arlParms[20] =new SqlParameter("@DelFlag", CarAgreement.DelFlag);
                arlParms[21] =new SqlParameter("@CurrDate", CarAgreement.CurrDate);
                arlParms[22] = new SqlParameter("@AgreementStatus", CarAgreement.AgreementStatus);
                arlParms[23] = new SqlParameter("@UserId", CarAgreement.UserId);
                arlParms[24] = new SqlParameter("@DeptId", CarAgreement.DeptId);

                return SQLHelper.ExecuteDataset("CarAgreementInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CarAgreementGetandGets(CarAgreement CarAgreement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AgreementId", CarAgreement.AgreementId);
                return SQLHelper.ExecuteDataset("CarAgreementGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CarAgreementView(CarAgreement CarAgreement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", CarAgreement.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", CarAgreement.EndDate);
                arlParms[2] = new SqlParameter("@CustId", CarAgreement.CustomerId);
                return SQLHelper.ExecuteDataset("CarAgreementView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        

    }
}