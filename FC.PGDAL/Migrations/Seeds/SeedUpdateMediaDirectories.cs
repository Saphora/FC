
using FC.MSDAL;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedUpdateMediaDirectories : SeedBase
    {
        public SeedUpdateMediaDirectories(string versionID, ContentModel db) : base(versionID, db)
        {
            if (this.SeedCanRun)
            {
                Db.MediaDirectories.Add(new MediaDirectory { DirectoryID = Guid.Parse("CE18DC4F-2F58-4DC0-8AF8-C6DA53601904"), Name = "Locations", ParentID = Guid.Parse("710FE0A0-8894-40DB-8D7D-2FCBD7BA14CF"), AuthorID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A"), Created = DateTime.Now });
                Db.SaveChanges();
                this.SeedFinished(true);
            }
        }

    }
}
