//20/09/2018

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP
{
    public class CompanyModel
    {
        public string CessType { get; set; }
        public string EODType { get; set; }
        public long SalesBillSeries { get; set; }
        public string CurDate { get; set; }
        public long AccId { get; set; }
        public long CmpnyId { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Email   { get; set; }
        public string Fax  { get; set; }
        public string PeriodFrom { get; set; }
        public string PeriodTo { get; set; }
        public string ProtectionDate { get; set; }
        public string CurrencyId { get; set; }
        public decimal Decimals { get; set; }
        public string TRNNo { get; set; }
        public string EODDate { get; set; }
        public string Area { get; set; }
        public long BusinessTypeId { get; set; }
        public string BusinessType { get; set; }

        public string BankName { get; set; }
        public string AccountNo { get; set; }
        public string IBANNo { get; set; }
        public string SwiftCode { get; set; }
        public string PurchaseSlnoType { get; set; }
        public string MRVType { get; set; }
        public string AutoLocationTransfer { get; set; }
        public string PurchaseOrderApproval { get; set; }
        public string WorkAfterSales { get; set; }
        public string PrintColor { get; set; }
        

        public long CompanyId { get; set; }
        public long DeptId2 { get; set; }
        public string CustomerId { get; set; }
        public string SupplierId { get; set; }
        public string PDCR { get; set; }
        public string PDCI { get; set; }
        public string Cash { get; set; }
        public string BankId { get; set; }
        public string Expenses { get; set; }

        public long DeptId3 { get; set; }
        public long GICash { get; set; }
        public long PDCReceived { get; set; }
        public long PControlAC { get; set; }
        public long GIBank { get; set; }
        public long PDCIssued { get; set; }
        public long COGSAC { get; set; }
        public long CashSale { get; set; }
        public long PurcahseImport { get; set; }
        public long DiscountAC { get; set; }
        public long CreditSale { get; set; }
        public long PurchaseLocal { get; set; }
        public long CashCust { get; set; }
        public long SReturnAC { get; set; }
        public long OtherCost { get; set; }
        public long Roundoff { get; set; }
        public long VCCAccount { get; set; }
        public long PettyCashAccount { get; set; }
        public long LocationTransferAccount { get; set; }


        public long PReturnAC { get; set; }
        public long ChequeAC { get; set; }
        public long CreditCard { get; set; }
        public long StockInHand { get; set; }
        public long SalPayableAC { get; set; }
        public long STrOutDr { get; set; }
        public long STrOutCr { get; set; }
        public long STrInDr { get; set; }
        public long STrInCr { get; set; }
        public long StockControlAC { get; set; }

        public long DeptId { get; set; }
        public long SalesOrder { get; set; }
        public long Quot { get; set; }
        public long CENQ { get; set; }
        public long PurchaseNum { get; set; }
        public long BatchaSlno { get; set; }
        public long PurchaseEnquiry { get; set; }
        public long PurchOrder { get; set; }
        public long MRVNUM { get; set; }
        public long SRNo { get; set; }
        public long PRNo { get; set; }
        public long ProductionNum { get; set; }
        public long StockTransferIn { get; set; }
        public long StockTransferOut { get; set; }
        public long MI { get; set; }
        public long MReceived { get; set; }
        public long MRequistion { get; set; }
        public long JV { get; set; }
        public long RV { get; set; }
        public long PV { get; set; }
        public long DV { get; set; }
        public long CV { get; set; }
        public long CNV { get; set; }
        public long DNV { get; set; }
        public long ChequeTransfer { get; set; }
        public long TV { get; set; }
        public long AV { get; set; }
        public long OP { get; set; }
        public long IONo { get; set; }
        public long SNNo { get; set; }
        public long IINo { get; set; }
        public long CBNo { get; set; }
        public long PNNo { get; set; }
        public long DeliveryOrder { get; set; }
        public long PC { get; set; }
        public long PKL { get; set; }
        public long MRVPurchase { get; set; }
        public long PVTNo { get; set; }
        public long StockAdjNo { get; set; }
        public long PurchaseImportNo { get; set; }
        public long ContainerImportNo { get; set; }
        public long BOQNo { get; set; }
        public long OpenStockEntryNo { get; set; }
        public long LocationTransferNo { get; set; }
        public long PackingHistoryNo { get; set; }
        public long ElectronicsProductionNo { get; set; }
        public long ContraNo { get; set; }
        public long CashCollectionNo { get; set; }
        public long PettyCashPrint { get; set; }
        public long PurchasePerforma { get; set; }
        public long DailyTnNo { get; set; }
        public long ContractNo { get; set; }
        public long ToolsManagementNo { get; set; }
        public long ProjectMaterialReturnNo { get; set; }
        public long PackingListNo { get; set; }

        public long SalesAccount { get; set; }
        public long PurchaseAccount { get; set; }
        public long SalesReturnAccount { get; set; }
        public long PurchaseReturnAccount { get; set; }
        public long ExpenseAccount { get; set; }
        public long ImportPurchaseAccount { get; set; }
        public long ExportSalesTax { get; set; }

        public long Delivery { get; set; }
        public long Shipping { get; set; }
        public long DealerFee { get; set; }
        public long StorageFee { get; set; }
        public long LoadingFee { get; set; }
        public long LateFee { get; set; }
        public long Insurance { get; set; }
        public long AdditionalService { get; set; }
        public long OtherCost1 { get; set; }
        public long OtherCost2 { get; set; }
        public long OtherCost3 { get; set; }
        public long OtherCost4 { get; set; }

        public string AccDesc { get; set; }

        public string Status { get; set; }
        public int DelFlag { get; set; }

        public string OTP { get; set; }
        public long Id { get; set; }
        public long DepartmentId { get; set; }
        public string ActivationCode { get; set; }
        public string ValidationKey { get; set; }

        public int PostingAllow { get; set; }
        public string PostingAllowCmpny { get; set; }
        
        public string Days { get; set; }


        public string DCompanyName { get; set; }
        public string DAddress { get; set; }
        public string DPhoneNo { get; set; }
        public string DEmail { get; set; }
        public string DFax { get; set; }
        public string DTRNNo { get; set; }

        public int PrintId { get; set; }
        public int SalesPrintId { get; set; }
        public int SalesReturnPrintId { get; set; }
        public int VoucherPrintId { get; set; }
        public int QuotationPrintId { get; set; }
        public string BillType { get; set; }
        public string PrintType { get; set; }
        public string PrintFormat { get; set; }
        public string SalesPrint { get; set; }
        public string SalesReturnPrint { get; set; }
        public string VoucherPrint { get; set; }
        public string QuotationPrint { get; set; }
        public string LabBillPrint { get; set; } 
        public long LabAccount { get; set; }     
        public long RevisitNo { get; set; }
        public long IPNo { get; set; }
        public long BillNo { get; set; } 
        public string Extended { get; set; }
        public int LabBillId { get; set; }
        public string IPBillPrint { get; set; }
        public int IPBillId { get; set; }
        public string DischargePrint { get; set; } 
        public int DischargePrintId { get; set; }
        public string TaxType { get; set; }
        public string IPTaxZero { get; set; }

        public string Validtill { get; set; }
        public string ExpireNotification { get; set; }
        public string RemainingDays { get; set; }

        DCompany oDCompany = new DCompany();
        DMasters oDMasters = new DMasters();

        public DataSet ComPanyDetailsGetandGets(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.ComPanyDetailsGetandGets(oCompanyModel, dbName);
        }
        public DataSet PrintTypeGets(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.PrintTypeGets(oCompanyModel, dbName);
        }
        public DataSet CompanyPrintInsertandUpdate(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyPrintInsertandUpdate(oCompanyModel, dbName);
        }
        public DataSet CompanyItemSlNoGetandGetsNew(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyItemSlNoGetandGetsNew(oCompanyModel, dbName);
        }
        public DataSet HMS_CompanyDetailsInsertandUpdate4(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.HMS_CompanyDetailsInsertandUpdate4(oCompanyModel, dbName); 
        }

        public DataSet BusinessTypeGetandGets(CompanyModel oCompanyModel, string dbName)
        {
            return oDMasters.BusinessTypeGetandGets(oCompanyModel, dbName);
        }
        public DataSet CompanyDetailsInsertandUpdate(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyDetailsInsertandUpdate(oCompanyModel, dbName);
        }
        public DataSet CompanyDetailsInsertandUpdate2(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyDetailsInsertandUpdate2(oCompanyModel, dbName);
        }
        public DataSet CompanyDetailsInsertandUpdate3(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyDetailsInsertandUpdate3(oCompanyModel, dbName);
        }
        public DataSet CompanyDetailsInsertandUpdate4(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyDetailsInsertandUpdate4(oCompanyModel, dbName);
        }
        public DataSet CompanyDetailsInsertandUpdate5(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyDetailsInsertandUpdate5(oCompanyModel, dbName);
        }
        public DataSet CompanyDetailsInsertandUpdate6(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyDetailsInsertandUpdate6(oCompanyModel, dbName);
        }
        public DataSet CompanyDetailsInsertandUpdate9(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyDetailsInsertandUpdate9(oCompanyModel, dbName);
        }
        public DataSet CompanyItemSlNoGetandGets(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CompanyItemSlNoGetandGets(oCompanyModel, dbName);
        }
        public DataSet GetCashAccount(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.GetCashAccount(oCompanyModel, dbName);
        }
        public DataSet CashAccountGets(CompanyModel oCompanyModel, string dbName)
        {
            return oDCompany.CashAccountGets(oCompanyModel, dbName);
        }
        

        public static DataSet CompanyDetailGet(CompanyModel oUserLogin, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"

declare @t table (i uniqueidentifier default newsequentialid(),  m as cast(i as char(36)))
insert into @t default values;

DECLARE @SYSID VARCHAR(100);DECLARE  @Validtill VARCHAR(100);

SELECT @SYSID=substring(m,25,2) + '-' + substring(m,27,2) + '-' + substring(m,29,2) + '-' + substring(m,31,2) + '-' + substring(m,33,2) + '-' +  substring(m,35,2) FROM @t
SELECT TOP 1 @Validtill=CONVERT(VARCHAR(MAX),DECRYPTBYPASSPHRASE('" + KeyValues.DecryptKey+ "', valid )) FROM Settings_Company WHERE DelFlag=1"+

" SELECT TOP 1 ISNULL(CessType,0)CessType,a.*,CASE WHEN EODType='EOD' THEN EODDate ELSE convert(varchar(50),GETDATE(),103) END AS 'CurDate',SI.PrintFormat AS 'SalesPrint',SR.PrintFormat AS 'SalesReturnPrint',VO.PrintFormat AS 'VoucherPrint',LB.PrintFormat AS 'LabBillPrint',QU.PrintFormat AS 'QuotationPrint',IB.PrintFormat AS 'IPBillPrint',a.TaxType,a.IPTaxZero ,DS.PrintFormat AS 'DischargePrint'" +
" ,CASE WHEN DATEDIFF(DAY,CONVERT(DATETIME, CONVERT(DATE,GETDATE()), 103),CONVERT(DATETIME, @Validtill,103)) <= ISNULL(ExpireNotification,0) THEN 1 ELSE 0 END AS ExpireNotification " +
 " ,DATEDIFF(DAY,CONVERT(DATETIME, CONVERT(DATE,GETDATE()), 103),CONVERT(DATETIME, @Validtill,103)) AS RemainingDays" +
 " ,@Validtill AS Validtill " +
" FROM  Settings_Company a " +
" LEFT OUTER JOIN Settings_Print_Types SI ON SI.PrintId=A.SalesPrintId "+
" LEFT OUTER JOIN Settings_Print_Types SR ON SR.PrintId = A.SalesReturnPrintId "+
" LEFT OUTER JOIN Settings_Print_Types VO ON VO.PrintId = A.VoucherPrintId "+
" LEFT OUTER JOIN Settings_Print_Types QU ON QU.PrintId=A.QuotationPrintId "+
" LEFT OUTER JOIN Settings_Print_Types LB ON LB.PrintId=A.LabBillId " +
" LEFT OUTER JOIN Settings_Print_Types IB ON IB.PrintId=A.IPBillId " +
" LEFT OUTER JOIN Settings_Print_Types DS ON DS.PrintId=A.DischargePrintId " +
 " WHERE a.DelFlag = 1 " +
 " AND CONVERT(DATETIME, @Validtill,103) >= CONVERT(DATETIME, CONVERT(DATE,GETDATE()), 103) ";
                return SQLHelper.ExecuteDatasetSQL(Query, dbName);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }
        public static DataSet ComapnyExpiryUpdate(CompanyModel CompanyModel, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"
DECLARE @CCLEN INT=0,@VALIDKEY VARCHAR(20);
DECLARE @RANDOMKEY1 VARCHAR(3),@RANDOMKEY2 VARCHAR(3),@RANDOMKEY3 INT,@RANDOMKEY4 INT


IF (SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='Z')SET @RANDOMKEY1='0';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='Y')SET @RANDOMKEY1='1';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='X')SET @RANDOMKEY1='2';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='W')SET @RANDOMKEY1='3';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='V')SET @RANDOMKEY1='4';
ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='U')SET @RANDOMKEY1='5';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='T')SET @RANDOMKEY1='6';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='S')SET @RANDOMKEY1='7';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='R')SET @RANDOMKEY1='8';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),1,1)='Q')SET @RANDOMKEY1='9';

