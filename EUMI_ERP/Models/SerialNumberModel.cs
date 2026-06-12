using EUMI_ERP.DataLayer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class SerialNumberModel
    {

        public int Id { get; set; }
        public long BOQNo { get; set; }
        public long STONo { get; set; }
        public long VoNo { get; set; }
        public long RVNo { get; set; }


        public long AVNo { get; set; }
        public long OPNo { get; set; }
        public long IONo { get; set; }
        public long SNNo { get; set; }
        public long IINo { get; set; }
        public long TVNo { get; set; }
        public long CNNo { get; set; }
        public long DNNo { get; set; }
        public long CBNo { get; set; }
        public long PNNo { get; set; }

        

        public long PVNo { get; set; }
        public long PDCNoRe { get; set; }
        public long PDCNoIs { get; set; }
        public long PettyCash { get; set; }
        public long Contra { get; set; }
        public int DeptId { get; set; }

        public int PettyCashPrint { get; set; }




        DProjectandJob oDProjectandJob = new DProjectandJob();
        DAccounts oDAccounts = new DAccounts();
        public DataSet BOQSlNoGetandGets(SerialNumberModel oSerialNumberModel, string dbName)
        {
            return oDProjectandJob.BOQSlNoGetandGets(oSerialNumberModel, dbName);
        }
        
        public DataSet VoucherNoGetandGets(SerialNumberModel oSerialNumberModel, string dbName)
        {
            return oDAccounts.VoucherNoGetandGets(oSerialNumberModel, dbName);
        }
    }
}
       