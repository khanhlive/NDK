using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDK.ApplicationCore.Extensions.ResponseResults
{
    public enum AccessEntityStatusCode
    {
        OK = 0,
        Existed = 1,
        NotFound = 2,
        Failed = 3
    }
}
