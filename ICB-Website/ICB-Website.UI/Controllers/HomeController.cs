using System;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using ICB.Business.Models;
using ICB.Business.Access;
using System.Reflection;
using System.Linq;

namespace ICB_Website.UI.Controllers
{
    [AttributeRouting.RoutePrefix("")]
    public class HomeController : Controller
    {
        // GET: Home
        [ICB_Website.UI.Models.Security.GuestAuthorize]
        [AttributeRouting.Web.Mvc.Route("trang-chu")]
        public ActionResult Index()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            var dt = assembly.GetTypes()
        .Where(type => typeof(System.Web.Mvc.Controller).IsAssignableFrom(type))
        .SelectMany(type => type.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public))
        .Where(m => !m.GetCustomAttributes(typeof(System.Runtime.CompilerServices.CompilerGeneratedAttribute), true).Any())
        .Select(x => new { Controller = x.DeclaringType.Name, Action = x.Name, ReturnType = x.ReturnType.Name, Attributes = String.Join(",", x.GetCustomAttributes().Select(a => a.GetType().Name.Replace("Attribute", ""))) })
        .OrderBy(x => x.Controller).ThenBy(x => x.Action).ToList();
            return View();
        }

        public ActionResult ChangeLanguage(string lang)
        {
            if (lang!=null)
            {
                System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(lang);
                System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(lang);
            }
            
            HttpCookie cookie = new HttpCookie("lang");
            cookie.Value = lang;
            HttpContext.Response.Cookies.Add(cookie);
            return RedirectToAction("Index");
        }

        
        public ActionResult Index2()
        {
            return View();
        }
        [ICB_Website.UI.Models.Security.GuestAuthorize]
        [AttributeRouting.Web.Mvc.Route("gioi-thieu")]
        public async Task<ActionResult> gioithieu()
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            return View((await systemConfigProvider.GetGioiThieuAsync()));
        }
        [ICB_Website.UI.Models.Security.GuestAuthorize]
        [AttributeRouting.Web.Mvc.Route("lien-he")]
        public ActionResult lienhe()
        {
            ICB.Business.Access.SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            ViewData["INFO"] = systemConfigProvider.Get();
            return View(systemConfigProvider.Get());
        }

        [HttpPost]
        public ActionResult lienhePOST(FormCollection form)
        {
            ICB.Business.Access.SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            ViewData["INFO"] = systemConfigProvider.Get();
            string name = form["Name"];
            string tel = form["Tel"];
            string email = form["Email"];
            string caption = form["Caption"];
            string message = form["Message"];
            ICB.Business.Access.FeedbackProvider feedbackProvider = new FeedbackProvider();
            Feedback feedback = new Feedback { CreateTime = DateTime.Now, Content = message, Answered=false, Email = email, Name = name, PhoneNumber = tel, Theme = caption, Status = 0, UserID=null };
            var result = feedbackProvider.Insert(feedback);
            if (result == NDK.ApplicationCore.Extensions.ResponseResults.AccessEntityStatusCode.OK)
            {
                ViewBag.Status = true;
            }
            else ViewBag.Status = false;
            return View("lienhe");
        }
    }
}