using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class SearchFilter
    {
        public string Keyword { get; set; }
        public List<string> ActiveCountries { get; set; }
    }
}
