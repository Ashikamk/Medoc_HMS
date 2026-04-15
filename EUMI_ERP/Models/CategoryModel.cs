using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class CategoryModel
    {
        public string UnitName { get; set; }
        public string Code { get; set; }
        public string ToolDesc { get; set; }
        public long category { get; set; }
        public long group { get; set; }
        public long ToolId { get; set; }
        public int ToolQty { get; set; }
        public int Pcs { get; set; }
        public string OtherDetails { get; set; }
        public string CategoryName { get; set; }
        public string GroupName { get; set; }
        public string CategoryCode { get; set; }
        public string CategoryDescription { get; set; }
        public long CategoryId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }



        DMasters oDMasters = new DMasters();


        public DataSet CategoryGetandGets(CategoryModel oCategoryModel, string dbName)
        {
            return oDMasters.CategoryGetandGets(oCategoryModel, dbName);
        }
        public DataSet ToolsGetandGets(CategoryModel oCategoryModel, string dbName)
        {
            return oDMasters.ToolsGetandGets(oCategoryModel, dbName);
        }
        public DataSet ToolsAutocomplete(CategoryModel CategoryModel, string dbName)
        {
            return oDMasters.ToolsAutocomplete(CategoryModel, dbName);
        }

        public DataSet CategoryInsertandUpdate(CategoryModel oCategoryModel, string dbName)
        {
            return oDMasters.CategoryInsertandUpdate(oCategoryModel, dbName);
        }
        public DataSet ToolsInsertandUpdate(CategoryModel oCategoryModel, string dbName)
        {
            return oDMasters.ToolsInsertandUpdate(oCategoryModel, dbName);
        }
    }
}