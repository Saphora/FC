using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class FestivalFilter
    {
        public FestivalFilter()
        {
            GenreIDs = new List<Guid?>();
            CountryIDs = new List<Guid?>();
            ArtistIDs = new List<Guid?>();
            LocationIDs = new List<Guid?>();
            FestivalIDs = new List<Guid?>();
        }
        
        public List<Guid?> GenreIDs { get; set; }
        public List<Guid?> CountryIDs { get; set; }
        public List<Guid?> ArtistIDs { get; set; }
        public List<Guid?> LocationIDs { get; set; }
        public List<Guid?> FestivalIDs { get; set; }
        public string FestivalID { get; set; }
        public int MonthNum = -1;
        public int YearNum = DateTime.Now.Year;
        public int PageLength { get; set; }
        public int CurrentLength { get; set; }
        public int BlockLength { get; set; }

        public Guid? LastID { get; set; }
    }
}
