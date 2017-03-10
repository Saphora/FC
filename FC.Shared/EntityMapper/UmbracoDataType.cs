using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.EntityMapper
{
    public class UmbracoDataType : Attribute
    {
        public Guid DTypeID { get; set; }
        public int NumericID { get; set; }

        public string Alias { get; set; } 
        public UmbracoDataType(Guid ID)
        {
            DTypeID = ID;
        }

        public UmbracoDataType(Int32 ID)
        {
            NumericID = ID;
        }
        public UmbracoDataType(string alias)
        {
            Alias = alias;
        }
    }
}