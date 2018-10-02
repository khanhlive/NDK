using ICB.Business.Access;
using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using ICB_Website.UI.Models;
using ICB_Website.UI.Models.Security;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    [AttributeRouting.RouteArea("admin")]
    [AttributeRouting.RoutePrefix("nhom-danh-muc")]
    public class categoryController : ControllerApp
    {
        public categoryController() : base("Quản lý nhóm danh mục", "Quản lý nhóm danh mục") { }
        // GET: admin/category
        [AttributeRouting.Web.Mvc.Route("")]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        public async Task<ActionResult> Index()
        {
            CategoryProvider categoryProvider = new CategoryProvider();
            return View(await categoryProvider.GetAllAsync());
        }

        [AttributeRouting.Web.Mvc.Route("get-all")]
        public async Task<JsonResult> GetAll()
        {
            CategoryProvider categoryProvider = new CategoryProvider();
            return Json(await categoryProvider.GetAllAsync(), JsonRequestBehavior.AllowGet);
        }

        [AttributeRouting.Web.Mvc.Route("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            CategoryProvider categoryProvider = new CategoryProvider();
            return Json(await categoryProvider.GetByIDAsync(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> Insert(Category category)
        {
            if (ModelState.IsValid)
            {
                CategoryProvider categoryProvider = new CategoryProvider();
                AccessEntityResult accessEntityResult = await categoryProvider.AddAsync(category);
                return Json(accessEntityResult);
            }
            else
            {
                return Json(MessageManager.GetErrorMessage(ModuleType.Category, MessageType.ModelFailed));
            }
        }

        [HttpPost]
        public async Task<JsonResult> Update(int id, Category category)
        {
            if (ModelState.IsValid)
            {
                CategoryProvider categoryProvider = new CategoryProvider();
                return Json(await categoryProvider.EditAsync(id, category));
            }
            else
            {
                return Json(MessageManager.GetErrorMessage(ModuleType.Category, MessageType.ModelFailed));
            }
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(int id)
        {
            CategoryProvider categoryProvider = new CategoryProvider();
            var result = await categoryProvider.DeleteAsync(id);
            return Json(new AccessEntityResult { Status = result, Data = id, Message = MessageManager.GetErrorMessage(ModuleType.Category, result) });
        }
    }
}