using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
namespace EUMI_ERP.Models
{
    public class modelcash
    {
        //public int mSlNo { get; set; }
        public string mBillSeriesId { get; set; }
        public string mBillSlNo { get; set; }
        public string mcurdate { get; set; }
        public string mCustomer { get; set; }
        public string mCurrency { get; set; }
        public string mTotalAmount { get; set; }
        public string mReceivedAmount { get; set; }
        public string mBalanceAmount { get; set; }
       
        public string mfromdate { get; set; }
        public string mtodate { get; set; }
       // public int mcuiid { get; set; }

        datacash obj = new datacash();
       
        public DataSet cashGetandGets(modelcash dt, string dbName)
        {
            return obj.CashGetandGets(dt, dbName);
        }
        public DataSet currencyGetandGets(modelcash dt, string dbName)
        {
            return obj.currencyGetandGets(dt, dbName);
        }
    }

}