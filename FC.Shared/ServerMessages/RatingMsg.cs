using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ServerMessages
{
    public class RatingMsg
    {
        public Guid? ContentItemID { get; set; }
        public string ContentType { get; set; }
        public int CreditAmmount { get; set; }
    }
}
