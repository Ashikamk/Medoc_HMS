using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class SubCategoryModel
    {
        public long SubCategoryId { get; set; }
        public long CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryDescription { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public string SubCategoryName { get; set; }
        public string CatName { get; set; }

        DMasters oDMasters = new DMasters();

        public DataSet SubCategoryGetandGets(SubCategoryModel oSubCategoryModel, string dbName)
        {
            return oDMasters.SubCategoryGetandGets(oSubCategoryModel, dbName);
        }

        public DataSet SubCategoryInsertandUpdate(SubCategoryModel oSubCategoryModel, string dbName)
        {
            return oDMasters.SubCategoryInsertandUpdate(oSubCategoryModel, dbName);
        }
             


    }
}