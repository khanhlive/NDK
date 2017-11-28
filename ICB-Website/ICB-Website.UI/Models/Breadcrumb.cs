using System;

namespace ICB_Website.UI.Models
{
    public class Breadcrumb
    {
        public int ID { get; set; }
        public string URL { get; set; }
        public string Name { get; set; }
    }

    public class Stories {

        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime CreatedTime { get; set; }
        public string URL { get; set; }
    }

}