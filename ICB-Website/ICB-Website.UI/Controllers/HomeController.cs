using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Threading;
using System.Threading.Tasks;
using System.Data.Entity;
using ICB.Business.Entities;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ICB_Website.UI.Controllers
{
    public class MyClass
    {
        public int ID { get; set; }
    }
    public class DB:DbContext
    {
        public DB():base("EmployeeContext") {  }

        public DbSet<MyClass> Myclasses { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

    public class MyClassInit: DropCreateDatabaseIfModelChanges<DB>
    {
        protected override void Seed(DB context)
        {
            base.Seed(context);
        }
    }
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            
            DB db1 = new DB();
            
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
            //string url=HttpContext.
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