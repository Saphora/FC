using FC.Interfaces.ViewModels;
using FC.Shared.Entities;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Search
{
    public class FestivalSearchResult : BaseModel
    {

        
        public string Country
        {
            get; set;
        }

        
        public string Location { get; set; }

        
        public DateTime Date
        {
            get; set;
        }

        
        public string City { get; set; }

        public  string CultureStartDate
        {
            set { value = Date.ToString("d", CultureInfo.CurrentCulture); }
            get { return Date.ToString("d", CultureInfo.CurrentCulture); }
        }

        
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

        private string type = "festival";
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
