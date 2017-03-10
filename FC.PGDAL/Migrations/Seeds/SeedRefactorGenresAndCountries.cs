
using FC.PGDAL.PGModel;
using FC.Shared.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.PGDAL.Migrations.Seeds
{
    public class SeedRefactorGenres : SeedBase
    { 
        public SeedRefactorGenres(string versionID, ContentModel db) : base(versionID, db)
        {
            SeedName = "SeedRefactorGenresAndCountries";
            SeedStart();
            if (SeedCanRun)
            {
                try
                {
                    List<UGenre> CurrentGenres = Db.Genres.ToList();
                    List<UCountry> CurrentCountries = Db.Countries.ToList();

                    foreach (UGenre g in CurrentGenres)
                    {
                        switch (g.Name)
                        {
                            case "EDM":
                            case "Metal":
                            case "Reggae":
                            case "Classic":
                            case "80s/90s":
                            case "Hip Hop":
                            case "Indie":
                            case "Blues":
                            case "Rock n Roll":
                            case "Singer/Songwriter":
                            case "Jazz":
                            case "Latin":
                            case "Soul":
                                g.IsPopular = true;
                                break;
                            case "Food & Travel":
                                g.Name = "Food & Cooking";
                                g.IsPopular = true;
                                break;
                            case "Film theater":
                                g.Name = "Film/Theater";
                                g.IsPopular = true;
                                break;
                        }
                        Db.Entry<UGenre>(g).State = System.Data.Entity.EntityState.Modified;

                    }

                    foreach (UCountry c in CurrentCountries)
                    {
                        switch (c.Name)
                        {
                            case "The Netherlands":
                                c.Name = "Netherlands";
                                c.IsPopular = true;
                                break;
                            case "United Kingdom":
                            case "Belgium":
                            case "Germany":
                            case "USA":
                            case "Spain":
                            case "Croatia":
                            case "Hungary":
                            case "Poland":
                            case "Italy":
                            case "Portugal":
                            case "Austria":
                            case "Switzerland":
                            case "Australia":
                            case "Turkey":
                            case "Russia":
                            case "Ukraine":
                            case "Czech Republic":
                            case "Slovenia":
                            case "Slovakia":
                                c.IsPopular = true;
                                break;
                        }
                        Db.Entry<UCountry>(c).State = System.Data.Entity.EntityState.Modified;
                    }
                    Db.SaveChanges();
                    mapToUK();
                    removeManualFestivalGenres();
                    SeedFinished(true);
                }
                catch (DbEntityValidationException ex)
                {
                    this.HandleDbEntityValidationException(ex);
                }
            }
            else
            {
                SeedFinished(true);
            }
        }

        private void removeManualFestivalGenres()
        {
            try
            {
                List<UFestival> currentFestivals = new List<UFestival>();
                currentFestivals = Db.Festivals.ToList();
                foreach (UFestival f in currentFestivals)
                {
                    List<UGenre> festGenres = new List<UGenre>();
                    Db.G2F.RemoveRange(Db.G2F.Where(w => w.FestivalID == f.FestivalID));
                    List<UArtist> fa = Db.A2F.Where(w => w.FestivalID == f.FestivalID).Select(s => s.Artist).ToList();
                    foreach (UArtist a in fa)
                    {
                        List<UGenre> ag = Db.G2A.Where(w => w.ArtistID == a.ArtistID).Select(s => s.Genre).ToList();
                        foreach (UGenre g in ag)
                        {
                            if (!festGenres.Contains(g))
                            {
                                festGenres.Add(g);
                            }
                        }
                    }
                    foreach (UGenre g in festGenres)
                    {
                        Db.G2F.Add(new UGenre2UFestival { G2FID = Guid.NewGuid(), FestivalID = f.FestivalID, GenreID = g.GenreID });
                    }
                }
                
                Db.SaveChanges();
            } catch(DbEntityValidationException ex)
            {
                this.HandleDbEntityValidationException(ex);
            }
        }

        private void mapToUK()
        {
            try
            {
                if (Db.Countries.Where(w => w.Name == "England").Any() && Db.Countries.Where(w => w.Name == "Scotland").Any() && Db.Countries.Where(w => w.Name == "Wales").Any())
                {
                    List<UArtist> artists = new List<UArtist>();
                    List<UFestival> festivals = new List<UFestival>();
                    artists.AddRange(Db.Artists.Where(w => w.Country.Name == "England"));
                    festivals.AddRange(Db.Festivals.Where(w => w.Country.Name == "England"));
                    artists.AddRange(Db.Artists.Where(w => w.Country.Name == "Scotland"));
                    festivals.AddRange(Db.Festivals.Where(w => w.Country.Name == "Scotland"));
                    artists.AddRange(Db.Artists.Where(w => w.Country.Name == "Wales"));
                    festivals.AddRange(Db.Festivals.Where(w => w.Country.Name == "Wales"));
                    foreach (UArtist a in artists)
                    {
                        a.CountryID = Db.Countries.Where(w => w.Name == "United Kingdom").FirstOrDefault().CountryID;
                        a.ModifiedDate = DateTime.Now;
                        Db.Entry<UArtist>(a).State = System.Data.Entity.EntityState.Modified;
                    }
                    foreach (UFestival f in festivals)
                    {
                        f.CountryID = Db.Countries.Where(w => w.Name == "United Kingdom").FirstOrDefault().CountryID;
                        f.ModifiedDate = DateTime.Now;
                        Db.Entry<UFestival>(f).State = System.Data.Entity.EntityState.Modified;
                    }
                    Db.Countries.Remove(Db.Countries.Where(w => w.Name == "England").FirstOrDefault());
                    Db.Countries.Remove(Db.Countries.Where(w => w.Name == "Scotland").FirstOrDefault());
                    Db.Countries.Remove(Db.Countries.Where(w => w.Name == "Wales").FirstOrDefault());
                    Db.SaveChanges();
                }
            }
            catch (DbEntityValidationException ex)
            {
                this.HandleDbEntityValidationException(ex);
            }
        }
    }
}
