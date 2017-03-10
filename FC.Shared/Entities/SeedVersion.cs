using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class SeedVersion
    {
        [Key]
        public Guid SeedVersionID { get; set; }
    }
}
