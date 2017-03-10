using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Festival
{
    public class FestivalDetailScope
    { 
        public UFestival FestivalDetails { get; set; }
        public List<UArtist> Artists { get; set; }
        public List<UGenre> Genres { get; set; }
        public List<UNews> News { get; set; }
    }
}
