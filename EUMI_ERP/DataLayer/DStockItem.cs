using System;
using System.Data;
using System.Data.SqlClient;
 
namespace EUMI_ERP.DataLayer
{
    public class DStockItem
    {
        private SqlParameter[] arlParms;
 
        public DataSet HMS_UnitGets(long UnitId, string dbName)
        {
            try
            {
                arlParms    = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@UnitId", UnitId);
                return SQLHelper.ExecuteDataset("HMS_UnitGets", dbName, arlParms);
            }
            catch (SqlException exMe)
            {
                Console.WriteLine(exMe.Message);
                return null;
            }
        }
 
        public DataSet ItemGetAll(string dbName)
        {
            try
            {
                return SQLHelper.ExecuteDataset("ItemAllItem", dbName, null);
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
 
        public DataSet ItemGetById(long itemId, string dbName)
        {
            try
            {
                arlParms    = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@ItemId", itemId);
                return SQLHelper.ExecuteDataset("ItemGetById", dbName, arlParms);
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
 
        public DataSet StockItemInsertandUpdate(
            long itemId, string itemCode, string model1, string model2, string model3,
            string unit, string vatCode, string binA, string binB, string binC,
            string alertLevel, int delflg, long userId, long deptId, string dbName)
        {
            decimal unitVal    = 0;
            decimal vatVal     = 0;
            decimal alertVal   = 0;
 
            decimal.TryParse(unit,       out unitVal);
            decimal.TryParse(vatCode,    out vatVal);
            decimal.TryParse(alertLevel, out alertVal);
 
            try
            {
                SqlParameter[] arlParms = new SqlParameter[14];
                arlParms[0]  = new SqlParameter("@ItemId",     itemId);
                arlParms[1]  = new SqlParameter("@ItemCode",   itemCode   ?? "");
                arlParms[2]  = new SqlParameter("@Model1",     model1     ?? "");
                arlParms[3]  = new SqlParameter("@Model2",     model2     ?? "");
                arlParms[4]  = new SqlParameter("@Model3",     model3     ?? "");
                arlParms[5]  = new SqlParameter("@Unit",       unitVal);
                arlParms[6]  = new SqlParameter("@VatCode",    vatVal);
                arlParms[7]  = new SqlParameter("@Bin_A",      binA       ?? "");
                arlParms[8]  = new SqlParameter("@Bin_B",      binB       ?? "");
                arlParms[9]  = new SqlParameter("@Bin_C",      binC       ?? "");
                arlParms[10] = new SqlParameter("@AlertLevel", alertVal);
                arlParms[11] = new SqlParameter("@DelFlag", delflg);  //
                arlParms[12] = new SqlParameter("@UserId",     userId);
                arlParms[13] = new SqlParameter("@DeptId",     deptId);
                return SQLHelper.ExecuteDataset("StockItemInsertandUpdate", dbName, arlParms);
            }
            catch (Exception ex)
            {
                throw new Exception("DB ERROR: " + ex.Message);
            }
        }
    }
}
 