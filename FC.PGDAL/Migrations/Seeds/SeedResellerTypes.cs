
using FC.PGDAL.PGModel;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedResellerTypes : SeedBase
    {
        //Guid.Parse("AE10EDB2-2942-421E-A381-33C573C0D99A");
        public SeedResellerTypes(string versionID, ContentModel db) : base(versionID, db)
        {
            try
            {
                Db.ResellerTypes.Add(new Shared.Entities.ResellerType
                {
                    ResellerTypeID = Guid.Parse("AE10EDB2-2942-421E-A381-33C573C0D99A"),
                    Name = "All",
                    Description = "This covers all of the branches.",
                    AuthorID = Guid.Parse("BD808F49-DEE0-4EC4-9024-DEC2A716948A"),
                    Created = DateTime.Now
                });
                Db.SaveChanges();
                SeedFinished(true);
                
            }
            catch (DbEntityValidationException ex)
            {
                this.HandleDbEntityValidationException(ex);
                throw ex;
            }
        }
    }
}
