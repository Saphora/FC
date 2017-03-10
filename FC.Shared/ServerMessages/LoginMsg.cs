using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class LoginMsg
    {
        public string Username { get; set; }
        public string PassOrCode { get; set; }
    }
}
