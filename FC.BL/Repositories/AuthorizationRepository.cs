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

        
        public AppUserSession Session { get; set; }
        public ApplicationUser CurrentUser { get; set; }
        public List<Role> CurrentUserRoles { get; set; }
        public Guid? ActiveToken { get; set; }
        public bool HasAuth { get; set; }
        public bool IsAuthorized { get; set; }
        public bool IsAlmostExpired { get; set; }
        
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

        public RepositoryState ForceDelete(ApplicationUser model)
        {
            try
            {
                using (this.Db = new ContentModel())
                {
                    this.Db.AppUserSessions.RemoveRange(this.Db.AppUserSessions.Where(w => w.UserID == model.UserID));
                    this.Db.U2R.RemoveRange(this.Db.U2R.Where(w => w.UserID == model.UserID));
                    this.Db.Favorites.RemoveRange(this.Db.Favorites.Where(w => w.UserID == model.UserID));
                    this.Db.Media.RemoveRange(this.Db.Media.Where(w => w.DirectoryID == model.MediaDirectoryID));
                    this.Db.MediaDirectories.RemoveRange(this.Db.MediaDirectories.Where(w => w.DirectoryID == model.MediaDirectoryID));
                    this.Db.ApplicationUsers.Remove(this.Db.ApplicationUsers.Find(model.UserID));
                    this.Db.SaveChanges();
                }
                return new RepositoryState { SUCCESS = true, MSG = "User successfully removed with force" };
            } catch(DbEntityValidationException ex) { 
                return this.HandleException(ex, "Cannot remove user, because a database error occured.");
            } catch(Exception ex)
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
                                        ActiveToken = Guid.NewGuid();
                                        s.Token = ActiveToken;
                                        s.Authenticated = true;
                                        s.Authorized = true;
                                        s.Expires = DateTime.Now.AddHours(1);
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
            if(sess.Expires < DateTime.Now)
            {
                return true;
            } else
            {
                return false;
            }
        }

        /// <summary>
        /// Get the current user session based on token.
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public AppUserSession GetByToken(Guid? token)
        {
            AppUserSession result;
            using (Db = new ContentModel())
            {
                result = this.Db.AppUserSessions.Where(w => w.Token == token).FirstOrDefault();
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
        /// Keep the session alive, raises the expiredate with one hour.
        /// </summary>
        /// <param name="sessionID"></param>
        /// <returns></returns>
        public bool KeepAlive(Guid? sessionID)
        {
            var db = new PGDAL.PGModel.ContentModel();
            AppUserSession sess = db.AppUserSessions.Find(sessionID);
            if (sess != null)
            {
                if (sess.Active == true)
                {
                    sess.Expires = DateTime.Now.AddHours(1);
                    db.Entry<AppUserSession>(sess).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
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
                    this.KeepAlive(sess.SessionID);
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
            using (Db = new ContentModel())
            {
                AppUserSession sess = this.Db.AppUserSessions.Find(sessionID);
                if (sess != null)
                {
                    if (sess.Authorized == true && sess.Active == true && sess.Expires > DateTime.Now)
                    {
                        sess.Active = false;
                        sess.Expires = new DateTime(1989, 12, 28); //My date of birth :D 
                        sess.Authorized = false;
                        sess.Authenticated = false;
                        this.Db.Entry<AppUserSession>(sess).State = System.Data.Entity.EntityState.Modified;
                        this.Db.SaveChanges();
                        this.Session = null;
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                this.Session = null;
                return true;
            }
        }

        /// <summary>
        /// Checks if the authenticated user roles matches one of the roles in roleNames
        /// </summary>
        /// <param name="roleNames"></param>
        /// <returns></returns>
        public bool ActionAuthorized(string[] roleNames)
        {
            bool any = false;
            foreach(string role in roleNames)
            {
                if(CurrentUser.Roles.Select(s => s.Name).Where(w => w == role).Any())
                {
                    any = true;
                }
            }
            return any;
        }

        /// <summary>
        /// Sign a user in. This function should only used in the Backoffice.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public AppUserSession Login(string username, string password)
        {
            using (Db = new ContentModel())
            {
                if (this.Session == null || this.Session.Authenticated == false)
                {
                    string pass = GetMd5Hash(this.MD5Hasher, password);
                    ApplicationUser authUser = this.Db.ApplicationUsers.Where(w => w.UserEmailAddress == username && w.UserPassword == pass).FirstOrDefault();
                    if (authUser == null)
                    {
                        AppUserSession session = new AppUserSession("Login", "ControllerContext")
                        {
                            UserID = null,
                            Authorized = false,
                            Authenticated = false,
                            Culture = CultureInfo.CurrentCulture.TwoLetterISOLanguageName,
                            Expires = DateTime.Now.AddMinutes(10),
                            SessionID = Guid.NewGuid(),
                            Mode = Shared.Enum.AuthMode.LOCAL,
                            //UserID = authUser.UserID,
                            Active = true,
                            URI = "SECURE"
                        };
                        this.Session = session;
                        return session;
                    }
                    authUser.Roles = this.Db.U2R.Where(w => w.UserID == authUser.UserID).Select(s => s.Role).ToList();
                    if (authUser != null)
                    {
                        authUser.Roles = this.Db.U2R.Where(w => w.UserID == authUser.UserID).Select(s => s.Role).ToList();
                        AppUserSession session = new AppUserSession("Login","ControllerContext")
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
                else
                {
                    return Session;
                }
            }
        }


        /// <summary>
        /// Sign a user in.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="requestContext"></param>
        /// <param name="ctx"></param>
        /// <returns></returns>
        public AppUserSession Login(string username, string password, System.Web.HttpContext requestContext, System.Web.Http.Controllers.HttpControllerContext ctx)
        {
            if (this.Session == null || this.Session.Authenticated == false)
            {
                System.Web.HttpRequest r = requestContext.Request;
                string pass = GetMd5Hash(this.MD5Hasher, password);
                ApplicationUser authUser = this.Db.ApplicationUsers.Where(w => w.UserEmailAddress == username && w.UserPassword == pass).FirstOrDefault();
                authUser.Roles = this.Db.U2R.Where(w => w.UserID == authUser.UserID).Select(s=>s.Role).ToList();
                if (authUser != null)
                {
                    authUser.Roles = this.Db.U2R.Where(w => w.UserID == authUser.UserID).Select(s => s.Role).ToList();
                    AppUserSession session = new AppUserSession()
                    {
                        User = authUser,
                        Authorized = false,
                        Authenticated = true,
                        Created = DateTime.Now,
                        Culture = CultureInfo.CurrentCulture.TwoLetterISOLanguageName,
                        HostAddress = requestContext.Request.UserHostName,
                        IPAddress = requestContext.Request.UserHostAddress,
                        HostName = requestContext.Request.UserHostName,
                        Expires = DateTime.Now.AddMinutes(10),
                        Platform = requestContext.Request.Browser.Platform,
                        ScreenWidth = requestContext.Request.Browser.ScreenPixelsWidth.ToString(),
                        ScreenHeight = requestContext.Request.Browser.ScreenPixelsHeight.ToString(),
                        Token = Guid.NewGuid(),
                        SessionID = Guid.NewGuid(),
                        BrowserName = requestContext.Request.Browser.Browser,
                        Mode = Shared.Enum.AuthMode.LOCAL,
                        UserAgent = requestContext.Request.Browser.Browser,
                        UserID = authUser.UserID,
                        Active = true,
                        Action = ctx.RouteData.Values["action"].ToString(),
                        Controller = ctx.RouteData.Values["controller"].ToString(),
                        URI = "SECURE"
                    };
                    if (requestContext.Request.Browser.IsMobileDevice)
                    {
                        session.IsMobileDevice = requestContext.Request.Browser.IsMobileDevice;
                        session.MobileDeviceName = requestContext.Request.Browser.MobileDeviceModel;
                    }
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
                    return session;
                }
                else
                {
                    this.HasAuth = false;
                    this.CurrentUser = null;
                    this.CurrentUserRoles = null;
                    return null;
                }
            } else
            {
                return Session;
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
                        if(user.Roles != null)
                        {
                            foreach(var r in user.Roles)
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

                    if(user.UserPassword != null) {
                        u.UserPassword = GetMd5Hash(MD5Hasher, user.UserPassword);
                    }
                    u.UserName = user.UserName;
                    u.UserPhoneNumber = user.UserPhoneNumber;
                    u.UserProfileIMG = user.UserProfileIMG;
                    u.UserFirstname = user.UserFirstname;
                    u.UserLastname = user.UserLastname;
                    u.UserMiddlename = user.UserMiddlename;
                    u.CountryID = user.CountryID;
                    u.City = user.City;
                    u.UserAddress = user.UserAddress;
                    u.UserAddressNR = user.UserAddressNR;
                    u.IsActive = user.IsActive;
                    u.UserActivated = user.UserActivated;
                    u.ZIPCode = user.ZIPCode;
                    u.Country = null;
                    if (user.Roles != null)
                    {
                        Db.U2R.RemoveRange(Db.U2R.Where(w => w.UserID == user.UserID));
                        foreach (Role r in user.Roles)
                        {
                            Db.U2R.Add(new User2Role { U2RID = Guid.NewGuid(), RoleID = r.RoleID, UserID = user.UserID });
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
                } catch(Exception ex)
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
            using(Db = new ContentModel())
            {
                users = Db.ApplicationUsers.OrderBy(o => o.UserName).ToList();
                foreach(ApplicationUser user in users)
                {
                    user.Roles = Db.U2R.Where(w => w.UserID == user.UserID).Select(s => s.Role).OrderBy(o=>o.Name).ToList();
                }
            }
            return users;
        }
    }
}
