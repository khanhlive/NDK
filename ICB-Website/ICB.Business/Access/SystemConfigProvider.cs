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
        public AccessEntityStatusCode InsertOrUpdate(SystemConfig systemConfig)
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
                return this.Insert(item);
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
                return this.Update(item, item.ID).Item1;
            }
        }

        public async Task<Tuple<AccessEntityStatusCode, SystemConfig>> InsertOrUpdateAsync(SystemConfig systemConfig)
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
                return (await this.InsertAsync(item));
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
                return await this.UpdateAsync(item, item.ID);
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
