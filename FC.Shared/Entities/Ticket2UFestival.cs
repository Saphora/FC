using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Ticket2Festival
    {
        [Key]
        public Guid? T2FID { get; set; }
        public Guid? FestivalID { get; set; }
        public Guid? TicketID { get; set; }

        [ForeignKey("FestivalID")]
        public UFestival Festival { get; set; }
        
        [ForeignKey("TicketID")]
        public Ticket Ticket { get; set; }
    }
}
