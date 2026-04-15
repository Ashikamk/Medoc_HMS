using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PurchaseReportModel
    {
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }

        public int DepartmentId { get; set; }
        public int Area { get; set; }
        public int LocnId { get; set; }
        public int SupplierId { get; set; }
        public int PayType { get; set; }
        public string PurchaseType { get; set; }
        public int JobNo { get; set; }
        public int UserId { get; set; }
    }
}