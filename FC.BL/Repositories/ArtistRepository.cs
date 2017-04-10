using FC.BL.Validation;
using FC.Interfaces.Data;
using FC.PGDAL.PGModel;
using FC.Shared.Entities;
using FC.Shared.ViewModels.Artist;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Validation;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Repositories
{
    public class ArtistRepository : BaseRepository
    {
        public ArtistRepository() : base()
        { }


        public UArtist GetByID(Guid? id)
        {
            UArtist a;

            using (Db = new PGDAL.PGModel.ContentModel())
            {
                a = Db.Artists.Find(id);
                if (a != null)
                {
                    a.Genres = Db.G2A.Where(w => w.ArtistID == id).Select(s => s.Genre).OrderBy(o => o.Name).ToList();
                    return a;
                }
            }
            return null;

        }

        public IQueryable<UArtist> GetAll()
        {
            return Db.Artists.Where(w=>w.IsDeleted == false).OrderBy(o => o.Name);
        }
     
        public List<UArtist> Search(string name)
        {
            name = name.ToLower();
            return Db.Artists.Where(w => w.Name.ToLower().Contains(name)).OrderBy(o => o.Name).ToList();
        }

        public RepositoryState Create(UArtist artist)
        {

            using (Db = new PGDAL.PGModel.ContentModel())
            {
                if (!Db.Artists.Where(w => w.Name == artist.Name && w.IsDeleted == false).Any())
                {
                    try
                    {
                        artist.ArtistID = Guid.NewGuid();
                        artist.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                        artist.IsPublished = false;
                        artist.Created = DateTime.Now;

                        foreach (UGenre g in artist.Genres)
                        {
                            Db.G2A.Add(new UGenre2UArtist { G2AID = Guid.NewGuid(), ArtistID = artist.ArtistID, GenreID = g.GenreID });
                        }
                        foreach (SocialProfile p in artist.SocialProfiles)
                        {
                            p.GenericID = artist.ArtistID;
                            p.ContentType = Shared.Enum.SocialMediaBindableType.Artist;
                            Db.SocialProfiles.Add(p);
                        }
                        List<IValidationError> errors = this.Validate<UArtist>(artist);
                        if (errors.Count() == 0)
                        {
                            artist.Genres = null;
                            Db.Artists.Add(artist);
                            Db.SaveChanges();
                            return new RepositoryState { AffectedID = artist.ArtistID, SUCCESS = true, MSG = $"Artist {artist.Name} successfully created." };
                        }
                        else
                        {
                            return this.HandleValidationErrors(errors);
                        }
                    }
                    catch (DbEntityValidationException ex)
                    {
                        return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
                    }
                    catch (Exception ex)
                    {
                        return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
                    }
                }
                else
                {
                    return new RepositoryState { EXISTS = true, MSG = $"Artist {artist.Name} already exists." };
                }
            }
        }

        public RepositoryState Update(UArtist d)
        {

            using (Db = new PGDAL.PGModel.ContentModel())
            {
                try
                {

                    UArtist a = Db.Artists.Find(d.ArtistID);
                    a.AuthorID = AuthorizationRepository.Current.CurrentUser.UserID;
                    a.CountryID = d.CountryID;
                    a.DeezerURL = d.DeezerURL;
                    a.IsDeleted = false;
                    a.Description = d.Description;
                    a.DetailText = d.DetailText;
                    a.FacebookURL = d.FacebookURL;
                    a.LogoID = d.LogoID;
                    a.ProfileImageID = d.ProfileImageID;
                    a.InstagramURL = d.InstagramURL;
                    a.IsPublished = false;
                    a.MetaDescription = d.MetaDescription;
                    a.MetaKeys = d.MetaKeys;
                    a.MyspaceURL = d.MyspaceURL;
                    a.ModifiedDate = DateTime.Now;
                    a.Name = d.Name;
                    a.OrderDate = DateTime.Now.Ticks;
                    a.SoundcloudURL = d.SoundcloudURL;
                    a.SpotifyURL = d.SpotifyURL;
                    a.ShortText = d.ShortText;
                    a.TwitterURL = d.TwitterURL;
                    a.Website = d.Website;
                    a.URL = "/Artist/" + d.Name;
                    List<IValidationError> errors = this.Validate<UArtist>(a);
                    if (errors.Count() == 0)
                    {

                        if (a.SocialProfiles != null)
                        {
                            Db.SocialProfiles.RemoveRange(Db.SocialProfiles.Where(w => w.GenericID == a.ArtistID));
                            foreach (SocialProfile p in a.SocialProfiles)
                            {
                                p.GenericID = a.ArtistID;
                                p.ContentType = Shared.Enum.SocialMediaBindableType.Artist;
                                Db.SocialProfiles.Add(p);
                            }
                        }
                        if (d.Genres != null && d.Genres.Count > 0)
                        {
                            Db.G2A.RemoveRange(Db.G2A.Where(w => w.ArtistID == d.ArtistID));

                            foreach (UGenre g in d.Genres)
                            {
                                Db.G2A.Add(new UGenre2UArtist { GenreID = g.GenreID, ArtistID = a.ArtistID, G2AID = Guid.NewGuid() });
                            }
                            a.Genres = null;
                        }


                        Db.Entry<UArtist>(a).State = System.Data.Entity.EntityState.Modified;
                        Db.SaveChanges();
                        return new RepositoryState() { AffectedID = a.ArtistID, SUCCESS = true, MSG = $"Artist {d.Name} successfully updated." };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
                catch (DbEntityValidationException ex)
                {
                    return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
                }
                catch (Exception ex)
                {
                    return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
                }
            }
        }

        public RepositoryState Delete(UArtist artist)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                try
                {
                    UArtist a = Db.Artists.Find(artist.ArtistID);
                    a.IsDeleted = true;
                    a.ArchiveDate = DateTime.Now.AddDays(180);
                    Db.Entry<UArtist>(a).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = a.ArtistID, SUCCESS = true, MSG = $"Artist {a.Name} successfully deleted." };
                }
                catch (DbEntityValidationException ex)
                {
                    return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
                }
                catch (Exception ex)
                {
                    return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
                }
            }
        }

        public RepositoryState ForceDelete(UArtist artist)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                try
                {
                    Db.G2A.RemoveRange(Db.G2A.Where(w => w.ArtistID == artist.ArtistID));
                    Db.A2F.RemoveRange(Db.A2F.Where(w => w.ArtistID == artist.ArtistID));
                    UArtist a = Db.Artists.Find(artist.ArtistID);
                    Db.Artists.Remove(a);
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = a.ArtistID, SUCCESS = true, MSG = $"Artist {a.Name} successfully deleted with force." };
                }
                catch (DbEntityValidationException ex)
                {
                    return new RepositoryState() { ValidationEx = ex, DBERROR = true, MSG = "Internal server error. Please try again later." };
                }
                catch (Exception ex)
                {
                    return new RepositoryState() { Exception = ex, ERROR = true, MSG = "Internal server error. Please try again later." };
                }
            }
        }
    }
}
