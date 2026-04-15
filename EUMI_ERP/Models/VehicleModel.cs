using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;
namespace EUMI_ERP.Models
{
    public class VehicleModel
    {
        public string RegistrationNumber { get; set; }
        public string Name { get; set; }
        public long VehicleId { get; set; }
        public string VehicleStatus { get; set; }
        public string FuelType { get; set; }
        public string Driver { get; set; }
        public string RegistrationDate { get; set; }
        public string ExpiryDate { get; set; }
        public string InsuranceType { get; set; }
        public string Validity { get; set; }
        public string VehicleDescription { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }


        DMasters oDMasters = new DMasters();


        public DataSet VehicleGetandGets(VehicleModel oVehicleModel, string dbName)
        {
            return oDMasters.VehicleGetandGets(oVehicleModel, dbName);
        }


        public DataSet VehicleInsertandUpdate(VehicleModel oVehicleModel, string dbName)
        {
            return oDMasters.VehicleInsertandUpdate(oVehicleModel, dbName);
        }
    }
}