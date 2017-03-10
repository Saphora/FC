using FC.Interfaces.Data;
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

        public List<Favorite> GetUserFavorites()
        {
            return this.Db.Favorites.Where(w => w.UserID == AuthorizationRepository.Current.CurrentUser.UserID).ToList();
        }

        public bool IsFavorite(Guid? contentID)
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

        public RepositoryState MarkFav(Guid? contentID, InternalContentType type)
        {
            try
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
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot create news item. Please try again later.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot create news item. Please try again later.");
            }
        }

        public RepositoryState UnMarkFav(Guid? contentID)
        {
            try
            {
                Favorite fav = Db.Favorites.Where(w => w.ContentID == contentID && w.UserID == AuthorizationRepository.Current.CurrentUser.UserID).FirstOrDefault();
                Db.Favorites.Remove(fav);
                Db.SaveChanges();
                return new RepositoryState { AffectedID = fav.FavID, SUCCESS = true, MSG = $"Successfully unmarked favorite." };
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
