using ICB.Business.Models;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ICB_Website.UI.Hubs
{
    public class ChatHub : Hub
    {
        public static ConcurrentDictionary<string, string> dic = new ConcurrentDictionary<string, string>();

        public void Send(string name, string message)
        {
            Clients.All.broadcastMessage(name, message);
        }

        public void SendToSpecific(string name, string message, string to)
        {
            // Call the broadcastMessage method to update clients.
            Clients.Caller.broadcastMessage(name, message,to);
            using (WebContext db =new WebContext())
            {
                Message msg = new Message { Content = message, CreateDate = DateTime.Now, Name = name, Status = 0, UserID = null };
                db.Messages.Add(msg);
                int count = db.SaveChanges();
                
            }
            Clients.Client(dic[to]).broadcastMessage(name, message,to);
        }

        public void Notify(string name, string id)
        {
            if (dic.ContainsKey(name))
            {
                Clients.Caller.differentName();
            }
            else
            {
                dic.TryAdd(name, id);
                foreach (KeyValuePair<String, String> entry in dic)
                {
                    Clients.Caller.online(entry.Key);
                }
                Clients.Others.enters(name);
            }
        }

        public override Task OnDisconnected()
        {
            var name = dic.FirstOrDefault(x => x.Value == Context.ConnectionId.ToString());
            string s;
            if (name.Key!=null)
            {
                dic.TryRemove(name.Key, out s);
            }
            return Clients.All.disconnected(name.Key);
        }

    }
}