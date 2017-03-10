using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class UGenre2UArtist
    {
        [Key]
        public Guid? G2AID { get; set; }
        public Guid? GenreID { get; set; }
        public Guid? ArtistID { get; set; }

        [ForeignKey("GenreID")]
        public UGenre Genre { get; set; }

        [ForeignKey("ArtistID")]
        public UArtist Artist { get; set; }
    }
}
