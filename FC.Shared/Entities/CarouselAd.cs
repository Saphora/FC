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
    public class CarouselAd
    {
        [Key]
        public Guid? CarsouselAdID { get; set; }

        public Guid? AdvertisementID { get; set; }

        [ForeignKey("AdvertisementID")]
        public Advertisement Advertisment { get; set; }
        public int IntervalMs { get; set; }

        public string Direction { get; set; }

        public string DeepLink1 { get; set; }
        public string DeepLink2 { get; set; }
        public string DeepLink3 { get; set; }

        public bool IsAreaLink { get; set; }
        public string Area1 { get; set; }
        public string Area2 { get; set; }
        public string Area3 { get; set; }

        [ForeignKey("MediaItem1ID")]
        public Media MediaItem1 { get; set; }

        [ForeignKey("MediaItem2ID")]
        public Media MediaItem2 { get; set; }

        [ForeignKey("MediaItem3ID")]
        public Media MediaItem3 { get; set; }

        public Guid? MediaItem1ID { get; set; }
        public Guid? MediaItem2ID { get; set; }
        public Guid? MediaItem3ID { get; set; }

        public Guid? AlbumID { get; set; }

        [ForeignKey("AlbumID")]
        public MediaDirectory CarouselAlbum { get; set; }
       
        public CarouselType CarouselType { get;set; }
    }
}
