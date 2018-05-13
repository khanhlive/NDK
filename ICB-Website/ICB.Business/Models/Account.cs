namespace ICB.Business.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Account")]
    public partial class Account
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Account()
        {
            Documents = new HashSet<Document>();
            Feedbacks = new HashSet<Feedback>();
            News = new HashSet<News>();
            //RoleManagers = new HashSet<RoleManager>();
            Services = new HashSet<Service>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        public byte Role { get; set; }

        public DateTime CreateTime { get; set; }

        [Required]
        [StringLength(500)]
        public string Email { get; set; }

        [StringLength(250)]
        public string Fullname { get; set; }

        public bool? IsActive { get; set; }

        public bool? IsDeleted { get; set; }

        public bool? IsLocked { get; set; }

        [StringLength(15)]
        public string PhoneNumber { get; set; }

        public DateTime? LastLoginTime { get; set; }

        public DateTime? LastMordifiedTime { get; set; }

        [StringLength(500)]
        public string ImageURL { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Document> Documents { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Feedback> Feedbacks { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<News> News { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<RoleManager> RoleManagers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Service> Services { get; set; }
    }
}
