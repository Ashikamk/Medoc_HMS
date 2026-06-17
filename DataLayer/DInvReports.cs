using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using EUMI_ERP.Models;

namespace EUMI_ERP
{
    public class DInvReports
    {

        private SqlParameter[] arlParms;

        public DataSet BOQReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@DateFrom", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@DateTo", InvReportModel.DateTo);
                return SQLHelper.ExecuteDataset("Rpt_GetBOQDatewise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet Rpt_ToolsTransactionReport(ToolsManagementModel ToolsManagementModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@DateFrom", ToolsManagementModel.FromDate);
                arlParms[1] = new SqlParameter("@DateTo", ToolsManagementModel.ToDate);
                arlParms[2] = new SqlParameter("@CustodianId", ToolsManagementModel.CustodianId);
                arlParms[3] = new SqlParameter("@Flag", ToolsManagementModel.ManagementType);
                return SQLHelper.ExecuteDataset("Rpt_ToolsTransactionReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_GetPurchaseDatewise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet Rpt_GetPendingPDC(VoucherTypeModel VoucherTypeModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DateFrom", VoucherTypeModel.DateFrom);
                arlParms[1] = new SqlParameter("@DateTo", VoucherTypeModel.DateTo);
                arlParms[2] = new SqlParameter("@CustAccount", VoucherTypeModel.CustAccount);
                return SQLHelper.ExecuteDataset("Rpt_GetPendingPDC", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet Rpt_GetProjectList(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_GetProjectList", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet PurchaseReturnMainReport(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseReturnMain", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseReturnSubReport(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseReturnSub", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesReturnReport(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("SalesReturnMainReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesReturnSubReport(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_SalesReturnSub", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ItemwisePurchaseReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseReportGraph(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseReportGraph", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseReportGroupwise(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", InvReportModel.DateTo);
                arlParms[2] = new SqlParameter("@SubGroupId", InvReportModel.SubGroup);
                arlParms[3] = new SqlParameter("@GroupId", InvReportModel.Group);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseGroupwise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseReportCategorywise(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", InvReportModel.DateTo);
                arlParms[2] = new SqlParameter("@SubCategoryId", InvReportModel.SubCategory);
                arlParms[3] = new SqlParameter("@CategoryId", InvReportModel.Category);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseCategorywise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseReportGraphwise(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseReportGraphwise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MonthwiseReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_MonthwisePurchaseReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MonthwiseSalesReportbyCustomerGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_MonthwiseSalesbyCustomer", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MonthwiseExpenseAnalysis(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                arlParms[1] = new SqlParameter("@Account", InvReportModel.AccCode);
                arlParms[2] = new SqlParameter("@DeptId", InvReportModel.DeptId);
                return SQLHelper.ExecuteDataset("Rpt_MonthwiseeExpenseAnalysis", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet TransactionDateDiffGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate", InvReportModel.DateTo);
                return SQLHelper.ExecuteDataset("Rpt_TransactionaDate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MonthwiseItemReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_MonthwisePurchaseReportByItem", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet MonthwiseSalesReportbyItemGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_MonthwiseSalesByItem", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SupplierReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate ", InvReportModel.DateTo);
                arlParms[2] = new SqlParameter("@SupplierId", InvReportModel.SupplierId);
                arlParms[3] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_GetPurchaseSupplierwise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AreaReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate ", InvReportModel.DateTo);
                arlParms[2] = new SqlParameter("@AreaId", InvReportModel.PlaceOfSupply);
                arlParms[3] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_GetPurchaseAreawise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet LocationReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate ", InvReportModel.DateTo);
                arlParms[2] = new SqlParameter("@LocationId", InvReportModel.LocnId);
                arlParms[3] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_GetPurchaseLocationwise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ItemReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@Todate ", InvReportModel.DateTo);
                arlParms[2] = new SqlParameter("@ProdId", InvReportModel.ProductId);
                arlParms[3] = new SqlParameter("@SupplierId ", InvReportModel.SupplierId);
                arlParms[4] = new SqlParameter("@UserId ", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_ItemPurchaseAnalysis", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet TopSupplierReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@number", InvReportModel.number);
                arlParms[1] = new SqlParameter("@SupplierId", InvReportModel.SupplierId);
                arlParms[2] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[3] = new SqlParameter("@ToDate", InvReportModel.DateTo);
                arlParms[4] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_TopSupplierAnalysis", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet TopSupplierGraphReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@number", InvReportModel.number);
                arlParms[1] = new SqlParameter("@SupplierId", InvReportModel.SupplierId);
                arlParms[2] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[3] = new SqlParameter("@ToDate", InvReportModel.DateTo);
                arlParms[4] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_TopSupplierAnalysisGraph", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet AreaGroupReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate ", InvReportModel.DateTo);
                arlParms[2] = new SqlParameter("@AreaId", InvReportModel.PlaceOfSupply);
                arlParms[3] = new SqlParameter("@AreaGroupId", InvReportModel.AreaGroup);
                arlParms[4] = new SqlParameter("@UserId", InvReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_GetPurchaseAreaGroupwise", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet AreaGroupSalesReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", InvReportModel.DateFrom);
                arlParms[1] = new SqlParameter("@ToDate ", InvReportModel.DateTo);
                arlParms[2] = new SqlParameter("@AreaId", InvReportModel.PlaceOfSupply);
                arlParms[3] = new SqlParameter("@AreaGroupId", InvReportModel.AreaGroup);
                arlParms[4] = new SqlParameter("@UserId", InvReportModel.UserId);

                return SQLHelper.ExecuteDataset("Rpt_AreaGroupwiseSales", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ProfitAnalysisSalesReturn(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_ProfitAnalysisSalesReturn", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet ProfitAnalysis(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_ProfitAnalysis", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerEnquiryMain(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_CustomerEnquiryMain", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet CustomerEnquirySub(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_CustomerEnquirySub", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet QuotationEntryMain(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_QuotationEntryMain", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet QuotationEntrySub(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_QuotationEntrySub", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesOrderMain(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", ReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_SalesOrderMain", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesOrderSub(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", ReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_SalesOrderSub", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet PurchaseOrderMain(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseOrderMain", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet PurchasePerformaMain(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", ReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_PurchasePerformaMain", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchaseOrderSub(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseOrderSub", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PurchasePerformaSub(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", ReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_PurchasePerformaSub", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet PurchaseEnquiryMain(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseEnquiryMain", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseEnquirySub(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseEnquirySub", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MRVPurchaseMain(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_MRVPurchaseMain", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MRVPurchaseSub(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_MRVPurchaseSub", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DetailedProduction(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_DetailedProduction", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MonthwiseSalesStockQuery(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", ReportModel.ItemId);
                arlParms[1] = new SqlParameter("@DeptId", ReportModel.Department);
                return SQLHelper.ExecuteDataset("MonthwiseSalesStockQuery", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet LocationTransfer(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_LocationTransfer", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet LocationTransferMain(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                arlParms[1] = new SqlParameter("@UserId", ReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_LOcationTransferMain", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet FastMovingLocationTransfer(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@number", ReportModel.Number);
                arlParms[1] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_LocationTransferFastMovingItems", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet NonMovingLocationTransfer(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@number", ReportModel.Number);
                arlParms[1] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_LocationTransferNonMovingItems", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MonthwisePurchaseStockQuery(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@ItemId", ReportModel.ItemId);
                arlParms[1] = new SqlParameter("@DeptId", ReportModel.Department);
                return SQLHelper.ExecuteDataset("MonthwisePurchaseStockQuery", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet OrderBouncingReport(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", ReportModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ReportModel.ToDate);
                return SQLHelper.ExecuteDataset("Rpt_OrderBouncing", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PackingHistoryReport(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", ReportModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ReportModel.ToDate);
                return SQLHelper.ExecuteDataset("Rpt_PackingHistorySummary", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet PackingHistoryDetailedReport(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", ReportModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ReportModel.ToDate);
                return SQLHelper.ExecuteDataset("Rpt_PackingHistoryDetailed", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet LocationTransferUsedCars(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_LocationTransferUsedCars", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet EmployeeAttendanceReport(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", ReportModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ReportModel.ToDate);
                arlParms[2] = new SqlParameter("@User", ReportModel.User);
                return SQLHelper.ExecuteDataset("Rpt_UserAttendance", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet AgeingUsedCars(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Fromdate", ReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", ReportModel.ToDate);
                return SQLHelper.ExecuteDataset("AgeingUsedCars", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet EmployeeAttendanceSummaryReport(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", ReportModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ReportModel.ToDate);
                return SQLHelper.ExecuteDataset("Rpt_UserAttendanceSummary", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet GratuityReport(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", ReportModel.Condition);
                return SQLHelper.ExecuteDataset("GratuityReport", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MonthlyPayrollGets(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", ReportModel.FromDate);
                arlParms[1] = new SqlParameter("@ToDate", ReportModel.ToDate);
                arlParms[2] = new SqlParameter("@Month", ReportModel.Month);
                arlParms[3] = new SqlParameter("@AllowedLeaves", ReportModel.AllowedLeaves);
                arlParms[4] = new SqlParameter("@TotalDayOff", ReportModel.TotalDayOff);
                return SQLHelper.ExecuteDataset("MonthlyPayroll", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MonthlyPayrollDetails(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@month", ReportModel.Month);
                arlParms[1] = new SqlParameter("@userid", ReportModel.UserId);
                arlParms[2] = new SqlParameter("@Holiday", ReportModel.HoliDay);
                return SQLHelper.ExecuteDataset("MonthlyPayrollDetails", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet MonthlyPayrollNew(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@Month", ReportModel.Month);
                arlParms[1] = new SqlParameter("@AllowedLeaves", ReportModel.AllowedLeaves);
                arlParms[2] = new SqlParameter("@TotalDayOff", ReportModel.HoliDay);
                return SQLHelper.ExecuteDataset("MonthlyPayrollNew", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MonthlyPayrollSalaryGets(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[0];
                return SQLHelper.ExecuteDataset("MonthlyPayrollSalary", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalaryManagementGets(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Month", ReportModel.Month);
                return SQLHelper.ExecuteDataset("SalaryManagementGets", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet MonthlyPayrollInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MonthlyPayroll", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MonthlyPayrollInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet MonthlyPayrollSalaryInsert(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@MonthlyPayrollSalary", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("MonthlyPayrollSalaryInsert", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet SalaryManagementInsertNew(DataTable dt, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@SalaryManagement", SqlDbType.Structured);
                arlParms[0].Value = dt;
                return SQLHelper.ExecuteDataset("SalaryManagementInsertNew", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet EmployeeSearch(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@EmpName", ReportModel.EmpName);
                arlParms[1] = new SqlParameter("@DeptId", ReportModel.DeptId);
                arlParms[2] = new SqlParameter("@UserId", ReportModel.UserId);
                return SQLHelper.ExecuteDataset("EmployeeSearch", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet Rpt_PurchaseImportLocalCompare(ReportModel ReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];

                arlParms[0] = new SqlParameter("@FromDate", ReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", ReportModel.ToDate);
                arlParms[2] = new SqlParameter("@UserId", ReportModel.UserId);
                arlParms[3] = new SqlParameter("@DeptId", ReportModel.DeptId);
                arlParms[4] = new SqlParameter("@SupplierId", ReportModel.SupplierId);
                arlParms[5] = new SqlParameter("@ItemId", ReportModel.ItemId);
                arlParms[6] = new SqlParameter("@Variable1", ReportModel.Variable1);
                arlParms[7] = new SqlParameter("@Variable2", ReportModel.Variable2);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseImportLocalCompare", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseStockInReportGet(InvReportModel InvReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Condition", InvReportModel.Condition);
                return SQLHelper.ExecuteDataset("Rpt_GetPurchaseStockIn", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

    }
}