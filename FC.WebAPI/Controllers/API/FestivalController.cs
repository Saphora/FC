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
        public GenreRespository GenreRespository { get; set; }
        public string CacheFilePath { get; set; }
        

        CalendarHelper _CalendarHelper = new CalendarHelper();

        public FestivalController() :
            base()
        {
            FestivalRepository = new FestivalRepository();
            GenreRespository = new GenreRespository();
        }

        [HttpGet]
        public ServiceResponse<List<UFestival>> GetAll()
        {
            return new ServiceResponse<List<UFestival>>(FestivalRepository.GetAll().ToList(), HttpStatusCode.OK, "OK");
        }

        [HttpGet,HttpPost,HttpOptions]
        public ServiceResponse<UFestival> GetByID(Guid? id)
        {
            return new ServiceResponse<UFestival>(FestivalRepository.GetByID(id), HttpStatusCode.OK, "OK");
        }

        [HttpOptions, HttpPost]
        public ServiceResponse<List<FestivalVM>> GetFiltered([FromBody]JObject payload)
        {
            ServiceMessage<FestivalFilter> filter = new ServiceMessage<FestivalFilter>(payload);
            List<FestivalVM> result = FestivalRepository.GetFilteredFestival(filter.Data);
            return new ServiceResponse<List<FestivalVM>>(result, HttpStatusCode.OK, "OK");
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        {

            if (this.IsAuthorized(Roles.GetAdmins()))
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
            if (this.IsAuthorized(Roles.GetAdmins()))
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
