using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class LogoutMsg
    {
        public Guid SessionID { get; set; }
        public Guid UserID { get; set; }
    }
}
