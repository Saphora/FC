using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Attribs;

namespace FC.Shared.Entities
{
    public class Favorite
    {
        [Key]
        public Guid? FavID { get; set; }

        [Index]
        public Guid? ContentID { get; set; }

        [Index]
        public FC.Shared.Enum.InternalContentType ContentType { get; set; }

        [Index]
        public Guid? UserID { get; set; }

        [ForeignKey("UserID")]
        public ApplicationUser User { get; set; }

        [NotMapped]
        public object Content { get; set; }

    }
}
