using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class GenreFilter
    {
        public Guid? GenreID { get; set; }
        public Guid? ParentID { get; set; }
        public string Name { get; set; }

    }
}
