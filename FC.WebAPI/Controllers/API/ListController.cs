﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using FC.Shared.Entities;
using FC.BL.Repositories;
using Newtonsoft.Json.Linq;
using FC.Shared.Enum;

namespace FC.WebAPI.Controllers.API
{
    public class ListController : BaseAPIController
    {
        public ListController() : base()
        {
        }

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<List<UGenre>> GetFestivals(string name)
        //{
        //    try
        //    {
        //        return new ServiceResponse<List<UGenre>>(repo.GetByPartialName(name), HttpStatusCode.OK, "OK");
        //    }
        //    catch (Exception ex)
        //    {
        //        return HandleException<List<UGenre>>(ex);
        //    }
        //}

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<List<Guid?>> GetAllDefaultIds()
        //{
        //    try
        //    {
        //        return new ServiceResponse<List<Guid?>>(repo.GetAllDefaultIds(), HttpStatusCode.OK, "OK");
        //    }
        //    catch (Exception ex)
        //    {
        //        return HandleException<List<Guid?>>(ex);
        //    }
        //}

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<List<UGenre>> GetAllDefault()
        //{
        //    try
        //    {
        //        ServiceResponse<List<UGenre>> result = new ServiceResponse<List<UGenre>>(repo.GetAllDefault(), HttpStatusCode.OK, "OK");
        //        return result;
        //    }
        //    catch (Exception ex)
        //    {
        //        return HandleException<List<UGenre>>(ex);
        //    }
        //}

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<List<UGenre>> GetAll()
        //{
        //    try
        //    {
        //        return new ServiceResponse<List<UGenre>>(repo.GetAll(), HttpStatusCode.OK, "OK");
        //    }
        //    catch (Exception ex)
        //    {
        //        return HandleException<List<UGenre>>(ex);
        //    }
        //}

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<List<UGenre>> GetAllRoot()
        //{
        //    try
        //    {
        //        return new ServiceResponse<List<UGenre>>(repo.GetAllRoot(), HttpStatusCode.OK, "OK");
        //    }
        //    catch (Exception ex)
        //    {
        //        return HandleException<List<UGenre>>(ex);
        //    }
        //}

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<List<UGenre>> GetAllChildren()
        //{
        //    try
        //    {
        //        return new ServiceResponse<List<UGenre>>(repo.GetAllChildren(), HttpStatusCode.OK, "OK");
        //    }
        //    catch (Exception ex)
        //    {
        //        return HandleException<List<UGenre>>(ex);
        //    }
        //}


        //[HttpOptions, HttpPost]
        //public ServiceResponse<List<UGenre>> Filter(FC.Shared.ServerMessages.GenreFilter filter)
        //{
        //    List<UGenre> result = new List<UGenre>();
        //    if (filter.GenreID.HasValue && filter.ParentID.HasValue)
        //    {
        //        return new ServiceResponse<List<UGenre>>(null, HttpStatusCode.BadRequest, "FAIL-Genres/GetAll-cannot user filter.GenreID & filter.ParentID at same time.");
        //    }
        //    else if (filter.GenreID.HasValue)
        //    {
        //        result.Add(repo.GetByID(filter.GenreID));
        //        return new ServiceResponse<List<UGenre>>(result, HttpStatusCode.OK, "OK");
        //    }
        //    else if (filter.ParentID.HasValue)
        //    {
        //        result.AddRange(repo.GetByParentID(filter.ParentID));
        //    }
        //    else if (filter.Name != null)
        //    {
        //        try
        //        {
        //            result.Add(repo.GetByName(filter.Name));
        //        }
        //        catch (Exception ex)
        //        {
        //            return HandleException<List<UGenre>>(ex);
        //        }
        //    }
        //    return new ServiceResponse<List<UGenre>>(result, HttpStatusCode.OK, "OK");
        //}

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        //{
        //    if (IsAuthorized(Roles.GetAdmins()))
        //    {
        //        ServiceMessage<UGenre> genre = new ServiceMessage<UGenre>(payload);
        //        RepositoryState result = new RepositoryState();
        //        result = repo.Create(genre.Data);
        //        return this.HandleRepositoryState(result);

        //    }
        //    else
        //    {
        //        this.LogUnauthorized();
        //        System.Web.HttpContext.Current.Response.StatusCode = 401;
        //        return new ServiceResponse<RepositoryState>(new RepositoryState(), HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
        //    }
        //}

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<RepositoryState> Update([FromBody]JObject payload)
        //{
        //    if (IsAuthorized(Roles.GetAdmins()))
        //    {
        //        ServiceMessage<UGenre> genre = new ServiceMessage<UGenre>(payload);
        //        RepositoryState result = new RepositoryState();
        //        result = repo.Update(genre.Data);
        //        return this.HandleRepositoryState(result);

        //    }
        //    else
        //    {
        //        this.LogUnauthorized();
        //        System.Web.HttpContext.Current.Response.StatusCode = 401;
        //        return new ServiceResponse<RepositoryState>(new RepositoryState(), HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
        //    }
        //}

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<RepositoryState> ForceDelete([FromBody]JObject payload)
        //{
        //    if (IsAuthorized(Roles.GetAdmins()))
        //    {
        //        ServiceMessage<UGenre> genre = new ServiceMessage<UGenre>(payload);
        //        RepositoryState result = new RepositoryState();
        //        result = repo.ForceDelete(genre.Data);
        //        return this.HandleRepositoryState(result);
        //    }
        //    else
        //    {
        //        this.LogUnauthorized();
        //        return new ServiceResponse<RepositoryState>(new RepositoryState(), HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
        //    }
        //}
        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<RepositoryState> Delete([FromBody]JObject payload)
        //{
        //    if (IsAuthorized(Roles.GetAdmins()))
        //    {
        //        ServiceMessage<UGenre> genre = new ServiceMessage<UGenre>(payload);
        //        RepositoryState result = new RepositoryState();
        //        result = repo.Delete(genre.Data);
        //        return this.HandleRepositoryState(result);

        //    }
        //    else
        //    {
        //        this.LogUnauthorized();
        //        return new ServiceResponse<RepositoryState>(new RepositoryState(), HttpStatusCode.Unauthorized, "You are not authorized to perform this action.");
        //    }
        //}

    }
}
