using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using System.Web;
using FC.Shared.Entities;
using FC.BL.Repositories;
using Newtonsoft.Json.Linq;
using System.Linq;
using FC.Shared.Enum;
using System.Data.Entity.Validation;

namespace FC.WebAPI.Controllers.API
{
    public class LocationController : BaseAPIController
    {
        LocationRepository repo = new LocationRepository();
        public LocationController() : base()
        {}

        [HttpGet]
        public ServiceResponse<List<Location>> GetPaged(int size, int page)
        {
            List<Location> result = new List<Location>();
            if (page > repo.GetPageCount(size))
            {
                throw new HttpException(404, "Page size invalid");
            }
            result = repo.GetPaged(size, page);
            return new ServiceResponse<List<Location>>(result, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<List<Location>> GetSorted(string countryID, string sortIndex, int page = 1)
        {
            if (!string.IsNullOrEmpty(countryID))
            {

                Guid? countryIDGuid = Guid.Parse(countryID);
                List<Location> result = new List<Location>();
                result = repo.GetSorted(countryIDGuid, sortIndex, page);
                return new ServiceResponse<List<Location>>(result, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
            } else
            {
                List<Location> result = new List<Location>();
                result = repo.GetSorted(null, sortIndex, page);
                return new ServiceResponse<List<Location>>(result, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
            }
        }
        
        [HttpGet]
        public ServiceResponse<int> GetPagedCount(string countryID, string sortIndex, int page = 1)
        {
            if(!string.IsNullOrEmpty(countryID))
            {
                Guid? countryIDGuid = Guid.Parse(countryID);
                return new ServiceResponse<int>(repo.GetPagedCount(countryIDGuid, page, sortIndex), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
            } else
            {

                return new ServiceResponse<int>(repo.GetPagedCount(null, page, sortIndex), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
            }
        }

        [HttpGet]
        public ServiceResponse<List<Location>> GetByCountry(Guid? countryID)
        {
            LocationRepository repo = new LocationRepository();
            List<Location> locations = repo.GetByCountryID(countryID);
            return new ServiceResponse<List<Location>>(locations, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<Location> GetByID(Guid? id)
        {
            return new ServiceResponse<Location>(repo.GetByID(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }


        [HttpOptions, HttpPost]
        public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        {
            if (this.IsAuthorized(Roles.GetAdmins()))
            {
                ServiceMessage<Location> msg = new ServiceMessage<Location>(payload);
                Location l = msg.Data;
                RepositoryState state = repo.Create(l);
                return this.HandleRepositoryState(state);
            }
            else
            {
                return this.NotAuthorized();
            }
        }

        [HttpOptions, HttpPost]
        public ServiceResponse<RepositoryState> Update([FromBody]JObject payload)
        {
            if (this.IsAuthorized(Roles.GetAdmins()))
            {
                ServiceMessage<Location> msg = new ServiceMessage<Location>(payload);
                Location l = msg.Data;
                RepositoryState state = repo.Update(l);
                return this.HandleRepositoryState(state);
            }
            else
            {
                return this.NotAuthorized();
            }
        }

        [HttpOptions, HttpPost]
        public ServiceResponse<RepositoryState> Delete([FromBody]JObject payload)
        {
            if (this.IsAuthorized(Roles.GetAdmins()))
            {
                ServiceMessage<Location> msg = new ServiceMessage<Location>(payload);
                Location l = msg.Data;
                RepositoryState state = repo.Delete(l);
                return this.HandleRepositoryState(state);
            }
            else
            {
                return this.NotAuthorized();
            }
        }

        [HttpOptions, HttpPost]
        public ServiceResponse<RepositoryState> ForceDelete([FromBody]JObject payload)
        {
            if (this.IsAuthorized(Roles.GetAdmins()))
            {
                ServiceMessage<Location> msg = new ServiceMessage<Location>(payload);
                Location l = msg.Data;
                RepositoryState state = repo.ForceDelete(l);
                return this.HandleRepositoryState(state);
            }
            else
            {
                return this.NotAuthorized();
            }
        }
    }
}
