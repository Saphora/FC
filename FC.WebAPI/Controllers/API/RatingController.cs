using FC.BL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FC.Shared.ServerMessages;
using FC.Shared.Entities;

using FC.Shared.ViewModels;

using Newtonsoft.Json.Linq;
using FC.Shared.ViewModels.Rating;
using System.Threading.Tasks;

namespace FC.WebAPI.Controllers.API
{
    [System.Web.Mvc.SessionState(System.Web.SessionState.SessionStateBehavior.Disabled)]
    public class RatingController : BaseAPIController
    {
        private RatingRepository RatingRepo;
        public RatingController() : base() {
            RatingRepo = this.Repositories.Rating;
        }


        [HttpOptions, HttpPost]
        public string Rate([FromBody]JObject payload)
        {
            ServiceMessage<RatingMsg> svcMsg = new ServiceMessage<RatingMsg>(payload);
            RatingRepo.Rate(svcMsg.Data, System.Web.HttpContext.Current.Request.UserHostAddress, System.Web.HttpContext.Current.Request.UserHostName);
            return "true";
        }

        [HttpGet]
        public ServiceResponse<RatingVm> GetRating(Guid? contentItemID, string type)
        {
            var result = new Shared.Entities.ServiceResponse<RatingVm>(
                            RatingRepo.GetRating(contentItemID, type),
                            HttpStatusCode.OK,
                            "OK",
                            Repositories.Auth.ActiveToken);
            return result;
        }
    }
}
