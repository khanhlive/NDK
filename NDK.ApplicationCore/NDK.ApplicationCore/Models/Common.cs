using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDK.ApplicationCore.Models
{
    public static class Common
    {
        public static string[] DatetimeFormatString = new string[] { "dd/MM/yyyy", "dd/MM/yyyy HH:mm:ss" };
        public static string HtmlDecode(string content)
        {
            return content
                    .Replace("&quot;", "\"")
        .Replace("&#39;", "'")
        .Replace("&lt;", "<")
        .Replace("&gt;", ">")
        .Replace("&amp;", "&");
        }

        public static int GetDaysBetweenTwoTime(DateTime time1, DateTime time2)
        {
            return (time2 - time1).Days;
        }

        public static int GetDaysBetweenTimeAndToday(DateTime time)
        {
            return Common.GetDaysBetweenTwoTime(time, DateTime.Now);
        }
    }
    
}
