using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class UArtist2UFestival
    {
        [Key]
        public Guid? A2FID { get; set; }
        public Guid? ArtistID { get; set; }
        public Guid? FestivalID { get; set; }

        [ForeignKey("FestivalID")]
        public UFestival Festival { get; set; }

        [ForeignKey("ArtistID")]
        public UArtist Artist { get; set; }
    }
}
