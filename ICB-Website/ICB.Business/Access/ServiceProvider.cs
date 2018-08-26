using System.Collections.Generic;
using System.Linq;
using ICB.Business.Models;
using NDK.ApplicationCore.Extensions.ResponseResults;
using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;

namespace ICB.Business.Access
{
    public class ServiceProvider : ApplicationManager<Models.Service, int>
    {
        public ServiceProvider()
        {

        }
        public ServiceProvider(bool proxy)
        {
            this.context.Configuration.ProxyCreationEnabled = proxy;
        }
        public List<Service> GetRootList()
        {
            return dbSet.Where(p => p.Status == 1 && p.ServiceID == 0 && (p.HasChild)).ToList();
        }

        public List<Service> GetNodeOfParent(int id)
        {
            return dbSet.Where(p => p.Status == 1 && p.ServiceID == id && (!p.HasChild)).ToList();
        }
        public List<ListService> GetNodeOfParent_2(int id)
        {
            var dt = dbSet.Where(p => p.Status == 1 && p.ServiceID == id && (!p.HasChild)).ToList();
            List<ListService> all = new List<ListService>();
            foreach (var item in dt)
            {
                ListService listService = new ListService { Caption = item.Caption, CategoryID = item.CategoryID, ID = item.ID, Name = item.Name, NameENG = item.NameENG, Services = this.GetNodeOfParent(item.ID), Status = item.Status, ThumbnailURL = item.ThumbnailURL, Title = item.Title, TitleENG = item.TitleENG };

                all.Add(listService);
            }
            return all;
        }

        public List<ListService> GetFullServices()
        {
            var services = this.GetRootList();
            List<ListService> all = new List<ListService>();
            foreach (var item in services)
            {
                ListService listService = new ListService { Caption = item.Caption, CategoryID = item.CategoryID, ID = item.ID, Name = item.Name, NameENG = item.NameENG, Services = this.GetNodeOfParent(item.ID), Status = item.Status, ThumbnailURL = item.ThumbnailURL, Title = item.Title, TitleENG = item.TitleENG };

                all.Add(listService);
            }
            return all;
        }
        public List<ListService> GetServicesLeft()
        {
            using (WebContext webContext = new WebContext())
            {
                var services = (from a in webContext.Services
                                join b in webContext.Categories on a.CategoryID equals b.ID
                                where a.Status == 1 && a.ServiceID == 0 && a.HasChild && (b.Order == 1 || b.Order == 2)
                                select a).ToList();
                List<ListService> all = new List<ListService>();
                foreach (var item in services)
                {
                    ListService listService = new ListService { Caption = item.Caption, CategoryID = item.CategoryID, ID = item.ID, Name = item.Name, NameENG = item.NameENG, Services_2 = this.GetNodeOfParent_2(item.ID), Status = item.Status, ThumbnailURL = item.ThumbnailURL, Title = item.Title, TitleENG = item.TitleENG };

                    all.Add(listService);
                }
                return all;
            }

        }
        public List<ListService> GetServicesRight()
        {
            using (WebContext webContext = new WebContext())
            {
                var services = (from a in webContext.Services
                                join b in webContext.Categories on a.CategoryID equals b.ID
                                where a.Status == 1 && a.ServiceID == 0 && a.HasChild && (b.Order != 1 && b.Order != 2)
                                select a).ToList();
                List<ListService> all = new List<ListService>();
                foreach (var item in services)
                {
                    ListService listService = new ListService { Caption = item.Caption, CategoryID = item.CategoryID, ID = item.ID, Name = item.Name, NameENG = item.NameENG, Services_2 = this.GetNodeOfParent_2(item.ID), Status = item.Status, ThumbnailURL = item.ThumbnailURL, Title = item.Title, TitleENG = item.TitleENG };

                    all.Add(listService);
                }
                return all;
            }

        }
        public AccessEntityResult Add(Service service)
        {

            AccessEntityStatusCode result = this.Insert(service);
            if (result == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Failed) };
            }

        }

        public AccessEntityResult Edit(int id, Service service)
        {
            Service edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.NotFound) };
            }
            else
            {
                edit.Name = service.Caption;
                edit.CategoryID = service.CategoryID;
                edit.NameENG = service.NameENG;
                edit.HasChild = service.HasChild;
                edit.ThumbnailURL = service.ThumbnailURL;
                edit.Introduction = service.Introduction;
                edit.Procedure = service.Procedure;
                edit.ServiceID = service.ServiceID;
                edit.LastMordifiedTime = service.LastMordifiedTime;
                edit.Caption = service.Name;
                edit.CaptionENG = service.NameENG;
                edit.Title = service.Name;
                edit.TitleENG = service.NameENG;
                edit.Description = service.Description;
                edit.DocumentView= service.DocumentView;
                var ressult = this.Update(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, ressult.Item1) };
            }
        }


    }
}
