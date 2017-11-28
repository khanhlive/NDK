using System.Web.Mvc;

namespace ICB_Website.UI.Controllers
{
    [AttributeRouting.RoutePrefix("dich-vu")]
    public class productsController : Controller
    {
        [AttributeRouting.Web.Mvc.Route("")]
        [ICB_Website.UI.Models.Security.GuestAuthorize]
        // GET: Products
        public ActionResult Index()
        {
            return View();
        }
        [AttributeRouting.Web.Mvc.Route("chi-tiet/{id}")]
        [ICB_Website.UI.Models.Security.GuestAuthorize]
        public ActionResult Detail(int? id)
        {
            ICB.Business.Access.ServiceProvider serviceProvider = new ICB.Business.Access.ServiceProvider();
            return View(serviceProvider.GetByID(id??0));
        }

    }
}