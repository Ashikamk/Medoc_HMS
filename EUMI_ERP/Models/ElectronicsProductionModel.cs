using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ElectronicsProductionModel
    {

      
        public string ProductionItemId { get; set; }      
       
        public long UnitId { get; set; }
        public int Location { get; set; }                   
        public string SellingPrice { get; set; }
        public string AccessoriesName { get; set; }
        public int DeptId { get; set; }    
       public string ItemCode { get; set; }
        public string Amount { get; set; }
        public string ItemDescription { get; set; }
        public int materialId { get; set; }
        public int ItemId { get; set; }       
        public int Quantity { get; set; }
        public int UsedQuantity { get; set; }
        public string Description { get; set; }
        public string materialslno { get; set; }
        public string Code { get; set; }
        public string Status { get; set; }
        public string productslno { get; set; }
        public string totamount { get; set; }
        public string costprice { get; set; }

        DElectronics oDElectronics = new DElectronics();
        public DataSet MainItemDetailsGetandGets(ElectronicsProductionModel oElectronicsProductionModel, string dbName)
        {
            return oDElectronics.MainItemDetailsGetandGets(oElectronicsProductionModel, dbName);
        }
        public DataSet ElectronicsProductionProductSearch(ElectronicsProductionModel oElectronicsProductionModel, string dbName)
        {
            return oDElectronics.ElectronicsProductionProductSearch(oElectronicsProductionModel, dbName);
        }
       
        public DataSet RemoveItem(ElectronicsProductionModel oElectronicsProductionModel, string dbName)
        {
            return oDElectronics.RemoveItem(oElectronicsProductionModel, dbName);
        }

        
    }
}