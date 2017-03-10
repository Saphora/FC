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
    public class MenuController : BaseAPIController
    {
        private MenuRepository repo = new MenuRepository();

        [HttpGet]
        public ServiceResponse<List<MenuSection>> GetMenu(string pageKey = "")
        {
            return new ServiceResponse<List<MenuSection>>(repo.GetMenu(pageKey), HttpStatusCode.OK, "OK");
        }


        [HttpGet]
        public ServiceResponse<List<MenuItem>> GetBySectionID(Guid? sectionID)
        {
            return new ServiceResponse<List<MenuItem>>(repo.GetBySectionID(sectionID), HttpStatusCode.OK, "OK");
        }

        [HttpGet]
        public ServiceResponse<List<MenuSection>> GetPaged(int size, int page)
        {
            List<MenuSection> result = new List<MenuSection>();
            if (page > repo.GetPageCount<MenuSection>("MenuSections",size))
            {
                throw new HttpException(404, "Page size invalid");
            }
            result = repo.GetPaged<MenuSection>(size, page, "MenuSections");
            return new ServiceResponse<List<MenuSection>>(result, HttpStatusCode.OK, "OK");
        }

        [HttpGet]
        public ServiceResponse<List<MenuSection>> GetSorted(string sortIndex, int page=1)
        {
            List<MenuSection> result = new List<MenuSection>();
            result = repo.GetPaged<MenuSection>(50, page, "MenuSections");
            return new ServiceResponse<List<MenuSection>>(result, HttpStatusCode.OK, "OK");
        }



        [HttpGet]
        public ServiceResponse<int> GetPagedCount(string sortIndex, int page = 1)
        {
            return new ServiceResponse<int>(repo.GetPagedCount<MenuSection>("MenuSections",page, sortIndex), HttpStatusCode.OK, "OK");
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<List<MenuSection>> GetAllSections()
        {
            return new ServiceResponse<List<MenuSection>>(repo.GetAllSections(), HttpStatusCode.OK, "OK");
        }
        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<List<MenuItem>> GetAllItems()
        {
            return new ServiceResponse<List<MenuItem>>(repo.GetAllItems(), HttpStatusCode.OK, "OK");
        }

        //[HttpOptions, HttpGet, HttpPost]
        //public ServiceResponse<List<ArtistListVm>> GetByPartialName(string name)
        //{
        //    return new ServiceResponse<List<ArtistListVm>>(repo.GetByPartialName(name), HttpStatusCode.OK, "OK");
        //}

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<MenuSection> GetByID(Guid? id)
        {
            return new ServiceResponse<MenuSection>(repo.GetByID(id), HttpStatusCode.OK, "OK");
        }
        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<MenuItem> GetMenuItemByID(Guid? id)
        {
            return new ServiceResponse<MenuItem>(repo.GetMenuItemByID(id), HttpStatusCode.OK, "OK");
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> Create([FromBody]JObject payload)
        {
            if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins()))
            {
                ServiceMessage<MenuSection> section = new ServiceMessage<MenuSection>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.Create(section.Data);
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
                ServiceMessage<MenuSection> section = new ServiceMessage<MenuSection>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.Update(section.Data);
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
                ServiceMessage<MenuSection> section = new ServiceMessage<MenuSection>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.Delete(section.Data);
                return this.HandleRepositoryState(result);
            }
            else
            {
                return NotAuthorized();
            }
        }


        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> CreateMenuItem([FromBody]JObject payload)
        {
            if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins()))
            {
                ServiceMessage<MenuItem> item = new ServiceMessage<MenuItem>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.CreateItem(item.Data);
                return this.HandleRepositoryState(result);
            }
            else
            {
                return NotAuthorized();
            }
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> UpdateMenuItem([FromBody]JObject payload)
        {
            if (this.IsAuthorized(FC.Shared.Enum.Roles.GetAdmins()))
            {
                ServiceMessage<MenuItem> item = new ServiceMessage<MenuItem>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.UpdateMenuItem(item.Data);
                return this.HandleRepositoryState(result);
            }
            else
            {
                return NotAuthorized();
            }
        }

        [HttpOptions, HttpGet, HttpPost]
        public ServiceResponse<RepositoryState> DeleteMenuItem([FromBody]JObject payload)
        {
            if (IsAuthorized(Roles.GetAdmins()))
            {
                ServiceMessage<MenuItem> item = new ServiceMessage<MenuItem>(payload);
                RepositoryState result = new RepositoryState();
                result = repo.DeleteMenuItem(item.Data);
                return this.HandleRepositoryState(result);
            }
            else
            {
                return NotAuthorized();
            }
        }
    }
}