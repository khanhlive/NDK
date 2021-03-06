﻿using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace ICB.Business.Access
{
    public class DocumentProvider : ApplicationManager<Models.Document, int>
    {
        public DocumentProvider()
        {
            this.context.Configuration.ProxyCreationEnabled = false;
        }

        private string GetFilename(string path)
        {
            if (File.Exists(HttpContext.Current.Server.MapPath("~")+"\\"+ path))
            {
                return Path.GetFileName(HttpContext.Current.Server.MapPath("~") + "\\" + path);
            }
            else return string.Empty;
        }

        #region Chung

        public async Task<AccessEntityResult> AddAsync(Document document)
        {
            document.Filename = this.GetFilename(document.Path);
            Tuple<AccessEntityStatusCode, Document> result = await this.InsertAsync(document);
            if (result.Item1 == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Data = result.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Failed) };
            }

        }

        public AccessEntityResult Add(Document document)
        {
            document.Filename = this.GetFilename(document.Path);
            AccessEntityStatusCode result = this.Insert(document);
            if (result == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Failed) };
            }

        }

        public async Task<AccessEntityResult> EditAsync(int id, Document document)
        {

            Document edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.NotFound) };
            }
            else
            {
                edit.Caption = document.Caption;
                edit.CategoryID = document.CategoryID;
                edit.Content = document.Content;
                edit.UpdateTime = DateTime.Now;
                edit.Description = document.Description;
                edit.Filename = this.GetFilename(document.Path);
                edit.Path = document.Path;
                edit.Status = document.Status;
                edit.UserUpdate = document.UserUpdate;
                var ressult = await this.UpdateAsync(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, ressult.Item1) };
            }
        }

        public AccessEntityResult Edit(int id, Document document)
        {
            Document edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.NotFound) };
            }
            else
            {
                edit.Filename = this.GetFilename(document.Path);
                edit.Caption = document.Caption;
                edit.CategoryID = document.CategoryID;
                edit.Content = document.Content;
                edit.CreateTime = DateTime.Now;
                edit.Description = document.Description;
                edit.Path = document.Path;
                edit.Status = document.Status;
                edit.UserUpdate = document.UserUpdate;
                var ressult = this.Update(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, ressult.Item1) };
            }
        }

        #endregion

        #region Văn bản

        public List<Document> VB_GetAll()
        {
            return this.FindAll(p => p.CategoryID == ((int)DocumentType.VanBan)).ToList();
        }

        public async Task<List<Document>> VB_GetAllAsync()
        {
            return (await this.FindAllAsync(p => p.CategoryID == ((int)DocumentType.VanBan))).ToList();
        }

        #endregion

        #region Tài liệu
        public List<Document> TL_GetAll()
        {
            return this.FindAll(p => p.CategoryID == ((int)DocumentType.TaiLieu)).ToList();
        }

        public async Task<List<Document>> TL_GetAllAsync()
        {
            return (await this.FindAllAsync(p => p.CategoryID == ((int)DocumentType.TaiLieu))).ToList();
        }

        public List<Document> VB_GetRecentPost()
        {
            return this.FindAll(p => p.CategoryID == ((int)DocumentType.VanBan)).OrderByDescending(p => p.CreateTime).ToList();
        }

        public async Task<List<Document>> VB_GetRecentPostAsync()
        {
            return (await this.FindAllAsync(p => p.CategoryID == ((int)DocumentType.VanBan))).OrderByDescending(p => p.CreateTime).ToList();
        }
        public List<Document> TL_GetRecentPost()
        {
            return this.FindAll(p => p.CategoryID == ((int)DocumentType.TaiLieu)).OrderByDescending(p => p.CreateTime).ToList();
        }

        public async Task<List<Document>> TL_GetRecentPostAsync()
        {
            return (await this.FindAllAsync(p => p.CategoryID == ((int)DocumentType.TaiLieu))).OrderByDescending(p => p.CreateTime).ToList();
        }
        #endregion
    }
}