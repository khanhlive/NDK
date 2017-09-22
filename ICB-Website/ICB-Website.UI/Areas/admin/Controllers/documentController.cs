using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    public class documentController : Controller
    {
        // GET: admin/document
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Vanban()
        {
            return View();
        }
        public ActionResult Tailieu()
        {
            return View();
        }
    }
}