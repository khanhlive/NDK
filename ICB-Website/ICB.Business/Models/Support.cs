namespace ICB.Business.Models
{
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Support")]
    public partial class Support
    {
        public int ID { get; set; }

        [StringLength(250)]
        [DisplayName("Tên")]
        [Required(ErrorMessage ="Bạn chưa nhập tên")]
        public string Name { get; set; }

        [DisplayName("Hình ảnh")]
        [StringLength(250)]
        public string Thumbnail { get; set; }
        [DisplayName("Điện thoại")]
        [StringLength(20)]
        public string Phone { get; set; }

        [DisplayName("Email")]
        [StringLength(250)]
        public string Email { get; set; }
        [DisplayName("Skype")]
        [StringLength(250)]
        public string Skype { get; set; }

        [DisplayName("Trạng thái")]
        public int Status { get; set; }

        [DisplayName("Nhóm")]
        public int? Group { get; set; }
    }
}
