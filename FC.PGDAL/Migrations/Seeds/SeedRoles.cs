
using FC.PGDAL.PGModel;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedRoles : SeedBase
    {
        public SeedRoles(string versionID, ContentModel db) : base(versionID, db)
        {
            if (SeedCanRun)
            {
                SeedStart();
                Permission EndUser = Db.Permissions.Where(w => w.PermissionKey == "END_USER").FirstOrDefault();
                Role role = new Role()
                {
                    RoleID = Guid.NewGuid(),
                    Name = "END_USER",
                };
                role.Permissions.Add(EndUser);
                Db.Roles.Add(role);
                Db.SaveChanges();
                SeedFinished(true);
            }
            

        }
    }
}
