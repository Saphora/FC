using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class ResellerGenre : BaseModel
    {
        [Key]
        public Guid? ResellerGenreID { get; set; }

        public string GenreName { get; set; }

        public string Description { get; set; }
    }
}
