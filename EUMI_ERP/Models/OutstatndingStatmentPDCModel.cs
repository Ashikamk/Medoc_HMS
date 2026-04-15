using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class OutstatndingStatmentPDCModel
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public long PDCAccountId { get; set; }
        public long DepartmentId { get; set; }
        public long PDCType { get; set; }


        public string VoucherNo { get; set; }
        public string VTypePrefix { get; set; }
        public string VDate { get; set; }
        public string AccCode { get; set; }
        public string AccName { get; set; }
        public string PDCAccCode { get; set; }
        public decimal Amount { get; set; }
        public string RefNo { get; set; }
        public string Bank { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }


        DAccounts oDAccounts = new DAccounts();
        public DataSet OutstatndingStatmentPDCGetandGets(OutstatndingStatmentPDCModel oOutstatndingStatmentPDCModel, string dbName)
        {
            return oDAccounts.OutstatndingStatmentPDCGetandGets(oOutstatndingStatmentPDCModel, dbName);
        }
    }
}