IF (SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='Z')SET @RANDOMKEY1=@RANDOMKEY1+'0';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='Y')SET @RANDOMKEY1=@RANDOMKEY1+'1';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='X')SET @RANDOMKEY1=@RANDOMKEY1+'2';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='W')SET @RANDOMKEY1=@RANDOMKEY1+'3';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='V')SET @RANDOMKEY1=@RANDOMKEY1+'4';
ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='U')SET @RANDOMKEY1=@RANDOMKEY1+'5';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='T')SET @RANDOMKEY1=@RANDOMKEY1+'6';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='S')SET @RANDOMKEY1=@RANDOMKEY1+'7';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='R')SET @RANDOMKEY1=@RANDOMKEY1+'8';ELSE IF(SUBSTRING(SUBSTRING(@DD, 17, 2),2,1)='Q')SET @RANDOMKEY1=@RANDOMKEY1+'9';

IF (SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='Z')SET @RANDOMKEY2='0';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='Y')SET @RANDOMKEY2='1';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='X')SET @RANDOMKEY2='2';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='W')SET @RANDOMKEY2='3';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='V')SET @RANDOMKEY2='4';
ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='U')SET @RANDOMKEY2='5';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='T')SET @RANDOMKEY2='6';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='S')SET @RANDOMKEY2='7';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='R')SET @RANDOMKEY2='8';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),1,1)='Q')SET @RANDOMKEY2='9';

