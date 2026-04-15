

using System;
using System.Web;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace EUMI_ERP
{
    public class EmployeeDocumentExpiryReport
    {

        public string FromDate { get; set; }

        public string ToDate { get; set; }

        public string DocumentType { get; set; }

        public string EmpCode { get; set; }

        public string EmpName { get; set; }

        public string DOB { get; set; }

        public string Mobile { get; set; }

        public string Email { get; set; }

        public string Gender { get; set; }

        public string DateofJoin { get; set; }

        public string PassportNo { get; set; }

        public string IDType { get; set; }


        DInvPurchaseReport oDInvPurchaseReport = new DInvPurchaseReport();
        public DataSet EmployeeDocumentExpiryGet(EmployeeDocumentExpiryReport oEmployeeDocumentExpiryReport, string dbName)
        {
            return oDInvPurchaseReport.EmployeeDocumentExpiryGet(oEmployeeDocumentExpiryReport, dbName);
        }
    }
}