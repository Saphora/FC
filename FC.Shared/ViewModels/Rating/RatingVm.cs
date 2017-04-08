using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Shared.ViewModels.Rating
{
    public class RatingVm
    {
        public Guid? ContentItemID { get; set; }
        public int StarCount { get; set; }
        public int Counter { get; set; }
        public bool Star1Active { get { return (StarCount == 1 || StarCount > 1 ? true : false); } }
        public bool Star2Active { get { return (StarCount == 2 || StarCount > 2 ? true : false); } }
        public bool Star3Active { get { return (StarCount == 3 || StarCount > 3 ? true : false); } }
        public bool Star4Active { get { return (StarCount == 4 || StarCount > 4 ? true : false); } }
        public bool Star5Active { get { return (StarCount > 4 || StarCount == 5 || StarCount > 5 ? true : false); } }

        public string DisplayCount
        {
            get
            {
                if(Counter > 1000 && Counter <= 999999)
                {
                    if (Counter < 100000)
                    {
                        return new Decimal((float)Counter / (float)1000).ToString("#.#") + "K";
                    } else
                    {
                        return new Decimal((float)Counter / (float)1000).ToString() + "K";
                    }
                } else if(Counter > 999999 && Counter < 9999999) { 
                    return new Decimal((float)Counter / (float)1000000).ToString("#.#") + "M";
                } else
                {
                    return new Decimal(Counter).ToString();
                }
            }
        }
    }
}
