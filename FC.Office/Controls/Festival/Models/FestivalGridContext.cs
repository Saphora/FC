using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Festival.Models
{
    public class FestivalGridContext
    {

        public FestivalGridContext()
        {
            this.Model = new UFestival();
            this.Festivals = new List<UFestival>();
        }
        public UFestival Model { get; set; }
        public List<UFestival> Festivals { get; set; }
    }
}
