using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.Models
{
    public class TermsModel
    {
        public long TermsId { get; set; }
        public int Terms { get; set; }

        public string TermsDescription { get; set; } 

        public int DelFlag { get; set; }

        public string Status { get; set; }

        
        DMasters oDMasters = new DMasters();


        public DataSet TermsGetandGets(TermsModel oTermsModel, string dbName)
        {
            return oDMasters.TermsGetandGets(oTermsModel, dbName);
        }


        public DataSet TermsInsertandUpdate(TermsModel oTermsModel, string dbName)
        {
            return oDMasters.TermsInsertandUpdate(oTermsModel, dbName);
        }

    }
}