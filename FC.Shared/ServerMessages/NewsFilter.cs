using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class NewsFilter
    {
        public List<Guid?> GenreIDs { get; set; }
        public List<Guid?> CountryIDs { get; set; }
    }
}
