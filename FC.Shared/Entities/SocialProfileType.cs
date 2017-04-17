using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class SocialProfileType : BaseModel
    {
        [Key]
        public Guid? SocialProfileTypeID { get; set; }
        public string FontAwesomeIcon { get; set; }
        public string CssClass { get; set; }
        [Index]
        public Guid? MediaID { get; set; }
    }
}
