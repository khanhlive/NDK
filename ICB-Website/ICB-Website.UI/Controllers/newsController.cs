using ICB.Business.Access;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using PagedList;
using ICB.Business.Models;

namespace ICB_Website.UI.Controllers
{
    [AttributeRouting.RoutePrefix("tin-tuc")]
    public class newsController : Controller
    {
        // GET: news
        [AttributeRouting.Web.Mvc.Route("")]
        public async Task<ActionResult> Index(int page = 1)
        {
            NewsProvider newsProvider = new NewsProvider();
            return View((await newsProvider.GetShowActiveAsync()).ToPagedList(page, 10));
        }
        [AttributeRouting.Web.Mvc.Route("{id}")]
        public async Task<ActionResult> Detail(int? id)
        {
            if (id == null)
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
    }
}