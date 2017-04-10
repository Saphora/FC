using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using FC.Shared.Entities;
using System.Globalization;
using System.Web.Routing;
using System.Web;
using System.Web.Http;
using FC.Shared.ServerMessages;
using FC.PGDAL.PGModel;
using FC.Shared.Config;
using FC.BL.Validation;
using FC.Interfaces.Data;
using System.Data.Entity.Validation;
using System.IO;
using FC.Shared.Enum;

namespace FC.BL.Repositories
{
    public class AuthorizationRepository : BaseRepository
    {

        /* PRIVATE */
        private static AuthorizationRepository _inst;
        private MD5 MD5Hasher { get; set; }


        public AppUserSession Session
        {
            get
            {
                if (HttpContext.Current != null)
                {
                    if (HttpContext.Current.Items.Contains("AppUserSession"))
                    {
                        return (AppUserSession)HttpContext.Current.Items["AppUserSession"];
                    }
                    else
                    {
                        return null;
                    }
                } else
                {
                    return null;
                }
            }
            set
            {
                if (HttpContext.Current != null)
                {
                    if (!HttpContext.Current.Items.Contains("AppUserSession"))
                    {
                        HttpContext.Current.Items.Add("AppUserSession", value);
                    }
                    else
                    {
                        HttpContext.Current.Items["AppUserSession"] = value;
                    }
                }
            }
        }
        public ApplicationUser CurrentUser
        {
            get
            {
                if (HttpContext.Current != null)
                {
                    if (HttpContext.Current.Items.Contains("CurrentUser"))
                    {
                        return (ApplicationUser)HttpContext.Current.Items["CurrentUser"];
                    }
                    else
                    {
                        return null;
                    }
                } else
                {
                    return WPFUser;
                }
            }
            set
            {
                if (HttpContext.Current != null)
                {
                    if (!HttpContext.Current.Items.Contains("CurrentUser"))
                    {
                        HttpContext.Current.Items.Add("CurrentUser", value);
                    }
                    else
                    {
                        HttpContext.Current.Items["CurrentUser"] = value;
                    }
                } else
                {
                    WPFUser = value;
                }
            }
            //TODO: GET THIS FROM HTTP CONTEXT CURRENT.
        }
        public List<Role> CurrentUserRoles
        {
            
            get
            {
                if (HttpContext.Current != null)
                {
                    if (HttpContext.Current.Items.Contains("CurrentUserRoles"))
                    {
                        return (List<Role>)HttpContext.Current.Items["CurrentUserRoles"];
                    }
                    else
                    {
                        return null;
                    }
                } else
                {
                    return null;
                }
            }
            set
            {
                if (HttpContext.Current != null)
                {
                    if (!HttpContext.Current.Items.Contains("CurrentUserRoles"))
                    {
                        HttpContext.Current.Items.Add("CurrentUserRoles", value);
                    }
                    else
                    {
                        HttpContext.Current.Items["CurrentUserRoles"] = value;
                    }
                }
            }
        }
        public Guid? ActiveToken
        {
            get
            {
                if (HttpContext.Current != null)
                {
                    if (HttpContext.Current.Items.Contains("ActiveToken"))
                    {
                        return (Guid?)HttpContext.Current.Items["ActiveToken"];
                    }
                    else
                    {
                        return null;
                    }
                } else
                {
                    return null;
                }
                
            }
            set
            {
                if (HttpContext.Current != null)
                {
                    if (!HttpContext.Current.Items.Contains("ActiveToken"))
                    {
                        HttpContext.Current.Items.Add("ActiveToken", value);
                    }
                    else
                    {
                        HttpContext.Current.Items["ActiveToken"] = value;
                    }
                }
            }
        }
        public Guid? UserID
        {
            get
            {
                if (HttpContext.Current.Items.Contains("UserID"))
                {
                    return Guid.Parse(HttpContext.Current.Items["UserID"].ToString());
                }
                else
                {
                    return null;
                }
            }
            set
            {
                if (!HttpContext.Current.Items.Contains("UserID"))
                {
                    HttpContext.Current.Items.Add("UserID", value);
                }
                else
                {
                    HttpContext.Current.Items["UserID"] = value;
                }
            }
        }
        public bool HasAuth { get; set; }
        public bool IsAuthorized { get; set; }
        public bool IsAlmostExpired { get; set; }
        public ApplicationUser WPFUser {get;set;}
        public List<Role> WPFUserRoles { get; set; }

        private AuthorizationRepository() : base()
        {
            this.MD5Hasher = MD5.Create();
        }

        /// <summary>
        /// Hashes a string to MD5
        /// </summary>
        /// <param name="md5Hash"></param>
        /// <param name="input"></param>
        /// <returns></returns>
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

