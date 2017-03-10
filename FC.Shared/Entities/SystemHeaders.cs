using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class SystemHeaders
    {
        long UserDateTime { get; set; }
        string Culture { get; set; }
        string Accept { get; set; }
        string ContentType { get; set; }
    }
}
