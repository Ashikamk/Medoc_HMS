using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class ItemMasterModel
    {
        public string ImageFolder = "Products";
        public string ImageExt { get; set; }
        public long BOQQty { get; set; }
        public decimal BOQRate { get; set; }
        public long JobNo { get; set; }
        public string DocumentName { get; set; }
        public string Number { get; set; }
        public decimal Amount { get; set; }
        public string Date { get; set; }
        public string Bank { get; set; }
        public string Name { get; set; }
        public string TypeName { get; set; }


        public long SlNumber { get; set; }
        public long ItemId { get; set; }
        public long DocumentId { get; set; }
        public long DocTypeId { get; set; }

        public string ReferenceNo { get; set; }
        public string Remarks { get; set; }

        public string DocumentType { get; set; }
        public string PendingName { get; set; }
        public long PendingQty { get; set; }
        public string Filename { get; set; }
        public string NewFilename { get; set; }

        public string ItemCode { get; set; }
        public string Description { get; set; }
        public string Unit { get; set; }
        public string Rate { get; set; }
        public decimal ExcelRate { get; set; }

        public decimal Gridrate { get; set; }

        public decimal DifferenceRate { get; set; }

        public string Group { get; set; }
        public string SubGroup { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string VatCode { get; set; }
        public string VatPercentage { get; set; }
        public decimal OpeningQty { get; set; }
        public decimal OpeningCost { get; set; }
        public decimal LPCost { get; set; }
        public decimal AvgCost { get; set; }
        public decimal SellingPrice { get; set; }
        public decimal StockIn { get; set; }
        public decimal StockOut { get; set; }
        public decimal InHandQty { get; set; }
        public string Model1 { get; set; }
        public string ExcelItemCode { get; set; }


        public string Hsncode { get; set; }

        public string Model2 { get; set; }
        public string Model3 { get; set; }
        public decimal MaxQty { get; set; }
        public decimal MinQty { get; set; }
        public decimal Size { get; set; }
        public decimal Weight { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Thickness { get; set; }
        public decimal Density { get; set; }
        public string Specification { get; set; }
        public string LocationName { get; set; }
        public string Bin_A { get; set; }
        public string Bin_B { get; set; }
        public string Bin_C { get; set; }
        public string Bin_D { get; set; }
        public string Bin_E { get; set; }
        public string Bin_F { get; set; }
        public string Bin_G { get; set; }
        public string Bin_H { get; set; }
        public string Status { get; set; }
        public int Active { get; set; }
        public int DelFlag { get; set; }
        public int NoQty { get; set; }
        public string UnitName { get; set; }
        public int UnitId { get; set; }
        public string GrpName { get; set; }
        public int GrpId { get; set; }
        public string SbgrpName { get; set; }
        public int SbgrpId { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public string VAT { get; set; }
        public int VatId { get; set; }
        public decimal VatPer { get; set; }
        public long MultiUnitId { get; set; }
        public decimal Fraction { get; set; }
        public decimal UnitPrice { get; set; }
        public long ProductMultiPriceId { get; set; }
        public long MultiPriceId { get; set; }
        public decimal Price { get; set; }
        public decimal ItemRate { get; set; }
        public int LocId { get; set; }
        public int DeptId { get; set; }
        public decimal stocktotloseqty { get; set; }
        public decimal TotQty { get; set; }
        public int Sumtotqty { get; set; }
        public int Custlastsellingprice { get; set; }
        public int UserId { get; set; }
        public int DivId { get; set; }

        public decimal MRP { get; set; }
        public decimal SellingPrice1 { get; set; }
        public decimal SellingPrice2 { get; set; }

        public int CustId { get; set; }
        public string Condition { get; set; }
        public string Condition1 { get; set; }
        public string Condition2 { get; set; }
        public string SerialNo { get; set; }
        public string Otherdescription { get; set; }
        public string DifferenceItemcode { get; set; }
        public int selectedvalue { get; set; }
        public int Quantityselected { get; set; }
        public int Bselected { get; set; }


        public int Priceselected { get; set; }

        public string Differencemodel { get; set; }
        public string DifferenceItemdesc { get; set; }
        public int Differencequantity { get; set; }
        public int Orderquantity { get; set; }
        public int Receivedquantity { get; set; }
        public string IMEI_Number { get; set; }
        public int imeicount { get; set; }
        public int invtype { get; set; }
        public string Type { get; set; }
        public string LOTNo { get; set; }
        public string modelm1 { get; set; }
        public string modelm2 { get; set; }
        public string modelm3 { get; set; }

        public string modelm4 { get; set; }

        public string modelm5 { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Container { get; set; }
        public string Var1 { get; set; }
        public string Var2 { get; set; }

        public string TransferDate { get; set; }
        public string TransferNo { get; set; }
        public string LoadFrom { get; set; }
        public string LoadTo { get; set; }
        public string User { get; set; }
        public int ProductId { get; set; }
        public string CustName { get; set; }

        public string BOQSubId { get; set; }
        public string BOQNo { get; set; }
        public string ProjectName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }

        public string FormSource { get; set; }  // ← ADD THIS


        DMasters oDMasters = new DMasters();
        DEnquiry oDEnquiry = new DEnquiry();


        DPurchase oDPurchase = new DPurchase();
        DLocationTransfer oDLocationTransfer = new DLocationTransfer();

        DStockTransfer oDStockTransfer = new DStockTransfer();



        public DataSet GetourprojectsGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.GetourprojectsGets(ItemMasterModel, dbName);
        }

        public DataSet BIRTHDAYANDVACCINATIONNOTIFICATION(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.BIRTHDAYANDVACCINATIONNOTIFICATION(ItemMasterModel, dbName);
        }
        

        public DataSet GetourprojectsList(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.GetourprojectsList(ItemMasterModel, dbName);
        }

        public DataSet PDCandToDoReminder(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.PDCandToDoReminder(ItemMasterModel, dbName);
        }
        public DataSet PDCTODOReminderDetailed(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.PDCTODOReminderDetailed(ItemMasterModel, dbName);
        }
        public DataSet DocumentUploadInsertandUpdate(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.DocumentUploadInsertandUpdate(ItemMasterModel, dbName);
        }
        public DataSet ItemInsertandUpdate(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.ItemInsertandUpdate(oItemMasterModel, dbName);
        }
        public DataSet ItemModelCheck(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.ItemModelCheck(oItemMasterModel, dbName);
        }

        public DataSet ItemGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.ItemGetandGets(ItemMasterModel, dbName);
        }

        public DataSet SubGroupGetforGroup(SubGroupMaster oSubGroupMaster, string dbName)
        {
            return oDMasters.SubGroupGetforGroup(oSubGroupMaster, dbName);
        }
        public DataSet SubCategoryGetforCategory(SubCategoryModel oSubCategoryModel, string dbName)
        {
            return oDMasters.SubCategoryGetforCategory(oSubCategoryModel, dbName);
        }

        public DataSet MultiUnitInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.MultiUnitInsertandUpdate(dt, dbName);
        }


        public DataSet MultiUnitGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.MultiUnitGetandGets(ItemMasterModel, dbName);
        }


        public DataSet LocationWiseQuantityUpdate(DataTable dt, string dbName)
        {
            return oDMasters.LocationWiseQuantityUpdate(dt, dbName);
        }


        public DataSet ProductMultiPriceInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.ProductMultiPriceInsertandUpdate(dt, dbName);
        }



        public DataSet LocationWiseProductQty(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.LocationWiseProductQty(ItemMasterModel, dbName);
        }
        public DataSet UserMultiDeptInsert(DataTable dt, string dbName)
        {
            return oDMasters.UserMultiDeptInsert(dt, dbName);
        }

        public DataSet Aspectsinsertandupdate(DataTable dt, string dbName)
        {
            return oDMasters.Aspectsinsertandupdate(dt, dbName);
        }

        public DataSet DocumentUploadGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.DocumentUploadGetandGets(ItemMasterModel, dbName);
        }

        public DataSet UploadTypeGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.UploadTypeGetandGets(ItemMasterModel, dbName);
        }



        public DataSet ProductMultiPriceGetandGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.ProductMultiPriceGetandGets(ItemMasterModel, dbName);
        }
        public DataSet ProductRateGets(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.ProductRateGets(ItemMasterModel, dbName);
        }

        public DataSet ProductSearch(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDPurchase.ProductSearch(oItemMasterModel, dbName);
        }
        public DataSet HMS_HSNSearch(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.HMS_HSNSearch(oItemMasterModel, dbName);
        }
        public DataSet F2PurchaseProductSearch(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDPurchase.F2PurchaseProductSearch(oItemMasterModel, dbName);
        }
        

        public DataSet CompareItems(DataTable dt, string dbName)
        {
            return oDPurchase.CompareItems(dt, dbName);
        }
        public DataSet ProductSearchSales(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.ProductSearchSales(oItemMasterModel, dbName);
        }

        public DataSet ProductSearchRentCarSales(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.ProductSearchRentCarSales(oItemMasterModel, dbName);
        }
        public DataSet ProductSearchSalesMobile(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.ProductSearchSalesMobile(oItemMasterModel, dbName);
        }

        public DataSet ProductDetailsSearchSalesInvoice(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.ProductDetailsSearchSalesInvoice(oItemMasterModel, dbName);
        }


        public DataSet ProductSearchStockAdjustment(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDStockTransfer.ProductSearchStockAdjustment(oItemMasterModel, dbName);
        }
        public DataSet CatogorySearchStockAdjustment(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDStockTransfer.CatogorySearchStockAdjustment(oItemMasterModel, dbName);
        }
        public DataSet SubCatogorySearchStockAdjustment(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDStockTransfer.SubCatogorySearchStockAdjustment(oItemMasterModel, dbName);
        }
        public DataSet GroupSearchStockAdjustment(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDStockTransfer.GroupSearchStockAdjustment(oItemMasterModel, dbName);
        }
        public DataSet SubGroupSearchStockAdjustment(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDStockTransfer.SubGroupSearchStockAdjustment(oItemMasterModel, dbName);
        }
        public DataSet ItemcodeSearchStockAdjustment(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDStockTransfer.ItemcodeSearchStockAdjustment(oItemMasterModel, dbName);
        }
        public DataSet ItemCodeSearchSales(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDEnquiry.ItemCodeSearchSales(oItemMasterModel, dbName);
        }

        public DataSet ProductSearchStockAdjustmentwithfilter(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDStockTransfer.ProductSearchStockAdjustmentwithfilter(oItemMasterModel, dbName);
        }
        public DataSet ItemLocationGetandGets(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDLocationTransfer.ItemLocationGetandGets(oItemMasterModel, dbName);
        }
        public DataSet ContainerTransferReportGets(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDLocationTransfer.ContainerTransferReportGets(oItemMasterModel, dbName);
        }

        public long UploadMultipleProductImage(string dbName)
        {
            return oDMasters.UploadMultipleProductImage(dbName);
        }

        public static DataSet SalesmanDashBoardPurchaseList(ItemMasterModel ItemMasterModel, string dbName)
        {
            KeyValues KeyValues = new KeyValues();
            try
            {
                string Query = @"SELECT distinct top 10 ItemId,ItemCode,ItemDescription,SUM(Quantity) AS 'Quantity',S.LocationId,BillNo,LocationName FROM Inv_InventoryTransaction as S     
                                inner join Mst_location on  S.LocationId=  Mst_location.LocationId     
                                where  TransType='PI' and S.DeptId=@dept 
                                GROUP BY ItemId,ItemCode,ItemDescription,S.LocationId,LocationName,BillNo
                                ORDER BY BillNo DESC   ";

                var arlParms = new SqlParameter[1];
                arlParms[0] = new SqlParameter("@dept", SqlDbType.Int) { Value = ItemMasterModel.DeptId };
                return SQLHelper.ExecuteDatasetSQL(Query, dbName, arlParms);
            }
            catch (Exception exMe)
            {
                Console.WriteLine(exMe.Message);
                Console.WriteLine(exMe.StackTrace);
                return null;
            }
        }


        public DataSet MultiUnitGetandGetsdemo(ItemMasterModel ItemMasterModel, string dbName)
        {
            return oDMasters.MultiUnitGetandGetsdemo(ItemMasterModel, dbName);
        }


        public DataSet ItemImportInsertandUpdate(DataTable dt, string dbName)
        {
            return oDMasters.ItemImportInsertandUpdate(dt, dbName);
        }

        public DataSet AutomobileProductSearchSales(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.AutomobileProductSearchSales(oItemMasterModel, dbName);
        }
        public DataSet AutoMobileProductDetailsSearch(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.AutoMobileProductDetailsSearch(oItemMasterModel, dbName);
        }
        //public DataSet ItemDetailsGetforExcelImport(ItemMasterModel ItemMasterModel, string dbName) 
        //{
        //    return oDMasters.ItemDetailsGetforExcelImport(ItemMasterModel, dbName);
        //}
        public DataSet ItemDetailsGetforExcelImport(DataTable dt, string dbName)
        {
            return oDMasters.ItemDetailsGetforExcelImport(dt, dbName);
        }

        public DataSet MIProductSearch(ItemMasterModel oItemMasterModel, string dbName)
        {
            return oDMasters.MIProductSearch(oItemMasterModel, dbName);
        }
    }
}