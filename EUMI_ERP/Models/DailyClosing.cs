using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class DailyClosing
    {
        public long TRNO { get; set; }     
        public string Date { get; set; }       
        public long UserId { get; set; }
        public string User { get; set; } 
        public long Pdc { get; set; }
        public long DeptId { get; set; }
        public long CurId { get; set; }
        public decimal Denom { get; set; }
        public int Qty { get; set; }
        public string CollectedBy { get; set; }
        public string Currency { get; set; }
        public decimal TotalAed { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public decimal AEDTOTAL { get; set; }
        public decimal OMRTOTAL { get; set; }
        public decimal USDTOTAL { get; set; }
        public decimal SAUDITOTAL { get; set; } 
        public string Remarks { get; set; }


        DEnquiry oDEnquiry = new DEnquiry();

        public DataSet DailyClosingInsertandUpdate(DataTable dt, string dbName)
        {
            return oDEnquiry.DailyClosingInsertandUpdate(dt, dbName);  
        }
        public DataSet DailyCashCollectionGetandGets(DailyClosing oDailyClosing, string dbName)
        {
            return oDEnquiry.DailyCashCollectionGetandGets(oDailyClosing, dbName); 
        }
        public DataSet DailyCashCheckInsertandUpdate(DataTable dt, string dbName)
        { 
            return oDEnquiry.DailyCashCheckInsertandUpdate(dt, dbName);
        }
        
    }
}