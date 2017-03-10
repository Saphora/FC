using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class MediaDirectory
    {
        public MediaDirectory()
        {
            //Media = new List<Entities.Media>();
        }

        [Key]
        public Guid? DirectoryID { get; set; }

        public Guid? ParentID { get; set; }
        
        public string Name { get; set; }

        public bool IsDeleted { get; set; }
        public DateTime? ArchiveDate { get; set; }

        public List<Media> Media { get; set; }

        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }

        public Guid? AuthorID { get; set; }

        [System.ComponentModel.DataAnnotations.Schema.NotMapped]
        public List<MediaDirectory> Children { get; set; }
    }
}
