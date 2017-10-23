using ICB.Business.Entities.Apps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ICB_Website.UI.Models.Security
{
    public static class SessionApp
    {
        public static bool IsLogin
        {
            get
            {
                var login = HttpContext.Current.Session["IsLogin"];
                
                if (login==null)
                {
                    return false;
                }
                else
                {
                    return (bool)login;
                }
            }
            set
            {
                HttpContext.Current.Session["IsLogin"] = value;
            }
        }
        public static string Username
        {
            get
            {
                var username = HttpContext.Current.Session["Username"];
                if (username == null)
                {
                    return string.Empty;
                }
                else
                {
                    return (username as string);
                }
            }
            set
            {
                HttpContext.Current.Session["Username"] = value;
            }
        }
        public static int UserID
        {
            get
            {
                var userid = HttpContext.Current.Session["UserID"];
                if (userid == null)
                {
                    return -1;
                }
                else
                {
                    return ((int)(userid));
                }
            }
            set
            {
                HttpContext.Current.Session["UserID"] = value;
            }
        }
        public static string Role
        {
            get
            {
                var role = HttpContext.Current.Session["Role"];
                if (role == null)
                {
                    return string.Empty;
                }
                else
                {
                    return (role as string);
                }
            }
            set
            {
                HttpContext.Current.Session["Role"] = value;
            }
        }
        public static string Email
        {
            get
            {
                var email = HttpContext.Current.Session["Email"];
                if (email == null)
                {
                    return string.Empty;
                }
                else
                {
                    return (email as string);
                }
            }
            set
            {
                HttpContext.Current.Session["Email"] = value;
            }
        }
        public static string Fullname
        {
            get
            {
                var fullName = HttpContext.Current.Session["Fullname"];
                if (fullName == null)
                {
                    return string.Empty;
                }
                else
                {
                    return (fullName as string);
                }
            }
            set
            {
                HttpContext.Current.Session["Fullname"] = value;
            }
        }

        public static int RoleType
        {
            get
            {
                var roleType = HttpContext.Current.Session["RoleType"];
                if (roleType == null)
                {
                    return RoleManager.Guest;
                }
                else
                {
                    return ((int)roleType);
                }
            }
            set
            {
                HttpContext.Current.Session["RoleType"] = value;
            }
        }

        public static void Logout()
        {
            SessionApp.IsLogin = false;
            SessionApp.Email = null;
            SessionApp.Fullname = null;
            SessionApp.Role = null;
            SessionApp.RoleType = -1;
            SessionApp.Username = null;
        }
    }
}