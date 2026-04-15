using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ABAccountSchedule
    {
        [EuMiData(Name = "Slno")]
        public decimal slno { get; set; }
        [EuMiData(Name = "Acntid")]
        public decimal accountId { get; set; }
        [EuMiData(Name = "Acntdescription")]
        public string description { get; set; }
        [EuMiData(Name = "AcntCode")]
        public decimal accountCode { get; set; }
        [EuMiData(Name = "PrevId")]
        public decimal parentId { get; set; }

        [EuMiData(Name = "Schtype")]
        public string Scheduletype { get; set; }



        public static List<ABAccountSchedule> AccountSchedulewithgrouping(string dbName)
        {
            return SQLHelper.ExcuteAndGet<ABAccountSchedule>("[Acc_TreeviewWithGrouping]", dbName);
        }
        


        public static List<ABAccountSchedule> GetTreeViews(string dbName)
        {
            return SQLHelper.ExcuteAndGet<ABAccountSchedule>("[Acc_Treeview]", dbName);
        }
    }
}