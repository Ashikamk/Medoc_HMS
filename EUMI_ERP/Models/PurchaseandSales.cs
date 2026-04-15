using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP
{
    public class PurchaseandSalestemp
    {
        public string TotalAmount { get; set; }
        public string CreditSales { get; set; }
        public string CashSales { get; set; }
        public string DailyPurchase { get; set; }
        
        public string totalTax { get; set; }
        public string Earning { get; set; }
        public string Value1 { get; set; }
        public string Value2 { get; set; }
        public string Fromdate { get; set; }
        public string Todate { get; set; }
        public string Cost { get; set; }
        public string DeptId { get; set; }
        public string Department { get; set; }
        public string BillSeriesId { get; set; }
        public string BillDescription { get; set; }
        public string BillSlNo { get; set; }
        public string InvDate { get; set; }
        public string Paytype { get; set; }
        public string Customer { get; set; }
        public string Amount { get; set; }
        public long UserId { get; set; }
        public string AccId { get; set; }
        public string AccCode { get; set; }
        public string AccDesc { get; set; }
        public string Debit { get; set; }
        public string Credit { get; set; }
        public string SType { get; set; }
        public string VDate { get; set; }
        public string VtypePrefix { get; set; }
        public string VoucherNo { get; set; }
        public string ReferenceNo { get; set; }
        public string VDescription { get; set; }
        public string CRSales { get; set; }
        public string CSSales { get; set; }
    }
    public class PurchaseandSales
    {
        public string Fromdate { get; set; }
        public string Todate { get; set; }
        public string DeptId { get; set; }
        public long UserId { get; set; }
        public string AreaId { get; set; }
        public string AreaGroup { get; set; }
        public string AreaGroupId { get; set; }
        public string GroupId { get; set; }
        public string SubGroupId { get; set; }
        public string Department { get; set; }
        public string SalesmanId { get; set; }
        public string SalesMan { get; set; }
        public string Paytype { get; set; }
        public string Amount { get; set; }
        public string InvDate { get; set; }
        public string SReturn { get; set; }
        public string Total { get; set; }
        public string AccId { get; set; }
        public string AccCode { get; set; }
        public string AccDesc { get; set; }
        public string Debit { get; set; }
        public string Credit { get; set; }
        public string Cost { get; set; }
        public string GroupName { get; set; }
        public string Profit { get; set; }
        public string ProfitPer { get; set; }
        private SqlParameter[] arlParms;



        public DataSet DashboardGetandGetsElectronics(PurchaseandSalestemp PurchaseandSalestemp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSalestemp.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSalestemp.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSalestemp.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSalestemp.UserId);
                return SQLHelper.ExecuteDataset("DashboardGetandGetsElectronics", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet TotalStock(PurchaseandSalestemp PurchaseandSalestemp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Todate", PurchaseandSalestemp.Todate);
                arlParms[1] = new SqlParameter("@UserId", PurchaseandSalestemp.UserId);
                return SQLHelper.ExecuteDataset("TotalStock", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CustOutstandingDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("CustOutstandingDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SupOutstandingDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SupOutstandingDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DashboardData(PurchaseandSalestemp PurchaseandSalestemp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSalestemp.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSalestemp.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSalestemp.DeptId);
                return SQLHelper.ExecuteDataset("DashboardDataGet", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DashboardGetandGets(PurchaseandSalestemp PurchaseandSalestemp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSalestemp.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSalestemp.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSalestemp.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSalestemp.UserId);
                return SQLHelper.ExecuteDataset("DashboardGetandGets", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet MyCustomerOutstanding(PurchaseandSalestemp PurchaseandSalestemp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", PurchaseandSalestemp.UserId);
                return SQLHelper.ExecuteDataset("MyCustomerOutstanding", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet PreviousMonthSales(PurchaseandSalestemp PurchaseandSalestemp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", PurchaseandSalestemp.UserId);
                return SQLHelper.ExecuteDataset("PreviousMonthSales", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet WeeklySalesReturn(PurchaseandSalestemp PurchaseandSalestemp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UserId", PurchaseandSalestemp.UserId);
                return SQLHelper.ExecuteDataset("WeeklySalesReturn", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CurrentMonthSales(PurchaseandSalestemp PurchaseandSalestemp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSalestemp.Fromdate);
                arlParms[1] = new SqlParameter("@ToDate", PurchaseandSalestemp.Todate);
                arlParms[2] = new SqlParameter("@UserId", PurchaseandSalestemp.UserId);
                return SQLHelper.ExecuteDataset("CurrentMonthSales", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet MonthlySalesReturn(PurchaseandSalestemp PurchaseandSalestemp, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSalestemp.Fromdate);
                arlParms[1] = new SqlParameter("@ToDate", PurchaseandSalestemp.Todate);
                arlParms[2] = new SqlParameter("@UserId", PurchaseandSalestemp.UserId);
                return SQLHelper.ExecuteDataset("CurrentMonthSalesReturn", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DepartmentWiseSalesDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("DeptwiseSalesDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesManWorkItemStatus(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesManWorkItemStatus", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DasboardWorkItemStatus(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                return SQLHelper.ExecuteDataset("DasboardWorkItemStatus", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AdminDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                return SQLHelper.ExecuteDataset("AdminDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesmanwiseSalesDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesmanwiseSalesDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet ProfitAnalysisGraphReport(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@GroupId", PurchaseandSales.GroupId);
                arlParms[3] = new SqlParameter("@SubGroupId", PurchaseandSales.SubGroupId);
                return SQLHelper.ExecuteDataset("Rpt_ProfitAnalysisGraph", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet ProfitAnalysisGraphDailyReport(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@GroupId", PurchaseandSales.GroupId);
                arlParms[3] = new SqlParameter("@SubGroupId", PurchaseandSales.SubGroupId);
                return SQLHelper.ExecuteDataset("Rpt_ProfitAnalysisGraphDaily", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet ProfitAnalysisGraphWeeklyReport(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@GroupId", PurchaseandSales.GroupId);
                arlParms[3] = new SqlParameter("@SubGroupId", PurchaseandSales.SubGroupId);
                return SQLHelper.ExecuteDataset("Rpt_ProfitAnalysisGraphWeekly", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet ProfitAnalysisGraphMonthlyReport(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@GroupId", PurchaseandSales.GroupId);
                arlParms[3] = new SqlParameter("@SubGroupId", PurchaseandSales.SubGroupId);
                return SQLHelper.ExecuteDataset("Rpt_ProfitAnalysisGraphMonthly", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet ProfitAnalysisGraphYearlyReport(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@GroupId", PurchaseandSales.GroupId);
                arlParms[3] = new SqlParameter("@SubGroupId", PurchaseandSales.SubGroupId);
                return SQLHelper.ExecuteDataset("Rpt_ProfitAnalysisGraphYearly", dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesmanMonthWiseDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesmanMonthWiseDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesmanMonthlyDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesmanMonthlyDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet SalesmanYearlyDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesmanYearlyDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesmanWeekWiseDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesmanWeekWiseDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet SalesmanWeeklyDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesmanWeeklyDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesmanwiseGraphReport(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@PayType ", PurchaseandSales.Paytype);
                arlParms[3] = new SqlParameter("@Salesman", PurchaseandSales.SalesmanId);
                arlParms[4] = new SqlParameter("@Dept", PurchaseandSales.DeptId);
                arlParms[5] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesmanwiseGraphReport", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesPerformanceDashBoard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];

                arlParms[0] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                return SQLHelper.ExecuteDataset("SalesPerformanceDashBoard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesmanwisePeriodReport(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@ToDate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesmanwisePeriodDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesmanDashboard(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseandSales.DeptId);
                arlParms[3] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("SalesmanDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet AreaGroupwiseGraphReport(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@AreaId ", PurchaseandSales.AreaId);
                arlParms[3] = new SqlParameter("@AreaGroupId", PurchaseandSales.AreaGroupId);
                arlParms[4] = new SqlParameter("@UserId", PurchaseandSales.UserId);

                return SQLHelper.ExecuteDataset("Rpt_AreaGroupwiseGraph", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet DepartmentWiseSalesDashboard1(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];

                arlParms[0] = new SqlParameter("@FromDate", PurchaseandSales.Fromdate);
                arlParms[1] = new SqlParameter("@Todate", PurchaseandSales.Todate);
                arlParms[2] = new SqlParameter("@UserId", PurchaseandSales.UserId);
                return SQLHelper.ExecuteDataset("MainDashboard", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet EmployeeAttendanceReport(PurchaseandSales PurchaseandSales, string dbName)
        {
            try
            {
                //arlParms = new SqlParameter[0];

                return SQLHelper.ExecuteDataset("Rpt_UserAttendance", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

    }
}