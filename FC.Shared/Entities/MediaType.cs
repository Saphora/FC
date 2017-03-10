using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class MediaType
    {
        public Guid? MediaTypeID { get; set; }
        public string Name { get; set; }
        public string FontAwesomeIcon { get; set; }
        public List<MimeType> MimeTypes { get; set; }
    }
}
