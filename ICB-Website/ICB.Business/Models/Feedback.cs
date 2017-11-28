namespace ICB.Business.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Feedback")]
    public partial class Feedback
    {
        public int ID { get; set; }

        [Required]
        [StringLength(500)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Address { get; set; }

        [Required]
        [StringLength(500)]
        public string Email { get; set; }

        [StringLength(15)]
        public string PhoneNumber { get; set; }

        [StringLength(500)]
        public string Theme { get; set; }

        [Column(TypeName = "ntext")]
        public string Content { get; set; }

        public int? Status { get; set; }

        [Column(TypeName = "ntext")]
        public string ContentFeedback { get; set; }

        public bool? Answered { get; set; }

        public DateTime? CreateTime { get; set; }

        public int? UserID { get; set; }

        public virtual Account Account { get; set; }
    }
}
