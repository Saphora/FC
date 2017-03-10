using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class ResellerGenre
    {
        [Key]
        public Guid? ResellerGenreID { get; set; }

        public string GenreName { get; set; }

        public string Description { get; set; }

        public Guid? AuthorID { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? ArchiveDate { get; set; }
        public bool IsDeleted { get; set; }

    }
}
