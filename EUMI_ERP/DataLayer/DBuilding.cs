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
    public class DBuilding
    {
        private SqlParameter[] arlParms;
        //public DataSet BuildingFeaturesGetandGets(BuilidingModel BuilidingModel, string dbName)
        //{
        //    try
        //    {
        //        arlParms = new SqlParameter[1];
        //        arlParms[0] = new SqlParameter("@Fe_Id", BuilidingModel.Fe_Id);
        //        return SQLHelper.ExecuteDataset("BuildingFeaturesGetandGets", dbName, arlParms);

        //    }
        //    catch (SqlException exMe)
        //    {
        //        Console.WriteLine(exMe.Message);
        //        return null;
        //    }
        //}

        public DataSet FlatTypesGetandGets(BuilidingModel BuilidingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@FlatTypeId", BuilidingModel.FlatTypeId);
                return SQLHelper.ExecuteDataset("FlatTypeGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
       
        public DataSet BuildingManagementInsertandUpdate(BuilidingModel BuilidingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[10];
                arlParms[0] = new SqlParameter("@BuildingManagementId", BuilidingModel.BuildingManagementId);
                arlParms[1] = new SqlParameter("@BuildingId", BuilidingModel.BuildingId);
                arlParms[2] = new SqlParameter("@NameofBuilding", BuilidingModel.NameofBuilding);
                arlParms[3] = new SqlParameter("@PlotNo", BuilidingModel.PlotNo);
                arlParms[4] = new SqlParameter("@City", BuilidingModel.City);
                arlParms[5] = new SqlParameter("@LandLord", BuilidingModel.LandLord);
                arlParms[6] = new SqlParameter("@TypeofBuilding", BuilidingModel.TypeofBuilding);
                arlParms[7] = new SqlParameter("@Remarks", BuilidingModel.Remarks);
                arlParms[8] = new SqlParameter("@Features", BuilidingModel.Features);
                arlParms[9] = new SqlParameter("@DelFlag", BuilidingModel.DelFlag);
                return SQLHelper.ExecuteDataset("BuildingManagementInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet BuildingManagementGetandGets(BuilidingModel BuilidingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@BuildingManagementId", BuilidingModel.BuildingManagementId);
               
                return SQLHelper.ExecuteDataset("BuildingManagementGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet AreaGetandGets(BuilidingModel BuilidingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[0];
                //arlParms[0] = new SqlParameter("@AreaGrpId", BuilidingModel.AreaGrpId);
                arlParms[0] = new SqlParameter("@AreaId", BuilidingModel.AreaId);
                return SQLHelper.ExecuteDataset("AreaGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LandlordGetandGetss(BuilidingModel BuilidingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Lan_Id", BuilidingModel.Lan_Id);
                return SQLHelper.ExecuteDataset("LandlordGetandGetss", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet Landlordsearch(BuilidingModel BuilidingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
               arlParms[0] = new SqlParameter("@Lan_Name", BuilidingModel.Lan_Name);
                 return SQLHelper.ExecuteDataset("Landlordsearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet BuildGetandGets(BuilidingModel BuilidingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Id", BuilidingModel.Lan_Id);
                return SQLHelper.ExecuteDataset("BuildGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet FlatMasterInsertandUpdate(FlatMasterModel FlatMasterModel, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[18]; 
                 arlParms[0] = new SqlParameter("@FlatMasterId", FlatMasterModel.FlatMasterId);
                 arlParms[1] = new SqlParameter("@FlatNumber", FlatMasterModel.FlatNumber );
                 arlParms[2] = new SqlParameter("@Building", FlatMasterModel.Building );
                 arlParms[3] = new SqlParameter("@DEWANO", FlatMasterModel.DEWANO );
                 arlParms[4] = new SqlParameter("@Rent", FlatMasterModel.Rent );
                 arlParms[5] = new SqlParameter("@RentType", FlatMasterModel.RentType);
                 arlParms[6] = new SqlParameter("@LandLoard", FlatMasterModel.LandLoard );
                 arlParms[7] = new SqlParameter("@AgentName", FlatMasterModel.AgentName );
                 arlParms[8] = new SqlParameter("@AgentContact", FlatMasterModel.AgentContact);
                 arlParms[9] = new SqlParameter("@TypeOfFlat", FlatMasterModel.TypeOfFlat);
                 arlParms[10] = new SqlParameter("@Features", FlatMasterModel.Features );
                 arlParms[11] = new SqlParameter("@Remarks", FlatMasterModel.Remarks);
                 arlParms[12] = new SqlParameter("@DelFlag", FlatMasterModel.DelFlag);
                arlParms[13] = new SqlParameter("@CurDate", FlatMasterModel.CurDate);
                arlParms[14] = new SqlParameter("@VaccantDate", FlatMasterModel.VaccantDate);
                arlParms[15] = new SqlParameter("@ContractStatus", FlatMasterModel.ContractStatus);
                arlParms[16] = new SqlParameter("@UserId", FlatMasterModel.UserId);
                arlParms[17] = new SqlParameter("@DeptId", FlatMasterModel.DeptId);
                return SQLHelper.ExecuteDataset("FlatMasterInsertandUpdate", dbName, arlParms); 

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet Rpt_FlatDetails(FlatMasterModel FlatMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", FlatMasterModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", FlatMasterModel.ToDate);
                return SQLHelper.ExecuteDataset("Rpt_FlatDetails", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet FlatMasterGetandGets(FlatMasterModel FlatMasterModel, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@FlatMasterId", FlatMasterModel.FlatMasterId);  
                return SQLHelper.ExecuteDataset("FlatMasterGetandGets", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet FlatNumberSearch(FlatMasterModel FlatMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FlatNumber", FlatMasterModel.FlatNumber);
                arlParms[1] = new SqlParameter("@buildingManagementId", FlatMasterModel.buildingManagementId); 
                return SQLHelper.ExecuteDataset("FlatNumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet BuildingNumberSearch(FlatMasterModel FlatMasterModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@BuildingCode", FlatMasterModel.Building);
                return SQLHelper.ExecuteDataset("BuildingNumberSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet TenantSearch(TenantMaster TenantMaster, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@TenantAccount", TenantMaster.TenantAccount);
                return SQLHelper.ExecuteDataset("TenantSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LandLordsearch(LandModel LandModel, string dbName)  
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Lan_Name", LandModel.LandName); 
                return SQLHelper.ExecuteDataset("LandlordSearch", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ContractMultipleDocInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ContractDocInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ContractMultipleDocInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet LandLordReportGets(LandModel LandModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", LandModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", LandModel.ToDate);
                return SQLHelper.ExecuteDataset("Rpt_LandLord", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet TenantDetailswithPDCGets(LandModel LandModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@DateFrom", LandModel.FromDate);
                arlParms[1] = new SqlParameter("@DateTo", LandModel.ToDate);
                arlParms[2] = new SqlParameter("@BuildingId", LandModel.BuildingId);
                arlParms[3] = new SqlParameter("@FlatId", LandModel.FlatId);
                return SQLHelper.ExecuteDataset("Rpt_TenantDetailswithPDC", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet LeaseContractDetailsGets(LandModel LandModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", LandModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", LandModel.ToDate);
                return SQLHelper.ExecuteDataset("Rpt_LeaseContractDetails", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DeferredIncomeStmntGets(LandModel LandModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ToDate", LandModel.ToDate);
                arlParms[1] = new SqlParameter("@BuildingId", LandModel.BuildingId);
                arlParms[2] = new SqlParameter("@FlatId", LandModel.FlatId);
                return SQLHelper.ExecuteDataset("Rpt_DeferredIncomeStmnt", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }




        public DataSet ContractEntryInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ContractType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ContractEntryInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet OtherTransactionInsertandUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@OtherCostInsert", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("OtherTransactionInsertandUpdate", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet ContractEntryGetandGets(Contract Contract, string dbName) 
        {
            try
            {
                arlParms = new SqlParameter[4]; 
                arlParms[0] = new SqlParameter("@ContractNo", Contract.ContractNo);
                arlParms[1] = new SqlParameter("@DeptId", Contract.DeptId);
                arlParms[2] = new SqlParameter("@UserId", Contract.UserId);
                arlParms[3] = new SqlParameter("@Status", Contract.Status); 
                return SQLHelper.ExecuteDataset("ContractEntryGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ContractMultipleDocDelete(Contract Contract, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@ContractNo", Contract.ContractNo);
                arlParms[1] = new SqlParameter("@DocTypeId", Contract.DocTypeId);
                arlParms[2] = new SqlParameter("@ContDocument", Contract.ContDocument);
                arlParms[3] = new SqlParameter("@DeptId", Contract.DeptId);
                arlParms[4] = new SqlParameter("@UserId", Contract.UserId);
                arlParms[5] = new SqlParameter("@DelFlag", Contract.DelFlag);
                arlParms[6] = new SqlParameter("@ConDocID", Contract.ConDocID);
                return SQLHelper.ExecuteDataset("ContractMultipleDocDelete", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ContractDocumentGetandGets(Contract Contract, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@ContractNo", Contract.ContractNo);
                arlParms[1] = new SqlParameter("@DeptId", Contract.DeptId);
                arlParms[2] = new SqlParameter("@UserId", Contract.UserId);
                return SQLHelper.ExecuteDataset("ContractDocumentGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ContractNoSearch(Contract Contract, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@ContractNo", Contract.ContractNo);
                arlParms[1] = new SqlParameter("@DeptId", Contract.DeptId);
                arlParms[2] = new SqlParameter("@UserId", Contract.UserId);
                arlParms[3] = new SqlParameter("@Status", Contract.Status);
                return SQLHelper.ExecuteDataset("ContractNoSearch", dbName, arlParms); 

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ContractEntryUpdate(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ContractType", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("ContractEntryUpdate", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ContractEntryDelete(Contract Contract, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5]; 
                arlParms[0] = new SqlParameter("@ContractNo", Contract.ContractNo);
                arlParms[1] = new SqlParameter("@DeptId", Contract.DeptId);
                arlParms[2] = new SqlParameter("@UserId", Contract.UserId);
                arlParms[3] = new SqlParameter("@Status", Contract.Status);
                arlParms[4] = new SqlParameter("@ContDate", Contract.ContDate);                 
                return SQLHelper.ExecuteDataset("ContractEntryDelete", dbName, arlParms); 
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}