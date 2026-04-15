using EUMI_ERP.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.IO;


namespace EUMI_ERP.PayRoll
{
    public class SalarySettingsController : Controller

    {

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();
        // GET: SalarySettings
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SalarySettings()
        {
            return View();
        }

        [HttpPost]
        public ActionResult DesignationNameSearch(DesignationModel Designation)
        {
            DesignationModel obj = new DesignationModel();

            List<DesignationModel> oList = new List<DesignationModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.DesignationNameSearch(Designation, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DesignationModel MModels = new DesignationModel();
                    MModels.DesignationId = Convert.ToInt32(row["DesignationId"].ToString());
                    MModels.DesignationCode = row["DesignationCode"].ToString();
                    MModels.DesignationDescription = row["DesignationDescription"].ToString();
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
        public JsonResult SalarySettingInsertandUpdate(List<DesignationModel> DesignationModel)
        {
            DesignationModel obj = new DesignationModel();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<DesignationModel> oList = new List<DesignationModel>();

            try
            {
                string[] tmpTable = new string[6];
                tmpTable[0] = "JobCode";
                tmpTable[1] = "DesignationId";
                tmpTable[2] = "Salary";
                tmpTable[3] = "DelFlag";
                tmpTable[4] = "UId";
                tmpTable[5] = "DeptId";
                dt = Common.CreateTable(tmpTable);

                foreach (var details in DesignationModel)
                {
                    obj.JobCode = details.JobCode;
                    obj.DesignationId= details.DesignationId;
                    obj.Salary = details.Salary;
                    obj.DelFlag = details.DelFlag;
             
                    obj.UId = details.UId;
                    obj.DeptId = details.DeptId;
                   
                    dt.Rows.Add(obj.JobCode, obj.DesignationId, obj.Salary, obj.DelFlag,obj.UId,obj.DeptId);

                }

                dsDataSet = obj.SalarySettingInsertandUpdate(dt, dbName);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DesignationModel MModels = new DesignationModel();
                    MModels.Status = row["Status"].ToString();
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
        public ActionResult GetCopy(DesignationModel DesignationModel)
        {
            DesignationModel obj = new DesignationModel();

            List<DesignationModel> oList = new List<DesignationModel>();
            try

            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.GetCopy(DesignationModel, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    DesignationModel DModels = new DesignationModel();
                    DModels.DesignationId = Convert.ToInt32(row["DesignationId"].ToString());
                    DModels.DesignationDescription = row["DesignationDescription"].ToString();
                    DModels.Salary = Convert.ToDecimal(row["Salary"].ToString());
                    DModels.DelFlag = Convert.ToInt32(row["DelFlag"].ToString());
                    DModels.UId= Convert.ToInt32(row["Uid"].ToString());
                    DModels.DeptId = Convert.ToInt32(row["DeptId"].ToString());
                    oList.Add(DModels); 
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult JobNameSearch(ProjectJobModel ProjectJob)
        {
            ProjectJobModel obj = new ProjectJobModel();

            List<ProjectJobModel> oList = new List<ProjectJobModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.JobSearch(ProjectJob, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProjectJobModel MModels = new ProjectJobModel();
                    MModels.ProjectJobId = Convert.ToInt32(row["ProjectJobId"].ToString());
                    MModels.JobCode = row["JobCode"].ToString();
                    MModels.Description = row["Description"].ToString();
                    oList.Add(MModels);
                }
               
            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }

       


    }
}