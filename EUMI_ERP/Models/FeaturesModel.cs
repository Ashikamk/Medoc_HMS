using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
using EUMI_ERP.DataLayer;



namespace EUMI_ERP.Models
{
    public class FeaturesModel
    {
        public string Code { get; set; }
        public string Facilities { get; set; }
        public string Details { get; set; }
        public long FeaturesModelId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        DFeatures oDFeatures = new DFeatures();
        public DataSet FeaturesInsertandUpdate(FeaturesModel oFeaturesModel, string dbName)
        {
            return oDFeatures.FeaturesInsertandUpdate(oFeaturesModel, dbName);
        }
        public DataSet FeaturesGetandGets(FeaturesModel oFeaturesModel, string dbName)
        {
            return oDFeatures.FeaturesGetandGets(oFeaturesModel, dbName);
        }
    }
}