using System.ComponentModel.DataAnnotations.Schema;

namespace ICB.Business.Models
{
    [Table("RoleManager")]
    public class Role
    {
        public int ID { get; set; }
        public int AccountId { get; set; }
        public bool Addition { get; set; }
        public bool Edit { get; set; }
        public bool Delete { get; set; }
        public bool CanActive { get; set; }
        public int ModuleId { get; set; }
        public int? Status { get; set; }
        public bool View { get; set; }
        public virtual Account Account { get; set; }
    }
}
