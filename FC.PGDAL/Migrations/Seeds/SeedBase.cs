using FC.PGDAL.PGModel;

using FC.Shared.Entities;
using FC.Shared.EntityMapper;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace FC.PGDAL.Migrations.Seeds
{
    public abstract class SeedBase
    {
        public Guid SeedVersionID { get; set; }
        public ContentModel Db { get; set; }
        public bool SeedCanRun { get; set; }
        public string SeedName { get; set; }
        public void SeedStart()
        {
            Console.WriteLine(string.Format("Running seed {0} on {1}",SeedName, DateTime.Now.Ticks));
        }
        public void Truncate()
        {
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "SeedVersions"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UArtist2UFestival"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UGenre2UArtist"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UGenre2UFestival"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UBanners"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UNews"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UArtists"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UFestivals"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UVisibilities"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UAnnouncements"));

            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UCustomers"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UCountries"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UGenres"));
            //Db.Database.ExecuteSqlCommand(string.Format("DELETE FROM \"dbo\".\"{0}\"", "UThemes"));
        }

        public SeedBase(string SeedVersion, ContentModel db)
        {
            //IMPORTANT: REMOVE Guid.NewGuid() from seed version ID and change it to Guid.Parse(SeedVersion);
            SeedVersionID = Guid.Parse(SeedVersion);
            Db = db;
            if (Db.SeedVersions.Find(SeedVersionID) == null)
            {
                SeedCanRun = true;
            } else
            {
                SeedCanRun = false;
            }
        }
        public void SeedFinished(bool success)
        {
            if(success)
            {
                if (Db.SeedVersions.Find(SeedVersionID) == null)
                {
                    Db.SeedVersions.Add(new SeedVersion { SeedVersionID = SeedVersionID });
                    Db.SaveChanges();
                }


                Console.WriteLine(string.Format("Finished seed {0} on {1}, SeedKey: {2};", SeedName, DateTime.Now.Ticks, SeedVersionID.ToString()));
            } else
            {
                Console.WriteLine(string.Format("Finished with errors seed {0} on {1}, SeedKey: {2};", SeedName, DateTime.Now.Ticks, SeedVersionID.ToString()));
            }
        }
        public string GetNameOrTitle(object entity) {
            if(entity.GetType().GetProperty("Title") != null)
            {
                return entity.GetType().GetProperty("Title").GetValue(entity).ToString();
            } else if(entity.GetType().GetProperty("Name") != null)
            {
                return entity.GetType().GetProperty("Name").GetValue(entity).ToString();
            } else
            {
                return Newtonsoft.Json.Linq.JObject.FromObject(entity).ToString();
            }
        }

        public void HandleDbEntityValidationException(System.Data.Entity.Validation.DbEntityValidationException ex)
        {
            using (Db = new ContentModel())
            {
                Db.GenericMessages.Add(new GenericMessage(ex, "Data seed error.", GenericMessageStatus.DBError));
                Db.SaveChanges();
            }
        }
    }
}
