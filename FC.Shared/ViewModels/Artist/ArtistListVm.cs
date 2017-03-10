using FC.Interfaces.Data;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Artist
{
    public class ArtistListVm : BaseModel
    {
        public Guid ArtistID { get; set; }
        public Media Thumbnail { get; set; }
        public string CountryName { get; set; }
    }
}
