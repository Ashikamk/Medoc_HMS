using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class SalesModels
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal TargetAmount { get; set; }
        public string Image { get; set; }
        public string ContactNumber { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Status { get; set; }
        public int DelFlag { get; set; }
        public int CustId { get; set; }
        public string CustoName { get; set; }
        public string CustAddress { get; set; }
        public string BillSlNo { get; set; }
        public string InvDate { get; set; }
        public string ProductDescr { get; set; }
        public string Amount { get; set; }
        public string CashAdvance { get; set; }
        public string balanceamt { get; set; }
        public long UserId { get; set; }
        public long SalesmanId { get; set; }



        DMasters oDMasters = new DMasters();


        public DataSet SalesmanGetandGets(SalesModels oMasterModels, string dbName)
        {
            return oDMasters.SalesmanGetandGets(oMasterModels, dbName);
        }
        public DataSet UserSalesmanGetandGets(SalesModels oMasterModels, string dbName)
        {
            return oDMasters.UserSalesmanGetandGets(oMasterModels, dbName);
        }


        public DataSet SalesmanInsertandUpdate(SalesModels oMasterModels, string dbName)
        {
            return oDMasters.SalesmanInsertandUpdate(oMasterModels, dbName);
        }


    }
}