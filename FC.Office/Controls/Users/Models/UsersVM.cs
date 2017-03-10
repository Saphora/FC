using FC.BL.Repositories;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.Office.Controls.Users.Models
{
    public class UsersVM
    {
        public List<ApplicationUser> Users { get; set; }
        public ApplicationUser Model { get; set; }

        public List<UCountry> SysCountries { get; set; }
        public RepositoryContext repositories { get; set; }



        public UsersVM()
        {
            this.repositories = RepositoryContext.GetInstance();
            this.Model = new ApplicationUser();
            this.Users = new List<ApplicationUser>();
            SysCountries = new List<UCountry>();
            UCountry nl = repositories.Countries.GetByCode("nl");
            UCountry be = repositories.Countries.GetByCode("be");
            UCountry de = repositories.Countries.GetByCode("de");
            UCountry usa = repositories.Countries.GetByCode("us");
            UCountry uk = repositories.Countries.GetByCode("gb");
            SysCountries.Add(nl);
            SysCountries.Add(be);
            SysCountries.Add(de);
            SysCountries.Add(usa);
            SysCountries.Add(uk);
            SysCountries.AddRange(repositories.Countries.GetAll().Where(w => w != nl && w != be && w != de && w != usa && w != uk).OrderBy(o => o.Name));
        }
    }
}
