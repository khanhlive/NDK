namespace ICB.Business.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Category")]
    public partial class Category
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Category()
        {
            Services = new HashSet<Service>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(500)]
        public string Name { get; set; }

        [StringLength(500)]
        public string Title { get; set; }

        public int? Order { get; set; }

        [StringLength(500)]
        public string NameENG { get; set; }

        [StringLength(500)]
        public string TitleENG { get; set; }

        public int? Active { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Service> Services { get; set; }
    }
}
