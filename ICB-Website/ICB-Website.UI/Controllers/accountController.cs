using ICB.Business.Access;
using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using ICB_Website.UI.Models.Entities;
using ICB_Website.UI.Models.Security;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Controllers
{
    [AttributeRouting.RoutePrefix("tai-khoan")]
    public class accountController : Controller
    {
        // GET: account
        public ActionResult Index()
        {
            return View();
        }

        [AttributeRouting.Web.Mvc.Route("dang-nhap")]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AttributeRouting.Web.Mvc.Route("dang-nhap-post")]
        public ActionResult PostLogin(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                AccountProvider provider = new AccountProvider();
                Account account = provider.SignIn(model.Username, model.Password);
                if (account==null)
                {
                    ModelState.AddModelError("loginError", MessageManager.GetErrorMessage( ModuleType.Login, MessageType.Login_Failed));
                }
                else
                {
                    SessionApp.Username = account.Username;
                    SessionApp.Email = account.Email;
                    SessionApp.IsLogin = true;
                    SessionApp.Role = account.Role.ToString();
                    SessionApp.RoleType = account.Role;
                    SessionApp.Fullname = account.Fullname;
                    return Redirect(Url.Action("Index", "Home"));
                }
            }
            else
            {
                ModelState.AddModelError("loginError", MessageManager.GetErrorMessage(ModuleType.Login, MessageType.Login_ModelFailed));
            }
            return View("Login", model);
        }

        [AttributeRouting.Web.Mvc.Route("dang-ky")]
        public ActionResult Register()
        {
            return View();
        }

        [AttributeRouting.Web.Mvc.Route("dang-ky-post")]
        [HttpPost]
        public ActionResult PostRegister(Register model)
        {
            if (ModelState.IsValid)
            {
                AccountProvider provider = new AccountProvider();
                Account account = new Account();
                account.CreateTime = DateTime.Now;
                account.Email = model.Email;
                account.Fullname = model.Fullname;
                account.IsActive = true;
                account.IsDeleted = false;
                account.IsLocked = false;
                account.Password = NDK.ApplicationCore.Extensions.Hepler.StringHelper.CreateMD5(model.Password);
                account.Role = RoleManager.Member;
                account.Username = model.Username;
                AccessEntityResult result = provider.Register(account);
                if (result.Status == AccessEntityStatusCode.OK)
                {
                    TempData["Success"] = result.Message;
                    return RedirectToAction("Login");
                }
                else ModelState.AddModelError("registerError", result.Message);
            }
            else
            {
                ModelState.AddModelError("registerError", MessageManager.GetErrorMessage(ModuleType.Register, MessageType.Register_ModelFailed));
            }
            return View("Register", model);
        }

        [AttributeRouting.Web.Mvc.Route("dang-xuat")]
        public ActionResult Logout()
        {
            return RedirectToAction("Index");
        }
    }
}