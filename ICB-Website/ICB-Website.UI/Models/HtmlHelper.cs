using NDK.ApplicationCore.Models;
using PagedList.Mvc;
using System;

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



        public static string FormatDatetime(DateTime dateTime, string format)
        {
            if (dateTime==null)
            {
                return "";
            }
            else
            {
                if (string.IsNullOrEmpty(format))
                {
                    format = Common.DatetimeFormatString[0];
                }
                return dateTime.ToString(format);
            }
        }

        public static int TitleRecentPostMaxLength = 26;
    }
}