IF (SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='Z')SET @RANDOMKEY2=@RANDOMKEY2+'0';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='Y')SET @RANDOMKEY2=@RANDOMKEY2+'1';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='X')SET @RANDOMKEY2=@RANDOMKEY2+'2';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='W')SET @RANDOMKEY2=@RANDOMKEY2+'3';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='V')SET @RANDOMKEY2=@RANDOMKEY2+'4';
ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='U')SET @RANDOMKEY2=@RANDOMKEY2+'5';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='T')SET @RANDOMKEY2=@RANDOMKEY2+'6';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='S')SET @RANDOMKEY2=@RANDOMKEY2+'7';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='R')SET @RANDOMKEY2=@RANDOMKEY2+'8';ELSE IF(SUBSTRING(SUBSTRING(@DD, 1, 2),2,1)='Q')SET @RANDOMKEY2=@RANDOMKEY2+'9';

IF (SUBSTRING(@DD, 6, 1)='Z')SET @RANDOMKEY3='0';ELSE IF(SUBSTRING(@DD, 6, 1)='Y')SET @RANDOMKEY3='1';ELSE IF(SUBSTRING(@DD, 6, 1)='X')SET @RANDOMKEY3='2';ELSE IF(SUBSTRING(@DD, 6, 1)='W')SET @RANDOMKEY3='3';ELSE IF(SUBSTRING(@DD, 6, 1)='V')SET @RANDOMKEY3='4';
ELSE IF(SUBSTRING(@DD, 6, 1)='U')SET @RANDOMKEY3='5';ELSE IF(SUBSTRING(@DD, 6, 1)='T')SET @RANDOMKEY3='6';ELSE IF(SUBSTRING(@DD, 6, 1)='S')SET @RANDOMKEY3='7';ELSE IF(SUBSTRING(@DD, 6, 1)='R')SET @RANDOMKEY3='8';ELSE IF(SUBSTRING(@DD, 6, 1)='Q')SET @RANDOMKEY3='9';

