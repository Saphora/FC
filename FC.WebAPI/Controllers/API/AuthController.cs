using FC.BL.Repositories;
using FC.Shared.Entities;
using FC.Shared.ServerMessages;
using FC.WebAPI.Controllers.API;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FC.WebAPI.Controllers.API
{
    public class AuthController : BaseAPIController
    {
        public AuthController() : base() { }

        public ServiceResponse<List<Role>> GetRoleList()
        {
            return new ServiceResponse<List<Role>>(AuthRepo.GetRoleList(), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
        }

        [HttpGet,HttpPost, HttpOptions]
        public ServiceResponse<AppUserSession> Login([FromBody]JObject payload)
        {
            try
            {
                ServiceMessage<LoginMsg> filter = new ServiceMessage<LoginMsg>(payload);
                AppUserSession sess = this.AuthRepo.Login(filter.Data.Username, filter.Data.PassOrCode);
                if (sess != null && sess.Authenticated)
                {
                    return new ServiceResponse<AppUserSession>(sess, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
                }
                else
                {
                    return new ServiceResponse<AppUserSession>(sess, HttpStatusCode.Unauthorized, "OK", this.Repositories.Auth.ActiveToken);
                }
            } catch(Exception ex)
            {
                return HandleException<AppUserSession>(ex);
            }
        }

        [HttpPost, HttpOptions]
        public ServiceResponse<AppUserSession> HasAuth([FromBody]JObject payload)
        {
            try
            {
                ServiceMessage<IsAuthMsg> filter = new ServiceMessage<IsAuthMsg>(payload);
                return new ServiceResponse<AppUserSession>(this.AuthRepo.Authenticated(filter.Data), HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
            } catch(Exception ex)
            {
                return HandleException<AppUserSession>(ex);
            }
        }

        [HttpPost, HttpOptions]
        public ServiceResponse<bool> Logout([FromBody]JObject payload)
        {
            try
            {
                ServiceMessage<LogoutMsg> filter = new ServiceMessage<LogoutMsg>(payload);
                bool status = this.AuthRepo.Logout(filter.Data.SessionID);
                return new ServiceResponse<bool>(status, HttpStatusCode.OK, "OK", this.Repositories.Auth.ActiveToken);
            }
            catch (Exception ex)
            {
                return HandleException<bool>(ex);
            }
        }
    }
}
