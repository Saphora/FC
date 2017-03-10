using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class ServiceResponse<T>
    {
        public ServiceResponse()
        {
            this.Params = new List<string>();
        }
        public ServiceResponse(T data, HttpStatusCode statusCode, string message)
        {
            this.Data = data;
            this.StatusCode = statusCode;
            this.Message = message;
            this.Params = new List<string>();
        }
        public List<string> Params { get; set; }
        public T Data { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string Message { get; set; }
    }
}
