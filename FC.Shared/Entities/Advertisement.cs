using FC.Shared.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Advertisement
    {
        public Guid? AdvertisementID { get; set; }
        public AdvertisementType AdvertisementType { get; set; }
        public InternalContentType InternalContentType { get; set; }
        public Guid? ResellerID { get; set; }
        public Guid? InternalContentID { get; set; }
        public bool IsPublished { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public DateTime Expires { get; set; }
        public DateTime PublishDate { get; set; }
        public List<UGenre> MusicGenres { get; set; }
        public List<ResellerGenre> ResellerGenres { get; set; }
        public List<Guid?> Festivals { get; set; }
        public List<Guid?> News { get; set; }
        public List<Guid?> Locations { get; set; }
        public List<Guid?> Artists { get; set; }
        public Guid? AuthorID { get; set; }

    }
}
