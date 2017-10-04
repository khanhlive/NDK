using ICB.Business.Access;
using ICB.Business.Entities.Apps;
using ICB_Website.UI.Models;
using ICB_Website.UI.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    [AttributeRouting.RouteArea("admin")]
    [AttributeRouting.RoutePrefix("khach-hang")]
    public class customerController : ControllerApp
    {
        public customerController() : base("Quản lý khách hàng", "Quản lý khách hàng") { }
        // GET: admin/customer
        [AttributeRouting.Web.Mvc.Route("")]
        [AppAuthorize(RoleManager.Admin, RoleManager.Manager, RoleManager.Superadmin)]
        public async Task<ActionResult> Index()
        {
            CustomerProvider customerProvider = new CustomerProvider();

            return View(await customerProvider.GetAllAsync());
        }
        [AttributeRouting.Web.Mvc.Route("getall")]
        public async Task<JsonResult> GetAll()
        {
            CustomerProvider customerProvider = new CustomerProvider();
            return Json(await customerProvider.GetAllAsync(), JsonRequestBehavior.AllowGet);
        }
    }
}