using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace EUMI_ERP.Models
{
    public class WasteModel
    {
        public long wasteId { get; set; }
        public long DeptId { get; set; }
        public long UserId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string wastetype1 { get; set; }
        public string wastetype2 { get; set; }
        public string wastetype3 { get; set; }
        public string wastetype4 { get; set; }
        public string wastetype5 { get; set; }
        public string paiddate { get; set; }
        public long paiduser { get; set; }
        public string wastedata { get; set; }
        public string payflg { get; set; }

        public string CurrentDtTime { get; set; }
        public string PayRate { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        DMasters oDMasters = new DMasters();
        public DataSet WasteGetandGets(WasteModel WasteModel, string dbName)
        {
            return oDMasters.WasteGetandGets(WasteModel, dbName);
        }
        public DataSet WasteInsertandUpdate(WasteModel WasteModel, string dbName)
        {
            return oDMasters.WasteInsertandUpdate(WasteModel, dbName);


        }
        public DataSet HMS_PaymentUpdate(WasteModel WasteModel, string dbName)
        {
            return oDMasters.HMS_PaymentUpdate(WasteModel, dbName);


        }
        public DataSet WasteReport(WasteModel oWasteModel, string dbName)
        {
            return oDMasters.WasteReport(oWasteModel, dbName);
        }
    }
}