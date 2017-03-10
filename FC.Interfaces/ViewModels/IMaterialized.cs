using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Interfaces.ViewModels
{
    public interface IMaterialized
    {
        object Create(IDataRecord record);
    }
}
