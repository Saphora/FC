using FC.Interfaces.Data;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Attribs;

namespace FC.Shared.Entities
{
    
    public class UArtist : BaseModel
    {
        public UArtist()
        {
            this.Genres = new List<UGenre>();
            this.SocialProfiles = new List<SocialProfile>();
        }
        [Key]
        public Guid? ArtistID { get; set; }

        public bool IsPopular { get; set; }

        [Validation(ValidationRule.Guid, true)]
        public Guid? CountryID { get; set; }
        
        /// <summary>
        /// Constructor for autogenerating news items (when creating a new festival,artist,newsitem).
        /// </summary>
        /// <param name="data">Viewmodel data</param>
        /// <param name="title">Generic title</param>
        /// <returns></returns>
        
        public UArtist(object data) :
            base(data)
        {
            UArtist a = (UArtist)data;
            this.Name = a.Name;
            this.Genres = a.Genres;
            this.Website = a.Website;
            this.Country = a.Country;
            this.DeezerURL = a.DeezerURL;
            this.FacebookURL = a.FacebookURL;
            this.SoundcloudURL = a.SoundcloudURL;
            this.YoutubeURL = a.YoutubeURL;
            this.SpotifyURL = a.SpotifyURL;
            this.InstagramURL = a.InstagramURL;
            this.MyspaceURL = a.MyspaceURL;
            this.Description = a.Description;
            this.LogoID = a.LogoID;
            if (a.SocialProfiles != null)
            {
                this.SocialProfiles = a.SocialProfiles;
            } else
            {
                this.SocialProfiles = new List<SocialProfile>();
            }
        }
        public Guid? MediaDirectoryID { get; set; }

        [ForeignKey("MediaDirectoryID")]
        public MediaDirectory Album { get; set; }

        public List<SocialProfile> SocialProfiles { get; set; }
        
        [Index("ArtistName", IsClustered =true, IsUnique =true)]
        [Validation(true)]
        public string Name { get; set; }

        
        [Validation(true)]
        public string Description { get; set; }

        
        [ForeignKey("CountryID")]
        public  UCountry Country { get; set; }

        
        [Validation(ValidationRule.Website)]
        public string Website { get; set; }

        
        [Validation(true)]
        public List<UGenre> Genres { get; set; }

        public Guid? ThumbnailID { get; set; }

        [ForeignKey("ThumbnailID")]
        public Media Thumbnail { get; set; }

        public Guid? ProfileImageID { get; set; }

        [ForeignKey("ProfileImageID")]
        public Media ProfileImage { get; set; }

        
        [Validation(ValidationRule.Guid, false)]
        public Guid? LogoID { get; set; }

        
        [Validation(ValidationRule.FacebookURL)]
        public string FacebookURL { get; set; }

        
        [Validation(ValidationRule.InstagramURL)]
        public string InstagramURL { get; set; }

        
        [Validation(ValidationRule.SoundcloudURL)]
        public string SoundcloudURL { get; set; }

        
        [Validation(ValidationRule.TwitterURL)]
        public string TwitterURL { get; set; }

        
        [Validation(ValidationRule.SpotifyURL)]
        public string SpotifyURL { get; set; }

        
        [Validation(ValidationRule.MySpaceURL)]
        public string MyspaceURL { get; set; }

        
        [Validation(ValidationRule.YoutubeURL)]
        public string YoutubeURL { get; set; }

        
        [Validation(ValidationRule.DeezerURL)]
        public string DeezerURL { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? ArchiveDate { get; set; }

        public string MetaKeys
        {
            get;set;
        }

        public string MetaDescription
        {
            get;set;
        }

        public string Title
        {
            get { return this.Name; }
        }

        public long OrderDate
        {
            get;set;
        }
        
        public string ShortText
        {
            get;set;
        }
        public string DetailText
        {
            get;set;
        }

        public string Link
        {
            get;set;
        }
        
        
        public string Rating
        {
            get;set;
        }

        public int RatingScore { get; set; }

        public string MetaTitle
        {
            get;set;
        }
    }
}
    