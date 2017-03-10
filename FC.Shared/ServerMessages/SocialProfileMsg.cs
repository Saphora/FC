using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class SocialProfileMsg
    {
        public SocialProfile SocialProfile { get; set; }
        public Guid? GenericID { get; set; }
        public FC.Shared.Enum.SocialMediaBindableType ContentType { get; set; }
    }
}
