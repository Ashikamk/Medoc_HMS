//30/03/2019

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP.Models
{
    public class GSTModel
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string BillNo { get; set; }
        public string BillSeriesId { get; set; }
        public string BillSeries { get; set; }
        public string BillDate { get; set; }
        public string Customer { get; set; }
        public string Amount0 { get; set; }
        public string Amount5 { get; set; }
        public string GST5 { get; set; }

        public string Amount12 { get; set; }
        public string GST12 { get; set; }
        public string Amount18 { get; set; }
        public string GST18 { get; set; }
        public string Amount28 { get; set; }
        public string GST28 { get; set; }
        public string DeptId { get; set; }
        public string UserId { get; set; }
        public string roundof { get; set; }      

        public string Taxable { get; set; }
        public string Tax { get; set; }

        public string Amount { get; set; }






        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();


        public DataSet GSTSales(GSTModel oGSTModel, string dbName)
        {
            return oDInvPurchaseReport.GSTSales(oGSTModel, dbName);
        }
        public DataSet GSTPurchase(GSTModel oGSTModel, string dbName)
        {
            return oDInvPurchaseReport.GSTPurchase(oGSTModel, dbName);
        }

    }
}