using ICB.Business.Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using ICB.Business.Models;
using ICB.Business.Entities.Apps;
using System.Threading.Tasks;
using NDK.ApplicationCore.Extensions.ResponseResults;
using ICB_Website.UI.Models.Security;
using ICB_Website.UI.Models;
using ICB.Business.Entities.Message;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    [AttributeRouting.RouteArea("admin")]
    [AttributeRouting.RoutePrefix("document")]
    public class documentController : ControllerApp
    {
        // GET: admin/document
        public ActionResult Index()
        {
            return View();
        }

        #region Văn bản
        [HttpGet]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        [AttributeRouting.Web.Mvc.Route("van-ban")]
        public ActionResult Vanban(int page = 1, int pagesize = 20)
        {
            DocumentProvider documentProvider = new DocumentProvider();
            return View(documentProvider.VB_GetAll().OrderByDescending(p => p.CreateTime).ToPagedList(page, pagesize));
        }


        [HttpGet]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        [AttributeRouting.Web.Mvc.Route("van-ban/them-moi")]
        public ActionResult VB_Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> VB_Insert(Document model)
        {
            model.CategoryID = (int)DocumentType.VanBan;
            model.Status = 0;
            model.UserIDCreated = SessionApp.UserID;
            if (ModelState.IsValid)
            {
                DocumentProvider documentProvider = new DocumentProvider();
                var result = await documentProvider.AddAsync(model);
                return Json(result);
            }
            else
            {
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = "Thông tin văn bản nhập vào không chính xác" });
            }

        }

        [HttpGet]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        [AttributeRouting.Web.Mvc.Route("van-ban/chinh-sua")]
        public ActionResult VB_Edit(int id)
        {
            DocumentProvider documentProvider = new DocumentProvider();
            return View(documentProvider.GetByID(id));
        }

        [HttpPut]
        public async Task<JsonResult> VB_Update(int id, Document model)
        {
            if (ModelState.IsValid)
            {
                model.UserUpdate = SessionApp.UserID;
                model.UpdateTime = DateTime.Now;
                DocumentProvider documentProvider = new DocumentProvider();
                var result = await documentProvider.EditAsync(id, model);
                return Json(result);
            }
            else
            {
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = "Thông tin văn bản nhập vào không chính xác" });
            }

        }

        [HttpDelete]
        public async Task<JsonResult> VB_Delete(int id)
        {
            DocumentProvider documentProvider = new DocumentProvider();
            var result = await documentProvider.DeleteAsync(id);
            return Json(new AccessEntityResult { Status = result, Data = id, Message = "" });
        }
        #endregion

        #region Tài liệu
        [HttpGet]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        [AttributeRouting.Web.Mvc.Route("tai-lieu")]
        public ActionResult Tailieu(int page = 1, int pagesize = 10)
        {
            DocumentProvider documentProvider = new DocumentProvider();
            return View(documentProvider.TL_GetAll().OrderByDescending(p => p.CreateTime).ToPagedList(page, pagesize));
        }


        [HttpGet]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        [AttributeRouting.Web.Mvc.Route("tai-lieu/them-moi")]
        public ActionResult TL_Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> TL_Insert(Document model)
        {
            model.CategoryID = (int)DocumentType.TaiLieu;
            //model.Status = 1;
            model.CreateTime = DateTime.Now;
            model.UserIDCreated = SessionApp.UserID;
            if (ModelState.IsValid)
            {
                DocumentProvider documentProvider = new DocumentProvider();
                var result = await documentProvider.AddAsync(model);
                return Json(result);
            }
            else
            {
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = "Thông tin tài liệu nhập vào không chính xác" });
            }

        }

        [HttpGet]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        [AttributeRouting.Web.Mvc.Route("tai-lieu/chinh-sua")]
        public ActionResult TL_Edit(int id)
        {
            DocumentProvider documentProvider = new DocumentProvider();
            return View(documentProvider.GetByID(id));
        }

        [HttpGet]
        public async Task<JsonResult> GetID(int id)
        {
            DocumentProvider documentProvider = new DocumentProvider();
            Document document = await documentProvider.GetByIDAsync(id);
            return Json(document, JsonRequestBehavior.AllowGet);
        }

        [HttpPut]
        public async Task<JsonResult> TL_Update(int id, Document model)
        {
            if (ModelState.IsValid)
            {
                model.UserUpdate = SessionApp.UserID;
                model.UpdateTime = DateTime.Now;
                DocumentProvider documentProvider = new DocumentProvider();
                var result = await documentProvider.EditAsync(id, model);
                return Json(result);
            }
            else
            {
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = "Thông tin tài liệu nhập vào không chính xác" });
            }

        }

        [HttpDelete]
        public async Task<JsonResult> TL_Delete(int id)
        {
            DocumentProvider documentProvider = new DocumentProvider();
            var result = await documentProvider.DeleteAsync(id);
            return Json(new AccessEntityResult { Status = result, Data = id, Message = "" });
        }


        #endregion
    }
}