using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace EUMI_ERP.Models
{
    public class Agent
    {
        public long AgentId { get; set; }
        public string AgentName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string PhoneNumber { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }


        DMasters oDMasters = new DMasters();

        public DataSet AgentInsertandUpdates(Agent Agent, string dbName)
        {
            return oDMasters.AgentInsertandUpdates(Agent, dbName);
        }
        public DataSet AgentGetandGets(Agent Agent, string dbName)
        {
            return oDMasters.AgentGetandGets(Agent, dbName);
        }
        public DataSet AgentNameSearch(Agent oAgent, string dbName)
        {
            return oDMasters.AgentNameSearch(oAgent, dbName); 
        }

    }
}