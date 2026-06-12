using System.Data;

namespace EUMI_ERP.Models
{
    public class EmrDataModel
    {
        public long EmrId { get; set; }

        public string Emrcode { get; set; }

        public string Type { get; set; }

        public string EmrDesc { get; set; }

        public int Delflg { get; set; }
        public string Status { get; set; }

        DEmrData oDEmrData = new DEmrData(); 

        public DataSet EmrDataGetandGets(EmrDataModel oEmrDataModel, string dbName)
        {
            return oDEmrData.EmrDataGetandGets(oEmrDataModel, dbName);
        }

        public DataSet EmrDataInsertandUpdate(EmrDataModel oEmrDataModel, string dbName)
        {
            return oDEmrData.EmrDataInsertandUpdate(oEmrDataModel, dbName);
        }
    }
}