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

        [Index]
        public DateTime StartDate { get; set; }

        [Index]
        public DateTime EndDate { get; set; }
        
        [Index]
        public int StartDateKey { get; set; }

        [Index]
        public int EndDateKey { get; set; }

    }
}
