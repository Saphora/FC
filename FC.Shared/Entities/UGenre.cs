using FC.Interfaces.Data;
using FC.Shared.Attribs;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class UGenre : BaseModel
    {
        [Key]
        public Guid? GenreID { get; set; }
        
        [Validation(ValidationRule.Guid)]
        public Guid? ParentID { get; set; }

        public bool IsPopular { get; set; }

        public UGenre() {
            this.Related = new List<UGenre>();
        }
        public UGenre(object data) :
            base(data)
        {
            UGenre g = (UGenre)data;
            this.GenreID = g.GenreID;
            this.Name = g.Name;
            this.Thumbnail = g.Thumbnail;
            this.VisibleOnHome = g.VisibleOnHome;
            if (g.Related != null)
            {
                this.Related = g.Related;
            } else
            {
                this.Related = new List<UGenre>();
            }
        }

        
        public  int VisibleOnHome { get; set; }

        
        [Index("GenreName", IsUnique = true, IsClustered = true)]
        [Validation(ValidationRule.Any, true)]
        public  string Name { get; set; }
        
        public Guid? AlbumID { get; set; }
        public Guid? ThumbnailID { get; set; }

        [ForeignKey("AlbumID")]
        public MediaDirectory Album { get; set; }

        [ForeignKey("ThumbnailID")]
        public Media Thumbnail { get; set; }

        public List<UGenre> Related { get; set; }
        
    }
}
