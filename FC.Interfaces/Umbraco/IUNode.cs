using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.Umbraco
{
    public interface IUNode
    {
        int NodeID { get; set; }
        bool Trashed { get; set; }
        int ParentID { get; set; }
        int NodeUser { get; set; }
        int Level { get; set; }
        string Path { get; set; }
        int UNodeSortOrder { get; set; }
        Guid UNodeUID { get; set; }
        string Text { get; set; }
        Guid NodeObjectType { get; set; }
        DateTime CreatedDate { get; set; }
    }
}
