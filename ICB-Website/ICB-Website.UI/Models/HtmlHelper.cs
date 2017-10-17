using PagedList.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ICB_Website.UI.Models
{
    public class HtmlHelper
    {
        public static PagedListRenderOptions GetPagedListRenderOptions = new PagedListRenderOptions
        {
            Display = PagedListDisplayMode.Always,
            DisplayLinkToFirstPage = PagedListDisplayMode.Always,
            DisplayLinkToPreviousPage = PagedListDisplayMode.Always,
            DisplayLinkToNextPage = PagedListDisplayMode.Always,
            DisplayLinkToLastPage = PagedListDisplayMode.Always
        };
    }
}