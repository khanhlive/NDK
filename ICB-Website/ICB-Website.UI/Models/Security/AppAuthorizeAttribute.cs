using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;

namespace ICB_Website.UI.Models.Security
{
    public class AppAuthorizeAttribute : AuthorizeAttribute
    {
        public AppAuthorizeAttribute(params int[] roles) : base()
        {
            this.Roles = string.Join(";", roles);
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (SessionApp.IsLogin)
            {
                bool inRole = false;
                if (string.IsNullOrEmpty(this.Roles) || string.IsNullOrWhiteSpace(this.Roles))
                {
                    inRole = true;
                }
                else
                {
                    string role = SessionApp.Role;
                    string[] spec = new string[] { ";" };
                    string[] arrRole = this.Roles.Split(spec,StringSplitOptions.RemoveEmptyEntries);
                    inRole = arrRole.Any(x => x == role);
                }
                if (inRole)
                {
                    //filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Home", action = "Index", area = "" }));
                }
                else filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Home", action = "Index", area = "" }));
            }
            else
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Account", action = "Login", area = "" }));
            }
        }
    }
}