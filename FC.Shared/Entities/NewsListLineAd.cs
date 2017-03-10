using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FC.Shared.Enum;

namespace FC.Shared.Entities
{
    public class NewsListLineAd
    {
        [Key]
        public Guid? NewsListLineAdID { get; set; }

        public Guid? AdvertisementID { get; set; }

        [ForeignKey("AdvertisementID")]
        public Advertisement Advertisment { get; set; }

        public int Title { get; set; }

        public string Text { get; set; }

        public string DeepLink { get; set; }
        
        public Guid? AlbumID { get; set; }

        [ForeignKey("AlbumID")]
        public MediaDirectory Album { get; set; }

        public Guid? ThumbnailID { get; set; }

        [ForeignKey("ThumbnailID")]
        public Media Thumbnail { get; set; }

        public CarouselType CarouselType { get; set; }
    }
}
