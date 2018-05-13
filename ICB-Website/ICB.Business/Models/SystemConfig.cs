namespace ICB.Business.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SystemConfig")]
    public partial class SystemConfig
    {
        public int ID { get; set; }

        [Required]
        [StringLength(500)]
        public string Name { get; set; }

        [StringLength(500)]
        public string NameENG { get; set; }

        [StringLength(500)]
        public string Address { get; set; }

        [StringLength(15)]
        public string Tel { get; set; }

        [StringLength(15)]
        public string Fax { get; set; }

        [StringLength(15)]
        public string Hotline { get; set; }

        [StringLength(500)]
        public string Email { get; set; }

        [StringLength(500)]
        public string Website { get; set; }

        public int Category { get; set; }

        public int Status { get; set; }

        [Column(TypeName = "ntext")]
        public string Content { get; set; }

        [Column(TypeName = "ntext")]
        public string ContentENG { get; set; }

        [Column(TypeName = "ntext")]
        public string Caption { get; set; }

        [Column(TypeName = "ntext")]
        public string Description { get; set; }

        [StringLength(500)]
        public string ImageURL { get; set; }
    }
}
