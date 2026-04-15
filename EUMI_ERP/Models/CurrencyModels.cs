using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class CurrencyModels
    {
        public long Id { get; set; }
        public long BaseCurrencyId { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencyName { get; set; }
        public decimal CurrencyRate { get; set; }
        public string Remarks { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }



        DMasters oDMasters = new DMasters();
        public DataSet CurrencyInsertandUpdate(CurrencyModels oCurrencyModels, string dbName)
        {
            return oDMasters.CurrencyInsertandUpdate(oCurrencyModels, dbName);
        }

        public DataSet CurrencyGetandGets(CurrencyModels oCurrencyModels, string dbName)
        {
            return oDMasters.CurrencyGetandGets(oCurrencyModels, dbName);
        }
    }
}