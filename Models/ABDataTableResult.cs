using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ABDataTableResult<T>
    {
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<T> data { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string error { get; set; }
    }
}