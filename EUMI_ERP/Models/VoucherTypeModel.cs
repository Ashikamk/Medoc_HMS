using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class VoucherTypeModel
    {
        public string VoucherType { get; set; }
        public string Voucherdate { get; set; }
        public string cheqNo { get; set; }
        public string CheqDate { get; set; }
        public string Bank { get; set; }
        public decimal Amount { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public int CustAccount { get; set; }
        public string Prefix { get; set; }
        public string Description { get; set; }
        public long VoucherTypeId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public string vname { get; set; }
        public long PettyCash { get; set; }
        public string AccCode { get; set; }
        public long AccId { get; set; }
        public string AccDescription { get; set; }
        public int DeptId { get; set; }
        public long TaxAccId { get; set; }
        public string TaxAcc { get; set; }
        public string TaxAccName { get; set; }

        public string VoucherNo { get; set; }

        public int UserId { get; set; }

        



        public int flag { get; set; }

        DMasters oDMasters = new DMasters();

        DInvReports oDInvReports = new DInvReports();

        public DataSet Rpt_GetPendingPDC(VoucherTypeModel VoucherTypeModel, string dbName)
        {
            return oDInvReports.Rpt_GetPendingPDC(VoucherTypeModel, dbName);
        }
        public DataSet VoucherDelete(VoucherTypeModel oVoucherTypeModel, string dbName)
        {
            return oDMasters.VoucherDelete(oVoucherTypeModel, dbName);
        }


        public DataSet VoucherTypeGetandGets(VoucherTypeModel oVoucherTypeModel, string dbName)
        {
            return oDMasters.VoucherTypeGetandGets(oVoucherTypeModel, dbName);
        }
        public DataSet PCAccSearch(VoucherTypeModel oVoucherTypeModel, string dbName)
        {
            return oDMasters.PCAccSearch(oVoucherTypeModel, dbName);
        }
        public DataSet PCAccNoGetandGets(VoucherTypeModel oVoucherTypeModel, string dbName)
        {
            return oDMasters.PCAccNoGetandGets(oVoucherTypeModel, dbName);
        }
        public DataSet PettyVoucherTypeGetandGets(VoucherTypeModel oVoucherTypeModel, string dbName)
        {
            return oDMasters.PettyVoucherTypeGetandGets(oVoucherTypeModel, dbName);
        }
        public DataSet VoucherNoGetandGetss(VoucherTypeModel oVoucherTypeModel, string dbName)
        {
            return oDMasters.VoucherNoGetandGetss(oVoucherTypeModel, dbName);
        }


        public DataSet VoucherTypeInsertandUpdate(VoucherTypeModel oVoucherTypeModel, string dbName)
        {
            return oDMasters.VoucherTypeInsertandUpdate(oVoucherTypeModel, dbName);
        }
    }
}