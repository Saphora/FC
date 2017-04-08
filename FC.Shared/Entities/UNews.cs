using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using FC.Interfaces.Data;
using System.Configuration;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FC.Shared.Attribs;

namespace FC.Shared.Entities
{
    
    public class UNews : BaseModel
    {
        [Key]
        public Guid? NewsID { get; set; }

        public UNews() {
            this.ArchiveDate = DateTime.Now.AddYears(1);
        }
        
        
        public string Title { get; set; }

        [Validation(false)]
        public DateTime Date { get; set; }
        public DateTime CreateDate { get; set; }

        public Guid? MediaDirectoryID { get; set; }

        [ForeignKey("MediaDirectoryID")]
        public  MediaDirectory Album { get; set; }
        

        [Validation(ValidationRule.BigText, false)]
        public string Text { get; set; }

        public string SourceURL { get; set; }
        public string SourceName { get; set; }

        [Validation(ValidationRule.Guid, false)]
        public Guid? ThumbnailID { get; set; }

        [ForeignKey("ThumbnailID")]
        public Media Thumbnail { get; set; }

        [Validation(false)]
        public List<UGenre> Genres { get; set; }
       

        public string MetaKeys
        {
            get;set;
        }

        public string MetaDescription
        {
            get;set;
        }

        public long OrderDate
        {
            get
            {
                return this.CreateDate.Ticks;
            }
        }

        public string DisplayDate
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

        public int RatingScore { get; set; }

        private string _name { get; set; }

        [NotMapped]
        public string Name
        {
            get
            {
                return string.Format("{0}{1}{2}{3}{4}", this.CreateDate.Year, this.CreateDate.Month, this.CreateDate.Day, this.CreateDate.Hour, this.CreateDate.Minute);
            }

            set
            {
                throw new SettingsPropertyIsReadOnlyException("FC Exception: The property Name is only used by ISortable and has an readonly implementation.");
            }
        }
    }
}
