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
    public class JobAllotmentController : Controller
    {

        string dbName = ConfigurationManager.AppSettings["dbName"].ToString();

        // GET: JobAllotment
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult JobAllotment()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Relieving(ProjectJobModel ProjectJob)
        {
            ProjectJobModel obj = new ProjectJobModel();

            List<ProjectJobModel> oList = new List<ProjectJobModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.Relieving(ProjectJob, dbName);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(oList, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public ActionResult AllotedJobNameSearch(ProjectJobModel ProjectJob)
        {
            ProjectJobModel obj = new ProjectJobModel();

            List<ProjectJobModel> oList = new List<ProjectJobModel>();
            try
            {
                DataSet dsDataSet = new DataSet();
                dsDataSet = obj.AllotedJobSearch(ProjectJob, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    ProjectJobModel MModels = new ProjectJobModel();
                    MModels.ProjectJobId = Convert.ToInt32(row["JobId"].ToString());
                   
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
        [HttpPost]
        public ActionResult GetNonAssignedEmployees(JobAllotment JobAllotment)
        {
            JobAllotment obj = new JobAllotment();

            List<JobAllotment> oList = new List<JobAllotment>();
            try



            {
                DataSet dsDataSet = new DataSet();

                dsDataSet = obj.GetNonAssignedEmployees(JobAllotment, dbName);
                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {

                   JobAllotment DJobAllotment = new JobAllotment();
                    DJobAllotment.JobCode = row["SalarySettingId"].ToString();
                    DJobAllotment.JobId= Convert.ToInt32(row["JobId"].ToString());
                    DJobAllotment.DesignationId = Convert.ToInt32(row["DesignationId"].ToString());
                    DJobAllotment.Salary = Convert.ToDecimal(row["Salary"].ToString());
                    DJobAllotment.EmpCode = Convert.ToInt32(row["EmpCode"].ToString());
                    DJobAllotment.EmpId = Convert.ToInt32(row["EmpId"].ToString());
                    DJobAllotment.EmpName = row["Name"].ToString();
                    DJobAllotment.JobAssignedByDes = row["JobAssignedByDes"].ToString();

                    
                    DJobAllotment.DesignationDescription = row["DesignationDescription"].ToString();
                    DJobAllotment.Status= row["Status"].ToString();
                  
                    DJobAllotment.Alloted = Convert.ToInt32(row["Alloted"].ToString());
                    DJobAllotment.JobAssignedby= Convert.ToInt32(row["JobAssignedby"].ToString());

                    oList.Add(DJobAllotment);
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("Message  :" + ex.Message + "+" + ex.StackTrace);
            }

            return Json(new { oList, success = true }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult JobAllotmentInsertandUpdate(List<JobAllotment> JobAllotment)
        {
            JobAllotment obj = new JobAllotment();
            DataSet dsDataSet = new DataSet();
            DataTable dt = new DataTable();
            List<JobAllotment> oList = new List<JobAllotment>();

            try
            {
                string[] tmpTable = new string[8];
                tmpTable[0] = "EmpID";
                tmpTable[1] = "DesignationId";
                tmpTable[2] = "JobId";
                tmpTable[3] = "Alloted";
                tmpTable[4] = "UId";
                tmpTable[5] = "JobAllotedDate";
                tmpTable[6] = "DelFlag";
                tmpTable[7] = "DeptId";
          
                dt = Common.CreateTable(tmpTable);

                foreach (var details in JobAllotment)
                {
                    obj.EmpId = details.EmpId;
                    obj.DesignationId = details.DesignationId;
                    obj.JobId= details.JobId;
                    obj.Alloted = details.Alloted;
                    obj.DelFlag = details.DelFlag;
                    obj.JobAllotedDate = details.JobAllotedDate;
                    obj.UId = details.UId;

                    obj.DeptId = details.DeptId;

                    dt.Rows.Add(obj.EmpId, obj.DesignationId, obj.JobId, obj.Alloted, obj.UId, obj.JobAllotedDate,obj.DelFlag,obj.DeptId);

                }

                dsDataSet = obj.JobAllotmentInsertandUpdate(dt, dbName);

                foreach (DataRow row in dsDataSet.Tables[0].Rows)
                {
                    JobAllotment MModels = new JobAllotment();
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


    }
}