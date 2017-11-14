using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ICB.Business.Access
{
    public class CategoryProvider : ApplicationManager<Models.Category,int>
    {
        public CategoryProvider() { 
        }
        public CategoryProvider(bool proxy)
        {
            this.context.Configuration.ProxyCreationEnabled = proxy;
        }
        public async Task<AccessEntityResult> AddAsync(Category category)
        {

            Tuple<AccessEntityStatusCode, Category> result = await this.InsertAsync(category);
            if (result.Item1 == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Category, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Category, MessageType.Failed) };
            }

        }

        public AccessEntityResult Add(Category category)
        {

            AccessEntityStatusCode result = this.Insert(category);
            if (result == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Category, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Category, MessageType.Failed) };
            }

        }

        public async Task<AccessEntityResult> EditAsync(int id, Category category)
        {
            Category edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Category, MessageType.NotFound) };
            }
            else
            {
                edit.Active = category.Active;
                edit.Name = category.Name;
                edit.NameENG = category.NameENG;
                edit.Order = category.Order;
                edit.Title = category.Title;
                edit.TitleENG = category.TitleENG;
                var ressult = await this.UpdateAsync(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Category, ressult.Item1) };
            }
        }

        public AccessEntityResult Edit(int id, Category category)
        {
            Category edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Category, MessageType.NotFound) };
            }
            else
            {
                edit.Active = category.Active;
                edit.Name = category.Name;
                edit.NameENG = category.NameENG;
                edit.Order = category.Order;
                edit.Title = category.Title;
                edit.TitleENG = category.TitleENG;
                var ressult = this.Update(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Category, ressult.Item1) };
            }
        }

    }
}
