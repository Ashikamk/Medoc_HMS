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
    public class DHospital
    {
        private SqlParameter[] arlParms;
        public DataSet HMS_PatientTestDetailsGet(LabBill LabBill, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PatientId", LabBill.BillNo);
                arlParms[1] = new SqlParameter("@Series", LabBill.DeptId);
                arlParms[2] = new SqlParameter("@Status", LabBill.Status);
                return SQLHelper.ExecuteDataset("HMS_PatientTestDetailsGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_PatientVisitDetailsGet(ReVisitModel ReVisitModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PatientId", ReVisitModel.PatientId);
                arlParms[1] = new SqlParameter("@Series", ReVisitModel.RevisitId); 
                arlParms[2] = new SqlParameter("@Status", ReVisitModel.OPNumber);

                return SQLHelper.ExecuteDataset("HMS_PatientVisitDetailsGet", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_PatientSubTestResultGets(LabResult LabResult, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillNo", LabResult.FromDate);
                arlParms[1] = new SqlParameter("@DeptId", LabResult.DeptId);
                arlParms[2] = new SqlParameter("@UserId", LabResult.UserId); 
                arlParms[3] = new SqlParameter("@Status", LabResult.Status);
                return SQLHelper.ExecuteDataset("HMS_PatientSubTestResultGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_CaseSheetInsertandUpdate(CaseSheet CaseSheet, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[23];
                arlParms[0] = new SqlParameter("@CaseSheetId", CaseSheet.CaseSheetId);
                arlParms[1] = new SqlParameter("@CaseSheetNo", CaseSheet.CaseSheetNo);
                arlParms[2] = new SqlParameter("@RegSeries", CaseSheet.RegSeries);
                arlParms[3] = new SqlParameter("@PRegNo", CaseSheet.PRegNo);
                arlParms[4] = new SqlParameter("@RevisitId", CaseSheet.RevisitId);
                arlParms[5] = new SqlParameter("@PatientIP", CaseSheet.PatientIP);
                arlParms[6] = new SqlParameter("@IPYear", CaseSheet.IPYear);
                arlParms[7] = new SqlParameter("@Complaint", CaseSheet.Complaint);
                arlParms[8] = new SqlParameter("@Diagnosis", CaseSheet.Diagnosis);
                arlParms[9] = new SqlParameter("@Advice", CaseSheet.Advice);
                arlParms[10] = new SqlParameter("@Allergies", CaseSheet.Allergies);
                arlParms[11] = new SqlParameter("@Details", CaseSheet.Details);
                arlParms[12] = new SqlParameter("@Notes", CaseSheet.Notes);
                arlParms[13] = new SqlParameter("@ICD", CaseSheet.ICD);
                arlParms[14] = new SqlParameter("@ICDDetails", CaseSheet.ICDDetails);
                arlParms[15] = new SqlParameter("@CaseDate", CaseSheet.CaseDate);
                arlParms[16] = new SqlParameter("@UserId", CaseSheet.UserId);
                arlParms[17] = new SqlParameter("@DeptId", CaseSheet.DeptId);
                arlParms[18] = new SqlParameter("@DelFlag", CaseSheet.DelFlag);
                arlParms[19] = new SqlParameter("@Status", CaseSheet.Status);
                arlParms[20] = new SqlParameter("@SendSMS", CaseSheet.SendSMS);
                arlParms[21] = new SqlParameter("@SpecialFees", CaseSheet.SpecialFees);
                arlParms[22] = new SqlParameter("@Reviewdate", CaseSheet.Nextreview);


                return SQLHelper.ExecuteDataset("HMS_CaseSheetInsertandUpdate", dbName, arlParms); 

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_AllergyList(CaseSheet CaseSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];

                arlParms[0] = new SqlParameter("@RegSeries", CaseSheet.RegSeries);
                arlParms[1] = new SqlParameter("@PRegNo", CaseSheet.PRegNo);
                arlParms[2] = new SqlParameter("@PatientId", CaseSheet.PatientId);     
                arlParms[3] = new SqlParameter("@DeptId", CaseSheet.DeptId);
                arlParms[4] = new SqlParameter("@UserId", CaseSheet.UserId);
                return SQLHelper.ExecuteDataset("HMS_AllergyList", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_AllergyDeActivate(CaseSheet CaseSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];

                arlParms[0] = new SqlParameter("@CaseSheetNo", CaseSheet.CaseSheetNo);
                arlParms[1] = new SqlParameter("@DeptId", CaseSheet.DeptId);
                arlParms[2] = new SqlParameter("@UserId", CaseSheet.UserId);
                return SQLHelper.ExecuteDataset("HMS_AllergyDeActivate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        
        public DataSet HMS_TemporaryCaseSheetInsert(CaseSheet CaseSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[20];
                arlParms[0] = new SqlParameter("@CaseSheetId", CaseSheet.CaseSheetId);
                arlParms[1] = new SqlParameter("@CaseSheetNo", CaseSheet.CaseSheetNo);
                arlParms[2] = new SqlParameter("@RegSeries", CaseSheet.RegSeries);
                arlParms[3] = new SqlParameter("@PRegNo", CaseSheet.PRegNo);
                arlParms[4] = new SqlParameter("@RevisitId", CaseSheet.RevisitId);
                arlParms[5] = new SqlParameter("@PatientOP", CaseSheet.PatientOP);
                arlParms[6] = new SqlParameter("@PatientId", CaseSheet.PatientId);
                arlParms[7] = new SqlParameter("@Complaint", CaseSheet.Complaint);
                arlParms[8] = new SqlParameter("@Diagnosis", CaseSheet.Diagnosis);
                arlParms[9] = new SqlParameter("@Advice", CaseSheet.Advice);
                arlParms[10] = new SqlParameter("@Allergies", CaseSheet.Allergies);
                arlParms[11] = new SqlParameter("@Details", CaseSheet.Details);
                arlParms[12] = new SqlParameter("@Notes", CaseSheet.Notes);
                arlParms[13] = new SqlParameter("@ICD", CaseSheet.ICD);
                arlParms[14] = new SqlParameter("@ICDDetails", CaseSheet.ICDDetails);
                arlParms[15] = new SqlParameter("@CaseDate", CaseSheet.CaseDate);
                arlParms[16] = new SqlParameter("@UserId", CaseSheet.UserId);
                arlParms[17] = new SqlParameter("@DeptId", CaseSheet.DeptId);
                arlParms[18] = new SqlParameter("@DelFlag", CaseSheet.DelFlag);
                arlParms[19] = new SqlParameter("@Status", CaseSheet.Status);
               // arlParms[20] = new SqlParameter("@Reviewdate", CaseSheet.Nextreview);
                return SQLHelper.ExecuteDataset("HMS_TemporaryCaseSheetInsert", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        
            public DataSet HMS_CaseSheetGetandGetsprint(CaseSheet CaseSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PatientID", CaseSheet.PatientId);
                arlParms[1] = new SqlParameter("@VisitId", CaseSheet.RevisitId);
                arlParms[2] = new SqlParameter("@Regno", CaseSheet.PRegNo);

                return SQLHelper.ExecuteDataset("HMS_CaseSheetGetandGetsprint", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet HMS_CaseSheetGetandGets(CaseSheet CaseSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@CaseSheetId", CaseSheet.CaseSheetId);
                arlParms[1] = new SqlParameter("@DelFlag", CaseSheet.DelFlag);
                arlParms[2] = new SqlParameter("@Status", CaseSheet.Status); 

                return SQLHelper.ExecuteDataset("HMS_CaseSheetGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_CaseSheetSubDetailsInsert(DataTable dt, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_CaseSheetSubType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_CaseSheetSubDetailsInsert", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_CaseSheetMedicineUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_CaseSheetSubType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_CaseSheetMedicineUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_ImmunizationUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMSIMType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_ImmunizationUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_ImmunizationGets(VaccineModal VaccineModal, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@OPVisit", VaccineModal.OPVisit);
                arlParms[1] = new SqlParameter("@IPNumber", VaccineModal.IPNumber);
                arlParms[2] = new SqlParameter("@IPYear", VaccineModal.IPYear);
                arlParms[3] = new SqlParameter("@PRegSer", VaccineModal.PRegSer);
                arlParms[4] = new SqlParameter("@PRegNo", VaccineModal.PRegNo);
                arlParms[5] = new SqlParameter("@DeptId", VaccineModal.DeptId);
                arlParms[6] = new SqlParameter("@UserId", VaccineModal.UserId);
                arlParms[7] = new SqlParameter("@Flag", VaccineModal.Flag);
                return SQLHelper.ExecuteDataset("HMS_ImmunizationGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_CaseSheetMedicineGets(CaseSheet CaseSheet, string dbName) 
        {
            try
            
            
            
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@PRegSer", CaseSheet.RegSeries);
                arlParms[1] = new SqlParameter("@PRegNo", CaseSheet.PRegNo);
                arlParms[2] = new SqlParameter("@OPVisit", CaseSheet.RevisitId);
                arlParms[3] = new SqlParameter("@DelFlag", CaseSheet.DelFlag);
                arlParms[4] = new SqlParameter("@Status", CaseSheet.Status);
                return SQLHelper.ExecuteDataset("HMS_CaseSheetMedicineGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_CaseSheetInvestigationGets(CaseSheet CaseSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@PRegSer", CaseSheet.RegSeries);
                arlParms[1] = new SqlParameter("@PRegNo", CaseSheet.PRegNo);
                arlParms[2] = new SqlParameter("@OPVisit", CaseSheet.RevisitId);
                arlParms[3] = new SqlParameter("@DelFlag", CaseSheet.DelFlag);
                arlParms[4] = new SqlParameter("@Status", CaseSheet.Status);
                return SQLHelper.ExecuteDataset("HMS_CaseSheetInvestigationGets", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_ICDGetandGets(CaseSheet CaseSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ICDode", CaseSheet.Advice); 
                arlParms[1] = new SqlParameter("@DelFlag", CaseSheet.DelFlag);
                arlParms[2] = new SqlParameter("@Status", CaseSheet.Status);

                return SQLHelper.ExecuteDataset("HMS_ICDGetandGets", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_BatchwiseItemDetailsGets(SaleInvoiceHospital SaleInvoiceHospital, string dbName)  
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@ProductId", SaleInvoiceHospital.ProductId);
                arlParms[1] = new SqlParameter("@HLocation", SaleInvoiceHospital.HLocation);
                arlParms[2] = new SqlParameter("@Batch", SaleInvoiceHospital.Batch);
                arlParms[3] = new SqlParameter("@Type", SaleInvoiceHospital.Type);
                arlParms[4] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[5] = new SqlParameter("@UserId", SaleInvoiceHospital.UserId);
                arlParms[6] = new SqlParameter("@Flag", SaleInvoiceHospital.Flag);

                return SQLHelper.ExecuteDataset("HMS_BatchwiseItemDetailsGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        
            public DataSet HMS_SalesInvoiceInsert_StockOut(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceInsertStockOut", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesInvoiceInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesOrderInvoiceInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesOrderType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesOrderInvoiceInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_OpticalSalesInvoiceInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesOrderType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_OpticalSalesInvoiceInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        
            public DataSet HMS_SalesGetandGetsStockOut(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@BillSlNo", SaleInvoiceHospital.HBillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                return SQLHelper.ExecuteDataset("HMS_SalesGetandGetsStockOut", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_SalesGetandGets(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@BillSlNo", SaleInvoiceHospital.HBillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                return SQLHelper.ExecuteDataset("HMS_SalesGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_SalesOrderGets(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@BillSlNo", SaleInvoiceHospital.HBillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                return SQLHelper.ExecuteDataset("HMS_SalesOrderGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_OpticalSalesInvoiceGetProductDetails(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@BillSlNo", SaleInvoiceHospital.HBillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                return SQLHelper.ExecuteDataset("HMS_OpticalSalesInvoiceGetProductDetails", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesPrescriptionGets(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Revisit", SaleInvoiceHospital.Status);
                arlParms[1] = new SqlParameter("@LocId", SaleInvoiceHospital.HLocation);
                arlParms[2] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                return SQLHelper.ExecuteDataset("HMS_SalesPrescriptionGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesRevisitGets(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@RegSer", SaleInvoiceHospital.RegSer);
                arlParms[1] = new SqlParameter("@RegNo", SaleInvoiceHospital.RegNo);
                arlParms[2] = new SqlParameter("@FromDate", SaleInvoiceHospital.HSalesDate);
                arlParms[3] = new SqlParameter("@ToDate", SaleInvoiceHospital.Status);
                arlParms[4] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[5] = new SqlParameter("@Flag", SaleInvoiceHospital.Flag);
                return SQLHelper.ExecuteDataset("HMS_SalesRevisitGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        
             public DataSet HMS_SalesInvoiceUpdteStockOut(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceUpdateStockOut", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesInvoiceUpdte(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceUpdate", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesOrderInvoiceUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesOrderType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesOrderInvoiceUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_OpticalSalesInvoiceUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesOrderType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_OpticalSalesInvoiceUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        
public DataSet HMS_SalesInvoiceDeletestockout(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillNo", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[2] = new SqlParameter("@UserId", SaleInvoiceHospital.UserId);
                arlParms[3] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillSeries);
                arlParms[4] = new SqlParameter("@Variable1", SaleInvoiceHospital.Variable1);
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceDeleteStockOut", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }



        public DataSet HMS_SalesInvoiceDelete(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillNo", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[2] = new SqlParameter("@UserId", SaleInvoiceHospital.UserId);
                arlParms[3] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillSeries);
                arlParms[4] = new SqlParameter("@Variable1", SaleInvoiceHospital.Variable1);
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceDelete", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesOrderInvoiceDelete(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillNo", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[2] = new SqlParameter("@UserId", SaleInvoiceHospital.UserId);
                arlParms[3] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillSeries);
                arlParms[4] = new SqlParameter("@Variable1", SaleInvoiceHospital.Variable1);
                return SQLHelper.ExecuteDataset("HMS_SalesOrderInvoiceDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_OpticalSalesInvoiceDelete(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillNo", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[2] = new SqlParameter("@UserId", SaleInvoiceHospital.UserId);
                arlParms[3] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillSeries);
                arlParms[4] = new SqlParameter("@Variable1", SaleInvoiceHospital.Variable1);
                return SQLHelper.ExecuteDataset("HMS_OpticalSalesInvoiceDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesReturnInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesReturnInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesReturnGetandGets(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@BillSlNo", SaleInvoiceHospital.HBillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                return SQLHelper.ExecuteDataset("HMS_SalesReturnGetandGets", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesReturnUpdate(DataTable dt, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesReturnUpdate", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesReturnDelete(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillNo", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[2] = new SqlParameter("@UserId", SaleInvoiceHospital.UserId);
                arlParms[3] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillSeries);
                arlParms[4] = new SqlParameter("@Variable1", SaleInvoiceHospital.Variable1);
                return SQLHelper.ExecuteDataset("HMS_SalesReturnDelete", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_BatchwiseItemDetailsGetsSalesReturn(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@ProductId", SaleInvoiceHospital.ProductId);
                arlParms[1] = new SqlParameter("@HLocation", SaleInvoiceHospital.HLocation);
                arlParms[2] = new SqlParameter("@Batch", SaleInvoiceHospital.Batch);
                arlParms[3] = new SqlParameter("@Type", SaleInvoiceHospital.Type);
                arlParms[4] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[5] = new SqlParameter("@UserId", SaleInvoiceHospital.UserId);
                arlParms[6] = new SqlParameter("@Flag", SaleInvoiceHospital.Flag);

                return SQLHelper.ExecuteDataset("HMS_BatchwiseItemDetailsGetsSalesReturn", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_DischargeSummaryInsertandUpdate(DischargeSummary DischargeSummary, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[40];
                arlParms[0]   = new SqlParameter("@DischargeId", DischargeSummary.DischargeId);
                arlParms[1]   = new SqlParameter("@DischargeNo", DischargeSummary.DischargeNo);
                arlParms[2]   = new SqlParameter("@RegNo", DischargeSummary.RegNo);
                arlParms[3]   = new SqlParameter("@RegSeries", DischargeSummary.RegSeries);
                arlParms[4]   = new SqlParameter("@PatientId", DischargeSummary.PatientId);
                arlParms[5]   = new SqlParameter("@IP_Number", DischargeSummary.IP_Number);
                arlParms[6]   = new SqlParameter("@IP_Year", DischargeSummary.IP_Year);
                arlParms[7]   = new SqlParameter("@PName", DischargeSummary.PName);
                arlParms[8]   = new SqlParameter("@OPVisitId", DischargeSummary.OPVisitId);
                arlParms[9]   = new SqlParameter("@AdmittedDate", DischargeSummary.AdmittedDate);
                arlParms[10]  = new SqlParameter("@DischargeDate", DischargeSummary.DischargeDate);
                arlParms[11]  = new SqlParameter("@Reasons", DischargeSummary.Reasons);
                arlParms[12]  = new SqlParameter("@Diagnosis", DischargeSummary.Diagnosis);
                arlParms[13]  = new SqlParameter("@PresentComplaints", DischargeSummary.PresentComplaints);
                arlParms[14]  = new SqlParameter("@PastHistory", DischargeSummary.PastHistory);
                arlParms[15]  = new SqlParameter("@FamilyHistory", DischargeSummary.FamilyHistory);
                arlParms[16]  = new SqlParameter("@DevelopHistory", DischargeSummary.DevelopHistory);
                arlParms[17]  = new SqlParameter("@Immunization", DischargeSummary.Immunization);
                arlParms[18]  = new SqlParameter("@Examination", DischargeSummary.Examination);
                arlParms[19]  = new SqlParameter("@GenExamination", DischargeSummary.GenExamination);
                arlParms[20]  = new SqlParameter("@Course", DischargeSummary.Course);
                arlParms[21]  = new SqlParameter("@Treatment", DischargeSummary.Treatment);
                arlParms[22]  = new SqlParameter("@DischargeAdvice", DischargeSummary.DischargeAdvice);
                arlParms[23]  = new SqlParameter("@RS", DischargeSummary.RS);
                arlParms[24]  = new SqlParameter("@GIT", DischargeSummary.GIT);
                arlParms[25]  = new SqlParameter("@CNS", DischargeSummary.CNS);
                arlParms[26]  = new SqlParameter("@Height", DischargeSummary.Height);
                arlParms[27]  = new SqlParameter("@Weight", DischargeSummary.Weight);
                arlParms[28]  = new SqlParameter("@CVS", DischargeSummary.CVS);
                arlParms[29]  = new SqlParameter("@AfterDays", DischargeSummary.AfterDays);
                arlParms[30]  = new SqlParameter("@SummaryDate", DischargeSummary.SummaryDate);
                arlParms[31]  = new SqlParameter("@UserId", DischargeSummary.UserId);
                arlParms[32]  = new SqlParameter("@DeptId", DischargeSummary.DeptId);
                arlParms[33]  = new SqlParameter("@DelFlag", DischargeSummary.DelFlag);
                arlParms[34]  = new SqlParameter("@Status", DischargeSummary.Status);
                arlParms[35] = new SqlParameter("@SurgeryDate", DischargeSummary.SurgeryDate);
                arlParms[36] = new SqlParameter("@Variable1", DischargeSummary.Variable1);
                arlParms[37] = new SqlParameter("@Variable2", DischargeSummary.Variable2);
                arlParms[38] = new SqlParameter("@Variable3", DischargeSummary.Variable3);
                arlParms[39] = new SqlParameter("@Variable4", DischargeSummary.Variable4);
                return SQLHelper.ExecuteDataset("HMS_DischargeSummaryInsertandUpdate", dbName, arlParms); 

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        

        public DataSet HMS_DischargeSummaryGetandGetscopy(DischargeSummary DischargeSummary, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DischargeId", DischargeSummary.DischargeId);
                arlParms[1] = new SqlParameter("@DeptId", DischargeSummary.DeptId);
                arlParms[2] = new SqlParameter("@Status", DischargeSummary.Status);
                return SQLHelper.ExecuteDataset("HMS_DischargeSummaryGetandGetsCopy", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }




        public DataSet HMS_DischargeSummaryGetandGets(DischargeSummary DischargeSummary, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DischargeId", DischargeSummary.DischargeId);
                arlParms[1] = new SqlParameter("@DeptId", DischargeSummary.DeptId);
                arlParms[2] = new SqlParameter("@Status", DischargeSummary.Status);


                return SQLHelper.ExecuteDataset("HMS_DischargeSummaryGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet Hms_DischargeSummaryTestsInsertandUpdate(DataTable dt, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@TestType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("Hms_DischargeSummaryTestsInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_DischargeSummaryTestsGetandGets(HMSTest HMSTest, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@TestId", HMSTest.TestId);
                arlParms[1] = new SqlParameter("@DeptId", HMSTest.DeptId);


                return SQLHelper.ExecuteDataset("HMS_DischargeSummaryTestsGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_TemporaryCaseSheetInsertAyurveda(CaseSheet CaseSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[76];
                arlParms[0] = new SqlParameter("@CaseSheetId", CaseSheet.CaseSheetId);
                arlParms[1] = new SqlParameter("@CaseSheetNo", CaseSheet.CaseSheetNo);
                arlParms[2] = new SqlParameter("@RegSeries", CaseSheet.RegSeries);
                arlParms[3] = new SqlParameter("@PRegNo", CaseSheet.PRegNo);
                arlParms[4] = new SqlParameter("@RevisitId", CaseSheet.RevisitId);
                arlParms[5] = new SqlParameter("@PatientOP", CaseSheet.PatientOP);
                arlParms[6] = new SqlParameter("@PatientId", CaseSheet.PatientId);

                arlParms[7] = new SqlParameter("@Complaint", CaseSheet.Complaint);
                arlParms[8] = new SqlParameter("@Diagnosis", CaseSheet.Diagnosis);
                arlParms[9] = new SqlParameter("@Presentillness", CaseSheet.Presentillness);
                arlParms[10] = new SqlParameter("@Allergies", CaseSheet.Allergies);
                arlParms[11] = new SqlParameter("@Notes", CaseSheet.Notes);
                arlParms[12] = new SqlParameter("@Remarks", CaseSheet.Remarks);

                arlParms[13] = new SqlParameter("@Cycle", CaseSheet.Cycle);
                arlParms[14] = new SqlParameter("@Complication", CaseSheet.Complication);
                arlParms[15] = new SqlParameter("@Addiction", CaseSheet.Addiction);
                arlParms[16] = new SqlParameter("@Examination", CaseSheet.Examination);
                arlParms[17] = new SqlParameter("@Details", CaseSheet.Details);
                arlParms[18] = new SqlParameter("@Systemic", CaseSheet.Systemic);
                arlParms[19] = new SqlParameter("@DTemp", CaseSheet.DTemp);
                arlParms[20] = new SqlParameter("@Dpulse", CaseSheet.Dpulse);
                arlParms[21] = new SqlParameter("@DRegular", CaseSheet.DRegular);
                arlParms[22] = new SqlParameter("@DBP", CaseSheet.DBP);
                arlParms[23] = new SqlParameter("@Dheight", CaseSheet.Dheight);
                arlParms[24] = new SqlParameter("@Dweight", CaseSheet.Dweight);
                arlParms[25] = new SqlParameter("@Dbmi", CaseSheet.Dbmi);
                arlParms[26] = new SqlParameter("@DBowel", CaseSheet.DBowel);
                arlParms[27] = new SqlParameter("@DAppetite", CaseSheet.DAppetite);
                arlParms[28] = new SqlParameter("@DMict", CaseSheet.DMict);
                arlParms[29] = new SqlParameter("@DSleep", CaseSheet.DSleep);
                arlParms[30] = new SqlParameter("@DHabits", CaseSheet.DHabits);
                arlParms[31] = new SqlParameter("@Built", CaseSheet.Built);
                arlParms[32] = new SqlParameter("@Gain", CaseSheet.Gain);
                arlParms[33] = new SqlParameter("@Intake", CaseSheet.Intake);
                arlParms[34] = new SqlParameter("@Gastric", CaseSheet.Gastric);
                arlParms[35] = new SqlParameter("@PhysicalAct", CaseSheet.PhysicalAct);
                arlParms[36] = new SqlParameter("@vitaminSupp", CaseSheet.vitaminSupp);
                arlParms[37] = new SqlParameter("@Nutristatus", CaseSheet.Nutristatus);
                arlParms[38] = new SqlParameter("@Nutriassess", CaseSheet.Nutriassess);
                arlParms[39] = new SqlParameter("@Painassess", CaseSheet.Painassess);
                arlParms[40] = new SqlParameter("@ProDiagnosis", CaseSheet.ProDiagnosis);
                arlParms[41] = new SqlParameter("@Investigations", CaseSheet.Investigations);
                arlParms[42] = new SqlParameter("@docDiagnosis", CaseSheet.docDiagnosis);
                arlParms[43] = new SqlParameter("@CarePlanStrategy", CaseSheet.CarePlanStrategy);
                arlParms[44] = new SqlParameter("@Advice", CaseSheet.Advice);
                arlParms[45] = new SqlParameter("@DietPlan", CaseSheet.DietPlan);
                arlParms[46] = new SqlParameter("@UndergoingMedicines", CaseSheet.UndergoingMedicines);
                arlParms[47] = new SqlParameter("@OutCome", CaseSheet.OutCome);
                arlParms[48] = new SqlParameter("@CarePlanModi", CaseSheet.CarePlanModi);
                arlParms[49] = new SqlParameter("@abc1", CaseSheet.abc1);
                arlParms[50] = new SqlParameter("@abc2", CaseSheet.abc2);
                arlParms[51] = new SqlParameter("@abc3", CaseSheet.abc3);
                arlParms[52] = new SqlParameter("@abc4", CaseSheet.abc4);
                arlParms[53] = new SqlParameter("@abc5", CaseSheet.abc5);
                arlParms[54] = new SqlParameter("@abc6", CaseSheet.abc6);
                arlParms[55] = new SqlParameter("@abc7", CaseSheet.abc7);
                arlParms[56] = new SqlParameter("@abc8", CaseSheet.abc8);
                arlParms[57] = new SqlParameter("@abc9", CaseSheet.abc9);
                arlParms[58] = new SqlParameter("@abc10", CaseSheet.abc10);
                arlParms[59] = new SqlParameter("@abc11", CaseSheet.abc11);
                arlParms[60] = new SqlParameter("@abc12", CaseSheet.abc12);
                arlParms[61] = new SqlParameter("@abc13", CaseSheet.abc13);
                arlParms[62] = new SqlParameter("@abc14", CaseSheet.abc14);
                arlParms[63] = new SqlParameter("@abc15", CaseSheet.abc15);
                arlParms[64] = new SqlParameter("@abc16", CaseSheet.abc16);
                arlParms[65] = new SqlParameter("@abc17", CaseSheet.abc17);
                arlParms[66] = new SqlParameter("@abc18", CaseSheet.abc18);
                arlParms[67] = new SqlParameter("@abc19", CaseSheet.abc19);
                arlParms[68] = new SqlParameter("@abc20", CaseSheet.abc20);
                arlParms[69] = new SqlParameter("@ICD", CaseSheet.ICD);
                arlParms[70] = new SqlParameter("@ICDDetails", CaseSheet.ICDDetails);
                arlParms[71] = new SqlParameter("@CaseDate", CaseSheet.CaseDate);
                arlParms[72] = new SqlParameter("@UserId", CaseSheet.UserId);
                arlParms[73] = new SqlParameter("@DeptId", CaseSheet.DeptId);
                arlParms[74] = new SqlParameter("@DelFlag", CaseSheet.DelFlag);
                arlParms[75] = new SqlParameter("@Status", CaseSheet.Status);
                // arlParms[20] = new SqlParameter("@Reviewdate", CaseSheet.Nextreview);
                return SQLHelper.ExecuteDataset("HMS_TemporaryCaseSheetInsertAyurveda", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_CaseSheetInsertandUpdateAyurveda(CaseSheet CaseSheet, string dbName)
        {
            try
            {

                arlParms = new SqlParameter[79];
                arlParms[0] = new SqlParameter("@CaseSheetId", CaseSheet.CaseSheetId);
                arlParms[1] = new SqlParameter("@CaseSheetNo", CaseSheet.CaseSheetNo);
                arlParms[2] = new SqlParameter("@RegSeries", CaseSheet.RegSeries);
                arlParms[3] = new SqlParameter("@PRegNo", CaseSheet.PRegNo);
                arlParms[4] = new SqlParameter("@RevisitId", CaseSheet.RevisitId);
                arlParms[5] = new SqlParameter("@PatientIP", CaseSheet.PatientIP);
                arlParms[6] = new SqlParameter("@IPYear", CaseSheet.IPYear);

                arlParms[7] = new SqlParameter("@Complaint", CaseSheet.Complaint);
                arlParms[8] = new SqlParameter("@Diagnosis", CaseSheet.Diagnosis);
                arlParms[9] = new SqlParameter("@Presentillness", CaseSheet.Presentillness);
                arlParms[10] = new SqlParameter("@Allergies", CaseSheet.Allergies);
                arlParms[11] = new SqlParameter("@Notes", CaseSheet.Notes);
                arlParms[12] = new SqlParameter("@Remarks", CaseSheet.Remarks);

                arlParms[13] = new SqlParameter("@Cycle", CaseSheet.Cycle);
                arlParms[14] = new SqlParameter("@Complication", CaseSheet.Complication);
                arlParms[15] = new SqlParameter("@Addiction", CaseSheet.Addiction);
                arlParms[16] = new SqlParameter("@Examination", CaseSheet.Examination);
                arlParms[17] = new SqlParameter("@Details", CaseSheet.Details);
                arlParms[18] = new SqlParameter("@Systemic", CaseSheet.Systemic);
                arlParms[19] = new SqlParameter("@DTemp", CaseSheet.DTemp);
                arlParms[20] = new SqlParameter("@Dpulse", CaseSheet.Dpulse);
                arlParms[21] = new SqlParameter("@DRegular", CaseSheet.DRegular);
                arlParms[22] = new SqlParameter("@DBP", CaseSheet.DBP);
                arlParms[23] = new SqlParameter("@Dheight", CaseSheet.Dheight);
                arlParms[24] = new SqlParameter("@Dweight", CaseSheet.Dweight);
                arlParms[25] = new SqlParameter("@Dbmi", CaseSheet.Dbmi);
                arlParms[26] = new SqlParameter("@DBowel", CaseSheet.DBowel);
                arlParms[27] = new SqlParameter("@DAppetite", CaseSheet.DAppetite);
                arlParms[28] = new SqlParameter("@DMict", CaseSheet.DMict);
                arlParms[29] = new SqlParameter("@DSleep", CaseSheet.DSleep);
                arlParms[30] = new SqlParameter("@DHabits", CaseSheet.DHabits);
                arlParms[31] = new SqlParameter("@Built", CaseSheet.Built);
                arlParms[32] = new SqlParameter("@Gain", CaseSheet.Gain);
                arlParms[33] = new SqlParameter("@Intake", CaseSheet.Intake);
                arlParms[34] = new SqlParameter("@Gastric", CaseSheet.Gastric);
                arlParms[35] = new SqlParameter("@PhysicalAct", CaseSheet.PhysicalAct);
                arlParms[36] = new SqlParameter("@vitaminSupp", CaseSheet.vitaminSupp);
                arlParms[37] = new SqlParameter("@Nutristatus", CaseSheet.Nutristatus);
                arlParms[38] = new SqlParameter("@Nutriassess", CaseSheet.Nutriassess);
                arlParms[39] = new SqlParameter("@Painassess", CaseSheet.Painassess);
                arlParms[40] = new SqlParameter("@ProDiagnosis", CaseSheet.ProDiagnosis);
                arlParms[41] = new SqlParameter("@Investigations", CaseSheet.Investigations);
                arlParms[42] = new SqlParameter("@docDiagnosis", CaseSheet.docDiagnosis);
                arlParms[43] = new SqlParameter("@CarePlanStrategy", CaseSheet.CarePlanStrategy);
                arlParms[44] = new SqlParameter("@Advice", CaseSheet.Advice);
                arlParms[45] = new SqlParameter("@DietPlan", CaseSheet.DietPlan);
                arlParms[46] = new SqlParameter("@UndergoingMedicines", CaseSheet.UndergoingMedicines);
                arlParms[47] = new SqlParameter("@OutCome", CaseSheet.OutCome);
                arlParms[48] = new SqlParameter("@CarePlanModi", CaseSheet.CarePlanModi);
                arlParms[49] = new SqlParameter("@abc1", CaseSheet.abc1);
                arlParms[50] = new SqlParameter("@abc2", CaseSheet.abc2);
                arlParms[51] = new SqlParameter("@abc3", CaseSheet.abc3);
                arlParms[52] = new SqlParameter("@abc4", CaseSheet.abc4);
                arlParms[53] = new SqlParameter("@abc5", CaseSheet.abc5);
                arlParms[54] = new SqlParameter("@abc6", CaseSheet.abc6);
                arlParms[55] = new SqlParameter("@abc7", CaseSheet.abc7);
                arlParms[56] = new SqlParameter("@abc8", CaseSheet.abc8);
                arlParms[57] = new SqlParameter("@abc9", CaseSheet.abc9);
                arlParms[58] = new SqlParameter("@abc10", CaseSheet.abc10);
                arlParms[59] = new SqlParameter("@abc11", CaseSheet.abc11);
                arlParms[60] = new SqlParameter("@abc12", CaseSheet.abc12);
                arlParms[61] = new SqlParameter("@abc13", CaseSheet.abc13);
                arlParms[62] = new SqlParameter("@abc14", CaseSheet.abc14);
                arlParms[63] = new SqlParameter("@abc15", CaseSheet.abc15);
                arlParms[64] = new SqlParameter("@abc16", CaseSheet.abc16);
                arlParms[65] = new SqlParameter("@abc17", CaseSheet.abc17);
                arlParms[66] = new SqlParameter("@abc18", CaseSheet.abc18);
                arlParms[67] = new SqlParameter("@abc19", CaseSheet.abc19);
                arlParms[68] = new SqlParameter("@abc20", CaseSheet.abc20);


                arlParms[69] = new SqlParameter("@ICD", CaseSheet.ICD);
                arlParms[70] = new SqlParameter("@ICDDetails", CaseSheet.ICDDetails);
                arlParms[71] = new SqlParameter("@CaseDate", CaseSheet.CaseDate);
                arlParms[72] = new SqlParameter("@UserId", CaseSheet.UserId);
                arlParms[73] = new SqlParameter("@DeptId", CaseSheet.DeptId);
                arlParms[74] = new SqlParameter("@DelFlag", CaseSheet.DelFlag);
                arlParms[75] = new SqlParameter("@Status", CaseSheet.Status);
                arlParms[76] = new SqlParameter("@SendSMS", CaseSheet.SendSMS);
                arlParms[77] = new SqlParameter("@SpecialFees", CaseSheet.SpecialFees);
                arlParms[78] = new SqlParameter("@Reviewdate", CaseSheet.Nextreview);


                return SQLHelper.ExecuteDataset("HMS_CaseSheetInsertandUpdateAyurveda", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet HMS_CaseSheetGetandGetsAyurveda(CaseSheet CaseSheet, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@CaseSheetId", CaseSheet.CaseSheetId);
                arlParms[1] = new SqlParameter("@DelFlag", CaseSheet.DelFlag);
                arlParms[2] = new SqlParameter("@Status", CaseSheet.Status);

                return SQLHelper.ExecuteDataset("HMS_CaseSheetGetandGetsAyurveda", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet HMS_SalesInvoiceInsertOPTICALSORDER(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceInsertOPTICALSORDER", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_SalesInvoiceUpdteOPTICALSORDER(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceUpdteOPTICALSORDER", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesGetandGetsOPTICALORDER(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@BillSlNo", SaleInvoiceHospital.HBillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                return SQLHelper.ExecuteDataset("HMS_SalesGetandGetsOPTICALORDER", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesInvoiceDeleteOPTICALORDER(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillNo", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[2] = new SqlParameter("@UserId", SaleInvoiceHospital.UserId);
                arlParms[3] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillSeries);
                arlParms[4] = new SqlParameter("@Variable1", SaleInvoiceHospital.Variable1);
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceDeleteOPTICALORDER", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesInvoiceInsertOPTICALSINVOICE(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceInsertOPTICALSINVOICE", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesInvoiceUpdteOPTICALSINVOICE(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceUpdteOPTICALSINVOICE", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesInvoiceDeleteOPTICALSINVOICE(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@BillNo", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                arlParms[2] = new SqlParameter("@UserId", SaleInvoiceHospital.UserId);
                arlParms[3] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillSeries);
                arlParms[4] = new SqlParameter("@Variable1", SaleInvoiceHospital.Variable1);
                return SQLHelper.ExecuteDataset("HMS_SalesInvoiceDeleteOPTICALSINVOICE", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesReturnInsertOpticals(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesReturnInsertOpticals", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet HMS_SalesReturnUpdateOpticals(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@HMS_SalesHospitalType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("HMS_SalesReturnUpdateOpticals", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet HMS_SalesReturnGetandGetsOpticals(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@BillSlNo", SaleInvoiceHospital.HBillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                return SQLHelper.ExecuteDataset("HMS_SalesReturnGetandGetsOpticals", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet HMS_SalesGetandGetsOPTICALSINVOICE(SaleInvoiceHospital SaleInvoiceHospital, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@BillSeriesId", SaleInvoiceHospital.HBillNo);
                arlParms[1] = new SqlParameter("@BillSlNo", SaleInvoiceHospital.HBillSeries);
                arlParms[2] = new SqlParameter("@DeptId", SaleInvoiceHospital.DeptId);
                return SQLHelper.ExecuteDataset("HMS_SalesGetandGetsOPTICALSINVOICE", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}