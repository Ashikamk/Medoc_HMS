using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class MaterialReturn
    {
        public long ReturnNo { get; set; }
        public string ReturnDate { get; set; }
        public long JobCodeId { get; set; }
        public string JobCode { get; set; }
        public long CostCode { get; set; }
        public string CostCodeName { get; set; }  
        public string CreditAcc { get; set; } 
        public string CreditAccDesc { get; set; }
        public string DebitAcc { get; set; }
        public string DebitAccDesc { get; set; }
        public string Comments { get; set; }
        public long ProductId { get; set; }
        public string Product { get; set; }
        public string PDescr { get; set; }
        public long PUnit { get; set; }
        public long PLoc { get; set; }
        public int PQty { get; set; }
        public decimal PPrice { get; set; }
        public decimal PDisc { get; set; }
        public decimal PAmount { get; set; }
        public long PCostCode { get; set; } 
        public decimal TotalAmt { get; set; }
        public decimal TotalDisc { get; set; } 
        public int TotalQty { get; set; } 
        public long DelFlag { get; set; }
        public string Status { get; set; }
        public long UserId { get; set; }
        public string DepartmentName { get; set; }
        public long DeptId { get; set; }
        public long Flag { get; set; }
        public string PDCostCodeName { get; set; } 

        DProjectandJob oDProjectandJob = new DProjectandJob(); 

        public DataSet MaterialReturnInsert(DataTable dt, string dbName)
        {
            return oDProjectandJob.MaterialReturnInsert(dt, dbName);
        }
        public DataSet MaterialReturnUpdate(DataTable dt, string dbName) 
        {
            return oDProjectandJob.MaterialReturnUpdate(dt, dbName);
        }
        public DataSet MaterialReturnNoSearch(MaterialReturn oMaterialReturn, string dbName)
        {
            return oDProjectandJob.MaterialReturnNoSearch(oMaterialReturn, dbName);  
        }
        public DataSet MaterialReturnGetandGets(MaterialReturn oMaterialReturn, string dbName)
        {
            return oDProjectandJob.MaterialReturnGetandGets(oMaterialReturn, dbName);  
        }
        public DataSet MaterialReturnDelete(MaterialReturn oMaterialReturn, string dbName)
        {
            return oDProjectandJob.MaterialReturnDelete(oMaterialReturn, dbName);  
        }
    }
}