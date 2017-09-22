using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ICB_Website.UI.Models
{
    public class ControllerApp : Controller
    {
        protected string Header { get; set; }
        protected string ContentName { get; set; }
        public ControllerApp()
        {
            this.ViewBag.Header = this.Header;
            this.ViewBag.ContentName = this.ContentName;
        }
        public ControllerApp(string header,string contentName)
        {
            this.Header = header;
            this.ContentName = contentName;
            this.ViewBag.Header = this.Header;
            this.ViewBag.ContentName = this.ContentName;
        }
    }
}