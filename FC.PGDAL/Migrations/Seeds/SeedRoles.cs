
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
                Db.Roles.Add(new Role()
                {
                    RoleID = Guid.NewGuid(),
                    Name = "Advertiser",
                });

                Db.Roles.Add(new Role()
                {
                    RoleID = Guid.NewGuid(),
                    Name = "Festival",
                });

                Db.Roles.Add(new Role()
                {
                    RoleID = Guid.NewGuid(),
                    Name = "Venue",
                });

                Db.Roles.Add(new Role()
                {
                    RoleID = Guid.NewGuid(),
                    Name = "Artist",
                });

                Db.Roles.Add(new Role()
                {
                    RoleID = Guid.NewGuid(),
                    Name = "Retailer",
                });

                Db.Roles.Add(new Role()
                {
                    RoleID = Guid.NewGuid(),
                    Name = "TravelAgent",
                });

                Db.SaveChanges();
                SeedFinished(true);
            }
            

        }
    }
}
