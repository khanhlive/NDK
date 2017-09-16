using NDK.ApplicationCore.EFGenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ICB.Business.Access
{
    public class ApplicationManager<T, KeyType>: EntityFrameworkRepository<T, KeyType> where T : class
    {
        protected ApplicationManager():base(new ICB.Business.Models.WebContext()) { }
    }
}
