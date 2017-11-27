using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Controllers
{
    [AttributeRouting.RoutePrefix("dich-vu")]
    public class productsController : Controller
    {
        [AttributeRouting.Web.Mvc.Route("")]
        // GET: Products
        public ActionResult Index()
        {
            return View();
        }
        [AttributeRouting.Web.Mvc.Route("chi-tiet/{id}")]
        public ActionResult Detail(int? id)
        {
            ICB.Business.Access.ServiceProvider serviceProvider = new ICB.Business.Access.ServiceProvider();
            return View(serviceProvider.GetByID(id??0));
        }

    }
}