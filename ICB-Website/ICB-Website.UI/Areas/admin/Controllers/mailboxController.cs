using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    public class mailboxController : Controller
    {
        // GET: admin/mailbox
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult allquestion()
        {
            return View();
        }
        public ActionResult allanswer()
        {
            return View();
        }
        public ActionResult trash()
        {
            return View();
        }
    }
}