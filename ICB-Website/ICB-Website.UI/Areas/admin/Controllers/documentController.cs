using ICB.Business.Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using ICB.Business.Models;
using ICB.Business.Entities.Apps;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    public class documentController : Controller
    {
        // GET: admin/document
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Vanban(int page = 1, int pagesize = 20)
        {
            DocumentProvider documentProvider = new DocumentProvider();
            return View(documentProvider.VB_GetAll().ToPagedList(page, pagesize));
        }
        public ActionResult Tailieu()
        {
            return View();
        }

        public ActionResult VB_Create()
        {
            return View();
        }

        public ActionResult VB_Edit(int id)
        {
            return View();
        }
    }
}