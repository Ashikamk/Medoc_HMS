using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP
{
    public class TaxReportModel
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Area { get; set; }
        public string Dept { get; set; }


        public string BillSeriesId { get; set; }
        public string SlNo { get; set; }
        public string InvoNo { get; set; }
        public string InvoDate { get; set; }
        public string Customer { get; set; }
        public string CustomerVATNo { get; set; }
        public string Discount { get; set; }
        public string TaxableAmount { get; set; }
        public string TaxPercent { get; set; }
        public string TaxAmount { get; set; }
        public string TotalAmount { get; set; }

        public string Account { get; set; }
        public string AccountCode { get; set; }
        public string AccountDesc { get; set; }
        public string AccountGrp { get; set; }
        public string Prefix { get; set; }
        public string VDescription { get; set; }
        public string UserId { get; set; }

        DTaxReport oDTaxReport = new DTaxReport();
        public DataSet SalesTaxReportGet(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.SalesTaxReportGet(oTaxReportModel, dbName);
        }
        public DataSet PurchaseTaxReportGet(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.PurchaseTaxReportGet(oTaxReportModel, dbName);
        }

        public DataSet B2cs(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.B2cs(oTaxReportModel, dbName);
        }
        public DataSet ExpenseTaxReportGet(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.ExpenseTaxReportGet(oTaxReportModel, dbName);
        }
        public DataSet PurchaseReturnTaxReportGet(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.PurchaseReturnTaxReportGet(oTaxReportModel, dbName);
        }
        public DataSet SalesAreaGrpTaxReportGet(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.SalesAreaGrpTaxReportGet(oTaxReportModel, dbName);
        }
        public DataSet PurchaseAreaGrpTaxReportGet(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.PurchaseAreaGrpTaxReportGet(oTaxReportModel, dbName);
        }
        public DataSet PurchaseReturnAreaGrpTaxReportGet(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.PurchaseReturnAreaGrpTaxReportGet(oTaxReportModel, dbName);
        }

        public DataSet SalesReturnTaxReportGet(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.SalesReturnTaxReportGet(oTaxReportModel, dbName);
        }
        public DataSet SalesReturnAreaGrpTaxReportGet(TaxReportModel oTaxReportModel, string dbName)
        {
            return oDTaxReport.SalesReturnAreaGrpTaxReportGet(oTaxReportModel, dbName);
        }
    }
}