using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDK.AdoTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var test = (typeof(MyClass)).GetProperties();
            foreach (var item in test)
            {
                Console.WriteLine("Name: " + item.Name + ", type: " + item.PropertyType.Name);
            }
            
            Console.ReadLine();
        }
    }

    class MyClass
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public bool Gender { get; set; }
        public DateTime BirthDay { get; set; }
    }
}
