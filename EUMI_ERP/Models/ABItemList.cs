using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    /*
     		ROW_NUMBER() OVER (ORDER BY [Description]) as Slno, 
		Mst_Item.ItemId,
		Mst_Item.ItemCode,
		Mst_Item.[Description],
		Mst_UnitMain.UnitName,
		Mst_GroupMain.GrpName,
		Mst_SubGroupMain.SbgrpName,
		Mst_Category.CategoryName,
		Mst_SubCategory.SubCategoryName,
		Mst_item.SellingPrice,
		Mst_Item.Active,
		CASE WHEN Active = 1 THEN 'Active' ELSE 'In Active' END as [Status] 
    */
    public class ABItemList
    {
        public long ItemId { get; set; }
        public long openqty { get; set; }
        public long stock { get; set; }
        public string ItemCode { get; set; }
        public string Description { get; set; }
        public string TaxName { get; set; }
        public decimal SellingPrice { get; set; }
        public decimal AvgCost { get; set; }
        public string Model1 { get; set; }
        public string Model2 { get; set; }
        public string Model3 { get; set; }
        public int Active { get; set; }
        public string Status { get; set; }
        public long Slno { get; set; }
        public decimal MrpRate { get; set; }
        public string UnitName { get; set; }
        public string GrpName { get; set; }
        public string SbgrpName { get; set; }

        public string CategoryName { get; set; }

        public string SubCategoryName { get; set; }
        public int GroupId { get; set; }
        public int CategoryId { get; set; }
        public static List<ABItemList> ItemGetAll(string dbName)
        {
            return SQLHelper.ExcuteAndGet<ABItemList>("ItemGetAll", dbName);
        }

    }

}
