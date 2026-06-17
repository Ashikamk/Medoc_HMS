using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class AccountSchedule
    {
        public long AcntId { get; set; }

        public long ScheduleId { get; set; }
        public string AcntDescription { get; set; }

        public string schedul { get; set; }

        public string UserType { get; set; }

        public string Narration { get; set; }
        public long AcntCode { get; set; }

        public long AcntSlno { get; set; }

        
        public decimal Opening { get; set; }

        public int DelFlag { get; set; }

        public int UserId { get; set; }

        public int DeptId { get; set; }
        public string SCHType { get; set; }


        public string AccountCode { get; set; }



        public string Status { get; set; }

        public string Flag { get; set; }

        public string Type { get; set; }
        public string Description { get; set; }
        public string Date { get; set; } 
        public decimal Amount { get; set; } 
        public string ReferanceNo { get; set; } 

        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public long BillSerId { get; set; }
        public int FlagOP { get; set; }

        public string NewAccCode { get; set; }

        public string Variable1 { get; set; }

        public string Variable2 { get; set; }
        public string CurrencyId { get; set; }
        public string Currency { get; set; }
        public string Rate { get; set; }

        DMasters oDMasters = new DMasters();
        public DataSet AcntGetandGets(AccountSchedule oAccountSchedule, string dbName)
        {
            return oDMasters.AcntGetandGets(oAccountSchedule, dbName);
        }


        
             public DataSet AccountScheduleInsertandUpdate(AccountSchedule oAccountSchedule, string dbName)
        {
            return oDMasters.AccountScheduleInsertandUpdate(oAccountSchedule, dbName);
        }


        //public DataSet AccountHeadInsertandUpdate(AccountSchedule oAccountSchedule, string dbName)
        //{
        //    return oDMasters.AccountHeadInsertandUpdate(oAccountSchedule, dbName);
        //}
        public DataSet AccountHeadInsertandUpdate(DataTable dt, string dbName) 
        {
            return oDMasters.AccountHeadInsertandUpdate(dt, dbName); 
        }

        public DataSet AccountHeadGetandGets(AccountSchedule oAccountSchedule, string dbName)
        {
            return oDMasters.AccountHeadGetandGets(oAccountSchedule, dbName);
        }
        public DataSet AccountHeadGetandGetsMaster(AccountSchedule oAccountSchedule, string dbName)
        {
            return oDMasters.AccountHeadGetandGetsMaster(oAccountSchedule, dbName);
        }
        
        public DataSet AccountScheduleSearch(AccountSchedule oAccountSchedule, string dbName)
        {
            return oDMasters.AccountScheduleSearch(oAccountSchedule, dbName);
        }
        public DataSet AccountHeadGetAccountTransaction(AccountSchedule oAccountSchedule, string dbName)
        {
            return oDMasters.AccountHeadGetAccountTransaction(oAccountSchedule, dbName);
        }
        

    }
}