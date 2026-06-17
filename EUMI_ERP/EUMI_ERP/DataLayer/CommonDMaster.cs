using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.DataLayer
{
    public class CommonDMaster
    {
        private SqlParameter[] arlParms;
        public DataSet GetCountry(Country Country, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CountryId", Country.CountryId);
                return SQLHelper.ExecuteDataset("CountryGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }



        public DataSet GetManager(Manager Manager, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ManagerId", Manager.ManagerId);
                return SQLHelper.ExecuteDataset("ManagerGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet GetCompany(Company Company, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@CompanyId", Company.CompanyId);
                return SQLHelper.ExecuteDataset("CompanyGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }

        public DataSet GetIDType(ID_Type IDType, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@Id", IDType.Id);
                return SQLHelper.ExecuteDataset("IDTypeGetandGets", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }


        public DataSet SlNoGetandGets(SerialNumber SerialNumberModel, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@deptid", SerialNumberModel.DeptId);
                return SQLHelper.ExecuteDataset("GetShowSlnoNumber", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
        public DataSet CommonGetAccountTrans(CommonAccTrans CommonAccTrans, string dbName)
        {
            try
            {
                arlParms = new SqlParameter[8];
                arlParms[0] = new SqlParameter("@VouNo", CommonAccTrans.VouNo);
                arlParms[1] = new SqlParameter("@PreFix", CommonAccTrans.Prefix);
                arlParms[2] = new SqlParameter("@ORPreFix", CommonAccTrans.Prefix1);
                arlParms[3] = new SqlParameter("@OR1PreFix", CommonAccTrans.Prefix2);
                arlParms[4] = new SqlParameter("@OR2PreFix", CommonAccTrans.Prefix3);
                arlParms[5] = new SqlParameter("@DeptId", CommonAccTrans.DeptId);
                arlParms[6] = new SqlParameter("@UserId", CommonAccTrans.UserId);
                arlParms[7] = new SqlParameter("@Condition", CommonAccTrans.Condition);
                return SQLHelper.ExecuteDataset("CommonGetAccountTrans", dbName, arlParms);

            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }

        }
    }
}