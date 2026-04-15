using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace EUMI_ERP.Models
{
    public class BranchMaster
    {
        public long BrnchId { get; set; }
        public string BrnchCode { get; set; }
        public string BrnchName {get;set;}       
        public string BrnchDescription { get; set; }
        public string BrnchAddress1{ get; set; }
        public string BrnchAddress2 { get; set; }
        public string BrnchAddress3 { get; set; }
        public string BrnchContactNo { get; set; } 
        public string BrnchMobileNo { get; set; }
        public string BrnchEmail { get; set; } 
        public int DelFlag { get; set; }
        public string Status { get; set; }         
   

       DMasters oDMasters = new DMasters();

       public DataSet BranchInsertandUpdate(BranchMaster oBranchMaster, string dbName)                                     
        {
        return oDMasters.BranchInsertandUpdate(oBranchMaster, dbName);
       }

        public DataSet BranchGetandGets(BranchMaster oBranchMaster, string dbName)                                            
        {
            return oDMasters.BranchGetandGets(oBranchMaster, dbName);
        }

    }
}