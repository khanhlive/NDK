using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using PagedList;

namespace ICB_Website.UI.Controllers
{
    [ICB_Website.UI.Models.Security.GuestAuthorize]
    [AttributeRouting.RoutePrefix("tai-lieu")]
    public class documentController : Controller
    {
        [AttributeRouting.Web.Mvc.Route("")]
        public ActionResult Index()
        {
            return View();
        }
        
        // GET: Document
        public PartialViewResult Vanban(int page=1)
        {
            var documentProvider = new ICB.Business.Access.DocumentProvider();
            var documents = documentProvider.VB_GetRecentPost().ToList();
            ViewBag.documentFirst = documents.FirstOrDefault() == null ? new ICB.Business.Models.Document() : documents.FirstOrDefault();
            documents = documents.Count == 0 ? new List<ICB.Business.Models.Document>() : documents.Skip(1).ToList();
            return PartialView(documents.ToPagedList(page,5));
        }

        public ActionResult VB_Detail(int id)
        {
            return View();
        }

        public ActionResult Tailieu(int page=1)
        {
            var documentProvider = new ICB.Business.Access.DocumentProvider();
            var documents = documentProvider.TL_GetRecentPost().ToList();
            return View(documents.ToPagedList(page,10));
        }

        public ActionResult TL_Detail(int id)
        {
            return View();
        }
        [AttributeRouting.Web.Mvc.Route("chi-tiet/{id}")]
        [ICB_Website.UI.Models.Security.GuestAuthorize]
        public ActionResult Detail(int id)
        {
            ICB.Business.Access.DocumentProvider documentProvider = new ICB.Business.Access.DocumentProvider();
            return View(documentProvider.GetByID(id));
        }
    }
}