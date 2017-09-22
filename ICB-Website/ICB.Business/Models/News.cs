namespace ICB.Business.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class News
    {
        public int ID { get; set; }

        [Required]
        [StringLength(500)]
        public string Caption { get; set; }

        [StringLength(500)]
        public string ThumbnailURL { get; set; }

        public DateTime PostedDate { get; set; }

        public int UserID { get; set; }

        public int Category { get; set; }

        public int Status { get; set; }

        [StringLength(500)]
        public string ContentReview { get; set; }

        [Column(TypeName = "ntext")]
        public string Content { get; set; }

        public virtual Account Account { get; set; }
    }
}
