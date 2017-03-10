using FC.Interfaces.ViewModels;
using FC.Shared.Entities;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Search
{
    public class ArtistSearchResult : BaseModel
    {

        
        public string Country
        {
            get; set;
        }

        
        public DateTime Date
        {
            get; set;
        }

        public string Location { get; set; }

        
        public int[] Genres
        {
            get; set;
        }

        
        public string Image
        {
            get; set;
        }

        
        public string Name
        {
            get; set;
        }

        private string type = "artist";
        public string Type
        {
            get
            {
                return type;
            }
            set
            {
                type = value;
            }
        }
    }
}