IF (SUBSTRING(@DD, 11, 1)='Z')SET @RANDOMKEY4='0';ELSE IF(SUBSTRING(@DD, 11, 1)='Y')SET @RANDOMKEY4='1';ELSE IF(SUBSTRING(@DD, 11, 1)='X')SET @RANDOMKEY4='2';ELSE IF(SUBSTRING(@DD, 11, 1)='W')SET @RANDOMKEY4='3';ELSE IF(SUBSTRING(@DD, 11, 1)='V')SET @RANDOMKEY4='4';
ELSE IF(SUBSTRING(@DD, 11, 1)='U')SET @RANDOMKEY4='5';ELSE IF(SUBSTRING(@DD, 11, 1)='T')SET @RANDOMKEY4='6';ELSE IF(SUBSTRING(@DD, 11, 1)='S')SET @RANDOMKEY4='7';ELSE IF(SUBSTRING(@DD, 11, 1)='R')SET @RANDOMKEY4='8';ELSE IF(SUBSTRING(@DD, 11, 1)='Q')SET @RANDOMKEY4='9';


SELECT TOP 1 @VALIDKEY= RIGHT (ValKey,6) FROM Settings_Company WHERE DelFlag=1

SELECT TOP 1 @CCLEN=LEN(CompanyCode) FROM Settings_Company WHERE DelFlag=1


