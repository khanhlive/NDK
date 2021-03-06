﻿using System.ComponentModel.DataAnnotations;

namespace ICB_Website.UI.Models.Entities
{
    public class LoginModel
    {
        [Required(ErrorMessage ="Chưa nhập tên đăng nhập")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Chưa nhập mật khẩu")]
        public string Password { get; set; }
        public bool Remember { get; set; }
    }
}