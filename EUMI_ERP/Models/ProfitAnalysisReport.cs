using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ProfitAnalysisReport
    {
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
        public string Product { get; set; }
        public string Salesman { get; set; }
        public string Customer { get; set; }
        public string Account { get; set; }
        public string Area { get; set; }
        public string UserId { get; set; }
    }
}