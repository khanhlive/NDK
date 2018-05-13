namespace ICB.Business.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Service")]
    public partial class Service
    {
        public int ID { get; set; }

        [Required]
        [StringLength(500)]
        public string Name { get; set; }

        [StringLength(500)]
        public string NameENG { get; set; }

        [StringLength(500)]
        public string Title { get; set; }

        [StringLength(500)]
        public string TitleENG { get; set; }

        [StringLength(500)]
        public string ImageURL { get; set; }

        [StringLength(500)]
        public string ThumbnailURL { get; set; }

        [StringLength(500)]
        public string Caption { get; set; }

        [StringLength(500)]
        public string CaptionENG { get; set; }

        [Column(TypeName = "ntext")]
        public string Introduction { get; set; }

        [Column(TypeName = "ntext")]
        public string Procedure { get; set; }

        [StringLength(500)]
        public string DocumentArrayID { get; set; }

        public int CategoryID { get; set; }

        public bool HasChild { get; set; }

        public int? ServiceID { get; set; }

        public int? Status { get; set; }

        public DateTime? CreateTime { get; set; }

        public DateTime? LastMordifiedTime { get; set; }

        public long? ViewCounter { get; set; }

        public int? UserID { get; set; }

        public string DocumentView { get; set; }

        public string Description { get; set; }

        public virtual Account Account { get; set; }

        public virtual Category Category { get; set; }
    }
}
