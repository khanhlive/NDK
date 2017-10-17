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
    public class SystemConfigProvider : ApplicationManager<Models.SystemConfig, int>
    {
        public AccessEntityResult InsertOrUpdate(SystemConfig systemConfig)
        {
            SystemConfig item = this.GetAll().FirstOrDefault();
            if (item == null)
            {
                //thêm mới
                item = new SystemConfig();
                item.Address = systemConfig.Address;
                item.Email = systemConfig.Email;
                item.Fax = systemConfig.Fax;
                item.Hotline = systemConfig.Hotline;
                item.Name = systemConfig.Name;
                item.NameENG = systemConfig.NameENG;
                item.Tel = systemConfig.Tel;
                item.Website = systemConfig.Website;
                item.Status = 1;
                item.Category = 0;
                var result = ( this.Insert(item));
                return new AccessEntityResult { Status = result, Message = MessageManager.GetErrorMessage(ModuleType.Base, result) };
            }
            else
            {
                //cập nhật
                item.Address = systemConfig.Address;
                item.Email = systemConfig.Email;
                item.Fax = systemConfig.Fax;
                item.Hotline = systemConfig.Hotline;
                item.Name = systemConfig.Name;
                item.NameENG = systemConfig.NameENG;
                item.Tel = systemConfig.Tel;
                item.Website = systemConfig.Website;
                item.Status = 1;
                item.Category = 0;
                var result = this.Update(item, item.ID);
                return new AccessEntityResult { Status = result.Item1,Data=result.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, result.Item1) };
            }
        }

        public async Task<AccessEntityResult> InsertOrUpdateAsync(SystemConfig systemConfig)
        {
            SystemConfig item = this.GetAll().FirstOrDefault();
            if (item == null)
            {
                //thêm mới
                item = new SystemConfig();
                item.Address = systemConfig.Address;
                item.Email = systemConfig.Email;
                item.Fax = systemConfig.Fax;
                item.Hotline = systemConfig.Hotline;
                item.Name = systemConfig.Name;
                item.NameENG = systemConfig.NameENG;
                item.Tel = systemConfig.Tel;
                item.Website = systemConfig.Website;
                item.Status = 1;
                item.Category = 0;
                var result = (await this.InsertAsync(item));
                return new AccessEntityResult { Status = result.Item1, Data=result.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, result.Item1) };
            }
            else
            {
                //cập nhật
                item.Address = systemConfig.Address;
                item.Email = systemConfig.Email;
                item.Fax = systemConfig.Fax;
                item.Hotline = systemConfig.Hotline;
                item.Name = systemConfig.Name;
                item.NameENG = systemConfig.NameENG;
                item.Tel = systemConfig.Tel;
                item.Website = systemConfig.Website;
                item.Status = 1;
                item.Category = 0;
                var result = await this.UpdateAsync(item, item.ID);
                return new AccessEntityResult { Status = result.Item1, Data = result.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, result.Item1) };
            }
        }

        public SystemConfig Get()
        {
            return this.GetAll().FirstOrDefault();
        }

        public async Task<SystemConfig> GetAsync()
        {
            return (await this.GetAllAsync()).FirstOrDefault();
        }
    }
}