        // Verify a hash against a string.
        public bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
        {
            // Hash the input.
            string hashOfInput = GetMd5Hash(md5Hash, input);

            // Create a StringComparer an compare the hashes.
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            if (0 == comparer.Compare(hashOfInput, hash))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool IsOfficeUser(string[] roles)
        {
            return this.WPFUserHasRoles(roles);
        }

        public RepositoryState ForceDelete(ApplicationUser model)
        {
            try
            {
                using (this.Db = new ContentModel())
                {
                    this.Db.AppUserSessions.RemoveRange(this.Db.AppUserSessions.Where(w => w.UserID == model.UserID));
                    this.Db.U2R.RemoveRange(this.Db.U2R.Where(w => w.UserID == model.UserID));
                    this.Db.Favorites.RemoveRange(this.Db.Favorites.Where(w => w.UserID == model.UserID));
                    this.Db.Media.RemoveRange(this.Db.Media.Where(w => w.AuthorID == model.UserID));
                    this.Db.MediaDirectories.RemoveRange(this.Db.MediaDirectories.Where(w => w.DirectoryID == model.MediaDirectoryID));
                    this.Db.ApplicationUsers.Remove(this.Db.ApplicationUsers.Find(model.UserID));
                    this.Db.SaveChanges();
                }
                return new RepositoryState { SUCCESS = true, MSG = "User successfully removed with force" };
            }
            catch (DbEntityValidationException ex)
            {
                return this.HandleException(ex, "Cannot remove user, because a database error occured.");
            }
            catch (Exception ex)
            {
                return this.HandleException(ex, "Cannot remove user, please try again later");
            }

        }

        /// <summary>
        /// Get list of roles ordered by name
        /// </summary>
        /// <returns></returns>
        public List<Role> GetRoleList()
        {
            List<Role> roles;
            using (Db = new ContentModel())
            {
                roles = Db.Roles.OrderBy(o => o.Name).ToList();
            }
            return roles;
        }


        /// <summary>
        /// Check if user session is not expired and user contains correct roles.
        /// </summary>
        /// <param name="msg"></param>
        /// <returns></returns>
        public AppUserSession Authenticated(IsAuthMsg msg)
        {

            AppUserSession s;
            using (Db = new ContentModel())
            {
                s = this.Db.AppUserSessions.Find(msg.SessionID);

                if (CurrentUser != null)
                {
                    if (CurrentUser.UserID == s.UserID)
                    {
                        if (msg.Roles != null)
                        {
                            if (msg.Token == ActiveToken)
                            {
                                bool result = false;
                                foreach (string role in msg.Roles)
                                {
                                    if (CurrentUser.Roles.Where(w => w.Name == role).Any())
                                    {
                                        result = true;
                                    }
                                }
                                if (result)
                                {
                                    try
                                    {

                                        s.Authenticated = true;
                                        s.Authorized = true;
                                        s = this.RefreshToken(s);
                                        this.Db.Entry<AppUserSession>(s).State = System.Data.Entity.EntityState.Modified;
                                        this.Db.SaveChanges();
                                        return s;
                                    }
                                    catch
                                    {
                                        //should log
                                        s.Authenticated = false;
                                        s.Authorized = false;
                                    }
                                }
                                else
                                {
                                    s.Authenticated = false;
                                    s.Authorized = false;
                                }
                            }
                            else
                            {
                                s.Authenticated = false;
                                s.Authorized = false;
                            }
                        }
                        else
                        {
                            s.Authenticated = false;
                            s.Authorized = false;
                        }
                    }
                    else
                    {
                        s.Authenticated = false;
                        s.Authorized = false;
                    }
                }
                else
                {
                    s.Authenticated = false;
                    s.Authorized = false;
                }

                s.Expires = DateTime.Now.AddHours(2);
                this.Db.Entry<AppUserSession>(s).State = System.Data.Entity.EntityState.Modified;
                this.Db.SaveChanges();
            }
            return s;
        }

        public Role GetRoleByName(string name)
        {
            Role result;
            using (Db = new ContentModel())
            {
                List<Permission> permissions = new List<Permission>();
                result = Db.Roles.Where(w => w.Name == name).FirstOrDefault();
                permissions.AddRange(Db.P2R.Where(w => w.RoleID == result.RoleID).Select(s => s.Permission));
                result.Permissions = permissions;
            }
            return result;
        }


        /// <summary>
        /// Get permissions by rolename
        /// </summary>
        /// <param name="roleName"></param>
        /// <returns></returns>
        public List<Permission> GetPermissions(string roleName)
        {
            return GetRoleByName(roleName).Permissions;
        }

        /// <summary>
        /// Get the current repository and its state.
        /// </summary>
        public static AuthorizationRepository Current
        {
            get
            {
                if (_inst == null)
                {
                    _inst = new AuthorizationRepository();

                }
                return _inst;
            }
        }


        /// <summary>
        /// Get a user by user id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ApplicationUser GetUserByID(Guid? id)
        {
            ApplicationUser usr;
            using (Db = new ContentModel())
            {
                usr = this.Db.ApplicationUsers.Find(id);
            }
            return usr;
        }

        public ApplicationUser GetUserByEmail(string userEmailAddress)
        {
            ApplicationUser user;
            using (Db = new ContentModel())
            {
                user = Db.ApplicationUsers.Where(w => w.UserEmailAddress.ToLower() == userEmailAddress.ToLower()).FirstOrDefault();
            }
            return user;
        }

        /// <summary>
        /// Get Roles based on user id.
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public List<Role> GetUserRoles(Guid? userID)
        {
            List<Role> result;
            int i = 0;
            using (Db = new ContentModel())
            {
                result = this.Db.U2R.Where(w => w.UserID == userID).Select(s => s.Role).OrderBy(o => o.Name).ToList();
            }
            return result;
        }

        /// <summary>
        /// Checks if session is expired.
        /// </summary>
        /// <param name="sess"></param>
        /// <returns></returns>
        public bool IsExpired(AppUserSession sess)
        {
            if (sess.Expires < DateTime.Now)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public RepositoryState StartSession(AppUserSession sess)
        {
            RepositoryState state;
            using (Db = new ContentModel())
            {
                try
                {
                    if (sess.SessionID == null)
                    {
                        sess.SessionID = Guid.NewGuid();
                    }
                    if (sess.Token == null)
                    {
                        sess.Token = Guid.NewGuid();
                        this.ActiveToken = sess.Token;
                    }
                    sess.Created = DateTime.Now;
                    WriteTokenCookie(sess);
                    Db.AppUserSessions.Add(sess);
                    Db.SaveChanges();

                    state = new RepositoryState(true, "SESSION STARTED", sess.SessionID);
                    return state;
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, "Cannot start a new session at the moment, this problem is logged. Please try again later.");
                }
            }
        }

        public RepositoryState DestroySessions(AppUserSession sess)
        {
            RepositoryState state;
            using (Db = new ContentModel())
            {
                try
                {
                    Db.AppUserSessions.Remove(Db.AppUserSessions.Find(sess.SessionID));
                    Db.AppUserSessions.RemoveRange(Db.AppUserSessions.Where(w => w.UserID == sess.UserID));
                    Db.SaveChanges();
                    state = new RepositoryState(true, "All the sessions are closed.", sess.SessionID);
                    return state;
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, "Cannot close sessions at the moment. Please try again later.");
                }
            }
        }

