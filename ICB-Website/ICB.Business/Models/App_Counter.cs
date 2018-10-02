using System.ComponentModel.DataAnnotations.Schema;

namespace ICB.Business.Models
{
    [Table("App_Counter")]
    public class App_Counter
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public int Counter { get; set; }
    }
}
