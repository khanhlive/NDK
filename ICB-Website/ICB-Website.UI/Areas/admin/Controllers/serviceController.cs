using ICB.Business.Access;
using ICB.Business.Entities.Apps;
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
    [AttributeRouting.RoutePrefix("dich-vu")]
    public class ServiceController : ControllerApp
    {
        public ServiceController() : base("Quản lý dịch vụ", "Quản lý dịch vụ") { }
        // GET: admin/service
        [AttributeRouting.Web.Mvc.Route("")]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        public ActionResult Index()
        {
            ServiceProvider serviceProvider = new ServiceProvider();
            var data = serviceProvider.GetFullServices();
            return View(data);
        }

        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        [AttributeRouting.Web.Mvc.Route("them-moi")]
        public ActionResult Create()
        {
            ViewBag.Category= CreateValue(2);
            return View();
        }


        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CreatePOST(Service service)
        {
            ModelState.Remove("ServiceID");
            ViewBag.Category = CreateValue(2);
            if (ModelState.IsValid)
            {
                ServiceProvider serviceProvider = new ServiceProvider();
                service.Caption = service.Name;
                service.CaptionENG = service.NameENG;
                service.Title = service.Name;
                service.TitleENG = service.NameENG;
                service.ServiceID = service.HasChild ? 0 : service.CategoryID;
                service.UserID = SessionApp.UserID;
                service.Status = 1;
                service.CreateTime = DateTime.Now;
                if (!service.HasChild)
                {
                    Service serviceParent = serviceProvider.GetByID(service.CategoryID);
                    service.CategoryID = serviceParent.CategoryID;
                }
                var result = serviceProvider.Add(service);
                if (result.Status == NDK.ApplicationCore.Extensions.ResponseResults.AccessEntityStatusCode.OK)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    ModelState.AddModelError("message", result.Message);
                    return View("Create", service);
                }

            }
            else
            {
                ModelState.AddModelError("message", "Thông tin nhập không hợp lệ, kiểm tra lại thông tin");
                return View("Create", service);
            }

        }

        private List<SelectListItem> CreateValue(int type)
        {
            List<SelectListItem> data = new List<SelectListItem>();
            if (type == 1)
            {
                CategoryProvider categoryProvider = new CategoryProvider(false);

                foreach(var item in categoryProvider.GetAll().Where(p => p.Active == 1).ToList())
                {
                    data.Add(new SelectListItem { Value = item.ID.ToString(), Text = item.Name });
                }
            }
            else
            {
                ServiceProvider serviceProvider = new ServiceProvider(false);
                foreach (var item in serviceProvider.GetRootList().ToList())
                {
                    data.Add(new SelectListItem { Value = item.ID.ToString(), Text = item.Name });
                }
            }
            return data;
        }

        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        [AttributeRouting.Web.Mvc.Route("chinh-sua/{id}")]
        public ActionResult Edit(int id)
        {
            ServiceProvider serviceProvider = new ServiceProvider();
            var model = serviceProvider.GetByID(id);
            ViewBag.Category = this.CreateValue(model.HasChild ? 1 : 2);
            return View(model);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult EditPOST(Service service)
        {
            ModelState.Remove("ServiceID");
            ViewBag.Category = CreateValue(2);
            if (ModelState.IsValid)
            {
                ServiceProvider serviceProvider = new ServiceProvider();
                service.LastMordifiedTime = DateTime.Now;
                service.Caption = service.Name;
                service.CaptionENG = service.NameENG;
                service.Title = service.Name;
                service.TitleENG = service.NameENG;
                service.ServiceID = service.HasChild ? 0 : service.CategoryID;
                if (!service.HasChild)
                {
                    Service serviceParent = serviceProvider.GetByID(service.CategoryID);
                    service.CategoryID = serviceParent.CategoryID;
                }
                var result = serviceProvider.Edit(service.ID, service);
                if (result.Status == NDK.ApplicationCore.Extensions.ResponseResults.AccessEntityStatusCode.OK)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    ModelState.AddModelError("message", result.Message);
                    return View("Edit", service);
                }

            }
            else
            {
                ModelState.AddModelError("message", "Thông tin nhập không hợp lệ, kiểm tra lại thông tin");
                return View("Edit", service);
            }
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(int id)
        {
            ServiceProvider serviceProvider = new ServiceProvider();
            var model = serviceProvider.GetByID(id);
            if (model.HasChild)
            {
                var list = serviceProvider.GetNodeOfParent(model.ID);
                if (list.Count==0)
                {
                    var result = await serviceProvider.DeleteAsync(id);
                    return Json(new AccessEntityResult { Status = result, Data = id, Message = "" });
                }
                else
                return Json(new AccessEntityResult { Status =  AccessEntityStatusCode.HasChild, Data = id, Message = "" });
            }
            else
            {
                var result = await serviceProvider.DeleteAsync(id);
                return Json(new AccessEntityResult { Status = result, Data = id, Message = "" });
            }
            
        }

        public JsonResult GetCategory(int type)
        {
            var data = this.CreateValue(type);
            return Json(data, JsonRequestBehavior.AllowGet);

        }

    }
}