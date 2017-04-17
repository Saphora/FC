using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class HTTPFile
    {
        public long lastModified {get;set;}
        [Column(TypeName = "datetime2")]
        public DateTime lastModifiedDate { get; set;}
        public string name { get; set; }
        public long size { get; set; }
        public string type { get; set; }
        public string webkitRelativePath { get; set; }
    }
}
