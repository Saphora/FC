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

namespace FC.WebAPI.Controllers.API
{
    public class RatingController : BaseAPIController
    {
        private RatingRepository RatingRepo { get; set; }
        public RatingController() : base() {
            RatingRepo = new RatingRepository();
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
            return new ServiceResponse<RatingVm>(RatingRepo.GetRating(contentItemID, type), HttpStatusCode.OK, "Success-GetRating");
        }
    }
}
