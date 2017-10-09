using ICB_Website.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    public class settingController : ControllerApp
    {
        public settingController() : base("Thông tin trang web", "Thông tin trang web") { }
        // GET: admin/setting
        public ActionResult Index()
        {
            return View();
        }
    }
}