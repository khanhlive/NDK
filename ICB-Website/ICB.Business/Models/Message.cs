using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace ICB.Business.Models
{
    [Table("Message")]
    public partial class Message
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int? UserID { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? Status { get; set; }
        public string Content { get; set; }
        public string Name { get; set; }
    }
}
