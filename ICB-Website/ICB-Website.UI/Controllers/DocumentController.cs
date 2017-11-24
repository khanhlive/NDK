using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Controllers
{
    public class DocumentController : Controller
    {
        // GET: Document
        public ActionResult Vanban()
        {
            return View();
        }

        public ActionResult Vanban(int? id)
        {
            return View();
        }

        public ActionResult Tailieu()
        {
            return View();
        }

        public ActionResult Tailieu(int? id)
        {
            return View();
        }
    }
}