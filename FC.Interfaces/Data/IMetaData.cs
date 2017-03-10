using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.Data
{
    public interface IMetaData
    {
        string MetaKeys { get; set; }
        string MetaDescription { get; set; }
        string MetaTitle { get; set; }
    }
}
