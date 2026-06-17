using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class electronicproductionInsertModel
    {
        public string MaterialCode { get; set; }
        public string MaterialName { get; set; }
        public decimal CostPrice { get; set; }
        public int UsedQty { get; set; }
        public string MaterialSerialNo { get; set; }
        public string ItemName { get; set; }
        public string SerialNo { get; set; }
        public string Date { get; set; }
        public decimal SellPrice { get; set; }
        public decimal MaterialCostPrice { get; set; }
        public decimal Profit { get; set; }
        public string Status { get; set; }
        public int ProductionQuantity { get; set; }
        public int Unit { get; set; }
        public int DebitAccount { get; set; }
        public int CreditAccount { get; set; }
        public int MaterialId { get; set; }
        public decimal Total { get; set; }
        public int UId { get; set; }
        public int ItemId { get; set; }
        public string SellingPrice { get; set; }
        public int Quantity { get; set; }
        public int Location { get; set; }
        public string ItemCode { get; set; }
        public string DAccount { get; set; }
        public string CAccount { get; set; }
        public int DeptId { get; set; }
        public int ProductionNo { get; set; }
        public int flag { get; set; }
        public string DAccountName { get; set; }
        public string CAccountName { get; set; }
        public int BalanceQty { get; set; }
        

DElectronics oDElectronics = new DElectronics();
        public DataSet ElectronicProductionInsertandUpdate(DataTable dt, string dbName)
        {
            return oDElectronics.ElectronicProductionInsertandUpdate(dt, dbName);
        }
        public DataSet ElectronicsProductionnumberSearch(electronicproductionInsertModel oelectronicproductionInsertModel, string dbName)
        {
            return oDElectronics.ElectronicsProductionnumberSearch(oelectronicproductionInsertModel, dbName);
        }
        public DataSet ElectronicsProductionGetandGets(electronicproductionInsertModel oelectronicproductionInsertModel, string dbName)
        {
            return oDElectronics.ElectronicsProductionGetandGets(oelectronicproductionInsertModel, dbName);
        }
    }
}