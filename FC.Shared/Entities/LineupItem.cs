using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class LineupItem
    {
        [Key]
        public Guid? LineupItemID { get; set; }
        

        [Index]
        public Guid? StageID { get; set; }

        [Index]
        public Guid? ArtistID { get; set; }

        [ForeignKey("ArtistID")]
        public UArtist Artist { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime StartDate { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime EndDate { get; set; }
        
        public int StartDateKey { get; set; }
        
        public int EndDateKey { get; set; }

    }
}
