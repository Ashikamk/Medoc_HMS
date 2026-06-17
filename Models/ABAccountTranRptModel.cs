using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ABAccountTranRptModel
    {
        public DateTime dateFrom { get; set; }
        public DateTime dateTo { get; set; }
        public long accountId { get; set; }
        public long jobId { get; set; }
        public long departmentId { get; set; }
        public long costCenterId { get; set; }
        public long AccountGroup { get; set; }
    }
}