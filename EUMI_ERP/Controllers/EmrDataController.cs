    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Web.Mvc;
    using EUMI_ERP.Models;

    namespace EUMI_ERP.Controllers
    {
        public class EmrDataController : Controller
        {
            string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

            public ActionResult EmrData()
            {
                return View();
            }

            [HttpPost]
            public ActionResult EmrDataInsertandUpdate(EmrDataModel oEmrDataModel)
            {
                EmrDataModel obj = new EmrDataModel();
                List<EmrDataModel> oList = new List<EmrDataModel>();

                try
                {
                    DataSet dsDataSet = new DataSet();
                    dsDataSet = obj.EmrDataInsertandUpdate(oEmrDataModel, dbName);

                    if (dsDataSet != null && dsDataSet.Tables.Count > 0 && dsDataSet.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow row in dsDataSet.Tables[0].Rows)
                        {
                            EmrDataModel MModels = new EmrDataModel();

                            MModels.EmrId = Convert.ToInt32(row["EmrId"]);
                            MModels.Status = row["Status"].ToString(); 

                            oList.Add(MModels);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
                }

                return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
            }

            // GET DATA
            [HttpPost]
            public ActionResult EmrDataGetandGets(EmrDataModel oEmrDataModel)
            {
                EmrDataModel obj = new EmrDataModel();
                List<EmrDataModel> oList = new List<EmrDataModel>();

                try
                {
                    DataSet dsDataSet = new DataSet();
                    dsDataSet = obj.EmrDataGetandGets(oEmrDataModel, dbName);

                    foreach (DataRow row in dsDataSet.Tables[0].Rows)
                    {
                        EmrDataModel MModels = new EmrDataModel();

                        MModels.EmrId = Convert.ToInt32(row["EmrId"].ToString());
                        MModels.Emrcode = row["Emrcode"].ToString();
                        MModels.Type = row["Type"].ToString();
                        MModels.EmrDesc = row["EmrDesc"].ToString();

                        oList.Add(MModels);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Message :" + ex.Message + "+" + ex.StackTrace);
                }

                return new JsonResult()
                {
                    Data = oList,
                    MaxJsonLength = 86753090
                };
            }
        }
    }