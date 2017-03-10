using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Tickets2Reseller
    {
        [Key]
        public Guid? T2RID { get; set; }
        public Guid? TicketID { get; set; }
        public Guid? ResellerID { get; set; }

        [ForeignKey("TicketID")]
        public Ticket Ticket { get; set; }

        [ForeignKey("ResellerID")]
        public Reseller Reseller { get; set; }
    }
}
