using ICB.Business.Access;
using ICB.Business.Models;
using ICB_Website.UI.Models;
using System.Web.Mvc;
using PagedList;
using NDK.ApplicationCore.Extensions.ResponseResults;
using ICB_Website.UI.Models.Security;
using System.Threading.Tasks;
using System.Linq;
using ICB.Business.Entities.Apps;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    [AttributeRouting.RouteArea("admin")]
    [AttributeRouting.RoutePrefix("tin-tuc")]
    public class newsController : ControllerApp
    {
        public newsController() : base("Quản lý tin tức", "Quản lý tin tức") { }
        // GET: admin/news
        [AttributeRouting.Web.Mvc.Route("")]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        public ActionResult Index(int page = 1, int pagesize = 10)
        {
            NewsProvider newsProvider = new NewsProvider();
            IPagedList<News> listNews = newsProvider.FindAll(p=>p.Status==1).OrderByDescending(p=>p.PostedDate).ToPagedList(page, pagesize);
            return View(listNews);
        }

        [HttpGet]
        [AttributeRouting.Web.Mvc.Route("tin-tuc/them-moi")]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public async Task<JsonResult> CreatePost(News model)
        {
            model.Status = 1;
            model.UserID = SessionApp.UserID;
            if (ModelState.IsValid)
            {
                NewsProvider newsProvider = new NewsProvider();
                var result = await newsProvider.AddAsync(model);
                return Json(result);
            }
            else
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = "Thông tin tin tức không hợp lệ, thử lại." });

        }

        [HttpGet]
        [AttributeRouting.Web.Mvc.Route("tin-tuc/chinh-sua")]
        [AppAuthorize(RoleManager.Admin, RoleManager.Superadmin, RoleManager.Manager)]
        public ActionResult Edit(int id)
        {
            NewsProvider newsProvider = new NewsProvider();
            return View(newsProvider.GetByID(id));
        }

        [HttpPost]
        [ValidateInput(false)]
        public async Task<JsonResult> EditPut(int id, News model)
        {
            if (ModelState.IsValid)
            {
                NewsProvider newsProvider = new NewsProvider();
                var result = await newsProvider.EditAsync(id,model);
                return Json(result);
            }
            else
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = "Thông tin tin tức không hợp lệ, thử lại." });
        }

        [HttpPost]
        public async Task<JsonResult> Delete(int id)
        {
            NewsProvider newsProvider = new NewsProvider();
            var result = await newsProvider.DeleteAsync(id);
            return Json(new AccessEntityResult { Status = result, Data = id, Message = "" });
        }
    }
}