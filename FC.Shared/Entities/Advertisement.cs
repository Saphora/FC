using FC.Shared.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Advertisement :BaseModel
    {
        [Key]
        public Guid? AdvertisementID { get; set; }
        public string Description { get; set; }
        public string HTMLString { get; set; }
        public string CSSString { get; set; }
        public string JSString { get; set; }
        public string MetaKeys { get; set; }
        public string MetaDescription { get; set; }
        public AdvertisementType AdvertisementType { get; set; }
        public InternalContentType InternalContentType { get; set; }

        [ForeignKey("ResellerID")]
        public Reseller Reseller { get; set; }

        public Guid? ResellerID { get; set; }

        /// <summary>
        /// InternalContentID is used for highlighting a news message / report / festival etc.
        /// </summary>
        public Guid? InternalContentID { get; set; }
        [Index]
        public DateTime? Expires { get; set; }
        [Index]
        public DateTime? PublishDate { get; set; }

        public List<UGenre> MusicGenres { get; set; }

        public List<ResellerGenre> ResellerGenres { get; set; }

        public List<Guid?> Festivals { get; set; }
        public List<Guid?> News { get; set; }
        public List<Guid?> Locations { get; set; }
        public List<Guid?> Artists { get; set; }

    }
}
