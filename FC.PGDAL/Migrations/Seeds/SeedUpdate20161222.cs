
using FC.PGDAL.PGModel;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedUpdate20161222:SeedBase
    {
        public SeedUpdate20161222(string versionID, ContentModel db) : base(versionID, db)
        {
            if (SeedCanRun)
            {
                Role role19 = new Role();
                role19.Name = "Owner";
                role19.RoleID = Guid.NewGuid();
                role19.Permissions = new List<Permission>();
                Db.Roles.Add(role19);
                this.SeedFinished(true);
            }
        }
    }
}
