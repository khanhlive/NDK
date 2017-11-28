using System.Web.Mvc;

namespace ICB_Website.UI.Controllers
{
    [AttributeRouting.RoutePrefix("ho-so-nang-luc")]
    public class competencyProfileController : Controller
    {
        [AttributeRouting.Web.Mvc.Route("")]
        [ICB_Website.UI.Models.Security.GuestAuthorize]
        // GET: competencyProfile
        public ActionResult Index()
        {
            ICB.Business.Access.SystemConfigProvider systemConfigProvider = new ICB.Business.Access.SystemConfigProvider();
            return View(systemConfigProvider.GetHOSONANGLUC());
        }
    }
}