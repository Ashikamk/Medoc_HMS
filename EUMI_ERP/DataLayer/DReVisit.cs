using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Globalization;
using EUMI_ERP.Models;

namespace EUMI_ERP.DataLayer
{
    public class DReVisit
    {
        private SqlParameter[] arlParms;

        //public DataSet HMS_OPWorkSheetLabNew(WorkSheet WorkSheet, string dbName)
        //{
        //    try
        //    {
        //        arlParms = new SqlParameter[6];
        //        arlParms[0] = new SqlParameter("@FromDate", WorkSheet.FromDate);
        //        arlParms[1] = new SqlParameter("@ToDate", WorkSheet.ToDate);
        //        arlParms[2] = new SqlParameter("@DoctorId", WorkSheet.DoctorId);
        //        arlParms[3] = new SqlParameter("@PatientId", WorkSheet.PatientId);
        //        arlParms[4] = new SqlParameter("@DeptId", WorkSheet.DeptId);
        //        arlParms[5] = new SqlParameter("@UserId", WorkSheet.UserId);

        //        return SQLHelper.ExecuteDataset("HMS_OPWorkSheetLabNew", dbName, arlParms);
        //    }
        //    catch (SqlException exMe)
        //    {
        //        Console.WriteLine(exMe.Message);
        //        return null;
        //    }
        //}

