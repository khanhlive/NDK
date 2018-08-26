using ICB_Website.UI.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ICB.Business.Models;
using PagedList;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    public class feedbackController : Controller
    {
        // GET: admin/feedback
        [AttributeRouting.Web.Mvc.Route("van-ban")]
        [HttpGet]
        [AppAuthorize(ICB.Business.Entities.Apps.RoleManager.Admin, ICB.Business.Entities.Apps.RoleManager.Superadmin, ICB.Business.Entities.Apps.RoleManager.Manager)]
        public ActionResult Index(int page = 1, int pagesize = 20)
        {
            using (WebContext db=new WebContext())
            {
                var data = db.Messages.Where(p => p.Status == 0).OrderBy(p=>p.Name).ThenByDescending(p=>p.CreateDate).ToPagedList(page, pagesize);
                return View(data);
            }
        }
    }
}