using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class SalesReportModel
    {
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
      
        public string Area { get; set; }
        public string Paytype { get; set; }
        public string SalesamanId { get; set; }
        public string CustId { get; set; }
        public string GroupId { get; set; }
        public string SubGroupId { get; set; }
        public string CategoryId { get; set; }
        public string SubCategoryId { get; set; }
        public string DepartmentId { get; set; }
        public string UserId { get; set; }
    }
}