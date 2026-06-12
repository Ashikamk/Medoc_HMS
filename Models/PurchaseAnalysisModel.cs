using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PurchaseAnalysisModel
    {

        public long PurchaseAnalysisId { get; set; }
        public string Flag { get; set; }
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public long SupplierId { get; set; }
        
        public string Description { get; set; }
        public string Supplier { get; set; }
        public int OrderQty { get; set; }
        public long SaledQty { get; set; }
        public long POQty { get; set; }
        public long PPQty { get; set; }
        public long CurrenctStock { get; set; }
        public string Model2 { get; set; }
        public string Model1 { get; set; }
        public string Model3 { get; set; }
        public decimal PurchaseCost { get; set; }
        public decimal FCCost { get; set; }
        public int UId { get; set; }
        public int DeptId { get; set; }
        public string Status { get; set; }
        public int Location { get; set; }
        public string InvoNo { get; set; }
        public string Date { get; set; }
        public string CustName { get; set; }
        public string MinCost { get; set; }
        public string PurchaseType { get; set; }
        public int VatId { get; set; }
        public string TaxRate { get; set; }
        public string UnitName { get; set; }
        public long UnitId { get; set; }
        public string LocationName { get; set; }
        public long LocationId { get; set; }

        public string Currency { get; set; }
        public string CurrencyRate { get; set; }
        public string PurchaseQty { get; set; }
        DPurchaseAnalysis oDPurchaseAnalysis = new DPurchaseAnalysis();

        public DataSet PurchaseAnalysisInsert(DataTable dt, string dbName)
        {
            return oDPurchaseAnalysis.PurchaseAnalysisInsert(dt, dbName);
        }
        
        public DataSet PurchaseanalysisPurchaseGet(PurchaseAnalysisModel oPurchaseAnalysisModel, string dbName)
        {
            return oDPurchaseAnalysis.PurchaseanalysisPurchaseGet(oPurchaseAnalysisModel, dbName);
        }
        public DataSet PurchaseanalysisPurchaseOrderGet(PurchaseAnalysisModel oPurchaseAnalysisModel, string dbName)
        {
            return oDPurchaseAnalysis.PurchaseanalysisPurchaseOrderGet(oPurchaseAnalysisModel, dbName);
        }
        public DataSet PurchaseAnalysisListGet(PurchaseAnalysisModel oPurchaseAnalysisModel, string dbName)
        {
            return oDPurchaseAnalysis.PurchaseAnalysisListGet(oPurchaseAnalysisModel, dbName);
        }
        
    }
}