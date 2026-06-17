using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EUMI_ERP.Models;
using System.Data;
using System.Configuration;

namespace EUMI_ERP.Controllers
{
    public class CommonController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: Common
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetCountry(Country Country)
        {
            Country obj = new Country();

            List<Country> oList = new List<Country>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetCountry(Country, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Country MModels = new Country();
                    MModels.CountryId = Convert.ToInt32(row["CountryId"].ToString());
                    MModels.CountryName = row["CountryName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetIDType(ID_Type IDType)
        {
            ID_Type obj = new ID_Type();

            List<ID_Type> oList = new List<ID_Type>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetIDType(IDType, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ID_Type MModels = new ID_Type();
                    MModels.Id = Convert.ToInt32(row["ID"].ToString());
                    MModels.IDType = row["IDType"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetManager(Manager Manager)
        {
            Manager obj = new Manager();

            List<Manager> oList = new List<Manager>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetManager(Manager, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Manager CModels = new Manager();
                    CModels.ManagerId = Convert.ToInt32(row["ManagerId"].ToString());
                    CModels.ManagerName = row["ManagerName"].ToString();
                    oList.Add(CModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetCompany(Company Company)
        {
            Company obj = new Company();

            List<Company> oList = new List<Company>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetCompany(Company, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    Company CModels = new Company();
                    CModels.CompanyId = Convert.ToInt32(row["CompanyId"].ToString());
                    CModels.CompanyName = row["CompanyName"].ToString();
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
        public ActionResult SlNoGetandGets(SerialNumber SerialNumberModel)
        {
            SerialNumber obj = new SerialNumber();

            List<SerialNumber> oList = new List<SerialNumber>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SlNoGetandGets(SerialNumberModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SerialNumber BQModels = new SerialNumber();
                    BQModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    BQModels.BOQNo = Convert.ToInt32(row["BOQNo"].ToString());
                    BQModels.StockOutNo = Convert.ToInt32(row["StockOutNo"].ToString());
                    BQModels.PurSlno = Convert.ToInt32(row["PurSlno"].ToString());
                    BQModels.BatchSlno = Convert.ToInt32(row["BatchSlno"].ToString());
                    BQModels.VoNo = Convert.ToInt32(row["VoucherNo"].ToString());
                    BQModels.StockInNo = Convert.ToInt32(row["StockInNo"].ToString());
                    BQModels.ProdEntryNo = Convert.ToInt32(row["ProdEntryNo"].ToString());
                    BQModels.EnquiryNo= Convert.ToInt32(row["EnquiryNo"].ToString());
                    BQModels.PE_EnquiryNo = Convert.ToInt32(row["PE_EnquiryNo"].ToString());
                    BQModels.PO_OrderNo = Convert.ToInt32(row["PO_OrderNo"].ToString());
                    BQModels.QuotationNo = Convert.ToInt32(row["QuotationNo"].ToString());
                    BQModels.Stock_AdjNo = Convert.ToInt32(row["Stock_AdjNo"].ToString());
                    BQModels.OrderNo= Convert.ToInt32(row["OrderNo"].ToString());
                    BQModels.MRVSlNo = Convert.ToInt32(row["MRVNUM"].ToString());
                    BQModels.MRVPurSlNo = Convert.ToInt32(row["MRV_Purchase"].ToString());
                    BQModels.PVTNo = Convert.ToInt32(row["PVTNo"].ToString());
                    BQModels.PRNo = Convert.ToInt32(row["PRNo"].ToString());
                    BQModels.DOrderNo= Convert.ToInt32(row["DeliveryOrderNo"].ToString());
                    BQModels.ImportPurTax = Convert.ToInt32(row["ImportPurchaseTax"].ToString());
                    BQModels.ReturnNo = Convert.ToInt32(row["SRNo"].ToString());
                    BQModels.OpenStockEntryNo = Convert.ToInt32(row["OpenStockEntryNo"].ToString());
                    BQModels.trNo = Convert.ToInt32(row["trNo"].ToString());
                    BQModels.Pack_No = Convert.ToInt32(row["Pack_No"].ToString());
                    BQModels.Electronics_productionNo = Convert.ToInt32(row["Electronics_ProductionNo"].ToString());
                    BQModels.CashCollectionSlno = Convert.ToInt32(row["CashCollectionSlno"].ToString());
                    BQModels.PurchaseImportNO = Convert.ToInt32(row["PurchaseImportNo"].ToString());
                    BQModels.ContainerImportNO = Convert.ToInt32(row["ContainerImportNo"].ToString());
                    BQModels.PurchasePerforma= Convert.ToInt32(row["PurchasePerforma"].ToString());
                    BQModels.DailyTnNum= Convert.ToInt32(row["DailyTnNum"].ToString()); 
                    BQModels.ContractNo = Convert.ToInt32(row["ContractNo"].ToString());
                    BQModels.MRequistion = Convert.ToInt32(row["MRequistion"].ToString());
                    BQModels.ToolsManagemant_No = Convert.ToInt32(row["ToolsManagemant_No"].ToString());
                    BQModels.MIssue = Convert.ToInt32(row["MI"].ToString());
                    BQModels.ProjectMaterialRetNo = Convert.ToInt32(row["ProjectMaterialRetNo"].ToString());
                    BQModels.PackingListNo = Convert.ToInt32(row["PackingListNo"].ToString());
                    BQModels.ExportSalesTax = Convert.ToInt32(row["ExportSalesTax"].ToString()); 
                    oList.Add(BQModels);
                }
                

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult CashAccountGets(CompanyModel CompanyModel)
        {
            CompanyModel obj = new CompanyModel();

            List<CompanyModel> oList = new List<CompanyModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CashAccountGets(CompanyModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CompanyModel BQModels = new CompanyModel();

                    BQModels.GICash = Convert.ToInt32(row["GICash"].ToString());
                    BQModels.AccId = Convert.ToInt32(row["Acc_Id"].ToString());

                    oList.Add(BQModels);
                }


            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CommonGetAccountTrans(CommonAccTrans CommonAccTrans)
        {
            CommonAccTrans obj = new CommonAccTrans();

            List<CommonAccTrans> oList = new List<CommonAccTrans>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CommonGetAccountTrans(CommonAccTrans, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CommonAccTrans CModels = new CommonAccTrans();

                    CModels.VtypePrefix = row["VTypePrefix"].ToString();
                    CModels.VouNo = row["VoucherNo"].ToString();
                    CModels.VDate = row["VDate"].ToString();
                    CModels.VType = row["VType"].ToString();
                    CModels.AccCode = row["AccCode"].ToString();
                    CModels.Reference = row["ReferenceNo"].ToString();
                    CModels.VDescription = row["VDescription"].ToString();
                    CModels.BaseAmount = Convert.ToDecimal(row["BaseAmount"].ToString());
                    CModels.CurrencyId = Convert.ToInt32(row["CurrencyId"].ToString());
                    CModels.CurrencyRate = Convert.ToDecimal(row["CurrencyRate"].ToString());
                    CModels.FCAmount = Convert.ToDecimal(row["FCAmount"].ToString());
                    CModels.AccountName = row["Acc_Description"].ToString();
                    CModels.CurrencyName = row["CurrencyName"].ToString();

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