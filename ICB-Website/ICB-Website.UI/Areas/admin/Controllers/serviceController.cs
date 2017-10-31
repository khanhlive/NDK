using ICB.Business.Access;
using ICB.Business.Models;
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
            ServiceProvider serviceProvider = new ServiceProvider();
            
            return View(serviceProvider.GetAll());
        }

        
        [AttributeRouting.Web.Mvc.Route("them-moi")]
        public ActionResult Create()
        {
            return View();
        }


        [HttpPost]
        public ActionResult CreatePOST(Service service)
        {
            return View();
        }

        [AttributeRouting.Web.Mvc.Route("chinh-sua/{id}")]
        public ActionResult Edit(int id)
        {
            return View();
        }

        [HttpPost]
        public ActionResult EditPUT(int id, Service service)
        {
            return View();
        }

        [HttpDelete]
        public JsonResult Delete(int id)
        {
            return Json("");
        }

    }
}