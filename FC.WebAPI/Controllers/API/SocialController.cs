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
using FC.Shared.ServerMessages;

namespace FC.WebAPI.Controllers.API
{
    public class SocialController : BaseAPIController
    {
        
        private SocialRepository repo;
        public SocialController() : base()
        {
            CTX = this.ControllerContext;
            repo = new SocialRepository();
        }

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<List<SocialListVm>> GetByPartialName(string name)
        //{
        //    return new ServiceResponse<List<SocialListVm>>(repo.GetByPartialName(name), HttpStatusCode.OK, "OK");
        //}

        [HttpGet]
        public ServiceResponse<List<SocialProfileType>> GetAllTypes()
        {
            return new ServiceResponse<List<SocialProfileType>>(repo.GetAllTypes(), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<SocialProfile> GetByID(Guid? id)
        {
            return new ServiceResponse<SocialProfile>(repo.GetByID(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<List<SocialProfile>> GetByContentID(Guid? id)
        {
            return new ServiceResponse<List<SocialProfile>>(repo.GetByContentID(id), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        {
            if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins()))
            {
                ServiceMessage<SocialProfile> Social = new ServiceMessage<SocialProfile>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.Create(Social.Data);
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
                ServiceMessage<SocialProfile> Social = new ServiceMessage<SocialProfile>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.Update(Social.Data);
                return this.HandleRepositoryState(result);
            } else
            {
                return NotAuthorized();
            }
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Delete([FromBody]JObject payload)
        {
            if (this.IsAuthorized(Roles.GetAdmins()))
            {
                ServiceMessage<SocialProfile> Social = new ServiceMessage<SocialProfile>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.Delete(Social.Data);
                return this.HandleRepositoryState(result);
            } else
            {
                return NotAuthorized();
            }
        }
        

    }
}
