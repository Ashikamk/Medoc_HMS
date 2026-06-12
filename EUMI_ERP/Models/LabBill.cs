using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.DataLayer; 

namespace EUMI_ERP.Models
{
    public class LabBill
    {

        public string URL { get; set; }
        public long BillMainId { get; set; }
        public long BillNo { get; set; }
        public long BillYear { get; set; }
        public string BillDate { get; set; }
        public long RegNo { get; set; }
        public long RegSeries { get; set; }
        public long OpNo { get; set; }
        public long IpNo { get; set; }
        public string Name { get; set; }
        public string Age { get; set; }
        public long Gender { get; set; }
        public long Doctor { get; set; }
        public string Hospital { get; set; }
        public decimal TotalAmt { get; set; }
        public decimal DiscPercent { get; set; }
        public decimal DiscAmt { get; set; }
        public decimal NetAmt { get; set; }
        public long TestId { get; set; }
        public string Department { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public decimal TestAmount { get; set; }
        public long RateType { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public long DelFlag { get; set; }
        public long Type { get; set; }
     
        public long PayType { get; set; }
        public string Status { get; set; }
        public string TestName { get; set; }
        public decimal PQty { get; set; }
        public decimal PRate { get; set; }
        public string IPYear { get; set; }
        public string AdmitDate { get; set; }
        public string AdmitTime { get; set; }
        public string DischargeDate { get; set; }
        public string DischargeTime { get; set; } 
        public string SurgeryDate { get; set; }
        public string Remarks { get; set; }
        public string Others { get; set; }


        public string Cashrec { get; set; }
        public string CardRec { get; set; }
        public string Upirec { get; set; }

        


        DReVisit oDReVisit = new DReVisit();
        DMasters oDMaster = new DMasters(); 
        DHospital oDHospital = new DHospital();

        
             public DataSet HMS_BillInsertforpharma(DataTable dt, string dbName)
        {
            return oDReVisit.HMS_BillInsertforpharma(dt, dbName);
        }


        public DataSet HMS_BillInsert(DataTable dt, string dbName)
        {
            return oDReVisit.HMS_BillInsert(dt, dbName);
        }

        public DataSet HMS_BillNoSearch(LabBill oLabBill, string dbName)
        {
            return oDReVisit.HMS_BillNoSearch(oLabBill, dbName);   
        }
        public DataSet LabTestWiseReport(LabBill oLabBill, string dbName)
        {
            return oDMaster.LabTestWiseReport(oLabBill, dbName);
        }

        
                public DataSet HMS_CasualityAdviceGets(LabBill oLabBill, string dbName)
        {
            return oDReVisit.HMS_CasualityAdviceGets(oLabBill, dbName);
        }


        public DataSet HMS_ProcAdvicegets(LabBill oLabBill, string dbName)
        {
            return oDReVisit.HMS_ProcAdvicegets(oLabBill, dbName);
        }

        public DataSet HMS_LabAdvicegets(LabBill oLabBill, string dbName)
        {
            return oDReVisit.HMS_LabAdvicegets(oLabBill, dbName);
        }
        
             public DataSet HMS_BillNumberGetandGetsload(LabBill oLabBill, string dbName)
        {
            return oDReVisit.HMS_BillNumberGetandGetsload(oLabBill, dbName);
        }


        public DataSet HMS_BillNumberGetandGets(LabBill oLabBill, string dbName) 
        {
            return oDReVisit.HMS_BillNumberGetandGets(oLabBill, dbName);  
        }
        public DataSet HMS_BillNumberListView(LabBill oLabBill, string dbName)
        {
            return oDReVisit.HMS_BillNumberListView(oLabBill, dbName); 
        }
        public DataSet HMS_BillUpdate(DataTable dt, string dbName)
        {
            return oDReVisit.HMS_BillUpdate(dt, dbName); 
        }

            public DataSet HMS_Cashpaymentdelete(LabBill oLabBill, string dbName)
        {
            return oDReVisit.HMS_Cashpaymentdelete(oLabBill, dbName);
        }


        public DataSet HMS_LabBillDelete(LabBill oLabBill, string dbName) 
        {
            return oDReVisit.HMS_LabBillDelete(oLabBill, dbName); 
        }
        public DataSet HMS_PatientTestDetailsGet(LabBill oLabBill, string dbName)
        {
            return oDHospital.HMS_PatientTestDetailsGet(oLabBill, dbName); 
        }


        
            public DataSet IPAdvancebillstatus(LabBill oLabBill, string dbName)
        {
            return oDMaster.IPAdvancebillstatus(oLabBill, dbName);
        }


        public DataSet LabBillReport(LabBill oLabBill, string dbName)
        {
            return oDMaster.LabBillReport(oLabBill, dbName);
        }
        public DataSet IPBillReport(LabBill oLabBill, string dbName)
        {
            return oDMaster.IPBillReport(oLabBill, dbName);
        }

        public DataSet ProcedureBillReportItemWise(LabBill oLabBill, string dbName)
        {
            return oDMaster.ProcedureBillReportItemWise(oLabBill, dbName);
        }
        public DataSet ProcedureBillReport(LabBill oLabBill, string dbName)
        {
            return oDMaster.ProcedureBillReport(oLabBill, dbName);
        }
    }
}