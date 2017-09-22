using ICB.Business.Entities.Apps;
using ICB_Website.UI.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    public class HomeController : Controller
    {
        [AppAuthorize(RoleManager.Superadmin,RoleManager.Admin)]
        // GET: admin/Home
        public ActionResult Index()
        {
            return View();
        }
    }
}