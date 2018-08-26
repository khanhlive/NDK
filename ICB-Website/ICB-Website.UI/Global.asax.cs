using ICB_Website.UI.Hubs;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ICB_Website.UI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteTable.Routes.MapHubs();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            log4net.Config.XmlConfigurator.Configure();
            Application["Counter"] = 0;
            HttpContext.Current.Application["totalvisitor"] = 0;
            ChatHub.dic.TryAdd("admin", Guid.NewGuid().ToString());
            Application["Online"] = 0;
            ICB.Business.Access.SystemConfigProvider systemConfigProvider = new ICB.Business.Access.SystemConfigProvider();
            Application["IsSetup"] = systemConfigProvider.Get() != null;
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies["lang"];
            if (cookie!=null)
            {
                System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cookie.Value);
                System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(cookie.Value);
            }
            else
            {
                System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("vi");
                System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("vi");
            }
            
        }

        protected void Application_Error()
        {
            Exception exception = Server.GetLastError();
            log.Error("System error", exception);
        }
        public void Session_Start(object sender, EventArgs e)
        {
            int count = Convert.ToInt32(Application["Counter"]);
            Application["Counter"] = count + 1;
            if (Application["Online"]!=null)
            {
                int online = Convert.ToInt32(Application["Online"]);
                Application["Online"] = online+1;
            }
            else
                Application["Online"] = 1;
        }
        public void Session_End(object sender, EventArgs e)
        {
            if (Application["Online"] != null)
            {
                int online = Convert.ToInt32(Application["Online"]);
                Application["Online"] = online - 1;
            }
        }
    }
}
