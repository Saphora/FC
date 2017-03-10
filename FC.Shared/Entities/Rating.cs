using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.Entities
{
    public class Rating
    {
        [Key]
        public Guid? RatingID { get; set; }
        public int CreditAmmount { get; set; }
        public Guid? ContentItemID { get; set; }
        public string Type { get; set; }
        public string IP { get; set; }
        public string Host { get; set; }
        public Guid? UserID { get; set; }
    }
}