IF(LEN(@DD)=19)
BEGIN


IF(SUBSTRING(@DD, 5, 1)='-' AND SUBSTRING(@DD, 10, 1)='-' AND SUBSTRING(@DD, 15, 1)='-' AND SUBSTRING(@DD, 16, 1)=(SELECT TOP 1 SUBSTRING(CompanyCode, 1, 1) FROM Settings_Company WHERE DelFlag=1)
AND SUBSTRING(@DD, 19, 1)=(SELECT TOP 1 SUBSTRING(CompanyCode, @CCLEN, 1) FROM Settings_Company WHERE DelFlag=1 AND @RANDOMKEY1=(SELECT  SUBSTRING(@VALIDKEY, 5, 2)) 
AND @RANDOMKEY2=(SELECT  SUBSTRING(@VALIDKEY, 3, 2)) AND @RANDOMKEY3=(SELECT  SUBSTRING(@VALIDKEY, 1, 1)) AND @RANDOMKEY4=(SELECT  SUBSTRING(@VALIDKEY, 2, 1))
))

BEGIN
DECLARE @STRING1 VARCHAR(10),@STRING2 VARCHAR(10),@STRING3 VARCHAR(10),@KEY1 VARCHAR(2),@KEY2 VARCHAR(2),@KEY3 VARCHAR(2),@KEY VARCHAR(5),@KEYINT INT

