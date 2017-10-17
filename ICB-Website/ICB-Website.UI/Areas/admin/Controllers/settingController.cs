using ICB.Business.Access;
using ICB.Business.Entities.Apps;
using ICB.Business.Entities.Message;
using ICB.Business.Models;
using ICB_Website.UI.Models;
using ICB_Website.UI.Models.Security;
using NDK.ApplicationCore.Extensions.ResponseResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Areas.admin.Controllers
{
    [AttributeRouting.RouteArea("admin")]
    [AttributeRouting.RoutePrefix("setting")]
    public class settingController : ControllerApp
    {
        public settingController() : base("Thông tin trang web", "Thông tin trang web") { }
        // GET: admin/setting
        [AppAuthorize(RoleManager.Admin,RoleManager.Superadmin,RoleManager.Manager)]
        public ActionResult Index()
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            return View(systemConfigProvider.Get());
        }

        [HttpPost]
        [AttributeRouting.Web.Mvc.Route("update")]
        public async Task<JsonResult> InsertOrUpdate(SystemConfig model)
        {
            if (ModelState.IsValid)
            {
                SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
                var result = await systemConfigProvider.InsertOrUpdateAsync(model);
                return Json(result);
            }
            else
            {
                return Json(new AccessEntityResult { Status = AccessEntityStatusCode.ModelFailed, Message = MessageManager.GetErrorMessage(ModuleType.Base, MessageType.ModelFailed) });
            }
        }

        [HttpGet]
        [AttributeRouting.Web.Mvc.Route("get-info")]
        public async Task<JsonResult> GetInfo()
        {
            SystemConfigProvider systemConfigProvider = new SystemConfigProvider();
            return Json(await systemConfigProvider.GetAsync(), JsonRequestBehavior.AllowGet);
        }

    }
}