using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class ItemMappingModel
    {
        public int GroupId { get; set; }
        public int DelFlag { get; set; }
        public int SubItemId { get; set; }
        public int ItemId { get; set; }
        public int ItemnameId { get; set; }
        public int ItemQty { get; set; }
        public int SubitemsId { get; set; }
        public int MappingId { get; set; }
        public int SItemsId { get; set; }
        public int Quantity { get; set; }
        public String GroupName { get; set; }
        public String Status { get; set; }
        public String AutomobileItems { get; set; }
        public String SubItemName { get; set; }
        public string ItemCode { get; set; }
        public string SItemName { get; set; }

        DItemMapping ODItemMapping = new DItemMapping();
        public DataSet ItemGroupGetandGets(ItemMappingModel oItemMappingModel, String dbName)
        {
            return ODItemMapping.ItemGroupGetandGets(oItemMappingModel, dbName);
        }
       
        public DataSet MainItemSearch(ItemMappingModel oItemMappingModel, string dbName)
        {
            return ODItemMapping.MainItemSearch(oItemMappingModel, dbName);
        }
        public DataSet ItemSearch(ItemMappingModel oItemMappingModel, string dbName)
        {
            return ODItemMapping.ItemSearch(oItemMappingModel, dbName);
        }
        
        public DataSet SubItemsGetandGets(ItemMappingModel oItemMappingModel, string dbName)
        {
            return ODItemMapping.SubItemsGetandGets(oItemMappingModel, dbName);
        }
       
        public DataSet ItemGroupMappingInsert(DataTable dt, string dbName)
        {
            return ODItemMapping.ItemGroupMappingInsert(dt, dbName);
        }
        
    }
}