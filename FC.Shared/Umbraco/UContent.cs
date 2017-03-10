using FC.Interfaces.Umbraco;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace FC.Shared.Umbraco
{
    public class UContent : IUContent
    {
        public Guid UID { get; set; }
        public int NodeID { get; set; }
        public string XML { get; set; }
        public XmlNode Data { get; set; }
    }
}
