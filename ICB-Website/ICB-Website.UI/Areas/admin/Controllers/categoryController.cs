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
    public class categoryController : ControllerApp
    {
        public categoryController() : base("Quản lý nhóm danh mục", "Quản lý nhóm danh mục") { }
        // GET: admin/category
        public async Task<ActionResult> Index()
        {
            using (CategoryProvider categoryProvider = new CategoryProvider())
            {
                return View(await categoryProvider.GetAllAsync());
            }
            
        }
    }
}