SELECT @STRING1=SUBSTRING(@DD, 1, 4) ,@STRING2=SUBSTRING(@DD, 6, 4),@STRING3=SUBSTRING(@DD, 11, 4)


IF(LEN(@STRING1)=4 AND LEN(@STRING2)=4 AND LEN(@STRING3)=4)
BEGIN
SELECT @KEY1=SUBSTRING(@STRING1, 3, 1) ,@KEY2=SUBSTRING(@STRING2, 3, 1),@KEY3=SUBSTRING(@STRING3, 3, 1)

IF (@KEY1='Z')SET @KEY='0';ELSE IF(@KEY1='Y')SET @KEY='1';ELSE IF(@KEY1='X')SET @KEY='2';ELSE IF(@KEY1='W')SET @KEY='3';ELSE IF(@KEY1='V')SET @KEY='4';
ELSE IF(@KEY1='U')SET @KEY='5';ELSE IF(@KEY1='T')SET @KEY='6';ELSE IF(@KEY1='S')SET @KEY='7';ELSE IF(@KEY1='R')SET @KEY='8';ELSE IF(@KEY1='Q')SET @KEY='9'

IF (@KEY2='Z')SET @KEY=@KEY+'0';ELSE IF(@KEY2='Y')SET @KEY=@KEY+'1';ELSE IF(@KEY2='X')SET @KEY=@KEY+'2';ELSE IF(@KEY2='W')SET @KEY=@KEY+'3';ELSE IF(@KEY2='V')SET @KEY=@KEY+'4';
ELSE IF(@KEY2='U')SET @KEY=@KEY+'5';ELSE IF(@KEY2='T')SET @KEY=@KEY+'6';ELSE IF(@KEY2='S')SET @KEY=@KEY+'7';ELSE IF(@KEY2='R')SET @KEY=@KEY+'8';ELSE IF(@KEY2='Q')SET @KEY=@KEY+'9'

IF (@KEY3='Z')SET @KEY=@KEY+'0';ELSE IF(@KEY3='Y')SET @KEY=@KEY+'1';ELSE IF(@KEY3='X')SET @KEY=@KEY+'2';ELSE IF(@KEY3='W')SET @KEY=@KEY+'3';ELSE IF(@KEY3='V')SET @KEY=@KEY+'4';
ELSE IF(@KEY3='U')SET @KEY=@KEY+'5';ELSE IF(@KEY3='T')SET @KEY=@KEY+'6';ELSE IF(@KEY3='S')SET @KEY=@KEY+'7';ELSE IF(@KEY3='R')SET @KEY=@KEY+'8';ELSE IF(@KEY3='Q')SET @KEY=@KEY+'9'

SELECT @KEYINT=CONVERT(INTEGER,@KEY)

DECLARE  @VALID VARCHAR(100),@VALIDTILL VARCHAR(100);DECLARE @SYSID VARCHAR(100);

declare @t table (i uniqueidentifier default newsequentialid(),  m as cast(i as char(36)))
insert into @t default values;

SELECT @SYSID=substring(m,25,2) + '-' + substring(m,27,2) + '-' + substring(m,29,2) + '-' + substring(m,31,2) + '-' + substring(m,33,2) + '-' +  substring(m,35,2) FROM @t


