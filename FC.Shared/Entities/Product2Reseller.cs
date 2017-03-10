using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Product2Reseller
    {
        [Key]
        public Guid? PR2REID { get; set; }
        public Guid? ProductID { get; set; }
        public Guid? ResellerID { get; set; }

        [ForeignKey("ProductID")]
        public Product Product { get; set; }

        [ForeignKey("ResellerID")]
        public Reseller Reseller { get; set; }
    }
}
