using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.EntityMapper
{
    public class UmbracoField : Attribute
    {
        protected Guid FieldID { get; set; }
        protected int NumericFieldID { get; set; }
        public string Alias { get; set; }

        public UmbracoField(Guid ID)
        {
            FieldID = ID;
        }
        public UmbracoField(Int32 ID)
        {
            NumericFieldID = ID;
        }
        public UmbracoField(string alias)
        {
            Alias = alias;
        }
    }
}