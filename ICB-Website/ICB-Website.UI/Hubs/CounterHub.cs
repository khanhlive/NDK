using Microsoft.AspNet.SignalR;
using System;
using System.Threading.Tasks;
using System.Web;

namespace ICB_Website.UI.Hubs
{
    public class CounterHub : Hub
    {
        private static int counter = 0;
        public CounterHub()
        {
            
        }
        public override Task OnConnected()
        {
            counter = counter + 1;
            int totalvisitor = Convert.ToInt32(HttpContext.Current.Application["totalvisitor"].ToString());
            totalvisitor += 1;
            HttpContext.Current.Application["totalvisitor"] = totalvisitor;
            Clients.All.UpdateTotalVisitor(totalvisitor);
            Clients.All.UpdateCount(counter);
            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            counter = counter + 1;
            Clients.All.UpdateCount(counter);
            return base.OnReconnected();
        }

        public override Task OnDisconnected()
        {
            counter = counter - 1;
            Clients.All.UpdateCount(counter);
            return base.OnDisconnected();
        }
        
    }
}