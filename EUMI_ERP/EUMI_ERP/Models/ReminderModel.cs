using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using EUMI_ERP.Models;

namespace EUMI_ERP.Models
{
    public class ReminderModel
    {
        public long ReminderId { get; set; }
        public long UserId { get; set; }
        public string TaskId { get; set; }
        public string TRType { get; set; }
        public string UserName { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Subject { get; set; }
        public string TaskStatus { get; set; }
        public string ReminderMessage { get; set; }
        public int trtypes { get; set; }
        public int DelFlag { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }



        public long Ex_ChatId { get; set; }
        public long SenderId { get; set; }
        public long ReceiverId { get; set; }

        public string Viewflag { get; set; }
    

        public string ChatMessage { get; set; }

        DMasters oDMasters = new DMasters();


        public DataSet ReminderInsertandUpdate(ReminderModel oReminderModel, string dbName)
        {
            return oDMasters.ReminderInsertandUpdate(oReminderModel, dbName);
        }


        public DataSet ReminderGetandGets(ReminderModel oReminderModel, string dbName)
        {
            return oDMasters.ReminderGetandGets(oReminderModel, dbName);
        }


        public DataSet getOnlineUsers(ReminderModel oReminderModel, string dbName)
        {
            return oDMasters.getOnlineUsers(oReminderModel, dbName);
        }
        

        public DataSet Ex_ChatInsert(ReminderModel oReminderModel, string dbName)
        {
            return oDMasters.Ex_ChatInsert(oReminderModel, dbName);
        }
        public DataSet Ex_ChatGet(ReminderModel oReminderModel, string dbName)
        {
            return oDMasters.Ex_ChatGet(oReminderModel, dbName);
        }

    }
}