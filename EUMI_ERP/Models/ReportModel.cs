using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;


namespace EUMI_ERP.Models
{
    public class ReportModel
    {
        public string Condition { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Number { get; set; }
        public string BillSeriesId { get; set; }
        public string BillSeries { get; set; }
        public string DeliveryNo { get; set; }
        public string Balance { get; set; }
        public string ItemId { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string Area { get; set; }
        public string Paytype { get; set; }
        public string InvoiceNo { get; set; }
        public string InvDate { get; set; }
        public string Customer { get; set; }
        public string Salesman { get; set; }
        public string TaxableAmount { get; set; }
        public string TaxAmount { get; set; }
        public string Amount { get; set; }
        public string DeptId { get; set; }
        public string SalesDeptId { get; set; }
        public string Department { get; set; }
        public string Group { get; set; }
        public string SubGroup { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string Location { get; set; }
        public string Quantity { get; set; }
        public string Price { get; set; }
        public string OtherCost { get; set; }
        public string JobCode { get; set; }
        public string ProEntryNo { get; set; }
        public string PurchaseType { get; set; }
        public string Year { get; set; }
        public string Column1 { get; set; }
        public string Column2 { get; set; }
        public string Column3 { get; set; }
        public string Column4 { get; set; }
        public string Column5 { get; set; }
        public string Column6 { get; set; }
        public string Column7 { get; set; }
        public string Column8 { get; set; }
        public string Column9 { get; set; }
        public string Column10 { get; set; }
        public string Column11 { get; set; }
        public string Column12 { get; set; }
        public string Column13 { get; set; }
        public string Column14 { get; set; }
        public string Column15 { get; set; }
        public string Column16 { get; set; }
        public string Column17 { get; set; }
        public string Column18 { get; set; }
        public string Column19 { get; set; }
        public string Column20 { get; set; }
        public string Column21 { get; set; }
        public string Column22 { get; set; }
        public string Column23 { get; set; }
        public string Column24 { get; set; }
        public string Column25 { get; set; }
        public string Column26 { get; set; }
        public string Column27 { get; set; }
        public string Column28 { get; set; }
        public string Column29 { get; set; }
        public string Column30 { get; set; }
        public string Column31 { get; set; }
        public string LocTransferId { get; set; }
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public string ItemKey { get; set; }

        public string OrderBouncingId { get; set; }
        public string Remarks { get; set; }
        public string User { get; set; }
        public string UserId { get; set; }
        public string Container { get; set; }
        public string ContractType { get; set; }


        public string ChasisNo { get; set; }
        public string Description { get; set; }

        public string Make { get; set; }
        public string Made { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string LotNumber { get; set; }
        public string Key { get; set; }

        public string InvQty { get; set; }
        public string IssuedQty { get; set; }
        public string PhoneNumber { get; set; }
        public string CustAddress { get; set; }
        public string EmpCode { get; set; }
        public string EmpName { get; set; }
        public string EmpId { get; set; }
        public string EmpUserId { get; set; }
        public string AttendanceDate { get; set; }
        public string InTime { get; set; }
        public string OutTime { get; set; }
        public string Workinghrs { get; set; }
        public string DesignationId { get; set; }
        public string Designation { get; set; }
        public string DateofJoin { get; set; }
        public string BasicSalary { get; set; }
        public string Years { get; set; }
        public string Days { get; set; }
        public string EliglibleDays { get; set; }
        public string Gratuity { get; set; }

        public string Cost { get; set; }
        public string ThirtyDays { get; set; }
        public string SixtyDays { get; set; }
        public string NinetyDays { get; set; }
        public string ObseleteItem { get; set; }
        public long SupplierId { get; set; }
        public string Variable1 { get; set; }
        public string Variable2 { get; set; }
        public decimal AvgCost { get; set; }
        public decimal LPCost { get; set; }
        public long Stock { get; set; }


        public string PresentDays { get; set; }
        public string AllowedLeaves { get; set; }
        public string TotalDaysInMonth { get; set; }
        public string TotalWorkingDays { get; set; }
        public string Leaves { get; set; }
        public string Month { get; set; }
        public string WorkingDays { get; set; }

        public string EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string WorkedDays { get; set; }
        public string LeavesTaken { get; set; }
        public string TotalDayOff { get; set; }
        public string HoliDay { get; set; }

        public string Allowance { get; set; }
        public string Deductions { get; set; }
        public string OTRate { get; set; }
        public string WorkingHours { get; set; }
        public string OTAmount { get; set; }
        public string TotalSalary { get; set; }
        public string Day1 { get; set; }
        public string Day2 { get; set; }
        public string Day3 { get; set; }
        public string Day4 { get; set; }
        public string Day5 { get; set; }
        public string Day6 { get; set; }
        public string Day7 { get; set; }
        public string Day8 { get; set; }
        public string Day9 { get; set; }
        public string Day10 { get; set; }
        public string Day11 { get; set; }
        public string Day12 { get; set; }
        public string Day13 { get; set; }
        public string Day14 { get; set; }
        public string Day15 { get; set; }
        public string Day16 { get; set; }
        public string Day17 { get; set; }
        public string Day18 { get; set; }
        public string Day19 { get; set; }
        public string Day20 { get; set; }
        public string Day21 { get; set; }
        public string Day22 { get; set; }
        public string Day23 { get; set; }
        public string Day24 { get; set; }
        public string Day25 { get; set; }
        public string Day26 { get; set; }
        public string Day27 { get; set; }
        public string Day28 { get; set; }
        public string Day29 { get; set; }
        public string Day30 { get; set; }
        public string Day31 { get; set; }

        public string Earnings { get; set; }
        public string HRA { get; set; }
        public string DA { get; set; }
        public string TA { get; set; }
        public string Others { get; set; }
        public string PF { get; set; }
        public string Tax { get; set; }
        public string ESI { get; set; }
        public string SalaryAdvance { get; set; }

        public string TotalEarnings { get; set; }
        public string LeaveDeductions { get; set; }
        public string TotalDeductions { get; set; }
        public string Status { get; set; }
        DInvReports oDInvReports = new DInvReports();


        public DataSet CustomerEnquiryMain(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.CustomerEnquiryMain(oReportModel, dbName);
        }
        public DataSet CustomerEnquirySub(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.CustomerEnquirySub(oReportModel, dbName);
        }
        public DataSet QuotationEntryMain(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.QuotationEntryMain(oReportModel, dbName);
        }
        public DataSet QuotationEntrySub(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.QuotationEntrySub(oReportModel, dbName);
        }
        public DataSet SalesOrderMain(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.SalesOrderMain(oReportModel, dbName);
        }
        public DataSet SalesOrderSub(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.SalesOrderSub(oReportModel, dbName);
        }
        public DataSet PurchaseOrderMain(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.PurchaseOrderMain(oReportModel, dbName);
        }
        public DataSet PurchasePerformaMain(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.PurchasePerformaMain(oReportModel, dbName);
        }
        public DataSet PurchaseOrderSub(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.PurchaseOrderSub(oReportModel, dbName);
        }
        public DataSet PurchasePerformaSub(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.PurchasePerformaSub(oReportModel, dbName);
        }
        public DataSet PurchaseEnquiryMain(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.PurchaseEnquiryMain(oReportModel, dbName);
        }
        public DataSet PurchaseEnquirySub(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.PurchaseEnquirySub(oReportModel, dbName);
        }
        public DataSet MRVPurchaseMain(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.MRVPurchaseMain(oReportModel, dbName);
        }
        public DataSet MRVPurchaseSub(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.MRVPurchaseSub(oReportModel, dbName);
        }
        public DataSet DetailedProduction(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.DetailedProduction(oReportModel, dbName);
        }
        public DataSet MonthwiseSalesStockQuery(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.MonthwiseSalesStockQuery(oReportModel, dbName);
        }
        public DataSet MonthwisePurchaseStockQuery(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.MonthwisePurchaseStockQuery(oReportModel, dbName);
        }
        public DataSet LocationTransfer(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.LocationTransfer(oReportModel, dbName);
        }
        public DataSet LocationTransferMain(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.LocationTransferMain(oReportModel, dbName);
        }
        public DataSet FastMovingLocationTransfer(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.FastMovingLocationTransfer(oReportModel, dbName);
        }

        public DataSet NonMovingLocationTransfer(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.NonMovingLocationTransfer(oReportModel, dbName);
        }
        public DataSet OrderBouncingReport(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.OrderBouncingReport(oReportModel, dbName);
        }
        public DataSet PackingHistoryReport(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.PackingHistoryReport(oReportModel, dbName);
        }
        public DataSet PackingHistoryDetailedReport(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.PackingHistoryDetailedReport(oReportModel, dbName);
        }
        public DataSet LocationTransferUsedCars(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.LocationTransferUsedCars(oReportModel, dbName);
        }
        public DataSet EmployeeAttendanceReport(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.EmployeeAttendanceReport(oReportModel, dbName);
        }

        public DataSet AgeingUsedCars(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.AgeingUsedCars(oReportModel, dbName);
        }
        public DataSet EmployeeAttendanceSummaryReport(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.EmployeeAttendanceSummaryReport(oReportModel, dbName);
        }

        public DataSet GratuityReport(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.GratuityReport(oReportModel, dbName);
        }

        public DataSet MonthlyPayrollGets(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.MonthlyPayrollGets(oReportModel, dbName);
        }

        public DataSet MonthlyPayrollDetails(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.MonthlyPayrollDetails(oReportModel, dbName);
        }

        public DataSet MonthlyPayrollNew(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.MonthlyPayrollNew(oReportModel, dbName);
        }
        public DataSet MonthlyPayrollSalaryGets(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.MonthlyPayrollSalaryGets(oReportModel, dbName);
        }

        public DataSet SalaryManagementGets(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.SalaryManagementGets(oReportModel, dbName);
        }
        public DataSet MonthlyPayrollInsert(DataTable dt, string dbName)
        {
            return oDInvReports.MonthlyPayrollInsert(dt, dbName);
        }

        public DataSet MonthlyPayrollSalaryInsert(DataTable dt, string dbName)
        {
            return oDInvReports.MonthlyPayrollSalaryInsert(dt, dbName);
        }

        public DataSet SalaryManagementInsertNew(DataTable dt, string dbName)
        {
            return oDInvReports.SalaryManagementInsertNew(dt, dbName);
        }
        public DataSet EmployeeSearch(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.EmployeeSearch(oReportModel, dbName);
        }


        public DataSet Rpt_PurchaseImportLocalCompare(ReportModel oReportModel, string dbName)
        {
            return oDInvReports.Rpt_PurchaseImportLocalCompare(oReportModel, dbName);
        }

    }
}