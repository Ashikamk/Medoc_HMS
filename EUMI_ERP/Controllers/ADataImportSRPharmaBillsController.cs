using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NPOI;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using System.IO;
using System.Data;
using System.Configuration;

namespace EUMI_ERP.Controllers
{

        public class ADataImportSRPharmaBillsController : Controller
        {
            // GET: ADataImportOtherBills
            string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
            XSSFWorkbook hssfworkbook;
            HSSFWorkbook ssfworkbook;

            public ActionResult Index()
            {
                return View();
            }




            [HttpPost]
            public string PHSRBilldataInserted(HttpPostedFileBase filename)
            {
            try
            {
                string dirpath = "";

                int res = 0;
                if (filename != null && filename.ContentLength > 0)
                {

                    dirpath = Path.Combine(Server.MapPath("~/BillsUpload/"));
                    Directory.CreateDirectory(dirpath);
                    string FileName = Path.GetFileName(filename.FileName);
                    string Extension = Path.GetExtension(filename.FileName);
                    filename.SaveAs(dirpath + FileName);
                    string FilePath = dirpath + FileName;
                    //FileUpload1.SaveAs(FilePath);

                    if (filename.ContentLength > 0 && Extension.Equals(".xls"))
                    {
                        InitializeWorkbook1(FilePath);
                        res = ConvertToDataTable1(0);
                    }
                    else
                    {
                        InitializeWorkbook(FilePath);
                        res = ConvertToDataTable(0);
                    }

                    //Import_To_Grid(FilePath, Extension, rbHDR.SelectedItem.Text);

                }

                return "Inserted Successfully";
            }
            catch (Exception ExMe)
            {
                return "Invalid Excel" + ExMe.Message.ToString();
            }



        }


        void InitializeWorkbook(string path)
            {
                try
                {
                    //read the template via FileStream, it is suggested to use FileAccess.Read to prevent file lock.
                    //book1.xls is an Excel-2007-generated file, so some new unknown BIFF records are added. 
                    using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
                    {
                        hssfworkbook = new XSSFWorkbook(file);
                    }
                }
                catch (Exception ex)
                {

                }
            }



            void InitializeWorkbook1(string path)
            {
                //read the template via FileStream, it is suggested to use FileAccess.Read to prevent file lock.
                //book1.xls is an Excel-2007-generated file, so some new unknown BIFF records are added. 
                using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
                {
                    ssfworkbook = new HSSFWorkbook(file);
                }
            }
            // For XLSX
            int ConvertToDataTable(long stockistId)
            {
                ADataImport oADataImport = new ADataImport();
                DataSet dsDataSet = new DataSet();
                try
                {
                    ISheet sheet = hssfworkbook.GetSheetAt(0);
                    System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
                    int[] arr4 = new int[100];
                    Int32 flag = 0;
                    Int32 count = 0;
                    DataTable dt = new DataTable();
                    for (int j = 0; j < 18; j++)
                    {
                        dt.Columns.Add(Convert.ToChar(((int)'A') + j).ToString());
                    }
                    //  Message.Visible = true;
                    while (rows.MoveNext())
                    {
                        ViewBag.Message = "File is Uploading.";
                        IRow row = (XSSFRow)rows.Current;
                        DataRow dr = dt.NewRow();
                        //  message.Visible = true;
                        if (!row.RowNum.Equals(0))
                        {

                            ViewBag.Message = "File is Uploading.";
                            for (int i = 0; i < row.LastCellNum; i++)
                            {
                                ViewBag.Message = "File is Uploading.";
                                ICell cell = row.GetCell(i);
                                if (cell == null)
                                {
                                    // flag = 1;
                                    //dr[i] = null;
                                    dr[i] = 0;
                                }
                                else
                                {
                                    dr[i] = cell.ToString();
                                }
                            }
                            ViewBag.Message = "File is Uploading.";
                            if (flag == 1)
                            {
                                count = count + 1;
                                arr4[count] = row.RowNum;
                            }
                            flag = 0;
                            dt.Rows.Add(dr);
                            ViewBag.Message = "File is Uploading.";
                        }
                    }
                    System.Text.StringBuilder sb = new System.Text.StringBuilder();
                    if (count != 0)
                    {
                        for (int i = 1; i <= count; i++)
                        {
                            sb = sb.Append(arr4[i] + 1).Append(",");
                        }
                        //  message.Visible = true;
                        ViewBag.Message = "The rows" + sb.ToString() + "has null values. Please correct it and upload";
                    }
                    else
                    {
                        ADataImport obj = new ADataImport();
                        List<ADataImport> oList = new List<ADataImport>();
                        dsDataSet = obj.PHARMASRProductFileUpload(dt, dbName);
                        //message.Visible = true;
                        // message.Value = "The File is uploaded"; 
                        foreach (DataRow row in dsDataSet.Tables[0].Rows)
                        {

                        }
                        // message.Visible = true;
                        ViewBag.Message = "The File is Uploaded";

                    }
                }
                catch (Exception ex)
                {
                    ViewBag.Message = "Failed, please check your file & Product Id Reputation and try again";
                }
            return 1;

            }
            /// <summary>
            /// For XLS Conversion
            /// </summary>
            /// <param name="stockistId"></param>
            /// <returns></returns>



            int ConvertToDataTable1(long stockistId)
            {
                ADataImport oOrderModel = new ADataImport();
                DataSet dsDataSet = new DataSet();
                System.Text.StringBuilder sb = new System.Text.StringBuilder();
                try
                {
                    ISheet sheet = ssfworkbook.GetSheetAt(0);
                    Int32 flag = 0;
                    Int32 count = 0;
                    System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
                    int[] arr4 = new int[100];
                    DataTable dt = new DataTable();
                    for (int j = 0; j < 8; j++)
                    {
                        dt.Columns.Add(Convert.ToChar(((int)'A') + j).ToString());
                    }
                    // message.Visible = true;
                    while (rows.MoveNext())
                    {
                        ViewBag.Message = "File is Uploading.";
                        IRow row = (HSSFRow)rows.Current;
                        DataRow dr = dt.NewRow();
                        if (!row.RowNum.Equals(0))
                        {
                            ViewBag.Message = "File is Uploading.";
                            for (int i = 0; i < 8; i++)
                            {
                                ICell cell = row.GetCell(i);


                                if (cell == null)
                                {
                                    flag = 1;
                                    dr[i] = null;
                                }
                                else
                                {
                                    dr[i] = cell.ToString();
                                }
                            }
                            ViewBag.Message = "File is Uploading.";
                            if (flag == 1)
                            {
                                count = count + 1;
                                arr4[count] = row.RowNum;
                            }
                            flag = 0;
                            dt.Rows.Add(dr);
                            ViewBag.Message = "File is Uploading.";
                        }
                    }

                    if (count != 0)
                    {
                        for (int i = 1; i <= count; i++)
                        {
                            sb = sb.Append(arr4[i] + 1).Append(",");
                        }
                        //  message.Visible = true;
                        ViewBag.Message = "The rows" + sb.ToString() + "has null or Invalid values. Please correct it and upload";
                    }
                    else
                    {

                        List<ADataImport> oList = new List<ADataImport>();
                        dsDataSet = oOrderModel.ProductFileUpload(dt, dbName);
                        foreach (DataRow row in dsDataSet.Tables[0].Rows)
                        {

                        }


                    }
                }
                catch (Exception ex)
                {
                    ViewBag.Message = "Upload failed please check your file and upload again";
                }
            return 1;
            }




        }
    }