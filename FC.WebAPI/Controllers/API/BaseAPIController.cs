using System;
using System.Globalization;
using System.Net;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using System.Threading;

using FC.BL.Repositories;
using System.Web.Http.Controllers;
using FC.Shared.Entities;
using FC.Shared.Exceptions;
using System.Linq;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Security.Cryptography;
using System.Text;
using FC.Shared.Helpers;
using FC.Shared.Enum;
using FC.WebAPI.Attribs;

namespace FC.WebAPI.Controllers.API
{

    [SetToken]
    public abstract class BaseAPIController : ApiController
    {
        protected static AuthorizationRepository AUTH { get; set; }
        protected static HttpControllerContext CTX { get; set; }
        protected RepositoryContext Repositories { get; set; }
        protected AuthorizationRepository AuthRepo { get; set; }
        protected GenericMessageRepository MsgRepo { get; set; }
        public CultureInfo UserCulture { get; set; }
        public MemReg Registry { get; set; }
        public DateTime UserDateTime { get; set; }
        public RepositoryState LastState { get; set; }
        
        public RegionInfo _RegionInfo { get; set; }
        protected string _CultureIsoName { get; set; }
        public BaseAPIController()
        {
            Registry = MemReg.GetInstance();
            string headerDateTime = "";
            string culture = "";
            string country = "";
            this.Repositories = RepositoryContext.GetInstance();
            string[] languages = HttpContext.Current.Request.UserLanguages;

            if (languages == null || languages.Length == 0)
            {
                culture = CultureInfo.InvariantCulture.Name;
            }
            else
            {
                string language = languages[0].ToLowerInvariant().Trim();
                culture = CultureInfo.CreateSpecificCulture(language).Name;
            }


            if (HttpContext.Current.Request.Headers["UserDateTime"] != null)
            {
                headerDateTime = HttpContext.Current.Request.Headers["UserDateTime"];
            }
            else if (HttpContext.Current.Request["UserDateTime"] != null)
            {
                headerDateTime = HttpContext.Current.Request["UserDateTime"];
            }
            else
            {
                headerDateTime = DateTime.Now.Ticks.ToString();
            }
            
            UserDateTime = new DateTime(long.Parse(headerDateTime));
            UserCulture = new CultureInfo(culture);
            Thread.CurrentThread.CurrentCulture.ClearCachedData();
            Thread.CurrentThread.CurrentCulture = UserCulture;
            Thread.CurrentThread.CurrentUICulture = UserCulture;
            _RegionInfo = RegionInfo.CurrentRegion;
            this.MsgRepo = new GenericMessageRepository();
            this.AuthRepo = AuthorizationRepository.Current;
        }

        protected ServiceResponse<T> HandleException<T>(Exception ex)
        {
            string msg = "Internal server error. Please try again later.";
            MsgRepo.Create("Server error occured", msg, ex, GenericMessageStatus.GenericError);
            ServiceResponse<T> response = new ServiceResponse<T>(Activator.CreateInstance<T>(), HttpStatusCode.InternalServerError, msg, this.Repositories.Auth.ActiveToken);
            return response;
        }

        protected RepositoryState GetStateByKey(Guid key)
        {
            return Registry.Get(key.ToString()) as RepositoryState;
        }

