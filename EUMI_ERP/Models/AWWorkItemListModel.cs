using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class AWWorkItemListModel
    {
        public long? assignedTo { get; set; }
        public long? assignedBy { get; set; }
        public long? div { get; set; }
        public long? dept { get; set; }

        public long? divByUser { get; set; }

        public long AssignedToyou { get; set; }
        public long AssignedByyou { get; set; }
        public long AssignedToDiv { get; set; }
        public long Showflag { get; set; }
        public string Status { get; set; }
        public long ERPUserId { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
}