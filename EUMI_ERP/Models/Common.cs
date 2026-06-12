using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    
    public class Common
    {
        
    }
    public class Country
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }

        CommonDMaster oDMasters = new CommonDMaster();

        public DataSet GetCountry(Country Country, string dbName)
        {
            return oDMasters.GetCountry(Country, dbName);
        }
    }
    public class ID_Type
    {
        public int Id { get; set; }
        public string IDType { get; set; }

        CommonDMaster oDMasters = new CommonDMaster();

        public DataSet GetIDType(ID_Type IDType, string dbName)
        {
            return oDMasters.GetIDType(IDType, dbName);
        }
    }
    public class Manager
    {
        public int ManagerId { get; set; }
        public string ManagerName { get; set; }

        CommonDMaster oDMasters = new CommonDMaster();

        public DataSet GetManager(Manager ManagerName, string dbName)
        {
            return oDMasters.GetManager(ManagerName, dbName);
        }
    }
    public class Company
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }

        CommonDMaster oDMasters = new CommonDMaster();

        public DataSet GetCompany(Company CompanyName, string dbName)
        {
            return oDMasters.GetCompany(CompanyName, dbName);
        }
    }

    public class SerialNumber
    {
        public long ToolsManagemant_No { get; set; }
        public int Id { get; set; }
        public long BOQNo { get; set; }
        public long StockOutNo { get; set; }
        public long PurSlno { get; set; }
        public long BatchSlno { get; set; }
        public long VoNo { get; set; }
        public int StockInNo { get; set; }
        public int ProdEntryNo { get; set; }
        public int DeptId { get; set; }
        public long EnquiryNo { get; set; }
        public int PE_EnquiryNo { get; set; }
        public int PO_OrderNo { get; set; }
        public long QuotationNo { get; set; }
        public int Stock_AdjNo{ get; set; }
        public int OrderNo { get; set; } 
        public int MRVSlNo { get; set; }
        public int PurchasePerforma { get; set; }
        public int MRVPurSlNo { get; set; }
        public int PRNo { get; set; }
        public int PVTNo { get; set; }
        public int DOrderNo { get; set; } 
        public int ImportPurTax { get; set; }
        public int ReturnNo { get; set; }
        public int OpenStockEntryNo { get; set; }
        public int trNo { get; set; }
        public int Pack_No { get; set; }
        public int Electronics_productionNo { get; set; }
        public int CashCollectionSlno { get; set; }
        public int PurchaseImportNO { get; set; } 
        public int PettyCashPrint { get; set; }
        public int ContainerImportNO { get; set; }
        public long DailyTnNum { get; set; }
        public long ContractNo { get; set; } 
        public long MRequistion { get; set; }
        public long MIssue { get; set; }
        public long ProjectMaterialRetNo { get; set; }
        public long PackingListNo { get; set; }
        public long ExportSalesTax { get; set; }

        CommonDMaster oCommonDMaster = new CommonDMaster();
        public DataSet SlNoGetandGets(SerialNumber oSerialNumber, string dbName)
        {
            return oCommonDMaster.SlNoGetandGets(oSerialNumber, dbName);
        }
    }
    public class MyDashBoard
    {
        public string CashBalance { get; set; }
        public string BankBalance { get; set; }
        public string TotalSales { get; set; }
        public string TotalPurchase { get; set; }
        public string DailySales { get; set; }
        public string DailyPurchase { get; set; }
        public string PDCReceived { get; set; }
        public string PDCIssued { get; set; }
        public string AmountReceivable { get; set; }
        public string AmountPayable { get; set; }
        public string DailyReceipt { get; set; }
        public string DailyPayment { get; set; }
        public string PendingSO { get; set; }
        public string PendingPO { get; set; }
        public string Profit { get; set; }
        public string Loss { get; set; }
        public string Stock { get; set; }
        public string StockValue { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public int Flag { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public long ID { get; set; }

        private SqlParameter[] arlParms;
        public DataSet MyDashBoardWigets(MyDashBoard MyDashBoard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];

                arlParms[0] = new SqlParameter("@FromDate", MyDashBoard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MyDashBoard.ToDate);
                arlParms[2] = new SqlParameter("@UserId", MyDashBoard.UserId);
                arlParms[3] = new SqlParameter("@DeptId", MyDashBoard.DeptId);
                arlParms[4] = new SqlParameter("@Flag", MyDashBoard.Flag);
                return SQLHelper.ExecuteDataset("MyDashBoardWigets", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MyDashBoardListing(MyDashBoard MyDashBoard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];

                arlParms[0] = new SqlParameter("@FromDate", MyDashBoard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MyDashBoard.ToDate);
                arlParms[2] = new SqlParameter("@UserId", MyDashBoard.UserId);
                arlParms[3] = new SqlParameter("@DeptId", MyDashBoard.DeptId);
                arlParms[4] = new SqlParameter("@Type", MyDashBoard.Type);
                arlParms[5] = new SqlParameter("@Flag", MyDashBoard.Flag);
                return SQLHelper.ExecuteDataset("MyDashBoardListing", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CustCreditLimitExceeded(MyDashBoard MyDashBoard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", MyDashBoard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MyDashBoard.ToDate);
                arlParms[2] = new SqlParameter("@UserId", MyDashBoard.UserId);
                arlParms[3] = new SqlParameter("@DeptId", MyDashBoard.DeptId);
               
                return SQLHelper.ExecuteDataset("CustCreditLimitExceeded", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet StockAgeing(MyDashBoard MyDashBoard, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", MyDashBoard.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", MyDashBoard.ToDate);
                arlParms[2] = new SqlParameter("@UserId", MyDashBoard.UserId);
                arlParms[3] = new SqlParameter("@DeptId", MyDashBoard.DeptId);

                return SQLHelper.ExecuteDataset("StockAgeing", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        

    }
}