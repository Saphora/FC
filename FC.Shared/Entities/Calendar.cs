using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Calendar : BaseModel
    {
        public virtual int Month { get; set; }
        public virtual int Year { get; set; }
        public virtual List<UFestival> Festivals {get;set;}
    }
}
