using ICB_Website.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    [AttributeRouting.RouteArea("admin")]
    [AttributeRouting.RoutePrefix("dich-vu")]
    public class serviceController : ControllerApp
    {
        public serviceController() : base("Quản lý dịch vụ", "Quản lý dịch vụ") { }
        // GET: admin/service
        [AttributeRouting.Web.Mvc.Route("")]
        public ActionResult Index()
        {
            return View();
        }
    }
}