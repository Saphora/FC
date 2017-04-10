using FC.BL.Repositories;
using FC.Shared.Entities;
using FC.Shared.Enum;
using FC.WebAPI.Attribs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FC.WebAPI.Controllers.API
{
    public class FavoriteController : BaseAPIController
    {
        [HttpGet]
        public ServiceResponse<RepositoryState> Mark(Guid? contentID, InternalContentType type)
        {
            if (this.IsAuthorized(Roles.GetAll(), true))
            {
                return this.HandleRepositoryState(this.Repositories.Favorites.MarkFav(contentID, type));
            }
            else
            {
                return this.NotAuthorized();
            }
        }

        [HttpGet]
        public ServiceResponse<List<Favorite>> GetUserFavorites(Guid? userID, InternalContentType icType)
        {
            return new ServiceResponse<List<Favorite>>(this.Repositories.Favorites.GetUserFavorites(userID, icType), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<int> GetUserFavoritesCount(Guid? userID, InternalContentType icType)
        {
            return new ServiceResponse<int>(this.Repositories.Favorites.GetUserFavoritesCount(userID, icType), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<bool> IsFavorite(Guid? contentID)
        {
            if (this.IsAuthorized(Roles.GetAll(), false))
            {
                return new ServiceResponse<bool>(this.Repositories.Favorites.IsFavorite(contentID), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
            }
            else
            {
                return new ServiceResponse<bool>(false, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
            }
        }

        [HttpGet]
        public ServiceResponse<RepositoryState> Unmark(Guid? contentID)
        {
            if (this.IsAuthorized(Roles.GetAll(), true))
            {
                return this.HandleRepositoryState(this.Repositories.Favorites.UnMarkFav(contentID));
            }
            else
            {
                return this.NotAuthorized();
            }
        }

        [HttpGet]
        public ServiceResponse<RepositoryState> RemoveUserFavorites(Guid? userID)
        {
            if (this.Repositories.Auth.ActionAuthorized(Roles.GetAll(), userID))
            {
                return this.HandleRepositoryState(this.Repositories.Favorites.RemoveUserFavorites());
            }
            else
            {
                return this.NotAuthorized();
            }
        }
    }
}
