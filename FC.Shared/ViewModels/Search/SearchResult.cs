using FC.Interfaces.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Search
{
    public class SearchResult
    {
        public List<ISearchResult> Artists { get; set; }
        public List<ISearchResult> Festivals { get; set; }
        public List<ISearchResult> Genres { get; set; }
        public List<ISearchResult> News { get; set; }

        public SearchResult()
        {
            Artists = new List<ISearchResult>();
            Festivals = new List<ISearchResult>();
            Genres = new List<ISearchResult>();
            News = new List<ISearchResult>();
        }
    }
}
