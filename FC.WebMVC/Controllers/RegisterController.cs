using FC.BL.Repositories;
using FC.Shared.Config;
using FC.Shared.Entities;
using FC.Shared.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace FC.WebMVC.Controllers
{
    public class RegisterController : BaseController
    {
        public RegisterController()
            : base()
        { }
        public ActionResult Success(Guid? userid)
        {
            var user = this.repositories.Auth.GetUserByID(userid);
            return View(user);
        }
        // GET: Register
        public ActionResult Index(string type = "user")
        {
            ViewBag.IncomingType = type;
            return View();
        }

        public ActionResult Activate(Guid? id)
        {
            var user = this.repositories.Auth.GetByActivationToken(id);
            
            if (user != null)
            {
                user.IsActive = true;
                user.Country = null;
                user.Album = null;
                user.Social = null;
                user.Roles = null;
                
                var s = this.repositories.Auth.Activate(user).Data as AppUserSession;
                if (s != null)
                {
                    s = this.repositories.Auth.RefreshToken(s, true);
                }
                return Redirect("/Profile/Index");
            }
            else
            {
                return View("~/Views/Shared/Error.html");
            }
        }
        // GET: Register
        [HttpPost]
        public ActionResult Index(Shared.Entities.ApplicationUser user)
        {
            string repeatPass = HttpContext.Request.Form["UserPassword_Repeat"];
            string[] postRoles = HttpContext.Request.Form["AccountTypes"].ToString().Split(',');
            List<Role> roles = new List<Role>();
            foreach(string r in postRoles)
            {
                roles.Add(this.repositories.Auth.GetRoleByName(r));
            }
            // string captcha = HttpContext.Request.Form[""];
            bool passChecked = false;
            if (user.UserPassword != null)
            {
                if (repeatPass == user.UserPassword)
                {
                    passChecked = true;
                }
                else
                {
                    ViewBag.Message = "Passwords doesn't match!";
                    return View(user);
                }
            }
            if (!this.validateCaptcha())
            {
                ViewBag.Message = "You did not pass the captcha validation!";
                return View(user);
            }
            if (ModelState.IsValid && passChecked)
            {
                user.ActivationToken = Guid.NewGuid();
                user.Roles = roles;
                RepositoryState state = this.repositories.Auth.Create(user);
                this.repositories.Roles.AddByUserID(Roles.EndUser, state.AffectedID);
                if (state.SUCCESS)
                {   
                    System.Web.Mail.MailMessage myMail = new System.Web.Mail.MailMessage();
                    myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserver", FCConfig.SMTP_SERVER);
                    myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserverport",FCConfig.SMTP_PORT);
                    myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusing", "2");
                    myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1");
                    //Use 0 for anonymous
                    myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername",FCConfig.NOREPLY_MAIL_NL);
                    myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword",FCConfig.NOREPLY_MAIL_NL_PASSWORD);
                    myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpusessl","true");
                    myMail.From = "FESTIVAL-CALENDAR.NL <"+FCConfig.NOREPLY_MAIL_NL+">";
                    myMail.To = user.UserEmailAddress;
                    myMail.Subject = "Please verify your e-mail address";
                    myMail.BodyFormat = System.Web.Mail.MailFormat.Html;

                    string name = $"{user.UserLastname}, {user.UserFirstname}";
                    if (user.UserMiddlename != null)
                    {
                        name = $"{user.UserLastname}, {user.UserFirstname},  {user.UserMiddlename}";
                    }

                    var vd = new ViewDataDictionary();
                    vd.Add("Token", user.ActivationToken);
                    vd.Add("Name", name);
                    vd.Add("Email", user.UserEmailAddress);
                    vd.Add("Expires", DateTime.Now);
                    myMail.Body = this.ToHtml("ActivationMail", vd, new ControllerContext(HttpContext, this.RouteData, this));
                    System.Web.Mail.SmtpMail.SmtpServer = string.Format("{0}:{1}", FCConfig.SMTP_SERVER, FCConfig.SMTP_PORT);
                    System.Web.Mail.SmtpMail.Send(myMail);
                    
                    //    "Verify your account",
                    //    this.ToHtml("RegisterMail", new ViewDataDictionary(), new ControllerContext(HttpContext, this.RouteData, this))
                    return RedirectToAction("Success", "Register", new { userid = state.AffectedID });
                    

                    //user.UserEmailAddress, "Festival calendar account verification", "Please copy the link below into a browser to activate your account."));
                }
                else
                {
                    ViewBag.Message = state.MSG;
                    return View(user);
                }
            }
            else
            {
                return View(user);
            }
        }

        [HttpGet]
        public ActionResult Login()
        {
            this.AppUser = null;
            this.repositories.Auth.CurrentUser = null;
            this.repositories.Auth.Session = null;
            this.repositories.Auth.CurrentUserRoles = null;
            return View();
        }

        [HttpGet]
        public ActionResult Logout()
        {
            this.repositories.Auth.Logout(this.repositories.Auth.Session.SessionID);
            this.AppUser = null;
            this.repositories.Auth.CurrentUser = null;
            this.repositories.Auth.Session = null;
            this.repositories.Auth.CurrentUserRoles = null;
            HttpContext.Response.Cookies.Get("Token").Expires = DateTime.MinValue;
            HttpContext.Response.Cookies.Get("UserID").Expires = DateTime.MinValue;
            return Redirect("/");
        }

        [HttpPost]
        public ActionResult Login(ApplicationUser user)
        {
            if (this.validateCaptcha())
            {
                var sess = this.repositories.Auth.Login(user.UserEmailAddress, user.UserPassword);

                if (sess != null)
                {
                    if (sess.Authenticated)
                    {
                        return Redirect("/Profile/Index");
                    }
                }

                ViewBag.State = new RepositoryState { MSG = "Invalid username or password", SUCCESS = false };
                return View();
            }
            else
            {
                ViewBag.State = new RepositoryState { MSG = "You must validate the recaptcha in order to sign in", SUCCESS = false };
                return View();
            }
        }

        public ActionResult Start()
        {
            if (this.repositories.Auth.CurrentUser != null)
            {
                return View("Activate", this.repositories.Auth.CurrentUser);
            }
            else
            {
                return RedirectToAction("Index");
            }
        }

        public ActionResult ForgotPassword()
        {

            return View();
        }

        [HttpPost]
        public ActionResult ForgotPassword(string userEmailAddress)
        {
            ApplicationUser user = this.repositories.Auth.GetUserByEmail(userEmailAddress);
            if (user != null)
            {
                var sess = AppUserSession.Factory(SessionType.PasswordReset, user.UserID);


                System.Web.Mail.MailMessage myMail = new System.Web.Mail.MailMessage();
                myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserver", FCConfig.SMTP_SERVER);
                myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpserverport", FCConfig.SMTP_PORT);
                myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusing", "2");
                myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate", "1");
                //Use 0 for anonymous
                myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendusername", FCConfig.NOREPLY_MAIL_NL);
                myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/sendpassword", FCConfig.NOREPLY_MAIL_NL_PASSWORD);
                myMail.Fields.Add("http://schemas.microsoft.com/cdo/configuration/smtpusessl", "true");
                myMail.From = "FESTIVAL-CALENDAR.NL <" + FCConfig.NOREPLY_MAIL_NL + ">";
                myMail.To = user.UserEmailAddress;
                myMail.Subject = "Reset your Festival Calendar password";
                myMail.BodyFormat = System.Web.Mail.MailFormat.Html;

                string name = $"{user.UserLastname}, {user.UserFirstname}";
                if (user.UserMiddlename != null)
                {
                    name = $"{user.UserLastname}, {user.UserFirstname},  {user.UserMiddlename}";
                }
                var state = this.repositories.Auth.StartSession(sess);
                if (state.SUCCESS)
                {
                    var vd = new ViewDataDictionary();
                    vd.Add("Token", sess.Token);
                    vd.Add("Name", name);
                    vd.Add("Email", user.UserEmailAddress);
                    vd.Add("Expires", DateTime.Now);
                    myMail.Body = this.ToHtml("ForgotPasswordMail", vd, new ControllerContext(HttpContext, this.RouteData, this));
                    System.Web.Mail.SmtpMail.SmtpServer = string.Format("{0}:{1}", FCConfig.SMTP_SERVER, FCConfig.SMTP_PORT);
                    System.Web.Mail.SmtpMail.Send(myMail);

                    this.Flash(new RepositoryState(true, "Password reset e-mail send to " + userEmailAddress));
                    return Redirect("/");
                }
                else
                {
                    this.Flash(state);
                    return RedirectToAction("ForgotPassword");
                }
            } else
            {
                this.Flash(new RepositoryState(false, $"No such user is found with e-mail address "+ userEmailAddress));
                return Redirect("/");
            }
            
        }

        public ActionResult ResetPassword(Guid? token)
        {
            AppUserSession session = this.repositories.Auth.GetByToken(token, true, false);
            if (session != null)
            {
                
                ApplicationUser user = this.repositories.Auth.GetUserByID(session.UserID);
                if (user != null)
                {
                    if (session.Expires < DateTime.Now)
                    {
                        this.Flash(new RepositoryState(false, "Password reset link expired. Request a new password reset link."));
                        return RedirectToAction("ForgotPassword");
                    } else
                    {
                        return View(user);
                    }
                } else
                {
                    this.Flash(new RepositoryState(false, "Password reset link is not valid please request a new one."));
                    return RedirectToAction("ForgotPassword");
                }
                
            } else
            {
                this.Flash(new RepositoryState(false,"Password reset link is not valid please request a new one."));
                return RedirectToAction("ForgotPassword");
            }
        }
        
        [HttpPost]
        public ActionResult ResetPassword(ApplicationUser user)
        {
            RepositoryState state = new RepositoryState();
            if(user.UserPassword == Request.Form["UserPassword_Repeat"])
            {
                state = this.repositories.Auth.Update(user);
                if (state.SUCCESS)
                {
                    state.MSG = "Password successfully modified";
                    this.Flash(state);

                    return Redirect("/Login");
                }
                else
                {
                    state.MSG = "Cannot modify password. Please try again later";
                    this.Flash(state);
                    return View(user);
                }
            } else
            {
                state.MSG = "Passwords doesn't match";
                this.Flash(state);
                return RedirectToAction("ForgotPassword");
            }

        }
    }
}