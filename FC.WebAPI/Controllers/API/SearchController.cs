using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web;
using System.Net.Http;
using System.Web.Http;

using System.Threading;
using System.Threading.Tasks;

using FC.Shared.EntityMapper;
using FC.Interfaces.Data;
using FC.Shared.Entities;
using Newtonsoft.Json.Linq;
using FC.Shared.ViewModels;
using FC.Shared.ViewModels.Search;
using FC.Interfaces.ViewModels;
using FC.Shared.ServerMessages;
using FC.Shared.ViewModels.Festival;
using FC.BL.Repositories;

namespace FC.WebAPI.Controllers.API
{
    public class SearchController : BaseAPIController
    {
        
        protected FestivalRepository FR { get; set;}
        public SearchController() : base()
        {
            FR = new FestivalRepository();
        }

        [HttpPost, HttpOptions]
        public ServiceResponse<List<FC.Shared.Entities.FestivalListItem>> Search([FromBody]JObject payload)
        {
            ServiceMessage<SearchFilter> filter = new ServiceMessage<SearchFilter>(payload);
            
            List<FestivalListItem> tmp = new List<FestivalListItem>();
            tmp = FR.Search(filter.Data.Keyword);
            return new ServiceResponse<List<FestivalListItem>>(tmp, HttpStatusCode.OK, "Search-SUCCESS", this.Repositories.Auth.ActiveToken);
        }
    }
}
