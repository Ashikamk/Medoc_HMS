using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class MultiPriceModel
    {
        public string PriceType { get; set; }
        public string Description { get; set; }
        public long MultiPriceId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }



        DMasters oDMasters = new DMasters();


        public DataSet MultiPriceGetandGets(MultiPriceModel oMultiPriceModel, string dbName)
        {
            return oDMasters.MultiPriceGetandGets(oMultiPriceModel, dbName);
        }


        public DataSet MultiPriceInsertandUpdate(MultiPriceModel oMultiPriceModel, string dbName)
        {
            return oDMasters.MultiPriceInsertandUpdate(oMultiPriceModel, dbName);
        }
    }
}