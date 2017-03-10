using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class FestivalFilter
    {
        public List<Guid?> GenreIDs { get; set; }
        public List<Guid?> CountryIDs { get; set; }
        public string FestivalID { get; set; }
        public int MonthNum = -1;
        public int YearNum = DateTime.Now.Year;
    }
}
