using FC.BL.Repositories;
using FC.Office.Shared;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Festival.Models
{
    public class FestivalContext : VMBase
    {
        public FestivalRepository frepo = new FestivalRepository();
        public CountryRepository crepo = new CountryRepository();
        public LocationRepository lrepo = new LocationRepository();
        public UCountry ActiveCountry { get; set; }
        public UFestival Model { get; set; }

        public List<string> SysVisitors { get; set; }
        public FestivalContext()
        {
        //    SysVisitors = new List<string>();
        //    SysVisitors.Add("Select visitor range");
        //    SysVisitors.Add("100 - 500");
        //    SysVisitors.Add("500 - 1K");
        //    SysVisitors.Add("1K - 5K");
        //    SysVisitors.Add("5K - 10K");
        //    SysVisitors.Add("10K - 50K");
        //    SysVisitors.Add("50K - 100K");
        //    SysVisitors.Add("100K+");
            SysCountries = new List<UCountry>();
            UCountry nl = crepo.GetByCode("nl");
            UCountry be = crepo.GetByCode("be");
            UCountry de = crepo.GetByCode("de");
            UCountry usa = crepo.GetByCode("us");
            UCountry uk = crepo.GetByCode("gb");
            SysCountries.Add(nl);
            SysCountries.Add(be);
            SysCountries.Add(de);
            SysCountries.Add(usa);
            SysCountries.Add(uk);
            SysCountries.AddRange(crepo.GetAll().Where(w => w != nl && w != be && w != de && w != usa && w != uk).OrderBy(o => o.Name));
           
        }

        public void SetSysLocations(Guid? countryID)
        {
            SysLocations = lrepo.GetByCountryID(countryID);
        }

        public List<Location> SysLocations { get; set; }
        public List<UCountry> SysCountries { get; set; }
    }
}
