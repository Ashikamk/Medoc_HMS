using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class CustomerMaster
    {
         public long IDCUST { get; set; }
         public long IDSUPP { get; set; }
        public string Custcode { get; set; }
        public string SupplierCode { get; set; }

        public string SupplierName { get; set; }
        public long LinkCode { get; set; }
        public long Accid { get; set; }
        public string licenseNo { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public string Curdate { get; set; }


        public string BillType { get; set; }
        public string BillNo { get; set; }
        public string Billseries { get; set; }
        public string BFlag { get; set; }



        public long CustId { get; set; }




        public long supplierid { get; set; }
        
        public long AccountType { get; set; }
        public string CustType { get; set; }
        public string CustAccount { get; set; }
        public string CustName { get; set; }
        public decimal OpenBalance { get; set; }
        public long DueDays { get; set; }
        public decimal CreditLimit { get; set; } 
        public long CustTermsId { get; set; } 
        public long CustTerms { get; set; }
        public string TRNNumber { get; set; }
        public long SalesmanId { get; set; }
        public int SalesmanName { get; set; } 
        public string SalesMan { get; set; }
        public long PriceGroupId { get; set; }
        public string PriceGroup { get; set; }
        public long CurrencyId { get; set; }
        public string CurrencyType { get; set; }
        public long AreaId { get; set; }
        public string Area { get; set; } 
        public long CustStatusId { get; set; } 
        public string CustStatus { get; set; }
        public string CustStreet1 { get; set; }
        public string CustStreet2 { get; set; } 
        public string CustCity1 { get; set; }
        public string CustCity2 { get; set; }
        public string CustState1 { get; set; }
        public string CustState2 { get; set; }
        public string CustPin1 { get; set; }
        public string CustPin2 { get; set; }
        public string CustCountry1 { get; set; }
        public string CustCountry2 { get; set; }
        public string CustNotes { get; set; }       
        public string CustContactName1 { get; set; }
        public string CustContactNo1 { get; set; }
        public string CustContactName2 { get; set; }
        public string CustContactNo2 { get; set; } 
        public string CustContactName3 { get; set; }
        public string CustContactNo3 { get; set; }
        public string CustEmailId { get; set; }
        public string EmailId { get; set; }
        public string MapId { get; set; } 
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string ProdRate { get; set; }
        
        public string ProcedureName { get; set; }
        public string Description { get; set; }
        public string PQty { get; set; }
        public string TestAmount { get; set; }
        public string Name { get; set; }
        public string NetAmt { get; set; }
        public string BillDate { get; set; }
        public string OpNo { get; set; }
        public string IpNo { get; set; }
        public string RegNo { get; set; }



        public long cstyp { get; set; }
        public string PhoneNumber { get; set; }

        DMasters oDMasters = new DMasters();
        public DataSet CustomerInsertandUpdate(CustomerMaster oCustomerMaster, string dbName)
        {
            return oDMasters.CustomerInsertandUpdate(oCustomerMaster, dbName);
        }


        
         public DataSet BillInfoGdetandGets(CustomerMaster oCustomerMaster, string dbName)
        {
            return oDMasters.BillInfoGdetandGets(oCustomerMaster, dbName);
        }




        public DataSet CustomerSupplierLinking(CustomerMaster oCustomerMaster, string dbName)
        {
            return oDMasters.CustomerSupplierLinking(oCustomerMaster, dbName);
        }
        public DataSet CustomerSupplierLinkingUpdate(CustomerMaster oCustomerMaster, string dbName)
        {
            return oDMasters.CustomerSupplierLinkingUpdate(oCustomerMaster, dbName);
        }
        public DataSet CustomerGetandGets(CustomerMaster oCustomerMaster, string dbName)
        {
            return oDMasters.CustomerGetandGets(oCustomerMaster, dbName);
        }
        public DataSet CustomerSupplierLinkingGetandGets(CustomerMaster oCustomerMaster, string dbName)
        {
            return oDMasters.CustomerSupplierLinkingGetandGets(oCustomerMaster, dbName);
        }
        public DataSet CustomerOrSupplierSearch(CustomerMaster oCustomerMaster, string dbName)
        {
            return oDMasters.CustomerOrSupplierSearch(oCustomerMaster, dbName);
        }
    }
}