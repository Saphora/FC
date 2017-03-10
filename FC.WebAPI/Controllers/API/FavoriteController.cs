using FC.BL.Repositories;
using FC.Shared.Entities;
using FC.Shared.Enum;
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
            if (this.IsAuthorized(Roles.GetAll()))
            {
                return this.HandleRepositoryState(this.Repositories.Favorites.MarkFav(contentID, type));
            }
            else
            {
                return this.NotAuthorized();
            }
        }
        [HttpGet]
        public ServiceResponse<List<Favorite>> GetUserFavorites()
        {
            if (this.IsAuthorized(Roles.GetAll()))
            {   
                return new ServiceResponse<List<Favorite>>(this.Repositories.Favorites.GetUserFavorites(), HttpStatusCode.OK, "OK");
            } else
            {
                return new ServiceResponse<List<Favorite>>(new List<Favorite>(), HttpStatusCode.OK, "OK");
            }
        }

        [HttpGet]
        public ServiceResponse<bool> IsFavorite(Guid? contentID)
        {
            if (this.IsAuthorized(Roles.GetAll()))
            {
                return new ServiceResponse<bool>(this.Repositories.Favorites.IsFavorite(contentID), HttpStatusCode.OK, "OK");
            }
            else
            {
                return new ServiceResponse<bool>(false, HttpStatusCode.OK, "OK");
            }
        }

        [HttpGet]
        public ServiceResponse<RepositoryState> Unmark(Guid? contentID)
        {
            if (this.IsAuthorized(Roles.GetAll()))
            {
                return this.HandleRepositoryState(this.Repositories.Favorites.UnMarkFav(contentID));
            }
            else
            {
                return this.NotAuthorized();
            }
        }
    }
}
