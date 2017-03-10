using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class SocialProfileType
    {
        public Guid? SocialProfileTypeID { get; set; }
        public string FontAwesomeIcon { get; set; }
        public string CssClass { get; set; }
        public Guid? MediaID { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
