using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace EUMI_ERP.Models
{
    public class ProductLinkModel
    {
        public long MainProdId { get; set; }

        public string LinkedItemCode { get; set; }
        public int LinkedProdId { get; set; }
        public long UId { get; set; }

        public long DeptId { get; set; }
        public int DelFlag { get; set; }

        public string LinkedProdDescr { get; set; }

        public string status { get; set; }

        DProductLink oDDProductLink = new DProductLink();
        public DataSet LinkProductInsert(DataTable dt, string dbName)
        {
            return oDDProductLink.LinkProductInsert(dt, dbName);
        }

        public DataSet GetCopyOfLinkedProd(ProductLinkModel oProductLinkModel, string dbName)
        {
            return oDDProductLink.GetCopyOfLinkedProd(oProductLinkModel, dbName);
        }
    }
}