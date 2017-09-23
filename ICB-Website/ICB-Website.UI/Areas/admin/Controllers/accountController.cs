using ICB.Business.Access;
using ICB_Website.UI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    public class accountController : ControllerApp
    {
        public accountController():base("Tài khoản","Tài khoản") { }
        // GET: admin/account
        public async Task<ActionResult> Index()
        {
            AccountProvider provider = new AccountProvider();
            return View(await provider.GetAllAsync());
        }
    }
}