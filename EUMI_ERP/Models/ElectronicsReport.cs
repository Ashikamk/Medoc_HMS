using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP.Models
{
    public class ElectronicsReport
    {
        public string Condition { get; set; }
        public string Condition1 { get; set; }
        public string Count { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string Unit { get; set; }
        public string Group { get; set; }
        public string SubGroup { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string SlNo { get; set; }
        public string AccId { get; set; }
        public string AccId2 { get; set; }
        public string AccId3 { get; set; }
        public string AccId4 { get; set; }
        public string AccId5 { get; set; }
        public string AccId6 { get; set; }
        public string AccId7 { get; set; }
        public string ItemId { get; set; }
        public string Quantity { get; set; }
        public string AvgCost { get; set; }
        public string SellingPrice { get; set; }
        public string AccessoriesId { get; set; }

        DElectronicsReport oDElectronicsReport = new DElectronicsReport();


        public DataSet ElectronicsItemwiseReport(ElectronicsReport oElectronicsReport, string dbName)
        {
            return oDElectronicsReport.ElectronicsItemwiseReport(oElectronicsReport, dbName);
        }

        public DataSet ModelNoSearch(ElectronicsReport oElectronicsReport, string dbName)
        {
            return oDElectronicsReport.ModelNoSearch(oElectronicsReport, dbName);
        }

        public DataSet ElectronicsReportwithAccessories(ElectronicsReport oElectronicsReport, string dbName)
        {
            return oDElectronicsReport.ElectronicsReportwithAccessories(oElectronicsReport, dbName);
        }
    }
}