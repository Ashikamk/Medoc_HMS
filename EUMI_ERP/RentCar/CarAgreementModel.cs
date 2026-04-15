using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.RentCar
{
    public class CarAgreement
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Type { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public long VechicleId { get; set; }
        public long ItemId { get; set; }
        public string VechicleNo { get; set; }
        public string VechicleDesc { get; set; }
        public long Model { get; set; }
        public string Make { get; set; }
        public long AgreementId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string ReturnDate { get; set; }
        public long CustomerId { get; set; }
        public string AgreementNo { get; set; }
        public string LicenseNo { get; set; }
        public string CheckoutDate{ get; set; }
        public string CheckinDate{ get; set; }
        public string TicketDate{ get; set; }
        public string Phone { get; set; }
        public string CardNo { get; set; }
        public long PONo { get; set; }
        public long Checkoutlocation { get; set; }
        public long Checkinlocation { get; set; }
        public string AgreementType { get; set; }
        public long CreatedById { get; set; }
        public int DelFlag { get; set; }
        public string CurrDate { get; set; }
        public string AgreementStatus { get; set;}
        public int Status { get; set; }
        public string CustomerName { get; set; }
        public string CheckoutlocName { get; set; }
        public string CheckinlocName { get; set; }
        public string CreatedBy { get; set; }
        public decimal DailyPrice { get; set; }
        public decimal WeeklyPrice { get; set; }
        public decimal MonthlyPrice { get; set; }
        public decimal AnnualPrice { get; set; }
        public string SalesFlag { get; set; }

        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        DCarAgreement oDCarAgreement = new DCarAgreement();
        public DataSet CarSearch(CarAgreement CarAgreement, string dbName)
        {
            return oDCarAgreement.CarSearch(CarAgreement, dbName);
        }
        public DataSet CarAgreementInsertandUpdate(CarAgreement CarAgreement, string dbName)
        {
            return oDCarAgreement.CarAgreementInsertandUpdate(CarAgreement, dbName);
        }
        public DataSet CarAgreementGetandGets(CarAgreement CarAgreement, string dbName)
        {
            return oDCarAgreement.CarAgreementGetandGets(CarAgreement, dbName);
        }
        public DataSet CarAgreementView(CarAgreement CarAgreement, string dbName)
        {
            return oDCarAgreement.CarAgreementView(CarAgreement, dbName);
        }
        
    }
}