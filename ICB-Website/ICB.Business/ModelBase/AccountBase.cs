using System;
using System.ComponentModel.DataAnnotations;

namespace ICB.Business.ModelBase
{
    public class AccountBase
    {
        public int ID { get; set; }

        [Required(ErrorMessage = "Chưa nhập tên đăng nhập")]

        [StringLength(50, MinimumLength = 6, ErrorMessage = "Tên đăng nhập từ 6-50 ký tự")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Chưa nhập mật khẩu")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Mật khẩu từ 6-100 ký tự")]
        public string Password { get; set; }

        public byte Role { get; set; }

        public DateTime CreateTime { get; set; }

        [Required]
        [StringLength(500)]
        public string Email { get; set; }

        [Required]
        [StringLength(250)]
        public string Fullname { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsLocked { get; set; }

        [StringLength(15)]
        public string PhoneNumber { get; set; }

        public DateTime? LastLoginTime { get; set; }

        public DateTime? LastMordifiedTime { get; set; }

        [StringLength(500)]
        public string ImageURL { get; set; }
    }
}
