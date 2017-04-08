using FC.Interfaces.Data;
using FC.PGDAL.PGModel;
using FC.Shared.Entities;
using FC.Shared.Enum;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FC.BL.Repositories
{
    public class FavoriteRepository : BaseRepository
    {

        public List<Favorite> GetUserFavorites(Guid?userID, InternalContentType icType=InternalContentType.All)
        {
            var favs = new List<Favorite>();
            if (icType != InternalContentType.All)
            {
                using (var db = new PGDAL.PGModel.ContentModel())
                {
                    favs = db.Favorites.Where(w => w.UserID == userID && w.ContentType == icType).ToList();
                }

                foreach (Favorite fav in favs)
                {
                    switch (fav.ContentType)
                    {
                        case InternalContentType.Artist:
                            using (var tmpDb = new PGDAL.PGModel.ContentModel())
                            {
                                fav.Content = tmpDb.Artists.Where(w => w.ArtistID == fav.ContentID).FirstOrDefault();   
                            }
                            break;
                        case InternalContentType.Location:

                            using (var tmpDb = new PGDAL.PGModel.ContentModel())
                            {
                                fav.Content = tmpDb.Locations.Where(w => w.LocationID == fav.ContentID).FirstOrDefault();
                            }
                            break;
                        case InternalContentType.Genre:
                            using (var tmpDb = new PGDAL.PGModel.ContentModel())
                            {
                                fav.Content = tmpDb.Genres.Where(w => w.GenreID == fav.ContentID).FirstOrDefault();
                            }
                            break;
                        case InternalContentType.Country:

                            using (var tmpDb = new PGDAL.PGModel.ContentModel())
                            {
                                fav.Content = tmpDb.Countries.Where(w => w.CountryID == fav.ContentID).FirstOrDefault();
                            }
                            break;
                        case InternalContentType.Festival:
                            using (var tmpDb = new PGDAL.PGModel.ContentModel())
                            {
                                fav.Content = tmpDb.Festivals.Where(w => w.FestivalID == fav.ContentID).FirstOrDefault();
                            }
                            break;
                    }
                }
            }
            else
            {
                favs = new List<Favorite>();
                using (var db = new PGDAL.PGModel.ContentModel())
                {
                    favs = db.Favorites.Where(w => w.UserID == userID).ToList();
                }
            }
            foreach (var f in favs)
            {
                f.User = null;
            }
            
            return favs;
        }

        public int GetUserFavoritesCount(Guid? userID, InternalContentType icType)
        {
            using (var db = new ContentModel())
            {
                return db.Favorites.Where(w => w.UserID == userID && w.ContentType == icType).Count();
            }
        }

        public bool IsFavorite(Guid? contentID)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                if (Db.Favorites.Where(w => w.ContentID == contentID && w.UserID == AuthorizationRepository.Current.CurrentUser.UserID).Any())
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public RepositoryState MarkFav(Guid? contentID, InternalContentType type)
        {
            try
            {
                using (Db = new PGDAL.PGModel.ContentModel())
                {
                    string typeName = "";
                    switch (type)
                    {
                        case InternalContentType.Artist:
                            typeName = "artist";
                            break;
                        case InternalContentType.Festival:
                            typeName = "festival";
                            break;
                        case InternalContentType.Location:
                            typeName = "location";
                            break;
                        case InternalContentType.Genre:
                            typeName = "genre";
                            break;
                        case InternalContentType.Report:
                            typeName = "report";
                            break;
                        case InternalContentType.User:
                            typeName = "user";
                            break;
                        case InternalContentType.News:
                            typeName = "news";
                            break;
                        case InternalContentType.Country:
                            typeName = "country";
                            break;
                        default:
                            throw new NotImplementedException($"Type {type} not supported.");

                    }
                    Favorite fav = new Favorite { ContentID = contentID, FavID = Guid.NewGuid(), UserID = AuthorizationRepository.Current.CurrentUser.UserID, ContentType = type };
                    List<IValidationError> errors = this.Validate<Favorite>(fav);
                    if (errors.Count() == 0)
                    {
                        Db.Favorites.Add(fav);
                        Db.SaveChanges();
                        return new RepositoryState { AffectedID = fav.FavID, SUCCESS = true, MSG = $"Successfully marked {typeName} as favorite." };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot mark item as favorite. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot mark item as favorite. Please try again later.");
            }
        }

        public RepositoryState UnMarkFav(Guid? contentID)
        {
            try
            {
                using (Db = new PGDAL.PGModel.ContentModel())
                {
                    Favorite fav = Db.Favorites.Where(w => w.ContentID == contentID && w.UserID == AuthorizationRepository.Current.CurrentUser.UserID).FirstOrDefault();
                    Db.Favorites.Remove(fav);
                    Db.SaveChanges();
                    return new RepositoryState { AffectedID = fav.FavID, SUCCESS = true, MSG = $"Successfully unmarked favorite." };
                }
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot create news item. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot create news item. Please try again later.");
            }
        }
    }
}
