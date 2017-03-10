using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.EntityMapper
{
    public enum NavigationType { Internal, External, TryAutoDetect};
    public class UmbracoNavigationProperty : Attribute
    {
        public string Key { get; set; }
        public string DataType { get; set; }
        public NavigationType Type { get; set; }
        public UmbracoNavigationProperty(string key, string umbracoDtype, NavigationType type)
        {
            Key = key;
            DataType = umbracoDtype;
            Type = type;
        }
        public UmbracoNavigationProperty(NavigationType type)
        {
            Type = type;
        }
    }
}
