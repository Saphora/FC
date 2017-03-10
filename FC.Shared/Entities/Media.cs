using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Attribs;
using FC.Interfaces.Data;

namespace FC.Shared.Entities
{
    public class Media: BaseModel
    {
        [Key]
        public Guid? MediaID { get; set; }

        [Index]
        public Guid? DirectoryID { get; set; }

        [Validation(ValidationRule.Any, true)]
        public string FileName { get; set; }

        [Validation(ValidationRule.Any,true)]
        public string Name { get; set; }

        public string FileMimeType { get; set; }

        public bool CropImage { get; set; }

        public bool IsThumbNail { get; set; }

        public string MD5Checksum { get; set; }

        [Validation(ValidationRule.Number,false)]
        public string Width { get; set; }
        [Validation(ValidationRule.Number,false)]
        public string Height { get; set; }
        
        public string X { get; set; }

        public string Y { get; set; }

        public string CssString { get; set; }

        public string HtmlString { get; set; }

        [Validation(ValidationRule.Website,false)]
        public string ExternalURL { get; set; }

        [Validation(ValidationRule.Website)]
        public string MediaURL { get; set; }

        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? ArchiveDate { get; set; }
        
        public Guid? MediaTypeID { get; set; }

        [ForeignKey("MediaTypeID")]
        public MediaType MediaType { get; set; }

        public Guid? AuthorID { get; set; }

        [ForeignKey("AuthorID")]
        public ApplicationUser Author { get; set; }

        public bool IsDeleted { get; set; }

        public long? Size { get; set; }
        public long? ContentLength { get; set; }

        public string Ext
        {
            get
            {
                if (FileName != null)
                {
                    return FileName.Split('.').LastOrDefault();
                } else
                {
                    return "";
                }
            }
        }
        public int ObsoleteID { get; set; }
        
    }
}
