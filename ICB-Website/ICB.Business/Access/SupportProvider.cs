using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Threading.Tasks;

namespace ICB.Business.Access
{
    public class SupportProvider : ApplicationManager<Models.Support, int>
    {
        public SupportProvider()
        {

        }

        public async Task<AccessEntityResult> AddAsync(Support support)
        {

            Tuple<AccessEntityStatusCode, Support> result = await this.InsertAsync(support);
            if (result.Item1 == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Support, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Support, MessageType.Failed) };
            }

        }

        public AccessEntityResult Add(Support support)
        {

            AccessEntityStatusCode result = this.Insert(support);
            if (result == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Support, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Support, MessageType.Failed) };
            }

        }

        public async Task<AccessEntityResult> EditAsync(int id, Support support)
        {
            Support edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Support, MessageType.NotFound) };
            }
            else
            {
                edit.Group = support.Group;
                edit.Email = support.Email;
                edit.Phone= support.Phone;
                edit.Skype = support.Skype;
                edit.Name = support.Name;
                edit.Status = support.Status;
                edit.Thumbnail = support.Thumbnail;
                var ressult = await this.UpdateAsync(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Support, ressult.Item1) };
            }
        }

        public AccessEntityResult Edit(int id, Support support)
        {
            Support edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Support, MessageType.NotFound) };
            }
            else
            {
                edit.Group = support.Group;
                edit.Email = support.Email;
                edit.Phone = support.Phone;
                edit.Skype = support.Skype;
                edit.Name = support.Name;
                edit.Status = support.Status;
                edit.Thumbnail = support.Thumbnail;
                var ressult = this.Update(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Support, ressult.Item1) };
            }
        }
    }
}
