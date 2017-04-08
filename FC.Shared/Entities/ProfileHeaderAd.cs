using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class ProfileHeaderAd
    {
        [Key]
        public Guid? CalendarAdvID { get; set; }

        public Guid? AdvertisementID { get; set; }

        [ForeignKey("AdvertisementID")]
        public  Advertisement Advertisment { get; set; }

        public Guid? AlbumID { get; set; }

        [ForeignKey("AlbumID")]
        public  MediaDirectory Album { get; set; }

        public Guid? MediaID { get; set; }
        public string Title { get; set; }

        [ForeignKey("MediaID")]
        public  Media Thumbnail { get; set; }
        public string TextLine { get; set; }
        public DateTime Date { get; set; }
        public string DeepLink { get; set; }
    }
}
