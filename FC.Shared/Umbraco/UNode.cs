using FC.Interfaces.Umbraco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Umbraco
{
    public class UNode : IUNode
    {
        public int NodeID { get; set; }
        public bool Trashed { get; set; }
        public int ParentID { get; set; }
        public int NodeUser { get; set; }
        public int Level { get; set; }
        public string Path { get; set; }
        public int UNodeSortOrder { get; set; }
        public Guid UNodeUID { get; set; }
        public string Text { get; set; }
        public Guid NodeObjectType { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