        /// <summary>
        /// Get the current user session based on token, and validate the expiration based on expire date. also check if Authenticated or Authorized states are changed.
        /// </summary>
        /// <param name="token"></param>
        /// <param name="validateExpired"></param>
        /// <param name="authOnly"></param>
        /// <returns></returns>
        public AppUserSession GetByToken(Guid? token, bool validateExpired = true, bool authOnly = true)
        {
            AppUserSession result;
            using (Db = new ContentModel())
            {
                if (validateExpired)
                {
                    result = this.Db.AppUserSessions.Where(w => w.Token == token && w.Active == true && w.Expires >= DateTime.UtcNow).FirstOrDefault();
                }
                else
                {
                    result = this.Db.AppUserSessions.Where(w => w.Token == token && w.Active == true).FirstOrDefault();
                }
                if (result != null)
                {
                    if (authOnly)
                    {
                        if (!result.Authenticated || !result.Authorized)
                        {
                            return null;
                        }
                    }

                }
            }
            return result;
        }


        /// <summary>
        /// Get the current user session based on token.
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public ApplicationUser GetByActivationToken(Guid? token)
        {
            ApplicationUser result;
            using (Db = new ContentModel())
            {
                result = this.Db.ApplicationUsers.Where(w => w.ActivationToken == token).FirstOrDefault();
            }
            return result;
        }

        /// <summary>
        /// Get a session by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public AppUserSession GetByDID(Guid? id)
        {
            using (this.Db = new ContentModel())
            {
                return this.Db.AppUserSessions.Find(id);
            }
        }

        /// <summary>
        /// Refreshes the token and writes the cookie. Updates also session in DB if @update is true
        /// </summary>
        /// <param name="sess"></param>
        /// <param name="update"></param>
        /// <returns></returns>
        public AppUserSession RefreshToken(AppUserSession sess, bool update = false)
        {
            sess.Token = Guid.NewGuid();
            this.ActiveToken = sess.Token;
            sess.Modified = DateTime.UtcNow;
            sess.Expires = DateTime.UtcNow.AddHours(6);

            HttpCookie c = new HttpCookie("Token", sess.Token.Value.ToString());
            c.Expires = DateTime.UtcNow.AddHours(6);
            c.HttpOnly = false;
            c.Shareable = false;
            if (HttpContext.Current != null)
            {
                if (HttpContext.Current.Response.Cookies.AllKeys.Contains("Token"))
                {
                    HttpContext.Current.Response.SetCookie(c);
                }
                else
                {
                    HttpContext.Current.Response.Cookies.Add(c);
                }
            }
            HttpCookie c2 = new HttpCookie("UserID", sess.UserID.Value.ToString());
            c2.Expires = DateTime.UtcNow.AddDays(6);
            c2.HttpOnly = false;
            c2.Shareable = false;
            if (HttpContext.Current != null)
            {
                if (HttpContext.Current.Response.Cookies.AllKeys.Contains("UserID"))
                {
                    HttpContext.Current.Response.SetCookie(c2);
                }
                else
                {
                    HttpContext.Current.Response.Cookies.Add(c2);
                }
            }
            if (update)
            {
                using (Db = new ContentModel())
                {
                    var s = Db.AppUserSessions.Find(sess.SessionID);
                    s.Token = sess.Token;
                    s.Modified = sess.Modified;
                    s.Expires = sess.Expires;
                    Db.Entry(s).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return s;
                }
            }
            return sess;
        }

