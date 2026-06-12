//20/09/2018

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
    public class DCompany
    {


        private SqlParameter[] arlParms;

        public DataSet CompanyDetailsInsertandUpdate(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[29];
                arlParms[0] = new SqlParameter("@CmpnyId", CompanyModel.CmpnyId);
                arlParms[1] = new SqlParameter("@CompanyCode", CompanyModel.CompanyCode);
                arlParms[2] = new SqlParameter("@CompanyName", CompanyModel.CompanyName);
                arlParms[3] = new SqlParameter("@Address", CompanyModel.Address);
                arlParms[4] = new SqlParameter("@PhoneNo", CompanyModel.PhoneNo);
                arlParms[5] = new SqlParameter("@Email", CompanyModel.Email);
                arlParms[6] = new SqlParameter("@Fax", CompanyModel.Fax);
                arlParms[7] = new SqlParameter("@PeriodFrom", CompanyModel.PeriodFrom);
                arlParms[8] = new SqlParameter("@PeriodTo", CompanyModel.PeriodTo);
                arlParms[9] = new SqlParameter("@ProtectionDate", CompanyModel.ProtectionDate);
                arlParms[10] = new SqlParameter("@CurrencyId", CompanyModel.CurrencyId);
                arlParms[11] = new SqlParameter("@Decimal", CompanyModel.Decimals);
                arlParms[12] = new SqlParameter("@TRNNo", CompanyModel.TRNNo);
                arlParms[13] = new SqlParameter("@Area", CompanyModel.Area);
                arlParms[14] = new SqlParameter("@BusinessType", CompanyModel.BusinessType);
                arlParms[15] = new SqlParameter("@BankName", CompanyModel.BankName);
                arlParms[16] = new SqlParameter("@AccountNo", CompanyModel.AccountNo);
                arlParms[17] = new SqlParameter("@IBANNo", CompanyModel.IBANNo);
                arlParms[18] = new SqlParameter("@SwiftCode", CompanyModel.SwiftCode);
                arlParms[19] = new SqlParameter("@PurchaseSlnoType", CompanyModel.PurchaseSlnoType);
                arlParms[20] = new SqlParameter("@MRVType", CompanyModel.MRVType);
                arlParms[21] = new SqlParameter("@PostingAllow", CompanyModel.PostingAllowCmpny);
                arlParms[22] = new SqlParameter("@AutoLocationTransfer", CompanyModel.AutoLocationTransfer);
                arlParms[23] = new SqlParameter("@PurchaseOrderApproval", CompanyModel.PurchaseOrderApproval);
                arlParms[24] = new SqlParameter("@WorkAfterSales", CompanyModel.WorkAfterSales);
                arlParms[25] = new SqlParameter("@DelFlag", CompanyModel.DelFlag);
                arlParms[26] = new SqlParameter("@SalesBillSeries", CompanyModel.SalesBillSeries);
                arlParms[27] = new SqlParameter("@TaxType", CompanyModel.TaxType);
                arlParms[28] = new SqlParameter("@IPTaxZero", CompanyModel.IPTaxZero);
                return SQLHelper.ExecuteDataset("CompanyDetailsInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CompanyDetailsInsertandUpdate2(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[56];
                arlParms[0] = new SqlParameter("@CompanyId", CompanyModel.CompanyId);
                arlParms[1] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                arlParms[2] = new SqlParameter("@SalesOrder", CompanyModel.SalesOrder);
                arlParms[3] = new SqlParameter("@Quot", CompanyModel.Quot);
                arlParms[4] = new SqlParameter("@CENQ", CompanyModel.CENQ);
                arlParms[5] = new SqlParameter("@PurchaseNum", CompanyModel.PurchaseNum);
                arlParms[6] = new SqlParameter("@BatchSlNo", CompanyModel.BatchaSlno);
                arlParms[7] = new SqlParameter("@PurchaseEnquiry", CompanyModel.PurchaseEnquiry);
                arlParms[8] = new SqlParameter("@PurchOrder", CompanyModel.PurchOrder);
                arlParms[9] = new SqlParameter("@MRVNUM", CompanyModel.MRVNUM);
                arlParms[10] = new SqlParameter("@SRNo", CompanyModel.SRNo);
                arlParms[11] = new SqlParameter("@PRNo", CompanyModel.PRNo);
                arlParms[12] = new SqlParameter("@ProductionNum", CompanyModel.ProductionNum);
                arlParms[13] = new SqlParameter("@StockTransferIn", CompanyModel.StockTransferIn);
                arlParms[14] = new SqlParameter("@StockTransferOut", CompanyModel.StockTransferOut);
                arlParms[15] = new SqlParameter("@MI", CompanyModel.MI);
                arlParms[16] = new SqlParameter("@MReceived", CompanyModel.MReceived);
                arlParms[17] = new SqlParameter("@MRequistion", CompanyModel.MRequistion);
                arlParms[18] = new SqlParameter("@JV", CompanyModel.JV);
                arlParms[19] = new SqlParameter("@RV", CompanyModel.RV);
                arlParms[20] = new SqlParameter("@PV", CompanyModel.PV);
                arlParms[21] = new SqlParameter("@DV", CompanyModel.DV);
                arlParms[22] = new SqlParameter("@CV", CompanyModel.CV);
                arlParms[23] = new SqlParameter("@CNV", CompanyModel.CNV);
                arlParms[24] = new SqlParameter("@DNV", CompanyModel.DNV);
                arlParms[25] = new SqlParameter("@ChequeTransfer", CompanyModel.ChequeTransfer);
                arlParms[26] = new SqlParameter("@TV", CompanyModel.TV);
                arlParms[27] = new SqlParameter("@AV", CompanyModel.AV);
                arlParms[28] = new SqlParameter("@OP", CompanyModel.OP);
                arlParms[29] = new SqlParameter("@IONo", CompanyModel.IONo);
                arlParms[30] = new SqlParameter("@SNNo", CompanyModel.SNNo);
                arlParms[31] = new SqlParameter("@IINo", CompanyModel.IINo);
                arlParms[32] = new SqlParameter("@CBNo", CompanyModel.CBNo);
                arlParms[33] = new SqlParameter("@PNNo", CompanyModel.PNNo);
                arlParms[34] = new SqlParameter("@DeliveryOrder", CompanyModel.DeliveryOrder);
                arlParms[35] = new SqlParameter("@PC", CompanyModel.PC);
                arlParms[36] = new SqlParameter("@PKL", CompanyModel.PKL);
                arlParms[37] = new SqlParameter("@MRVPurchase", CompanyModel.MRVPurchase);
                arlParms[38] = new SqlParameter("@PVTNo", CompanyModel.PVTNo);
                arlParms[39] = new SqlParameter("@StockAdjNo", CompanyModel.StockAdjNo);
                arlParms[40] = new SqlParameter("@PurchaseImportNo", CompanyModel.PurchaseImportNo);
                arlParms[41] = new SqlParameter("@ContainerImportNo", CompanyModel.ContainerImportNo);
                arlParms[42] = new SqlParameter("@BOQNo", CompanyModel.BOQNo);
                arlParms[43] = new SqlParameter("@OpenStockEntryNo", CompanyModel.OpenStockEntryNo);
                arlParms[44] = new SqlParameter("@LocationTransferNo", CompanyModel.LocationTransferNo);
                arlParms[45] = new SqlParameter("@PackingHistoryNo", CompanyModel.PackingHistoryNo);
                arlParms[46] = new SqlParameter("@ElctrncsProductionNo", CompanyModel.ElectronicsProductionNo);
                arlParms[47] = new SqlParameter("@ContraNumber", CompanyModel.ContraNo);
                arlParms[48] = new SqlParameter("@CashCollectionNo", CompanyModel.CashCollectionNo);
                arlParms[49] = new SqlParameter("@PettyCashPrint", CompanyModel.PettyCashPrint);
                arlParms[50] = new SqlParameter("@PurchasePerforma", CompanyModel.PurchasePerforma);
                arlParms[51] = new SqlParameter("@DailyTnNo", CompanyModel.DailyTnNo);
                arlParms[52] = new SqlParameter("@ContractNo", CompanyModel.ContractNo);
                arlParms[53] = new SqlParameter("@ToolsManagementNo", CompanyModel.ToolsManagementNo);
                arlParms[54] = new SqlParameter("@ProjectMaterialReturnNo", CompanyModel.ProjectMaterialReturnNo);
                arlParms[55] = new SqlParameter("@PackingListNo", CompanyModel.PackingListNo);
                return SQLHelper.ExecuteDataset("CompanyDetailsInsertandUpdate2", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CompanyDetailsInsertandUpdate3(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[9];
                arlParms[0] = new SqlParameter("@CompanyId", CompanyModel.CompanyId);
                arlParms[1] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                arlParms[2] = new SqlParameter("@CustomerId", CompanyModel.CustomerId);
                arlParms[3] = new SqlParameter("@SupplierId", CompanyModel.SupplierId);
                arlParms[4] = new SqlParameter("@PDCR", CompanyModel.PDCR);
                arlParms[5] = new SqlParameter("@PDCI", CompanyModel.PDCI);
                arlParms[6] = new SqlParameter("@Cash", CompanyModel.Cash);
                arlParms[7] = new SqlParameter("@BankId", CompanyModel.BankId);
                arlParms[8] = new SqlParameter("@Expenses", CompanyModel.Expenses);
          return SQLHelper.ExecuteDataset("CompanyDetailsInsertandUpdate3", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CompanyDetailsInsertandUpdate4(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[28];
                arlParms[0] = new SqlParameter("@CompanyId", CompanyModel.CompanyId);
                arlParms[1] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                arlParms[2] = new SqlParameter("@GICash", CompanyModel.GICash);
                arlParms[3] = new SqlParameter("@GIBank", CompanyModel.GIBank);
                arlParms[4] = new SqlParameter("@CashSale", CompanyModel.CashSale);
                arlParms[5] = new SqlParameter("@CreditSale", CompanyModel.CreditSale);
                arlParms[6] = new SqlParameter("@CreditCard", CompanyModel.CreditCard);
                arlParms[7] = new SqlParameter("@CashCust", CompanyModel.CashCust);
                arlParms[8] = new SqlParameter("@COGSAC", CompanyModel.COGSAC);
                arlParms[9] = new SqlParameter("@PControlAC", CompanyModel.PControlAC);
                arlParms[10] = new SqlParameter("@PurchaseLocal", CompanyModel.PurchaseLocal);
                arlParms[11] = new SqlParameter("@PurcahseImport", CompanyModel.PurcahseImport);
                arlParms[12] = new SqlParameter("@SReturnAC", CompanyModel.SReturnAC);
                arlParms[13] = new SqlParameter("@PReturnAC", CompanyModel.PReturnAC);
                arlParms[14] = new SqlParameter("@DiscountAC", CompanyModel.DiscountAC);
                arlParms[15] = new SqlParameter("@PDCReceived", CompanyModel.PDCReceived);
                arlParms[16] = new SqlParameter("@PDCIssued", CompanyModel.PDCIssued);
                arlParms[17] = new SqlParameter("@STrOutDr", CompanyModel.STrOutDr);
                arlParms[18] = new SqlParameter("@STrOutCr", CompanyModel.STrOutCr);
                arlParms[19] = new SqlParameter("@STrInDr", CompanyModel.STrInDr);
                arlParms[20] = new SqlParameter("@STrInCr", CompanyModel.STrInCr);
                arlParms[21] = new SqlParameter("@StockControlAC", CompanyModel.StockControlAC);
                arlParms[22] = new SqlParameter("@StockInHand", CompanyModel.StockInHand);
                arlParms[23] = new SqlParameter("@SalPayableAC", CompanyModel.SalPayableAC);
                arlParms[24] = new SqlParameter("@ChequeAC", CompanyModel.ChequeAC);
                arlParms[25] = new SqlParameter("@OtherCost", CompanyModel.OtherCost);
                arlParms[26] = new SqlParameter("@Roundoff", CompanyModel.Roundoff);
                arlParms[27] = new SqlParameter("@PettyCashAccount", CompanyModel.PettyCashAccount);
               

                return SQLHelper.ExecuteDataset("CompanyDetailsInsertandUpdate4", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet CompanyDetailsInsertandUpdate5(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[9];
                arlParms[0] = new SqlParameter("@CompanyId", CompanyModel.CompanyId);
                arlParms[1] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                arlParms[2] = new SqlParameter("@SalesAccount", CompanyModel.SalesAccount);
                arlParms[3] = new SqlParameter("@PurchaseAccount", CompanyModel.PurchaseAccount);
                arlParms[4] = new SqlParameter("@SalesReturnAccount", CompanyModel.SalesReturnAccount);
                arlParms[5] = new SqlParameter("@PurchaseReturnAccount", CompanyModel.PurchaseReturnAccount);
                arlParms[6] = new SqlParameter("@ExpenseAccount", CompanyModel.ExpenseAccount);
                arlParms[7] = new SqlParameter("@ImportPurchaseAccount", CompanyModel.ImportPurchaseAccount);
                arlParms[8] = new SqlParameter("@ExportSalesTax", CompanyModel.ExportSalesTax);
                return SQLHelper.ExecuteDataset("CompanyDetailsInsertandUpdate5", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }

        public DataSet CompanyDetailsInsertandUpdate6(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[16];
                arlParms[0] = new SqlParameter("@CompanyId", CompanyModel.CompanyId);
                arlParms[1] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                arlParms[2] = new SqlParameter("@Delivery", CompanyModel.Delivery);
                arlParms[3] = new SqlParameter("@Shipping", CompanyModel.Shipping);
                arlParms[4] = new SqlParameter("@DealerFee", CompanyModel.DealerFee);
                arlParms[5] = new SqlParameter("@StorageFee", CompanyModel.StorageFee);
                arlParms[6] = new SqlParameter("@LoadingFee", CompanyModel.LoadingFee);
                arlParms[7] = new SqlParameter("@LateFee", CompanyModel.LateFee);
                arlParms[8] = new SqlParameter("@Insurance", CompanyModel.Insurance);
                arlParms[9] = new SqlParameter("@AdditionalService", CompanyModel.AdditionalService);
                arlParms[10] = new SqlParameter("@OtherCost1", CompanyModel.OtherCost1);
                arlParms[11] = new SqlParameter("@OtherCost2", CompanyModel.OtherCost2);
                arlParms[12] = new SqlParameter("@OtherCost3", CompanyModel.OtherCost3);
                arlParms[13] = new SqlParameter("@OtherCost4", CompanyModel.OtherCost4);
                arlParms[14] = new SqlParameter("@VCCAccount", CompanyModel.VCCAccount);
                arlParms[15] = new SqlParameter("@LocationTransferAccount", CompanyModel.LocationTransferAccount);
                return SQLHelper.ExecuteDataset("CompanyDetailsInsertandUpdate6", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }


        public DataSet CompanyDetailsInsertandUpdate9(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@CompanyId", CompanyModel.CompanyId);
                arlParms[1] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                arlParms[2] = new SqlParameter("@DCompanyName", CompanyModel.DCompanyName);
                arlParms[3] = new SqlParameter("@DAddress", CompanyModel.DAddress);
                arlParms[4] = new SqlParameter("@DPhoneNo", CompanyModel.DPhoneNo);
                arlParms[5] = new SqlParameter("@DEmail", CompanyModel.DEmail);
                arlParms[6] = new SqlParameter("@DFax", CompanyModel.DFax);
                arlParms[7] = new SqlParameter("@DTRNNo", CompanyModel.DTRNNo); 
                return SQLHelper.ExecuteDataset("CompanyDetailsInsertandUpdate9", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet ComPanyDetailsGetandGets(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CmpnyId", CompanyModel.CmpnyId);
                return SQLHelper.ExecuteDataset("CompanyDetailsGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet PrintTypeGets(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[4];
                arlParms[0] = new SqlParameter("@BillType", CompanyModel.BillType);
                arlParms[1] = new SqlParameter("@PrintType", CompanyModel.PrintType);
                arlParms[2] = new SqlParameter("@Type", CompanyModel.Id);
                arlParms[3] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                return SQLHelper.ExecuteDataset("PrintTypeGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CompanyPrintInsertandUpdate(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[9];
                arlParms[0] = new SqlParameter("@SalesPrintId", CompanyModel.SalesPrintId);
                arlParms[1] = new SqlParameter("@SalesReturnPrintId", CompanyModel.SalesReturnPrintId);
                arlParms[2] = new SqlParameter("@VoucherPrintId", CompanyModel.VoucherPrintId);
                arlParms[3] = new SqlParameter("@QuotationPrintId", CompanyModel.QuotationPrintId);
                arlParms[4] = new SqlParameter("@PrintColor", CompanyModel.PrintColor);
                arlParms[5] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                arlParms[6] = new SqlParameter("@LabBillId", CompanyModel.LabBillId);
                arlParms[7] = new SqlParameter("@IPBillId", CompanyModel.IPBillId);
                arlParms[8] = new SqlParameter("@DischargePrintId", CompanyModel.DischargePrintId);
                return SQLHelper.ExecuteDataset("CompanyPrintInsertandUpdate", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        

        public DataSet BillSeriesInsertandUpdate(BillSeriesModel BillSeriesModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[10];
                arlParms[0] = new SqlParameter("@Id", BillSeriesModel.id);
                arlParms[1] = new SqlParameter("@BillDescription", BillSeriesModel.BillDescription);
                arlParms[2] = new SqlParameter("@BillType", BillSeriesModel.BillType);
                arlParms[3] = new SqlParameter("@Prefix", BillSeriesModel.Prefix);
                arlParms[4] = new SqlParameter("@Terms", BillSeriesModel.Terms);
                arlParms[5] = new SqlParameter("@StartingNum", BillSeriesModel.StartingNo);
                arlParms[6] = new SqlParameter("@CurrentNum", BillSeriesModel.CurrentNo);
                arlParms[7] = new SqlParameter("@DeptId", BillSeriesModel.DeptId);
                arlParms[8] = new SqlParameter("@DeleteFlag", BillSeriesModel.DeleteFlag);
                arlParms[9] = new SqlParameter("@TP", BillSeriesModel.TP);
                return SQLHelper.ExecuteDataset("BillSeriesInsertandUpdate", dbName, arlParms);

            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet BSeriesGetandGets(BillSeriesModel BillSeriesModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[2];
                arlParms[0] = new SqlParameter("@Id", BillSeriesModel.id);
                arlParms[1] = new SqlParameter("@Type", BillSeriesModel.BillType);
                return SQLHelper.ExecuteDataset("BSeriesGetandGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet CompanyItemSlNoGetandGets(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@deptid", CompanyModel.DeptId);
                return SQLHelper.ExecuteDataset("GetCompanyItemSlNo", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CompanyItemSlNoGetandGetsNew(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@deptid", CompanyModel.DeptId);
                return SQLHelper.ExecuteDataset("HMS_GetCompanyItemSlNo", dbName, arlParms); 

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet GetCashAccount(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@deptid", CompanyModel.DeptId);
                return SQLHelper.ExecuteDataset("GetCashAccount", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CashAccountGets(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                return SQLHelper.ExecuteDataset("CashAccountGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet HMS_CompanyDetailsInsertandUpdate4(CompanyModel CompanyModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[6];
                arlParms[0] = new SqlParameter("@CompanyId", CompanyModel.CompanyId);
                arlParms[1] = new SqlParameter("@DeptId", CompanyModel.DeptId);
                arlParms[2] = new SqlParameter("@LabAccount", CompanyModel.LabAccount);
                arlParms[3] = new SqlParameter("@RevisitNo", CompanyModel.RevisitNo); 
                arlParms[4] = new SqlParameter("@IPNo", CompanyModel.IPNo); 
                arlParms[5] = new SqlParameter("@BillNo", CompanyModel.BillNo); 
                
                return SQLHelper.ExecuteDataset("HMS_CompanyDetailsInsertandUpdate4", dbName, arlParms); 

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
    }
}