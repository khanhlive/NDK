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
using ICB.Business.Access;
using PagedList;

namespace ICB_Website.UI.Controllers
{
    [AttributeRouting.RoutePrefix("")]
    public class HomeController : Controller
    {
        // GET: Home
        [AttributeRouting.Web.Mvc.Route("trang-chu")]
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

        [AttributeRouting.Web.Mvc.Route("gioi-thieu")]
        public async Task<ActionResult> gioithieu()
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            return View((await systemConfigProvider.GetGioiThieuAsync()));
        }

        [AttributeRouting.Web.Mvc.Route("tin-tuc")]
        public async Task<ActionResult> danhsachtintuc(int page=1)
        {
            NewsProvider newsProvider = new NewsProvider();
            return View((await newsProvider.GetShowActiveAsync()).ToPagedList(page, 10));
        }

        [AttributeRouting.Web.Mvc.Route("tin-tuc/{id}")]
        public async Task<ActionResult> tintuc(int? id)
        {
            if (id==null)
            {
                return View();
            }
            else
            {
                NewsProvider newsProvider = new NewsProvider();
                News news = await newsProvider.GetByIDAsync(id.Value);
                return View(news);
            }
        }

        [AttributeRouting.Web.Mvc.Route("lien-he")]
        public async Task<ActionResult> lienhe()
        {

            return View();
        }

        


    }
}