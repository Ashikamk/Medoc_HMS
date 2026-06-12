using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP
{
    public class DTaxReport
    {
        private SqlParameter[] arlParms;
        public DataSet SalesTaxReportGet(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                arlParms[3] = new SqlParameter("@AreaGroupId", TaxReportModel.Area);
                arlParms[4] = new SqlParameter("@TaxGrp", TaxReportModel.TaxPercent);
                arlParms[5] = new SqlParameter("@UserId", TaxReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_SalesTax", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesAreaGrpTaxReportGet(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                arlParms[3] = new SqlParameter("@AreaGroupId", TaxReportModel.Area);
                arlParms[4] = new SqlParameter("@TaxGrp", TaxReportModel.TaxPercent);
                arlParms[5] = new SqlParameter("@UserId", TaxReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_SalesTaxAreaGrp", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseTaxReportGet(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                arlParms[3] = new SqlParameter("@AreaGroupId", TaxReportModel.Area);
                arlParms[4] = new SqlParameter("@TaxGrp", TaxReportModel.TaxPercent);
                arlParms[5] = new SqlParameter("@UserId", TaxReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseTax", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet PurchaseAreaGrpTaxReportGet(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                arlParms[3] = new SqlParameter("@AreaGroupId", TaxReportModel.Area);
                arlParms[4] = new SqlParameter("@TaxGrp", TaxReportModel.TaxPercent);
                arlParms[5] = new SqlParameter("@UserId", TaxReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseTaxAreaGrp", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet B2cs(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@Account", TaxReportModel.Account);
                arlParms[3] = new SqlParameter("@AccountGrp", TaxReportModel.AccountGrp);
                arlParms[4] = new SqlParameter("@UserId", TaxReportModel.UserId);
                arlParms[5] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                return SQLHelper.ExecuteDataset("Rpt_B2CS", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet ExpenseTaxReportGet(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@Account", TaxReportModel.Account);
                arlParms[3] = new SqlParameter("@AccountGrp", TaxReportModel.AccountGrp);
                arlParms[4] = new SqlParameter("@UserId", TaxReportModel.UserId);
                arlParms[5] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                return SQLHelper.ExecuteDataset("Rpt_ExpenseTax", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseReturnTaxReportGet(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                arlParms[3] = new SqlParameter("@AreaGroupId", TaxReportModel.Area);
                arlParms[4] = new SqlParameter("@UserId", TaxReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseReturnTax", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PurchaseReturnAreaGrpTaxReportGet(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                arlParms[3] = new SqlParameter("@AreaGroupId", TaxReportModel.Area);
                arlParms[4] = new SqlParameter("@UserId", TaxReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_PurchaseReturnTaxAreaGrp", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet SalesReturnTaxReportGet(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                arlParms[3] = new SqlParameter("@AreaGroupId", TaxReportModel.Area);
                arlParms[4] = new SqlParameter("@UserId", TaxReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_SalesReturnTax", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet SalesReturnAreaGrpTaxReportGet(TaxReportModel TaxReportModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[5];
                arlParms[0] = new SqlParameter("@FromDate", TaxReportModel.FromDate);
                arlParms[1] = new SqlParameter("@Todate", TaxReportModel.ToDate);
                arlParms[2] = new SqlParameter("@DeptId", TaxReportModel.Dept);
                arlParms[3] = new SqlParameter("@AreaGroupId", TaxReportModel.Area);
                arlParms[4] = new SqlParameter("@UserId", TaxReportModel.UserId);
                return SQLHelper.ExecuteDataset("Rpt_SalesReturnTaxAreaGrp", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}