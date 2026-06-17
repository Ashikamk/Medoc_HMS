using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP
{
    public class FastandNonMovingModel
    {
        public string Condition { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string Number { get; set; }

        public string ItemCode { get; set; }
        public string ItemDesc { get; set; }

        public string GroupId { get; set; }
        public string SubGroupId { get; set; }
        public string CategoryId { get; set; }
        public string SubCategoryId { get; set; }
        public string GroupName { get; set; }
        public string SubGroupName { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
        public string Qty { get; set; }
        public string AvgCost { get; set; }
        public string Rate { get; set; }
        public string Amount { get; set; }
        public string UserId { get; set; }
        public string Stock { get; set; }

        public string ImportDate { get; set; }
        public string LocalDate { get; set; }
        public string Type { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();

        
        public DataSet PurchaseOrderReminder(FastandNonMovingModel oFastandNonMovingModel, string dbName)
        {
            return oDInvPurchaseReport.PurchaseOrderReminder(oFastandNonMovingModel, dbName);
        }




        public DataSet FastMovingItemsGet(FastandNonMovingModel oFastandNonMovingModel, string dbName)
        {
            return oDInvPurchaseReport.FastMovingItemsGet(oFastandNonMovingModel, dbName);
        }
        public DataSet FastMovingItemsDashboard(FastandNonMovingModel oFastandNonMovingModel, string dbName)
        {
            return oDInvPurchaseReport.FastMovingItemsDashboard(oFastandNonMovingModel, dbName);
        }
        public DataSet NonMovingItemsDashboard(FastandNonMovingModel oFastandNonMovingModel, string dbName)
        {
            return oDInvPurchaseReport.NonMovingItemsDashboard(oFastandNonMovingModel, dbName);
        }
        public DataSet NonMovingItemsGet(FastandNonMovingModel oFastandNonMovingModel, string dbName)
        {
            return oDInvPurchaseReport.NonMovingItemsGet(oFastandNonMovingModel, dbName);
        }
    }
}