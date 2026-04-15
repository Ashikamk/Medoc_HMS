using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EUMI_ERP.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace EUMI_ERP.Controllers
{
    public class LocationTransferController : Controller
    {
        // GET: LocationTransfer
        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult LocationTransfer()
        {
            return View();
        }
        public ActionResult CheckList()
        {
            return View();
        }
        public ActionResult form()
        {
            return View();
        }
        public ActionResult LocationTransferAccept() 
        {
            return View();
        }
        public ActionResult ContainerManagement() 
        {
            return View();
        }
        public ActionResult ContainerTransfer()
        {
            return View();
        }
        public ActionResult OrderBouncingAccept()
        {
            return View();
        }
        public ActionResult ContainerTransferReport()
        {
            return View();
        }
        public ActionResult ContainerTransferReportGets(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContainerTransferReportGets(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel LModels = new ItemMasterModel();
                    LModels.TransferDate = row["Date"].ToString();
                    LModels.TransferNo = row["LocTransId"].ToString();
                    LModels.Container = row["Model1"].ToString();
                    LModels.LoadFrom = row["FromLoc"].ToString();
                    LModels.LoadTo = row["ToLoc"].ToString();
                    LModels.User = row["Name"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }
        public ActionResult ItemLocationGetandGets(ItemMasterModel ItemMasterModel)
        {
            ItemMasterModel obj = new ItemMasterModel();

            List<ItemMasterModel> oList = new List<ItemMasterModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ItemLocationGetandGets(ItemMasterModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ItemMasterModel LModels = new ItemMasterModel();
                    LModels.LocId = Convert.ToInt32(row["Stock_Location"].ToString());
                    LModels.LocationName = row["LocationName"].ToString();

                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LocationTransferInsertandUpdate(LocationTransferModel LocationTransferModel)
        {
            LocationTransferModel obj = new LocationTransferModel();
            List<LocationTransferModel> oList = new List<LocationTransferModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransferInsertandUpdate(LocationTransferModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationTransferModel EDModels = new LocationTransferModel();
                    EDModels.Status = row["Status"].ToString();
                    oList.Add(EDModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LocationTransferGetandGets(LocationTransferModel LocationTransferModel)
        {
            LocationTransferModel obj = new LocationTransferModel();

            List<LocationTransferModel> oList = new List<LocationTransferModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LocationTransferGetandGets(LocationTransferModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationTransferModel LModels = new LocationTransferModel();
                    LModels.LocTransId = Convert.ToInt32(row["LocTransId"].ToString());
                    LModels.TransferDate = row["TransferDate"].ToString();
                    LModels.ChasisNumber = row["ItemCode"].ToString();
                    LModels.Description = row["Description"].ToString();
                    LModels.LoadFrom = row["FromLoad"].ToString();
                    LModels.LoadTo = row["ToLoad"].ToString();
                    LModels.FromLoad = Convert.ToInt32(row["LoadFrom"].ToString());
                    LModels.ToLoad = Convert.ToInt32(row["LoadTo"].ToString());
                    LModels.ItemKey = row["ItemKey"].ToString();
                    LModels.UserName = row["UserName"].ToString();
                    LModels.Remarks = row["Remarks"].ToString();
                    LModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SubMenuGetandGets(UserMenuSettingsModel UserMenuSettingsModel)
        {
            UserMenuSettingsModel obj = new UserMenuSettingsModel();


            List<UserMenuSettingsModel> oList = new List<UserMenuSettingsModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.SubMenuGetandGets(UserMenuSettingsModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    UserMenuSettingsModel LModels = new UserMenuSettingsModel();
                    LModels.MasterId = row["MasterId"].ToString();
                    LModels.MenuName = row["MenuName"].ToString();
                    LModels.MenuCode = row["MenuCode"].ToString();
                    LModels.HFlag = row["Hflag"].ToString();
                    oList.Add(LModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }




        public ActionResult CheckListComponentsGetandGets(CheckListNew CheckListNew)
        {
            CheckListNew obj = new CheckListNew();

            List<CheckListNew> oList = new List<CheckListNew>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CheckListComponentsGetandGets(CheckListNew, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CheckListNew MModels = new CheckListNew();
                    MModels.CheckListId = Convert.ToInt32(row["CheckListId"].ToString());
                    MModels.Components = row["Components"].ToString();
                    MModels.Key = row["Components"].ToString();
                    MModels.Mirror = row["Components"].ToString();
                    MModels.MonoGram = row["Components"].ToString();
                    MModels.Battery = row["Components"].ToString();
                   oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CheckListGetandGets(CheckListNew CheckListNew)
        {
            CheckListNew obj = new CheckListNew();

            List<CheckListNew> oList = new List<CheckListNew>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.CheckListGetandGets(CheckListNew, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CheckListNew MModels = new CheckListNew();
                   
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.Components = row["Components"].ToString();
                    MModels.CheckListId = Convert.ToInt32(row["CheckListCmpId"].ToString());
                    MModels.UserId = Convert.ToInt32(row["UserId"].ToString());
                    MModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    MModels.avail = row["Availability"].ToString();
                    MModels.qty = row["Quantity"].ToString();
                    MModels.UserName = row["UserName"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult   CheckListInsertandUpdate(List<CheckListNew> CheckListNew)
        {
            CheckListNew obj = new CheckListNew();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<CheckListNew> oList = new List<CheckListNew>();

            try
            {
                string[] tmpTable = new string[7];
               
                tmpTable[0] = "ItemId";
                tmpTable[1] = "CheckListId";
                tmpTable[2] = "UserId";
                tmpTable[3] = "DeptId";
                tmpTable[4] = "avail";
                tmpTable[5] = "qty";
                tmpTable[6] = "DelFlag";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in CheckListNew)
                {
                   
                    obj.ItemId = details.ItemId;
                    obj.CheckListId = details.CheckListId;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.avail = details.avail;
                    obj.qty = details.qty;
                    obj.DelFlag = details.DelFlag;
                    dt.Rows.Add
                    ( obj.ItemId, obj.CheckListId, obj.UserId, obj.DeptId, obj.avail, obj.qty, obj.DelFlag);
                }

                dsDataSet = obj.CheckListInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    CheckListNew MModels = new CheckListNew();
                    MModels.Status = row["Status"].ToString();
                    MModels.CheckListId = Convert.ToInt32(row["CheckListId"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        } 


        public ActionResult TransferItem(LocationTransferModel LocationTransferModel) 
        {
            LocationTransferModel obj = new LocationTransferModel();
            List<LocationTransferModel> oList = new List<LocationTransferModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TransferItem(LocationTransferModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationTransferModel EDModels = new LocationTransferModel();
                    EDModels.Status = row["Status"].ToString();
                    oList.Add(EDModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult EditItem(LocationTransferModel LocationTransferModel)
        {
            LocationTransferModel obj = new LocationTransferModel();
            List<LocationTransferModel> oList = new List<LocationTransferModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.EditItem(LocationTransferModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationTransferModel EDModels = new LocationTransferModel();
                    EDModels.Status = row["Status"].ToString();
                    oList.Add(EDModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult TransferALLItemUC(LocationTransferModel LocationTransferModel)
        {
            LocationTransferModel obj = new LocationTransferModel();
            List<LocationTransferModel> oList = new List<LocationTransferModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TransferALLItemUC(LocationTransferModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationTransferModel EDModels = new LocationTransferModel();
                    EDModels.Status = row["Status"].ToString();
                    oList.Add(EDModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteLocnTransfer(LocationTransferModel LocationTransferModel)
        {
            LocationTransferModel obj = new LocationTransferModel();
            List<LocationTransferModel> oList = new List<LocationTransferModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DeleteLocnTransfer(LocationTransferModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationTransferModel EDModels = new LocationTransferModel();
                    EDModels.Status = row["Status"].ToString();
                    oList.Add(EDModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ContainerList(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContainerList(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();

                    MModels.ContainerSlno = Convert.ToInt32(row["ContainerSlno"].ToString());
                    MModels.ContainerNumber = row["ContainerNumber"].ToString();
                    MModels.BookingNumber = row["BookingNumber"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemName = row["ItemDescription"].ToString();
                    MModels.Lines = row["Lines"].ToString();
                    MModels.Size = row["Size"].ToString();
                    MModels.ContainerSlno = Convert.ToInt32(row["ContainerSlno"].ToString());
                    MModels.ContainerBillNo = row["ContainerBillNo"].ToString();
                    MModels.ContainerDate = row["ContainerDate"].ToString();
                    MModels.PointOfLoading = row["PointOfLoading"].ToString();
                    MModels.Port = row["Port"].ToString();
                    MModels.LoadDate = row["LoadDate"].ToString();
                    MModels.ExpectArrivalDate = row["ExpectArrivalDate"].ToString();
                    MModels.ReleaseDate = row["ReleaseDate"].ToString();
                    MModels.ContArrivalDate = row["ContArrivalDate"].ToString();
                    MModels.Invoice = row["Invoice"].ToString();
                    MModels.InvoiceAmount = Convert.ToDecimal(row["InvoiceAmount"].ToString());
                    MModels.PaidAmount = Convert.ToDecimal(row["PaidAmount"].ToString());
                    MModels.Supplier = row["CustName"].ToString();
                    MModels.ItemSold = row["ItemSold"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            //return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }


        [HttpPost]
        public ActionResult ContainerSearch(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContainerSearch(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();


                    MModels.ContainerSlno = Convert.ToInt32(row["ContainerSlno"].ToString());
                    MModels.ContainerNumber = row["ContainerNumber"].ToString();
                    MModels.BookingNumber = row["BookingNumber"].ToString();                   
                    MModels.Lines = row["Lines"].ToString();
                    MModels.Size = row["Size"].ToString();
                    MModels.ContainerSlno = Convert.ToInt32(row["ContainerSlno"].ToString());
                    MModels.ContainerBillNo = row["ContainerBillNo"].ToString();
                    MModels.ContainerDate = row["ContainerDate"].ToString();
                    MModels.PointOfLoading = row["PointOfLoading"].ToString();
                    MModels.Port = row["Port"].ToString();
                    MModels.LoadDate = row["LoadDate"].ToString();
                    MModels.ExpectArrivalDate = row["ExpectArrivalDate"].ToString();
                    MModels.ReleaseDate = row["ReleaseDate"].ToString();
                    MModels.ContArrivalDate = row["ContArrivalDate"].ToString();
                    MModels.Invoice = row["Invoice"].ToString();
                    MModels.InvoiceAmnt = row["InvoiceAmount"].ToString();
                    MModels.PaidAmnt = row["PaidAmount"].ToString();
                    MModels.Reference = row["Reference"].ToString();
                    
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ContainerNumberSearch(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContainerNumberSearch(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();


                    MModels.ContainerSlno = Convert.ToInt32(row["ContainerSlno"].ToString());
                    MModels.ContainerBillNo = row["ContainerBillNo"].ToString();
                    MModels.ContainerDate = row["ContainerDate"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ContainerImportInsertandUpdate(List<ContainerManagement> ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<ContainerManagement> oList = new List<ContainerManagement>();

            try
            {
                string[] tmpTable = new string[20];
                tmpTable[0] = "ContainerNumber";
                tmpTable[1] = "BookingNumber";
                tmpTable[2] = "Lines";
                tmpTable[3] = "Size";
                tmpTable[4] = "PointOfLoading";
                tmpTable[5] = "Port";
                tmpTable[6] = "LoadDate";
                tmpTable[7] = "ExpectArrivalDate";
                tmpTable[8] = "ReleaseDate";
                tmpTable[9] = "ContArrivalDate";
                tmpTable[10] = "Invoice";
                tmpTable[11] = "InvoiceAmount";
                tmpTable[12] = "PaidAmount";
                tmpTable[13] = "DelFlag";
                tmpTable[14] = "ContainerSlno";
                tmpTable[15] = "ContainerBillNo";
                tmpTable[16] = "ContainerDate";
                tmpTable[17] = "DeptId";
                tmpTable[18] = "Reference";
                tmpTable[19] = "UId";
                

                dt = Common.CreateTable(tmpTable);

                foreach (var details in ContainerManagement)
                {
                    obj.ContainerNumber = details.ContainerNumber;
                    obj.BookingNumber = details.BookingNumber;
                    obj.Lines = details.Lines;
                    obj.Size = details.Size;
                    obj.PointOfLoading = details.PointOfLoading;
                    obj.Port = details.Port;
                    obj.LoadDate = details.LoadDate;
                    obj.ExpectArrivalDate = details.ExpectArrivalDate;
                    obj.ReleaseDate = details.ReleaseDate;
                    obj.ContArrivalDate = details.ContArrivalDate;
                    obj.Invoice = details.Invoice;
                    obj.InvoiceAmount = details.InvoiceAmount;
                    obj.PaidAmount = details.PaidAmount;
                    obj.DelFlag = details.DelFlag;
                    obj.ContainerSlno = details.ContainerSlno;
                    obj.ContainerBillNo = details.ContainerBillNo;
                    obj.ContainerDate = details.ContainerDate;
                    obj.DeptId = details.DeptId;
                    obj.Reference = details.Reference;
                    obj.UId = details.UId;
                    dt.Rows.Add(obj.ContainerNumber, obj.BookingNumber, obj.Lines, obj.Size, obj.PointOfLoading, obj.Port, obj.LoadDate, obj.ExpectArrivalDate,
                                obj.ReleaseDate, obj.ContArrivalDate, obj.Invoice, obj.InvoiceAmount, obj.PaidAmount, obj.DelFlag, obj.ContainerSlno, obj.ContainerBillNo, obj.ContainerDate,obj.DeptId, obj.Reference, obj.UId);
                }

                dsDataSet = obj.ContainerImportInsertandUpdate(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();
                    MModels.Status = row["Status"].ToString();
                    MModels.ContainerSlno = Convert.ToInt32(row["invonum"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AutoLocTransferUtilityForUC(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AutoLocTransferUtilityForUC(ContainerManagement, dbName);               

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ArrivingContainersGets(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ArrivingContainersGets(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();
                    MModels.ContainerNumber = row["ContainerNumber"].ToString();
                    MModels.Lines = row["Lines"].ToString();
                    MModels.Port = row["Port"].ToString();
                    MModels.LoadDate = row["LoadDate"].ToString();
                    MModels.ExpectArrivalDate = row["ExpectArrivalDate"].ToString();
                    MModels.ReleaseDate = row["ReleaseDate"].ToString();
                    MModels.ContArrivalDate = row["ContArrivalDate"].ToString();
                    MModels.Invoice = row["Invoice"].ToString();
                    MModels.InvoiceAmnt = row["InvoiceAmount"].ToString();
                    MModels.PaidAmnt = row["PaidAmount"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemName = row["ItemDescription"].ToString(); 
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult TopSelling(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TopSelling(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();
                    MModels.ItemId = row["ItemId"].ToString();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemName = row["ItemDescription"].ToString();
                    MModels.Price = row["Price"].ToString();
                    MModels.ProfitPer = row["PP"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult OnPortItemGetandGets(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OnPortItemGetandGets(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();
                    MModels.Count = Convert.ToInt32(row["count"].ToString());
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult ContainersListGets(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContainersListGets(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();
                    MModels.ContainerNumber = row["ContainerNumber"].ToString();
                    MModels.BookingNumber = row["BookingNumber"].ToString();
                    MModels.Lines = row["Lines"].ToString();
                    MModels.Size = row["Size"].ToString();
                    MModels.PointOfLoading = row["PointOfLoading"].ToString();
                    MModels.Port = row["Port"].ToString();
                    MModels.LoadDate = row["LoadDate"].ToString();
                    MModels.ExpectArrivalDate = row["ExpectArrivalDate"].ToString();
                    MModels.ReleaseDate = row["ReleaseDate"].ToString();
                    MModels.ContArrivalDate = row["ContArrivalDate"].ToString();
                    MModels.Invoice = row["Invoice"].ToString();
                    MModels.InvoiceAmnt = row["InvoiceAmount"].ToString();
                    MModels.PaidAmnt = row["PaidAmount"].ToString();
                    MModels.ContainerDate = row["ContainerDate"].ToString();
                    MModels.Invoice = row["Invoice"].ToString();
                    MModels.InvoiceAmnt = row["InvoiceAmount"].ToString();
                    MModels.PaidAmnt = row["PaidAmount"].ToString();
                    MModels.ContainerDate = row["ContainerDate"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.AvgCost = row["AvgCost"].ToString();
                    MModels.BuyerNo = row["BuyerNo"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }

        [HttpPost]
        public ActionResult ContainerDeatailsGets(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContainerDeatailsGets(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();            
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemName = row["Description"].ToString();
                    MModels.ContainerNumber = row["IMEINumber"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }
        [HttpPost]
        public ActionResult LoadingCarsGet(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.LoadingCarsGet(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.ItemName = row["Description"].ToString();
                    MModels.ContainerNumber = row["model1"].ToString();
                    MModels.Port = row["Port"].ToString();
                    MModels.ContArrivalDate = row["ContArrivalDate"].ToString();
                    MModels.Location = row["Location"].ToString();
                    MModels.InvoDate = row["InvoDate"].ToString();
                    MModels.AvgCost = row["AvgCost"].ToString();
                    MModels.BuyerNo = row["BuyerNo"].ToString();
                    MModels.Stock = row["Stock"].ToString();
                    MModels.Quantity = row["Quantity"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
        }
        [HttpPost]
        public JsonResult ContainerLocationTransfer(List<LocationTransferModel> LocationTransferModel)
        {
            LocationTransferModel obj = new LocationTransferModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<LocationTransferModel> oList = new List<LocationTransferModel>();

            try
            {
                string[] tmpTable = new string[7];
                tmpTable[0] = "ItemId";               
                tmpTable[1] = "FromLoad";
                tmpTable[2] = "ToLoad";
                tmpTable[3] = "ItemKey";
                tmpTable[4] = "UserId";
                tmpTable[5] = "DeptId";
                tmpTable[6] = "TransferDate";
                

                dt = Common.CreateTable(tmpTable);

                foreach (var details in LocationTransferModel)
                {
                    obj.ItemId = details.ItemId;                    
                    obj.FromLoad = details.FromLoad;
                    obj.ToLoad = details.ToLoad;
                    obj.ItemKey = details.ItemKey;
                    obj.UserId = details.UserId;
                    obj.DeptId = details.DeptId;
                    obj.TransferDate = details.TransferDate;
                    
                    dt.Rows.Add(obj.ItemId, obj.FromLoad, obj.ToLoad, obj.ItemKey, obj.UserId, obj.DeptId,obj.TransferDate);
                }

                dsDataSet = obj.ContainerLocationTransfer(dt, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationTransferModel MModels = new LocationTransferModel();
                    MModels.Status = row["Status"].ToString();
                    //MModels.ContainerSlno = Convert.ToInt32(row["invonum"].ToString());
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]

        public ActionResult TranferContainerSearch(LocationTransferModel LocationTransferModel)
        {
            LocationTransferModel obj = new LocationTransferModel();
            List<LocationTransferModel> oList = new List<LocationTransferModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.TranferContainerSearch(LocationTransferModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationTransferModel MModels = new LocationTransferModel();                   
                    MModels.UnitName = row["UnitName"].ToString();
                    MModels.ItemCode = row["Model1"].ToString();                   
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult ChassisNumberSearch(LocationTransferModel LocationTransferModel)
        {
            LocationTransferModel obj = new LocationTransferModel();

            List<LocationTransferModel> oList = new List<LocationTransferModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ChassisNumberSearch(LocationTransferModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    LocationTransferModel MModels = new LocationTransferModel();
                    MModels.ItemId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ItemCode = row["ItemCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    MModels.Flag = Convert.ToInt32(row["CheckFlag"].ToString());
                    
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult OrderBouncingGetandGets(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();

            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.OrderBouncingGetandGets(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel MModels = new SalesInvoiceModel();
                    MModels.ProductId = Convert.ToInt32(row["ItemId"].ToString());
                    MModels.ProductCode = row["ItemCode"].ToString();
                    MModels.ProductDescr = row["Description"].ToString();
                    MModels.Remarks = row["Remarks"].ToString();
                    MModels.ProdQty = Convert.ToDecimal(row["Quantity"].ToString());
                    MModels.CustName = row["CustName"].ToString();
                    MModels.BillSeriesId = Convert.ToInt32(row["OrderBouncingId"].ToString());
                    MModels.UserName = row["Name"].ToString();
                    MModels.CurrentDate = row["Date"].ToString();
                    oList.Add(MModels);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ApproveOrderBouncing(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ApproveOrderBouncing(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel EDModels = new SalesInvoiceModel();
                    EDModels.Status = row["Status"].ToString();
                    oList.Add(EDModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AcceptAllOrderBouncing(SalesInvoiceModel SalesInvoiceModel)
        {
            SalesInvoiceModel obj = new SalesInvoiceModel();
            List<SalesInvoiceModel> oList = new List<SalesInvoiceModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AcceptAllOrderBouncing(SalesInvoiceModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    SalesInvoiceModel EDModels = new SalesInvoiceModel();
                    EDModels.Status = row["Status"].ToString();
                    oList.Add(EDModels);
                }
            }

            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult ContainerReport(ContainerManagement ContainerManagement)
        {
            ContainerManagement obj = new ContainerManagement();

            List<ContainerManagement> oList = new List<ContainerManagement>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.ContainerReport(ContainerManagement, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ContainerManagement MModels = new ContainerManagement();
                    MModels.ChasisNo = row["ChasisNo"].ToString();
                    MModels.Make = row["Make"].ToString();
                    MModels.Made = row["Made"].ToString();
                    MModels.Model = row["Year"].ToString();
                    MModels.Colour = row["Colour"].ToString();
                    MModels.LotNumber = row["LotNumber"].ToString();
                    oList.Add(MModels);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }
            return new JsonResult()
            {
                Data = oList,
                MaxJsonLength = 86753090,
            };
            // return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



    }
}
       