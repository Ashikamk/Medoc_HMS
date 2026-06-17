using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ModelItemwise
    {
        public decimal CessAmount { get; set; }
        public string Batch { get; set; }
        public long BatchSlNo { get; set; }
        public string SType { get; set; }
        public string BillDescription { get; set; }
        public string BillSeriesId { get; set; }
        public string BillSlNo { get; set; }
        public string InvDate { get; set; }
        public string AccCode { get; set; }
        public string CustoName { get; set; }
        public string FirstName { get; set; }
        public string ItemId { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescr { get; set; }

        public string UnitName { get; set; }
        public string ProdQty { get; set; }
        public string ProdRate { get; set; }
        public string Name { get; set; }
        public string LocationName { get; set; }
        public string TermDescription { get; set; }
        public string Payterms { get; set; }
        public string JobCode { get; set; }
        public string Supplier { get; set; }
        public string LPO { get; set; }
        public decimal TaxableAmount { get; set; }

        public decimal TaxAmount { get; set; }

        public decimal ProdDisc { get; set; }

        public decimal Amount { get; set; }
        public string CurrencyName { get; set; }
        public string CurncyRate { get; set; }
        public decimal FCAmount { get; set; }
        public string GrpName { get; set; }
        public string SbgrpName { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string DepartmentName { get; set; }
        public string DeptId { get; set; }


        public string ExitPaperDate { get; set; }


        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Condition { get; set; }
        public string Condition1 { get; set; }

        public string UserId { get; set; }
        public int DelFlag { get; set; }
        public string SlNo { get; set; }
        public string InvoNo { get; set; }
        public string InvoDate { get; set; }
        public string CustAccount { get; set; }
        public string CustName { get; set; }
        public string Username { get; set; }
        public string ItemCode { get; set; }

        public string ItemDescription { get; set; }
        public string Quantity { get; set; }
        public string Cost { get; set; }
        public string PurchaseType { get; set; }
        public decimal OtherCost { get; set; }
        public decimal TaxableAmt { get; set; }
        public decimal TaxAmt { get; set; }
        public decimal LineTotal { get; set; }
        public string CurrencyRate { get; set; }
        public string DueDate { get; set; }
        public string ShipDate { get; set; }
        public decimal FCLineTotal { get; set; }
        public string BuyerNo { get; set; }

        DataItemwise obj = new DataItemwise();

        public DataSet ItemwiseGetandGets(ModelItemwise dt, string dbName)
        {
            return obj.ItemwiseGetandGets(dt, dbName);
        }
        public DataSet StockoutItemwiseGetandGets(ModelItemwise dt, string dbName)
        {
            return obj.StockoutItemwiseGetandGets(dt, dbName);
        }
        public DataSet UsedcarsItemWiseReport(ModelItemwise dt, string dbName)
        {
            return obj.UsedcarsItemWiseReport(dt, dbName);
        }

        public DataSet MetricTonReportGet(ModelItemwise dt, string dbName)
        {
            return obj.MetricTonReportGet(dt, dbName);
        }
    }
    public class HMSPurchaseReportModal
    {
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public string Condition { get; set; }
        public string TID { get; set; }
        public string SlNo { get; set; }
        public string InvoNo { get; set; }
        public string InvoDate { get; set; }
        public string PurchaseType { get; set; }
        public string ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescription { get; set; }
        public string Batch { get; set; }
        public string Expiry { get; set; }
        public string Pack { get; set; }
        public string Quantity { get; set; }
        public string Free { get; set; }
        public string Loose { get; set; }
        public string TQty { get; set; }
        public string TLQty { get; set; }
        public string Rate { get; set; }
        public string P_SR { get; set; }
        public string P_MRP { get; set; }
        public string TaxRate { get; set; }
        public string Discount { get; set; }
        public string TaxableAmount { get; set; }
        public string TaxAmount { get; set; }
        public string B_Cess { get; set; }
        public string Amount { get; set; }
        public string Margin { get; set; }
        public string P_OtherCost { get; set; }
        public string CustAccount { get; set; }
        public string CustName { get; set; }
        public string GrpName { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string DepartmentName { get; set; }
        public string TaxName { get; set; }
        public string DepartmentId { get; set; }
        public string PType { get; set; }
        public string LocationName { get; set; }
        public string Flag { get; set; }

        DataItemwise DataItemwise = new DataItemwise();

        public DataSet HMS_Rpt_ItemWisePurchase(HMSPurchaseReportModal Modal, string dbName)
        {
            return DataItemwise.HMS_Rpt_ItemWisePurchase(Modal, dbName);
        }

        public DataSet Rpt_StockInItemWisePurchase(HMSPurchaseReportModal Modal, string dbName)
        {
            return DataItemwise.Rpt_StockInItemWisePurchase(Modal, dbName);
        }

      
    }
}