using ICB_Website.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    public class dashboardController : ControllerApp
    {
        public dashboardController():base("Bảng điều khiển", "Bảng điều khiển")
        {
            
        }
        // GET: admin/dashboard
        public ActionResult Index()
        {
            return View();
        }
    }
}