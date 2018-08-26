using ICB_Website.UI.Models;
using System.Web.Mvc;
using PagedList;
using ICB.Business.Entities.Apps;
using ICB_Website.UI.Models.Security;
using ICB.Business.Models;
using ICB.Business.Access;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System.Collections.Generic;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    [AttributeRouting.RouteArea("admin")]
    [AttributeRouting.RoutePrefix("ho-tro")]
    public class supportController : ControllerApp
    {
        public supportController() : base("Hỗ trợ khách hàng", "Hỗ trợ khách hàng") { }
        // GET: admin/support
        [AttributeRouting.Web.Mvc.Route("")]
        public ActionResult Index()
        {
            return View();
        }

        [AttributeRouting.Web.Mvc.Route("cau-hinh")]
        public ActionResult InfoSupport()
        {
            using (ICB.Business.Access.SupportProvider support=new ICB.Business.Access.SupportProvider())
            {
                return View(support.GetAll());
            }
        }

        [HttpGet]
        [AttributeRouting.Web.Mvc.Route("cau-hinh/tao-moi")]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        public ActionResult Create()
        {
            List<SelectListItem> items = new List<SelectListItem>();
            items.Add(new SelectListItem { Value = "1", Text = "Sử dụng" });
            items.Add(new SelectListItem { Value = "0", Text = "Không sử dụng" });
            ViewBag.Status = items;
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(Support model)
        {
            model.Group = 0;
            if (ModelState.IsValid)
            {
                SupportProvider newsProvider = new SupportProvider();
                var result = newsProvider.Add(model);
                if (result.Status == AccessEntityStatusCode.OK) return RedirectToAction("InfoSupport");
                else
                {
                    ModelState.AddModelError("error", "Không thêm được thông tin");
                    return View(model);
                }
            }
            else return View(model);
                //return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = "Thông tin hỗ trợ không hợp lệ, thử lại." });

        }

        [HttpGet]
        [AttributeRouting.Web.Mvc.Route("cau-hinh/chinh-sua")]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        public ActionResult Edit(int id)
        {
            SupportProvider newsProvider = new SupportProvider();
            Support support = newsProvider.GetByID(id);
            List<SelectListItem> items = new List<SelectListItem>();
            items.Add(new SelectListItem { Value = "1", Text = "Sử dụng", Selected = support == null ? false : support.Status == 1 });
            items.Add(new SelectListItem { Value = "0", Text = "Không sử dụng", Selected = support == null ? false : support.Status == 0 });
            ViewBag.Status = items;
            return View(support);
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(int id, Support model)
        {
            model.Group = 0;
            if (ModelState.IsValid)
            {
                SupportProvider newsProvider = new SupportProvider();
                var result = newsProvider.Edit(id, model);
                if (result.Status == AccessEntityStatusCode.OK) return RedirectToAction("InfoSupport");
                else
                {
                    ModelState.AddModelError("error", "Không thêm được thông tin");
                    return View(model);
                }
            }
            else
                return View(model);
            //return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = "Thông tin hỗ trợ không hợp lệ, thử lại." });
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            SupportProvider newsProvider = new SupportProvider();
            var result = newsProvider.Delete(id);
            return RedirectToAction("InfoSupport");
                //Json(new AccessEntityResult { Status = result, Data = id, Message = "" });
        }
    }
}