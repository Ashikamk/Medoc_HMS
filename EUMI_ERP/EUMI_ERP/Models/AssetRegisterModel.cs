using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class AssetRegisterModel
    {
        public long AssetId { get;set;}
        public string Code {get;set;}
        public string Description {get;set;}
        public string Serialno {get;set;}
        public long Group {get;set;}
        public string GroupName { get; set; }
        public long Category {get;set;}
        public string CategoryName { get; set; }
        public decimal Purvalue {get;set;} 
        public string Date { get; set; }
        public long Location { get; set; }
        public string Year { get; set; }
        public string Manufacturer { get; set; }
        public string Make { get; set; }
        public decimal Depreciatedvalue { get; set; }
        public decimal Depreciatedperc { get; set; }
        public long AccountDebit { get; set; }
        public long AccountCredit { get; set; }
        public long AccountDebitId { get; set; }
        public long AccountCreditId { get; set; }
        public string Comments { get; set; }
        public string DebitDesc { get; set; }
        public string CreditDesc { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        
        DMasters oDMasters = new DMasters();
        public DataSet AssetRegisterInsertandUpdate(AssetRegisterModel AssetRegisterModel, string dbName)
        {
            return oDMasters.AssetRegisterInsertandUpdate(AssetRegisterModel, dbName);
        }
        public DataSet AssetRegisterGetandGets(AssetRegisterModel AssetRegisterModel, string dbName)
        {
            return oDMasters.AssetRegisterGetandGets(AssetRegisterModel, dbName);
        }
        public DataSet AssetRegisterSearch(AssetRegisterModel AssetRegisterModel, string dbName)
        {
            return oDMasters.AssetRegisterSearch(AssetRegisterModel, dbName);
        }
    }
}