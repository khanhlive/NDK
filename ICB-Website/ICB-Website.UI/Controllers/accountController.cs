using ICB.Business.Access;
using ICB.Business.Models;
using ICB_Website.UI.Models.Entities;
using ICB_Website.UI.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Controllers
{
    public class accountController : Controller
    {
        // GET: account
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                AccountProvider provider = new AccountProvider();
                Account account = provider.SignIn(model.Username, model.Password);
                if (account==null)
                {
                    ModelState.AddModelError("loginError", "Tài khoản hoặc mật khẩu sai");
                }
                else
                {
                    SessionApp.Username = account.Username;
                    SessionApp.Email = account.Email;
                    SessionApp.IsLogin = true;
                    SessionApp.Role = account.Role.ToString();
                    SessionApp.Fullname = account.Fullname;
                    return Redirect(Url.Action("Index", "Home"));

                }
                
            }
            else
            {
                ModelState.AddModelError("loginError", "Sai thông tin đăng nhập");
            }
            return View();
        }

        public ActionResult Register()
        {
            return View();
        }

        public ActionResult Logout()
        {
            return RedirectToAction("Index");
        }
    }
}