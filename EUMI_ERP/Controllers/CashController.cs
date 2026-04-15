using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Configuration;
using System.IO;
using EUMI_ERP.Models;

namespace EUMI_ERP.Controllers
{
    public class CashController : Controller
    {
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: Common
        // GET: Cash
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult cash()
        {
            return View();
        }
        

  [HttpPost]
        public ActionResult cashGetandGets(modelcash AreaMaster)
        {
            modelcash obj = new modelcash();

            List<modelcash> oList = new List<modelcash>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.cashGetandGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    modelcash MModels = new modelcash();
                    MModels.mBillSeriesId = row["BillDescription"].ToString();
                    MModels.mBillSlNo = row["BillSlNo"].ToString();
                    MModels.mcurdate = row["CurDate"].ToString();
                    MModels.mCustomer = row["Customer"].ToString();
                    //MModels.mCurrency = row["CurrencyName"].ToString();
                    MModels.mTotalAmount = row["TotalAmount"].ToString();
                    MModels.mReceivedAmount = row["TotalReceived"].ToString();
                    MModels.mBalanceAmount = row["BalanceAmount"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }

        [HttpPost]
        public ActionResult CurrencyGetandGets(modelcash AreaMaster)
        {
            modelcash obj = new modelcash();

            List<modelcash> oList = new List<modelcash>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.currencyGetandGets(AreaMaster, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    modelcash MModels = new modelcash();
                    MModels.mBillSeriesId = row["BillDescription"].ToString();
                    MModels.mBillSlNo = row["BillSlNo"].ToString();
                    MModels.mcurdate = row["CurDate"].ToString();
                    MModels.mCustomer = row["Customer"].ToString();
                    MModels.mTotalAmount =row["TotalAmount"].ToString();
                    MModels.mReceivedAmount = row["TotalReceived"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }
    }
}