SELECT TOP 1 @VALID=CONVERT(VARCHAR(MAX),DECRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', valid )) FROM Settings_Company WHERE DelFlag=1"+

" SELECT @VALIDTILL=CONVERT(VARCHAR(100),DATEADD(DAY, @KEYINT, GETDATE()),103);" +

" UPDATE Settings_Company SET Valid=ENCRYPTBYPASSPHRASE('"+ KeyValues.DecryptKey+ "', @VALIDTILL),SystemID=ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', @SYSID ),Extended=ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', '0' )" +

" SELECT 1'Status'"+

" END ELSE BEGIN SELECT 0'Status' END END ELSE BEGIN SELECT 0'Status' END END ELSE BEGIN SELECT 0'Status' END";
                var arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@DD", SqlDbType.VarChar) { Value = CompanyModel.ActivationCode };

                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }

        public static DataSet ExtendExpiry(CompanyModel CompanyModel, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"
                 DECLARE @EX VARCHAR(10)
                 SELECT @EX=ISNULL(CONVERT(VARCHAR(100),DECRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', Extended )),0) FROM Settings_Company" +

                " IF(@EX='0' OR @EX='1')" +
                " BEGIN" +

                " DECLARE  @VALIDTILL VARCHAR(100);DECLARE @SYSID VARCHAR(100);" +

                " DECLARE @t TABLE (i UNIQUEIDENTIFIER DEFAULT NEWSEQUENTIALID(),  m AS CAST(i AS CHAR(36)))" +
                " INSERT INTO @t DEFAULT VALUES;" +

                " SELECT @SYSID=SUBSTRING(m,25,2) + '-' + SUBSTRING(m,27,2) + '-' + SUBSTRING(m,29,2) + '-' + SUBSTRING(m,31,2) + '-' + SUBSTRING(m,33,2) + '-' +  SUBSTRING(m,35,2) FROM @t" +

                " SELECT @VALIDTILL=CONVERT(VARCHAR(100),DATEADD(DAY, 15, GETDATE()),103);" +

                " IF(@EX='0')" +
                " BEGIN" +
                " UPDATE Settings_Company SET Valid=ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', @VALIDTILL)" +
                " ,SystemID=ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', @SYSID ),Extended=ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', '1' )" +
                " END" +
                " ELSE" +
                " BEGIN" +
                " UPDATE Settings_Company SET Valid=ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', @VALIDTILL)" +
                " ,SystemID=ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', @SYSID ),Extended=ENCRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', '2' )" +
                " END" +

                " SELECT 1 'Status',@VALIDTILL 'ValidTill'" +
                " END" +
                " ELSE" +
                " BEGIN" +
                " SELECT 0 'Status','' 'ValidTill'" +

                " END";
                var arlParms = new SqlParameter[0];

                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }

        public static DataSet GetCompanyCode(CompanyModel oUserLogin, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"UPDATE Settings_Company SET Valkey=DATEDIFF(SECOND, CONVERT(date, GETDATE()), GETDATE())*299 WHERE DelFlag=1;
                                    DECLARE  @VALID VARCHAR(100)
                                    SELECT TOP 1 @VALID=CONVERT(VARCHAR(MAX),DECRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', valid )) FROM Settings_Company WHERE DelFlag=1"+
                                    " SELECT TOP 1 CompanyCode,Valkey,DATEDIFF(DAY,GETDATE(), CONVERT(DATETIME,@VALID,103)) AS [Days]  ,ISNULL(CONVERT(VARCHAR(MAX),DECRYPTBYPASSPHRASE('" + KeyValues.DecryptKey + "', Extended )),0) AS Extended FROM Settings_Company WHERE DelFlag=1";

                return SQLHelper.ExecuteDatasetSQL(Query, dbName);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }
        public static DataSet CheckEODDate(CompanyModel CompanyModel, string dbName)
        {
            
            try
            {
                string Query = @"
                                IF((SELECT TOP 1 EODTYPE FROM Settings_Company)='EOD')
                                BEGIN
	                                IF((SELECT TOP 1 EODDate FROM Settings_Company)=@CurDate)
	                                SELECT 1 'Status',(SELECT TOP 1 EODDate FROM Settings_Company) 'CurDate'
	                                ELSE
	                                SELECT 2 'Status',(SELECT TOP 1 EODDate FROM Settings_Company) 'CurDate'
                                END
                                ELSE
                                SELECT 0 'Status',CONVERT(VARCHAR(30),GETDATE(),103) 'CurDate'
                                ";

                var arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CurDate", SqlDbType.VarChar) { Value = CompanyModel.CurDate };

                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }

    }
}