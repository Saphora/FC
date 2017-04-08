using FC.Interfaces.Data;
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
        public ServiceResponse(T data, HttpStatusCode statusCode, string message, Guid? token, IRepositoryState state=null)
        {
            this.Data = data;
            this.StatusCode = statusCode;
            this.Message = message;
            this.Params = new List<string>();
            this.State = state;
            this.ResponseToken = token;
        }
        public List<string> Params { get; set; }
        public IRepositoryState State { get; set; }
        public T Data { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string Message { get; set; }
        public Guid? RequestToken { get; set; }
        public Guid? ResponseToken { get; set; }
    }
}
