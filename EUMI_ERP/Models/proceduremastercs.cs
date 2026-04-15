using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using EUMI_ERP.DataLayer;

namespace EUMI_ERP.Models
{
    public class proceduremastercs
    {
        public int PersonId { get; set; }
        public long ProcedureId { get; set; }
        public String ProcedureCode { get; set; }
        public String ProcedureName { get; set; }

        public String ProcedureAge { get; set; }

        public String ProcedureGender { get; set; }

        public String ProcedureAddress { get; set; }

        public String ProcedureNumber { get; set; }
        public decimal Procedurecharge { get; set; }

        public long RegId { get; set; }
        public String AppFirst { get; set; }
        public String PGender { get; set; }
        public String PDOB { get; set; }
        public String Age { get; set; }
        public String Deptname { get; set; }
        public String Branch { get; set; }
        public String Doctor { get; set; }
        public String PDATE { get; set; }
        public String Time { get; set; }
        public String AppLast { get; set; }
        public String MobileNo { get; set; }
        public String Country { get; set; }
        public String EmailId { get; set; }
        public long TokNo { get; set; }
        public String FromDate { get; set; }
        public String ToDate { get; set; }

        public String Name { get; set; }
        public String currenttoken { get; set; }
        public String NextToken { get; set; }

        public int DelFlag { get; set; }

        public string Status { get; set; }


        DMasters oDMasters = new DMasters();
        DReVisit oDReVisit = new DReVisit();

        public DataSet PersonInsert(proceduremastercs oProcedureModel, string dbName)
        {
            return oDMasters.PersonInsert(oProcedureModel, dbName);
        }

        public DataSet GetPersons(string dbName)
        {
            return oDMasters.GetPersons(dbName);
        }

        public DataSet GetPersonById(int id, string dbName)
        {
            return oDMasters.GetPersonById(id, dbName);
        }

        public DataSet UpdatePerson(proceduremastercs oProcedureModel, string dbName)
        {
            return oDMasters.UpdatePerson(oProcedureModel, dbName);
        }

        public DataSet DeletePerson(int id, string dbName)
        {
            return oDMasters.DeletePerson(id, dbName);
        }

        public DataSet ProcedureGetandGets(proceduremastercs oProcedureModel, string dbName)
        {
            return oDMasters.ProcedureGetandGets(oProcedureModel, dbName);
        }
        public DataSet ProcedureInsertandUpdate(proceduremastercs oProcedureModel, string dbName)
        {
            return oDMasters.ProcedureInsertandUpdate(oProcedureModel, dbName);
        }
        public DataSet HMS_ProcedureSearch(proceduremastercs oProcedureModel, string dbName)
        {
            return oDReVisit.HMS_ProcedureSearch(oProcedureModel, dbName);  
        }

        public DataSet Appointment123GetandGets(proceduremastercs oProcedureModel, string dbName)
        {
            return oDMasters.Appointment123GetandGets(oProcedureModel, dbName);
        }
        public DataSet Token123GetandGets(proceduremastercs oProcedureModel, string dbName)
        {
            return oDMasters.Token123GetandGets(oProcedureModel, dbName);
        }
    }
}