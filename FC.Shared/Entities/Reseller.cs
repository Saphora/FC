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
    public class Reseller: BaseModel
    {
        [Key]
        public Guid? ResellerID { get; set; }

        [Validation(ValidationRule.Any,true)]
        public string Reference { get; set; }

        [Validation(ValidationRule.Any,true)]
        public string Name { get; set; }

        [Validation(ValidationRule.Any,true)]
        public string Website { get; set; }

        public string QueryString { get; set; }


        [Validation(ValidationRule.Guid,true)]
        public Guid? ThumbnailID { get; set; }

        [ForeignKey("ThumbnailID")]
        public Media Thumbnail { get; set; }
        

        [Validation(ValidationRule.Any, false)]
        public string Contactname { get; set; }

        [Validation(ValidationRule.Email,false)]
        public string Contactemail { get; set; }
        
        public Guid? InternalUserID { get; set; }

        [ForeignKey("InternalUserID")]
        public ApplicationUser InternalUser { get; set; }

        public Guid? AuthorID { get; set; }

        [ForeignKey("AuthorID")]
        public ApplicationUser Author { get; set; }

        public Guid? AlbumID { get; set; }

        public Guid? ResellerTypeID { get; set; }

        [ForeignKey("ResellerTypeID")]
        public ResellerType ResellerType { get; set; }

        [ForeignKey("AlbumID")]
        public MediaDirectory Album { get; set; }

        public Guid? ProfileImageID { get; set; }

        [ForeignKey("ProfileImageID")]
        public Media ProfileImage { get; set; }

    }
}
