namespace ICB.Business.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("RoleManager")]
    public partial class RoleManager
    {
        public int ID { get; set; }

        public int AccountId { get; set; }

        public bool Addition { get; set; }

        public bool Edit { get; set; }

        public bool Delete { get; set; }

        public bool View { get; set; }

        public bool CanActive { get; set; }

        public int ModuleId { get; set; }

        public int? Status { get; set; }

        public virtual Account Account { get; set; }
    }
}
