using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EUMI_ERP.DataTablesServer
{
    public class EumiPrintData
    {
        public Func<int, System.Data.DataTable> getOneSet = null;
        public string title { get; set; }
        public string messageTop { get; set; }
        public string messageBottom { get; set; }
    }
}