        public void WriteTokenCookie(AppUserSession sess)
        {
            //foreach (string domain in FCConfig.Domains)
            //{
            HttpCookie c = new HttpCookie("Token", sess.Token.Value.ToString());
            c.Expires = DateTime.UtcNow.AddHours(6);
            c.HttpOnly = false;
            c.Shareable = false;
            if (HttpContext.Current != null)
            {
                if (HttpContext.Current.Response.Cookies.AllKeys.Contains("Token"))
                {
                    HttpContext.Current.Response.SetCookie(c);
                }
                else
                {
                    HttpContext.Current.Response.Cookies.Add(c);
                }
            }
            HttpCookie c2 = new HttpCookie("UserID", sess.UserID.Value.ToString());
            c2.Expires = DateTime.UtcNow.AddDays(6);
            c2.HttpOnly = false;
            c2.Shareable = false;
            if (HttpContext.Current != null)
            {
                if (HttpContext.Current.Response.Cookies.AllKeys.Contains("UserID"))
                {
                    HttpContext.Current.Response.SetCookie(c2);
                }
                else
                {
                    HttpContext.Current.Response.Cookies.Add(c2);
                }
            }
        }



        public void DestroyToken(AppUserSession sess)
        {
            using (Db = new ContentModel())
            {
                if (HttpContext.Current != null)
                {
                    HttpContext.Current.Response.Cookies.Remove("Token");
                }
                Db.AppUserSessions.RemoveRange(Db.AppUserSessions.Where(w => w.Token == sess.Token));
                Db.SaveChanges();
            }
        }

        /// <summary>
        /// Keep the session alive, raises the expiredate with one day.
        /// </summary>
        /// <param name="session"></param>
        /// <returns></returns>
        public Guid? KeepAlive(AppUserSession session)
        {

            using (Db = new ContentModel())
            {
                AppUserSession sess = Db.AppUserSessions.Find(session.SessionID);
                if (sess != null)
                {
                    if (session.SessionID != null)
                    {
                        sess.SessionID = session.SessionID;
                    }
                    if (session.Action != null)
                    {
                        sess.Action = session.Action;
                    }
                    sess.Authorized = session.Authorized;
                    sess.Authenticated = session.Authenticated;
                    sess.Active = session.Active;

                    if (session.Controller != null)
                    {
                        sess.Controller = session.Controller;
                    }
                    sess.Modified = DateTime.Now;
                    if (session.BrowserName != null)
                    {
                        sess.BrowserName = session.BrowserName;
                    }
                    if (session.Token != null)
                    {
                        sess.Token = session.Token;
                    }
                    if (session.Culture != null)
                    {
                        sess.Culture = session.Culture;
                    }
                    sess.Expires = DateTime.UtcNow.AddDays(1);
                    if (session.HostAddress != null)
                    {
                        sess.HostAddress = session.HostAddress;
                    }
                    if (session.HostName != null)
                    {
                        sess.HostName = session.HostName;
                    }

                    sess.MobileDeviceName = session.MobileDeviceName;
                    sess.MobileDeviceVersion = session.MobileDeviceVersion;
                    if (session.ScreenHeight != null)
                    {
                        sess.ScreenHeight = session.ScreenHeight;
                    }
                    if (session.ScreenWidth != null)
                    {
                        sess.ScreenWidth = session.ScreenWidth;
                    }
                    if (session.URI != null)
                    {
                        sess.URI = session.URI;
                    }
                    sess.User = null;
                    if (session.UserID != null)
                    {
                        sess.UserID = session.UserID;
                    }
                    if (session.UserAgent != null)
                    {
                        sess.UserAgent = session.UserAgent;
                    }
                    sess.Mode = AuthMode.LOCAL;
                    if (session.Payload != null)
                    {
                        sess.Payload = session.Payload;
                    }
                    if (session.MobileDeviceName != null)
                    {
                        sess.IsMobileDevice = session.IsMobileDevice;
                    }
                    if (session.IPAddress != null)
                    {
                        sess.IPAddress = session.IPAddress;
                    }
                    if (session.IPv6Address != null)
                    {
                        sess.IPv6Address = session.IPv6Address;
                    }
                    if (session.Platform != null)
                    {
                        sess.Platform = session.Platform;
                    }
                    sess = this.RefreshToken(sess);
                    Db.Entry<AppUserSession>(sess).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return sess.Token;
                }
            }
            throw new Exception("You where never logged in on this session.");
        }


