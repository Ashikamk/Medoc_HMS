using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class InsuranceCompanyModel
    {
        public string InsuranceCompanyName { get; set; }
        public string InsuranceCompanyCode { get; set; }
        public string Benefits { get; set; }
        public string InsuranceCompanyDescription { get; set; }
        public long InsuranceCompanyId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }


        DMasters oDMasters = new DMasters();

        
public DataSet InsuranceCompanymasterGetandGets(InsuranceCompanyModel oInsuranceCompanyModel, string dbName)
        {
            return oDMasters.InsuranceCompanymasterGetandGets(oInsuranceCompanyModel, dbName);
        }



        public DataSet InsuranceCompanyGetandGets(InsuranceCompanyModel oInsuranceCompanyModel, string dbName)
        {
            return oDMasters.InsuranceCompanyGetandGets(oInsuranceCompanyModel, dbName);
        }


        public DataSet InsuranceCompanyInsertandUpdate(InsuranceCompanyModel oInsuranceCompanyModel, string dbName)
        {
            return oDMasters.InsuranceCompanyInsertandUpdate(oInsuranceCompanyModel, dbName);
        }
    }
}