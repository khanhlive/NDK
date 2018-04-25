using ICB_Website.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
    }
}