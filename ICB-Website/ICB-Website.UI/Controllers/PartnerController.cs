using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;

namespace ICB_Website.UI.Controllers
{
    [AttributeRouting.RoutePrefix("doi-tac")]
    public class partnerController : Controller
    {
        // GET: Partner
        public ActionResult Index(int page=1)
        {
            ICB.Business.Access.CustomerProvider customerProvider = new ICB.Business.Access.CustomerProvider();
            return View(customerProvider.GetAll().ToPagedList(page,16));
        }
    }
}