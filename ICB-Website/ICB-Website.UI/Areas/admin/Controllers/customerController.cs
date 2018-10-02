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
    [AttributeRouting.RoutePrefix("khach-hang")]
    public class customerController : ControllerApp
    {
        public customerController() : base("Quản lý khách hàng", "Quản lý khách hàng") { }
        // GET: admin/customer
        [AttributeRouting.Web.Mvc.Route("")]
        [AppAuthorize(RoleManager.Admin, RoleManager.Manager, RoleManager.Superadmin)]
        public async Task<ActionResult> Index()
        {
            CustomerProvider customerProvider = new CustomerProvider();

            return View(await customerProvider.GetAllAsync());
        }
        [AttributeRouting.Web.Mvc.Route("getall")]
        public async Task<JsonResult> GetAll()
        {
            CustomerProvider customerProvider = new CustomerProvider();
            return Json(await customerProvider.GetAllAsync(), JsonRequestBehavior.AllowGet);
        }

        [AttributeRouting.Web.Mvc.Route("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            using (CustomerProvider customerProvider = new CustomerProvider())
            {
                return Json(await customerProvider.GetByIDAsync(id), JsonRequestBehavior.AllowGet);
            }
        }
        
        [HttpPost]
        public async Task<JsonResult> Insert(Customer customer)
        {
            if (ModelState.IsValid)
            {
                CustomerProvider customerProvider = new CustomerProvider();
                AccessEntityResult accessEntityResult = await customerProvider.AddAsync(customer);
                return Json(accessEntityResult);
            }
            else
            {
                return Json(MessageManager.GetErrorMessage(ModuleType.Customer, MessageType.ModelFailed));
            }
        }
        
        [HttpPost]
        public async Task<JsonResult> Update(int id, Customer customer)
        {
            if (ModelState.IsValid)
            {
                CustomerProvider customerProvider = new CustomerProvider();
                return Json(await customerProvider.EditAsync(id, customer));
            }
            else
            {
                return Json(MessageManager.GetErrorMessage(ModuleType.Customer, MessageType.ModelFailed));
            }
        }

        [HttpDelete]
        public async Task<JsonResult> Delete(int id)
        {
            CustomerProvider customerProvider = new CustomerProvider();
            var result = await customerProvider.DeleteAsync(id);
            return Json(new AccessEntityResult { Status = result, Data = id, Message = MessageManager.GetErrorMessage(ModuleType.Customer, result) });
            //if (customer==null)
            //{
            //    return Json(new AccessEntityResult { Status = AccessEntityStatusCode.NotFound, Data=id ,Message = MessageManager.GetErrorMessage(ModuleType.Customer, MessageType.NotFound) });
            //}
            //else
            //{
            //    AccessEntityStatusCode statusCode = await customerProvider.DeleteAsync(customer);
            //    return Json(new AccessEntityResult { Status = statusCode, Data = id, Message = MessageManager.GetErrorMessage(ModuleType.Customer, statusCode) });
            //}
            
        }
    }
}