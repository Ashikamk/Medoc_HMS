using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class TaxModel
    {
        public string TaxName { get; set; }
        public decimal TaxRate { get; set; }
        public long TaxId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }     
        public string Message { get; set; }
        public string TaxableAccountSales    { get; set; }
        public string TaxableAccountpurchase { get; set; }
        public string TaxAccountSales        { get; set; }
        public string TaxAccountpurchase     { get; set; }
        public string TaxableAccountSalesReturn { get; set; }
        public string TaxableAccountpurchaseReturn { get; set; } 
        public int    SaleTaxableId          { get; set; }
        public int    PurchaseTaxableId      { get; set; }
        public int    SaleTaxId              { get; set; }
        public int    PurchaseTaxId          { get; set; }
        public int SaleReturnTaxableId { get; set; } 
        public int PurchaseReturnTaxableId { get; set; }
        public string Acc_Desc { get; set; }

        public string SRTax { get; set; }
        public long SRTaxId { get; set; }
        public string PRTax { get; set; }
        public long PRTaxId { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public long TaxDeptId { get; set; }

        DMasters oDMasters = new DMasters();


        public DataSet TaxGetandGets(TaxModel oTaxModel, string dbName)
        {
            return oDMasters.TaxGetandGets(oTaxModel, dbName);
        }


        public DataSet TaxInsertandUpdate(TaxModel oTaxModel, string dbName)
        {
            return oDMasters.TaxInsertandUpdate(oTaxModel, dbName);
        }
    }
}