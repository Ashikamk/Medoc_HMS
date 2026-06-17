using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class MenuShortcutModel
    {
        public string MasterId { get; set; }
        public string MenuName { get; set; }
        public string MenuCode { get; set; }
        public string HFlag { get; set; }
        public int uid { get; set; }
         public decimal userid { get; set; }
        public string username { get; set; }
        public string userright { get; set; }
        public string url { get; set; }
        public string status { get; set; }
        public int delflag { get; set; }
        

        

        DataMenuShortCut obj = new DataMenuShortCut();
        public DataSet ShortcutMenusInsertandUpdate(MenuShortcutModel dt, string dbName)
        {
            return obj.ShortcutMenusInsertandUpdate(dt, dbName);
        }
        public DataSet ShotcutMenuGetandGets(MenuShortcutModel dt, string dbName)
        {
            return obj.ShotcutMenuGetandGets(dt, dbName);
        }
        public DataSet MenuGetandGets(MenuShortcutModel dt, string dbName)
        {
            return obj.MenuGetandGets(dt, dbName);
        }
    }
}