using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ABDataTableModel<T>
    {
        public int draw { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public ABDataTableSearchModel search { get; set; }
        public List<ABDataTableOrderModel> order { get; set; }
        public List<ABDataTableColumnModel> columns { get; set; }
        public T addData { get; set; }
    }
    public class ABDataTableSearchModel
    {
        public string value { get; set; }
        public bool regex { get; set; }
    }
    public class ABDataTableOrderModel
    {
        public int column { get; set; }
        public string dir { get; set; }
    }
    public class ABDataTableColumnModel
    {
        public string data { get; set; }
        public string name { get; set; }
        public bool searchable { get; set; }
        public bool orderable { get; set; }
        public ABDataTableSearchModel search { get; set; }
    }
}