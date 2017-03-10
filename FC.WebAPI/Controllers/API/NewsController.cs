using FC.BL.Repositories;
using FC.Shared.Entities;
using FC.Shared.Enum;
using FC.Shared.ServerMessages;
using FC.Shared.ViewModels;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FC.WebAPI.Controllers.API
{
    public class NewsController : BaseAPIController
    {
        NewsRepository repo = new NewsRepository();
        public NewsController() : base()
        { }

        [HttpGet]
        public ServiceResponse<UNews> GetByID(Guid? id)
        {
            return new ServiceResponse<UNews>(repo.GetByID(id), HttpStatusCode.OK, "OK");
        }

        [HttpGet]
        public ServiceResponse<List<UNews>> GetPaged(int page, int month, int year)
        {
            repo.PageCount = 20;
            return new ServiceResponse<List<UNews>>(repo.GetPaged(page, month, year).ToList(), HttpStatusCode.OK, "OK");
        }

        [HttpGet]
        public ServiceResponse<int> GetPagedCount(int page, string month, string year)
        {
            return new ServiceResponse<int>(repo.GetPagedCount(page, month, year), HttpStatusCode.OK, "OK");
        }

        [HttpOptions, HttpPost]
        public ServiceResponse<List<UNews>> GetHeadlines([FromBody]JObject payload)
        {
            ServiceMessage<NewsFilter> msg = new ServiceMessage<NewsFilter>(payload);
            List<UNews> news = repo.GetFiltered(msg.Data);
            return new ServiceResponse<List<UNews>>(news, HttpStatusCode.OK, "OK");
        }

        [HttpOptions, HttpPost]
        public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        {
            if (this.IsAuthorized(Roles.GetAdmins()))
            {
                ServiceMessage<UNews> msg = new ServiceMessage<UNews>(payload);
                UNews l = msg.Data;
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
                ServiceMessage<UNews> msg = new ServiceMessage<UNews>(payload);
                UNews l = msg.Data;
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
                ServiceMessage<UNews> msg = new ServiceMessage<UNews>(payload);
                UNews l = msg.Data;
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
                ServiceMessage<UNews> msg = new ServiceMessage<UNews>(payload);
                UNews l = msg.Data;
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
