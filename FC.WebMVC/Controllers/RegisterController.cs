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

namespace FC.WebMVC.Controllers
{
    public class RegisterController : BaseController
    {
        public RegisterController()
            :base()
        {}
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
            user.IsActive = true;
            user.Country = null;
            user.Album = null;
            user.Social = null;
            user.Roles = null;
            this.repositories.Auth.Update(user);
            return View();
        }
        // GET: Register
        [HttpPost]
        public ActionResult Index(Shared.Entities.ApplicationUser user)
        {

            if (ModelState.IsValid)
            {
                user.ActivationToken = Guid.NewGuid();
                RepositoryState state = this.repositories.Auth.Create(user);
                this.repositories.Roles.AddByUserID(Roles.EndUser, state.AffectedID);
                if (state.SUCCESS)
                {
                    Client = new System.Net.Mail.SmtpClient("festival-calendar.nl", 587);
                    Client.Credentials = new System.Net.NetworkCredential("noreply@festival-calendar.nl", "brother2030");
                    Client.DeliveryFormat = System.Net.Mail.SmtpDeliveryFormat.International;
                    Client.EnableSsl = true;
                    string name = $"{user.UserLastname}, {user.UserFirstname}";
                    if (user.UserMiddlename != null) {
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

                    //,
                    //    ,
                    //    "Verify your account",
                    //    this.ToHtml("RegisterMail", new ViewDataDictionary(), new ControllerContext(HttpContext, this.RouteData, this))
                    return RedirectToAction("Success","Register",new { userid=state.AffectedID});

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
    }
}