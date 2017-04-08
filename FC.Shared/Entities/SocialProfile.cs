using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class SocialProfile
    {
        [Key]
        public Guid? SocialProfileID { get; set; }

        public string URL { get; set; }
        
        public Guid? ProfileTypeID { get; set; }

        [ForeignKey("ProfileTypeID")]
        public  SocialProfileType ProfileType { get; set; }

        [Index]
        public Guid? GenericID { get; set; }

        public FC.Shared.Enum.SocialMediaBindableType ContentType { get; set; }
    }
}
