using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Helpers
{
    public class PGHelper
    {
        public static T Fetch<T>(string key, IDataRecord _record)
        {
            if (_record[key] == null)
            {
                return Activator.CreateInstance<T>();
            }
            else
            {
                return (T)_record[key];
            }
        }
    }
}
