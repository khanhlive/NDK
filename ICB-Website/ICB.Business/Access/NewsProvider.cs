using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Threading.Tasks;

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
                return new AccessEntityResult { Status = AccessEntityStatusCode.OK, Data = result.Item2, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.Success) };
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

        #endregion

    }
}
