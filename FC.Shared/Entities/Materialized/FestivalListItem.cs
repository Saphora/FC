using FC.Shared.ViewModels.Date;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities.Materialized
{
    public class FestivalListItem
    {
        public DateVM StartDateVM { get; set; }
        public DateVM EndDateVM { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid? FestivalID { get; set; }
        public Guid? ThumbnailID { get; set; }
        public Media Thumbnail { get; set; }
        public string Name { get; set; }
        public string Visitors { get; set; }
        public List<UGenre> Genres { get; set; }
        public string City { get; set; }
        public string CountryName { get; set; }
    }
}
