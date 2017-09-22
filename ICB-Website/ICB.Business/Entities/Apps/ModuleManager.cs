using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ICB.Business.Entities.Apps
{
    public class ModuleManager
    {
    }

    public class Module
    {
        public ModuleType Name { get; set; }

    }
    public enum ModuleType
    {
        Register,
        Login,
        
    }
}
