using ICB.Business.Access;
using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using ICB_Website.UI.Models;
using ICB_Website.UI.Models.Security;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    [AttributeRouting.RouteArea("admin")]
    [AttributeRouting.RoutePrefix("setting")]
    public class settingController : ControllerApp
    {
        public settingController() : base("Thông tin trang web", "Thông tin trang web") { }
        // GET: admin/setting
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        public ActionResult Index()
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            ViewData["BANNER"] = systemConfigProvider.GetBanner();
            var hoso = systemConfigProvider.GetHOSONANGLUC();
            ViewBag.HOSONANGLUC = hoso == null ? "" : hoso.Name;
            ViewBag.Caption = hoso == null ? "" : hoso.Caption;
            ViewBag.Description = hoso == null ? "" : hoso.Description;
            return View(systemConfigProvider.Get());
        }

        [HttpPost]
        [AttributeRouting.Web.Mvc.Route("update")]
        public async Task<JsonResult> InsertOrUpdate(SystemConfig model)
        {
            if (ModelState.IsValid)
            {
                SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
                var result = await systemConfigProvider.InsertOrUpdateAsync(model);
                return Json(result);
            }
            else
            {
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.ModelFailed) });
            }
        }

        [HttpGet]
        [AttributeRouting.Web.Mvc.Route("get-info")]
        public async Task<JsonResult> GetInfo()
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            return Json(await systemConfigProvider.GetAsync(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> AddBanner(string src)
        {
            if (string.IsNullOrEmpty(src) || string.IsNullOrWhiteSpace(src))
            {
                return Json(new { AccessEntityStatusCode.ModelFailed });
            }
            else
            {
                SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
                var result = await systemConfigProvider.AddBanner(src);
                return Json(new { result = result.Item1, data = result.Item2 });
            }
        }

        [HttpPost]
        public async Task<JsonResult> EditBanner(int id, string src)
        {
            if (string.IsNullOrEmpty(src) || string.IsNullOrWhiteSpace(src))
            {
                return Json(new { result = AccessEntityStatusCode.ModelFailed });
            }
            else
            {
                SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
                var result = await systemConfigProvider.EditBanner(id, src);
                return Json(new { result = result.Item1, data = result.Item2 });
            }
        }

        [HttpPost]
        public async Task<JsonResult> RemoveBanner(int id)
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            var model = systemConfigProvider.GetByID(id);
            if (model == null)
            {
                return Json(new { result = AccessEntityStatusCode.NotFound });
            }
            else
            {
                var result = await systemConfigProvider.DeleteAsync(id);
                return Json(new { result = result });
            }
        }

        [HttpPost]
        public async Task<JsonResult> Update_HOSO(string url)
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            var result = await systemConfigProvider.INSERTorUPDATE_HOSO(url);
            return Json(new { Status = result.Item1, data = result.Item2 });
        }

        [HttpPost]
        public async Task<JsonResult> Update_HOSO_Description(string Caption, string Description)
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            var result = await systemConfigProvider.INSERTorUPDATE_HOSO_Description(Caption, Description);
            return Json(new { Status = result.Item1, data = result.Item2 });
        }

        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        public ActionResult AboutUs()
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            var about = systemConfigProvider.GetGioiThieu();
            ViewData["model"] = about == null ? "" : about.Content;
            ViewData["name"] = about == null ? "" : about.Name;
            return View(about);
        }

        [HttpPost]
        [ValidateAntiForgeryToken()]
        [ValidateInput(false)]
        public async Task<ActionResult> AboutUsPOST(SystemConfig model)
        {
            model.Status = 1;
            model.Category = (int)WebsiteCategory.GioiThieu;
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            var result = await systemConfigProvider.INSERTorUPDATE_GIOITHIEU(model.Name, model.Content);
            if (result.Item1 == AccessEntityStatusCode.OK)
            {
                TempData["message"] = "Chỉnh sửa thông tin thành công";
                return RedirectToAction("AboutUs");
            }
            else
            {
                TempData["message"] = "Không chỉnh sửa được thông tin giới thiệu";
                return View("AboutUs");
            }

        }
        [AttributeRouting.Web.Mvc.Route("so-do-to-chuc")]
        public ActionResult SoDoToChuc()
        {
            using (WebContext db = new WebContext())
            {
                int _loai = (int)WebsiteCategory.SoDoToChuc;
                return View(db.SystemConfigs.FirstOrDefault(p=>p.Category== _loai));
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken()]
        [ValidateInput(false)]
        public ActionResult SoDoToChucPOST(SystemConfig model)
        {
            using (WebContext db = new WebContext())
            {
                int _loai = (int)WebsiteCategory.SoDoToChuc;
                bool hasSoDo = db.SystemConfigs.Any(p => p.Category == _loai);

                if (hasSoDo)
                {
                    //update
                    var obj = db.SystemConfigs.AsNoTracking().FirstOrDefault(p => p.Category == _loai);
                    obj.Name = model.Name;
                    obj.Content = model.Content;
                    db.Entry<SystemConfig>(obj).State = System.Data.Entity.EntityState.Modified;
                }
                else
                {
                    //insert
                    model.Status = 1;
                    model.Category = _loai;
                    db.SystemConfigs.Add(model);
                }
                int count = db.SaveChanges();
                if (count >= 0)
                {
                    TempData["message"] = "Chỉnh sửa thông tin thành công";
                    return RedirectToAction("SoDoToChuc");
                }
                else
                {
                    TempData["message"] = "Không chỉnh sửa được thông tin";
                    return View("SoDoToChuc");
                }
            }
        }
        [AttributeRouting.Web.Mvc.Route("chinh-sach-chat-luong")]
        public ActionResult ChinhSachChatLuong()
        {
            using (WebContext db = new WebContext())
            {
                int _loai = (int)WebsiteCategory.ChinhSachChatLuong;
                return View(db.SystemConfigs.FirstOrDefault(p => p.Category == _loai));
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken()]
        [ValidateInput(false)]
        public ActionResult ChinhSachChatLuongPOST(SystemConfig model)
        {
            using (WebContext db = new WebContext())
            {
                int _loai = (int)WebsiteCategory.ChinhSachChatLuong;
                bool hasSoDo = db.SystemConfigs.Any(p => p.Category == _loai);

                if (hasSoDo)
                {
                    //update
                    var obj = db.SystemConfigs.AsNoTracking().FirstOrDefault(p => p.Category == _loai);
                    obj.Name = model.Name;
                    obj.Content = model.Content;
                    db.Entry<SystemConfig>(obj).State = System.Data.Entity.EntityState.Modified;
                }
                else
                {
                    //insert
                    model.Status = 1;
                    model.Category = (int)WebsiteCategory.ChinhSachChatLuong;
                    db.SystemConfigs.Add(model);
                }
                int count = db.SaveChanges();
                if (count >= 0)
                {
                    TempData["message"] = "Chỉnh sửa thông tin thành công";
                    return RedirectToAction("ChinhSachChatLuong");
                }
                else
                {
                    TempData["message"] = "Không chỉnh sửa được thông tin";
                    return View("ChinhSachChatLuong");
                }
            }
        }
        [AttributeRouting.Web.Mvc.Route("tam-nhin-su-menh")]
        public ActionResult TamNhinSuMenh()
        {
            using (WebContext db = new WebContext())
            {
                int _loai = (int)WebsiteCategory.TamNhinSuMenh;
                return View(db.SystemConfigs.FirstOrDefault(p => p.Category == _loai));
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken()]
        [ValidateInput(false)]
        public ActionResult TamNhinSuMenhPOST(SystemConfig model)
        {
            using (WebContext db = new WebContext())
            {
                int _loai = (int)WebsiteCategory.TamNhinSuMenh;
                bool hasSoDo = db.SystemConfigs.Any(p => p.Category == _loai);

                if (hasSoDo)
                {
                    //update
                    var obj = db.SystemConfigs.AsNoTracking().FirstOrDefault(p => p.Category == _loai);
                    obj.Name = model.Name;
                    obj.Content = model.Content;
                    db.Entry<SystemConfig>(obj).State = System.Data.Entity.EntityState.Modified;
                }
                else
                {
                    //insert
                    model.Status = 1;
                    model.Category = (int)WebsiteCategory.TamNhinSuMenh;
                    db.SystemConfigs.Add(model);
                }
                int count = db.SaveChanges();
                if (count >= 0)
                {
                    TempData["message"] = "Chỉnh sửa thông tin thành công";
                    return RedirectToAction("TamNhinSuMenh");
                }
                else
                {
                    TempData["message"] = "Không chỉnh sửa được thông tin";
                    return View("TamNhinSuMenh");
                }
            }
        }
    }
}