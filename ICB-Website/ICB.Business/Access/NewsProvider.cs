﻿using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace ICB.Business.Access
{
    public class NewsProvider : ApplicationManager<Models.News, int>
    {
        public NewsProvider()
        {
            this.context.Configuration.ProxyCreationEnabled = false;
        }

        #region Chung

        public async Task<AccessEntityResult> AddAsync(Models.News news)
        {

            Tuple<AccessEntityStatusCode, News> result = await this.InsertAsync(news);
            if (result.Item1 == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Data = null, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Failed) };
            }

        }

        public AccessEntityResult Add(News news)
        {

            AccessEntityStatusCode result = this.Insert(news);
            if (result == AccessEntityStatusCode.OK)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Success) };
            }
            else
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.Failed, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Failed) };
            }

        }

        public async Task<AccessEntityResult> EditAsync(int id, News news)
        {

            News edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.NotFound) };
            }
            else
            {
                edit.Caption = news.Caption;
                edit.ContentReview = news.ContentReview;
                edit.Content = news.Content;
                edit.Category = news.Category;
                edit.ThumbnailURL = news.ThumbnailURL;
                edit.Status = news.Status;
                var ressult = await this.UpdateAsync(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, ressult.Item1) };
            }
        }

        public AccessEntityResult Edit(int id, News news)
        {
            News edit = this.GetByID(id);
            if (edit == null)
            {
                return new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.NotFound) };
            }
            else
            {
                edit.Caption = news.Caption;
                edit.Category = news.Category;
                edit.Content = news.Content;
                edit.ContentReview = news.ContentReview;
                edit.ThumbnailURL = news.ThumbnailURL;
                edit.Status = news.Status;
                var ressult = this.Update(edit, id);
                return new AccessEntityResult { Status = ressult.Item1, Data = ressult.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, ressult.Item1) };
            }
        }

        public async Task<List<News>> GetShowActiveAsync(int? loai)
        {
            return (await this.GetAllAsync()).Where(p => (p.Status == (int)ModelStatus.Active) && (loai == null ? true : p.Category == loai)).OrderByDescending(p => p.PostedDate).ToList();
        }

        public List<News> GetShow_Active(int? loai)
        {
            return (this.GetAll()).Where(p => (p.Status == (int)ModelStatus.Active) && (loai == null ? true : p.Category == loai)).OrderByDescending(p => p.PostedDate).ToList();
        }

        public List<News> GetRecentPost()
        {
            return (this.GetAll()).Where(p => p.Status == (int)ModelStatus.Active).OrderByDescending(p => p.PostedDate).Take(5).ToList();
        }
        public async Task<List<News>> GetRecentPostAsync()
        {
            int status = (int)ModelStatus.Active;
            return (await this.FindAllAsync(p => p.Status == status)).OrderByDescending(p => p.PostedDate).Take(5).ToList();
        }

        public List<News> GetRelatedPost(int id)
        {
            var news = this.GetByID(id);
            return (this.GetAll()).Where(p => p.Status == (int)ModelStatus.Active && p.Category == news.Category && p.ID != id).OrderByDescending(p => p.PostedDate).Take(4).ToList();
        }
        public async Task<List<News>> GetRelatedPostAsync(int id)
        {
            var news = this.GetByID(id);
            return ((await this.GetAllAsync())).Where(p => p.Status == (int)ModelStatus.Active && p.Category == news.Category && p.ID != id).OrderByDescending(p => p.PostedDate).Take(4).ToList();
        }
        #endregion

    }
}