        /// <summary>
        /// Set the session state manually
        /// </summary>
        /// <param name="active"></param>
        /// <param name="authorized"></param>
        /// <param name="requestContext"></param>
        /// <param name="ctx"></param>
        public void SetSessionState(bool active, bool authorized, System.Web.HttpContext requestContext, System.Web.Http.Controllers.HttpControllerContext ctx)
        {
            HttpRequest r = requestContext.Request;
            AppUserSession sess = this.Session;
            if (sess != null)
            {
                if (authorized && active)
                {
                    sess.Active = active;
                    sess.Authorized = authorized;
                    sess.Action = ctx.RouteData.Values["action"].ToString();
                    sess.Controller = ctx.RouteData.Values["controller"].ToString();
                    sess.URI = r.Url.Query;

                    this.KeepAlive(sess);
                    this.Session = sess;
                }
            }
            else
            {
                throw new Exception("You where never logged in on this session.");
            }
        }

        /// <summary>
        /// Destroy the session.
        /// </summary>
        /// <param name="sessionID"></param>
        /// <returns></returns>
        public bool Logout(Guid? sessionID)
        {
            try
            {
                using (Db = new ContentModel())
                {
                    var s = Db.AppUserSessions.Find(sessionID);
                    this.DestroySessions(s);
                    this.DestroyToken(s);
                    return true;
                }
            } catch
            {
                return false;
            }
            
        }