        protected ServiceResponse<RepositoryState> HandleRepositoryState(RepositoryState state, Guid? token=null, Guid? stateKey=null)
        {
            GenericMessage msg = new GenericMessage();
            HttpStatusCode code = HttpStatusCode.InternalServerError;
            msg.Message = state.MSG;
            if(state.DBERROR || state.ERROR)
            {
                if(state.ValidationEx != null)
                {
                    if (state.ValidationEx.InnerException != null)
                    {
                        msg.InnerException = state.ValidationEx.InnerException.Message;
                        msg.InnerStackTrace = state.ValidationEx.InnerException.StackTrace;
                    }
                    msg.ExceptionType = "DbEntityValidationException";
                    msg.Exception = state.ValidationEx.Message;
                    msg.StackTrace = state.ValidationEx.StackTrace;

                    foreach(var e in state.ValidationEx.EntityValidationErrors)
                    {
                        foreach (var err in e.ValidationErrors)
                        {
                            msg.Message += err.ErrorMessage + Environment.NewLine;
                        }
                    }
                    MsgRepo.Create("Validation error occured.", msg.Message, state.ValidationEx, GenericMessageStatus.DBError);
                }
                if(state.Exception != null)
                {
                    msg.StackTrace = state.Exception.StackTrace;
                    msg.Exception = state.Exception.Message;
                    if(state.Exception.InnerException != null)
                    {
                        msg.InnerException = state.Exception.InnerException.Message;
                        msg.InnerStackTrace = state.Exception.InnerException.StackTrace;
                    }
                    MsgRepo.Create("Generic error occured.", msg.Message, state.Exception, GenericMessageStatus.GenericError);
                }
            }
            if(state.SUCCESS)
            {
                code = HttpStatusCode.OK;
            }
            if (state.EXISTS)
            {
                code = HttpStatusCode.NotModified;
            }
            ServiceResponse<RepositoryState> response;
            if (stateKey != null)
            {
                Registry.Set(stateKey.Value.ToString(), state);
            }

            response = new ServiceResponse<RepositoryState>(state, code, state.MSG, this.Repositories.Auth.ActiveToken);
            return response;
        }

        protected void LogUnauthorized()
        {
            System.Web.HttpContext.Current.Response.StatusCode = 401;
            GenericMessage m = new GenericMessage();

            string msg = $"Unauthorized action attempt";
            if (this.AuthRepo.Session != null)
            {
                m.SessionID = this.AuthRepo.Session.SessionID;
                m.Status = GenericMessageStatus.AuthorizationError;
                m.MessageID = Guid.NewGuid();
                m.IsNew = true;
                m.IsHandled = true;
                m.IsDeleted = false;
                m.IsPublic = false;
                m.IsUserMessage = false;
                m.Created = DateTime.Now;
                m.ArchiveDate = DateTime.Now.AddDays(180);
                m.Message = msg;
                m.Title = "Authorization error";
                AppUserSession sess = this.AuthRepo.Session;
                if (this.AuthRepo.Session.UserID.HasValue) {
                    m.UserID = this.AuthRepo.Session.UserID.Value;
                }
            }
            this.MsgRepo.Create(m);
        }

        public HttpResponseMessage HandleOptions()
        {
            if (HttpContext.Current.Request.HttpMethod.ToLower() == "OPTIONS")
            {
                HttpContext.Current.Response.StatusCode = 200;
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            {
                return null;
            }
        }
        public string FormatMonthNum(int month)
        {
            string m = "";
            if (month < 10)
            {
                m = "0" + month;
            }
            else
            {
                m = month.ToString();
            }
            return m;
        }
        

        public bool IsAuthorized(string[] roles, bool refreshToken=true, Guid? pToken=null)
        {
            this.AuthRepo = AuthorizationRepository.Current;
            List<string> r = roles.ToList();
            r.Add("Developer");
            if (pToken == null)
            {
                pToken = this.Repositories.Auth.GetHTTPToken();
            } else
            {
                if (!this.Repositories.Auth.SetHTTPToken(pToken))
                {
                    return false;
                }
            }
            if (refreshToken)
            {
                this.Repositories.Auth.RefreshToken(this.Repositories.Auth.Session, true);
            }
            return this.Repositories.Auth.UserHasRoles(roles);
        }

        public bool IsAuthorAuthorized(Guid? authorID, Guid? pToken=null)
        {
            this.AuthRepo = AuthorizationRepository.Current;
            if (pToken == null)
            {
                pToken = this.Repositories.Auth.GetHTTPToken();
            }
            else
            {
                if (!this.Repositories.Auth.SetHTTPToken(pToken))
                {
                    return false;
                }
            }

            this.Repositories.Auth.RefreshToken(this.Repositories.Auth.Session, true);
            return this.Repositories.Auth.UserHasRoles(Roles.GetAdmins(), authorID);
        }

        public ServiceResponse<RepositoryState> NotAuthorized()
        {
            return new ServiceResponse<RepositoryState>(new RepositoryState { SUCCESS = false, MSG = $"You are not authorized to perform this action." }, HttpStatusCode.Forbidden, "You are not authorized to perform this action.", this.Repositories.Auth.ActiveToken);
        }

        public string GetMd5Hash(MD5 md5Hash, byte[] bytes)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(bytes);

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
        public string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
    }
}
