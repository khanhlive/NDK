using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Threading.Tasks;

namespace ICB.Business.Access
{
    public class CustomerProvider : ApplicationManager<Models.Customer, int>
    {
        public async Task<AccessEntityResult> AddAsync(Customer customer)
        {

            Tuple<AccessEntityStatusCode, Customer> result = await this.InsertAsync(customer);
            if (result.Item1 == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Customer, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Customer, MessageType.Failed) };
            }

        }

        public AccessEntityResult Add(Customer customer)
        {

            AccessEntityStatusCode result = this.Insert(customer);
            if (result == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Customer, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Customer, MessageType.Failed) };
            }

        }

        public async Task<AccessEntityResult> EditAsync(int id, Customer customer)
        {
            Customer edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Customer, MessageType.NotFound) };
            }
            else
            {
                edit.Address = customer.Address;
                edit.Email = customer.Email;
                edit.Fullname = customer.Fullname;
                edit.Icon = customer.Icon;
                edit.Name = customer.Name;
                edit.Order = customer.Order;
                edit.PhoneNumber = customer.PhoneNumber;
                edit.Status = customer.Status;
                edit.Thumbnail = customer.Thumbnail;
                edit.Title = customer.Title;
                edit.Website = customer.Website;
                var ressult = await this.UpdateAsync(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Customer, ressult.Item1) };
            }
        }

        public AccessEntityResult Edit(int id, Customer customer)
        {
            Customer edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Customer, MessageType.NotFound) };
            }
            else
            {
                edit.Address = customer.Address;
                edit.Email = customer.Email;
                edit.Fullname = customer.Fullname;
                edit.Icon = customer.Icon;
                edit.Name = customer.Name;
                edit.Order = customer.Order;
                edit.PhoneNumber = customer.PhoneNumber;
                edit.Status = customer.Status;
                edit.Thumbnail = customer.Thumbnail;
                edit.Title = customer.Title;
                edit.Website = customer.Website;
                var ressult = this.Update(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Customer, ressult.Item1) };
            }
        }
    }
}