using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using FC.Interfaces.Data;
using FC.Shared.Entities;

using FC.Shared.Helpers;
using System.Web.Http.Cors;
using FC.Shared.ViewModels.Festival;
using System.Configuration;
using System.IO;
using Newtonsoft.Json;
using System.Xml.Linq;
using FC.Shared.ServerMessages;
using Newtonsoft.Json.Linq;
using FC.BL.Repositories;
using System.Data.Entity.Validation;
using FC.Shared.Enum;
using System.Xml;
using System.Xml.Serialization;
using FC.WebAPI.Attribs;

namespace FC.WebAPI.Controllers.API
{
    /// <summary>
    /// This make it possible to provide type specific layouts.
    /// </summary>
    public enum SearchType
    {
        FestivalName,
        FestivalCountry,
        FestivalCity,
        FestivalGenre,
        FestivalDate,
        FestivalArtist,
        FestivalVisitors,
        LocalZIP

    }

    public class FestivalController : BaseAPIController
    {
        public FestivalRepository FestivalRepository { get; set; }
        public GenreRepository GenreRespository { get; set; }
        public string CacheFilePath { get; set; }
        

        CalendarHelper _CalendarHelper = new CalendarHelper();

        public FestivalController() :
            base()
        {
            FestivalRepository = new FestivalRepository();
            GenreRespository = new GenreRepository();
        }

        [HttpGet]
        public ServiceResponse<List<UFestival>> GetAll()
        {
            return new ServiceResponse<List<UFestival>>(FestivalRepository.GetAll().ToList(), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet,HttpPost,HttpOptions]
        public ServiceResponse<UFestival> GetByID(Guid? id)
        {
            return new ServiceResponse<UFestival>(FestivalRepository.GetByID(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpPost]
        public ServiceResponse<List<FestivalVM>> GetFiltered([FromBody]JObject payload)
        {
            var token = this.AuthRepo.GetHTTPToken();

            ServiceMessage<FestivalFilter> filter = new ServiceMessage<FestivalFilter>(payload);
            if (this.AuthRepo.UserID != null)
            {
                List<Favorite> genres = this.Repositories.Favorites.GetUserFavorites(this.AuthRepo.UserID, InternalContentType.Genre);
                List<Favorite> countries = this.Repositories.Favorites.GetUserFavorites(this.AuthRepo.UserID, InternalContentType.Country);
                List<Favorite> artists = this.Repositories.Favorites.GetUserFavorites(this.AuthRepo.UserID, InternalContentType.Artist);
                List<Favorite> locations = this.Repositories.Favorites.GetUserFavorites(this.AuthRepo.UserID, InternalContentType.Location);
                if (filter.Data.CountryIDs.Count == 0)
                {
                    foreach (Favorite c in countries)
                    {
                        filter.Data.CountryIDs.Add(c.ContentID);
                    }
                }
                if (filter.Data.ArtistIDs.Count == 0)
                {
                    foreach (Favorite a in artists)
                    {
                        filter.Data.ArtistIDs.Add(a.ContentID);
                    }
                }
                if (filter.Data.LocationIDs.Count == 0)
                {
                    foreach (Favorite l in locations)
                    {
                        filter.Data.LocationIDs.Add(l.ContentID);
                    }
                }
                if (filter.Data.GenreIDs.Count == 0)
                {
                    foreach (Favorite g in genres)
                    {
                        filter.Data.GenreIDs.Add(g.ContentID);
                    }
                }
            }

            List<FestivalVM> result = FestivalRepository.GetFilteredFestival(filter.Data);
            return new ServiceResponse<List<FestivalVM>>(result, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpPost]
        public ServiceResponse<List<FestivalVM>> GetByFilter([FromBody]JObject payload)
        {
            var token = this.Repositories.Auth.GetHTTPToken();
            ServiceMessage<FestivalFilter> filter = new ServiceMessage<FestivalFilter>(payload);

            if (this.Repositories.Auth.CurrentUser != null)
            {
                var favorites = this.Repositories.Favorites.GetUserFavorites(this.Repositories.Auth.CurrentUser.UserID);
                filter.Data.GenreIDs.AddRange(favorites.Where(w => w.ContentType == InternalContentType.Genre).Select(s => s.ContentID).ToList());
                filter.Data.CountryIDs.AddRange(favorites.Where(w => w.ContentType == InternalContentType.Country).Select(s => s.ContentID).ToList());
                //filter.Data.ArtistIDs.AddRange(favorites.Where(w => w.ContentType == InternalContentType.Genre).Select(s => s.ContentID).ToList());
            }

            List<FestivalVM> result = FestivalRepository.GetFilteredFestival(filter.Data);
            return new ServiceResponse<List<FestivalVM>>(result, HttpStatusCode.OK, "OK", token);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        {

            if (this.IsAuthorized(Roles.GetAllPublic()))
            {
                ServiceMessage<UFestival> festival = new ServiceMessage<UFestival>(payload);
                RepositoryState result = new RepositoryState();
                result = FestivalRepository.Create(festival.Data);
                return this.HandleRepositoryState(result);
                
            } else
            {
                return NotAuthorized();
            }
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Update([FromBody]JObject payload)
        {
            if (this.IsAuthorized(Roles.GetAllPublic()))
            {
                ServiceMessage<UFestival> festival = new ServiceMessage<UFestival>(payload);
                RepositoryState result = new RepositoryState();
                result = FestivalRepository.Update(festival.Data);
                return this.HandleRepositoryState(result);
            }
            else
            {
                return NotAuthorized();
            }
        }

        [HttpGet]
        public ServiceResponse<RepositoryState> ToggleGenre(Guid? festivalID, Guid? genreID)
        {
            if (this.IsAuthorized(Roles.GetAllPublic()))
            {
                RepositoryState result = new RepositoryState();
                result = FestivalRepository.ToggleGenre(festivalID, genreID);
                return this.HandleRepositoryState(result);
            }
            else
            {
                return NotAuthorized();
            }
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Delete([FromBody]JObject payload)
        {
            if (this.IsAuthorized(Roles.GetAdmins()))
            {
                ServiceMessage<UFestival> festival = new ServiceMessage<UFestival>(payload);
                RepositoryState result = new RepositoryState();
                result = FestivalRepository.Delete(festival.Data);
                return this.HandleRepositoryState(result);
            }
            else
            {
                return NotAuthorized();
            }
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> ForceDelete([FromBody]JObject payload)
        {
            if (this.IsAuthorized(Roles.GetAllRoot()))
            {
                ServiceMessage<UFestival> festival = new ServiceMessage<UFestival>(payload);
                RepositoryState result = new RepositoryState();
                result = FestivalRepository.ForceDelete(festival.Data);
                return this.HandleRepositoryState(result);
            }
            else
            {
                return NotAuthorized();
            }
        }
    }
}
