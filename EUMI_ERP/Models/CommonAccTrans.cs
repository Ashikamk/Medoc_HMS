using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class CommonAccTrans
    {
        public string VouNo { get; set; }
        public string Prefix { get; set; }
        public string Prefix1 { get; set; }
        public string Prefix2 { get; set; }
        public string Prefix3 { get; set; }
        public string DeptId { get; set; }
        public string UserId { get; set; }
        public string Condition { get; set; }

        public string VtypePrefix { get; set; }
        public string VDate { get; set; }
        public string VType { get; set; }
        public string AccCode { get; set; }
        public string Reference { get; set; }
        public string VDescription { get; set; }
        public decimal BaseAmount { get; set; }
        public decimal FCAmount { get; set; }
        public long JobId { get; set; }
        public long CurrencyId { get; set; }
        public decimal CurrencyRate { get; set; }
        public long CostCenterId { get; set; }
        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal PureWt { get; set; }
        public decimal MetalWt { get; set; }
        public decimal OzWt { get; set; }
        public decimal GrossWt { get; set; }
        public decimal Pcs { get; set; }
        public decimal MBalance { get; set; }
        public string AccountName { get; set; }
        public string InsDateTime { get; set; }
        public string JobCode { get; set; }
        public string CostCode { get; set; }

        public string CurrencyName { get; set; }

        CommonDMaster oDMasters = new CommonDMaster();

        public DataSet CommonGetAccountTrans(CommonAccTrans CommonAccTrans, string dbName)
        {
            return oDMasters.CommonGetAccountTrans(CommonAccTrans, dbName);

        }
    }
}