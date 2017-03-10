using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.ServerMessages;

namespace FC.Shared.Entities
{
    public class ServiceMessage<T>
    {
        public ServiceMessage() { }
        
        public ServiceMessage(T data, SystemHeaders headers)
        {
            this.Data = data;
            this.Headers = headers;
            this.Token = "notimplemented";
        }
        public ServiceMessage(JObject payload)
        {
            ServiceMessage<T> r = payload.ToObject<ServiceMessage<T>>();
            this.Data = r.Data;
            this.Token = r.Token;
            this.Headers = r.Headers;
        }

        public T Data { get; set; }
        public string Token { get; set; }
        public SystemHeaders Headers { get; set; }

        public static implicit operator ServiceMessage<T>(ServiceMessage<FestivalFilter> v)
        {
            throw new NotImplementedException();
        }
    }
}
