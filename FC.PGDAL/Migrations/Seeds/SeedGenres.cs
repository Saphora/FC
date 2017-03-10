
using FC.PGDAL.PGModel;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedGenres : SeedBase
    {
        public List<UGenre> Children = new List<UGenre>();
        public SeedGenres(string versionID, ContentModel db) : base(versionID, db)
        {
            SeedFinished(true);
        }
    }
}


 //else
 //                                   {
 //                                       foreach(UGenre child in g.Children)
 //                                       {
 //                                           if (!db.Genres.Where(w => w.UmbracoID == child.UmbracoID).Any())
 //                                           {

 //                                               UGenre tmpChild = new UGenre(child);
 //                                               tmpChild.GenreID = Guid.NewGuid();
 //                                               tmpChild.ParentID = baseGenre.GenreID;
 //                                               tmpChild.Children = null;
 //                                               if (child.Theme != null)
 //                                               {
 //                                                   tmpChild.ThemeID = Db.Themes.Where(w => w.UmbracoID == child.Theme.UmbracoID).First().ThemeID;
 //                                               } else
 //                                               {
 //                                                   Guid? themeId = db.Themes.Where(w => w.Name == "Default").First().ThemeID;
 //                                                   tmpChild.ThemeID = themeId;
 //                                               }
 //                                               tmpChild.Theme = null;
 //                                               Db.Genres.Add(tmpChild);
 //                                               Db.SaveChanges();
 //                                           }
 //                                       }
 //                                   }