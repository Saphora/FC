using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace FC.Interfaces.Data
{
    public interface IDataHelper
    {
        T FetchXElementValue<T>(XElement node, string name);
        T FetchXNodeAttribValue<T>(XElement node, string name);

        T GetTypedValue<T>(string value);

        object SetSafeValue(PropertyInfo info, object value, object obj);
    }
}
