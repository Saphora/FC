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

namespace FC.WebAPI.Controllers.API
{
    public abstract class BaseAPIController : ApiController
    {
        protected static AuthorizationRepository AUTH { get; set; }
        protected static HttpControllerContext CTX { get; set; }
        protected RepositoryContext Repositories { get; set; }
        protected AuthorizationRepository AuthRepo { get; set; }
        protected GenericMessageRepository MsgRepo { get; set; }
        public CultureInfo UserCulture { get; set; }
        public DateTime UserDateTime { get; set; }
        
        public RegionInfo _RegionInfo { get; set; }
        protected string _CultureIsoName { get; set; }
        public BaseAPIController()
        {
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
            ServiceResponse<T> response = new ServiceResponse<T>(Activator.CreateInstance<T>(), HttpStatusCode.InternalServerError, msg);
            return response;
        }

        protected ServiceResponse<RepositoryState> HandleRepositoryState(RepositoryState state)
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
            ServiceResponse<RepositoryState> response = new ServiceResponse<RepositoryState>(state, code, state.MSG);
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

        public bool IsAuthorized(string roleName, Guid? pToken=null)
        {
            this.AuthRepo = AuthorizationRepository.Current;
            Role role = this.AuthRepo.GetRoleByName(roleName);
            if (this.AuthRepo.Session == null)
            {
                if (pToken == null)
                {
                    if (HttpContext.Current.Request.Params["Token"] != null || HttpContext.Current.Request.Headers["Token"] != null)
                    {
                        string t = "";
                        if (HttpContext.Current.Request.Params["Token"] != null)
                        {
                            t = HttpContext.Current.Request.Params["Token"];
                        }
                        if (HttpContext.Current.Request.Headers["Token"] != null)
                        {
                            t = HttpContext.Current.Request.Headers["Token"];
                        }
                        if (!string.IsNullOrEmpty(t))
                        {
                            Guid token = Guid.Parse(t);
                            this.AuthRepo.Session = this.AuthRepo.GetByToken(token);
                            this.AuthRepo.CurrentUser = this.AuthRepo.Session.User;

                            if (this.AuthRepo.CurrentUser != null)
                            {
                                this.AuthRepo.CurrentUserRoles = this.AuthRepo.GetUserRoles(this.AuthRepo.CurrentUser.UserID);
                            }
                            this.AuthRepo.CurrentUserRoles = this.AuthRepo.CurrentUser.Roles;
                        }
                    }
                    else
                    {
                        return false;
                    }
                } else
                {
                    this.AuthRepo.Session = this.AuthRepo.GetByToken(pToken);
                    this.AuthRepo.CurrentUser = this.AuthRepo.Session.User;

                    if (this.AuthRepo.CurrentUser != null)
                    {
                        this.AuthRepo.CurrentUserRoles = this.AuthRepo.GetUserRoles(this.AuthRepo.CurrentUser.UserID);
                    }
                    this.AuthRepo.CurrentUserRoles = this.AuthRepo.CurrentUser.Roles;
                }
            }
            if (!this.AuthRepo.CurrentUser.Roles.Where(w => w.RoleID == role.RoleID).Any())
            {
                return false;
            }
            this.AuthRepo.SetSessionState(true, true, System.Web.HttpContext.Current, this.ControllerContext);
            return true;
            
        }
        //public NotAuthorizedException NotAuthorized()
        //{
        //    HttpContext.Current.Response.TrySkipIisCustomErrors = true;
        //    if (this.AuthRepo.CurrentUserRoles != null)
        //    {
        //        throw new NotAuthorizedException(AuthRepo.Session, this.AuthRepo.CurrentUserRoles.Select(s => s.Name).ToList());
        //    }
        //    else
        //    {
        //        throw new NotAuthorizedException(AuthRepo.Session, new List<string>());
        //    }
        //}

        public bool IsAuthorized(string[] roles, Guid? pToken=null)
        {
            this.AuthRepo = AuthorizationRepository.Current;
            bool hasNone = true;
            List<string> r = roles.ToList();
            r.Add("Developer");

            if (this.AuthRepo.Session == null)
            {
                if(pToken == null)
                {
                    if (HttpContext.Current.Request.Params["Token"] != null || HttpContext.Current.Request.Headers["Token"] != null)
                    {
                        string t = "";
                        if (HttpContext.Current.Request.Params["Token"] != null)
                        {
                            t = HttpContext.Current.Request.Params["Token"];
                        }
                        if (HttpContext.Current.Request.Headers["Token"] != null)
                        {
                            t = HttpContext.Current.Request.Headers["Token"];
                        }
                        if (!string.IsNullOrEmpty(t))
                        {
                            Guid token = Guid.Parse(t);
                            this.AuthRepo.Session = this.AuthRepo.GetByToken(token);
                            this.AuthRepo.CurrentUser = this.AuthRepo.Session.User;
                            this.AuthRepo.CurrentUserRoles = this.AuthRepo.CurrentUser.Roles;
                        }
                    } else
                    {
                        return false;
                    }
                }
                else
                {
                    this.AuthRepo.Session = this.AuthRepo.GetByToken(pToken);
                    this.AuthRepo.CurrentUser = this.AuthRepo.Session.User;
                    this.AuthRepo.CurrentUserRoles = this.AuthRepo.CurrentUser.Roles;
                }
            }
            foreach (string roleName in r)
            {
                if (this.AuthRepo.CurrentUserRoles != null)
                {
                    if (this.AuthRepo.CurrentUserRoles.Where(w => w.Name == roleName).Any())
                    {
                        hasNone = false;
                    }
                }
            }
            if (!hasNone)
            {
                this.AuthRepo.SetSessionState(true, true, System.Web.HttpContext.Current, this.ControllerContext);
                return true;
            }
            else
            {
                return false;
                //NotAuthorizedException e = new NotAuthorizedException(AuthRepo.Session, this.AuthRepo.CurrentUserRoles.Select(s => s.Name).ToList());
                //System.Web.HttpContext.Current.Response.StatusCode = 403;
                //throw e;
            }
        }

        public ServiceResponse<RepositoryState> NotAuthorized()
        {
            return new ServiceResponse<RepositoryState>(new RepositoryState { SUCCESS = false, MSG = $"You are not authorized to perform this action." }, HttpStatusCode.Forbidden, "You are not authorized to perform this action.");
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
