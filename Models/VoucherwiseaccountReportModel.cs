using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class VoucherwiseaccountReportModel
    {


        public string Condition { get; set; }
        public string VDate { get; set; }
        public string VType { get; set; }
        public string VTypePrefix { get; set; }
        public string UserId { get; set; }
        public string ReferenceNo { get; set; }
        public string VoucherNo { get; set; }
        public string VDescription { get; set; }
        public string AccCode { get; set; }
        public string BaseAmount { get; set; }
        public string Acc_Description { get; set; }
        public string ChequeDate { get; set; }
        public string ChequeNo { get; set; }
        public string TaxNo { get; set; }
        public string TxnType { get; set; }
        public string DepartmentName { get; set; }
        public string VTypeId { get; set; }
        public string BillSerId { get; set; }
        public string Debit { get; set; }
        public string Credit { get; set; }
        public string DeptId { get; set; }
        public string UserName { get; set; }
        DAccounts oDAccounts = new DAccounts();


        public DataSet VoucherwiseAccountGetandGets(VoucherwiseaccountReportModel oVoucherwiseaccountReportModel, string dbName)
        {
            return oDAccounts.VoucherwiseAccountGetandGets(oVoucherwiseaccountReportModel, dbName);
        }
    }
}