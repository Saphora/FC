using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class UGenre2UNews
    {
        [Key]
        public Guid? G2NID { get; set; }

        public Guid? GenreID { get; set; }
        public Guid? NewsID { get; set; }
        
        //[Index("NewsID")]
        public UNews News { get; set; }
        
        //[Index("GenreID")]
        public UGenre Genre { get; set; }
    }
}
