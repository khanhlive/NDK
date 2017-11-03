using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ICB.Business.Models;

namespace ICB.Business.Access
{
    public class ServiceProvider : ApplicationManager<Models.Service, int>
    {
        public List<Service> GetRootList()
        {
            return dbSet.Where(p => p.Status == 1 && p.ServiceID == 0 && (p.HasChild ?? false)).ToList();
        }

        public List<Service> GetNodeOfParent(int id)
        {
            return dbSet.Where(p => p.Status == 1 && p.ServiceID == id && (!p.HasChild ?? true)).ToList();
        }

        public List<Service> GetFullServices()
        {
            var services = this.GetRootList();
            foreach (var item in services)
            {
                item.Services = this.GetNodeOfParent(item.ID);
            }
            return services;
        }
    }
}
