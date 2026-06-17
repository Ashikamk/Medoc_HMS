using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP
{
    public class BillSeriesModel
    {
        public long id { get; set; }
        public string BillDescription { get; set; }
        public string BillType { get; set; }
        public string Prefix { get; set; }
        public string PayTerms { get; set; }
        public string Terms { get; set; }
        public string StartingNo { get; set; }
        public string CurrentNo { get; set; }
        public int DeptId { get; set; }
        public string TP { get; set; }  
        public string Status { get; set; }
        public int DeleteFlag { get; set; }
        public string Dept{ get; set; }


        DMasters oDMasters = new DMasters();
        DCompany oDCompany = new DCompany();

        public DataSet BillSeriesGetandGets(BillSeriesModel oBillSeriesModel, string dbName)
        {
            return oDMasters.BillSeriesGetandGets(oBillSeriesModel, dbName);
        }
        public DataSet BillOrderSeriesGetandGets(BillSeriesModel oBillSeriesModel, string dbName)
        {
            return oDMasters.BillOrderSeriesGetandGets(oBillSeriesModel, dbName);
        }
        public DataSet BillSeriesInsertandUpdate(BillSeriesModel oBillSeriesModel, string dbName)
        {
            return oDCompany.BillSeriesInsertandUpdate(oBillSeriesModel, dbName); 
        }
        public DataSet BSeriesGetandGets(BillSeriesModel oBillSeriesModel, string dbName)
        {
            return oDCompany.BSeriesGetandGets(oBillSeriesModel, dbName);
        }
        public DataSet BillSeriesSalesReturnGetandGets(BillSeriesModel oBillSeriesModel, string dbName)
        {
            return oDMasters.BillSeriesSalesReturnGetandGets(oBillSeriesModel, dbName); 
        }
        public DataSet HMS_OPSeriesGetandGets(BillSeriesModel oBillSeriesModel, string dbName)
        {
            return oDMasters.HMS_OPSeriesGetandGets(oBillSeriesModel, dbName); 
        }
    }
}