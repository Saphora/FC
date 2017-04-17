
using FC.MSDAL;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedAddIsoCulture : SeedBase
    {
        public SeedAddIsoCulture(string versionID, ContentModel db) : base(versionID, db)
        {
            SeedName = "SeedAddIsoCulture";
            SeedStart();
            if (SeedCanRun)
            {
                List<Language> currentLanguages = Db.Languages.ToList();
                foreach(Language l in currentLanguages)
                {
                    if (l.TwoLetterLangName == "en")
                    {
                        l.IsoCulture = "en-US";
                    }
                    if (l.TwoLetterLangName == "nl")
                    {
                        l.IsoCulture = "nl-NL";
                    }
                    if (l.TwoLetterLangName == "de")
                    {
                        l.IsoCulture = "de-DE";
                    }
                    if (l.TwoLetterLangName == "fr")
                    {
                        l.IsoCulture = "fr-FR";
                    }
                    if (l.TwoLetterLangName == "es")
                    {
                        l.IsoCulture = "es-ES";
                    }
                    Db.Entry<Language>(l).State = System.Data.Entity.EntityState.Modified;
                   
                }
                Db.SaveChanges();
                this.SeedFinished(true);
            }
            else
            {
                SeedFinished(true);
            }
        }
    }
}
