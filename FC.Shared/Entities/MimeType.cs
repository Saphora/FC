using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class MimeType
    {
        public Guid? MimeTypeID { get; set; }
        public string Name { get; set; }
        public string Mime { get; set; }
    }
}
