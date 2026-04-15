using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ABStockLocations
    {
        public List<ABLocation> locations { get; set; }

        public static ABStockLocations GetData(string dbName)
        {
            var data = new ABStockLocations();
            data.locations = SQLHelper.ExcuteAndGetSQL<ABLocation>(@"
SELECT LocationId as locationId, LocationCode as locName 
FROM Mst_Location WHERE DelFlag = 1 ORDER BY LocationId ASC", dbName);
            return data;
        }
        public static string GetJsonString(ABStockLocations loc)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(loc);
            return JSONString;
        }
    }
    public class ABLocation
    {
        public long locationId { get; set; }
        public string locName { get; set; }
    }
}