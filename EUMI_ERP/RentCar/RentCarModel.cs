using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace EUMI_ERP.RentCar
{
    public class RentCarModel
    {
   public string CarFolder = "CarMultiImages";

   public string CarScratch = "CarScratchImages"; 
   public string                        Status        {get;set;}
   public long                           CarId        {get;set;}            
   public string                       CarCode        {get;set;}           
   public string                       CarDesc        {get;set;}           
   public decimal                    CurrentKM        {get;set;}        
   public decimal                  NextService        {get;set;}      
   public string                 InsuranceDate        {get;set;}    
   public string              RegistrationDate        {get;set;} 
   public long                           IYear        {get;set;}            
   public string                     PlateName        {get;set;}        
   public string                     PlateCode        {get;set;}        
   public string                      EngineNo        {get;set;}         
   public decimal                      CarFuel        {get;set;}          
   public string                     ChassisNo        {get;set;}        
   public decimal                 PetrolCharge        {get;set;}     
   public decimal                   DailyPrice        {get;set;}       
   public decimal                  WeeklyPrice        {get;set;}      
   public decimal                 MonthlyPrice        {get;set;}     
   public decimal                  AnnualPrice        {get;set;}      
   public string                      Comments        {get;set;}         
   public string                          TCNO        {get;set;}             
   public string                      CarColor        {get;set;}         
   public string                      SubColor        {get;set;}         
   public string                      Category        {get;set;}         
   public string                      CarClass        {get;set;}         
   public string                        Origin        {get;set;}           
   public string                   PlateSource        {get;set;}      
   public string                 PlateCategory        {get;set;}    
   public string                         Shape        {get;set;}            
   public decimal                      EmptyWt        {get;set;}          
   public decimal                         GVWt        {get;set;}             
   public long                           Doors        {get;set;}            
   public long                           Seats        {get;set;}            
   public long                       Cylinders        {get;set;}        
   public string                       CarMake        {get;set;}          
   public string                       PayLoad        {get;set;}          
   public string                     MortageBy        {get;set;}        
   public string                 MortageNumber        {get;set;}    
   public string              Insurancecompany        {get;set;} 
   public string                 InsuranceType        {get;set;}    
   public string                   InsuranceNo        {get;set;}      
   public string                  InsStartDate        {get;set;}     
   public long                           Radio        {get;set;}            
   public long                        HeaterAC        {get;set;}         
   public long                          Petrol        {get;set;}           
   public long                       ToolsJack        {get;set;}        
   public long                          Lights        {get;set;}           
   public long                      Sparewheel        {get;set;}       
   public long                    OutOfService        {get;set;}     
   public string                          Flag        {get;set;}             
   public string                   CurrentDate        {get;set;}      
   public long                      ItemUserId        {get;set;}       
   public long                   BelowCostFlag        {get;set;}    
   public long                         DelFlag        {get;set;}

  public string LicenseNo        { get; set; }
  public long AgreementId        { get; set; }
  public string AgreementNo      { get; set; }
  public string StartDate        { get; set; }
  public string EndDate          { get; set; }
  public string ReturnDate       { get; set; }
  public long CustomerId         { get; set; }
  public string AgreementStatus  { get; set; }
  public string CustAccount      { get; set; }
  public string CustName         { get; set; }
  public long CheckInLocation    { get; set; }
  public long CheckOutLocation   { get; set; }
  public string CheckInDate { get; set; }
  public string PhoneNo { get; set; }        
   public long SlNo { get; set; }
   public string FileName { get; set; }
   public string Extension { get; set; }
   public string FolderFileName { get; set; }
   public long ImgType { get; set; }
   public long DeptId { get; set; } 

   DRentCar oDRentCar = new DRentCar();
   public DataSet CarInsertandUpdate(RentCarModel oRentCarModel, string dbName)
   {
       return oDRentCar.CarInsertandUpdate(oRentCarModel, dbName);    
   }
    public DataSet CarGetandGets(RentCarModel oRentCarModel, string dbName)
    {
        return oDRentCar.CarGetandGets(oRentCarModel, dbName);  
    }
        public DataSet CarMultipleImageInsert(DataTable dt, string dbName)
        {
            return oDRentCar.CarMultipleImageInsert(dt, dbName);
        }
        public DataSet CarsFileGets(RentCarModel oRentCarModel, string dbName)
        {
            return oDRentCar.CarsFileGets(oRentCarModel, dbName);
        }
        public DataSet CarFileDelete(RentCarModel oRentCarModel, string dbName)
        {
            return oDRentCar.CarFileDelete(oRentCarModel, dbName);
        }
        public DataSet CarGetandGetsDailyPlanner(RentCarModel oRentCarModel, string dbName)
        {
            return oDRentCar.CarGetandGetsDailyPlanner(oRentCarModel, dbName); 
        }

    }


    public class RentCustomer
    {
        public string MainFolder = "Customer";
        public string ImageFolder = "Image";
        public string DocumentFolder = "Document";

        public long FileId { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }
        public long Flag { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public string Curdate { get; set; }
        public long CustId { get; set; }
        public long AccountType { get; set; }
        public string CustType { get; set; }
        public string CustAccount { get; set; }
        public string CustName { get; set; }
        public decimal OpenBalance { get; set; }
        public long DueDays { get; set; }
        public decimal CreditLimit { get; set; }
        public long CustTermsId { get; set; }
        public long CustTerms { get; set; }
        public string TRNNumber { get; set; }
        public long SalesmanId { get; set; }
        public int SalesmanName { get; set; }
        public string SalesMan { get; set; }
        public long PriceGroupId { get; set; }
        public string PriceGroup { get; set; }
        public long CurrencyId { get; set; }
        public string CurrencyType { get; set; }
        public long AreaId { get; set; }
        public string Area { get; set; }
        public long CustStatusId { get; set; }
        public string CustStatus { get; set; }
        public string CustStreet1 { get; set; }
        public string CustStreet2 { get; set; }
        public string CustCity1 { get; set; }
        public string CustCity2 { get; set; }
        public string CustState1 { get; set; }
        public string CustState2 { get; set; }
        public string CustPin1 { get; set; }
        public string CustPin2 { get; set; }
        public string CustCountry1 { get; set; }
        public string CustCountry2 { get; set; }
        public string CustNotes { get; set; }
        public string CustContactName1 { get; set; }
        public string CustContactNo1 { get; set; }
        public string CustContactName2 { get; set; }
        public string CustContactNo2 { get; set; }
        public string CustContactName3 { get; set; }
        public string CustContactNo3 { get; set; }
        public string CustEmailId { get; set; }
        public string EmailId { get; set; }
        public string MapId { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public long cstyp { get; set; }
        public string PhoneNumber { get; set; }

        public string DOB {get;set;} 
        public string LicenseNo {get;set;} 
        public string LicenseCategory {get;set;} 
        public string LicenseIssuedOn {get;set;} 
        public string LicenseExpireOn {get;set;}
        public string LicenseIssuedState {get;set;} 
        public string DrivingExp {get;set;}
        public string Company {get;set;}
        public string WorkPhn {get;set;}
        public string IDNo {get;set;}
        public string Nationality {get;set;}
        public string IDIssuedOn {get;set;}
        public string IDExpireOn {get;set;}



        DRentCar oDRentCar = new DRentCar();
        public DataSet RentCustomerInsertandUpdate(RentCustomer oCustomerMaster, string dbName)
        {
            return oDRentCar.RentCustomerInsertandUpdate(oCustomerMaster, dbName);
        }
        public DataSet RentCustomerGetandGets(RentCustomer oCustomerMaster, string dbName)
        {
            return oDRentCar.RentCustomerGetandGets(oCustomerMaster, dbName);
        }
        public DataSet CustomerFileInsert(RentCustomer RentCustomer, string dbName)
        {
            return oDRentCar.CustomerFileInsert(RentCustomer, dbName);
        }
        public DataSet CustomerFileGets(RentCustomer RentCustomer, string dbName)
        {
            return oDRentCar.CustomerFileGets(RentCustomer, dbName);
        }
        public DataSet CustomerFileDelete(RentCustomer RentCustomer, string dbName)
        {
            return oDRentCar.CustomerFileDelete(RentCustomer, dbName);
        }
    }

    public class CarDashboard
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Status { get; set; }
        public long UserId { get; set; }
        public long DeptId { get; set; }
        public long TotalCars { get; set; }
        public long RentedCars { get; set; }
        public long TodayReservation { get; set; }
        public long TodayArrivals { get; set; }
        public long OPAgreement { get; set; }
        public long PendingPayement { get; set; }

        DRentCar oDRentCar = new DRentCar();
        public DataSet GetDashboardWidgets(CarDashboard CarDashboard, string dbName)
        {
            return oDRentCar.GetDashboardWidgets(CarDashboard, dbName);
        }
        
        public DataSet RentCarDashBoardList(CarAgreement CarDashboard, string dbName)
        {
            return oDRentCar.RentCarDashBoardList(CarDashboard, dbName);
        }
        

    }


}