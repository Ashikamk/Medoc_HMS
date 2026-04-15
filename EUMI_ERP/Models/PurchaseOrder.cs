using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PurchaseOrder
    {
        private SqlParameter[] arlParms;
        public decimal TaxableAmounts { get; set; }
        public decimal TaxAmounts { get; set; }
        public decimal Amounts { get; set; }
        public long PoOrderid { get; set; }
        public string Approval { get; set; }
        public string BOQ { get; set; }
        public decimal EstimateAmount { get; set; }
        public long BOQQty { get; set; }
        public decimal BOQAmt { get; set; }
        public long PurchaseDeptId { get; set; }
        public string DONo { get; set; }
        public string PayType { get; set; }
        public string PurchaseType { get; set; }
        public string DueDate { get; set; }
        public long PlaceOfSupply { get; set; }
        public string ShipDate { get; set; }
        public long BatchSlno { get; set; }
        public string Batch { get; set; }
        public int OrderId { get; set; }
        public int OrderSubId { get; set; }
        public long Fraction { get; set; }
        public string LPO { get; set; }             //Free text in the View
        public string PONo { get; set; }            //Lpo no for internal updation
        public long PPNo { get; set; }
        public string PPDate { get; set; }
        public long PPSubId { get; set; }
        public long MainId { get; set; }
        public long OrderNo { get; set; }
        public string OrderDate { get; set; }
        public string ExpectedDate { get; set; }
        public long SupplierId { get; set; }
        public string SupplierName { get; set; }
        public long LocnId { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public string SupplierCode { get; set; }
        public long Terms { get; set; }
        public string Term { get; set; }
        public long JobNo { get; set; }
        public string JobCode { get; set; }
        public long MainJobNo { get; set; }
        public string MainJobCode { get; set; }
        public string DocRef { get; set; }
        public string ShipTo { get; set; }
        public string Remarks { get; set; }
        public string ShipVia { get; set; }
        public string ModeofTransfer { get; set; }
        public string PortofEntry { get; set; }
        public string FinalDestination { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal FCDiscount { get; set; }
        public decimal TotalTaxable { get; set; }
        public decimal TotalTax { get; set; }
        public decimal GrandTotal { get; set; }
        public decimal FCTaxable { get; set; }
        public decimal FCTax { get; set; }
        public decimal FCGrandTotal { get; set; }
        public long DepartmentId { get; set; }
        public long UserId { get; set; }
        public string Status { get; set; }
        public int DeleteFlag { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }

        public string PerformaNo { get; set; }
        public string PerformaDate { get; set; }
        public int Flag { get; set; }

        //Sub
        public long PurchaseOrderSubId { get; set; }
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemDescription { get; set; }
        public long LocationId { get; set; }
        public long UnitId { get; set; }
        public decimal Quantity { get; set; }
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
        public string PONumber { get; set; }
        public string PPNumber { get; set; }
        
        public string CurrencyName { get; set; }
        public string UnitName { get; set; }
        public string PENumber { get; set; }
        public int EnquiryNo { get; set; }
        public int EnquirySubId { get; set; }
        public int Qty { get; set; }
        public decimal BillDiscount { get; set; }       //Foreign Currency
        public decimal BillDisc { get; set; }           //Base Currency
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }

        public string BinA { get; set; }
        public string BinB { get; set; }
        public string BinC { get; set; }
        public string BinD { get; set; }
        public string BinE { get; set; }
        public string BinF { get; set; }
        public string BinG { get; set; }
        public string BinH { get; set; }

        DPurchase oDMasters = new DPurchase();
        public DataSet PurchaseOrderInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PurchaseOrderInsertandUpdate(dt, dbName);
        }
        public DataSet PurchaseOrderUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PurchaseOrderUpdate(dt, dbName);
        }
        
        public DataSet PurchaseOrderGetandGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PurchaseOrderGetandGets(PurchaseOrder, dbName);
        }
        public DataSet PerformaItemsGetandGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PerformaItemsGetandGets(PurchaseOrder, dbName);
        }
        public DataSet PurchaseOrderList(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PurchaseOrderList(PurchaseOrder, dbName);
        }
        
        public DataSet OrderNoSearch(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.OrderNoSearch(PurchaseOrder, dbName);
        }
        public DataSet PerformaNoSearch(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PerformaNoSearch(PurchaseOrder, dbName);
        }
        public DataSet PendingPurchaseOrderGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PendingPurchaseOrderGets(PurchaseOrder, dbName);
        }
        public DataSet PurchaseOrderGetProduct(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PurchaseOrderGetProduct(PurchaseOrder, dbName);
        }
        public DataSet PerformaPurchaseGetProduct(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PerformaPurchaseGetProduct(PurchaseOrder, dbName);
        }
        public DataSet PerformaorderGetProduct(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PerformaorderGetProduct(PurchaseOrder, dbName);
        }

        public DataSet PurchaseOrderRecall(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PurchaseOrderRecall(PurchaseOrder, dbName);
        }
        public DataSet PurchaseOrderProductRecall(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PurchaseOrderProductRecall(PurchaseOrder, dbName);
        }

        public DataSet PendingOrdernumberSearch(PurchaseOrder oPurchaseOrder, string dbName)
        {
            return oDMasters.PendingOrdernumberSearch(oPurchaseOrder, dbName);
        }
        public DataSet PerformaInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PerformaInsertandUpdate(dt, dbName);
        }
        public DataSet PerformaEditandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.PerformaEditandUpdate(dt, dbName);
        }
        public DataSet SupplierDONoSearch(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.SupplierDONoSearch(PurchaseOrder, dbName);
        }
        public DataSet PerformaGetandGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PerformaGetandGets(PurchaseOrder, dbName);
        }

        public DataSet PendingPerformaGets(PurchaseOrder PurchaseOrder, string dbName)
        {
            return oDMasters.PendingPerformaGets(PurchaseOrder, dbName);
        }
        public DataSet PurchaseOrderProductRecallSort(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@PONumber", PurchaseOrder.PONumber);
                arlParms[1] = new SqlParameter("@ItemId", PurchaseOrder.ItemId);
                arlParms[2] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                return SQLHelper.ExecuteDataset("PurchaseOrderProductRecallSort", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        public DataSet DeletePurchaseOrder(PurchaseOrder PurchaseOrder, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[3];
                arlParms[0] = new SqlParameter("@OrderNo", PurchaseOrder.OrderNo);
                arlParms[1] = new SqlParameter("@DeptId", PurchaseOrder.DepartmentId);
                arlParms[2] = new SqlParameter("@UserId", PurchaseOrder.UserId);
                return SQLHelper.ExecuteDataset("PurchaseOrderDelete", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
        

    }
}