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
        Failed = 3,
        ModelFailed=4
    }

    public class AccessEntityResult
    {
        public AccessEntityStatusCode Status { get; set; }
        public string Message { get; set; }
        public dynamic Data { get; set; }
    }
}
