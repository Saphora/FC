using FC.Interfaces.Umbraco;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Umbraco
{
    public class UPropertyData : IUPropertyData
    {
        public int PropertyDataID { get; set; }
        public int ContentNodeID { get; set; }
        public Guid VersionID { get; set; }
        public int PropertyTypeID { get; set; }
        public int DataInt { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime DataDate { get; set; }
        public string DataNvarchar { get; set; }
        public string DataNtext { get; set; }
        public IUPropertyType PropertyType { get; set; }
    }
}