        /// <summary>
        /// Checks if the authenticated user roles matches one of the roles in roleNames
        /// </summary>
        /// <param name="roleNames"></param>
        /// <returns></returns>
        public bool ActionAuthorized(string[] roleNames)
        {
            this.ActiveToken = this.GetHTTPToken();

            if (this.ActiveToken != null)
            {
                this.RefreshToken(this.Session, true);
                return this.UserHasRoles(roleNames);
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// Checks if the authenticated user roles matches one of the roles in roleNames
        /// </summary>
        /// <param name="roleNames"></param>
        /// <returns></returns>
        public bool WPFActionAuthorized(string[] roleNames)
        {
            return this.WPFUserHasRoles(roleNames);
        }

        /// <summary>
        /// Checks if the authenticated user roles matches one of the roles in roleNames
        /// </summary>
        /// <param name="roleNames"></param>
        /// <returns></returns>
        public bool ActionAuthorized(string[] roleNames, Guid? authorID)
        {
            this.ActiveToken = this.GetHTTPToken();
            if (this.ActiveToken != null)
            {
                this.RefreshToken(this.Session, true);
                return this.UserHasRoles(roleNames, authorID);
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Sign a user in. This function should only used in the Backoffice.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public AppUserSession Login(string username, string password, bool encrypt = true)
        {
            using (Db = new ContentModel())
            {
                string pass = GetMd5Hash(this.MD5Hasher, password);
                if (encrypt == false)
                {
                    pass = password;
                }
                ApplicationUser authUser = this.Db.ApplicationUsers.Where(w => w.UserEmailAddress == username && w.UserPassword == pass).FirstOrDefault();
                if (authUser == null)
                {
                    return null;
                }
                else
                {
                    authUser.Roles = this.Db.U2R.Where(w => w.UserID == authUser.UserID).Select(s => s.Role).ToList();
                    if (authUser != null)
                    {
                        authUser.Roles = this.Db.U2R.Where(w => w.UserID == authUser.UserID).Select(s => s.Role).ToList();
                        AppUserSession session = new AppUserSession("Login", "ControllerContext")
                        {
                            UserID = authUser.UserID,
                            Authorized = true,
                            Authenticated = true,
                            Created = DateTime.Now,
                            Culture = CultureInfo.CurrentCulture.TwoLetterISOLanguageName,
                            Expires = DateTime.Now.AddMinutes(10),
                            Token = Guid.NewGuid(),
                            SessionID = Guid.NewGuid(),
                            Mode = Shared.Enum.AuthMode.LOCAL,
                            Active = true,
                            URI = "SECURE"
                        };
                        this.CurrentUser = authUser;
                        this.HasAuth = true;
                        if (authUser.Roles.Count() == 0)
                        {
                            authUser.Roles.Add(Db.Roles.Where(w => w.Name == Roles.EndUser).FirstOrDefault());
                        }
                        this.CurrentUserRoles = authUser.Roles;
                        this.Session = session;
                        this.Db.AppUserSessions.Add(this.Session);
                        this.Db.SaveChanges();
                        this.WriteTokenCookie(session);
                        return session;
                    }
                    else
                    {
                        this.HasAuth = false;
                        this.CurrentUser = null;
                        this.CurrentUserRoles = null;
                        return null;
                    }
                }
            }
        }
        /// <summary>
        /// Sign a user in. This function should only used in the Backoffice.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public AppUserSession WPFLogin(string username, string password, bool encrypt = true)
        {
            using (Db = new ContentModel())
            {
                string pass = GetMd5Hash(this.MD5Hasher, password);
                if (encrypt == false)
                {
                    pass = password;
                }
                ApplicationUser authUser = this.Db.ApplicationUsers.Where(w => w.UserEmailAddress == username && w.UserPassword == pass).FirstOrDefault();
                if (authUser == null)
                {
                    return null;
                }
                else
                {
                    authUser.Roles = this.Db.U2R.Where(w => w.UserID == authUser.UserID).Select(s => s.Role).ToList();
                    if (authUser != null)
                    {
                        authUser.Roles = this.Db.U2R.Where(w => w.UserID == authUser.UserID).Select(s => s.Role).ToList();
                        AppUserSession session = new AppUserSession("Login", "ControllerContext")
                        {
                            UserID = authUser.UserID,
                            Authorized = true,
                            Authenticated = true,
                            Created = DateTime.Now,
                            Culture = CultureInfo.CurrentCulture.TwoLetterISOLanguageName,
                            Expires = DateTime.Now.AddMinutes(10),
                            Token = Guid.NewGuid(),
                            SessionID = Guid.NewGuid(),
                            Mode = Shared.Enum.AuthMode.LOCAL,
                            Active = true,
                            URI = "SECURE"
                        };
                        this.WPFUser = authUser;
                        this.HasAuth = true;
                        if (authUser.Roles.Count() == 0)
                        {
                            authUser.Roles.Add(Db.Roles.Where(w => w.Name == Roles.EndUser).FirstOrDefault());
                        }
                        this.WPFUserRoles = authUser.Roles;
                        //this.Session = session;
                        this.Db.AppUserSessions.Add(session);
                        this.Db.SaveChanges();
                        //this.WriteTokenCookie(session);
                        return session;
                    }
                    else
                    {
                        this.HasAuth = false;
                        this.WPFUser = null;
                        this.WPFUserRoles = null;
                        return null;
                    }
                }
            }
        }

        public bool HasViewAuth(string[] roles)
        {
            if (this.CurrentUserRoles != null)
            {
                bool any = false;
                foreach (string role in roles)
                {
                    if (this.CurrentUserRoles.Where(w => w.Name == role).Any())
                    {
                        any = true;
                    }
                }
                return any;
            }
            else
            {
                return false;
            }
        }


        /// <summary>
        /// Checks if the user has one of the passed roles in roleNames array.
        /// </summary>
        /// <param name="roleNames"></param>
        /// <returns></returns>
        public bool UserHasRoles(string[] roleNames, Guid? authorID = null)
        {
            bool hasNone = true;
            if (authorID != null)
            {
                if (authorID == this.CurrentUser.UserID)
                {
                    return true;
                }
                else
                {
                    using (Db = new ContentModel())
                    {
                        this.CurrentUserRoles = Db.U2R.Where(w => w.UserID == this.CurrentUser.UserID).Select(s => s.Role).ToList();
                        foreach (string roleName in Roles.GetAllRoot())
                        {
                            if (this.CurrentUserRoles != null)
                            {
                                if (this.CurrentUserRoles.Where(w => w.Name == roleName).Any())
                                {
                                    hasNone = false;
                                }
                            }
                        }
                        if (!hasNone)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
            }
            else
            {
                using (Db = new ContentModel())
                {
                    this.CurrentUserRoles = Db.U2R.Where(w => w.UserID == this.CurrentUser.UserID).Select(s => s.Role).ToList();
                    foreach (string roleName in roleNames)
                    {
                        if (this.CurrentUserRoles != null)
                        {
                            if (this.CurrentUserRoles.Where(w => w.Name == roleName).Any())
                            {
                                hasNone = false;
                            }
                        }
                    }
                    if (!hasNone)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }
        /// <summary>
        /// Checks if the user has one of the passed roles in roleNames array.
        /// </summary>
        /// <param name="roleNames"></param>
        /// <returns></returns>
        public bool WPFUserHasRoles(string[] roleNames, Guid? authorID = null)
        {
            bool hasNone = true;
            using (Db = new ContentModel())
            {
                this.WPFUserRoles = Db.U2R.Where(w => w.UserID == this.WPFUser.UserID).Select(s => s.Role).ToList();
                foreach (string roleName in roleNames)
                {
                    if (this.WPFUserRoles != null)
                    {
                        if (this.WPFUserRoles.Where(w => w.Name == roleName).Any())
                        {
                            hasNone = false;
                        }
                    }
                }
                if (!hasNone)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
                
        }


        /// <summary>
        /// Create new application user.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public RepositoryState Create(ApplicationUser user)
        {
            Guid dirID = Guid.NewGuid();
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                try
                {
                    if (Db.ApplicationUsers.Where(w => w.UserEmailAddress == user.UserEmailAddress).Any())
                    {
                        return new RepositoryState { SUCCESS = false, MSG = string.Format("There is already an user registred with the following mail adres {0}", user.UserEmailAddress) };
                    }

                    Db.MediaDirectories.Add(
                        new MediaDirectory()
                        {
                            DirectoryID = dirID,
                            Name = user.Name,
                            ParentID = FCConfig.UsersDirectoryID
                        }
                    );
                    user.UserID = Guid.NewGuid();
                    user.CreatedDate = DateTime.Now;
                    user.UserActivated = false;
                    user.MediaDirectoryID = dirID;
                    user.UserPassword = GetMd5Hash(MD5Hasher, user.UserPassword);
                    List<IValidationError> errors = this.Validate<ApplicationUser>(user);
                    if (errors.Count == 0)
                    {
                        user.UserEmailAddress = user.UserEmailAddress.ToLower();
                        user.Country = null;
                        user.Album = null;

                        if (user.Roles != null)
                        {
                            foreach (var r in user.Roles)
                            {
                                this.Db.U2R.Add(new User2Role { U2RID = Guid.NewGuid(), RoleID = r.RoleID, UserID = user.UserID });
                            }
                        }
                        user.Roles = null;
                        Db.ApplicationUsers.Add(user);
                        Db.SaveChanges();
                        return new RepositoryState() { AffectedID = user.UserID, SUCCESS = true, MSG = $"User {user.UserName} successfully created." };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
                catch (DbEntityValidationException ex)
                {
                    var created = Db.MediaDirectories.Where(w => w.DirectoryID == dirID).FirstOrDefault();
                    if (created != null)
                    {
                        Db.MediaDirectories.Remove(created);
                    }
                    return this.HandleException(ex, $"Cannot create user {user.UserName}. Please try again later.");
                }
                catch (Exception ex)
                {
                    var created = Db.MediaDirectories.Where(w => w.DirectoryID == dirID).FirstOrDefault();
                    if (created != null)
                    {
                        Db.MediaDirectories.Remove(created);
                    }
                    return this.HandleException(ex, $"Cannot create user {user.UserName}. Please try again later.");
                }
            }
        }

        public RepositoryState Activate(ApplicationUser user)
        {

            user.IsActive = true;
            user.UserActivated = true;
            this.CurrentUser = user;
            this.CurrentUserRoles = user.Roles;
            this.Session = this.Login(user.UserEmailAddress, user.UserPassword, false);
            if (this.ActionAuthorized(Roles.GetAll()))
            {
                var state = this.Update(user);
                state.Data = this.Session;
                return state;
            }
            else
            {
                return new RepositoryState { SUCCESS = false, MSG = "Invalid activation session." };
            }
        }
        /// <summary>
        /// Update application user.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public RepositoryState Update(ApplicationUser user)
        {
            using (Db = new PGDAL.PGModel.ContentModel())
            {
                try
                {
                    ApplicationUser u = Db.ApplicationUsers.Find(user.UserID);
                    u.IsActive = user.IsActive;
                    u.UserActivated = user.UserActivated;
                    if (user.UserPassword != null)
                    {
                        u.UserPassword = GetMd5Hash(MD5Hasher, user.UserPassword);
                    }
                    if (user.UserName != null)
                    {
                        u.UserName = user.UserName;
                    }
                    if (user.UserPhoneNumber != null)
                    {
                        u.UserPhoneNumber = user.UserPhoneNumber;
                    }
                    if (user.UserProfileIMG != null)
                    {
                        u.UserProfileIMG = user.UserProfileIMG;
                    }
                    if (user.UserFirstname != null)
                    {
                        u.UserFirstname = user.UserFirstname;
                    }
                    if (user.UserLastname != null)
                    {
                        u.UserLastname = user.UserLastname;
                    }
                    if (user.UserMiddlename != null)
                    {
                        u.UserMiddlename = user.UserMiddlename;
                    }
                    if (user.CountryID != null)
                    {
                        u.CountryID = user.CountryID;
                    }
                    if (user.City != null)
                    {
                        u.City = user.City;
                    }
                    if (user.UserAddress != null)
                    {
                        u.UserAddress = user.UserAddress;
                    }
                    if (user.UserAddressNR != null)
                    {
                        u.UserAddressNR = user.UserAddressNR;
                    }
                    if (user.ZIPCode != null)
                    {
                        u.ZIPCode = user.ZIPCode;
                    }

                    u.Country = null;

                    if (user.Roles != null)
                    {
                        if (user.Roles.Count > 0)
                        {
                            Db.U2R.RemoveRange(Db.U2R.Where(w => w.UserID == user.UserID));
                            foreach (Role r in user.Roles)
                            {
                                Db.U2R.Add(new User2Role { U2RID = Guid.NewGuid(), RoleID = r.RoleID, UserID = user.UserID });
                            }
                        }
                    }
                    if (u.MediaDirectoryID == null)
                    {
                        u.MediaDirectoryID = Guid.NewGuid();
                        Db.MediaDirectories.Add(
                        new MediaDirectory()
                        {
                            DirectoryID = u.MediaDirectoryID,
                            Name = user.Name,
                            ParentID = FCConfig.UsersDirectoryID
                        });
                    }
                    List<IValidationError> errors = this.Validate<ApplicationUser>(u);
                    if (errors.Count == 0)
                    {
                        u.Roles = null;
                        u.UserEmailAddress = u.UserEmailAddress.ToLower();
                        Db.Entry<ApplicationUser>(u).State = System.Data.Entity.EntityState.Modified;
                        Db.SaveChanges();
                        return new RepositoryState() { AffectedID = u.UserID, SUCCESS = true, MSG = $"User {user.UserName} successfully modified." };
                    }
                    else
                    {
                        return this.HandleValidationErrors(errors);
                    }
                }
                catch (DbEntityValidationException ex)
                {
                    return this.HandleException(ex, $"Cannot update user {user.UserName}. Please try again later.");
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, $"Cannot update user {user.UserName}. Please try again later.");
                }
            }
        }


        /// <summary>
        /// Deletes the user from the application
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public RepositoryState Delete(ApplicationUser user)
        {
            using (Db = new ContentModel())
            {
                try
                {
                    ApplicationUser u = Db.ApplicationUsers.Find(user.UserID);
                    u.IsDeleted = true;
                    u.DeletedDate = DateTime.Now;

                    Db.Entry<ApplicationUser>(u).State = System.Data.Entity.EntityState.Modified;
                    Db.SaveChanges();
                    return new RepositoryState() { AffectedID = user.UserID, SUCCESS = true, MSG = $"User {user.UserName} successfully removed." };
                }
                catch (Exception ex)
                {
                    return this.HandleException(ex, $"Cannot remove user {user.UserName}. Please try again later.");
                }
            }
        }

        /// <summary>
        /// Get list of all users. 
        /// </summary>
        /// <returns></returns>
        [Obsolete("This method is not secure, and should not even exists... but by the lack of time...")]
        public List<ApplicationUser> GetAllUsers()
        {
            List<ApplicationUser> users;
            using (Db = new ContentModel())
            {
                users = Db.ApplicationUsers.OrderBy(o => o.UserName).ToList();
                foreach (ApplicationUser user in users)
                {
                    user.Roles = Db.U2R.Where(w => w.UserID == user.UserID).Select(s => s.Role).OrderBy(o => o.Name).ToList();
                }
            }
            return users;
        }


        /// <summary>
        /// Fetches the token from the HTTPContext and get the user based on that token. User is accessible via AuthorizationRepository.Current.CurrentUser
        /// </summary>
        /// <returns></returns>
        public Guid? GetHTTPToken()
        {
            Guid? token = null;
            Guid? userID = null;
            if (HttpContext.Current != null)
            {
                if (HttpContext.Current.Request.Headers["Token"] != null)
                {
                    if (HttpContext.Current.Request.Headers["Token"] != "null")
                    {
                        try
                        {
                            token = Guid.Parse(HttpContext.Current.Request.Headers["Token"]);
                        } catch(Exception e)
                        {
                            token = null;
                            this.HandleException(e);
                        }
                        this.ActiveToken = token;
                    }
                }
                if (HttpContext.Current.Request.Cookies["Token"] != null)
                {
                    try
                    {
                        token = Guid.Parse(HttpContext.Current.Request.Cookies["Token"].Value);
                    } catch(Exception e)
                    {
                        token = null;
                        this.HandleException(e);
                    }
                    this.ActiveToken = token;
                }
                if (token != null)
                {
                    this.Session = this.GetByToken(token);
                    if (this.Session != null)
                    {
                        this.UserID = Session.UserID;
                        this.CurrentUser = this.GetUserByID(this.Session.UserID);
                        this.CurrentUserRoles = this.CurrentUser.Roles;
                        return token;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public Guid? GetRequestToken()
        {
            Guid? token = null;
            Guid? userID = null;
            if (HttpContext.Current != null)
            {
                if (HttpContext.Current.Request.Headers["Token"] != null)
                {
                    if (HttpContext.Current.Request.Headers["Token"] != "null") //LIKE WHUUUT??? HOW IS THIS POSSIBLE?
                    {
                        token = Guid.Parse(HttpContext.Current.Request.Headers["Token"]);
                        this.ActiveToken = token;
                    }
                    else
                    {
                        return null;
                    }
                }
                if (HttpContext.Current.Request.Cookies["Token"] != null)
                {
                    token = Guid.Parse(HttpContext.Current.Request.Cookies["Token"].Value);
                    this.ActiveToken = token;
                }
                return token;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Fetches the token from the HTTPContext and get the user based on that token. User is accessible via AuthorizationRepository.Current.CurrentUser
        /// </summary>
        public bool SetHTTPToken(Guid? token)
        {

            if (token != null)
            {
                this.Session = this.GetByToken(token);
                if (this.Session != null)
                {
                    this.UserID = Session.UserID;
                    this.CurrentUser = this.GetUserByID(this.Session.UserID);
                    this.CurrentUserRoles = this.CurrentUser.Roles;

                    if (this.CurrentUser != null && this.CurrentUserRoles != null)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

    }
}

