using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using FC.BL.Repositories;
using Newtonsoft.Json.Linq;
using FC.Shared.Entities;
using System.Web;

namespace FC.WebAPI.Controllers.API
{
    public class CountryController : BaseAPIController
    {
        private CountryRepository repo;

        public CountryController() : base()
        {
            repo = new CountryRepository();
        }

        [HttpGet]
        public ServiceResponse<List<UCountry>> GetPaged(int size, int page)
        {
            List<UCountry> result = new List<UCountry>();
            if (page > repo.GetPageCount<UCountry>("Countries", size))
            {
                throw new HttpException(404, "Page size invalid");
            }
            result = repo.GetPaged<UCountry>(size, page, "Genres");
            return new ServiceResponse<List<UCountry>>(result, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<List<UCountry>> GetSorted(string sortIndex, int page = 1)
        {
            List<UCountry> result = new List<UCountry>();
            result = repo.GetSorted<UCountry>("Countries", sortIndex, page);
            return new ServiceResponse<List<UCountry>>(result, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<List<UCountry>> Search(string name)
        {
            List<UCountry> result = new List<UCountry>();
            result = repo.Search(name);
            return new ServiceResponse<List<UCountry>>(result, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet]
        public ServiceResponse<int> GetPagedCount(string sortIndex, int page = 1)
        {
            return new ServiceResponse<int>(repo.GetPagedCount<UCountry>("Countries", page, sortIndex), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<List<Guid?>> GetAllIds()
        {
            return new ServiceResponse<List<Guid?>>(repo.GetAllIds(), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<List<UCountry>> GetAll()
        {
            return new ServiceResponse<List<UCountry>>(repo.GetAll(), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<UCountry> GetByCode(string code)
        {
            return new ServiceResponse<UCountry>(repo.GetByCode(code), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<UCountry> GetByID(Guid? id)
        {
            return new ServiceResponse<UCountry>(repo.GetByID(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<UCountry> GetByCultureName(string cultureName)
        {
            return new ServiceResponse<UCountry>(repo.GetByCultureName(cultureName), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        {
            ServiceMessage<UCountry> country = new ServiceMessage<UCountry>(payload);
            RepositoryState result = new RepositoryState();
            
            result = repo.Create(country.Data);

            return this.HandleRepositoryState(result);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Update([FromBody]JObject payload)
        {
            ServiceMessage<UCountry> country = new ServiceMessage<UCountry>(payload);
            RepositoryState result = new RepositoryState();
            result = repo.Update(country.Data);
            return this.HandleRepositoryState(result);
        }
        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Delete([FromBody]JObject payload)
        {
            ServiceMessage<UCountry> country = new ServiceMessage<UCountry>(payload);
            RepositoryState result = new RepositoryState();
            result = repo.Delete(country.Data);
            return this.HandleRepositoryState(result);
        }
        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> ForceDelete([FromBody]JObject payload)
        {
            ServiceMessage<UCountry> country = new ServiceMessage<UCountry>(payload);
            RepositoryState result = new RepositoryState();
            result = repo.ForceDelete(country.Data);
            return this.HandleRepositoryState(result);
        }
    }
}
