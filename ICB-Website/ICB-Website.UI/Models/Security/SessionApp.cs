﻿using System;
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

    }
}