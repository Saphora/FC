using FC.BL.Repositories;
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
        public ActionResult Index()
        {
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
                    Client = new System.Net.Mail.SmtpClient("festival-calendar.nl", 587);
                    Client.Credentials = new System.Net.NetworkCredential("noreply@festival-calendar.nl", "brother2030");
                    Client.DeliveryFormat = System.Net.Mail.SmtpDeliveryFormat.International;
                    Client.EnableSsl = true;
                    string name = $"{user.UserLastname}, {user.UserFirstname}";
                    if (user.UserMiddlename != null)
                    {
                        name = $"{user.UserLastname}, {user.UserFirstname},  {user.UserMiddlename}";
                    }
                    MailMessage msg = new MailMessage(
                        new MailAddress("noreply@festival-calendar.nl", "Festival Calendar", UTF8Encoding.UTF8),
                        new MailAddress(user.UserEmailAddress, name, UTF8Encoding.UTF8)
                    );
                    msg.Subject = "Verify your account";
                    msg.SubjectEncoding = UTF8Encoding.UTF8;
                    msg.IsBodyHtml = true;
                    var vd = new ViewDataDictionary();
                    vd.Add("Token", user.ActivationToken);
                    vd.Add("Name", name);
                    msg.Body = this.ToHtml("ActivationMail", vd, new ControllerContext(HttpContext, this.RouteData, this));
                    Client.Send(msg);
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
            var sess = AppUserSession.Factory(SessionType.PasswordReset, user.UserID);

            Client = new System.Net.Mail.SmtpClient("festival-calendar.nl", 587);
            Client.Credentials = new System.Net.NetworkCredential("noreply@festival-calendar.nl", "brother2030");
            Client.DeliveryFormat = System.Net.Mail.SmtpDeliveryFormat.International;
            Client.EnableSsl = true;
            string name = $"{user.UserLastname}, {user.UserFirstname}";
            if (user.UserMiddlename != null)
            {
                name = $"{user.UserLastname}, {user.UserFirstname},  {user.UserMiddlename}";
            }
            MailMessage msg = new MailMessage(
                new MailAddress("noreply@festival-calendar.nl", "Festival Calendar", UTF8Encoding.UTF8),
                new MailAddress(user.UserEmailAddress, name, UTF8Encoding.UTF8)
            );
            msg.Subject = "Reset your password";
            msg.SubjectEncoding = UTF8Encoding.UTF8;
            msg.IsBodyHtml = true;
            var vd = new ViewDataDictionary();
            vd.Add("Token", sess.Token);
            vd.Add("Name", name);
            vd.Add("Email", user.UserEmailAddress);
            vd.Add("Expires", sess.Expires);
            var state = this.repositories.Auth.StartSession(sess);
            msg.Body = this.ToHtml("ForgotPasswordMail", vd, new ControllerContext(HttpContext, this.RouteData, this));
            if (state.SUCCESS)
            {
                Client.Send(msg);
                this.Flash(new RepositoryState(true, "Password reset email send to " + userEmailAddress));
                return Redirect("/");
            } else
            {
                this.Flash(state);
                return RedirectToAction("ForgotPassword");
            }
        }

        public ActionResult ResetPassword(Guid? token)
        {
            AppUserSession session = this.repositories.Auth.GetByToken(token);
            ApplicationUser user = this.repositories.Auth.GetUserByID(session.UserID);
            if(session.Expires < DateTime.Now)
            {
                this.Flash(new RepositoryState(false, "Password reset link expired. Request a new password reset link."));
                return RedirectToAction("ForgotPassword");
            }
            return View(user);
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