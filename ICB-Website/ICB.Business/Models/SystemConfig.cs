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

        [StringLength(500)]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string NameENG { get; set; }

        [Required]
        [StringLength(500)]
        public string Address { get; set; }

        [Required]
        [StringLength(15)]
        public string Tel { get; set; }

        [Required]
        [StringLength(15)]
        public string Fax { get; set; }

        [Required]
        [StringLength(15)]
        public string Hotline { get; set; }

        [Required]
        [StringLength(500)]
        public string Email { get; set; }

        [Required]
        [StringLength(500)]
        public string Website { get; set; }

        public int? Category { get; set; }

        public int? Status { get; set; }
    }
}
