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
    public class Product: BaseModel
    {
        public Product()
        {
            this.Created = DateTime.Now;
            this.Modified = null;
            this.IsCombiDeal = false;
            this.IsDiscount = false;
            this.CurrencyBase = FC.Shared.Enum.CurrencyBase.EUR;
        }

        [Key]
        public Guid? ProductID { get; set; }

        public double Price { get; set; }
        public double DiscountPrice { get; set; }

        [ForeignKey("ResellerID")]
        public Reseller Reseller { get; set; }

        public Guid? ResellerID { get; set; }

        public Guid? AuthorID { get; set; }

        [ForeignKey("AuthorID")]
        public ApplicationUser Author { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsAvailable { get; set; }
        public bool IsDiscount { get; set; }
        public bool IsCombiDeal { get; set; }
        public bool IsAllinclusive { get; set; }
        public bool ExternalProductURL { get; set; }
        public bool InternalURL { get; set; }
        public string CurrencyBase { get; set; }
    }
}
