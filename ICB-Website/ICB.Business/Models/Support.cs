namespace ICB.Business.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Support")]
    public partial class Support
    {
        public int ID { get; set; }

        [StringLength(250)]
        public string Name { get; set; }

        [StringLength(250)]
        public string Thumbnail { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }

        [StringLength(250)]
        public string Email { get; set; }

        [StringLength(250)]
        public string Skype { get; set; }

        public bool? Status { get; set; }

        public int? Group { get; set; }
    }
}
