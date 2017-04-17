using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Enum;
using FC.Interfaces.Data;

namespace FC.Shared.Entities
{
    public class Ticket: BaseModel
    {
        public Ticket()
        {
            this.Created = DateTime.Now;
            this.Modified = null;
            this.IsAllinclusive = false;
            this.IsCombiDeal = false;
            this.IsDiscount = false;
            this.CurrencyBase = FC.Shared.Enum.CurrencyBase.EUR;
        }
        
        [Key]
        public Guid? TicketID { get; set; }

        [Index]
        public Guid? AuthorID { get; set; }

        public double Price { get; set; }

        [ForeignKey("AuthorID")]
        public ApplicationUser Author { get; set; }
        

        public string TicketDescription { get; set; }
        
        public bool IsAvailable { get; set; }
        public bool IsEarlyBird { get; set; }
        public bool IsVipTicket { get; set; }
        public bool IsDiscount { get; set; }
        public bool IsCombiDeal { get; set; }
        public bool IsAllinclusive { get; set; }
        public bool ExternalTicketURL { get; set; }
        public bool InternalURL { get; set; }
        
        public string CurrencyBase { get; set; }
    }
}
