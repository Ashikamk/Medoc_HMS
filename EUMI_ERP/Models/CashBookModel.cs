using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class CashBookModel
    {
        public long CashBookId { get; set; }
        public string BOOKACC { get; set; }
        public string BookName { get; set; }
        public string BookDate { get; set; }
        public string AccountHead { get; set; }
        public string ACDESC { get; set; }
        public string Narration { get; set; } 
        public decimal DebitAmt { get; set; }
        public decimal CreditAmt { get; set; }
        public string TransType { get; set; }
        public decimal ClosingBalance { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public string Variable3 { get; set; }
        public string Variable4 { get; set; }
        public string Variable5 { get; set; }
        public string Status { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; } 

        DAccounts oDAccounts = new DAccounts();
        public DataSet CashBookInsert(DataTable dt, string dbName)
        {
            return oDAccounts.CashBookInsert(dt, dbName); 
        }
        public DataSet CashBookGetandGets(CashBookModel oCashBookModel, string dbName)
        {
            return oDAccounts.CashBookGetandGets(oCashBookModel, dbName);  
        }
    }
}