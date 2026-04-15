using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class VCCModel
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long VCCNo { get; set; }
        public long PaymentVCCNo { get; set; }
        public string VCCDate { get; set; }
        public string VCCRDate { get; set; }
        public decimal Amount { get; set; }
        public decimal FCAmount { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public long CustId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string CurrencyName { get; set; }
        public string AccountType { get; set; }
        public int DeptId { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; }
        public string SStatus { get; set; }
        public decimal VCCPAmt { get; set; }
        public string ProductCode { get; set; }
        public decimal VCCBAmount { get; set; }
        public long Account { get; set; }
        public long AccountId { get; set; }
        public string Product { get; set; }
        public string UserName { get; set; }

        public string ExitDate { get; set; }
        DMasters oDMasters = new DMasters();
        public DataSet VCCReceivedAmountGet(VCCModel VCCModel, string dbName)
        {
            return oDMasters.VCCReceivedAmountGet(VCCModel, dbName);
        }
        public DataSet Rpt_VCCPendingPayment(VCCModel VCCModel, string dbName)
        {
            return oDMasters.Rpt_VCCPendingPayment(VCCModel, dbName);
        }
        
        public DataSet VCCPaymentInsertandUpdate(VCCModel VCCModel, string dbName)
        {
            return oDMasters.VCCPaymentInsertandUpdate(VCCModel, dbName);
        }
        public DataSet VCCPaymentGetandGets(VCCModel VCCModel, string dbName)
        {
            return oDMasters.VCCPaymentGetandGets(VCCModel, dbName);
        }

    }
}