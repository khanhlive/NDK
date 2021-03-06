namespace ICB.Business.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Document")]
    public partial class Document
    {
        public int ID { get; set; }

        [Required]
        [StringLength(500)]
        public string Path { get; set; }

        [Required]
        [StringLength(500)]
        public string Caption { get; set; }

        public DateTime CreateTime { get; set; }

        public int UserIDCreated { get; set; }

        public int Status { get; set; }

        public int CategoryID { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [Column(TypeName = "ntext")]
        public string Content { get; set; }

        public DateTime? UpdateTime { get; set; }

        public int? UserUpdate { get; set; }

        [StringLength(500)]
        public string Filename { get; set; }

        public virtual Account Account { get; set; }
    }
}
