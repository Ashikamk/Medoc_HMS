using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PurchaseEnquiry
    {
        public string BOQ { get; set; }
        public decimal EstimateAmount { get; set; }
        public long BOQQty { get; set; }
        public decimal BOQAmt { get; set; }
        public long JobNo { get; set; }
        public string JobCode { get; set; }
        public long MainJobNo { get; set; }
        public string MainJobCode { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public string Models { get; set; }
        public long PurchaseAnalysisId { get; set; }
        public long PurchaseDeptId { get; set; }
        public long EnquiryNo { get; set; }
        public string EnquiryDate { get; set; }
        public long SupplierId { get; set; }
        public string SupplierName { get; set; }
        public long LocnId { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public string Remarks { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal FCDiscount { get; set; }
        public decimal TotalTaxable { get; set; }
        public decimal TotalTax { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal FCTaxable { get; set; }
        public decimal FCTax { get; set; }
        public decimal FCGrandTotal { get; set; }
        public decimal FCTotal { get; set; }


        public long DepartmentId { get; set; }
        public long UserId { get; set; }
        public string Status { get; set; }
        public int DeleteFlag { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public long MReqNo { get; set; }
        public long MReqSubId { get; set; }

        //Sub
        public long PurchaseEnquirySubId { get; set; }
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescription { get; set; }
        public long LocationId { get; set; }
        public long UnitId { get; set; }
        public decimal Quantity { get; set; }
        public decimal Qty { get; set; }
        public decimal Rate { get; set; }               //Foreign Currency
        public decimal BaseRate { get; set; }           //Base Currency
        public decimal Discount { get; set; }           //Foreign Currency
        public decimal BaseDiscount { get; set; }       //Base Currency
        public long TaxId { get; set; }
        public decimal TaxRate { get; set; }
        public decimal TaxableAmount { get; set; }      //Foreign Currency
        public decimal TaxAmount { get; set; }          //Foreign Currency
        public decimal TotalAmount { get; set; }        //Foreign Currency
        public decimal BaseTaxable { get; set; }        //Base Currency
        public decimal BaseTax { get; set; }            //Base Currency
        public decimal BaseAmount { get; set; }         //Base Currency        
        public string CurrencyName { get; set; }
        public string UnitName { get; set; }
        public string PENumber { get; set; }

        DPurchase oDMasters = new DPurchase();
        public DataSet PurchaseEnquiryInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PurchaseEnquiryInsertandUpdate(dt, dbName);
        }
        public DataSet PurchaseEnquiryGetandGets(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.PurchaseEnquiryGetandGets(PurchaseEnquiry, dbName);
        }
        public DataSet PurchaseEnquiryList(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.PurchaseEnquiryList(PurchaseEnquiry, dbName);
        }

        public DataSet PurchaseReturnList(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.PurchaseReturnList(PurchaseEnquiry, dbName);
        }
        public DataSet EnquiryNoSearch(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.EnquiryNoSearch(PurchaseEnquiry, dbName);
        }
        public DataSet PurchaseEnquiryGetsforPO(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.PurchaseEnquiryGetsforPO(PurchaseEnquiry, dbName);
        }
        public DataSet PurchaseEntryGetProductforPO(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.PurchaseEntryGetProductforPO(PurchaseEnquiry, dbName);
        }
        public DataSet PurchaseEnquiryGetProductforPOSort(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.PurchaseEnquiryGetProductforPOSort(PurchaseEnquiry, dbName);
        }
        public DataSet PurchaseEnquiryGetsforPOSort(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.PurchaseEnquiryGetsforPOSort(PurchaseEnquiry, dbName);
        }
        public DataSet PurchaseEnquiryRecall(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.PurchaseEnquiryRecall(PurchaseEnquiry, dbName);
        }
        public DataSet PurchaseEnquiryProductRecall(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.PurchaseEnquiryProductRecall(PurchaseEnquiry, dbName);

        }
        public DataSet DeletePurchaseEnquiry(PurchaseEnquiry PurchaseEnquiry, string dbName)
        {
            return oDMasters.DeletePurchaseEnquiry(PurchaseEnquiry, dbName);

        }

    }
}