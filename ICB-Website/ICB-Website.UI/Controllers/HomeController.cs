using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using ICB.Business.Models;

namespace ICB_Website.UI.Controllers
{
    
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            
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

        public async Task<ActionResult> Index2()
        {
            return View();
        }

        public async Task<ActionResult> gioithieu()
        {
            return View();
        }

        public async Task<ActionResult> danhsachtintuc()
        {
            return View();
        }


        public async Task<ActionResult> tintuc()
        {
            return View();
        }

        public async Task<ActionResult> lienhe()
        {

            return View();
        }


    }
}