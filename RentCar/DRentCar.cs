using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.Models;

namespace EUMI_ERP.RentCar
{
    public class DRentCar
    {
        private SqlParameter[] arlParms;
        KeyValues KeyValues = new KeyValues();

        
        public DataSet GetDashboardWidgets(CarDashboard CarDashboard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", CarDashboard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", CarDashboard.ToDate);
                arlParms[2] = new SqlParameter("@UserId", CarDashboard.UserId);
                arlParms[3] = new SqlParameter("@DeptId", CarDashboard.DeptId);
                return SQLHelper.ExecuteDataset("RentCarDashBoardWidgets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet RentCarDashBoardList(CarAgreement CarDashboard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", CarDashboard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", CarDashboard.ToDate);
                arlParms[2] = new SqlParameter("@UserId", CarDashboard.UserId);
                arlParms[3] = new SqlParameter("@DeptId", CarDashboard.DeptId);
                arlParms[4] = new SqlParameter("@Type", CarDashboard.Type);
                return SQLHelper.ExecuteDataset("RentCarDashBoardList", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet CarInsertandUpdate(RentCarModel oRentCarModel                    , string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[53];                    
                arlParms[0] =  new SqlParameter("@CarId", oRentCarModel.CarId );           
                arlParms[1] =  new SqlParameter("@CarCode", oRentCarModel.CarCode );  
                arlParms[2] =  new SqlParameter("@CarDesc", oRentCarModel.CarDesc );  
                arlParms[3] =  new SqlParameter("@CurrentKM", oRentCarModel.CurrentKM );  
                arlParms[4] =  new SqlParameter("@NextService", oRentCarModel.NextService);  
                arlParms[5] =  new SqlParameter("@InsuranceDate", oRentCarModel.InsuranceDate );  
                arlParms[6] =  new SqlParameter("@RegistrationDate", oRentCarModel.RegistrationDate);  
                arlParms[7] =  new SqlParameter("@IYear", oRentCarModel.IYear  );  
                arlParms[8] =  new SqlParameter("@PlateName", oRentCarModel.PlateName );  
                arlParms[9] =  new SqlParameter("@PlateCode", oRentCarModel.PlateCode  );  
                arlParms[10] = new SqlParameter("@EngineNo", oRentCarModel.EngineNo );  
                arlParms[11] = new SqlParameter("@CarFuel", oRentCarModel.CarFuel   );  
                arlParms[12] = new SqlParameter("@ChassisNo", oRentCarModel.ChassisNo );  
                arlParms[13] = new SqlParameter("@PetrolCharge", oRentCarModel.PetrolCharge );  
                arlParms[14] = new SqlParameter("@DailyPrice", oRentCarModel.DailyPrice  );  
                arlParms[15] = new SqlParameter("@WeeklyPrice", oRentCarModel.WeeklyPrice );  
                arlParms[16] = new SqlParameter("@MonthlyPrice", oRentCarModel.MonthlyPrice );  
                arlParms[17] = new SqlParameter("@AnnualPrice", oRentCarModel.AnnualPrice );  
                arlParms[18] = new SqlParameter("@Comments", oRentCarModel.Comments );  
                arlParms[19] = new SqlParameter("@TCNO", oRentCarModel.TCNO  );  
                arlParms[20] = new SqlParameter("@CarColor", oRentCarModel.CarColor  );  
                arlParms[21] = new SqlParameter("@SubColor", oRentCarModel.SubColor );  
                arlParms[22] = new SqlParameter("@Category", oRentCarModel.Category  );  
                arlParms[23] = new SqlParameter("@CarClass", oRentCarModel.CarClass );  
                arlParms[24] = new SqlParameter("@Origin", oRentCarModel.Origin );  
                arlParms[25] = new SqlParameter("@PlateSource", oRentCarModel.PlateSource  );  
                arlParms[26] = new SqlParameter("@PlateCategory", oRentCarModel.PlateCategory  );  
                arlParms[27] = new SqlParameter("@Shape", oRentCarModel.Shape  );  
                arlParms[28] = new SqlParameter("@EmptyWt", oRentCarModel.EmptyWt );  
                arlParms[29] = new SqlParameter("@GVWt", oRentCarModel.GVWt  );  
                arlParms[30] = new SqlParameter("@Doors", oRentCarModel.Doors );  
                arlParms[31] = new SqlParameter("@Seats", oRentCarModel.Seats );  
                arlParms[32] = new SqlParameter("@Cylinders", oRentCarModel.Cylinders  );  
                arlParms[33] = new SqlParameter("@CarMake", oRentCarModel.CarMake );  
                arlParms[34] = new SqlParameter("@PayLoad", oRentCarModel.PayLoad );  
                arlParms[35] = new SqlParameter("@MortageBy", oRentCarModel.MortageBy );  
                arlParms[36] = new SqlParameter("@MortageNumber", oRentCarModel.MortageNumber  );  
                arlParms[37] = new SqlParameter("@Insurancecompany", oRentCarModel.Insurancecompany);  
                arlParms[38] = new SqlParameter("@InsuranceType", oRentCarModel.InsuranceType );  
                arlParms[39] = new SqlParameter("@InsuranceNo", oRentCarModel.InsuranceNo );  
                arlParms[40] = new SqlParameter("@InsStartDate", oRentCarModel.InsStartDate );  
                arlParms[41] = new SqlParameter("@Radio", oRentCarModel.Radio);  
                arlParms[42] = new SqlParameter("@HeaterAC", oRentCarModel.HeaterAC );  
                arlParms[43] = new SqlParameter("@Petrol", oRentCarModel.Petrol );  
                arlParms[44] = new SqlParameter("@ToolsJack", oRentCarModel.ToolsJack );  
                arlParms[45] = new SqlParameter("@Lights", oRentCarModel.Lights );  
                arlParms[46] = new SqlParameter("@Sparewheel", oRentCarModel.Sparewheel );  
                arlParms[47] = new SqlParameter("@OutOfService", oRentCarModel.OutOfService );  
                arlParms[48] = new SqlParameter("@Flag", oRentCarModel.Flag  );  
                arlParms[49] = new SqlParameter("@CurrentDate", oRentCarModel.CurrentDate );  
                arlParms[50] = new SqlParameter("@ItemUserId", oRentCarModel.ItemUserId );  
                arlParms[51] = new SqlParameter("@BelowCostFlag", oRentCarModel.BelowCostFlag );  
                arlParms[52] = new SqlParameter("@DelFlag", oRentCarModel.DelFlag ); 

                return SQLHelper.ExecuteDataset("CarInsertandUpdate", dbName, arlParms); 

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CarGetandGets(RentCarModel RentCarModel, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CarId", RentCarModel.CarId);
                arlParms[1] = new SqlParameter("@Flag", RentCarModel.Flag);
                arlParms[2] = new SqlParameter("@Status", RentCarModel.Status);
                arlParms[3] = new SqlParameter("@DelFlag", RentCarModel.DelFlag);
                return SQLHelper.ExecuteDataset("CarGetandGets", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CarGetandGetsDailyPlanner(RentCarModel RentCarModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CarId", RentCarModel.CarId);
                arlParms[1] = new SqlParameter("@Flag", RentCarModel.Flag);
                arlParms[2] = new SqlParameter("@Status", RentCarModel.Status);
                arlParms[3] = new SqlParameter("@DelFlag", RentCarModel.DelFlag);
                return SQLHelper.ExecuteDataset("CarGetandGetsDailyPlanner", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet RentCustomerInsertandUpdate(RentCustomer CustomerMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[52];
                arlParms[0] = new SqlParameter("@CustId", CustomerMaster.CustId);
                arlParms[1] = new SqlParameter("@AccountType", CustomerMaster.AccountType);
                arlParms[2] = new SqlParameter("@CustType", CustomerMaster.CustType);
                arlParms[3] = new SqlParameter("@CustAccount", CustomerMaster.CustAccount);
                arlParms[4] = new SqlParameter("@CustName", CustomerMaster.CustName);
                arlParms[5] = new SqlParameter("@OpenBalance", CustomerMaster.OpenBalance);
                arlParms[6] = new SqlParameter("@DueDays", CustomerMaster.DueDays);
                arlParms[7] = new SqlParameter("@CreditLimit", CustomerMaster.CreditLimit);
                arlParms[8] = new SqlParameter("@CustTermsId", CustomerMaster.CustTermsId);
                arlParms[9] = new SqlParameter("@TRNNumber", CustomerMaster.TRNNumber);
                arlParms[10] = new SqlParameter("@SalesmanId", CustomerMaster.SalesmanId);
                arlParms[11] = new SqlParameter("@PriceGroupId", CustomerMaster.PriceGroupId);
                arlParms[12] = new SqlParameter("@CurrencyId", CustomerMaster.CurrencyId);
                arlParms[13] = new SqlParameter("@CustStatusId", CustomerMaster.CustStatusId);
                arlParms[14] = new SqlParameter("@CustStreet1", CustomerMaster.CustStreet1);
                arlParms[15] = new SqlParameter("@CustStreet2", CustomerMaster.CustStreet2);
                arlParms[16] = new SqlParameter("@CustCity1", CustomerMaster.CustCity1);
                arlParms[17] = new SqlParameter("@CustCity2", CustomerMaster.CustCity2);
                arlParms[18] = new SqlParameter("@CustState1", CustomerMaster.CustState1);
                arlParms[19] = new SqlParameter("@CustState2", CustomerMaster.CustState2);
                arlParms[20] = new SqlParameter("@CustPin1", CustomerMaster.CustPin1);
                arlParms[21] = new SqlParameter("@CustPin2", CustomerMaster.CustPin2);
                arlParms[22] = new SqlParameter("@CustCountry1", CustomerMaster.CustCountry1);
                arlParms[23] = new SqlParameter("@CustCountry2", CustomerMaster.CustCountry2);
                arlParms[24] = new SqlParameter("@CustNotes", CustomerMaster.CustNotes);
                arlParms[25] = new SqlParameter("@CustContactName1", CustomerMaster.CustContactName1);
                arlParms[26] = new SqlParameter("@CustContactNo1", CustomerMaster.CustContactNo1);
                arlParms[27] = new SqlParameter("@CustContactName2", CustomerMaster.CustContactName2);
                arlParms[28] = new SqlParameter("@CustContactNo2", CustomerMaster.CustContactNo2);
                arlParms[29] = new SqlParameter("@CustContactName3", CustomerMaster.CustContactName3);
                arlParms[30] = new SqlParameter("@CustContactNo3", CustomerMaster.CustContactNo3);
                arlParms[31] = new SqlParameter("@DelFlag", CustomerMaster.DelFlag);
                arlParms[32] = new SqlParameter("@AreaId", CustomerMaster.AreaId);
                arlParms[33] = new SqlParameter("@CustEmailId", CustomerMaster.CustEmailId);
                arlParms[34] = new SqlParameter("@EmailId", CustomerMaster.EmailId);
                arlParms[35] = new SqlParameter("@MapId", CustomerMaster.MapId);
                arlParms[36] = new SqlParameter("@PhoneNumber", CustomerMaster.PhoneNumber);
                arlParms[37] = new SqlParameter("@UserId", CustomerMaster.UserId);
                arlParms[38] = new SqlParameter("@DeptId", CustomerMaster.DeptId);

                arlParms[39] = new SqlParameter("@DOB", CustomerMaster.DOB);
                arlParms[40] = new SqlParameter("@LicenseNo", CustomerMaster.LicenseNo);
                arlParms[41] = new SqlParameter("@LicenseCategory", CustomerMaster.LicenseCategory);
                arlParms[42] = new SqlParameter("@LicenseIssuedOn", CustomerMaster.LicenseIssuedOn);
                arlParms[43] = new SqlParameter("@LicenseExpireOn", CustomerMaster.LicenseExpireOn);
                arlParms[44] = new SqlParameter("@LicenseIssuedState", CustomerMaster.LicenseIssuedState);
                arlParms[45] = new SqlParameter("@DrivingExp", CustomerMaster.DrivingExp);
                arlParms[46] = new SqlParameter("@Company", CustomerMaster.Company);                
                arlParms[47] = new SqlParameter("@WorkPhn", CustomerMaster.WorkPhn);
                arlParms[48] = new SqlParameter("@IDNo", CustomerMaster.IDNo);
                arlParms[49] = new SqlParameter("@Nationality", CustomerMaster.Nationality);
                arlParms[50] = new SqlParameter("@IDIssuedOn", CustomerMaster.IDIssuedOn);
                arlParms[51] = new SqlParameter("@IDExpireOn", CustomerMaster.IDExpireOn);
                

                return SQLHelper.ExecuteDataset("RentCustomerInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet RentCustomerGetandGets(RentCustomer CustomerMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@CustId", CustomerMaster.CustId);
                arlParms[1] = new SqlParameter("@cstyp", CustomerMaster.cstyp);
                return SQLHelper.ExecuteDataset("CustomerGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CustomerFileInsert(RentCustomer RentCustomer, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@CustId", RentCustomer.CustId);
                arlParms[1] = new SqlParameter("@FileName", RentCustomer.FileName);
                arlParms[2] = new SqlParameter("@Extension", RentCustomer.Extension);
                arlParms[3] = new SqlParameter("@Flag", RentCustomer.Flag);
                arlParms[4] = new SqlParameter("@UserId", RentCustomer.UserId);
                arlParms[5] = new SqlParameter("@DeptId", RentCustomer.DeptId);
                return SQLHelper.ExecuteDataset("CustomerFileInsert", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CustomerFileGets(RentCustomer RentCustomer, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CustId", RentCustomer.CustId);

                return SQLHelper.ExecuteDataset("CustomerFileGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CustomerFileDelete(RentCustomer RentCustomer, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FileId", RentCustomer.FileId);
                arlParms[1] = new SqlParameter("@DeptId", RentCustomer.DeptId);
                arlParms[2] = new SqlParameter("@UserId", RentCustomer.UserId);

                return SQLHelper.ExecuteDataset("CustomerFileDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CarMultipleImageInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MultipleImageUploadType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("CarMultipleImageInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CarsFileGets(RentCarModel RentCarModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@CarId", RentCarModel.CarId);
                arlParms[1] = new SqlParameter("@SlNo", RentCarModel.SlNo);
                arlParms[2] = new SqlParameter("@DelFlag", RentCarModel.DelFlag);

                return SQLHelper.ExecuteDataset("CarsFileGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CarFileDelete(RentCarModel RentCarModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@CarId", RentCarModel.CarId);
                arlParms[1] = new SqlParameter("@DeptId", RentCarModel.DeptId);
                arlParms[2] = new SqlParameter("@SlNo", RentCarModel.SlNo);

                return SQLHelper.ExecuteDataset("CarFileDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}