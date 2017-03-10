using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.Umbraco
{
    public interface IUPropertyData
    {
        int PropertyDataID { get; set; }
        int ContentNodeID { get; set; }
        Guid VersionID { get; set; }
        int PropertyTypeID { get; set; }
        int DataInt { get; set; }
        DateTime DataDate { get; set; }
        string DataNvarchar { get; set; }
        string DataNtext { get; set; }

        IUPropertyType PropertyType { get; set; }
    }
}
