using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class IsAuthMsg
    {
        public Guid SessionID { get; set; }
        public Guid Token { get; set; }
        public List<string> Roles { get; set; }
    } 
}
