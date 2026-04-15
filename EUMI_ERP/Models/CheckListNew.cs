using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class CheckListNew
    {
        public string Key { get; set; }
        public string Mirror { get; set; }
        public string MonoGram { get; set; }
        public string Battery { get; set; }
        public string avail { get; set; }
        public string qty { get; set; }
        public string Date { get; set; }
        public long CheckListId { get; set; }
        public long ItemId { get; set; }
        public string ItemCode { get; set; }
        public string Description { get; set; }
        public string Components { get; set; }
        public long UserId { get; set; }
        public string UserName { get; set; }
        public long DeptId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        DcheckList oDheckList = new DcheckList();


        public DataSet  CheckListComponentsGetandGets(CheckListNew oCheckListNew, string dbName)
        {
            return oDheckList.CheckListComponentsGetandGets(oCheckListNew, dbName);
        }
        public DataSet CheckListGetandGets(CheckListNew oCheckListNew, string dbName)
        {
            return oDheckList.CheckListGetandGets(oCheckListNew, dbName);
        }
        public DataSet CheckListInsertandUpdate(DataTable dt, string dbName)
        {
            return oDheckList.CheckListInsertandUpdate(dt, dbName);
        }




    }
}