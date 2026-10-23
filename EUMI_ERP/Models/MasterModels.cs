using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;


namespace EUMI_ERP
{
    public class MasterModels
    {
        public long MethodId { get; set; }

        public string MethodName { get; set; }

        public string MDescription { get; set; }

        public string Remarks { get; set; }

        public int DelFlag { get; set; }
        public string Status { get; set; }

        DMasters oDMasters = new DMasters();

        public DataSet MethodMasterGetandGets(MasterModels oMasterModels, string dbName)
        {
            return oDMasters.MethodMasterGetandGets(oMasterModels, dbName);
        }

        public DataSet MethodMasterInsertandUpdate(MasterModels oMasterModels, string dbName)
        {
            return oDMasters.MethodMasterInsertandUpdate(oMasterModels, dbName);
        }

        public long SchemeId { get; set; }
        public string DiscountCode { get; set; }
        public string DiscountName { get; set; }

        public decimal? PharmaDisc { get; set; }
        public decimal? LabDisc { get; set; }
        public decimal? ProcedureDisc { get; set; }
        public decimal? IPDisc { get; set; }
        public decimal? RegistrationDisc { get; set; }
        public decimal? RevisitDisc { get; set; }
        public decimal? Other1Disc { get; set; }
        public decimal? Other2Disc { get; set; }
        public decimal? Other3Disc { get; set; }

        public DataSet SchemeDiscountMasterGetandGets(MasterModels oMasterModels, string dbName)
        {
            return oDMasters.SchemeDiscountMasterGetandGets(oMasterModels, dbName);
        }

        public DataSet SchemeDiscountMasterInsertandUpdate(MasterModels oMasterModels, string dbName)
        {
            return oDMasters.SchemeDiscountMasterInsertandUpdate(oMasterModels, dbName);
        }





    }
}