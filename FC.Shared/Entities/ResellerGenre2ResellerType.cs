using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class ResellerGenre2ResellerType
    {
        [Key]
        public Guid? RG2RTID { get; set; }

        [ForeignKey("ResellerTypeID")]
        public ResellerType Type { get; set; }

        [ForeignKey("ResellerGenreID")]
        public ResellerGenre Genre { get; set; }


        public Guid? ResellerTypeID { get; set; }
        public Guid? ResellerGenreID { get; set; }
    }
}
