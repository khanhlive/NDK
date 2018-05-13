using System.Collections.Generic;

namespace ICB.Business.Models
{
    public class ListService
    {
        public string Name { get; set; }
        public string Caption { get; set; }

        public string NameENG { get; set; }
        public int CategoryID { get; set; }
        public int? Status { get; set; }
        public string Title { get; set; }

        public string TitleENG { get; set; }

        public string ThumbnailURL { get; set; }
        public int ID { get; set; }
        public List<Service> Services { get; set; }
    }
}