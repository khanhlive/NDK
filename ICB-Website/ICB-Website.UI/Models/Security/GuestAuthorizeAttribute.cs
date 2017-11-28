using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ICB_Website.UI.Models.Security
{
    public class GuestAuthorizeAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if ((bool)HttpContext.Current.Application["IsSetup"])
            {
                //filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Home", action = "Index", area = "" }));
            }
            else
            {
                //filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Account", action = "Login" }));
            }
        }
    }
}