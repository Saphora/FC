using FC.Shared.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Adv2Visibility
    {
        [Key]
        public Guid? Adv2VisibilityID { get; set; }

        [Index]
        public Guid? InternalContentID { get; set; }

        [Index]
        public InternalContentType InternalContentType { get; set; }

        [Index]
        public Guid? AdvertisementID { get; set; }
    }
}
