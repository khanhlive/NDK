using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDK.ApplicationCore.Models
{
    public interface IEntitiesCore<T> where T:class
    {
        bool Compare(T target);
    }
}
