using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FC.BL.Repositories;
using FC.Shared.Entities;
using FC.Shared.Enum;
using Newtonsoft.Json.Linq;

namespace FC.WebAPI.Controllers.API
{
    public class LineupController : BaseAPIController
    {
        public StageRepository stages = new StageRepository();
        public LineupRepository lineups = new LineupRepository();
        public FestivalRepository festivals = new FestivalRepository();
        public ArtistRepository artists = new ArtistRepository();

        public LineupController():base() { }

        public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        {
            ServiceMessage<LineupItem> result = new ServiceMessage<LineupItem>(payload);
            RepositoryState state = lineups.Create(result.Data);
            return new ServiceResponse<RepositoryState>();
        }
        
        public ServiceResponse<RepositoryState> AddLineupItem([FromBody]JObject payload)
        {
            ServiceMessage<LineupItem> result = new ServiceMessage<LineupItem>(payload);
            RepositoryState state = lineups.Create(result.Data);
            return new ServiceResponse<RepositoryState>();
        }
    }
}
