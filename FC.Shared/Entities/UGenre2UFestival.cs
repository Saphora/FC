using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class UGenre2UFestival
    {
        [Key]
        public Guid? G2FID { get; set; }
        public Guid? GenreID { get; set;}
        public Guid? FestivalID { get; set; }

        [ForeignKey("GenreID")]
        public virtual UGenre Genre { get; set; }

        [ForeignKey("FestivalID")]
        public UFestival Festival { get; set; }


    }
}
