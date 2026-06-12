using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Configuration;
using System.IO;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Mail;

namespace EUMI_ERP.Controllers
{
    public class CompanyController : Controller
    {

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();


        public ActionResult CompanyDetails()
        {
            return View();
        }



        [HttpPost]
        public ActionResult Companysentmail(BillSeriesModel BillSeriesModel)
        {

            string Sentermail = ConfigurationManager.AppSettings["Smail"].ToString();
            string senterpwd = ConfigurationManager.AppSettings["Spwd"].ToString();
            string Recevermail = BillSeriesModel.BillType; //ConfigurationManager.AppSettings["Recmail"].ToString();
            string Fpath = ConfigurationManager.AppSettings["Fpath"].ToString();
            string FileP = Fpath + (BillSeriesModel.BillDescription).Replace('\r', ' ').Replace('\n', ' ');
            List<BillSeriesModel> oList = new List<BillSeriesModel>();
            try
            {

                MailMessage msg = new MailMessage();
                msg.From = new MailAddress(Sentermail);
                msg.To.Add(Recevermail);
                msg.Subject = BillSeriesModel.Prefix.Replace('\r', ' ').Replace('\n', ' ');
                msg.Body = BillSeriesModel.Prefix;
                msg.Priority = MailPriority.High;
                // msg.Attachments.Add(new Attachment("C:\\file.txt"));

                msg.Attachments.Add(new Attachment(FileP));


                using (SmtpClient client = new SmtpClient())
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(Sentermail, senterpwd);
                    client.Host = "smtp.gmail.com";
                    client.Port = 587;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.Send(msg);
                }
                //Attachment attachment = new Attachment(FileP);
                //attachment.Dispose(); //disposing the Attachment object
                //System.IO.File.Delete(FileP);
                BillSeriesModel BModels = new BillSeriesModel();
                BModels.BillDescription = "Your mail has been sent successfuly !";
                oList.Add(BModels);
            }
            catch (Exception ex)
            {
                BillSeriesModel BModels = new BillSeriesModel();
                BModels.BillDescription = "Unable to send email. Error : " + ex;
                oList.Add(BModels);

            }


            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult BillSeriesInsertandUpdate(BillSeriesModel BillSeriesModel)
        {
            BillSeriesModel obj = new BillSeriesModel();
            List<BillSeriesModel> oList = new List<BillSeriesModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BillSeriesInsertandUpdate(BillSeriesModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillSeriesModel BModels = new BillSeriesModel();
                    BModels.Status = row["Status"].ToString();
                    BModels.id = Convert.ToInt32(row["id"].ToString());
                    oList.Add(BModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult BSeriesGetandGets(BillSeriesModel BillSeriesModel)
        {
            BillSeriesModel obj = new BillSeriesModel();

            List<BillSeriesModel> oList = new List<BillSeriesModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.BSeriesGetandGets(BillSeriesModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    BillSeriesModel MModels = new BillSeriesModel();
                    MModels.id = Convert.ToInt32(row["id"].ToString());
                    MModels.BillDescription = row["BillDescription"].ToString();
                    MModels.BillType = row["BillType"].ToString();
                    MModels.Prefix = row["Prefix"].ToString();
                    MModels.Terms = row["Terms"].ToString();
                    MModels.StartingNo = row["StartingNo"].ToString();
                    MModels.CurrentNo = row["CurrentNo"].ToString();
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.Dept = row["DepartmentName"].ToString();
                    MModels.PayTerms = row["Term"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CompanyDetailsInsertandUpdate(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyDetailsInsertandUpdate(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.CmpnyId = Convert.ToInt32(row["CmpnyId"].ToString());
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CompanyDetailsInsertandUpdate2(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyDetailsInsertandUpdate2(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.CompanyId = Convert.ToInt32(row["CompanyId"].ToString());
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CompanyDetailsInsertandUpdate3(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyDetailsInsertandUpdate3(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.CompanyId = Convert.ToInt32(row["CompanyId"].ToString());
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CompanyDetailsInsertandUpdate4(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyDetailsInsertandUpdate4(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.CompanyId = Convert.ToInt32(row["CompanyId"].ToString());
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult CompanyDetailsInsertandUpdate5(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyDetailsInsertandUpdate5(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.CompanyId = Convert.ToInt32(row["CompanyId"].ToString());
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult CompanyDetailsInsertandUpdate6(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyDetailsInsertandUpdate6(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.CompanyId = Convert.ToInt32(row["CompanyId"].ToString());
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CompanyDetailsInsertandUpdate9(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyDetailsInsertandUpdate9(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.CompanyId = Convert.ToInt32(row["CompanyId"].ToString());
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CompanyDetailsGetandGets(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();

            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ComPanyDetailsGetandGets(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.CmpnyId = Convert.ToInt32(row["CmpnyId"].ToString());
                    CModels.CompanyCode = row["CompanyCode"].ToString();
                    CModels.CompanyName = row["CompanyName"].ToString();
                    CModels.Address = row["Address"].ToString();
                    CModels.PhoneNo = row["PhoneNo"].ToString();
                    CModels.Email = row["Email"].ToString();
                    CModels.Fax = row["Fax"].ToString();
                    CModels.PeriodFrom = row["PeriodFrom"].ToString();
                    CModels.PeriodTo = row["PeriodTo"].ToString();
                    CModels.ProtectionDate = row["ProtectionDate"].ToString();
                    CModels.CurrencyId = row["CurrencyId"].ToString();
                    CModels.Decimals = Convert.ToDecimal(row["Decimal"].ToString());
                    CModels.TRNNo = row["TRNNo"].ToString();
                    CModels.Area = row["Area"].ToString();
                    CModels.EODDate = row["EODDate"].ToString();
                    CModels.BusinessType = row["BusinessType"].ToString();
                    CModels.BankName = row["BankName"].ToString();
                    CModels.AccountNo = row["AccountNo"].ToString();
                    CModels.IBANNo = row["IBANNo"].ToString();
                    CModels.SwiftCode = row["SwiftCode"].ToString();
                    CModels.PurchaseSlnoType = row["PurchaseSlnoType"].ToString();
                    CModels.MRVType = row["MRVTYPE"].ToString();
                    CModels.PostingAllowCmpny = row["PostingAllow"].ToString();
                    CModels.AutoLocationTransfer = row["AutoLocTransfer"].ToString();
                    CModels.PurchaseOrderApproval = row["PurchaseOrderApproval"].ToString();
                    CModels.WorkAfterSales = row["WorkAfterSales"].ToString();
                    CModels.PrintColor = row["PrintColor"].ToString();
                    CModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString()); 
                    CModels.SalesBillSeries = Convert.ToInt32(row["SalesBillSeries"].ToString());
                    CModels.TaxType = row["TaxType"].ToString();
                    CModels.IPTaxZero = row["IPTaxZero"].ToString(); 
                    oList.Add(CModels);
                    
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult PrintTypeGets(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();

            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.PrintTypeGets(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.PrintId = Convert.ToInt32(row["PrintId"].ToString());
                    CModels.BillType = row["BillType"].ToString();
                    CModels.PrintType = row["PrintType"].ToString();
                    CModels.PrintFormat = row["PrintFormat"].ToString();
                    CModels.SalesPrintId = Convert.ToInt32(row["SalesPrintId"].ToString());
                    oList.Add(CModels);

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CompanyPrintInsertandUpdate(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyPrintInsertandUpdate(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.Status = row["Status"].ToString();
                   
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CompanyItemSlNoGetandGets(CompanyModel CompanyModel)

        {
            CompanyModel obj = new CompanyModel();

            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyItemSlNoGetandGets(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    CModels.SalesOrder = Convert.ToInt32(row["OrderNo"].ToString());
                    CModels.Quot = Convert.ToInt32(row["QuotationNo"].ToString());
                    CModels.CENQ = Convert.ToInt32(row["EnquiryNo"].ToString());
                    CModels.PurchaseNum = Convert.ToInt32(row["PurSlno"].ToString());
                    CModels.BatchaSlno = Convert.ToInt32(row["BatchSlNo"].ToString());
                    CModels.PurchaseEnquiry = Convert.ToInt32(row["PE_EnquiryNo"].ToString());
                    CModels.PurchOrder = Convert.ToInt32(row["PO_OrderNo"].ToString());
                    CModels.MRVNUM = Convert.ToInt32(row["MRVNUM"].ToString());
                    CModels.SRNo = Convert.ToInt32(row["SRNo"].ToString());
                    CModels.PRNo = Convert.ToInt32(row["PRNo"].ToString());
                    CModels.ProductionNum = Convert.ToInt32(row["ProdEntryNo"].ToString());
                    CModels.StockTransferIn = Convert.ToInt32(row["StockInNo"].ToString());
                    CModels.StockTransferOut = Convert.ToInt32(row["StockOutNo"].ToString());
                    CModels.MI = Convert.ToInt32(row["MI"].ToString());
                    CModels.MReceived = Convert.ToInt32(row["MReceived"].ToString());
                    CModels.MRequistion = Convert.ToInt32(row["MRequistion"].ToString());
                    CModels.JV = Convert.ToInt32(row["VoucherNo"].ToString());
                    CModels.RV = Convert.ToInt32(row["ReceiptVNo"].ToString());
                    CModels.PV = Convert.ToInt32(row["PaymentVNo"].ToString());
                    CModels.DV = Convert.ToInt32(row["DV"].ToString());
                    CModels.CV = Convert.ToInt32(row["CV"].ToString());
                    CModels.CNV = Convert.ToInt32(row["CNNo"].ToString());
                    CModels.DNV = Convert.ToInt32(row["DNNo"].ToString());
                    CModels.ChequeTransfer = Convert.ToInt32(row["ChequeTransfer"].ToString());
                    CModels.TV = Convert.ToInt32(row["TVNo"].ToString());
                    CModels.AV = Convert.ToInt32(row["AVNo"].ToString());
                    CModels.OP = Convert.ToInt32(row["OPNo"].ToString());
                    CModels.IONo = Convert.ToInt32(row["IONo"].ToString());
                    CModels.SNNo = Convert.ToInt32(row["SNNo"].ToString());
                    CModels.IINo = Convert.ToInt32(row["IINo"].ToString());
                    CModels.CBNo = Convert.ToInt32(row["CBNo"].ToString());
                    CModels.PNNo = Convert.ToInt32(row["PNNo"].ToString());
                    CModels.DeliveryOrder = Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    CModels.PC = Convert.ToInt32(row["PC"].ToString());
                    CModels.PKL = Convert.ToInt32(row["PKL"].ToString());
                    CModels.MRVPurchase = Convert.ToInt32(row["MRV_Purchase"].ToString());
                    CModels.PVTNo = Convert.ToInt32(row["PVTNo"].ToString());
                    CModels.StockAdjNo = Convert.ToInt32(row["Stock_AdjNo"].ToString());
                    CModels.PurchaseImportNo = Convert.ToInt32(row["PurchaseImportNo"].ToString());
                    CModels.ContainerImportNo = Convert.ToInt32(row["ContainerImportNo"].ToString());
                    CModels.BOQNo = Convert.ToInt32(row["BOQNo"].ToString());
                    CModels.OpenStockEntryNo = Convert.ToInt32(row["OpenStockEntryNo"].ToString());
                    CModels.LocationTransferNo = Convert.ToInt32(row["trNo"].ToString());
                    CModels.PackingHistoryNo = Convert.ToInt32(row["Pack_No"].ToString());
                    CModels.ElectronicsProductionNo = Convert.ToInt32(row["Electronics_ProductionNo"].ToString());
                    CModels.ContraNo = Convert.ToInt32(row["ContraNo"].ToString());
                    CModels.CashCollectionNo = Convert.ToInt32(row["CashCollectionSlno"].ToString());
                    CModels.PettyCashPrint = Convert.ToInt32(row["PettyCashPrint"].ToString());
                    CModels.PurchasePerforma = Convert.ToInt32(row["PurchasePerforma"].ToString());
                    CModels.DailyTnNo = Convert.ToInt32(row["DailyTnNum"].ToString());
                    CModels.ContractNo = Convert.ToInt32(row["ContractNo"].ToString());
                    CModels.ToolsManagementNo = Convert.ToInt32(row["ToolsManagemant_No"].ToString());
                    CModels.ProjectMaterialReturnNo = Convert.ToInt32(row["ProjectMaterialRetNo"].ToString());
                    CModels.PackingListNo = Convert.ToInt32(row["PackingListNo"].ToString());
                    CModels.CompanyId = Convert.ToInt32(row["CompanyId"].ToString());

                    CModels.CustomerId = row["CustomerAcc"].ToString();
                    CModels.SupplierId = row["Supplieracc"].ToString();
                    CModels.PDCR =row["PDCR"].ToString();
                    CModels.PDCI = row["PDCI"].ToString();
                    CModels.Cash = row["Cash"].ToString();
                    CModels.BankId = row["BankId"].ToString();
                    CModels.Expenses = row["Expenses"].ToString();

                 
                    CModels.GICash = Convert.ToInt32(row["GICash"].ToString());
                    CModels.GIBank = Convert.ToInt32(row["GIBank"].ToString());
                    CModels.CashSale = Convert.ToInt32(row["CashSale"].ToString());
                    CModels.CreditSale = Convert.ToInt32(row["CreditSale"].ToString());
                    CModels.CreditCard = Convert.ToInt32(row["CreditCard"].ToString());
                    CModels.CashCust = Convert.ToInt32(row["CashCust"].ToString());
                    CModels.COGSAC = Convert.ToInt32(row["COGSAC"].ToString());
                    CModels.PControlAC = Convert.ToInt32(row["PControlAC"].ToString());
                    CModels.PurchaseLocal = Convert.ToInt32(row["PurchaseLocal"].ToString());
                    CModels.PurcahseImport = Convert.ToInt32(row["PurcahseImport"].ToString());
                    CModels.SReturnAC = Convert.ToInt32(row["SReturnAC"].ToString());
                    CModels.PReturnAC = Convert.ToInt32(row["PReturnAC"].ToString());
                    CModels.DiscountAC = Convert.ToInt32(row["DiscountAC"].ToString());
                    CModels.PDCReceived = Convert.ToInt32(row["PDCReceived"].ToString());
                    CModels.PDCIssued = Convert.ToInt32(row["PDCIssued"].ToString());
                    CModels.STrOutDr = Convert.ToInt32(row["STrOutDr"].ToString());
                    CModels.STrOutCr = Convert.ToInt32(row["STrOutCr"].ToString());
                    CModels.STrInDr = Convert.ToInt32(row["STrInDr"].ToString());
                    CModels.STrInCr = Convert.ToInt32(row["STrInCr"].ToString());
                    CModels.StockControlAC = Convert.ToInt32(row["StockControlAC"].ToString());
                    CModels.StockInHand = Convert.ToInt32(row["StockInHand"].ToString());
                    CModels.SalPayableAC = Convert.ToInt32(row["SalPayableAC"].ToString());
                    CModels.ChequeAC = Convert.ToInt32(row["ChequeAC"].ToString());
                    CModels.OtherCost = Convert.ToInt32(row["OtherCost"].ToString());
                    CModels.Roundoff = Convert.ToInt32(row["RoundOff"].ToString());
                    CModels.VCCAccount = Convert.ToInt32(row["VCCAccount"].ToString());
                    CModels.PettyCashAccount = Convert.ToInt32(row["PettyCashAccount"].ToString());
                    CModels.LocationTransferAccount = Convert.ToInt32(row["LocationTransferAccount"].ToString());

                    CModels.SalesAccount = Convert.ToInt32(row["SalesTax"].ToString());
                    CModels.PurchaseAccount = Convert.ToInt32(row["PurchaseTax"].ToString());
                    CModels.SalesReturnAccount = Convert.ToInt32(row["SalesReturnTax"].ToString());
                    CModels.PurchaseReturnAccount = Convert.ToInt32(row["PurchaseReturnTax"].ToString());
                    CModels.ExpenseAccount = Convert.ToInt32(row["ExpenseTax"].ToString());
                    CModels.ImportPurchaseAccount = Convert.ToInt32(row["ImportPurchaseTax"].ToString());
                    CModels.ExportSalesTax = Convert.ToInt32(row["ExportSalesTax"].ToString());

                    CModels.Delivery = Convert.ToInt32(row["Delivery"].ToString());
                    CModels.Shipping = Convert.ToInt32(row["Shipping"].ToString());
                    CModels.DealerFee = Convert.ToInt32(row["DealerFee"].ToString());
                    CModels.StorageFee = Convert.ToInt32(row["StorageFee"].ToString());
                    CModels.LoadingFee = Convert.ToInt32(row["LoadingFee"].ToString());
                    CModels.LateFee = Convert.ToInt32(row["LateFee"].ToString());
                    CModels.Insurance = Convert.ToInt32(row["Insurance"].ToString());
                    CModels.AdditionalService = Convert.ToInt32(row["AdditionalService"].ToString());
                    CModels.OtherCost1 = Convert.ToInt32(row["OtherCost1"].ToString());
                    CModels.OtherCost2 = Convert.ToInt32(row["OtherCost2"].ToString());
                    CModels.OtherCost3 = Convert.ToInt32(row["OtherCost3"].ToString());
                    CModels.OtherCost4 = Convert.ToInt32(row["OtherCost4"].ToString());


                    CModels.DCompanyName = row["DCompanyName"].ToString();
                    CModels.DAddress = row["DAddress"].ToString();
                    CModels.DPhoneNo = row["DPhoneNo"].ToString();
                    CModels.DEmail = row["DEmail"].ToString();
                    CModels.DFax = row["DFax"].ToString();
                    CModels.DTRNNo = row["DTRNNo"].ToString();
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult CompanyItemSlNoGetandGetsNew(CompanyModel CompanyModel) 

        {
            CompanyModel obj = new CompanyModel();

            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CompanyItemSlNoGetandGetsNew(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.CompanyId = Convert.ToInt32(row["SId"].ToString());
                    CModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    CModels.LabAccount = Convert.ToInt32(row["LabBillAccount"].ToString());
                    CModels.RevisitNo = Convert.ToInt32(row["RevisitNo"].ToString());
                    CModels.IPNo = Convert.ToInt32(row["IPNo"].ToString());
                    CModels.BillNo = Convert.ToInt32(row["BillNo"].ToString()); 
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult GetCashAccount(CompanyModel CompanyModel)

        {
            CompanyModel obj = new CompanyModel();

            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetCashAccount(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                 
                    CModels.Cash = row["Cash"].ToString();
                    CModels.AccId = Convert.ToInt32(row["Acc_Id"].ToString());
                    CModels.AccDesc = row["Acc_Description"].ToString();
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult HMS_CompanyDetailsInsertandUpdate4(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();
            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.HMS_CompanyDetailsInsertandUpdate4(CompanyModel, dbName);  
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel CModels = new CompanyModel();
                    CModels.Status = row["Status"].ToString();
                    CModels.CompanyId = Convert.ToInt32(row["CompanyId"].ToString());
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


    }
}