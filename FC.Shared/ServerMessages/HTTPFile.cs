using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class HTTPFile
    {
        public long lastModified {get;set;}
        public DateTime lastModifiedDate { get; set;}
        public string name { get; set; }
        public long size { get; set; }
        public string type { get; set; }
        public string webkitRelativePath { get; set; }
    }
}
