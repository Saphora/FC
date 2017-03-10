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
    public class Location : BaseModel
    {
        [Key]
        public Guid? LocationID { get; set; }

        [Validation(ValidationRule.Any, true)]
        public string Address { get; set; }

        [Validation(ValidationRule.Zip, true)]
        [Index]
        public string ZIPCode { get; set; }

        [Validation(ValidationRule.Zip, true)]
        [Index]
        public string City { get; set; }

        [Validation(ValidationRule.Guid, true)]
        public Guid? CountryID { get; set; }

        [ForeignKey("CountryID")]
        public virtual UCountry Country { get; set; }

        [Validation(ValidationRule.Any, true)]
        [Obsolete("LocationName is obsolete please use Name instead.")]
        public string LocationName { get; set; }

        [Validation(ValidationRule.Any, true)]
        public string Name { get; set; }

        [Validation(ValidationRule.Website, true)]
        public string Website { get; set; }

        [Validation(ValidationRule.Email, true)]
        public string Email { get; set; }

        [Validation(ValidationRule.Phone, true)]
        public string Phone { get; set; }

        public List<SocialProfile> Social { get; set; }

        [Validation(ValidationRule.Website, false)]
        public string MapsURL { get; set; }

        [Validation(ValidationRule.Guid, false)]
        public Guid? ThumbnailID { get; set; }

        [Validation(ValidationRule.Guid, false)]
        public Guid? MediaDirectoryID { get; set; }

        [ForeignKey("MediaDirectoryID")]
        public virtual MediaDirectory Album { get; set; }

        [ForeignKey("ThumbnailID")]
        public Media Thumbnail { get; set; }

        public Guid? ProfileImageID { get; set; }

        [ForeignKey("ProfileImageID")]
        public Media ProfileImage { get; set; }

        public Guid? ProfileHeaderImageID { get; set; }

        [ForeignKey("ProfileHeaderImageID")]
        public Media ProfileHeaderImage { get; set; }

        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? ArchiveDate { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsPublished { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public Guid? AuthorID { get; set; }

        public string MetaKeys
        {
            get; set;
        }

        public string MetaDescription
        {
            get; set;
        }

        public string MetaTitle
        {
            get; set;
        }
    }

}
