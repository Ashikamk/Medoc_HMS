using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ProductionEntryReport
    {
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
        public string Product { get; set; }
        public string Jobcode { get; set; }
        public string Department { get; set; }
        public string UserId { get; set; }
    }
}