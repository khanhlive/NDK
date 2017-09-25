using ICB.Business.Access;
using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using ICB_Website.UI.Models;
using ICB_Website.UI.Models.Entities;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    [AttributeRouting.RoutePrefix("tai-khoan")]
    public class accountController : ControllerApp
    {
        public accountController():base("Tài khoản","Tài khoản") { }

        [AttributeRouting.Web.Mvc.Route("")]
        // GET: admin/account
        public async Task<ActionResult> Index()
        {
            AccountProvider provider = new AccountProvider();
            return View(await provider.GetAllAsync());
        }
        [AttributeRouting.Web.Mvc.Route("getAllAccount")]
        public async Task<JsonResult> GetAllAccount()
        {
            AccountProvider accountProvider = new AccountProvider();
            return Json((await accountProvider.GetAllAsync()), JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public async Task<JsonResult> Insert(Register model)
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
                return Json(await provider.RegisterAsync(account));
            }
            else
            {
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = MessageManager.GetErrorMessage(ModuleType.Register, MessageType.Register_ModelFailed) });
            }
        }

        [HttpPut]
        public async Task<JsonResult> Update(int id,Account account)
        {
            if (ModelState.IsValid)
            {
                AccountProvider provider = new AccountProvider();
                Tuple<AccessEntityStatusCode, Account> result = await provider.UpdateAsync(account, id);
                return Json(new AccessEntityResult { Status = result.Item1, Message = MessageManager.GetErrorMessage(ModuleType.Base, result.Item1) });
            }
            else
            {
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.ModelFailed) });
            }
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(int id)
        {
            AccountProvider accountProvider = new AccountProvider();
            Account account = await accountProvider.GetByIDAsync(id);
            if (account==null)
            {
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.NotFound) });
            }
            else
            {
                AccessEntityStatusCode accessEntityStatusCode = await accountProvider.DeleteAsync(account);
                return Json(new AccessEntityResult { Status = accessEntityStatusCode, Message = MessageManager.GetErrorMessage(ModuleType.Base, accessEntityStatusCode) });
            }
        }
    }
}