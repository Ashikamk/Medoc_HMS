using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class PurchaseOrderPending
    {

        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }

        public string DepartmentId { get; set; }

        public string SupplierId { get; set; }
        public string Product { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string Group { get; set; }
        public string SubGroup { get; set; }
        public string JobCode { get; set; }
        public string Material { get; set; }


        

    }
}
