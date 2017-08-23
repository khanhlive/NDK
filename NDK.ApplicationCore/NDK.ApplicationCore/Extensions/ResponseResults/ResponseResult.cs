using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDK.ApplicationCore.Extensions.ResponseResults
{
    /// <summary>
    /// 
    /// </summary>
    public interface IResponseResultBase
    {

    }
    /// <summary>
    /// 
    /// </summary>
    public class ResponseResultBase<T, E>: IResponseResultBase
    {
        /// <summary>
        /// 
        /// </summary>
        public bool status { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public System.Net.HttpStatusCode statusCode { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public T result { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public E error { get; set; }

    }

    /// <summary>
    /// 
    /// </summary>
    public class ResponseResult : ResponseResultBase<object, object>
    {

    }
}
