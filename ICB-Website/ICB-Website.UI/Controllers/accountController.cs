using ICB.Business.Access;
using ICB.Business.Entities.Apps;
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
            return View("Login");
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
                if (provider.CheckUsername(model.Username))
                {
                    ModelState.AddModelError("registerError", "Tài khoản đã tồn tại");
                }
                else
                {
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
                    AccessEntityStatusCode result = provider.Insert(account);
                    if (result==AccessEntityStatusCode.OK)
                    {
                        TempData["success"] = "Đăng ký tài khoản thành công";
                        return RedirectToAction("Login");
                    }
                    else
                    {
                        ModelState.AddModelError("registerError", "Không đăng ký được tài khoản");
                    }
                }
            }
            else
            {
                ModelState.AddModelError("registerError","Thông tin đăng ký không chính xác");
            }
            return View("Register",model);
        }

        [AttributeRouting.Web.Mvc.Route("dang-xuat")]
        public ActionResult Logout()
        {
            return RedirectToAction("Index");
        }
    }
}