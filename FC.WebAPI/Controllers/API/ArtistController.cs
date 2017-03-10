using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using System.Web;
using FC.Shared.Entities;
using FC.BL.Repositories;
using Newtonsoft.Json.Linq;
using System.Linq;
using FC.Shared.ViewModels.Artist;
using FC.Shared.Enum;
using System.Data.Entity.Validation;

namespace FC.WebAPI.Controllers.API
{
    public class ArtistController : BaseAPIController
    {
        
        private ArtistRepository repo;
        public ArtistController() : base()
        {
            CTX = this.ControllerContext;
            repo = new ArtistRepository();
        }

        [HttpGet]
        public ServiceResponse<List<ArtistListVm>> GetPaged(int size, int page)
        {
            List<ArtistListVm> result = new List<ArtistListVm>();
            if (page > repo.GetPageCount(size))
            {
                throw new HttpException(404, "Page size invalid");
            }
            result = repo.GetPaged(size, page);
            return new ServiceResponse<List<ArtistListVm>>(result, HttpStatusCode.OK, "OK");
        }

        [HttpGet]
        public ServiceResponse<List<MaterializedArtistListVM>> GetSorted(string sortIndex, int page=1)
        {
            List<MaterializedArtistListVM> result = new List<MaterializedArtistListVM>();
            result = repo.GetSorted(sortIndex, page);
            return new ServiceResponse<List<MaterializedArtistListVM>>(result, HttpStatusCode.OK, "OK");
        }



        [HttpGet]
        public ServiceResponse<int> GetPagedCount(string sortIndex, int page = 1)
        {
            return new ServiceResponse<int>(repo.GetPagedCount(page, sortIndex), HttpStatusCode.OK, "OK");
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<List<UArtist>> GetAll()
        {
            return new ServiceResponse<List<UArtist>>(repo.GetAll().Take(50).ToList(), HttpStatusCode.OK, "OK");
        }

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<List<ArtistListVm>> GetByPartialName(string name)
        //{
        //    return new ServiceResponse<List<ArtistListVm>>(repo.GetByPartialName(name), HttpStatusCode.OK, "OK");
        //}

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<UArtist> GetByID(Guid? id)
        {
            return new ServiceResponse<UArtist>(repo.GetByID(id), HttpStatusCode.OK, "OK");
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        {
            if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins()))
            {
                ServiceMessage<UArtist> artist = new ServiceMessage<UArtist>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.Create(artist.Data);
                return this.HandleRepositoryState(result);
            }
            else
            {
                return NotAuthorized();
            }
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Update([FromBody]JObject payload)
        {
            if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins()))
            {
                ServiceMessage<UArtist> artist = new ServiceMessage<UArtist>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.Update(artist.Data);
                return this.HandleRepositoryState(result);
            } else
            {
                return NotAuthorized();
            }
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Delete([FromBody]JObject payload)
        {
            if (IsAuthorized(Roles.GetAdmins()))
            {
                ServiceMessage<UArtist> artist = new ServiceMessage<UArtist>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.Delete(artist.Data);
                return this.HandleRepositoryState(result);
            } else
            {
                return NotAuthorized();
            }
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> ForceDelete([FromBody]JObject payload)
        {
            if (IsAuthorized(Roles.GetAllRoot()))
            {
                ServiceMessage<UArtist> artist = new ServiceMessage<UArtist>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.ForceDelete(artist.Data);
                return this.HandleRepositoryState(result);

            } else
            {
                return NotAuthorized();
            }
        }

    }
}
