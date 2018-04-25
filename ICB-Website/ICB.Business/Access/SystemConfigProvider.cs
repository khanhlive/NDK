using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

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
                var result = (this.Insert(item));
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
                return new AccessEntityResult { Status = result.Item1, Data = result.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, result.Item1) };
            }
        }

        public async Task<AccessEntityResult> InsertOrUpdateAsync(SystemConfig systemConfig)
        {
            SystemConfig item = this.Get();
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
                item.ImageURL = systemConfig.ImageURL;
                var result = (await this.InsertAsync(item));
                return new AccessEntityResult { Status = result.Item1, Data = result.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, result.Item1) };
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
                item.ImageURL = systemConfig.ImageURL;
                var result = await this.UpdateAsync(item, item.ID);
                return new AccessEntityResult { Status = result.Item1, Data = result.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, result.Item1) };
            }
        }

        public SystemConfig Get()
        {
            return this.GetAll().Where(p => p.Category == (int)WebsiteCategory.Info).FirstOrDefault();
        }

        public async Task<SystemConfig> GetAsync()
        {
            return (await this.GetAllAsync()).FirstOrDefault();
        }

        public async Task<Tuple<AccessEntityStatusCode, SystemConfig>> AddBanner(string src)
        {
            SystemConfig systemConfig = new SystemConfig { Name = src, Status = 1, Category = (int)WebsiteCategory.Slider };
            var result = await this.InsertAsync(systemConfig);
            return (result);
        }

        public async Task<Tuple<AccessEntityStatusCode, SystemConfig>> EditBanner(int id, string src)
        {
            var edit = this.GetByID(id);
            if (edit == null)
            {
                return new Tuple<AccessEntityStatusCode, SystemConfig>(AccessEntityStatusCode.NotFound, null);
            }
            else
            {
                edit.Name = src;
                var result = await this.UpdateAsync(edit, id);
                return (result);
            }

        }

        public List<SystemConfig> GetBanner()
        {
            return this.GetAll().Where(p => p.Category == (int)WebsiteCategory.Slider).ToList();
        }

        public SystemConfig GetHOSONANGLUC()
        {
            int category = (int)WebsiteCategory.HosoNangLuc;
            return this.Find(x => x.Category == category);
        }

        public async Task<Tuple<AccessEntityStatusCode, SystemConfig>> INSERTorUPDATE_HOSO(string url)
        {
            var edit = this.GetHOSONANGLUC();
            if (edit == null)
            {
                SystemConfig systemConfig = new SystemConfig { Name = url, Status = 1, Category = (int)WebsiteCategory.HosoNangLuc };
                var result = await this.InsertAsync(systemConfig);
                return (result);
            }
            else
            {
                edit.Name = url;
                var result = await this.UpdateAsync(edit, edit.ID);
                return (result);
            }

        }

        public async Task<Tuple<AccessEntityStatusCode, SystemConfig>> INSERTorUPDATE_HOSO_Description(string caption, string description)
        {
            var edit = this.GetHOSONANGLUC();
            if (edit == null)
            {
                SystemConfig systemConfig = new SystemConfig { Name = "", Status = 1, Category = (int)WebsiteCategory.HosoNangLuc, Caption = caption, Description = description };
                var result = await this.InsertAsync(systemConfig);
                return (result);
            }
            else
            {
                edit.Caption = caption;
                edit.Description = description;
                var result = await this.UpdateAsync(edit, edit.ID);
                return (result);
            }

        }

        public async Task<Tuple<AccessEntityStatusCode, SystemConfig>> INSERTorUPDATE_GIOITHIEU(string name, string content)
        {
            var edit = this.GetGioiThieu();
            if (edit == null)
            {
                SystemConfig systemConfig = new SystemConfig { Name = name, Content = content, Status = 1, Category = (int)WebsiteCategory.GioiThieu };
                var result = await this.InsertAsync(systemConfig);
                return (result);
            }
            else
            {
                edit.Content = content;
                edit.Name = name;
                var result = await this.UpdateAsync(edit, edit.ID);
                return (result);
            }

        }

        public SystemConfig GetGioiThieu()
        {
            int category = (int)WebsiteCategory.GioiThieu;
            return this.Find(x => x.Category == category);
        }
        public async Task<SystemConfig> GetGioiThieuAsync()
        {
            int category = (int)WebsiteCategory.GioiThieu;
            return (await this.FindAsync(x => x.Category == category));
        }

    }
}