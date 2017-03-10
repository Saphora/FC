using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace FC.Interfaces.Umbraco
{
    public interface IUContent
    {   
        Guid UID { get; set; }
        int NodeID { get; set; }
        string XML { get; set; }
        XmlNode Data { get; set; }
    }
}
