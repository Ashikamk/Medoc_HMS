using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class StockTransferOutReport
    {
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
        public string DepartmentId { get; set; }

    }
}