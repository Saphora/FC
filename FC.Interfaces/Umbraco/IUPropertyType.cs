using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.Umbraco
{
    public interface IUPropertyType
    {
        int PropertyTypeID { get; set; }
        int DataTypeID { get; set; }
        int ContentTypeID { get; set; }
        int PropertyTypeGroupID { get; set; }
        string Alias { get; set; }
        string Name { get; set; }
        int PropertyTypeSortOrder { get; set; }
        bool Mandatory { get; set; }
        string ValidationRegExp { get; set; }
        string Description { get; set; }
        Guid PropertyTypeUID { get; set; }
    }
}
