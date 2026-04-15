using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using EUMI_ERP.Models;

namespace EUMI_ERP
{
    public class DInvPurchaseReport
    {
        private SqlParameter[] arlParms;

        public DataSet DailySalesGet(DailySalesReport DailySalesReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[11];
                arlParms[0] = new SqlParameter("@DateFrom", DailySalesReport.InvDate);
                arlParms[1] = new SqlParameter("@DateTo", DailySalesReport.DueDate);
                arlParms[2] = new SqlParameter("@AreaId", DailySalesReport.AreaId);
                arlParms[3] = new SqlParameter("@PayType", DailySalesReport.PayType);
                arlParms[4] = new SqlParameter("@SalesManId", DailySalesReport.SalesManId);
                arlParms[5] = new SqlParameter("@CustId", DailySalesReport.CustID);       
                arlParms[6] = new SqlParameter("@GroupID", DailySalesReport.GroupID);
                arlParms[7] = new SqlParameter("@SubgroupID", DailySalesReport.SubgroupID);
                arlParms[8] = new SqlParameter("@CategoryID", DailySalesReport.CategoryID);
                arlParms[9] = new SqlParameter("@SubCategoryID", DailySalesReport.SubCategoryID);
                arlParms[10] = new SqlParameter("@Dept", DailySalesReport.Department);
                return SQLHelper.ExecuteDataset("Rpt_DailySalesReportDetails", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MonthlywiseSalesGet(MonthlywiseSalesReport MonthlywiseSalesReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DateFrom", MonthlywiseSalesReport.InvDate);
                arlParms[1] = new SqlParameter("@DateTo", MonthlywiseSalesReport.DueDate);

                return SQLHelper.ExecuteDataset("Rpt_MonthlywiseReportDetails", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AreawiseSalesGet(AreawiseSalesReport AreawiseSalesReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@DateFrom", AreawiseSalesReport.InvDate);
                arlParms[1] = new SqlParameter("@DateTo", AreawiseSalesReport.DueDate);
                arlParms[2] = new SqlParameter("@AreaId", AreawiseSalesReport.AreaId);
                arlParms[3] = new SqlParameter("@UserId", AreawiseSalesReport.UserId);
                return SQLHelper.ExecuteDataset("Rpt_AreawiseSalesReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet InvoicewiseSalesAnalysis(InvoicewiseSalesAnalysis InvoicewiseSalesAnalysis, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", InvoicewiseSalesAnalysis.Condition);
                arlParms[1] = new SqlParameter("@UserId", InvoicewiseSalesAnalysis.UserId);
                return SQLHelper.ExecuteDataset("Rpt_InvoicewiseSales", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerwiseSalesGet(CustomerwiseSalesReport CustomerwiseSalesReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@DateFrom", CustomerwiseSalesReport.InvDate);
                arlParms[1] = new SqlParameter("@DateTo", CustomerwiseSalesReport.DueDate);
                arlParms[2] = new SqlParameter("@CustId", CustomerwiseSalesReport.CustID);
                arlParms[3] = new SqlParameter("@PayType", CustomerwiseSalesReport.PayType);
                arlParms[4] = new SqlParameter("@UserId", CustomerwiseSalesReport.UserId);
                return SQLHelper.ExecuteDataset("Rpt_CustomerwiseSalesReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesmanwiseSalesGet(SalesmanwiseSalesReport SalesmanwiseSalesReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", SalesmanwiseSalesReport.Condition);
                arlParms[1] = new SqlParameter("@UserId", SalesmanwiseSalesReport.UserId);
                //arlParms[0] = new SqlParameter("@DateFrom", SalesmanwiseSalesReport.InvDate);
                //arlParms[1] = new SqlParameter("@DateTo", SalesmanwiseSalesReport.DueDate);
                //arlParms[2] = new SqlParameter("@SalesManId", SalesmanwiseSalesReport.SalesManId);
                //arlParms[3] = new SqlParameter("@PayType", SalesmanwiseSalesReport.PayType);
                //arlParms[4] = new SqlParameter("@Dept", SalesmanwiseSalesReport.Dept);
                return SQLHelper.ExecuteDataset("SalesmanwiseSalesReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AreaSalesmanwiseSalesGet(AreaSalesmanwiseSalesReport AreaSalesmanwiseSalesReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];
                arlParms[0] = new SqlParameter("@FromDate", AreaSalesmanwiseSalesReport.InvDate);
                arlParms[1] = new SqlParameter("@ToDate", AreaSalesmanwiseSalesReport.DueDate);
                arlParms[2] = new SqlParameter("@SalesManId", AreaSalesmanwiseSalesReport.SalesmanID);
                arlParms[3] = new SqlParameter("@PayType", AreaSalesmanwiseSalesReport.PayType);
                arlParms[4] = new SqlParameter("@AreaId", AreaSalesmanwiseSalesReport.AreaId);
                arlParms[5] = new SqlParameter("@GroupAreaId", AreaSalesmanwiseSalesReport.AreaGroupID);
                arlParms[6] = new SqlParameter("@UserId", AreaSalesmanwiseSalesReport.UserId);
                return SQLHelper.ExecuteDataset("Rpt_AreaSalesmanwiseSalesReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet AreaCustomerwiseSalesGet(AreaCustomerwiseSalesReport AreaCustomerwiseSalesReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[7];

                arlParms[0] = new SqlParameter("@FromDate", AreaCustomerwiseSalesReport.InvDate);
                arlParms[1] = new SqlParameter("@ToDate", AreaCustomerwiseSalesReport.DueDate);
                arlParms[2] = new SqlParameter("@CustId", AreaCustomerwiseSalesReport.CustID);
                arlParms[3] = new SqlParameter("@PayType", AreaCustomerwiseSalesReport.PayType);
                arlParms[4] = new SqlParameter("@AreaId", AreaCustomerwiseSalesReport.AreaId);
                arlParms[5] = new SqlParameter("@GroupAreaId", AreaCustomerwiseSalesReport.AreaGroupID);
                arlParms[6] = new SqlParameter("@UserId", AreaCustomerwiseSalesReport.UserId);
                return SQLHelper.ExecuteDataset("Rpt_AreaCustomerwiseSalesReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesmanCustomerwiseSalesGet(SalesmanCustomerwiseSalesReport SalesmanCustomerwiseSalesReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@DateFrom", SalesmanCustomerwiseSalesReport.InvDate);
                arlParms[1] = new SqlParameter("@DateTo", SalesmanCustomerwiseSalesReport.DueDate);
                arlParms[2] = new SqlParameter("@CustId", SalesmanCustomerwiseSalesReport.CustID);
                arlParms[3] = new SqlParameter("@PayType", SalesmanCustomerwiseSalesReport.PayType);
                arlParms[4] = new SqlParameter("@SalesManID", SalesmanCustomerwiseSalesReport.SalesManId);
                arlParms[5] = new SqlParameter("@UserId", SalesmanCustomerwiseSalesReport.UserId);
                return SQLHelper.ExecuteDataset("Rpt_SalesmanCustomerwiseSalesReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet EmployeeDocumentExpiryGet(EmployeeDocumentExpiryReport EmployeeDocumentExpiryReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DateFrom", EmployeeDocumentExpiryReport.FromDate);
                arlParms[1] = new SqlParameter("@DateTo", EmployeeDocumentExpiryReport.ToDate);
                arlParms[2] = new SqlParameter("@DocumentType", EmployeeDocumentExpiryReport.DocumentType);

                return SQLHelper.ExecuteDataset("Rpt_EmployeeDocumentExpiry_Report", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet TopCustomerReportGet(TopCustomerModel TopCustomerModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@number", TopCustomerModel.number);
                arlParms[1] = new SqlParameter("@CustomerId", TopCustomerModel.CustId);
                arlParms[2] = new SqlParameter("@FromDate", TopCustomerModel.DateFrom);
                arlParms[3] = new SqlParameter("@ToDate", TopCustomerModel.DateTo);
                arlParms[4] = new SqlParameter("@UserId", TopCustomerModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_TopCustomerAnalysis", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet TopCustomerAnalysisGraph(TopCustomerModel TopCustomerModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@number", TopCustomerModel.number);
                arlParms[1] = new SqlParameter("@CustomerId", TopCustomerModel.CustId);
                arlParms[2] = new SqlParameter("@FromDate", TopCustomerModel.DateFrom);
                arlParms[3] = new SqlParameter("@ToDate", TopCustomerModel.DateTo);
                arlParms[4] = new SqlParameter("@UserId", TopCustomerModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_TopCustomerAnalysisGraph", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        
             public DataSet PurchaseOrderReminder(FastandNonMovingModel FastandNonMovingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@number", FastandNonMovingModel.Number);
                arlParms[1] = new SqlParameter("@Condition", FastandNonMovingModel.Condition);
                return SQLHelper.ExecuteDataset("PurchaseOrderReminder", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }





        public DataSet FastMovingItemsGet(FastandNonMovingModel FastandNonMovingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@number", FastandNonMovingModel.Number);
                arlParms[1] = new SqlParameter("@Condition", FastandNonMovingModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_FastMovingItems", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet FastMovingItemsDashboard(FastandNonMovingModel FastandNonMovingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@number", FastandNonMovingModel.Number);
                arlParms[1] = new SqlParameter("@Qty", FastandNonMovingModel.Qty);
                return SQLHelper.ExecuteDataset("Rpt_FastMovingItemsDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet NonMovingItemsDashboard(FastandNonMovingModel FastandNonMovingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@QTY", FastandNonMovingModel.Qty);
                arlParms[1] = new SqlParameter("@DATEFROM", FastandNonMovingModel.DateFrom);
                arlParms[2] = new SqlParameter("@DATETO", FastandNonMovingModel.DateTo);
                arlParms[3] = new SqlParameter("@Type", FastandNonMovingModel.Type);
                arlParms[4] = new SqlParameter("@GrpId", FastandNonMovingModel.GroupId);
                arlParms[5] = new SqlParameter("@SubGrpId", FastandNonMovingModel.SubGroupId);
                arlParms[6] = new SqlParameter("@CatId", FastandNonMovingModel.CategoryId);
                arlParms[7] = new SqlParameter("@SubCatId", FastandNonMovingModel.SubCategoryId);
                return SQLHelper.ExecuteDataset("usp_NonMovingItem", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet NonMovingItemsGet(FastandNonMovingModel FastandNonMovingModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Number", FastandNonMovingModel.Number);
                arlParms[1] = new SqlParameter("@Qty", FastandNonMovingModel.Qty);
                arlParms[2] = new SqlParameter("@Condition", FastandNonMovingModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_NonMovingItems", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet SalesGet(SalesReport SalesReport, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@InvoiceDescription", SalesReport.InvoiceDescription);
                arlParms[1] = new SqlParameter("@InvoiceNo", SalesReport.InvoiceNo);
                arlParms[2] = new SqlParameter("@DateofTrn", SalesReport.DateofTrn);
                return SQLHelper.ExecuteDataset("Rpt_MaterialOutManagement", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }





        public DataSet GSTSales(GSTModel GSTModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", GSTModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", GSTModel.ToDate);
                arlParms[2] = new SqlParameter("@UserId", GSTModel.UserId);
                return SQLHelper.ExecuteDataset("GstSales", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet GSTPurchase(GSTModel GSTModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", GSTModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", GSTModel.ToDate);
                arlParms[2] = new SqlParameter("@UserId", GSTModel.UserId);
                return SQLHelper.ExecuteDataset("GstPurchase", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}