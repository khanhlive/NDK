using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ICB_Website.UI.Models.Entities
{
    public class Register
    {
        [Required(ErrorMessage ="Chưa nhập họ tên")]
        [StringLength(50, MinimumLength = 6, ErrorMessage = "Tên đăng nhập từ 6-50 ký tự")]
        public string Username { get; set; }
        [Required(ErrorMessage ="Chưa nhập mật khẩu")]
        [DataType(DataType.Password,ErrorMessage ="Mật khẩu không đúng")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Mật khẩu từ 6-100 ký tự")]
        public string Password { get; set; }
        [Required]
        [Compare("Password",ErrorMessage ="Mật khẩu không trùng khớp")]
        public string RetypePassword { get; set; }
        [Required]
        public string Fullname { get; set; }
        [Required(ErrorMessage ="Chưa nhập địa chỉ Email")]
        [DataType(DataType.EmailAddress,ErrorMessage ="Email không đúng định dạng")]
        public string Email { get; set; }
    }
}