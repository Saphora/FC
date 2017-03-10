using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class MaterializedNews
    {
        [Key]
        public Guid? NewsID { get; set; }
        public Guid? AuthorID { get; set; }
        public string Title { get; set; }
        public Guid? MediaDirectoryID {get;set;}
        public string MetaKeys { get; set; }
        public string MetaDescription { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public Guid? ThumbnailID { get; set; }
        public string SourceURL { get; set; }
        public string SourceName { get; set; }
        public string DisplayDate { get; set; }
        public string DisplayTime { get; set; }
        public string DateKey { get; set; }
    }
}
