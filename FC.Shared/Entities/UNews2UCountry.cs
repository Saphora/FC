using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class UNews2UCountry
    {
        [Key]
        public Guid? C2NID { get; set; }
        public Guid? CountryID { get; set; }
        public Guid? NewsID { get; set; }

        [ForeignKey("NewsID")]
        public UNews News { get; set; }

        [ForeignKey("CountryID")]
        public UCountry Country { get; set; }
    }
}
