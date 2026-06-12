using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class RealEstatePDC
    {
        public int Flag { get; set; }
        public string DEWANo { get; set; }
        public string FlatType { get; set; }
        public decimal Rent { get; set; }
        public string VacantDays { get; set; }
        public string VacantOn { get; set; }
        public string ChequeNo { get; set; }
        public string FromDate { get; set; }
        public string ChequeDate { get; set; }
        public string ToDate { get; set; }
        public string VDate { get; set; }
        public decimal Amount { get; set; }
        public long CurrencyId { get; set; }
        public string CurrencyName { get; set; }
        public decimal CurrencyRate { get; set; }
        public long BankId { get; set; }
        public string BankName { get; set; }
        public string ContraNo { get; set; }
        public long TenantId { get; set; }
        public string Tenant { get; set; }
        public long BuildingId { get; set; }
        public string Building { get; set; }
        public long PremiseId { get; set; }
        public string Premise { get; set; }
        public long FlatId { get; set; }
        public string FlatNo { get; set; }
        public string Variable1 { get; set; }
        public string Varibale2 { get; set; }
        public string Condition { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }

        DRealestate oDRealestate = new DRealestate();
        public DataSet Rpt_RealEstatePDCList(RealEstatePDC RealEstatePDC, string dbName)
        {
            return oDRealestate.Rpt_RealEstatePDCList(RealEstatePDC, dbName);
        }
        public DataSet Rpt_RealEstateVacantFlatLoss(RealEstatePDC RealEstatePDC, string dbName)
        {
            return oDRealestate.Rpt_RealEstateVacantFlatLoss(RealEstatePDC, dbName);
        }

        
    }
}