        public DataSet RevisitPatientHealthDetailsGetandGetsOptometry(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@RevisitId", ReVisitModel.RevisitId);
                arlParms[2] = new SqlParameter("@DoctorId", ReVisitModel.DoctorId);


                return SQLHelper.ExecuteDataset("OptometryHealthDetailsGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_GetPatientSelectedTests(long revisitId, string dbName)
        {
            try
            {
                SqlParameter[] arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@RevisitId", revisitId);

                return SQLHelper.ExecuteDataset("HMS_GetPatientSelectedTests", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet RevisitPatientHealthDetailsInsertandUpdateOptometry(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[49];

                arlParms[0] = new SqlParameter("@RevisitId", ReVisitModel.RevisitId);
                arlParms[1] = new SqlParameter("@OPNumber", ReVisitModel.OPNumber);
                arlParms[2] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[4] = new SqlParameter("@DoctorName", ReVisitModel.DoctorName);


                arlParms[5] = new SqlParameter("@UCVARight", ReVisitModel.UCVARight);
                arlParms[6] = new SqlParameter("@UCVALeft", ReVisitModel.UCVALeft);
                arlParms[7] = new SqlParameter("@PHRight", ReVisitModel.PHRight);
                arlParms[8] = new SqlParameter("@PHLeft", ReVisitModel.PHLeft);
                arlParms[9] = new SqlParameter("@BCVARight", ReVisitModel.BCVARight);
                arlParms[10] = new SqlParameter("@BCVALeft", ReVisitModel.BCVALeft);
                arlParms[11] = new SqlParameter("@ARRight", ReVisitModel.ARRight);
                arlParms[12] = new SqlParameter("@ARLeft", ReVisitModel.ARLeft);
                arlParms[13] = new SqlParameter("@LensPowerRight", ReVisitModel.LensPowerRight);
                arlParms[14] = new SqlParameter("@LensPowerLeft", ReVisitModel.LensPowerLeft);
                arlParms[15] = new SqlParameter("@DilatedObjRight", ReVisitModel.DilatedObjRight);
                arlParms[16] = new SqlParameter("@DilatedObjLeft", ReVisitModel.DilatedObjLeft);
                arlParms[17] = new SqlParameter("@UnDilatedObjRight", ReVisitModel.UnDilatedObjRight);
                arlParms[18] = new SqlParameter("@UnDilatedObjLeft", ReVisitModel.UnDilatedObjLeft);
                arlParms[19] = new SqlParameter("@DilatedSubRight", ReVisitModel.DilatedSubRight);
                arlParms[20] = new SqlParameter("@DilatedSubLeft", ReVisitModel.DilatedSubLeft);
                arlParms[21] = new SqlParameter("@AcceptingRight", ReVisitModel.AcceptingRight);
                arlParms[22] = new SqlParameter("@AcceptingLeft", ReVisitModel.AcceptingLeft);
                arlParms[23] = new SqlParameter("@IOPRight", ReVisitModel.IOPRight);
                arlParms[24] = new SqlParameter("@IOPLeft", ReVisitModel.IOPLeft);
                arlParms[25] = new SqlParameter("@ColourRight", ReVisitModel.ColourRight);
                arlParms[26] = new SqlParameter("@ColourLeft", ReVisitModel.ColourLeft);
                arlParms[27] = new SqlParameter("@CheifComplaints", ReVisitModel.CheifComplaints);
                arlParms[28] = new SqlParameter("@ConfrontationRight", ReVisitModel.ConfrontationRight);
                arlParms[29] = new SqlParameter("@ConfrontationLeft", ReVisitModel.ConfrontationLeft);
                arlParms[30] = new SqlParameter("@AmslerRight", ReVisitModel.AmslerRight);
                arlParms[31] = new SqlParameter("@AmslerLeft", ReVisitModel.AmslerLeft);


                arlParms[32] = new SqlParameter("@BP", ReVisitModel.BP);
                arlParms[33] = new SqlParameter("@GRBS", ReVisitModel.GRBS);
                arlParms[34] = new SqlParameter("@HCIRCUMFERENCE", ReVisitModel.HCIRCUMFERENCE);
                arlParms[35] = new SqlParameter("@Weight", ReVisitModel.Weight);
                arlParms[36] = new SqlParameter("@Height", ReVisitModel.Height);
                arlParms[37] = new SqlParameter("@Temperature", ReVisitModel.Temperature);
                arlParms[38] = new SqlParameter("@Allergy", ReVisitModel.Allergy);

                arlParms[39] = new SqlParameter("@SPHRight", ReVisitModel.SPHRight);
                arlParms[40] = new SqlParameter("@SPHLeft", ReVisitModel.SPHLeft);
                arlParms[41] = new SqlParameter("@CYLRight", ReVisitModel.CYLRight);
                arlParms[42] = new SqlParameter("@CYLLeft", ReVisitModel.CYLLeft);
                arlParms[43] = new SqlParameter("@AXISRight", ReVisitModel.AXISRight);
                arlParms[44] = new SqlParameter("@AXISLeft", ReVisitModel.AXISLeft);
                arlParms[45] = new SqlParameter("@ADERight", ReVisitModel.ADERight);
                arlParms[46] = new SqlParameter("@ADELeft", ReVisitModel.ADELeft);

                arlParms[47] = new SqlParameter("@DelFlag", ReVisitModel.DelFlag);
                arlParms[48] = new SqlParameter("@RevisitDate", ReVisitModel.RevisitDate);
                return SQLHelper.ExecuteDataset("HMS_RevisitPatientHealthDetailsInsertandUpdateOptometry", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }





        public DataSet HMS_TestAdviceGets(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@RevisitId", ReVisitModel.RevisitId);
                arlParms[1] = new SqlParameter("@OPNumber", ReVisitModel.OPNumber);
                arlParms[2] = new SqlParameter("@OPSerId", ReVisitModel.OPSerId);
                return SQLHelper.ExecuteDataset("TestAdvicegets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        //patienthealthdetails
        public DataSet RevisitPatientHealthDetailsInsertandUpdate(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[18];

                arlParms[0] = new SqlParameter("@RevisitId", ReVisitModel.RevisitId);
                arlParms[1] = new SqlParameter("@OPNumber", ReVisitModel.OPNumber);
                arlParms[2] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[4] = new SqlParameter("@DoctorName", ReVisitModel.DoctorName);
                arlParms[5] = new SqlParameter("@Weight", ReVisitModel.Weight);
                arlParms[6] = new SqlParameter("@Height", ReVisitModel.Height);
                arlParms[7] = new SqlParameter("@DelFlag", ReVisitModel.DelFlag);
                arlParms[8] = new SqlParameter("@RevisitDate", ReVisitModel.RevisitDate);
                arlParms[10] = new SqlParameter("@BP", ReVisitModel.BP);
                arlParms[11] = new SqlParameter("@Temperature", ReVisitModel.Temperature);
                arlParms[12] = new SqlParameter("@Sugar", ReVisitModel.Sugar);
                arlParms[13] = new SqlParameter("@BMI", ReVisitModel.BMI);
                arlParms[14] = new SqlParameter("@PatChest", ReVisitModel.ChestCircumference);
                arlParms[15] = new SqlParameter("@PatHead", ReVisitModel.HeadCircumference);
                arlParms[16] = new SqlParameter("@Patbdominal", ReVisitModel.Abdominal);
                arlParms[17] = new SqlParameter("@PatAllergy", ReVisitModel.Allergy);

                return SQLHelper.ExecuteDataset("HMS_RevisitPatientHealthDetailsInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet RevisitPatientHealthDetailsGetandGets(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@RevisitId", ReVisitModel.RevisitId);
                arlParms[2] = new SqlParameter("@DoctorId", ReVisitModel.DoctorId);


                return SQLHelper.ExecuteDataset("HMS_RevisitPatientHealthDetailsGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet Refertootherdoctor(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@DoctorId", ReVisitModel.DoctorId);
                arlParms[2] = new SqlParameter("@ConsultFees", ReVisitModel.VisitFees);
                arlParms[3] = new SqlParameter("@RevisitDate", ReVisitModel.RevisitDate);
                arlParms[4] = new SqlParameter("@RevisitId", ReVisitModel.RevisitId);

                arlParms[5] = new SqlParameter("@UserId", ReVisitModel.UserId);
                arlParms[6] = new SqlParameter("@DeptId", ReVisitModel.DeptId);


                return SQLHelper.ExecuteDataset("HMS_RferanotherDoctor", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }





        public DataSet RevisitInsertandUpdate(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[23];
                arlParms[0] = new SqlParameter("@RevId", ReVisitModel.RevId);
                arlParms[1] = new SqlParameter("@RevisitId", ReVisitModel.RevisitId);
                arlParms[2] = new SqlParameter("@OPNumber", ReVisitModel.OPNumber);
                arlParms[3] = new SqlParameter("@PatientId", ReVisitModel.PatientId);

                arlParms[4] = new SqlParameter("@DoctorId", ReVisitModel.DoctorId);
                arlParms[5] = new SqlParameter("@VisitFees", ReVisitModel.VisitFees);
                arlParms[6] = new SqlParameter("@ConsultFees", ReVisitModel.ConsultFees); ;
                arlParms[7] = new SqlParameter("@OtherFees", ReVisitModel.OtherFees);

                arlParms[8] = new SqlParameter("@Shift", ReVisitModel.Shift);
                arlParms[9] = new SqlParameter("@TokenNumber", ReVisitModel.TokenNumber);
                arlParms[10] = new SqlParameter("@Type", ReVisitModel.Type);
                arlParms[11] = new SqlParameter("@Weight", ReVisitModel.Weight);

                arlParms[12] = new SqlParameter("@Height", ReVisitModel.Height);
                arlParms[13] = new SqlParameter("@DelFlag", ReVisitModel.DelFlag);
                arlParms[14] = new SqlParameter("@RevisitDate", ReVisitModel.RevisitDate);
                arlParms[15] = new SqlParameter("@UserId", ReVisitModel.UserId);
                arlParms[16] = new SqlParameter("@DeptId", ReVisitModel.DeptId);

                arlParms[17] = new SqlParameter("@BP", ReVisitModel.BP);
                arlParms[18] = new SqlParameter("@Temperature", ReVisitModel.Temperature);
                arlParms[19] = new SqlParameter("@Sugar", ReVisitModel.Sugar);
                arlParms[20] = new SqlParameter("@Cash", ReVisitModel.Cash);
                arlParms[21] = new SqlParameter("@Upi", ReVisitModel.Upi);
                arlParms[22] = new SqlParameter("@Card", ReVisitModel.Card);
                return SQLHelper.ExecuteDataset("HMS_RevisitInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_ShiftGetandGets(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ShiftId", ReVisitModel.Flag);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_ShiftGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_TokenNumberGets(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@DoctorId", ReVisitModel.DoctorId);
                arlParms[1] = new SqlParameter("@ShiftId", ReVisitModel.Shift);
                arlParms[3] = new SqlParameter("@Date", ReVisitModel.RevisitDate);
                arlParms[4] = new SqlParameter("@DeptId", ReVisitModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_TokenNumberGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMSSerialNoGets(HMSSerialModel HMSSerialModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeptId", HMSSerialModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_SerialNoGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_PatientSearch(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PName", ReVisitModel.PatientName);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_PatientSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_PatientSearchAppointment(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PName", ReVisitModel.PatientName);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_PatientSearchAppointment", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_RevisitIdSearch(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Status", ReVisitModel.Status);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_RevisitIdSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_PatientSearchGet(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_PatientSearchGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_RevisitGetandGets(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@RevisitId", ReVisitModel.RevisitId);
                arlParms[1] = new SqlParameter("@FromDate", ReVisitModel.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", ReVisitModel.ToDate);
                arlParms[3] = new SqlParameter("@DoctorId", ReVisitModel.DoctorId);
                arlParms[4] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[5] = new SqlParameter("@OPNumber", ReVisitModel.OPNumber);
                arlParms[6] = new SqlParameter("@DeptId", ReVisitModel.DeptId);


                return SQLHelper.ExecuteDataset("HMS_RevisitGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMSPreVisitDetailGets(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", ReVisitModel.UserId);


                return SQLHelper.ExecuteDataset("HMS_PreVisitDetailGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ScanStatusUpdate(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@RecId", ReVisitModel.RevId);
                arlParms[1] = new SqlParameter("@Flag", ReVisitModel.Flag);


                return SQLHelper.ExecuteDataset("ScanStatusUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_DoctorFeegetsfromrevisit(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DoctorId", ReVisitModel.DoctorId);
                arlParms[1] = new SqlParameter("@PId", ReVisitModel.PatientId);
                arlParms[2] = new SqlParameter("@OPID", ReVisitModel.RevisitId);

                return SQLHelper.ExecuteDataset("Hms_DoctorFeeGetsVisist", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_DoctorFeegets(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DoctorId", ReVisitModel.DoctorId);
                arlParms[1] = new SqlParameter("@PId", ReVisitModel.PatientId);
                return SQLHelper.ExecuteDataset("Hms_DoctorFeeGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_RevistDoctorGets(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DoctorId", ReVisitModel.DoctorId);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_RevistDoctorGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet Hms_TestInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@TestType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("Hms_TestInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_TestGetandGets(HMSTest HMSTest, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@TestId", HMSTest.TestId);
                arlParms[1] = new SqlParameter("@DeptId", HMSTest.DeptId);
                return SQLHelper.ExecuteDataset("HMS_TestGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_LAstRevisitGetsscan(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);
                return SQLHelper.ExecuteDataset("HMS_LAstRevisitGetsScan", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet HMS_LAstRevisitGetsOP(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);
                return SQLHelper.ExecuteDataset("HMS_LAstRevisitGetsop", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_LAstRevisitGets(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);
                return SQLHelper.ExecuteDataset("HMS_LAstRevisitGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet HMS_LabBillGetsQuee(LabResult LabResult, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Fromdate", LabResult.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", LabResult.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", LabResult.DeptId);
                arlParms[3] = new SqlParameter("@Flag", LabResult.Flag);
                return SQLHelper.ExecuteDataset("HMS_LabBillGetsQue", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet HMS_LabBillGets(LabResult LabResult, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@OPNumber", LabResult.OPNumber);
                arlParms[1] = new SqlParameter("@PatientId", LabResult.PatientId);
                arlParms[2] = new SqlParameter("@DeptId", LabResult.DeptId);
                arlParms[3] = new SqlParameter("@Flag", LabResult.Flag);
                return SQLHelper.ExecuteDataset("HMS_LabBillGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_TestSearch(HMSTest HMSTest, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@TestName", HMSTest.TestName);
                arlParms[1] = new SqlParameter("@DeptId", HMSTest.DeptId);

                return SQLHelper.ExecuteDataset("HMS_TestSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_LabBillTestGets(LabResult LabResult, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillNo", LabResult.BillNo);
                arlParms[1] = new SqlParameter("@ResFlag", LabResult.Flag);
                arlParms[2] = new SqlParameter("@DeptId", LabResult.DeptId);
                arlParms[3] = new SqlParameter("@BYear", LabResult.BillYear);



                return SQLHelper.ExecuteDataset("HMS_LabBillTestGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_ResultInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ResultType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_ResultInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_ResultGetandGets(LabResult LabResult, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[9];
                arlParms[0] = new SqlParameter("@ResultId", LabResult.ResultId);
                arlParms[1] = new SqlParameter("@DeptId", LabResult.DeptId);
                arlParms[2] = new SqlParameter("@BillNo", LabResult.BillNo);
                arlParms[3] = new SqlParameter("@BillYear", LabResult.BillYear);
                arlParms[4] = new SqlParameter("@Flag", LabResult.Flag);
                arlParms[5] = new SqlParameter("@FromDate", LabResult.FromDate);
                arlParms[6] = new SqlParameter("@ToDate", LabResult.ToDate);
                arlParms[7] = new SqlParameter("@DoctorId", LabResult.DoctorId);
                arlParms[8] = new SqlParameter("@PatientId", LabResult.PatientId);
                return SQLHelper.ExecuteDataset("HMS_ResultGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        //anu

        public DataSet Hms_GetLabResultNotification(LabResult LabResult, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];

                arlParms[0] = new SqlParameter("@DoctorId", LabResult.DoctorId);
                arlParms[1] = new SqlParameter("@FromDate", LabResult.FromDate);
                arlParms[2] = new SqlParameter("@ToDate", LabResult.ToDate);



                return SQLHelper.ExecuteDataset("Hms_GetLabResultNotification", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        //anu

        public DataSet HMS_BillInsertforpharma(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_LabBillType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_BillInsertpharma", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet HMS_BillInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_LabBillType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_BillInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_BillNoSearch(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillNo", LabBill.BillNo);
                arlParms[1] = new SqlParameter("@DeptId", LabBill.DeptId);
                arlParms[2] = new SqlParameter("@Status", LabBill.Status);
                return SQLHelper.ExecuteDataset("HMS_BillNoSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet HMS_CasualityAdviceGets(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@RevisitId", LabBill.OpNo);
                arlParms[1] = new SqlParameter("@OPNumber", LabBill.RegNo);
                arlParms[2] = new SqlParameter("@OPSerId", LabBill.RegSeries);
                return SQLHelper.ExecuteDataset("CasualityadvicetobillProc", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet HMS_ProcAdvicegets(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@RevisitId", LabBill.OpNo);
                arlParms[1] = new SqlParameter("@OPNumber", LabBill.RegNo);
                arlParms[2] = new SqlParameter("@OPSerId", LabBill.RegSeries);
                return SQLHelper.ExecuteDataset("LabadvicetobillProc", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_LabAdvicegets(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@RevisitId", LabBill.OpNo);
                arlParms[1] = new SqlParameter("@OPNumber", LabBill.RegNo);
                arlParms[2] = new SqlParameter("@OPSerId", LabBill.RegSeries);
                return SQLHelper.ExecuteDataset("Labadvicetobill", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet HMS_BillNumberGetandGetsload(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillNo", LabBill.BillNo);
                arlParms[1] = new SqlParameter("@DeptId", LabBill.DeptId);
                arlParms[2] = new SqlParameter("@Status", LabBill.Status);
                return SQLHelper.ExecuteDataset("HMS_BillNumberGetandGetspharma", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet HMS_BillNumberGetandGets(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillNo", LabBill.BillNo);
                arlParms[1] = new SqlParameter("@DeptId", LabBill.DeptId);
                arlParms[2] = new SqlParameter("@Status", LabBill.Status);
                return SQLHelper.ExecuteDataset("HMS_BillNumberGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_VacantRoomGets(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@RoomName", IPRegistration.RoomName);

                return SQLHelper.ExecuteDataset("HMS_VacantRoomGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_BillNumberListView(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@BillNo", LabBill.BillNo);
                arlParms[1] = new SqlParameter("@DeptId", LabBill.DeptId);
                arlParms[2] = new SqlParameter("@FromDate", LabBill.BillDate);
                arlParms[3] = new SqlParameter("@ToDate", LabBill.Hospital);
                arlParms[4] = new SqlParameter("@UserId", LabBill.UserId);
                arlParms[5] = new SqlParameter("@Status", LabBill.Status);
                return SQLHelper.ExecuteDataset("HMS_BillNumberListView", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_IPRegistrationInsertandUpdate(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[14];
                arlParms[0] = new SqlParameter("@IPMainId", IPRegistration.IPMainId);
                arlParms[1] = new SqlParameter("@IPYear", IPRegistration.IPYear);
                arlParms[2] = new SqlParameter("@IPNumber", IPRegistration.IPNumber);
                arlParms[3] = new SqlParameter("@OPVisitId", IPRegistration.OPVisitId);
                arlParms[4] = new SqlParameter("@RegSeries", IPRegistration.RegSeries);

                arlParms[5] = new SqlParameter("@RegNo", IPRegistration.RegNo);
                arlParms[6] = new SqlParameter("@PatientId", IPRegistration.PatientId);
                arlParms[7] = new SqlParameter("@DoctorId", IPRegistration.DoctorId);
                arlParms[8] = new SqlParameter("@AdmitDate", IPRegistration.Date);
                arlParms[9] = new SqlParameter("@InTime", IPRegistration.InTime);

                arlParms[10] = new SqlParameter("@RoomId", IPRegistration.RoomId);
                arlParms[11] = new SqlParameter("@DelFlag", IPRegistration.DelFlag);
                arlParms[12] = new SqlParameter("@DeptId", IPRegistration.DeptId);
                arlParms[13] = new SqlParameter("@UserId", IPRegistration.UserId);



                return SQLHelper.ExecuteDataset("HMS_IPRegistrationInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_IPmedicineDetailsgets(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@IPYear", IPRegistration.IPYear);
                arlParms[1] = new SqlParameter("@IPNumber", IPRegistration.IPNumber);
                arlParms[2] = new SqlParameter("@Regno", IPRegistration.RegNo);


                return SQLHelper.ExecuteDataset("Ipmedicinegets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }






        public DataSet HMS_IPDetailsgets(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@IPYear", IPRegistration.IPYear);
                arlParms[1] = new SqlParameter("@IPNumber", IPRegistration.IPNumber);
                arlParms[2] = new SqlParameter("@Regno", IPRegistration.RegNo);


                return SQLHelper.ExecuteDataset("Ipdichargedetailsgets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }







        public DataSet HMS_IPRegistrationGets(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@IPYear", IPRegistration.IPYear);
                arlParms[1] = new SqlParameter("@IPNumber", IPRegistration.IPNumber);
                arlParms[2] = new SqlParameter("@FromDate", IPRegistration.Date);
                arlParms[3] = new SqlParameter("@ToDate", IPRegistration.DDate);
                arlParms[4] = new SqlParameter("@DoctorId", IPRegistration.DoctorId);
                arlParms[5] = new SqlParameter("@PatientId", IPRegistration.PatientId);
                arlParms[6] = new SqlParameter("@DeptId", IPRegistration.DeptId);

                return SQLHelper.ExecuteDataset("HMS_IPRegistrationGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_BillUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_LabBillType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_BillUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet HMS_Cashpaymentdelete(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillNo", LabBill.BillNo);
                arlParms[1] = new SqlParameter("@DeptId", LabBill.DeptId);
                arlParms[2] = new SqlParameter("@UserId", LabBill.UserId);
                arlParms[3] = new SqlParameter("@Status", LabBill.Status);
                return SQLHelper.ExecuteDataset("HMS_CashentryDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }





        public DataSet HMS_LabBillDelete(LabBill LabBill, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillNo", LabBill.BillNo);
                arlParms[1] = new SqlParameter("@DeptId", LabBill.DeptId);
                arlParms[2] = new SqlParameter("@UserId", LabBill.UserId);
                arlParms[3] = new SqlParameter("@Status", LabBill.Status);
                return SQLHelper.ExecuteDataset("HMS_LabBillDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet HMS_OPWorkSheetScan(WorkSheet WorkSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", WorkSheet.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", WorkSheet.ToDate);
                arlParms[2] = new SqlParameter("@DoctorId", WorkSheet.DoctorId);
                arlParms[3] = new SqlParameter("@PatientId", WorkSheet.PatientId);
                arlParms[4] = new SqlParameter("@DeptId", WorkSheet.DeptId);
                arlParms[5] = new SqlParameter("@UserId", WorkSheet.UserId);

                return SQLHelper.ExecuteDataset("HMS_OPWorkSheetScan", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }




        public DataSet HMS_OPWorkSheetStaffLAb(WorkSheet WorkSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", WorkSheet.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", WorkSheet.ToDate);
                arlParms[2] = new SqlParameter("@DoctorId", WorkSheet.DoctorId);
                arlParms[3] = new SqlParameter("@PatientId", WorkSheet.PatientId);
                arlParms[4] = new SqlParameter("@DeptId", WorkSheet.DeptId);
                arlParms[5] = new SqlParameter("@UserId", WorkSheet.UserId);

                return SQLHelper.ExecuteDataset("HMS_OPWorkSheetStaffLAb", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet HMS_OPWorkSheetStaff(WorkSheet WorkSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", WorkSheet.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", WorkSheet.ToDate);
                arlParms[2] = new SqlParameter("@DoctorId", WorkSheet.DoctorId);
                arlParms[3] = new SqlParameter("@PatientId", WorkSheet.PatientId);
                arlParms[4] = new SqlParameter("@DeptId", WorkSheet.DeptId);
                arlParms[5] = new SqlParameter("@UserId", WorkSheet.UserId);

                return SQLHelper.ExecuteDataset("HMS_OPWorkSheetStaff", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_OPWorkSheetDoctor(WorkSheet WorkSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", WorkSheet.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", WorkSheet.ToDate);
                arlParms[2] = new SqlParameter("@DoctorId", WorkSheet.DoctorId);
                arlParms[3] = new SqlParameter("@PatientId", WorkSheet.PatientId);
                arlParms[4] = new SqlParameter("@DeptId", WorkSheet.DeptId);
                arlParms[5] = new SqlParameter("@UserId", WorkSheet.UserId);

                return SQLHelper.ExecuteDataset("HMS_OPWorkSheetDoctor", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_IPWorkSheetDoctor(WorkSheet WorkSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@FromDate", WorkSheet.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", WorkSheet.ToDate);
                arlParms[2] = new SqlParameter("@DoctorId", WorkSheet.DoctorId);
                arlParms[3] = new SqlParameter("@PatientId", WorkSheet.PatientId);
                arlParms[4] = new SqlParameter("@DeptId", WorkSheet.DeptId);
                arlParms[5] = new SqlParameter("@UserId", WorkSheet.UserId);
                arlParms[6] = new SqlParameter("@Flag", WorkSheet.Flag);

                return SQLHelper.ExecuteDataset("HMS_IPWorkSheetDoctor", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_IP_BP_TempEntryGets(WorkSheet WorkSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@FromDate", WorkSheet.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", WorkSheet.ToDate);
                arlParms[2] = new SqlParameter("@DoctorId", WorkSheet.DoctorId);
                arlParms[3] = new SqlParameter("@PatientId", WorkSheet.PatientId);
                arlParms[4] = new SqlParameter("@DeptId", WorkSheet.DeptId);
                arlParms[5] = new SqlParameter("@UserId", WorkSheet.UserId);
                arlParms[6] = new SqlParameter("@Flag", WorkSheet.Flag);

                return SQLHelper.ExecuteDataset("HMS_IP_BP_TempEntryGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_IP_BPTempGraph(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@IPYEAR", IPRegistration.IPYear);
                arlParms[1] = new SqlParameter("@IPNUM", IPRegistration.IPNumber);
                arlParms[2] = new SqlParameter("@FromDate", IPRegistration.Date);
                arlParms[3] = new SqlParameter("@ToDate", IPRegistration.DDate);
                arlParms[4] = new SqlParameter("@Flag", IPRegistration.Status);

                return SQLHelper.ExecuteDataset("HMS_IP_BPTempGraph", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet HMS_WorkSheetDoctorSearch(WorkSheet WorkSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Name", WorkSheet.DoctorName);
                arlParms[1] = new SqlParameter("@DeptId", WorkSheet.DeptId);

                return SQLHelper.ExecuteDataset("HMS_WorkSheetDoctorSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_IPorPatientSearch(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PName", ReVisitModel.PatientName);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);
                return SQLHelper.ExecuteDataset("HMS_IPorPatientSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_IPPatientSearch(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PName", ReVisitModel.PatientName);
                arlParms[1] = new SqlParameter("@Flag", ReVisitModel.Flag);
                arlParms[2] = new SqlParameter("@DeptId", ReVisitModel.DeptId);

                return SQLHelper.ExecuteDataset("HMS_IPPatientSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_ProcedureSearch(proceduremastercs proceduremastercs, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ProcedureName", proceduremastercs.ProcedureName);
                arlParms[1] = new SqlParameter("@ProcedureId", proceduremastercs.ProcedureId);

                return SQLHelper.ExecuteDataset("HMS_ProcedureSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_RoomAllocation(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@IPYear", IPRegistration.IPYear);
                arlParms[1] = new SqlParameter("@IPNumber", IPRegistration.IPNumber);
                arlParms[2] = new SqlParameter("@Date", IPRegistration.Date);
                arlParms[3] = new SqlParameter("@InTime", IPRegistration.InTime);
                arlParms[4] = new SqlParameter("@RoomId", IPRegistration.RoomId);
                arlParms[5] = new SqlParameter("@DelFlag", IPRegistration.DelFlag);
                arlParms[6] = new SqlParameter("@DeptId", IPRegistration.DeptId);
                arlParms[7] = new SqlParameter("@UserId", IPRegistration.UserId);



                return SQLHelper.ExecuteDataset("HMS_RoomAllocation", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_RoomChange(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[9];
                arlParms[0] = new SqlParameter("@IPYear", IPRegistration.IPYear);
                arlParms[1] = new SqlParameter("@IPNumber", IPRegistration.IPNumber);
                arlParms[2] = new SqlParameter("@Date", IPRegistration.Date);
                arlParms[3] = new SqlParameter("@InTime", IPRegistration.InTime);
                arlParms[4] = new SqlParameter("@RoomId", IPRegistration.RoomId);
                arlParms[5] = new SqlParameter("@Remarks", IPRegistration.Status);
                arlParms[6] = new SqlParameter("@DelFlag", IPRegistration.DelFlag);
                arlParms[7] = new SqlParameter("@DeptId", IPRegistration.DeptId);
                arlParms[8] = new SqlParameter("@UserId", IPRegistration.UserId);



                return SQLHelper.ExecuteDataset("HMS_RoomChange", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_RoomIPDetails(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@IPYear", IPRegistration.IPYear);
                arlParms[1] = new SqlParameter("@IPNumber", IPRegistration.IPNumber);
                arlParms[2] = new SqlParameter("@DeptId", IPRegistration.DeptId);
                arlParms[3] = new SqlParameter("@UserId", IPRegistration.UserId);



                return SQLHelper.ExecuteDataset("HMS_RoomIPDetails", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        //anu          

        public DataSet HMS_CreditBillGets(IPStatement IPStatement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@Patient", IPStatement.Patient);
                arlParms[1] = new SqlParameter("@RegNo", IPStatement.RegNo);
                arlParms[2] = new SqlParameter("@OPVisit", IPStatement.OPVisit);
                arlParms[3] = new SqlParameter("@DeptId", IPStatement.DeptId);


                return SQLHelper.ExecuteDataset("HMS_CreditBillGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CreditBillInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_CreditBillType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_CreditBillInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet HMS_IPStatementautoFee(IPStatement IPStatement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@IPNumber", IPStatement.IPNumber);
                arlParms[1] = new SqlParameter("@IPYear", IPStatement.IPYear);
                arlParms[2] = new SqlParameter("@DeptId", IPStatement.DeptId);
                arlParms[3] = new SqlParameter("@Pid", IPStatement.PatientId);
                return SQLHelper.ExecuteDataset("IPPendingBilsGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        //anu
        public DataSet HMS_IPStatement(IPStatement IPStatement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@IPNumber", IPStatement.IPNumber);
                arlParms[1] = new SqlParameter("@IPYear", IPStatement.IPYear);
                arlParms[2] = new SqlParameter("@DeptId", IPStatement.DeptId);

                return SQLHelper.ExecuteDataset("HMS_IPStatement", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet HMS_IPAdvanceDetailsGets(IPStatement IPStatement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@IPNumber", IPStatement.IPNumber);
                arlParms[1] = new SqlParameter("@IPYear", IPStatement.IPYear);
                arlParms[2] = new SqlParameter("@DeptId", IPStatement.DeptId);
                arlParms[3] = new SqlParameter("@Pid", IPStatement.PatientId);

                return SQLHelper.ExecuteDataset("HMS_IPAdvancegets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_LabResultVerificationInsert(LabWorksheetSave model, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8]; // ← was 7, now 8
                arlParms[0] = new SqlParameter("@SampleId", model.SampleId);
                arlParms[1] = new SqlParameter("@Pid", model.Pid);
                arlParms[2] = new SqlParameter("@RegNo", model.RegNo);
                arlParms[3] = new SqlParameter("@VerifiedUser", model.VerifiedUser);
                arlParms[4] = new SqlParameter("@ApprovedUser", model.ApprovedUser);
                arlParms[5] = new SqlParameter("@userid", model.userid);
                arlParms[6] = new SqlParameter("@SampleDate", model.SampleDate);
                arlParms[7] = new SqlParameter("@Flag", 0); // ← INSERT flag
                return SQLHelper.ExecuteDataset("HMS_LabResultVerificationInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_LabResultVerificationGet(LabWorksheetSave model, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@SampleId", model.SampleId);
                arlParms[1] = new SqlParameter("@Flag", 1);
                return SQLHelper.ExecuteDataset("HMS_LabResultVerificationInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet HMS_IPStatementRoom(IPStatement IPStatement, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@IPNumber", IPStatement.IPNumber);
                arlParms[1] = new SqlParameter("@IPYear", IPStatement.IPYear);
                arlParms[2] = new SqlParameter("@DeptId", IPStatement.DeptId);

                return SQLHelper.ExecuteDataset("HMS_IPStatementRoom", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_TimeSearch(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Time", IPRegistration.InTime);
                arlParms[1] = new SqlParameter("@DTime", IPRegistration.DTime);

                return SQLHelper.ExecuteDataset("HMS_TimeSearch", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_DashBoardWidgets(HMSDashBoard HMSDashBoard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", HMSDashBoard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", HMSDashBoard.ToDate);
                arlParms[2] = new SqlParameter("@ToDay", HMSDashBoard.ToDay);
                arlParms[3] = new SqlParameter("@DeptId", HMSDashBoard.DeptId);
                arlParms[4] = new SqlParameter("@UserId", HMSDashBoard.UserId);


                return SQLHelper.ExecuteDataset("HMS_DashBoardWidgets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_DB_RoomDetails(IPRegistration IPRegistration, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Flag", IPRegistration.Flag);
                arlParms[1] = new SqlParameter("@DeptId", IPRegistration.DeptId);
                arlParms[2] = new SqlParameter("@UserId", IPRegistration.UserId);

                return SQLHelper.ExecuteDataset("HMS_DB_RoomDetails", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_DB_DoctorDeptGraph(HMSDashBoard HMSDashBoard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", HMSDashBoard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", HMSDashBoard.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", HMSDashBoard.DeptId);
                arlParms[3] = new SqlParameter("@Flag", HMSDashBoard.Flag);


                return SQLHelper.ExecuteDataset("HMS_DB_DoctorDeptGraph", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_DB_RegRevisitGraph(HMSDashBoard HMSDashBoard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", HMSDashBoard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", HMSDashBoard.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", HMSDashBoard.DeptId);
                arlParms[3] = new SqlParameter("@Flag", HMSDashBoard.Flag);


                return SQLHelper.ExecuteDataset("HMS_DB_RegRevisitGraph", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_DB_BillGraph(HMSDashBoard HMSDashBoard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", HMSDashBoard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", HMSDashBoard.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", HMSDashBoard.DeptId);
                arlParms[3] = new SqlParameter("@UserId", HMSDashBoard.UserId);
                arlParms[4] = new SqlParameter("@Status", HMSDashBoard.Status);


                return SQLHelper.ExecuteDataset("HMS_DB_BillGraph", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_DB_SalesBillGraph(HMSDashBoard HMSDashBoard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", HMSDashBoard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", HMSDashBoard.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", HMSDashBoard.DeptId);
                arlParms[3] = new SqlParameter("@UserId", HMSDashBoard.UserId);
                arlParms[4] = new SqlParameter("@Status", HMSDashBoard.Status);


                return SQLHelper.ExecuteDataset("HMS_DB_SalesBillGraph", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_NurseInsertAndUpdate(NurseModal NurseModal, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[25];
                arlParms[0] = new SqlParameter("@NurseId", NurseModal.NurseId);
                arlParms[1] = new SqlParameter("@NuName", NurseModal.NuName);
                arlParms[2] = new SqlParameter("@NuDept ", NurseModal.NuDept);
                arlParms[3] = new SqlParameter("@NuUserId ", NurseModal.NuUserId);
                arlParms[4] = new SqlParameter("@NuGender", NurseModal.NuGender);
                arlParms[5] = new SqlParameter("@NuMobile", NurseModal.NuMobile);
                arlParms[6] = new SqlParameter("@NuPhone", NurseModal.NuPhone);
                arlParms[7] = new SqlParameter("@NuEmail", NurseModal.NuEmail);
                arlParms[8] = new SqlParameter("@NuLanguage", NurseModal.NuLanguage);
                arlParms[9] = new SqlParameter("@NuAddress1", NurseModal.NuAddress1);
                arlParms[10] = new SqlParameter("@NuAddress2", NurseModal.NuAddress2);
                arlParms[11] = new SqlParameter("@NuAddress3", NurseModal.NuAddress3);
                arlParms[12] = new SqlParameter("@NuSpecialization", NurseModal.NuSpecialization);
                arlParms[13] = new SqlParameter("@NuExperience", NurseModal.NuExperience);
                arlParms[14] = new SqlParameter("@NuDesignation", NurseModal.NuDesignation);
                arlParms[15] = new SqlParameter("@NuTraining", NurseModal.NuTraining);
                arlParms[16] = new SqlParameter("@NuCertification", NurseModal.NuCertification);
                arlParms[17] = new SqlParameter("@NuAcheivement", NurseModal.NuAcheivement);
                arlParms[18] = new SqlParameter("@NuQualification1", NurseModal.NuQualification1);
                arlParms[19] = new SqlParameter("@NuQualification2", NurseModal.NuQualification2);
                arlParms[20] = new SqlParameter("@NuQualification3", NurseModal.NuQualification3);
                arlParms[21] = new SqlParameter("@NuQualification4", NurseModal.NuQualification4);
                arlParms[22] = new SqlParameter("@NuQualification5", NurseModal.NuQualification5);
                arlParms[23] = new SqlParameter("@NuImgName", NurseModal.NuImgName);
                arlParms[24] = new SqlParameter("@DelFlag", NurseModal.DelFlag);

                return SQLHelper.ExecuteDataset("HMS_NurseInsertAndUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_PatientSearchRegistration(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PName", ReVisitModel.PatientName);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);
                return SQLHelper.ExecuteDataset("HMS_PatientSearchRegistration", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_NurseGetandGets(NurseModal NurseModal, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@NurseId", NurseModal.NurseId);

                return SQLHelper.ExecuteDataset("HMS_NurseGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_Rpt_StockReport(HMSReportModal HMSReportModal, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[10];
                arlParms[0] = new SqlParameter("@Flag", HMSReportModal.Param2);
                arlParms[1] = new SqlParameter("@BATCHWISE", HMSReportModal.Param3);
                arlParms[2] = new SqlParameter("@ItemId", HMSReportModal.Param4);
                arlParms[3] = new SqlParameter("@BatchSlNo", HMSReportModal.Param5);
                arlParms[4] = new SqlParameter("@LocationId", HMSReportModal.Param6);
                arlParms[5] = new SqlParameter("@MedCompany", HMSReportModal.Param7);
                arlParms[6] = new SqlParameter("@MedType", HMSReportModal.Param8);
                arlParms[7] = new SqlParameter("@MedSchedule", HMSReportModal.Param9);
                arlParms[8] = new SqlParameter("@DeptId", HMSReportModal.DeptId);
                arlParms[9] = new SqlParameter("@UserId", HMSReportModal.UserId);

                return SQLHelper.ExecuteDataset("HMS_Rpt_StockReport", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_Rpt_AsOnStockReport(HMSReportModal HMSReportModal, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[11];
                arlParms[0] = new SqlParameter("@ASON", HMSReportModal.Param1);
                arlParms[1] = new SqlParameter("@Flag", HMSReportModal.Param2);
                arlParms[2] = new SqlParameter("@BATCHWISE", HMSReportModal.Param3);
                arlParms[3] = new SqlParameter("@ItemId", HMSReportModal.Param4);
                arlParms[4] = new SqlParameter("@BatchSlNo", HMSReportModal.Param5);
                arlParms[5] = new SqlParameter("@LocationId", HMSReportModal.Param6);
                arlParms[6] = new SqlParameter("@MedCompany", HMSReportModal.Param7);
                arlParms[7] = new SqlParameter("@MedType", HMSReportModal.Param8);
                arlParms[8] = new SqlParameter("@MedSchedule", HMSReportModal.Param9);
                arlParms[9] = new SqlParameter("@DeptId", HMSReportModal.DeptId);
                arlParms[10] = new SqlParameter("@UserId", HMSReportModal.UserId);

                return SQLHelper.ExecuteDataset("HMS_Rpt_AsOnStockReport", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_Rpt_ItemExpiry(HMSReportModal HMSReportModal, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[9];
                arlParms[0] = new SqlParameter("@FromDate", HMSReportModal.Param1);
                arlParms[1] = new SqlParameter("@ToDate", HMSReportModal.Param10);
                arlParms[2] = new SqlParameter("@Flag", HMSReportModal.Param2);
                arlParms[3] = new SqlParameter("@ItemId", HMSReportModal.Param3);
                arlParms[4] = new SqlParameter("@MedCompany", HMSReportModal.Param4);
                arlParms[5] = new SqlParameter("@MedType", HMSReportModal.Param5);
                arlParms[6] = new SqlParameter("@MedSchedule", HMSReportModal.Param6);
                arlParms[7] = new SqlParameter("@DeptId", HMSReportModal.DeptId);
                arlParms[8] = new SqlParameter("@UserId", HMSReportModal.UserId);

                return SQLHelper.ExecuteDataset("HMS_Rpt_ItemExpiry", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_Rpt_OpeningStock(HMSReportModal HMSReportModal, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@Flag", HMSReportModal.Param2);
                arlParms[1] = new SqlParameter("@LocationId", HMSReportModal.Param3);
                arlParms[2] = new SqlParameter("@ItemId", HMSReportModal.Param4);
                arlParms[3] = new SqlParameter("@Company", HMSReportModal.Param5);
                arlParms[4] = new SqlParameter("@Type", HMSReportModal.Param6);
                arlParms[5] = new SqlParameter("@Schedule", HMSReportModal.Param7);
                arlParms[6] = new SqlParameter("@DeptId", HMSReportModal.DeptId);
                arlParms[7] = new SqlParameter("@UserId", HMSReportModal.UserId);

                return SQLHelper.ExecuteDataset("HMS_Rpt_OpeningStock", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_GetVitalsRevisitIds(string dbName)
        {
            try
            {
                return SQLHelper.ExecuteDataset("HMS_GetVitalsRevisitIds", dbName, null);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_OPWorkSheetLabAdvice(WorkSheet WorkSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate",
     DateTime.ParseExact(WorkSheet.FromDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                arlParms[1] = new SqlParameter("@ToDate",
                    DateTime.ParseExact(WorkSheet.ToDate, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                arlParms[2] = new SqlParameter("@DoctorId", WorkSheet.DoctorId);
                arlParms[3] = new SqlParameter("@PatientId", WorkSheet.PatientId);
                arlParms[4] = new SqlParameter("@DeptId", WorkSheet.DeptId);
                arlParms[5] = new SqlParameter("@UserId", WorkSheet.UserId);

                return SQLHelper.ExecuteDataset("HMS_OPWorkSheetLabAdvice", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                throw;
            }
        }

        public DataSet HMS_LAstRevisitGetsayurvetha(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@DeptId", ReVisitModel.DeptId);
                return SQLHelper.ExecuteDataset("HMS_LAstRevisitGetsayur", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

    }
}