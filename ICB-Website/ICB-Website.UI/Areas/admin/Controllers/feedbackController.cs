using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    public class feedbackController : Controller
    {
        // GET: admin/feedback
        public ActionResult Index()
        {
            return View();
        }
    }
}