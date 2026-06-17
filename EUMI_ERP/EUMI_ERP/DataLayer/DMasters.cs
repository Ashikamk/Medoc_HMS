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
    public class DMasters
    {

        private SqlParameter[] arlParms;
        KeyValues KeyValues = new KeyValues();

        public DataSet PersonInsert(proceduremastercs procedure, string dbName)
        {
            try
            {
                SqlParameter[] arlParms = new SqlParameter[5];

                arlParms[0] = new SqlParameter("@Name", procedure.ProcedureName);
                arlParms[1] = new SqlParameter("@Age", procedure.ProcedureAge);
                arlParms[2] = new SqlParameter("@Gender", procedure.ProcedureGender);
                arlParms[3] = new SqlParameter("@Address", procedure.ProcedureAddress);
                arlParms[4] = new SqlParameter("@PhoneNumber", procedure.ProcedureNumber);

                return SQLHelper.ExecuteDataset("PersonInsert", dbName, arlParms);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public DataSet GetPersons(string dbName)
        {
            return SQLHelper.ExecuteDataset("PersonSelect", dbName);
        }

        public DataSet GetPersonById(int id, string dbName)
        {
            SqlParameter[] arlParms = new SqlParameter[1];
            arlParms[0] = new SqlParameter("@PersonId", id);

            return SQLHelper.ExecuteDataset("PersonGetById", dbName, arlParms);
        }

        public DataSet UpdatePerson(proceduremastercs procedure, string dbName)
        {
            SqlParameter[] arlParms = new SqlParameter[6];

            arlParms[0] = new SqlParameter("@PersonId", procedure.PersonId);
            arlParms[1] = new SqlParameter("@Name", procedure.ProcedureName);
            arlParms[2] = new SqlParameter("@Age", procedure.ProcedureAge);
            arlParms[3] = new SqlParameter("@Gender", procedure.ProcedureGender);
            arlParms[4] = new SqlParameter("@Address", procedure.ProcedureAddress);
            arlParms[5] = new SqlParameter("@PhoneNumber", procedure.ProcedureNumber);

            return SQLHelper.ExecuteDataset("PersonUpdate", dbName, arlParms);
        }

        public DataSet DeletePerson(int id, string dbName)
        {
            SqlParameter[] arlParms = new SqlParameter[1];

            arlParms[0] = new SqlParameter("@PersonId", id);

            return SQLHelper.ExecuteDataset("PersonDelete", dbName, arlParms);
        }

        public DataSet UserDepartmentGets(UsersModel UsersModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@UserId", UsersModel.UserId);
                arlParms[1] = new SqlParameter("@DeptId", UsersModel.DepartmentId);
                return SQLHelper.ExecuteDataset("UserDepartmentGets", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MethodMasterInsertandUpdate(MasterModels oMasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@MethodId", oMasterModels.MethodId);
                arlParms[1] = new SqlParameter("@MethodName", oMasterModels.MethodName);
                arlParms[2] = new SqlParameter("@MDescription", oMasterModels.MDescription);
                arlParms[3] = new SqlParameter("@Remarks", oMasterModels.Remarks);
                arlParms[4] = new SqlParameter("@DelFlag", oMasterModels.DelFlag);
                return SQLHelper.ExecuteDataset("MethodMasterInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MethodMasterGetandGets(MasterModels oMasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MethodId", oMasterModels.MethodId);
                return SQLHelper.ExecuteDataset("MethodMasterGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PettyVoucherTypeGetandGets(VoucherTypeModel VoucherTypeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VoucherTypeId", VoucherTypeModel.VoucherTypeId);
                return SQLHelper.ExecuteDataset("PettyVoucherTypeGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PCAccSearch(VoucherTypeModel VoucherTypeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccCode", VoucherTypeModel.AccCode);
                return SQLHelper.ExecuteDataset("PCAccSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet PCAccNoGetandGets(VoucherTypeModel VoucherTypeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@deptid", VoucherTypeModel.DeptId);
                arlParms[1] = new SqlParameter("@flag", VoucherTypeModel.flag);
                return SQLHelper.ExecuteDataset("PCAccNoGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DriverMasterInsertandUpdate(AreaMaster AreaMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@DriverId", AreaMaster.DriverId);
                arlParms[1] = new SqlParameter("@DriverName", AreaMaster.DriverName);
                arlParms[2] = new SqlParameter("@ERPDeptId", AreaMaster.ERPDeptId);
                arlParms[3] = new SqlParameter("@Address", AreaMaster.Address);
                arlParms[4] = new SqlParameter("@PhoneNumber", AreaMaster.PhoneNumber);
                arlParms[5] = new SqlParameter("@LicenceNumber", AreaMaster.LicenceNumber);
                arlParms[6] = new SqlParameter("@DelFlag", AreaMaster.DelFlag);
                return SQLHelper.ExecuteDataset("DriverMasterInsertandUpdate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DrivereGetsandGets(AreaMaster MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DriverId", MasterModels.DriverId);
                return SQLHelper.ExecuteDataset("DrivereGetsandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AreaGroupInsertandUpdate(AreaMaster AreaMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@AreaGrpId", AreaMaster.AreaGrpId);
                arlParms[1] = new SqlParameter("@AreaName", AreaMaster.GroupName);
                arlParms[2] = new SqlParameter("@Areacode", AreaMaster.AreaCode);
                arlParms[3] = new SqlParameter("@AreaDescription", AreaMaster.Description);
                arlParms[4] = new SqlParameter("@Deleteflag", AreaMaster.DelFlag);
                return SQLHelper.ExecuteDataset("AreaGroupInsertAndUpdate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        //internal DataSet BillSeriesInsertandUpdate(BillSeriesModel oBillSeriesModel, string dbName)
        //{
        //    throw new NotImplementedException();
        //}

        public DataSet TreeViewGets(AreaMaster MasterModels, string dbName)
        {
            try
            {

                return SQLHelper.ExecuteDataset("Acc_Treeview", dbName);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet AreaGroupGetandGets(AreaMaster MasterModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AreaGrpId", MasterModels.AreaGrpId);
                return SQLHelper.ExecuteDataset("AreaGroupGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LandlordGetandGetss(LandModel oBankModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Lan_Id", oBankModel.Lan_Id);
                return SQLHelper.ExecuteDataset("LandlordGetandGetss", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LandlordInsertandUpdates(LandModel oBankModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[14];
                arlParms[0] = new SqlParameter("@Lan_Id", oBankModel.Lan_Id);
                arlParms[1] = new SqlParameter("@LandName", oBankModel.LandName);
                arlParms[2] = new SqlParameter("@Nationality", oBankModel.Nationality);
                arlParms[3] = new SqlParameter("@Profession", oBankModel.Profession);
                arlParms[4] = new SqlParameter("@Pobox", oBankModel.Pobox);
                arlParms[5] = new SqlParameter("@PhoneNo", oBankModel.PhoneNo);
                arlParms[6] = new SqlParameter("@Email", oBankModel.Email);
                arlParms[7] = new SqlParameter("@FaxNo", oBankModel.Faxno);
                arlParms[8] = new SqlParameter("@MobNo", oBankModel.Mobno);
                arlParms[9] = new SqlParameter("@Address1", oBankModel.Address1);
                arlParms[10] = new SqlParameter("@Address2", oBankModel.Address2);
                arlParms[11] = new SqlParameter("@Address3", oBankModel.Address3);
                arlParms[12] = new SqlParameter("@CreatedDate", oBankModel.CreatedDate);
                arlParms[13] = new SqlParameter("@Deleteflag", oBankModel.DelFlag);
                return SQLHelper.ExecuteDataset("LandlordInsertandUpdates", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet AgentInsertandUpdates(Agent Agent, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@AgentId", Agent.AgentId);
                arlParms[1] = new SqlParameter("@AgentName", Agent.AgentName);
                arlParms[2] = new SqlParameter("@Address1", Agent.Address1);
                arlParms[3] = new SqlParameter("@Address2", Agent.Address2);
                arlParms[4] = new SqlParameter("@Address3", Agent.Address3);
                arlParms[5] = new SqlParameter("@PhoneNumber", Agent.PhoneNumber);
                arlParms[6] = new SqlParameter("@DelFlag", Agent.DelFlag);
                return SQLHelper.ExecuteDataset("AgentInsertandUpdates", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AgentGetandGets(Agent Agent, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AgentId", Agent.AgentId);
                return SQLHelper.ExecuteDataset("AgentGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_DoctorsSearch(Doctorsmaster Doctorsmaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Name", Doctorsmaster.Name);
                arlParms[1] = new SqlParameter("@DeptId", Doctorsmaster.DeptId);
                return SQLHelper.ExecuteDataset("HMS_DoctorsSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_AppointmentSearch(Appointment Appointment, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FirstName", Appointment.FirstName);
                arlParms[1] = new SqlParameter("@Contact", Appointment.Contact);
              
                return SQLHelper.ExecuteDataset("HMS_AppointmentSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AgentNameSearch(Agent Agent, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AgentName", Agent.AgentName);
                return SQLHelper.ExecuteDataset("AgentNameSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AreaInsertandUpdate(AreaMaster AreaMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@AreaId", AreaMaster.AreaId);
                arlParms[1] = new SqlParameter("@AreaName", AreaMaster.AreaName);
                arlParms[2] = new SqlParameter("@Areacode", AreaMaster.AreaCode);
                arlParms[3] = new SqlParameter("@AreaDescription", AreaMaster.Description);
                arlParms[4] = new SqlParameter("@Deleteflag", AreaMaster.DelFlag);
                arlParms[5] = new SqlParameter("@AreaGrpId", AreaMaster.AreaGrpId);
                return SQLHelper.ExecuteDataset("AreaInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet AreaGetandGets(AreaMaster AreaMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AreaId", AreaMaster.AreaId);
                return SQLHelper.ExecuteDataset("AreaGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet BusinessTypeGetandGets(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@BusinessTypeId", CompanyModel.BusinessTypeId);
                return SQLHelper.ExecuteDataset("BusinessTypeGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LocationInsertandUpdate(LocationModel LocationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@LocationId", LocationModel.LocationId);
                arlParms[1] = new SqlParameter("@LocationName", LocationModel.LocationName);
                arlParms[2] = new SqlParameter("@LocationCode", LocationModel.LocationCode);
                arlParms[3] = new SqlParameter("@LocationDescription", LocationModel.LocationDescription);
                arlParms[4] = new SqlParameter("@DelFlag", LocationModel.DelFlag);
                arlParms[5] = new SqlParameter("@NBFlag", LocationModel.NegativeBillingFlag);
                return SQLHelper.ExecuteDataset("LocationInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet LocationGetandGets(LocationModel LocationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@LocationId", LocationModel.LocationId);
                return SQLHelper.ExecuteDataset("LocationGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet UserLocationGetandGets(LocationModel LocationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@LocationId", LocationModel.LocationId);
                arlParms[1] = new SqlParameter("@UserId", LocationModel.UserId);

                return SQLHelper.ExecuteDataset("UserLocationGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet EmployeeDivisionInsertandUpdate(EmployeeDivisionModel EmployeeDivisionModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@EmployeeDivisionId", EmployeeDivisionModel.EmployeeDivisionId);
                arlParms[1] = new SqlParameter("@EmployeeDivisionName", EmployeeDivisionModel.EmployeeDivisionName);
                arlParms[2] = new SqlParameter("@EmployeeDivisionCode", EmployeeDivisionModel.EmployeeDivisionCode);
                arlParms[3] = new SqlParameter("@EmployeeDivisionDescription", EmployeeDivisionModel.EmployeeDivisionDescription);
                arlParms[4] = new SqlParameter("@DelFlag", EmployeeDivisionModel.DelFlag);
                return SQLHelper.ExecuteDataset("EmployeeDivisionInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet EmployeeDivisionGetandGets(EmployeeDivisionModel EmployeeDivisionModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@EmployeeDivisionId", EmployeeDivisionModel.EmployeeDivisionId);
                return SQLHelper.ExecuteDataset("EmployeeDivisionGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CostCenterInsertandUpdate(CostCenterModel CostCenterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@CostCenterId", CostCenterModel.CostCenterId);
                arlParms[1] = new SqlParameter("@CostCenterName", CostCenterModel.CostCenterName);
                arlParms[2] = new SqlParameter("@CostCenterCode", CostCenterModel.CostCenterCode);
                arlParms[3] = new SqlParameter("@CostCenterDescription", CostCenterModel.CostCenterDescription);
                arlParms[4] = new SqlParameter("@DelFlag", CostCenterModel.DelFlag);
                return SQLHelper.ExecuteDataset("CostCenterInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public long UploadMultipleProductImage(string dbName)
        {
            try
            {
                return SQLHelper.ExecuteNonQuery("GetItemImageId", dbName);

            }
#pragma warning disable CS0168 // The variable 'exMe' is declared but never used
            catch (SqlException exMe)
#pragma warning restore CS0168 // The variable 'exMe' is declared but never used
            {
                Console.WriteLine(SQLHelper.ExecuteNonQuery("GetItemImageId", dbName));
                return 0;
            }
        }

        public DataSet AccountHeadGetandGets(AccountSchedule AccountSchedule, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@AcId", AccountSchedule.AcntId);
                arlParms[1] = new SqlParameter("@SchId", AccountSchedule.ScheduleId);

                return SQLHelper.ExecuteDataset("AccountheadGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AccountHeadGetandGetsMaster(AccountSchedule AccountSchedule, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@AcId", AccountSchedule.AcntId);
                arlParms[1] = new SqlParameter("@SchId", AccountSchedule.ScheduleId);
                arlParms[2] = new SqlParameter("@Type", AccountSchedule.BillSerId);

                return SQLHelper.ExecuteDataset("AccountHeadGetandGetsMaster", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AccountHeadGetAccountTransaction(AccountSchedule AccountSchedule, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@AcntId", AccountSchedule.AcntId);
                arlParms[1] = new SqlParameter("@AcntCode", AccountSchedule.AcntCode);

                return SQLHelper.ExecuteDataset("AccountHeadGetAccountTransaction", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet AccountScheduleInsertandUpdate(AccountSchedule AccountSchedule, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@SchId", AccountSchedule.ScheduleId);
                arlParms[1] = new SqlParameter("@Schedule", AccountSchedule.schedul);
                arlParms[2] = new SqlParameter("@Code", AccountSchedule.AcntCode);
                arlParms[3] = new SqlParameter("@Acnttype", AccountSchedule.SCHType);
                return SQLHelper.ExecuteDataset("AccountScheduleInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }





        //public DataSet AccountHeadInsertandUpdate(AccountSchedule AccountSchedule, string dbName)
        //{
        //    try
        //    {
        //        arlParms = new SqlParameter[14]; 
        //        arlParms[0] = new SqlParameter("@AcId", AccountSchedule.AcntId);
        //        arlParms[1] = new SqlParameter("@SchId", AccountSchedule.ScheduleId);
        //        arlParms[2] = new SqlParameter("@AccountName", AccountSchedule.AcntDescription);
        //        arlParms[3] = new SqlParameter("@Narration", AccountSchedule.Narration);
        //        arlParms[4] = new SqlParameter("@OBalance", AccountSchedule.Opening);
        //        arlParms[5] = new SqlParameter("@DelFlag", AccountSchedule.DelFlag);
        //        arlParms[6] = new SqlParameter("@UserID", AccountSchedule.UserId);
        //        arlParms[7] = new SqlParameter("@AccountCode", AccountSchedule.AcntCode);
        //        arlParms[8] = new SqlParameter("@ScheduleType", AccountSchedule.SCHType);
        //        arlParms[9] = new SqlParameter("@DeptId", AccountSchedule.DeptId);
        //        arlParms[10] = new SqlParameter("@Type", AccountSchedule.Type);
        //        arlParms[11] = new SqlParameter("@Description", AccountSchedule.Description);
        //        arlParms[12] = new SqlParameter("@Amount", AccountSchedule.Amount);
        //        arlParms[13] = new SqlParameter("@Date", AccountSchedule.Date);  

        //        return SQLHelper.ExecuteDataset("AccountheadInsertandupdate", dbName, arlParms);

        //    }
        //    catch (SqlException exMe)
        //    {
        //        Console.WriteLine(exMe.Message);
        //        return null;
        //    }

        //}

        public DataSet AccountHeadInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccountHeadType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("AccountheadInsertandupdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet getOnlineUsers(ReminderModel ReminderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Date", ReminderModel.Date);
                return SQLHelper.ExecuteDataset("OnlineUsersGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet Ex_ChatInsert(ReminderModel ReminderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@Ex_ChatId", ReminderModel.Ex_ChatId);
                arlParms[1] = new SqlParameter("@SenderId", ReminderModel.SenderId);
                arlParms[2] = new SqlParameter("@ReceiverId", ReminderModel.ReceiverId);
                arlParms[3] = new SqlParameter("@Message", ReminderModel.ChatMessage);
                arlParms[4] = new SqlParameter("@Date", ReminderModel.Date);
                arlParms[5] = new SqlParameter("@DelFlag", ReminderModel.DelFlag);
                return SQLHelper.ExecuteDataset("Ex_ChatInsert", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet Ex_ChatGet(ReminderModel ReminderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@SenderId", ReminderModel.SenderId);
                arlParms[1] = new SqlParameter("@ReceiverId", ReminderModel.ReceiverId);
                arlParms[2] = new SqlParameter("@DelFlag", ReminderModel.DelFlag);
                arlParms[3] = new SqlParameter("@Status", ReminderModel.Status);
                return SQLHelper.ExecuteDataset("Ex_ChatGet", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        
             public DataSet CostCentermasterGetandGets(CostCenterModel CostCenterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CostCenterId", CostCenterModel.CostCenterId);
                return SQLHelper.ExecuteDataset("CostCentermasterGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet CostCenterGetandGets(CostCenterModel CostCenterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CostCenterId", CostCenterModel.CostCenterId);
                return SQLHelper.ExecuteDataset("CostCenterGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CategoryInsertandUpdate(CategoryModel CategoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@CategoryId", CategoryModel.CategoryId);
                arlParms[1] = new SqlParameter("@CategoryName", CategoryModel.CategoryName);
                arlParms[2] = new SqlParameter("@CategoryCode", CategoryModel.CategoryCode);
                arlParms[3] = new SqlParameter("@CategoryDescription", CategoryModel.CategoryDescription);
                arlParms[4] = new SqlParameter("@DelFlag", CategoryModel.DelFlag);
                return SQLHelper.ExecuteDataset("CategoryInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet ToolsInsertandUpdate(CategoryModel CategoryModel, string dbName)
        {
            try
            {


                arlParms = new SqlParameter[9];
                arlParms[0] = new SqlParameter("@ToolId", CategoryModel.ToolId);
                arlParms[1] = new SqlParameter("@Code", CategoryModel.Code);
                arlParms[2] = new SqlParameter("@ToolDesc", CategoryModel.ToolDesc);
                arlParms[3] = new SqlParameter("@category", CategoryModel.category);
                arlParms[4] = new SqlParameter("@group", CategoryModel.group);
                arlParms[5] = new SqlParameter("@Pcs", CategoryModel.Pcs);
                arlParms[6] = new SqlParameter("@ToolQty", CategoryModel.ToolQty);
                arlParms[7] = new SqlParameter("@OtherDetails", CategoryModel.OtherDetails);
                arlParms[8] = new SqlParameter("@DelFlag", CategoryModel.DelFlag);
                return SQLHelper.ExecuteDataset("ToolsInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet AssetRegisterInsertandUpdate(AssetRegisterModel AssetRegisterModel, string dbName)
        {
            try
            {


                arlParms = new SqlParameter[18];
                arlParms[0] = new SqlParameter("@AssetId", AssetRegisterModel.AssetId);
                arlParms[1] = new SqlParameter("@Code", AssetRegisterModel.Code);
                arlParms[2] = new SqlParameter("@Description", AssetRegisterModel.Description);
                arlParms[3] = new SqlParameter("@Serialno", AssetRegisterModel.Serialno);
                arlParms[4] = new SqlParameter("@Group", AssetRegisterModel.Group);
                arlParms[5] = new SqlParameter("@Category", AssetRegisterModel.Category);
                arlParms[6] = new SqlParameter("@Purvalue", AssetRegisterModel.Purvalue);
                arlParms[7] = new SqlParameter("@Date", AssetRegisterModel.Date);
                arlParms[8] = new SqlParameter("@Location", AssetRegisterModel.Location);
                arlParms[9] = new SqlParameter("@Year", AssetRegisterModel.Year);
                arlParms[10] = new SqlParameter("@Manufacturer", AssetRegisterModel.Manufacturer);
                arlParms[11] = new SqlParameter("@Make", AssetRegisterModel.Make);
                arlParms[12] = new SqlParameter("@Depreciatedvalue", AssetRegisterModel.Depreciatedvalue);
                arlParms[13] = new SqlParameter("@Depreciatedperc", AssetRegisterModel.Depreciatedperc);
                arlParms[14] = new SqlParameter("@AccountDebit", AssetRegisterModel.AccountDebit);
                arlParms[15] = new SqlParameter("@AccountCredit", AssetRegisterModel.AccountCredit);
                arlParms[16] = new SqlParameter("@Comments", AssetRegisterModel.Comments);
                arlParms[17] = new SqlParameter("@DelFlag", AssetRegisterModel.DelFlag);
                return SQLHelper.ExecuteDataset("AssetRegisterInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet GarageInsertandUpdate(GarageMaster GarageMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@GarageId", GarageMaster.GarageId);
                arlParms[1] = new SqlParameter("@GarageName", GarageMaster.GarageName);
                arlParms[2] = new SqlParameter("@Address", GarageMaster.txt_address);
                arlParms[3] = new SqlParameter("@PhoneNumber", GarageMaster.PhoneNumber);
                arlParms[4] = new SqlParameter("@DelFlag", GarageMaster.DelFlag);
                return SQLHelper.ExecuteDataset("GarageInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CategoryGetandGets(CategoryModel CategoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CategoryId", CategoryModel.CategoryId);
                return SQLHelper.ExecuteDataset("CategoryGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ToolsGetandGets(CategoryModel CategoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ToolId", CategoryModel.ToolId);
                return SQLHelper.ExecuteDataset("ToolsGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AssetRegisterGetandGets(AssetRegisterModel AssetRegisterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AssetId", AssetRegisterModel.AssetId);
                return SQLHelper.ExecuteDataset("AssetRegisterGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet GarageGetandGets(GarageMaster GarageMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@GarageId", GarageMaster.GarageId);
                return SQLHelper.ExecuteDataset("GarageGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SubCategoryInsertandUpdate(SubCategoryModel SubCategoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@SubCategoryId", SubCategoryModel.SubCategoryId);
                arlParms[1] = new SqlParameter("@CategoryId", SubCategoryModel.CategoryId);
                arlParms[2] = new SqlParameter("@SubCategoryName", SubCategoryModel.SubCategoryName);
                arlParms[3] = new SqlParameter("@SubCategoryDescription", SubCategoryModel.SubCategoryDescription);
                arlParms[4] = new SqlParameter("@DelFlag", SubCategoryModel.DelFlag);
                return SQLHelper.ExecuteDataset("SubCategoryInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SubCategoryGetandGets(SubCategoryModel SubCategoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SubCategoryId", SubCategoryModel.SubCategoryId);
                return SQLHelper.ExecuteDataset("SubCategoryGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SubCategoryGetforCategory(SubCategoryModel SubCategoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SubCategoryId", SubCategoryModel.SubCategoryId);
                arlParms[1] = new SqlParameter("@CategoryId", SubCategoryModel.CategoryId);
                return SQLHelper.ExecuteDataset("SubCategoryGetForCategory", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet BankGetandGets(BankModel oBankModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@BankId", oBankModel.BankId);
                return SQLHelper.ExecuteDataset("BankGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet BankInsertandUpdate(BankModel oBankModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[11];
                arlParms[0] = new SqlParameter("@BankId", oBankModel.BankId);
                arlParms[1] = new SqlParameter("@BankName", oBankModel.BankName);
                arlParms[2] = new SqlParameter("@BankCode", oBankModel.BankCode);
                arlParms[3] = new SqlParameter("@ZipCode", oBankModel.ZipCode);
                arlParms[4] = new SqlParameter("@Branch", oBankModel.Branch);
                arlParms[5] = new SqlParameter("@Address1", oBankModel.Address1);
                arlParms[6] = new SqlParameter("@Address2", oBankModel.Address2);
                arlParms[7] = new SqlParameter("@Address3", oBankModel.Address3);
                arlParms[8] = new SqlParameter("@PhoneNo", oBankModel.PhoneNo);
                arlParms[9] = new SqlParameter("@Email", oBankModel.Email);
                arlParms[10] = new SqlParameter("@Deleteflag", oBankModel.DelFlag);
                return SQLHelper.ExecuteDataset("BankInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PassportGetandGets(PassportModel PassportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@PassportId", PassportModel.PassportId);
                return SQLHelper.ExecuteDataset("PassportGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PassportInsertandUpdate(PassportModel oPassportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[11];
                arlParms[0] = new SqlParameter("@PassportId", oPassportModel.PassportId);
                arlParms[1] = new SqlParameter("@EmpId", oPassportModel.EmpId);
                arlParms[2] = new SqlParameter("@EmpCode", oPassportModel.EmpCode);
                arlParms[3] = new SqlParameter("@Name", oPassportModel.Name);
                arlParms[4] = new SqlParameter("@PassportNo", oPassportModel.PassportNo);
                arlParms[5] = new SqlParameter("@Country", oPassportModel.Country);
                arlParms[6] = new SqlParameter("@IssuedOn", oPassportModel.PassportIssued);
                arlParms[7] = new SqlParameter("@Expiry", oPassportModel.PassportExpiry);
                arlParms[8] = new SqlParameter("@Remarks", oPassportModel.Remarks);
                arlParms[9] = new SqlParameter("@Type", oPassportModel.Type);
                arlParms[10] = new SqlParameter("@Deleteflag", oPassportModel.DelFlag);
                return SQLHelper.ExecuteDataset("PassportInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DepartmentInsertandUpdate(DepartmentModel DepartmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@DepartmentId", DepartmentModel.DepartmentId);
                arlParms[1] = new SqlParameter("@DepartmentName", DepartmentModel.DepartmentName);
                arlParms[2] = new SqlParameter("@DepartmentCode", DepartmentModel.DepartmentCode);
                arlParms[3] = new SqlParameter("@DepartmentDescription", DepartmentModel.DepartmentDescription);
                arlParms[4] = new SqlParameter("@DelFlag", DepartmentModel.DelFlag);
                return SQLHelper.ExecuteDataset("DepartmentInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DepartmentGetandGets(DepartmentModel DepartmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DepartmentId", DepartmentModel.DepartmentId);
                return SQLHelper.ExecuteDataset("DepartmentGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ResourceInsertandUpdate(DepartmentModel DepartmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@ResourceId", DepartmentModel.ResourceId);
                arlParms[1] = new SqlParameter("@Code", DepartmentModel.Code);
                arlParms[2] = new SqlParameter("@Account", DepartmentModel.Account);
                arlParms[3] = new SqlParameter("@Description", DepartmentModel.Description);
                arlParms[4] = new SqlParameter("@Notes", DepartmentModel.Notes);
                arlParms[5] = new SqlParameter("@DelFlag", DepartmentModel.DelFlag);
                return SQLHelper.ExecuteDataset("ResourceInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ResourceGetandGets(DepartmentModel DepartmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ResourceId", DepartmentModel.ResourceId);
                return SQLHelper.ExecuteDataset("REsourceGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ResourceAutocomplete(DepartmentModel DepartmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ResourceId", DepartmentModel.ResourceId);
                return SQLHelper.ExecuteDataset("ResourceAutocomplete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet UserDepartmentGetandGets(DepartmentModel DepartmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", DepartmentModel.UserId);
                return SQLHelper.ExecuteDataset("UserDeptGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CustodianGetandGets(DepartmentModel DepartmentModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", DepartmentModel.UserId);
                return SQLHelper.ExecuteDataset("CustodianGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet EmployeeInsertandUpdate(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[63];
                arlParms[0] = new SqlParameter("@EmpId", EmployeeModel.EmpId);
                arlParms[1] = new SqlParameter("@EmpCode", EmployeeModel.EmpCode);
                arlParms[2] = new SqlParameter("@Name", EmployeeModel.Name);
                arlParms[3] = new SqlParameter("@CompanyId", EmployeeModel.CompanyId);
                arlParms[4] = new SqlParameter("@DepartmentId", EmployeeModel.DepartmentId);
                arlParms[5] = new SqlParameter("@LocationId", EmployeeModel.LocationId);
                arlParms[6] = new SqlParameter("@DesignationId", EmployeeModel.DesignationId);
                arlParms[7] = new SqlParameter("@DateofJoin", EmployeeModel.DateofJoin);
                arlParms[8] = new SqlParameter("@Email", EmployeeModel.Email);
                arlParms[9] = new SqlParameter("@Manager", EmployeeModel.Manager);
                arlParms[10] = new SqlParameter("@Mobile", EmployeeModel.Mobile);
                arlParms[11] = new SqlParameter("@WorkingHoursId", EmployeeModel.WorkingHoursId);
                arlParms[12] = new SqlParameter("@Others", EmployeeModel.Others);
                arlParms[13] = new SqlParameter("@IsActive", EmployeeModel.IsActive);
                arlParms[14] = new SqlParameter("@Gender", EmployeeModel.Gender);
                arlParms[15] = new SqlParameter("@DOB", EmployeeModel.DOB);
                arlParms[16] = new SqlParameter("@PCAddress1", EmployeeModel.PCAddress1);
                arlParms[17] = new SqlParameter("@PCAddress2", EmployeeModel.PCAddress2);
                arlParms[18] = new SqlParameter("@PCAddress3", EmployeeModel.PCAddress3);
                arlParms[19] = new SqlParameter("@PCCountry", EmployeeModel.PCCountry);
                arlParms[20] = new SqlParameter("@PCEmail", EmployeeModel.PCEmail);
                arlParms[21] = new SqlParameter("@PCMobile", EmployeeModel.PCMobile);
                arlParms[22] = new SqlParameter("@LCAddress1", EmployeeModel.LCAddress1);
                arlParms[23] = new SqlParameter("@LCAddress2", EmployeeModel.LCAddress2);
                arlParms[24] = new SqlParameter("@LCAddress3", EmployeeModel.LCAddress3);
                arlParms[25] = new SqlParameter("@LCCountry", EmployeeModel.LCCountry);
                arlParms[26] = new SqlParameter("@LCEmail", EmployeeModel.LCEmail);
                arlParms[27] = new SqlParameter("@LCMobile", EmployeeModel.LCMobile);
                arlParms[28] = new SqlParameter("@PassportId", EmployeeModel.PassportId);
                arlParms[29] = new SqlParameter("@NationalId", EmployeeModel.NationalId);
                arlParms[30] = new SqlParameter("@LabourNo", EmployeeModel.LabourNo);
                arlParms[31] = new SqlParameter("@InsuranceCompanyId", EmployeeModel.InsuranceCompanyId);
                arlParms[32] = new SqlParameter("@VISANo", EmployeeModel.VISANo);
                arlParms[33] = new SqlParameter("@DLNo", EmployeeModel.DLNo);
                arlParms[34] = new SqlParameter("@ContractTypeId", EmployeeModel.ContractTypeId);
                arlParms[35] = new SqlParameter("@FileNo", EmployeeModel.FileNo);
                arlParms[36] = new SqlParameter("@nationality", EmployeeModel.Nationality);
                arlParms[37] = new SqlParameter("@DelFlag", EmployeeModel.DelFlag);
                arlParms[38] = new SqlParameter("@PayRollType", EmployeeModel.PayRollType);
                arlParms[39] = new SqlParameter("@SalaryAccount", EmployeeModel.SalaryAccount);
                arlParms[40] = new SqlParameter("@AdvanceAccount", EmployeeModel.AdvanceAccount);
                arlParms[41] = new SqlParameter("@BankAccount", EmployeeModel.BankAccount);
                arlParms[42] = new SqlParameter("@BankAccountName", EmployeeModel.BankAccountName);
                arlParms[43] = new SqlParameter("@BasicSalary", EmployeeModel.BasicSalary);
                arlParms[44] = new SqlParameter("@DA", EmployeeModel.DA);
                arlParms[45] = new SqlParameter("@TA", EmployeeModel.TA);
                arlParms[46] = new SqlParameter("@NightAlowance", EmployeeModel.NightAlowance);
                arlParms[47] = new SqlParameter("@EarningOthers", EmployeeModel.EarningOthers);
                arlParms[48] = new SqlParameter("@TotalEarnings", EmployeeModel.TotalEarnings);
                arlParms[49] = new SqlParameter("@PF", EmployeeModel.PF);
                arlParms[50] = new SqlParameter("@Tax", EmployeeModel.Tax);
                arlParms[51] = new SqlParameter("@HRA", EmployeeModel.HRA);
                arlParms[52] = new SqlParameter("@ESI", EmployeeModel.ESI);
                arlParms[53] = new SqlParameter("@Otherdeductions", EmployeeModel.Otherdeductions);
                arlParms[54] = new SqlParameter("@TotalDeductions", EmployeeModel.TotalDeductions);
                arlParms[55] = new SqlParameter("@TotalNetSalary", EmployeeModel.TotalNetSalary);
                arlParms[56] = new SqlParameter("@VisaExpense", EmployeeModel.VisaExpense);
                arlParms[57] = new SqlParameter("@SalaryAdvance", EmployeeModel.SalaryAdvance);
                arlParms[58] = new SqlParameter("@OTRate", EmployeeModel.OTRate);
                arlParms[59] = new SqlParameter("@OTSRate", EmployeeModel.OTSRate);
                arlParms[60] = new SqlParameter("@UId", EmployeeModel.UId);
                arlParms[61] = new SqlParameter("@DeptId", EmployeeModel.DeptId);
                arlParms[62] = new SqlParameter("@EmployeeUser", EmployeeModel.EmployeeUser);

                return SQLHelper.ExecuteDataset("EmployeeInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet EmployeeDocumentDelete(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@EmpId", EmployeeModel.EmpId);
                return SQLHelper.ExecuteDataset("EmployeeDocumentDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet EmployeeFileInsert(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@DepartmentId", EmployeeModel.DepartmentId);
                arlParms[1] = new SqlParameter("@DocumentName", EmployeeModel.DocumentName);
                arlParms[2] = new SqlParameter("@DocumentType", EmployeeModel.DocumentType);
                arlParms[3] = new SqlParameter("@EmpId", EmployeeModel.EmpId);
                arlParms[4] = new SqlParameter("@Flag", EmployeeModel.Flag);
                arlParms[5] = new SqlParameter("@Extension", EmployeeModel.Extension);
                return SQLHelper.ExecuteDataset("EmployeeFileInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet EmployeeGetandGets(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@EmpId", EmployeeModel.EmpId);
                return SQLHelper.ExecuteDataset("EmployeeGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet EmployeeDocumentsView(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@EmpId", EmployeeModel.EmpId);
                return SQLHelper.ExecuteDataset("EmployeeDocumentsView", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DriverGetandGets(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Empflg", EmployeeModel.Empflg);
                return SQLHelper.ExecuteDataset("DriverGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet EmployeeDocumentGetandGets(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@EmpId", EmployeeModel.EmpId);
                return SQLHelper.ExecuteDataset("EmployeeDocumentGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }





        public DataSet CurrencyInsertandUpdate(CurrencyModels CurrencyModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@Id", CurrencyModels.Id);
                arlParms[1] = new SqlParameter("@Ccode", CurrencyModels.CurrencyCode);
                arlParms[2] = new SqlParameter("@Cname", CurrencyModels.CurrencyName);
                arlParms[3] = new SqlParameter("@Crate", CurrencyModels.CurrencyRate);
                arlParms[4] = new SqlParameter("@Remarks", CurrencyModels.Remarks);
                arlParms[5] = new SqlParameter("@DelFlag", CurrencyModels.DelFlag);
                return SQLHelper.ExecuteDataset("CurrencyInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CurrencyGetandGets(CurrencyModels CurrencyModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Id", CurrencyModels.Id);
                return SQLHelper.ExecuteDataset("CurrencyGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //sales
        public DataSet SalesmanInsertandUpdate(SalesModels SalesModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[12];
                arlParms[0] = new SqlParameter("@Id", SalesModels.Id);
                arlParms[1] = new SqlParameter("@Code", SalesModels.Code);
                arlParms[2] = new SqlParameter("@FirstName", SalesModels.FirstName);
                arlParms[3] = new SqlParameter("@LastName", SalesModels.LastName);
                arlParms[4] = new SqlParameter("@TargetAmount", SalesModels.TargetAmount);
                arlParms[5] = new SqlParameter("@Image", SalesModels.Image);
                arlParms[6] = new SqlParameter("@ContactNumber", SalesModels.ContactNumber);
                arlParms[7] = new SqlParameter("@Address1", SalesModels.Address1);
                arlParms[8] = new SqlParameter("@Address2", SalesModels.Address2);
                arlParms[9] = new SqlParameter("@Address3", SalesModels.Address3);
                arlParms[10] = new SqlParameter("@DelFlag", SalesModels.DelFlag);
                arlParms[11] = new SqlParameter("@UserId", SalesModels.UserId);
                return SQLHelper.ExecuteDataset("SalesmanInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesmanGetandGets(SalesModels SalesModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Id", SalesModels.Id);
                return SQLHelper.ExecuteDataset("SalesmanGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet UserSalesmanGetandGets(SalesModels SalesModels, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", SalesModels.UserId);
                return SQLHelper.ExecuteDataset("UserSalesmanGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet VCCAmountGet(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", SalesInvoiceModel.ProductId);
                arlParms[1] = new SqlParameter("@ItemCode", SalesInvoiceModel.ProductCode);
                return SQLHelper.ExecuteDataset("VCCAmountGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VCCReceivedAmountGet(VCCModel VCCModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ProductID", VCCModel.ProductId);
                arlParms[1] = new SqlParameter("@DeptId", VCCModel.DeptId);
                return SQLHelper.ExecuteDataset("VCCReceivedAmountGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet Rpt_VCCPendingPayment(VCCModel VCCModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", VCCModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", VCCModel.ToDate);
                arlParms[2] = new SqlParameter("@UserId", VCCModel.UserId);
                arlParms[3] = new SqlParameter("@DeptId", VCCModel.DeptId);
                arlParms[4] = new SqlParameter("@Variable1", VCCModel.Product);
                arlParms[5] = new SqlParameter("@Variable2", VCCModel.ProductCode);
                return SQLHelper.ExecuteDataset("Rpt_VCCPendingPayment", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet VCCGetandGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("VCCGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VCCPaymentGetandGets(VCCModel VCCModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@VCCNO", VCCModel.PaymentVCCNo);
                arlParms[1] = new SqlParameter("@DeptId", VCCModel.DeptId);
                return SQLHelper.ExecuteDataset("VCCPaymentGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet VCCInsertandUpdate(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[24];

                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@Description", SalesInvoiceModel.ProductDescr);
                arlParms[2] = new SqlParameter("@InvDate", SalesInvoiceModel.FromDate);
                arlParms[3] = new SqlParameter("@Amount", SalesInvoiceModel.Amount);
                arlParms[4] = new SqlParameter("@RecAmount", SalesInvoiceModel.CashAdvnce);
                arlParms[5] = new SqlParameter("@BalAmount", SalesInvoiceModel.balanceamt);
                arlParms[6] = new SqlParameter("@Flag", SalesInvoiceModel.DelFlag);
                arlParms[7] = new SqlParameter("@ProductCode", SalesInvoiceModel.ProductCode);
                arlParms[8] = new SqlParameter("@AccountType", SalesInvoiceModel.acctype);
                arlParms[9] = new SqlParameter("@BlSlNo", SalesInvoiceModel.BlSlNo);
                arlParms[10] = new SqlParameter("@CustName", SalesInvoiceModel.CustName);
                arlParms[11] = new SqlParameter("@CustAddress", SalesInvoiceModel.CustAddress);
                arlParms[12] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[13] = new SqlParameter("@VCCDate", SalesInvoiceModel.VCCDate);
                arlParms[14] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                arlParms[15] = new SqlParameter("@LocationId", SalesInvoiceModel.Location);
                arlParms[16] = new SqlParameter("@CustId", SalesInvoiceModel.CustId);
                arlParms[17] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[18] = new SqlParameter("@CurrencyId", SalesInvoiceModel.CurrencyId);
                arlParms[19] = new SqlParameter("@CurrencyRate", SalesInvoiceModel.CurrencyRate);
                arlParms[20] = new SqlParameter("@VCCBaseAmount", SalesInvoiceModel.VCCBaseAmount);
                arlParms[21] = new SqlParameter("@FCAmount", SalesInvoiceModel.FCAmount);
                arlParms[22] = new SqlParameter("@AccountId", SalesInvoiceModel.AccountId);
                arlParms[23] = new SqlParameter("@Account", SalesInvoiceModel.Account);
                return SQLHelper.ExecuteDataset("VCCInsertandUpdate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VCCPaymentInsertandUpdate(VCCModel VCCModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[17];

                arlParms[0] = new SqlParameter("@CustId", VCCModel.CustId);
                arlParms[1] = new SqlParameter("@CustName", VCCModel.CustomerName);
                arlParms[2] = new SqlParameter("@CustAddress", VCCModel.CustomerAddress);
                arlParms[3] = new SqlParameter("@VCCNo", VCCModel.VCCNo);
                arlParms[4] = new SqlParameter("@VCCPDate", VCCModel.VCCDate);
                arlParms[5] = new SqlParameter("@ProductId", VCCModel.ProductId);
                arlParms[6] = new SqlParameter("@ProductName", VCCModel.ProductName);
                arlParms[7] = new SqlParameter("@CurrencyId", VCCModel.CurrencyId);
                arlParms[8] = new SqlParameter("@CurrencyRate", VCCModel.CurrencyRate);
                arlParms[9] = new SqlParameter("@FCAmount", VCCModel.FCAmount);
                arlParms[10] = new SqlParameter("@Amount", VCCModel.Amount);
                arlParms[11] = new SqlParameter("@AccountType", VCCModel.AccountType);
                arlParms[12] = new SqlParameter("@UserId", VCCModel.UserId);
                arlParms[13] = new SqlParameter("@DeptId", VCCModel.DeptId);
                arlParms[14] = new SqlParameter("@AccountId", VCCModel.AccountId);
                arlParms[15] = new SqlParameter("@Account", VCCModel.Account);
                arlParms[16] = new SqlParameter("@ExitDate", VCCModel.ExitDate);

                return SQLHelper.ExecuteDataset("VCCPaymentInsertandUpdate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet BranchInsertandUpdate(BranchMaster BranchMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[11];

                arlParms[0] = new SqlParameter("@BrnchCode", BranchMaster.BrnchCode);
                arlParms[1] = new SqlParameter("@BrnchName", BranchMaster.BrnchName);
                arlParms[2] = new SqlParameter("@BrnchDescription", BranchMaster.BrnchDescription);
                arlParms[3] = new SqlParameter("@BrnchAddress1", BranchMaster.BrnchAddress1);
                arlParms[4] = new SqlParameter("@BrnchAddress2", BranchMaster.BrnchAddress2);
                arlParms[5] = new SqlParameter("@BrnchAddress3", BranchMaster.BrnchAddress3);
                arlParms[6] = new SqlParameter("@BrnchContactNo", BranchMaster.BrnchContactNo);
                arlParms[7] = new SqlParameter("@BrnchMobileNo", BranchMaster.BrnchMobileNo);
                arlParms[8] = new SqlParameter("@BrnchEmail", BranchMaster.BrnchEmail);
                arlParms[9] = new SqlParameter("@DelFlag", BranchMaster.DelFlag);
                arlParms[10] = new SqlParameter("@BrnchId", BranchMaster.BrnchId);
                return SQLHelper.ExecuteDataset("BranchInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet BranchGetandGets(BranchMaster BranchMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@BrnchId", BranchMaster.BrnchId);
                return SQLHelper.ExecuteDataset("BranchGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet GroupInsertandUpdate(GroupMaster GroupMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@GrpId", GroupMaster.GrpId);
                arlParms[1] = new SqlParameter("@GrpName", GroupMaster.GrpName);
                arlParms[2] = new SqlParameter("@GrpCode", GroupMaster.GrpCode);
                arlParms[3] = new SqlParameter("@GrpDescription", GroupMaster.GrpDescription);
                arlParms[4] = new SqlParameter("@DelFlag", GroupMaster.DelFlag);
                return SQLHelper.ExecuteDataset("GroupInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet GroupGetandGets(GroupMaster GroupMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@GrpId", GroupMaster.GrpId);
                return SQLHelper.ExecuteDataset("GroupGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AutomobileGroupGetandGets(GroupMaster GroupMaster, string dbName)
        {
            try
            {
                return SQLHelper.ExecuteDataset("AutomobileGroupGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SubGroupInsertandUpdate(SubGroupMaster SubGroupMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@SbgrpId", SubGroupMaster.SbgrpId);
                arlParms[1] = new SqlParameter("@GroupId", SubGroupMaster.GroupId);
                arlParms[2] = new SqlParameter("@SbgrpName", SubGroupMaster.SbgrpName);
                arlParms[3] = new SqlParameter("@SbgrpDescription", SubGroupMaster.SbgrpDescription);
                arlParms[4] = new SqlParameter("@DelFlag", SubGroupMaster.DelFlag);
                return SQLHelper.ExecuteDataset("SubGroupInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SubGroupGetandGets(SubGroupMaster SubGroupMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SbgrpId", SubGroupMaster.SbgrpId);
                return SQLHelper.ExecuteDataset("SubGroupGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SubGroupGetforGroup(SubGroupMaster SubGroupMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@GroupId", SubGroupMaster.GroupId);
                arlParms[1] = new SqlParameter("@SbgrpId", SubGroupMaster.SbgrpId);
                return SQLHelper.ExecuteDataset("SubGroupGetForGroup", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SubAreaGetforArea(AreaMaster AreaMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@AreaId", AreaMaster.AreaId);
                arlParms[1] = new SqlParameter("@AreaGroupId", AreaMaster.AreaGrpId);
                return SQLHelper.ExecuteDataset("SubAreaGetForArea", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DesignationInsertandUpdate(DesignationModel DesignationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@DesignationId", DesignationModel.DesignationId);
                arlParms[1] = new SqlParameter("@DesignationCode", DesignationModel.DesignationCode);
                arlParms[2] = new SqlParameter("@DesignationDescription", DesignationModel.DesignationDescription);
                arlParms[3] = new SqlParameter("@DelFlag", DesignationModel.DelFlag);
                return SQLHelper.ExecuteDataset("DesignationInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet DesignationGetandGets(DesignationModel DesignationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DesignationId", DesignationModel.DesignationId);
                return SQLHelper.ExecuteDataset("DesignationGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DesignationNameSearch(DesignationModel DesignationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DesignationName", DesignationModel.DesignationDescription);
                return SQLHelper.ExecuteDataset("DesignatinSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ProjectJobInsertandUpdate(ProjectJobModel ProjectJobModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[23];
                arlParms[0] = new SqlParameter("@ProjectJobId", ProjectJobModel.ProjectJobId);
                arlParms[1] = new SqlParameter("@JobCode", ProjectJobModel.JobCode);
                arlParms[2] = new SqlParameter("@Description", ProjectJobModel.Description);
                arlParms[3] = new SqlParameter("@CustId", ProjectJobModel.CustId);
                arlParms[4] = new SqlParameter("@EstAmount", ProjectJobModel.EstAmount);
                arlParms[5] = new SqlParameter("@Id", ProjectJobModel.Id);
                arlParms[6] = new SqlParameter("@JobNature", ProjectJobModel.JobNature);
                arlParms[7] = new SqlParameter("@LPO", ProjectJobModel.LPO);
                arlParms[8] = new SqlParameter("@StartDate", ProjectJobModel.StartDate);
                arlParms[9] = new SqlParameter("@EndDate", ProjectJobModel.EndDate);
                arlParms[10] = new SqlParameter("@JobGroup", ProjectJobModel.JobGroup);
                arlParms[11] = new SqlParameter("@Address1", ProjectJobModel.Address1);
                arlParms[12] = new SqlParameter("@Address2", ProjectJobModel.Address2);
                arlParms[13] = new SqlParameter("@Address3", ProjectJobModel.Address3);
                arlParms[14] = new SqlParameter("@BOQ", ProjectJobModel.BOQ);
                arlParms[15] = new SqlParameter("@JobStatus", ProjectJobModel.JobStatus);
                arlParms[16] = new SqlParameter("@JobDetails", ProjectJobModel.JobDetails);
                arlParms[17] = new SqlParameter("@RetensionAccount", ProjectJobModel.RetensionAccount);
                arlParms[18] = new SqlParameter("@Status", ProjectJobModel.Status);
                arlParms[19] = new SqlParameter("@DelFlag", ProjectJobModel.DelFlag);
                arlParms[20] = new SqlParameter("@CurrDate", ProjectJobModel.CurrDate);
                arlParms[21] = new SqlParameter("@UserId", ProjectJobModel.UserId);
                arlParms[22] = new SqlParameter("@DeptId", ProjectJobModel.DeptId);
                return SQLHelper.ExecuteDataset("ProjectJobInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet ProjectJobGetandGets(ProjectJobModel ProjectJobModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ProjectJobId", ProjectJobModel.ProjectJobId);
                return SQLHelper.ExecuteDataset("ProjectJobGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet JobSearch(ProjectJobModel ProjectJobModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Jobname", ProjectJobModel.JobCode);
                return SQLHelper.ExecuteDataset("JobSearchNew", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet EmployeeSearch(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@EmpCode", EmployeeModel.EmpCode);
                arlParms[1] = new SqlParameter("@EmpName", EmployeeModel.Name);
                return SQLHelper.ExecuteDataset("EmployeeSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet EmpAutoComplete(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@EmpCode", EmployeeModel.EmpCode);
                arlParms[1] = new SqlParameter("@EmpName", EmployeeModel.Name);
                return SQLHelper.ExecuteDataset("EmpAutoComplete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ToolsAutocomplete(CategoryModel CategoryModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ToolCode", CategoryModel.Code);
                return SQLHelper.ExecuteDataset("ToolsAutocomplete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet EmployeeDocumentInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@EmployeeDocuments", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("EmployeeDocumentInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet MultiPriceInsertandUpdate(MultiPriceModel MultiPriceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@MultiPriceId", MultiPriceModel.MultiPriceId);
                arlParms[1] = new SqlParameter("@PriceType", MultiPriceModel.PriceType);
                arlParms[2] = new SqlParameter("@Description", MultiPriceModel.Description);
                arlParms[3] = new SqlParameter("@DelFlag", MultiPriceModel.DelFlag);
                return SQLHelper.ExecuteDataset("MultiPriceInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MultiPriceGetandGets(MultiPriceModel MultiPriceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MultiPriceId", MultiPriceModel.MultiPriceId);
                return SQLHelper.ExecuteDataset("MultiPriceGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet VoucherTypeInsertandUpdate(VoucherTypeModel VoucherTypeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@VoucherTypeId", VoucherTypeModel.VoucherTypeId);
                arlParms[1] = new SqlParameter("@Prefix", VoucherTypeModel.Prefix);
                arlParms[2] = new SqlParameter("@Description", VoucherTypeModel.Description);
                arlParms[3] = new SqlParameter("@DelFlag", VoucherTypeModel.DelFlag);
                return SQLHelper.ExecuteDataset("VoucherTypeInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }







        public DataSet VoucherDelete(VoucherTypeModel VoucherTypeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@VoucherTypeId", VoucherTypeModel.VoucherTypeId);
                arlParms[1] = new SqlParameter("@VoucherNo", VoucherTypeModel.VoucherNo);
                arlParms[2] = new SqlParameter("@Deptid", VoucherTypeModel.DeptId);
                arlParms[3] = new SqlParameter("@UserId", VoucherTypeModel.UserId);
                return SQLHelper.ExecuteDataset("VoucerEntryDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }








        public DataSet VoucherTypeGetandGets(VoucherTypeModel VoucherTypeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VoucherTypeId", VoucherTypeModel.VoucherTypeId);
                return SQLHelper.ExecuteDataset("VoucherTypeGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet VoucherNoGetandGetss(VoucherTypeModel VoucherTypeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@deptid", VoucherTypeModel.vname);
                return SQLHelper.ExecuteDataset("GetShowSlnoNumbers", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ReminderInsertandUpdate(ReminderModel ReminderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[10];
                arlParms[0] = new SqlParameter("@ReminderId", ReminderModel.ReminderId);
                arlParms[1] = new SqlParameter("@UserId", ReminderModel.UserId);
                arlParms[2] = new SqlParameter("@TaskId", ReminderModel.TaskId);
                arlParms[3] = new SqlParameter("@TRType", ReminderModel.TRType);
                arlParms[4] = new SqlParameter("@Date", ReminderModel.Date);
                arlParms[5] = new SqlParameter("@Time", ReminderModel.Time);
                arlParms[6] = new SqlParameter("@Subject", ReminderModel.Subject);
                arlParms[7] = new SqlParameter("@TaskStatus", ReminderModel.TaskStatus);
                arlParms[8] = new SqlParameter("@ReminderMessage", ReminderModel.ReminderMessage);
                arlParms[9] = new SqlParameter("@DelFlag", ReminderModel.DelFlag);
                return SQLHelper.ExecuteDataset("ReminderInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ReminderGetandGets(ReminderModel ReminderModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ReminderId", ReminderModel.ReminderId);
                arlParms[1] = new SqlParameter("@trtypes", ReminderModel.trtypes);
                return SQLHelper.ExecuteDataset("ReminderGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet UnitInsertandUpdate(UnitMaster UnitMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@UnitId", UnitMaster.UnitId);
                arlParms[1] = new SqlParameter("@UnitName", UnitMaster.UnitName);
                arlParms[2] = new SqlParameter("@UnitDescription", UnitMaster.UnitDescription);
                arlParms[3] = new SqlParameter("@DelFlag", UnitMaster.DelFlag);
                return SQLHelper.ExecuteDataset("UnitInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet UnitGetandGets(UnitMaster UnitMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UnitId", UnitMaster.UnitId);
                return SQLHelper.ExecuteDataset("UnitGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //insert customer and supplier details
        public DataSet CustomerInsertandUpdate(CustomerMaster CustomerMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[39];
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

                return SQLHelper.ExecuteDataset("CustomerInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        
            public DataSet BillInfoGdetandGets(CustomerMaster CustomerMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillType", CustomerMaster.BillType);
                arlParms[1] = new SqlParameter("@BillNo", CustomerMaster.BillNo);
                arlParms[2] = new SqlParameter("@Billseries", CustomerMaster.Billseries);
                arlParms[3] = new SqlParameter("@Status", CustomerMaster.BFlag);
                return SQLHelper.ExecuteDataset("BillInfoGdetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);

                return null;
            }

        }




        public DataSet CustomerSupplierLinking(CustomerMaster CustomerMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", CustomerMaster.CustId);
                arlParms[1] = new SqlParameter("@supplierid", CustomerMaster.supplierid);
                arlParms[2] = new SqlParameter("@DelFlag", CustomerMaster.DelFlag);
                arlParms[3] = new SqlParameter("@LinkCode", CustomerMaster.LinkCode);
                return SQLHelper.ExecuteDataset("CustomerSupplierLinking", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CustomerSupplierLinkingUpdate(CustomerMaster CustomerMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@CustId", CustomerMaster.CustId);
                arlParms[1] = new SqlParameter("@supplierid", CustomerMaster.supplierid);
                arlParms[2] = new SqlParameter("@DelFlag", CustomerMaster.DelFlag);
                arlParms[3] = new SqlParameter("@LinkCode", CustomerMaster.LinkCode);
                return SQLHelper.ExecuteDataset("CustomerSupplierLinkingUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerSupplierLinkingGetandGets(CustomerMaster CustomerMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@CustId", CustomerMaster.CustId);
                arlParms[1] = new SqlParameter("@Suppid", CustomerMaster.supplierid);

                return SQLHelper.ExecuteDataset("CustomerSupplierLinkingGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerGetandGets(CustomerMaster CustomerMaster, string dbName)
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
        public DataSet AcntGetandGets(AccountSchedule AccountSchedule, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@AcntId", AccountSchedule.AcntId);
                arlParms[1] = new SqlParameter("@Actype", AccountSchedule.UserType);
                arlParms[2] = new SqlParameter("@DeptID", AccountSchedule.DeptId);
                return SQLHelper.ExecuteDataset("AccountScheduleGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ItemInsertandUpdate(ItemMasterModel oItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[52];

                arlParms[0] = new SqlParameter("@ItemId", oItemMasterModel.ItemId);
                arlParms[1] = new SqlParameter("@ItemCode", oItemMasterModel.ItemCode);
                arlParms[2] = new SqlParameter("@Description", oItemMasterModel.Description);
                arlParms[3] = new SqlParameter("@Unit", oItemMasterModel.Unit);
                arlParms[4] = new SqlParameter("@Group", oItemMasterModel.Group);
                arlParms[5] = new SqlParameter("@SubGroup", oItemMasterModel.SubGroup);
                arlParms[6] = new SqlParameter("@Category", oItemMasterModel.Category);
                arlParms[7] = new SqlParameter("@SubCategory", oItemMasterModel.SubCategory);
                arlParms[8] = new SqlParameter("@OpeningQty", oItemMasterModel.OpeningQty);
                arlParms[9] = new SqlParameter("@OpeningCost", oItemMasterModel.OpeningCost);
                arlParms[10] = new SqlParameter("@VatCode", oItemMasterModel.VatCode);
                arlParms[11] = new SqlParameter("@SellingPrice", oItemMasterModel.SellingPrice);
                arlParms[12] = new SqlParameter("@Model1", oItemMasterModel.Model1);
                arlParms[13] = new SqlParameter("@Model2", oItemMasterModel.Model2);
                arlParms[14] = new SqlParameter("@Model3", oItemMasterModel.Model3);
                arlParms[15] = new SqlParameter("@MaxQty", oItemMasterModel.MaxQty);
                arlParms[16] = new SqlParameter("@MinQty", oItemMasterModel.MinQty);
                arlParms[17] = new SqlParameter("@Bin_A", oItemMasterModel.Bin_A);
                arlParms[18] = new SqlParameter("@Bin_B", oItemMasterModel.Bin_B);
                arlParms[19] = new SqlParameter("@Bin_C", oItemMasterModel.Bin_C);
                arlParms[20] = new SqlParameter("@Bin_D", oItemMasterModel.Bin_D);
                arlParms[21] = new SqlParameter("@Bin_E", oItemMasterModel.Bin_E);
                arlParms[22] = new SqlParameter("@Bin_F", oItemMasterModel.Bin_F);
                arlParms[23] = new SqlParameter("@Bin_G", oItemMasterModel.Bin_G);
                arlParms[24] = new SqlParameter("@Bin_H", oItemMasterModel.Bin_H);
                arlParms[25] = new SqlParameter("@Size", oItemMasterModel.Size);
                arlParms[26] = new SqlParameter("@Weight", oItemMasterModel.Weight);
                arlParms[27] = new SqlParameter("@Length", oItemMasterModel.Length);
                arlParms[28] = new SqlParameter("@Width", oItemMasterModel.Width);
                arlParms[29] = new SqlParameter("@Thickness", oItemMasterModel.Thickness);
                arlParms[30] = new SqlParameter("@Density", oItemMasterModel.Density);
                arlParms[31] = new SqlParameter("@Specification", oItemMasterModel.Specification);
                arlParms[32] = new SqlParameter("@Active", oItemMasterModel.Active);
                arlParms[33] = new SqlParameter("@Deleteflag", oItemMasterModel.DelFlag);
                arlParms[34] = new SqlParameter("@LPCost", oItemMasterModel.LPCost);
                arlParms[35] = new SqlParameter("@AvgCost", oItemMasterModel.AvgCost);
                arlParms[36] = new SqlParameter("@StockIn", oItemMasterModel.StockIn);
                arlParms[37] = new SqlParameter("@StockOut", oItemMasterModel.StockOut);
                arlParms[38] = new SqlParameter("@Hsncode", oItemMasterModel.Hsncode);
                arlParms[39] = new SqlParameter("@Mrp", oItemMasterModel.MRP);
                arlParms[40] = new SqlParameter("@Sellingprice1", oItemMasterModel.SellingPrice1);
                arlParms[41] = new SqlParameter("@Sellingprice2", oItemMasterModel.SellingPrice2);
                arlParms[42] = new SqlParameter("@Otherdescription", oItemMasterModel.Otherdescription);
                arlParms[43] = new SqlParameter("@modelm1", oItemMasterModel.modelm1);
                arlParms[44] = new SqlParameter("@modelm2", oItemMasterModel.modelm2);
                arlParms[45] = new SqlParameter("@modelm3", oItemMasterModel.modelm3);
                arlParms[46] = new SqlParameter("@modelm4", oItemMasterModel.modelm4);
                arlParms[47] = new SqlParameter("@modelm5", oItemMasterModel.modelm5);
                arlParms[48] = new SqlParameter("@BelowCostFlag", oItemMasterModel.MultiPriceId);
                arlParms[49] = new SqlParameter("@UserId", oItemMasterModel.UserId);
                arlParms[50] = new SqlParameter("@DeptId", oItemMasterModel.DeptId);
                arlParms[51] = new SqlParameter("@ImageExt", oItemMasterModel.ImageExt);
                

                return SQLHelper.ExecuteDataset("ItemInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ItemModelCheck(ItemMasterModel oItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@CurrentModel", oItemMasterModel.Model1);
                arlParms[1] = new SqlParameter("@ItemId", oItemMasterModel.ItemId);

                return SQLHelper.ExecuteDataset("ItemModelCheck", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet GetourprojectsGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {

                return SQLHelper.ExecuteDataset("OurProjectsStatus_Gets", dbName);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        
            public DataSet BIRTHDAYANDVACCINATIONNOTIFICATION(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Status", ItemMasterModel.Status);
                return SQLHelper.ExecuteDataset("BdayandVaccinationRemider", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet GetourprojectsList(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Status", ItemMasterModel.Status);
                return SQLHelper.ExecuteDataset("OurProjectsList_Gets", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet PDCandToDoReminder(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Condition", ItemMasterModel.Condition);
                arlParms[1] = new SqlParameter("@Condition1", ItemMasterModel.Condition1);
                arlParms[2] = new SqlParameter("@Condition2", ItemMasterModel.Condition2);
                return SQLHelper.ExecuteDataset("PDCTODOReminder", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PDCTODOReminderDetailed(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Condition", ItemMasterModel.Condition);
                arlParms[1] = new SqlParameter("@Condition1", ItemMasterModel.Condition1);
                arlParms[2] = new SqlParameter("@Condition2", ItemMasterModel.Condition2);
                arlParms[3] = new SqlParameter("@Type", ItemMasterModel.Type);


                return SQLHelper.ExecuteDataset("PDCTODOReminderDetailed", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DocumentUploadInsertandUpdate(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@DocumentId", ItemMasterModel.DocumentId);
                arlParms[1] = new SqlParameter("@ReferenceNo", ItemMasterModel.ReferenceNo);
                arlParms[2] = new SqlParameter("@Remarks", ItemMasterModel.Remarks);
                arlParms[3] = new SqlParameter("@DocumentType", ItemMasterModel.DocumentType);
                arlParms[4] = new SqlParameter("@Filename", ItemMasterModel.Filename);
                arlParms[5] = new SqlParameter("@DelFlag", ItemMasterModel.DelFlag);
                return SQLHelper.ExecuteDataset("DocumentUploadInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DocumentUploadGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DocumentId", ItemMasterModel.DocumentId);
                arlParms[1] = new SqlParameter("@Condition", ItemMasterModel.Condition);
                return SQLHelper.ExecuteDataset("DocumentUploadGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet UploadTypeGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DocumentType", ItemMasterModel.DocumentType);
                return SQLHelper.ExecuteDataset("UploadTypeGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ItemGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", ItemMasterModel.ItemId);
                return SQLHelper.ExecuteDataset("ItemGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ItemGetandGetsCustomer(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", ItemMasterModel.ItemId);
                return SQLHelper.ExecuteDataset("ItemGetandGetsCustomer", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet MultiUnitInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MultiUnits", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MultiUnitInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet MultiUnitGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", ItemMasterModel.ItemId);
                return SQLHelper.ExecuteDataset("MultiUnitGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet LocationWiseQuantityUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ProductLocationQuantity", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("LocationWiseQuantityUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet ProductMultiPriceInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ProductMultiPrice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ProductMultiPriceInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet LocationWiseProductQty(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", ItemMasterModel.ItemId);
                return SQLHelper.ExecuteDataset("ProductLocationWisetQty", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet AspectsGetandGets(Aspects Aspects, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@EmpID", Aspects.EmpID);
                arlParms[1] = new SqlParameter("@Fromdate", Aspects.FromDate);
                arlParms[2] = new SqlParameter("@Todate", Aspects.Todate);
                arlParms[3] = new SqlParameter("@Flag", Aspects.Flag);
                return SQLHelper.ExecuteDataset("AspetsGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }









        public DataSet Aspectsinsertandupdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Aspectstype", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("EmployeeAspectsInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet UserMultiDeptInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MultiDeptInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("UserMultiDeptInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }










        public DataSet ProductMultiPriceGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", ItemMasterModel.ItemId);
                return SQLHelper.ExecuteDataset("ProductMultiPriceGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ProductRateGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ItemId", ItemMasterModel.ItemId);
                arlParms[1] = new SqlParameter("@NoQty", ItemMasterModel.NoQty);
                arlParms[2] = new SqlParameter("@Type", ItemMasterModel.Type);
                arlParms[3] = new SqlParameter("@PageType", ItemMasterModel.Condition);
                return SQLHelper.ExecuteDataset("ProductRateGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet VehicleGetandGets(VehicleModel VehicleModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@VehicleId", VehicleModel.VehicleId);
                return SQLHelper.ExecuteDataset("VehicleGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet TaxInsertandUpdate(TaxModel TaxModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[15];
                arlParms[0] = new SqlParameter("@TaxId", TaxModel.TaxId);
                arlParms[1] = new SqlParameter("@TaxName", TaxModel.TaxName);
                arlParms[2] = new SqlParameter("@TaxRate", TaxModel.TaxRate);
                arlParms[3] = new SqlParameter("@TaxableAccountSales", TaxModel.TaxableAccountSales);
                arlParms[4] = new SqlParameter("@TaxableAccountpurchase", TaxModel.TaxableAccountpurchase);
                arlParms[5] = new SqlParameter("@TaxAccountSales", TaxModel.TaxAccountSales);
                arlParms[6] = new SqlParameter("@TaxAccountpurchase", TaxModel.TaxAccountpurchase);
                arlParms[7] = new SqlParameter("@TaxableAcntSalesReturn", TaxModel.TaxableAccountSalesReturn);
                arlParms[8] = new SqlParameter("@TaxableAcntpurReturn", TaxModel.TaxableAccountpurchaseReturn);
                arlParms[9] = new SqlParameter("@DelFlag", TaxModel.DelFlag);
                arlParms[10] = new SqlParameter("@SRTax", TaxModel.SRTax);
                arlParms[11] = new SqlParameter("@PRTax", TaxModel.PRTax);
                arlParms[12] = new SqlParameter("@TaxDeptId", TaxModel.TaxDeptId);
                arlParms[13] = new SqlParameter("@DeptId", TaxModel.DeptId);
                arlParms[14] = new SqlParameter("@UserId", TaxModel.UserId);
                return SQLHelper.ExecuteDataset("TaxInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet TaxGetandGets(TaxModel TaxModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@TaxId", TaxModel.TaxId);
                return SQLHelper.ExecuteDataset("TaxGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet VehicleInsertandUpdate(VehicleModel VehicleModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[12];
                arlParms[0] = new SqlParameter("@VehicleId", VehicleModel.VehicleId);
                arlParms[1] = new SqlParameter("@RegistrationNumber", VehicleModel.RegistrationNumber);
                arlParms[2] = new SqlParameter("@Name", VehicleModel.Name);
                arlParms[3] = new SqlParameter("@VehicleStatus", VehicleModel.VehicleStatus);
                arlParms[4] = new SqlParameter("@FuelType", VehicleModel.FuelType);
                arlParms[5] = new SqlParameter("@Driver", VehicleModel.Driver);
                arlParms[6] = new SqlParameter("@RegistrationDate", VehicleModel.RegistrationDate);
                arlParms[7] = new SqlParameter("@ExpiryDate", VehicleModel.ExpiryDate);
                arlParms[8] = new SqlParameter("@InsuranceType", VehicleModel.InsuranceType);
                arlParms[9] = new SqlParameter("@Validity", VehicleModel.Validity);
                arlParms[10] = new SqlParameter("@VehicleDescription", VehicleModel.VehicleDescription);
                arlParms[11] = new SqlParameter("@DelFlag", VehicleModel.DelFlag);
                return SQLHelper.ExecuteDataset("VehicleInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet UsersInsertandUpdate(UsersModel UsersModel, string dbName)
        {

            try
            {
                arlParms = new SqlParameter[1];
                string Query = "IF ('" + UsersModel.DelFlag + "' = 1)" +
                    " if ('" + UsersModel.UserId + "' = 0) " +
                    " begin" +
                    " if not  exists(SELECT * FROM Mst_Users where UserName ='" + UsersModel.UserName + "' and DelFlag = 1)" +
                    " begin" +
                    " INSERT INTO Mst_Users(UserName, Password, Email, DepartmentId, LocationId, DelFlag, Name,DiscountPercent)" +
                    " select '" + UsersModel.UserName + "',ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "','" + UsersModel.Password + "'),'" + UsersModel.Email + "','" + UsersModel.DepartmentId + "','" + UsersModel.LocationId + "','" + UsersModel.DelFlag + "','" + UsersModel.Name + "','" + UsersModel.DiscountPercent + "'" +
                    " select 1 'Status',SCOPE_IDENTITY()'UserId'" +
                    " END" +
                    " else" +
                    " begin" +
                    " select 0 'Status', 0 'UserId'" +
                    " end" +
                    " end" +
                    " else" +
                    " begin" +
                    " if not  exists(SELECT * FROM Mst_Users where UserName = '" + UsersModel.UserName + "' and UserId <> '" + UsersModel.UserId + "' and DelFlag = 1)" +
                    " begin" +
                    " update Mst_Users set UserName = '" + UsersModel.UserName + "',Password = ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "','" + UsersModel.Password + "'),Email = '" + UsersModel.Email + "',DepartmentId = " + UsersModel.DepartmentId + ",LocationId = '" + UsersModel.LocationId + "',DelFlag = '" + UsersModel.DelFlag + "',Name = '" + UsersModel.Name + "',DiscountPercent = '" + UsersModel.DiscountPercent + "' where UserId = '" + UsersModel.UserId + "'" +
                    " select 2 'Status','" + UsersModel.UserId + "' 'UserId'" +
                    " end" +
                    " else" +
                    " begin" +
                    " select 0 'Status',0 'UserId'" +
                    " end" +
                    " end" +
                    " else" +
                    " update Mst_Users set DelFlag = '" + UsersModel.DelFlag + "' where UserId = '" + UsersModel.UserId + "'" +
                    " select 3 'Status','" + UsersModel.UserId + "' 'UserId'";

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("UsersInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet UsersGetandGets(UsersModel UsersModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];

                string Query = "if('" + UsersModel.UserId + "'=0)" +
                               " select *,0 as 'DivId',0 AS 'DefaultDep',0 AS 'DefaultLoc',isnull(DiscountPercent,0) as DiscountPercent from Mst_Users" +
                               " left outer join Mst_Department on Mst_Users.DepartmentId = Mst_Department.DepartmentId" +
                               " left outer join  Mst_Location on Mst_Users.LocationId = Mst_Location.LocationId" +
                               " where Mst_Users.DelFlag = 1 and Mst_Users.UserId!=1" +
                               " else" +
                               " select Mst_Users.UserId,Name,UserName,CONVERT(VARCHAR(MAX),DECRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', Password )) as Password,DivId,DeptId as 'DepartmentId',DepartmentName,LocId as 'LocationId',LocationName,Email,Mst_Users.DepartmentId AS 'DefaultDep',Mst_Users.LocationId AS 'DefaultLoc',isnull(DiscountPercent,0) as DiscountPercent from Mst_Users" +
                               " left outer join  Mst_UserDeptDivision on Mst_Users.UserId=Mst_UserDeptDivision.UserId" +
                               " left outer join Mst_Department on Mst_Users.DepartmentId=Mst_Department.DepartmentId" +
                               " left outer join Mst_Location on Mst_Users.LocationId=Mst_Location.LocationId" +
                               " where Mst_Users.UserId='" + UsersModel.UserId + "' order by DeptId desc";

                arlParms[0] = new SqlParameter("@Query", Query);
                return SQLHelper.ExecuteDataset("UsersGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerOrSupplierSearch(CustomerMaster CustomerMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@CustName", CustomerMaster.CustName);
                arlParms[1] = new SqlParameter("@Type", CustomerMaster.CustType);
                return SQLHelper.ExecuteDataset("CustomerOrSupplierSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AccountScheduleSearch(AccountSchedule AccountSchedule, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AccountCode", AccountSchedule.AccountCode);
                return SQLHelper.ExecuteDataset("AccountScheduleSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ProductSearch(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);
                return SQLHelper.ExecuteDataset("ProductSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_HSNSearch(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HSNCode", ItemMasterModel.ItemCode);
                return SQLHelper.ExecuteDataset("HMS_HSNSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ProductSearchSales(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);
                arlParms[1] = new SqlParameter("@LocId", ItemMasterModel.LocId);
                arlParms[2] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[3] = new SqlParameter("@CustId", ItemMasterModel.CustId);
                arlParms[4] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                arlParms[5] = new SqlParameter("@PriceGroupId", ItemMasterModel.ProductMultiPriceId);
                return SQLHelper.ExecuteDataset("ProductSearchSales", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ProductSearchRentCarSales(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);
                arlParms[1] = new SqlParameter("@LocId", ItemMasterModel.LocId);
                arlParms[2] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[3] = new SqlParameter("@CustId", ItemMasterModel.CustId);
                arlParms[4] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                arlParms[5] = new SqlParameter("@PriceGroupId", ItemMasterModel.ProductMultiPriceId);
                return SQLHelper.ExecuteDataset("ProductSearchRentCarSales", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AutomobileProductSearchSales(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);
                return SQLHelper.ExecuteDataset("AutomobileProductSearchSales", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ProductDetailsSearchSalesInvoice(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@LocId", ItemMasterModel.LocId);
                arlParms[1] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[2] = new SqlParameter("@Condition", ItemMasterModel.Condition);
                arlParms[3] = new SqlParameter("@PriceGroupId", ItemMasterModel.ProductMultiPriceId);

                return SQLHelper.ExecuteDataset("ProductDetailsSearchSalesInvoice", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AutoMobileProductDetailsSearch(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@LocId", ItemMasterModel.LocId);
                arlParms[1] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[2] = new SqlParameter("@ItemId", ItemMasterModel.ItemId);
                arlParms[3] = new SqlParameter("@GrpId", ItemMasterModel.GrpId);

                return SQLHelper.ExecuteDataset("AutoMobileProductDetailsSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet SalesInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet UsedCarSalesInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("UsedCarSalesInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet TemporarySalesInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("TemporarySalesInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet PressSalesInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoicePressType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PressSalesInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesInvoiceUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesInvoiceUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesInvoiceRentCarUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesInvoiceRentCarUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet UsedCarSalesInvoiceUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("UsedCarSalesInvoiceUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PressSalesInvoiceUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoicePressType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("PressSalesInvoiceUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet BillSeriesGetandGets(BillSeriesModel BillSeriesModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeptId", BillSeriesModel.DeptId);
                return SQLHelper.ExecuteDataset("BillSeriesGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet BillOrderSeriesGetandGets(BillSeriesModel BillSeriesModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeptId", BillSeriesModel.DeptId);
                return SQLHelper.ExecuteDataset("BillSeriesSalesOrderGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet BillSeriesSalesReturnGetandGets(BillSeriesModel BillSeriesModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeptId", BillSeriesModel.DeptId);
                return SQLHelper.ExecuteDataset("BillSeriesSalesReturnGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CustomerEnquiryGetandGets(BillSeriesModel BillSeriesModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeptId", BillSeriesModel.DeptId);
                return SQLHelper.ExecuteDataset("CustomerEnquiryGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesGetandGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("SalesGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PrevoiusUnsavedProductofCustomer(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@CustId", SalesInvoiceModel.CustId);
                arlParms[1] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("PrevoiusUnsavedProductofCustomer", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet TemporarySalesDelete(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[1] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[2] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("TemporarySalesDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerDueDateChecking(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@CustId", SalesInvoiceModel.CustId);
                arlParms[1] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("CustomerDueDateChecking", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PackingHistoryGetandGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("PackingHistoryGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet GarageNameSearch(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@GarageName", SalesInvoiceModel.GarageName);
                return SQLHelper.ExecuteDataset("GarageNameSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PackingHistoryCopyGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@PHDeptId", SalesInvoiceModel.PHDeptId);
                arlParms[4] = new SqlParameter("@DONO", SalesInvoiceModel.DeliveryOrderNo);
                return SQLHelper.ExecuteDataset("PackingHistoryCopyGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PackingHistoryLTCopyGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@PHDeptId", SalesInvoiceModel.PHDeptId);
                arlParms[4] = new SqlParameter("@DONO", SalesInvoiceModel.DeliveryOrderNo);
                return SQLHelper.ExecuteDataset("PackingHistoryLTCopyGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerProductDetailsSearch(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[1] = new SqlParameter("@CustId", SalesInvoiceModel.CustId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@locatnId", SalesInvoiceModel.LocId);
                arlParms[4] = new SqlParameter("@type", SalesInvoiceModel.type);

                return SQLHelper.ExecuteDataset("CustomerProductDetailsSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesTransGetandGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[1] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[2] = new SqlParameter("@Type", SalesInvoiceModel.type);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("SalesTransGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DeliveryOrderTransGetandGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[1] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[2] = new SqlParameter("@Type", SalesInvoiceModel.type);
                arlParms[3] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                return SQLHelper.ExecuteDataset("DeliveryOrderTransGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet TermsInsertandUpdate(TermsModel TermsModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@TermsId", TermsModel.TermsId);
                arlParms[1] = new SqlParameter("@Terms", TermsModel.Terms);
                arlParms[2] = new SqlParameter("@TermDescription", TermsModel.TermsDescription);
                arlParms[3] = new SqlParameter("@DelFlag", TermsModel.DelFlag);
                return SQLHelper.ExecuteDataset("TermsInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet TermsGetandGets(TermsModel TermsModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@TermsId", TermsModel.TermsId);
                return SQLHelper.ExecuteDataset("TermsGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SerialNoSearch(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@LocId", SalesInvoiceModel.LocId);

                return SQLHelper.ExecuteDataset("SerialNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet OpticalSerialNoSearch(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@LocId", SalesInvoiceModel.LocId);

                return SQLHelper.ExecuteDataset("OpticalSerialNoSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DeliveryNoSearch(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeliveryNo", SalesInvoiceModel.DeliveryOrderNo);
                return SQLHelper.ExecuteDataset("PackingHistoryDelNo", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PackingHistoryView(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[2] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);
                arlParms[3] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[4] = new SqlParameter("@Variable1", SalesInvoiceModel.Bin_A);
                arlParms[5] = new SqlParameter("@Variable2", SalesInvoiceModel.Bin_B);
                return SQLHelper.ExecuteDataset("PackingHistoryView", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesGetandGetsCashCollection(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@LocId", SalesInvoiceModel.LocId);
                return SQLHelper.ExecuteDataset("SalesGetandGetsCashCollection", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet JobCodeSearch(ProjectJobModel ProjectJobModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@JobCode", ProjectJobModel.JobCode);
                return SQLHelper.ExecuteDataset("JobCodeSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet AssetRegisterSearch(AssetRegisterModel AssetRegisterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Code", AssetRegisterModel.Code);
                return SQLHelper.ExecuteDataset("AssetRegisterSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet JobSearchPurchase(ProjectJobModel ProjectJobModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@JobCode", ProjectJobModel.JobCode);
                arlParms[1] = new SqlParameter("@ItemId", ProjectJobModel.ItemId);
                arlParms[2] = new SqlParameter("@UserId", ProjectJobModel.UserId);
                arlParms[3] = new SqlParameter("@DeptId", ProjectJobModel.DeptId);
                return SQLHelper.ExecuteDataset("JobSearchPurchase", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AllotedJobSearch(ProjectJobModel ProjectJobModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AllotedJobCode", ProjectJobModel.Description);
                return SQLHelper.ExecuteDataset("AllotedJobCodeSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet Relieving(ProjectJobModel ProjectJobModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@JobCode", ProjectJobModel.ProjectJobId);
                arlParms[1] = new SqlParameter("@EmpId", ProjectJobModel.EmpId);
                return SQLHelper.ExecuteDataset("Relieving", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet UserSearch(UsersModel UsersModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserName", UsersModel.UserName);
                return SQLHelper.ExecuteDataset("UserSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet UserSearchInUserMenuSettings(UserMenuSettingsModel UsersModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserName", UsersModel.UserName);
                return SQLHelper.ExecuteDataset("UserSearchInUserMenuSettings", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet AccountTypeGetandGets(AccountTypeModel AccountTypeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@AccountTypeId", AccountTypeModel.AccountTypeId);
                arlParms[1] = new SqlParameter("@DeptId", AccountTypeModel.DeptId);
                arlParms[2] = new SqlParameter("@flag", AccountTypeModel.flag);
                return SQLHelper.ExecuteDataset("AccountTypeGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet WorkingHoursGetandGets(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@WorkingHoursId", EmployeeModel.WorkingHoursId);
                return SQLHelper.ExecuteDataset("WorkingHoursGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet WorkingHoursInsertandUpdate(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@WorkingHours", EmployeeModel.WorkingHours);
                arlParms[1] = new SqlParameter("@Description", EmployeeModel.Description);
                arlParms[2] = new SqlParameter("@DelFlag", EmployeeModel.DelFlag);
                return SQLHelper.ExecuteDataset("WorkingHoursInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet InsuranceCompanyInsertandUpdate(InsuranceCompanyModel InsuranceCompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@InsuranceCompanyId", InsuranceCompanyModel.InsuranceCompanyId);
                arlParms[1] = new SqlParameter("@InsuranceCompanyCode", InsuranceCompanyModel.InsuranceCompanyCode);
                arlParms[2] = new SqlParameter("@InsuranceCompanyName", InsuranceCompanyModel.InsuranceCompanyName);
                arlParms[3] = new SqlParameter("@InsuranceCompanyDescription", InsuranceCompanyModel.InsuranceCompanyDescription);
                arlParms[4] = new SqlParameter("@Benefits", InsuranceCompanyModel.Benefits);
                arlParms[5] = new SqlParameter("@DelFlag", InsuranceCompanyModel.DelFlag);
                return SQLHelper.ExecuteDataset("InsuranceCompanyInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        
            public DataSet InsuranceCompanymasterGetandGets(InsuranceCompanyModel InsuranceCompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@InsuranceCompanyId", InsuranceCompanyModel.InsuranceCompanyId);
                return SQLHelper.ExecuteDataset("InsuranceCompanymasterGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet InsuranceCompanyGetandGets(InsuranceCompanyModel InsuranceCompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@InsuranceCompanyId", InsuranceCompanyModel.InsuranceCompanyId);
                return SQLHelper.ExecuteDataset("InsuranceCompanyGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LogReport(LogModel LogModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", LogModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", LogModel.ToDate);
                arlParms[2] = new SqlParameter("@User", LogModel.User);
                arlParms[3] = new SqlParameter("@Dept", LogModel.Dept);
                return SQLHelper.ExecuteDataset("LogReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        
            public DataSet IPAdvancebillstatus(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@StartingDate", LabBill.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", LabBill.ToDate);
                arlParms[2] = new SqlParameter("@DocId", LabBill.Doctor);
                arlParms[3] = new SqlParameter("@UserId", LabBill.UserId);
                return SQLHelper.ExecuteDataset("Hms_IpAmountStatus", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet LabBillReport(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@StartingDate", LabBill.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", LabBill.ToDate);
                arlParms[2] = new SqlParameter("@DocId", LabBill.Doctor);
                arlParms[3] = new SqlParameter("@UserId", LabBill.UserId);
                return SQLHelper.ExecuteDataset("HMS_RPTLabBill", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet IPBillReport(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@StartingDate", LabBill.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", LabBill.ToDate);
                arlParms[2] = new SqlParameter("@DocId", LabBill.Doctor);

                return SQLHelper.ExecuteDataset("HMS_RPTIPBill", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        
            public DataSet ProcedureBillReportItemWise(LabBill LabBill, string dbName)
            {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@StartingDate", LabBill.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", LabBill.ToDate);
                arlParms[2] = new SqlParameter("@DocId", LabBill.Doctor);
                return SQLHelper.ExecuteDataset("HMS_RPTProcedureBillItemWise", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet ProcedureBillReport(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@StartingDate", LabBill.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", LabBill.ToDate);
                arlParms[2] = new SqlParameter("@DocId", LabBill.Doctor);
                arlParms[3] = new SqlParameter("@UserId", LabBill.UserId);
                return SQLHelper.ExecuteDataset("HMS_RPTProcedureBill", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet UsersGetandGets(Profile Profile, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", Profile.UserId);
                return SQLHelper.ExecuteDataset("UsersGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet UserMenuUpdate(UserMenuSettingsModel UserMenuSettingsModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@UserId", UserMenuSettingsModel.UserId);
                arlParms[1] = new SqlParameter("@UserRole", UserMenuSettingsModel.UserRole);
                arlParms[2] = new SqlParameter("@MenuCode", UserMenuSettingsModel.MenuCode);
                return SQLHelper.ExecuteDataset("UserMenuUpdate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet OTPInsertandUpdate(OTPModel OTPModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@UserId", OTPModel.UserId);
                arlParms[1] = new SqlParameter("@OTP", OTPModel.OTP);
                arlParms[2] = new SqlParameter("@OTPCount", OTPModel.OTPCount);
                arlParms[3] = new SqlParameter("@Remarks", OTPModel.Remarks);
                arlParms[4] = new SqlParameter("@Deactivate", OTPModel.Deactivate);
                return SQLHelper.ExecuteDataset("OTPInsertandUpdate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet OTPGetandGets(OTPModel OTPModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", OTPModel.UserId);
                return SQLHelper.ExecuteDataset("OTPGetandGets", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet OTPCheckforUser(OTPModel OTPModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@UserId", OTPModel.UserId);
                arlParms[1] = new SqlParameter("@OTP", OTPModel.OTP);
                arlParms[2] = new SqlParameter("@OTPRemarks", OTPModel.Remarks);
                arlParms[3] = new SqlParameter("@Operation", OTPModel.Operation);
                arlParms[4] = new SqlParameter("@DeptId", OTPModel.DeptId);
                return SQLHelper.ExecuteDataset("OTPCheckforUser", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet IncrementGetandGets(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@IncrementId", EmployeeModel.IncrementId);
                return SQLHelper.ExecuteDataset("IncrementGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet IncrementTypeInsertandUpdate(EmployeeModel EmployeeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@IncrementType", EmployeeModel.IncrementType);
                arlParms[1] = new SqlParameter("@Flag", EmployeeModel.Flag);
                return SQLHelper.ExecuteDataset("IncrementTypeInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MasterUserMenus(HomeModel HomeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", HomeModel.UserId);
                return SQLHelper.ExecuteDataset("MasterUserMenus", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet IMEISalesTransGetandGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ProductId", SalesInvoiceModel.ProductId);
                arlParms[1] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("IMEISalesTransGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet IMEISalesTransPopup(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@IMEINum", SalesInvoiceModel.ImeiNo);
                arlParms[1] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                return SQLHelper.ExecuteDataset("IMEIAvailableSalesTransGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ReportUserMenus(HomeModel HomeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", HomeModel.UserId);
                return SQLHelper.ExecuteDataset("ReportUserMenus", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ProductSearchSalesMobile(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@ItemId", ItemMasterModel.ItemId);
                arlParms[1] = new SqlParameter("@LocId", ItemMasterModel.LocId);
                arlParms[2] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[3] = new SqlParameter("@CustId", ItemMasterModel.CustId);
                arlParms[4] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                arlParms[5] = new SqlParameter("@IMEI_Number", ItemMasterModel.IMEI_Number);
                arlParms[6] = new SqlParameter("@invtype", ItemMasterModel.invtype);

                return SQLHelper.ExecuteDataset("ProductSearchSalesMobile", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MobileSalesInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MobileSalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MobileSalesInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet InventoryUserMenus(HomeModel HomeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", HomeModel.UserId);
                return SQLHelper.ExecuteDataset("InventoryUserMenus", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet MultiUnitGetandGetsdemo(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ProductId", ItemMasterModel.ProductId);
                return SQLHelper.ExecuteDataset("MultiUnitGetandGetsdemo", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet OrderBouncingInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@OrderBouncing", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("OrderBouncingInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseAnalysisGet(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];


                arlParms[0] = new SqlParameter("@Condition", SalesInvoiceModel.Condition);
                arlParms[1] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[2] = new SqlParameter("@Condition1", SalesInvoiceModel.Status);
                arlParms[3] = new SqlParameter("@CustId", SalesInvoiceModel.CustName);
                arlParms[4] = new SqlParameter("@TYPE", SalesInvoiceModel.acctype);
                arlParms[5] = new SqlParameter("@HSNCode", SalesInvoiceModel.HSNCode);
                arlParms[6] = new SqlParameter("@TrnNumber", SalesInvoiceModel.TrnNumber);


                return SQLHelper.ExecuteDataset("PurchaseAnalysisGet", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ItemImportInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemImportInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ItemImportInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ExpirypopupD(PassportModel passportmodel1, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeptId", passportmodel1.DeptId);
                arlParms[1] = new SqlParameter("@ExpDate", passportmodel1.ExpDate);
                return SQLHelper.ExecuteDataset("Expassport", dbName, arlParms);


            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        //public DataSet ItemDetailsGetforExcelImport(ItemMasterModel ItemMasterModel, string dbName)
        //{
        //    try
        //    {
        //        arlParms = new SqlParameter[2];
        //        arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode); 
        //        arlParms[1] = new SqlParameter("@Description", ItemMasterModel.Description); 
        //        return SQLHelper.ExecuteDataset("ItemDetailsGetforExcelImport", dbName, arlParms);

        //    }
        //    catch (SqlException exMe)
        //    {
        //        Console.WriteLine(exMe.Message);
        //        return null;
        //    }

        //} 
        public DataSet ItemDetailsGetforExcelImport(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemDetailsType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ItemDetailsGetforExcelImport", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SupplierItemInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemSupplier", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SupplierItemInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MobileSalesInvoiceUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MobileSalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MobileSalesInvoiceUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet UsersGetandGetschat(UsersModel UsersModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserID", UsersModel.UserId);
                return SQLHelper.ExecuteDataset("UsersGetandGetsforchat", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MIProductSearch(ItemMasterModel ItemMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@ItemCode", ItemMasterModel.ItemCode);
                arlParms[1] = new SqlParameter("@LocId", ItemMasterModel.LocId);
                arlParms[2] = new SqlParameter("@DeptId", ItemMasterModel.DeptId);
                arlParms[3] = new SqlParameter("@CustId", ItemMasterModel.CustId);
                arlParms[4] = new SqlParameter("@UserId", ItemMasterModel.UserId);
                arlParms[5] = new SqlParameter("@PriceGroupId", ItemMasterModel.ProductMultiPriceId);
                arlParms[6] = new SqlParameter("@JobId", ItemMasterModel.JobNo);
                return SQLHelper.ExecuteDataset("MIProductSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesGasTradingInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesGasTradingInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesRentCarInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesRentCarInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet SalesInvoiceGasTradingUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesInvoice", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesInvoiceGasTradingUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ExportSalesDocStatusGets(SalesInvoiceModel SalesInvoiceModel, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@Condition", SalesInvoiceModel.Condition);
                arlParms[1] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[2] = new SqlParameter("@FromDate", SalesInvoiceModel.FromDate);
                arlParms[3] = new SqlParameter("@ToDate", SalesInvoiceModel.ToDate);
                arlParms[4] = new SqlParameter("@Type", SalesInvoiceModel.checkflag);
                arlParms[5] = new SqlParameter("@UserId", SalesInvoiceModel.UserId);              

                return SQLHelper.ExecuteDataset("ExportSalesDocStatusGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesCustUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesCustLink", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalesmanCustInsertAndUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalesmanCustGets(SalesCust SalesCust, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalesmanId", SalesCust.SalesmanId);
                return SQLHelper.ExecuteDataset("SalesmanCustGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CustomerSalesGetandGets(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@CustId", SalesInvoiceModel.CustId);
                arlParms[1] = new SqlParameter("@type", SalesInvoiceModel.type); 
                arlParms[2] = new SqlParameter("@CustName", SalesInvoiceModel.CustName);
                arlParms[3] = new SqlParameter("@checkflag", SalesInvoiceModel.checkflag);
                arlParms[4] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[5] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId); 
                return SQLHelper.ExecuteDataset("CustomerSalesGetandGets", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        

            public DataSet HMS_RegistrationInsertandUpdatefromcasesheet(RegistrationModel RegistrationModel, string dbName)
           {
            try
            {
                arlParms = new SqlParameter[15];
                arlParms[0] = new SqlParameter("@RegSeries", RegistrationModel.RegSeries);
                arlParms[1] = new SqlParameter("@RegNo", RegistrationModel.RegNo);
                arlParms[2] = new SqlParameter("@PName", RegistrationModel.PName);                
                arlParms[3] = new SqlParameter("@PDOB", RegistrationModel.PDOB);                
                arlParms[4] = new SqlParameter("@MobileNo", RegistrationModel.MobileNo);                
                arlParms[5] = new SqlParameter("@Address1", RegistrationModel.Address1);
                arlParms[6] = new SqlParameter("@Birthweight", RegistrationModel.Birthweight);
                arlParms[7] = new SqlParameter("@Currentweight", RegistrationModel.Currentweight);
                arlParms[8] = new SqlParameter("@Fathersname", RegistrationModel.Fathersname);
                arlParms[9] = new SqlParameter("@Mothersname", RegistrationModel.Mothersname);
                arlParms[10] = new SqlParameter("@FatherOccupation", RegistrationModel.FatherOccupation);
                arlParms[11] = new SqlParameter("@MotherOccupation", RegistrationModel.MotherOccupation);
                arlParms[12] = new SqlParameter("@UserId", RegistrationModel.UserId);
                arlParms[13] = new SqlParameter("@DeptId", RegistrationModel.DeptId);
                arlParms[14] = new SqlParameter("@DelFlag", RegistrationModel.DelFlag);
                return SQLHelper.ExecuteDataset("HMS_RegistrationInsertandUpdateCasesheet", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        
             public DataSet HMS_ScanRegistrationInsertandUpdate(RegistrationModel RegistrationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[41];
                arlParms[0] = new SqlParameter("@RegSeries", RegistrationModel.RegSeries);
                arlParms[1] = new SqlParameter("@RegNo", RegistrationModel.RegNo);
                arlParms[2] = new SqlParameter("@PName", RegistrationModel.PName);
                arlParms[3] = new SqlParameter("@PGender", RegistrationModel.PGender);
                arlParms[4] = new SqlParameter("@Age", RegistrationModel.Age);
                arlParms[5] = new SqlParameter("@PDOB", RegistrationModel.PDOB);
                arlParms[6] = new SqlParameter("@Doctor", RegistrationModel.Doctor);
                arlParms[7] = new SqlParameter("@HealthCardNo", RegistrationModel.HealthCardNo);
                arlParms[8] = new SqlParameter("@MobileNo", RegistrationModel.MobileNo);
                arlParms[9] = new SqlParameter("@PhoneNo", RegistrationModel.PhoneNo);
                arlParms[10] = new SqlParameter("@Address1", RegistrationModel.Address1);
                arlParms[11] = new SqlParameter("@Address2", RegistrationModel.Address2);
                arlParms[12] = new SqlParameter("@Address3", RegistrationModel.Address3);
                arlParms[13] = new SqlParameter("@AdharNo", RegistrationModel.AdharNo);
                arlParms[14] = new SqlParameter("@RegFee", RegistrationModel.RegFee);
                arlParms[15] = new SqlParameter("@ConsultFee", RegistrationModel.ConsultFee);
                arlParms[16] = new SqlParameter("@OtherFee", RegistrationModel.OtherFee);
                arlParms[17] = new SqlParameter("@TokenNo", RegistrationModel.TokenNo);
                arlParms[18] = new SqlParameter("@RegDate", RegistrationModel.RegDate);
                arlParms[19] = new SqlParameter("@Birthweight", RegistrationModel.Birthweight);
                arlParms[20] = new SqlParameter("@Currentweight", RegistrationModel.Currentweight);
                arlParms[21] = new SqlParameter("@Bloodgroup", RegistrationModel.Bloodgroup);
                arlParms[22] = new SqlParameter("@Height", RegistrationModel.Height);
                arlParms[23] = new SqlParameter("@Fathersname", RegistrationModel.Fathersname);
                arlParms[24] = new SqlParameter("@Mothersname", RegistrationModel.Mothersname);
                arlParms[25] = new SqlParameter("@FatherOccupation", RegistrationModel.FatherOccupation);
                arlParms[26] = new SqlParameter("@MotherOccupation", RegistrationModel.MotherOccupation);
                arlParms[27] = new SqlParameter("@UserId", RegistrationModel.UserId);
                arlParms[28] = new SqlParameter("@DeptId", RegistrationModel.DeptId);
                arlParms[29] = new SqlParameter("@DelFlag", RegistrationModel.DelFlag);
                arlParms[30] = new SqlParameter("@Status", RegistrationModel.Status);
                arlParms[31] = new SqlParameter("@RegId", RegistrationModel.RegId);
                arlParms[32] = new SqlParameter("@District", RegistrationModel.District);
                arlParms[33] = new SqlParameter("@State", RegistrationModel.State);
                arlParms[34] = new SqlParameter("@Religion", RegistrationModel.Religion);
                arlParms[35] = new SqlParameter("@Occupation", RegistrationModel.Occupation);
                arlParms[36] = new SqlParameter("@EmailId", RegistrationModel.EmailId);
                arlParms[37] = new SqlParameter("@selectedImage", RegistrationModel.selectedImage);
                arlParms[38] = new SqlParameter("@Country", RegistrationModel.Country);
                arlParms[39] = new SqlParameter("@Shift", RegistrationModel.Shift);
                arlParms[40] = new SqlParameter("@MFlag", RegistrationModel.MFlag);
                return SQLHelper.ExecuteDataset("HMS_RegistrationInsertandUpdatescan", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_RegistrationInsertandUpdate(RegistrationModel RegistrationModel, string dbName)
        { 
            try
            {
               arlParms     = new SqlParameter[44];
               arlParms[0]  = new SqlParameter("@RegSeries", RegistrationModel.RegSeries);
               arlParms[1]  = new SqlParameter("@RegNo", RegistrationModel.RegNo);
               arlParms[2]  = new SqlParameter("@PName", RegistrationModel.PName);
               arlParms[3]  = new SqlParameter("@PGender", RegistrationModel.PGender);
               arlParms[4]  = new SqlParameter("@Age", RegistrationModel.Age);
               arlParms[5]  = new SqlParameter("@PDOB", RegistrationModel.PDOB);
               arlParms[6]  = new SqlParameter("@Doctor", RegistrationModel.Doctor);
               arlParms[7]  = new SqlParameter("@HealthCardNo", RegistrationModel.HealthCardNo);
               arlParms[8]  = new SqlParameter("@MobileNo", RegistrationModel.MobileNo);
               arlParms[9]  = new SqlParameter("@PhoneNo", RegistrationModel.PhoneNo);
               arlParms[10] = new SqlParameter("@Address1", RegistrationModel.Address1);
               arlParms[11] = new SqlParameter("@Address2", RegistrationModel.Address2);
               arlParms[12] = new SqlParameter("@Address3", RegistrationModel.Address3);
               arlParms[13] = new SqlParameter("@AdharNo", RegistrationModel.AdharNo);
               arlParms[14] = new SqlParameter("@RegFee", RegistrationModel.RegFee);
               arlParms[15] = new SqlParameter("@ConsultFee", RegistrationModel.ConsultFee);
               arlParms[16] = new SqlParameter("@OtherFee", RegistrationModel.OtherFee);
               arlParms[17] = new SqlParameter("@TokenNo", RegistrationModel.TokenNo);
               arlParms[18] = new SqlParameter("@RegDate", RegistrationModel.RegDate);
               arlParms[19] = new SqlParameter("@Birthweight", RegistrationModel.Birthweight);
               arlParms[20] = new SqlParameter("@Currentweight", RegistrationModel.Currentweight);
               arlParms[21] = new SqlParameter("@Bloodgroup", RegistrationModel.Bloodgroup);
               arlParms[22] = new SqlParameter("@Height", RegistrationModel.Height);
               arlParms[23] = new SqlParameter("@Fathersname", RegistrationModel.Fathersname);
               arlParms[24] = new SqlParameter("@Mothersname", RegistrationModel.Mothersname);
               arlParms[25] = new SqlParameter("@FatherOccupation", RegistrationModel.FatherOccupation);
               arlParms[26] = new SqlParameter("@MotherOccupation", RegistrationModel.MotherOccupation);
               arlParms[27] = new SqlParameter("@UserId", RegistrationModel.UserId);
               arlParms[28] = new SqlParameter("@DeptId", RegistrationModel.DeptId);
               arlParms[29] = new SqlParameter("@DelFlag", RegistrationModel.DelFlag);
               arlParms[30] = new SqlParameter("@Status", RegistrationModel.Status);
               arlParms[31] = new SqlParameter("@RegId", RegistrationModel.RegId);               
               arlParms[32] = new SqlParameter("@District", RegistrationModel.District);
               arlParms[33] = new SqlParameter("@State", RegistrationModel.State);
               arlParms[34] = new SqlParameter("@Religion", RegistrationModel.Religion);
               arlParms[35] = new SqlParameter("@Occupation", RegistrationModel.Occupation);
               arlParms[36] = new SqlParameter("@EmailId", RegistrationModel.EmailId);
               arlParms[37] = new SqlParameter("@selectedImage", RegistrationModel.selectedImage);
               arlParms[38] = new SqlParameter("@Country", RegistrationModel.Country);
               arlParms[39] = new SqlParameter("@Shift", RegistrationModel.Shift);
               arlParms[40] = new SqlParameter("@MFlag", RegistrationModel.MFlag);
               arlParms[41] = new SqlParameter("@Cash", RegistrationModel.Cash);
               arlParms[42] = new SqlParameter("@Upi", RegistrationModel.Upi);
               arlParms[43] = new SqlParameter("@Card", RegistrationModel.Card);
                return SQLHelper.ExecuteDataset("HMS_RegistrationInsertandUpdate", dbName, arlParms); 

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_RegistrationGetandGets(RegistrationModel RegistrationModel, string dbName) 
        {
            try 
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@RegId", RegistrationModel.RegId);
                arlParms[1] = new SqlParameter("@RegSeries", RegistrationModel.RegSeries);
                arlParms[2] = new SqlParameter("@RegNo", RegistrationModel.RegNo); 
              
                return SQLHelper.ExecuteDataset("HMS_RegistrationGetandGets", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_RegPatientInfo(RegistrationModel RegistrationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PName", RegistrationModel.PName);
                arlParms[1] = new SqlParameter("@DeptId", RegistrationModel.DeptId);
                arlParms[2] = new SqlParameter("@Flag", RegistrationModel.MFlag);

                return SQLHelper.ExecuteDataset("HMS_RegPatientInfo", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_OPSeriesGetandGets(BillSeriesModel BillSeriesModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DeptId", BillSeriesModel.DeptId);
                arlParms[1] = new SqlParameter("@OPType", BillSeriesModel.BillType);
                return SQLHelper.ExecuteDataset("HMS_OPSeriesGetandGets", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ReasonInsertandUpdate(Reason Reason, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ReasonId", Reason.ReasonId);
                arlParms[1] = new SqlParameter("@Reasons", Reason.Reasons);
                arlParms[2] = new SqlParameter("@ReasonDesc", Reason.ReasonDes);
                arlParms[3] = new SqlParameter("@DelFlag", Reason.DelFlag);
                return SQLHelper.ExecuteDataset("ReasonInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ReasonGetandGets(Reason Reason, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ReasonId", Reason.ReasonId);
                return SQLHelper.ExecuteDataset("ReasonGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DosageInsertandUpdate(Dosagemaster Dosagemaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@DosageId", Dosagemaster.DosageId);
                arlParms[1] = new SqlParameter("@DosageName", Dosagemaster.DosageName);
                arlParms[2] = new SqlParameter("@DosageCode", Dosagemaster.DosageCode);
                arlParms[3] = new SqlParameter("@DelFlag", Dosagemaster.DelFlag);
                return SQLHelper.ExecuteDataset("DosageInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DosageGetandGets(Dosagemaster Dosagemaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DosageId", Dosagemaster.DosageId);
                return SQLHelper.ExecuteDataset("DosageGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet RoomInsertandUpdate(Roommaster Roommaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@RoomId", Roommaster.RoomId);
                arlParms[1] = new SqlParameter("@RoomName", Roommaster.RoomName);
                arlParms[2] = new SqlParameter("@RoomCode", Roommaster.RoomCode);
                arlParms[3] = new SqlParameter("@Rate", Roommaster.Rate);
                arlParms[4] = new SqlParameter("@Remarks", Roommaster.Remarks);
                arlParms[5] = new SqlParameter("@DeptId", Roommaster.DeptId);
                arlParms[6] = new SqlParameter("@UserId", Roommaster.UserId);
                arlParms[7] = new SqlParameter("@DelFlag", Roommaster.DelFlag);
                return SQLHelper.ExecuteDataset("RoomInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet RoomGetandGets(Roommaster Roommaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@RoomId", Roommaster.RoomId);
                arlParms[1] = new SqlParameter("@UserId", Roommaster.UserId);
                arlParms[2] = new SqlParameter("@DeptId", Roommaster.DeptId);
                return SQLHelper.ExecuteDataset("HMS_RoomGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HospitalInsertandUpdate(Hospitalmaster Hospitalmaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@HospitalId", Hospitalmaster.HospitalId);
                arlParms[1] = new SqlParameter("@HospitalName", Hospitalmaster.HospitalName);
                arlParms[2] = new SqlParameter("@ContactNumber", Hospitalmaster.ContactNumber);
                arlParms[3] = new SqlParameter("@Address", Hospitalmaster.Address);
                arlParms[4] = new SqlParameter("@DelFlag", Hospitalmaster.DelFlag);
                return SQLHelper.ExecuteDataset("HospitalInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HospitalGetandGets(Hospitalmaster Hospitalmaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HospitalId", Hospitalmaster.HospitalId);
                return SQLHelper.ExecuteDataset("HospitalGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ProcedureInsertandUpdate(proceduremastercs Procedure1, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@ProcedureId", Procedure1.ProcedureId);
                arlParms[1] = new SqlParameter("@ProcedureName", Procedure1.ProcedureName);
                arlParms[2] = new SqlParameter("@ProcedureCode", Procedure1.ProcedureCode);
                arlParms[3] = new SqlParameter("@Procedurecharge", Procedure1.Procedurecharge);
                arlParms[4] = new SqlParameter("@DelFlag", Procedure1.DelFlag);
                return SQLHelper.ExecuteDataset("ProcedureInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ProcedureGetandGets(proceduremastercs Procedure1, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ProcedureId", Procedure1.ProcedureId);
                return SQLHelper.ExecuteDataset("ProcedureGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ShiftInsertandUpdate(ShiftDoctor shiftmaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ShiftId", shiftmaster.ShiftId);
                arlParms[1] = new SqlParameter("@ShiftName", shiftmaster.ShiftName);
                arlParms[2] = new SqlParameter("@DelFlag", shiftmaster.DelFlag);
                return SQLHelper.ExecuteDataset("ShiftInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ShiftGetandGets(ShiftDoctor shiftmaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ShiftId", shiftmaster.ShiftId);
                arlParms[1] = new SqlParameter("@DeptId", shiftmaster.DeptId);
                return SQLHelper.ExecuteDataset("HMS_ShiftGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_IP_BPTEMPInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@IP_BPTemp", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_IPBP_InsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MedShiftInsertandUpdate(DataTable dt, string dbName)
        {
            try 
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MedShift", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MedShiftInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //public DataSet AppointmentInsertandUpdate(Appointment Appointment, string dbName)
        //{
        //    try
        //    {
        //        arlParms = new SqlParameter[16];
        //        arlParms[0] = new SqlParameter("@FirstName", Appointment.FirstName);
        //        arlParms[1] = new SqlParameter("@LastName", Appointment.LastName);
        //        arlParms[2] = new SqlParameter("@DOB", Appointment.DOB);
        //        arlParms[3] = new SqlParameter("@Gender", Appointment.Gender);
        //        arlParms[4] = new SqlParameter("@Nationality", Appointment.Nationality);
        //        arlParms[5] = new SqlParameter("@Contact", Appointment.Contact);
        //        arlParms[6] = new SqlParameter("@Email", Appointment.Email);
        //        arlParms[7] = new SqlParameter("@Department", Appointment .Department);
        //        arlParms[8] = new SqlParameter("@Branch", Appointment.Branch);
        //        arlParms[9] = new SqlParameter("@Doctor", Appointment.Doctor);
        //        arlParms[10] = new SqlParameter("@AppointmentDate", Appointment.AppointmentDate);
        //        arlParms[11] = new SqlParameter("@AppointmentTime", Appointment.AppointmentTime);
        //        arlParms[12] = new SqlParameter("@DelFlag", Appointment.DelFlag);
        //        arlParms[13] = new SqlParameter("@AppointmentId", Appointment.AppointmentId);
        //        arlParms[14] = new SqlParameter("@Status1", Appointment.Status1);
        //        arlParms[15] = new SqlParameter("@Status2", Appointment.Status2);
        //        return SQLHelper.ExecuteDataset("AppointmentInsertandUpdate", dbName, arlParms);

        //    }
        //    catch (SqlException exMe)
        //    {
        //        Console.WriteLine(exMe.Message);
        //        return null;
        //    }
        //}
        public DataSet AppointmentInsertandUpdate(Appointment Appointment, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[17];
                arlParms[0] = new SqlParameter("@AppointmentId", Appointment.AppointmentId);
                arlParms[1] = new SqlParameter("@FirstName", Appointment.FirstName);
                arlParms[2] = new SqlParameter("@LastName", Appointment.LastName);
                arlParms[3] = new SqlParameter("@DOB", Appointment.DOB);
                arlParms[4] = new SqlParameter("@Age", Appointment.Age);
                arlParms[5] = new SqlParameter("@Department", Appointment.Department);
                arlParms[6] = new SqlParameter("@Gender", Appointment.Gender);
                arlParms[7] = new SqlParameter("@Nationality", Appointment.Nationality);
                arlParms[8] = new SqlParameter("@Contact", Appointment.Contact);
                arlParms[9] = new SqlParameter("@Email", Appointment.Email);
                arlParms[10] = new SqlParameter("@Branch", Appointment.Branch);
                arlParms[11] = new SqlParameter("@Doctor", Appointment.Doctor);
                arlParms[12] = new SqlParameter("@AppointmentDate", Appointment.AppointmentDate);
                arlParms[13] = new SqlParameter("@AppointmentTime", Appointment.AppointmentTime);
                arlParms[14] = new SqlParameter("@Status1", Appointment.Status1);
                arlParms[15] = new SqlParameter("@Status2", Appointment.Status2);
                arlParms[16] = new SqlParameter("@DelFlag", Appointment.DelFlag);

                return SQLHelper.ExecuteDataset("AppointmentInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                return null;
            }
        }
        public DataSet AppointmentGetandGets(Appointment Appointment, string dbName)
        {
            arlParms = new SqlParameter[5];  
            arlParms[0] = new SqlParameter("@AppointmentId", Appointment.AppointmentId);
            arlParms[1] = new SqlParameter("@DoctorId", Appointment.DoctorId);
            arlParms[2] = new SqlParameter("@FromDate", Appointment.FromDate ?? "");
            arlParms[3] = new SqlParameter("@ToDate", Appointment.ToDate ?? "");
            arlParms[4] = new SqlParameter("@Status1", Appointment.Status1 ?? ""); 
            return SQLHelper.ExecuteDataset("AppoinmentGetandGets", dbName, arlParms);
        }

        public DataSet AppointmentGets(Appointment Appointment, string dbName)
        {
            arlParms = new SqlParameter[5];
            arlParms[0] = new SqlParameter("@AppointmentId", Appointment.AppointmentId);
            arlParms[1] = new SqlParameter("@DoctorId", Appointment.DoctorId);
            arlParms[2] = new SqlParameter("@FromDate", Appointment.FromDate ?? "");
            arlParms[3] = new SqlParameter("@ToDate", Appointment.ToDate ?? "");
            arlParms[4] = new SqlParameter("@Status1", Appointment.Status1 ?? "");
            return SQLHelper.ExecuteDataset("AppoinmentGets", dbName, arlParms);
        }


        public DataSet GetBookedSession(Appointment Appointment, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Date", Appointment.Date);                
                arlParms[1] = new SqlParameter("@Doctor", Appointment.DoctorId);
                return SQLHelper.ExecuteDataset("GetBookedSession", dbName, arlParms);
            }

            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AppointmentSearchList(Appointment Appointment, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", Appointment.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", Appointment.ToDate);
                arlParms[2] = new SqlParameter("@Doctor", Appointment.Doctor);
                return SQLHelper.ExecuteDataset("AppointmentSearchList", dbName, arlParms);
            }

            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DaysGetandGets(MedicalShift medicalshift, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AvailableId", medicalshift.AvailableId);
                return SQLHelper.ExecuteDataset("DaysGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MedShiftGetandGets(MedicalShift medicalshift, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@AvailableId", medicalshift.AvailableId);
                return SQLHelper.ExecuteDataset("MedShiftGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_DashboardDoctorGets(Doctorsmaster Doctorsmaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DoctorsId", Doctorsmaster.DoctorsId);
                arlParms[1] = new SqlParameter("@CurrentDate", Doctorsmaster.CurrentDate);
                 return SQLHelper.ExecuteDataset("HMS_DashboardDoctorGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet DoctorInsertandUpdate(Doctorsmaster doctor1, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[27];
                arlParms[0] = new SqlParameter("@DocId", doctor1.DoctorsId);
                arlParms[1] = new SqlParameter("@Name", doctor1.Name);
                arlParms[2] = new SqlParameter("@Department", doctor1.Department);
                arlParms[3] = new SqlParameter("@MobileNumber", doctor1.MobileNumber);
                arlParms[4] = new SqlParameter("@PhoneNumber", doctor1.PhoneNumber);
                arlParms[5] = new SqlParameter("@Specialization", doctor1.Specialization);
                arlParms[6] = new SqlParameter("@Email", doctor1.Email);
                arlParms[7] = new SqlParameter("@Consultancy", doctor1.Consultancy);
                arlParms[8] = new SqlParameter("@Experience", doctor1.Experience);
                arlParms[9] = new SqlParameter("@Address1", doctor1.Address1);
                arlParms[10] = new SqlParameter("@Address2", doctor1.Address2);
                arlParms[11] = new SqlParameter("@Address3", doctor1.Address3);
                arlParms[12] = new SqlParameter("@DelFlag", doctor1.DelFlag);
                arlParms[13] = new SqlParameter("@Gender", doctor1.Gender);
                arlParms[14] = new SqlParameter("@Designation", doctor1.Designation);
                arlParms[15] = new SqlParameter("@Training", doctor1.Training);
                arlParms[16] = new SqlParameter("@Acheivement", doctor1.Acheivement);
                arlParms[17] = new SqlParameter("@Certification", doctor1.Certification);
                arlParms[18] = new SqlParameter("@Qualification", doctor1.Qualification);
                arlParms[19] = new SqlParameter("@Qualification1", doctor1.Qualification1);
                arlParms[20] = new SqlParameter("@Qualification2", doctor1.Qualification2);
                arlParms[21] = new SqlParameter("@Qualification3", doctor1.Qualification3);
                arlParms[22] = new SqlParameter("@Qualification4", doctor1.Qualification4);
                arlParms[23] = new SqlParameter("@Language", doctor1.Language);
                arlParms[24] = new SqlParameter("@Active", doctor1.Active);
                arlParms[25] = new SqlParameter("@Doctor_UserId", doctor1.Doctor_UserId);
                arlParms[26] = new SqlParameter("@selectedImage", doctor1.selectedImage);


                return SQLHelper.ExecuteDataset("DoctorsInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DoctorGetandGets(Doctorsmaster doctor1, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DocId", doctor1.DoctorsId);
                return SQLHelper.ExecuteDataset("DoctorsGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MedDeptInsertandUpdate(MedDept MedDept, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@DepId", MedDept.DepId);
                arlParms[1] = new SqlParameter("@Department", MedDept.Department);
                arlParms[2] = new SqlParameter("@Description", MedDept.Description);
                arlParms[3] = new SqlParameter("@HOD", MedDept.HOD);
                arlParms[4] = new SqlParameter("@Number", MedDept.PhNumber);
                arlParms[5] = new SqlParameter("@DelFlag", MedDept.DelFlag);
                return SQLHelper.ExecuteDataset("MedDeptInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MedDeptGetandGets(MedDept MedDept, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DepId", MedDept.DepId);
                return SQLHelper.ExecuteDataset("MedDeptGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    

           public DataSet HMS_EODUpdate(HMS_EOD HMS_EOD, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@EODId", HMS_EOD.EODId);
                arlParms[1] = new SqlParameter("@EODDate", HMS_EOD.EODDate);
                arlParms[2] = new SqlParameter("@UserId", HMS_EOD.UserId);
                arlParms[3] = new SqlParameter("@DeptId", HMS_EOD.DeptId);
              
                return SQLHelper.ExecuteDataset("HMS_EODUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HSNInsertandUpdate(HSN HSN, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@HSN_Id", HSN.HSNId);
                arlParms[1] = new SqlParameter("@HSN_Name", HSN.Name);
                arlParms[2] = new SqlParameter("@HSN_Code", HSN.Code);
                arlParms[3] = new SqlParameter("@HSN_TaxPer", HSN.TaxRate);
                arlParms[4] = new SqlParameter("@DelFlag", HSN.DelFlag);
                return SQLHelper.ExecuteDataset("HSN_HSNInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HSNGetandGets(HSN HSN, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HSN_Id", HSN.HSNId);
                return SQLHelper.ExecuteDataset("HMS_HNSGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet RegistrationReport(RegistrationModel RegistrationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@StartingDate", RegistrationModel.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", RegistrationModel.ToDate);
                arlParms[2] = new SqlParameter("@DocId", RegistrationModel.Doctor);
                arlParms[3] = new SqlParameter("@RegId", RegistrationModel.RegId);

                return SQLHelper.ExecuteDataset("RegistrationReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet RevisitReport(RegistrationModel RegistrationModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@StartingDate", RegistrationModel.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", RegistrationModel.ToDate);
                arlParms[2] = new SqlParameter("@DocId", RegistrationModel.Doctor);
                arlParms[3] = new SqlParameter("@Revisit_Id", RegistrationModel.Revisit_Id);

                return SQLHelper.ExecuteDataset("RevisitReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LabTestWiseReport(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@StartingDate", LabBill.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", LabBill.ToDate);
                arlParms[2] = new SqlParameter("@TestId", LabBill.TestId);
             

                return SQLHelper.ExecuteDataset("LabWiseReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseCorrectionReport(PharmacyModel PharmacyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@StartingDate", PharmacyModel.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", PharmacyModel.ToDate);
                arlParms[2] = new SqlParameter("@reasonid", PharmacyModel.reasonid);


                return SQLHelper.ExecuteDataset("HMS_RPTPurchaseCor", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //Kajal
        public DataSet WasteInsertandUpdate(WasteModel WasteModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[11];
                arlParms[0] = new SqlParameter("@wasteId", WasteModel.wasteId);
                arlParms[1] = new SqlParameter("@wastetype1", WasteModel.wastetype1);
                arlParms[2] = new SqlParameter("@wastetype2", WasteModel.wastetype2);
                arlParms[3] = new SqlParameter("@wastetype3", WasteModel.wastetype3);
                arlParms[4] = new SqlParameter("@wastetype4", WasteModel.wastetype4);
                arlParms[5] = new SqlParameter("@wastetype5", WasteModel.wastetype5);
                arlParms[6] = new SqlParameter("@CurrentDtTime", WasteModel.CurrentDtTime);
                arlParms[7] = new SqlParameter("@PayFlag", WasteModel.PayRate);
                arlParms[8] = new SqlParameter("@DeptId", WasteModel.DeptId);
                arlParms[9] = new SqlParameter("@UserId", WasteModel.UserId);
                arlParms[10] = new SqlParameter("@DelFlag", WasteModel.DelFlag);
                return SQLHelper.ExecuteDataset("WasteInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet WasteGetandGets(WasteModel WasteModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@wasteId", WasteModel.wasteId);
                return SQLHelper.ExecuteDataset("WasteGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet WasteReport(WasteModel WasteModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@StartingDate", WasteModel.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", WasteModel.ToDate);
                arlParms[2] = new SqlParameter("@UserId", WasteModel.paiduser);
                arlParms[3] = new SqlParameter("@wastedata", WasteModel.wastedata);
                arlParms[4] = new SqlParameter("@PayFlag", WasteModel.payflg);
                return SQLHelper.ExecuteDataset("WasteReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_PaymentUpdate(WasteModel WasteModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];

                arlParms[0] = new SqlParameter("@StartingDate", WasteModel.FromDate);
                arlParms[1] = new SqlParameter("@Enddate", WasteModel.ToDate);
                arlParms[2] = new SqlParameter("@UserId", WasteModel.paiduser);
                arlParms[3] = new SqlParameter("@wastedata", WasteModel.wastedata);
                arlParms[4] = new SqlParameter("@PayFlag", WasteModel.payflg);

                return SQLHelper.ExecuteDataset("HMS_PaymentUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //Kajal End

        public DataSet Appointment123GetandGets(proceduremastercs Procedure1, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@RegId", Procedure1.RegId);
                arlParms[1] = new SqlParameter("@FromDate", Procedure1.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", Procedure1.ToDate);
                arlParms[3] = new SqlParameter("@Doctor", Procedure1.Doctor);
                return SQLHelper.ExecuteDataset("Appointment123GetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet Token123GetandGets(proceduremastercs Procedure1, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@variable", Procedure1.TokNo);
                return SQLHelper.ExecuteDataset("Hms_TokenDispaly", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet SerialNoSearchOPTICALSORDER(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@LocId", SalesInvoiceModel.LocId);

                return SQLHelper.ExecuteDataset("SerialNoSearchOPTICALSORDER", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SerialNoSearchOPTICALSINVOICE(SalesInvoiceModel SalesInvoiceModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillSlNo", SalesInvoiceModel.BillSlNo);
                arlParms[1] = new SqlParameter("@BillSeriesId", SalesInvoiceModel.BillSeriesId);
                arlParms[2] = new SqlParameter("@DeptId", SalesInvoiceModel.DeptId);
                arlParms[3] = new SqlParameter("@LocId", SalesInvoiceModel.LocId);

                return SQLHelper.ExecuteDataset("SerialNoSearchOPTICALSINVOICE", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}